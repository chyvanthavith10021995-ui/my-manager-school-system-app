import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import type { AttendanceRecord } from '../../types';
import { PrintHeader, PrintFooter } from '../common/PrintHeader';
import {
  CalendarCheck,
  CheckCircle,
  XCircle,
  Clock,
  CheckCheck,
  Filter,
  Printer
} from 'lucide-react';

export const AttendanceRegister: React.FC = () => {
  const { students, classes, attendance, markAttendance, userRole, language } = useApp();
  
  const [selectedClass, setSelectedClass] = useState<string>('ថ្នាក់ទី ៤-ក');
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );

  // Filter students belonging to selected class
  const targetGrade = selectedClass.split('-')[0]; // e.g. "ថ្នាក់ទី ៤"
  const targetSection = selectedClass.split('-')[1]; // e.g. "ក"

  const classStudents = students.filter(
    s => s.grade === targetGrade && s.section === targetSection
  );

  // Helper to get status of a student for selected date
  const getStudentStatus = (studentId: string): AttendanceRecord['status'] => {
    const rec = attendance.find(a => a.studentId === studentId && a.date === selectedDate);
    return rec ? rec.status : 'វត្តមាន';
  };

  const getStudentRemarks = (studentId: string): string => {
    const rec = attendance.find(a => a.studentId === studentId && a.date === selectedDate);
    return rec?.remarks || '';
  };

  const handleStatusChange = (student: typeof students[0], status: AttendanceRecord['status']) => {
    markAttendance({
      studentId: student.id,
      studentName: `${student.lastName} ${student.firstName}`,
      className: selectedClass,
      date: selectedDate,
      status
    });
  };

  const handleBulkMarkPresent = () => {
    classStudents.forEach(student => {
      markAttendance({
        studentId: student.id,
        studentName: `${student.lastName} ${student.firstName}`,
        className: selectedClass,
        date: selectedDate,
        status: 'វត្តមាន'
      });
    });
  };

  // Metrics for selected class & date
  const presentCount = classStudents.filter(s => getStudentStatus(s.id) === 'វត្តមាន').length;
  const lateCount = classStudents.filter(s => getStudentStatus(s.id) === 'យឺត').length;
  const absentCount = classStudents.filter(s => getStudentStatus(s.id) === 'អវត្តមាន' || getStudentStatus(s.id) === 'ច្បាប់').length;

  return (
    <div className="space-y-6 font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 no-print">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100">
            {language === 'km' ? 'សៀវភៅកត់ត្រាវត្តមានសិស្សប្រចាំថ្ងៃ' : 'Daily Attendance Register'}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {language === 'km' ? 'កត់ត្រាវត្តមាន និងអវត្តមានសិស្សតាមថ្នាក់រៀនបឋមសិក្សា' : 'Track and log daily period attendance for primary school classes'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-md transition-all"
          >
            <Printer className="w-4 h-4" /> {language === 'km' ? 'បោះពុម្ភបញ្ជីវត្តមាន' : 'Print Attendance'}
          </button>

          {(userRole === 'admin' || userRole === 'teacher') && (
            <button
              onClick={handleBulkMarkPresent}
              className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md transition-all self-start sm:self-auto"
            >
              <CheckCheck className="w-4 h-4" /> {language === 'km' ? 'កត់វត្តមានសិស្សទាំងអស់' : 'Bulk Mark All Present'}
            </button>
          )}
        </div>
      </div>

      {/* Control Bar: Class & Date Pickers */}
      <div className="glass-card p-4 flex flex-col sm:flex-row items-center justify-between gap-4 no-print">
        <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
          
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <span className="text-xs font-bold text-slate-600 dark:text-slate-300">ថ្នាក់រៀន៖</span>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="px-3 py-1.5 text-xs font-bold bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-200 focus:outline-none"
            >
              {classes.map(c => (
                <option key={c.id} value={c.name}>{c.name} ({c.roomNumber})</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <CalendarCheck className="w-4 h-4 text-slate-400" />
            <span className="text-xs font-bold text-slate-600 dark:text-slate-300">កាលបរិច្ឆេទ៖</span>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-3 py-1.5 text-xs font-semibold bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-200 focus:outline-none"
            />
          </div>

        </div>

        {/* Quick Stats Pill */}
        <div className="flex items-center gap-3 text-xs font-bold">
          <span className="text-emerald-500 flex items-center gap-1">
            <CheckCircle className="w-3.5 h-3.5" /> {presentCount} វត្តមាន
          </span>
          <span className="text-amber-500 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> {lateCount} យឺត
          </span>
          <span className="text-rose-500 flex items-center gap-1">
            <XCircle className="w-3.5 h-3.5" /> {absentCount} អវត្តមាន/ច្បាប់
          </span>
        </div>
      </div>

      {/* Roster Attendance Grid */}
      <div className="glass-card overflow-hidden p-4">
        <PrintHeader
          title={`សៀវភៅកត់ត្រាវត្តមានសិស្សប្រចាំថ្ងៃ - ${selectedClass}`}
          subtitle={`វត្តមានសរុប ៖ ${presentCount} នាក់ | យឺត ៖ ${lateCount} នាក់ | អវត្តមាន/ច្បាប់ ៖ ${absentCount} នាក់`}
          classNameInfo={selectedClass}
          dateInfo={`កាលបរិច្ឆេទ ៖ ${selectedDate}`}
        />

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-100/70 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3.5 px-4">ឈ្មោះសិស្ស</th>
                <th className="py-3.5 px-4">អត្តលេខ</th>
                <th className="py-3.5 px-4">ស្ថានភាពវត្តមាន</th>
                <th className="py-3.5 px-4">កំណត់ចំណាំ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs">
              {classStudents.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-12 text-center text-slate-400">
                    មិនទាន់មានទិន្នន័យសិស្សក្នុងថ្នាក់ {selectedClass} ទេ។
                  </td>
                </tr>
              ) : (
                classStudents.map(student => {
                  const status = getStudentStatus(student.id);
                  const remarks = getStudentRemarks(student.id);
                  return (
                    <tr key={student.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <img src={student.avatar} alt={student.firstName} className="w-8 h-8 rounded-full object-cover ring-2 ring-brand-500/20" />
                          <span className="font-bold text-slate-900 dark:text-slate-100">{student.lastName} {student.firstName}</span>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 font-mono font-medium text-slate-500">
                        {student.studentId}
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-1.5">
                          
                          <button
                            onClick={() => handleStatusChange(student, 'វត្តមាន')}
                            className={`px-3 py-1.5 rounded-lg font-bold text-xs transition-all ${
                              status === 'វត្តមាន'
                                ? 'bg-emerald-500 text-white shadow-sm'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-emerald-500'
                            }`}
                          >
                            វត្តមាន
                          </button>

                          <button
                            onClick={() => handleStatusChange(student, 'យឺត')}
                            className={`px-3 py-1.5 rounded-lg font-bold text-xs transition-all ${
                              status === 'យឺត'
                                ? 'bg-amber-500 text-white shadow-sm'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-amber-500'
                            }`}
                          >
                            យឺត
                          </button>

                          <button
                            onClick={() => handleStatusChange(student, 'ច្បាប់')}
                            className={`px-3 py-1.5 rounded-lg font-bold text-xs transition-all ${
                              status === 'ច្បាប់'
                                ? 'bg-blue-500 text-white shadow-sm'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-blue-500'
                            }`}
                          >
                            ច្បាប់
                          </button>

                          <button
                            onClick={() => handleStatusChange(student, 'អវត្តមាន')}
                            className={`px-3 py-1.5 rounded-lg font-bold text-xs transition-all ${
                              status === 'អវត្តមាន'
                                ? 'bg-rose-500 text-white shadow-sm'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-rose-500'
                            }`}
                          >
                            អវត្តមាន
                          </button>

                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <input
                          type="text"
                          placeholder="បន្ថែមចំណាំ (ឧ. ឈឺចុកពោះ)..."
                          defaultValue={remarks}
                          onBlur={(e) => {
                            if (e.target.value !== remarks) {
                              markAttendance({
                                studentId: student.id,
                                studentName: `${student.lastName} ${student.firstName}`,
                                className: selectedClass,
                                date: selectedDate,
                                status,
                                remarks: e.target.value
                              });
                            }
                          }}
                          className="px-3 py-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-800 dark:text-slate-200 text-xs w-full max-w-xs focus:outline-none"
                        />
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        <PrintFooter />
      </div>

    </div>
  );
};
