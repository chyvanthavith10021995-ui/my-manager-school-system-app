import React from 'react';
import { useApp } from '../../context/AppContext';
import { CalendarRange } from 'lucide-react';

export const LeaveRequestManagement: React.FC = () => {
  const context = useApp();
  const leaveRequests = (context as any)?.leaveRequests || [];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
          <CalendarRange className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">ច្បាប់ឈប់សម្រាក</h2>
          <p className="text-sm text-slate-500">ការស្នើសុំ និងការអនុម័តច្បាប់ឈប់សម្រាក</p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
            <tr>
              <th className="p-4 font-bold text-slate-700 dark:text-slate-300">ប្រភេទច្បាប់</th>
              <th className="p-4 font-bold text-slate-700 dark:text-slate-300">អ្នកស្នើសុំ</th>
              <th className="p-4 font-bold text-slate-700 dark:text-slate-300">កាលបរិច្ឆេទ</th>
              <th className="p-4 font-bold text-slate-700 dark:text-slate-300">មូលហេតុ</th>
              <th className="p-4 font-bold text-slate-700 dark:text-slate-300">ស្ថានភាព</th>
            </tr>
          </thead>
          <tbody>
            {leaveRequests.map((req: any) => (
              <tr key={req.id} className="border-b border-slate-100 dark:border-slate-800">
                <td className="p-4 text-slate-900 dark:text-slate-100 font-medium">{req.leaveType}</td>
                <td className="p-4 text-slate-600 dark:text-slate-400 capitalize">{req.requesterRole}</td>
                <td className="p-4 text-slate-600 dark:text-slate-400">{req.startDate} ដល់ {req.endDate}</td>
                <td className="p-4 text-slate-600 dark:text-slate-400 max-w-xs truncate">{req.reason}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 text-xs font-bold rounded-full ${req.status === 'APPROVED' || req.status === 'អនុម័ត' ? 'bg-emerald-100 text-emerald-700' :
                      req.status === 'REJECTED' || req.status === 'បដិសេធ' ? 'bg-red-100 text-red-700' :
                        'bg-amber-100 text-amber-700'
                    }`}>
                    {req.status}
                  </span>
                </td>
              </tr>
            ))}
            {leaveRequests.length === 0 && (
              <tr>
                <td colSpan={5} className="p-4 text-center text-slate-500">មិនទាន់មានទិន្នន័យស្នើសុំច្បាប់នៅឡើយទេ</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};