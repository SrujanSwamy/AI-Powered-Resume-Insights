import { getUserId } from '@/app/lib/actions';
import apiService from '@/app/services/apiService';
import { redirect } from 'next/navigation';

export async function usePageData() {
  let userId: string | null = null;

  try {
    userId = await getUserId();
  } catch {
    redirect('/login');
  }

  if (!userId) {
    redirect('/login');
  }

  let resumeData: any = null;

  try {
    resumeData = await apiService.get(`/api/ats/${userId}`);
  } catch {
    redirect('/login');
  }

  // Backend returns { success: false, message: '...' } when no resume exists
  if (!resumeData || resumeData.success === false || !resumeData.get_pdf_url) {
    redirect('/resume-upload');
  }

  return { userId, resumeData };
}