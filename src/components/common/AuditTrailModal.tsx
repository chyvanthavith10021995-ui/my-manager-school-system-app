import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, Download, History, X } from 'lucide-react';
import type { AuditActionType } from '../../types';

interface AuditTrailModalProps {
  onClose: () => void;
}

export const AuditTrailModal: React.FC<AuditTrailModalProps> = ({ onClose }) => {
  const { auditLogs } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAction, setSelectedAction] = useState<string>('all');
  const [selectedRoleFilter] = useState<string>('all');

  const filteredLogs = auditLogs.filter((log) => {
    const matchesSearch =
      log.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.targetEntity.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.details.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesAction = selectedAction === 'all' || log.action.includes(selectedAction);
    const matchesRole = selectedRoleFilter === 'all' || log.userRole === selectedRoleFilter;

    return matchesSearch && matchesAction && matchesRole;
  });

  const handleExportLogs = () => {
    const jsonStr = JSON.stringify(filteredLogs, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `audit_trail_logs_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getActionBadge = (action: AuditActionType) => {
    if (action.includes('បង្កើត')) {
      return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20';
    }
    if (action.includes('កែប្រែ')) {
      return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20';
    }
    if (action.includes('លុប')) {
      return 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20';
    }
    if (action.includes('បម្រុងទុក')) {
      return 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20';
    }
    if (action.includes('RBAC') || action.includes('សិទ្ធិ')) {
      return 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20';
    }
    return 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20';
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4 font-sans animate-fade-in">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-4xl overflow-hidden shadow-2xl p-6 relative max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-500">
              <History className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                ប្រព័ន្ធកត់ត្រាជីវប្រវត្តិប្រតិបត្តិការ (Audit Trail Logs)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                កត់ត្រារាល់ការបញ្ចូល កែប្រែ ឬលុបទិន្នន័យក្នុងប្រព័ន្ធដើម្បីផ្ទៀងផ្ទាត់ និងដោះស្រាយបញ្ហា
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filters and Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 my-4 shrink-0">
          <div className="sm:col-span-6 relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ស្វែងរកតាមឈ្មោះអ្នកប្រើប្រាស់, ទិន្នន័យ, ឬព័ត៌មានលម្អិត..."
              className="w-full pl-9 pr-3 py-2 bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 rounded-xl text-xs font-medium text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div className="sm:col-span-3">
            <select
              value={selectedAction}
              onChange={(e) => setSelectedAction(e.target.value)}
              className="w-full p-2 bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 rounded-xl text-xs font-medium text-slate-900 dark:text-slate-100"
            >
              <option value="all">គ្រប់សកម្មភាព (All Actions)</option>
              <option value="បង្កើត">បង្កើត (Create)</option>
              <option value="កែប្រែ">កែប្រែ (Update)</option>
              <option value="លុប">លុប (Delete)</option>
              <option value="បម្រុងទុក">បម្រុងទុក (Backup)</option>
              <option value="សិទ្ធិ">កំណត់សិទ្ធិ (RBAC)</option>
              <option value="ចូលប្រើប្រាស់">ចូលប្រើប្រាស់ (Login)</option>
            </select>
          </div>

          <div className="sm:col-span-3 flex justify-end">
            <button
              onClick={handleExportLogs}
              className="w-full py-2 px-3 bg-brand-600 hover:bg-brand-500 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-md transition"
            >
              <Download className="w-4 h-4" />
              <span>ទាញយក Log (JSON)</span>
            </button>
          </div>
        </div>

        {/* Logs Table List */}
        <div className="flex-1 overflow-y-auto border border-slate-200 dark:border-slate-800 rounded-2xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 dark:bg-slate-800/90 text-slate-600 dark:text-slate-400 font-bold sticky top-0 z-10">
              <tr>
                <th className="p-3">កាលបរិច្ឆេទ & ម៉ោង</th>
                <th className="p-3">អ្នកប្រតិបត្តិ (User / Role)</th>
                <th className="p-3">ប្រភេទសកម្មភាព</th>
                <th className="p-3">ទិន្នន័យពាក់ព័ន្ធ (Target)</th>
                <th className="p-3">ព័ត៌មានលម្អិត & IP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 font-medium">
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-400">
                    មិនមាន Log ប្រតិបត្តិការដែលត្រូវគ្នានឹងការស្វែងរកឡើយ
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
                    <td className="p-3 whitespace-nowrap text-slate-500 dark:text-slate-400 font-mono text-[11px]">
                      {log.timestamp}
                    </td>
                    <td className="p-3">
                      <div className="font-bold text-slate-900 dark:text-slate-100">{log.userName}</div>
                      <span className="text-[10px] uppercase font-bold text-brand-500 bg-brand-500/10 px-1.5 py-0.5 rounded">
                        {log.userRole}
                      </span>
                    </td>
                    <td className="p-3">
                      <span className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border ${getActionBadge(log.action)}`}>
                        {log.action}
                      </span>
                    </td>
                    <td className="p-3 font-semibold text-slate-800 dark:text-slate-200">
                      {log.targetEntity}
                    </td>
                    <td className="p-3 text-slate-600 dark:text-slate-400">
                      <div>{log.details}</div>
                      {log.ipAddress && (
                        <div className="text-[10px] text-slate-400 font-mono">IP: {log.ipAddress}</div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="pt-4 mt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 shrink-0">
          <span>បង្ហាញ {filteredLogs.length} ក្នុងចំណោម {auditLogs.length} ជីវប្រវត្តិប្រតិបត្តិការ</span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-xl font-bold hover:bg-slate-300 dark:hover:bg-slate-700 transition"
          >
            បិទ
          </button>
        </div>

      </div>
    </div>
  );
};
