import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import type { StudentSupportRecord, SupportCategory, NSAFConditionStatus } from '../../types';
import {
  Utensils,
  Award,
  Globe,
  Plus,
  Search,
  CheckCircle,
  Trash2,
  Edit2,
  DollarSign,
  Printer,
  ShieldCheck,
  XCircle,
  Clock
} from 'lucide-react';

export const StudentSupportView: React.FC = () => {
  const { studentSupports, addStudentSupport, updateStudentSupport, deleteStudentSupport, students, schoolInfo } =
    useApp();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedNsafStatus, setSelectedNsafStatus] = useState<string>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingSupportRecord, setEditingSupportRecord] = useState<StudentSupportRecord | null>(null);

  // Form state
  const [selectedStudentId, setSelectedStudentId] = useState('');
  const [category, setCategory] = useState<SupportCategory>('មូលនិធិជាតិជំនួយសង្គម NSAF (២០,០០០៛/ខែ)');
  const [providerName, setProviderName] = useState('មូលនិធិជាតិជំនួយសង្គម (NSAF / MoEYS)');
  const [itemDescription, setItemDescription] = useState('ប្រាក់ឧបត្ថម្ភសង្គមប្រចាំខែសម្រាប់កុមារមានបណ្ណសមធម៌');
  const [amountOrValue, setAmountOrValue] = useState('២០,០០០ ៛/ខែ');
  const [dateProvided, setDateProvided] = useState('2026-09-01');
  const [nsafConditionStatus, setNsafConditionStatus] = useState<NSAFConditionStatus>('យល់ព្រម');
  const [verificationNote, setVerificationNote] = useState('គ្រប់លក្ខខណ្ឌ៖ មានបណ្ណសមធម៌ ក្រ១/ក្រ២ ស្របច្បាប់ និងវត្តមានសិក្សា > ៨៥%');

  // Filtered Supports Calculation
  const filteredSupports = studentSupports.filter(item => {
    const matchesSearch =
      item.studentName.toLowerCase().includes(search.toLowerCase()) ||
      item.providerName.toLowerCase().includes(search.toLowerCase()) ||
      item.itemDescription.toLowerCase().includes(search.toLowerCase());
    const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesNsafStatus =
      selectedNsafStatus === 'all' || (item.nsafConditionStatus && item.nsafConditionStatus === selectedNsafStatus);
    return matchesSearch && matchesCat && matchesNsafStatus;
  });

  // KPI Statistics
  const nsafRecords = studentSupports.filter(s => s.category.includes('មូលនិធិជាតិជំនួយសង្គម'));
  const approvedNsafCount = nsafRecords.filter(s => s.nsafConditionStatus === 'យល់ព្រម').length;
  const rejectedNsafCount = nsafRecords.filter(s => s.nsafConditionStatus === 'មិនគ្រប់លក្ខខណ្ឌ').length;
  const totalMonthlyNsafDisbursed = approvedNsafCount * 20000;

  const nutritionCount = studentSupports.filter(s => s.category.includes('អាហារូបត្ថម្ភ')).length;
  const scholarshipCount = studentSupports.filter(s => s.category.includes('អាហារូបករណ៍')).length;
  const ngoCount = studentSupports.filter(s => s.category.includes('ដៃគូ')).length;

  const idPoorStudents = students.filter(s => s.equityCard.includes('ក្រ១') || s.equityCard.includes('ក្រ២'));

  const resetForm = () => {
    setEditingSupportRecord(null);
    setSelectedStudentId('');
    setCategory('មូលនិធិជាតិជំនួយសង្គម NSAF (២០,០០០៛/ខែ)');
    setProviderName('មូលនិធិជាតិជំនួយសង្គម (NSAF / MoEYS)');
    setItemDescription('ប្រាក់ឧបត្ថម្ភសង្គមប្រចាំខែសម្រាប់កុមារមានបណ្ណសមធម៌');
    setAmountOrValue('២០,០០០ ៛/ខែ');
    setDateProvided('2026-09-01');
    setNsafConditionStatus('យល់ព្រម');
    setVerificationNote('គ្រប់លក្ខខណ្ឌ៖ មានបណ្ណសមធម៌ ក្រ១/ក្រ២ ស្របច្បាប់ និងវត្តមានសិក្សា > ៨៥%');
  };

  const handleCategoryChange = (newCat: SupportCategory) => {
    setCategory(newCat);
    if (newCat.includes('មូលនិធិជាតិជំនួយសង្គម')) {
      setProviderName('មូលនិធិជាតិជំនួយសង្គម (NSAF / MoEYS)');
      setItemDescription('ប្រាក់ឧបត្ថម្ភសង្គមប្រចាំខែសម្រាប់កុមារមានបណ្ណសមធម៌');
      if (nsafConditionStatus === 'យល់ព្រម') {
        setAmountOrValue('២០,០០០ ៛/ខែ');
      } else if (nsafConditionStatus === 'មិនគ្រប់លក្ខខណ្ឌ') {
        setAmountOrValue('០ ៛ (មិនទទួលបាន)');
      } else {
        setAmountOrValue('រង់ចាំការបញ្ជាក់');
      }
    } else if (newCat.includes('អាហារូបត្ថម្ភ')) {
      setProviderName('កម្មវិធីផ្ដល់អាហារតាមសាលារៀន (MoEYS / WFP)');
      setItemDescription('អាហារពេលព្រឹកក្តៅៗនៅសាលារៀន រៀងរាល់ថ្ងៃសិក្សា');
      setAmountOrValue('អាហារ ១ពេល/ថ្ងៃ');
    } else if (newCat.includes('អាហារូបករណ៍')) {
      setProviderName('មូលនិធិសមធម៌អប់រំជាតិ (MoEYS)');
      setItemDescription('ប្រាក់ឧបត្ថម្ភអាហារូបករណ៍សិស្សក្រីក្រប្រចាំឆ្នាំ');
      setAmountOrValue('២៤០,០០០ ៛/ឆ្នាំ');
    }
  };

  const handleNsafConditionChange = (status: NSAFConditionStatus) => {
    setNsafConditionStatus(status);
    if (status === 'យល់ព្រម') {
      setAmountOrValue('២០,០០០ ៛/ខែ');
      setVerificationNote('គ្រប់លក្ខខណ្ឌ៖ មានបណ្ណសមធម៌ស្របច្បាប់ និងវត្តមានសិក្សា > ៨៥%');
    } else if (status === 'មិនគ្រប់លក្ខខណ្ឌ') {
      setAmountOrValue('០ ៛ (មិនទទួលបាន)');
      setVerificationNote('មិនគ្រប់លក្ខខណ្ឌ៖ អវត្តមានលើសកំណត់ ឬទិន្នន័យបណ្ណសមធម៌មិនទាន់គ្រប់គ្រាន់');
    } else {
      setAmountOrValue('រង់ចាំការបញ្ជាក់');
      setVerificationNote('រង់ចាំការផ្ទៀងផ្ទាត់បញ្ជីបណ្ណសមធម៌ និងវត្តមានពីអាជ្ញាធរឃុំ');
    }
  };

  const handleQuickToggleNsafStatus = (record: StudentSupportRecord) => {
    const nextStatus: NSAFConditionStatus =
      record.nsafConditionStatus === 'យល់ព្រម'
        ? 'មិនគ្រប់លក្ខខណ្ឌ'
        : record.nsafConditionStatus === 'មិនគ្រប់លក្ខខណ្ឌ'
        ? 'រង់ចាំការបញ្ជាក់'
        : 'យល់ព្រម';

    const nextAmount =
      nextStatus === 'យល់ព្រម' ? '២០,០០០ ៛/ខែ' : nextStatus === 'មិនគ្រប់លក្ខខណ្ឌ' ? '០ ៛ (មិនទទួលបាន)' : 'រង់ចាំការបញ្ជាក់';

    const nextAllowance = nextStatus === 'យល់ព្រម' ? 20000 : 0;
    const nextNote =
      nextStatus === 'យល់ព្រម'
        ? 'គ្រប់លក្ខខណ្ឌ៖ មានបណ្ណសមធម៌ស្របច្បាប់ និងវត្តមានសិក្សា > ៨៥%'
        : nextStatus === 'មិនគ្រប់លក្ខខណ្ឌ'
        ? 'មិនគ្រប់លក្ខខណ្ឌ៖ អវត្តមានលើសកំណត់ ឬពុំទាន់បានបច្ចុប្បន្នភាព'
        : 'រង់ចាំការផ្ទៀងផ្ទាត់ទិន្នន័យបន្ថែម';

    updateStudentSupport(record.id, {
      nsafConditionStatus: nextStatus,
      amountOrValue: nextAmount,
      monthlyAllowanceRiel: nextAllowance,
      verificationNote: nextNote
    });
  };

  const handleOpenEdit = (record: StudentSupportRecord) => {
    setEditingSupportRecord(record);
    setSelectedStudentId(record.studentId);
    setCategory(record.category);
    setProviderName(record.providerName);
    setItemDescription(record.itemDescription);
    setAmountOrValue(record.amountOrValue);
    setDateProvided(record.dateProvided);
    setNsafConditionStatus(record.nsafConditionStatus || 'យល់ព្រម');
    setVerificationNote(record.verificationNote || 'គ្រប់លក្ខខណ្ឌ៖ មានបណ្ណសមធម៌ និងវត្តមានសិក្សាគ្រប់គ្រាន់');
    setIsAddModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const st = students.find(s => s.id === selectedStudentId);
    if (!st) return;

    const isNsaf = category.includes('មូលនិធិជាតិជំនួយសង្គម');
    const monthlyAllowance = isNsaf && nsafConditionStatus === 'យល់ព្រម' ? 20000 : 0;

    if (editingSupportRecord) {
      updateStudentSupport(editingSupportRecord.id, {
        studentId: st.id,
        studentName: `${st.lastName} ${st.firstName}`,
        grade: st.grade,
        section: st.section,
        gender: st.gender === 'ស្រី' ? 'ស្រី' : 'ប្រុស',
        equityStatus: st.equityCard,
        category,
        providerName,
        itemDescription,
        amountOrValue,
        dateProvided,
        status: 'កំពុងទទួលបាន',
        nsafConditionStatus: isNsaf ? nsafConditionStatus : undefined,
        monthlyAllowanceRiel: isNsaf ? monthlyAllowance : undefined,
        verificationNote: isNsaf ? verificationNote : undefined
      });
    } else {
      addStudentSupport({
        studentId: st.id,
        studentName: `${st.lastName} ${st.firstName}`,
        grade: st.grade,
        section: st.section,
        gender: st.gender === 'ស្រី' ? 'ស្រី' : 'ប្រុស',
        equityStatus: st.equityCard,
        category,
        providerName,
        itemDescription,
        amountOrValue,
        dateProvided,
        status: 'កំពុងទទួលបាន',
        nsafConditionStatus: isNsaf ? nsafConditionStatus : undefined,
        monthlyAllowanceRiel: isNsaf ? monthlyAllowance : undefined,
        verificationNote: isNsaf ? verificationNote : undefined
      });
    }

    setIsAddModalOpen(false);
    resetForm();
  };

  const handlePrintNsafSheet = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700/60 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300">
              សុខុមាលភាព & មូលនិធិជាតិជំនួយសង្គម (NSAF)
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">ឧបត្ថម្ភសង្គម ២០,០០០ ៛/ខែ</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
            ជំនួយសិស្ស & ប្រាក់ឧបត្ថម្ភសង្គម (មូលនិធិជាតិជំនួយសង្គម NSAF)
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            ការផ្ទៀងផ្ទាត់លក្ខខណ្ឌសិស្សមានបណ្ណសមធម៌ (២០,០០០ ៛/ខែ), អាហារពេលព្រឹក WFP, និងអាហារូបករណ៍សិស្សក្រីក្រ
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePrintNsafSheet}
            className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 rounded-xl transition font-medium text-sm"
          >
            <Printer size={18} />
            <span>បោះពុម្ពបញ្ជីផ្ទៀងផ្ទាត់ NSAF</span>
          </button>
          <button
            onClick={() => {
              resetForm();
              setIsAddModalOpen(true);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition font-medium text-sm shadow-md shadow-emerald-500/20"
          >
            <Plus size={18} />
            <span>បន្ថែមជំនួយសិស្ស</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid (4 Columns) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* NSAF Cash Support Card */}
        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-emerald-200 dark:border-emerald-800/60 shadow-sm flex items-center gap-4 bg-emerald-50/20 dark:bg-emerald-950/10">
          <div className="p-3 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 rounded-xl shrink-0">
            <DollarSign size={24} />
          </div>
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">មូលនិធិជាតិជំនួយសង្គម (NSAF)</p>
            <h3 className="text-2xl font-black text-emerald-700 dark:text-emerald-300 mt-0.5">
              {approvedNsafCount} នាក់
            </h3>
            <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold mt-0.5">
              សរុប {totalMonthlyNsafDisbursed.toLocaleString()} ៛/ខែ (២០,០០០ ៛/នាក់)
            </p>
          </div>
        </div>

        {/* Equity Card Students Card */}
        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700/60 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 rounded-xl shrink-0">
            <Award size={24} />
          </div>
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">សិស្សមានបណ្ណសមធម៌សរុប</p>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-0.5">{idPoorStudents.length} នាក់</h3>
            <p className="text-xs text-blue-500 mt-0.5">ក្រ១ & ក្រ២ ក្នុងសាលា</p>
          </div>
        </div>

        {/* School Breakfast WFP Card */}
        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700/60 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 rounded-xl shrink-0">
            <Utensils size={24} />
          </div>
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">អាហារូបត្ថម្ភសាលារៀន WFP</p>
            <h3 className="text-2xl font-bold text-amber-600 dark:text-amber-400 mt-0.5">{nutritionCount} នាក់</h3>
            <p className="text-xs text-amber-500 mt-0.5">អាហារពេលព្រឹកក្តៅៗ</p>
          </div>
        </div>

        {/* Partner & Govt Scholarship Card */}
        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700/60 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 rounded-xl shrink-0">
            <Globe size={24} />
          </div>
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">អាហារូបករណ៍ & ដៃគូ</p>
            <h3 className="text-2xl font-bold text-purple-600 dark:text-purple-400 mt-0.5">
              {scholarshipCount + ngoCount} នាក់
            </h3>
            <p className="text-xs text-purple-500 mt-0.5">រដ្ឋ & អង្គការ ChildFund</p>
          </div>
        </div>
      </div>

      {/* NSAF Condition Policy Guidance Banner */}
      <div className="bg-gradient-to-r from-emerald-900 to-slate-900 text-white p-5 rounded-2xl border border-emerald-700/50 shadow-md space-y-2">
        <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
          <ShieldCheck size={20} />
          <span>គោលការណ៍បញ្ជាក់លក្ខខណ្ឌ ទទួលបាន ២០,០០០ រៀល/ខែ ពីមូលនិធិជាតិជំនួយសង្គម (NSAF)៖</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-200 pt-1">
          <div className="p-3 bg-white/10 rounded-xl border border-white/10">
            <span className="font-bold text-emerald-300 block mb-0.5">១. បណ្ណសមធម៌ស្របច្បាប់</span>
            សិស្សមានបណ្ណសមធម៌ ក្រ១ ឬ ក្រ២ ត្រឹមត្រូវតាមប្រព័ន្ធកំណត់សញ្ញាណគ្រួសារក្រីក្រ MoEYS/MoSAVY។
          </div>
          <div className="p-3 bg-white/10 rounded-xl border border-white/10">
            <span className="font-bold text-emerald-300 block mb-0.5">២. វត្តមានសិក្សា ≥ ៨៥%</span>
            សិស្សត្រូវមានវត្តមានសិក្សាយ៉ាងតិច ៨៥% ក្នុងមួយខែ និងមិនមានអវត្តមានគ្មានច្បាប់លើស ៣ ដង។
          </div>
          <div className="p-3 bg-white/10 rounded-xl border border-white/10">
            <span className="font-bold text-emerald-300 block mb-0.5">៣. លទ្ធផលផ្ទៀងផ្ទាត់ (Verification)</span>
            <span className="text-emerald-400 font-bold">«យល់ព្រម»</span> ទទួលបាន ២០,០០០ ៛/ខែ |{' '}
            <span className="text-rose-400 font-bold">«មិនគ្រប់លក្ខខណ្ឌ»</span> មិនទទួលបាន (០ ៛)។
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700/60 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="ស្វែងរកឈ្មោះសិស្ស, អង្គការ, ឬលក្ខខណ្ឌ..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:text-white"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <select
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
            className="px-3 py-2 text-sm bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl dark:text-white font-medium"
          >
            <option value="all">គ្រប់ប្រភេទទ្រទ្រង់</option>
            <option value="មូលនិធិជាតិជំនួយសង្គម NSAF (២០,០០០៛/ខែ)">🏛️ មូលនិធិជាតិជំនួយសង្គម NSAF (២០,០០០៛/ខែ)</option>
            <option value="អាហារូបត្ថម្ភ (Nutrition)">🥗 អាហារូបត្ថម្ភ WFP</option>
            <option value="អាហារូបករណ៍រដ្ឋ (Scholarship)">🎓 អាហារូបករណ៍រដ្ឋ</option>
            <option value="ឧបត្ថម្ភពីដៃគូ (NGO/Partner Aid)">🤝 ឧបត្ថម្ភពីដៃគូ NGO</option>
          </select>

          <select
            value={selectedNsafStatus}
            onChange={e => setSelectedNsafStatus(e.target.value)}
            className="px-3 py-2 text-sm bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl dark:text-white font-medium"
          >
            <option value="all">គ្រប់ស្ថានភាពលក្ខខណ្ឌ NSAF</option>
            <option value="យល់ព្រម">💚 គ្រប់លក្ខខណ្ឌ - យល់ព្រម (២០,០០០ ៛/ខែ)</option>
            <option value="មិនគ្រប់លក្ខខណ្ឌ">🔴 មិនគ្រប់លក្ខខណ្ឌ (មិនទទួលបាន ០ ៛)</option>
            <option value="រង់ចាំការបញ្ជាក់">🟡 រង់ចាំការបញ្ជាក់លក្ខខណ្ឌ</option>
          </select>
        </div>
      </div>

      {/* Main Support & NSAF Cash Transfer Table */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700/60 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-700 dark:text-slate-300">
            <thead className="bg-slate-50 dark:bg-slate-900/60 text-xs font-semibold text-slate-500 uppercase border-b border-slate-200 dark:border-slate-700/60">
              <tr>
                <th className="px-4 py-3">ឈ្មោះសិស្ស</th>
                <th className="px-4 py-3">ថ្នាក់</th>
                <th className="px-4 py-3">បណ្ណសមធម៌</th>
                <th className="px-4 py-3">ប្រភេទទ្រទ្រង់</th>
                <th className="px-4 py-3">អ្នកផ្តល់ជំនួយ / អង្គការ</th>
                <th className="px-4 py-3">កញ្ចប់ឧបត្ថម្ភ</th>
                <th className="px-4 py-3">ការបញ្ជាក់លក្ខខណ្ឌ NSAF & តម្លៃ</th>
                <th className="px-4 py-3">កាលបរិច្ឆេទ</th>
                <th className="px-4 py-3 text-right">សកម្មភាព</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700/60">
              {filteredSupports.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-4 py-8 text-center text-slate-400">
                    មិនមានទិន្នន័យជំនួយសិស្សតាមតម្រងឡើយ
                  </td>
                </tr>
              ) : (
                filteredSupports.map(item => {
                  const isNsaf = item.category.includes('មូលនិធិជាតិជំនួយសង្គម');

                  return (
                    <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition">
                      {/* Student Name */}
                      <td className="px-4 py-3 font-medium text-slate-900 dark:text-white">
                        {item.studentName}
                        <span
                          className={`ml-2 px-1.5 py-0.5 text-[10px] rounded ${
                            item.gender === 'ស្រី'
                              ? 'bg-pink-100 text-pink-700 dark:bg-pink-900/30'
                              : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30'
                          }`}
                        >
                          {item.gender}
                        </span>
                      </td>

                      {/* Grade */}
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-400">
                        {item.grade} ({item.section})
                      </td>

                      {/* Equity Card Status */}
                      <td className="px-4 py-3">
                        <span
                          className={`px-2 py-0.5 text-xs font-semibold rounded-full ${
                            item.equityStatus.includes('ក្រ១')
                              ? 'bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300 border border-rose-300'
                              : item.equityStatus.includes('ក្រ២')
                              ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300 border border-amber-300'
                              : 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300'
                          }`}
                        >
                          {item.equityStatus}
                        </span>
                      </td>

                      {/* Category */}
                      <td className="px-4 py-3 font-medium text-emerald-700 dark:text-emerald-400">
                        {item.category}
                      </td>

                      {/* Provider */}
                      <td className="px-4 py-3 text-slate-800 dark:text-slate-200">{item.providerName}</td>

                      {/* Item Description */}
                      <td className="px-4 py-3 text-slate-700 dark:text-slate-300">{item.itemDescription}</td>

                      {/* NSAF Condition Verification & Allowance Column */}
                      <td className="px-4 py-3 space-y-1">
                        {isNsaf ? (
                          <div>
                            <div className="flex items-center gap-2">
                              {item.nsafConditionStatus === 'យល់ព្រម' ? (
                                <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300 border border-emerald-300 flex items-center gap-1">
                                  <CheckCircle size={13} />
                                  <span>យល់ព្រម (២០,០០០ ៛/ខែ)</span>
                                </span>
                              ) : item.nsafConditionStatus === 'មិនគ្រប់លក្ខខណ្ឌ' ? (
                                <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300 border border-rose-300 flex items-center gap-1">
                                  <XCircle size={13} />
                                  <span>មិនគ្រប់លក្ខខណ្ឌ (០ ៛)</span>
                                </span>
                              ) : (
                                <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300 border border-amber-300 flex items-center gap-1">
                                  <Clock size={13} />
                                  <span>រង់ចាំការបញ្ជាក់</span>
                                </span>
                              )}

                              <button
                                onClick={() => handleQuickToggleNsafStatus(item)}
                                className="text-[10px] px-2 py-0.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 rounded text-slate-700 dark:text-slate-200 font-medium transition shrink-0"
                                title="ប្តូរស្ថានភាពបញ្ជាក់លក្ខខណ្ឌ NSAF"
                              >
                                ប្តូរលក្ខខណ្ឌ
                              </button>
                            </div>

                            {item.verificationNote && (
                              <p className="text-[11px] text-slate-500 dark:text-slate-400 italic mt-0.5">
                                {item.verificationNote}
                              </p>
                            )}
                          </div>
                        ) : (
                          <span className="font-semibold text-slate-900 dark:text-white">{item.amountOrValue}</span>
                        )}
                      </td>

                      {/* Date */}
                      <td className="px-4 py-3 text-xs text-slate-500 whitespace-nowrap">{item.dateProvided}</td>

                      {/* Action buttons */}
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => handleOpenEdit(item)}
                            className="p-1.5 text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition"
                            title="កែប្រែ"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => deleteStudentSupport(item.id)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 transition"
                            title="លុប"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Printable Sheet View for NSAF Verification (Triggers on print) */}
      <div className="hidden print:block p-8 bg-white text-black font-khmer">
        {/* Top-Most Kingdom Motto (Font Khmer OS Muol Light) */}
        <div className="text-center font-moul mb-6 space-y-1">
          <h2 className="text-base font-bold tracking-wide">ព្រះរាជាណាចក្រកម្ពុជា</h2>
          <h3 className="text-sm font-bold tracking-wide">ជាតិ សាសនា ព្រះមហាក្សត្រ</h3>
          <div className="flex justify-center items-center my-1 text-xs">
            <span className="font-serif">❖ ❖ ❖</span>
          </div>
        </div>

        <div className="text-xs space-y-1 mb-6 font-siemreap border-b-2 border-black pb-4">
          <p className="font-bold">ក្រសួងអប់រំ យុវជន និងកីឡា / មូលនិធិជាតិជំនួយសង្គម (NSAF)</p>
          <p className="font-bold">{schoolInfo.schoolName}</p>
          <h1 className="text-xl font-bold font-moul mt-3">
            បញ្ជីផ្ទៀងផ្ទាត់សិស្សមានបណ្ណសមធម៌ ទទួលប្រាក់ឧបត្ថម្ភ ២០,០០០៛/ខែ
          </h1>
          <p className="text-xs font-semibold">ពី មូលនិធិជាតិជំនួយសង្គម (NSAF / ក្រសួងសង្គមកិច្ច & MoEYS)</p>
          <p className="text-xs mt-1">ឆ្នាំសិក្សា {schoolInfo.academicYear}</p>
        </div>

        <div className="mb-4 text-xs space-y-1 bg-slate-100 p-3 rounded border border-black">
          <p>
            <strong>សរុបសិស្សមានបណ្ណសមធម៌៖</strong> {idPoorStudents.length} នាក់ | <strong>គ្រប់លក្ខខណ្ឌ យល់ព្រម៖</strong>{' '}
            {approvedNsafCount} នាក់ | <strong>មិនគ្រប់លក្ខខណ្ឌ៖</strong> {rejectedNsafCount} នាក់
          </p>
          <p>
            <strong>សរុបប្រាក់ឧបត្ថម្ភសង្គមត្រូវបើកផ្តល់ប្រចាំខែ៖</strong>{' '}
            <strong>{totalMonthlyNsafDisbursed.toLocaleString()} រៀល/ខែ</strong> (២០,០០០ រៀល/ខែ/នាក់)
          </p>
        </div>

        <table className="w-full border-collapse border border-black text-xs mb-6">
          <thead>
            <tr className="bg-slate-200">
              <th className="border border-black p-2">ល.រ</th>
              <th className="border border-black p-2">ឈ្មោះសិស្ស</th>
              <th className="border border-black p-2">ភេទ</th>
              <th className="border border-black p-2">ថ្នាក់</th>
              <th className="border border-black p-2">ប្រភេទបណ្ណសមធម៌</th>
              <th className="border border-black p-2">លទ្ធផលបញ្ជាក់លក្ខខណ្ឌ NSAF</th>
              <th className="border border-black p-2">ប្រាក់ឧបត្ថម្ភប្រចាំខែ</th>
              <th className="border border-black p-2">កំណត់ចំណាំការផ្ទៀងផ្ទាត់</th>
            </tr>
          </thead>
          <tbody>
            {nsafRecords.map((item, idx) => (
              <tr key={item.id}>
                <td className="border border-black p-2 text-center font-bold">{idx + 1}</td>
                <td className="border border-black p-2 font-bold">{item.studentName}</td>
                <td className="border border-black p-2 text-center">{item.gender}</td>
                <td className="border border-black p-2 text-center">{item.grade}</td>
                <td className="border border-black p-2 text-center font-semibold">{item.equityStatus}</td>
                <td className="border border-black p-2 text-center font-bold">
                  {item.nsafConditionStatus === 'យល់ព្រម'
                    ? 'យល់ព្រម'
                    : item.nsafConditionStatus === 'មិនគ្រប់លក្ខខណ្ឌ'
                    ? 'មិនគ្រប់លក្ខខណ្ឌ'
                    : 'រង់ចាំការបញ្ជាក់'}
                </td>
                <td className="border border-black p-2 text-center font-bold">
                  {item.nsafConditionStatus === 'យល់ព្រម' ? '២០,០០០ ៛' : '០ ៛'}
                </td>
                <td className="border border-black p-2 italic">{item.verificationNote || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-8 flex justify-between text-xs pt-4 font-siemreap">
          <div className="text-center">
            <p className="font-bold">បានឃើញ និងផ្ទៀងផ្ទាត់</p>
            <p className="font-bold mt-1">អាជ្ញាធរឃុំ / គណៈកម្មការឃុំ</p>
            <div className="h-16"></div>
            <p className="font-bold">.........................................</p>
          </div>
          <div className="text-center">
            <p className="font-moul font-bold text-sm">បានឃើញ និងឯកភាព</p>
            <p>ថ្ងៃទី...... ខែ...... ឆ្នាំ២០២៦</p>
            <p className="font-moul font-bold text-xs mt-1">នាយកសាលាបឋមសិក្សា អន្លង់តាម៉ី</p>
            <div className="h-16"></div>
            <p className="font-moul font-bold text-sm">{schoolInfo.principalName}</p>
          </div>
        </div>
      </div>

      {/* Modal Add / Edit Support */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-700/60">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
              {editingSupportRecord ? 'កែប្រែទិន្នន័យជំនួយដល់សិស្ស' : 'បន្ថែមជំនួយដល់សិស្ស'}
            </h2>

            <form onSubmit={handleSave} className="space-y-4">
              {/* Select Student */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  ជ្រើសរើសសិស្ស *
                </label>
                <select
                  required
                  value={selectedStudentId}
                  onChange={e => {
                    setSelectedStudentId(e.target.value);
                    const st = students.find(s => s.id === e.target.value);
                    if (st && (st.equityCard.includes('ក្រ១') || st.equityCard.includes('ក្រ២'))) {
                      handleCategoryChange('មូលនិធិជាតិជំនួយសង្គម NSAF (២០,០០០៛/ខែ)');
                    }
                  }}
                  className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-xl bg-slate-50 dark:bg-slate-900 dark:text-white"
                >
                  <option value="">-- ជ្រើសរើសសិស្ស --</option>
                  {students.map(s => (
                    <option key={s.id} value={s.id}>
                      {s.lastName} {s.firstName} - {s.grade} (បណ្ណ: {s.equityCard})
                    </option>
                  ))}
                </select>
              </div>

              {/* Category */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  ប្រភេទទ្រទ្រង់ *
                </label>
                <select
                  value={category}
                  onChange={e => handleCategoryChange(e.target.value as SupportCategory)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-xl bg-slate-50 dark:bg-slate-900 dark:text-white font-medium"
                >
                  <option value="មូលនិធិជាតិជំនួយសង្គម NSAF (២០,០០០៛/ខែ)">
                    🏛️ មូលនិធិជាតិជំនួយសង្គម NSAF (២០,០០០៛/ខែ)
                  </option>
                  <option value="អាហារូបត្ថម្ភ (Nutrition)">🥗 អាហារូបត្ថម្ភ (MoEYS / WFP)</option>
                  <option value="អាហារូបករណ៍រដ្ឋ (Scholarship)">🎓 អាហារូបករណ៍រដ្ឋ</option>
                  <option value="ឧបត្ថម្ភពីដៃគូ (NGO/Partner Aid)">🤝 ឧបត្ថម្ភពីដៃគូ (NGO)</option>
                </select>
              </div>

              {/* NSAF Condition Verification Section */}
              {category.includes('មូលនិធិជាតិជំនួយសង្គម') && (
                <div className="p-4 bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/40 rounded-xl space-y-3">
                  <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 block">
                    🛡️ ការផ្ទៀងផ្ទាត់លក្ខខណ្ឌ មូលនិធិជាតិជំនួយសង្គម NSAF (២០,០០០ ៛/ខែ)៖
                  </span>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      លទ្ធផលបញ្ជាក់លក្ខខណ្ឌ *
                    </label>
                    <select
                      value={nsafConditionStatus}
                      onChange={e => handleNsafConditionChange(e.target.value as NSAFConditionStatus)}
                      className="w-full px-3 py-2 text-sm border border-emerald-300 dark:border-emerald-700 rounded-xl bg-white dark:bg-slate-800 dark:text-white font-bold"
                    >
                      <option value="យល់ព្រម">💚 គ្រប់លក្ខខណ្ឌ - យល់ព្រម (ទទួលបាន ២០,០០០ ៛/ខែ)</option>
                      <option value="មិនគ្រប់លក្ខខណ្ឌ">🔴 មិនគ្រប់លក្ខខណ្ឌ - បដិសេធ (ពុំទទួលបាន ០ ៛)</option>
                      <option value="រង់ចាំការបញ្ជាក់">🟡 រង់ចាំការបញ្ជាក់លក្ខខណ្ឌ</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      កំណត់ចំណាំ/មូលហេតុនៃការផ្ទៀងផ្ទាត់
                    </label>
                    <input
                      type="text"
                      value={verificationNote}
                      onChange={e => setVerificationNote(e.target.value)}
                      placeholder="ឧ. គ្រប់លក្ខខណ្ឌ៖ មានបណ្ណសមធម៌ស្របច្បាប់ និងវត្តមានសិក្សា > ៨៥%"
                      className="w-full px-3 py-2 text-xs border border-slate-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-900 dark:text-white"
                    />
                  </div>
                </div>
              )}

              {/* Provider Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  អ្នកផ្តល់ជំនួយ / អង្គការ *
                </label>
                <input
                  type="text"
                  required
                  value={providerName}
                  onChange={e => setProviderName(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-xl bg-slate-50 dark:bg-slate-900 dark:text-white"
                />
              </div>

              {/* Item Description */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  បរិយាយសម្ភារ ឬប្រាក់ឧបត្ថម្ភ *
                </label>
                <input
                  type="text"
                  required
                  value={itemDescription}
                  onChange={e => setItemDescription(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-xl bg-slate-50 dark:bg-slate-900 dark:text-white"
                />
              </div>

              {/* Value & Date */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    តម្លៃ / បរិមាណ
                  </label>
                  <input
                    type="text"
                    required
                    value={amountOrValue}
                    onChange={e => setAmountOrValue(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-xl bg-slate-50 dark:bg-slate-900 dark:text-white font-bold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    កាលបរិច្ឆេទ
                  </label>
                  <input
                    type="date"
                    value={dateProvided}
                    onChange={e => setDateProvided(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-xl bg-slate-50 dark:bg-slate-900 dark:text-white"
                  />
                </div>
              </div>

              {/* Form Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition"
                >
                  បោះបង់
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-xl shadow-md transition"
                >
                  រក្សាទុក
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
