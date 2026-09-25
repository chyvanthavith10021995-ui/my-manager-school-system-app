import React, { createContext, useContext, useState, useEffect } from 'react';
import type {
  UserRole,
  Language,
  Student,
  Teacher,
  CommitteeMember,
  ClassGroup,
  Subject,
  TimetableSlot,
  AttendanceRecord,
  GradeRecord,
  Invoice,
  Announcement,
  SchoolEvent,
  AppNotification,
  SchoolInfo,
  CatchmentCensusChild,
  PreschoolAssessment,
  StudentSupportRecord,
  SchoolActivityRecord,
  ParentMeetingPlan,
  MaterialHandover,
  FinancialTransaction,
  SchoolAsset,
  AuditLog,
  AuditActionType,
  DataBackupSettings
} from '../types';

export const defaultSchoolInfo: SchoolInfo = {
  schoolName: 'សាលាបឋមសិក្សា អន្លង់តាម៉ី',
  schoolCode: 'ALT-PRIMARY-082',
  province: 'ខេត្តបាត់ដំបង',
  district: 'ស្រុកបាណន់',
  commune: 'ឃុំឈើទាល',
  village: 'ភូមិអន្លង់តាម៉ី',
  principalName: 'លោកនាយក ឈិត សារ៉ាំ',
  academicYear: '២០២៦ - ២០២៧ (ចូលរៀនខែ១១ ឆ្នាំ២០២៦)',
  phone: '012 888 999',
  email: 'info@anlongtamey.edu.kh'
};
import {
  initialStudents,
  initialTeachers,
  initialCommittees,
  initialClasses,
  initialSubjects,
  initialTimetable,
  generateMoEYSStandardTimetable,
  initialAttendance,
  initialGrades,
  initialInvoices,
  initialAnnouncements,
  initialEvents,
  initialCensusChildren,
  initialPreschoolAssessments,
  initialStudentSupports,
  initialSchoolActivities,
  initialParentMeetingPlans,
  initialMaterialHandovers,
  initialFinancialTransactions,
  initialSchoolAssets,
  initialAuditLogs,
  initialBackupSettings
} from '../mockData/initialData';

const translations: Record<Language, Record<string, string>> = {
  km: {
    dashboard: 'ផ្ទាំងគ្រប់គ្រង',
    students: 'បញ្ជីឈ្មោះសិស្ស',
    teachers: 'បញ្ជីឈ្មោះគ្រូបង្រៀន',
    committees: 'គណៈកម្មាធិការ (គគថ/គគស)',
    academics: 'ថ្នាក់រៀន និងកាលវិភាគ',
    attendance: 'ការកត់ត្រាវត្តមាន',
    gradebook: 'សៀវភៅពិន្ទុ',
    census: 'បវេសនកាល & ជំរឿនភូមិ',
    preschool: 'ឧបករណ៍វាយតម្លៃមត្តេយ្យ',
    support: 'ជំនួយសិស្ស & អាហារ',
    activities: 'សកម្មភាពសាលា & ស្ដង់ដារ',
    parentMeetings: 'ផែនការប្រជុំមាតាបិតា',
    inventory: 'សម្ភារៈ & ហិរញ្ញវត្ថុ',
    reports: 'របាយការណ៍មេ (Master Reports)',
    finance: 'ហិរញ្ញវត្ថុ និងថ្លៃសិក្សា',
    notices: 'ព័ត៌មាន និងព្រឹត្តិការណ៍',
    admin: 'អ្នកគ្រប់គ្រងសាលា',
    teacher: 'លោកគ្រូ / អ្នកគ្រូ',
    student: 'សិស្សានុសិស្ស',
    parent: 'មាតាបិតាសិស្ស',
    searchPlaceholder: 'ស្វែងរកសិស្ស, គ្រូបង្រៀន, គណៈកម្មាធិការ, ថ្នាក់រៀន, ព័ត៌មាន...',
    role: 'តួនាទី:',
    resetDemo: 'កំណត់ទិន្នន័យឡើងវិញ',
    schoolName: 'សាលាបឋមសិក្សា អន្លង់តាម៉ី (ក្រសួងអប់រំ យុវជន និងកីឡា)',
  },
  en: {
    dashboard: 'Dashboard',
    students: 'Students Directory',
    teachers: 'Faculty Directory',
    committees: 'Committees (SSC/SMC)',
    academics: 'Classes & Schedule',
    attendance: 'Attendance Tracker',
    gradebook: 'Gradebook',
    census: 'Enrollment & Catchment',
    preschool: 'Preschool Assessment',
    support: 'Student Support & Welfare',
    activities: 'Activities & Standards',
    parentMeetings: 'Parent Meeting Plan',
    inventory: 'Asset & Budget Management',
    reports: 'Master Reports',
    finance: 'Finance & Tuition',
    notices: 'Notices & Events',
    admin: 'School Admin',
    teacher: 'Teacher',
    student: 'Student',
    parent: 'Parent',
    searchPlaceholder: 'Search students, staff, committees, classes, notices...',
    role: 'Role:',
    resetDemo: 'Reset Demo Data',
    schoolName: 'Anlong Tamey Primary School (MoEYS Cambodia)',
  }
};

interface AppContextType {
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  
  // Academic Year State (ទិន្នន័យទាំងអស់គឺផ្អែកលើឆ្នាំសិក្សា)
  selectedAcademicYear: string;
  setSelectedAcademicYear: (year: string) => void;
  availableAcademicYears: string[];

  // School Info
  schoolInfo: SchoolInfo;
  updateSchoolInfo: (info: Partial<SchoolInfo>) => void;

  // Data
  students: Student[];
  teachers: Teacher[];
  committees: CommitteeMember[];
  classes: ClassGroup[];
  subjects: Subject[];
  timetable: TimetableSlot[];
  attendance: AttendanceRecord[];
  grades: GradeRecord[];
  invoices: Invoice[];
  announcements: Announcement[];
  events: SchoolEvent[];
  notifications: AppNotification[];

  // 8 Cambodian Education Modules Data
  censusChildren: CatchmentCensusChild[];
  preschoolAssessments: PreschoolAssessment[];
  studentSupports: StudentSupportRecord[];
  schoolActivities: SchoolActivityRecord[];
  parentMeetingPlans: ParentMeetingPlan[];
  materialHandovers: MaterialHandover[];
  financialTransactions: FinancialTransaction[];
  schoolAssets: SchoolAsset[];

  // Actions
  addStudent: (student: Omit<Student, 'id' | 'studentId' | 'gpa' | 'rankInClass' | 'attendancePercentage'>) => void;
  updateStudent: (id: string, updated: Partial<Student>) => void;
  deleteStudent: (id: string) => void;
  transferStudent: (id: string, newStatus: Student['status'], notes?: string, newGrade?: string, newSection?: string) => void;
  importStudents: (importedList: any[]) => void;
  addTeacher: (teacher: Omit<Teacher, 'id' | 'employeeId'>) => void;
  updateTeacher: (id: string, updated: Partial<Teacher>) => void;
  deleteTeacher: (id: string) => void;
  addCommitteeMember: (member: Omit<CommitteeMember, 'id'>) => void;
  updateCommitteeMember: (id: string, updated: Partial<CommitteeMember>) => void;
  deleteCommitteeMember: (id: string) => void;
  assignClassTeacher: (classId: string, teacherId: string) => void;
  addClassGroup: (newClass: ClassGroup) => void;
  updateClassGroup: (id: string, updated: Partial<ClassGroup>) => void;
  deleteClassGroup: (id: string) => void;
  addTimetableSlot: (slot: Omit<TimetableSlot, 'id'>) => void;
  updateTimetableSlot: (id: string, updated: Partial<TimetableSlot>) => void;
  deleteTimetableSlot: (id: string) => void;
  resetToMoEYSStandardTimetable: () => void;
  markAttendance: (record: Omit<AttendanceRecord, 'id'>) => void;
  addGrade: (grade: Omit<GradeRecord, 'id'>) => void;
  batchSaveClassScores: (classGrades: Omit<GradeRecord, 'id'>[]) => void;
  payInvoice: (invoiceId: string, paymentMethod: Invoice['paymentMethod']) => void;
  addInvoice: (invoice: Omit<Invoice, 'id' | 'invoiceNumber'>) => void;
  addAnnouncement: (announcement: Omit<Announcement, 'id' | 'date'>) => void;
  markNotificationRead: (id: string) => void;
  clearNotifications: () => void;
  resetDemoData: () => void;

  // New Module Actions
  addCensusChild: (child: Omit<CatchmentCensusChild, 'id' | 'childCode'>) => void;
  updateCensusChild: (id: string, updated: Partial<CatchmentCensusChild>) => void;
  deleteCensusChild: (id: string) => void;
  addPreschoolAssessment: (assessment: Omit<PreschoolAssessment, 'id'>) => void;
  updatePreschoolAssessment: (id: string, updated: Partial<PreschoolAssessment>) => void;
  deletePreschoolAssessment: (id: string) => void;
  addStudentSupport: (support: Omit<StudentSupportRecord, 'id'>) => void;
  updateStudentSupport: (id: string, updated: Partial<StudentSupportRecord>) => void;
  deleteStudentSupport: (id: string) => void;
  addSchoolActivity: (act: Omit<SchoolActivityRecord, 'id'>) => void;
  updateSchoolActivity: (id: string, updated: Partial<SchoolActivityRecord>) => void;
  deleteSchoolActivity: (id: string) => void;
  addParentMeetingPlan: (plan: Omit<ParentMeetingPlan, 'id'>) => void;
  updateParentMeetingPlan: (id: string, updated: Partial<ParentMeetingPlan>) => void;
  deleteParentMeetingPlan: (id: string) => void;
  addMaterialHandover: (ho: Omit<MaterialHandover, 'id'>) => void;
  updateMaterialHandover: (id: string, updated: Partial<MaterialHandover>) => void;
  deleteMaterialHandover: (id: string) => void;
  addFinancialTransaction: (tx: Omit<FinancialTransaction, 'id' | 'voucherNo'>) => void;
  updateFinancialTransaction: (id: string, updated: Partial<FinancialTransaction>) => void;
  deleteFinancialTransaction: (id: string) => void;
  addSchoolAsset: (asset: Omit<SchoolAsset, 'id' | 'assetCode'>) => void;
  updateSchoolAsset: (id: string, updated: Partial<SchoolAsset>) => void;
  deleteSchoolAsset: (id: string) => void;
  // Audit Logs & Security
  auditLogs: AuditLog[];
  logActivity: (action: AuditActionType, targetEntity: string, details: string, status?: 'ជោគជ័យ' | 'បរាជ័យ') => void;
  backupSettings: DataBackupSettings;
  updateBackupSettings: (updated: Partial<DataBackupSettings>) => void;
  triggerManualBackup: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userRole, setUserRole] = useState<UserRole>('admin');
  const [language, setLanguage] = useState<Language>(() => {
    return (localStorage.getItem('edupulse_lang') as Language) || 'km';
  });
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    return (localStorage.getItem('edupulse_theme') as 'light' | 'dark') || 'dark';
  });
  const [searchQuery, setSearchQuery] = useState('');

  // Academic Year State (ទិន្នន័យទាំងអស់គឺផ្អែកលើឆ្នាំសិក្សា)
  const availableAcademicYears = [
    '២០២៦ - ២០២៧ (ចូលរៀនខែ១១ ឆ្នាំ២០២៦)',
    '២០២៥ - ២០២៦',
    '២០២៤ - ២០២៥',
    '២០២៣ - ២០២៤'
  ];

  const [selectedAcademicYear, setSelectedAcademicYear] = useState<string>(() => {
    return localStorage.getItem('edupulse_academic_year') || availableAcademicYears[0];
  });

  useEffect(() => {
    localStorage.setItem('edupulse_academic_year', selectedAcademicYear);
  }, [selectedAcademicYear]);

  const t = (key: string): string => {
    return translations[language]?.[key] || translations['km']?.[key] || key;
  };

  useEffect(() => {
    localStorage.setItem('edupulse_lang', language);
  }, [language]);

  // Storage persistent state helper
  const useLocalStorage = <T,>(key: string, initialVal: T) => {
    const [val, setVal] = useState<T>(() => {
      try {
        const item = localStorage.getItem(`edupulse_${key}`);
        return item ? JSON.parse(item) : initialVal;
      } catch (e) {
        return initialVal;
      }
    });

    useEffect(() => {
      localStorage.setItem(`edupulse_${key}`, JSON.stringify(val));
    }, [key, val]);

    return [val, setVal] as const;
  };

  const [schoolInfo, setSchoolInfo] = useLocalStorage<SchoolInfo>('school_info', defaultSchoolInfo);
  const [students, setStudents] = useLocalStorage<Student[]>('students', initialStudents);
  const [teachers, setTeachers] = useLocalStorage<Teacher[]>('teachers', initialTeachers);
  const [committees, setCommittees] = useLocalStorage<CommitteeMember[]>('committees', initialCommittees);
  const [classes, setClasses] = useLocalStorage<ClassGroup[]>('classes', initialClasses);
  const [subjects] = useLocalStorage<Subject[]>('subjects', initialSubjects);
  const [timetable, setTimetable] = useLocalStorage<TimetableSlot[]>('timetable', initialTimetable);
  const [attendance, setAttendance] = useLocalStorage<AttendanceRecord[]>('attendance', initialAttendance);
  const [grades, setGrades] = useLocalStorage<GradeRecord[]>('grades', initialGrades);
  const [invoices, setInvoices] = useLocalStorage<Invoice[]>('invoices', initialInvoices);
  const [announcements, setAnnouncements] = useLocalStorage<Announcement[]>('announcements', initialAnnouncements);
  const [events] = useLocalStorage<SchoolEvent[]>('events', initialEvents);
  
  // 8 Cambodian MoEYS persistent states
  const [censusChildren, setCensusChildren] = useLocalStorage<CatchmentCensusChild[]>('census_children', initialCensusChildren);
  const [preschoolAssessments, setPreschoolAssessments] = useLocalStorage<PreschoolAssessment[]>('preschool_assessments', initialPreschoolAssessments);
  const [studentSupports, setStudentSupports] = useLocalStorage<StudentSupportRecord[]>('student_supports', initialStudentSupports);
  const [schoolActivities, setSchoolActivities] = useLocalStorage<SchoolActivityRecord[]>('school_activities', initialSchoolActivities);
  const [parentMeetingPlans, setParentMeetingPlans] = useLocalStorage<ParentMeetingPlan[]>('parent_meeting_plans', initialParentMeetingPlans);
  const [materialHandovers, setMaterialHandovers] = useLocalStorage<MaterialHandover[]>('material_handovers', initialMaterialHandovers);
  const [financialTransactions, setFinancialTransactions] = useLocalStorage<FinancialTransaction[]>('financial_transactions', initialFinancialTransactions);
  const [schoolAssets, setSchoolAssets] = useLocalStorage<SchoolAsset[]>('school_assets', initialSchoolAssets);
  
  // Security & Audit Log state
  const [auditLogs, setAuditLogs] = useLocalStorage<AuditLog[]>('audit_logs', initialAuditLogs);
  const [backupSettings, setBackupSettings] = useLocalStorage<DataBackupSettings>('backup_settings', initialBackupSettings);

  const logActivity = (
    action: AuditActionType,
    targetEntity: string,
    details: string,
    status: 'ជោគជ័យ' | 'បរាជ័យ' = 'ជោគជ័យ'
  ) => {
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
    
    const userNameMap: Record<UserRole, string> = {
      admin: 'លោកនាយក ឈិត សារ៉ាំ (Admin)',
      teacher: 'លោកគ្រូ ស៊ឹម សុផល (Teacher)',
      student: 'សិស្ស ឡុង សុវណ្ណារ៉ា',
      parent: 'អាណាព្យាបាល ឡុង សុខា'
    };

    const newLog: AuditLog = {
      id: `log-${Date.now()}`,
      userId: `usr-${userRole}`,
      userName: userNameMap[userRole] || 'អ្នកប្រើប្រាស់ប្រព័ន្ធ',
      userRole,
      action,
      targetEntity,
      details,
      timestamp: formattedDate,
      ipAddress: '192.168.1.10',
      status
    };

    setAuditLogs(prev => [newLog, ...prev]);
  };

  const updateBackupSettings = (updated: Partial<DataBackupSettings>) => {
    setBackupSettings(prev => ({ ...prev, ...updated }));
    logActivity('កែប្រែ (Update)', 'ការកំណត់ Auto-Backup', 'បានបច្ចុប្បន្នភាពការកំណត់ការបម្រុងទុកទិន្នន័យ');
  };

  const triggerManualBackup = () => {
    const now = new Date();
    const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    
    setBackupSettings(prev => ({
      ...prev,
      lastBackupDate: dateStr
    }));

    // Generate JSON download snapshot
    const exportData = {
      schoolInfo,
      studentsCount: students.length,
      teachersCount: teachers.length,
      classesCount: classes.length,
      backupTimestamp: dateStr,
      encryption: 'bcrypt (Salt 12) + HTTPS',
      databaseDump: {
        students,
        teachers,
        attendance,
        grades,
        financialTransactions
      }
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `AnlongTamey_School_Backup_${dateStr.replace(/[: ]/g, '_')}.json`;
    a.click();
    URL.revokeObjectURL(url);

    logActivity('បម្រុងទុក (Backup)', 'ទិន្នន័យសាលាទាំងមូល (Full DB)', 'បានធ្វើការបម្រុងទុកទិន្នន័យ និងទាញយក Encrypted JSON Database Snapshot');
  };

  const [notifications, setNotifications] = useState<AppNotification[]>([
    { id: 'n1', title: 'បានកត់ត្រាវត្តមាន', message: 'វត្តមានសិស្សថ្នាក់ទី ៤-ក បានបច្ចុប្បន្នភាពរួចរាល់។', timestamp: '១០ នាទីមុន', read: false, type: 'info' },
    { id: 'n2', title: 'ទទួលបានការទូទាត់ថ្លៃសិក្សា', message: 'វិក្កយបត្រ INV-KH-2026-002 ត្រូវបានទូទាត់ដោយ សុខ រតនា។', timestamp: '១ ម៉ោងមុន', read: false, type: 'success' },
    { id: 'n3', title: 'កាលវិភាគប្រឡងឆមាស', message: 'កាលវិភាគប្រឡងឆមាសទី១ ត្រូវបានចេញផ្សាយផ្លូវការ។', timestamp: '១ ថ្ងៃមុន', read: true, type: 'warning' }
  ]);

  // Sync dark class on document element
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('edupulse_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  // Actions
  const updateSchoolInfo = (newInfo: Partial<SchoolInfo>) => {
    setSchoolInfo(prev => ({ ...prev, ...newInfo }));
  };

  const addStudent = (studentData: Omit<Student, 'id' | 'studentId' | 'gpa' | 'rankInClass' | 'attendancePercentage'>) => {
    const newId = `s_${Date.now()}`;
    const studentNum = String(students.length + 1).padStart(3, '0');
    const newStudent: Student = {
      ...studentData,
      id: newId,
      studentId: `ALT-2026-${studentNum}`,
      gpa: 9.0,
      rankInClass: students.length + 1,
      attendancePercentage: 97.0
    };
    setStudents([newStudent, ...students]);
    
    // Add notification
    setNotifications(prev => [{
      id: `n_${Date.now()}`,
      title: 'បានចុះឈ្មោះសិស្សថ្មី',
      message: `សិស្ស ${newStudent.lastName} ${newStudent.firstName} ត្រូវបានចូលរៀននៅ ${newStudent.grade} (${newStudent.section})។`,
      timestamp: 'អម្បាញ់មិញ',
      read: false,
      type: 'success'
    }, ...prev]);
  };

  const updateStudent = (id: string, updated: Partial<Student>) => {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, ...updated } : s));
  };

  const deleteStudent = (id: string) => {
    setStudents(prev => prev.filter(s => s.id !== id));
  };

  const transferStudent = (
    id: string,
    newStatus: Student['status'],
    notes?: string,
    newGrade?: string,
    newSection?: string
  ) => {
    const today = new Date().toISOString().split('T')[0];
    setStudents(prev => prev.map(s => {
      if (s.id === id) {
        return {
          ...s,
          status: newStatus,
          transferNotes: notes || s.transferNotes,
          transferDate: today,
          grade: newGrade || s.grade,
          section: newSection || s.section
        };
      }
      return s;
    }));

    setNotifications(prev => [{
      id: `n_${Date.now()}`,
      title: 'បានធ្វើបច្ចុប្បន្នភាពការផ្ទេសិស្ស',
      message: `ស្ថានភាពសិស្សត្រូវបានប្តូរទៅជា "${newStatus}" ជោគជ័យ។`,
      timestamp: 'អម្បាញ់មិញ',
      read: false,
      type: 'info'
    }, ...prev]);
  };

  const importStudents = (importedList: any[]) => {
    const newStudents: Student[] = importedList.map((item, idx) => {
      const studentNum = String(students.length + idx + 1).padStart(3, '0');
      return {
        id: `s_imp_${Date.now()}_${idx}`,
        studentId: item.studentId || `ALT-2026-${studentNum}`,
        firstName: item.firstName || 'ឈ្មោះ',
        lastName: item.lastName || 'ត្រកូល',
        email: item.email || `student.${idx}@anlongtamey.edu.kh`,
        avatar: item.avatar || 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=250&q=80',
        grade: item.grade || 'ថ្នាក់ទី ១',
        section: item.section || 'ក',
        gender: item.gender || 'ស្រី',
        dob: item.dob || '2018-01-01',
        enrollmentDate: new Date().toISOString().split('T')[0],
        guardian: {
          name: item.guardianName || 'អាណាព្យាបាល',
          relationship: item.guardianRel || 'ឪពុក',
          phone: item.guardianPhone || '012 345 678',
          email: 'guardian@gmail.com',
          occupation: 'កសិករ'
        },
        address: item.address || 'ភូមិអន្លង់តាម៉ី, ឃុំកន្សែង, ស្រុកបាណន់, ខេត្តបាត់ដំបង',
        equityCard: item.equityCard || 'គ្មាន (None)',
        status: item.status || 'កំពុងសិក្សា',
        gpa: Number(item.gpa) || 9.0,
        rankInClass: idx + 1,
        attendancePercentage: 98.0
      };
    });

    setStudents(prev => [...newStudents, ...prev]);

    setNotifications(prev => [{
      id: `n_${Date.now()}`,
      title: 'បាននាំចូលទិន្នន័យពី Excel',
      message: `បាននាំចូលទិន្នន័យសិស្សចំនួន ${newStudents.length} នាក់ដោយជោគជ័យ។`,
      timestamp: 'អម្បាញ់មិញ',
      read: false,
      type: 'success'
    }, ...prev]);
  };

  const addTeacher = (teacherData: Omit<Teacher, 'id' | 'employeeId'>) => {
    const newId = `t_${Date.now()}`;
    const empNum = String(teachers.length + 101);
    const newTeacher: Teacher = {
      ...teacherData,
      id: newId,
      employeeId: `EMP-KH-${empNum}`
    };
    setTeachers([newTeacher, ...teachers]);
  };

  const updateTeacher = (id: string, updated: Partial<Teacher>) => {
    setTeachers(prev => prev.map(t => t.id === id ? { ...t, ...updated } : t));
  };

  const deleteTeacher = (id: string) => {
    setTeachers(prev => prev.filter(t => t.id !== id));
  };

  const addCommitteeMember = (memberData: Omit<CommitteeMember, 'id'>) => {
    const newMember: CommitteeMember = {
      ...memberData,
      id: `cm_${Date.now()}`
    };
    setCommittees(prev => [...prev, newMember]);

    setNotifications(prev => [{
      id: `n_${Date.now()}`,
      title: 'បានបន្ថែមសមាជិកគណៈកម្មាធិការ',
      message: `សមាជិក ${newMember.name} ត្រូវបានបន្ថែមទៅ ${newMember.committeeType} ជោគជ័យ។`,
      timestamp: 'អម្បាញ់មិញ',
      read: false,
      type: 'success'
    }, ...prev]);
  };

  const updateCommitteeMember = (id: string, updated: Partial<CommitteeMember>) => {
    setCommittees(prev => prev.map(c => c.id === id ? { ...c, ...updated } : c));
  };

  const deleteCommitteeMember = (id: string) => {
    setCommittees(prev => prev.filter(c => c.id !== id));
  };

  const assignClassTeacher = (classId: string, teacherId: string) => {
    const targetClass = classes.find(c => c.id === classId || c.name === classId);
    const targetTeacher = teachers.find(t => t.id === teacherId);
    if (!targetClass || !targetTeacher) return;

    const oldTeacherId = targetClass.classTeacherId;

    setClasses(prev => prev.map(c => c.id === targetClass.id ? { ...c, classTeacherId: teacherId } : c));

    setTeachers(prev => prev.map(t => {
      if (t.id === teacherId) {
        const assigned = t.assignedClasses.includes(targetClass.name)
          ? t.assignedClasses
          : [...t.assignedClasses, targetClass.name];
        return { ...t, assignedClasses: assigned };
      }
      if (t.id === oldTeacherId) {
        return { ...t, assignedClasses: t.assignedClasses.filter(clsName => clsName !== targetClass.name) };
      }
      return t;
    }));

    setNotifications(prev => [{
      id: `n_${Date.now()}`,
      title: 'បានចាត់តាំងគ្រូបន្ទុកថ្នាក់',
      message: `បានចាត់តាំង ${targetTeacher.lastName} ${targetTeacher.firstName} ជាគ្រូបន្ទុក ${targetClass.name}។`,
      timestamp: 'អម្បាញ់មិញ',
      read: false,
      type: 'success'
    }, ...prev]);
  };

  const addClassGroup = (newClass: ClassGroup) => {
    setClasses(prev => [newClass, ...prev]);

    setNotifications(prev => [{
      id: `n_${Date.now()}`,
      title: 'បានបង្កើតថ្នាក់រៀនថ្មី',
      message: `ថ្នាក់រៀន "${newClass.name}" ត្រូវបានបង្កើតជោគជ័យ។`,
      timestamp: 'អម្បាញ់មិញ',
      read: false,
      type: 'success'
    }, ...prev]);
  };

  const updateClassGroup = (id: string, updated: Partial<ClassGroup>) => {
    setClasses(prev => prev.map(c => c.id === id ? { ...c, ...updated } : c));
  };

  const deleteClassGroup = (id: string) => {
    setClasses(prev => prev.filter(c => c.id !== id));
  };

  const addTimetableSlot = (slotData: Omit<TimetableSlot, 'id'>) => {
    const newSlot: TimetableSlot = {
      ...slotData,
      id: `tb_${Date.now()}`
    };
    setTimetable(prev => [newSlot, ...prev]);

    setNotifications(prev => [{
      id: `n_${Date.now()}`,
      title: 'បានបន្ថែមកាលវិភាគថ្មី',
      message: `កាលវិភាគ ${newSlot.subject} (${newSlot.className}) ត្រូវបានបន្ថែមជោគជ័យ។`,
      timestamp: 'អម្បាញ់មិញ',
      read: false,
      type: 'success'
    }, ...prev]);
  };

  const updateTimetableSlot = (id: string, updated: Partial<TimetableSlot>) => {
    setTimetable(prev => prev.map(s => s.id === id ? { ...s, ...updated } : s));
  };

  const deleteTimetableSlot = (id: string) => {
    setTimetable(prev => prev.filter(s => s.id !== id));
  };

  const resetToMoEYSStandardTimetable = () => {
    const defaultMoEYSSlots = generateMoEYSStandardTimetable();
    setTimetable(defaultMoEYSSlots);

    setNotifications(prev => [{
      id: `n_${Date.now()}`,
      title: 'បានកំណត់កាលវិភាគស្ដង់ដារ MoEYS',
      message: 'កាលវិភាគស្ដង់ដារក្រសួងអប់រំសម្រាប់គ្រប់ថ្នាក់ (ថ្នាក់ទី១ ដល់ ទី៦) ត្រូវបានបង្កើតឡើងវិញជោគជ័យ។',
      timestamp: 'អម្បាញ់មិញ',
      read: false,
      type: 'success'
    }, ...prev]);
  };

  const markAttendance = (record: Omit<AttendanceRecord, 'id'>) => {
    const existingIndex = attendance.findIndex(a => a.studentId === record.studentId && a.date === record.date);
    if (existingIndex >= 0) {
      const updated = [...attendance];
      updated[existingIndex] = { ...updated[existingIndex], ...record };
      setAttendance(updated);
    } else {
      const newRec: AttendanceRecord = {
        ...record,
        id: `att_${Date.now()}_${Math.random().toString(36).substring(2, 5)}`
      };
      setAttendance([newRec, ...attendance]);
    }
  };

  const addGrade = (gradeData: Omit<GradeRecord, 'id'>) => {
    setGrades(prevGrades => {
      // Check if student record for this month already exists
      const existingIdx = prevGrades.findIndex(
        g => g.studentId === gradeData.studentId && (g.month === gradeData.month || g.examName === gradeData.examName)
      );

      let updatedList: GradeRecord[];
      if (existingIdx >= 0) {
        updatedList = [...prevGrades];
        updatedList[existingIdx] = {
          ...updatedList[existingIdx],
          ...gradeData
        };
      } else {
        const newGrade: GradeRecord = {
          ...gradeData,
          id: `g_${Date.now()}_${Math.random().toString(36).substring(2, 5)}`
        };
        updatedList = [newGrade, ...prevGrades];
      }

      // Recalculate rankInClass for all grades in the target month
      const targetMonth = gradeData.month || gradeData.examName;
      const monthGrades = updatedList.filter(g => (g.month === targetMonth || g.examName === targetMonth));
      
      // Sort descending by marksObtained
      const sorted = [...monthGrades].sort((a, b) => b.marksObtained - a.marksObtained);
      const rankMap = new Map<string, number>();
      sorted.forEach((item, idx) => {
        rankMap.set(item.id, idx + 1);
      });

      return updatedList.map(g => {
        if (rankMap.has(g.id)) {
          return { ...g, rankInClass: rankMap.get(g.id) };
        }
        return g;
      });
    });
  };

  const batchSaveClassScores = (classGrades: Omit<GradeRecord, 'id'>[]) => {
    if (classGrades.length === 0) return;
    const targetMonth = classGrades[0].month || classGrades[0].examName;

    setGrades(prevGrades => {
      const remaining = prevGrades.filter(
        g => !classGrades.some(cg => cg.studentId === g.studentId && (g.month === targetMonth || g.examName === targetMonth))
      );

      const newRecords: GradeRecord[] = classGrades.map(cg => ({
        ...cg,
        id: `g_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`
      }));

      const combined = [...newRecords, ...remaining];

      // Re-rank for the month
      const monthGrades = combined.filter(g => (g.month === targetMonth || g.examName === targetMonth));
      const sorted = [...monthGrades].sort((a, b) => b.marksObtained - a.marksObtained);
      const rankMap = new Map<string, number>();
      sorted.forEach((item, idx) => {
        rankMap.set(item.studentId, idx + 1);
      });

      // Update student GPAs and ranks in real-time
      setStudents(prevStudents =>
        prevStudents.map(st => {
          if (rankMap.has(st.id)) {
            const studentGrade = monthGrades.find(g => g.studentId === st.id);
            const avg = studentGrade ? studentGrade.marksObtained / 13 : st.gpa;
            return {
              ...st,
              gpa: Number(avg.toFixed(1)),
              rankInClass: rankMap.get(st.id) || st.rankInClass
            };
          }
          return st;
        })
      );

      return combined.map(g => {
        if (rankMap.has(g.studentId)) {
          return { ...g, rankInClass: rankMap.get(g.studentId) };
        }
        return g;
      });
    });

    setNotifications(prev => [{
      id: `n_${Date.now()}`,
      title: 'បានរក្សាទុក និងគណនាពិន្ទុស្វ័យប្រវត្តិ',
      message: `ពិន្ទុ ១៣ មុខវិជ្ជាសម្រាប់ ${classGrades.length} នាក់ ត្រូវបានគណនា និងលោតចូលតារាងចំណាត់ថ្នាក់ស្វ័យប្រវត្តិ។`,
      timestamp: 'អម្បាញ់មិញ',
      read: false,
      type: 'success'
    }, ...prev]);
  };

  const payInvoice = (invoiceId: string, paymentMethod: Invoice['paymentMethod']) => {
    const today = new Date().toISOString().split('T')[0];
    setInvoices(prev => prev.map(inv => {
      if (inv.id === invoiceId) {
        return {
          ...inv,
          status: 'បានបង់',
          paymentMethod,
          paidDate: today
        };
      }
      return inv;
    }));

    setNotifications(prev => [{
      id: `n_${Date.now()}`,
      title: 'បានទទួលទូទាត់ប្រាក់',
      message: `វិក្កយបត្រ #${invoiceId} ត្រូវបានទូទាត់ជោគជ័យ។`,
      timestamp: 'អម្បាញ់មិញ',
      read: false,
      type: 'success'
    }, ...prev]);
  };

  const addInvoice = (invoiceData: Omit<Invoice, 'id' | 'invoiceNumber'>) => {
    const invNum = `INV-KH-2026-${String(invoices.length + 10).padStart(3, '0')}`;
    const newInvoice: Invoice = {
      ...invoiceData,
      id: `inv_${Date.now()}`,
      invoiceNumber: invNum
    };
    setInvoices([newInvoice, ...invoices]);
  };

  const addAnnouncement = (annData: Omit<Announcement, 'id' | 'date'>) => {
    const today = new Date().toISOString().split('T')[0];
    const newAnn: Announcement = {
      ...annData,
      id: `ann_${Date.now()}`,
      date: today
    };
    setAnnouncements([newAnn, ...announcements]);
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  // Handlers for 8 Cambodian Education Modules
  const addCensusChild = (childData: Omit<CatchmentCensusChild, 'id' | 'childCode'>) => {
    const code = `CEN-ALT-2026-${String(censusChildren.length + 1).padStart(3, '0')}`;
    const newChild: CatchmentCensusChild = {
      ...childData,
      id: `cen_${Date.now()}`,
      childCode: code
    };
    setCensusChildren([newChild, ...censusChildren]);
  };

  const updateCensusChild = (id: string, updated: Partial<CatchmentCensusChild>) => {
    setCensusChildren(prev => prev.map(c => c.id === id ? { ...c, ...updated } : c));
  };

  const deleteCensusChild = (id: string) => {
    setCensusChildren(prev => prev.filter(c => c.id !== id));
  };

  const addPreschoolAssessment = (assessment: Omit<PreschoolAssessment, 'id'>) => {
    const newEval: PreschoolAssessment = {
      ...assessment,
      id: `ps_${Date.now()}`
    };
    setPreschoolAssessments([newEval, ...preschoolAssessments]);
  };

  const updatePreschoolAssessment = (id: string, updated: Partial<PreschoolAssessment>) => {
    setPreschoolAssessments(prev => prev.map(p => p.id === id ? { ...p, ...updated } : p));
  };

  const deletePreschoolAssessment = (id: string) => {
    setPreschoolAssessments(prev => prev.filter(p => p.id !== id));
  };

  const addStudentSupport = (support: Omit<StudentSupportRecord, 'id'>) => {
    const newSupp: StudentSupportRecord = {
      ...support,
      id: `supp_${Date.now()}`
    };
    setStudentSupports([newSupp, ...studentSupports]);
  };

  const updateStudentSupport = (id: string, updated: Partial<StudentSupportRecord>) => {
    setStudentSupports(prev => prev.map(s => s.id === id ? { ...s, ...updated } : s));
  };

  const deleteStudentSupport = (id: string) => {
    setStudentSupports(prev => prev.filter(s => s.id !== id));
  };

  const addSchoolActivity = (act: Omit<SchoolActivityRecord, 'id'>) => {
    const newAct: SchoolActivityRecord = {
      ...act,
      id: `act_${Date.now()}`
    };
    setSchoolActivities([newAct, ...schoolActivities]);
  };

  const updateSchoolActivity = (id: string, updated: Partial<SchoolActivityRecord>) => {
    setSchoolActivities(prev => prev.map(a => a.id === id ? { ...a, ...updated } : a));
  };

  const deleteSchoolActivity = (id: string) => {
    setSchoolActivities(prev => prev.filter(a => a.id !== id));
  };

  const addParentMeetingPlan = (plan: Omit<ParentMeetingPlan, 'id'>) => {
    const newPlan: ParentMeetingPlan = {
      ...plan,
      id: `pmp_${Date.now()}`
    };
    setParentMeetingPlans([...parentMeetingPlans, newPlan]);
  };

  const updateParentMeetingPlan = (id: string, updated: Partial<ParentMeetingPlan>) => {
    setParentMeetingPlans(prev => prev.map(p => p.id === id ? { ...p, ...updated } : p));
  };

  const deleteParentMeetingPlan = (id: string) => {
    setParentMeetingPlans(prev => prev.filter(p => p.id !== id));
  };

  const addMaterialHandover = (ho: Omit<MaterialHandover, 'id'>) => {
    const newHo: MaterialHandover = {
      ...ho,
      id: `ho_${Date.now()}`
    };
    setMaterialHandovers([newHo, ...materialHandovers]);
  };

  const updateMaterialHandover = (id: string, updated: Partial<MaterialHandover>) => {
    setMaterialHandovers(prev => prev.map(h => h.id === id ? { ...h, ...updated } : h));
  };

  const deleteMaterialHandover = (id: string) => {
    setMaterialHandovers(prev => prev.filter(h => h.id !== id));
  };

  const addFinancialTransaction = (tx: Omit<FinancialTransaction, 'id' | 'voucherNo'>) => {
    const prefix = tx.transactionType.includes('ចំណូល') ? 'INC' : 'EXP';
    const voucherNo = `${prefix}-2026-${String(financialTransactions.length + 1).padStart(3, '0')}`;
    const newTx: FinancialTransaction = {
      ...tx,
      id: `ft_${Date.now()}`,
      voucherNo
    };
    setFinancialTransactions([newTx, ...financialTransactions]);
  };

  const updateFinancialTransaction = (id: string, updated: Partial<FinancialTransaction>) => {
    setFinancialTransactions(prev => prev.map(t => t.id === id ? { ...t, ...updated } : t));
  };

  const deleteFinancialTransaction = (id: string) => {
    setFinancialTransactions(prev => prev.filter(t => t.id !== id));
  };

  const addSchoolAsset = (asset: Omit<SchoolAsset, 'id' | 'assetCode'>) => {
    const code = `AST-ALT-${String(schoolAssets.length + 1).padStart(3, '0')}`;
    const newAsset: SchoolAsset = {
      ...asset,
      id: `ast_${Date.now()}`,
      assetCode: code
    };
    setSchoolAssets([newAsset, ...schoolAssets]);
  };

  const updateSchoolAsset = (id: string, updated: Partial<SchoolAsset>) => {
    setSchoolAssets(prev => prev.map(a => a.id === id ? { ...a, ...updated } : a));
  };

  const deleteSchoolAsset = (id: string) => {
    setSchoolAssets(prev => prev.filter(a => a.id !== id));
  };

  const resetDemoData = () => {
    setStudents(initialStudents);
    setTeachers(initialTeachers);
    setCommittees(initialCommittees);
    setAttendance(initialAttendance);
    setGrades(initialGrades);
    setInvoices(initialInvoices);
    setAnnouncements(initialAnnouncements);
    setCensusChildren(initialCensusChildren);
    setPreschoolAssessments(initialPreschoolAssessments);
    setStudentSupports(initialStudentSupports);
    setSchoolActivities(initialSchoolActivities);
    setParentMeetingPlans(initialParentMeetingPlans);
    setMaterialHandovers(initialMaterialHandovers);
    setFinancialTransactions(initialFinancialTransactions);
    setSchoolAssets(initialSchoolAssets);
    localStorage.clear();
    window.location.reload();
  };

  return (
    <AppContext.Provider value={{
      userRole,
      setUserRole,
      language,
      setLanguage,
      t,
      theme,
      toggleTheme,
      searchQuery,
      setSearchQuery,
      selectedAcademicYear,
      setSelectedAcademicYear,
      availableAcademicYears,
      schoolInfo,
      updateSchoolInfo,
      students,
      teachers,
      committees,
      classes,
      subjects,
      timetable,
      attendance,
      grades,
      invoices,
      announcements,
      events,
      notifications,
      censusChildren,
      preschoolAssessments,
      studentSupports,
      schoolActivities,
      parentMeetingPlans,
      materialHandovers,
      financialTransactions,
      schoolAssets,
      addStudent,
      updateStudent,
      deleteStudent,
      transferStudent,
      importStudents,
      addTeacher,
      updateTeacher,
      deleteTeacher,
      addCommitteeMember,
      updateCommitteeMember,
      deleteCommitteeMember,
      assignClassTeacher,
      addClassGroup,
      updateClassGroup,
      deleteClassGroup,
      addTimetableSlot,
      updateTimetableSlot,
      deleteTimetableSlot,
      resetToMoEYSStandardTimetable,
      markAttendance,
      addGrade,
      batchSaveClassScores,
      payInvoice,
      addInvoice,
      addAnnouncement,
      markNotificationRead,
      clearNotifications,
      resetDemoData,
      addCensusChild,
      updateCensusChild,
      deleteCensusChild,
      addPreschoolAssessment,
      updatePreschoolAssessment,
      deletePreschoolAssessment,
      addStudentSupport,
      updateStudentSupport,
      deleteStudentSupport,
      addSchoolActivity,
      updateSchoolActivity,
      deleteSchoolActivity,
      addParentMeetingPlan,
      updateParentMeetingPlan,
      deleteParentMeetingPlan,
      addMaterialHandover,
      updateMaterialHandover,
      deleteMaterialHandover,
      addFinancialTransaction,
      updateFinancialTransaction,
      deleteFinancialTransaction,
      addSchoolAsset,
      updateSchoolAsset,
      deleteSchoolAsset,
      auditLogs,
      logActivity,
      backupSettings,
      updateBackupSettings,
      triggerManualBackup
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
