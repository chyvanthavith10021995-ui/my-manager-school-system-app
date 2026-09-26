import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  FileText,
  FileSpreadsheet,
  Download,
  Eye,
  Sparkles,
  Search,
  CheckCircle2,
  BookOpen,
  Award,
  Users,
  Building2,
  Heart,
  Boxes,
  Briefcase,
  HelpCircle
} from 'lucide-react';
import {
  generateTransferCertificateDoc,
  generateTeacherContractDoc,
  generateMeetingMinutesDoc,
  generateHonorCertificateDoc,
  generateGradebookExcel,
  generateAttendanceRegisterExcel,
  generateCensusRegisterExcel,
  generateNsafSupportExcel,
  generateInventoryRegisterExcel
} from '../../utils/templateGenerators';

interface TemplateItem {
  id: string;
  title: string;
  titleEn: string;
  category: 'academic' | 'admin' | 'finance' | 'support' | 'committee';
  type: 'word' | 'excel';
  description: string;
  moeysRef: string;
  tags: string[];
  icon: any;
  onDownloadFilled: (app: any) => void;
  onDownloadBlank: (app: any) => void;
  previewSummary: {
    sections: string[];
    format: string;
    targetAudience: string;
  };
}

export const SchoolTemplatesView: React.FC = () => {
  const app = useApp();
  const { classes } = app;

  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState<'all' | 'word' | 'excel'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [previewTemplate, setPreviewTemplate] = useState<TemplateItem | null>(null);

  const templates: TemplateItem[] = [
    // --- EXCEL TEMPLATES ---
    {
      id: 'excel-gradebook',
      title: 'តារាងស្រង់ពិន្ទុ និងចំណាត់ថ្នាក់សិស្សប្រចាំខែ/ឆមាស',
      titleEn: 'Monthly & Semester Gradebook & Student Ranking Sheet',
      category: 'academic',
      type: 'excel',
      description: 'តារាងគណនាពិន្ទុសរុប មធ្យមភាគ ចំណាត់ថ្នាក់ និងនិទ្ទេសសិស្សស្វ័យប្រវត្តិតាមមុខវិជ្ជាស្នូល ស្របតាមទម្រង់ក្រសួងអប់រំ។',
      moeysRef: 'ស្ដង់ដារគណនេយ្យភាពលទ្ធផលសិក្សា MoEYS',
      tags: ['ពិន្ទុ', 'ចំណាត់ថ្នាក់', 'ឆមាស', 'ប្រចាំខែ', 'Excel'],
      icon: Award,
      onDownloadFilled: (a) => generateGradebookExcel(a.students, a.schoolInfo, classes[0]?.name || 'ថ្នាក់ទី ១-ក', false),
      onDownloadBlank: (a) => generateGradebookExcel(undefined, a.schoolInfo, 'ថ្នាក់ទី ...', true),
      previewSummary: {
        sections: ['ព័ត៌មានក្បាលទំព័រសាលា', '៦ មុខវិជ្ជាស្នូល (ភាសាខ្មែរ គណិត វិទ្យាសាស្ត្រ សង្គម សិល្បៈ កាយ)', 'រូបមន្តផលបូក & មធ្យមភាគ', 'ចំណាត់ថ្នាក់ និងនិទ្ទេស'],
        format: 'Microsoft Excel (.xls) / Google Sheets',
        targetAudience: 'លោកគ្រូ-អ្នកគ្រូបន្ទុកថ្នាក់ និងការិយាល័យសិក្សា'
      }
    },
    {
      id: 'excel-attendance',
      title: 'បញ្ជីរាយនាមសិស្ស និងតាមដានវត្តមានប្រចាំខែ (៣១ ថ្ងៃ)',
      titleEn: 'Monthly Attendance Register & Class Student Roster',
      category: 'academic',
      type: 'excel',
      description: 'តារាងកត់ត្រាវត្តមានសិស្សប្រចាំថ្ងៃ (វត្តមាន ច្បាប់ ឥតច្បាប់) ៣១ ថ្ងៃ ជាមួយការគណនាភាគរយវត្តមានសរុប។',
      moeysRef: 'ទម្រង់សៀវភៅបញ្ជីវត្តមានសិស្សបឋមសិក្សា',
      tags: ['វត្តមាន', 'បញ្ជីឈ្មោះ', 'ប្រចាំខែ', 'Excel'],
      icon: Users,
      onDownloadFilled: (a) => generateAttendanceRegisterExcel(a.students, a.schoolInfo, classes[0]?.name || 'ថ្នាក់ទី ១-ក', false),
      onDownloadBlank: (a) => generateAttendanceRegisterExcel(undefined, a.schoolInfo, 'ថ្នាក់ទី ...', true),
      previewSummary: {
        sections: ['បញ្ជីរាយនាមសិស្សតាមអក្ខរក្រម', 'កាលបរិច្ឆេទថ្ងៃទី ១ ដល់ ៣១', 'សរុបវត្តមាន ច្បាប់ និងឥតច្បាប់', 'ហត្ថលេខាគ្រូបន្ទុកថ្នាក់'],
        format: 'Microsoft Excel (.xls) / Google Sheets',
        targetAudience: 'គ្រូបន្ទុកថ្នាក់ទូទាំងសាលា'
      }
    },
    {
      id: 'excel-census',
      title: 'តារាងស្ថិតិជំរឿនកុមារតាមភូមិចំណុះសាលារៀន (០-៦ ឆ្នាំ)',
      titleEn: 'Catchment Area Child Census & School Enrollment Register',
      category: 'academic',
      type: 'excel',
      description: 'តារាងតាមដានកុមារគ្រប់អាយុចូលរៀនក្នុងភូមិចំណុះសាលា ដើម្បីធានាអត្រាចុះឈ្មោះចូលរៀន ១០០% តាមគោលការណ៍ MoEYS។',
      moeysRef: 'ទម្រង់ជំរឿនកុមារប្រចាំឆ្នាំរបស់ក្រសួងអប់រំ',
      tags: ['ជំរឿន', 'កុមារភូមិចំណុះ', 'ចុះឈ្មោះ', 'Excel'],
      icon: BookOpen,
      onDownloadFilled: (a) => generateCensusRegisterExcel(a.censusChildren, a.schoolInfo, false),
      onDownloadBlank: (a) => generateCensusRegisterExcel(undefined, a.schoolInfo, true),
      previewSummary: {
        sections: ['កូដកុមារ និងព័ត៌មានផ្ទាល់ខ្លួន', 'ភូមិចំណុះ និងអាណាព្យាបាល', 'ស្ថានភាពចុះឈ្មោះចូលរៀន (មត្តេយ្យ/បឋម)', 'វិធានការតាមដាន'],
        format: 'Microsoft Excel (.xls) / Google Sheets',
        targetAudience: 'នាយកសាលា គណៈកម្មាធិការទ្រទ្រង់សាលា និងអាជ្ញាធរភូមិ'
      }
    },
    {
      id: 'excel-nsaf',
      title: 'តារាងតាមដានជំនួយសង្គម និងអាហារូបករណ៍សិស្សក្រីក្រ NSAF',
      titleEn: 'Student Welfare & NSAF Social Assistance Registry',
      category: 'support',
      type: 'excel',
      description: 'តារាងផ្ទៀងផ្ទាត់ និងតាមដានការបើកផ្តល់ប្រាក់ឧបត្ថម្ភសង្គមដល់កុមារមានបណ្ណសមធម៌ ក្រ១ / ក្រ២ (២០,០០០៛/ខែ)។',
      moeysRef: 'កម្មវិធីមូលនិធិជាតិជំនួយសង្គម NSAF / MoEYS',
      tags: ['សមធម៌', 'NSAF', 'ជំនួយសង្គម', 'ក្រ១', 'Excel'],
      icon: Heart,
      onDownloadFilled: (a) => generateNsafSupportExcel(a.studentSupports, a.schoolInfo, false),
      onDownloadBlank: (a) => generateNsafSupportExcel(undefined, a.schoolInfo, true),
      previewSummary: {
        sections: ['ព័ត៌មានសិស្ស និងកម្រិតបណ្ណសមធម៌ (IDPoor)', 'លក្ខខណ្ឌវត្តមាន ៩០% ឡើង', 'ប្រាក់ឧបត្ថម្ភប្រចាំខែ ២០,០០០៛', 'ការផ្ទៀងផ្ទាត់របស់នាយកសាលា'],
        format: 'Microsoft Excel (.xls) / Google Sheets',
        targetAudience: 'គណៈគ្រប់គ្រងសាលា និងគណៈកម្មការជំនួយសង្គម'
      }
    },
    {
      id: 'excel-inventory',
      title: 'តារាងសារពើភ័ណ្ឌ និងបញ្ជីគ្រប់គ្រងទ្រព្យសម្បត្តិរដ្ឋ',
      titleEn: 'School Inventory & Fixed Asset Management Register',
      category: 'finance',
      type: 'excel',
      description: 'តារាងកត់ត្រា និងតាមដានស្ថានភាពសម្ភារ សម្ភារឧបទេស អគារ និងបរិក្ខាររបស់រដ្ឋក្នុងសាលារៀន។',
      moeysRef: 'ទម្រង់គ្រប់គ្រងសារពើភ័ណ្ឌរដ្ឋ និងសម្ភារសិក្សា',
      tags: ['សារពើភ័ណ្ឌ', 'ទ្រព្យសម្បត្តិរដ្ឋ', 'សម្ភារ', 'Excel'],
      icon: Boxes,
      onDownloadFilled: (a) => generateInventoryRegisterExcel(a.schoolAssets, a.schoolInfo, false),
      onDownloadBlank: (a) => generateInventoryRegisterExcel(undefined, a.schoolInfo, true),
      previewSummary: {
        sections: ['កូដសម្ភារ និងឈ្មោះសម្ភារ', 'ចំនួន បរិមាណ និងឯកតា', 'ស្ថានភាព (ល្អ / ខូចខាតស្រាល / ជួសជុល)', 'ទីតាំងបន្ទប់ និងអ្នកទទួលបន្ទុក'],
        format: 'Microsoft Excel (.xls) / Google Sheets',
        targetAudience: 'នាយករងទទួលបន្ទុកសារពើភ័ណ្ឌ និងបេឡា'
      }
    },

    // --- WORD TEMPLATES ---
    {
      id: 'word-transfer',
      title: 'លិខិតបញ្ជាក់ការសិក្សា និងការផ្ទេរសាលារៀន',
      titleEn: 'School Enrollment & Transfer Certificate Letter',
      category: 'admin',
      type: 'word',
      description: 'លិខិតរដ្ឋបាលផ្លូវការសម្រាប់ចេញជូនសិស្សានុសិស្សដែលត្រូវផ្ទេរការសិក្សាទៅកាន់សាលារៀនផ្សេង ឬប្រើប្រាស់ផ្លូវច្បាប់។',
      moeysRef: 'លិខិតបទដ្ឋានរដ្ឋបាលអប់រំ MoEYS',
      tags: ['ផ្ទេរសាលា', 'បញ្ជាក់ការសិក្សា', 'លិខិតផ្លូវការ', 'Word'],
      icon: FileText,
      onDownloadFilled: (a) => generateTransferCertificateDoc(a.students[0], a.schoolInfo, false),
      onDownloadBlank: (a) => generateTransferCertificateDoc(undefined, a.schoolInfo, true),
      previewSummary: {
        sections: ['បឋមកថាកំពូលព្រះរាជាណាចក្រកម្ពុជា', 'ព័ត៌មានលម្អិតរបស់សិស្ស និងអាណាព្យាបាល', 'ការបញ្ជាក់ចរិយាសម្បត្តិ និងលទ្ធផលសិក្សា', 'ហត្ថលេខានិងត្រានាយកសាលា & ប្រធានការិយាល័យអប់រំស្រុក'],
        format: 'Microsoft Word (.doc) / Google Docs',
        targetAudience: 'ការិយាល័យរដ្ឋបាលសាលា'
      }
    },
    {
      id: 'word-contract',
      title: 'កិច្ចសន្យាការងារគ្រូបង្រៀន / បុគ្គលិកអប់រំជាប់កិច្ចសន្យា',
      titleEn: 'Teacher & Contract Education Staff Employment Agreement',
      category: 'admin',
      type: 'word',
      description: 'ទម្រង់កិច្ចសន្យាផ្លូវការរវាងគណៈគ្រប់គ្រងសាលារៀន និងលោកគ្រូ-អ្នកគ្រូ អំពីភារកិច្ច កាតព្វកិច្ច និងបទបញ្ជាផ្ទៃក្នុង។',
      moeysRef: 'ក្របខ័ណ្ឌកិច្ចសន្យាការងារបុគ្គលិកអប់រំជាតិ',
      tags: ['កិច្ចសន្យា', 'គ្រូបង្រៀន', 'បុគ្គលិក', 'Word'],
      icon: Briefcase,
      onDownloadFilled: (a) => generateTeacherContractDoc(a.teachers[0], a.schoolInfo, false),
      onDownloadBlank: (a) => generateTeacherContractDoc(undefined, a.schoolInfo, true),
      previewSummary: {
        sections: ['ព័ត៌មានភាគីនិយោជក និងនិយោជិត', 'ប្រការ ១ ៖ ភារកិច្ច និងកាតព្វកិច្ចបង្រៀន', 'ប្រការ ២ ៖ សុពលភាពឆ្នាំសិក្សា', 'កន្លែងចុះហត្ថលេខាភាគីទាំងពីរ'],
        format: 'Microsoft Word (.doc) / Google Docs',
        targetAudience: 'នាយកសាលា និងលោកគ្រូ-អ្នកគ្រូ'
      }
    },
    {
      id: 'word-minutes',
      title: 'កំណត់ហេតុអង្គប្រជុំគណៈកម្មាធិការទ្រទ្រង់សាលា គ.គ.ស / គ.គ.ថ',
      titleEn: 'School Management & Support Committee Meeting Minutes',
      category: 'committee',
      type: 'word',
      description: 'កំណត់ហេតុកត់ត្រាវឌ្ឍនភាព ការសម្រេចចិត្ត ការប្រើប្រាស់ថវិកាដំណើរការសាលា (PB/SOE) និងគម្រោងអភិវឌ្ឍន៍។',
      moeysRef: 'សៀវភៅណែនាំស្តីពីដំណើរការ គ.គ.ស និង គ.គ.ថ',
      tags: ['កំណត់ហេតុ', 'ប្រជុំ', 'គគស', 'គគថ', 'Word'],
      icon: Building2,
      onDownloadFilled: (a) => generateMeetingMinutesDoc(a.schoolInfo, false),
      onDownloadBlank: (a) => generateMeetingMinutesDoc(a.schoolInfo, true),
      previewSummary: {
        sections: ['ព័ត៌មានកាលបរិច្ឆេទ ទីកន្លែង និងសមាសភាពចូលរួម', 'របៀបវារៈ ៤ ចំណុចសំខាន់ៗ', 'សេចក្តីសម្រេចជាឯកច្ឆន្ទរបស់អង្គប្រជុំ', 'ហត្ថលេខាប្រធានអង្គប្រជុំ និងលេខាធិការ'],
        format: 'Microsoft Word (.doc) / Google Docs',
        targetAudience: 'សមាជិក គ.គ.ស, គ.គ.ថ និងអាជ្ញាធរមូលដ្ឋាន'
      }
    },
    {
      id: 'word-honor',
      title: 'ប័ណ្ណសរសើរ និងលិខិតសរសើរសិស្សពូកែប្រចាំឆ្នាំ',
      titleEn: 'Student Certificate of Honor & Academic Commendation',
      category: 'academic',
      type: 'word',
      description: 'ទម្រង់ប័ណ្ណសរសើររចនាបែបខ្មែរស្អាតប្រណិត សម្រាប់ផ្ដល់រង្វាន់លើកទឹកចិត្តដល់សិស្សចំណាត់ថ្នាក់ល្អក្នុងពិធីបិទបវេសនកាល។',
      moeysRef: 'ទម្រង់ប័ណ្ណសរសើរលើកទឹកចិត្តសិស្សានុសិស្ស MoEYS',
      tags: ['បណ្ណសរសើរ', 'សិស្សពូកែ', 'កិត្តិយស', 'រង្វាន់', 'Word'],
      icon: Award,
      onDownloadFilled: (a) => generateHonorCertificateDoc(a.students[0], a.schoolInfo, false),
      onDownloadBlank: (a) => generateHonorCertificateDoc(undefined, a.schoolInfo, true),
      previewSummary: {
        sections: ['ស៊ុមតុបតែងក្បាច់រចនាខ្មែរពណ៌មាស/ត្នោត', 'ឈ្មោះសិស្ស ថ្នាក់ និងចំណាត់ថ្នាក់លេខ ១/២/៣', 'ពាក្យប្រសិទ្ធពរ និងការលើកសរសើរ', 'ហត្ថលេខាគ្រូបន្ទុកថ្នាក់ និងនាយកសាលា'],
        format: 'Microsoft Word (.doc) / Google Docs',
        targetAudience: 'សិស្សពូកែ និងលោកគ្រូ-អ្នកគ្រូ'
      }
    }
  ];

  const filteredTemplates = templates.filter(t => {
    const matchesSearch =
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.titleEn.toLowerCase().includes(search.toLowerCase()) ||
      t.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()));
    const matchesType = selectedType === 'all' || t.type === selectedType;
    const matchesCategory = selectedCategory === 'all' || t.category === selectedCategory;
    return matchesSearch && matchesType && matchesCategory;
  });

  const wordCount = templates.filter(t => t.type === 'word').length;
  const excelCount = templates.filter(t => t.type === 'excel').length;

  return (
    <div className="space-y-6">
      {/* Top Banner Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-700 via-indigo-700 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl">
        <div className="absolute -right-12 -top-12 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute right-1/4 -bottom-10 w-48 h-48 bg-blue-400/20 rounded-full blur-xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-xs font-semibold text-blue-100">
            <Sparkles size={14} className="text-amber-300" />
            មជ្ឈមណ្ឌលទម្រង់គំរូឯកសារផ្លូវការ MoEYS (Templates Center)
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            គំរូឯកសាររដ្ឋបាល និងតារាងគ្រប់គ្រង (Word & Excel)
          </h1>

          <p className="text-blue-100/90 text-sm leading-relaxed">
            ទាញយកទម្រង់គំរូស្ដង់ដាររបស់ក្រសួងអប់រំ យុវជន និងកីឡា ជាទម្រង់ Microsoft Word (.doc) និង Excel (.xls) សម្រាប់ប្រើប្រាស់ក្នុងសាលារៀន។ គាំទ្រទាំងទម្រង់ទទេ និងទម្រង់បំពេញទិន្នន័យស្រាប់!
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-blue-200">
            <span className="flex items-center gap-1.5 bg-black/20 px-3 py-1 rounded-lg">
              <FileSpreadsheet size={15} className="text-emerald-400" />
              <strong>{excelCount}</strong> គំរូ Excel
            </span>
            <span className="flex items-center gap-1.5 bg-black/20 px-3 py-1 rounded-lg">
              <FileText size={15} className="text-blue-300" />
              <strong>{wordCount}</strong> គំរូ Word
            </span>
            <span className="flex items-center gap-1.5 bg-black/20 px-3 py-1 rounded-lg">
              <CheckCircle2 size={15} className="text-emerald-300" />
              យូនីកូដខ្មែរ ១០០% ស្របតាម MoEYS
            </span>
          </div>
        </div>
      </div>

      {/* Filters and Search Bar */}
      <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="ស្វែងរកតាមឈ្មោះឯកសារ ឬពាក្យគន្លឹះ..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
          />
        </div>

        {/* Format Selector Pills */}
        <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-900/60 p-1 rounded-xl border border-slate-200 dark:border-slate-700 shrink-0">
          <button
            onClick={() => setSelectedType('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              selectedType === 'all'
                ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            ទាំងអស់ ({templates.length})
          </button>
          <button
            onClick={() => setSelectedType('excel')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              selectedType === 'excel'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <FileSpreadsheet size={14} />
            Excel ({excelCount})
          </button>
          <button
            onClick={() => setSelectedType('word')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              selectedType === 'word'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            <FileText size={14} />
            Word ({wordCount})
          </button>
        </div>

        {/* Category Dropdown */}
        <select
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value)}
          className="px-3.5 py-2 text-sm bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 rounded-xl dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">គ្រប់ផ្នែកទាំងអស់</option>
          <option value="academic">ការងារបង្រៀន & សិក្សាធិការ</option>
          <option value="admin">រដ្ឋបាល & បុគ្គលិក</option>
          <option value="support">ជំនួយសិស្ស & សមធម៌ NSAF</option>
          <option value="finance">សារពើភ័ណ្ឌ & ហិរញ្ញវត្ថុ</option>
          <option value="committee">គណៈកម្មាធិការ គ.គ.ស/គ.គ.ថ</option>
        </select>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map(template => {
          const isExcel = template.type === 'excel';

          return (
            <div
              key={template.id}
              className="group bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700/80 shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden flex flex-col justify-between"
            >
              <div className="p-5 space-y-3">
                {/* Format and category badge */}
                <div className="flex items-center justify-between gap-2">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-extrabold ${
                      isExcel
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                        : 'bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-300 dark:border-blue-800'
                    }`}
                  >
                    {isExcel ? <FileSpreadsheet size={14} /> : <FileText size={14} />}
                    {isExcel ? 'Excel Template (.xls)' : 'Word Template (.doc)'}
                  </span>

                  <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-700/60 px-2 py-0.5 rounded-md">
                    MoEYS Standard
                  </span>
                </div>

                {/* Title */}
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition leading-snug">
                    {template.title}
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-0.5 font-medium">{template.titleEn}</p>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                  {template.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {template.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 text-[10px] font-medium bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-md"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons Footer */}
              <div className="p-4 bg-slate-50/80 dark:bg-slate-900/40 border-t border-slate-100 dark:border-slate-700/60 flex items-center gap-2">
                <button
                  onClick={() => setPreviewTemplate(template)}
                  className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition"
                  title="មើលព័ត៌មានលម្អិត"
                >
                  <Eye size={14} />
                  <span>មើលគំរូ</span>
                </button>

                <button
                  onClick={() => template.onDownloadBlank(app)}
                  className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition"
                  title="ទាញយកទម្រង់ទទេស្អាតសម្រាប់បំពេញដោយដៃ"
                >
                  <Download size={14} />
                  <span>ទម្រង់ទទេ</span>
                </button>

                <button
                  onClick={() => template.onDownloadFilled(app)}
                  className={`flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white rounded-xl shadow-sm transition active:scale-95 ${
                    isExcel
                      ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/20'
                      : 'bg-blue-600 hover:bg-blue-700 shadow-blue-600/20'
                  }`}
                  title="ទាញយកទម្រង់មានទិន្នន័យសាលារៀនស្រាប់"
                >
                  <Download size={14} />
                  <span>ទាញយក</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Template Preview / Details Modal */}
      {previewTemplate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white dark:bg-slate-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-700 my-8 space-y-6">
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-700">
              <div>
                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold ${
                    previewTemplate.type === 'excel'
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                      : 'bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300'
                  }`}
                >
                  {previewTemplate.type === 'excel' ? <FileSpreadsheet size={15} /> : <FileText size={15} />}
                  {previewTemplate.type === 'excel' ? 'Microsoft Excel Spreadsheet' : 'Microsoft Word Document'}
                </span>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-2">
                  {previewTemplate.title}
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">{previewTemplate.titleEn}</p>
              </div>

              <button
                onClick={() => setPreviewTemplate(null)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-lg font-bold p-1 rounded-lg"
              >
                ✕
              </button>
            </div>

            {/* Template specs breakdown */}
            <div className="space-y-4 text-xs">
              <div className="p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-3">
                <p className="text-slate-700 dark:text-slate-300 font-medium">
                  {previewTemplate.description}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-200 dark:border-slate-700">
                  <div>
                    <span className="text-slate-400 font-semibold block">ទម្រង់ឯកសារ ៖</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">
                      {previewTemplate.previewSummary.format}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-semibold block">មុខសញ្ញាប្រើប្រាស់ ៖</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">
                      {previewTemplate.previewSummary.targetAudience}
                    </span>
                  </div>
                </div>
              </div>

              {/* Sections Included */}
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-1.5">
                  <CheckCircle2 size={16} className="text-emerald-500" />
                  រចនាសម្ព័ន្ធ និងផ្នែកសំខាន់ៗក្នុងឯកសារ ៖
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {previewTemplate.previewSummary.sections.map((section, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 bg-slate-50 dark:bg-slate-900/40 rounded-xl border border-slate-100 dark:border-slate-700 text-slate-700 dark:text-slate-300 flex items-center gap-2"
                    >
                      <span className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-300 font-bold flex items-center justify-center text-[10px] shrink-0">
                        {idx + 1}
                      </span>
                      <span>{section}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tips for Opening */}
              <div className="p-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/30 rounded-xl text-amber-900 dark:text-amber-300 flex items-start gap-2">
                <HelpCircle size={16} className="shrink-0 mt-0.5 text-amber-600" />
                <p className="leading-relaxed">
                  <strong>ការណែនាំ ៖</strong> លោកអ្នកអាចបើកឯកសារនេះជាមួយ <strong>Microsoft Word / Excel</strong>, <strong>Google Docs / Sheets</strong> ឬ <strong>WPS Office</strong> ដោយរក្សាបាននូវពុម្ពអក្សរខ្មែរយូនីកូដ (Khmer OS Siemreap / Muol Light) យ៉ាងត្រឹមត្រូវ។
                </p>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-700">
              <button
                type="button"
                onClick={() => setPreviewTemplate(null)}
                className="w-full sm:w-auto px-5 py-2.5 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl font-medium"
              >
                បិទផ្ទាំង
              </button>

              <button
                type="button"
                onClick={() => {
                  previewTemplate.onDownloadBlank(app);
                  setPreviewTemplate(null);
                }}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 rounded-xl"
              >
                <Download size={16} />
                <span>ទាញយកទម្រង់ទទេ</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  previewTemplate.onDownloadFilled(app);
                  setPreviewTemplate(null);
                }}
                className={`w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-bold text-white rounded-xl shadow-md ${
                  previewTemplate.type === 'excel'
                    ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/20'
                    : 'bg-blue-600 hover:bg-blue-700 shadow-blue-600/20'
                }`}
              >
                <Download size={16} />
                <span>ទាញយកទម្រង់បំពេញទិន្នន័យ</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
