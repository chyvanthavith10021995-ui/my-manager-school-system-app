import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import type { ClassGroup, TimetableSlot } from '../../types';
import { TimetableSlotModal } from './TimetableSlotModal';
import { AddClassModal } from './AddClassModal';
import {
  BookOpen,
  Calendar,
  MapPin,
  Clock,
  User,
  UserCheck,
  Edit3,
  X,
  CheckCircle2,
  Filter,
  Plus,
  Trash2,
  Printer,
  RotateCcw,
  Building2
} from 'lucide-react';

const PERIODS_221 = [
  { id: 1, name: 'ម៉ោងទី ១', time: '07:00 ព្រឹក - 07:45 ព្រឹក', prefix: '07:00', type: 'class' },
  { id: 2, name: 'ម៉ោងទី ២', time: '07:45 ព្រឹក - 08:30 ព្រឹក', prefix: '07:45', type: 'class' },
  { id: 'b1', name: 'សម្រាកទី១', time: '08:30 ព្រឹក - 08:45 ព្រឹក', prefix: 'BREAK1', type: 'break', label: '☕ 08:30 - 08:45 ៖ សម្រាកពិសារភេសជ្ជៈ & អនាម័យ (Break 1)' },
  { id: 3, name: 'ម៉ោងទី ៣', time: '08:45 ព្រឹក - 09:30 ព្រឹក', prefix: '08:45', type: 'class' },
  { id: 4, name: 'ម៉ោងទី ៤', time: '09:30 ព្រឹក - 10:15 ព្រឹក', prefix: '09:30', type: 'class' },
  { id: 'b2', name: 'សម្រាកទី២', time: '10:15 ព្រឹក - 10:30 ព្រឹក', prefix: 'BREAK2', type: 'break', label: '☕ 10:15 - 10:30 ៖ សម្រាកខ្លី (Break 2)' },
  { id: 5, name: 'ម៉ោងទី ៥', time: '10:30 ព្រឹក - 11:15 ព្រឹក', prefix: '10:30', type: 'class', labelExtra: '(២-២-១ វគ្គទី៣ ៖ សកម្មភាពបំណិន/កីឡា/ក្លឹប)' }
];

export const AcademicsView: React.FC = () => {
  const { classes, subjects, timetable, teachers, assignClassTeacher, deleteTimetableSlot, deleteClassGroup, resetToMoEYSStandardTimetable, schoolInfo, userRole, language } = useApp();
  const [activeSubTab, setActiveSubTab] = useState<'schedule' | 'classes' | 'subjects'>('classes');
  
  // Timetable Filters & Modals
  const [selectedDay, setSelectedDay] = useState<string>('All');
  const [selectedScheduleClass, setSelectedScheduleClass] = useState<string>(classes[0]?.name || 'ថ្នាក់ទី ១-ក');
  const [scheduleViewMode, setScheduleViewMode] = useState<'grid221' | 'cards'>('grid221');
  const [showSlotModal, setShowSlotModal] = useState(false);
  const [editingSlot, setEditingSlot] = useState<TimetableSlot | null>(null);
  const [presetSlotData, setPresetSlotData] = useState<Partial<TimetableSlot> | null>(null);

  // Class Creation Modal state
  const [showAddClassModal, setShowAddClassModal] = useState(false);

  // Section & Grade Filter state for Classes tab
  const [filterGrade, setFilterGrade] = useState<string>('All');
  const [filterSection, setFilterSection] = useState<string>('All');

  // Teacher Assignment Modal state
  const [selectedClassForTeacher, setSelectedClassForTeacher] = useState<ClassGroup | null>(null);
  const [targetTeacherId, setTargetTeacherId] = useState<string>('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Days list including Saturday (ថ្ងៃសៅរិ៍)
  const daysWithSaturday = ['ច័ន្ទ', 'អង្គារ', 'ពុធ', 'ព្រហស្បតិ៍', 'សុក្រ', 'សៅរិ៍'];

  // Filter timetable slots for card view or day view
  const filteredSlots = timetable.filter(slot => {
    const matchesDay = selectedDay === 'All' || slot.day === selectedDay;
    const matchesClass = selectedScheduleClass === 'All' || slot.className === selectedScheduleClass;
    return matchesDay && matchesClass;
  });

  const filteredClasses = classes.filter(cls => {
    const matchesGrade = filterGrade === 'All' || cls.gradeLevel === filterGrade;
    const matchesSection = filterSection === 'All' || cls.section === filterSection;
    return matchesGrade && matchesSection;
  });

  const handleOpenAssignModal = (cls: ClassGroup) => {
    setSelectedClassForTeacher(cls);
    setTargetTeacherId(cls.classTeacherId || '');
  };

  const handleSaveTeacherAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedClassForTeacher || !targetTeacherId) return;

    assignClassTeacher(selectedClassForTeacher.id, targetTeacherId);

    const teacher = teachers.find(t => t.id === targetTeacherId);
    const teacherName = teacher ? `${teacher.lastName} ${teacher.firstName}` : 'គ្រូបង្រៀន';
    
    setToastMessage(`បានចាត់តាំង ${teacherName} ជាគ្រូបន្ទុកថ្នាក់ ${selectedClassForTeacher.name} ដោយជោគជ័យ!`);
    setSelectedClassForTeacher(null);

    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handlePrintTimetable = () => {
    window.print();
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-2 bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-2xl border border-emerald-400 animate-bounce print:hidden">
          <CheckCircle2 className="w-5 h-5 text-white" />
          <span className="text-xs font-extrabold">{toastMessage}</span>
        </div>
      )}

      {/* Header & Subtabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-slate-900 via-brand-950 to-indigo-950 p-6 rounded-3xl border border-brand-800/40 text-white shadow-xl print:hidden">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-brand-500/20 text-brand-300 border border-brand-400/30">
              សាលាបឋមសិក្សា អន្លង់តាម៉ី (MoEYS 2-2-1 Format)
            </span>
            <span className="text-xs text-slate-300">ឆ្នាំសិក្សា ២០២៥ - ២០២៦</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight">
            {language === 'km' ? 'គ្រប់គ្រងថ្នាក់រៀន & កាលវិភាគ ២-២-១ (ដល់ថ្ងៃសៅរិ៍)' : 'Academics & MoEYS 2-2-1 Schedule'}
          </h2>
          <p className="text-xs text-slate-300 mt-0.5">
            បង្កើតថ្នាក់រៀន, ចាត់តាំងសិស្ស/គ្រូ និងរៀបចំកាលវិភាគស្ដង់ដារទម្រង់ ២-២-១ ពីថ្ងៃច័ន្ទ ដល់ ថ្ងៃសៅរិ៍
          </p>
        </div>

        {/* Subtab selector */}
        <div className="flex items-center bg-slate-800/80 p-1 rounded-2xl border border-slate-700 self-start sm:self-auto shrink-0">
          <button
            onClick={() => setActiveSubTab('classes')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'classes'
                ? 'bg-brand-600 text-white shadow-md'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            បញ្ជីថ្នាក់រៀន ({classes.length})
          </button>
          <button
            onClick={() => setActiveSubTab('schedule')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'schedule'
                ? 'bg-brand-600 text-white shadow-md'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            កាលវិភាគ ២-២-១
          </button>
          <button
            onClick={() => setActiveSubTab('subjects')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeSubTab === 'subjects'
                ? 'bg-brand-600 text-white shadow-md'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            មុខវិជ្ជា ({subjects.length})
          </button>
        </div>
      </div>

      {/* Tab Content 1: Classes & Teacher Assignment */}
      {activeSubTab === 'classes' && (
        <div className="space-y-4 print:hidden">
          
          {/* Class Filter & Creation Bar */}
          <div className="glass-card p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-brand-500" />
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">តម្រងថ្នាក់៖</span>
              </div>

              {/* Grade selector */}
              <select
                value={filterGrade}
                onChange={(e) => setFilterGrade(e.target.value)}
                className="px-3 py-1.5 text-xs font-bold bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-200"
              >
                <option value="All">គ្រប់កម្រិតថ្នាក់ (១-៧)</option>
                <option value="១">ថ្នាក់ទី ១</option>
                <option value="២">ថ្នាក់ទី ២</option>
                <option value="៣">ថ្នាក់ទី ៣</option>
                <option value="៤">ថ្នាក់ទី ៤</option>
                <option value="៥">ថ្នាក់ទី ៥</option>
                <option value="៦">ថ្នាក់ទី ៦</option>
              </select>

              {/* Section selector (ក / ខ / គ) */}
              <select
                value={filterSection}
                onChange={(e) => setFilterSection(e.target.value)}
                className="px-3 py-1.5 text-xs font-bold bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-200"
              >
                <option value="All">គ្រប់បន្ទប់ (ក, ខ, គ)</option>
                <option value="ក">បន្ទប់ ក (Section A)</option>
                <option value="ខ">បន្ទប់ ខ (Section B)</option>
                <option value="គ">បន្ទប់ គ (Section C)</option>
              </select>
            </div>

            <div className="flex items-center gap-3 self-end sm:self-auto">
              <span className="text-xs font-bold text-slate-500">
                បង្ហាញ {filteredClasses.length} ថ្នាក់រៀន
              </span>

              {/* Create New Class Group Button */}
              {(userRole === 'admin' || userRole === 'teacher') && (
                <button
                  onClick={() => setShowAddClassModal(true)}
                  className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-extrabold text-xs rounded-xl shadow-md transition-all shrink-0"
                >
                  <Building2 className="w-4 h-4" /> បង្កើតថ្នាក់រៀនថ្មី
                </button>
              )}
            </div>
          </div>

          {/* Classes Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredClasses.map(cls => {
              const classTeacher = teachers.find(t => t.id === cls.classTeacherId);
              const isSectionA = cls.section === 'ក';

              return (
                <div 
                  key={cls.id} 
                  className={`glass-card-hover p-5 relative flex flex-col justify-between border-l-4 ${
                    isSectionA ? 'border-l-brand-600' : 'border-l-purple-600'
                  }`}
                >
                  <div>
                    {/* Badge & Total Students */}
                    <div className="flex items-center justify-between mb-3">
                      <span className={`px-3 py-1 rounded-xl text-xs font-extrabold border shadow-sm ${
                        isSectionA 
                          ? 'bg-brand-500/10 text-brand-600 dark:text-brand-400 border-brand-500/20'
                          : 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20'
                      }`}>
                        ថ្នាក់ទី {cls.gradeLevel}-{cls.section} (បន្ទប់ {cls.section})
                      </span>
                      
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-bold text-slate-500 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-lg">
                          {cls.totalStudents} នាក់
                        </span>
                        {userRole === 'admin' && (
                          <button
                            onClick={() => {
                              if (confirm(`លុបថ្នាក់រៀន "${cls.name}"?`)) {
                                deleteClassGroup(cls.id);
                              }
                            }}
                            className="p-1 rounded text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40"
                            title="លុបថ្នាក់រៀន"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>

                    <h3 className="text-lg font-black text-slate-900 dark:text-slate-100">{cls.name}</h3>
                    
                    {/* Room details */}
                    <p className="text-xs text-slate-500 flex items-center gap-1.5 font-medium mt-1">
                      <MapPin className="w-3.5 h-3.5 text-rose-500" />
                      បន្ទប់សិក្សា៖ <span className="font-bold text-slate-800 dark:text-slate-200">{cls.roomNumber}</span>
                    </p>

                    {/* Homeroom Teacher Info Box */}
                    <div className="mt-4 p-3 rounded-2xl bg-purple-50/80 dark:bg-purple-950/40 border border-purple-200/80 dark:border-purple-800/60 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="text-[10px] font-extrabold text-purple-700 dark:text-purple-300 uppercase tracking-wider">
                          គ្រូបន្ទុកថ្នាក់ (Homeroom Teacher)
                        </p>
                        <UserCheck className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                      </div>

                      {classTeacher ? (
                        <div className="flex items-center gap-2.5 pt-1">
                          <img src={classTeacher.avatar} alt={classTeacher.firstName} className="w-8 h-8 rounded-full object-cover ring-2 ring-purple-500/30" />
                          <div>
                            <p className="font-black text-xs text-slate-900 dark:text-slate-100">
                              {classTeacher.lastName} {classTeacher.firstName}
                            </p>
                            <p className="text-[10px] text-purple-600 dark:text-purple-400 font-medium">
                              {classTeacher.employeeId} • {classTeacher.phone}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <p className="text-xs font-extrabold text-rose-500 py-1">
                          ⚠️ មិនទាន់មានគ្រូបន្ទុកថ្នាក់
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Assign/Change Teacher Button */}
                  {(userRole === 'admin' || userRole === 'teacher') && (
                    <button
                      onClick={() => handleOpenAssignModal(cls)}
                      className="mt-4 w-full flex items-center justify-center gap-2 px-3 py-2 bg-slate-900 hover:bg-brand-600 dark:bg-slate-800 dark:hover:bg-brand-600 text-white font-extrabold text-xs rounded-xl shadow-sm transition-all"
                    >
                      <Edit3 className="w-3.5 h-3.5" /> ផ្លាស់ប្តូរគ្រូបន្ទុកថ្នាក់
                    </button>
                  )}

                </div>
              );
            })}
          </div>

        </div>
      )}

      {/* Tab Content 2: Weekly Timetable Schedule (6 Days: Monday to Saturday, 2-2-1 Format) */}
      {activeSubTab === 'schedule' && (
        <div className="space-y-4">
          
          {/* Controls Bar: Day Pills & Class Filter & View Mode & Actions */}
          <div className="glass-card p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 print:hidden">
            
            {/* Days Selection Pills (Includes Saturday ថ្ងៃសៅរិ៍) */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {['All', 'ច័ន្ទ', 'អង្គារ', 'ពុធ', 'ព្រហស្បតិ៍', 'សុក្រ', 'សៅរិ៍'].map(day => (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                    selectedDay === day
                      ? 'bg-gradient-to-r from-brand-600 to-indigo-600 text-white shadow-md'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                >
                  {day === 'All' ? 'គ្រប់ថ្ងៃទាំងអស់ (ច័ន្ទ-សៅរិ៍)' : `ថ្ងៃ${day}`}
                </button>
              ))}
            </div>

            {/* Controls */}
            <div className="flex flex-wrap items-center gap-2.5">
              
              {/* Select Specific Class Roster */}
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-slate-500">ជ្រើសថ្នាក់ ៖</span>
                <select
                  value={selectedScheduleClass}
                  onChange={(e) => setSelectedScheduleClass(e.target.value)}
                  className="px-3 py-1.5 text-xs font-bold bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-200 focus:outline-none"
                >
                  <option value="All">គ្រប់ថ្នាក់ទាំងអស់ (ថ្នាក់ទី១-៦)</option>
                  {classes.map(c => (
                    <option key={c.id} value={c.name}>{c.name} ({c.roomNumber})</option>
                  ))}
                </select>
              </div>

              {/* View Mode Toggle: 2-2-1 Matrix Table vs Slot Cards */}
              <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
                <button
                  onClick={() => setScheduleViewMode('grid221')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                    scheduleViewMode === 'grid221' ? 'bg-brand-600 text-white shadow-sm' : 'text-slate-500'
                  }`}
                >
                  តារាង ២-២-១
                </button>
                <button
                  onClick={() => setScheduleViewMode('cards')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                    scheduleViewMode === 'cards' ? 'bg-brand-600 text-white shadow-sm' : 'text-slate-500'
                  }`}
                >
                  កាតម៉ោងសិក្សា
                </button>
              </div>

              {/* Reset to MoEYS 2-2-1 Standard Schedule Button */}
              {(userRole === 'admin' || userRole === 'teacher') && (
                <button
                  onClick={() => {
                    if (confirm('បង្កើត/កំណត់កាលវិភាគស្ដង់ដារ ២-២-១ (ច័ន្ទ-សៅរិ៍) ឡើងវិញសម្រាប់គ្រប់ថ្នាក់?')) {
                      resetToMoEYSStandardTimetable();
                    }
                  }}
                  className="flex items-center gap-1.5 px-3 py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-xl transition-colors shadow-sm"
                  title="កំណត់កាលវិភាគស្ដង់ដារ ២-២-១ ក្រសួងអប់រំសម្រាប់គ្រប់ថ្នាក់"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> ស្ដង់ដារ ២-២-១ MoEYS
                </button>
              )}

              {/* Print Button */}
              <button
                onClick={handlePrintTimetable}
                className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-900 hover:bg-brand-600 text-white font-bold text-xs rounded-xl shadow-md transition-all"
                title="បោះពុម្ពកាលវិភាគផ្លូវការ"
              >
                <Printer className="w-4 h-4" /> បោះពុម្ព
              </button>

              {/* Add Timetable Slot Button */}
              {(userRole === 'admin' || userRole === 'teacher') && (
                <button
                  onClick={() => {
                    setEditingSlot(null);
                    setShowSlotModal(true);
                  }}
                  className="flex items-center gap-1.5 px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white font-extrabold text-xs rounded-xl shadow-md transition-colors"
                >
                  <Plus className="w-4 h-4" /> បន្ថែមកាលវិភាគ
                </button>
              )}

            </div>
          </div>

          {/* VIEW MODE 1: Official MoEYS 2-2-1 Weekly Matrix Table (On-screen Display) */}
          {scheduleViewMode === 'grid221' && (
            <div className="glass-card p-6 space-y-4 print:hidden overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3 gap-2">
                <div>
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold bg-brand-500/10 text-brand-600 dark:text-brand-400">
                    MoEYS 2-2-1 Period Session Format (Monday to Saturday)
                  </span>
                  <h3 className="text-base font-black text-slate-900 dark:text-slate-100 mt-1 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-brand-500" />
                    តារាងកាលវិភាគតាមថ្នាក់ដាច់ដោយឡែក ទម្រង់ ២-២-១ ៖ {selectedScheduleClass === 'All' ? 'គ្រប់ថ្នាក់រៀន (ថ្នាក់ទី១ ដល់ ទី៦)' : selectedScheduleClass}
                  </h3>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                  <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800">
                    ៦ ថ្ងៃ/សប្ដាហ៍ (ច័ន្ទ - សៅរិ៍)
                  </span>
                </div>
              </div>

              {/* Dedicated Homeroom Teacher Banner */}
              {(() => {
                if (selectedScheduleClass === 'All') return null;
                const targetClassGroup = classes.find(c => c.name === selectedScheduleClass);
                const teacher = targetClassGroup
                  ? teachers.find(t => t.id === targetClassGroup.classTeacherId || t.assignedClasses.includes(targetClassGroup.name))
                  : teachers.find(t => t.assignedClasses.includes(selectedScheduleClass));

                return (
                  <div className="p-3.5 rounded-2xl bg-gradient-to-r from-purple-900/40 via-indigo-900/40 to-slate-900/40 border border-purple-500/30 flex items-center justify-between gap-3 text-white">
                    <div className="flex items-center gap-3">
                      <img
                        src={teacher?.avatar || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=250&q=80'}
                        alt={teacher?.firstName || 'គ្រូ'}
                        className="w-10 h-10 rounded-xl object-cover ring-2 ring-purple-400"
                      />
                      <div>
                        <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-purple-500/30 text-purple-300 border border-purple-400/30">
                          គ្រូបន្ទុកថ្នាក់ផ្ទាល់ (Homeroom Teacher)
                        </span>
                        <h4 className="text-xs font-black mt-0.5 text-white">
                          {teacher ? `${teacher.lastName} ${teacher.firstName}` : 'មិនទាន់ចាត់តាំងគ្រូបន្ទុកថ្នាក់'}
                        </h4>
                      </div>
                    </div>
                    {teacher && (
                      <div className="text-right text-[11px] font-mono text-purple-200 hidden sm:block">
                        <p>ទូរស័ព្ទ៖ {teacher.phone}</p>
                        <p>អត្តលេខ៖ {teacher.employeeId}</p>
                      </div>
                    )}
                  </div>
                );
              })()}

              <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
                <table className="w-full text-center border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-black border-b border-slate-200 dark:border-slate-700">
                      <th className="p-3 border-r border-slate-200 dark:border-slate-700 w-1/6">ម៉ោងសិក្សា (២-២-១)</th>
                      {daysWithSaturday.map(d => (
                        <th key={d} className={`p-3 border-r border-slate-200 dark:border-slate-700 ${d === 'សៅរិ៍' ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400' : ''}`}>
                          ថ្ងៃ{d}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                    {PERIODS_221.map((p) => {
                      if (p.type === 'break') {
                        return (
                          <tr key={p.id} className="bg-amber-50/60 dark:bg-amber-950/20 text-amber-700 dark:text-amber-400 font-bold text-[11px]">
                            <td colSpan={7} className="p-2 text-center border-y border-amber-200 dark:border-amber-900/50">
                              {p.label}
                            </td>
                          </tr>
                        );
                      }

                      return (
                        <tr key={p.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40">
                          <td className="p-3 font-bold bg-slate-50 dark:bg-slate-800/80 border-r border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200">
                            <div className="font-extrabold text-brand-600 dark:text-brand-400">{p.name}</div>
                            <div className="text-[10px] text-slate-400 font-mono mt-0.5">{p.time}</div>
                            {p.labelExtra && (
                              <div className="text-[9px] text-purple-600 dark:text-purple-400 font-semibold mt-0.5">{p.labelExtra}</div>
                            )}
                          </td>

                          {daysWithSaturday.map(d => {
                            const slotMatch = timetable.find(s =>
                              (selectedScheduleClass === 'All' || s.className === selectedScheduleClass) &&
                              s.day === d &&
                              s.timeSlot.includes(p.prefix)
                            );

                            return (
                              <td
                                key={d}
                                onClick={() => {
                                  if (!slotMatch && (userRole === 'admin' || userRole === 'teacher')) {
                                    setEditingSlot(null);
                                    setPresetSlotData({
                                      day: d as any,
                                      timeSlot: p.time,
                                      className: selectedScheduleClass === 'All' ? (classes[0]?.name || 'ថ្នាក់ទី ១-ក') : selectedScheduleClass
                                    });
                                    setShowSlotModal(true);
                                  }
                                }}
                                className={`p-3 border-r border-slate-200 dark:border-slate-800 align-top transition-colors ${
                                  !slotMatch && (userRole === 'admin' || userRole === 'teacher')
                                    ? 'cursor-pointer hover:bg-brand-50/50 dark:hover:bg-brand-950/30 group'
                                    : ''
                                }`}
                              >
                                {slotMatch ? (
                                  <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-700 shadow-sm space-y-1 relative group hover:border-brand-500 transition-all">
                                    <p className="font-black text-slate-900 dark:text-slate-100 text-xs">{slotMatch.subject}</p>
                                    <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium flex items-center justify-center gap-1">
                                      <User className="w-3 h-3 text-purple-400" /> {slotMatch.teacherName}
                                    </p>
                                    <p className="text-[9px] text-brand-600 dark:text-brand-400 font-mono font-bold">
                                      {slotMatch.className} ({slotMatch.room})
                                    </p>

                                    {/* Action icons on hover */}
                                    {(userRole === 'admin' || userRole === 'teacher') && (
                                      <div className="absolute top-1 right-1 flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity bg-white dark:bg-slate-900 rounded-lg p-0.5 shadow">
                                        <button
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            setEditingSlot(slotMatch);
                                            setPresetSlotData(null);
                                            setShowSlotModal(true);
                                          }}
                                          className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-amber-600"
                                          title="កែប្រែកាលវិភាគ"
                                        >
                                          <Edit3 className="w-3 h-3" />
                                        </button>
                                        <button
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            if (confirm(`លុបម៉ោង ${slotMatch.subject}?`)) {
                                              deleteTimetableSlot(slotMatch.id);
                                            }
                                          }}
                                          className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-rose-600"
                                          title="លុបម៉ោងសិក្សា"
                                        >
                                          <Trash2 className="w-3 h-3" />
                                        </button>
                                      </div>
                                    )}
                                  </div>
                                ) : (
                                  <div className="py-2 text-center">
                                    <span className="text-slate-300 dark:text-slate-700 text-xs font-mono group-hover:hidden">-</span>
                                    <span className="hidden group-hover:inline-block text-[10px] font-extrabold text-brand-600 dark:text-brand-400 bg-brand-500/10 px-2 py-0.5 rounded-lg border border-brand-500/20">
                                      + បន្ថែម
                                    </span>
                                  </div>
                                )}
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* VIEW MODE 2: Schedule Matrix Cards View */}
          {scheduleViewMode === 'cards' && (
            <div className="glass-card p-6 space-y-4 print:hidden">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-brand-500" />
                  កាតម៉ោងសិក្សាប្រចាំថ្ងៃ (ច័ន្ទ - សៅរិ៍)
                </h3>
                <span className="text-xs font-bold text-slate-400">
                  បង្ហាញ {filteredSlots.length} ម៉ោងសិក្សា
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredSlots.length === 0 ? (
                  <div className="col-span-full py-12 text-center text-slate-400 text-xs font-bold">
                    មិនមានកាលវិភាគសិក្សាសម្រាប់តម្រងដែលបានជ្រើសរើសនោះទេ។
                  </div>
                ) : (
                  filteredSlots.map(slot => (
                    <div key={slot.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 space-y-2.5 relative group hover:border-brand-500/50 transition-all">
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-brand-500/10 text-brand-600 dark:text-brand-400 border border-brand-500/20">
                            {slot.className}
                          </span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-500/10 text-purple-600 dark:text-purple-400">
                            ថ្ងៃ{slot.day}
                          </span>
                        </div>

                        {(userRole === 'admin' || userRole === 'teacher') && (
                          <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => {
                                setEditingSlot(slot);
                                setShowSlotModal(true);
                              }}
                              className="p-1 rounded-lg text-slate-400 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/40"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`លុបម៉ោងសិក្សា ${slot.subject}?`)) {
                                  deleteTimetableSlot(slot.id);
                                }
                              }}
                              className="p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <h4 className="text-base font-black text-slate-900 dark:text-slate-100">{slot.subject}</h4>
                        <span className="text-[11px] font-bold text-slate-500 flex items-center gap-1 bg-slate-100 dark:bg-slate-700/60 px-2 py-0.5 rounded-lg">
                          <Clock className="w-3 h-3 text-slate-400" /> {slot.timeSlot}
                        </span>
                      </div>

                      <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700/60 text-xs text-slate-600 dark:text-slate-400 space-y-1">
                        <p className="flex items-center gap-1.5 font-bold">
                          <User className="w-3.5 h-3.5 text-purple-500" /> {slot.teacherName}
                        </p>
                        <p className="flex items-center gap-1.5 font-medium text-slate-500">
                          <MapPin className="w-3.5 h-3.5 text-rose-500" /> {slot.room}
                        </p>
                      </div>

                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* OFFICIAL PRINTABLE MOEYS 2-2-1 TIMETABLE SHEET (6 DAYS: Monday to Saturday) */}
          <div className="printable-area p-8 space-y-6 bg-white text-slate-900 font-serif border border-slate-300 shadow-sm">
            
            {/* MoEYS Royal Header */}
            <div className="text-center space-y-1 pb-4 border-b-2 border-slate-900">
              <h2 className="text-sm sm:text-base font-extrabold tracking-widest text-amber-800">
                ព្រះរាជាណាចក្រកម្ពុជា ជាតិ សាសនា ព្រះមហាក្សត្រ
              </h2>
              <p className="text-xs font-semibold text-slate-700">
                ក្រសួងអប់រំ យុវជន និងកីឡា • មន្ទីរអប់រំ យុវជន និងកីឡា {schoolInfo.province}
              </p>
              <h1 className="text-xl font-black text-slate-900 pt-2 font-sans">
                {schoolInfo.schoolName} (កូដសាលារៀន៖ {schoolInfo.schoolCode})
              </h1>
              <p className="text-xs text-slate-600 font-sans">
                អាស័យដ្ឋាន៖ {schoolInfo.village}, {schoolInfo.commune}, {schoolInfo.district}, {schoolInfo.province}
              </p>
            </div>

            {/* Document Meta Header */}
            <div className="flex items-center justify-between text-xs font-sans border-b border-slate-200 pb-3">
              <div>
                <h3 className="text-base font-black text-slate-900">
                  កាលវិភាគសិក្សាស្ដង់ដារបឋមសិក្សា ទម្រង់ ២-២-១ (MoEYS 2-2-1 Timetable Sheet)
                </h3>
                <p className="text-slate-700 font-bold mt-1">
                  ថ្នាក់រៀន ៖ <span className="text-brand-700 font-extrabold">{selectedScheduleClass === 'All' ? 'គ្រប់ថ្នាក់រៀនទាំងអស់ (ថ្នាក់ទី១ ដល់ ថ្នាក់ទី៦)' : selectedScheduleClass}</span>
                </p>
              </div>
              <div className="text-right">
                <p className="font-bold text-slate-800">ឆ្នាំសិក្សា ៖ {schoolInfo.academicYear}</p>
                <p className="text-slate-500 text-[11px] mt-0.5">ថ្ងៃបោះពុម្ព ៖ {new Date().toLocaleDateString('km-KH')}</p>
              </div>
            </div>

            {/* Printable Schedule Roster Table (6 Days: Monday to Saturday, 2-2-1 Layout) */}
            <div className="overflow-x-auto rounded-xl border-2 border-slate-900">
              <table className="w-full text-center border-collapse text-xs font-sans">
                <thead>
                  <tr className="bg-slate-200 text-slate-900 font-black border-b-2 border-slate-900">
                    <th className="p-2.5 border-r border-slate-400 w-1/6">ម៉ោងសិក្សា (២-២-១)</th>
                    {daysWithSaturday.map(d => (
                      <th key={d} className="p-2.5 border-r border-slate-400">ថ្ងៃ{d}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-300 font-medium">
                  {PERIODS_221.map((p, idx) => {
                    if (p.type === 'break') {
                      return (
                        <tr key={p.id} className="bg-slate-100 text-slate-700 font-bold text-[11px]">
                          <td colSpan={7} className="p-2 text-center border-y border-slate-300">
                            {p.label}
                          </td>
                        </tr>
                      );
                    }

                    return (
                      <tr key={idx} className="hover:bg-slate-50">
                        <td className="p-2.5 font-bold bg-slate-100 border-r border-slate-400 text-slate-900">
                          <div className="font-extrabold">{p.name}</div>
                          <div className="text-[10px] text-slate-500 font-normal">{p.time}</div>
                        </td>

                        {daysWithSaturday.map(d => {
                          const slotMatch = timetable.find(s =>
                            (selectedScheduleClass === 'All' || s.className === selectedScheduleClass) &&
                            s.day === d &&
                            s.timeSlot.includes(p.prefix)
                          );

                          return (
                            <td key={d} className="p-2 border-r border-slate-300 align-top">
                              {slotMatch ? (
                                <div className="space-y-0.5">
                                  <p className="font-extrabold text-slate-900 text-xs">{slotMatch.subject}</p>
                                  <p className="text-[10px] text-slate-600 font-medium">{slotMatch.teacherName}</p>
                                  <p className="text-[9px] text-purple-700 font-bold font-mono">{slotMatch.className}</p>
                                </div>
                              ) : (
                                <span className="text-slate-300 text-[10px]">-</span>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Official Signatures */}
            <div className="pt-8 border-t border-slate-300 flex items-center justify-between text-xs font-sans">
              <div className="text-center">
                <p className="font-bold text-slate-700">បានឃើញ និងពិនិត្យត្រឹមត្រូវ</p>
                <p className="font-black text-slate-900 mt-1">គ្រូបន្ទុកថ្នាក់</p>
                <div className="h-14" />
                <p className="text-slate-500 font-bold">(ហត្ថលេខា និងឈ្មោះ)</p>
              </div>
              <div className="text-center">
                <p className="font-medium text-slate-600">ធ្វើនៅ {schoolInfo.village}, ថ្ងៃទី {new Date().getDate()} ខែកញ្ញា ឆ្នាំ ២០២៦</p>
                <p className="font-black text-slate-900 mt-1">នាយកសាលាបឋមសិក្សា</p>
                <div className="h-14" />
                <p className="font-black text-slate-900">{schoolInfo.principalName}</p>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* Tab Content 3: Subjects Catalog */}
      {activeSubTab === 'subjects' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 print:hidden">
          {subjects.map(sub => (
            <div key={sub.id} className="glass-card p-5 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded font-mono text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    {sub.code}
                  </span>
                  <span className="text-xs font-semibold text-brand-500">{sub.department}</span>
                </div>
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-slate-100 mt-1">{sub.name}</h3>
                <p className="text-xs text-slate-400 mt-0.5">{sub.credits} Academic Credits</p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-brand-500/10 text-brand-500 flex items-center justify-center">
                <BookOpen className="w-5 h-5" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODAL: Assign/Change Teacher Modal */}
      {selectedClassForTeacher && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4 animate-in fade-in duration-200 print:hidden">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-5">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-purple-500/10 text-purple-600 flex items-center justify-center font-bold">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900 dark:text-slate-100">
                    ចាត់តាំងគ្រូបន្ទុកថ្នាក់
                  </h3>
                  <p className="text-xs font-bold text-brand-600 dark:text-brand-400">
                    {selectedClassForTeacher.name} ({selectedClassForTeacher.roomNumber})
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedClassForTeacher(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveTeacherAssignment} className="space-y-4 text-xs">
              <div>
                <label className="font-extrabold text-slate-700 dark:text-slate-300 block mb-1.5">
                  ជ្រើសរើសគ្រូបង្រៀន (Select Teacher) ៖
                </label>
                <select
                  value={targetTeacherId}
                  onChange={(e) => setTargetTeacherId(e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 font-bold bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">-- សូមជ្រើសរើសគ្រូបង្រៀន --</option>
                  {teachers.map(t => (
                    <option key={t.id} value={t.id}>
                      {t.lastName} {t.firstName} ({t.employeeId}) - {t.department}
                    </option>
                  ))}
                </select>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 flex items-center justify-end gap-2.5 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setSelectedClassForTeacher(null)}
                  className="px-4 py-2.5 rounded-xl font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
                >
                  បោះបង់
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl font-black bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md hover:from-purple-500 hover:to-indigo-500"
                >
                  រក្សាទុកការចាត់តាំង
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* MODAL: Create New Class Group & Batch Enroll Students */}
      {showAddClassModal && (
        <AddClassModal onClose={() => setShowAddClassModal(false)} />
      )}

      {/* MODAL: Timetable Slot Add / Edit Modal */}
      {(showSlotModal || editingSlot) && (
        <TimetableSlotModal
          slotToEdit={editingSlot}
          presetData={presetSlotData}
          onClose={() => {
            setShowSlotModal(false);
            setEditingSlot(null);
            setPresetSlotData(null);
          }}
        />
      )}

    </div>
  );
};
