import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import type { Invoice } from '../../types';
import { InvoiceModal } from './InvoiceModal';
import { PrintHeader, PrintFooter } from '../common/PrintHeader';
import {
  CreditCard,
  Plus,
  Filter,
  CheckCircle,
  Clock,
  ArrowUpRight,
  Printer
} from 'lucide-react';

export const FinanceView: React.FC = () => {
  const { invoices, addInvoice, students, userRole, language } = useApp();
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [activeInvoice, setActiveInvoice] = useState<Invoice | null>(null);
  const [showAddInvoiceModal, setShowAddInvoiceModal] = useState(false);

  // Form states
  const [targetStudentId, setTargetStudentId] = useState<string>(students[0]?.id || '');
  const [title, setTitle] = useState<string>('វិភាគទានសិក្សា & សៀវភៅសិក្សាគោល ឆមាសទី១');
  const [amountRiel, setAmountRiel] = useState<number>(200000);
  const [amountUSD, setAmountUSD] = useState<number>(50);
  const [dueDate, setDueDate] = useState<string>('2026-10-30');

  const filteredInvoices = invoices.filter(inv => {
    if (selectedStatus === 'All') return true;
    return inv.status === selectedStatus;
  });

  const totalCollectedRiel = invoices.filter(i => i.status === 'បានបង់').reduce((a, b) => a + b.amountRiel, 0);
  const totalPendingRiel = invoices.filter(i => i.status === 'រង់ចាំ' || i.status === 'ហួសកំណត់').reduce((a, b) => a + b.amountRiel, 0);

  const handleCreateInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    const st = students.find(s => s.id === targetStudentId);
    if (!st) return;

    addInvoice({
      studentId: st.id,
      studentName: `${st.lastName} ${st.firstName}`,
      className: `${st.grade}-${st.section}`,
      title,
      amountRiel,
      amountUSD,
      dueDate,
      issueDate: new Date().toISOString().split('T')[0],
      status: 'រង់ចាំ'
    });

    setShowAddInvoiceModal(false);
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 no-print">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100">
            {language === 'km' ? 'ហិរញ្ញវត្ថុ & វិភាគទានសាលារៀន' : 'Finance & Tuition'}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {language === 'km' ? 'គ្រប់គ្រងវិភាគទានសាលាបឋមសិក្សា វិក្កយបត្រ និងការទូទាត់ប្រាក់' : 'Student tuition billing, payment collection logs, and invoice management'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-md transition-all"
          >
            <Printer className="w-4 h-4" /> {language === 'km' ? 'បោះពុម្ភបញ្ជីវិក្កយបត្រ' : 'Print Financial Register'}
          </button>

          {userRole === 'admin' && (
            <button
              onClick={() => setShowAddInvoiceModal(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-xs rounded-xl shadow-md hover:from-emerald-500 hover:to-teal-500 transition-all self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" /> {language === 'km' ? 'ចេញវិក្កយបត្រថ្មី' : 'Issue Invoice'}
            </button>
          )}
        </div>
      </div>

      {/* Financial Metrics Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 no-print">
        <div className="glass-card p-5 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400">វិភាគទានទូទាត់រួចសរុប</p>
            <h3 className="text-2xl font-extrabold text-emerald-500 mt-1">{totalCollectedRiel.toLocaleString()} ៛</h3>
            <span className="text-[11px] text-slate-400 mt-1">ឆ្នាំសិក្សា ២០២៦ - ២០២៧ (ចូលរៀនខែ១១ ឆ្នាំ២០២៦)</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
            <CheckCircle className="w-6 h-6" />
          </div>
        </div>

        <div className="glass-card p-5 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400">វិភាគទានរង់ចាំទូទាត់</p>
            <h3 className="text-2xl font-extrabold text-amber-500 mt-1">{totalPendingRiel.toLocaleString()} ៛</h3>
            <span className="text-[11px] text-slate-400 mt-1">ប្រាក់នៅសល់មិនទាន់បង់</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        <div className="glass-card p-5 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400">ចំនួនវិក្កយបត្រសរុប</p>
            <h3 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100 mt-1">{invoices.length} វិក្កយបត្រ</h3>
            <span className="text-[11px] text-slate-400 mt-1">ឆមាសទី១</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-brand-500/10 text-brand-500 flex items-center justify-center">
            <CreditCard className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="glass-card overflow-hidden p-4">
        <PrintHeader
          title="បញ្ជីវិក្កយបត្រ និងការប្រមូលវិភាគទានសាលារៀន"
          subtitle={`ប្រាក់ប្រមូលបានសរុប ៖ ${totalCollectedRiel.toLocaleString()} ៛ | រង់ចាំ ៖ ${totalPendingRiel.toLocaleString()} ៛`}
          dateInfo={`កាលបរិច្ឆេទ ៖ ${new Date().toLocaleDateString('km-KH')}`}
        />

        <div className="p-4 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between no-print">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <span className="text-xs font-bold text-slate-600 dark:text-slate-300">ស្ថានភាព៖</span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-1.5 text-xs font-bold bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-200 focus:outline-none"
            >
              <option value="All">ទាំងអស់ ({invoices.length})</option>
              <option value="បានបង់">បានបង់ (Paid)</option>
              <option value="រង់ចាំ">រង់ចាំ (Pending)</option>
              <option value="ហួសកំណត់">ហួសកំណត់ (Overdue)</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-100/70 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3.5 px-4">លេខវិក្កយបត្រ</th>
                <th className="py-3.5 px-4">ឈ្មោះសិស្ស</th>
                <th className="py-3.5 px-4">បរិយាយ</th>
                <th className="py-3.5 px-4">ទឹកប្រាក់ (៛ / $)</th>
                <th className="py-3.5 px-4">ថ្ងៃផុតកំណត់</th>
                <th className="py-3.5 px-4">ស្ថានភាព</th>
                <th className="py-3.5 px-4 text-right no-print">សកម្មភាព</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs">
              {filteredInvoices.map(inv => (
                <tr key={inv.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-700 dark:text-slate-300">
                    {inv.invoiceNumber}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-slate-100">
                    {inv.studentName}
                  </td>
                  <td className="py-3.5 px-4 text-slate-500">
                    {inv.title}
                  </td>
                  <td className="py-3.5 px-4 font-extrabold text-slate-900 dark:text-slate-100">
                    {inv.amountRiel.toLocaleString()} ៛ <span className="text-[10px] text-slate-400">(${inv.amountUSD})</span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-500">
                    {inv.dueDate}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                      inv.status === 'បានបង់'
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
                        : inv.status === 'ហួសកំណត់'
                          ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20'
                          : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20'
                    }`}>
                      {inv.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right no-print">
                    <button
                      onClick={() => setActiveInvoice(inv)}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-brand-500 hover:text-white font-bold text-xs transition-colors inline-flex items-center gap-1"
                    >
                      ទូទាត់ / ពិនិត្យ <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <PrintFooter />
      </div>

      {/* Active Invoice Dialog */}
      {activeInvoice && (
        <InvoiceModal invoice={activeInvoice} onClose={() => setActiveInvoice(null)} />
      )}

      {/* Add Invoice Form Modal */}
      {showAddInvoiceModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl p-6">
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-slate-100 mb-4">ចេញវិក្កយបត្រទូទាត់ប្រាក់</h3>
            
            <form onSubmit={handleCreateInvoice} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">ជ្រើសរើសសិស្ស</label>
                <select
                  value={targetStudentId}
                  onChange={(e) => setTargetStudentId(e.target.value)}
                  className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-medium"
                >
                  {students.map(s => (
                    <option key={s.id} value={s.id}>{s.lastName} {s.firstName} ({s.studentId})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">បរិយាយវិក្កយបត្រ</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-medium"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">ទឹកប្រាក់ (រៀល ៛)</label>
                  <input
                    type="number"
                    value={amountRiel}
                    onChange={(e) => {
                      const r = Number(e.target.value);
                      setAmountRiel(r);
                      setAmountUSD(r / 4000);
                    }}
                    className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-medium"
                    required
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">ថ្ងៃផុតកំណត់</label>
                  <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-medium"
                    required
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddInvoiceModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 font-bold text-slate-700 dark:text-slate-300"
                >
                  បោះបង់
                </button>
                <button type="submit" className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold">
                  បង្កើតវិក្កយបត្រ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
