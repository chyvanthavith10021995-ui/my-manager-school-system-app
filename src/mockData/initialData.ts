import type {
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
  CatchmentCensusChild,
  PreschoolAssessment,
  StudentSupportRecord,
  SchoolActivityRecord,
  ParentMeetingPlan,
  MaterialHandover,
  FinancialTransaction,
  SchoolAsset
} from '../types';

export const initialStudents: Student[] = [
  // ថ្នាក់ទី ១ (Grade 1)
  {
    id: 's101',
    studentId: 'ALT-2026-101',
    firstName: 'សុវណ្ណារ៉ា',
    lastName: 'ឡុង',
    email: 'long.sovannara@anlongtamey.edu.kh',
    avatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=250&q=80',
    grade: 'ថ្នាក់ទី ១',
    section: 'ក',
    gender: 'ប្រុស',
    dob: '2019-03-15',
    enrollmentDate: '2025-11-01',
    guardian: {
      name: 'ឡុង សុខា',
      relationship: 'ឪពុក',
      phone: '012 888 111',
      email: 'sokha.long@gmail.com',
      occupation: 'កសិករ'
    },
    address: 'ភូមិអន្លង់តាម៉ី, ឃុំឈើទាល, ស្រុកបាណន់, ខេត្តបាត់ដំបង',
    equityCard: 'ក្រ១ (IDPoor 1)',
    status: 'កំពុងសិក្សា',
    gpa: 9.4,
    rankInClass: 1,
    attendancePercentage: 99.0
  },
  {
    id: 's102',
    studentId: 'ALT-2026-102',
    firstName: 'ស្រីលីន',
    lastName: 'ជា',
    email: 'chea.sreyleak@anlongtamey.edu.kh',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=250&q=80',
    grade: 'ថ្នាក់ទី ១',
    section: 'ក',
    gender: 'ស្រី',
    dob: '2019-07-20',
    enrollmentDate: '2025-11-01',
    guardian: {
      name: 'ជា សំអាត',
      relationship: 'ឪពុក',
      phone: '092 777 222',
      email: 'samath.chea@gmail.com',
      occupation: 'អាជីវករ'
    },
    address: 'ភូមិអន្លង់តាម៉ី, ឃុំឈើទាល, ស្រុកបាណន់, ខេត្តបាត់ដំបង',
    equityCard: 'គ្មាន (None)',
    status: 'កំពុងសិក្សា',
    gpa: 9.0,
    rankInClass: 2,
    attendancePercentage: 97.5
  },

  // ថ្នាក់ទី ២ (Grade 2)
  {
    id: 's201',
    studentId: 'ALT-2026-201',
    firstName: 'សុជាតិ',
    lastName: 'ស៊ិន',
    email: 'sin.socheat@anlongtamey.edu.kh',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=250&q=80',
    grade: 'ថ្នាក់ទី ២',
    section: 'ក',
    gender: 'ប្រុស',
    dob: '2018-05-10',
    enrollmentDate: '2024-11-01',
    guardian: {
      name: 'ស៊ិន ប៊ុនធឿន',
      relationship: 'ឪពុក',
      phone: '015 666 333',
      email: 'bunthoeun.sin@yahoo.com',
      occupation: 'គ្រូបង្រៀន'
    },
    address: 'ភូមិអន្លង់តាម៉ី, ឃុំឈើទាល, ស្រុកបាណន់, ខេត្តបាត់ដំបង',
    equityCard: 'ក្រ២ (IDPoor 2)',
    status: 'កំពុងសិក្សា',
    gpa: 9.3,
    rankInClass: 1,
    attendancePercentage: 98.0
  },
  {
    id: 's202',
    studentId: 'ALT-2026-202',
    firstName: 'សុវណ្ណី',
    lastName: 'មាស',
    email: 'meas.sovannary@anlongtamey.edu.kh',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=250&q=80',
    grade: 'ថ្នាក់ទី ២',
    section: 'ក',
    gender: 'ស្រី',
    dob: '2018-09-12',
    enrollmentDate: '2024-11-01',
    guardian: {
      name: 'មាស សុផល',
      relationship: 'ឪពុក',
      phone: '017 555 444',
      email: 'sophal.meas@gmail.com',
      occupation: 'កសិករ'
    },
    address: 'ភូមិអន្លង់តាម៉ី, ឃុំឈើទាល, ស្រុកបាណន់, ខេត្តបាត់ដំបង',
    equityCard: 'គ្មាន (None)',
    status: 'កំពុងសិក្សា',
    gpa: 8.8,
    rankInClass: 2,
    attendancePercentage: 96.0
  },

  // ថ្នាក់ទី ៣ (Grade 3)
  {
    id: 's301',
    studentId: 'ALT-2026-301',
    firstName: 'សម្បត្តិ',
    lastName: 'ហេង',
    email: 'heng.sambath@anlongtamey.edu.kh',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',
    grade: 'ថ្នាក់ទី ៣',
    section: 'ក',
    gender: 'ប្រុស',
    dob: '2017-02-18',
    enrollmentDate: '2023-11-01',
    guardian: {
      name: 'ហេង ស្រ៊ុន',
      relationship: 'ឪពុក',
      phone: '012 444 555',
      email: 'srun.heng@gmail.com',
      occupation: 'អាជីវករ'
    },
    address: 'ភូមិអន្លង់តាម៉ី, ឃុំឈើទាល, ស្រុកបាណន់, ខេត្តបាត់ដំបង',
    equityCard: 'ក្រ១ (IDPoor 1)',
    status: 'កំពុងសិក្សា',
    gpa: 9.5,
    rankInClass: 1,
    attendancePercentage: 99.5
  },
  {
    id: 's302',
    studentId: 'ALT-2026-302',
    firstName: 'ស្រីម៉ៃ',
    lastName: 'អ៊ុំ',
    email: 'oum.sreyleak@anlongtamey.edu.kh',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
    grade: 'ថ្នាក់ទី ៣',
    section: 'ក',
    gender: 'ស្រី',
    dob: '2017-10-05',
    enrollmentDate: '2023-11-01',
    guardian: {
      name: 'អ៊ុំ សុភាព',
      relationship: 'ម្តាយ',
      phone: '092 333 666',
      email: 'sopheap.oum@outlook.com',
      occupation: 'កសិករ'
    },
    address: 'ភូមិអន្លង់តាម៉ី, ឃុំឈើទាល, ស្រុកបាណន់, ខេត្តបាត់ដំបង',
    equityCard: 'គ្មាន (None)',
    status: 'កំពុងសិក្សា',
    gpa: 9.1,
    rankInClass: 2,
    attendancePercentage: 97.0
  },

  // ថ្នាក់ទី ៤ (Grade 4)
  {
    id: 's1',
    studentId: 'ALT-2026-001',
    firstName: 'សុភា',
    lastName: 'ចាន់',
    email: 'chan.sophea@anlongtamey.edu.kh',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=250&q=80',
    grade: 'ថ្នាក់ទី ៤',
    section: 'ក',
    gender: 'ស្រី',
    dob: '2016-04-14',
    enrollmentDate: '2022-11-01',
    guardian: {
      name: 'ចាន់ សុខុម',
      relationship: 'ឪពុក',
      phone: '012 345 678',
      email: 'sokhum.chan@gmail.com',
      occupation: 'កសិករ'
    },
    address: 'ភូមិអន្លង់តាម៉ី, ឃុំឈើទាល, ស្រុកបាណន់, ខេត្តបាត់ដំបង',
    equityCard: 'ក្រ១ (IDPoor 1)',
    status: 'កំពុងសិក្សា',
    gpa: 9.6,
    rankInClass: 1,
    attendancePercentage: 98.5
  },
  {
    id: 's2',
    studentId: 'ALT-2026-002',
    firstName: 'រតនា',
    lastName: 'សុខ',
    email: 'sok.rothana@anlongtamey.edu.kh',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
    grade: 'ថ្នាក់ទី ៤',
    section: 'ក',
    gender: 'ប្រុស',
    dob: '2016-08-22',
    enrollmentDate: '2022-11-01',
    guardian: {
      name: 'គឹម ស្រីមុំ',
      relationship: 'ម្តាយ',
      phone: '092 876 543',
      email: 'sreymom.kim@outlook.com',
      occupation: 'អាជីវករ'
    },
    address: 'ភូមិអន្លង់តាម៉ី, ឃុំឈើទាល, ស្រុកបាណន់, ខេត្តបាត់ដំបង',
    equityCard: 'ក្រ២ (IDPoor 2)',
    status: 'កំពុងសិក្សា',
    gpa: 9.2,
    rankInClass: 2,
    attendancePercentage: 96.0
  },
  {
    id: 's3',
    studentId: 'ALT-2026-003',
    firstName: 'វិចិត្រ',
    lastName: 'កែវ',
    email: 'keo.vichet@anlongtamey.edu.kh',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=250&q=80',
    grade: 'ថ្នាក់ទី ៤',
    section: 'ខ',
    gender: 'ប្រុស',
    dob: '2016-01-11',
    enrollmentDate: '2022-11-01',
    guardian: {
      name: 'កែវ សំអ៊ាង',
      relationship: 'ឪពុក',
      phone: '015 345 678',
      email: 'samoeang.keo@yahoo.com',
      occupation: 'គ្រូបង្រៀន'
    },
    address: 'ភូមិអន្លង់តាម៉ី, ឃុំឈើទាល, ស្រុកបាណន់, ខេត្តបាត់ដំបង',
    equityCard: 'គ្មាន (None)',
    status: 'កំពុងសិក្សា',
    gpa: 8.5,
    rankInClass: 1,
    attendancePercentage: 94.2
  },

  // ថ្នាក់ទី ៥ (Grade 5)
  {
    id: 's4',
    studentId: 'ALT-2026-004',
    firstName: 'ស្រីណែត',
    lastName: 'ហេង',
    email: 'heng.sreynet@anlongtamey.edu.kh',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=250&q=80',
    grade: 'ថ្នាក់ទី ៥',
    section: 'ក',
    gender: 'ស្រី',
    dob: '2015-11-03',
    enrollmentDate: '2021-11-01',
    guardian: {
      name: 'ហេង ប៊ុនធឿន',
      relationship: 'ឪពុក',
      phone: '017 654 321',
      email: 'bunthoeun.h@gmail.com',
      occupation: 'កសិករ'
    },
    address: 'ភូមិអន្លង់តាម៉ី, ឃុំឈើទាល, ស្រុកបាណន់, ខេត្តបាត់ដំបង',
    equityCard: 'ក្រ១ (IDPoor 1)',
    status: 'កំពុងសិក្សា',
    gpa: 9.4,
    rankInClass: 1,
    attendancePercentage: 99.0
  },

  // ថ្នាក់ទី ៦ (Grade 6)
  {
    id: 's601',
    studentId: 'ALT-2026-601',
    firstName: 'វិរៈ',
    lastName: 'ម៉ក់',
    email: 'mok.virak@anlongtamey.edu.kh',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80',
    grade: 'ថ្នាក់ទី ៦',
    section: 'ក',
    gender: 'ប្រុស',
    dob: '2014-06-25',
    enrollmentDate: '2020-11-01',
    guardian: {
      name: 'ប្រុញ វឿន',
      relationship: 'ឪពុក',
      phone: '012 222 999',
      email: 'theara.mok@gmail.com',
      occupation: 'មន្ត្រីរាជការ'
    },
    address: 'ភូមិអន្លង់តាម៉ី, ឃុំឈើទាល, ស្រុកបាណន់, ខេត្តបាត់ដំបង',
    equityCard: 'គ្មាន (None)',
    status: 'កំពុងសិក្សា',
    gpa: 9.7,
    rankInClass: 1,
    attendancePercentage: 99.2
  },
  {
    id: 's602',
    studentId: 'ALT-2026-602',
    firstName: 'ស្រីពិភព',
    lastName: 'ប៉ែន',
    email: 'pen.sreypipob@anlongtamey.edu.kh',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=250&q=80',
    grade: 'ថ្នាក់ទី ៦',
    section: 'ក',
    gender: 'ស្រី',
    dob: '2014-08-14',
    enrollmentDate: '2020-11-01',
    guardian: {
      name: 'ប៉ែន សំអូន',
      relationship: 'ម្តាយ',
      phone: '092 111 444',
      email: 'samoun.pen@gmail.com',
      occupation: 'គ្រូបង្រៀន'
    },
    address: 'ភូមិអន្លង់តាម៉ី, ឃុំឈើទាល, ស្រុកបាណន់, ខេត្តបាត់ដំបង',
    equityCard: 'ក្រ២ (IDPoor 2)',
    status: 'កំពុងសិក្សា',
    gpa: 9.2,
    rankInClass: 2,
    attendancePercentage: 97.8
  },
  {
    id: 's103',
    studentId: 'ALT-2026-103',
    firstName: 'បុត្រា',
    lastName: 'គឹម',
    email: 'kim.botra@anlongtamey.edu.kh',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=250&q=80',
    grade: 'ថ្នាក់ទី ១',
    section: 'ខ',
    gender: 'ប្រុស',
    dob: '2019-04-10',
    enrollmentDate: '2025-11-01',
    guardian: {
      name: 'គឹម ចាន់ណា',
      relationship: 'ឪពុក',
      phone: '012 333 444',
      email: 'channa.kim@gmail.com',
      occupation: 'កសិករ'
    },
    address: 'ភូមិអន្លង់តាម៉ី, ឃុំឈើទាល, ស្រុកបាណន់, ខេត្តបាត់ដំបង',
    equityCard: 'ក្រ២ (IDPoor 2)',
    status: 'កំពុងសិក្សា',
    gpa: 8.9,
    rankInClass: 1,
    attendancePercentage: 98.0
  },
  {
    id: 's104',
    studentId: 'ALT-2026-104',
    firstName: 'ស្រីពេជ្រ',
    lastName: 'ញ៉ែម',
    email: 'nhem.sreypich@anlongtamey.edu.kh',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=250&q=80',
    grade: 'ថ្នាក់ទី ១',
    section: 'ខ',
    gender: 'ស្រី',
    dob: '2019-09-02',
    enrollmentDate: '2025-11-01',
    guardian: {
      name: 'ញ៉ែម សារ៉ាត់',
      relationship: 'ម្តាយ',
      phone: '097 555 666',
      email: 'sarat.nhem@yahoo.com',
      occupation: 'អាជីវករ'
    },
    address: 'ភូមិអន្លង់តាម៉ី, ឃុំឈើទាល, ស្រុកបាណន់, ខេត្តបាត់ដំបង',
    equityCard: 'គ្មាន (None)',
    status: 'កំពុងសិក្សា',
    gpa: 8.7,
    rankInClass: 2,
    attendancePercentage: 96.5
  },
  {
    id: 's203',
    studentId: 'ALT-2026-203',
    firstName: 'ណារិទ្ធ',
    lastName: 'អ៊ុក',
    email: 'ouk.narith@anlongtamey.edu.kh',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',
    grade: 'ថ្នាក់ទី ២',
    section: 'ខ',
    gender: 'ប្រុស',
    dob: '2018-03-22',
    enrollmentDate: '2024-11-01',
    guardian: {
      name: 'អ៊ុក វិបុល',
      relationship: 'ឪពុក',
      phone: '012 999 888',
      email: 'vibol.ouk@gmail.com',
      occupation: 'កសិករ'
    },
    address: 'ភូមិអន្លង់តាម៉ី, ឃុំឈើទាល, ស្រុកបាណន់, ខេត្តបាត់ដំបង',
    equityCard: 'ក្រ១ (IDPoor 1)',
    status: 'កំពុងសិក្សា',
    gpa: 9.1,
    rankInClass: 1,
    attendancePercentage: 97.0
  },
  {
    id: 's204',
    studentId: 'ALT-2026-204',
    firstName: 'សុធីតា',
    lastName: 'ផាន់',
    email: 'phan.sothida@anlongtamey.edu.kh',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=250&q=80',
    grade: 'ថ្នាក់ទី ២',
    section: 'ខ',
    gender: 'ស្រី',
    dob: '2018-11-15',
    enrollmentDate: '2024-11-01',
    guardian: {
      name: 'ផាន់ ស្រីម៉ៅ',
      relationship: 'ម្តាយ',
      phone: '092 111 333',
      email: 'sreymau.phan@gmail.com',
      occupation: 'អាជីវករ'
    },
    address: 'ភូមិអន្លង់តាម៉ី, ឃុំឈើទាល, ស្រុកបាណន់, ខេត្តបាត់ដំបង',
    equityCard: 'គ្មាន (None)',
    status: 'កំពុងសិក្សា',
    gpa: 8.6,
    rankInClass: 2,
    attendancePercentage: 95.5
  },
  {
    id: 's303',
    studentId: 'ALT-2026-303',
    firstName: 'ចាន់ថា',
    lastName: 'ម៉ែន',
    email: 'men.chantha@anlongtamey.edu.kh',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80',
    grade: 'ថ្នាក់ទី ៣',
    section: 'ខ',
    gender: 'ប្រុស',
    dob: '2017-06-14',
    enrollmentDate: '2023-11-01',
    guardian: {
      name: 'ម៉ែន សំអឿន',
      relationship: 'ឪពុក',
      phone: '017 888 999',
      email: 'samoeun.men@gmail.com',
      occupation: 'កសិករ'
    },
    address: 'ភូមិអន្លង់តាម៉ី, ឃុំឈើទាល, ស្រុកបាណន់, ខេត្តបាត់ដំបង',
    equityCard: 'ក្រ២ (IDPoor 2)',
    status: 'កំពុងសិក្សា',
    gpa: 9.0,
    rankInClass: 1,
    attendancePercentage: 98.2
  },
  {
    id: 's304',
    studentId: 'ALT-2026-304',
    firstName: 'គន្ធា',
    lastName: 'សន',
    email: 'son.kunthea@anlongtamey.edu.kh',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80',
    grade: 'ថ្នាក់ទី ៣',
    section: 'ខ',
    gender: 'ស្រី',
    dob: '2017-12-01',
    enrollmentDate: '2023-11-01',
    guardian: {
      name: 'សន ធារ៉ា',
      relationship: 'ឪពុក',
      phone: '092 666 444',
      email: 'theara.son@gmail.com',
      occupation: 'មន្ត្រីរាជការ'
    },
    address: 'ភូមិអន្លង់តាម៉ី, ឃុំឈើទាល, ស្រុកបាណន់, ខេត្តបាត់ដំបង',
    equityCard: 'គ្មាន (None)',
    status: 'កំពុងសិក្សា',
    gpa: 8.9,
    rankInClass: 2,
    attendancePercentage: 96.0
  },
  {
    id: 's401',
    studentId: 'ALT-2026-401',
    firstName: 'ស្រីនាង',
    lastName: 'អ៊ិន',
    email: 'in.sreyneang@anlongtamey.edu.kh',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=250&q=80',
    grade: 'ថ្នាក់ទី ៤',
    section: 'ខ',
    gender: 'ស្រី',
    dob: '2016-10-18',
    enrollmentDate: '2022-11-01',
    guardian: {
      name: 'អ៊ិន សុភាព',
      relationship: 'ម្តាយ',
      phone: '012 777 999',
      email: 'sopheap.in@gmail.com',
      occupation: 'កសិករ'
    },
    address: 'ភូមិអន្លង់តាម៉ី, ឃុំឈើទាល, ស្រុកបាណន់, ខេត្តបាត់ដំបង',
    equityCard: 'ក្រ១ (IDPoor 1)',
    status: 'កំពុងសិក្សា',
    gpa: 8.8,
    rankInClass: 2,
    attendancePercentage: 96.0
  },
  {
    id: 's501',
    studentId: 'ALT-2026-501',
    firstName: 'វឌ្ឍនៈ',
    lastName: 'ឆាយ',
    email: 'chhay.vathana@anlongtamey.edu.kh',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',
    grade: 'ថ្នាក់ទី ៥',
    section: 'ក',
    gender: 'ប្រុស',
    dob: '2015-05-19',
    enrollmentDate: '2021-11-01',
    guardian: {
      name: 'ឆាយ សុវណ្ណ',
      relationship: 'ឪពុក',
      phone: '092 333 111',
      email: 'sovann.chhay@gmail.com',
      occupation: 'អាជីវករ'
    },
    address: 'ភូមិអន្លង់តាម៉ី, ឃុំឈើទាល, ស្រុកបាណន់, ខេត្តបាត់ដំបង',
    equityCard: 'គ្មាន (None)',
    status: 'កំពុងសិក្សា',
    gpa: 9.0,
    rankInClass: 2,
    attendancePercentage: 97.2
  },
  {
    id: 's502',
    studentId: 'ALT-2026-502',
    firstName: 'សុវណ្ណារិទ្ធ',
    lastName: 'ព្រំ',
    email: 'prom.sovannarith@anlongtamey.edu.kh',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=250&q=80',
    grade: 'ថ្នាក់ទី ៥',
    section: 'ខ',
    gender: 'ប្រុស',
    dob: '2015-02-14',
    enrollmentDate: '2021-11-01',
    guardian: {
      name: 'ព្រំ សុខា',
      relationship: 'ឪពុក',
      phone: '015 888 777',
      email: 'sokha.prom@gmail.com',
      occupation: 'កសិករ'
    },
    address: 'ភូមិអន្លង់តាម៉ី, ឃុំឈើទាល, ស្រុកបាណន់, ខេត្តបាត់ដំបង',
    equityCard: 'ក្រ២ (IDPoor 2)',
    status: 'កំពុងសិក្សា',
    gpa: 9.1,
    rankInClass: 1,
    attendancePercentage: 98.0
  },
  {
    id: 's503',
    studentId: 'ALT-2026-503',
    firstName: 'ស្រីអូន',
    lastName: 'យឹម',
    email: 'yim.sreyoun@anlongtamey.edu.kh',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=250&q=80',
    grade: 'ថ្នាក់ទី ៥',
    section: 'ខ',
    gender: 'ស្រី',
    dob: '2015-09-28',
    enrollmentDate: '2021-11-01',
    guardian: {
      name: 'យឹម សំអាត',
      relationship: 'ម្តាយ',
      phone: '097 222 555',
      email: 'samath.yim@yahoo.com',
      occupation: 'អាជីវករ'
    },
    address: 'ភូមិអន្លង់តាម៉ី, ឃុំឈើទាល, ស្រុកបាណន់, ខេត្តបាត់ដំបង',
    equityCard: 'គ្មាន (None)',
    status: 'កំពុងសិក្សា',
    gpa: 8.7,
    rankInClass: 2,
    attendancePercentage: 95.8
  },
  {
    id: 's603',
    studentId: 'ALT-2026-603',
    firstName: 'សម្បត្តិ',
    lastName: 'លី',
    email: 'ly.sambath@anlongtamey.edu.kh',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',
    grade: 'ថ្នាក់ទី ៦',
    section: 'ខ',
    gender: 'ប្រុស',
    dob: '2014-03-11',
    enrollmentDate: '2020-11-01',
    guardian: {
      name: 'លី សុក្ខា',
      relationship: 'ឪពុក',
      phone: '012 555 777',
      email: 'sokha.ly@gmail.com',
      occupation: 'អាជីវករ'
    },
    address: 'ភូមិអន្លង់តាម៉ី, ឃុំឈើទាល, ស្រុកបាណន់, ខេត្តបាត់ដំបង',
    equityCard: 'ក្រ១ (IDPoor 1)',
    status: 'កំពុងសិក្សា',
    gpa: 9.3,
    rankInClass: 1,
    attendancePercentage: 98.4
  },
  {
    id: 's604',
    studentId: 'ALT-2026-604',
    firstName: 'ស្រីនី',
    lastName: 'អ៊ែត',
    email: 'et.sreyny@anlongtamey.edu.kh',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
    grade: 'ថ្នាក់ទី ៦',
    section: 'ខ',
    gender: 'ស្រី',
    dob: '2014-11-20',
    enrollmentDate: '2020-11-01',
    guardian: {
      name: 'អ៊ែត ចាន់នី',
      relationship: 'ម្តាយ',
      phone: '097 444 111',
      email: 'channy.et@gmail.com',
      occupation: 'កសិករ'
    },
    address: 'ភូមិអន្លង់តាម៉ី, ឃុំឈើទាល, ស្រុកបាណន់, ខេត្តបាត់ដំបង',
    equityCard: 'គ្មាន (None)',
    status: 'កំពុងសិក្សា',
    gpa: 8.9,
    rankInClass: 2,
    attendancePercentage: 96.2
  }
];

export const initialTeachers: Teacher[] = [
  {
    id: 't_principal',
    employeeId: 'EMP-ALT-001',
    firstName: 'សារ៉ាំ',
    lastName: 'លោកនាយក ឈិត',
    email: 'chhit.saram@anlongtamey.edu.kh',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=250&q=80',
    phone: '012 888 999',
    gender: 'ប្រុស',
    teacherCategory: 'គ្រូក្របខ័ណ្ឌ',
    subjects: ['គ្រប់គ្រងសាលារៀន', 'ដឹកនាំរដ្ឋបាល'],
    assignedClasses: ['គ្រប់ថ្នាក់ (ថ្នាក់ទី១-៦)'],
    department: 'គណៈគ្រប់គ្រង (នាយកសាលា)',
    qualification: 'បរិញ្ញាបត្រជាន់ខ្ពស់គ្រប់គ្រងអប់រំ',
    joiningDate: '2015-05-01',
    status: 'បម្រើការងារ'
  },
  {
    id: 't_vprincipal',
    employeeId: 'EMP-ALT-002',
    firstName: 'វឿន',
    lastName: 'លោកនាយករង ប្រុញ',
    email: 'pronh.voeun@anlongtamey.edu.kh',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',
    phone: '012 222 999',
    gender: 'ប្រុស',
    teacherCategory: 'គ្រូក្របខ័ណ្ឌ',
    subjects: ['រដ្ឋបាលសាលា', 'កាលវិភាគ & ផែនការ'],
    assignedClasses: ['គ្រប់ថ្នាក់ (ថ្នាក់ទី១-៦)'],
    department: 'គណៈគ្រប់គ្រង (នាយករង)',
    qualification: 'បរិញ្ញាបត្រគរុកោសល្យ',
    joiningDate: '2018-02-01',
    status: 'បម្រើការងារ'
  },
  {
    id: 't_secretary',
    employeeId: 'EMP-ALT-003',
    firstName: 'ជីវន្ថា',
    lastName: 'លោក វ៉ិត',
    email: 'vit.chivantha@anlongtamey.edu.kh',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=250&q=80',
    phone: '092 333 444',
    gender: 'ប្រុស',
    teacherCategory: 'គ្រូក្របខ័ណ្ឌ',
    subjects: ['កិច្ចការរដ្ឋបាល', 'សំបុត្រ & ឯកសារ'],
    assignedClasses: ['ការិយាល័យរដ្ឋបាល'],
    department: 'ផ្នែករដ្ឋបាល & លេខាធិការ',
    qualification: 'បរិញ្ញាបត្ររដ្ឋបាលសាធារណៈ',
    joiningDate: '2020-03-01',
    status: 'បម្រើការងារ'
  },
  {
    id: 't_librarian',
    employeeId: 'EMP-ALT-004',
    firstName: 'រតនា',
    lastName: 'អ្នកគ្រូ សឹង',
    email: 'soeng.rothana@anlongtamey.edu.kh',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80',
    phone: '097 888 777',
    gender: 'ស្រី',
    teacherCategory: 'គ្រូក្របខ័ណ្ឌ',
    subjects: ['បណ្ណាល័យ', 'ក្លឹបអំណាន'],
    assignedClasses: ['បន្ទប់បណ្ណាល័យ'],
    department: 'បណ្ណាល័យ & ធនធានសិក្សា',
    qualification: 'បរិញ្ញាបត្រព័ត៌មានវិទ្យា & បណ្ណារក្ស',
    joiningDate: '2021-01-15',
    status: 'បម្រើការងារ'
  },
  {
    id: 't4',
    employeeId: 'EMP-ALT-104',
    firstName: 'ចាន់ធី',
    lastName: 'អ្នកគ្រូ សុខ',
    email: 'sok.chanthy@anlongtamey.edu.kh',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=250&q=80',
    phone: '012 333 777',
    gender: 'ស្រី',
    teacherCategory: 'គ្រូក្របខ័ណ្ឌ',
    subjects: ['អំណាន', 'ការស្ដាប់', 'សរសេរតាមអាន', 'គណិតវិទ្យា', 'សីលធម៌'],
    assignedClasses: ['ថ្នាក់ទី ១-ក'],
    department: 'បឋមសិក្សាកម្រិតទាប (ថ្នាក់ទី១)',
    qualification: 'បរិញ្ញាបត្រគរុកោសល្យ (បឋមសិក្សា)',
    joiningDate: '2017-10-01',
    status: 'បម្រើការងារ'
  },
  {
    id: 't8',
    employeeId: 'EMP-ALT-108',
    firstName: 'សុផល',
    lastName: 'លោកគ្រូ ឈិត',
    email: 'chhit.sophal@anlongtamey.edu.kh',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',
    phone: '015 111 888',
    gender: 'ប្រុស',
    teacherCategory: 'គ្រូកិច្ចសន្យា',
    subjects: ['អំណាន', 'ការស្ដាប់', 'គណិតវិទ្យា', 'សីលធម៌'],
    assignedClasses: ['ថ្នាក់ទី ១-ខ'],
    department: 'បឋមសិក្សាកម្រិតទាប (ថ្នាក់ទី១)',
    qualification: 'បរិញ្ញាបត្រគរុកោសល្យ',
    joiningDate: '2019-10-01',
    status: 'បម្រើការងារ'
  },
  {
    id: 't5',
    employeeId: 'EMP-ALT-105',
    firstName: 'សុជាតិ',
    lastName: 'លោកគ្រូ ចាន់',
    email: 'chan.socheat@anlongtamey.edu.kh',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',
    phone: '092 444 888',
    gender: 'ប្រុស',
    teacherCategory: 'គ្រូក្របខ័ណ្ឌ',
    subjects: ['អំណាន', 'ការស្ដាប់', 'សរសេរតាមអាន', 'គណិតវិទ្យា', 'អប់រំបំណិនជីវិត'],
    assignedClasses: ['ថ្នាក់ទី ២-ក'],
    department: 'បឋមសិក្សាកម្រិតទាប (ថ្នាក់ទី២)',
    qualification: 'បរិញ្ញាបត្រគរុកោសល្យ',
    joiningDate: '2019-09-01',
    status: 'បម្រើការងារ'
  },
  {
    id: 't9',
    employeeId: 'EMP-ALT-109',
    firstName: 'ស្រីណុច',
    lastName: 'អ្នកគ្រូ លឹម',
    email: 'lim.sreynoch@anlongtamey.edu.kh',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80',
    phone: '092 999 333',
    gender: 'ស្រី',
    teacherCategory: 'គ្រូផ្អែកលើកិច្ចព្រមព្រៀង',
    subjects: ['អំណាន', 'ការស្ដាប់', 'គណិតវិទ្យា', 'អប់រំកាយ'],
    assignedClasses: ['ថ្នាក់ទី ២-ខ'],
    department: 'បឋមសិក្សាកម្រិតទាប (ថ្នាក់ទី២)',
    qualification: 'បរិញ្ញាបត្រអប់រំ',
    joiningDate: '2020-02-01',
    status: 'បម្រើការងារ'
  },
  {
    id: 't6',
    employeeId: 'EMP-ALT-106',
    firstName: 'សុផានី',
    lastName: 'អ្នកគ្រូ មាស',
    email: 'meas.sophany@anlongtamey.edu.kh',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80',
    phone: '088 555 999',
    gender: 'ស្រី',
    teacherCategory: 'គ្រូក្របខ័ណ្ឌ',
    subjects: ['អំណាន', 'ការស្ដាប់', 'សរសេរតាមអាន', 'គណិតវិទ្យា', 'វិទ្យាសាស្ត្រ'],
    assignedClasses: ['ថ្នាក់ទី ៣-ក'],
    department: 'បឋមសិក្សាកម្រិតទាប (ថ្នាក់ទី៣)',
    qualification: 'បរិញ្ញាបត្រអប់រំ',
    joiningDate: '2018-01-15',
    status: 'បម្រើការងារ'
  },
  {
    id: 't10',
    employeeId: 'EMP-ALT-110',
    firstName: 'សំអ៊ាង',
    lastName: 'លោកគ្រូ កែវ',
    email: 'keo.samoeang@anlongtamey.edu.kh',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=250&q=80',
    phone: '015 345 678',
    gender: 'ប្រុស',
    teacherCategory: 'គ្រូកិច្ចសន្យា',
    subjects: ['គណិតវិទ្យា', 'វិទ្យាសាស្ត្រ', 'ភូមិវិទ្យា'],
    assignedClasses: ['ថ្នាក់ទី ៣-ខ'],
    department: 'បឋមសិក្សាកម្រិតទាប (ថ្នាក់ទី៣)',
    qualification: 'បរិញ្ញាបត្រគរុកោសល្យ',
    joiningDate: '2017-05-01',
    status: 'បម្រើការងារ'
  },
  {
    id: 't1',
    employeeId: 'EMP-ALT-101',
    firstName: 'ស្រីពៅ',
    lastName: 'អ្នកគ្រូ គឹម',
    email: 'kim.sreypov@anlongtamey.edu.kh',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80',
    phone: '012 111 223',
    gender: 'ស្រី',
    teacherCategory: 'គ្រូក្របខ័ណ្ឌ',
    subjects: ['អំណាន', 'ការស្ដាប់', 'សរសេរតាមអាន', 'តែងសេចក្ដី', 'គណិតវិទ្យា'],
    assignedClasses: ['ថ្នាក់ទី ៤-ក'],
    department: 'បឋមសិក្សាកម្រិតខ្ពស់ (ថ្នាក់ទី៤)',
    qualification: 'បរិញ្ញាបត្រគរុកោសល្យ (បឋមសិក្សា)',
    joiningDate: '2016-10-01',
    status: 'បម្រើការងារ'
  },
  {
    id: 't3',
    employeeId: 'EMP-ALT-103',
    firstName: 'សុផល',
    lastName: 'លោកគ្រូ អ៊ុក',
    email: 'ouk.sophal@anlongtamey.edu.kh',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=250&q=80',
    phone: '088 333 445',
    gender: 'ប្រុស',
    teacherCategory: 'គ្រូផ្អែកលើកិច្ចព្រមព្រៀង',
    subjects: ['អប់រំកាយ', 'អប់រំបំណិនជីវិត', 'ភាសាបរទេស'],
    assignedClasses: ['ថ្នាក់ទី ៤-ខ'],
    department: 'បឋមសិក្សាកម្រិតខ្ពស់ (ថ្នាក់ទី៤)',
    qualification: 'គរុកោសល្យកាយអប់រំ',
    joiningDate: '2020-01-10',
    status: 'បម្រើការងារ'
  },
  {
    id: 't2',
    employeeId: 'EMP-ALT-102',
    firstName: 'ដារ៉ា',
    lastName: 'លោកគ្រូ ស៊ុន',
    email: 'sun.dara@anlongtamey.edu.kh',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=250&q=80',
    phone: '092 222 334',
    gender: 'ប្រុស',
    teacherCategory: 'គ្រូក្របខ័ណ្ឌ',
    subjects: ['វិទ្យាសាស្ត្រ', 'សីលធម៌', 'ភូមិវិទ្យា', 'ប្រវត្តិវិទ្យា', 'គេហវិទ្យា'],
    assignedClasses: ['ថ្នាក់ទី ៥-ក'],
    department: 'បឋមសិក្សាកម្រិតខ្ពស់ (ថ្នាក់ទី៥)',
    qualification: 'បរិញ្ញាបត្រអប់រំ',
    joiningDate: '2018-09-01',
    status: 'បម្រើការងារ'
  },
  {
    id: 't11',
    employeeId: 'EMP-ALT-111',
    firstName: 'ស្រីម៉ុំ',
    lastName: 'អ្នកគ្រូ ហេង',
    email: 'heng.sreymom@anlongtamey.edu.kh',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=250&q=80',
    phone: '017 888 444',
    gender: 'ស្រី',
    teacherCategory: 'គ្រូកិច្ចសន្យា',
    subjects: ['តែងសេចក្ដី', 'អំណាន', 'ប្រវត្តិវិទ្យា'],
    assignedClasses: ['ថ្នាក់ទី ៥-ខ'],
    department: 'បឋមសិក្សាកម្រិតខ្ពស់ (ថ្នាក់ទី៥)',
    qualification: 'បរិញ្ញាបត្រគរុកោសល្យ',
    joiningDate: '2019-04-01',
    status: 'បម្រើការងារ'
  },
  {
    id: 't7',
    employeeId: 'EMP-ALT-107',
    firstName: 'សំអាត',
    lastName: 'លោកគ្រូ គង់',
    email: 'kong.samath@anlongtamey.edu.kh',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80',
    phone: '012 999 000',
    gender: 'ប្រុស',
    teacherCategory: 'គ្រូក្របខ័ណ្ឌ',
    subjects: ['គណិតវិទ្យា', 'ភាសាខ្មែរ', 'ប្រវត្តិវិទ្យា'],
    assignedClasses: ['ថ្នាក់ទី ៦-ក'],
    department: 'បឋមសិក្សាកម្រិតខ្ពស់ (ថ្នាក់ទី៦)',
    qualification: 'បរិញ្ញាបត្រគ្រប់គ្រងអប់រំ',
    joiningDate: '2015-05-01',
    status: 'បម្រើការងារ'
  },
  {
    id: 't12',
    employeeId: 'EMP-ALT-112',
    firstName: 'ស្រីពិភព',
    lastName: 'អ្នកគ្រូ រតនា',
    email: 'rothana.sreypipob@anlongtamey.edu.kh',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80',
    phone: '092 111 444',
    gender: 'ស្រី',
    teacherCategory: 'គ្រូផ្អែកលើកិច្ចព្រមព្រៀង',
    subjects: ['វិទ្យាសាស្ត្រ', 'ភាសាបរទេស', 'គណិតវិទ្យា'],
    assignedClasses: ['ថ្នាក់ទី ៦-ខ'],
    department: 'បឋមសិក្សាកម្រិតខ្ពស់ (ថ្នាក់ទី៦)',
    qualification: 'បរិញ្ញាបត្រអប់រំ',
    joiningDate: '2018-11-01',
    status: 'បម្រើការងារ'
  }
];

export const initialCommittees: CommitteeMember[] = [
  // ================= គគថ (School Support Committee / SSC) =================
  {
    id: 'ssc_1',
    committeeType: 'គគថ',
    name: 'លោកតា ស៊ុន សុខុម',
    gender: 'ប្រុស',
    role: 'ប្រធានគណៈកម្មាធិការ',
    externalRole: 'ចាស់ព្រឹទ្ធាចារ្យ & ឥស្សរជនសហគមន៍ភូមិអន្លង់តាម៉ី',
    phone: '012 888 100',
    email: 'sokhum.sun@community.org.kh',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=250&q=80',
    joinedYear: '២០២០',
    education: 'អតីតគ្រូបង្រៀននិវត្តន៍ & បរិញ្ញាបត្រអក្សរសាស្ត្រ',
    biography: 'លោកតា ស៊ុន សុខុម កើតនៅឆ្នាំ១៩៥៤ នៅភូមិអន្លង់តាម៉ី ឃុំឈើទាល ស្រុកបាណន់ ខេត្តបាត់ដំបង។ លោកជាអតីតគ្រូបង្រៀនដែលមានបទពិសោធន៍ជាង ៣៥ ឆ្នាំ និងជាមេដឹកនាំសហគមន៍គំរូ។ លោកបានដឹកនាំគណៈកម្មាធិការទ្រទ្រង់សាលារៀន (គគថ) តាំងពីឆ្នាំ២០២០ ដោយបានកៀងគរថវិកាកសាងអាគារសិក្សា បន្ទប់ទឹកអនាម័យ និងសួនច្បារបៃតងសម្រាប់សិស្សានុសិស្ស។',
    responsibilities: [
      'ដឹកនាំការប្រជុំគណៈកម្មាធិការទ្រទ្រង់សាលារៀន (គគថ) ប្រចាំត្រីមាស',
      'កៀងគរធនធាន និងជំនួយពីសប្បុរសជន និងអតីតសិស្ស',
      'ជួយសម្របសម្រួលទំនាក់ទំនងរវាងអាជ្ញាធរដែនដី និងសាលារៀន',
      'ត្រួតពិនិត្យការកសាង និងថែទាំហេដ្ឋារចនាសម្ព័ន្ធសាលារៀន'
    ],
    order: 1
  },
  {
    id: 'ssc_2',
    committeeType: 'គគថ',
    name: 'លោក ចាន់ ធារ៉ា',
    gender: 'ប្រុស',
    role: 'អនុប្រធានគណៈកម្មាធិការ',
    externalRole: 'មេភូមិអន្លង់តាម៉ី & តំណាងមាតាបិតាសិស្ស',
    phone: '092 777 200',
    email: 'theara.chan@banan.gov.kh',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',
    joinedYear: '២០២១',
    education: 'មធ្យមសិក្សាទុតិយភូមិ',
    biography: 'លោក ចាន់ ធារ៉ា ជានាយភូមិអន្លង់តាម៉ី ឃុំឈើទាល និងជាអាណាព្យាបាលសិស្សសកម្ម។ លោកតែងតែសហការយ៉ាងជិតស្និទ្ធជាមួយនាយកសាលា ដើម្បីធានាថាកុមារគ្រប់រូបក្នុងភូមិអន្លង់តាម៉ី និងភូមិចំការស្វាយ បានចូលរៀនគ្រប់ៗគ្នា។',
    responsibilities: [
      'ទទួលខុសត្រូវជួយប្រធាន គគថ ក្នុងការសម្របសម្រួលកិច្ចការភូមិ-សាលា',
      'ចុះជួយអប់រំ និងជំរុញអាណាព្យាបាលឱ្យបញ្ជូនកូនមកជួយរៀនទៀងទាត់',
      'ការពារសន្តិសុខ និងសុវត្ថិភាពសិស្សានុសិស្សជុំវិញបរិវេណសាលា'
    ],
    order: 2,
    reportsToId: 'ssc_1'
  },
  {
    id: 'ssc_3',
    committeeType: 'គគថ',
    name: 'លោក វ៉ិត ជីវន្ថា',
    gender: 'ប្រុស',
    role: 'លេខាធិការ',
    externalRole: 'លេខាសាលារៀន & តំណាងលោកគ្រូអ្នកគ្រូ',
    phone: '092 333 444',
    email: 'vit.chivantha@anlongtamey.edu.kh',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=250&q=80',
    joinedYear: '២០២២',
    education: 'បរិញ្ញាបត្ររដ្ឋបាលសាធារណៈ',
    biography: 'លោក វ៉ិត ជីវន្ថា ជាលេខាសាលាបឋមសិក្សា អន្លង់តាម៉ី ឃុំឈើទាល។ លោកទទួលបន្ទុកកត់ត្រាកំណត់ហេតុប្រជុំ និងរៀបចំរបាយការណ៍សកម្មភាពរបស់ គគថ ជូនមន្ទីរអប់រំ និងអាជ្ញាធរឃុំឈើទាល។',
    responsibilities: [
      'រៀបចំលិខិតអញ្ជើញ និងកំណត់ហេតុប្រជុំ គគថ',
      'ចងក្រងទិន្នន័យ និងរបាយការណ៍សកម្មភាពទ្រទ្រង់សាលារៀន',
      'សម្របសម្រួលរវាងលោកគ្រូអ្នកគ្រូ និងគណៈកម្មាធិការទ្រទ្រង់'
    ],
    order: 3,
    reportsToId: 'ssc_1'
  },
  {
    id: 'ssc_4',
    committeeType: 'គគថ',
    name: 'អ្នកស្រី គឹម ស្រីមុំ',
    gender: 'ស្រី',
    role: 'បេឡាធិការ',
    externalRole: 'អាជីវករសហគមន៍ & តំណាងសមាគមមាតាបិតា',
    phone: '092 876 543',
    email: 'sreymom.kim@outlook.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
    joinedYear: '២០២២',
    education: 'បរិញ្ញាបត្រគណនេយ្យ',
    biography: 'អ្នកស្រី គឹម ស្រីមុំ ជាអាជីវករស្មោះត្រង់ និងជាមាតាបិតាសិស្ស។ អ្នកស្រីទទួលបន្ទុកគ្រប់គ្រងចំណូលចំណាយវិភាគទានសហគមន៍ ថវិកាសប្បុរសធម៌ ដោយតម្លាភាព និងមានបញ្ជីគណនេយ្យច្បាស់លាស់។',
    responsibilities: [
      'គ្រប់គ្រងបេឡាសាច់ប្រាក់ និងមូលនិធិទ្រទ្រង់សាលារៀន',
      'ធ្វើរបាយការណ៍ហិរញ្ញវត្ថុ បង្ហាញតម្លាភាពជូនសហគមន៍',
      'រៀបចំកញ្ចប់អាហារូបករណ៍ជូនសិស្សក្រីក្រ និងសិស្សបណ្ណសមធម៌'
    ],
    order: 4,
    reportsToId: 'ssc_1'
  },
  {
    id: 'ssc_5',
    committeeType: 'គគថ',
    name: 'ព្រះតេជគុណ សឿន សុវណ្ណ',
    gender: 'ប្រុស',
    role: 'សមាជិកកិត្តិយស',
    externalRole: 'ព្រះចៅអធិការវត្តអន្លង់តាម៉ី',
    phone: '097 555 888',
    avatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=250&q=80',
    joinedYear: '២០២០',
    education: 'ពុទ្ធិកវិទ្យាល័យ & ពុទ្ធសាសនាបណ្ឌិត្យ',
    biography: 'ព្រះតេជគុណ សឿន សុវណ្ណ ជាព្រះចៅអធិការវត្តអន្លង់តាម៉ី ឃុំឈើទាល ដែលតែងតែជួយឧបត្ថម្ភសៀវភៅ ឧបករណ៍សិក្សា និងរៀបចំកម្មវិធីបុណ្យផ្កាសាមគ្គីដើម្បីប្រមូលបច្ច័យកសាងអាគារសិក្សា។',
    responsibilities: [
      'ផ្តល់ការអប់រំផ្នែកសីលធម៌ និងព្រះពុទ្ធសាសនាដល់កុមារ',
      'ជួយឧបត្ថម្ភសម្ភារសិក្សា និងបច្ច័យកសាងសាលារៀន',
      'គាំទ្រការងារសប្បុរសធម៌កុមារក្រីក្រ'
    ],
    order: 5,
    reportsToId: 'ssc_1'
  },

  // ================= គគស (School Management Committee / SMC) =================
  {
    id: 'smc_1',
    committeeType: 'គគស',
    name: 'លោកនាយក ឈិត សារ៉ាំ',
    gender: 'ប្រុស',
    role: 'ប្រធានគណៈកម្មាធិការ',
    externalRole: 'នាយកសាលាបឋមសិក្សា អន្លង់តាម៉ី (ឃុំឈើទាល)',
    phone: '012 888 999',
    email: 'chhit.saram@moeys.gov.kh',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=250&q=80',
    joinedYear: '២០១៥',
    education: 'បរិញ្ញាបត្រជាន់ខ្ពស់គ្រប់គ្រងអប់រំ (Master of Education)',
    biography: 'លោកនាយក ឈិត សារ៉ាំ មានបទពិសោធន៍ជាអ្នកគ្រប់គ្រងអប់រំជាង ២០ ឆ្នាំ។ លោកបានដឹកនាំសាលាបឋមសិក្សា អន្លង់តាម៉ី (ភូមិអន្លង់តាម៉ី ឃុំឈើទាល ស្រុកបាណន់) ឱ្យទទួលបានពានរង្វាន់ "សាលារៀនគំរូស្ដង់ដារ MoEYS" និងប្រព័ន្ធគ្រប់គ្រងសាលារៀនឌីជីថល។',
    responsibilities: [
      'ដឹកនាំ និងគ្រប់គ្រងរដ្ឋបាល បច្ចេកទេស និងហិរញ្ញវត្ថុសាលារៀនទាំងមូល',
      'រៀបចំផែនការអភិវឌ្ឍន៍សាលារៀន (School Development Plan - SDP)',
      'វាយតម្លៃសមត្ថភាពគ្រូបង្រៀន និងលទ្ធផលសិក្សារបស់សិស្ស',
      'តំណាងសាលារៀនទាក់ទងជាមួយក្រសួងអប់រំ មន្ទីរ និងការិយាល័យអប់រំស្រុកបាណន់'
    ],
    order: 1
  },
  {
    id: 'smc_2',
    committeeType: 'គគស',
    name: 'លោកនាយករង ប្រុញ វឿន',
    gender: 'ប្រុស',
    role: 'អនុប្រធានគណៈកម្មាធិការ',
    externalRole: 'នាយករងសាលាបឋមសិក្សា អន្លង់តាម៉ី',
    phone: '012 222 999',
    email: 'pronh.voeun@moeys.gov.kh',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',
    joinedYear: '២០១៨',
    education: 'បរិញ្ញាបត្រគរុកោសល្យ & គ្រប់គ្រងរដ្ឋបាល',
    biography: 'លោក ប្រុញ វឿន ជានាយករងសាលាបឋមសិក្សា អន្លង់តាម៉ី ទទួលបន្ទុករៀបចំកាលវិភាគ បញ្ជីវត្តមាន គ្រប់គ្រងទិន្នន័យសិស្ស និងកិច្ចការប្រឡងឆមាស។ លោកជាសហប្រធាន គគស ក្នុងការអនុវត្តគោលនយោបាយសាលារៀន។',
    responsibilities: [
      'ជួយនាយកសាលាក្នុងការគ្រប់គ្រងកិច្ចការរដ្ឋបាល និងកាលវិភាគ',
      'គ្រប់គ្រងវត្តមានគ្រូបង្រៀន និងសិស្សានុសិស្ស',
      'រៀបចំតារាងប្រឡងប្រចាំខែ និងប្រឡងឆមាស'
    ],
    order: 2,
    reportsToId: 'smc_1'
  },
  {
    id: 'smc_secretary',
    committeeType: 'គគស',
    name: 'លោក វ៉ិត ជីវន្ថា',
    gender: 'ប្រុស',
    role: 'លេខាធិការ គគស',
    externalRole: 'លេខាសាលារៀន (ភូមិអន្លង់តាម៉ី ឃុំឈើទាល)',
    phone: '092 333 444',
    email: 'vit.chivantha@moeys.gov.kh',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=250&q=80',
    joinedYear: '២០២០',
    education: 'បរិញ្ញាបត្ររដ្ឋបាលសាធារណៈ',
    biography: 'លោក វ៉ិត ជីវន្ថា ជាលេខាសាលារៀនទទួលបន្ទុកការងារលិខិតស្នាម លិខិតបទដ្ឋានផ្លូវការ គ្រប់គ្រងឯកសារសារពើភ័ណ្ឌ និងកំណត់ហេតុប្រជុំរបស់គណៈគ្រប់គ្រងសាលា គគស។',
    responsibilities: [
      'គ្រប់គ្រងលិខិតចេញ-ចូល និងរដ្ឋបាលសាលារៀន',
      'ចងក្រង និងរក្សាទុកឯកសារប្រជុំរបស់ គគស',
      'រៀបចំរបាយការណ៍ស្ថិតិសាលារៀនជូនការិយាល័យអប់រំស្រុកបាណន់'
    ],
    order: 3,
    reportsToId: 'smc_1'
  },
  {
    id: 'smc_librarian',
    committeeType: 'គគស',
    name: 'អ្នកគ្រូ សឹង រតនា',
    gender: 'ស្រី',
    role: 'សមាជិក គគស (បណ្ណារក្ស)',
    externalRole: 'បណ្ណារក្សសាលារៀន & ទទួលបន្ទុកក្លឹបអំណាន',
    phone: '097 888 777',
    email: 'soeng.rothana@anlongtamey.edu.kh',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80',
    joinedYear: '២០២១',
    education: 'បរិញ្ញាបត្រព័ត៌មានវិទ្យា & បណ្ណារក្ស',
    biography: 'អ្នកគ្រូ សឹង រតនា ជាបណ្ណារក្សសាលាបឋមសិក្សា អន្លង់តាម៉ី។ អ្នកគ្រូគ្រប់គ្រងបណ្ណាល័យសាលា សម្របសម្រួលការខ្ចី-សងសៀវភៅសិក្សាគោល និងរៀបចំសកម្មភាពអានសម្រាប់សិស្សានុសិស្ស។',
    responsibilities: [
      'គ្រប់គ្រងសៀវភៅ ឯកសារ និងសម្ភារអានក្នុងបណ្ណាល័យសាលា',
      'ដឹកនាំសកម្មភាពអាន និងក្លឹបសិក្សាសិស្ស',
      'សហការរៀបចំបញ្ជីប្រគល់-ទទួលសៀវភៅសិក្សាគោល'
    ],
    order: 4,
    reportsToId: 'smc_1'
  },
  {
    id: 'smc_3',
    committeeType: 'គគស',
    name: 'អ្នកគ្រូ គឹម ស្រីពៅ',
    gender: 'ស្រី',
    role: 'ប្រធានក្រុមបច្ចេកទេស (ថ្នាក់ទី៤-៦)',
    externalRole: 'គ្រូបន្ទុកថ្នាក់ទី៤-ក & គ្រូឆ្នើមថ្នាក់ជាតិ',
    phone: '012 111 223',
    email: 'kim.sreypov@anlongtamey.edu.kh',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80',
    joinedYear: '២០១៩',
    education: 'បរិញ្ញាបត្រគរុកោសល្យ (បឋមសិក្សា)',
    biography: 'អ្នកគ្រូ គឹម ស្រីពៅ ជាគ្រូឆ្នើមថ្នាក់ជាតិផ្នែកភាសាខ្មែរ និងគណិតវិទ្យា។ អ្នកគ្រូដឹកនាំក្រុមបច្ចេកទេសថ្នាក់ទី៤ ដល់ទី៦ ដោយរៀបចំកិច្ចតែងការបង្រៀនគំរូ និងពិនិត្យកម្រងសៀវភៅពិន្ទុ។',
    responsibilities: [
      'ដឹកនាំការប្រជុំកម្រងបច្ចេកទេសគ្រូបង្រៀនថ្នាក់ទី៤-៦',
      'ពិនិត្យ និងកែលម្អកិច្ចតែងការបង្រៀនស្ដង់ដារ MoEYS',
      'ជួយណែនាំវិធីសាស្ត្របង្រៀនថ្មីៗដល់គ្រូកិច្ចសន្យា និងគ្រូថ្មី'
    ],
    order: 3,
    reportsToId: 'smc_1'
  },
  {
    id: 'smc_4',
    committeeType: 'គគស',
    name: 'អ្នកគ្រូ សុខ ចាន់ធី',
    gender: 'ស្រី',
    role: 'ប្រធានក្រុមបច្ចេកទេស (ថ្នាក់ទី១-៣)',
    externalRole: 'គ្រូបន្ទុកថ្នាក់ទី១-ក & ឯកទេសអំណានដំបូង',
    phone: '012 333 777',
    email: 'sok.chanthy@anlongtamey.edu.kh',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=250&q=80',
    joinedYear: '២០២០',
    education: 'បរិញ្ញាបត្រគរុកោសល្យ (អំណាន-គណិតវិទ្យាដំបូង)',
    biography: 'អ្នកគ្រូ សុខ ចាន់ធី ជាឯកទេសវិធីសាស្ត្របង្រៀនអំណាន និងគណិតវិទ្យាដំបូង (Early Grade Reading & Math - EGR/EGM)។ អ្នកគ្រូណែនាំការប្រើប្រាស់សម្ភារឧបទេសបង្រៀនកុមារតូច។',
    responsibilities: [
      'ដឹកនាំប្រជុំកម្រងបច្ចេកទេសថ្នាក់ទី១-៣',
      'ពង្រឹងអំណាន និងគណិតវិទ្យាដំបូងដល់សិស្សថ្នាក់ទី១-៣',
      'ផលិត និងគ្រប់គ្រងសម្ភារឧបទេសបង្រៀនក្នុងសាលា'
    ],
    order: 4,
    reportsToId: 'smc_1'
  },
  {
    id: 'smc_5',
    committeeType: 'គគស',
    name: 'លោកគ្រូ ស៊ុន ដារ៉ា',
    gender: 'ប្រុស',
    role: 'តំណាងគ្រូបង្រៀន / លេខាធិការ គគស',
    externalRole: 'គ្រូបន្ទុកថ្នាក់ទី៥-ក & ប្រធានក្លឹបសិក្សា',
    phone: '092 222 334',
    email: 'sun.dara@anlongtamey.edu.kh',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=250&q=80',
    joinedYear: '២០២១',
    education: 'បរិញ្ញាបត្រអប់រំ',
    biography: 'លោកគ្រូ ស៊ុន ដារ៉ា ជាតំណាងលោកគ្រូអ្នកគ្រូក្នុង គគស។ លោកជួយកត់ត្រាកំណត់ហេតុប្រជុំ គគស និងផ្ដល់យោបល់លើសុខុមាលភាពលោកគ្រូអ្នកគ្រូ។',
    responsibilities: [
      'ប្រមូលសំណូមពរ និងយោបល់ពីលោកគ្រូអ្នកគ្រូដាក់ជូន គគស',
      'កត់ត្រាកំណត់ហេតុប្រជុំគ្រប់គ្រងសាលារៀន',
      'សម្របសម្រួលការងារបច្ចេកទេសវិទ្យាសាស្ត្រ និងបដិវត្តន៍បច្ចេកវិទ្យា'
    ],
    order: 5,
    reportsToId: 'smc_1'
  },
  {
    id: 'smc_6',
    committeeType: 'គគស',
    name: 'សិស្ស ឡុង សុវណ្ណារ៉ា',
    gender: 'ប្រុស',
    role: 'តំណាងក្រុមប្រឹក្សាកុមារ/សិស្ស',
    externalRole: 'ប្រធានក្រុមប្រឹក្សាកុមារសាលា & សិស្សពូកែថ្នាក់ទី៦',
    phone: '012 888 111',
    email: 'long.sovannara@anlongtamey.edu.kh',
    avatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=250&q=80',
    joinedYear: '២០២៥',
    education: 'កំពុងសិក្សាថ្នាក់ទី៦ (ចំណាត់ថ្នាក់ទី១)',
    biography: 'សិស្ស ឡុង សុវណ្ណារ៉ា ជាប្រធានក្រុមប្រឹក្សាកុមារសាលាបឋមសិក្សា អន្លង់តាម៉ី។ សុវណ្ណារ៉ា ជាសិស្សពូកែគំរូ ទទួលបានបណ្ណសរសើរថ្នាក់ខេត្ត និងជាតំណាងសំឡេងសិស្សានុសិស្សទាំងអស់ក្នុងប្រជុំ គគស។',
    responsibilities: [
      'នាំយកមតិ និងសំណូមពររបស់សិស្សានុសិស្សជូនគណៈគ្រប់គ្រង',
      'ដឹកនាំសកម្មភាពអនាម័យ បរិស្ថាន និងក្លឹបសិក្សាសិស្ស',
      'ចូលរួមប្រជុំ គគស ដើម្បីរាយការណ៍ពីសកម្មភាពសិស្ស'
    ],
    order: 6,
    reportsToId: 'smc_1'
  }
];

export const initialClasses: ClassGroup[] = [
  {
    id: 'c1_1a',
    name: 'ថ្នាក់ទី ១-ក',
    gradeLevel: '១',
    section: 'ក',
    classTeacherId: 't4',
    roomNumber: 'អាគារ ក - បន្ទប់ ០១',
    totalStudents: 28
  },
  {
    id: 'c1_1b',
    name: 'ថ្នាក់ទី ១-ខ',
    gradeLevel: '១',
    section: 'ខ',
    classTeacherId: 't8',
    roomNumber: 'អាគារ ក - បន្ទប់ ០២',
    totalStudents: 26
  },
  {
    id: 'c2_2a',
    name: 'ថ្នាក់ទី ២-ក',
    gradeLevel: '២',
    section: 'ក',
    classTeacherId: 't5',
    roomNumber: 'អាគារ ក - បន្ទប់ ០៣',
    totalStudents: 30
  },
  {
    id: 'c2_2b',
    name: 'ថ្នាក់ទី ២-ខ',
    gradeLevel: '២',
    section: 'ខ',
    classTeacherId: 't9',
    roomNumber: 'អាគារ ក - បន្ទប់ ០៤',
    totalStudents: 27
  },
  {
    id: 'c3_3a',
    name: 'ថ្នាក់ទី ៣-ក',
    gradeLevel: '៣',
    section: 'ក',
    classTeacherId: 't6',
    roomNumber: 'អាគារ ខ - បន្ទប់ ០១',
    totalStudents: 26
  },
  {
    id: 'c3_3b',
    name: 'ថ្នាក់ទី ៣-ខ',
    gradeLevel: '៣',
    section: 'ខ',
    classTeacherId: 't10',
    roomNumber: 'អាគារ ខ - បន្ទប់ ០២',
    totalStudents: 25
  },
  {
    id: 'c4_4a',
    name: 'ថ្នាក់ទី ៤-ក',
    gradeLevel: '៤',
    section: 'ក',
    classTeacherId: 't1',
    roomNumber: 'អាគារ ខ - បន្ទប់ ០៣',
    totalStudents: 32
  },
  {
    id: 'c4_4b',
    name: 'ថ្នាក់ទី ៤-ខ',
    gradeLevel: '៤',
    section: 'ខ',
    classTeacherId: 't3',
    roomNumber: 'អាគារ ខ - បន្ទប់ ០៤',
    totalStudents: 30
  },
  {
    id: 'c5_5a',
    name: 'ថ្នាក់ទី ៥-ក',
    gradeLevel: '៥',
    section: 'ក',
    classTeacherId: 't2',
    roomNumber: 'អាគារ គ - បន្ទប់ ០១',
    totalStudents: 28
  },
  {
    id: 'c5_5b',
    name: 'ថ្នាក់ទី ៥-ខ',
    gradeLevel: '៥',
    section: 'ខ',
    classTeacherId: 't11',
    roomNumber: 'អាគារ គ - បន្ទប់ ០២',
    totalStudents: 29
  },
  {
    id: 'c6_6a',
    name: 'ថ្នាក់ទី ៦-ក',
    gradeLevel: '៦',
    section: 'ក',
    classTeacherId: 't7',
    roomNumber: 'អាគារ គ - បន្ទប់ ០៣',
    totalStudents: 31
  },
  {
    id: 'c6_6b',
    name: 'ថ្នាក់ទី ៦-ខ',
    gradeLevel: '៦',
    section: 'ខ',
    classTeacherId: 't12',
    roomNumber: 'អាគារ គ - បន្ទប់ ០៤',
    totalStudents: 28
  }
];

export const initialSubjects: Subject[] = [
  { id: 'sub1', code: 'SUB-01', name: 'អំណាន', department: 'ភាសាខ្មែរ', credits: 2 },
  { id: 'sub2', code: 'SUB-02', name: 'ការស្ដាប់', department: 'ភាសាខ្មែរ', credits: 2 },
  { id: 'sub3', code: 'SUB-03', name: 'សរសេរតាមអាន', department: 'ភាសាខ្មែរ', credits: 2 },
  { id: 'sub4', code: 'SUB-04', name: 'តែងសេចក្ដី', department: 'ភាសាខ្មែរ', credits: 2 },
  { id: 'sub5', code: 'SUB-05', name: 'គណិតវិទ្យា', department: 'គណិតវិទ្យា', credits: 5 },
  { id: 'sub6', code: 'SUB-06', name: 'វិទ្យាសាស្ត្រ', department: 'វិទ្យាសាស្ត្រ', credits: 4 },
  { id: 'sub7', code: 'SUB-07', name: 'សីលធម៌', department: 'សិក្សាសង្គម', credits: 3 },
  { id: 'sub8', code: 'SUB-08', name: 'ភូមិវិទ្យា', department: 'សិក្សាសង្គម', credits: 3 },
  { id: 'sub9', code: 'SUB-09', name: 'ប្រវត្តិវិទ្យា', department: 'សិក្សាសង្គម', credits: 3 },
  { id: 'sub10', code: 'SUB-10', name: 'គេហវិទ្យា', department: 'បំណិនជីវិត', credits: 2 },
  { id: 'sub11', code: 'SUB-11', name: 'អប់រំកាយ', department: 'កីឡា', credits: 2 },
  { id: 'sub12', code: 'SUB-12', name: 'អប់រំបំណិនជីវិត', department: 'បំណិនជីវិត', credits: 3 },
  { id: 'sub13', code: 'SUB-13', name: 'ភាសាបរទេស', department: 'ភាសាបរទេស', credits: 3 }
];

const daysList: ('ច័ន្ទ' | 'អង្គារ' | 'ពុធ' | 'ព្រហស្បតិ៍' | 'សុក្រ' | 'សៅរិ៍')[] = ['ច័ន្ទ', 'អង្គារ', 'ពុធ', 'ព្រហស្បតិ៍', 'សុក្រ', 'សៅរិ៍'];

export const timeSlotsList221 = [
  '07:00 ព្រឹក - 07:45 ព្រឹក', // ម៉ោងទី ១ (២-២-១ វគ្គ១)
  '07:45 ព្រឹក - 08:30 ព្រឹក', // ម៉ោងទី ២
  '08:45 ព្រឹក - 09:30 ព្រឹក', // ម៉ោងទី ៣ (២-២-១ វគ្គ២ បន្ទាប់ពីសម្រាក១៥នាទី)
  '09:30 ព្រឹក - 10:15 ព្រឹក', // ម៉ោងទី ៤
  '10:30 ព្រឹក - 11:15 ព្រឹក'  // ម៉ោងទី ៥ (២-២-១ វគ្គ៣ បំណិន/កីឡា/ក្លឹប)
];

const lowerPrimarySchedule: Record<string, string[]> = {
  'ច័ន្ទ': ['អំណាន', 'ការស្ដាប់', 'គណិតវិទ្យា', 'សីលធម៌', 'អប់រំកាយ'],
  'អង្គារ': ['សរសេរតាមអាន', 'គណិតវិទ្យា', 'អំណាន', 'អប់រំបំណិនជីវិត', 'សីលធម៌'],
  'ពុធ': ['គណិតវិទ្យា', 'អំណាន', 'វិទ្យាសាស្ត្រ', 'អប់រំកាយ', 'អប់រំបំណិនជីវិត'],
  'ព្រហស្បតិ៍': ['អំណាន', 'សរសេរតាមអាន', 'គណិតវិទ្យា', 'សីលធម៌', 'ការស្ដាប់'],
  'សុក្រ': ['គណិតវិទ្យា', 'អំណាន', 'អប់រំបំណិនជីវិត', 'អប់រំកាយ', 'គណិតវិទ្យា'],
  'សៅរិ៍': ['អំណាន/អក្សរផ្ចង់', 'គណិតវិទ្យា', 'សកម្មភាពក្លឹបសិក្សា', 'អប់រំកាយ/កីឡា', 'អនាម័យបរិស្ថាន']
};

const upperPrimarySchedule: Record<string, string[]> = {
  'ច័ន្ទ': ['តែងសេចក្ដី', 'គណិតវិទ្យា', 'វិទ្យាសាស្ត្រ', 'ភាសាបរទេស', 'អប់រំកាយ'],
  'អង្គារ': ['អំណាន', 'គណិតវិទ្យា', 'ភូមិវិទ្យា', 'អប់រំកាយ', 'សីលធម៌'],
  'ពុធ': ['គណិតវិទ្យា', 'សរសេរតាមអាន', 'ប្រវត្តិវិទ្យា', 'គេហវិទ្យា', 'អប់រំបំណិនជីវិត'],
  'ព្រហស្បតិ៍': ['តែងសេចក្ដី', 'គណិតវិទ្យា', 'វិទ្យាសាស្ត្រ', 'សីលធម៌', 'ភាសាបរទេស'],
  'សុក្រ': ['គណិតវិទ្យា', 'ភាសាបរទេស', 'អប់រំបំណិនជីវិត', 'អប់រំកាយ', 'គេហវិទ្យា'],
  'សៅរិ៍': ['តែងសេចក្ដី', 'គណិតវិទ្យា', 'ប្រវត្តិវិទ្យា/ភូមិវិទ្យា', 'សកម្មភាពក្លឹប/កីឡា', 'អនាម័យបរិស្ថាន']
};

export const generateMoEYSStandardTimetable = (): TimetableSlot[] => {
  const slots: TimetableSlot[] = [];
  let idCount = 1;

  initialClasses.forEach(cls => {
    const isLowerPrimary = ['១', '២', '៣'].includes(cls.gradeLevel);
    const scheduleTemplate = isLowerPrimary ? lowerPrimarySchedule : upperPrimarySchedule;
    const teacher = initialTeachers.find(t => t.id === cls.classTeacherId);
    const teacherName = teacher ? `${teacher.lastName} ${teacher.firstName}` : 'គ្រូបន្ទុកថ្នាក់';

    daysList.forEach(day => {
      const subjectsForDay = scheduleTemplate[day] || lowerPrimarySchedule['ច័ន្ទ'];
      subjectsForDay.forEach((subject, idx) => {
        slots.push({
          id: `tb_${cls.id}_${day}_${idx + 1}_${idCount++}`,
          day,
          timeSlot: timeSlotsList221[idx] || '07:00 ព្រឹក - 07:45 ព្រឹក',
          subject,
          className: cls.name,
          teacherName,
          room: cls.roomNumber
        });
      });
    });
  });

  return slots;
};

export const initialTimetable: TimetableSlot[] = generateMoEYSStandardTimetable();

export const initialAttendance: AttendanceRecord[] = [
  { id: 'att101', studentId: 's101', studentName: 'ឡុង សុវណ្ណារ៉ា', className: 'ថ្នាក់ទី ១-ក', date: '2026-09-23', status: 'វត្តមាន' },
  { id: 'att102', studentId: 's102', studentName: 'ជា ស្រីលីន', className: 'ថ្នាក់ទី ១-ក', date: '2026-09-23', status: 'វត្តមាន' },
  { id: 'att201', studentId: 's201', studentName: 'ស៊ិន សុជាតិ', className: 'ថ្នាក់ទី ២-ក', date: '2026-09-23', status: 'វត្តមាន' },
  { id: 'att301', studentId: 's301', studentName: 'ហេង សម្បត្តិ', className: 'ថ្នាក់ទី ៣-ក', date: '2026-09-23', status: 'វត្តមាន' },
  { id: 'att1', studentId: 's1', studentName: 'ចាន់ សុភា', className: 'ថ្នាក់ទី ៤-ក', date: '2026-09-23', status: 'វត្តមាន' },
  { id: 'att2', studentId: 's2', studentName: 'សុខ រតនា', className: 'ថ្នាក់ទី ៤-ក', date: '2026-09-23', status: 'វត្តមាន' },
  { id: 'att3', studentId: 's3', studentName: 'កែវ វិចិត្រ', className: 'ថ្នាក់ទី ៤-ខ', date: '2026-09-23', status: 'យឺត', remarks: 'ស្ទះចរាចរណ៍' },
  { id: 'att4', studentId: 's4', studentName: 'ហេង ស្រីណែត', className: 'ថ្នាក់ទី ៥-ក', date: '2026-09-23', status: 'វត្តមាន' },
  { id: 'att601', studentId: 's601', studentName: 'ម៉ក់ វិរៈ', className: 'ថ្នាក់ទី ៦-ក', date: '2026-09-23', status: 'វត្តមាន' }
];

export const initialGrades: GradeRecord[] = [
  // Grade 1-A (Monthly & Semesters & Annual)
  {
    id: 'g_sep_s101',
    studentId: 's101',
    studentName: 'ឡុង សុវណ្ណារ៉ា',
    subject: 'ពិន្ទុសរុប ១៣ មុខវិជ្ជា',
    className: 'ថ្នាក់ទី ១-ក',
    examName: 'ប្រឡងប្រចាំខែកញ្ញា ២០២៦',
    month: 'ខែកញ្ញា',
    marksObtained: 122,
    maxMarks: 130,
    letterGrade: 'ល្អប្រសើរ (A)',
    rankInClass: 1,
    date: '2026-09-25'
  },
  {
    id: 'g_sem1_s101',
    studentId: 's101',
    studentName: 'ឡុង សុវណ្ណារ៉ា',
    subject: 'ពិន្ទុសរុប ១៣ មុខវិជ្ជា',
    className: 'ថ្នាក់ទី ១-ក',
    examName: 'ប្រឡងប្រចាំឆមាសទី១ ២០២៥-២០២៦',
    month: 'ឆមាសទី ១',
    marksObtained: 125,
    maxMarks: 130,
    letterGrade: 'ល្អប្រសើរ (A)',
    rankInClass: 1,
    date: '2026-02-15'
  },
  {
    id: 'g_sem2_s101',
    studentId: 's101',
    studentName: 'ឡុង សុវណ្ណារ៉ា',
    subject: 'ពិន្ទុសរុប ១៣ មុខវិជ្ជា',
    className: 'ថ្នាក់ទី ១-ក',
    examName: 'ប្រឡងប្រចាំឆមាសទី២ ២០២៥-២០២៦',
    month: 'ឆមាសទី ២',
    marksObtained: 124,
    maxMarks: 130,
    letterGrade: 'ល្អប្រសើរ (A)',
    rankInClass: 1,
    date: '2026-07-10'
  },
  {
    id: 'g_year_s101',
    studentId: 's101',
    studentName: 'ឡុង សុវណ្ណារ៉ា',
    subject: 'ពិន្ទុសរុប ១៣ មុខវិជ្ជា',
    className: 'ថ្នាក់ទី ១-ក',
    examName: 'លទ្ធផលដំណាច់ឆ្នាំ ២០២៥-២០២៦',
    month: 'ដំណាច់ឆ្នាំ',
    marksObtained: 125,
    maxMarks: 130,
    letterGrade: 'ល្អប្រសើរ (A)',
    rankInClass: 1,
    date: '2026-07-20'
  },

  {
    id: 'g_sep_s102',
    studentId: 's102',
    studentName: 'ជា ស្រីលីន',
    subject: 'ពិន្ទុសរុប ១៣ មុខវិជ្ជា',
    className: 'ថ្នាក់ទី ១-ក',
    examName: 'ប្រឡងប្រចាំខែកញ្ញា ២០២៦',
    month: 'ខែកញ្ញា',
    marksObtained: 117,
    maxMarks: 130,
    letterGrade: 'ល្អប្រសើរ (A)',
    rankInClass: 2,
    date: '2026-09-25'
  },
  {
    id: 'g_sem1_s102',
    studentId: 's102',
    studentName: 'ជា ស្រីលីន',
    subject: 'ពិន្ទុសរុប ១៣ មុខវិជ្ជា',
    className: 'ថ្នាក់ទី ១-ក',
    examName: 'ប្រឡងប្រចាំឆមាសទី១ ២០២៥-២០២៦',
    month: 'ឆមាសទី ១',
    marksObtained: 119,
    maxMarks: 130,
    letterGrade: 'ល្អប្រសើរ (A)',
    rankInClass: 2,
    date: '2026-02-15'
  },

  // Grade 2-A
  {
    id: 'g_sep_s201',
    studentId: 's201',
    studentName: 'ស៊ិន សុជាតិ',
    subject: 'ពិន្ទុសរុប ១៣ មុខវិជ្ជា',
    className: 'ថ្នាក់ទី ២-ក',
    examName: 'ប្រឡងប្រចាំខែកញ្ញា ២០២៦',
    month: 'ខែកញ្ញា',
    marksObtained: 121,
    maxMarks: 130,
    letterGrade: 'ល្អប្រសើរ (A)',
    rankInClass: 1,
    date: '2026-09-25'
  },
  {
    id: 'g_sem1_s201',
    studentId: 's201',
    studentName: 'ស៊ិន សុជាតិ',
    subject: 'ពិន្ទុសរុប ១៣ មុខវិជ្ជា',
    className: 'ថ្នាក់ទី ២-ក',
    examName: 'ប្រឡងប្រចាំឆមាសទី១ ២០២៥-២០២៦',
    month: 'ឆមាសទី ១',
    marksObtained: 123,
    maxMarks: 130,
    letterGrade: 'ល្អប្រសើរ (A)',
    rankInClass: 1,
    date: '2026-02-15'
  },
  {
    id: 'g_year_s201',
    studentId: 's201',
    studentName: 'ស៊ិន សុជាតិ',
    subject: 'ពិន្ទុសរុប ១៣ មុខវិជ្ជា',
    className: 'ថ្នាក់ទី ២-ក',
    examName: 'លទ្ធផលដំណាច់ឆ្នាំ ២០២៥-២០២៦',
    month: 'ដំណាច់ឆ្នាំ',
    marksObtained: 124,
    maxMarks: 130,
    letterGrade: 'ល្អប្រសើរ (A)',
    rankInClass: 1,
    date: '2026-07-20'
  },

  // Grade 3-A
  {
    id: 'g_sep_s301',
    studentId: 's301',
    studentName: 'ហេង សម្បត្តិ',
    subject: 'ពិន្ទុសរុប ១៣ មុខវិជ្ជា',
    className: 'ថ្នាក់ទី ៣-ក',
    examName: 'ប្រឡងប្រចាំខែកញ្ញា ២០២៦',
    month: 'ខែកញ្ញា',
    marksObtained: 124,
    maxMarks: 130,
    letterGrade: 'ល្អប្រសើរ (A)',
    rankInClass: 1,
    date: '2026-09-25'
  },
  {
    id: 'g_sem1_s301',
    studentId: 's301',
    studentName: 'ហេង សម្បត្តិ',
    subject: 'ពិន្ទុសរុប ១៣ មុខវិជ្ជា',
    className: 'ថ្នាក់ទី ៣-ក',
    examName: 'ប្រឡងប្រចាំឆមាសទី១ ២០២៥-២០២៦',
    month: 'ឆមាសទី ១',
    marksObtained: 126,
    maxMarks: 130,
    letterGrade: 'ល្អប្រសើរ (A)',
    rankInClass: 1,
    date: '2026-02-15'
  },
  {
    id: 'g_sem2_s301',
    studentId: 's301',
    studentName: 'ហេង សម្បត្តិ',
    subject: 'ពិន្ទុសរុប ១៣ មុខវិជ្ជា',
    className: 'ថ្នាក់ទី ៣-ក',
    examName: 'ប្រឡងប្រចាំឆមាសទី២ ២០២៥-២០២៦',
    month: 'ឆមាសទី ២',
    marksObtained: 127,
    maxMarks: 130,
    letterGrade: 'ល្អប្រសើរ (A)',
    rankInClass: 1,
    date: '2026-07-10'
  },
  {
    id: 'g_year_s301',
    studentId: 's301',
    studentName: 'ហេង សម្បត្តិ',
    subject: 'ពិន្ទុសរុប ១៣ មុខវិជ្ជា',
    className: 'ថ្នាក់ទី ៣-ក',
    examName: 'លទ្ធផលដំណាច់ឆ្នាំ ២០២៥-២០២៦',
    month: 'ដំណាច់ឆ្នាំ',
    marksObtained: 127,
    maxMarks: 130,
    letterGrade: 'ល្អប្រសើរ (A)',
    rankInClass: 1,
    date: '2026-07-20'
  },

  // Grade 4-A
  {
    id: 'g_sep_s1',
    studentId: 's1',
    studentName: 'ចាន់ សុភា',
    subject: 'ពិន្ទុសរុប ១៣ មុខវិជ្ជា',
    className: 'ថ្នាក់ទី ៤-ក',
    examName: 'ប្រឡងប្រចាំខែកញ្ញា ២០២៦',
    month: 'ខែកញ្ញា',
    marksObtained: 125,
    maxMarks: 130,
    letterGrade: 'ល្អប្រសើរ (A)',
    rankInClass: 1,
    date: '2026-09-25',
    subjectScores: [
      { subjectName: 'អំណាន', score: 10, maxScore: 10 },
      { subjectName: 'ការស្ដាប់', score: 9.5, maxScore: 10 },
      { subjectName: 'សរសេរតាមអាន', score: 9, maxScore: 10 },
      { subjectName: 'តែងសេចក្ដី', score: 9.5, maxScore: 10 },
      { subjectName: 'គណិតវិទ្យា', score: 10, maxScore: 10 },
      { subjectName: 'វិទ្យាសាស្ត្រ', score: 10, maxScore: 10 },
      { subjectName: 'សីលធម៌', score: 9.5, maxScore: 10 },
      { subjectName: 'ភូមិវិទ្យា', score: 9.5, maxScore: 10 },
      { subjectName: 'ប្រវត្តិវិទ្យា', score: 9, maxScore: 10 },
      { subjectName: 'គេហវិទ្យា', score: 10, maxScore: 10 },
      { subjectName: 'អប់រំកាយ', score: 10, maxScore: 10 },
      { subjectName: 'អប់រំបំណិនជីវិត', score: 9.5, maxScore: 10 },
      { subjectName: 'ភាសាបរទេស', score: 9.5, maxScore: 10 }
    ]
  },
  {
    id: 'g_sem1_s1',
    studentId: 's1',
    studentName: 'ចាន់ សុភា',
    subject: 'ពិន្ទុសរុប ១៣ មុខវិជ្ជា',
    className: 'ថ្នាក់ទី ៤-ក',
    examName: 'ប្រឡងប្រចាំឆមាសទី១ ២០២៥-២០២៦',
    month: 'ឆមាសទី ១',
    marksObtained: 128,
    maxMarks: 130,
    letterGrade: 'ល្អប្រសើរ (A)',
    rankInClass: 1,
    date: '2026-02-15'
  },
  {
    id: 'g_sem2_s1',
    studentId: 's1',
    studentName: 'ចាន់ សុភា',
    subject: 'ពិន្ទុសរុប ១៣ មុខវិជ្ជា',
    className: 'ថ្នាក់ទី ៤-ក',
    examName: 'ប្រឡងប្រចាំឆមាសទី២ ២០២៥-២០២៦',
    month: 'ឆមាសទី ២',
    marksObtained: 129,
    maxMarks: 130,
    letterGrade: 'ល្អប្រសើរ (A)',
    rankInClass: 1,
    date: '2026-07-10'
  },
  {
    id: 'g_year_s1',
    studentId: 's1',
    studentName: 'ចាន់ សុភា',
    subject: 'ពិន្ទុសរុប ១៣ មុខវិជ្ជា',
    className: 'ថ្នាក់ទី ៤-ក',
    examName: 'លទ្ធផលដំណាច់ឆ្នាំ ២០២៥-២០២៦',
    month: 'ដំណាច់ឆ្នាំ',
    marksObtained: 129,
    maxMarks: 130,
    letterGrade: 'ល្អប្រសើរ (A)',
    rankInClass: 1,
    date: '2026-07-20'
  },

  {
    id: 'g_sep_s2',
    studentId: 's2',
    studentName: 'សុខ រតនា',
    subject: 'ពិន្ទុសរុប ១៣ មុខវិជ្ជា',
    className: 'ថ្នាក់ទី ៤-ក',
    examName: 'ប្រឡងប្រចាំខែកញ្ញា ២០២៦',
    month: 'ខែកញ្ញា',
    marksObtained: 119,
    maxMarks: 130,
    letterGrade: 'ល្អប្រសើរ (A)',
    rankInClass: 2,
    date: '2026-09-25'
  },
  {
    id: 'g_sem1_s2',
    studentId: 's2',
    studentName: 'សុខ រតនា',
    subject: 'ពិន្ទុសរុប ១៣ មុខវិជ្ជា',
    className: 'ថ្នាក់ទី ៤-ក',
    examName: 'ប្រឡងប្រចាំឆមាសទី១ ២០២៥-២០២៦',
    month: 'ឆមាសទី ១',
    marksObtained: 122,
    maxMarks: 130,
    letterGrade: 'ល្អប្រសើរ (A)',
    rankInClass: 2,
    date: '2026-02-15'
  },

  // Grade 6-A
  {
    id: 'g_sep_s601',
    studentId: 's601',
    studentName: 'ម៉ក់ វិរៈ',
    subject: 'ពិន្ទុសរុប ១៣ មុខវិជ្ជា',
    className: 'ថ្នាក់ទី ៦-ក',
    examName: 'ប្រឡងប្រចាំខែកញ្ញា ២០២៦',
    month: 'ខែកញ្ញា',
    marksObtained: 126,
    maxMarks: 130,
    letterGrade: 'ល្អប្រសើរ (A)',
    rankInClass: 1,
    date: '2026-09-25'
  },
  {
    id: 'g_sem1_s601',
    studentId: 's601',
    studentName: 'ម៉ក់ វិរៈ',
    subject: 'ពិន្ទុសរុប ១៣ មុខវិជ្ជា',
    className: 'ថ្នាក់ទី ៦-ក',
    examName: 'ប្រឡងប្រចាំឆមាសទី១ ២០២៥-២០២៦',
    month: 'ឆមាសទី ១',
    marksObtained: 127,
    maxMarks: 130,
    letterGrade: 'ល្អប្រសើរ (A)',
    rankInClass: 1,
    date: '2026-02-15'
  },
  {
    id: 'g_year_s601',
    studentId: 's601',
    studentName: 'ម៉ក់ វិរៈ',
    subject: 'ពិន្ទុសរុប ១៣ មុខវិជ្ជា',
    className: 'ថ្នាក់ទី ៦-ក',
    examName: 'លទ្ធផលដំណាច់ឆ្នាំ ២០២៥-២០២៦',
    month: 'ដំណាច់ឆ្នាំ',
    marksObtained: 128,
    maxMarks: 130,
    letterGrade: 'ល្អប្រសើរ (A)',
    rankInClass: 1,
    date: '2026-07-20'
  }
];

export const initialInvoices: Invoice[] = [
  { id: 'inv101', invoiceNumber: 'INV-ALT-2026-101', studentId: 's101', studentName: 'ឡុង សុវណ្ណារ៉ា', className: 'ថ្នាក់ទី ១-ក', title: 'វិភាគទានសិក្សា & សៀវភៅសិក្សាគោល ថ្នាក់ទី១', amountRiel: 180000, amountUSD: 45.00, dueDate: '2026-10-15', issueDate: '2026-09-01', status: 'បានបង់', paymentMethod: 'ABA PAY', paidDate: '2026-09-05' },
  { id: 'inv1', invoiceNumber: 'INV-ALT-2026-001', studentId: 's1', studentName: 'ចាន់ សុភា', className: 'ថ្នាក់ទី ៤-ក', title: 'វិភាគទានសិក្សា & សៀវភៅសិក្សាគោល ឆមាសទី១', amountRiel: 200000, amountUSD: 50.00, dueDate: '2026-10-15', issueDate: '2026-09-01', status: 'បានបង់', paymentMethod: 'ABA PAY', paidDate: '2026-09-05' },
  { id: 'inv2', invoiceNumber: 'INV-ALT-2026-002', studentId: 's2', studentName: 'សុខ រតនា', className: 'ថ្នាក់ទី ៤-ក', title: 'វិភាគទានសិក្សា & ឯកសណ្ឋានសាលា ឆមាសទី១', amountRiel: 220000, amountUSD: 55.00, dueDate: '2026-10-15', issueDate: '2026-09-01', status: 'បានបង់', paymentMethod: 'Wing Bank / Bakong', paidDate: '2026-09-02' },
  { id: 'inv3', invoiceNumber: 'INV-ALT-2026-003', studentId: 's3', studentName: 'កែវ វិចិត្រ', className: 'ថ្នាក់ទី ៤-ខ', title: 'វិភាគទានសិក្សា ឆមាសទី១', amountRiel: 200000, amountUSD: 50.00, dueDate: '2026-09-30', issueDate: '2026-09-01', status: 'រង់ចាំ' }
];

export const initialAnnouncements: Announcement[] = [
  {
    id: 'ann1',
    title: 'ការរៀបចំគ្រូបន្ទុកថ្នាក់សម្រាប់ថ្នាក់ទី១ ដល់ ថ្នាក់ទី៦ សាលាបឋមសិក្សា អន្លង់តាម៉ី',
    content: 'សូមជម្រាបជូនមាតាបិតាសិស្សទាំងអស់ ឱ្យបានជ្រាបថា សាលាបានចាត់តាំងគ្រូបន្ទុកថ្នាក់ផ្ទាល់ខ្លួនសម្រាប់ថ្នាក់នីមួយៗ ចាប់ពីថ្នាក់ទី១-ក ដល់ ថ្នាក់ទី៦-ក។',
    author: 'គណៈគ្រប់គ្រងសាលា',
    role: 'ការិយាល័យសិក្សាធិការ',
    date: '2026-09-23',
    category: 'រដ្ឋបាល',
    priority: 'ខ្ពស់',
    targetAudience: 'ទាំងអស់'
  },
  {
    id: 'ann2',
    title: 'កម្មវិធីប្រកួតអានអត្ថបទខ្មែរ និងសរសេរស្អាត សាលាបឋមសិក្សា អន្លង់តាម៉ី',
    content: 'សាលានឹងរៀបចំការប្រកួតអាន និងសរសេរអក្សរផ្ចង់ សម្រាប់សិស្សថ្នាក់ទី១ ដល់ ថ្នាក់ទី៦ នៅអាគារសាលប្រជុំសាលា។',
    author: 'អ្នកគ្រូ គឹម ស្រីពៅ',
    role: 'ប្រធានក្រុមបច្ចេកទេស',
    date: '2026-09-20',
    category: 'កម្មវិធីសាលា',
    priority: 'មធ្យម',
    targetAudience: 'សិស្សានុសិស្ស'
  }
];

export const initialEvents: SchoolEvent[] = [
  { id: 'ev1', title: 'ការវាយតម្លៃពិន្ទុប្រចាំខែតុលា (១៣ មុខវិជ្ជា ថ្នាក់ទី១-៦)', date: '2026-10-24', time: '07:00 ព្រឹក - 11:00 ព្រឹក', location: 'បន្ទប់រៀនសាលាបឋមសិក្សា អន្លង់តាម៉ី', description: 'ការប្រឡងតេស្តប្រចាំខែសម្រាប់ថ្នាក់ទី១-៦', type: 'ប្រឡង' },
  { id: 'ev2', title: 'ពិធីដាំដើមឈើ និងអនាម័យបរិស្ថានសាលា', date: '2026-10-15', time: '08:00 ព្រឹក - 11:00 ព្រឹក', location: 'ទីធ្លាសាលាបឋមសិក្សា អន្លង់តាម៉ី', description: 'សកម្មភាពបំណិនជីវិតសិស្សានុសិស្ស', type: 'កីឡា' }
];

// ================= 1. បវេសនកាល & បញ្ជីកុមារគ្រប់អាយុក្នុងភូមិចំណុះ =================
export const initialCensusChildren: CatchmentCensusChild[] = [
  {
    id: 'cen1',
    childCode: 'CEN-ALT-2026-001',
    name: 'ឡុង សុវណ្ណារ៉ា',
    gender: 'ប្រុស',
    dob: '2020-03-15',
    age: 6,
    village: 'ភូមិអន្លង់តាម៉ី',
    guardianName: 'ឡុង សុខា',
    guardianPhone: '012 888 111',
    status: 'បានចូលរៀន',
    enrolledSchool: 'សាលាបឋមសិក្សា អន្លង់តាម៉ី',
    enrolledGrade: 'ថ្នាក់ទី ១-ក',
    actionTaken: 'បានចុះឈ្មោះចូលរៀនផ្លូវការ'
  },
  {
    id: 'cen2',
    childCode: 'CEN-ALT-2026-002',
    name: 'ជា ស្រីលីន',
    gender: 'ស្រី',
    dob: '2020-07-20',
    age: 6,
    village: 'ភូមិចំការស្វាយ',
    guardianName: 'ជា សំអាត',
    guardianPhone: '092 777 222',
    status: 'បានចូលរៀន',
    enrolledSchool: 'សាលាបឋមសិក្សា អន្លង់តាម៉ី',
    enrolledGrade: 'ថ្នាក់ទី ១-ក'
  },
  {
    id: 'cen3',
    childCode: 'CEN-ALT-2026-003',
    name: 'សន វិសាល',
    gender: 'ប្រុស',
    dob: '2020-05-10',
    age: 6,
    village: 'ភូមិចំការស្វាយ',
    guardianName: 'សន ធារី',
    guardianPhone: '097 444 333',
    status: 'មិនទាន់ចូលរៀន',
    reasonNotEnrolled: 'គ្រួសារក្រីក្រ និងខ្វះខាតសម្ភារសិក្សា',
    actionTaken: 'គណៈកម្មាធិការ គគថ ចុះណែនាំ និងផ្តល់កញ្ចប់អាហារូបករណ៍'
  },
  {
    id: 'cen4',
    childCode: 'CEN-ALT-2026-004',
    name: 'មាស សុជាតា',
    gender: 'ស្រី',
    dob: '2020-11-05',
    age: 6,
    village: 'ភូមិអន្លង់តាម៉ី',
    guardianName: 'មាស សុផល',
    guardianPhone: '017 555 444',
    status: 'មិនទាន់ចូលរៀន',
    reasonNotEnrolled: 'អាណាព្យាបាលចង់ឱ្យចូលរៀនថ្នាក់មត្តេយ្យសិន',
    actionTaken: 'បានរៀបចំចូលរៀនថ្នាក់មត្តេយ្យសហគមន៍'
  }
];

// ================= 2. ឧបករណ៍វាយតម្លៃមត្តេយ្យ (Preschool Assessment Tool) =================
export const initialPreschoolAssessments: PreschoolAssessment[] = [
  {
    id: 'ps1',
    studentId: 'ps_std_01',
    studentName: 'មាស សុជាតា',
    dob: '2020-11-05',
    gender: 'ស្រី',
    term: 'ឆមាសទី១',
    evaluatorTeacherName: 'អ្នកគ្រូ សុខ ចាន់ធី',
    date: '2026-09-20',
    indicators: [
      { indicatorId: 'ind1', category: 'កាយសម្បទា & សុខភាព', title: 'ការក្ដាប់កាន់ខ្មៅដៃ និងការប្រើប្រាស់កន្ត្រៃកាត់', rating: 'ល្អ' },
      { indicatorId: 'ind2', category: 'សង្គម & អារម្មណ៍', title: 'ការលេងសហការជាមួយមិត្តភក្តិ និងការចែករំលែក', rating: 'ល្អប្រសើរ' },
      { indicatorId: 'ind3', category: 'ភាសាខ្មែរ & ការប្រាស្រ័យទាក់ទង', title: 'ការស្គាល់តួអក្សរស្រៈ និងការប្រកបសំឡេងដំបូង', rating: 'ល្អ' },
      { indicatorId: 'ind4', category: 'គណិតវិទ្យាដំបូង', title: 'ការរាប់លេខ និងការស្គាល់ចំនួន ១ ដល់ ១០', rating: 'ល្អប្រសើរ' },
      { indicatorId: 'ind5', category: 'វិទ្យាសាស្ត្រ & បរិស្ថាន', title: 'ការស្គាល់ពណ៌ សត្វ និងរុក្ខជាតិក្នុងសហគមន៍', rating: 'ល្អ' }
    ],
    overallRemarks: 'កុមារមានការលូតលាស់ផ្នែកកាយសម្បទា និងអារម្មណ៍សង្គមបានល្អប្រសើរ។ ឆ្លាតវៃ និងចូលចិត្តការរៀនតាមរយៈល្បែងសិក្សា។'
  }
];

// ================= 3. ជំនួយសិស្ស (Student Support & Welfare) =================
export const initialStudentSupports: StudentSupportRecord[] = [
  {
    id: 'sup_nsaf_1',
    studentId: 's101',
    studentName: 'ឡុង សុវណ្ណារ៉ា',
    grade: 'ថ្នាក់ទី ១',
    section: 'ក',
    gender: 'ប្រុស',
    equityStatus: 'ក្រ១ (IDPoor 1)',
    category: 'មូលនិធិជាតិជំនួយសង្គម NSAF (២០,០០០៛/ខែ)',
    providerName: 'មូលនិធិជាតិជំនួយសង្គម (NSAF / MoEYS)',
    itemDescription: 'ប្រាក់ឧបត្ថម្ភសង្គមប្រចាំខែសម្រាប់កុមារមានបណ្ណសមធម៌',
    amountOrValue: '២០,០០០ ៛/ខែ',
    dateProvided: '2026-09-01',
    status: 'កំពុងទទួលបាន',
    nsafConditionStatus: 'យល់ព្រម',
    monthlyAllowanceRiel: 20000,
    verificationNote: 'គ្រប់លក្ខខណ្ឌ៖ មានបណ្ណសមធម៌ ក្រ១ ស្របច្បាប់ និងវត្តមានសិក្សា ៩៦.៥%'
  },
  {
    id: 'sup_nsaf_2',
    studentId: 's203',
    studentName: 'អ៊ុក ណារិទ្ធ',
    grade: 'ថ្នាក់ទី ២',
    section: 'ខ',
    gender: 'ប្រុស',
    equityStatus: 'ក្រ១ (IDPoor 1)',
    category: 'មូលនិធិជាតិជំនួយសង្គម NSAF (២០,០០០៛/ខែ)',
    providerName: 'មូលនិធិជាតិជំនួយសង្គម (NSAF / MoEYS)',
    itemDescription: 'ប្រាក់ឧបត្ថម្ភសង្គមប្រចាំខែសម្រាប់កុមារមានបណ្ណសមធម៌',
    amountOrValue: '២០,០០០ ៛/ខែ',
    dateProvided: '2026-09-01',
    status: 'កំពុងទទួលបាន',
    nsafConditionStatus: 'យល់ព្រម',
    monthlyAllowanceRiel: 20000,
    verificationNote: 'គ្រប់លក្ខខណ្ឌ៖ មានបណ្ណសមធម៌ ក្រ១ ស្របច្បាប់ និងវត្តមានសិក្សា ៩៧.០%'
  },
  {
    id: 'sup_nsaf_3',
    studentId: 's1',
    studentName: 'ចាន់ សុភា',
    grade: 'ថ្នាក់ទី ៤',
    section: 'ក',
    gender: 'ស្រី',
    equityStatus: 'ក្រ១ (IDPoor 1)',
    category: 'មូលនិធិជាតិជំនួយសង្គម NSAF (២០,០០០៛/ខែ)',
    providerName: 'មូលនិធិជាតិជំនួយសង្គម (NSAF / MoEYS)',
    itemDescription: 'ប្រាក់ឧបត្ថម្ភសង្គមប្រចាំខែសម្រាប់កុមារមានបណ្ណសមធម៌',
    amountOrValue: '២០,០០០ ៛/ខែ',
    dateProvided: '2026-09-01',
    status: 'កំពុងទទួលបាន',
    nsafConditionStatus: 'យល់ព្រម',
    monthlyAllowanceRiel: 20000,
    verificationNote: 'គ្រប់លក្ខខណ្ឌ៖ មានបណ្ណសមធម៌ ក្រ១ ស្របច្បាប់ និងវត្តមានសិក្សា ៩៥.០%'
  },
  {
    id: 'sup_nsaf_4',
    studentId: 's205',
    studentName: 'សេង រតនា',
    grade: 'ថ្នាក់ទី ៣',
    section: 'ក',
    gender: 'ប្រុស',
    equityStatus: 'ក្រ២ (IDPoor 2)',
    category: 'មូលនិធិជាតិជំនួយសង្គម NSAF (២០,០០០៛/ខែ)',
    providerName: 'មូលនិធិជាតិជំនួយសង្គម (NSAF / MoEYS)',
    itemDescription: 'ប្រាក់ឧបត្ថម្ភសង្គមប្រចាំខែសម្រាប់កុមារមានបណ្ណសមធម៌',
    amountOrValue: '០ ៛ (មិនទទួលបាន)',
    dateProvided: '2026-09-01',
    status: 'កំពុងទទួលបាន',
    nsafConditionStatus: 'មិនគ្រប់លក្ខខណ្ឌ',
    monthlyAllowanceRiel: 0,
    verificationNote: 'មិនគ្រប់លក្ខខណ្ឌ៖ អវត្តមានលើសពី ៣០% ក្នុងខែ និងពុំទាន់បានបច្ចុប្បន្នភាពជីវមាត្រ'
  },
  {
    id: 'sup_nsaf_5',
    studentId: 's206',
    studentName: 'មាស សុខា',
    grade: 'ថ្នាក់ទី ៥',
    section: 'ខ',
    gender: 'ស្រី',
    equityStatus: 'ក្រ២ (IDPoor 2)',
    category: 'មូលនិធិជាតិជំនួយសង្គម NSAF (២០,០០០៛/ខែ)',
    providerName: 'មូលនិធិជាតិជំនួយសង្គម (NSAF / MoEYS)',
    itemDescription: 'ប្រាក់ឧបត្ថម្ភសង្គមប្រចាំខែសម្រាប់កុមារមានបណ្ណសមធម៌',
    amountOrValue: 'រង់ចាំការបញ្ជាក់',
    dateProvided: '2026-09-01',
    status: 'កំពុងទទួលបាន',
    nsafConditionStatus: 'រង់ចាំការបញ្ជាក់',
    monthlyAllowanceRiel: 0,
    verificationNote: 'រង់ចាំការផ្ទៀងផ្ទាត់បញ្ជីបណ្ណសមធម៌ និងវត្តមានប្រចាំខែពីអាជ្ញាធរឃុំ'
  },
  {
    id: 'sup1',
    studentId: 's101',
    studentName: 'ឡុង សុវណ្ណារ៉ា',
    grade: 'ថ្នាក់ទី ១',
    section: 'ក',
    gender: 'ប្រុស',
    equityStatus: 'ក្រ១ (IDPoor 1)',
    category: 'អាហារូបត្ថម្ភ (Nutrition)',
    providerName: 'កម្មវិធីផ្ដល់អាហារតាមសាលារៀន (MoEYS / WFP)',
    itemDescription: 'អាហារពេលព្រឹកក្ដៅៗ (បាយ, ស៊ុបបន្លែ, ត្រីកំប៉ុង, អំបិលអុីយ៉ូដ)',
    amountOrValue: 'ផ្តល់ជូនរៀងរាល់ថ្ងៃសិក្សា',
    dateProvided: '2026-09-01',
    status: 'កំពុងទទួលបាន'
  },
  {
    id: 'sup2',
    studentId: 's101',
    studentName: 'ឡុង សុវណ្ណារ៉ា',
    grade: 'ថ្នាក់ទី ១',
    section: 'ក',
    gender: 'ប្រុស',
    equityStatus: 'ក្រ១ (IDPoor 1)',
    category: 'អាហារូបករណ៍រដ្ឋ (Scholarship)',
    providerName: 'មូលនិធិសមធម៌អប់រំជាតិ (MoEYS)',
    itemDescription: 'ប្រាក់ឧបត្ថម្ភអាហារូបករណ៍សិស្សក្រីក្រ',
    amountOrValue: '២៤០,០ ៛/ឆ្នាំ (៦០,០០០ ៛/ត្រីមាស)',
    dateProvided: '2026-09-10',
    status: 'កំពុងទទួលបាន'
  },
  {
    id: 'sup3',
    studentId: 's1',
    studentName: 'ចាន់ សុភា',
    grade: 'ថ្នាក់ទី ៤',
    section: 'ក',
    gender: 'ស្រី',
    equityStatus: 'ក្រ១ (IDPoor 1)',
    category: 'ឧបត្ថម្ភពីដៃគូ (NGO/Partner Aid)',
    providerName: 'អង្គការកុមារកម្ពុជា (Child Fund Cambodia)',
    itemDescription: 'កង់ដឹកជញ្ជូន ថង់សៀវភៅ និងសម្ភារសិក្សា ១កញ្ចប់',
    amountOrValue: '១ គ្រឿង + ឧបករណ៍សិក្សា',
    dateProvided: '2026-09-15',
    status: 'បានបញ្ចប់'
  }
];

// ================= 4. សកម្មភាពសាលា & ភស្ដុតាងសាលាស្ដង់ដារគំរូ =================
export const initialSchoolActivities: SchoolActivityRecord[] = [
  {
    id: 'act1',
    title: 'ការប្រកួតអានអត្ថបទខ្មែរ និងស្ទាត់ជំនាញគណិតវិទ្យា ថ្នាក់ទី១-៦',
    activityType: 'ការប្រកួតប្រជែង',
    standardCategory: 'ស្ដង់ដារទី១ (ការសិក្សាសិស្ស)',
    date: '2026-09-18',
    location: 'សាលប្រជុំសាលាបឋមសិក្សា អន្លង់តាម៉ី',
    leadPerson: 'អ្នកគ្រូ គឹម ស្រីពៅ',
    participantsCount: 45,
    description: 'ការប្រកួតជ្រើសរើសសិស្សពូកែអាន និងគណិតវិទ្យាប្រចាំដើមឆ្នាំសិក្សា',
    outcomeEvidence: 'លិខិតសរសើរ និងពានរង្វាន់លេខ១, ទី២, ទី៣ ជូនសិស្សជ័យលាភី'
  },
  {
    id: 'act2',
    title: 'សកម្មភាពក្លឹបអំណាន និងក្លឹបបរិស្ថានបៃតងសាលារៀន',
    activityType: 'ក្លឹបសិក្សា',
    standardCategory: 'ស្ដង់ដារទី៤ (បរិស្ថាន)',
    date: '2026-09-22',
    location: 'បណ្ណាល័យ និងសួនច្បារសាលា',
    leadPerson: 'សិស្ស ឡុង សុវណ្ណារ៉ា (ប្រធានក្រុមប្រឹក្សាកុមារ)',
    participantsCount: 60,
    description: 'សិស្សានុសិស្សរួមគ្នាអានសៀវភៅ និងដាំកូនឈើលម្អបរិស្ថាន',
    outcomeEvidence: 'រូបថតសកម្មភាពសួនបៃតង និងបញ្ជីវត្តមានសិស្សក្លឹប'
  },
  {
    id: 'act3',
    title: 'ការប្រជុំកម្រងបច្ចេកទេសគ្រូបង្រៀនថ្នាក់ទី១-៣ និង ទី៤-៦',
    activityType: 'ប្រជុំបច្ចេកទេស',
    standardCategory: 'ស្ដង់ដារទី២ (ការបង្រៀន)',
    date: '2026-09-24',
    location: 'បន្ទប់បច្ចេកទេសសាលារៀន',
    leadPerson: 'លោកនាយក ឈិត សារ៉ាំ',
    participantsCount: 12,
    description: 'ការពិនិត្យកិច្ចតែងការបង្រៀនស្ដង់ដារ និងវិធីសាស្ត្រ EGR/EGM',
    outcomeEvidence: 'កំណត់ហេតុប្រជុំកម្រងបច្ចេកទេស និងកាលវិភាគពិនិត្យកិច្ចតែងការ'
  }
];

// ================= 5. ផែនការប្រជុំមាតាបិតា ១ឆ្នាំសិក្សា =================
export const initialParentMeetingPlans: ParentMeetingPlan[] = [
  {
    id: 'pmp1',
    meetingNumber: 'លើកទី ១ (ដើមឆ្នាំសិក្សា)',
    plannedDate: '2026-11-05',
    time: '08:00 ព្រឹក - 11:00 ព្រឹក',
    agendaTopic: 'ការតំរង់ទិសដើមឆ្នាំសិក្សា ឆ្នាំ២០២៦-២០២៧, ការបោះឆ្នោតជ្រើសរើស គគថ និងការប្រមូលវិភាគទានសហគមន៍',
    targetAudience: 'មាតាបិតា និងអាណាព្យាបាលសិស្សថ្នាក់ទី១ ដល់ ថ្នាក់ទី៦',
    responsiblePerson: 'លោកនាយក ឈិត សារ៉ាំ & គណៈគ្រប់គ្រងសាលា',
    expectedOutput: 'ការយល់ព្រមលើបទបញ្ជាផ្ទៃក្នុងសាលា និងសមាសភាព គគថ ថ្មី',
    status: 'បានរៀបចំរួច',
    actualAttendanceCount: 145
  },
  {
    id: 'pmp2',
    meetingNumber: 'លើកទី ២ (ដំណាច់ឆមាសទី១)',
    plannedDate: '2027-02-25',
    time: '08:00 ព្រឹក - 11:00 ព្រឹក',
    agendaTopic: 'ការរាយការណ៍លទ្ធផលសិក្សា និងវត្តមានសិស្សឆមាសទី១, ការចែកសៀវភៅតាមដានលទ្ធផលសិក្សា',
    targetAudience: 'មាតាបិតាសិស្សគ្រប់កម្រិតថ្នាក់',
    responsiblePerson: 'លោកគ្រូ អ្នកគ្រូបន្ទុកថ្នាក់ទាំងអស់',
    expectedOutput: 'អាណាព្យាបាលបានដឹងពីពិន្ទុ និងការរីកចម្រើនរបស់កូនៗ',
    status: 'រង់ចាំអនុវត្ត'
  },
  {
    id: 'pmp3',
    meetingNumber: 'លើកទី ៣ (ដំណាច់ឆ្នាំសិក្សា)',
    plannedDate: '2027-07-25',
    time: '08:00 ព្រឹក - 11:00 ព្រឹក',
    agendaTopic: 'ពិធីបូកសរុបលទ្ធផលការសិក្សាដំណាច់ឆ្នាំ, ពិធីប្រគល់បណ្ណសរសើរ និងជ័យលាភីសិស្សពូកែ',
    targetAudience: 'មាតាបិតាសិស្ស, អាជ្ញាធរដែនដី និងសប្បុរសជន',
    responsiblePerson: 'គណៈគ្រប់គ្រងសាលា & គណៈកម្មាធិការ គគថ',
    expectedOutput: 'ការអបអរសាទរជ័យលាភីសិស្សពូកែ និងការវាយតម្លៃផែនការសាលា',
    status: 'រង់ចាំអនុវត្ត'
  }
];

// ================= 6. បញ្ជីប្រគល់ ទទួលសម្ភារៈ =================
export const initialMaterialHandovers: MaterialHandover[] = [
  {
    id: 'ho1',
    handoverType: 'ទទួល (Receive)',
    itemName: 'សៀវភៅសិក្សាគោលភាសាខ្មែរ & គណិតវិទ្យា ថ្នាក់ទី១-៦',
    category: 'សៀវភៅសិក្សា',
    quantity: 450,
    unit: 'ក្បាល',
    fromParty: 'មន្ទីរអប់រំ យុវជន និងកីឡា ខេត្តបាត់ដំបង',
    toParty: 'សាលាបឋមសិក្សា អន្លង់តាម៉ី',
    date: '2026-09-01',
    receiverSignatureName: 'លោកនាយក ឈិត សារ៉ាំ'
  },
  {
    id: 'ho2',
    handoverType: 'ប្រគល់ (Distribute)',
    itemName: 'កញ្ចប់សៀវភៅសិក្សាគោល និងកត់ត្រា ជូនសិស្សថ្នាក់ទី៤-ក',
    category: 'សៀវភៅសិក្សា',
    quantity: 28,
    unit: 'កញ្ចប់',
    fromParty: 'សាលាបឋមសិក្សា អន្លង់តាម៉ី',
    toParty: 'សិស្សថ្នាក់ទី ៤-ក (តំណាងដោយ អ្នកគ្រូ គឹម ស្រីពៅ)',
    date: '2026-09-05',
    receiverSignatureName: 'អ្នកគ្រូ គឹម ស្រីពៅ'
  },
  {
    id: 'ho3',
    handoverType: 'ទទួល (Receive)',
    itemName: 'កញ្ចប់សម្ភារៈអំណាន & គណិតវិទ្យាថ្នាក់ដំបូង EGR/EGM កម្រិត ២ និង ៣',
    category: 'សម្ភារឧបទេស',
    quantity: 85,
    unit: 'កញ្ចប់',
    fromParty: 'ការិយាល័យអប់រំ យុវជន និងកីឡា ស្រុកបាណន់',
    toParty: 'សាលាបឋមសិក្សា អន្លង់តាម៉ី (ថ្នាក់ទី១-៣)',
    date: '2026-09-08',
    receiverSignatureName: 'លោកនាយករង ប្រុញ វឿន'
  },
  {
    id: 'ho4',
    handoverType: 'ទទួល (Receive)',
    itemName: 'កុំព្យូទ័រយួរដៃ Laptop Lenovo សម្រាប់បន្ទប់បច្ចេកវិទ្យាសិស្ស (ICT)',
    category: 'ឧបករណ៍បច្ចេកវិទ្យា',
    quantity: 5,
    unit: 'គ្រឿង',
    fromParty: 'ជំនួយពីសប្បុរសជន និងអតីតសិស្ស (គគថ)',
    toParty: 'សាលាបឋមសិក្សា អន្លង់តាម៉ី',
    date: '2026-09-12',
    receiverSignatureName: 'លោក វ៉ិត ជីវន្ថា (លេខា)'
  },
  {
    id: 'ho5',
    handoverType: 'ទទួល (Receive)',
    itemName: 'កញ្ចប់ស្បៀងអាហារពេលព្រឹកក្តៅៗ WFP (អង្ករ, ប្រេង, សណ្ដែក, ត្រីខ)',
    category: 'សម្ភារឧបទេស',
    quantity: 350,
    unit: 'គីឡូក្រាម',
    fromParty: 'កម្មវិធីស្បៀងអាហារពិភពលោក (WFP / MoEYS)',
    toParty: 'សាលាបឋមសិក្សា អន្លង់តាម៉ី',
    date: '2026-09-15',
    receiverSignatureName: 'លោកនាយក ឈិត សារ៉ាំ'
  },
  {
    id: 'ho6',
    handoverType: 'ប្រគល់ (Distribute)',
    itemName: 'ឧបករណ៍កីឡា (បាល់ទាត់, បាល់ទះ, បាល់បោះ, រ៉ាកែតវាយសី)',
    category: 'ឧបករណ៍កីឡា',
    quantity: 15,
    unit: 'គ្រឿង',
    fromParty: 'សាលាបឋមសិក្សា អន្លង់តាម៉ី',
    toParty: 'ក្រុមប្រឹក្សាកុមារ & គ្រូអប់រំកាយ',
    date: '2026-09-18',
    receiverSignatureName: 'លោកគ្រូ ស៊ុន ដារ៉ា'
  }
];

// ================= 7. បញ្ជីចំណូល ចំណាយ (Financial Transactions) =================
export const initialFinancialTransactions: FinancialTransaction[] = [
  {
    id: 'ft1',
    voucherNo: 'INC-PB-2026-001',
    transactionType: 'ចំណូល (Income)',
    title: 'ថវិកាកម្មវិធី PB (Program Budget) ពីរដ្ឋ ឆមាសទី១ (កូដ ៦០-៦៣)',
    category: 'ថវិការដ្ឋ (PB)',
    amountRiel: 12000000,
    amountUSD: 3000,
    date: '2026-09-01',
    handledBy: 'លោកនាយក ឈិត សារ៉ាំ',
    remarks: 'ថវិកាដំណើរការសាលារៀនឆមាសទី១ ឆ្នាំ២០២៦-២០២៧ (បិទផ្សាយតម្លាភាព)'
  },
  {
    id: 'ft2',
    voucherNo: 'INC-SSC-2026-002',
    transactionType: 'ចំណូល (Income)',
    title: 'វិភាគទានសហគមន៍ វត្តអារាម និងសប្បុរសជន (គគថ)',
    category: 'វិភាគទានសហគមន៍',
    amountRiel: 4000000,
    amountUSD: 1000,
    date: '2026-09-10',
    handledBy: 'អ្នកស្រី គឹម ស្រីមុំ (បេឡាធិការ គគថ)',
    remarks: 'វិភាគទានទ្រទ្រង់ការកសាងសួនច្បារបៃតង និងដាំដើមឈើ ៥០ ដើម'
  },
  {
    id: 'ft3',
    voucherNo: 'EXP-PB-2026-001',
    transactionType: 'ចំណាយ (Expense)',
    title: 'ចំណាយទិញសម្ភារការិយាល័យ ក្រដាស A4 និងសម្ភារប្រឡងស្ដង់ដារ (កូដ ៦០)',
    category: 'ចំណាយសម្ភារសិក្សា',
    amountRiel: 800000,
    amountUSD: 200,
    date: '2026-09-15',
    handledBy: 'លោកនាយករង ប្រុញ វឿន',
    remarks: 'ទិញក្រដាស A4 ៥ កេស, មឹកព្រីន និងសំណុំតេស្តស្ដង់ដារដើមឆ្នាំ'
  },
  {
    id: 'ft4',
    voucherNo: 'EXP-PB-2026-002',
    transactionType: 'ចំណាយ (Expense)',
    title: 'ចំណាយថែទាំប្រព័ន្ធទឹកស្អាត អាងចម្រោះ និងបន្ទប់ទឹកអនាម័យ (កូដ ៦១)',
    category: 'ចំណាយជួសជុល',
    amountRiel: 600000,
    amountUSD: 150,
    date: '2026-09-18',
    handledBy: 'លោក វ៉ិត ជីវន្ថា (លេខា)',
    remarks: 'ផ្លាស់ប្តូរស្នូលចម្រោះទឹកពិសាសិស្ស និងជួសជុលក្បាលរ៉ូប៊ីណេបន្ទប់ទឹក'
  },
  {
    id: 'ft5',
    voucherNo: 'INC-SCH-2026-003',
    transactionType: 'ចំណូល (Income)',
    title: 'មូលនិធិអាហារូបករណ៍រដ្ឋ ជូនសិស្សក្រីក្រ (ក្រ១ / ក្រ២)',
    category: 'ជំនួយសប្បុរសជន',
    amountRiel: 3200000,
    amountUSD: 800,
    date: '2026-09-20',
    handledBy: 'លោកនាយក ឈិត សារ៉ាំ',
    remarks: 'បើកផ្តល់អាហារូបករណ៍ជូនសិស្សក្រីក្រចំនួន ១៦ នាក់'
  }
];

// ================= 8. បញ្ជីគ្រប់គ្រងសម្ភារៈ (School Asset Inventory) =================
export const initialSchoolAssets: SchoolAsset[] = [
  {
    id: 'ast1',
    assetCode: 'ALT-AST-2026-001',
    name: 'តុ និងកៅអីសិស្សឈើស្ដង់ដារ (១តុ សិស្ស២នាក់)',
    category: 'គ្រឿងសង្ហារិម',
    quantity: 120,
    condition: 'ល្អ (Good)',
    locationRoom: 'គ្រប់បន្ទប់រៀន (ថ្នាក់ទី១ ដល់ ទី៦)',
    acquisitionDate: '2023-10-01',
    valueRiel: 24000000
  },
  {
    id: 'ast2',
    assetCode: 'ALT-AST-2026-002',
    name: 'កុំព្យូទ័រយួរដៃ Laptop Lenovo Core i5 (ICT Lab)',
    category: 'ឧបករណ៍បច្ចេកវិទ្យា',
    quantity: 5,
    condition: 'ល្អ (Good)',
    locationRoom: 'បន្ទប់កុំព្យូទ័រ ICT & ទីចាត់ការ',
    acquisitionDate: '2026-09-12',
    valueRiel: 10000000
  },
  {
    id: 'ast3',
    assetCode: 'ALT-AST-2026-003',
    name: 'កញ្ចប់ Smart TV ៥៥ អ៊ីញ & ជើងទម្រចល័ត',
    category: 'ឧបករណ៍បច្ចេកវិទ្យា',
    quantity: 2,
    condition: 'ល្អ (Good)',
    locationRoom: 'បន្ទប់សិក្សាថ្នាក់ដំបូង & បន្ទប់ ICT',
    acquisitionDate: '2026-09-15',
    valueRiel: 3200000
  },
  {
    id: 'ast4',
    assetCode: 'ALT-AST-2026-004',
    name: 'ក្ដារខៀនម៉ាញ៉េទិចស្ដង់ដារ (Whiteboard)',
    category: 'ឧបករណ៍បង្រៀន',
    quantity: 12,
    condition: 'ល្អ (Good)',
    locationRoom: 'បន្ទប់រៀនថ្នាក់ទី១-៦',
    acquisitionDate: '2024-09-01',
    valueRiel: 3600000
  },
  {
    id: 'ast5',
    assetCode: 'ALT-AST-2026-005',
    name: 'អាងចម្រោះទឹកស្អាតពិសាសិស្ស ៣ ស្នូល',
    category: 'សម្ភារអនាម័យ',
    quantity: 2,
    condition: 'ល្អ (Good)',
    locationRoom: 'បរិស្ថានមុខបន្ទប់រៀន',
    acquisitionDate: '2025-01-10',
    valueRiel: 2000000
  },
  {
    id: 'ast6',
    assetCode: 'ALT-AST-2026-006',
    name: 'ប្រព័ន្ធធុងសំរាមបំបែក ៣ ពណ៌ (ខៀវ លឿង ក្រហម)',
    category: 'សម្ភារអនាម័យ',
    quantity: 6,
    condition: 'ល្អ (Good)',
    locationRoom: 'គ្រប់មុខថ្នាក់រៀន',
    acquisitionDate: '2026-02-01',
    valueRiel: 1200000
  },
  {
    id: 'ast7',
    assetCode: 'ALT-AST-2026-007',
    name: 'ទូកញ្ចក់រក្សាទុកសៀវភៅបណ្ណាល័យស្ដង់ដារ',
    category: 'គ្រឿងសង្ហារិម',
    quantity: 8,
    condition: 'ល្អ (Good)',
    locationRoom: 'បណ្ណាល័យសាលា (អ្នកស្រី សឹង រតនា)',
    acquisitionDate: '2024-11-15',
    valueRiel: 4800000
  }
];

