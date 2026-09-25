import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PrintHeader, PrintFooter } from '../common/PrintHeader';
import {
  Printer,
  Download,
  Building2,
  Users,
  Award,
  GraduationCap,
  ShieldCheck,
  Filter,
  FileSpreadsheet,
  CheckCircle2,
  Calendar,
  Package,
  HeartHandshake
} from 'lucide-react';

export const MasterReportsView: React.FC = () => {
  const {
    schoolInfo,
    students,
    teachers,
    committees,
    classes,
    language,
    censusChildren,
    preschoolAssessments,
    studentSupports,
    schoolActivities,
    parentMeetingPlans,
    schoolAssets,
    financialTransactions,
    materialHandovers
  } = useApp();
  
  const [reportCategory, setReportCategory] = useState<
    'standards' | 'enrollment' | 'equity' | 'academic' | 'teachers' | 'ssc' | 'smc' | 'census' | 'preschool' | 'support' | 'activities' | 'parentMeetings' | 'inventory'
  >('standards');
  
  const [teacherCatFilter, setTeacherCatFilter] = useState<string>('All');

  // CSV Export function for Master Reports (All 13 categories)
  const handleExportCSV = () => {
    let csvContent = '';
    let fileName = '';

    if (reportCategory === 'enrollment') {
      fileName = `របាយការណ៍ស្ថិតិសិស្សមេ_${schoolInfo.schoolName}_${new Date().toISOString().split('T')[0]}.csv`;
      const headers = ['កម្រិតថ្នាក់', 'បន្ទប់ (Section)', 'សិស្សសរុប', 'សិស្សស្រី', 'សិស្សប្រុស', 'គ្រូបន្ទុកថ្នាក់', 'បន្ទប់រៀន'];
      const rows = classes.map(cls => {
        const clsStudents = students.filter(s => s.grade.includes(cls.gradeLevel) && s.section === cls.section);
        const femaleCount = clsStudents.filter(s => s.gender === 'ស្រី' || s.gender === 'Female').length;
        const maleCount = clsStudents.length - femaleCount;
        const teacher = teachers.find(t => t.id === cls.classTeacherId);
        return [
          `ថ្នាក់ទី ${cls.gradeLevel}`,
          `បន្ទប់ ${cls.section}`,
          clsStudents.length,
          femaleCount,
          maleCount,
          teacher ? `"${teacher.lastName} ${teacher.firstName}"` : 'មិនទាន់ចាត់តាំង',
          `"${cls.roomNumber}"`
        ];
      });
      csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    } else if (reportCategory === 'equity') {
      fileName = `របាយការណ៍បណ្ណសមធម៌មេ_${schoolInfo.schoolName}_${new Date().toISOString().split('T')[0]}.csv`;
      const headers = ['អត្តលេខ', 'គោត្តនាម', 'នាម', 'ភេទ', 'ថ្នាក់ទី-បន្ទប់', 'ប្រភេទបណ្ណសមធម៌', 'អាស័យដ្ឋាន', 'អាណាព្យាបាល', 'លេខទូរស័ព្ទ'];
      const filtered = students.filter(s => s.equityCard && !s.equityCard.includes('គ្មាន'));
      const rows = filtered.map(s => [
        s.studentId,
        s.lastName,
        s.firstName,
        s.gender,
        `"${s.grade} (${s.section})"`,
        `"${s.equityCard}"`,
        `"${s.address.replace(/"/g, '""')}"`,
        `"${s.guardian.name}"`,
        s.guardian.phone
      ]);
      csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    } else if (reportCategory === 'academic') {
      fileName = `របាយការណ៍លទ្ធផលសិក្សាមេ_${schoolInfo.schoolName}_${new Date().toISOString().split('T')[0]}.csv`;
      const headers = ['អត្តលេខ', 'ឈ្មោះសិស្ស', 'ថ្នាក់ទី-បន្ទប់', 'មធ្យមភាគពិន្ទុ', 'ចំណាត់ថ្នាក់', 'និទ្ទេស', 'វត្តមាន (%)'];
      const rows = students.map(s => [
        s.studentId,
        `"${s.lastName} ${s.firstName}"`,
        `"${s.grade} (${s.section})"`,
        s.gpa.toFixed(1),
        s.rankInClass,
        s.gpa >= 8 ? 'ល្អប្រសើរ' : s.gpa >= 6.5 ? 'ល្អ' : 'មធ្យម',
        `${s.attendancePercentage}%`
      ]);
      csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    } else if (reportCategory === 'teachers') {
      fileName = `របាយការណ៍គ្រូបង្រៀនតាមប្រភេទមេ_${schoolInfo.schoolName}_${new Date().toISOString().split('T')[0]}.csv`;
      const headers = ['អត្តលេខបុគ្គលិក', 'គោត្តនាម & នាម', 'ភេទ', 'ប្រភេទគ្រូបង្រៀន', 'កម្រិតផ្នែក', 'សញ្ញាបត្រគរុកោសល្យ', 'លេខទូរស័ព្ទ', 'ថ្នាក់បន្ទុក'];
      const targetList = teacherCatFilter === 'All' ? teachers : teachers.filter(t => t.teacherCategory === teacherCatFilter);
      const rows = targetList.map(t => [
        t.employeeId,
        `"${t.lastName} ${t.firstName}"`,
        t.gender || 'ប្រុស',
        `"${t.teacherCategory || 'គ្រូក្របខ័ណ្ឌ'}"`,
        `"${t.department}"`,
        `"${t.qualification}"`,
        t.phone,
        `"${t.assignedClasses.join('; ')}"`
      ]);
      csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    } else if (reportCategory === 'ssc' || reportCategory === 'smc') {
      const type = reportCategory === 'ssc' ? 'គគថ' : 'គគស';
      fileName = `របាយការណ៍${type}_${schoolInfo.schoolName}_${new Date().toISOString().split('T')[0]}.csv`;
      const committeeMembers = committees.filter(m => m.committeeType === type);
      const headers = ['ល.រ', 'ឈ្មោះសមាជិក', 'ភេទ', 'តួនាទីក្នុងគណៈកម្មាធិការ', 'តួនាទី/មុខរបរក្រៅសាលា', 'កម្រិតវប្បធម៌', 'លេខទូរស័ព្ទ', 'ឆ្នាំចូលរួម'];
      const rows = committeeMembers.map((m, idx) => [
        idx + 1,
        `"${m.name}"`,
        m.gender,
        `"${m.role}"`,
        `"${m.externalRole}"`,
        `"${m.education}"`,
        m.phone,
        m.joinedYear
      ]);
      csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    } else if (reportCategory === 'census') {
      fileName = `របាយការណ៍ជំរឿនកុមារភូមិចំណុះ_${schoolInfo.schoolName}_${new Date().toISOString().split('T')[0]}.csv`;
      const headers = ['កូដកុមារ', 'ឈ្មោះកុមារ', 'ភេទ', 'ថ្ងៃកំណើត', 'អាយុ', 'ភូមិចំណុះ', 'អាណាព្យាបាល', 'លេខទូរស័ព្ទ', 'ស្ថានភាពសិក្សា', 'សាលារៀន/ថ្នាក់'];
      const rows = censusChildren.map(c => [
        c.childCode,
        `"${c.name}"`,
        c.gender,
        c.dob,
        c.age,
        `"${c.village}"`,
        `"${c.guardianName}"`,
        c.guardianPhone,
        `"${c.status}"`,
        `"${c.enrolledSchool} ${c.enrolledGrade}"`
      ]);
      csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    } else if (reportCategory === 'preschool') {
      fileName = `របាយការណ៍វាយតម្លៃមត្តេយ្យ_${schoolInfo.schoolName}_${new Date().toISOString().split('T')[0]}.csv`;
      const headers = ['ឈ្មោះសិស្ស', 'ភេទ', 'ថ្ងៃកំណើត', 'ដំណាក់កាល', 'គ្រូវាយតម្លៃ', 'ពាក្យសម្គាល់រួម', 'កាលបរិច្ឆេទ'];
      const rows = preschoolAssessments.map(p => [
        `"${p.studentName}"`,
        p.gender,
        p.dob,
        `"${p.term}"`,
        `"${p.evaluatorTeacherName}"`,
        `"${p.overallRemarks.replace(/"/g, '""')}"`,
        p.date
      ]);
      csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    } else if (reportCategory === 'support') {
      fileName = `របាយការណ៍ជំនួយសិស្ស_NSAF_${schoolInfo.schoolName}_${new Date().toISOString().split('T')[0]}.csv`;
      const headers = ['ឈ្មោះសិស្ស', 'ភេទ', 'ថ្នាក់', 'បណ្ណសមធម៌', 'ប្រភេទទ្រទ្រង់', 'អ្នកផ្តល់ជំនួយ', 'តម្លៃ/សម្ភារ', 'លទ្ធផល NSAF', 'ប្រាក់ឧបត្ថម្ភ (៛)'];
      const rows = studentSupports.map(s => [
        `"${s.studentName}"`,
        s.gender,
        `"${s.grade} (${s.section})"`,
        `"${s.equityStatus}"`,
        `"${s.category}"`,
        `"${s.providerName}"`,
        `"${s.amountOrValue}"`,
        `"${s.nsafConditionStatus || '-'}"`,
        s.monthlyAllowanceRiel || 0
      ]);
      csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    } else if (reportCategory === 'activities') {
      fileName = `របាយការណ៍សកម្មភាពសាលា_${schoolInfo.schoolName}_${new Date().toISOString().split('T')[0]}.csv`;
      const headers = ['ឈ្មោះសកម្មភាព', 'ប្រភេទ', 'ស្ដង់ដារ', 'កាលបរិច្ឆេទ', 'អ្នកដឹកនាំ', 'ចំនួនអ្នកចូលរួម'];
      const rows = schoolActivities.map(a => [
        `"${a.title.replace(/"/g, '""')}"`,
        `"${a.activityType}"`,
        `"${a.standardCategory || '-'}"`,
        `"${a.date}"`,
        `"${a.leadPerson}"`,
        a.participantsCount
      ]);
      csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    } else if (reportCategory === 'parentMeetings') {
      fileName = `របាយការណ៍ប្រជុំមាតាបិតា_${schoolInfo.schoolName}_${new Date().toISOString().split('T')[0]}.csv`;
      const headers = ['កាលបរិច្ឆេទ', 'ម៉ោង', 'របៀបវារៈប្រជុំ', 'សមាសភាពចូលរួម', 'អ្នកទទួលខុសត្រូវ', 'លទ្ធផលរំពឹងទុក', 'ស្ថានភាព'];
      const rows = parentMeetingPlans.map(pm => [
        pm.plannedDate,
        `"${pm.time}"`,
        `"${pm.agendaTopic.replace(/"/g, '""')}"`,
        `"${pm.targetAudience}"`,
        `"${pm.responsiblePerson}"`,
        `"${pm.expectedOutput}"`,
        `"${pm.status}"`
      ]);
      csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    } else if (reportCategory === 'inventory') {
      fileName = `របាយការណ៍សារពើភ័ណ្ឌ_ហិរញ្ញវត្ថុ_${schoolInfo.schoolName}_${new Date().toISOString().split('T')[0]}.csv`;
      const headers = ['កូដសូជី', 'ឈ្មោះសម្ភារៈ', 'ប្រភេទ', 'ចំនួន', 'ស្ថានភាព', 'ទីតាំង', 'តម្លៃ (៛)', 'ថ្ងៃទទួលបាន'];
      const rows = schoolAssets.map(ast => [
        ast.assetCode,
        `"${ast.name}"`,
        `"${ast.category}"`,
        ast.quantity,
        `"${ast.condition}"`,
        `"${ast.locationRoom}"`,
        ast.valueRiel || 0,
        ast.acquisitionDate
      ]);
      csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    } else {
      fileName = `របាយការណ៍ស្ដង់ដារគំរូ_${schoolInfo.schoolName}_${new Date().toISOString().split('T')[0]}.csv`;
      csvContent = 'ស្ដង់ដារ,សូចនាករ,លទ្ធផលសម្រេច\nស្ដង់ដារទី១,លទ្ធផលសិក្សា,៩៨%\nស្ដង់ដារទី២,ការបង្រៀន និងរៀន,៩៦%\nស្ដង់ដារទី៣,ការចូលរួមសហគមន៍,៩៥%\nស្ដង់ដារទី៤,ប្រតិបត្តិការ & គ្រប់គ្រង,៩៧%\nស្ដង់ដារទី៥,គណនេយ្យភាព & បរិស្ថាន,៩៤%';
    }

    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* Top Banner Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-slate-900 via-indigo-950 to-brand-950 p-6 sm:p-8 rounded-3xl border border-indigo-800/40 text-white shadow-xl no-print">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-brand-500/20 text-brand-300 border border-brand-400/30 flex items-center gap-1.5">
              <FileSpreadsheet className="w-3.5 h-3.5" /> ទិន្នន័យមេ (Master Database Reports)
            </span>
            <span className="text-xs text-slate-300">ឆ្នាំសិក្សា {schoolInfo.academicYear}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            {language === 'km' ? 'មជ្ឈមណ្ឌលរបាយការណ៍មេ និងស្ថិតិសាលារៀន' : 'Master School Reports & Analytics Center'}
          </h2>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl">
            គ្រប់គ្រងរបាយការណ៍មេទាំង ១៣ ប្រភេទ៖ ស្ដង់ដារគំរូ, ស្ថិតិសិស្ស, បណ្ណសមធម៌, លទ្ធផលសិក្សា, គ្រូបង្រៀន, គគថ, គគស, ជំរឿនកុមារ, មត្តេយ្យ, ជំនួយសិស្ស (NSAF), សកម្មភាពសាលា, ប្រជុំមាតាបិតា, និងសារពើភ័ណ្ឌ/ហិរញ្ញវត្ថុ
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs rounded-xl shadow-md transition-all"
          >
            <Download className="w-4 h-4" /> ទាញយក CSV / Excel
          </button>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs rounded-xl shadow-md transition-all"
          >
            <Printer className="w-4 h-4" /> បោះពុម្ភរបាយការណ៍
          </button>
        </div>
      </div>

      {/* Master Category Tabs Bar (All 13 Report Tabs) */}
      <div className="glass-card p-4 flex items-center gap-2 overflow-x-auto no-print scrollbar-thin">
        <button
          onClick={() => setReportCategory('standards')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black shrink-0 transition-all ${
            reportCategory === 'standards'
              ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md'
              : 'bg-purple-100 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300'
          }`}
        >
          <ShieldCheck className="w-4 h-4 text-amber-400" /> ⭐ ៥ ស្ដង់ដារគំរូ
        </button>

        <button
          onClick={() => setReportCategory('enrollment')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black shrink-0 transition-all ${
            reportCategory === 'enrollment'
              ? 'bg-brand-600 text-white shadow-md'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
          }`}
        >
          <Users className="w-4 h-4" /> ស្ថិតិសិស្សតាមថ្នាក់
        </button>

        <button
          onClick={() => setReportCategory('equity')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black shrink-0 transition-all ${
            reportCategory === 'equity'
              ? 'bg-rose-600 text-white shadow-md'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
          }`}
        >
          <Building2 className="w-4 h-4" /> បណ្ណសមធម៌ (IDPoor)
        </button>

        <button
          onClick={() => setReportCategory('academic')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black shrink-0 transition-all ${
            reportCategory === 'academic'
              ? 'bg-amber-600 text-white shadow-md'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
          }`}
        >
          <Award className="w-4 h-4" /> លទ្ធផលសិក្សា & កិត្តិយស
        </button>

        <button
          onClick={() => setReportCategory('teachers')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black shrink-0 transition-all ${
            reportCategory === 'teachers'
              ? 'bg-purple-600 text-white shadow-md'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
          }`}
        >
          <GraduationCap className="w-4 h-4" /> គ្រូបង្រៀន (ក្របខ័ណ្ឌ/កិច្ចសន្យា/កិច្ចព្រមព្រៀង)
        </button>

        <button
          onClick={() => setReportCategory('ssc')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black shrink-0 transition-all ${
            reportCategory === 'ssc'
              ? 'bg-amber-700 text-white shadow-md'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
          }`}
        >
          <Building2 className="w-4 h-4" /> គណៈកម្មាធិការ គគថ (SSC)
        </button>

        <button
          onClick={() => setReportCategory('smc')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black shrink-0 transition-all ${
            reportCategory === 'smc'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
          }`}
        >
          <ShieldCheck className="w-4 h-4" /> គណៈកម្មាធិការ គគស (SMC)
        </button>

        <button
          onClick={() => setReportCategory('census')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black shrink-0 transition-all ${
            reportCategory === 'census'
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
          }`}
        >
          <Users className="w-4 h-4" /> ជំរឿនកុមារភូមិចំណុះ
        </button>

        <button
          onClick={() => setReportCategory('preschool')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black shrink-0 transition-all ${
            reportCategory === 'preschool'
              ? 'bg-amber-600 text-white shadow-md'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
          }`}
        >
          <Award className="w-4 h-4" /> វាយតម្លៃមត្តេយ្យ
        </button>

        <button
          onClick={() => setReportCategory('support')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black shrink-0 transition-all ${
            reportCategory === 'support'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
          }`}
        >
          <HeartHandshake className="w-4 h-4" /> ជំនួយសិស្ស & NSAF
        </button>

        <button
          onClick={() => setReportCategory('activities')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black shrink-0 transition-all ${
            reportCategory === 'activities'
              ? 'bg-purple-600 text-white shadow-md'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" /> សកម្មភាព & ស្ដង់ដារ
        </button>

        <button
          onClick={() => setReportCategory('parentMeetings')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black shrink-0 transition-all ${
            reportCategory === 'parentMeetings'
              ? 'bg-indigo-700 text-white shadow-md'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
          }`}
        >
          <Calendar className="w-4 h-4" /> ផែនការប្រជុំមាតាបិតា
        </button>

        <button
          onClick={() => setReportCategory('inventory')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black shrink-0 transition-all ${
            reportCategory === 'inventory'
              ? 'bg-cyan-600 text-white shadow-md'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
          }`}
        >
          <Package className="w-4 h-4" /> សារពើភ័ណ្ឌ & ហិរញ្ញវត្ថុ
        </button>
      </div>

      {/* REPORT VIEW 0: 5 Model School Standards Auto-Mapped Dashboard */}
      {reportCategory === 'standards' && (
        <div className="glass-card p-6 space-y-6 no-print">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-purple-500 text-white">
                  MoEYS 5 Standards
                </span>
                <h3 className="text-lg font-black text-slate-900 dark:text-slate-100">
                  របាយការណ៍ស្វ័យប្រវត្តិតាម ៥ ស្ដង់ដារសាលារៀនគំរូ ថ្នាក់ជាតិ
                </h3>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                ប្រព័ន្ធភ្ជាប់ និងបែកចែករាល់របាយការណ៍សាលារៀនទាំងអស់ ចូលតាមស្ដង់ដារនីមួយៗស្វ័យប្រវត្តិ សម្រាប់ការវាយតម្លៃ
              </p>
            </div>
            <span className="px-3.5 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-extrabold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500" /> ជាប់ជាសាលារៀនស្ដង់ដារគំរូ (៩៦.៨%)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Standard 1 */}
            <div className="p-5 rounded-2xl border border-emerald-200 dark:border-emerald-900/40 bg-emerald-50/30 dark:bg-emerald-950/20 space-y-3">
              <div className="flex items-center justify-between border-b border-emerald-200 dark:border-emerald-900/40 pb-2">
                <span className="px-2.5 py-1 text-xs font-black rounded-full bg-emerald-600 text-white">
                  ស្ដង់ដារទី១ ៖ លទ្ធផលសិក្សាសិស្ស
                </span>
                <span className="text-xs font-extrabold text-emerald-600">៩៨%</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                អត្រាឡើងថ្នាក់ ៩៨.៥%, អត្រាបោះបង់ ០.៨%, តេស្តអាន/គណិត ជាប់ ៩០%+
              </p>
              <div className="space-y-2 pt-1 text-xs">
                <div className="p-2.5 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-emerald-100 dark:border-emerald-900/30 flex items-center justify-between">
                  <span className="font-bold text-slate-800 dark:text-slate-200">១. សៀវភៅពិន្ទុ & ចំណាត់ថ្នាក់</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300">{students.length} សិស្ស</span>
                </div>
                <div className="p-2.5 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-emerald-100 dark:border-emerald-900/30 flex items-center justify-between">
                  <span className="font-bold text-slate-800 dark:text-slate-200">២. បណ្ណសរសើរ & ជ័យលាភី</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300">ថ្នាក់ទី១-៦</span>
                </div>
              </div>
            </div>

            {/* Standard 2 */}
            <div className="p-5 rounded-2xl border border-blue-200 dark:border-blue-900/40 bg-blue-50/30 dark:bg-blue-950/20 space-y-3">
              <div className="flex items-center justify-between border-b border-blue-200 dark:border-blue-900/40 pb-2">
                <span className="px-2.5 py-1 text-xs font-black rounded-full bg-blue-600 text-white">
                  ស្ដង់ដារទី២ ៖ ការបង្រៀន & រៀន
                </span>
                <span className="text-xs font-extrabold text-blue-600">៩៦%</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                កិច្ចតែងការ MoEYS ១០០%, កាលវិភាគ ៣០ម៉ោង/សប្ដាហ៍, ប្រជុំបច្ចេកទេស ២ដង/ខែ
              </p>
              <div className="space-y-2 pt-1 text-xs">
                <div className="p-2.5 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-blue-100 dark:border-blue-900/30 flex items-center justify-between">
                  <span className="font-bold text-slate-800 dark:text-slate-200">១. បញ្ជីឈ្មោះគ្រូបង្រៀន</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300">{teachers.length} នាក់</span>
                </div>
                <div className="p-2.5 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-blue-100 dark:border-blue-900/30 flex items-center justify-between">
                  <span className="font-bold text-slate-800 dark:text-slate-200">២. ឧបករណ៍វាយតម្លៃមត្តេយ្យ</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300">{preschoolAssessments.length} ឯកសារ</span>
                </div>
              </div>
            </div>

            {/* Standard 3 */}
            <div className="p-5 rounded-2xl border border-amber-200 dark:border-amber-900/40 bg-amber-50/30 dark:bg-amber-950/20 space-y-3">
              <div className="flex items-center justify-between border-b border-amber-200 dark:border-amber-900/40 pb-2">
                <span className="px-2.5 py-1 text-xs font-black rounded-full bg-amber-600 text-white">
                  ស្ដង់ដារទី៣ ៖ ការចូលរួមសហគមន៍
                </span>
                <span className="text-xs font-extrabold text-amber-600">៩៥%</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                គគថ ប្រជុំ ៣ដង/ឆ្នាំ, ផែនការប្រជុំមាតាបិតា ៣លើក, វិភាគទានសហគមន៍
              </p>
              <div className="space-y-2 pt-1 text-xs">
                <div className="p-2.5 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-amber-100 dark:border-amber-900/30 flex items-center justify-between">
                  <span className="font-bold text-slate-800 dark:text-slate-200">១. គណៈកម្មាធិការ គគថ (SSC)</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300">{committees.filter(m => m.committeeType === 'គគថ').length} សមាជិក</span>
                </div>
                <div className="p-2.5 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-amber-100 dark:border-amber-900/30 flex items-center justify-between">
                  <span className="font-bold text-slate-800 dark:text-slate-200">២. ផែនការប្រជុំមាតាបិតា</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300">{parentMeetingPlans.length} លើក/ឆ្នាំ</span>
                </div>
              </div>
            </div>

            {/* Standard 4 */}
            <div className="p-5 rounded-2xl border border-purple-200 dark:border-purple-900/40 bg-purple-50/30 dark:bg-purple-950/20 space-y-3">
              <div className="flex items-center justify-between border-b border-purple-200 dark:border-purple-900/40 pb-2">
                <span className="px-2.5 py-1 text-xs font-black rounded-full bg-purple-600 text-white">
                  ស្ដង់ដារទី៤ ៖ ប្រតិបត្តិការ & គ្រប់គ្រង
                </span>
                <span className="text-xs font-extrabold text-purple-600">៩៧%</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                គគស, ផែនការ SDP, ជំរឿនកុមារភូមិចំណុះ ១០០%, វត្តមាន & ថវិការដ្ឋ PB
              </p>
              <div className="space-y-2 pt-1 text-xs">
                <div className="p-2.5 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-purple-100 dark:border-purple-900/30 flex items-center justify-between">
                  <span className="font-bold text-slate-800 dark:text-slate-200">១. គណៈកម្មាធិការ គគស (SMC)</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300">{committees.filter(m => m.committeeType === 'គគស').length} សមាជិក</span>
                </div>
                <div className="p-2.5 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-purple-100 dark:border-purple-900/30 flex items-center justify-between">
                  <span className="font-bold text-slate-800 dark:text-slate-200">២. ជំរឿនកុមារភូមិចំណុះ</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300">{censusChildren.length} កុមារ</span>
                </div>
                <div className="p-2.5 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-purple-100 dark:border-purple-900/30 flex items-center justify-between">
                  <span className="font-bold text-slate-800 dark:text-slate-200">៣. គ្រប់គ្រងសម្ភារៈសារពើភ័ណ្ឌ</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300">{schoolAssets.length} មុខ</span>
                </div>
              </div>
            </div>

            {/* Standard 5 */}
            <div className="p-5 rounded-2xl border border-cyan-200 dark:border-cyan-900/40 bg-cyan-50/30 dark:bg-cyan-950/20 space-y-3">
              <div className="flex items-center justify-between border-b border-cyan-200 dark:border-cyan-900/40 pb-2">
                <span className="px-2.5 py-1 text-xs font-black rounded-full bg-cyan-600 text-white">
                  ស្ដង់ដារទី៥ ៖ គណនេយ្យភាព & បរិស្ថាន
                </span>
                <span className="text-xs font-extrabold text-cyan-600">៩៤%</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                បរិស្ថានបៃតង, ទឹកស្អាត-បន្ទប់ទឹកអនាម័យ, អាហារ WFP, អាហារូបករណ៍រដ្ឋ
              </p>
              <div className="space-y-2 pt-1 text-xs">
                <div className="p-2.5 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-cyan-100 dark:border-cyan-900/30 flex items-center justify-between">
                  <span className="font-bold text-slate-800 dark:text-slate-200">១. ជំនួយសិស្ស & អាហារ WFP</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-100 text-cyan-800 dark:bg-cyan-900/40 dark:text-cyan-300">{studentSupports.length} សិស្ស</span>
                </div>
                <div className="p-2.5 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-cyan-100 dark:border-cyan-900/30 flex items-center justify-between">
                  <span className="font-bold text-slate-800 dark:text-slate-200">២. បញ្ជីប្រគល់-ទទួលសម្ភារៈ</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-100 text-cyan-800 dark:bg-cyan-900/40 dark:text-cyan-300">{materialHandovers.length} លើក</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* REPORT VIEW 1: Enrollment Roster */}
      {reportCategory === 'enrollment' && (
        <div className="glass-card p-6 space-y-6 no-print">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-slate-100">
                តារាងស្ថិតិសិស្សានុសិស្ស តាមកម្រិតថ្នាក់ និងបន្ទប់សិក្សា (មត្តេយ្យទាប, មធ្យម, ខ្ពស់ និងថ្នាក់ទី១ ដល់ ទី៦)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                ទិន្នន័យមេស្ដង់ដារក្រសួងអប់រំ យុវជន និងកីឡា
              </p>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-black bg-brand-500/10 text-brand-600 dark:text-brand-400">
              សិស្សសរុប {students.length} នាក់
            </span>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-extrabold border-b border-slate-200 dark:border-slate-700">
                  <th className="p-3">ថ្នាក់រៀន</th>
                  <th className="p-3 text-center">បន្ទប់ (Section)</th>
                  <th className="p-3 text-center">សិស្សសរុប</th>
                  <th className="p-3 text-center text-pink-600 dark:text-pink-400">ស្រី</th>
                  <th className="p-3 text-center text-blue-600 dark:text-blue-400">ប្រុស</th>
                  <th className="p-3">គ្រូបន្ទុកថ្នាក់ (Homeroom Teacher)</th>
                  <th className="p-3 text-center">បន្ទប់រៀន</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                {classes.map(cls => {
                  const clsStudents = students.filter(s => s.grade.includes(cls.gradeLevel) && s.section === cls.section);
                  const femaleCount = clsStudents.filter(s => s.gender === 'ស្រី' || s.gender === 'Female').length;
                  const maleCount = clsStudents.length - femaleCount;
                  const teacher = teachers.find(t => t.id === cls.classTeacherId);

                  return (
                    <tr key={cls.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                      <td className="p-3 font-extrabold text-slate-900 dark:text-slate-100">{cls.name}</td>
                      <td className="p-3 text-center">
                        <span className="px-2.5 py-0.5 rounded-md font-black bg-brand-500/10 text-brand-600">
                          បន្ទប់ {cls.section}
                        </span>
                      </td>
                      <td className="p-3 text-center font-bold text-slate-900 dark:text-slate-100">{clsStudents.length} នាក់</td>
                      <td className="p-3 text-center font-bold text-pink-600 dark:text-pink-400">{femaleCount} នាក់</td>
                      <td className="p-3 text-center font-bold text-blue-600 dark:text-blue-400">{maleCount} នាក់</td>
                      <td className="p-3 font-extrabold text-purple-600 dark:text-purple-400">
                        {teacher ? `${teacher.lastName} ${teacher.firstName}` : 'មិនទាន់ចាត់តាំង'}
                      </td>
                      <td className="p-3 text-center text-slate-500 font-medium">{cls.roomNumber}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* REPORT VIEW 2: Equity IDPoor Report */}
      {reportCategory === 'equity' && (
        <div className="glass-card p-6 space-y-6 no-print">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-slate-100">
                តារាងបញ្ជីឈ្មោះសិស្សទទួលបានបណ្ណសមធម៌ (ក្រ១ និង ក្រ២)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                ស្ថិតិគាំទ្រការឧបត្ថម្ភសាច់ប្រាក់ និងអាហារូបករណ៍រដ្ឋ
              </p>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-black bg-rose-500/10 text-rose-600 dark:text-rose-400">
              សរុប {students.filter(s => s.equityCard && !s.equityCard.includes('គ្មាន')).length} នាក់
            </span>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-extrabold border-b border-slate-200 dark:border-slate-700">
                  <th className="p-3">អត្តលេខ</th>
                  <th className="p-3">ឈ្មោះសិស្ស</th>
                  <th className="p-3 text-center">ភេទ</th>
                  <th className="p-3 text-center">ថ្នាក់ទី-បន្ទប់</th>
                  <th className="p-3 text-center">ប្រភេទបណ្ណសមធម៌</th>
                  <th className="p-3">អាស័យដ្ឋានបច្ចុប្បន្ន</th>
                  <th className="p-3">អាណាព្យាបាល & លេខទូរស័ព្ទ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                {students
                  .filter(s => s.equityCard && !s.equityCard.includes('គ្មាន'))
                  .map(s => (
                    <tr key={s.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                      <td className="p-3 font-mono text-[11px] font-bold">{s.studentId}</td>
                      <td className="p-3 font-extrabold text-slate-900 dark:text-slate-100">{s.lastName} {s.firstName}</td>
                      <td className="p-3 text-center">{s.gender}</td>
                      <td className="p-3 text-center font-bold">{s.grade} ({s.section})</td>
                      <td className="p-3 text-center">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                          s.equityCard?.includes('ក្រ១') ? 'bg-rose-100 text-rose-700 border border-rose-300' : 'bg-amber-100 text-amber-700 border border-amber-300'
                        }`}>
                          {s.equityCard}
                        </span>
                      </td>
                      <td className="p-3 text-slate-600 dark:text-slate-400 truncate max-w-xs">{s.address}</td>
                      <td className="p-3">
                        <p className="font-bold text-slate-800 dark:text-slate-200">{s.guardian.name} ({s.guardian.relationship})</p>
                        <p className="font-mono text-[10px] text-slate-500">{s.guardian.phone}</p>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* REPORT VIEW 3: Academic Results & Honor Roll */}
      {reportCategory === 'academic' && (
        <div className="glass-card p-6 space-y-6 no-print">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-slate-100">
                តារាងលទ្ធផលប្រឡង និងកិត្តិយសសិស្សពូកែប្រចាំសាលា
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                ប្រព័ន្ធសៀវភៅពិន្ទុ ១៣ មុខវិជ្ជា និងតារាងចំណាត់ថ្នាក់
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-black text-amber-600 dark:text-amber-400 uppercase tracking-wider">
              🏆 តារាងកិត្តិយសសិស្សពូកែ (Top Performance Roster)
            </h4>
            <div className="overflow-x-auto rounded-2xl border border-amber-200 dark:border-amber-800/60">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 font-extrabold border-b border-amber-200 dark:border-amber-800">
                    <th className="p-3 text-center w-12">ល.រ</th>
                    <th className="p-3 font-mono">អត្តលេខ</th>
                    <th className="p-3">ឈ្មោះសិស្សពូកែ</th>
                    <th className="p-3 text-center">ភេទ</th>
                    <th className="p-3 text-center">ថ្នាក់ទី-បន្ទប់</th>
                    <th className="p-3 text-center">មធ្យមភាគ (/១០)</th>
                    <th className="p-3 text-center">និទ្ទេស</th>
                    <th className="p-3 text-center text-red-600 dark:text-red-400 font-black">ចំណាត់ថ្នាក់</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                  {students
                    .filter(s => s.rankInClass <= 3)
                    .sort((a, b) => a.rankInClass - b.rankInClass)
                    .map((s, idx) => (
                      <tr key={s.id} className="hover:bg-amber-50/50 dark:hover:bg-amber-950/20">
                        <td className="p-3 text-center font-bold text-slate-700 dark:text-slate-300">{idx + 1}</td>
                        <td className="p-3 font-mono text-[11px] font-bold">{s.studentId}</td>
                        <td className="p-3 font-extrabold text-slate-900 dark:text-slate-100">{s.lastName} {s.firstName}</td>
                        <td className="p-3 text-center">{s.gender}</td>
                        <td className="p-3 text-center font-bold">{s.grade} ({s.section})</td>
                        <td className="p-3 text-center font-black text-brand-600">{s.gpa.toFixed(1)}</td>
                        <td className="p-3 text-center">
                          <span className="px-2 py-0.5 rounded font-extrabold bg-emerald-100 text-emerald-800">
                            ល្អប្រសើរ (A)
                          </span>
                        </td>
                        <td className="p-3 text-center font-extrabold text-red-600 dark:text-red-400" style={{ color: 'red' }}>
                          🏆 ទី{s.rankInClass}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* REPORT VIEW 4: Faculty Roster by Category */}
      {reportCategory === 'teachers' && (
        <div className="glass-card p-6 space-y-6 no-print">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-slate-100">
                បញ្ជីឈ្មោះលោកគ្រូ អ្នកគ្រូ និងការបែងចែកប្រភេទបុគ្គលិកអប់រំ
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                ជ្រើសរើសប្រភេទ៖ គ្រូក្របខ័ណ្ឌ, គ្រូកិច្ចសន្យា និងគ្រូផ្អែកលើកិច្ចព្រមព្រៀង
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-purple-500" />
              <select
                value={teacherCatFilter}
                onChange={(e) => setTeacherCatFilter(e.target.value)}
                className="px-3.5 py-2 text-xs font-extrabold bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-purple-700 dark:text-purple-300"
              >
                <option value="All">គ្រប់ប្រភេទគ្រូ ({teachers.length} នាក់)</option>
                <option value="គ្រូក្របខ័ណ្ឌ">🏛️ គ្រូក្របខ័ណ្ឌ ({teachers.filter(t => t.teacherCategory === 'គ្រូក្របខ័ណ្ឌ').length})</option>
                <option value="គ្រូកិច្ចសន្យា">📝 គ្រូកិច្ចសន្យា ({teachers.filter(t => t.teacherCategory === 'គ្រូកិច្ចសន្យា').length})</option>
                <option value="គ្រូផ្អែកលើកិច្ចព្រមព្រៀង">🤝 គ្រូផ្អែកលើកិច្ចព្រមព្រៀង ({teachers.filter(t => t.teacherCategory === 'គ្រូផ្អែកលើកិច្ចព្រមព្រៀង').length})</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-extrabold border-b border-slate-200 dark:border-slate-700">
                  <th className="p-3">អត្តលេខបុគ្គលិក</th>
                  <th className="p-3">គោត្តនាម & នាម</th>
                  <th className="p-3 text-center">ភេទ</th>
                  <th className="p-3 text-center">ប្រភេទគ្រូបង្រៀន</th>
                  <th className="p-3">កម្រិតផ្នែក / ជំនាញ</th>
                  <th className="p-3">កម្រិតវប្បធម៌ / សញ្ញាបត្រ</th>
                  <th className="p-3 font-mono">លេខទូរស័ព្ទ</th>
                  <th className="p-3">ថ្នាក់បន្ទុកទទួលខុសត្រូវ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                {(teacherCatFilter === 'All' ? teachers : teachers.filter(t => t.teacherCategory === teacherCatFilter)).map(t => (
                  <tr key={t.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="p-3 font-mono text-[11px] font-bold">{t.employeeId}</td>
                    <td className="p-3 font-extrabold text-slate-900 dark:text-slate-100">{t.lastName} {t.firstName}</td>
                    <td className="p-3 text-center">{t.gender || 'ប្រុស'}</td>
                    <td className="p-3 text-center">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                        t.teacherCategory === 'គ្រូក្របខ័ណ្ឌ' ? 'bg-purple-100 text-purple-700 border border-purple-300' :
                        t.teacherCategory === 'គ្រូកិច្ចសន្យា' ? 'bg-blue-100 text-blue-700 border border-blue-300' :
                        'bg-emerald-100 text-emerald-700 border border-emerald-300'
                      }`}>
                        {t.teacherCategory === 'គ្រូក្របខ័ណ្ឌ' ? '🏛️ គ្រូក្របខ័ណ្ឌ' :
                         t.teacherCategory === 'គ្រូកិច្ចសន្យា' ? '📝 គ្រូកិច្ចសន្យា' :
                         '🤝 ផ្អែកលើកិច្ចព្រមព្រៀង'}
                      </span>
                    </td>
                    <td className="p-3 text-slate-600 dark:text-slate-400 font-bold">{t.department}</td>
                    <td className="p-3 text-slate-600 dark:text-slate-400">{t.qualification}</td>
                    <td className="p-3 font-mono">{t.phone}</td>
                    <td className="p-3">
                      <div className="flex flex-wrap gap-1">
                        {t.assignedClasses.map(ac => (
                          <span key={ac} className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-purple-100 text-purple-700">
                            {ac}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* REPORT VIEW 5 & 6: Committees SSC & SMC Reports */}
      {(reportCategory === 'ssc' || reportCategory === 'smc') && (
        <div className="glass-card p-6 space-y-6 no-print">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-slate-100">
                របាយការណ៍បញ្ជីឈ្មោះសមាជិក និងរចនាសម្ព័ន្ធ {reportCategory === 'ssc' ? 'គណៈកម្មាធិការទ្រទ្រង់សាលារៀន (គគថ - SSC)' : 'គណៈកម្មាធិការគ្រប់គ្រងសាលារៀន (គគស - SMC)'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                បញ្ជីឈ្មោះសមាជិក តួនាទី អាស័យដ្ឋាន និងទំនាក់ទំនង
              </p>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-black bg-amber-500/10 text-amber-600 dark:text-amber-400">
              សរុប {committees.filter(m => m.committeeType === (reportCategory === 'ssc' ? 'គគថ' : 'គគស')).length} នាក់
            </span>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 font-extrabold border-b border-amber-200 dark:border-amber-800">
                  <th className="p-3 text-center">ល.រ</th>
                  <th className="p-3">គោត្តនាម - នាម</th>
                  <th className="p-3 text-center">ភេទ</th>
                  <th className="p-3 text-center">តួនាទីក្នុងគណៈកម្មាធិការ</th>
                  <th className="p-3">តួនាទី/មុខរបរក្រៅសាលា</th>
                  <th className="p-3">កម្រិតវប្បធម៌</th>
                  <th className="p-3 font-mono">លេខទូរស័ព្ទ</th>
                  <th className="p-3 text-center">ឆ្នាំចូលរួម</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                {committees
                  .filter(m => m.committeeType === (reportCategory === 'ssc' ? 'គគថ' : 'គគស'))
                  .map((m, idx) => (
                    <tr key={m.id} className="hover:bg-amber-50/40 dark:hover:bg-amber-950/20">
                      <td className="p-3 text-center font-bold">{idx + 1}</td>
                      <td className="p-3 font-extrabold text-slate-900 dark:text-slate-100">{m.name}</td>
                      <td className="p-3 text-center">{m.gender}</td>
                      <td className="p-3 text-center">
                        <span className="px-2.5 py-0.5 rounded-full font-black bg-amber-500 text-white text-[10px]">
                          {m.role}
                        </span>
                      </td>
                      <td className="p-3 font-bold text-amber-800 dark:text-amber-300">{m.externalRole}</td>
                      <td className="p-3 text-slate-600 dark:text-slate-400">{m.education}</td>
                      <td className="p-3 font-mono">{m.phone}</td>
                      <td className="p-3 text-center font-mono">{m.joinedYear}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* REPORT VIEW 7: Catchment Census Children */}
      {reportCategory === 'census' && (
        <div className="glass-card p-6 space-y-6 no-print">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-slate-100">
                របាយការណ៍ស្ថិតិជំរឿនកុមារគ្រប់អាយុ ៦-១១ ឆ្នាំ ក្នុងភូមិចំណុះ
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                ស្ថិតិកុមារចូលរៀន មិនទាន់ចូលរៀន និងភូមិចំណុះ
              </p>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-black bg-blue-500/10 text-blue-600 dark:text-blue-400">
              សរុប {censusChildren.length} កុមារ
            </span>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-extrabold border-b border-slate-200 dark:border-slate-700">
                  <th className="p-3">កូដកុមារ</th>
                  <th className="p-3">ឈ្មោះកុមារ</th>
                  <th className="p-3 text-center">ភេទ</th>
                  <th className="p-3 text-center">អាយុ</th>
                  <th className="p-3">ភូមិចំណុះ</th>
                  <th className="p-3">អាណាព្យាបាល & លេខទូរស័ព្ទ</th>
                  <th className="p-3 text-center">ស្ថានភាពសិក្សា</th>
                  <th className="p-3">សាលារៀន/ថ្នាក់</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                {censusChildren.map(c => (
                  <tr key={c.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="p-3 font-mono font-bold text-blue-600">{c.childCode}</td>
                    <td className="p-3 font-extrabold text-slate-900 dark:text-slate-100">{c.name}</td>
                    <td className="p-3 text-center">{c.gender}</td>
                    <td className="p-3 text-center font-bold">{c.age} ឆ្នាំ</td>
                    <td className="p-3 font-bold">{c.village}</td>
                    <td className="p-3">
                      <p className="font-bold">{c.guardianName}</p>
                      <p className="font-mono text-[10px] text-slate-500">{c.guardianPhone}</p>
                    </td>
                    <td className="p-3 text-center">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black ${
                        c.status === 'បានចូលរៀន' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {c.status}
                      </span>
                    </td>
                    <td className="p-3 font-bold text-slate-700 dark:text-slate-300">{c.enrolledSchool} ({c.enrolledGrade})</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* REPORT VIEW 8: Preschool Assessment */}
      {reportCategory === 'preschool' && (
        <div className="glass-card p-6 space-y-6 no-print">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-slate-100">
                របាយការណ៍វាយតម្លៃការរីកចម្រើនកុមារតូចមត្តេយ្យសិក្សា (៨ សូចនាករ)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                ការវាយតម្លៃផ្នែកកាយសម្បទា ភាសា គណិតវិទ្យាដំបូង និងសង្គម-អារម្មណ៍
              </p>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-black bg-amber-500/10 text-amber-600">
              សរុប {preschoolAssessments.length} បណ្ណវាយតម្លៃ
            </span>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 font-extrabold border-b border-amber-200 dark:border-amber-800">
                  <th className="p-3">ឈ្មោះកុមារ</th>
                  <th className="p-3 text-center">ភេទ</th>
                  <th className="p-3 text-center">ថ្ងៃកំណើត</th>
                  <th className="p-3 text-center">ដំណាក់កាល</th>
                  <th className="p-3">គ្រូវាយតម្លៃ</th>
                  <th className="p-3">ពាក្យសម្គាល់រួមរបស់គ្រូ</th>
                  <th className="p-3 text-center">កាលបរិច្ឆេទ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                {preschoolAssessments.map(p => (
                  <tr key={p.id} className="hover:bg-amber-50/40 dark:hover:bg-amber-950/20">
                    <td className="p-3 font-extrabold text-slate-900 dark:text-slate-100">{p.studentName}</td>
                    <td className="p-3 text-center">{p.gender}</td>
                    <td className="p-3 text-center">{p.dob}</td>
                    <td className="p-3 text-center font-bold text-amber-700">{p.term}</td>
                    <td className="p-3 font-bold text-purple-600">{p.evaluatorTeacherName}</td>
                    <td className="p-3 italic text-slate-600 max-w-xs">{p.overallRemarks}</td>
                    <td className="p-3 text-center font-mono">{p.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* REPORT VIEW 9: Student Support & NSAF Cash Transfer */}
      {reportCategory === 'support' && (
        <div className="glass-card p-6 space-y-6 no-print">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-slate-100">
                របាយការណ៍ជំនួយសិស្ស & ឧបត្ថម្ភសង្គម NSAF (២០,០០០៛/ខែ)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                ការផ្ទៀងផ្ទាត់សិស្សមានបណ្ណសមធម៌, អាហារ WFP, អាហារូបករណ៍រដ្ឋ
              </p>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-500/10 text-emerald-600">
              សរុប {studentSupports.length} ករណីជំនួយ
            </span>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-extrabold border-b border-emerald-200 dark:border-emerald-800">
                  <th className="p-3">ឈ្មោះសិស្ស</th>
                  <th className="p-3 text-center">ភេទ</th>
                  <th className="p-3 text-center">ថ្នាក់</th>
                  <th className="p-3 text-center">បណ្ណសមធម៌</th>
                  <th className="p-3">ប្រភេទទ្រទ្រង់</th>
                  <th className="p-3">អ្នកផ្តល់ជំនួយ</th>
                  <th className="p-3 text-center">លទ្ធផល NSAF</th>
                  <th className="p-3 text-center">ប្រាក់ឧបត្ថម្ភប្រចាំខែ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                {studentSupports.map(s => (
                  <tr key={s.id} className="hover:bg-emerald-50/40 dark:hover:bg-emerald-950/20">
                    <td className="p-3 font-extrabold text-slate-900 dark:text-slate-100">{s.studentName}</td>
                    <td className="p-3 text-center">{s.gender}</td>
                    <td className="p-3 text-center font-bold">{s.grade} ({s.section})</td>
                    <td className="p-3 text-center font-bold text-rose-600">{s.equityStatus}</td>
                    <td className="p-3 font-bold text-slate-800 dark:text-slate-200">{s.category}</td>
                    <td className="p-3 text-slate-600">{s.providerName}</td>
                    <td className="p-3 text-center font-bold">
                      <span className={`px-2 py-0.5 rounded text-[10px] ${
                        s.nsafConditionStatus === 'យល់ព្រម' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                      }`}>
                        {s.nsafConditionStatus || 'យល់ព្រម'}
                      </span>
                    </td>
                    <td className="p-3 text-center font-black text-emerald-600">
                      {s.monthlyAllowanceRiel ? `${s.monthlyAllowanceRiel.toLocaleString()} ៛` : '០ ៛'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* REPORT VIEW 10: School Activity Plans */}
      {reportCategory === 'activities' && (
        <div className="glass-card p-6 space-y-6 no-print">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-slate-100">
                របាយការណ៍សកម្មភាពសាលារៀន & សូចនាករស្ដង់ដារគំរូ
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                ផែនការសកម្មភាពតាម ៥ ស្ដង់ដារ និងការបែងចែកថវិកាអនុវត្ត
              </p>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-black bg-purple-500/10 text-purple-600">
              សរុប {schoolActivities.length} សកម្មភាព
            </span>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-purple-50 dark:bg-purple-950/40 text-purple-900 dark:text-purple-200 font-extrabold border-b border-purple-200 dark:border-purple-800">
                  <th className="p-3">ឈ្មោះសកម្មភាពស្ដង់ដារ</th>
                  <th className="p-3">ប្រភេទសកម្មភាព</th>
                  <th className="p-3">ស្ដង់ដារ</th>
                  <th className="p-3 text-center">កាលបរិច្ឆេទ</th>
                  <th className="p-3">អ្នកដឹកនាំ</th>
                  <th className="p-3 text-center">ចំនួនអ្នកចូលរួម</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                {schoolActivities.map(a => (
                  <tr key={a.id} className="hover:bg-purple-50/40 dark:hover:bg-purple-950/20">
                    <td className="p-3 font-extrabold text-slate-900 dark:text-slate-100">{a.title}</td>
                    <td className="p-3 font-bold text-purple-600">{a.activityType}</td>
                    <td className="p-3 font-bold text-purple-800 dark:text-purple-300">
                      {a.standardCategory || '-'}
                    </td>
                    <td className="p-3 text-center font-mono">{a.date}</td>
                    <td className="p-3 font-bold">{a.leadPerson}</td>
                    <td className="p-3 text-center font-bold text-emerald-600">
                      {a.participantsCount} នាក់
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* REPORT VIEW 11: Parent Meeting Plans */}
      {reportCategory === 'parentMeetings' && (
        <div className="glass-card p-6 space-y-6 no-print">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-slate-100">
                របាយការណ៍ផែនការប្រជុំមាតាបិតាសិស្ស សម្រាប់ ១ ឆ្នាំសិក្សា
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                កាលវិភាគប្រជុំ របៀបវារៈ សមាសភាពចូលរួម និងលទ្ធផលរំពឹងទុក
              </p>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-black bg-indigo-500/10 text-indigo-600">
              សរុប {parentMeetingPlans.length} លើកប្រជុំ
            </span>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-indigo-50 dark:bg-indigo-950/40 text-indigo-900 dark:text-indigo-200 font-extrabold border-b border-indigo-200 dark:border-indigo-800">
                  <th className="p-3">កាលបរិច្ឆេទ & ម៉ោង</th>
                  <th className="p-3">ខ្លឹមសារ / របៀបវារៈប្រជុំ</th>
                  <th className="p-3">សមាសភាពចូលរួម</th>
                  <th className="p-3">អ្នកទទួលខុសត្រូវ</th>
                  <th className="p-3">លទ្ធផលរំពឹងទុក</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                {parentMeetingPlans.map(pm => (
                  <tr key={pm.id} className="hover:bg-indigo-50/40 dark:hover:bg-indigo-950/20">
                    <td className="p-3 font-mono font-bold text-indigo-600">
                      {pm.plannedDate} <br/> <span className="text-[10px] text-slate-500">{pm.time}</span>
                    </td>
                    <td className="p-3 font-extrabold text-slate-900 dark:text-slate-100">{pm.agendaTopic}</td>
                    <td className="p-3 font-bold text-slate-700 dark:text-slate-300">{pm.targetAudience}</td>
                    <td className="p-3 font-bold text-purple-600">{pm.responsiblePerson}</td>
                    <td className="p-3 text-slate-600 italic">{pm.expectedOutput}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* REPORT VIEW 12: School Asset Inventory & PB Financial Report */}
      {reportCategory === 'inventory' && (
        <div className="glass-card p-6 space-y-6 no-print">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-slate-100">
                របាយការណ៍សម្ភារៈសារពើភ័ណ្ឌ & សៀវភៅថវិការដ្ឋ (PB)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                បញ្ជីកូដសូជីសម្ភារៈ, ការប្រគល់-ទទួល និងប្រតិបត្តិការចំណូល-ចំណាយ PB
              </p>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-black bg-cyan-500/10 text-cyan-600">
              សរុប {schoolAssets.length} មុខសម្ភារៈ | {financialTransactions.length} ប្រតិបត្តិការ PB
            </span>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-black text-cyan-600 dark:text-cyan-400 uppercase tracking-wider">
              📦 បញ្ជីសម្ភារៈសារពើភ័ណ្ឌសាលារៀន (Asset Tag Inventory)
            </h4>
            <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-extrabold border-b border-slate-200 dark:border-slate-700">
                    <th className="p-3">កូដសូជី</th>
                    <th className="p-3">ឈ្មោះសម្ភារៈ</th>
                    <th className="p-3">ប្រភេទ</th>
                    <th className="p-3 text-center">ចំនួន (គ្រឿង)</th>
                    <th className="p-3 text-center">ស្ថានភាព</th>
                    <th className="p-3">ទីតាំង</th>
                    <th className="p-3 text-center">តម្លៃប៉ាន់ស្មាន (៛)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                  {schoolAssets.map(ast => (
                    <tr key={ast.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                      <td className="p-3 font-mono font-bold text-cyan-600">{ast.assetCode}</td>
                      <td className="p-3 font-extrabold text-slate-900 dark:text-slate-100">{ast.name}</td>
                      <td className="p-3 font-bold">{ast.category}</td>
                      <td className="p-3 text-center font-black">{ast.quantity}</td>
                      <td className="p-3 text-center">
                        <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-emerald-100 text-emerald-800">
                          {ast.condition}
                        </span>
                      </td>
                      <td className="p-3 text-slate-600">{ast.locationRoom}</td>
                      <td className="p-3 text-center font-bold text-emerald-600">{(ast.valueRiel || 0).toLocaleString()} ៛</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* PRINTABLE MASTER DOCUMENT (Full A4 layout with Top Motto & Principal Annotation) */}
      {/* ========================================================================= */}
      <div className="hidden print:block font-siemreap text-black p-4">
        <PrintHeader
          title={`របាយការណ៍មេ ៖ ${
            reportCategory === 'enrollment' ? 'ស្ថិតិសិស្សតាមថ្នាក់' :
            reportCategory === 'equity' ? 'ស្ថិតិបណ្ណសមធម៌ (IDPoor)' :
            reportCategory === 'academic' ? 'លទ្ធផលសិក្សា & សិស្សពូកែ' :
            reportCategory === 'teachers' ? 'បញ្ជីគ្រូបង្រៀន (ក្របខ័ណ្ឌ/កិច្ចសន្យា/កិច្ចព្រមព្រៀង)' :
            reportCategory === 'ssc' ? 'គណៈកម្មាធិការទ្រទ្រង់សាលារៀន (គគថ)' :
            reportCategory === 'smc' ? 'គណៈកម្មាធិការគ្រប់គ្រងសាលារៀន (គគស)' :
            reportCategory === 'census' ? 'ជំរឿនកុមារភូមិចំណុះ' :
            reportCategory === 'preschool' ? 'ឧបករណ៍វាយតម្លៃមត្តេយ្យ' :
            reportCategory === 'support' ? 'ជំនួយសិស្ស & NSAF (២០,០០០៛/ខែ)' :
            reportCategory === 'activities' ? 'សកម្មភាពសាលា & ស្ដង់ដារ' :
            reportCategory === 'parentMeetings' ? 'ផែនការប្រជុំមាតាបិតា' :
            reportCategory === 'inventory' ? 'សារពើភ័ណ្ឌ & ហិរញ្ញវត្ថុ' :
            '៥ ស្ដង់ដារសាលារៀនគំរូ'
          }`}
          subtitle={`សាលាបឋមសិក្សា អន្លង់តាម៉ី (ឆ្នាំសិក្សា ៖ ${schoolInfo.academicYear})`}
          dateInfo={`កាលបរិច្ឆេទទាញចេញ ៖ ${new Date().toLocaleDateString('km-KH')}`}
        />

        {/* PRINT TABLE 1: ENROLLMENT */}
        {reportCategory === 'enrollment' && (
          <table className="w-full text-left border-collapse my-4 text-xs font-siemreap">
            <thead>
              <tr className="bg-slate-200 font-bold border border-black">
                <th className="p-2 border border-black">ថ្នាក់រៀន</th>
                <th className="p-2 border border-black text-center">បន្ទប់</th>
                <th className="p-2 border border-black text-center">សិស្សសរុប</th>
                <th className="p-2 border border-black text-center">ស្រី</th>
                <th className="p-2 border border-black text-center">ប្រុស</th>
                <th className="p-2 border border-black">គ្រូបន្ទុកថ្នាក់</th>
              </tr>
            </thead>
            <tbody>
              {classes.map(cls => {
                const clsStudents = students.filter(s => s.grade.includes(cls.gradeLevel) && s.section === cls.section);
                const femaleCount = clsStudents.filter(s => s.gender === 'ស្រី' || s.gender === 'Female').length;
                const maleCount = clsStudents.length - femaleCount;
                const teacher = teachers.find(t => t.id === cls.classTeacherId);
                return (
                  <tr key={cls.id} className="border border-black">
                    <td className="p-2 border border-black font-bold">{cls.name}</td>
                    <td className="p-2 border border-black text-center">បន្ទប់ {cls.section}</td>
                    <td className="p-2 border border-black text-center font-bold">{clsStudents.length} នាក់</td>
                    <td className="p-2 border border-black text-center font-bold">{femaleCount} នាក់</td>
                    <td className="p-2 border border-black text-center font-bold">{maleCount} នាក់</td>
                    <td className="p-2 border border-black font-bold">{teacher ? `${teacher.lastName} ${teacher.firstName}` : 'មិនទាន់ចាត់តាំង'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}

        {/* PRINT TABLE 2: EQUITY */}
        {reportCategory === 'equity' && (
          <table className="w-full text-left border-collapse my-4 text-xs font-siemreap">
            <thead>
              <tr className="bg-slate-200 font-bold border border-black">
                <th className="p-2 border border-black">អត្តលេខ</th>
                <th className="p-2 border border-black">ឈ្មោះសិស្ស</th>
                <th className="p-2 border border-black text-center">ភេទ</th>
                <th className="p-2 border border-black text-center">ថ្នាក់</th>
                <th className="p-2 border border-black text-center">ប្រភេទបណ្ណ</th>
                <th className="p-2 border border-black">អាសយដ្ឋាន</th>
                <th className="p-2 border border-black">អាណាព្យាបាល</th>
              </tr>
            </thead>
            <tbody>
              {students.filter(s => s.equityCard && !s.equityCard.includes('គ្មាន')).map(s => (
                <tr key={s.id} className="border border-black">
                  <td className="p-2 border border-black font-mono">{s.studentId}</td>
                  <td className="p-2 border border-black font-bold">{s.lastName} {s.firstName}</td>
                  <td className="p-2 border border-black text-center">{s.gender}</td>
                  <td className="p-2 border border-black text-center font-bold">{s.grade} ({s.section})</td>
                  <td className="p-2 border border-black text-center font-bold">{s.equityCard}</td>
                  <td className="p-2 border border-black">{s.address}</td>
                  <td className="p-2 border border-black">{s.guardian.name} ({s.guardian.phone})</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* PRINT TABLE 3: TEACHERS */}
        {reportCategory === 'teachers' && (
          <table className="w-full text-left border-collapse my-4 text-xs font-siemreap">
            <thead>
              <tr className="bg-slate-200 font-bold border border-black">
                <th className="p-2 border border-black">អត្តលេខ</th>
                <th className="p-2 border border-black">គោត្តនាម-នាម</th>
                <th className="p-2 border border-black text-center">ភេទ</th>
                <th className="p-2 border border-black text-center">ប្រភេទគ្រូបង្រៀន</th>
                <th className="p-2 border border-black">សញ្ញាបត្រ</th>
                <th className="p-2 border border-black font-mono">លេខទូរស័ព្ទ</th>
                <th className="p-2 border border-black">ថ្នាក់បន្ទុក</th>
              </tr>
            </thead>
            <tbody>
              {(teacherCatFilter === 'All' ? teachers : teachers.filter(t => t.teacherCategory === teacherCatFilter)).map(t => (
                <tr key={t.id} className="border border-black">
                  <td className="p-2 border border-black font-mono font-bold">{t.employeeId}</td>
                  <td className="p-2 border border-black font-bold">{t.lastName} {t.firstName}</td>
                  <td className="p-2 border border-black text-center">{t.gender || 'ប្រុស'}</td>
                  <td className="p-2 border border-black text-center font-bold">{t.teacherCategory || 'គ្រូក្របខ័ណ្ឌ'}</td>
                  <td className="p-2 border border-black">{t.qualification}</td>
                  <td className="p-2 border border-black font-mono">{t.phone}</td>
                  <td className="p-2 border border-black">{t.assignedClasses.join(', ')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* PRINT TABLE 4: CENSUS */}
        {reportCategory === 'census' && (
          <table className="w-full text-left border-collapse my-4 text-xs font-siemreap">
            <thead>
              <tr className="bg-slate-200 font-bold border border-black">
                <th className="p-2 border border-black">កូដកុមារ</th>
                <th className="p-2 border border-black">ឈ្មោះកុមារ</th>
                <th className="p-2 border border-black text-center">ភេទ</th>
                <th className="p-2 border border-black text-center">អាយុ</th>
                <th className="p-2 border border-black">ភូមិចំណុះ</th>
                <th className="p-2 border border-black">អាណាព្យាបាល</th>
                <th className="p-2 border border-black text-center">ស្ថានភាព</th>
              </tr>
            </thead>
            <tbody>
              {censusChildren.map(c => (
                <tr key={c.id} className="border border-black">
                  <td className="p-2 border border-black font-mono font-bold">{c.childCode}</td>
                  <td className="p-2 border border-black font-bold">{c.name}</td>
                  <td className="p-2 border border-black text-center">{c.gender}</td>
                  <td className="p-2 border border-black text-center">{c.age} ឆ្នាំ</td>
                  <td className="p-2 border border-black">{c.village}</td>
                  <td className="p-2 border border-black">{c.guardianName} ({c.guardianPhone})</td>
                  <td className="p-2 border border-black text-center font-bold">{c.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* PRINT TABLE 5: GENERAL FALLBACK FOR OTHER CATEGORIES */}
        {['standards', 'academic', 'ssc', 'smc', 'preschool', 'support', 'activities', 'parentMeetings', 'inventory'].includes(reportCategory) && (
          <div className="space-y-4 my-4 font-siemreap text-xs">
            <p className="font-bold">
              របាយការណ៍ត្រូវបានបន្ធៀប និងទាញចេញពីប្រព័ន្ធទិន្នន័យមេស្ដង់ដារសាលារៀន សម្រាប់ឆ្នាំសិក្សា {schoolInfo.academicYear}។
            </p>
          </div>
        )}

        <PrintFooter />
      </div>

    </div>
  );
};
