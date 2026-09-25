import React from 'react';
import type { Teacher } from '../../types';
import { Mail, Phone, Calendar, BookOpen, X, CheckCircle2 } from 'lucide-react';

interface TeacherDetailModalProps {
  teacher: Teacher;
  onClose: () => void;
  onEdit?: () => void;
}

export const TeacherDetailModal: React.FC<TeacherDetailModalProps> = ({ teacher, onClose, onEdit }) => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4 font-sans">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header Banner */}
        <div className="p-6 bg-gradient-to-r from-purple-700 via-slate-900 to-indigo-800 text-white relative">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-4">
            <img src={teacher.avatar} alt={teacher.firstName} className="w-16 h-16 rounded-2xl object-cover ring-4 ring-white/20 shadow-lg" />
            <div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-white/20 text-purple-200">
                {teacher.department}
              </span>
              <h3 className="text-xl font-black mt-0.5">{teacher.lastName} {teacher.firstName}</h3>
              <p className="text-xs text-purple-200 font-mono">{teacher.employeeId}</p>
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <div className="p-6 space-y-4 text-xs">
          
          <div className="p-3.5 rounded-2xl bg-purple-50/80 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800/60 space-y-1">
            <span className="font-extrabold text-purple-700 dark:text-purple-300 block">កម្រិតវប្បធម៌ / សញ្ញាបត្រ ៖</span>
            <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">{teacher.qualification}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 space-y-1">
              <span className="font-bold text-slate-400 block">លេខទូរស័ព្ទ ៖</span>
              <span className="font-extrabold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-purple-500" /> {teacher.phone}
              </span>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 space-y-1">
              <span className="font-bold text-slate-400 block">អ៊ីមែល ៖</span>
              <span className="font-extrabold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 truncate">
                <Mail className="w-3.5 h-3.5 text-purple-500 shrink-0" /> {teacher.email}
              </span>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 space-y-2">
            <span className="font-bold text-slate-500 block">ថ្នាក់បន្ទុកទទួលខុសត្រូវ (Assigned Classes) ៖</span>
            <div className="flex flex-wrap gap-1.5">
              {teacher.assignedClasses.length === 0 ? (
                <span className="text-slate-400 font-medium">មិនទាន់មានថ្នាក់បន្ទុក</span>
              ) : (
                teacher.assignedClasses.map(ac => (
                  <span key={ac} className="px-2.5 py-1 rounded-xl text-xs font-black bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 border border-purple-300 dark:border-purple-800">
                    {ac}
                  </span>
                ))
              )}
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 space-y-2">
            <span className="font-bold text-slate-500 flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5 text-brand-500" /> មុខវិជ្ជាទទួលបន្ទុកបង្រៀន (Subjects) ៖
            </span>
            <div className="flex flex-wrap gap-1.5">
              {teacher.subjects.map(s => (
                <span key={s} className="px-2 py-0.5 rounded-lg text-xs font-semibold bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200">
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-slate-500">
            <span className="flex items-center gap-1 font-medium">
              <Calendar className="w-3.5 h-3.5 text-slate-400" /> ថ្ងៃចូលបម្រើការងារ៖ {teacher.joiningDate}
            </span>
            <span className="flex items-center gap-1 font-bold text-emerald-500">
              <CheckCircle2 className="w-4 h-4" /> {teacher.status}
            </span>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-2">
          {onEdit && (
            <button
              onClick={() => {
                onClose();
                onEdit();
              }}
              className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs"
            >
              កែប្រែទិន្នន័យ
            </button>
          )}
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-700 font-bold text-xs text-slate-800 dark:text-slate-200"
          >
            បិទ
          </button>
        </div>

      </div>
    </div>
  );
};
