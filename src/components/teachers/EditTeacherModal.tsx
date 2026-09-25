import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import type { Teacher } from '../../types';
import { GraduationCap, Save, X, CheckCircle2 } from 'lucide-react';
import { PhotoUploader } from '../common/PhotoUploader';

interface EditTeacherModalProps {
  teacher: Teacher;
  onClose: () => void;
}

const availableSubjectsList = [
  'អំណាន',
  'ការស្ដាប់',
  'សរសេរតាមអាន',
  'តែងសេចក្ដី',
  'គណិតវិទ្យា',
  'វិទ្យាសាស្ត្រ',
  'សីលធម៌',
  'ភូមិវិទ្យា',
  'ប្រវត្តិវិទ្យា',
  'គេហវិទ្យា',
  'អប់រំកាយ',
  'អប់រំបំណិនជីវិត',
  'ភាសាបរទេស'
];

const availableClassesList = [
  'ថ្នាក់ទី ១-ក', 'ថ្នាក់ទី ១-ខ',
  'ថ្នាក់ទី ២-ក', 'ថ្នាក់ទី ២-ខ',
  'ថ្នាក់ទី ៣-ក', 'ថ្នាក់ទី ៣-ខ',
  'ថ្នាក់ទី ៤-ក', 'ថ្នាក់ទី ៤-ខ',
  'ថ្នាក់ទី ៥-ក', 'ថ្នាក់ទី ៥-ខ',
  'ថ្នាក់ទី ៦-ក', 'ថ្នាក់ទី ៦-ខ'
];

export const EditTeacherModal: React.FC<EditTeacherModalProps> = ({ teacher, onClose }) => {
  const { updateTeacher } = useApp();
  const [formData, setFormData] = useState<Teacher>({ ...teacher });
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const toggleSubject = (sub: string) => {
    const exists = formData.subjects.includes(sub);
    const updated = exists
      ? formData.subjects.filter(s => s !== sub)
      : [...formData.subjects, sub];
    setFormData({ ...formData, subjects: updated });
  };

  const toggleClass = (clsName: string) => {
    const exists = formData.assignedClasses.includes(clsName);
    const updated = exists
      ? formData.assignedClasses.filter(c => c !== clsName)
      : [...formData.assignedClasses, clsName];
    setFormData({ ...formData, assignedClasses: updated });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateTeacher(teacher.id, formData);
    setToastMsg(`បានបច្ចុប្បន្នភាពព័ត៌មានលោកគ្រូ/អ្នកគ្រូ ${formData.lastName} ${formData.firstName} ដោយជោគជ័យ!`);
    setTimeout(() => {
      setToastMsg(null);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-md p-4 overflow-y-auto font-sans">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-5 max-h-[92vh] flex flex-col">
        
        {/* Toast */}
        {toastMsg && (
          <div className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-3 rounded-2xl shadow-lg border border-emerald-400">
            <CheckCircle2 className="w-5 h-5 text-white" />
            <span className="text-xs font-extrabold">{toastMsg}</span>
          </div>
        )}

        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-purple-500/10 text-purple-600 flex items-center justify-center font-bold">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-purple-500/10 text-purple-600 dark:text-purple-400">
                MoEYS Faculty Profile Editor
              </span>
              <h2 className="text-lg font-black text-slate-900 dark:text-slate-100 mt-0.5">
                កែប្រែទិន្នន័យគ្រូបង្រៀន ៖ {teacher.lastName} {teacher.firstName} ({teacher.employeeId})
              </h2>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto space-y-4 pr-1 text-xs">
          
          {/* Personal & Employee Info */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 space-y-3">
            <h3 className="font-extrabold text-sm text-slate-800 dark:text-slate-200 border-b border-slate-200 dark:border-slate-700 pb-2">
              ១. ព័ត៌មានផ្ទាល់ខ្លួន & រូបថតគ្រូបង្រៀន
            </h3>

            <PhotoUploader
              value={formData.avatar}
              onChange={(newAvatar) => setFormData({ ...formData, avatar: newAvatar })}
              label="រូបថតគ្រូបង្រៀន (Teacher Photo)"
              placeholderName={`${formData.lastName} ${formData.firstName}`}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">គោត្តនាម (ត្រកូល) ៖</label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  required
                  className="w-full px-3.5 py-2 font-bold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">នាម (ឈ្មោះ) ៖</label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  required
                  className="w-full px-3.5 py-2 font-bold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">អត្តលេខបុគ្គលិក ៖</label>
                <input
                  type="text"
                  value={formData.employeeId}
                  onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
                  required
                  className="w-full px-3 py-2 font-mono font-bold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">លេខទូរស័ព្ទ ៖</label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                  className="w-full px-3 py-2 font-bold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">អ៊ីមែល ៖</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full px-3 py-2 font-bold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">ប្រភេទគ្រូបង្រៀន (Teacher Category) ៖</label>
                <select
                  value={formData.teacherCategory || 'គ្រូក្របខ័ណ្ឌ'}
                  onChange={(e) => setFormData({ ...formData, teacherCategory: e.target.value as any })}
                  className="w-full px-3 py-2 font-extrabold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-purple-700 dark:text-purple-300"
                >
                  <option value="គ្រូក្របខ័ណ្ឌ">🏛️ គ្រូក្របខ័ណ្ឌ (Civil Servant Teacher)</option>
                  <option value="គ្រូកិច្ចសន្យា">📝 គ្រូកិច្ចសន្យា (Contract Teacher)</option>
                  <option value="គ្រូផ្អែកលើកិច្ចព្រមព្រៀង">🤝 គ្រូផ្អែកលើកិច្ចព្រមព្រៀង (Agreement Teacher)</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">កម្រិតផ្នែក/ជំនាញ (Department) ៖</label>
                <select
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  className="w-full px-3 py-2 font-bold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100"
                >
                  <option value="បឋមសិក្សាកម្រិតទាប (ថ្នាក់ទី១-៣)">បឋមសិក្សាកម្រិតទាប (ថ្នាក់ទី១-៣)</option>
                  <option value="បឋមសិក្សាកម្រិតខ្ពស់ (ថ្នាក់ទី៤-៦)">បឋមសិក្សាកម្រិតខ្ពស់ (ថ្នាក់ទី៤-៦)</option>
                  <option value="រដ្ឋបាល និងកីឡា">រដ្ឋបាល និងកីឡា</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">កម្រិតវប្បធម៌ / សញ្ញាបត្រ ៖</label>
                <input
                  type="text"
                  value={formData.qualification}
                  onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                  required
                  className="w-full px-3.5 py-2 font-bold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">ស្ថានភាពការងារ ៖</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                  className="w-full px-3 py-2 font-bold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100"
                >
                  <option value="បម្រើការងារ">បម្រើការងារ (Active Duty)</option>
                  <option value="ច្បាប់ឈប់សម្រាក">ច្បាប់ឈប់សម្រាក (On Leave)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Homeroom Assigned Classes */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 space-y-2">
            <h3 className="font-extrabold text-sm text-slate-800 dark:text-slate-200 border-b border-slate-200 dark:border-slate-700 pb-2">
              ២. ចាត់តាំងថ្នាក់បន្ទុក (Assigned Classes)
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
              {availableClassesList.map(clsName => {
                const checked = formData.assignedClasses.includes(clsName);
                return (
                  <label
                    key={clsName}
                    onClick={() => toggleClass(clsName)}
                    className={`flex items-center gap-2 p-2 rounded-xl border cursor-pointer font-bold text-xs transition-all ${
                      checked
                        ? 'bg-purple-500/10 border-purple-500/40 text-purple-700 dark:text-purple-300 shadow-sm'
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    <input type="checkbox" checked={checked} onChange={() => {}} className="rounded text-purple-600 focus:ring-purple-500" />
                    <span>{clsName}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Subjects Assignment */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 space-y-2">
            <h3 className="font-extrabold text-sm text-slate-800 dark:text-slate-200 border-b border-slate-200 dark:border-slate-700 pb-2">
              ៣. មុខវិជ្ជាទទួលបន្ទុកបង្រៀន (Teaching Subjects)
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
              {availableSubjectsList.map(sub => {
                const checked = formData.subjects.includes(sub);
                return (
                  <label
                    key={sub}
                    onClick={() => toggleSubject(sub)}
                    className={`flex items-center gap-2 p-2 rounded-xl border cursor-pointer font-bold text-xs transition-all ${
                      checked
                        ? 'bg-brand-500/10 border-brand-500/40 text-brand-700 dark:text-brand-300 shadow-sm'
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    <input type="checkbox" checked={checked} onChange={() => {}} className="rounded text-brand-600 focus:ring-brand-500" />
                    <span>{sub}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Form Actions */}
          <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
            >
              បោះបង់
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-black bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md hover:from-purple-500 hover:to-indigo-500"
            >
              <Save className="w-4 h-4" /> រក្សាទុកការកែប្រែ
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
