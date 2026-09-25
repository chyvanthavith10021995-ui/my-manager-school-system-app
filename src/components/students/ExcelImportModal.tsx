import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, FileSpreadsheet, Upload, Download, CheckCircle, AlertCircle } from 'lucide-react';

interface ExcelImportModalProps {
  onClose: () => void;
}

export const ExcelImportModal: React.FC<ExcelImportModalProps> = ({ onClose }) => {
  const { importStudents } = useApp();
  const [pasteData, setPasteData] = useState('');
  const [parsedRows, setParsedRows] = useState<any[]>([]);
  const [errorMsg, setErrorMsg] = useState('');
  const [importSuccess, setImportSuccess] = useState(false);

  const sampleCsvData = `គោត្តនាម,នាម,ភេទ,ថ្ងៃខែឆ្នាំកំណើត,ថ្នាក់ទី,បន្ទប់,បណ្ណសមធម៌,អាស័យដ្ឋានបច្ចុប្បន្ន,ឈ្មោះអាណាព្យាបាល,លេខទូរស័ព្ទ
ឡុង,សុវណ្ណារ៉ា,ប្រុស,2019-03-15,ថ្នាក់ទី ១,ក,ក្រ១ (IDPoor 1),ភូមិអន្លង់តាម៉ី,ឡុង សុខា,012888111
ជា,ស្រីលីន,ស្រី,2019-07-20,ថ្នាក់ទី ១,ក,គ្មាន (None),ភូមិអន្លង់តាម៉ី,ជា សំអាត,092777222
ស៊ិន,សុជាតិ,ប្រុស,2018-05-10,ថ្នាក់ទី ២,ក,ក្រ២ (IDPoor 2),ភូមិអន្លង់តាម៉ី,ស៊ិន ប៊ុនធឿន,015666333`;

  const handleDownloadSample = () => {
    const blob = new Blob(['\uFEFF' + sampleCsvData], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'សៀវភៅគំរូ_បញ្ជីឈ្មោះសិស្ស_បឋមសិក្សាអន្លង់តាម៉ី.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleParseText = (text: string) => {
    setPasteData(text);
    setErrorMsg('');

    if (!text.trim()) {
      setParsedRows([]);
      return;
    }

    try {
      const lines = text.trim().split('\n').map(l => l.trim()).filter(Boolean);
      if (lines.length < 2) {
        setErrorMsg('សូមបញ្ចូលទិន្នន័យយ៉ាងហោចណាស់ ២ ជួរ (ជួរចំណងជើង និងជួរទិន្នន័យសិស្ស)។');
        setParsedRows([]);
        return;
      }

      // Parse CSV or TSV lines
      const rows = lines.slice(1).map(line => {
        const cols = line.includes('\t') ? line.split('\t') : line.split(',');
        return {
          lastName: cols[0]?.trim() || 'ត្រកូល',
          firstName: cols[1]?.trim() || 'ឈ្មោះ',
          gender: cols[2]?.trim() || 'ស្រី',
          dob: cols[3]?.trim() || '2018-01-01',
          grade: cols[4]?.trim() || 'ថ្នាក់ទី ១',
          section: cols[5]?.trim() || 'ក',
          equityCard: cols[6]?.trim() || 'គ្មាន (None)',
          address: cols[7]?.trim() || 'ភូមិអន្លង់តាម៉ី, ឃុំកន្សែង, ស្រុកបាណន់, ខេត្តបាត់ដំបង',
          guardianName: cols[8]?.trim() || 'អាណាព្យាបាល',
          guardianPhone: cols[9]?.trim() || '012 345 678'
        };
      });

      setParsedRows(rows);
    } catch (e) {
      setErrorMsg('មានបញ្ហាក្នុងការអានទិន្នន័យ សូមពិនិត្យមើលទម្រង់ CSV/Excel ឡើងវិញ។');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      handleParseText(content);
    };
    reader.readAsText(file);
  };

  const handleConfirmImport = () => {
    if (parsedRows.length === 0) return;
    importStudents(parsedRows);
    setImportSuccess(true);
    setTimeout(() => {
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto font-sans">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl p-6 relative">
        <button onClick={onClose} className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-4">
          <FileSpreadsheet className="w-6 h-6 text-emerald-500" />
          <div>
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-slate-100">
              ទាញយក / នាំចូលទិន្នន័យសិស្សពី Excel / CSV
            </h3>
            <p className="text-xs text-slate-500">
              សាលាបឋមសិក្សា អន្លង់តាម៉ី • នាំចូលបញ្ជីឈ្មោះសិស្ស, ថ្ងៃខែឆ្នាំកំណើត, អាស័យដ្ឋាន និងបណ្ណសមធម៌
            </p>
          </div>
        </div>

        {importSuccess ? (
          <div className="py-12 text-center space-y-3">
            <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto animate-bounce" />
            <h4 className="text-lg font-extrabold text-slate-900 dark:text-slate-100">
              នាំចូលទិន្នន័យសិស្សចំនួន {parsedRows.length} នាក់ជោគជ័យ!
            </h4>
            <p className="text-xs text-slate-500">ប្រព័ន្ធបានធ្វើបច្ចុប្បន្នភាពបញ្ជីឈ្មោះសិស្សបឋមសិក្សារួចរាល់។</p>
          </div>
        ) : (
          <div className="space-y-4 text-xs">
            
            {/* Template download & file upload toolbar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700">
              <button
                onClick={handleDownloadSample}
                className="flex items-center gap-1.5 px-3 py-2 bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 text-emerald-700 dark:text-emerald-300 font-bold text-xs rounded-xl border border-emerald-300 transition-colors w-full sm:w-auto"
              >
                <Download className="w-4 h-4" /> ទាញយកសៀវភៅគំរូ Excel (.CSV)
              </button>

              <label className="flex items-center justify-center gap-1.5 px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer w-full sm:w-auto">
                <Upload className="w-4 h-4" /> ជ្រើសរើសឯកសារ CSV/Excel
                <input type="file" accept=".csv, .tsv, .txt" onChange={handleFileChange} className="hidden" />
              </label>
            </div>

            {/* Paste tabular text box */}
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                ឬចម្លងទិន្នន័យ (Copy/Paste) ចេញពី Excel មកដាក់ក្នុងប្រអប់ខាងក្រោម ៖
              </label>
              <textarea
                value={pasteData}
                onChange={(e) => handleParseText(e.target.value)}
                placeholder={`គោត្តនាម\tនាម\tភេទ\tថ្ងៃខែឆ្នាំកំណើត\tថ្នាក់ទី\tបន្ទប់\tបណ្ណសមធម៌\tអាស័យដ្ឋាន\nឡុង\tសុវណ្ណារ៉ា\tប្រុស\t2019-03-15\tថ្នាក់ទី ១\tក\tក្រ១ (IDPoor 1)\tភូមិអន្លង់តាម៉ី`}
                rows={4}
                className="w-full p-3 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-mono text-[11px] focus:outline-none"
              />
            </div>

            {errorMsg && (
              <div className="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-300 rounded-xl text-rose-600 dark:text-rose-400 font-medium flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Parsed Preview Table */}
            {parsedRows.length > 0 && (
              <div>
                <h4 className="font-bold text-slate-800 dark:text-slate-200 mb-2">
                  មើលគំរូទិន្នន័យដែលបានរៀបចំសម្រាប់នាំចូល ({parsedRows.length} នាក់) ៖
                </h4>
                <div className="max-h-48 overflow-y-auto border border-slate-200 dark:border-slate-700 rounded-xl">
                  <table className="w-full text-left text-[11px] border-collapse">
                    <thead className="bg-slate-100 dark:bg-slate-800 font-bold sticky top-0">
                      <tr>
                        <th className="p-2 border-b">ឈ្មោះសិស្ស</th>
                        <th className="p-2 border-b">ភេទ</th>
                        <th className="p-2 border-b">ថ្ងៃខែឆ្នាំកំណើត</th>
                        <th className="p-2 border-b">ថ្នាក់ទី</th>
                        <th className="p-2 border-b">បណ្ណសមធម៌</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                      {parsedRows.map((r, idx) => (
                        <tr key={idx}>
                          <td className="p-2 font-bold">{r.lastName} {r.firstName}</td>
                          <td className="p-2">{r.gender}</td>
                          <td className="p-2 font-mono">{r.dob}</td>
                          <td className="p-2 font-bold">{r.grade} ({r.section})</td>
                          <td className="p-2">{r.equityCard}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 font-bold text-slate-700 dark:text-slate-300"
              >
                បោះបង់
              </button>
              <button
                type="button"
                onClick={handleConfirmImport}
                disabled={parsedRows.length === 0}
                className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-300 text-white font-extrabold shadow-md transition-colors"
              >
                បញ្ជាក់ការនាំចូលទិន្នន័យ ({parsedRows.length} នាក់)
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
