import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import type { ClassGroup } from '../../types';
import { Building2, Save, X, CheckCircle2, Users, Search } from 'lucide-react';

interface AddClassModalProps {
  onClose: () => void;
}

export const AddClassModal: React.FC<AddClassModalProps> = ({ onClose }) => {
  const { teachers, students, addClassGroup, updateStudent, assignClassTeacher } = useApp();

  const [formData, setFormData] = useState({
    name: 'ថ្នាក់ទី ១-គ',
    gradeLevel: '១',
    section: 'គ',
    classTeacherId: teachers[0]?.id || '',
    roomNumber: 'អាគារ ក - បន្ទប់ ០៥'
  });

  const [selectedStudentIds, setSelectedStudentIds] = useState<string[]>([]);
  const [studentSearch, setStudentSearch] = useState('');
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Filter students for batch enrollment checklist
  const filteredStudentsForEnrollment = students.filter(s =>
    `${s.lastName} ${s.firstName}`.toLowerCase().includes(studentSearch.toLowerCase()) ||
    s.studentId.toLowerCase().includes(studentSearch.toLowerCase()) ||
    s.grade.toLowerCase().includes(studentSearch.toLowerCase())
  );

  const toggleStudentSelection = (studentId: string) => {
    if (selectedStudentIds.includes(studentId)) {
      setSelectedStudentIds(prev => prev.filter(id => id !== studentId));
    } else {
      setSelectedStudentIds(prev => [...prev, studentId]);
    }
  };

  const handleGradeLevelChange = (gLevel: string) => {
    const defaultName = gLevel.includes('មត្តេយ្យ') ? `ថ្នាក់${gLevel}-${formData.section}` : `ថ្នាក់ទី ${gLevel}-${formData.section}`;
    setFormData(prev => ({
      ...prev,
      gradeLevel: gLevel,
      name: defaultName
    }));
  };

  const handleSectionChange = (sec: string) => {
    const defaultName = formData.gradeLevel.includes('មត្តេយ្យ') ? `ថ្នាក់${formData.gradeLevel}-${sec}` : `ថ្នាក់ទី ${formData.gradeLevel}-${sec}`;
    setFormData(prev => ({
      ...prev,
      section: sec,
      name: defaultName
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newClassId = `c_${Date.now()}`;
    const newClassGroup: ClassGroup = {
      id: newClassId,
      name: formData.name,
      gradeLevel: formData.gradeLevel,
      section: formData.section,
      classTeacherId: formData.classTeacherId,
      roomNumber: formData.roomNumber,
      totalStudents: selectedStudentIds.length
    };

    // 1. Add class group
    addClassGroup(newClassGroup);

    // 2. Assign teacher if selected
    if (formData.classTeacherId) {
      assignClassTeacher(newClassId, formData.classTeacherId);
    }

    // 3. Batch assign selected students to this class & section
    selectedStudentIds.forEach(stId => {
      updateStudent(stId, {
        grade: `ថ្នាក់ទី ${formData.gradeLevel}`,
        section: formData.section
      });
    });

    setToastMsg(`បានបង្កើតថ្នាក់រៀន "${newClassGroup.name}" និងចាត់តាំងសិស្សចំនួន ${selectedStudentIds.length} នាក់ដោយជោគជ័យ!`);

    setTimeout(() => {
      setToastMsg(null);
      onClose();
    }, 1500);
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
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-brand-500/10 text-brand-600 dark:text-brand-400">
                MoEYS Class Creation & Batch Enrollment
              </span>
              <h2 className="text-lg font-black text-slate-900 dark:text-slate-100 mt-0.5">
                បង្កើតថ្នាក់រៀនថ្មី និងចាត់តាំងសិស្ស/គ្រូ
              </h2>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto space-y-4 pr-1 text-xs">
          
          {/* Class Information */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 space-y-3">
            <h3 className="font-extrabold text-sm text-slate-800 dark:text-slate-200 border-b border-slate-200 dark:border-slate-700 pb-2">
              ១. ព័ត៌មានថ្នាក់រៀន
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">កម្រិតថ្នាក់ (Grade Level) ៖</label>
                <select
                  value={formData.gradeLevel}
                  onChange={(e) => handleGradeLevelChange(e.target.value)}
                  className="w-full px-3 py-2 font-bold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100"
                >
                  <option value="មត្តេយ្យទាប">ថ្នាក់មត្តេយ្យទាប (Lower Preschool)</option>
                  <option value="មត្តេយ្យមធ្យម">ថ្នាក់មត្តេយ្យមធ្យម (Middle Preschool)</option>
                  <option value="មត្តេយ្យខ្ពស់">ថ្នាក់មត្តេយ្យខ្ពស់ (High Preschool)</option>
                  <option value="១">ថ្នាក់ទី ១</option>
                  <option value="២">ថ្នាក់ទី ២</option>
                  <option value="៣">ថ្នាក់ទី ៣</option>
                  <option value="៤">ថ្នាក់ទី ៤</option>
                  <option value="៥">ថ្នាក់ទី ៥</option>
                  <option value="៦">ថ្នាក់ទី ៦</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">បន្ទប់ / ក្រុម (Section) ៖</label>
                <select
                  value={formData.section}
                  onChange={(e) => handleSectionChange(e.target.value)}
                  className="w-full px-3 py-2 font-bold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100"
                >
                  <option value="ក">បន្ទប់ ក (Section A)</option>
                  <option value="ខ">បន្ទប់ ខ (Section B)</option>
                  <option value="គ">បន្ទប់ គ (Section C)</option>
                  <option value="ឃ">បន្ទប់ ឃ (Section D)</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">ឈ្មោះថ្នាក់រៀន ៖</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-3.5 py-2 font-bold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">គ្រូបន្ទុកថ្នាក់ (Class Teacher) ៖</label>
                <select
                  value={formData.classTeacherId}
                  onChange={(e) => setFormData({ ...formData, classTeacherId: e.target.value })}
                  className="w-full px-3.5 py-2 font-bold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100"
                >
                  <option value="">-- មិនទាន់ចាត់តាំង --</option>
                  {teachers.map(t => (
                    <option key={t.id} value={t.id}>
                      {t.lastName} {t.firstName} ({t.employeeId})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">លេខបន្ទប់ / អាគារ ៖</label>
                <input
                  type="text"
                  value={formData.roomNumber}
                  onChange={(e) => setFormData({ ...formData, roomNumber: e.target.value })}
                  required
                  className="w-full px-3.5 py-2 font-bold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100"
                />
              </div>
            </div>
          </div>

          {/* Batch Enroll Students into this class */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-700 pb-2">
              <div>
                <h3 className="font-extrabold text-sm text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-brand-500" /> ២. ជ្រើសរើសសិស្សចូលរៀនក្នុងថ្នាក់នេះ (Batch Student Enrollment)
                </h3>
                <p className="text-[11px] text-slate-500">
                  បានជ្រើសរើស <span className="font-black text-brand-600">{selectedStudentIds.length} នាក់</span> ចូលថ្នាក់នេះ
                </p>
              </div>

              {/* Student Search */}
              <div className="relative w-full sm:w-48">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="ស្វែងរកសិស្ស..."
                  value={studentSearch}
                  onChange={(e) => setStudentSearch(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 font-bold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-slate-100 text-[11px]"
                />
              </div>
            </div>

            {/* Checklist Grid */}
            <div className="max-h-48 overflow-y-auto space-y-1.5 pr-1">
              {filteredStudentsForEnrollment.length === 0 ? (
                <div className="py-6 text-center text-slate-400 text-xs font-bold">
                  មិនមានសិស្សត្រូវបានរកឃើញទេ។
                </div>
              ) : (
                filteredStudentsForEnrollment.map(st => {
                  const isChecked = selectedStudentIds.includes(st.id);
                  return (
                    <div
                      key={st.id}
                      onClick={() => toggleStudentSelection(st.id)}
                      className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                        isChecked
                          ? 'bg-brand-500/10 border-brand-500/40 text-brand-900 dark:text-brand-100 shadow-sm'
                          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}}
                          className="rounded text-brand-600 focus:ring-brand-500"
                        />
                        <img src={st.avatar} alt={st.firstName} className="w-7 h-7 rounded-full object-cover" />
                        <div>
                          <p className="font-extrabold text-xs">{st.lastName} {st.firstName}</p>
                          <p className="text-[10px] text-slate-400 font-mono">{st.studentId} • បច្ចុប្បន្ន ៖ {st.grade} ({st.section})</p>
                        </div>
                      </div>

                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        isChecked ? 'bg-brand-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                      }`}>
                        {isChecked ? 'បានជ្រើសរើស' : 'ជ្រើសរើស'}
                      </span>
                    </div>
                  );
                })
              )}
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
              <Save className="w-4 h-4" /> បង្កើតថ្នាក់រៀនថ្មី
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
