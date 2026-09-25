import React, { useState } from 'react';
import type { EquityCardStatus } from '../../types';
import { useApp } from '../../context/AppContext';
import { X, UserPlus } from 'lucide-react';
import { PhotoUploader } from '../common/PhotoUploader';

interface AddStudentModalProps {
  onClose: () => void;
}

export const AddStudentModal: React.FC<AddStudentModalProps> = ({ onClose }) => {
  const { addStudent } = useApp();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=250&q=80');
  const [grade, setGrade] = useState('ថ្នាក់ទី ១');
  const [section, setSection] = useState('ក');
  const [gender, setGender] = useState<'ស្រី' | 'ប្រុស'>('ស្រី');
  const [dob, setDob] = useState('2019-04-14');
  const [equityCard, setEquityCard] = useState<EquityCardStatus>('គ្មាន (None)');
  const [address, setAddress] = useState('ភូមិអន្លង់តាម៉ី, ឃុំកន្សែង, ស្រុកបាណន់, ខេត្តបាត់ដំបង');
  const [guardianName, setGuardianName] = useState('');
  const [guardianPhone, setGuardianPhone] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addStudent({
      firstName,
      lastName,
      email: email || `${lastName.toLowerCase()}.${firstName.toLowerCase()}@anlongtamey.edu.kh`,
      avatar: avatar || 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=250&q=80',
      grade,
      section,
      gender,
      dob,
      enrollmentDate: new Date().toISOString().split('T')[0],
      guardian: {
        name: guardianName || 'អាណាព្យាបាលសិស្ស',
        relationship: 'ឪពុក',
        phone: guardianPhone || '012 999 888',
        email: 'guardian@gmail.com',
        occupation: 'កសិករ'
      },
      address,
      equityCard,
      status: 'កំពុងសិក្សា'
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4 font-sans">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl p-6 relative max-h-[92vh] flex flex-col">
        <button onClick={onClose} className="absolute right-4 top-4 text-slate-400 hover:text-slate-600">
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-4 shrink-0">
          <UserPlus className="w-5 h-5 text-brand-500" />
          <h3 className="text-lg font-extrabold text-slate-900 dark:text-slate-100">ចុះឈ្មោះសិស្សបឋមសិក្សាថ្មី (អន្លង់តាម៉ី)</h3>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs overflow-y-auto pr-1 flex-1">
          
          {/* Photo Uploader */}
          <PhotoUploader
            value={avatar}
            onChange={setAvatar}
            label="រូបថតសិស្ស (Student Photo)"
            placeholderName={`${lastName} ${firstName}`}
          />
          
          {/* Name fields */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">គោត្តនាម (ត្រកូល)</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="ឧ. ឡុង"
                className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-medium"
                required
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">នាម (ឈ្មោះ)</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="ឧ. សុវណ្ណារ៉ា"
                className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-medium"
                required
              />
            </div>
          </div>

          {/* Email field */}
          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">អ៊ីមែល (បើមាន)</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ប្រព័ន្ធនឹងបង្កើតអូតូ បើទុកទទេ"
              className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-medium"
            />
          </div>

          {/* DOB & Gender */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">ថ្ងៃខែឆ្នាំកំណើត (DOB)</label>
              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-medium text-slate-900 dark:text-slate-100"
                required
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">ភេទ</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value as any)}
                className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-medium"
              >
                <option value="ស្រី">ស្រី</option>
                <option value="ប្រុស">ប្រុស</option>
              </select>
            </div>
          </div>

          {/* Grade, Section, and Equity Card */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">ថ្នាក់ទី</label>
              <select
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-medium"
              >
                <option value="ថ្នាក់មត្តេយ្យទាប">ថ្នាក់មត្តេយ្យទាប (Lower Preschool)</option>
                <option value="ថ្នាក់មត្តេយ្យមធ្យម">ថ្នាក់មត្តេយ្យមធ្យម (Middle Preschool)</option>
                <option value="ថ្នាក់មត្តេយ្យខ្ពស់">ថ្នាក់មត្តេយ្យខ្ពស់ (High Preschool)</option>
                <option value="ថ្នាក់ទី ១">ថ្នាក់ទី ១</option>
                <option value="ថ្នាក់ទី ២">ថ្នាក់ទី ២</option>
                <option value="ថ្នាក់ទី ៣">ថ្នាក់ទី ៣</option>
                <option value="ថ្នាក់ទី ៤">ថ្នាក់ទី ៤</option>
                <option value="ថ្នាក់ទី ៥">ថ្នាក់ទី ៥</option>
                <option value="ថ្នាក់ទី ៦">ថ្នាក់ទី ៦</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">បន្ទប់ / កម្រិត</label>
              <select
                value={section}
                onChange={(e) => setSection(e.target.value)}
                className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-medium"
              >
                <option value="ក">ក</option>
                <option value="ខ">ខ</option>
                <option value="គ">គ</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">បណ្ណសមធម៌ (IDPoor)</label>
              <select
                value={equityCard}
                onChange={(e) => setEquityCard(e.target.value as EquityCardStatus)}
                className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-bold text-amber-600 dark:text-amber-400"
              >
                <option value="គ្មាន (None)">គ្មាន (None)</option>
                <option value="ក្រ១ (IDPoor 1)">ក្រ១ (IDPoor 1)</option>
                <option value="ក្រ២ (IDPoor 2)">ក្រ២ (IDPoor 2)</option>
              </select>
            </div>
          </div>

          {/* Current Address */}
          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">អាស័យដ្ឋានបច្ចុប្បន្ន</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="ភូមិអន្លង់តាម៉ី, ឃុំកន្សែង, ស្រុកបាណន់, ខេត្តបាត់ដំបង"
              className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-medium"
              required
            />
          </div>

          {/* Guardian Info */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">ឈ្មោះអាណាព្យាបាល</label>
              <input
                type="text"
                value={guardianName}
                onChange={(e) => setGuardianName(e.target.value)}
                placeholder="ឧ. ឡុង សុខា"
                className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-medium"
                required
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">លេខទូរស័ព្ទអាណាព្យាបាល</label>
              <input
                type="text"
                value={guardianPhone}
                onChange={(e) => setGuardianPhone(e.target.value)}
                placeholder="ឧ. 012 888 111"
                className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-medium"
                required
              />
            </div>
          </div>

          {/* Actions */}
          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end gap-2">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 font-bold">
              បោះបង់
            </button>
            <button type="submit" className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold shadow-md">
              បញ្ជាក់ការចុះឈ្មោះសិស្ស
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
