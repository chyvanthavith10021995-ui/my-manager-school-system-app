/**
 * Cambodian MoEYS Standard Word & Excel Template Generator Utility
 * Produces native-compatible .doc (Word) and .xls (Excel) files with full Khmer Unicode support.
 */

import type {
  Student,
  Teacher,
  StudentSupportRecord,
  SchoolAsset,
  CatchmentCensusChild,
  SchoolInfo
} from '../types';

// ======================= HELPER DOWNLOADERS =======================

export function downloadWordDocument(filename: string, bodyHtml: string) {
  const fullHtml = `<!DOCTYPE html>
<html xmlns:o="urn:schemas-microsoft-com:office:office"
      xmlns:w="urn:schemas-microsoft-com:office:word"
      xmlns="http://www.w3.org/TR/REC-html40">
<head>
<meta charset="utf-8">
<title>${filename}</title>
<style>
  @page {
    size: 21cm 29.7cm; /* A4 */
    margin: 2cm 2cm 2cm 2cm;
    mso-page-orientation: portrait;
  }
  @page WordSection1 {
    size: 841.9pt 595.3pt;
    mso-page-orientation: portrait;
    margin: 72.0pt 72.0pt 72.0pt 72.0pt;
    mso-header-margin: 36.0pt;
    mso-footer-margin: 36.0pt;
    mso-paper-source: 0;
  }
  div.WordSection1 {
    page: WordSection1;
  }
  body {
    font-family: 'Khmer OS Siemreap', 'Siemreap', 'Khmer OS', 'Segoe UI', Arial, sans-serif;
    font-size: 11pt;
    line-height: 1.5;
    color: #000000;
  }
  .moul {
    font-family: 'Khmer OS Muol Light', 'Moul', 'Khmer OS Muol', 'Khmer OS', serif;
    font-weight: bold;
  }
  .header-kingdom {
    text-align: center;
    margin-bottom: 25px;
  }
  .header-kingdom h2 {
    font-family: 'Khmer OS Muol Light', 'Moul', serif;
    font-size: 13pt;
    margin: 0 0 4px 0;
  }
  .header-kingdom h3 {
    font-family: 'Khmer OS Muol Light', 'Moul', serif;
    font-size: 11pt;
    margin: 0 0 6px 0;
  }
  .header-ministry {
    margin-bottom: 20px;
    font-size: 10.5pt;
  }
  .doc-title {
    text-align: center;
    font-family: 'Khmer OS Muol Light', 'Moul', serif;
    font-size: 14pt;
    margin: 20px 0;
    color: #0f172a;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 15px 0;
    font-size: 10pt;
  }
  table, th, td {
    border: 1px solid #333333;
  }
  th {
    background-color: #f1f5f9;
    font-weight: bold;
    padding: 6px 8px;
    text-align: center;
    font-family: 'Khmer OS Siemreap', sans-serif;
  }
  td {
    padding: 5px 8px;
    vertical-align: middle;
  }
  .text-center { text-align: center; }
  .text-right { text-align: right; }
  .font-bold { font-weight: bold; }
  .italic { font-style: italic; }
  .signatures {
    margin-top: 35px;
    width: 100%;
  }
  .sig-col {
    width: 50%;
    text-align: center;
    vertical-align: top;
    font-size: 10.5pt;
  }
</style>
</head>
<body>
<div class="WordSection1">
  ${bodyHtml}
</div>
</body>
</html>`;

  const blob = new Blob(['\uFEFF' + fullHtml], { type: 'application/msword;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename.endsWith('.doc') ? filename : `${filename}.doc`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function downloadExcelSpreadsheet(filename: string, tableHtml: string) {
  const fullHtml = `<html xmlns:o="urn:schemas-microsoft-com:office:office"
      xmlns:x="urn:schemas-microsoft-com:office:excel"
      xmlns="http://www.w3.org/TR/REC-html40">
<head>
<meta charset="utf-8">
<!--[if gte mso 9]>
<xml>
  <x:ExcelWorkbook>
    <x:ExcelWorksheets>
      <x:ExcelWorksheet>
        <x:Name>សន្លឹកកិច្ចការ MoEYS</x:Name>
        <x:WorksheetOptions>
          <x:DisplayGridlines/>
        </x:WorksheetOptions>
      </x:ExcelWorksheet>
    </x:ExcelWorksheets>
  </x:ExcelWorkbook>
</xml>
<![endif]-->
<style>
  body {
    font-family: 'Khmer OS Siemreap', 'Segoe UI', Arial, sans-serif;
    font-size: 10pt;
  }
  table {
    border-collapse: collapse;
    width: 100%;
  }
  th {
    background-color: #1e3a8a;
    color: #ffffff;
    font-weight: bold;
    border: 1px solid #94a3b8;
    padding: 8px 10px;
    text-align: center;
    font-family: 'Khmer OS Siemreap', sans-serif;
  }
  td {
    border: 1px solid #cbd5e1;
    padding: 6px 8px;
    vertical-align: middle;
  }
  .title-cell {
    font-size: 14pt;
    font-weight: bold;
    color: #0f172a;
    text-align: center;
    font-family: 'Khmer OS Muol Light', serif;
  }
  .subtitle-cell {
    font-size: 10.5pt;
    color: #334155;
    text-align: center;
  }
  .badge-cell {
    text-align: center;
    font-weight: bold;
  }
  .num-cell {
    mso-number-format: "\\#\\,\\#\\#0";
    text-align: right;
  }
</style>
</head>
<body>
  ${tableHtml}
</body>
</html>`;

  const blob = new Blob(['\uFEFF' + fullHtml], { type: 'application/vnd.ms-excel;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename.endsWith('.xls') ? filename : `${filename}.xls`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}


// ======================= WORD TEMPLATES (.DOC) =======================

/**
 * 1. លិខិតបញ្ជាក់ការសិក្សា និងការផ្ទេរសាលារៀន (School Transfer & Enrollment Certificate)
 */
export function generateTransferCertificateDoc(student?: Student, schoolInfo?: SchoolInfo, isBlank = false) {
  const std = isBlank ? {
    lastName: '............................',
    firstName: '................',
    gender: '............',
    dob: '....../....../..........',
    grade: 'ថ្នាក់ទី ........',
    studentId: '...........................',
    address: 'ភូមិ............................ ឃុំ/សង្កាត់............................ ស្រុក/ខណ្ឌ............................ ខេត្ត/រាជធានី............................',
    guardian: { name: '................................................', occupation: '................................' }
  } : {
    lastName: student?.lastName || 'ឡុង',
    firstName: student?.firstName || 'សុវណ្ណារ៉ា',
    gender: student?.gender || 'ប្រុស',
    dob: student?.dob || '2019-03-15',
    grade: student?.grade || 'ថ្នាក់ទី ១',
    studentId: student?.studentId || 'ALT-2026-101',
    address: student?.address || 'ភូមិអន្លង់តាម៉ី, ឃុំឈើទាល, ស្រុកបាណន់, ខេត្តបាត់ដំបង',
    guardian: { name: student?.guardian?.name || 'ឡុង សុខា', occupation: student?.guardian?.occupation || 'កសិករ' }
  };

  const sch = schoolInfo || {
    schoolName: 'សាលាបឋមសិក្សាអន្លង់តាម៉ី',
    principalName: 'លោក វុិត ជីវន្ថា',
    province: 'បាត់ដំបង',
    district: 'បាណន់',
    commune: 'ឈើទាល'
  };

  const bodyHtml = `
  <div class="header-kingdom">
    <h2>ព្រះរាជាណាចក្រកម្ពុជា</h2>
    <h3>ជាតិ សាសនា ព្រះមហាក្សត្រ</h3>
    <div style="font-size: 9pt;">❖ ❖ ❖</div>
  </div>

  <div class="header-ministry">
    <p style="margin: 0; font-weight: bold;">ក្រសួងអប់រំ យុវជន និងកីឡា</p>
    <p style="margin: 0;">មន្ទីរអប់រំ យុវជន និងកីឡា ខេត្ត${sch.province}</p>
    <p style="margin: 0;">ការិយាល័យអប់រំ យុវជន និងកីឡា ស្រុក${sch.district}</p>
    <p style="margin: 0; font-weight: bold;">${sch.schoolName}</p>
    <p style="margin: 0; font-size: 9pt;">លេខ: .........../២០២៦ ប.អ.ត</p>
  </div>

  <div class="doc-title">លិខិតបញ្ជាក់ការសិក្សា និងការផ្ទេរការសិក្សា</div>

  <p style="text-indent: 30px; text-align: justify;">
    នាយក${sch.schoolName} សូមបញ្ជាក់ថា ៖
  </p>

  <table style="border: none; margin: 10px 0;">
    <tr style="border: none;"><td style="border: none; width: 35%;">ឈ្មោះសិស្ស (ជាអក្សរខ្មែរ) ៖</td><td style="border: none; font-weight: bold;">${std.lastName} ${std.firstName}</td></tr>
    <tr style="border: none;"><td style="border: none;">ភេទ ៖</td><td style="border: none; font-weight: bold;">${std.gender}</td></tr>
    <tr style="border: none;"><td style="border: none;">ថ្ងៃ ខែ ឆ្នាំកំណើត ៖</td><td style="border: none;">${std.dob}</td></tr>
    <tr style="border: none;"><td style="border: none;">អត្តលេខសិស្ស ៖</td><td style="border: none; font-family: monospace;">${std.studentId}</td></tr>
    <tr style="border: none;"><td style="border: none;">កម្រិតថ្នាក់បច្ចុប្បន្ន ៖</td><td style="border: none; font-weight: bold;">${std.grade}</td></tr>
    <tr style="border: none;"><td style="border: none;">ឈ្មោះអាណាព្យាបាល ៖</td><td style="border: none;">${std.guardian.name} (មុខរបរ: ${std.guardian.occupation})</td></tr>
    <tr style="border: none;"><td style="border: none;">អាសយដ្ឋានបច្ចុប្បន្ន ៖</td><td style="border: none;">${std.address}</td></tr>
  </table>

  <p style="text-indent: 30px; text-align: justify;">
    ពិតជាបានចុះឈ្មោះចូលរៀន និងកំពុងសិក្សានៅ${sch.schoolName} ក្នុងឆ្នាំសិក្សា ២០២៥-២០២៦ នេះប្រាកដមែន។ សាមីខ្លួនមានចរិយាសម្បត្តិល្អ គោរពវិន័យសាលារៀនបានខ្ជាប់ខ្ជួន។
  </p>

  <p style="text-indent: 30px; text-align: justify;">
    លិខិតបញ្ជាក់នេះ ចេញជូនសាមីខ្លួនយកទៅប្រើប្រាស់ក្នុងគោលបំណង <strong>ផ្ទេរការសិក្សាទៅកាន់សាលារៀនថ្មី / ប្រើប្រាស់តាមផ្លូវច្បាប់</strong> ដោយអនុវត្តតាមគោលការណ៍ណែនាំរបស់ក្រសួងអប់រំ យុវជន និងកីឡា។
  </p>

  <table style="border: none; margin-top: 40px;" class="signatures">
    <tr style="border: none;">
      <td class="sig-col" style="border: none;">
        <p class="moul" style="font-size: 11pt; margin: 0;">បានឃើញ និងឯកភាព</p>
        <p style="margin: 4px 0 0 0; font-size: 9.5pt;">ប្រធានការិយាល័យអប់រំ យុវជន និងកីឡា ស្រុក${sch.district}</p>
        <div style="height: 65px;"></div>
        <p style="font-weight: bold;">................................................</p>
      </td>
      <td class="sig-col" style="border: none;">
        <p style="margin: 0; font-size: 9.5pt;">ថ្ងៃទី......... ខែ......... ឆ្នាំ២០២៦</p>
        <p class="moul" style="font-size: 11pt; margin: 4px 0 0 0;">នាយក${sch.schoolName}</p>
        <div style="height: 65px;"></div>
        <p class="moul" style="font-size: 11pt; margin: 0;">${sch.principalName}</p>
      </td>
    </tr>
  </table>
  `;

  downloadWordDocument(
    isBlank ? 'ទម្រង់ទទេ_លិខិតបញ្ជាក់ការសិក្សា_ផ្ទេរសាលា.doc' : `លិខិតបញ្ជាក់ការសិក្សា_${std.lastName}_${std.firstName}.doc`,
    bodyHtml
  );
}

/**
 * 2. កិច្ចសន្យាការងារគ្រូបង្រៀន / បុគ្គលិកអប់រំ (Teacher Employment Contract)
 */
export function generateTeacherContractDoc(teacher?: Teacher, schoolInfo?: SchoolInfo, isBlank = false) {
  const tch = isBlank ? {
    name: '..........................................................',
    gender: '............',
    dob: '....../....../..........',
    nationalId: '................................',
    position: 'គ្រូបង្រៀនកិច្ចសន្យា / ជាប់កិច្ចសន្យា',
    assignedClass: 'ថ្នាក់ទី ........',
    phone: '................................',
    address: 'ភូមិ............................ ឃុំ/សង្កាត់............................ ស្រុក/ខណ្ឌ............................'
  } : {
    name: `${teacher?.lastName || 'ស៊ិន'} ${teacher?.firstName || 'ប៊ុនធឿន'}`,
    gender: teacher?.gender || 'ប្រុស',
    dob: teacher?.joiningDate || '1988-04-12',
    nationalId: teacher?.employeeId || '020491823',
    position: teacher?.department || teacher?.teacherCategory || 'គ្រូបង្រៀនកម្រិតបឋមសិក្សា',
    assignedClass: teacher?.assignedClasses ? teacher.assignedClasses.join(', ') : 'ថ្នាក់ទី ២-ក',
    phone: teacher?.phone || '012 999 888',
    address: 'ភូមិអន្លង់តាម៉ី, ឃុំឈើទាល, ស្រុកបាណន់, ខេត្តបាត់ដំបង'
  };

  const sch = schoolInfo || {
    schoolName: 'សាលាបឋមសិក្សាអន្លង់តាម៉ី',
    principalName: 'លោក វុិត ជីវន្ថា'
  };

  const bodyHtml = `
  <div class="header-kingdom">
    <h2>ព្រះរាជាណាចក្រកម្ពុជា</h2>
    <h3>ជាតិ សាសនា ព្រះមហាក្សត្រ</h3>
    <div style="font-size: 9pt;">❖ ❖ ❖</div>
  </div>

  <div class="doc-title">កិច្ចសន្យាការងារបម្រើការងារអប់រំ</div>

  <p><strong>ភាគីទី ១ (និយោជក) ៖</strong></p>
  <p style="padding-left: 20px; margin: 4px 0;">
    តំណាងដោយលោក <strong>${sch.principalName}</strong> នាយក${sch.schoolName}។
  </p>

  <p><strong>ភាគីទី ២ (និយោជិត / គ្រូបង្រៀន) ៖</strong></p>
  <table style="border: none; margin: 4px 0 15px 20px;">
    <tr style="border: none;"><td style="border: none; width: 30%;">ឈ្មោះ ៖</td><td style="border: none; font-weight: bold;">${tch.name}</td></tr>
    <tr style="border: none;"><td style="border: none;">ភេទ ៖</td><td style="border: none;">${tch.gender} | កាលបរិច្ឆេទចូលបម្រើការងារ: ${tch.dob}</td></tr>
    <tr style="border: none;"><td style="border: none;">អត្តលេខបុគ្គលិក ៖</td><td style="border: none;">${tch.nationalId}</td></tr>
    <tr style="border: none;"><td style="border: none;">មុខតំណែងទទួលខុសត្រូវ ៖</td><td style="border: none; font-weight: bold;">${tch.position} (${tch.assignedClass})</td></tr>
    <tr style="border: none;"><td style="border: none;">លេខទូរស័ព្ទ ៖</td><td style="border: none;">${tch.phone}</td></tr>
  </table>

  <p style="font-weight: bold;">ប្រការ ១ ៖ ភារកិច្ច និងកាតព្វកិច្ចចម្បង</p>
  <ul style="margin-top: 4px; padding-left: 25px; line-height: 1.6;">
    <li>អនុវត្តការបង្រៀន និងរៀនតាមកាលវិភាគ និងកម្មវិធីសិក្សារបស់ក្រសួងអប់រំ យុវជន និងកីឡា។</li>
    <li>រៀបចំកិច្ចតែងការបង្រៀន បញ្ជីតាមដានវត្តមាន និងស្រង់ពិន្ទុសិស្សប្រចាំខែឱ្យបានទៀងទាត់។</li>
    <li>ចូលរួមការប្រជុំបច្ចេកទេស កិច្ចប្រជុំគរុកោសល្យ និងការងារអភិវឌ្ឍន៍សាលារៀន។</li>
    <li>គោរពក្រមសីលធម៌វិជ្ជាជីវៈគ្រូបង្រៀន និងបទបញ្ជាផ្ទៃក្នុងរបស់សាលារៀន។</li>
  </ul>

  <p style="font-weight: bold;">ប្រការ ២ ៖ រយៈពេលកិច្ចសន្យា និងការអនុវត្ត</p>
  <p style="text-indent: 20px; margin: 4px 0;">
    កិច្ចសន្យានេះមានសុពលភាពសម្រាប់ឆ្នាំសិក្សា ២០២៥-២០២៦ ចាប់ពីថ្ងៃចុះហត្ថលេខានេះតទៅ។
  </p>

  <table style="border: none; margin-top: 40px;" class="signatures">
    <tr style="border: none;">
      <td class="sig-col" style="border: none;">
        <p class="moul" style="font-size: 11pt; margin: 0;">ហត្ថលេខាគ្រូបង្រៀន (ភាគីទី២)</p>
        <div style="height: 65px;"></div>
        <p style="font-weight: bold;">${tch.name}</p>
      </td>
      <td class="sig-col" style="border: none;">
        <p style="margin: 0; font-size: 9.5pt;">ថ្ងៃទី......... ខែ......... ឆ្នាំ២០២៦</p>
        <p class="moul" style="font-size: 11pt; margin: 4px 0 0 0;">នាយក${sch.schoolName} (ភាគីទី១)</p>
        <div style="height: 65px;"></div>
        <p class="moul" style="font-size: 11pt; margin: 0;">${sch.principalName}</p>
      </td>
    </tr>
  </table>
  `;

  downloadWordDocument(
    isBlank ? 'ទម្រង់ទទេ_កិច្ចសន្យាការងារគ្រូបង្រៀន.doc' : `កិច្ចសន្យាការងារ_${tch.name}.doc`,
    bodyHtml
  );
}

/**
 * 3. កំណត់ហេតុអង្គប្រជុំគណៈកម្មាធិការទ្រទ្រង់សាលា គ.គ.ស / គ.គ.ថ (Meeting Minutes)
 */
export function generateMeetingMinutesDoc(schoolInfo?: SchoolInfo, isBlank = false) {
  const sch = schoolInfo || {
    schoolName: 'សាលាបឋមសិក្សាអន្លង់តាម៉ី',
    principalName: 'លោក វុិត ជីវន្ថា'
  };

  const bodyHtml = `
  <div class="header-kingdom">
    <h2>ព្រះរាជាណាចក្រកម្ពុជា</h2>
    <h3>ជាតិ សាសនា ព្រះមហាក្សត្រ</h3>
    <div style="font-size: 9pt;">❖ ❖ ❖</div>
  </div>

  <div class="doc-title">កំណត់ហេតុអង្គប្រជុំ<br><span style="font-size: 11pt;">គណៈកម្មាធិការទ្រទ្រង់សាលារៀន (គ.គ.ស) និងគណៈកម្មាធិការគ្រប់គ្រងសាលារៀន (គ.គ.ថ)</span></div>

  <table style="border: none; margin-bottom: 15px;">
    <tr style="border: none;"><td style="border: none; width: 25%;"><strong>កាលបរិច្ឆេទ ៖</strong></td><td style="border: none;">${isBlank ? 'ថ្ងៃទី...... ខែ...... ឆ្នាំ២០២៦' : 'ថ្ងៃទី ២៥ ខែ កញ្ញា ឆ្នាំ ២០២៦'}</td></tr>
    <tr style="border: none;"><td style="border: none;"><strong>ទីកន្លែងប្រជុំ ៖</strong></td><td style="border: none;">សាលប្រជុំ ${sch.schoolName}</td></tr>
    <tr style="border: none;"><td style="border: none;"><strong>សមាសភាពចូលរួម ៖</strong></td><td style="border: none;">សមាជិកសរុប ${isBlank ? '......' : '១៨'} នាក់ (ស្រី ${isBlank ? '......' : '៨'} នាក់) រួមមាន នាយកសាលា លោកគ្រូ-អ្នកគ្រូ តំណាងអាជ្ញាធរឃុំ-ភូមិ និងតំណាងមាតាបិតាសិស្ស។</td></tr>
    <tr style="border: none;"><td style="border: none;"><strong>ប្រធានអង្គប្រជុំ ៖</strong></td><td style="border: none; font-weight: bold;">${sch.principalName} (នាយកសាលា)</td></tr>
  </table>

  <p style="font-weight: bold; margin-bottom: 4px;">របៀបវារៈអង្គប្រជុំ ៖</p>
  <ol style="padding-left: 20px; margin-top: 0; line-height: 1.6;">
    <li>ពិនិត្យវឌ្ឍនភាពការងារសិក្សា និងស្ថិតិវត្តមានសិស្សប្រចាំឆមាស។</li>
    <li>ពិភាក្សាលើការប្រើប្រាស់ថវិកាដំណើរការសាលារៀន (PB/SOE) និងគម្រោងជំនួយសង្គម NSAF។</li>
    <li>លើកផែនការកែលម្អបរិស្ថានសាលារៀន (សួនកុមារ បង្គន់អនាម័យ និងបណ្ណាល័យ)។</li>
    <li>ការរៀបចំកិច្ចប្រជុំមាតាបិតាសិស្សទូទាំងសាលា។</li>
  </ol>

  <p style="font-weight: bold; margin-bottom: 4px;">សេចក្តីសម្រេចរបស់អង្គប្រជុំ ៖</p>
  <div style="border: 1px solid #94a3b8; padding: 12px; background-color: #f8fafc; font-size: 10pt; line-height: 1.6;">
    ${isBlank ? '<p style="height: 120px;">........................................................................................................................................................<br>........................................................................................................................................................</p>' : `
    <p style="margin: 0 0 8px 0;">១. អង្គប្រជុំបានឯកភាព ១០០% លើរបាយការណ៍ហិរញ្ញវត្ថុ និងការបែងចែកថវិកាឧបត្ថម្ភសិស្សក្រីក្រ NSAF។</p>
    <p style="margin: 0 0 8px 0;">២. សម្រេចចលនាសហគមន៍ជួយជួសជុលរបងសាលា និងដាំដើមឈើលម្អបរិស្ថានក្នុងខែក្រោយ។</p>
    <p style="margin: 0;">៣. ឯកភាពកំណត់កាលបរិច្ឆេទប្រជុំមាតាបិតាសិស្សនៅថ្ងៃទី ១៥ ខែ ក្រោយ។</p>
    `}
  </div>

  <table style="border: none; margin-top: 40px;" class="signatures">
    <tr style="border: none;">
      <td class="sig-col" style="border: none;">
        <p class="moul" style="font-size: 11pt; margin: 0;">លេខាធិការអង្គប្រជុំ</p>
        <div style="height: 65px;"></div>
        <p style="font-weight: bold;">${isBlank ? '................................................' : 'អ្នកគ្រូ សុខ ចាន់ធី'}</p>
      </td>
      <td class="sig-col" style="border: none;">
        <p class="moul" style="font-size: 11pt; margin: 0;">ប្រធានអង្គប្រជុំ / នាយកសាលា</p>
        <div style="height: 65px;"></div>
        <p class="moul" style="font-size: 11pt; margin: 0;">${sch.principalName}</p>
      </td>
    </tr>
  </table>
  `;

  downloadWordDocument(
    isBlank ? 'ទម្រង់ទទេ_កំណត់ហេតុប្រជុំ_គគស_គគថ.doc' : 'កំណត់ហេតុអង្គប្រជុំ_គគស_គគថ.doc',
    bodyHtml
  );
}

/**
 * 4. បណ្ណសរសើរ និងលិខិតសរសើរសិស្សពូកែ (Certificate of Honor & Achievement)
 */
export function generateHonorCertificateDoc(student?: Student, schoolInfo?: SchoolInfo, isBlank = false) {
  const std = isBlank ? {
    name: '................................................',
    gender: '............',
    grade: 'ថ្នាក់ទី ........',
    rank: '....',
    academicYear: '២០២៥-២០២៦'
  } : {
    name: `${student?.lastName || 'ឡុង'} ${student?.firstName || 'សុវណ្ណារ៉ា'}`,
    gender: student?.gender || 'ប្រុស',
    grade: student?.grade || 'ថ្នាក់ទី ១-ក',
    rank: student?.rankInClass || '១',
    academicYear: '២០២៥-២០២៦'
  };

  const sch = schoolInfo || {
    schoolName: 'សាលាបឋមសិក្សាអន្លង់តាម៉ី',
    principalName: 'លោក វុិត ជីវន្ថា'
  };

  const bodyHtml = `
  <div style="border: 4px double #b45309; padding: 25px; text-align: center; background-color: #fffbeb;">
    <div class="header-kingdom">
      <h2 style="color: #92400e; font-size: 15pt;">ព្រះរាជាណាចក្រកម្ពុជា</h2>
      <h3 style="color: #92400e; font-size: 12pt;">ជាតិ សាសនា ព្រះមហាក្សត្រ</h3>
      <div style="font-size: 10pt; color: #b45309;">❖ ❖ ❖</div>
    </div>

    <div style="font-size: 11pt; font-weight: bold; margin-bottom: 10px;">${sch.schoolName}</div>

    <div style="margin: 25px 0;">
      <h1 class="moul" style="font-size: 24pt; color: #b45309; margin: 0; text-transform: uppercase; letter-spacing: 2px;">
        ប័ណ្ណសរសើរ
      </h1>
      <p style="font-size: 11pt; color: #78350f; margin-top: 5px;">CERTIFICATE OF COMMENDATION</p>
    </div>

    <p style="font-size: 12pt; margin: 15px 0;">
      គណៈគ្រប់គ្រង${sch.schoolName} សូមប្រគល់ប័ណ្ណសរសើរនេះជូនចំពោះ ៖
    </p>

    <h2 class="moul" style="font-size: 20pt; color: #1e293b; margin: 15px 0; text-decoration: underline;">
      ${std.name}
    </h2>

    <p style="font-size: 12pt; line-height: 1.8; max-width: 600px; margin: 0 auto;">
      សិស្សភេទ <strong>${std.gender}</strong> នៃ <strong>${std.grade}</strong> ដែលទទួលបានលទ្ធផលសិក្សា 
      <span style="font-size: 14pt; font-weight: bold; color: #b45309;">« ចំណាត់ថ្នាក់លេខ ${std.rank} »</span> 
      ប្រចាំឆ្នាំសិក្សា <strong>${std.academicYear}</strong> ដោយមានការខិតខំប្រឹងប្រែងរៀនសូត្រ និងមានវិន័យ សីលធម៌ថ្លៃថ្នូរ។
    </p>

    <table style="border: none; margin-top: 45px; width: 100%;">
      <tr style="border: none;">
        <td style="border: none; width: 50%; text-align: center;">
          <p style="margin: 0; font-size: 10.5pt;">បានឃើញ និងបញ្ជាក់</p>
          <p class="moul" style="font-size: 11pt; margin: 4px 0 0 0;">គ្រូបន្ទុកថ្នាក់</p>
          <div style="height: 55px;"></div>
          <p style="font-weight: bold;">....................................</p>
        </td>
        <td style="border: none; width: 50%; text-align: center;">
          <p style="margin: 0; font-size: 10.5pt;">ថ្ងៃទី......... ខែ......... ឆ្នាំ២០២៦</p>
          <p class="moul" style="font-size: 11pt; margin: 4px 0 0 0;">នាយក${sch.schoolName}</p>
          <div style="height: 55px;"></div>
          <p class="moul" style="font-size: 11.5pt; margin: 0; color: #92400e;">${sch.principalName}</p>
        </td>
      </tr>
    </table>
  </div>
  `;

  downloadWordDocument(
    isBlank ? 'ទម្រង់ទទេ_បណ្ណសរសើរសិស្សពូកែ.doc' : `បណ្ណសរសើរ_${std.name}.doc`,
    bodyHtml
  );
}


// ======================= EXCEL TEMPLATES (.XLS) =======================

/**
 * 1. តារាងស្រង់ពិន្ទុ និងចំណាត់ថ្នាក់សិស្សប្រចាំខែ/ឆមាស (Gradebook & Ranking Sheet)
 */
export function generateGradebookExcel(students?: Student[], schoolInfo?: SchoolInfo, className = 'ថ្នាក់ទី ១-ក', isBlank = false) {
  const sch = schoolInfo || { schoolName: 'សាលាបឋមសិក្សាអន្លង់តាម៉ី' };
  
  const studentRows = isBlank
    ? Array.from({ length: 25 }, (_, i) => `
      <tr>
        <td style="text-align: center;">${i + 1}</td>
        <td>................................................</td>
        <td style="text-align: center;">........</td>
        <td>................</td>
        <td></td><td></td><td></td><td></td><td></td><td></td>
        <td style="font-weight: bold;"></td>
        <td style="font-weight: bold;"></td>
        <td style="text-align: center;"></td>
        <td></td>
      </tr>
    `).join('')
    : (students || []).slice(0, 30).map((s, idx) => {
        const khr = (8.0 + (idx % 3) * 0.5).toFixed(1);
        const math = (7.5 + (idx % 4) * 0.5).toFixed(1);
        const sci = (8.5 + (idx % 2) * 0.5).toFixed(1);
        const soc = (8.0 + (idx % 3) * 0.4).toFixed(1);
        const art = '9.0';
        const pe = '9.5';
        const total = (parseFloat(khr) + parseFloat(math) + parseFloat(sci) + parseFloat(soc) + parseFloat(art) + parseFloat(pe)).toFixed(1);
        const avg = (parseFloat(total) / 6).toFixed(2);
        return `
        <tr>
          <td style="text-align: center;">${idx + 1}</td>
          <td style="font-weight: bold;">${s.lastName} ${s.firstName}</td>
          <td style="text-align: center;">${s.gender}</td>
          <td style="text-align: center;">${s.dob}</td>
          <td style="text-align: right;">${khr}</td>
          <td style="text-align: right;">${math}</td>
          <td style="text-align: right;">${sci}</td>
          <td style="text-align: right;">${soc}</td>
          <td style="text-align: right;">${art}</td>
          <td style="text-align: right;">${pe}</td>
          <td style="text-align: right; font-weight: bold; background-color: #f1f5f9;">${total}</td>
          <td style="text-align: right; font-weight: bold; background-color: #e2e8f0;">${avg}</td>
          <td style="text-align: center; font-weight: bold; color: #1e3a8a;">${idx + 1}</td>
          <td>${parseFloat(avg) >= 8.5 ? 'ល្អប្រសើរ' : parseFloat(avg) >= 7.0 ? 'ល្អ' : 'មធ្យម'}</td>
        </tr>
        `;
      }).join('');

  const tableHtml = `
  <table>
    <tr>
      <td colspan="14" class="title-cell">${sch.schoolName}</td>
    </tr>
    <tr>
      <td colspan="14" class="subtitle-cell">តារាងស្រង់ពិន្ទុ និងចំណាត់ថ្នាក់សិស្សប្រចាំខែ | កម្រិតថ្នាក់ ៖ ${className} | ឆ្នាំសិក្សា ២០២៥-២០២៦</td>
    </tr>
    <tr><td colspan="14"></td></tr>
    <thead>
      <tr>
        <th rowspan="2" style="width: 40px;">ល.រ</th>
        <th rowspan="2" style="width: 160px;">គោត្តនាម និងនាម</th>
        <th rowspan="2" style="width: 50px;">ភេទ</th>
        <th rowspan="2" style="width: 90px;">ថ្ងៃកំណើត</th>
        <th colspan="6">ពិន្ទុមុខវិជ្ជាស្នូល</th>
        <th rowspan="2" style="width: 70px;">ពិន្ទុសរុប</th>
        <th rowspan="2" style="width: 70px;">មធ្យមភាគ</th>
        <th rowspan="2" style="width: 70px;">ចំណាត់ថ្នាក់</th>
        <th rowspan="2" style="width: 100px;">និទ្ទេស</th>
      </tr>
      <tr>
        <th style="width: 60px;">ភាសាខ្មែរ</th>
        <th style="width: 60px;">គណិត</th>
        <th style="width: 60px;">វិទ្យាសាស្ត្រ</th>
        <th style="width: 60px;">សិក្សាសង្គម</th>
        <th style="width: 60px;">សិល្បៈ</th>
        <th style="width: 60px;">កាយវិជ្ជា</th>
      </tr>
    </thead>
    <tbody>
      ${studentRows}
    </tbody>
  </table>
  `;

  downloadExcelSpreadsheet(
    isBlank ? 'ទម្រង់ទទេ_តារាងស្រង់ពិន្ទុ_ចំណាត់ថ្នាក់សិស្ស.xls' : `តារាងស្រង់ពិន្ទុ_${className}.xls`,
    tableHtml
  );
}

/**
 * 2. តារាងបញ្ជីរាយនាមសិស្ស និងតាមដានវត្តមានប្រចាំខែ (Attendance & Roster Sheet)
 */
export function generateAttendanceRegisterExcel(students?: Student[], schoolInfo?: SchoolInfo, className = 'ថ្នាក់ទី ១-ក', isBlank = false) {
  const sch = schoolInfo || { schoolName: 'សាលាបឋមសិក្សាអន្លង់តាម៉ី' };
  const daysHeader = Array.from({ length: 31 }, (_, i) => `<th style="width: 25px; font-size: 8pt;">${i + 1}</th>`).join('');

  const rows = isBlank
    ? Array.from({ length: 30 }, (_, i) => `
      <tr>
        <td style="text-align: center;">${i + 1}</td>
        <td>................................................</td>
        <td style="text-align: center;">........</td>
        <td>................</td>
        ${Array.from({ length: 31 }, () => '<td></td>').join('')}
        <td></td><td></td><td></td>
      </tr>
    `).join('')
    : (students || []).slice(0, 35).map((s, idx) => `
      <tr>
        <td style="text-align: center;">${idx + 1}</td>
        <td style="font-weight: bold;">${s.lastName} ${s.firstName}</td>
        <td style="text-align: center;">${s.gender}</td>
        <td style="text-align: center;">${s.dob}</td>
        ${Array.from({ length: 31 }, (_, d) => {
          const isWeekend = (d + 1) % 7 === 0 || (d + 1) % 7 === 6;
          return `<td style="text-align: center; background-color: ${isWeekend ? '#f1f5f9' : '#ffffff'}; font-size: 8pt;">${isWeekend ? '-' : 'P'}</td>`;
        }).join('')}
        <td style="text-align: center; font-weight: bold;">22</td>
        <td style="text-align: center;">0</td>
        <td style="text-align: center;">0</td>
      </tr>
    `).join('');

  const tableHtml = `
  <table>
    <tr>
      <td colspan="38" class="title-cell">${sch.schoolName}</td>
    </tr>
    <tr>
      <td colspan="38" class="subtitle-cell">បញ្ជីរាយនាម និងតាមដានវត្តមានសិស្សប្រចាំខែ | ថ្នាក់ ៖ ${className} | ឆ្នាំសិក្សា ២០២៥-២០២៦</td>
    </tr>
    <tr><td colspan="38"></td></tr>
    <thead>
      <tr>
        <th rowspan="2" style="width: 35px;">ល.រ</th>
        <th rowspan="2" style="width: 150px;">គោត្តនាម និងនាម</th>
        <th rowspan="2" style="width: 45px;">ភេទ</th>
        <th rowspan="2" style="width: 85px;">ថ្ងៃកំណើត</th>
        <th colspan="31">ថ្ងៃទីក្នុងខែ (១ ដល់ ៣១)</th>
        <th colspan="3">សរុបវត្តមាន</th>
      </tr>
      <tr>
        ${daysHeader}
        <th style="width: 35px;">វត្តមាន</th>
        <th style="width: 35px;">ច្បាប់</th>
        <th style="width: 35px;">ឥតច្បាប់</th>
      </tr>
    </thead>
    <tbody>
      ${rows}
    </tbody>
  </table>
  `;

  downloadExcelSpreadsheet(
    isBlank ? 'ទម្រង់ទទេ_បញ្ជីវត្តមានសិស្សប្រចាំខែ.xls' : `បញ្ជីវត្តមាន_${className}.xls`,
    tableHtml
  );
}

/**
 * 3. តារាងស្ថិតិជំរឿនកុមារតាមភូមិចំណុះសាលា (Census Register Sheet)
 */
export function generateCensusRegisterExcel(census?: CatchmentCensusChild[], schoolInfo?: SchoolInfo, isBlank = false) {
  const sch = schoolInfo || { schoolName: 'សាលាបឋមសិក្សាអន្លង់តាម៉ី' };

  const rows = isBlank
    ? Array.from({ length: 20 }, (_, i) => `
      <tr>
        <td style="text-align: center;">${i + 1}</td>
        <td>CEN-2026-....</td>
        <td>................................................</td>
        <td style="text-align: center;">........</td>
        <td>....../....../..........</td>
        <td style="text-align: center;">....</td>
        <td>ភូមិ............................</td>
        <td>................................................</td>
        <td>................</td>
        <td>................................</td>
      </tr>
    `).join('')
    : (census || []).map((c, idx) => `
      <tr>
        <td style="text-align: center;">${idx + 1}</td>
        <td style="font-family: monospace;">${c.childCode}</td>
        <td style="font-weight: bold;">${c.name}</td>
        <td style="text-align: center;">${c.gender}</td>
        <td style="text-align: center;">${c.dob}</td>
        <td style="text-align: center;">${c.age}</td>
        <td>${c.village}</td>
        <td>${c.guardianName}</td>
        <td>${c.guardianPhone}</td>
        <td style="font-weight: bold; color: ${c.status === 'បានចូលរៀន' ? '#16a34a' : '#ea580c'};">${c.status} (${c.enrolledSchool || 'មិនទាន់'})</td>
      </tr>
    `).join('');

  const tableHtml = `
  <table>
    <tr><td colspan="10" class="title-cell">${sch.schoolName}</td></tr>
    <tr><td colspan="10" class="subtitle-cell">តារាងស្ថិតិជំរឿនកុមារតាមភូមិចំណុះសាលារៀន (កុមារអាយុ ០ ដល់ ៦ ឆ្នាំ)</td></tr>
    <tr><td colspan="10"></td></tr>
    <thead>
      <tr>
        <th>ល.រ</th>
        <th>កូដកុមារ</th>
        <th>ឈ្មោះកុមារ</th>
        <th>ភេទ</th>
        <th>ថ្ងៃខែឆ្នាំកំណើត</th>
        <th>អាយុ</th>
        <th>ភូមិចំណុះ</th>
        <th>ឈ្មោះអាណាព្យាបាល</th>
        <th>លេខទូរស័ព្ទ</th>
        <th>ស្ថានភាពចុះឈ្មោះចូលរៀន</th>
      </tr>
    </thead>
    <tbody>
      ${rows}
    </tbody>
  </table>
  `;

  downloadExcelSpreadsheet(
    isBlank ? 'ទម្រង់ទទេ_ស្ថិតិជំរឿនកុមារភូមិចំណុះ.xls' : 'ស្ថិតិជំរឿនកុមារ_ភូមិចំណុះ.xls',
    tableHtml
  );
}

/**
 * 4. តារាងជំនួយសិស្ស និងមូលនិធិជាតិ NSAF (Student Welfare & NSAF Register)
 */
export function generateNsafSupportExcel(supports?: StudentSupportRecord[], schoolInfo?: SchoolInfo, isBlank = false) {
  const sch = schoolInfo || { schoolName: 'សាលាបឋមសិក្សាអន្លង់តាម៉ី' };

  const rows = isBlank
    ? Array.from({ length: 20 }, (_, i) => `
      <tr>
        <td style="text-align: center;">${i + 1}</td>
        <td>................................................</td>
        <td style="text-align: center;">........</td>
        <td>ថ្នាក់ទី ........</td>
        <td>ក្រ១ / ក្រ២</td>
        <td>មូលនិធិជាតិជំនួយសង្គម NSAF</td>
        <td style="text-align: right;">២០,០០០ ៛</td>
        <td style="text-align: center;">យល់ព្រម</td>
        <td>................................................</td>
      </tr>
    `).join('')
    : (supports || []).map((s, idx) => `
      <tr>
        <td style="text-align: center;">${idx + 1}</td>
        <td style="font-weight: bold;">${s.studentName}</td>
        <td style="text-align: center;">${s.gender}</td>
        <td style="text-align: center;">${s.grade} (${s.section})</td>
        <td style="text-align: center; font-weight: bold;">${s.equityStatus}</td>
        <td>${s.category}</td>
        <td style="text-align: right; font-weight: bold;">${s.amountOrValue}</td>
        <td style="text-align: center; font-weight: bold; color: #16a34a;">${s.nsafConditionStatus || 'យល់ព្រម'}</td>
        <td>${s.verificationNote || 'គ្រប់លក្ខខណ្ឌវត្តមាន និងបណ្ណសមធម៌'}</td>
      </tr>
    `).join('');

  const tableHtml = `
  <table>
    <tr><td colspan="9" class="title-cell">${sch.schoolName}</td></tr>
    <tr><td colspan="9" class="subtitle-cell">តារាងតាមដានជំនួយសង្គម និងអាហារូបករណ៍សិស្សក្រីក្រ (NSAF / MoEYS)</td></tr>
    <tr><td colspan="9"></td></tr>
    <thead>
      <tr>
        <th>ល.រ</th>
        <th>ឈ្មោះសិស្ស</th>
        <th>ភេទ</th>
        <th>ថ្នាក់</th>
        <th>ស្ថានភាពបណ្ណសមធម៌</th>
        <th>ប្រភេទទ្រទ្រង់ / ជំនួយ</th>
        <th>តម្លៃ / ប្រាក់ឧបត្ថម្ភ</th>
        <th>លទ្ធផលផ្ទៀងផ្ទាត់</th>
        <th>កំណត់សម្គាល់</th>
      </tr>
    </thead>
    <tbody>
      ${rows}
    </tbody>
  </table>
  `;

  downloadExcelSpreadsheet(
    isBlank ? 'ទម្រង់ទទេ_បញ្ជីជំនួយសិស្ស_NSAF.xls' : 'បញ្ជីជំនួយសិស្ស_NSAF.xls',
    tableHtml
  );
}

/**
 * 5. តារាងសារពើភ័ណ្ឌ និងទ្រព្យសម្បត្តិរដ្ឋ (School Asset & Inventory Register)
 */
export function generateInventoryRegisterExcel(assets?: SchoolAsset[], schoolInfo?: SchoolInfo, isBlank = false) {
  const sch = schoolInfo || { schoolName: 'សាលាបឋមសិក្សាអន្លង់តាម៉ី' };

  const rows = isBlank
    ? Array.from({ length: 20 }, (_, i) => `
      <tr>
        <td style="text-align: center;">${i + 1}</td>
        <td>AST-2026-....</td>
        <td>................................................</td>
        <td>................</td>
        <td style="text-align: center;">......</td>
        <td>គ្រឿង</td>
        <td>ល្អ / ខូចខាតស្រាល</td>
        <td>រដ្ឋបាល / បន្ទប់ទី....</td>
      </tr>
    `).join('')
    : (assets || []).map((a, idx) => `
      <tr>
        <td style="text-align: center;">${idx + 1}</td>
        <td style="font-family: monospace;">${a.assetCode}</td>
        <td style="font-weight: bold;">${a.name}</td>
        <td>${a.category}</td>
        <td style="text-align: center; font-weight: bold;">${a.quantity}</td>
        <td style="text-align: center;">គ្រឿង</td>
        <td style="text-align: center;">${a.condition}</td>
        <td>${a.locationRoom || 'ការិយាល័យ'}</td>
      </tr>
    `).join('');

  const tableHtml = `
  <table>
    <tr><td colspan="8" class="title-cell">${sch.schoolName}</td></tr>
    <tr><td colspan="8" class="subtitle-cell">តារាងសារពើភ័ណ្ឌ និងបញ្ជីគ្រប់គ្រងទ្រព្យសម្បត្តិរដ្ឋ</td></tr>
    <tr><td colspan="8"></td></tr>
    <thead>
      <tr>
        <th>ល.រ</th>
        <th>កូដសម្ភារ</th>
        <th>ឈ្មោះសម្ភារ / ទ្រព្យសម្បត្តិ</th>
        <th>ប្រភេទ</th>
        <th>ចំនួន</th>
        <th>ឯកតា</th>
        <th>ស្ថានភាពបច្ចុប្បន្ន</th>
        <th>ទីតាំងរក្សាទុក</th>
      </tr>
    </thead>
    <tbody>
      ${rows}
    </tbody>
  </table>
  `;

  downloadExcelSpreadsheet(
    isBlank ? 'ទម្រង់ទទេ_តារាងសារពើភ័ណ្ឌសាលារៀន.xls' : 'តារាងសារពើភ័ណ្ឌ_ទ្រព្យសម្បត្តិរដ្ឋ.xls',
    tableHtml
  );
}
