import React from 'react';
import { useApp } from '../../context/AppContext';

interface PrintHeaderProps {
  title: string;
  subtitle?: string;
  classNameInfo?: string;
  dateInfo?: string;
}

export const PrintHeader: React.FC<PrintHeaderProps> = ({
  title,
  subtitle,
  classNameInfo,
  dateInfo
}) => {
  const { schoolInfo, selectedAcademicYear } = useApp();

  return (
    <div className="hidden print:block mb-6 text-black font-sans">
      {/* MoEYS Royal Header */}
      <div className="flex justify-between items-start mb-4">
        {/* Left School Info & Logo */}
        <div className="flex items-start gap-3 text-left text-xs font-bold leading-relaxed w-1/2">
          <img src="/school-logo.png" alt="សាលាបឋមសិក្សា អន្លង់តាម៉ី" className="w-14 h-14 object-contain shrink-0" />
          <div>
            <p className="font-extrabold text-xs text-blue-950 font-siemreap">{schoolInfo.moeysName || 'ក្រសួងអប់រំ យុវជន និងកីឡា'}</p>
            <p className="font-extrabold text-slate-900 font-siemreap">{schoolInfo.nameKhmer || schoolInfo.schoolName || 'សាលាបឋមសិក្សា អន្លង់តាម៉ី'}</p>
            <p className="text-[11px] text-slate-700 font-siemreap">ឆ្នាំសិក្សា ៖ {selectedAcademicYear || schoolInfo.academicYear}</p>
            {classNameInfo && <p className="text-[11px] text-slate-800 font-bold mt-0.5 font-siemreap">ថ្នាក់រៀន ៖ {classNameInfo}</p>}
          </div>
        </div>

        {/* Right Kingdom Motto (Top-most: ព្រះរាជាណាចក្រកម្ពុជា, Next: ជាតិ សាសនា ព្រះមហាក្សត្រ - Font Khmer OS Muol Light) */}
        <div className="text-center font-moul text-xs leading-relaxed w-1/2">
          <p className="font-extrabold text-sm tracking-wide font-moul mb-0.5">ព្រះរាជាណាចក្រកម្ពុជា</p>
          <p className="font-extrabold text-xs font-moul">ជាតិ សាសនា ព្រះមហាក្សត្រ</p>
          <div className="flex justify-center items-center my-1 text-xs">
            <span className="font-serif">❖ ❖ ❖</span>
          </div>
        </div>
      </div>

      {/* Main Document Title */}
      <div className="text-center my-4 space-y-1">
        <h1 className="text-xl font-bold font-moul text-slate-900 tracking-wide">{title}</h1>
        {subtitle && <p className="text-xs font-bold text-slate-700 font-siemreap">{subtitle}</p>}
        {dateInfo && <p className="text-[11px] text-slate-600 font-siemreap">{dateInfo}</p>}
      </div>
    </div>
  );
};

export const PrintFooter: React.FC = () => {
  const { schoolInfo } = useApp();

  return (
    <div className="hidden print:block mt-8 pt-4 text-xs font-siemreap text-black">
      <div className="flex justify-between items-start text-center">
        {/* Left: Prepared By / Teacher */}
        <div>
          <p className="mb-1 text-[11px] text-slate-600">
            ធ្វើនៅ អន្លង់តាម៉ី, ថ្ងៃទី...... ខែ...... ឆ្នាំ២០២៦
          </p>
          <p className="mb-14 font-extrabold font-moul">អ្នករៀបចំ / គ្រូបន្ទុកថ្នាក់</p>
          <p className="text-[11px] font-bold text-slate-700">..................................................</p>
        </div>

        {/* Right: Principal Annotation ("បានឃើញ និងឯកភាព" នាយកសាលា) */}
        <div>
          <p className="font-moul font-bold text-sm mb-1">បានឃើញ និងឯកភាព</p>
          <p className="mb-1 text-[11px] text-slate-600">
            ថ្ងៃទី...... ខែ...... ឆ្នាំ២០២៦
          </p>
          <p className="mb-14 font-extrabold font-moul text-sm">នាយកសាលាបឋមសិក្សា អន្លង់តាម៉ី</p>
          <p className="text-sm font-bold font-moul">{schoolInfo.principalName}</p>
        </div>
      </div>

      {/* Developer & Version Print Footer Badge */}
      <div className="mt-8 pt-2 border-t border-slate-300 flex justify-between items-center text-[10px] text-slate-600 font-sans">
        <span>ប្រព័ន្ធគ្រប់គ្រងសាលាបឋមសិក្សារដ្ឋ Version <strong>v2.5.0</strong> (MoEYS Official Standard)</span>
        <span>អ្នកបង្កើតប្រព័ន្ធ ៖ <strong>វុិត ជីវន្ថា</strong> (ICT កម្រងអន្លង់តាម៉ី • Tel: <strong>089 340 468</strong>)</span>
      </div>
    </div>
  );
};
