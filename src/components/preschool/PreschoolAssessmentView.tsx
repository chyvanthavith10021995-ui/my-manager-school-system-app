import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import type { PreschoolAssessment, PreschoolRating, PreschoolIndicatorScore } from '../../types';
import {
  Plus,
  Printer,
  Search,
  Trash2,
  Edit2
} from 'lucide-react';

const DEFAULT_INDICATORS: Omit<PreschoolIndicatorScore, 'rating'>[] = [
  { indicatorId: 'ind1', category: 'កាយសម្បទា & សុខភាព', title: 'ការយល់ដឹងពីអនាម័យខ្លួនប្រាណ និងការលាងដៃមុនហូបបាយ' },
  { indicatorId: 'ind2', category: 'កាយសម្បទា & សុខភាព', title: 'ចលនាសាច់ដុំធំ (ការរត់ ផ្លោះ លោត) និងចលនាសាច់ដុំតូច (ការកាន់ខ្មៅដៃ)' },
  { indicatorId: 'ind3', category: 'សង្គម & អារម្មណ៍', title: 'ការលេងសហការជាមួយមិត្តភក្តិ និងការចែករំលែកសម្ភារ' },
  { indicatorId: 'ind4', category: 'សង្គម & អារម្មណ៍', title: 'ការគ្រប់គ្រងអារម្មណ៍ និងការគោរពបទបញ្ជាក្នុងថ្នាក់' },
  { indicatorId: 'ind5', category: 'ភាសាខ្មែរ & ការប្រាស្រ័យទាក់ទង', title: 'ការស្តាប់ និងយល់ន័យពាក្យបញ្ជាសាមញ្ញ' },
  { indicatorId: 'ind6', category: 'ភាសាខ្មែរ & ការប្រាស្រ័យទាក់ទង', title: 'ការនិយាយប្រាប់តម្រូវការ និងការស្គាល់តួអក្សរដំបូង' },
  { indicatorId: 'ind7', category: 'គណិតវិទ្យាដំបូង', title: 'ការរាប់លេខ ១-១០ និងការរៀបលំដាប់រូបរាង/ទំហំ' },
  { indicatorId: 'ind8', category: 'វិទ្យាសាស្ត្រ & បរិស្ថាន', title: 'ការស្គាល់ឈ្មោះសត្វ រុក្ខជាតិ និងពណ៌ផ្សេងៗ' }
];

export const PreschoolAssessmentView: React.FC = () => {
  const { preschoolAssessments, addPreschoolAssessment, updatePreschoolAssessment, deletePreschoolAssessment, students, schoolInfo } = useApp();
  const [search, setSearch] = useState('');
  const [selectedTerm, setSelectedTerm] = useState<string>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingAssessment, setEditingAssessment] = useState<PreschoolAssessment | null>(null);
  const [selectedAssessmentForPrint, setSelectedAssessmentForPrint] = useState<PreschoolAssessment | null>(null);

  // Form State
  const [selectedStudentId, setSelectedStudentId] = useState('');
  const [evaluatorName, setEvaluatorName] = useState('អ្នកគ្រូ គឹម ស្រីពៅ');
  const [term, setTerm] = useState<'ឆមាសទី១' | 'ឆមាសទី២' | 'ប្រចាំខែ'>('ឆមាសទី១');
  const [date, setDate] = useState('2026-09-24');
  const [overallRemarks, setOverallRemarks] = useState('កុមារមានការរីកចម្រើនយ៉ាងល្អលើគ្រប់វិស័យ');

  const [ratings, setRatings] = useState<Record<string, PreschoolRating>>({
    ind1: 'ល្អប្រសើរ',
    ind2: 'ល្អ',
    ind3: 'ល្អប្រសើរ',
    ind4: 'ល្អ',
    ind5: 'ល្អប្រសើរ',
    ind6: 'ល្អ',
    ind7: 'ល្អប្រសើរ',
    ind8: 'ល្អ'
  });

  const filteredAssessments = preschoolAssessments.filter(item => {
    const matchesSearch = item.studentName.toLowerCase().includes(search.toLowerCase());
    const matchesTerm = selectedTerm === 'all' || item.term === selectedTerm;
    return matchesSearch && matchesTerm;
  });

  const resetForm = () => {
    setEditingAssessment(null);
    setSelectedStudentId('');
    setEvaluatorName('អ្នកគ្រូ គឹម ស្រីពៅ');
    setTerm('ឆមាសទី១');
    setDate('2026-09-24');
    setOverallRemarks('កុមារមានការរីកចម្រើនយ៉ាងល្អលើគ្រប់វិស័យ');
    setRatings({
      ind1: 'ល្អប្រសើរ',
      ind2: 'ល្អ',
      ind3: 'ល្អប្រសើរ',
      ind4: 'ល្អ',
      ind5: 'ល្អប្រសើរ',
      ind6: 'ល្អ',
      ind7: 'ល្អប្រសើរ',
      ind8: 'ល្អ'
    });
  };

  const handleOpenEdit = (item: PreschoolAssessment) => {
    setEditingAssessment(item);
    setSelectedStudentId(item.studentId);
    setEvaluatorName(item.evaluatorTeacherName);
    setTerm(item.term);
    setDate(item.date);
    setOverallRemarks(item.overallRemarks);

    const initialRatings: Record<string, PreschoolRating> = {};
    item.indicators.forEach(ind => {
      initialRatings[ind.indicatorId] = ind.rating;
    });
    setRatings(initialRatings);
    setIsAddModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const st = students.find(s => s.id === selectedStudentId);
    if (!st) return;

    const indicators: PreschoolIndicatorScore[] = DEFAULT_INDICATORS.map(ind => ({
      ...ind,
      rating: ratings[ind.indicatorId] || 'ល្អ'
    }));

    if (editingAssessment) {
      updatePreschoolAssessment(editingAssessment.id, {
        studentId: st.id,
        studentName: `${st.lastName} ${st.firstName}`,
        gender: st.gender === 'ស្រី' ? 'ស្រី' : 'ប្រុស',
        dob: st.dob,
        term,
        evaluatorTeacherName: evaluatorName,
        date,
        indicators,
        overallRemarks
      });
    } else {
      addPreschoolAssessment({
        studentId: st.id,
        studentName: `${st.lastName} ${st.firstName}`,
        gender: st.gender === 'ស្រី' ? 'ស្រី' : 'ប្រុស',
        dob: st.dob,
        term,
        evaluatorTeacherName: evaluatorName,
        date,
        indicators,
        overallRemarks
      });
    }

    setIsAddModalOpen(false);
    resetForm();
  };

  const getRatingBadgeClass = (rating: PreschoolRating) => {
    switch (rating) {
      case 'ល្អប្រសើរ':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300 border-emerald-300';
      case 'ល្អ':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 border-blue-300';
      case 'មធ្យម':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300 border-amber-300';
      default:
        return 'bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300 border-rose-300';
    }
  };

  const handlePrintCard = (item: PreschoolAssessment) => {
    setSelectedAssessmentForPrint(item);
    setTimeout(() => {
      window.print();
    }, 200);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700/60 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300">
              ការអប់រំកុមារតូច (មត្តេយ្យសិក្សា)
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">ទម្រង់ក្រដាសស្ដង់ដារ MoEYS</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
            ឧបករណ៍វាយតម្លៃមត្តេយ្យសិក្សា (សូចនាករ និងពាក្យសម្គាល់)
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            ការវាយតម្លៃតាម ៥ វិស័យអភិវឌ្ឍន៍កុមារ ស្របតាមក្របខ័ណ្ឌកម្មវិធីសិក្សាមត្តេយ្យសិក្សាជាតិ
          </p>
        </div>

        <button
          onClick={() => {
            resetForm();
            setIsAddModalOpen(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl transition font-medium text-sm shadow-md shadow-amber-500/20"
        >
          <Plus size={18} />
          <span>បង្កើតបណ្ណវាយតម្លៃថ្មី</span>
        </button>
      </div>

      {/* Filters & Search */}
      <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700/60 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="ស្វែងរកឈ្មោះសិស្សមត្តេយ្យ..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 dark:text-white"
          />
        </div>

        <select
          value={selectedTerm}
          onChange={e => setSelectedTerm(e.target.value)}
          className="px-3 py-2 text-sm bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl dark:text-white"
        >
          <option value="all">គ្រប់ដំណាក់កាលវាយតម្លៃ</option>
          <option value="ឆមាសទី១">ឆមាសទី១</option>
          <option value="ឆមាសទី២">ឆមាសទី២</option>
          <option value="ប្រចាំខែ">ប្រចាំខែ</option>
        </select>
      </div>

      {/* Assessment Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredAssessments.length === 0 ? (
          <div className="col-span-full bg-white dark:bg-slate-800 p-12 text-center rounded-2xl border border-slate-200 dark:border-slate-700 text-slate-400">
            មិនទាន់មានទិន្នន័យបណ្ណវាយតម្លៃមត្តេយ្យឡើយ
          </div>
        ) : (
          filteredAssessments.map(item => (
            <div
              key={item.id}
              className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700/60 shadow-sm hover:shadow-md transition overflow-hidden"
            >
              {/* Card Header */}
              <div className="p-5 border-b border-slate-100 dark:border-slate-700/60 bg-slate-50/50 dark:bg-slate-900/30 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">{item.studentName}</h3>
                    <span
                      className={`px-2 py-0.5 text-xs rounded-full ${
                        item.gender === 'ស្រី'
                          ? 'bg-pink-100 text-pink-700 dark:bg-pink-900/30'
                          : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30'
                      }`}
                    >
                      {item.gender}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    ថ្ងៃកំណើត: {item.dob} | កាលបរិច្ឆេទវាយតម្លៃ: {item.date}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300 rounded-full text-xs font-semibold">
                    {item.term}
                  </span>
                  <button
                    onClick={() => handleOpenEdit(item)}
                    className="p-1.5 text-slate-600 hover:text-amber-600 dark:text-slate-400 dark:hover:text-amber-400 transition"
                    title="កែប្រែបណ្ណវាយតម្លៃ"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => handlePrintCard(item)}
                    className="p-1.5 text-slate-600 hover:text-amber-600 dark:text-slate-400 dark:hover:text-amber-400"
                    title="បោះពុម្ពទម្រង់ក្រដាស"
                  >
                    <Printer size={18} />
                  </button>
                  <button
                    onClick={() => deletePreschoolAssessment(item.id)}
                    className="p-1.5 text-slate-600 hover:text-rose-600 dark:text-slate-400 dark:hover:text-rose-400"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              {/* Rubric Table Breakdown */}
              <div className="p-5 space-y-4">
                <div className="space-y-2">
                  {item.indicators.map(ind => (
                    <div
                      key={ind.indicatorId}
                      className="p-3 bg-slate-50 dark:bg-slate-900/40 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="space-y-0.5">
                        <span className="font-semibold text-amber-700 dark:text-amber-400 block">
                          [{ind.category}]
                        </span>
                        <span className="text-slate-800 dark:text-slate-200">{ind.title}</span>
                      </div>
                      <span
                        className={`px-2.5 py-1 text-xs font-semibold border rounded-lg shrink-0 ${getRatingBadgeClass(
                          ind.rating
                        )}`}
                      >
                        {ind.rating}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Teacher Remarks */}
                <div className="p-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/30 rounded-xl">
                  <span className="text-xs font-semibold text-amber-800 dark:text-amber-300 block mb-1">
                    ពាក្យសម្គាល់ និងការវាយតម្លៃរួមរបស់គ្រូ:
                  </span>
                  <p className="text-xs text-slate-700 dark:text-slate-300 italic">"{item.overallRemarks}"</p>
                  <div className="mt-2 text-right text-xs font-medium text-slate-500">
                    គ្រូវាយតម្លៃ: {item.evaluatorTeacherName}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Printable Sheet View (Hidden normally, triggers on print) */}
      {selectedAssessmentForPrint && (
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
            <p className="font-bold">ក្រសួងអប់រំ យុវជន និងកីឡា (MoEYS)</p>
            <p className="font-bold">{schoolInfo.schoolName}</p>
            <h1 className="text-xl font-bold font-moul mt-3">បណ្ណវាយតម្លៃការរីកចម្រើនកុមារតូច (មត្តេយ្យសិក្សា)</h1>
            <p className="text-xs font-semibold">
              ឈ្មោះសិស្ស: <strong>{selectedAssessmentForPrint.studentName}</strong> | ភេទ:{' '}
              {selectedAssessmentForPrint.gender} | ថ្ងៃកំណើត: {selectedAssessmentForPrint.dob}
            </p>
            <p className="text-xs">ដំណាក់កាលវាយតម្លៃ: {selectedAssessmentForPrint.term}</p>
          </div>

          <table className="w-full border-collapse border border-black text-xs mb-6">
            <thead>
              <tr className="bg-slate-200">
                <th className="border border-black p-2">ល.រ</th>
                <th className="border border-black p-2">វិស័យអភិវឌ្ឍន៍ & សូចនាករ</th>
                <th className="border border-black p-2">កម្រិតសម្រេច (ល្អប្រសើរ / ល្អ / មធ្យម / ត្រូវការកែលម្អ)</th>
              </tr>
            </thead>
            <tbody>
              {selectedAssessmentForPrint.indicators.map((ind, idx) => (
                <tr key={ind.indicatorId}>
                  <td className="border border-black p-2 text-center">{idx + 1}</td>
                  <td className="border border-black p-2">
                    <strong>[{ind.category}]</strong> - {ind.title}
                  </td>
                  <td className="border border-black p-2 text-center font-bold">{ind.rating}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="border border-black p-4 text-xs space-y-2">
            <p>
              <strong>ពាក្យសម្គាល់រួមរបស់គ្រូបន្ទុកថ្នាក់:</strong>
            </p>
            <p className="italic">{selectedAssessmentForPrint.overallRemarks}</p>
          </div>

          <div className="mt-8 flex justify-between text-xs pt-4 font-siemreap">
            <div className="text-center">
              <p className="font-moul font-bold text-sm">បានឃើញ និងឯកភាព</p>
              <p>ថ្ងៃទី...... ខែ...... ឆ្នាំ២០២៦</p>
              <p className="font-moul font-bold text-xs mt-1">នាយកសាលាបឋមសិក្សា អន្លង់តាម៉ី</p>
              <div className="h-16"></div>
              <p className="font-moul font-bold text-sm">{schoolInfo.principalName}</p>
            </div>
            <div className="text-center">
              <p>ថ្ងៃទី...... ខែ...... ឆ្នាំ២០២៦</p>
              <p className="font-moul font-bold text-xs mt-1">គ្រូវាយតម្លៃ</p>
              <div className="h-16"></div>
              <p className="font-bold">{selectedAssessmentForPrint.evaluatorTeacherName}</p>
            </div>
          </div>
        </div>
      )}

      {/* Add Assessment Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-3xl w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-700/60">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
              {editingAssessment ? 'កែប្រែទម្រង់វាយតម្លៃសិស្សមត្តេយ្យសិក្សា' : 'រៀបចំទម្រង់វាយតម្លៃសិស្សមត្តេយ្យសិក្សា'}
            </h2>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    ជ្រើសរើសសិស្ស *
                  </label>
                  <select
                    required
                    value={selectedStudentId}
                    onChange={e => setSelectedStudentId(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-xl bg-slate-50 dark:bg-slate-900 dark:text-white"
                  >
                    <option value="">-- ជ្រើសរើសសិស្ស --</option>
                    {students.map(s => (
                      <option key={s.id} value={s.id}>
                        {s.lastName} {s.firstName} ({s.grade})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    ដំណាក់កាលវាយតម្លៃ
                  </label>
                  <select
                    value={term}
                    onChange={e => setTerm(e.target.value as any)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-xl bg-slate-50 dark:bg-slate-900 dark:text-white"
                  >
                    <option value="ឆមាសទី១">ឆមាសទី១</option>
                    <option value="ឆមាសទី២">ឆមាសទី២</option>
                    <option value="ប្រចាំខែ">ប្រចាំខែ</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    កាលបរិច្ឆេទ
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-xl bg-slate-50 dark:bg-slate-900 dark:text-white"
                  />
                </div>
              </div>

              {/* Indicators Rating Section */}
              <div className="space-y-3 pt-2">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  វាយតម្លៃតាមសូចនាករទាំង ៨ របស់ក្រសួង:
                </h3>
                {DEFAULT_INDICATORS.map(ind => (
                  <div
                    key={ind.indicatorId}
                    className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <span className="font-semibold text-amber-600 dark:text-amber-400 block">
                        [{ind.category}]
                      </span>
                      <span className="text-slate-800 dark:text-slate-200">{ind.title}</span>
                    </div>

                    <select
                      value={ratings[ind.indicatorId] || 'ល្អ'}
                      onChange={e => setRatings({ ...ratings, [ind.indicatorId]: e.target.value as PreschoolRating })}
                      className="px-3 py-1.5 text-xs border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 dark:text-white font-medium shrink-0"
                    >
                      <option value="ល្អប្រសើរ">ល្អប្រសើរ</option>
                      <option value="ល្អ">ល្អ</option>
                      <option value="មធ្យម">មធ្យម</option>
                      <option value="ត្រូវការកែលម្អ">ត្រូវការកែលម្អ</option>
                    </select>
                  </div>
                ))}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  ពាក្យសម្គាល់ និងការវាយតម្លៃរួមរបស់គ្រូ
                </label>
                <textarea
                  rows={2}
                  value={overallRemarks}
                  onChange={e => setOverallRemarks(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-xl bg-slate-50 dark:bg-slate-900 dark:text-white"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl"
                >
                  បោះបង់
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-xl shadow-md"
                >
                  រក្សាទុកបណ្ណវាយតម្លៃ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
