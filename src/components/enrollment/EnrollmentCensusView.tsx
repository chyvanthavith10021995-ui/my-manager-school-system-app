import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import type { CatchmentCensusChild, EnrollmentStatus } from '../../types';
import {
  UserCheck,
  UserX,
  Users,
  Plus,
  Search,
  Filter,
  Printer,
  Edit2,
  Trash2,
  MapPin,
  Phone,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

export const EnrollmentCensusView: React.FC = () => {
  const { censusChildren, addCensusChild, updateCensusChild, deleteCensusChild, schoolInfo } = useApp();
  const [search, setSearch] = useState('');
  const [selectedVillage, setSelectedVillage] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingChild, setEditingChild] = useState<CatchmentCensusChild | null>(null);

  // Form State
  const [formData, setFormData] = useState<Omit<CatchmentCensusChild, 'id' | 'childCode'>>({
    name: '',
    gender: 'ប្រុស',
    dob: '2020-05-10',
    age: 6,
    village: 'ភូមិអន្លង់តាម៉ី',
    guardianName: '',
    guardianPhone: '',
    status: 'បានចូលរៀន',
    enrolledSchool: schoolInfo.schoolName,
    enrolledGrade: 'ថ្នាក់ទី ១',
    reasonNotEnrolled: '',
    actionTaken: ''
  });

  const villages = Array.from(new Set(censusChildren.map(c => c.village)));

  const filteredChildren = censusChildren.filter(child => {
    const matchesSearch =
      child.name.toLowerCase().includes(search.toLowerCase()) ||
      child.guardianName.toLowerCase().includes(search.toLowerCase()) ||
      child.childCode.toLowerCase().includes(search.toLowerCase());
    const matchesVillage = selectedVillage === 'all' || child.village === selectedVillage;
    const matchesStatus = selectedStatus === 'all' || child.status === selectedStatus;
    return matchesSearch && matchesVillage && matchesStatus;
  });

  const totalChildren = censusChildren.length;
  const enrolledCount = censusChildren.filter(c => c.status === 'បានចូលរៀន').length;
  const notEnrolledCount = censusChildren.filter(c => c.status === 'មិនទាន់ចូលរៀន').length;
  const transferredCount = censusChildren.filter(c => c.status === 'ផ្ទេរទៅសាលាផ្សេង' || c.status === 'បោះបង់ការសិក្សា').length;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.guardianName) return;

    if (editingChild) {
      updateCensusChild(editingChild.id, formData);
    } else {
      addCensusChild(formData);
    }
    setIsAddModalOpen(false);
    setEditingChild(null);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      gender: 'ប្រុស',
      dob: '2020-05-10',
      age: 6,
      village: 'ភូមិអន្លង់តាម៉ី',
      guardianName: '',
      guardianPhone: '',
      status: 'បានចូលរៀន',
      enrolledSchool: schoolInfo.schoolName,
      enrolledGrade: 'ថ្នាក់ទី ១',
      reasonNotEnrolled: '',
      actionTaken: ''
    });
  };

  const handleOpenEdit = (child: CatchmentCensusChild) => {
    setEditingChild(child);
    setFormData({
      name: child.name,
      gender: child.gender,
      dob: child.dob,
      age: child.age,
      village: child.village,
      guardianName: child.guardianName,
      guardianPhone: child.guardianPhone,
      status: child.status,
      enrolledSchool: child.enrolledSchool || schoolInfo.schoolName,
      enrolledGrade: child.enrolledGrade || 'ថ្នាក់ទី ១',
      reasonNotEnrolled: child.reasonNotEnrolled || '',
      actionTaken: child.actionTaken || ''
    });
    setIsAddModalOpen(true);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700/60 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300">
              ក្រសួងអប់រំ យុវជន និងកីឡា
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">ឆមាសបវេសនកាល ឆ្នាំ២០២៦-២០២៧</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
            បវេសនកាល & បញ្ជីកុមារគ្រប់អាយុក្នុងភូមិចំណុះ
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            ការតាមដានកុមារអាយុ ៦-១១ ឆ្នាំក្នុងភូមិចំណុះ អ្នកចូលរៀន មិនទាន់ចូលរៀន និងវិធានការចុះជួយដល់ផ្ទះ
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 rounded-xl transition font-medium text-sm"
          >
            <Printer size={18} />
            <span>បោះពុម្ពទម្រង់ MoEYS</span>
          </button>
          <button
            onClick={() => {
              resetForm();
              setEditingChild(null);
              setIsAddModalOpen(true);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition font-medium text-sm shadow-md shadow-blue-500/20"
          >
            <Plus size={18} />
            <span>បន្ថែមទិន្នន័យកុមារ</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700/60 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 rounded-xl">
            <Users size={24} />
          </div>
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">កុមារគ្រប់អាយុក្នុងភូមិ</p>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-0.5">{totalChildren} នាក់</h3>
            <p className="text-xs text-slate-400 mt-0.5">អាយុ ៦ - ១១ ឆ្នាំ</p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700/60 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 rounded-xl">
            <UserCheck size={24} />
          </div>
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">អ្នកបានចូលរៀន</p>
            <h3 className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">
              {enrolledCount} នាក់ ({totalChildren > 0 ? Math.round((enrolledCount / totalChildren) * 100) : 0}%)
            </h3>
            <p className="text-xs text-emerald-500 mt-0.5">បានចុះឈ្មោះក្នុងប្រព័ន្ធសាលា</p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700/60 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 rounded-xl">
            <UserX size={24} />
          </div>
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">មិនទាន់ចូលរៀន</p>
            <h3 className="text-2xl font-bold text-amber-600 dark:text-amber-400 mt-0.5">{notEnrolledCount} នាក់</h3>
            <p className="text-xs text-amber-500 mt-0.5">ត្រូវការចុះអប់រំដោះស្រាយ</p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700/60 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 rounded-xl">
            <MapPin size={24} />
          </div>
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">ភូមិចំណុះសរុប</p>
            <h3 className="text-2xl font-bold text-purple-600 dark:text-purple-400 mt-0.5">{villages.length} ភូមិ</h3>
            <p className="text-xs text-purple-500 mt-0.5">ឃុំឈើទាល ស្រុកបាណន់</p>
          </div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700/60 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="ស្វែងរកឈ្មោះកុមារ, អាណាព្យាបាល, ឬលេខកូដ..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-slate-400" />
            <select
              value={selectedVillage}
              onChange={e => setSelectedVillage(e.target.value)}
              className="px-3 py-2 text-sm bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl dark:text-white"
            >
              <option value="all">គ្រប់ភូមិចំណុះ</option>
              {villages.map(v => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
          </div>

          <select
            value={selectedStatus}
            onChange={e => setSelectedStatus(e.target.value)}
            className="px-3 py-2 text-sm bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl dark:text-white"
          >
            <option value="all">គ្រប់ស្ថានភាព</option>
            <option value="បានចូលរៀន">បានចូលរៀន</option>
            <option value="មិនទាន់ចូលរៀន">មិនទាន់ចូលរៀន</option>
            <option value="ផ្ទេរទៅសាលាផ្សេង">ផ្ទេរទៅសាលាផ្សេង</option>
            <option value="បោះបង់ការសិក្សា">បោះបង់ការសិក្សា</option>
          </select>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700/60 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-700 dark:text-slate-300">
            <thead className="bg-slate-50 dark:bg-slate-900/60 text-xs font-semibold text-slate-500 uppercase border-b border-slate-200 dark:border-slate-700/60">
              <tr>
                <th className="px-4 py-3">លេខកូដកុមារ</th>
                <th className="px-4 py-3">ឈ្មោះកុមារ</th>
                <th className="px-4 py-3">ភេទ</th>
                <th className="px-4 py-3">ថ្ងៃកំណើត / អាយុ</th>
                <th className="px-4 py-3">ភូមិចំណុះ</th>
                <th className="px-4 py-3">អាណាព្យាបាល & ទូរស័ព្ទ</th>
                <th className="px-4 py-3">ស្ថានភាពចូលរៀន</th>
                <th className="px-4 py-3">សាលា/ថ្នាក់រៀន</th>
                <th className="px-4 py-3">មូលហេតុ/សកម្មភាពអន្តរាគមន៍</th>
                <th className="px-4 py-3 text-right">សកម្មភាព</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700/60">
              {filteredChildren.length === 0 ? (
                <tr>
                  <td colSpan={10} className="px-4 py-8 text-center text-slate-400">
                    មិនមានទិន្នន័យកុមារត្រូវនឹងការស្វែងរកឡើយ
                  </td>
                </tr>
              ) : (
                filteredChildren.map(child => (
                  <tr key={child.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition">
                    <td className="px-4 py-3 font-mono text-xs font-semibold text-blue-600 dark:text-blue-400">
                      {child.childCode}
                    </td>
                    <td className="px-4 py-3 font-medium text-slate-900 dark:text-white">{child.name}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-0.5 text-xs rounded-full ${
                          child.gender === 'ស្រី'
                            ? 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300'
                            : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                        }`}
                      >
                        {child.gender}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">
                      {child.dob} <span className="font-semibold text-slate-900 dark:text-white">({child.age} ឆ្នាំ)</span>
                    </td>
                    <td className="px-4 py-3">{child.village}</td>
                    <td className="px-4 py-3">
                      <div className="font-medium text-slate-900 dark:text-white">{child.guardianName}</div>
                      <div className="text-xs text-slate-500 flex items-center gap-1">
                        <Phone size={12} /> {child.guardianPhone}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2.5 py-1 text-xs font-semibold rounded-full flex items-center gap-1 w-fit ${
                          child.status === 'បានចូលរៀន'
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300'
                            : child.status === 'មិនទាន់ចូលរៀន'
                            ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300'
                            : 'bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300'
                        }`}
                      >
                        {child.status === 'បានចូលរៀន' ? (
                          <CheckCircle2 size={14} />
                        ) : (
                          <AlertTriangle size={14} />
                        )}
                        {child.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-medium text-slate-800 dark:text-slate-200">
                        {child.enrolledSchool || '-'}
                      </div>
                      {child.enrolledGrade && (
                        <span className="text-xs text-blue-600 dark:text-blue-400">{child.enrolledGrade}</span>
                      )}
                    </td>
                    <td className="px-4 py-3 max-w-xs">
                      {child.reasonNotEnrolled && (
                        <div className="text-xs text-rose-600 dark:text-rose-400 font-medium">
                          មូលហេតុ: {child.reasonNotEnrolled}
                        </div>
                      )}
                      {child.actionTaken && (
                        <div className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                          វិធានការ: {child.actionTaken}
                        </div>
                      )}
                      {!child.reasonNotEnrolled && !child.actionTaken && (
                        <span className="text-slate-400 text-xs">-</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenEdit(child)}
                          className="p-1.5 text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => deleteCensusChild(child.id)}
                          className="p-1.5 text-slate-600 hover:text-rose-600 dark:text-slate-400 dark:hover:text-rose-400 transition"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Add/Edit Child */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-700/60">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
              {editingChild ? 'កែប្រែព័ត៌មានកុមារ' : 'បន្ថែមទិន្នន័យកុមារក្នុងភូមិចំណុះ'}
            </h2>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    ឈ្មោះកុមារ *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-xl bg-slate-50 dark:bg-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">ភេទ</label>
                  <select
                    value={formData.gender}
                    onChange={e => setFormData({ ...formData, gender: e.target.value as 'ប្រុស' | 'ស្រី' })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-xl bg-slate-50 dark:bg-slate-900 dark:text-white"
                  >
                    <option value="ប្រុស">ប្រុស</option>
                    <option value="ស្រី">ស្រី</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    ថ្ងៃខែឆ្នាំកំណើត
                  </label>
                  <input
                    type="date"
                    value={formData.dob}
                    onChange={e => setFormData({ ...formData, dob: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-xl bg-slate-50 dark:bg-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    អាយុ (ឆ្នាំ)
                  </label>
                  <input
                    type="number"
                    min={4}
                    max={15}
                    value={formData.age}
                    onChange={e => setFormData({ ...formData, age: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-xl bg-slate-50 dark:bg-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    ភូមិចំណុះ *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.village}
                    onChange={e => setFormData({ ...formData, village: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-xl bg-slate-50 dark:bg-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    ឈ្មោះអាណាព្យាបាល *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.guardianName}
                    onChange={e => setFormData({ ...formData, guardianName: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-xl bg-slate-50 dark:bg-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    លេខទូរស័ព្ទអាណាព្យាបាល
                  </label>
                  <input
                    type="text"
                    value={formData.guardianPhone}
                    onChange={e => setFormData({ ...formData, guardianPhone: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-xl bg-slate-50 dark:bg-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    ស្ថានភាពចូលរៀន
                  </label>
                  <select
                    value={formData.status}
                    onChange={e => setFormData({ ...formData, status: e.target.value as EnrollmentStatus })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-xl bg-slate-50 dark:bg-slate-900 dark:text-white"
                  >
                    <option value="បានចូលរៀន">បានចូលរៀន</option>
                    <option value="មិនទាន់ចូលរៀន">មិនទាន់ចូលរៀន</option>
                    <option value="ផ្ទេរទៅសាលាផ្សេង">ផ្ទេរទៅសាលាផ្សេង</option>
                    <option value="បោះបង់ការសិក្សា">បោះបង់ការសិក្សា</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    សាលារៀនដែលបានចូល
                  </label>
                  <input
                    type="text"
                    value={formData.enrolledSchool}
                    onChange={e => setFormData({ ...formData, enrolledSchool: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-xl bg-slate-50 dark:bg-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    កម្រិតថ្នាក់
                  </label>
                  <input
                    type="text"
                    value={formData.enrolledGrade}
                    onChange={e => setFormData({ ...formData, enrolledGrade: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-xl bg-slate-50 dark:bg-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  មូលហេតុមិនទាន់ចូលរៀន (បើមាន)
                </label>
                <input
                  type="text"
                  placeholder="ឧ. គ្រួសារក្រីក្រ, នៅឆ្ងាយសាលា..."
                  value={formData.reasonNotEnrolled}
                  onChange={e => setFormData({ ...formData, reasonNotEnrolled: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-xl bg-slate-50 dark:bg-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  សកម្មភាពអន្តរាគមន៍ / ចុះជួយ
                </label>
                <input
                  type="text"
                  placeholder="ឧ. ចុះអប់រំដល់ផ្ទះ, ផ្តល់អាហារូបករណ៍រដ្ឋ..."
                  value={formData.actionTaken}
                  onChange={e => setFormData({ ...formData, actionTaken: e.target.value })}
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
                  className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl shadow-md"
                >
                  រក្សាទុក
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PRINTABLE OFFICIAL MoEYS CENSUS REPORT (Triggers on print) */}
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
          <h1 className="text-xl font-bold font-moul mt-3">
            របាយការណ៍ស្ថិតិជំរឿនកុមារគ្រប់អាយុ និងការចុះឈ្មោះចូលរៀនក្នុងភូមិចំណុះ
          </h1>
          <p className="text-xs font-semibold">ឆ្នាំសិក្សា {schoolInfo.academicYear}</p>
        </div>

        <div className="mb-4 text-xs space-y-1 bg-slate-100 p-3 rounded border border-black font-siemreap">
          <p>
            <strong>សរុបកុមារក្នុងភូមិចំណុះ៖</strong> {totalChildren} នាក់ | <strong>បានចូលរៀន៖</strong> {enrolledCount} នាក់ | <strong>មិនទាន់ចូលរៀន៖</strong> {notEnrolledCount} នាក់ | <strong>ផ្ទេរ/បោះបង់៖</strong> {transferredCount} នាក់
          </p>
        </div>

        <table className="w-full border-collapse border border-black text-xs mb-6 font-siemreap">
          <thead>
            <tr className="bg-slate-200">
              <th className="border border-black p-2">ល.រ</th>
              <th className="border border-black p-2">កូដកុមារ</th>
              <th className="border border-black p-2">ឈ្មោះកុមារ</th>
              <th className="border border-black p-2">ភេទ</th>
              <th className="border border-black p-2">អាយុ</th>
              <th className="border border-black p-2">ភូមិចំណុះ</th>
              <th className="border border-black p-2">អាណាព្យាបាល</th>
              <th className="border border-black p-2">ស្ថានភាពសិក្សា</th>
              <th className="border border-black p-2">សាលារៀន/ថ្នាក់</th>
            </tr>
          </thead>
          <tbody>
            {filteredChildren.map((item, idx) => (
              <tr key={item.id}>
                <td className="border border-black p-2 text-center font-bold">{idx + 1}</td>
                <td className="border border-black p-2 text-center font-mono">{item.childCode}</td>
                <td className="border border-black p-2 font-bold">{item.name}</td>
                <td className="border border-black p-2 text-center">{item.gender}</td>
                <td className="border border-black p-2 text-center">{item.age} ឆ្នាំ</td>
                <td className="border border-black p-2 text-center">{item.village}</td>
                <td className="border border-black p-2">{item.guardianName} ({item.guardianPhone})</td>
                <td className="border border-black p-2 text-center font-bold">{item.status}</td>
                <td className="border border-black p-2 text-center">{item.enrolledSchool} - {item.enrolledGrade}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-8 flex justify-between text-xs pt-4 font-siemreap">
          <div className="text-center">
            <p className="font-bold">អ្នកស្រង់ទិន្នន័យ / គ្រូទទួលបន្ទុក</p>
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
    </div>
  );
};
