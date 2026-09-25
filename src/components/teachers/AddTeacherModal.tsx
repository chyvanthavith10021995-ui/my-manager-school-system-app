import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, GraduationCap } from 'lucide-react';
import { PhotoUploader } from '../common/PhotoUploader';

interface AddTeacherModalProps {
  onClose: () => void;
}

export const AddTeacherModal: React.FC<AddTeacherModalProps> = ({ onClose }) => {
  const { addTeacher } = useApp();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email] = useState('');
  const [avatar, setAvatar] = useState('https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80');
  const [department, setDepartment] = useState('បឋមសិក្សាកម្រិតខ្ពស់ (ថ្នាក់ទី៤-៦)');
  const [teacherCategory, setTeacherCategory] = useState<'គ្រូក្របខ័ណ្ឌ' | 'គ្រូកិច្ចសន្យា' | 'គ្រូផ្អែកលើកិច្ចព្រមព្រៀង'>('គ្រូក្របខ័ណ្ឌ');
  const [qualification, setQualification] = useState('បរិញ្ញាបត្រគរុកោសល្យ');
  const [phone, setPhone] = useState('012 333 888');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTeacher({
      firstName,
      lastName,
      email: email || `${lastName.toLowerCase()}.${firstName.toLowerCase()}@angkorprimary.edu.kh`,
      avatar: avatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80',
      phone,
      teacherCategory,
      department,
      qualification,
      subjects: ['ភាសាខ្មែរ', 'គណិតវិទ្យា'],
      assignedClasses: ['ថ្នាក់ទី ៤-ក'],
      joiningDate: new Date().toISOString().split('T')[0],
      status: 'បម្រើការងារ'
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4 font-sans">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl p-6 relative max-h-[92vh] flex flex-col">
        <button onClick={onClose} className="absolute right-4 top-4 text-slate-400 hover:text-slate-600">
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-4 shrink-0">
          <GraduationCap className="w-5 h-5 text-purple-500" />
          <h3 className="text-lg font-extrabold text-slate-900 dark:text-slate-100">បន្ថែមលោកគ្រូ អ្នកគ្រូបង្រៀន</h3>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs overflow-y-auto pr-1 flex-1">
          <PhotoUploader
            value={avatar}
            onChange={setAvatar}
            label="រូបថតគ្រូបង្រៀន (Teacher Photo)"
            placeholderName={`${lastName} ${firstName}`}
          />
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">គោត្តនាម</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="ឧ. លោកគ្រូ ស៊ុន"
                className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-medium"
                required
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">នាម</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="ឧ. ដារ៉ា"
                className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-medium"
                required
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">ប្រភេទគ្រូបង្រៀន (Teacher Category) ៖</label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setTeacherCategory('គ្រូក្របខ័ណ្ឌ')}
                className={`py-2 px-1.5 rounded-xl border text-[11px] font-extrabold transition-all ${
                  teacherCategory === 'គ្រូក្របខ័ណ្ឌ'
                    ? 'bg-purple-600 text-white border-purple-600 shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
                }`}
              >
                🏛️ គ្រូក្របខ័ណ្ឌ
              </button>
              <button
                type="button"
                onClick={() => setTeacherCategory('គ្រូកិច្ចសន្យា')}
                className={`py-2 px-1.5 rounded-xl border text-[11px] font-extrabold transition-all ${
                  teacherCategory === 'គ្រូកិច្ចសន្យា'
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
                }`}
              >
                📝 គ្រូកិច្ចសន្យា
              </button>
              <button
                type="button"
                onClick={() => setTeacherCategory('គ្រូផ្អែកលើកិច្ចព្រមព្រៀង')}
                className={`py-2 px-1.5 rounded-xl border text-[11px] font-extrabold transition-all ${
                  teacherCategory === 'គ្រូផ្អែកលើកិច្ចព្រមព្រៀង'
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
                }`}
              >
                🤝 ផ្អែកលើកិច្ចព្រមព្រៀង
              </button>
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">ផ្នែកកម្រិតបង្រៀន</label>
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-medium"
            >
              <option value="បឋមសិក្សាកម្រិតទាប (ថ្នាក់ទី១-៣)">បឋមសិក្សាកម្រិតទាប (ថ្នាក់ទី១-៣)</option>
              <option value="បឋមសិក្សាកម្រិតខ្ពស់ (ថ្នាក់ទី៤-៦)">បឋមសិក្សាកម្រិតខ្ពស់ (ថ្នាក់ទី៤-៦)</option>
              <option value="ផ្នែកភាសាបរទេស និងកីឡា">ផ្នែកភាសាបរទេស និងកីឡា</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">កម្រិតវុឌ្ឍិសិក្សា</label>
              <input
                type="text"
                value={qualification}
                onChange={(e) => setQualification(e.target.value)}
                className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-medium"
                required
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">លេខទូរស័ព្ទ</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-medium"
                required
              />
            </div>
          </div>

          <div className="pt-4 flex items-center justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 font-bold">
              បោះបង់
            </button>
            <button type="submit" className="px-4 py-2 rounded-xl bg-purple-600 text-white font-bold">
              បន្ថែមគ្រូបង្រៀន
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
