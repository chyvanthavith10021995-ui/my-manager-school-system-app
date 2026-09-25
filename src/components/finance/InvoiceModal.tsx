import React, { useState } from 'react';
import type { Invoice } from '../../types';
import { useApp } from '../../context/AppContext';
import { X, Printer, CreditCard, CheckCircle2, ShieldCheck } from 'lucide-react';

interface InvoiceModalProps {
  invoice: Invoice;
  onClose: () => void;
}

export const InvoiceModal: React.FC<InvoiceModalProps> = ({ invoice, onClose }) => {
  const { payInvoice } = useApp();
  const [selectedMethod, setSelectedMethod] = useState<Invoice['paymentMethod']>('ABA PAY');
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      payInvoice(invoice.id, selectedMethod);
      setIsProcessing(false);
    }, 800);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl relative my-8">
        
        {/* Modal Action Top Bar */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between no-print">
          <div className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-amber-400" />
            <h3 className="text-sm font-bold">បង្កាន់ដៃបង់ប្រាក់ / វិក្កយបត្រ #{invoice.invoiceNumber}</h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl transition-colors"
            >
              <Printer className="w-3.5 h-3.5" /> បោះពុម្ពបង្កាន់ដៃ
            </button>
            <button onClick={onClose} className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Invoice Printable Body */}
        <div className="p-8 space-y-6 printable-area bg-white text-slate-900 font-sans">
          
          <div className="flex items-start justify-between border-b-2 border-slate-900 pb-6">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900">សាលាបឋមសិក្សា អន្លង់តាម៉ី</h2>
              <p className="text-xs text-slate-500">អាសយដ្ឋាន៖ ភូមិអន្លង់តាម៉ី, ឃុំកោះថក, ស្រុកសង្កែ, ខេត្តបាត់ដំបង</p>
              <p className="text-[11px] text-slate-400">ទូរស័ព្ទ៖ 012 345 678 • អ៊ីមែល៖ info@anlongtameyprimary.edu.kh</p>
            </div>
            <div className="text-right">
              <span className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase ${
                invoice.status === 'បានបង់' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
              }`}>
                {invoice.status}
              </span>
              <p className="text-xs font-mono font-bold text-slate-700 mt-2">#{invoice.invoiceNumber}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase">ឈ្មោះសិស្ស / Student</p>
              <p className="font-extrabold text-slate-900 text-sm">{invoice.studentName}</p>
              <p className="text-slate-500">{invoice.className}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-bold text-slate-400 uppercase">កាលបរិច្ឆេទ</p>
              <p className="font-medium text-slate-700">ថ្ងៃចេញ៖ {invoice.issueDate}</p>
              <p className="font-bold text-rose-600">ថ្ងៃផុតកំណត់៖ {invoice.dueDate}</p>
            </div>
          </div>

          {/* Line items table */}
          <div className="border border-slate-300 rounded-2xl overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 font-bold border-b border-slate-300">
                <tr>
                  <th className="p-3">បរិយាយ / Description</th>
                  <th className="p-3 text-right">ទឹកប្រាក់ (រៀល ៛)</th>
                  <th className="p-3 text-right">ទឹកប្រាក់ ($ USD)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-3 font-semibold">{invoice.title}</td>
                  <td className="p-3 text-right font-bold text-slate-900">{invoice.amountRiel.toLocaleString()} ៛</td>
                  <td className="p-3 text-right font-bold text-brand-700">${invoice.amountUSD.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-300">
            <span className="text-xs font-extrabold uppercase text-slate-700">ទឹកប្រាក់ត្រូវទូទាត់សរុប</span>
            <div className="text-right">
              <p className="text-2xl font-black text-slate-900">{invoice.amountRiel.toLocaleString()} ៛</p>
              <p className="text-xs font-bold text-brand-600">(${invoice.amountUSD.toFixed(2)} USD)</p>
            </div>
          </div>

          {invoice.status === 'បានបង់' && (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-xs flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <p className="font-bold text-emerald-900">បានទូទាត់រួចរាល់ (Payment Completed)</p>
                <p className="text-emerald-700">វិធីសាស្ត្រទូទាត់៖ {invoice.paymentMethod} • កាលបរិច្ឆេទ៖ {invoice.paidDate}</p>
              </div>
            </div>
          )}

          {/* Payment Simulator Section - Hidden when printing */}
          {invoice.status !== 'បានបង់' && (
            <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-4 no-print">
              <h4 className="text-xs font-bold flex items-center gap-1.5 text-amber-400">
                <ShieldCheck className="w-4 h-4" /> ជ្រើសរើសប្រព័ន្ធទូទាត់ប្រាក់តាមអនឡាញ (KHQR / Bakong / ABA)
              </h4>

              <div>
                <label className="text-[11px] font-semibold text-slate-400 block mb-1">វិធីសាស្ត្រទូទាត់</label>
                <select
                  value={selectedMethod}
                  onChange={(e) => setSelectedMethod(e.target.value as any)}
                  className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs font-bold text-white"
                >
                  <option value="ABA PAY">ABA PAY / KHQR</option>
                  <option value="Wing Bank / Bakong">Wing Bank / Bakong KHQR</option>
                  <option value="ទូទាត់សាច់ប្រាក់">ទូទាត់សាច់ប្រាក់ផ្ទាល់ (Cash)</option>
                </select>
              </div>

              <button
                onClick={handlePay}
                disabled={isProcessing}
                className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs transition-colors flex items-center justify-center gap-2"
              >
                {isProcessing ? 'កំពុងដំណើរការទូទាត់...' : `ទូទាត់ប្រាក់ ${invoice.amountRiel.toLocaleString()} ៛ ($${invoice.amountUSD.toFixed(2)}) ឥឡូវនេះ`}
              </button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
