import React, { useState } from 'react';
import type { EquityCardStatus } from '../../types';
import { useApp } from '../../context/AppContext';
import { X, UserPlus, User, ShieldCheck, PhoneCall, GraduationCap, AlertCircle } from 'lucide-react';
import { PhotoUploader } from '../common/PhotoUploader';
import { ConfirmationModal } from '../common/ConfirmationModal';

interface AddStudentModalProps {
  onClose: () => void;
}

export const AddStudentModal: React.FC<AddStudentModalProps> = ({ onClose }) => {
  const { addStudent, logActivity } = useApp();

  // Active form section tab
  const [activeTab, setActiveTab] = useState<'personal' | 'guardian' | 'academic'>('personal');

  // Form State
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=250&q=80');
  const [grade, setGrade] = useState('ថ្នាក់ទី ១');
  const [section, setSection] = useState('ក');
  const [gender, setGender] = useState<'ស្រី' | 'ប្រុស'>('ស្រី');
  const [dob, setDob] = useState('2019-04-14');
  const [equityCard, setEquityCard] = useState<EquityCardStatus>('គ្មាន (None)');
  const [address, setAddress] = useState('ភូមិអន្លង់តាម៉ី, ឃុំឈើទាល, ស្រុកបាណន់, ខេត្តបាត់ដំបង');
  
  // Guardian State
  const [guardianName, setGuardianName] = useState('');
  const [guardianRelationship, setGuardianRelationship] = useState('ឪពុក');
  const [guardianPhone, setGuardianPhone] = useState('');
  const [guardianEmail, setGuardianEmail] = useState('guardian@gmail.com');
  const [guardianOccupation, setGuardianOccupation] = useState('កសិករ');

  // Validation Errors
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // Validate form fields strictly
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!lastName.trim()) newErrors.lastName = 'សូមបញ្ចូលត្រកូល/គោត្តនាមសិស្ស';
    if (!firstName.trim()) newErrors.firstName = 'សូមបញ្ចូលឈ្មោះ/នាមសិស្ស';
    if (!dob) newErrors.dob = 'សូមជ្រើសរើសថ្ងៃខែឆ្នាំកំណើត';

    // Email validation if provided
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'ទម្រង់អ៊ីមែលមិនត្រឹមត្រូវទេ (ឧ. example@gmail.com)';
    }

    // Guardian Name
    if (!guardianName.trim()) newErrors.guardianName = 'សូមបញ្ចូលឈ្មោះអាណាព្យាបាល';

    // Guardian Phone number validation (Cambodian format 9-10 digits, e.g., 012 345 678)
    const cleanedPhone = guardianPhone.replace(/\s+/g, '');
    if (!cleanedPhone) {
      newErrors.guardianPhone = 'សូមបញ្ចូលលេខទូរស័ព្ទអាណាព្យាបាល';
    } else if (!/^(0[1-9][0-9]{7,8})$/.test(cleanedPhone)) {
      newErrors.guardianPhone = 'លេខទូរស័ព្ទត្រូវតែជាលេខ (៩ ដល់ ១០ ខ្ទង់ ឧ. 012888111)';
    }

    if (guardianEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(guardianEmail)) {
      newErrors.guardianEmail = 'ទម្រង់អ៊ីមែលអាណាព្យាបាលមិនត្រឹមត្រូវទេ';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      // Direct user to tab with first error
      if (errors.lastName || errors.firstName || errors.dob || errors.email) {
        setActiveTab('personal');
      } else if (errors.guardianName || errors.guardianPhone || errors.guardianEmail) {
        setActiveTab('guardian');
      }
      return;
    }

    setShowConfirmModal(true);
  };

  const handleConfirmSave = () => {
    addStudent({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim() || `${lastName.toLowerCase()}.${firstName.toLowerCase()}@anlongtamey.edu.kh`,
      avatar: avatar || 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=250&q=80',
      grade,
      section,
      gender,
      dob,
      enrollmentDate: new Date().toISOString().split('T')[0],
      guardian: {
        name: guardianName.trim(),
        relationship: guardianRelationship,
        phone: guardianPhone.trim(),
        email: guardianEmail.trim() || 'guardian@gmail.com',
        occupation: guardianOccupation.trim() || 'កសិករ'
      },
      address: address.trim(),
      equityCard,
      status: 'កំពុងសិក្សា'
    });

    logActivity(
      'បង្កើត (Create)',
      `សិស្ស ${lastName} ${firstName}`,
      `បានចុះឈ្មោះសិស្សថ្មីចូល ${grade} (${section}) និងផ្ទៀងផ្ទាត់ទិន្នន័យ Form`
    );

    setShowConfirmModal(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4 font-sans animate-fade-in">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl p-6 relative max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center text-brand-500">
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-slate-100">
                ចុះឈ្មោះសិស្សបឋមសិក្សាថ្មី (អន្លង់តាម៉ី)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                ទម្រង់បញ្ចូលទិន្នន័យបែងចែកជាកញ្ចប់តូចៗ ដើម្បីកាត់បន្ថយការភាន់ច្រឡំ
              </p>
            </div>
          </div>

          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Multi-Step Section Tabs */}
        <div className="flex items-center gap-2 my-4 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-2xl shrink-0 text-xs font-bold">
          <button
            type="button"
            onClick={() => setActiveTab('personal')}
            className={`flex-1 py-2 px-3 rounded-xl transition flex items-center justify-center gap-1.5 ${
              activeTab === 'personal'
                ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
            }`}
          >
            <User className="w-4 h-4" />
            <span>១. ព័ត៌មានផ្ទាល់ខ្លួន</span>
            {(errors.lastName || errors.firstName || errors.dob) && (
              <span className="w-2 h-2 rounded-full bg-rose-500" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('guardian')}
            className={`flex-1 py-2 px-3 rounded-xl transition flex items-center justify-center gap-1.5 ${
              activeTab === 'guardian'
                ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
            }`}
          >
            <PhoneCall className="w-4 h-4" />
            <span>២. ព័ត៌មានអាណាព្យាបាល</span>
            {(errors.guardianName || errors.guardianPhone) && (
              <span className="w-2 h-2 rounded-full bg-rose-500" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('academic')}
            className={`flex-1 py-2 px-3 rounded-xl transition flex items-center justify-center gap-1.5 ${
              activeTab === 'academic'
                ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>៣. ព័ត៌មានការសិក្សា</span>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs overflow-y-auto pr-1 flex-1">
          
          {/* TAB 1: PERSONAL INFO */}
          {activeTab === 'personal' && (
            <div className="space-y-3.5">
              <PhotoUploader
                value={avatar}
                onChange={setAvatar}
                label="រូបថតសិស្ស (Student Photo)"
                placeholderName={`${lastName} ${firstName}`}
              />

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    គោត្តនាម (ត្រកូល) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => {
                      setLastName(e.target.value);
                      if (errors.lastName) setErrors(prev => ({ ...prev, lastName: '' }));
                    }}
                    placeholder="ឧ. ឡុង"
                    className={`w-full p-2.5 bg-slate-100 dark:bg-slate-800 border rounded-xl font-medium ${
                      errors.lastName ? 'border-rose-500 bg-rose-500/5' : 'border-slate-200 dark:border-slate-700'
                    }`}
                  />
                  {errors.lastName && <p className="text-[11px] text-rose-500 mt-1 font-bold">{errors.lastName}</p>}
                </div>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    នាម (ឈ្មោះ) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                      if (errors.firstName) setErrors(prev => ({ ...prev, firstName: '' }));
                    }}
                    placeholder="ឧ. សុវណ្ណារ៉ា"
                    className={`w-full p-2.5 bg-slate-100 dark:bg-slate-800 border rounded-xl font-medium ${
                      errors.firstName ? 'border-rose-500 bg-rose-500/5' : 'border-slate-200 dark:border-slate-700'
                    }`}
                  />
                  {errors.firstName && <p className="text-[11px] text-rose-500 mt-1 font-bold">{errors.firstName}</p>}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    ថ្ងៃខែឆ្នាំកំណើត <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-medium text-slate-900 dark:text-slate-100"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    ភេទ <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value as any)}
                    className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-bold"
                  >
                    <option value="ស្រី">ស្រី (Female)</option>
                    <option value="ប្រុស">ប្រុស (Male)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">អ៊ីមែលសិស្ស (បើមាន)</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ឧ. long.sovannara@anlongtamey.edu.kh (@gmail.com)"
                  className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-medium"
                />
                {errors.email && <p className="text-[11px] text-rose-500 mt-1 font-bold">{errors.email}</p>}
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">អាស័យដ្ឋានបច្ចុប្បន្ន</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="ភូមិអន្លង់តាម៉ី, ឃុំឈើទាល, ស្រុកបាណន់, ខេត្តបាត់ដំបង"
                  className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-medium"
                />
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => setActiveTab('guardian')}
                  className="py-2 px-4 bg-brand-600 hover:bg-brand-500 text-white font-bold rounded-xl"
                >
                  បន្តទៅ ព័ត៌មានអាណាព្យាបាល &rarr;
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: GUARDIAN INFO */}
          {activeTab === 'guardian' && (
            <div className="space-y-3.5">
              <div className="p-3 bg-amber-500/10 border border-amber-500/20 text-slate-800 dark:text-slate-200 rounded-2xl flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
                <span className="text-[11px]">សូមបញ្ជាក់លេខទូរស័ព្ទ និងឈ្មោះអាណាព្យាបាលឱ្យបានត្រឹមត្រូវដើម្បីទទួលបានការជូនដំណឹងតាម SMS/Telegram</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    ឈ្មោះអាណាព្យាបាល <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={guardianName}
                    onChange={(e) => setGuardianName(e.target.value)}
                    placeholder="ឧ. ឡុង សុខា"
                    className={`w-full p-2.5 bg-slate-100 dark:bg-slate-800 border rounded-xl font-medium ${
                      errors.guardianName ? 'border-rose-500 bg-rose-500/5' : 'border-slate-200 dark:border-slate-700'
                    }`}
                  />
                  {errors.guardianName && <p className="text-[11px] text-rose-500 mt-1 font-bold">{errors.guardianName}</p>}
                </div>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    ត្រូវជា (Relationship) <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={guardianRelationship}
                    onChange={(e) => setGuardianRelationship(e.target.value)}
                    className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-bold"
                  >
                    <option value="ឪពុក">ឪពុក (Father)</option>
                    <option value="ម្តាយ">ម្តាយ (Mother)</option>
                    <option value="ជីដូន / ជីតា">ជីដូន / ជីតា (Grandparent)</option>
                    <option value="អាណាព្យាបាល">អាណាព្យាបាល (Guardian)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    លេខទូរស័ព្ទអាណាព្យាបាល <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={guardianPhone}
                    onChange={(e) => {
                      setGuardianPhone(e.target.value);
                      if (errors.guardianPhone) setErrors(prev => ({ ...prev, guardianPhone: '' }));
                    }}
                    placeholder="ឧ. 012 888 111"
                    className={`w-full p-2.5 bg-slate-100 dark:bg-slate-800 border rounded-xl font-medium ${
                      errors.guardianPhone ? 'border-rose-500 bg-rose-500/5' : 'border-slate-200 dark:border-slate-700'
                    }`}
                  />
                  {errors.guardianPhone && <p className="text-[11px] text-rose-500 mt-1 font-bold">{errors.guardianPhone}</p>}
                </div>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">មុខរបរអាណាព្យាបាល</label>
                  <input
                    type="text"
                    value={guardianOccupation}
                    onChange={(e) => setGuardianOccupation(e.target.value)}
                    placeholder="ឧ. កសិករ, អាជីវករ, គ្រូបង្រៀន"
                    className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">អ៊ីមែលអាណាព្យាបាល (បើមាន)</label>
                <input
                  type="email"
                  value={guardianEmail}
                  onChange={(e) => setGuardianEmail(e.target.value)}
                  placeholder="ឧ. guardian@gmail.com"
                  className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-medium"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setActiveTab('personal')}
                  className="py-2 px-4 bg-slate-200 dark:bg-slate-800 font-bold rounded-xl"
                >
                  &larr; ត្រឡប់ក្រោយ
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('academic')}
                  className="py-2 px-4 bg-brand-600 hover:bg-brand-500 text-white font-bold rounded-xl"
                >
                  បន្តទៅ ព័ត៌មានការសិក្សា &rarr;
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: ACADEMIC INFO & EQUITY STATUS */}
          {activeTab === 'academic' && (
            <div className="space-y-3.5">
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    កម្រិតថ្នាក់ <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-bold"
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
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    បន្ទប់ / កម្រិត <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={section}
                    onChange={(e) => setSection(e.target.value)}
                    className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-bold"
                  >
                    <option value="ក">ក</option>
                    <option value="ខ">ខ</option>
                    <option value="គ">គ</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    បណ្ណសមធម៌ (IDPoor) <span className="text-rose-500">*</span>
                  </label>
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

              <div className="p-4 bg-slate-100 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700/80 space-y-2">
                <h5 className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>ការផ្ទៀងផ្ទាត់ទិន្នន័យ (Data Verification)</span>
                </h5>
                <p className="text-slate-500 dark:text-slate-400 text-[11px]">
                  ព័ត៌មានទាំងអស់ត្រូវបានការពារ និងផ្ទៀងផ្ទាត់ដោយប្រព័ន្ធការពារទិន្នន័យ Form Validation និង Auto-Audit Trail។
                </p>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setActiveTab('guardian')}
                  className="py-2 px-4 bg-slate-200 dark:bg-slate-800 font-bold rounded-xl"
                >
                  &larr; ត្រឡប់ក្រោយ
                </button>
                <button
                  type="submit"
                  className="py-2.5 px-6 bg-brand-600 hover:bg-brand-500 text-white font-bold rounded-xl shadow-lg shadow-brand-600/30 transition"
                >
                  រក្សាទុក និងចុះឈ្មោះសិស្ស
                </button>
              </div>
            </div>
          )}

        </form>

      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={showConfirmModal}
        title="បញ្ជាក់ការចុះឈ្មោះសិស្សថ្មី"
        message={`តើអ្នកប្រាកដជាចង់ចុះឈ្មោះសិស្ស ${lastName} ${firstName} ចូលរៀនថ្នាក់ ${grade} (${section}) មែនទេ?`}
        confirmText="ប្រាកដហើយ ចុះឈ្មោះ"
        cancelText="ពិនិត្យឡើងវិញ"
        variant="primary"
        onConfirm={handleConfirmSave}
        onCancel={() => setShowConfirmModal(false)}
      />
    </div>
  );
};
