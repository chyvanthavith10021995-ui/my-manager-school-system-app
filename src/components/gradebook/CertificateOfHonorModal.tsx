import React from 'react';
import type { Student } from '../../types';
import { useApp } from '../../context/AppContext';
import { Award, Printer, X, Sparkles, Star } from 'lucide-react';

interface CertificateOfHonorModalProps {
  student: Student;
  periodName: string; // e.g. "ឆមាសទី ១", "ឆមាសទី ២", "ដំណាច់ឆ្នាំ"
  rank: number;
  averageScore: number;
  onClose: () => void;
}

export const CertificateOfHonorModal: React.FC<CertificateOfHonorModalProps> = ({
  student,
  periodName,
  rank,
  averageScore,
  onClose
}) => {
  const { schoolInfo, teachers } = useApp();

  // Find Homeroom Teacher for this student's class
  const teacherObj = teachers.find(t => t.assignedClasses.includes(`${student.grade}-${student.section}`));
  const teacherName = teacherObj ? `${teacherObj.lastName} ${teacherObj.firstName}` : 'គ្រូបន្ទុកថ្នាក់';

  const handlePrint = () => {
    window.print();
  };

  const rankKhmer = rank === 1 ? '១' : rank === 2 ? '២' : rank === 3 ? '៣' : rank === 4 ? '៤' : '៥';
  const rankTitle = rank === 1 ? 'សិស្សពូកែឆ្នើម ចំណាត់ថ្នាក់លេខ ១' : `សិស្សពូកែ ចំណាត់ថ្នាក់លេខ ${rankKhmer}`;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 font-sans overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 border border-amber-300 dark:border-amber-700/60 rounded-3xl w-full max-w-4xl overflow-hidden shadow-2xl relative flex flex-col max-h-[95vh]">
        
        {/* Top Control Bar (Hidden on print) */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800 print:hidden shrink-0">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <h3 className="font-extrabold text-sm text-slate-100">
              ប័ណ្ណសរសើរផ្លូវការ ៖ {student.lastName} {student.firstName} ({student.grade}-{student.section})
            </h3>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs shadow-md transition-all"
            >
              <Printer className="w-4 h-4" /> បោះពុម្ពប័ណ្ណសរសើរ (Print)
            </button>
            <button onClick={onClose} className="p-2 rounded-xl text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Sheet Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-slate-100 dark:bg-slate-950 flex items-center justify-center">
          
          <div className="printable-certificate bg-amber-50/90 text-slate-900 w-full max-w-3xl p-8 sm:p-12 border-[10px] border-double border-amber-600 rounded-2xl shadow-2xl relative space-y-6 select-none font-serif">
            
            {/* Background Ornate Watermark */}
            <div className="absolute inset-0 flex items-center justify-center opacity-[0.04] pointer-events-none">
              <Award className="w-96 h-96 text-amber-900" />
            </div>

            {/* Header / Kingdom Banner */}
            <div className="text-center space-y-1 relative z-10 font-moul">
              <h2 className="text-sm font-extrabold tracking-widest text-amber-900 font-moul">
                ព្រះរាជាណាចក្រកម្ពុជា
              </h2>
              <h3 className="text-xs font-bold text-amber-800 tracking-wider font-moul">
                ជាតិ សាសនា ព្រះមហាក្សត្រ
              </h3>
              <div className="flex justify-center items-center my-1 text-xs text-amber-700">
                <span className="font-serif">❖ ❖ ❖</span>
              </div>
              <p className="text-[11px] font-bold text-slate-700 font-siemreap">
                {schoolInfo.province} • {schoolInfo.schoolName}
              </p>
            </div>

            {/* Certificate Title */}
            <div className="text-center relative z-10 my-4">
              <div className="inline-flex items-center justify-center gap-2 px-6 py-2 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 font-black text-2xl shadow-md tracking-wider border border-amber-300">
                <Sparkles className="w-6 h-6 text-slate-950" />
                <span>ប័ណ្ណសរសើរ</span>
                <Sparkles className="w-6 h-6 text-slate-950" />
              </div>
              <p className="text-xs font-extrabold text-amber-800 mt-2 font-mono tracking-widest">CERTIFICATE OF HONOR</p>
            </div>

            {/* Student Photo & Profile Banner */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 relative z-10 py-2">
              <div className="relative">
                <img
                  src={student.avatar}
                  alt={student.firstName}
                  className="w-24 h-24 rounded-2xl object-cover border-4 border-amber-500 shadow-xl"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80';
                  }}
                />
                <div className="absolute -bottom-2 -right-2 bg-amber-500 text-slate-950 p-1.5 rounded-full shadow-md">
                  <Star className="w-4 h-4 fill-slate-950" />
                </div>
              </div>

              <div className="text-center sm:text-left space-y-1 font-sans">
                <span className="px-3 py-1 rounded-full text-xs font-black bg-amber-200 text-amber-900 border border-amber-400 inline-block">
                  {rankTitle}
                </span>
                <h2 className="text-2xl font-black text-slate-900">
                  {student.lastName} {student.firstName}
                </h2>
                <p className="text-xs font-bold text-slate-700">
                  អត្តលេខ៖ <span className="font-mono">{student.studentId}</span> | ថ្នាក់សិក្សា៖ <span className="font-extrabold">{student.grade}-{student.section}</span>
                </p>
              </div>
            </div>

            {/* Citation Content */}
            <div className="text-center space-y-3 relative z-10 max-w-xl mx-auto font-sans leading-relaxed text-slate-800">
              <p className="text-xs font-medium">
                គណៈគ្រប់គ្រង និងគណៈកម្មការវាយតម្លៃនៃ <strong>{schoolInfo.schoolName}</strong> សូមជូនប័ណ្ណសរសើរនេះដើម្បីបញ្ជាក់ថា៖
              </p>
              <div className="p-4 rounded-2xl bg-amber-100/70 border border-amber-300/80 text-xs font-extrabold text-amber-950 shadow-inner space-y-1">
                <p className="text-sm">
                  បានខិតខំប្រឹងប្រែងសិក្សារៀនសូត្រ ទទួលបាន <span className="text-rose-700 underline underline-offset-4">ចំណាត់ថ្នាក់លេខ {rankKhmer}</span> (ពិន្ទុមធ្យម {averageScore.toFixed(1)} / 10)
                </p>
                <p className="text-amber-800 text-[11px]">
                  ប្រចាំ <strong>{periodName}</strong> ឆ្នាំសិក្សា ២០២៥-២០២៦
                </p>
              </div>
              <p className="text-xs italic text-slate-600">
                "សូមឱ្យក្មួយទទួលបាននូវសេចក្ដីសុខ ចម្រើន និងជោគជ័យក្នុងការសិក្សាតទៅមុខទៀត!"
              </p>
            </div>

            {/* Signatures */}
            <div className="grid grid-cols-2 gap-8 pt-8 relative z-10 font-sans text-xs border-t border-amber-300">
              <div className="text-center space-y-12">
                <div>
                  <p className="font-bold text-slate-600">គ្រូបន្ទុកថ្នាក់</p>
                  <p className="text-[10px] text-slate-400">Homeroom Teacher</p>
                </div>
                <div>
                  <p className="font-black text-slate-900 border-b border-dashed border-slate-400 pb-1 inline-block min-w-[140px]">
                    {teacherName}
                  </p>
                </div>
              </div>

              <div className="text-center space-y-12">
                <div>
                  <p className="font-moul font-bold text-xs mb-1">បានឃើញ និងឯកភាព</p>
                  <p className="font-medium text-slate-600 text-[11px]">ធ្វើនៅ អន្លង់តាម៉ី, ថ្ងៃទី.........ខែ.........ឆ្នាំ២០២៦</p>
                  <p className="font-moul font-extrabold text-slate-900 mt-1">នាយកសាលាបឋមសិក្សា អន្លង់តាម៉ី</p>
                </div>
                <div className="relative inline-block">
                  <p className="font-moul font-black text-slate-900 border-b border-dashed border-slate-400 pb-1 inline-block min-w-[140px]">
                    {schoolInfo.principalName}
                  </p>
                  {/* Stamp */}
                  <div className="absolute -top-6 -right-6 w-16 h-16 rounded-full border-2 border-dashed border-rose-600/40 text-rose-600 flex items-center justify-center text-[8px] font-bold rotate-12 opacity-80 pointer-events-none">
                    ត្រាសាលា
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
