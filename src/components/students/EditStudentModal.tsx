import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import type { Student, EquityCardStatus, StudentStatus } from '../../types';
import { UserCheck, Save, X, CheckCircle2 } from 'lucide-react';
import { PhotoUploader } from '../common/PhotoUploader';

interface EditStudentModalProps {
  student: Student;
  onClose: () => void;
}

export const EditStudentModal: React.FC<EditStudentModalProps> = ({ student, onClose }) => {
  const { updateStudent } = useApp();
  const [formData, setFormData] = useState<Student>({ ...student });
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateStudent(student.id, formData);
    setToastMsg(`បានបច្ចុប្បន្នភាពព័ត៌មានសិស្ស ${formData.lastName} ${formData.firstName} ដោយជោគជ័យ!`);
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
            <div className="w-11 h-11 rounded-2xl bg-brand-500/10 text-brand-600 flex items-center justify-center font-bold">
              <UserCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-brand-500/10 text-brand-600 dark:text-brand-400">
                MoEYS Student Profile Editor
              </span>
              <h2 className="text-lg font-black text-slate-900 dark:text-slate-100 mt-0.5">
                កែប្រែទិន្នន័យសិស្ស ៖ {student.lastName} {student.firstName} ({student.studentId})
              </h2>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto space-y-4 pr-1 text-xs">
          
          {/* Section 1: Personal Info */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 space-y-3">
            <h3 className="font-extrabold text-sm text-slate-800 dark:text-slate-200 border-b border-slate-200 dark:border-slate-700 pb-2">
              ១. ព័ត៌មានផ្ទាល់ខ្លួនសិស្ស & រូបថត
            </h3>

            <PhotoUploader
              value={formData.avatar}
              onChange={(newAvatar) => setFormData({ ...formData, avatar: newAvatar })}
              label="រូបថតសិស្ស (Student Photo)"
              placeholderName={`${formData.lastName} ${formData.firstName}`}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">ត្រកូល (គោត្តនាម) ៖</label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  required
                  className="w-full px-3.5 py-2 font-bold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">ឈ្មោះ (នាម) ៖</label>
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
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">ភេទ ៖</label>
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })}
                  className="w-full px-3 py-2 font-bold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100"
                >
                  <option value="ស្រី">ស្រី (Female)</option>
                  <option value="ប្រុស">ប្រុស (Male)</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">ថ្ងៃខែឆ្នាំកំណើត ៖</label>
                <input
                  type="date"
                  value={formData.dob}
                  onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                  required
                  className="w-full px-3 py-2 font-bold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">អត្តលេខសិស្ស ៖</label>
                <input
                  type="text"
                  value={formData.studentId}
                  onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                  required
                  className="w-full px-3 py-2 font-mono font-bold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Class & Placement */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 space-y-3">
            <h3 className="font-extrabold text-sm text-slate-800 dark:text-slate-200 border-b border-slate-200 dark:border-slate-700 pb-2">
              ២. ថ្នាក់រៀន, ស្ថានភាព & បណ្ណសមធម៌
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">កម្រិតថ្នាក់ (មត្តេយ្យ - ថ្នាក់ទី៦) ៖</label>
                <select
                  value={formData.grade}
                  onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                  className="w-full px-3 py-2 font-bold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100"
                >
                  <option value="ថ្នាក់មត្តេយ្យទាប">ថ្នាក់មត្តេយ្យទាប (Lower Preschool)</option>
                  <option value="ថ្នាក់មត្តេយ្យមធ្យម">ថ្នាក់មត្តេយ្យមធ្យម (Middle Preschool)</option>
                  <option value="ថ្នាក់មត្តេយ្យខ្ពស់">ថ្នាក់មត្តេយ្យខ្ពស់ (High Preschool)</option>
                  <option value="ថ្នាក់ទី ១">ថ្នាក់ទី ១ (Grade 1)</option>
                  <option value="ថ្នាក់ទី ២">ថ្នាក់ទី ២ (Grade 2)</option>
                  <option value="ថ្នាក់ទី ៣">ថ្នាក់ទី ៣ (Grade 3)</option>
                  <option value="ថ្នាក់ទី ៤">ថ្នាក់ទី ៤ (Grade 4)</option>
                  <option value="ថ្នាក់ទី ៥">ថ្នាក់ទី ៥ (Grade 5)</option>
                  <option value="ថ្នាក់ទី ៦">ថ្នាក់ទី ៦ (Grade 6)</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">បន្ទប់ / ក្រុម (Section) ៖</label>
                <select
                  value={formData.section}
                  onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                  className="w-full px-3 py-2 font-bold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100"
                >
                  <option value="ក">បន្ទប់ ក (Section A)</option>
                  <option value="ខ">បន្ទប់ ខ (Section B)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">បណ្ណសមធម៌ (IDPoor) ៖</label>
                <select
                  value={formData.equityCard}
                  onChange={(e) => setFormData({ ...formData, equityCard: e.target.value as EquityCardStatus })}
                  className="w-full px-3 py-2 font-bold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100"
                >
                  <option value="ក្រ១ (IDPoor 1)">ក្រ១ (IDPoor 1 - ក្រីក្រខ្លាំង)</option>
                  <option value="ក្រ២ (IDPoor 2)">ក្រ២ (IDPoor 2 - ក្រីក្រមធ្យម)</option>
                  <option value="គ្មាន (None)">គ្មាន (None)</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">ស្ថានភាពសិក្សា ៖</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as StudentStatus })}
                  className="w-full px-3 py-2 font-bold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100"
                >
                  <option value="កំពុងសិក្សា">កំពុងសិក្សា (Enrolled)</option>
                  <option value="ផ្ទេសិស្សចេញ">ផ្ទេសិស្សចេញ (Transferred Out)</option>
                  <option value="ផ្ទេសិស្សចូល">ផ្ទេសិស្សចូល (Transferred In)</option>
                  <option value="ព្យួរការសិក្សា">ព្យួរការសិក្សា (Suspended)</option>
                  <option value="បញ្ចប់ការសិក្សា">បញ្ចប់ការសិក្សា (Graduated)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">អាស័យដ្ឋានបច្ចុប្បន្ន ៖</label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                required
                className="w-full px-3.5 py-2 font-bold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100"
              />
            </div>
          </div>

          {/* Section 3: Guardian */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 space-y-3">
            <h3 className="font-extrabold text-sm text-slate-800 dark:text-slate-200 border-b border-slate-200 dark:border-slate-700 pb-2">
              ៣. ព័ត៌មានអាណាព្យាបាលសិស្ស
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">ឈ្មោះអាណាព្យាបាល ៖</label>
                <input
                  type="text"
                  value={formData.guardian.name}
                  onChange={(e) => setFormData({ ...formData, guardian: { ...formData.guardian, name: e.target.value } })}
                  required
                  className="w-full px-3.5 py-2 font-bold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">ត្រូវជា (ទំនាក់ទំនង) ៖</label>
                <input
                  type="text"
                  value={formData.guardian.relationship}
                  onChange={(e) => setFormData({ ...formData, guardian: { ...formData.guardian, relationship: e.target.value } })}
                  required
                  className="w-full px-3.5 py-2 font-bold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">លេខទូរស័ព្ទអាណាព្យាបាល ៖</label>
                <input
                  type="text"
                  value={formData.guardian.phone}
                  onChange={(e) => setFormData({ ...formData, guardian: { ...formData.guardian, phone: e.target.value } })}
                  required
                  className="w-full px-3.5 py-2 font-bold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">មុខរបរ ៖</label>
                <input
                  type="text"
                  value={formData.guardian.occupation || ''}
                  onChange={(e) => setFormData({ ...formData, guardian: { ...formData.guardian, occupation: e.target.value } })}
                  className="w-full px-3.5 py-2 font-bold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100"
                />
              </div>
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
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-black bg-gradient-to-r from-brand-600 to-indigo-600 text-white shadow-md hover:from-brand-500 hover:to-indigo-500"
            >
              <Save className="w-4 h-4" /> រក្សាទុកការកែប្រែ
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
