import React, { useState } from 'react';
import type { Student, StudentStatus } from '../../types';
import { useApp } from '../../context/AppContext';
import { X, ArrowLeftRight, CheckCircle, Printer, FileText, Building2, UserCheck, LogIn } from 'lucide-react';

interface TransferStudentModalProps {
  student?: Student | null;
  onClose: () => void;
}

export type TransferType = 'TRANSFER_OUT' | 'INTERNAL_CLASS' | 'TRANSFER_IN';

export const TransferStudentModal: React.FC<TransferStudentModalProps> = ({ student, onClose }) => {
  const { students, transferStudent, schoolInfo } = useApp();
  const [selectedStudentId, setSelectedStudentId] = useState<string>(student?.id || students[0]?.id || '');
  const [transferCase, setTransferCase] = useState<TransferType>('TRANSFER_OUT');
  
  // Target class & section
  const [grade, setGrade] = useState<string>(student?.grade || 'ថ្នាក់ទី ៤');
  const [section, setSection] = useState<string>(student?.section || 'ខ');
  const [formerGrade, setFormerGrade] = useState<string>(student?.grade || 'ថ្នាក់ទី ៤');
  const [formerSection, setFormerSection] = useState<string>(student?.section || 'ក');

  // School transfer details
  const [targetSchoolName, setTargetSchoolName] = useState<string>('សាលាបឋមសិក្សា វត្តគរ');
  const [targetSchoolLocation, setTargetSchoolLocation] = useState<string>('ភូមិវត្តគរ, ឃុំវត្តគរ, ក្រុងបាត់ដំបង, ខេត្តបាត់ដំបង');
  const [notes, setNotes] = useState<string>('អាណាព្យាបាលផ្លាស់ប្តូរទីលំនៅ');
  const [effectiveDate, setEffectiveDate] = useState<string>('2026-10-01');

  // Active print form selection
  const [activePrintForm, setActivePrintForm] = useState<TransferType>('TRANSFER_OUT');
  const [isSuccess, setIsSuccess] = useState(false);

  const selectedStudentObj = students.find(s => s.id === selectedStudentId) || student || students[0];

  const handleStudentSelect = (id: string) => {
    setSelectedStudentId(id);
    const st = students.find(s => s.id === id);
    if (st) {
      setFormerGrade(st.grade);
      setFormerSection(st.section);
      setGrade(st.grade);
      setSection(st.section === 'ក' ? 'ខ' : 'ក');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudentId) return;

    let targetStatus: StudentStatus = 'ផ្ទេសិស្សចេញ';
    let fullNotes = notes;

    if (transferCase === 'TRANSFER_OUT') {
      targetStatus = 'ផ្ទេសិស្សចេញ';
      fullNotes = `ផ្ទេរចេញទៅ៖ ${targetSchoolName} (${targetSchoolLocation}) - មូលហេតុ៖ ${notes}`;
    } else if (transferCase === 'INTERNAL_CLASS') {
      targetStatus = 'កំពុងសិក្សា';
      fullNotes = `ផ្ទេរថ្នាក់ក្នុងកម្រិត៖ ពី ${formerGrade} (${formerSection}) ទៅ ${grade} (${section}) - មូលហេតុ៖ ${notes}`;
    } else {
      targetStatus = 'ផ្ទេសិស្សចូល';
      fullNotes = `ផ្ទេសិស្សចូលពី៖ ${targetSchoolName} (${targetSchoolLocation}) - មូលហេតុ៖ ${notes}`;
    }

    transferStudent(selectedStudentId, targetStatus, fullNotes, grade, section);
    setIsSuccess(true);
    setTimeout(() => {
      onClose();
    }, 1200);
  };

  const triggerPrint = (formType: TransferType) => {
    setActivePrintForm(formType);
    document.body.classList.add('modal-printing');
    setTimeout(() => {
      window.print();
      setTimeout(() => {
        document.body.classList.remove('modal-printing');
      }, 500);
    }, 150);
  };

  return (
    <>
      {/* INTERACTIVE UI MODAL DIALOG (Hidden when printing) */}
      <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 font-sans overflow-y-auto print:hidden">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl p-6 relative my-8">
          
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 p-1.5 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 bg-slate-100 dark:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header */}
          <div className="flex items-center gap-3 mb-5 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div className="p-3 bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 rounded-2xl">
              <ArrowLeftRight className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-slate-100">
                គ្រប់គ្រងការផ្ទេសិស្ស & លិខិតផ្ទេរផ្លូវការ (MoEYS Transfer Forms)
              </h3>
              <p className="text-xs text-slate-500">
                {schoolInfo.schoolName} • គ្រប់លិខិតផ្ទេរទាំងអស់មានសិទ្ធសម្រេចត្រឹមនាយកសាលា ({schoolInfo.principalName})
              </p>
            </div>
          </div>

          {isSuccess ? (
            <div className="py-12 text-center space-y-3">
              <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto animate-bounce" />
              <h4 className="text-lg font-extrabold text-slate-900 dark:text-slate-100">
                បានធ្វើបច្ចុប្បន្នភាព និងរក្សាទុកការផ្ទេសិស្សជោគជ័យ!
              </h4>
              <p className="text-xs text-slate-500">ទិន្នន័យត្រូវបានកត់ត្រាក្នុងប្រព័ន្ធ និងរក្សាទុកស្របតាមស្ដង់ដារ</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              
              {/* Transfer Case Selector Buttons (3 Cases) */}
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
                  ជ្រើសរើសប្រភេទនៃការផ្ទេសិស្ស *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {/* Case 1: Transfer Out */}
                  <button
                    type="button"
                    onClick={() => setTransferCase('TRANSFER_OUT')}
                    className={`p-3 rounded-2xl border text-left transition flex flex-col justify-between ${
                      transferCase === 'TRANSFER_OUT'
                        ? 'bg-purple-50 dark:bg-purple-950/40 border-purple-500 text-purple-900 dark:text-purple-200 ring-2 ring-purple-500/20'
                        : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <Building2 className="w-5 h-5 text-purple-600 mb-1" />
                    <div>
                      <span className="font-bold block text-xs">១. ផ្ទេរចេញទៅសាលាផ្សេង</span>
                      <span className="text-[10px] text-slate-500 block mt-0.5">
                        លិខិតបញ្ជាក់ការផ្ទេសិស្សចេញ
                      </span>
                    </div>
                  </button>

                  {/* Case 2: Internal Class */}
                  <button
                    type="button"
                    onClick={() => setTransferCase('INTERNAL_CLASS')}
                    className={`p-3 rounded-2xl border text-left transition flex flex-col justify-between ${
                      transferCase === 'INTERNAL_CLASS'
                        ? 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-500 text-indigo-900 dark:text-indigo-200 ring-2 ring-indigo-500/20'
                        : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <UserCheck className="w-5 h-5 text-indigo-600 mb-1" />
                    <div>
                      <span className="font-bold block text-xs">២. ផ្ទេរថ្នាក់ក្នុងកម្រិត</span>
                      <span className="text-[10px] text-slate-500 block mt-0.5">
                        លិខិតអនុញ្ញាតផ្ទេរថ្នាក់
                      </span>
                    </div>
                  </button>

                  {/* Case 3: Transfer In */}
                  <button
                    type="button"
                    onClick={() => setTransferCase('TRANSFER_IN')}
                    className={`p-3 rounded-2xl border text-left transition flex flex-col justify-between ${
                      transferCase === 'TRANSFER_IN'
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-900 dark:text-emerald-200 ring-2 ring-emerald-500/20'
                        : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <LogIn className="w-5 h-5 text-emerald-600 mb-1" />
                    <div>
                      <span className="font-bold block text-xs">៣. ផ្ទេសិស្សចូលមក</span>
                      <span className="text-[10px] text-slate-500 block mt-0.5">
                        លិខិតបញ្ជាក់ការទទួលផ្ទេរចូល
                      </span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Student Selector */}
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">ជ្រើសរើសសិស្ស *</label>
                <select
                  value={selectedStudentId}
                  onChange={e => handleStudentSelect(e.target.value)}
                  className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-bold text-slate-900 dark:text-slate-100 text-xs"
                >
                  {students.map(s => (
                    <option key={s.id} value={s.id}>
                      {s.lastName} {s.firstName} ({s.studentId}) - {s.grade} ({s.section}) | អាណាព្យាបាល៖ {s.guardian.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* CASE 1: TRANSFER OUT TO ANOTHER SCHOOL */}
              {transferCase === 'TRANSFER_OUT' && (
                <div className="p-4 bg-purple-50/50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800/60 rounded-2xl space-y-3">
                  <span className="font-bold text-purple-900 dark:text-purple-300 text-xs block">
                    📋 ព័ត៌មានលិខិតបញ្ជាក់ការផ្ទេសិស្សចេញ ៖
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                        ឈ្មោះសាលារៀនទទួលផ្ទេរ *
                      </label>
                      <input
                        type="text"
                        required
                        value={targetSchoolName}
                        onChange={e => setTargetSchoolName(e.target.value)}
                        placeholder="ឧ. សាលាបឋមសិក្សា វត្តគរ"
                        className="w-full p-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl font-medium"
                      />
                    </div>

                    <div>
                      <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                        ទីតាំងសាលារៀនគោលដៅ
                      </label>
                      <input
                        type="text"
                        value={targetSchoolLocation}
                        onChange={e => setTargetSchoolLocation(e.target.value)}
                        placeholder="ឧ. ភូមិវត្តគរ, ឃុំវត្តគរ, ក្រុងបាត់ដំបង"
                        className="w-full p-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                      មូលហេតុនៃការផ្ទេសិស្សចេញ *
                    </label>
                    <input
                      type="text"
                      required
                      value={notes}
                      onChange={e => setNotes(e.target.value)}
                      placeholder="ឧ. អាណាព្យាបាលផ្លាស់ប្តូរទីលំនៅទៅរស់នៅក្រុងបាត់ដំបង"
                      className="w-full p-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl font-medium"
                    />
                  </div>
                </div>
              )}

              {/* CASE 2: INTERNAL CLASS REASSIGNMENT */}
              {transferCase === 'INTERNAL_CLASS' && (
                <div className="p-4 bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-800/60 rounded-2xl space-y-3">
                  <span className="font-bold text-indigo-900 dark:text-indigo-300 text-xs block">
                    🔄 ព័ត៌មានលិខិតអនុញ្ញាតផ្ទេរថ្នាក់នៅក្នុងកម្រិត ៖
                  </span>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-2.5 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                      <span className="text-[10px] text-slate-400 font-semibold block">ថ្នាក់ដើម (Current Class)</span>
                      <span className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                        {formerGrade} (បន្ទប់ {formerSection})
                      </span>
                    </div>

                    <div>
                      <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                        ថ្នាក់ & បន្ទប់ថ្មី (Target Class) *
                      </label>
                      <div className="flex gap-2">
                        <select
                          value={grade}
                          onChange={e => setGrade(e.target.value)}
                          className="w-2/3 p-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl font-bold"
                        >
                          <option value="ថ្នាក់មត្តេយ្យទាប">ថ្នាក់មត្តេយ្យទាប</option>
                          <option value="ថ្នាក់មត្តេយ្យមធ្យម">ថ្នាក់មត្តេយ្យមធ្យម</option>
                          <option value="ថ្នាក់មត្តេយ្យខ្ពស់">ថ្នាក់មត្តេយ្យខ្ពស់</option>
                          <option value="ថ្នាក់ទី ១">ថ្នាក់ទី ១</option>
                          <option value="ថ្នាក់ទី ២">ថ្នាក់ទី ២</option>
                          <option value="ថ្នាក់ទី ៣">ថ្នាក់ទី ៣</option>
                          <option value="ថ្នាក់ទី ៤">ថ្នាក់ទី ៤</option>
                          <option value="ថ្នាក់ទី ៥">ថ្នាក់ទី ៥</option>
                          <option value="ថ្នាក់ទី ៦">ថ្នាក់ទី ៦</option>
                        </select>

                        <select
                          value={section}
                          onChange={e => setSection(e.target.value)}
                          className="w-1/3 p-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl font-bold"
                        >
                          <option value="ក">ក</option>
                          <option value="ខ">ខ</option>
                          <option value="គ">គ</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                      មូលហេតុនៃការផ្ទេរថ្នាក់ *
                    </label>
                    <input
                      type="text"
                      required
                      value={notes}
                      onChange={e => setNotes(e.target.value)}
                      placeholder="ឧ. សម្រួលចំនួនសិស្សក្នុងថ្នាក់ឱ្យស្មើគ្នា និងតម្រូវការពិសេសផ្នែករៀនសូត្រ"
                      className="w-full p-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl font-medium"
                    />
                  </div>
                </div>
              )}

              {/* CASE 3: TRANSFER IN FROM ANOTHER SCHOOL */}
              {transferCase === 'TRANSFER_IN' && (
                <div className="p-4 bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/60 rounded-2xl space-y-3">
                  <span className="font-bold text-emerald-900 dark:text-emerald-300 text-xs block">
                    📥 ព័ត៌មានលិខិតបញ្ជាក់ការទទួលផ្ទេសិស្សចូលមកសិក្សា ៖
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                        ឈ្មោះសាលារៀនដើម (ដើមចម) *
                      </label>
                      <input
                        type="text"
                        required
                        value={targetSchoolName}
                        onChange={e => setTargetSchoolName(e.target.value)}
                        placeholder="ឧ. សាលាបឋមសិក្សា វត្តគរ"
                        className="w-full p-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl font-medium"
                      />
                    </div>

                    <div>
                      <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                        ថ្នាក់ & បន្ទប់ទទួលឱ្យចូលរៀន *
                      </label>
                      <div className="flex gap-2">
                        <select
                          value={grade}
                          onChange={e => setGrade(e.target.value)}
                          className="w-2/3 p-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl font-bold"
                        >
                          <option value="ថ្នាក់ទី ១">ថ្នាក់ទី ១</option>
                          <option value="ថ្នាក់ទី ២">ថ្នាក់ទី ២</option>
                          <option value="ថ្នាក់ទី ៣">ថ្នាក់ទី ៣</option>
                          <option value="ថ្នាក់ទី ៤">ថ្នាក់ទី ៤</option>
                          <option value="ថ្នាក់ទី ៥">ថ្នាក់ទី ៥</option>
                          <option value="ថ្នាក់ទី ៦">ថ្នាក់ទី ៦</option>
                        </select>

                        <select
                          value={section}
                          onChange={e => setSection(e.target.value)}
                          className="w-1/3 p-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl font-bold"
                        >
                          <option value="ក">ក</option>
                          <option value="ខ">ខ</option>
                          <option value="គ">គ</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                      មូលហេតុនៃការផ្ទេរចូល *
                    </label>
                    <input
                      type="text"
                      required
                      value={notes}
                      onChange={e => setNotes(e.target.value)}
                      placeholder="ឧ. អាណាព្យាបាលផ្លាស់ប្តូរទីលំនៅមកកាន់ឃុំឈើទាល ស្រុកបាណន់"
                      className="w-full p-2.5 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl font-medium"
                    />
                  </div>
                </div>
              )}

              {/* Effective Date & Authority Note */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    កាលបរិច្ឆេទអនុវត្តផ្ទេរ
                  </label>
                  <input
                    type="date"
                    value={effectiveDate}
                    onChange={e => setEffectiveDate(e.target.value)}
                    className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-medium"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    សិទ្ធិសម្រេចរដ្ឋបាល
                  </label>
                  <input
                    type="text"
                    disabled
                    value={`${schoolInfo.principalName} (នាយកសាលា)`}
                    className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-medium text-slate-500"
                  />
                </div>
              </div>

              {/* Print Action Buttons Bar */}
              <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-3">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-indigo-500" />
                  <span>បោះពុម្ពលិខិតផ្លូវការ ៖</span>
                </span>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => triggerPrint('TRANSFER_OUT')}
                    className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 shadow transition ${
                      transferCase === 'TRANSFER_OUT' ? 'bg-purple-600 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200'
                    }`}
                  >
                    <Printer size={14} />
                    <span>លិខិតផ្ទេរចេញ</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => triggerPrint('INTERNAL_CLASS')}
                    className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 shadow transition ${
                      transferCase === 'INTERNAL_CLASS' ? 'bg-indigo-600 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200'
                    }`}
                  >
                    <Printer size={14} />
                    <span>លិខិតផ្ទេរថ្នាក់</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => triggerPrint('TRANSFER_IN')}
                    className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 shadow transition ${
                      transferCase === 'TRANSFER_IN' ? 'bg-emerald-600 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200'
                    }`}
                  >
                    <Printer size={14} />
                    <span>លិខិតទទួលផ្ទេរចូល</span>
                  </button>
                </div>
              </div>

              {/* Submit & Cancel Actions */}
              <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 font-bold text-slate-700 dark:text-slate-300"
                >
                  បោះបង់
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold shadow-md transition-colors"
                >
                  រក្សាទុកការផ្ទេសិស្ស
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* ISOLATED OFFICIAL MoEYS PRINTABLE DOCUMENT CANVAS (ONLY PRINTED) */}
      {/* ========================================================================= */}
      <div className="hidden print:block printable-letter-container w-full bg-white text-black p-8 font-siemreap leading-relaxed">
        
        {/* OFFICIAL MoEYS ADMINISTRATIVE HEADER BLOCK */}
        <div className="flex justify-between items-start mb-6 pt-2">
          {/* Left Block: MoEYS Hierarchy */}
          <div className="text-left text-xs font-bold leading-tight space-y-1 w-1/2">
            <p>ក្រសួងអប់រំ យុវជន និងកីឡា</p>
            <p>មន្ទីរអប់រំ យុវជន និងកីឡា ខេត្តបាត់ដំបង</p>
            <p>ការិយាល័យអប់រំ យុវជន និងកីឡា ស្រុកបាណន់</p>
            <p className="font-extrabold text-sm">{schoolInfo.schoolName}</p>
            <p className="text-[11px] pt-1 font-normal">លេខ៖ ............./២៦ អ.ត.ម</p>
          </div>

          {/* Right Block: Kingdom Motto (បាវចនា ខ្ពស់ជាងគេ - Font Khmer OS Muol Light) */}
          <div className="text-center w-1/2 space-y-1">
            <h2 className="text-base font-extrabold font-moul tracking-wide">ព្រះរាជាណាចក្រកម្ពុជា</h2>
            <h3 className="text-sm font-extrabold font-moul tracking-wide">ជាតិ សាសនា ព្រះមហាក្សត្រ</h3>
            <div className="text-xs pt-0.5">
              <span className="font-serif">❖ ❖ ❖</span>
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------------------- */}
        {/* FORM 1: SCHOOL-TO-SCHOOL TRANSFER CERTIFICATE (លិខិតបញ្ជាក់ការផ្ទេសិស្សចេញ) */}
        {/* ------------------------------------------------------------------------- */}
        {activePrintForm === 'TRANSFER_OUT' && (
          <div>
            {/* Title */}
            <div className="text-center my-8 space-y-1">
              <h1 className="text-xl font-bold font-moul tracking-wide text-black">លិខិតបញ្ជាក់ការផ្ទេសិស្ស</h1>
              <p className="text-[11px] font-semibold italic text-slate-700 font-sans">(SCHOOL TRANSFER CERTIFICATE)</p>
            </div>

            {/* Declaration Header */}
            <div className="text-sm font-bold font-moul mb-4 leading-relaxed">
              នាយកសាលាបឋមសិក្សា {schoolInfo.schoolName} សូមបញ្ជាក់ថា៖
            </div>

            {/* Student Details Table / Grid */}
            <div className="text-xs leading-loose space-y-4 text-justify">
              <div className="grid grid-cols-2 gap-x-6 gap-y-2 p-4 border border-black rounded-lg bg-slate-50/50">
                <p>
                  • ឈ្មោះសិស្ស ៖ <strong className="font-moul text-sm">{selectedStudentObj.lastName} {selectedStudentObj.firstName}</strong>
                </p>
                <p>
                  • ភេទ ៖ <strong>{selectedStudentObj.gender}</strong>
                </p>
                <p>
                  • ថ្ងៃ ខែ ឆ្នាំកំណើត ៖ <strong>{selectedStudentObj.dob}</strong>
                </p>
                <p>
                  • អត្តលេខសិស្ស ៖ <strong>{selectedStudentObj.studentId}</strong>
                </p>
                <p className="col-span-2">
                  • ឈ្មោះអាណាព្យាបាល ៖ <strong>{selectedStudentObj.guardian.name}</strong> ({selectedStudentObj.guardian.relationship}) - លេខទូរស័ព្ទ ៖ <strong>{selectedStudentObj.guardian.phone}</strong>
                </p>
                <p className="col-span-2">
                  • អាសយដ្ឋានបច្ចុប្បន្ន ៖ <strong>{selectedStudentObj.address}</strong>
                </p>
              </div>

              <p className="indent-8 text-xs leading-relaxed">
                សិស្សឈ្មោះ <strong>{selectedStudentObj.lastName} {selectedStudentObj.firstName}</strong> ខាងលើ ពិតជាធ្លាប់បានចូលរៀន និងសិក្សានៅ <strong>{schoolInfo.schoolName}</strong> កម្រិត <strong>{selectedStudentObj.grade}</strong> បន្ទប់ <strong>({selectedStudentObj.section})</strong> ក្នុងឆ្នាំសិក្សា <strong>{schoolInfo.academicYear}</strong> ពិតប្រាកដមែន ដោយទទួលបានលទ្ធផល៖ មធ្យមភាគពិន្ទុ <strong>{selectedStudentObj.gpa.toFixed(1)}/១០</strong>, ចំណាត់ថ្នាក់ <strong>ទី {selectedStudentObj.rankInClass}</strong>, អត្រាវត្តមាន <strong>{selectedStudentObj.attendancePercentage}%</strong> និងមានសូជីវធម៌/ចរិយាសម្បទាល្អប្រសើរ។
              </p>

              <p className="indent-8 text-xs leading-relaxed">
                សិស្សបានទទួលការអនុញ្ញាតឱ្យផ្ទេរការសិក្សាទៅកាន់ ៖ <strong className="font-moul">{targetSchoolName}</strong> (ទីតាំង ៖ {targetSchoolLocation}) ដោយមូលហេតុ ៖ <strong>{notes}</strong>។
              </p>

              <p className="indent-8 text-xs leading-relaxed">
                គណៈគ្រប់គ្រងសាលារៀនបានពិនិត្យ និងបញ្ជាក់ថា សិស្សពុំមានការជំពាក់សៀវភៅសិក្សាគោល ឬសម្ភារៈទ្រព្យសម្បត្តិសាលារៀនឡើយ និងត្រូវបានអនុញ្ញាតឱ្យផ្ទេរចេញដោយបរិបូរណ៍។
              </p>

              <p className="indent-8 text-xs leading-relaxed italic">
                លិខិតបញ្ជាក់នេះ ចេញជូនសាម៉ីជន ដើម្បីយកទៅប្រកបពាក្យសុំចូលរៀននៅសាលារៀនថ្មី តាមការចាំបាច់។
              </p>
            </div>

            {/* Official Signature Footer Block */}
            <div className="mt-12 grid grid-cols-2 gap-8 text-xs pt-4 font-siemreap">
              <div className="text-center space-y-1">
                <p className="font-bold font-moul">បានឃើញ និងឯកភាព</p>
                <p className="font-bold font-moul">អាណាព្យាបាលសិស្ស</p>
                <div className="h-24"></div>
                <p className="font-bold text-sm">{selectedStudentObj.guardian.name}</p>
              </div>

              <div className="text-center space-y-1">
                <p>ធ្វើនៅ អន្លង់តាម៉ី, ថ្ងៃទី...... ខែ...... ឆ្នាំ២០២៦</p>
                <p className="font-bold font-moul text-sm">នាយកសាលាបឋមសិក្សា អន្លង់តាម៉ី</p>
                <div className="h-24"></div>
                <p className="font-bold font-moul text-sm">{schoolInfo.principalName}</p>
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------------------- */}
        {/* FORM 2: INTERNAL CLASS REASSIGNMENT FORM (លិខិតអនុញ្ញាតផ្ទេរថ្នាក់នៅក្នុងកម្រិត) */}
        {/* ------------------------------------------------------------------------- */}
        {activePrintForm === 'INTERNAL_CLASS' && (
          <div>
            {/* Title */}
            <div className="text-center my-8 space-y-1">
              <h1 className="text-xl font-bold font-moul tracking-wide text-black">លិខិតអនុញ្ញាតផ្ទេរថ្នាក់</h1>
              <p className="text-[11px] font-semibold italic text-slate-700 font-sans">(INTERNAL CLASS REASSIGNMENT FORM)</p>
            </div>

            {/* Declaration Header */}
            <div className="text-sm font-bold font-moul mb-4 leading-relaxed">
              នាយកសាលាបឋមសិក្សា {schoolInfo.schoolName} សូមអនុញ្ញាតឱ្យ៖
            </div>

            {/* Content Body */}
            <div className="text-xs leading-loose space-y-4">
              <div className="p-4 border border-black rounded-lg space-y-2 bg-slate-50/50">
                <p>
                  • ឈ្មោះសិស្ស ៖ <strong className="font-moul text-sm">{selectedStudentObj.lastName} {selectedStudentObj.firstName}</strong> | ភេទ ៖ <strong>{selectedStudentObj.gender}</strong> | អត្តលេខសិស្ស ៖ <strong>{selectedStudentObj.studentId}</strong>
                </p>
                <p>
                  • ឈ្មោះអាណាព្យាបាល ៖ <strong>{selectedStudentObj.guardian.name}</strong> (ទូរស័ព្ទ ៖ <strong>{selectedStudentObj.guardian.phone}</strong>)
                </p>
                <p>
                  • អាសយដ្ឋាន ៖ <strong>{selectedStudentObj.address}</strong>
                </p>
              </div>

              <div className="p-4 border border-black rounded-lg space-y-2.5">
                <p className="font-bold font-moul text-sm underline text-black">សេចក្តីសម្រេចផ្ទេរថ្នាក់ ៖</p>
                <p className="indent-4">
                  ១. ផ្ទេរចេញពីថ្នាក់ដើម ៖ <strong>{formerGrade} (បន្ទប់ {formerSection})</strong>
                </p>
                <p className="indent-4">
                  ២. ចូលរៀនថ្នាក់ថ្មី ៖ <strong className="font-moul">{grade} (បន្ទប់ {section})</strong>
                </p>
                <p className="indent-4">
                  ៣. មូលហេតុនៃការផ្ទេរថ្នាក់ ៖ <strong>{notes}</strong>
                </p>
                <p className="indent-4">
                  ៤. កាលបរិច្ឆេទអនុវត្ត ៖ <strong>ថ្ងៃទី {effectiveDate}</strong>
                </p>
              </div>

              <p className="indent-8 text-xs italic">
                លិខិតអនុញ្ញាតនេះ ចេញជូនដើម្បីជាតារាងតម្កល់រដ្ឋបាលថ្នាក់ និងប្រព័ន្ធគ្រប់គ្រងសាលារៀន។
              </p>
            </div>

            {/* Signatures */}
            <div className="mt-10 grid grid-cols-2 gap-8 text-xs pt-4 font-siemreap">
              <div className="text-center space-y-1">
                <p className="font-bold font-moul">គ្រូបន្ទុកថ្នាក់ដើម ({formerSection})</p>
                <div className="h-20"></div>
                <p className="font-bold">.........................................</p>
              </div>

              <div className="text-center space-y-1">
                <p className="font-bold font-moul">គ្រូបន្ទុកថ្នាក់ថ្មី ({section})</p>
                <div className="h-20"></div>
                <p className="font-bold">.........................................</p>
              </div>

              <div className="text-center space-y-1 mt-6">
                <p className="font-bold font-moul">បានឃើញ និងឯកភាព</p>
                <p className="font-bold font-moul">អាណាព្យាបាលសិស្ស</p>
                <div className="h-20"></div>
                <p className="font-bold">{selectedStudentObj.guardian.name}</p>
              </div>

              <div className="text-center space-y-1 mt-6">
                <p>ធ្វើនៅ អន្លង់តាម៉ី, ថ្ងៃទី...... ខែ...... ឆ្នាំ២០២៦</p>
                <p className="font-bold font-moul text-sm">នាយកសាលាបឋមសិក្សា អន្លង់តាម៉ី</p>
                <div className="h-20"></div>
                <p className="font-bold font-moul text-sm">{schoolInfo.principalName}</p>
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------------------- */}
        {/* FORM 3: SCHOOL TRANSFER IN CERTIFICATE (លិខិតបញ្ជាក់ការទទួលផ្ទេសិស្សចូល) */}
        {/* ------------------------------------------------------------------------- */}
        {activePrintForm === 'TRANSFER_IN' && (
          <div>
            {/* Title */}
            <div className="text-center my-8 space-y-1">
              <h1 className="text-xl font-bold font-moul tracking-wide text-black">លិខិតបញ្ជាក់ការទទួលផ្ទេសិស្សចូល</h1>
              <p className="text-[11px] font-semibold italic text-slate-700 font-sans">(CERTIFICATE OF TRANSFER IN ACCEPTANCE)</p>
            </div>

            {/* Declaration Header */}
            <div className="text-sm font-bold font-moul mb-4 leading-relaxed">
              នាយកសាលាបឋមសិក្សា {schoolInfo.schoolName} សូមបញ្ជាក់ថា៖
            </div>

            {/* Student Details Grid & Body Paragraphs */}
            <div className="text-xs leading-loose space-y-4 text-justify">
              <div className="grid grid-cols-2 gap-x-6 gap-y-2 p-4 border border-black rounded-lg bg-slate-50/50">
                <p>
                  • ឈ្មោះសិស្ស ៖ <strong className="font-moul text-sm">{selectedStudentObj.lastName} {selectedStudentObj.firstName}</strong>
                </p>
                <p>
                  • ភេទ ៖ <strong>{selectedStudentObj.gender}</strong>
                </p>
                <p>
                  • ថ្ងៃ ខែ ឆ្នាំកំណើត ៖ <strong>{selectedStudentObj.dob}</strong>
                </p>
                <p>
                  • អត្តលេខសិស្ស ៖ <strong>{selectedStudentObj.studentId}</strong>
                </p>
                <p className="col-span-2">
                  • ឈ្មោះអាណាព្យាបាល ៖ <strong>{selectedStudentObj.guardian.name}</strong> ({selectedStudentObj.guardian.relationship}) - លេខទូរស័ព្ទ ៖ <strong>{selectedStudentObj.guardian.phone}</strong>
                </p>
                <p className="col-span-2">
                  • អាសយដ្ឋានបច្ចុប្បន្ន ៖ <strong>{selectedStudentObj.address}</strong>
                </p>
              </div>

              <p className="indent-8 text-xs leading-relaxed">
                សិស្សឈ្មោះ <strong>{selectedStudentObj.lastName} {selectedStudentObj.firstName}</strong> ខាងលើ ត្រូវបានសាលាបឋមសិក្សា {schoolInfo.schoolName} **យល់ព្រមទទួលឱ្យចូលរៀន** នៅកម្រិត <strong className="font-moul">{grade}</strong> បន្ទប់ <strong>({section})</strong> ក្នុងឆ្នាំសិក្សា <strong>{schoolInfo.academicYear}</strong> យ៉ាងពេញសិទ្ធិ ដោយផ្ទេរមកពី <strong className="font-moul">{targetSchoolName}</strong> ({targetSchoolLocation})។
              </p>

              <p className="indent-8 text-xs leading-relaxed">
                មូលហេតុនៃការទទួលផ្ទេរ ៖ <strong>{notes}</strong>។ កាលបរិច្ឆេទចាប់ផ្តើមចូលរៀន ៖ <strong>ថ្ងៃទី {effectiveDate}</strong>។
              </p>

              <p className="indent-8 text-xs leading-relaxed">
                សាលារៀនបានរៀបចំ និងបញ្ចូលឈ្មោះសិស្សទៅក្នុងបញ្ជីស្រង់វត្តមាន និងសៀវភៅតាមដានការសិក្សាផ្លូវការរបស់សាលារៀនរួចរាល់ហើយ។
              </p>

              <p className="indent-8 text-xs leading-relaxed italic">
                លិខិតបញ្ជាក់នេះ ចេញជូនសាម៉ីជន ដើម្បីយកទៅប្រកបការងាររដ្ឋបាលផ្ទេសិស្សចូលតាមការចាំបាច់។
              </p>
            </div>

            {/* Official Signature Footer Block */}
            <div className="mt-12 grid grid-cols-2 gap-8 text-xs pt-4 font-siemreap">
              <div className="text-center space-y-1">
                <p className="font-bold font-moul">បានឃើញ និងឯកភាព</p>
                <p className="font-bold font-moul">អាណាព្យាបាលសិស្ស</p>
                <div className="h-24"></div>
                <p className="font-bold text-sm">{selectedStudentObj.guardian.name}</p>
              </div>

              <div className="text-center space-y-1">
                <p>ធ្វើនៅ អន្លង់តាម៉ី, ថ្ងៃទី...... ខែ...... ឆ្នាំ២០២៦</p>
                <p className="font-bold font-moul text-sm">នាយកសាលាបឋមសិក្សា អន្លង់តាម៉ី</p>
                <div className="h-24"></div>
                <p className="font-bold font-moul text-sm">{schoolInfo.principalName}</p>
              </div>
            </div>
          </div>
        )}

      </div>
    </>
  );
};
