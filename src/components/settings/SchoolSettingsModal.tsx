import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Building2,
  Save,
  X,
  CheckCircle2
} from 'lucide-react';

interface SchoolSettingsModalProps {
  onClose: () => void;
}

export const SchoolSettingsModal: React.FC<SchoolSettingsModalProps> = ({ onClose }) => {
  const { schoolInfo, updateSchoolInfo } = useApp();
  const [formData, setFormData] = useState({ ...schoolInfo });
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSchoolInfo(formData);
    setToastMsg('បានផ្លាស់ប្តូរព័ត៌មានស្ដង់ដារសាលារៀនដោយជោគជ័យ!');
    setTimeout(() => {
      setToastMsg(null);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-md p-4 overflow-y-auto font-sans">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-6">
        
        {/* Toast Notification */}
        {toastMsg && (
          <div className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-3 rounded-2xl shadow-lg border border-emerald-400">
            <CheckCircle2 className="w-5 h-5 text-white" />
            <span className="text-xs font-extrabold">{toastMsg}</span>
          </div>
        )}

        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-brand-500/10 text-brand-600 flex items-center justify-center font-bold">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-brand-500/10 text-brand-600 dark:text-brand-400">
                MoEYS Standard School Profile
              </span>
              <h2 className="text-lg font-black text-slate-900 dark:text-slate-100 mt-0.5">
                ការកំណត់ និងព័ត៌មានស្ដង់ដារសាលារៀន
              </h2>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Fields */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-extrabold text-slate-700 dark:text-slate-300 block mb-1">
                ឈ្មោះសាលារៀន (School Name) ៖
              </label>
              <input
                type="text"
                value={formData.schoolName}
                onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })}
                required
                className="w-full px-3.5 py-2.5 font-bold bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-200 focus:outline-none"
              />
            </div>

            <div>
              <label className="font-extrabold text-slate-700 dark:text-slate-300 block mb-1">
                កូដសាលារៀន MoEYS (School Code) ៖
              </label>
              <input
                type="text"
                value={formData.schoolCode}
                onChange={(e) => setFormData({ ...formData, schoolCode: e.target.value })}
                required
                className="w-full px-3.5 py-2.5 font-bold bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-200 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-extrabold text-slate-700 dark:text-slate-300 block mb-1">
                ឈ្មោះនាយកសាលា (Principal Name) ៖
              </label>
              <input
                type="text"
                value={formData.principalName}
                onChange={(e) => setFormData({ ...formData, principalName: e.target.value })}
                required
                className="w-full px-3.5 py-2.5 font-bold bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-200 focus:outline-none"
              />
            </div>

            <div>
              <label className="font-extrabold text-slate-700 dark:text-slate-300 block mb-1">
                ឆ្នាំសិក្សា (Academic Year) ៖
              </label>
              <input
                type="text"
                value={formData.academicYear}
                onChange={(e) => setFormData({ ...formData, academicYear: e.target.value })}
                required
                className="w-full px-3.5 py-2.5 font-bold bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-200 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <label className="font-extrabold text-slate-700 dark:text-slate-300 block mb-1">ខេត្ត</label>
              <input
                type="text"
                value={formData.province}
                onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                className="w-full px-3 py-2 font-bold bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-200"
              />
            </div>
            <div>
              <label className="font-extrabold text-slate-700 dark:text-slate-300 block mb-1">ស្រុក</label>
              <input
                type="text"
                value={formData.district}
                onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                className="w-full px-3 py-2 font-bold bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-200"
              />
            </div>
            <div>
              <label className="font-extrabold text-slate-700 dark:text-slate-300 block mb-1">ឃុំ</label>
              <input
                type="text"
                value={formData.commune}
                onChange={(e) => setFormData({ ...formData, commune: e.target.value })}
                className="w-full px-3 py-2 font-bold bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-200"
              />
            </div>
            <div>
              <label className="font-extrabold text-slate-700 dark:text-slate-300 block mb-1">ភូមិ</label>
              <input
                type="text"
                value={formData.village}
                onChange={(e) => setFormData({ ...formData, village: e.target.value })}
                className="w-full px-3 py-2 font-bold bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-200"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-extrabold text-slate-700 dark:text-slate-300 block mb-1">លេខទូរស័ព្ទសាលា ៖</label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3.5 py-2.5 font-bold bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-200"
              />
            </div>
            <div>
              <label className="font-extrabold text-slate-700 dark:text-slate-300 block mb-1">អ៊ីមែលសាលា ៖</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3.5 py-2.5 font-bold bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-200"
              />
            </div>
          </div>

          {/* System Developer & Version Credit */}
          <div className="p-3.5 bg-slate-100 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700/80 flex items-center justify-between text-xs font-sans">
            <div>
              <p className="font-extrabold text-slate-900 dark:text-slate-100">
                អ្នកបង្កើតប្រព័ន្ធ ៖ <span className="text-amber-600 dark:text-amber-400">វុិត ជីវន្ថា</span> (ICT កម្រងអន្លង់តាម៉ី)
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                លេខទូរស័ព្ទទំនាក់ទំនង ៖ <a href="tel:089340468" className="font-bold text-brand-600 dark:text-brand-400 hover:underline">089 340 468</a>
              </p>
            </div>
            <span className="px-3 py-1 rounded-xl text-xs font-black bg-brand-500/10 text-brand-600 dark:text-brand-400 border border-brand-500/20">
              Version v2.5.0
            </span>
          </div>

          {/* Form Action */}
          <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-200 dark:border-slate-800">
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
              <Save className="w-4 h-4" /> រក្សាទុកការកំណត់
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
