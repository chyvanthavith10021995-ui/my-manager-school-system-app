export type UserRole = 'admin' | 'teacher' | 'student' | 'parent';
export type Language = 'km' | 'en';

export interface Guardian {
  name: string;
  relationship: string; // e.g. "ឪពុក", "ម្តាយ", "អាណាព្យាបាល"
  phone: string;
  email: string;
  occupation?: string; // e.g. "គ្រូបង្រៀន", "អាជីវករ"
}

export type EquityCardStatus = 'ក្រ១ (IDPoor 1)' | 'ក្រ២ (IDPoor 2)' | 'គ្មាន (None)';
export type StudentStatus = 'កំពុងសិក្សា' | 'ផ្ទេសិស្សចេញ' | 'ផ្ទេសិស្សចូល' | 'ព្យួរការសិក្សា' | 'បញ្ចប់ការសិក្សា';

export interface Student {
  id: string;
  studentId: string; // e.g. "ALT-2026-001"
  firstName: string; // e.g. "សុភា"
  lastName: string;  // e.g. "ចាន់"
  email: string;
  avatar: string;
  grade: string; // e.g. "ថ្នាក់ទី ៤" (Grade 4)
  section: string; // e.g. "ក" (A)
  gender: 'ប្រុស' | 'ស្រី' | 'Male' | 'Female';
  dob: string; // ថ្ងៃខែឆ្នាំកំណើត e.g. "2016-04-14"
  enrollmentDate: string;
  guardian: Guardian;
  address: string; // អាស័យដ្ឋានបច្ចុប្បន្ន e.g. "ភូមិអន្លង់តាម៉ី, ឃុំកន្សែង, ស្រុកបាណន់, ខេត្តបាត់ដំបង"
  equityCard: EquityCardStatus; // បណ្ណសមធម៌ (ក្រ១, ក្រ២, គ្មាន)
  status: StudentStatus; // ស្ថានភាព (កំពុងសិក្សា, ផ្ទេសិស្សចេញ, ផ្ទេសិស្សចូល)
  transferNotes?: string; // កត់ត្រាការផ្ទេសិស្ស
  transferDate?: string;
  gpa: number; // e.g. 9.2/10
  rankInClass: number; // e.g. 1 (ចំណាត់ថ្នាក់ទី១)
  attendancePercentage: number;
}

export type TeacherCategory = 'គ្រូក្របខ័ណ្ឌ' | 'គ្រូកិច្ចសន្យា' | 'គ្រូផ្អែកលើកិច្ចព្រមព្រៀង';

export interface Teacher {
  id: string;
  employeeId: string; // e.g. "EMP-KH-101"
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  phone: string;
  gender?: 'ប្រុស' | 'ស្រី' | 'Male' | 'Female';
  teacherCategory: TeacherCategory; // គ្រូក្របខ័ណ្ឌ, គ្រូកិច្ចសន្យា, គ្រូផ្អែកលើកិច្ចព្រមព្រៀង
  subjects: string[]; // e.g. ["ភាសាខ្មែរ", "គណិតវិទ្យា"]
  assignedClasses: string[]; // e.g. ["ថ្នាក់ទី ៤-ក"]
  department: string; // e.g. "បឋមសិក្សាកម្រិតទាប (ថ្នាក់ទី១-៣)"
  qualification: string; // e.g. "បរិញ្ញាបត្រគរុកោសល្យ"
  joiningDate: string;
  status: 'បម្រើការងារ' | 'ច្បាប់ឈប់សម្រាក';
}

export type CommitteeType = 'គគថ' | 'គគស';

export interface CommitteeMember {
  id: string;
  committeeType: CommitteeType; // 'គគថ' (School Support Committee) | 'គគស' (School Management Committee)
  name: string;
  gender: 'ប្រុស' | 'ស្រី' | 'Male' | 'Female';
  role: string; // e.g. "ប្រធាន", "អនុប្រធាន", "លេខាធិការ", "បេឡាធិការ", "សមាជិក"
  externalRole: string; // e.g. "មេភូមិអន្លង់តាម៉ី", "នាយកសាលា", "ប្រធានសមាគមមាតាបិតា"
  phone: string;
  email?: string;
  avatar: string;
  joinedYear: string;
  education: string;
  biography: string; // ជីវប្រវត្តិរូប (Detailed biography)
  responsibilities: string[]; // ភារកិច្ច និងការទទួលខុសត្រូវ
  order: number; // For hierarchy sorting
  reportsToId?: string; // For visual structure graph
}

export interface Subject {
  id: string;
  code: string; // e.g. "KHM-101"
  name: string; // e.g. "អំណាន", "គណិតវិទ្យា"
  department: string;
  credits: number;
}

export interface ClassGroup {
  id: string;
  name: string; // e.g. "ថ្នាក់ទី ៤-ក"
  gradeLevel: string; // e.g. "៤"
  section: string; // e.g. "ក"
  classTeacherId: string;
  roomNumber: string;
  totalStudents: number;
}

export interface TimetableSlot {
  id: string;
  day: 'ច័ន្ទ' | 'អង្គារ' | 'ពុធ' | 'ព្រហស្បតិ៍' | 'សុក្រ' | 'សៅរិ៍';
  timeSlot: string; // e.g. "07:00 ព្រឹក - 07:45 ព្រឹក"
  subject: string;
  className: string;
  teacherName: string;
  room: string;
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  className: string;
  date: string; // YYYY-MM-DD
  status: 'វត្តមាន' | 'អវត្តមាន' | 'ច្បាប់' | 'យឺត';
  remarks?: string;
}

export interface SubjectScore {
  subjectName: string; // e.g. "អំណាន", "ការស្ដាប់", "គណិតវិទ្យា"
  subjectNameEn?: string;
  score: number; // Out of 10 or 100
  maxScore: number;
  letterGrade?: string;
}

export interface GradeRecord {
  id: string;
  studentId: string;
  studentName: string;
  subject: string;
  className: string;
  examName: string; // e.g. "ប្រឡងប្រចាំខែកញ្ញា", "ប្រឡងប្រចាំខែតុលា"
  month: string; // e.g. "ខែកញ្ញា", "ខែតុលា", "ខែវិច្ឆិកា"
  marksObtained: number; // Out of 100 or 10
  maxMarks: number;
  letterGrade: 'ល្អប្រសើរ (A)' | 'ល្អ (B)' | 'ល្អបង្គួរ (C)' | 'មធ្យម (D)' | 'ខ្សោយ (F)';
  rankInClass?: number;
  subjectScores?: SubjectScore[]; // Detailed breakdown for all 13 subjects
  comments?: string;
  date: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string; // e.g. "INV-KH-2026-001"
  studentId: string;
  studentName: string;
  className: string;
  title: string; // e.g. "វិភាគទានសិក្សា & សៀវភៅសិក្សាគោល ឆមាសទី១"
  amountRiel: number; // e.g. 200,000 ៛
  amountUSD: number; // e.g. $50
  dueDate: string;
  issueDate: string;
  status: 'បានបង់' | 'រង់ចាំ' | 'ហួសកំណត់';
  paymentMethod?: 'ABA PAY' | 'Wing' | 'ទូទាត់សាច់ប្រាក់' | 'Wing Bank / Bakong';
  paidDate?: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  author: string;
  role: string;
  date: string;
  category: 'ការសិក្សា' | 'រដ្ឋបាល' | 'កីឡា' | 'កម្មវិធីសាលា';
  priority: 'ខ្ពស់' | 'មធ្យម' | 'ធម្មតា';
  targetAudience: 'ទាំងអស់' | 'សិស្សានុសិស្ស' | 'លោកគ្រូអ្នកគ្រូ' | 'មាតាបិតា';
}

export interface SchoolEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  type: 'ប្រឡង' | 'ថ្ងៃឈប់សម្រាក' | 'កីឡា' | 'ប្រជុំ';
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'info' | 'warning' | 'success' | 'alert';
}

export interface SchoolInfo {
  schoolName: string;
  schoolCode: string;
  province: string;
  district: string;
  commune: string;
  village: string;
  principalName: string;
  academicYear: string;
  phone: string;
  email: string;
  moeysName?: string;
  nameKhmer?: string;
}

// ==================== NEW CAMBODIAN EDUCATION MODULES ====================

// 1. បវេសនកាល (School Enrollment Campaign & Catchment Census)
export type EnrollmentStatus = 'បានចូលរៀន' | 'មិនទាន់ចូលរៀន' | 'ផ្ទេរទៅសាលាផ្សេង' | 'បោះបង់ការសិក្សា';

export interface CatchmentCensusChild {
  id: string;
  childCode: string; // e.g. "CEN-ALT-2026-001"
  name: string;
  gender: 'ប្រុស' | 'ស្រី';
  dob: string; // YYYY-MM-DD
  age: number; // e.g. 6
  village: string; // e.g. "ភូមិអន្លង់តាម៉ី"
  guardianName: string;
  guardianPhone: string;
  status: EnrollmentStatus;
  enrolledSchool?: string; // e.g. "សាលាបឋមសិក្សា អន្លង់តាម៉ី"
  enrolledGrade?: string; // e.g. "ថ្នាក់ទី ១"
  reasonNotEnrolled?: string; // e.g. "គ្រួសារក្រីក្រ, ទីប្រជុំជនឆ្ងាយ"
  actionTaken?: string; // e.g. "ចុះអប់រំដល់ផ្ទះ, ផ្តល់អាហារូបករណ៍"
}

// 2. ឧបករណ៍វាយតម្លៃមត្តេយ្យ (Preschool/Kindergarten Assessment Tool)
export type PreschoolRating = 'ល្អប្រសើរ' | 'ល្អ' | 'មធ្យម' | 'ត្រូវការកែលម្អ';

export interface PreschoolIndicatorScore {
  indicatorId: string;
  category: 'កាយសម្បទា & សុខភាព' | 'សង្គម & អារម្មណ៍' | 'ភាសាខ្មែរ & ការប្រាស្រ័យទាក់ទង' | 'គណិតវិទ្យាដំបូង' | 'វិទ្យាសាស្ត្រ & បរិស្ថាន';
  title: string;
  rating: PreschoolRating;
  remarks?: string;
}

export interface PreschoolAssessment {
  id: string;
  studentId: string;
  studentName: string;
  dob: string;
  gender: 'ប្រុស' | 'ស្រី';
  term: 'ឆមាសទី១' | 'ឆមាសទី២' | 'ប្រចាំខែ';
  evaluatorTeacherName: string;
  date: string;
  indicators: PreschoolIndicatorScore[];
  overallRemarks: string;
}

// 3. ជំនួយសិស្ស (Student Support & Welfare)
export type SupportCategory =
  | 'មូលនិធិជាតិជំនួយសង្គម NSAF (២០,០០០៛/ខែ)'
  | 'អាហារូបត្ថម្ភ (Nutrition)'
  | 'អាហារូបករណ៍រដ្ឋ (Scholarship)'
  | 'ឧបត្ថម្ភពីដៃគូ (NGO/Partner Aid)';

export type NSAFConditionStatus = 'យល់ព្រម' | 'មិនគ្រប់លក្ខខណ្ឌ' | 'រង់ចាំការបញ្ជាក់';

export interface StudentSupportRecord {
  id: string;
  studentId: string;
  studentName: string;
  grade: string;
  section: string;
  gender: 'ប្រុស' | 'ស្រី';
  equityStatus: EquityCardStatus;
  category: SupportCategory;
  providerName: string;
  itemDescription: string;
  amountOrValue: string;
  dateProvided: string;
  status: 'កំពុងទទួលបាន' | 'បានបញ្ចប់';
  nsafConditionStatus?: NSAFConditionStatus;
  monthlyAllowanceRiel?: number;
  verificationNote?: string;
}

// 4. សកម្មភាពសាលា & ភស្ដុតាងសាលាស្ដង់ដារគំរូ (School Activities & Evidence)
export type ActivityType = 'ការប្រកួតប្រជែង' | 'ក្លឹបសិក្សា' | 'ទស្សនកិច្ច' | 'ទំនាក់ទំនងព្រះសង្ឃ/សហគមន៍' | 'ប្រជុំបច្ចេកទេស' | 'ភស្ដុតាងសាលាស្ដង់ដារគំរូ';

export interface SchoolActivityRecord {
  id: string;
  title: string;
  activityType: ActivityType;
  standardCategory?: 'ស្ដង់ដារទី១ (ការសិក្សាសិស្ស)' | 'ស្ដង់ដារទី២ (ការបង្រៀន)' | 'ស្ដង់ដារទី៣ (ការគ្រប់គ្រង)' | 'ស្ដង់ដារទី៤ (បរិស្ថាន)' | 'ស្ដង់ដារទី៥ (សហគមន៍)';
  date: string;
  location: string;
  leadPerson: string;
  participantsCount: number;
  description: string;
  outcomeEvidence: string;
  evidenceDocumentUrl?: string;
}

// 5. ផែនការប្រជុំមាតាបិតា ១ឆ្នាំសិក្សា (Parent Meeting Plan)
export interface ParentMeetingPlan {
  id: string;
  meetingNumber: string;
  plannedDate: string;
  time: string;
  agendaTopic: string;
  targetAudience: string;
  responsiblePerson: string;
  expectedOutput: string;
  status: 'បានរៀបចំរួច' | 'រង់ចាំអនុវត្ត' | 'បានពន្យារពេល';
  actualAttendanceCount?: number;
}

// 6. បញ្ជីប្រគល់ ទទួលសម្ភារៈ (Material Handover Log)
export type HandoverType = 'ប្រគល់ (Distribute)' | 'ទទួល (Receive)';

export interface MaterialHandover {
  id: string;
  handoverType: HandoverType;
  itemName: string;
  category: 'សៀវភៅសិក្សា' | 'សម្ភារឧបទេស' | 'ឧបករណ៍កីឡា' | 'សម្ភារការិយាល័យ' | 'ឧបករណ៍បច្ចេកវិទ្យា';
  quantity: number;
  unit: string;
  fromParty: string;
  toParty: string;
  date: string;
  receiverSignatureName: string;
}

// 7. បញ្ជីចំណូល ចំណាយ (Income & Expense Transactions)
export type TransactionType = 'ចំណូល (Income)' | 'ចំណាយ (Expense)';

export interface FinancialTransaction {
  id: string;
  voucherNo: string;
  transactionType: TransactionType;
  title: string;
  category: 'ថវិការដ្ឋ (PB)' | 'វិភាគទានសហគមន៍' | 'ជំនួយសប្បុរសជន' | 'ចំណាយជួសជុល' | 'ចំណាយសម្ភារសិក្សា';
  amountRiel: number;
  amountUSD: number;
  date: string;
  handledBy: string;
  remarks?: string;
}

// 8. បញ្ជីគ្រប់គ្រងសម្ភារៈ (School Asset Inventory)
export interface SchoolAsset {
  id: string;
  assetCode: string;
  name: string;
  category: 'គ្រឿងសង្ហារិម' | 'ឧបករណ៍បច្ចេកវិទ្យា' | 'សម្ភារកីឡា' | 'ឧបករណ៍បង្រៀន' | 'សម្ភារអនាម័យ';
  quantity: number;
  condition: 'ល្អ (Good)' | 'មធ្យម (Fair)' | 'ត្រូវការជួសជុល (Needs Repair)' | 'ខូចខាត (Broken)';
  locationRoom: string;
  acquisitionDate: string;
  valueRiel?: number;
}

// 9. ប្រព័ន្ធកត់ត្រាជីវប្រវត្តិប្រតិបត្តិការ (Audit Trail / Activity Log)
export type AuditActionType =
  | 'បង្កើត (Create)'
  | 'កែប្រែ (Update)'
  | 'លុប (Delete)'
  | 'នាំចេញ (Export)'
  | 'ទូទាត់ (Payment)'
  | 'បម្រុងទុក (Backup)'
  | 'ចូលប្រើប្រាស់ (Login)'
  | 'កំណត់សិទ្ធិ (RBAC)';

export interface AuditLog {
  id: string;
  userId: string;
  userName: string;
  userRole: UserRole;
  action: AuditActionType;
  targetEntity: string;
  details: string;
  timestamp: string;
  ipAddress?: string;
  status: 'ជោគជ័យ' | 'បរាជ័យ';
}

// 10. Data Backup & Security Settings Configuration
export interface DataBackupSettings {
  autoBackupEnabled: boolean;
  backupFrequency: 'រៀងរាល់ថ្ងៃ (Daily)' | 'រៀងរាល់សប្តាហ៍ (Weekly)' | 'រៀងរាល់ខែ (Monthly)';
  backupTime: string; // e.g. "00:00 AM"
  lastBackupDate: string;
  cloudSyncTarget: 'Supabase' | 'Firebase' | 'PostgreSQL' | 'Local Backup';
  cloudSyncStatus: 'បានភ្ជាប់ (Connected)' | 'រង់ចាំការភ្ជាប់';
  httpsEnforced: boolean;
  passwordHashAlgorithm: 'bcrypt (Salt 12)' | 'Argon2id';
}



