"use client";

import React from "react";
import { Trash2, AlertTriangle, X } from "lucide-react";
import { Question } from "@/admin/alumniTracerResults/components/editQuestions/EmploymentEducationCareer"

interface DeleteQuestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  questionText: string;
}

export default function DeleteQuestionModal({
  isOpen,
  onClose,
  onConfirm,
  questionText,
}: DeleteQuestionModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-100">
          <div className="flex items-center gap-2 text-red-600">
            <AlertTriangle size={20} />
            <h3 className="font-bold text-lg">Confirm Deletion</h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex flex-col items-center text-center mb-6">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4">
              <Trash2 className="text-red-600 w-8 h-8" />
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Are you sure you want to delete this question? This action cannot be undone.
            </p>
            <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-100 w-full">
              <p className="text-gray-800 text-sm font-medium italic">
                "{questionText}"
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg font-semibold transition-colors text-sm"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 px-4 py-2.5 bg-[#8E3737] hover:bg-[#7a2f2f] text-white rounded-lg font-semibold transition-colors text-sm shadow-sm"
            >
              Delete Question
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
