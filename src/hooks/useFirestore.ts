import { useState, useEffect } from 'react';
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  where,
  orderBy,
  Timestamp
} from 'firebase/firestore';
import { db } from '@/config/firebase';
import { useAuth } from '@/contexts/AuthContext';
import { ResumeData } from '@/types/resume';
import { toast } from 'sonner';

export interface ResumeDocument {
  id: string;
  userId: string;
  resumeTitle: string;
  data: ResumeData;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export const useFirestore = () => {
  const { user } = useAuth();
  const [resumes, setResumes] = useState<ResumeDocument[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setResumes([]);
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, 'users', user.uid, 'resumes'),
      orderBy('updatedAt', 'desc')
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const docs = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as ResumeDocument[];
        setResumes(docs);
        setLoading(false);
      },
      (error) => {
        console.error('Error fetching resumes:', error);
        toast.error('Failed to load resumes');
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user]);

  const createResume = async (resumeTitle: string, data: ResumeData) => {
    if (!user) throw new Error('User not authenticated');

    try {
      const docRef = await addDoc(collection(db, 'users', user.uid, 'resumes'), {
        userId: user.uid,
        resumeTitle,
        data,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      });
      toast.success('Resume created successfully!');
      return docRef.id;
    } catch (error) {
      console.error('Error creating resume:', error);
      toast.error('Failed to create resume');
      throw error;
    }
  };

  const updateResume = async (resumeId: string, data: Partial<ResumeData>) => {
    if (!user) throw new Error('User not authenticated');

    try {
      const docRef = doc(db, 'users', user.uid, 'resumes', resumeId);
      await updateDoc(docRef, {
        data,
        updatedAt: Timestamp.now()
      });
    } catch (error) {
      console.error('Error updating resume:', error);
      toast.error('Failed to update resume');
      throw error;
    }
  };

  const deleteResume = async (resumeId: string) => {
    if (!user) throw new Error('User not authenticated');

    try {
      await deleteDoc(doc(db, 'users', user.uid, 'resumes', resumeId));
      toast.success('Resume deleted successfully!');
    } catch (error) {
      console.error('Error deleting resume:', error);
      toast.error('Failed to delete resume');
      throw error;
    }
  };

  return {
    resumes,
    loading,
    createResume,
    updateResume,
    deleteResume
  };
};
