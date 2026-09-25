import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  GraduationCap,
  Shield,
  UserCheck,
  Users,
  X,
  CheckCircle2,
  LogIn,
  KeyRound,
  Building2
} from 'lucide-react';

interface QuickLoginModalProps {
  onClose: () => void;
}

export const QuickLoginModal: React.FC<QuickLoginModalProps> = ({ onClose }) => {
  const { teachers, setUserRole, schoolInfo } = useApp();
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const handleLoginAsTeacher = (teacherName: string) => {
    setUserRole('teacher');
    setToastMsg(`បានចូលប្រព័ន្ធជោគជ័យជា៖ ${teacherName}!`);
    setTimeout(() => {
      setToastMsg(null);
      onClose();
    }, 1000);
  };

  const handleLoginAsRole = (role: 'admin' | 'student' | 'parent', title: string) => {
    setUserRole(role);
    setToastMsg(`បានចូលប្រព័ន្ធជោគជ័យជា៖ ${title}!`);
    setTimeout(() => {
      setToastMsg(null);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 overflow-y-auto font-sans animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-6">
        
        {/* Toast Notification */}
        {toastMsg && (
          <div className="flex items-center gap-2 bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-lg border border-emerald-400">
            <CheckCircle2 className="w-5 h-5 text-white shrink-0" />
            <span className="text-xs font-black">{toastMsg}</span>
          </div>
        )}

        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-600 to-indigo-600 text-white flex items-center justify-center font-bold shadow-lg shadow-brand-500/20">
              <KeyRound className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-brand-500/10 text-brand-600 dark:text-brand-400 border border-brand-500/20">
                  MoEYS Official Quick Login
                </span>
                <span className="text-xs text-slate-400">សាលារដ្ឋ</span>
              </div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-slate-100 mt-0.5">
                ទម្រង់ចូលប្រព័ន្ធរហ័ស (Quick Login Portal)
              </h2>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* School Info Banner */}
        <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Building2 className="w-8 h-8 text-brand-500 shrink-0" />
            <div>
              <h3 className="text-xs font-black text-slate-900 dark:text-slate-100">{schoolInfo.schoolName}</h3>
              <p className="text-[11px] text-slate-500">កូដសាលារៀន ៖ {schoolInfo.schoolCode} • ឆ្នាំសិក្សា {schoolInfo.academicYear}</p>
            </div>
          </div>
        </div>

        {/* Option 1: Teachers Selector */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-brand-600 dark:text-brand-400 flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4" /> សម្រាប់លោកគ្រូ អ្នកគ្រូបង្រៀន (Teachers Roster)
            </h4>
            <span className="text-[11px] text-slate-400 font-medium">ចុចលើឈ្មោះដើម្បីចូលបំពេញពិន្ទុ</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-56 overflow-y-auto pr-1">
            {teachers.map(t => {
              const teacherFullName = `${t.lastName} ${t.firstName}`;
              const assigned = t.assignedClasses.join(', ') || 'គ្រូឯកទេស';
              return (
                <button
                  key={t.id}
                  onClick={() => handleLoginAsTeacher(teacherFullName)}
                  className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 hover:bg-brand-50/80 dark:hover:bg-brand-950/40 border border-slate-200 dark:border-slate-800 hover:border-brand-500/50 flex items-center justify-between text-left transition-all group"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <img src={t.avatar} alt={t.firstName} className="w-9 h-9 rounded-full object-cover ring-2 ring-brand-500/30 shrink-0" />
                    <div className="truncate">
                      <p className="font-extrabold text-xs text-slate-900 dark:text-slate-100 group-hover:text-brand-600 dark:group-hover:text-brand-400 truncate">
                        {teacherFullName}
                      </p>
                      <p className="text-[10px] text-slate-500 truncate">{assigned} • {t.employeeId}</p>
                    </div>
                  </div>
                  <LogIn className="w-4 h-4 text-slate-400 group-hover:text-brand-500 shrink-0 ml-2" />
                </button>
              );
            })}
          </div>
        </div>

        {/* Option 2: Executive Roles (Principal, Student, Parent) */}
        <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            តួនាទីផ្សេងទៀត (Other System Roles)
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <button
              onClick={() => handleLoginAsRole('admin', schoolInfo.principalName || 'លោកនាយកសាលា')}
              className="p-3 rounded-2xl bg-purple-500/10 hover:bg-purple-500/20 text-purple-700 dark:text-purple-300 border border-purple-500/20 font-bold text-xs flex items-center justify-center gap-2 transition-all"
            >
              <Shield className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <span>នាយកសាលា</span>
            </button>

            <button
              onClick={() => handleLoginAsRole('student', 'សិស្សានុសិស្ស')}
              className="p-3 rounded-2xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20 font-bold text-xs flex items-center justify-center gap-2 transition-all"
            >
              <UserCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>សិស្សានុសិស្ស</span>
            </button>

            <button
              onClick={() => handleLoginAsRole('parent', 'មាតាបិតាសិស្ស')}
              className="p-3 rounded-2xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/20 font-bold text-xs flex items-center justify-center gap-2 transition-all"
            >
              <Users className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span>មាតាបិតាសិស្ស</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
