import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import type { TimetableSlot } from '../../types';
import { Calendar, Save, X, CheckCircle2 } from 'lucide-react';

interface TimetableSlotModalProps {
  slotToEdit?: TimetableSlot | null;
  presetData?: Partial<TimetableSlot> | null;
  onClose: () => void;
}

const timeSlotOptions = [
  '07:00 ព្រឹក - 07:45 ព្រឹក (ម៉ោងទី ១)',
  '07:45 ព្រឹក - 08:30 ព្រឹក (ម៉ោងទី ២)',
  '08:45 ព្រឹក - 09:30 ព្រឹក (ម៉ោងទី ៣)',
  '09:30 ព្រឹក - 10:15 ព្រឹក (ម៉ោងទី ៤)',
  '10:30 ព្រឹក - 11:15 ព្រឹក (ម៉ោងទី ៥)',
  '01:00 រសៀល - 02:00 រសៀល',
  '02:00 រសៀល - 03:00 រសៀល',
  '03:15 រសៀល - 04:15 រសៀល'
];

export const TimetableSlotModal: React.FC<TimetableSlotModalProps> = ({ slotToEdit, presetData, onClose }) => {
  const { addTimetableSlot, updateTimetableSlot, classes, subjects, teachers } = useApp();

  const [formData, setFormData] = useState({
    day: slotToEdit?.day || presetData?.day || 'ច័ន្ទ',
    timeSlot: slotToEdit?.timeSlot || presetData?.timeSlot || timeSlotOptions[0],
    subject: slotToEdit?.subject || presetData?.subject || (subjects[0]?.name || 'អំណាន'),
    className: slotToEdit?.className || presetData?.className || (classes[0]?.name || 'ថ្នាក់ទី ១-ក'),
    teacherName: slotToEdit?.teacherName || presetData?.teacherName || (teachers[0] ? `${teachers[0].lastName} ${teachers[0].firstName}` : 'គ្រូបង្រៀន'),
    room: slotToEdit?.room || presetData?.room || (classes[0]?.roomNumber || 'អាគារ ក - បន្ទប់ ០១')
  });

  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Auto-fill room and teacher when class changes
  const handleClassChange = (selectedClassName: string) => {
    const cls = classes.find(c => c.name === selectedClassName);
    const teacher = cls ? teachers.find(t => t.id === cls.classTeacherId) : null;
    setFormData(prev => ({
      ...prev,
      className: selectedClassName,
      room: cls?.roomNumber || prev.room,
      teacherName: teacher ? `${teacher.lastName} ${teacher.firstName}` : prev.teacherName
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (slotToEdit) {
      updateTimetableSlot(slotToEdit.id, formData);
      setToastMsg('បានកែប្រែកាលវិភាគសិក្សាដោយជោគជ័យ!');
    } else {
      addTimetableSlot(formData);
      setToastMsg('បានបន្ថែមកាលវិភាគសិក្សាថ្មីដោយជោគជ័យ!');
    }

    setTimeout(() => {
      setToastMsg(null);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-md p-4 overflow-y-auto font-sans animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-5">
        
        {/* Toast */}
        {toastMsg && (
          <div className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-3 rounded-2xl shadow-lg border border-emerald-400">
            <CheckCircle2 className="w-5 h-5 text-white" />
            <span className="text-xs font-extrabold">{toastMsg}</span>
          </div>
        )}

        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-brand-500/10 text-brand-600 flex items-center justify-center font-bold">
              <Calendar className="w-6 h-6 text-brand-600 dark:text-brand-400" />
            </div>
            <div>
              <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-brand-500/10 text-brand-600 dark:text-brand-400">
                MoEYS 2-2-1 Academic Timetable
              </span>
              <h2 className="text-lg font-black text-slate-900 dark:text-slate-100 mt-0.5">
                {slotToEdit ? 'កែប្រែកាលវិភាគសិក្សា' : 'បន្ថែមកាលវិភាគសិក្សាថ្មី'}
              </h2>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">ថ្ងៃសិក្សា ៖</label>
              <select
                value={formData.day}
                onChange={(e) => setFormData({ ...formData, day: e.target.value as any })}
                className="w-full px-3.5 py-2.5 font-bold bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-brand-500"
              >
                <option value="ច័ន្ទ">ថ្ងៃច័ន្ទ (Monday)</option>
                <option value="អង្គារ">ថ្ងៃអង្គារ (Tuesday)</option>
                <option value="ពុធ">ថ្ងៃពុធ (Wednesday)</option>
                <option value="ព្រហស្បតិ៍">ថ្ងៃព្រហស្បតិ៍ (Thursday)</option>
                <option value="សុក្រ">ថ្ងៃសុក្រ (Friday)</option>
                <option value="សៅរិ៍">ថ្ងៃសៅរិ៍ (Saturday)</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">ម៉ោងសិក្សា (Time Slot) ៖</label>
              <select
                value={formData.timeSlot}
                onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                className="w-full px-3.5 py-2.5 font-bold bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-brand-500"
              >
                {timeSlotOptions.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">ថ្នាក់រៀន (Class) ៖</label>
              <select
                value={formData.className}
                onChange={(e) => handleClassChange(e.target.value)}
                className="w-full px-3.5 py-2.5 font-bold bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-brand-500"
              >
                {classes.map(c => (
                  <option key={c.id} value={c.name}>{c.name} ({c.roomNumber})</option>
                ))}
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">មុខវិជ្ជា (Subject) ៖</label>
              <select
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full px-3.5 py-2.5 font-bold bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-brand-500"
              >
                {subjects.map(s => (
                  <option key={s.id} value={s.name}>{s.name} ({s.department})</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">លោកគ្រូ / អ្នកគ្រូបង្រៀន ៖</label>
            <select
              value={formData.teacherName}
              onChange={(e) => setFormData({ ...formData, teacherName: e.target.value })}
              className="w-full px-3.5 py-2.5 font-bold bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-brand-500"
            >
              {teachers.map(t => {
                const name = `${t.lastName} ${t.firstName}`;
                return (
                  <option key={t.id} value={name}>{name} ({t.employeeId}) - {t.department}</option>
                );
              })}
            </select>
          </div>

          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">បន្ទប់សិក្សា (Room / Building) ៖</label>
            <input
              type="text"
              value={formData.room}
              onChange={(e) => setFormData({ ...formData, room: e.target.value })}
              required
              className="w-full px-3.5 py-2.5 font-bold bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-brand-500"
            />
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
              <Save className="w-4 h-4" /> រក្សាទុកកាលវិភាគ
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};

