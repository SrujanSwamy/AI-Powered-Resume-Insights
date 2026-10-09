"use client";

import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import UploadIcon from "@mui/icons-material/Upload";
import CloseIcon from "@mui/icons-material/Close";
import apiService from "@/app/services/apiService";
import { getUserId } from "@/app/lib/actions";

const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm z-50">
      <div className="w-16 h-16 border-4 border-indigo-500 rounded-full animate-spin border-t-transparent shadow-lg shadow-indigo-500/20"></div>
    </div>
  );
};

const FileInput = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const fetchUserId = async () => {
      const id = await getUserId();
      setUserId(id);
    };
    fetchUserId();
  }, []);

  const handleUploadClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setErrorMessage(null);
    }
  };

  const handleSubmit = async () => {
    if (!selectedFile || !userId) return;

    const formData = new FormData();
    formData.append("pdf", selectedFile);

    setLoading(true);

    try {
      const response = await apiService.post("/api/ats/upload-resume/", formData);

      if (response.success) {
        router.push(`/resume-analysis`);
      } else {
        const errors = response.errors;
        const errorMsg = errors?.non_field_errors?.[0] || 
                         Object.values(errors?.field_errors || {}).flat()[0] || 
                         "An unknown error occurred.";
        setErrorMessage(errorMsg);
      }
    } catch (error: any) {
      if (error.response?.data?.errors) {
        const errors = error.response.data.errors;
        const errorMsg = errors?.non_field_errors?.[0] || 
                         Object.values(errors?.field_errors || {}).flat()[0] || 
                         "An unknown error occurred.";
        setErrorMessage(errorMsg);
      } else {
        setErrorMessage("A network error occurred. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  const truncateFileName = (fileName: string, maxLength: number): string => {
    if (fileName.length > maxLength) {
      return fileName.slice(0, maxLength) + "...";
    }
    return fileName;
  };

  return (
    <div className="relative h-screen flex items-center justify-center bg-[#050816]">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-violet-600/10 rounded-full blur-[80px]" />
      </div>

      {loading && <Loader />}
      <div className="relative flex flex-col items-center z-10">
        <input
          type="file"
          ref={inputRef}
          className="hidden"
          accept=".pdf"
          onChange={handleFileChange}
        />
        
        {/* Upload Card */}
        <button
          className="group w-[380px] h-[220px] text-lg font-semibold flex flex-col items-center justify-center gap-4 text-slate-300 border border-dashed border-slate-700 bg-slate-900/50 backdrop-blur-sm rounded-3xl cursor-pointer transition-all duration-300 hover:border-indigo-500 hover:text-white hover:shadow-2xl hover:shadow-indigo-500/10 hover:-translate-y-1"
          onClick={handleUploadClick}
        >
          <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-lg shadow-indigo-500/30 group-hover:scale-110 transition-transform duration-300">
            <UploadIcon className="h-6 w-6" />
          </div>
          <span className="tracking-wide">Upload Your Resume (PDF)</span>
          <span className="text-xs font-normal text-slate-500">Max file size 5MB</span>
        </button>

        {/* Selected File Details */}
        {selectedFile && (
          <div className="flex items-center justify-between bg-slate-800/80 border border-slate-700/60 rounded-2xl p-3 mt-5 w-[380px] backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <svg className="h-5 w-5 text-indigo-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-sm font-medium m-0 text-slate-200">
                {truncateFileName(selectedFile.name, 35)}
              </p>
            </div>
            <button
              onClick={() => setSelectedFile(null)}
              className="w-8 h-8 flex items-center justify-center text-slate-400 bg-slate-700/50 rounded-full transition-colors hover:text-white hover:bg-slate-700"
            >
              <CloseIcon className="h-4 w-4" />
            </button>
          </div>
        )}

        {errorMessage && (
          <div className="text-red-400 text-sm mt-4 font-medium bg-red-500/10 border border-red-500/20 px-4 py-2 rounded-xl">
            {errorMessage}
          </div>
        )}

        {selectedFile && (
          <button
            onClick={handleSubmit}
            className="mt-5 w-[380px] h-[50px] bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold rounded-2xl shadow-lg shadow-indigo-500/20 transition-all duration-300 hover:from-indigo-500 hover:to-violet-500 hover:shadow-indigo-500/40 hover:scale-[1.02]"
          >
            Submit Resume
          </button>
        )}
      </div>
    </div>
  );
};

export default FileInput;