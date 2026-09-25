import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import type { Student } from '../../types';
import { ExcelImportModal } from './ExcelImportModal';
import { TransferStudentModal } from './TransferStudentModal';
import { EditStudentModal } from './EditStudentModal';
import { PrintHeader, PrintFooter } from '../common/PrintHeader';
import {
  UserPlus,
  Filter,
  Trash2,
  Eye,
  Edit3,
  Mail,
  Phone,
  MapPin,
  X,
  Calendar,
  FileSpreadsheet,
  Download,
  ArrowLeftRight,
  Printer
} from 'lucide-react';

interface StudentManagementProps {
  onOpenAddModal: () => void;
}

export const StudentManagement: React.FC<StudentManagementProps> = ({ onOpenAddModal }) => {
  const { students, deleteStudent, userRole, searchQuery, language, schoolInfo } = useApp();
  const [selectedGrade, setSelectedGrade] = useState<string>('All');
  const [selectedSection, setSelectedSection] = useState<string>('All');
  const [selectedEquity, setSelectedEquity] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [viewingProfile, setViewingProfile] = useState<Student | null>(null);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [showExcelModal, setShowExcelModal] = useState(false);
  const [transferringStudent, setTransferringStudent] = useState<Student | null>(null);
  const [showTransferModal, setShowTransferModal] = useState(false);

  // Filter students based on search query, grade, section, equity card, and status
  const filteredStudents = students.filter(student => {
    const matchesSearch =
      `${student.lastName} ${student.firstName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.studentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.address.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesGrade = selectedGrade === 'All' || student.grade === selectedGrade;
    const matchesSection = selectedSection === 'All' || student.section === selectedSection;
    const matchesEquity = selectedEquity === 'All' || student.equityCard?.includes(selectedEquity);
    const matchesStatus = selectedStatus === 'All' || student.status === selectedStatus;

    return matchesSearch && matchesGrade && matchesSection && matchesEquity && matchesStatus;
  });

  // Export current student list to CSV / Excel
  const handleExportCSV = () => {
    const headers = ['អត្តលេខ', 'គោត្តនាម', 'នាម', 'ភេទ', 'ថ្ងៃខែឆ្នាំកំណើត', 'ថ្នាក់ទី', 'បន្ទប់', 'បណ្ណសមធម៌', 'ស្ថានភាព', 'អាស័យដ្ឋានបច្ចុប្បន្ន', 'ឈ្មោះអាណាព្យាបាល', 'លេខទូរស័ព្ទ'];
    const rows = filteredStudents.map(s => [
      s.studentId,
      s.lastName,
      s.firstName,
      s.gender,
      s.dob,
      s.grade,
      s.section,
      s.equityCard || 'គ្មាន',
      s.status,
      `"${s.address.replace(/"/g, '""')}"`,
      `"${s.guardian.name.replace(/"/g, '""')}"`,
      s.guardian.phone
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `បញ្ជីឈ្មោះសិស្ស_សាលាបឋមសិក្សា_អន្លង់តាម៉ី_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-brand-900 via-slate-900 to-indigo-950 p-6 rounded-3xl border border-brand-800/40 text-white shadow-xl no-print">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-3 py-1 rounded-full text-[11px] font-extrabold bg-brand-500/20 text-brand-300 border border-brand-400/30">
              សាលាបឋមសិក្សា អន្លង់តាម៉ី (MoEYS)
            </span>
            <span className="text-xs text-slate-300">ឆ្នាំសិក្សា ២០២៦ - ២០២៧ (ចូលរៀនខែ១១ ឆ្នាំ២០២៦)</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight">
            {language === 'km' ? 'ប្រព័ន្ធគ្រប់គ្រងទិន្នន័យសិស្សានុសិស្ស' : 'Student Data & Transfer Management'}
          </h2>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl">
            គ្រប់គ្រងថ្ងៃខែឆ្នាំកំណើត, អាស័យដ្ឋានបច្ចុប្បន្ន, បណ្ណសមធម៌ (ក្រ១/ក្រ២), ការផ្ទេសិស្ស និងបោះពុម្ភបញ្ជីសិស្សតាមស្ដង់ដារក្រសួង
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs rounded-xl shadow-md transition-all"
          >
            <Printer className="w-4 h-4" /> បោះពុម្ភបញ្ជីសិស្ស
          </button>

          <button
            onClick={() => setShowExcelModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs rounded-xl shadow-md transition-all"
          >
            <FileSpreadsheet className="w-4 h-4" /> នាំចូលពី Excel
          </button>

          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-100 font-extrabold text-xs rounded-xl border border-slate-700 transition-all"
          >
            <Download className="w-4 h-4" /> ទាញចេញ Excel/CSV
          </button>

          {userRole === 'admin' && (
            <button
              onClick={onOpenAddModal}
              className="flex items-center gap-2 px-4 py-2.5 bg-brand-600 hover:bg-brand-500 text-white font-extrabold text-xs rounded-xl shadow-md transition-all"
            >
              <UserPlus className="w-4 h-4" /> ចុះឈ្មោះសិស្សថ្មី
            </button>
          )}
        </div>
      </div>

      {/* Filter Controls Bar */}
      <div className="glass-card p-4 space-y-3 no-print">
        <div className="flex items-center justify-between gap-2 border-b border-slate-200/60 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-brand-500" />
            <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200">តម្រងស្វែងរកទិន្នន័យសិស្ស ៖</h3>
          </div>
          <span className="text-xs font-bold text-slate-500">
            សរុប {filteredStudents.length} នាក់
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          
          {/* Grade Filter */}
          <div>
            <label className="font-bold text-slate-600 dark:text-slate-400 block mb-1">ថ្នាក់រៀន</label>
            <select
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
              className="w-full px-3 py-2 font-bold bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-200 focus:outline-none"
            >
              <option value="All">គ្រប់ថ្នាក់ទាំងអស់ (មត្តេយ្យ - ថ្នាក់ទី៦)</option>
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

          {/* Section Filter (បន្ទប់ ក / ខ) */}
          <div>
            <label className="font-bold text-slate-600 dark:text-slate-400 block mb-1">បន្ទប់ / ក្រុម (Section)</label>
            <select
              value={selectedSection}
              onChange={(e) => setSelectedSection(e.target.value)}
              className="w-full px-3 py-2 font-bold bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-200 focus:outline-none"
            >
              <option value="All">គ្រប់បន្ទប់ (បន្ទប់ ក និង ខ)</option>
              <option value="ក">បន្ទប់ ក (Section A)</option>
              <option value="ខ">បន្ទប់ ខ (Section B)</option>
            </select>
          </div>

          {/* Equity Card IDPoor Filter */}
          <div>
            <label className="font-bold text-slate-600 dark:text-slate-400 block mb-1">បណ្ណសមធម៌ (IDPoor)</label>
            <select
              value={selectedEquity}
              onChange={(e) => setSelectedEquity(e.target.value)}
              className="w-full px-3 py-2 font-bold bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-200 focus:outline-none"
            >
              <option value="All">គ្រប់ប្រភេទបណ្ណសមធម៌</option>
              <option value="ក្រ១">ក្រ១ (IDPoor 1)</option>
              <option value="ក្រ២">ក្រ២ (IDPoor 2)</option>
              <option value="គ្មាន">គ្មានបណ្ណសមធម៌</option>
            </select>
          </div>

          {/* Status / Transfer Filter */}
          <div>
            <label className="font-bold text-slate-600 dark:text-slate-400 block mb-1">ស្ថានភាពសិស្ស / ការផ្ទេសិស្ស</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 font-bold bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-200 focus:outline-none"
            >
              <option value="All">គ្រប់ស្ថានភាពទាំងអស់</option>
              <option value="កំពុងសិក្សា">កំពុងសិក្សា (Enrolled)</option>
              <option value="ផ្ទេសិស្សចេញ">ផ្ទេសិស្សចេញ (Transferred Out)</option>
              <option value="ផ្ទេសិស្សចូល">ផ្ទេសិស្សចូល (Transferred In)</option>
              <option value="ព្យួរការសិក្សា">ព្យួរការសិក្សា (Suspended)</option>
            </select>
          </div>

        </div>
      </div>

      {/* Students Data Table */}
      <div className="glass-card overflow-hidden p-4">
        <PrintHeader
          title="បញ្ជីឈ្មោះសិស្សានុសិស្ស"
          subtitle={`សរុប ${filteredStudents.length} នាក់ (សិស្សថ្នាក់ទី១ ដល់ទី៦)`}
          classNameInfo={selectedGrade !== 'All' ? selectedGrade : 'គ្រប់ថ្នាក់ទាំងអស់'}
          dateInfo={`កាលបរិច្ឆេទ ៖ ${new Date().toLocaleDateString('km-KH')}`}
        />

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-100/70 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3.5 px-4">ឈ្មោះសិស្ស & អត្តលេខ</th>
                <th className="py-3.5 px-4 text-center">ភេទ & ថ្ងៃខែឆ្នាំកំណើត</th>
                <th className="py-3.5 px-4 text-center">ថ្នាក់ទី & បន្ទប់</th>
                <th className="py-3.5 px-4">អាស័យដ្ឋានបច្ចុប្បន្ន</th>
                <th className="py-3.5 px-4 text-center">បណ្ណសមធម៌</th>
                <th className="py-3.5 px-4 text-center">ស្ថានភាព</th>
                <th className="py-3.5 px-4 text-right no-print">សកម្មភាព</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    មិនមានទិន្នន័យសិស្សត្រូវបានរកឃើញទេ។
                  </td>
                </tr>
              ) : (
                filteredStudents.map(student => (
                  <tr key={student.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                    
                    {/* Name & Roll ID */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <img src={student.avatar} alt={student.firstName} className="w-9 h-9 rounded-full object-cover ring-2 ring-brand-500/20" />
                        <div>
                          <p className="font-extrabold text-slate-900 dark:text-slate-100">{student.lastName} {student.firstName}</p>
                          <p className="text-[10px] font-mono text-slate-400">{student.studentId}</p>
                        </div>
                      </div>
                    </td>

                    {/* Gender & DOB */}
                    <td className="py-3.5 px-4 text-center">
                      <p className="font-bold text-slate-800 dark:text-slate-200">{student.gender}</p>
                      <p className="text-[10px] text-slate-500 font-mono flex items-center justify-center gap-1 mt-0.5">
                        <Calendar className="w-3 h-3 text-slate-400" /> {student.dob || '14/04/2018'}
                      </p>
                    </td>

                    {/* Grade & Section */}
                    <td className="py-3.5 px-4 text-center">
                      <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 font-extrabold text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
                        {student.grade} ({student.section})
                      </span>
                    </td>

                    {/* Current Address */}
                    <td className="py-3.5 px-4 max-w-xs">
                      <p className="text-slate-700 dark:text-slate-300 font-medium truncate flex items-center gap-1.5" title={student.address}>
                        <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                        {student.address || 'ភូមិអន្លង់តាម៉ី, ឃុំកន្សែង, ស្រុកបាណន់'}
                      </p>
                    </td>

                    {/* Equity Card */}
                    <td className="py-3.5 px-4 text-center">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold shadow-sm ${
                        student.equityCard?.includes('ក្រ១') ? 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300 border border-rose-300' :
                        student.equityCard?.includes('ក្រ២') ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-300' :
                        'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                      }`}>
                        {student.equityCard || 'គ្មាន (None)'}
                      </span>
                    </td>

                    {/* Transfer Status */}
                    <td className="py-3.5 px-4 text-center">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold ${
                        student.status === 'ផ្ទេសិស្សចេញ' ? 'bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300 border border-purple-300' :
                        student.status === 'ផ្ទេសិស្សចូល' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-300' :
                        'bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-300'
                      }`}>
                        {student.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right no-print">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => {
                            setTransferringStudent(student);
                            setShowTransferModal(true);
                          }}
                          className="px-2 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 text-indigo-600 dark:text-indigo-400 font-bold text-[11px] transition-colors inline-flex items-center gap-1"
                          title="ផ្ទេសិស្ស / ផ្ទេរថ្នាក់"
                        >
                          <ArrowLeftRight className="w-3.5 h-3.5" /> ផ្ទេរ
                        </button>

                        <button
                          onClick={() => setViewingProfile(student)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-brand-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                          title="មើលព័ត៌មានលម្អិត"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        {userRole === 'admin' && (
                          <>
                            <button
                              onClick={() => setEditingStudent(student)}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/40 transition-colors"
                              title="កែប្រែទិន្នន័យសិស្ស"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`លុបសិស្ស ${student.lastName} ${student.firstName} ចេញពីបញ្ជី?`)) {
                                  deleteStudent(student.id);
                                }
                              }}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                              title="លុបសិស្ស"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <PrintFooter />
      </div>

      {/* Viewing Profile Drawer / Modal */}
      {viewingProfile && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            
            {/* Header */}
            <div className="p-6 bg-gradient-to-r from-brand-600 via-slate-900 to-indigo-600 text-white relative">
              <button
                onClick={() => setViewingProfile(null)}
                className="absolute right-4 top-4 p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-4">
                <img src={viewingProfile.avatar} alt={viewingProfile.firstName} className="w-16 h-16 rounded-2xl object-cover ring-4 ring-white/20 shadow-lg" />
                <div>
                  <h3 className="text-xl font-extrabold">{viewingProfile.lastName} {viewingProfile.firstName}</h3>
                  <p className="text-xs text-brand-100 font-mono">{viewingProfile.studentId} • {viewingProfile.grade} ({viewingProfile.section})</p>
                  <div className="flex items-center gap-1.5 mt-1.5">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-400 text-slate-950">
                      {viewingProfile.equityCard || 'គ្មានបណ្ណសមធម៌'}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-white/20 text-white">
                      {viewingProfile.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 text-center">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">មធ្យមភាគពិន្ទុ</p>
                  <p className="text-lg font-extrabold text-brand-600 dark:text-brand-400 mt-0.5">{viewingProfile.gpa.toFixed(1)} / ១០</p>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 text-center">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">ចំណាត់ថ្នាក់</p>
                  <p className="text-lg font-extrabold text-amber-500 mt-0.5">ទី {viewingProfile.rankInClass}</p>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 text-center">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">វត្តមាន</p>
                  <p className="text-lg font-extrabold text-emerald-500 mt-0.5">{viewingProfile.attendancePercentage}%</p>
                </div>
              </div>

              {/* Detailed Attributes */}
              <div className="space-y-2 pt-2 text-xs">
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40">
                  <span className="font-bold text-slate-500">ថ្ងៃខែឆ្នាំកំណើត ៖</span>
                  <span className="font-extrabold text-slate-900 dark:text-slate-100 font-mono">{viewingProfile.dob || '2018-04-14'} ({viewingProfile.gender})</span>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 space-y-1">
                  <span className="font-bold text-slate-500 block">អាស័យដ្ឋានបច្ចុប្បន្ន ៖</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{viewingProfile.address}</span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40">
                  <span className="font-bold text-slate-500">បណ្ណសមធម៌ (IDPoor) ៖</span>
                  <span className="font-black text-amber-600 dark:text-amber-400">{viewingProfile.equityCard || 'គ្មាន (None)'}</span>
                </div>

                {viewingProfile.transferNotes && (
                  <div className="p-2.5 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800/60">
                    <span className="font-bold text-purple-700 dark:text-purple-300 block mb-0.5">កំណត់ត្រាការផ្ទេសិស្ស ៖</span>
                    <span className="text-slate-700 dark:text-slate-300">{viewingProfile.transferNotes} ({viewingProfile.transferDate})</span>
                  </div>
                )}
              </div>

              {/* Guardian Info */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-2">ព័ត៌មានអាណាព្យាបាលសិស្ស</h4>
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 space-y-1 text-xs">
                  <p className="font-bold text-slate-900 dark:text-slate-100">{viewingProfile.guardian.name} <span className="text-[10px] font-normal text-slate-400">({viewingProfile.guardian.relationship} - {viewingProfile.guardian.occupation})</span></p>
                  <p className="text-slate-500 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5" /> {viewingProfile.guardian.phone}
                  </p>
                  <p className="text-slate-500 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5" /> {viewingProfile.guardian.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <button
                onClick={() => {
                  setTransferringStudent(viewingProfile);
                  setViewingProfile(null);
                  setShowTransferModal(true);
                }}
                className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1"
              >
                <ArrowLeftRight className="w-3.5 h-3.5" /> ផ្ទេសិស្ស / ផ្ទេរថ្នាក់
              </button>

              <button
                onClick={() => setViewingProfile(null)}
                className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-700 font-bold text-xs text-slate-800 dark:text-slate-200"
              >
                បិទ
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Excel / CSV Import Modal */}
      {showExcelModal && (
        <ExcelImportModal onClose={() => setShowExcelModal(false)} />
      )}

      {/* Transfer Student Modal */}
      {showTransferModal && (
        <TransferStudentModal
          student={transferringStudent}
          onClose={() => {
            setShowTransferModal(false);
            setTransferringStudent(null);
          }}
        />
      )}

      {/* Edit Student Modal */}
      {editingStudent && (
        <EditStudentModal
          student={editingStudent}
          onClose={() => setEditingStudent(null)}
        />
      )}

      {/* Official Printable Student Roster Document (Only visible when printing) */}
      <div className="hidden print:block font-siemreap text-black p-4">
        <PrintHeader
          title="បញ្ជីឈ្មោះសិស្សានុសិស្សផ្លូវការ (OFFICIAL STUDENT ROSTER)"
          subtitle={`សាលាបឋមសិក្សា អន្លង់តាម៉ី (${schoolInfo.academicYear})`}
          dateInfo={`សរុបសិស្ស ៖ ${filteredStudents.length} នាក់ | កាលបរិច្ឆេទ ៖ ${new Date().toLocaleDateString('km-KH')}`}
        />

        <table className="w-full text-left border-collapse my-4 text-xs font-siemreap">
          <thead>
            <tr className="bg-slate-200 font-bold border border-black">
              <th className="p-2 border border-black text-center">ល.រ</th>
              <th className="p-2 border border-black">អត្តលេខ</th>
              <th className="p-2 border border-black">គោត្តនាម - នាម</th>
              <th className="p-2 border border-black text-center">ភេទ</th>
              <th className="p-2 border border-black text-center">ថ្ងៃកំណើត</th>
              <th className="p-2 border border-black text-center">ថ្នាក់ទី-បន្ទប់</th>
              <th className="p-2 border border-black">អាសយដ្ឋាន</th>
              <th className="p-2 border border-black text-center">បណ្ណសមធម៌</th>
              <th className="p-2 border border-black">អាណាព្យាបាល</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((st, idx) => (
              <tr key={st.id} className="border border-black">
                <td className="p-2 border border-black text-center font-bold">{idx + 1}</td>
                <td className="p-2 border border-black font-mono font-bold">{st.studentId}</td>
                <td className="p-2 border border-black font-bold">{st.lastName} {st.firstName}</td>
                <td className="p-2 border border-black text-center">{st.gender}</td>
                <td className="p-2 border border-black text-center font-mono">{st.dob}</td>
                <td className="p-2 border border-black text-center font-bold">{st.grade} ({st.section})</td>
                <td className="p-2 border border-black text-xs">{st.address}</td>
                <td className="p-2 border border-black text-center font-bold">{st.equityCard || '-'}</td>
                <td className="p-2 border border-black">{st.guardian.name} ({st.guardian.phone})</td>
              </tr>
            ))}
          </tbody>
        </table>

        <PrintFooter />
      </div>

    </div>
  );
};
