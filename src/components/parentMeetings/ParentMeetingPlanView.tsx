import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import type { ParentMeetingPlan } from '../../types';
import {
  Users,
  Calendar,
  Clock,
  Plus,
  Printer,
  Edit2,
  Trash2
} from 'lucide-react';

export const ParentMeetingPlanView: React.FC = () => {
  const { parentMeetingPlans, addParentMeetingPlan, updateParentMeetingPlan, deleteParentMeetingPlan, schoolInfo } =
    useApp();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<ParentMeetingPlan | null>(null);

  // Form State
  const [meetingNumber, setMeetingNumber] = useState('លើកទី ១ (ដើមឆ្នាំសិក្សា)');
  const [plannedDate, setPlannedDate] = useState('2026-11-05');
  const [time, setTime] = useState('08:00 ព្រឹក - 11:00 ព្រឹក');
  const [agendaTopic, setAgendaTopic] = useState('');
  const [targetAudience, setTargetAudience] = useState('មាតាបិតាសិស្សគ្រប់កម្រិតថ្នាក់ (ថ្នាក់ទី១-៦)');
  const [responsiblePerson, setResponsiblePerson] = useState('លោកនាយក ឈិត សារ៉ាំ & គណៈគ្រប់គ្រង');
  const [expectedOutput, setExpectedOutput] = useState('');
  const [status, setStatus] = useState<ParentMeetingPlan['status']>('រង់ចាំអនុវត្ត');
  const [actualAttendanceCount, setActualAttendanceCount] = useState<number | undefined>(undefined);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agendaTopic || !responsiblePerson) return;

    if (editingPlan) {
      updateParentMeetingPlan(editingPlan.id, {
        meetingNumber,
        plannedDate,
        time,
        agendaTopic,
        targetAudience,
        responsiblePerson,
        expectedOutput,
        status,
        actualAttendanceCount
      });
    } else {
      addParentMeetingPlan({
        meetingNumber,
        plannedDate,
        time,
        agendaTopic,
        targetAudience,
        responsiblePerson,
        expectedOutput,
        status,
        actualAttendanceCount
      });
    }

    setIsAddModalOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setEditingPlan(null);
    setAgendaTopic('');
    setExpectedOutput('');
    setActualAttendanceCount(undefined);
  };

  const handleOpenEdit = (plan: ParentMeetingPlan) => {
    setEditingPlan(plan);
    setMeetingNumber(plan.meetingNumber);
    setPlannedDate(plan.plannedDate);
    setTime(plan.time);
    setAgendaTopic(plan.agendaTopic);
    setTargetAudience(plan.targetAudience);
    setResponsiblePerson(plan.responsiblePerson);
    setExpectedOutput(plan.expectedOutput);
    setStatus(plan.status);
    setActualAttendanceCount(plan.actualAttendanceCount);
    setIsAddModalOpen(true);
  };

  const handlePrintPlan = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700/60 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-300">
              សហគមន៍ & ទំនាក់ទំនងមាតាបិតា
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">ផែនការសកម្មភាព ១ ឆ្នាំសិក្សា</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
            ផែនការប្រជុំមាតាបិតាសិស្ស សម្រាប់ ១ ឆ្នាំសិក្សា
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            កាលបរិច្ឆេទ ខ្លឹមសាររបៀបវារៈ អ្នកទទួលខុសត្រូវ និងលទ្ធផលរំពឹងទុក តាមប្រតិទិនអប់រំជាតិ
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePrintPlan}
            className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 rounded-xl transition font-medium text-sm"
          >
            <Printer size={18} />
            <span>បោះពុម្ពឯកសារផែនការ</span>
          </button>
          <button
            onClick={() => {
              resetForm();
              setIsAddModalOpen(true);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition font-medium text-sm shadow-md shadow-indigo-500/20"
          >
            <Plus size={18} />
            <span>បន្ថែមផែនការប្រជុំ</span>
          </button>
        </div>
      </div>

      {/* Timeline Roadmap Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {parentMeetingPlans.map((plan) => (
          <div
            key={plan.id}
            className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700/60 shadow-sm hover:shadow-md transition flex flex-col justify-between overflow-hidden"
          >
            <div className="p-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 text-xs font-bold rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-300">
                  {plan.meetingNumber}
                </span>

                <span
                  className={`px-2.5 py-0.5 text-xs font-semibold rounded-full ${
                    plan.status === 'បានរៀបចំរួច'
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300'
                      : plan.status === 'រង់ចាំអនុវត្ត'
                      ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300'
                      : 'bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300'
                  }`}
                >
                  {plan.status}
                </span>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base leading-snug">
                  {plan.agendaTopic}
                </h3>
              </div>

              <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-900/40 p-3 rounded-xl">
                <div className="flex items-center gap-2">
                  <Calendar size={14} className="text-indigo-500" />
                  <span>
                    កាលបរិច្ឆេទ: <strong>{plan.plannedDate}</strong>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={14} className="text-indigo-500" />
                  <span>ម៉ោង: {plan.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users size={14} className="text-indigo-500" />
                  <span>អ្នកចូលរួម: {plan.targetAudience}</span>
                </div>
              </div>

              <div>
                <span className="text-xs font-semibold text-slate-500 block mb-1">អ្នកទទួលខុសត្រូវ:</span>
                <p className="text-xs font-medium text-slate-800 dark:text-slate-200">{plan.responsiblePerson}</p>
              </div>

              <div>
                <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 block mb-1">
                  លទ្ធផលរំពឹងទុក:
                </span>
                <p className="text-xs text-slate-700 dark:text-slate-300 italic">{plan.expectedOutput}</p>
              </div>

              {plan.actualAttendanceCount !== undefined && (
                <div className="flex items-center justify-between p-2 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-800 dark:text-emerald-300 rounded-lg text-xs font-semibold">
                  <span>វត្តមានមាតាបិតាចូលរួមជាក់ស្តែង:</span>
                  <span>{plan.actualAttendanceCount} នាក់</span>
                </div>
              )}
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-900/40 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-end gap-2">
              <button
                onClick={() => handleOpenEdit(plan)}
                className="p-1.5 text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400 transition"
              >
                <Edit2 size={16} />
              </button>
              <button
                onClick={() => deleteParentMeetingPlan(plan.id)}
                className="p-1.5 text-slate-600 hover:text-rose-600 dark:text-slate-400 dark:hover:text-rose-400 transition"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Printable Official Document Layout */}
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
          <h1 className="text-xl font-bold font-moul mt-3">ឯកសារផែនការប្រជុំមាតាបិតាសិស្ស សម្រាប់ ១ ឆ្នាំសិក្សា</h1>
          <p className="text-xs font-semibold">ឆ្នាំសិក្សា {schoolInfo.academicYear}</p>
        </div>

        <table className="w-full border-collapse border border-black text-xs mb-6">
          <thead>
            <tr className="bg-slate-200">
              <th className="border border-black p-2">ល.រ</th>
              <th className="border border-black p-2">កាលបរិច្ឆេទ & ម៉ោង</th>
              <th className="border border-black p-2">ខ្លឹមសារ / របៀបវារៈប្រជុំ</th>
              <th className="border border-black p-2">សមាសភាពចូលរួម</th>
              <th className="border border-black p-2">អ្នកទទួលខុសត្រូវ</th>
              <th className="border border-black p-2">លទ្ធផលរំពឹងទុក</th>
            </tr>
          </thead>
          <tbody>
            {parentMeetingPlans.map((plan, idx) => (
              <tr key={plan.id}>
                <td className="border border-black p-2 text-center font-bold">{idx + 1}</td>
                <td className="border border-black p-2">
                  {plan.plannedDate}
                  <br />
                  <span className="text-[10px] text-slate-600">{plan.time}</span>
                </td>
                <td className="border border-black p-2 font-medium">{plan.agendaTopic}</td>
                <td className="border border-black p-2">{plan.targetAudience}</td>
                <td className="border border-black p-2">{plan.responsiblePerson}</td>
                <td className="border border-black p-2">{plan.expectedOutput}</td>
              </tr>
            ))}
          </tbody>
        </table>

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
            <p className="font-moul font-bold text-xs mt-1">អ្នករៀបចំផែនការ</p>
            <div className="h-16"></div>
            <p className="font-bold">គណៈគ្រប់គ្រងសាលារៀន</p>
          </div>
        </div>
      </div>

      {/* Modal Add/Edit */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-700/60">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
              {editingPlan ? 'កែប្រែផែនការប្រជុំ' : 'បន្ថែមផែនការប្រជុំមាតាបិតា'}
            </h2>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  ជុំប្រជុំ / លើកទី
                </label>
                <input
                  type="text"
                  required
                  value={meetingNumber}
                  onChange={e => setMeetingNumber(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-xl bg-slate-50 dark:bg-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  ខ្លឹមសារ / របៀបវារៈប្រជុំ *
                </label>
                <textarea
                  rows={2}
                  required
                  value={agendaTopic}
                  onChange={e => setAgendaTopic(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-xl bg-slate-50 dark:bg-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    កាលបរិច្ឆេទ
                  </label>
                  <input
                    type="date"
                    value={plannedDate}
                    onChange={e => setPlannedDate(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-xl bg-slate-50 dark:bg-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    ពេលវេលា
                  </label>
                  <input
                    type="text"
                    value={time}
                    onChange={e => setTime(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-xl bg-slate-50 dark:bg-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  សមាសភាពចូលរួម
                </label>
                <input
                  type="text"
                  value={targetAudience}
                  onChange={e => setTargetAudience(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-xl bg-slate-50 dark:bg-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  អ្នកទទួលខុសត្រូវ *
                </label>
                <input
                  type="text"
                  required
                  value={responsiblePerson}
                  onChange={e => setResponsiblePerson(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-xl bg-slate-50 dark:bg-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  លទ្ធផលរំពឹងទុក
                </label>
                <textarea
                  rows={2}
                  value={expectedOutput}
                  onChange={e => setExpectedOutput(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-xl bg-slate-50 dark:bg-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    ស្ថានភាព
                  </label>
                  <select
                    value={status}
                    onChange={e => setStatus(e.target.value as any)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-xl bg-slate-50 dark:bg-slate-900 dark:text-white"
                  >
                    <option value="បានរៀបចំរួច">បានរៀបចំរួច</option>
                    <option value="រង់ចាំអនុវត្ត">រង់ចាំអនុវត្ត</option>
                    <option value="បានពន្យារពេល">បានពន្យារពេល</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    វត្តមានជាក់ស្តែង (នាក់)
                  </label>
                  <input
                    type="number"
                    value={actualAttendanceCount || ''}
                    onChange={e => setActualAttendanceCount(e.target.value ? Number(e.target.value) : undefined)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-xl bg-slate-50 dark:bg-slate-900 dark:text-white"
                  />
                </div>
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
                  className="px-4 py-2 text-sm bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl shadow-md"
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
