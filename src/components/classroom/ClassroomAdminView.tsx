import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Calendar,
  FileText,
  Boxes,
  Handshake,
  UserCheck,
  Activity,
  Award,
  Plus,
  Printer,
  CheckCircle2,
  Users,
  Building2,
  X
} from 'lucide-react';

export const ClassroomAdminView: React.FC = () => {
  const {
    students,
    userRole,
    addSchoolAsset,
    logActivity,
    schoolInfo,
    selectedAcademicYear
  } = useApp();

  // Selected Class (Defaults to ថ្នាក់ទី ៤-ក)
  const [selectedClass, setSelectedClass] = useState<string>('ថ្នាក់ទី ៤-ក');

  // Main Classroom Administration Sub-Tab
  const [activeTab, setActiveTab] = useState<
    'thursday' | 'plans' | 'inventory' | 'agreements' | 'slow_learners' | 'fitness' | 'domains'
  >('thursday');

  // Filter students for the selected class
  const classStudents = students.filter(
    s => `${s.grade}-${s.section}` === selectedClass || s.grade === selectedClass.split('-')[0]
  );
  // 1. Thursday Report State (របាយការណ៍ថ្ងៃព្រហស្បតិ៍)
  // ---------------------------------------------------------------------------
  const [thursdayReports, setThursdayReports] = useState<any[]>([
    {
      id: 'th_1',
      reportDate: '2026-11-26',
      weekNumber: 'សប្តាហ៍ទី ៤ (ខែវិច្ឆិកា)',
      totalStudents: 32,
      femaleStudents: 15,
      idPoorStudents: 6,
      absentWithPermission: 2,
      absentWithoutPermission: 0,
      actualTeachingHours: 30,
      plannedTeachingHours: 30,
      slowLearnersProgress: 'បានបង្រៀនបន្ថែមម៉ោងអំណាន និងគណិតវិទ្យា ដល់សិស្សចំនួន ៤នាក់ ទទួលបានលទ្ធផលល្អប្រសើរ។',
      parentContactNotes: 'បានប្រជុំ និងទាក់ទងទូរស័ព្ទជាមួយអាណាព្យាបាលសិស្ស ៣រូប អំពីវត្តមាន និងការសិក្សានៅផ្ទះ។',
      cleanlinessDiscipline: 'ថ្នាក់រៀនមានអនាម័យល្អ សិស្សពាក់ឯកសណ្ឋានត្រឹមត្រូវ និងគោរពវិន័យបាន ៩៥%។',
      principalRequests: 'សូមស្នើសុំបន្ថែមសៀវភៅអានកថាខណ្ឌ PLP ចំនួន ៥ក្បាល សម្រាប់បណ្ណាឡ័យថ្នាក់រៀន។',
      status: 'បានបញ្ជូន'
    },
    {
      id: 'th_2',
      reportDate: '2026-11-19',
      weekNumber: 'សប្តាហ៍ទី ៣ (ខែវិច្ឆិកា)',
      totalStudents: 32,
      femaleStudents: 15,
      idPoorStudents: 6,
      absentWithPermission: 1,
      absentWithoutPermission: 1,
      actualTeachingHours: 30,
      plannedTeachingHours: 30,
      slowLearnersProgress: 'បានផ្កូផ្គងមិត្តជួយមិត្តក្នុងការធ្វើលំហាត់គណិតវិទ្យាបូកដកលើសពី២ខ្ទង់។',
      parentContactNotes: 'បានចុះជួបអាណាព្យាបាលសិស្ស ១រូប ផ្ទាល់នៅផ្ទះ ករណីឈប់រៀនឥតច្បាប់ ១ថ្ងៃ។',
      cleanlinessDiscipline: 'បានរៀបចំវេនសម្អាតថ្នាក់រៀន និងដាំផ្កាមុខថ្នាក់បានស្អាតល្អ។',
      principalRequests: 'សូមស្នើសុំជួសជុលអំពូលភ្លើងក្នុងថ្នាក់រៀនចំនួន ១គ្រឿង។',
      status: 'បានបញ្ជូន'
    },
    {
      id: 'th_3',
      reportDate: '2026-11-12',
      weekNumber: 'សប្តាហ៍ទី ២ (ខែវិច្ឆិកា)',
      totalStudents: 32,
      femaleStudents: 15,
      idPoorStudents: 6,
      absentWithPermission: 0,
      absentWithoutPermission: 0,
      actualTeachingHours: 30,
      plannedTeachingHours: 30,
      slowLearnersProgress: 'បានសាកល្បងតេស្តស្ទង់សមត្ថភាពអំណានដើមឆ្នាំតាមកញ្ចប់ PLP។',
      parentContactNotes: 'បានផ្ញើលិខិតអញ្ជើញមាតាបិតាចូលរួមប្រជុំដើមឆ្នាំសិក្សា។',
      cleanlinessDiscipline: 'សិស្សានុសិស្សគោរពវិន័យបានល្អ និងចូលរួមសកម្មភាពអនាម័យបរិស្ថានសាលា។',
      principalRequests: 'បានទទួលសៀវភៅសិក្សាគោលគ្រប់គ្រាន់តាមចំនួនសិស្ស។',
      status: 'បានបញ្ជូន'
    }
  ]);

  const [showAddThursdayModal, setShowAddThursdayModal] = useState(false);
  const [newReportDate, setNewReportDate] = useState(new Date().toISOString().split('T')[0]);
  const [newWeekNum, setNewWeekNum] = useState('សប្តាហ៍ទី ១ (ខែធ្នូ)');
  const [newAbsentPerm, setNewAbsentPerm] = useState(1);
  const [newAbsentNoPerm, setNewAbsentNoPerm] = useState(0);
  const [newTeachingHours, setNewTeachingHours] = useState(30);
  const [newSlowLearnersNote, setNewSlowLearnersNote] = useState('');
  const [newParentNote, setNewParentNote] = useState('');
  const [newDisciplineNote, setNewDisciplineNote] = useState('');
  const [newRequestNote, setNewRequestNote] = useState('');

  const handleAddThursdayReport = (e: React.FormEvent) => {
    e.preventDefault();
    const newReport = {
      id: `th_${Date.now()}`,
      reportDate: newReportDate,
      weekNumber: newWeekNum,
      totalStudents: classStudents.length || 32,
      femaleStudents: classStudents.filter(s => s.gender === 'ស្រី').length || 15,
      idPoorStudents: classStudents.filter(s => s.equityCard && !s.equityCard.includes('គ្មាន')).length || 6,
      absentWithPermission: Number(newAbsentPerm),
      absentWithoutPermission: Number(newAbsentNoPerm),
      actualTeachingHours: Number(newTeachingHours),
      plannedTeachingHours: 30,
      slowLearnersProgress: newSlowLearnersNote || 'បានជួយសិស្សរៀនយឺតតាមកម្មវិធី PLP',
      parentContactNotes: newParentNote || 'បានទាក់ទងអាណាព្យាបាលទៀងទាត់',
      cleanlinessDiscipline: newDisciplineNote || 'អនាម័យ និងវិន័យថ្នាក់រៀនបានល្អ',
      principalRequests: newRequestNote || 'គ្មាន',
      status: 'បានបញ្ជូន'
    };

    setThursdayReports([newReport, ...thursdayReports]);
    logActivity('បង្កើត (Create)', `របាយការណ៍ថ្ងៃព្រហស្បតិ៍ (${selectedClass})`, `បានបង្កើតរបាយការណ៍ថ្ងៃព្រហស្បតិ៍ ${newWeekNum}`);
    setShowAddThursdayModal(false);
  };

  // ---------------------------------------------------------------------------
  // 2. Teaching Plans State (ផែនការបង្រៀន ៦ ប្រភេទ)
  // ---------------------------------------------------------------------------
  const [planType, setPlanType] = useState<'daily' | 'weekly' | 'monthly' | 'quarterly' | 'semester' | 'annual'>('daily');
  const [teachingPlans, setTeachingPlans] = useState<any[]>([
    {
      id: 'tp_1',
      type: 'daily',
      title: 'កិច្ចតែងការបង្រៀន ៖ ភាសាខ្មែរ (អំណានមេរៀនទី៥ "ស្រុកកំណើតខ្ញុំ")',
      subject: 'ភាសាខ្មែរ',
      gradeClass: 'ថ្នាក់ទី ៤-ក',
      duration: '៤០ នាទី',
      objective: 'ឱ្យសិស្សអានកថាខណ្ឌបានស្ទាត់ យល់ន័យពាក្យពិបាក និងឆ្លើយសំណួរមេរៀនបានត្រឹមត្រូវយ៉ាងតិច ៨០%។',
      teachingSteps: '១. រំលឹកមេរៀនចាស់ ២. ស្ទង់ចំណេះដឹង ៣. គ្រូពន្យល់ និងអានគំរូ ៤. សិស្សអនុវត្តជាដៃគូ ៥. ការវាយតម្លៃលទ្ធផល',
      resources: 'សៀវភៅសិក្សាគោល, ប័ណ្ណពាក្យ, ក្តារឆ្នួន, កញ្ចប់ PLP',
      dateCreated: '2026-11-20'
    },
    {
      id: 'tp_2',
      type: 'weekly',
      title: 'ផែនការបង្រៀនប្រចាំសប្តាហ៍ទី ៤ (ខែវិច្ឆិកា)',
      subject: 'គ្រប់មុខវិជ្ជា',
      gradeClass: 'ថ្នាក់ទី ៤-ក',
      duration: '១ សប្តាហ៍ (៣០ ម៉ោង)',
      objective: 'បង្រៀនគ្រប់ ៥ មុខវិជ្ជាតាមកម្មវិធីសិក្សាលម្អិត MoEYS និងពង្រឹងការអានគណិតវិទ្យាកម្រិតដំបូង។',
      teachingSteps: 'អនុវត្តតាមកាលវិភាគប្រចាំសប្តាហ៍ តាមដានការយល់ដឹងសិស្ស និងបង្រៀនបន្ថែមសិស្សរៀនយឺត។',
      resources: 'កញ្ចប់សម្ភារៈ PLP, ឧបករណ៍ពិសោធន៍វិទ្យាសាស្ត្រ',
      dateCreated: '2026-11-15'
    },
    {
      id: 'tp_3',
      type: 'monthly',
      title: 'ផែនការបង្រៀនប្រចាំខែវិច្ឆិកា ឆ្នាំ២០២៦',
      subject: 'គ្រប់មុខវិជ្ជា',
      gradeClass: 'ថ្នាក់ទី ៤-ក',
      duration: '១ ខែ (១២០ ម៉ោង)',
      objective: 'សម្រេចឱ្យបានតាមលទ្ធផលរំពឹងទុកនៃកម្មវិធីសិក្សាប្រចាំខែ និងប្រឡងប្រចាំខែវិច្ឆិកា។',
      teachingSteps: 'បង្រៀនមេរៀនថ្មី រំលឹកឡើងវិញ ធ្វើតេស្តប្រចាំខែ និងវាយតម្លៃពិន្ទុសម្បទាទាំង៣។',
      resources: 'កាលវិភាគប្រចាំខែ, ក្រដាសប្រឡង, កម្រងសំណួរ',
      dateCreated: '2026-11-01'
    },
    {
      id: 'tp_4',
      type: 'quarterly',
      title: 'ផែនការបង្រៀនប្រចាំត្រីមាសទី ១ (ឆ្នាំសិក្សា ២០២៦-២០២៧)',
      subject: 'គ្រប់មុខវិជ្ជា',
      gradeClass: 'ថ្នាក់ទី ៤-ក',
      duration: '៣ ខែ',
      objective: 'ពង្រឹងសមត្ថភាពមូលដ្ឋានអំណាន គណិតវិទ្យា និងការអប់រំសីលធម៌ពលរដ្ឋវិទ្យា។',
      teachingSteps: 'បង្រៀនតាមលំដាប់ជំពូក បង្កើតសកម្មភាពក្រុម និងវាយតម្លៃត្រីមាសទី១។',
      resources: 'កម្មវិធីសិក្សាជាតិ, ឯកសារណែនាំ MoEYS',
      dateCreated: '2026-11-01'
    },
    {
      id: 'tp_5',
      type: 'semester',
      title: 'ផែនការបង្រៀនប្រចាំឆមាសទី ១ ថ្នាក់ទី ៤-ក',
      subject: 'គ្រប់មុខវិជ្ជា',
      gradeClass: 'ថ្នាក់ទី ៤-ក',
      duration: '១ ឆមាស (១៨ សប្តាហ៍)',
      objective: 'ធានាថាសិស្សទាំងអស់ទទួលបានចំណេះដឹងតាមស្ដង់ដារឆមាសទី១ និងកាត់បន្ថយអត្រាត្រួតថ្នាក់។',
      teachingSteps: 'ផែនការបង្រៀនតាមសប្តាហ៍ ការវាយតម្លៃបន្ត និងការប្រឡងឆមាសទី១។',
      resources: 'សៀវភៅបន្ទុកគ្រូ, កម្មវិធីសិក្សាលម្អិត',
      dateCreated: '2026-11-01'
    },
    {
      id: 'tp_6',
      type: 'annual',
      title: 'ផែនការបង្រៀនប្រចាំឆ្នាំ (ឆ្នាំសិក្សា ២០២៦-២០២៧)',
      subject: 'គ្រប់មុខវិជ្ជា',
      gradeClass: 'ថ្នាក់ទី ៤-ក',
      duration: '១ ឆ្នាំសិក្សា (៣៨ សប្តាហ៍)',
      objective: 'សម្រេចបានស្ដង់ដារសាលារៀនគំរូ និងធានាអត្រាឡើងថ្នាក់ ៩៨% ឡើងទៅ។',
      teachingSteps: 'បែងចែកសប្តាហ៍សិក្សា ៣៨សប្តាហ៍ ការវាយតម្លៃឆមាសទាំងពីរ និងការជួយសិស្សរៀនយឺត។',
      resources: 'ផែនការសាលារៀន, កម្មវិធីសិក្សាជាតិ MoEYS',
      dateCreated: '2026-11-01'
    }
  ]);

  const [showAddPlanModal, setShowAddPlanModal] = useState(false);
  const [newPlanTitle, setNewPlanTitle] = useState('');
  const [newPlanSubject, setNewPlanSubject] = useState('ភាសាខ្មែរ');
  const [newPlanObjective, setNewPlanObjective] = useState('');
  const [newPlanSteps, setNewPlanSteps] = useState('');
  const [newPlanResources, setNewPlanResources] = useState('');

  const handleAddPlan = (e: React.FormEvent) => {
    e.preventDefault();
    const newPlan = {
      id: `tp_${Date.now()}`,
      type: planType,
      title: newPlanTitle || `ផែនការបង្រៀន ${newPlanSubject}`,
      subject: newPlanSubject,
      gradeClass: selectedClass,
      duration: planType === 'daily' ? '៤០ នាទី' : planType === 'weekly' ? '១ សប្តាហ៍' : '១ ខែ',
      objective: newPlanObjective || 'សម្រេចបានតាមស្ដង់ដារមេរៀន MoEYS',
      teachingSteps: newPlanSteps || 'ជំហានបង្រៀនទាំង៥ តាមវិធីសាស្ត្រសកម្ម',
      resources: newPlanResources || 'សៀវភៅសិក្សាគោល, សម្ភារឧបទេស',
      dateCreated: new Date().toISOString().split('T')[0]
    };

    setTeachingPlans([newPlan, ...teachingPlans]);
    logActivity('បង្កើត (Create)', `ផែនការបង្រៀន (${planType})`, `បានបង្កើត${newPlan.title}`);
    setShowAddPlanModal(false);
    setNewPlanTitle('');
    setNewPlanObjective('');
  };

  // ---------------------------------------------------------------------------
  // 3. Classroom Inventory & Auto-Sync State (បញ្ជីសារពើភ័ណ្ឌក្នុងថ្នាក់រៀន Auto ចូលសាលា)
  // ---------------------------------------------------------------------------
  const [classInventory, setClassInventory] = useState<any[]>([
    {
      id: 'cli_1',
      assetName: 'តុ និងកៅអីសិស្ស',
      category: 'គ្រឿងសង្ហារិម',
      quantity: 18,
      unit: 'ឈុត',
      condition: 'ល្អ (Good)',
      syncedToSchool: true,
      lastUpdated: '2026-11-01'
    },
    {
      id: 'cli_2',
      assetName: 'ក្តារខៀនសរសេរ',
      category: 'ឧបករណ៍បង្រៀន',
      quantity: 1,
      unit: 'ផ្ទាំង',
      condition: 'ល្អ (Good)',
      syncedToSchool: true,
      lastUpdated: '2026-11-01'
    },
    {
      id: 'cli_3',
      assetName: 'ទូរតាំងសៀវភៅអានថ្នាក់រៀន',
      category: 'គ្រឿងសង្ហារិម',
      quantity: 1,
      unit: 'ទូរ',
      condition: 'ល្អ (Good)',
      syncedToSchool: true,
      lastUpdated: '2026-11-05'
    },
    {
      id: 'cli_4',
      assetName: 'សៀវភៅអានកថាខណ្ឌ និងកញ្ចប់ PLP',
      category: 'ឧបករណ៍បង្រៀន',
      quantity: 35,
      unit: 'ក្បាល',
      condition: 'ល្អ (Good)',
      syncedToSchool: true,
      lastUpdated: '2026-11-10'
    },
    {
      id: 'cli_5',
      assetName: 'ទូរទស្សន៍ Smart TV / ឧបករណ៍បច្ចេកវិទ្យា',
      category: 'ឧបករណ៍បច្ចេកវិទ្យា',
      quantity: 1,
      unit: 'គ្រឿង',
      condition: 'ល្អ (Good)',
      syncedToSchool: true,
      lastUpdated: '2026-11-12'
    },
    {
      id: 'cli_6',
      assetName: 'កញ្ចប់សម្ភារៈអនាម័យថ្នាក់រៀន (ធុងសំរាម, អំបោស, ច្រាស)',
      category: 'សម្ភារអនាម័យ',
      quantity: 1,
      unit: 'ឈុត',
      condition: 'មធ្យម (Fair)',
      syncedToSchool: true,
      lastUpdated: '2026-11-15'
    },
    {
      id: 'cli_7',
      assetName: 'កញ្ចប់សម្ភារកីឡានិងល្បែងសិក្សា',
      category: 'សម្ភារកីឡា',
      quantity: 1,
      unit: 'ឈុត',
      condition: 'ល្អ (Good)',
      syncedToSchool: true,
      lastUpdated: '2026-11-18'
    }
  ]);

  const [showAddInventoryModal, setShowAddInventoryModal] = useState(false);
  const [newAssetName, setNewAssetName] = useState('');
  const [newAssetCategory, setNewAssetCategory] = useState<'គ្រឿងសង្ហារិម' | 'ឧបករណ៍បច្ចេកវិទ្យា' | 'សម្ភារកីឡា' | 'ឧបករណ៍បង្រៀន' | 'សម្ភារអនាម័យ'>('គ្រឿងសង្ហារិម');
  const [newAssetQty, setNewAssetQty] = useState(1);
  const [newAssetUnit, setNewAssetUnit] = useState('គ្រឿង');
  const [newAssetCondition, setNewAssetCondition] = useState<'ល្អ (Good)' | 'មធ្យម (Fair)' | 'ត្រូវការជួសជុល (Needs Repair)' | 'ខូចខាត (Broken)'>('ល្អ (Good)');

  const handleAddClassroomAsset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAssetName.trim()) return;

    const newCli = {
      id: `cli_${Date.now()}`,
      assetName: newAssetName.trim(),
      category: newAssetCategory,
      quantity: Number(newAssetQty),
      unit: newAssetUnit,
      condition: newAssetCondition,
      syncedToSchool: true,
      lastUpdated: new Date().toISOString().split('T')[0]
    };

    setClassInventory([newCli, ...classInventory]);

    // AUTO-SYNC into main School Inventory Context (schoolAssets)
    addSchoolAsset({
      name: `[${selectedClass}] ${newAssetName.trim()}`,
      category: newAssetCategory,
      quantity: Number(newAssetQty),
      condition: newAssetCondition,
      locationRoom: selectedClass,
      acquisitionDate: new Date().toISOString().split('T')[0],
      valueRiel: 0
    });

    logActivity(
      'បង្កើត (Create)',
      `សារពើភ័ណ្ឌថ្នាក់រៀន ${selectedClass}`,
      `បានបន្ថែមសម្ភារៈ "${newAssetName}" ចំនួន ${newAssetQty} ${newAssetUnit} (Auto Synced ចូលក្នុងប្រព័ន្ធសាលា)`
    );

    setShowAddInventoryModal(false);
    setNewAssetName('');
  };

  // ---------------------------------------------------------------------------
  // 4. Agreements & Contracts State (កិច្ចព្រមព្រៀងមាតាបិតា & កិច្ចព្រមព្រៀងគ្រូ-នាយក)
  // ---------------------------------------------------------------------------
  const [agreementType, setAgreementType] = useState<'parent' | 'principal'>('parent');
  const [agreements, setAgreements] = useState<any[]>([
    {
      id: 'ag_1',
      type: 'parent',
      studentName: 'ឡុង សុវណ្ណារ៉ា',
      parentName: 'ឡុង សុខា',
      teacherName: 'លោកគ្រូ ស៊ឹម សុផល',
      agreementDate: '2026-11-02',
      terms: '១. តាមដាន និងជួយរំលឹកកូនធ្វើកិច្ចការផ្ទះរៀងរាល់ថ្ងៃ ២. មិនបណ្តោយឱ្យកូនឈប់រៀនឥតច្បាប់ ៣. ចូលរួមប្រជុំមាតាបិតាជាទៀងទាត់',
      status: 'បានចុះហត្ថលេខា'
    },
    {
      id: 'ag_2',
      type: 'parent',
      studentName: 'ស៊ិន សុជាតិ',
      parentName: 'ស៊ិន ចាន់ថន',
      teacherName: 'លោកគ្រូ ស៊ឹម សុផល',
      agreementDate: '2026-11-05',
      terms: '១. ជួយរំលឹកសិស្សអានសៀវភៅនៅផ្ទះយ៉ាងតិច ៣០ នាទី/ថ្ងៃ ២. សហការជាមួយគ្រូក្នុងការបង្រៀនបន្ថែម PLP',
      status: 'បានចុះហត្ថលេខា'
    },
    {
      id: 'ag_3',
      type: 'parent',
      studentName: 'ជា ស្រីលីន',
      parentName: 'ជា ម៉េង',
      teacherName: 'លោកគ្រូ ស៊ឹម សុផល',
      agreementDate: '2026-11-08',
      terms: '១. ការពារសុខភាព និងត្រួតពិនិត្យអនាម័យខ្លួនប្រាណកូនមុនមកសាលា ២. ជួយផ្តល់សម្ភារសិក្សាគ្រប់គ្រាន់',
      status: 'បានចុះហត្ថលេខា'
    },
    {
      id: 'ag_4',
      type: 'principal',
      teacherName: 'លោកគ្រូ ស៊ឹម សុផល',
      principalName: schoolInfo.principalName || 'លោកនាយក ឈិត សារ៉ាំ',
      agreementDate: '2026-11-01',
      terms: '១. បង្រៀនគ្រប់ ៣០ ម៉ោង/សប្តាហ៍ តាមកម្មវិធីសិក្សា MoEYS ២. ជួយសិស្សរៀនយឺតឱ្យសម្រេចបានអត្រាឡើងថ្នាក់ >៩៥% ៣. គោរពក្រមសីលធម៌គ្រូបង្រៀន',
      status: 'បានចុះហត្ថលេខា'
    },
    {
      id: 'ag_5',
      type: 'principal',
      teacherName: 'លោកគ្រូ ស៊ឹម សុផល',
      principalName: schoolInfo.principalName || 'លោកនាយក ឈិត សារ៉ាំ',
      agreementDate: '2026-11-10',
      terms: 'កិច្ចព្រមព្រៀងអនុវត្តផែនការកែលម្អការសិក្សាសិស្សរៀនយឺត (PLP Intervention Contract) ឆមាសទី១',
      status: 'បានចុះហត្ថលេខា'
    }
  ]);

  const [showAddAgreementModal, setShowAddAgreementModal] = useState(false);
  const [selectedStudentForAgr, setSelectedStudentForAgr] = useState(classStudents[0]?.firstName || 'ឡុង សុវណ្ណារ៉ា');
  const [parentNameAgr, setParentNameAgr] = useState('ឡុង សុខា');
  const [termsAgr, setTermsAgr] = useState('');

  const handleAddAgreement = (e: React.FormEvent) => {
    e.preventDefault();
    const newAgr = {
      id: `ag_${Date.now()}`,
      type: agreementType,
      studentName: selectedStudentForAgr,
      parentName: parentNameAgr,
      teacherName: 'លោកគ្រូ ស៊ឹម សុផល',
      principalName: schoolInfo.principalName || 'លោកនាយក ឈិត សារ៉ាំ',
      agreementDate: new Date().toISOString().split('T')[0],
      terms: termsAgr || 'គោរពតាមលក្ខខណ្ឌកិច្ចព្រមព្រៀងស្ដង់ដារ MoEYS យ៉ាងខ្ជាប់ខ្ជួន',
      status: 'បានចុះហត្ថលេខា'
    };

    setAgreements([newAgr, ...agreements]);
    logActivity('បង្កើត (Create)', `កិច្ចព្រមព្រៀង (${agreementType === 'parent' ? 'មាតាបិតា' : 'គ្រូ-នាយក'})`, `បានបង្កើតកិច្ចព្រមព្រៀងផ្លូវការ`);
    setShowAddAgreementModal(false);
  };

  // ---------------------------------------------------------------------------
  // 5. Slow Learners Support State (របាយការណ៍ជួយសិស្សរៀនយឺត)
  // ---------------------------------------------------------------------------
  const [slowLearners, setSlowLearners] = useState<any[]>([
    {
      id: 'sl_1',
      studentName: 'ស៊ិន សុជាតិ',
      gender: 'ប្រុស',
      weakSubjects: 'អំណាន និង គណិតវិទ្យា',
      diagnosis: 'មិនទាន់ស្គាល់ព្យញ្ជនៈតម្រួត និងបូកដកលេខលើសពី២ខ្ទង់',
      interventions: 'បង្រៀនបន្ថែមម៉ោង ១ម៉ោង/ថ្ងៃ, ប្រើកញ្ចប់អំណាន PLP, ផ្គូផ្គងមិត្តជួយមិត្ត',
      beforeScore: 3.5,
      currentScore: 7.0,
      status: 'បានកែលម្អច្រើន'
    },
    {
      id: 'sl_2',
      studentName: 'មាស គន្ធា',
      gender: 'ស្រី',
      weakSubjects: 'សរសេរតាមអាន',
      diagnosis: 'សរសេរខុសអក្ខរាវិរុទ្ធញឹកញាប់ និងចម្លងយឺត',
      interventions: 'ឱ្យសរសេរកថាខណ្ឌខ្លីៗប្រចាំថ្ងៃ និងផ្ញើសៀវភៅឱ្យអាននៅផ្ទះ',
      beforeScore: 4.0,
      currentScore: 6.5,
      status: 'កំពុងបន្តជួយ'
    },
    {
      id: 'sl_3',
      studentName: 'ហ៊ុន ពិសិដ្ឋ',
      gender: 'ប្រុស',
      weakSubjects: 'គណិតវិទ្យា',
      diagnosis: 'មិនទាន់ស្ទាត់មេលេខ ៦ ដល់ ៩ និងការគុណលេខ',
      interventions: 'ប្រើប័ណ្ណរូបភាព ល្បែងគណិតវិទ្យា និងឱ្យធ្វើលំហាត់បន្ថែមប្រចាំថ្ងៃ',
      beforeScore: 4.5,
      currentScore: 7.5,
      status: 'បានកែលម្អច្រើន'
    },
    {
      id: 'sl_4',
      studentName: 'គង់ ចាន់ដារ៉ា',
      gender: 'ប្រុស',
      weakSubjects: 'អំណានស្ទាត់',
      diagnosis: 'អានរាក់ៗ មិនទាន់យល់ន័យកថាខណ្ឌ និងឆ្លើយសំណួរមិនទាន់បាន',
      interventions: 'អានកថាខណ្ឌខ្លីៗ និងសួរសំណួរស្ទង់យល់ដឹងភ្លាមៗបន្ទាប់ពីអាន',
      beforeScore: 5.0,
      currentScore: 7.0,
      status: 'បានកែលម្អច្រើន'
    }
  ]);

  const [showAddSlowLearnerModal, setShowAddSlowLearnerModal] = useState(false);
  const [slStudentName, setSlStudentName] = useState('');
  const [slSubjects, setSlSubjects] = useState('អំណាន និង សរសេរ');
  const [slDiagnosis, setSlDiagnosis] = useState('');
  const [slInterventions, setSlInterventions] = useState('');
  const [slBeforeScore, setSlBeforeScore] = useState(4.0);
  const [slCurrentScore, setSlCurrentScore] = useState(6.5);

  const handleAddSlowLearner = (e: React.FormEvent) => {
    e.preventDefault();
    if (!slStudentName.trim()) return;

    const newSl = {
      id: `sl_${Date.now()}`,
      studentName: slStudentName.trim(),
      gender: 'ប្រុស',
      weakSubjects: slSubjects,
      diagnosis: slDiagnosis || 'ត្រូវការជំនួយការសិក្សាបន្ថែម',
      interventions: slInterventions || 'បង្រៀនបន្ថែមម៉ោង និងប្រើសម្ភារៈ PLP',
      beforeScore: Number(slBeforeScore),
      currentScore: Number(slCurrentScore),
      status: Number(slCurrentScore) >= 6.0 ? 'បានកែលម្អច្រើន' : 'កំពុងបន្តជួយ'
    };

    setSlowLearners([newSl, ...slowLearners]);
    logActivity('បង្កើត (Create)', `របាយការណ៍ជួយសិស្សរៀនយឺត (${slStudentName})`, `បានបញ្ចូលទិន្នន័យជួយសិស្សរៀនយឺត`);
    setShowAddSlowLearnerModal(false);
    setSlStudentName('');
  };

  // ---------------------------------------------------------------------------
  // 6. Physical Fitness Test State (តេស្តកាយសម្បទា)
  // ---------------------------------------------------------------------------
  const [fitnessRecords, setFitnessRecords] = useState<any[]>([
    {
      id: 'ft_1',
      studentName: 'ឡុង សុវណ្ណារ៉ា',
      gender: 'ប្រុស',
      heightCm: 128,
      weightKg: 26,
      bmiStatus: 'សមស្រប',
      sprint50mSec: 9.2,
      armStrengthCount: 12,
      flexibilityCm: 18,
      overallRating: 'ល្អ (Good)'
    },
    {
      id: 'ft_2',
      studentName: 'ជា ស្រីលីន',
      gender: 'ស្រី',
      heightCm: 124,
      weightKg: 23,
      bmiStatus: 'សមស្រប',
      sprint50mSec: 10.1,
      armStrengthCount: 9,
      flexibilityCm: 22,
      overallRating: 'ល្អប្រសើរ (Excellent)'
    },
    {
      id: 'ft_3',
      studentName: 'ស៊ិន សុជាតិ',
      gender: 'ប្រុស',
      heightCm: 130,
      weightKg: 28,
      bmiStatus: 'សមស្រប',
      sprint50mSec: 9.5,
      armStrengthCount: 10,
      flexibilityCm: 16,
      overallRating: 'ល្អ (Good)'
    },
    {
      id: 'ft_4',
      studentName: 'អឿន សុខា',
      gender: 'ស្រី',
      heightCm: 122,
      weightKg: 22,
      bmiStatus: 'សមស្រប',
      sprint50mSec: 9.8,
      armStrengthCount: 11,
      flexibilityCm: 20,
      overallRating: 'ល្អប្រសើរ (Excellent)'
    }
  ]);

  const [showAddFitnessModal, setShowAddFitnessModal] = useState(false);
  const [ftStudentName, setFtStudentName] = useState('');
  const [ftHeight, setFtHeight] = useState(125);
  const [ftWeight, setFtWeight] = useState(25);
  const [ftSprint, setFtSprint] = useState(9.5);
  const [ftArm, setFtArm] = useState(10);
  const [ftFlex, setFtFlex] = useState(20);

  const handleAddFitness = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ftStudentName.trim()) return;

    const newFt = {
      id: `ft_${Date.now()}`,
      studentName: ftStudentName.trim(),
      gender: 'ប្រុស',
      heightCm: Number(ftHeight),
      weightKg: Number(ftWeight),
      bmiStatus: 'សមស្រប',
      sprint50mSec: Number(ftSprint),
      armStrengthCount: Number(ftArm),
      flexibilityCm: Number(ftFlex),
      overallRating: 'ល្អ (Good)'
    };

    setFitnessRecords([newFt, ...fitnessRecords]);
    logActivity('បង្កើត (Create)', `តេស្តកាយសម្បទា (${ftStudentName})`, `បានបញ្ចូលលទ្ធផលតេស្តកាយសម្បទា`);
    setShowAddFitnessModal(false);
    setFtStudentName('');
  };

  // ---------------------------------------------------------------------------
  // 7. Assessment of 3 Learning Domains State (វាយតម្លៃពិន្ទុសម្បទាទាំង៣)
  // ---------------------------------------------------------------------------
  const [domainScores, setDomainScores] = useState<any[]>([
    {
      id: 'dm_1',
      studentName: 'ឡុង សុវណ្ណារ៉ា',
      gender: 'ប្រុស',
      cognitiveScore: 88, // វិជ្ជសម្បទា (Knowledge)
      affectiveScore: 94, // ចរិយាសម្បទា (Attitude/Ethics)
      psychomotorScore: 90, // ហត្ថសម្បទា (Practical/Skills)
      overallGrade: 'ល្អប្រសើរ (A)'
    },
    {
      id: 'dm_2',
      studentName: 'ជា ស្រីលីន',
      gender: 'ស្រី',
      cognitiveScore: 92,
      affectiveScore: 96,
      psychomotorScore: 88,
      overallGrade: 'ល្អប្រសើរ (A)'
    },
    {
      id: 'dm_3',
      studentName: 'ស៊ិន សុជាតិ',
      gender: 'ប្រុស',
      cognitiveScore: 72,
      affectiveScore: 85,
      psychomotorScore: 80,
      overallGrade: 'ល្អ (B)'
    },
    {
      id: 'dm_4',
      studentName: 'មាស គន្ធា',
      gender: 'ស្រី',
      cognitiveScore: 78,
      affectiveScore: 90,
      psychomotorScore: 84,
      overallGrade: 'ល្អ (B)'
    },
    {
      id: 'dm_5',
      studentName: 'ហ៊ុន ពិសិដ្ឋ',
      gender: 'ប្រុស',
      cognitiveScore: 85,
      affectiveScore: 88,
      psychomotorScore: 92,
      overallGrade: 'ល្អប្រសើរ (A)'
    }
  ]);

  const [showAddDomainModal, setShowAddDomainModal] = useState(false);
  const [dmStudentName, setDmStudentName] = useState('');
  const [dmCognitive, setDmCognitive] = useState(85);
  const [dmAffective, setDmAffective] = useState(90);
  const [dmPsychomotor, setDmPsychomotor] = useState(85);

  const handleAddDomainScore = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dmStudentName.trim()) return;

    const avg = (Number(dmCognitive) + Number(dmAffective) + Number(dmPsychomotor)) / 3;
    const grade = avg >= 85 ? 'ល្អប្រសើរ (A)' : avg >= 75 ? 'ល្អ (B)' : avg >= 65 ? 'ល្អបង្គួរ (C)' : 'មធ្យម (D)';

    const newDm = {
      id: `dm_${Date.now()}`,
      studentName: dmStudentName.trim(),
      gender: 'ប្រុស',
      cognitiveScore: Number(dmCognitive),
      affectiveScore: Number(dmAffective),
      psychomotorScore: Number(dmPsychomotor),
      overallGrade: grade
    };

    setDomainScores([newDm, ...domainScores]);
    logActivity('បង្កើត (Create)', `វាយតម្លៃសម្បទាទាំង៣ (${dmStudentName})`, `បានវាយតម្លៃពិន្ទុវិជ្ជសម្បទា ចរិយាសម្បទា និងហត្ថសម្បទា`);
    setShowAddDomainModal(false);
    setDmStudentName('');
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* Top Banner Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-brand-900 via-indigo-950 to-purple-950 p-6 sm:p-8 text-white shadow-xl no-print">
        <div className="absolute -right-10 -top-10 w-64 h-64 bg-brand-500/20 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-brand-300" />
                គ្រប់គ្រងរដ្ឋបាលថ្នាក់រៀន (Classroom Management)
              </span>
              <span className="text-xs text-brand-200">
                {schoolInfo.schoolName} • ឆ្នាំសិក្សា {selectedAcademicYear}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight flex items-center gap-2">
              រដ្ឋបាលថ្នាក់រៀន និងកិច្ចការគ្រូបង្រៀន 🏫
            </h2>
            <p className="text-xs sm:text-sm text-brand-100/90 mt-1 max-w-2xl leading-relaxed">
              គ្រប់គ្រងរបាយការណ៍ថ្ងៃព្រហស្បតិ៍, ផែនការបង្រៀន៦ប្រភេទ, សារពើភ័ណ្ឌថ្នាក់ (Auto-Sync ចូលសាលា), កិច្ចព្រមព្រៀង, របាយការណ៍ជួយសិស្សរៀនយឺត, តេស្តកាយសម្បទា និងការវាយតម្លៃសម្បទាទាំង៣
            </p>
          </div>

          {/* Classroom Selector */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-3 rounded-2xl flex flex-col gap-1.5 shrink-0">
            <label className="text-[11px] font-extrabold text-brand-200 uppercase tracking-wider flex items-center gap-1">
              <Users className="w-3.5 h-3.5" /> ជ្រើសរើសថ្នាក់បន្ទុក ៖
            </label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="bg-slate-900/90 text-white font-black text-sm px-4 py-2 rounded-xl border border-brand-400/40 focus:outline-none cursor-pointer"
            >
              <option value="ថ្នាក់ទី ១-ក">ថ្នាក់ទី ១-ក</option>
              <option value="ថ្នាក់ទី ១-ខ">ថ្នាក់ទី ១-ខ</option>
              <option value="ថ្នាក់ទី ២-ក">ថ្នាក់ទី ២-ក</option>
              <option value="ថ្នាក់ទី ២-ខ">ថ្នាក់ទី ២-ខ</option>
              <option value="ថ្នាក់ទី ៣-ក">ថ្នាក់ទី ៣-ក</option>
              <option value="ថ្នាក់ទី ៣-ខ">ថ្នាក់ទី ៣-ខ</option>
              <option value="ថ្នាក់ទី ៤-ក">ថ្នាក់ទី ៤-ក</option>
              <option value="ថ្នាក់ទី ៤-ខ">ថ្នាក់ទី ៤-ខ</option>
              <option value="ថ្នាក់ទី ៥-ក">ថ្នាក់ទី ៥-ក</option>
              <option value="ថ្នាក់ទី ៥-ខ">ថ្នាក់ទី ៥-ខ</option>
              <option value="ថ្នាក់ទី ៦-ក">ថ្នាក់ទី ៦-ក</option>
              <option value="ថ្នាក់ទី ៦-ខ">ថ្នាក់ទី ៦-ខ</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Classroom Administration 7 Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none no-print">
        <button
          onClick={() => setActiveTab('thursday')}
          className={`flex items-center gap-2 px-4 py-3 rounded-2xl text-xs font-extrabold transition-all shrink-0 border ${
            activeTab === 'thursday'
              ? 'bg-gradient-to-r from-brand-600 to-indigo-600 text-white border-brand-500 shadow-md shadow-brand-500/20'
              : 'glass-card hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>១. របាយការណ៍ថ្ងៃព្រហស្បតិ៍</span>
        </button>

        <button
          onClick={() => setActiveTab('plans')}
          className={`flex items-center gap-2 px-4 py-3 rounded-2xl text-xs font-extrabold transition-all shrink-0 border ${
            activeTab === 'plans'
              ? 'bg-gradient-to-r from-brand-600 to-indigo-600 text-white border-brand-500 shadow-md shadow-brand-500/20'
              : 'glass-card hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>២. ផែនការបង្រៀន (៦ ប្រភេទ)</span>
        </button>

        <button
          onClick={() => setActiveTab('inventory')}
          className={`flex items-center gap-2 px-4 py-3 rounded-2xl text-xs font-extrabold transition-all shrink-0 border ${
            activeTab === 'inventory'
              ? 'bg-gradient-to-r from-brand-600 to-indigo-600 text-white border-brand-500 shadow-md shadow-brand-500/20'
              : 'glass-card hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
          }`}
        >
          <Boxes className="w-4 h-4" />
          <span>៣. សារពើភ័ណ្ឌ (Auto ចូលសាលា)</span>
        </button>

        <button
          onClick={() => setActiveTab('agreements')}
          className={`flex items-center gap-2 px-4 py-3 rounded-2xl text-xs font-extrabold transition-all shrink-0 border ${
            activeTab === 'agreements'
              ? 'bg-gradient-to-r from-brand-600 to-indigo-600 text-white border-brand-500 shadow-md shadow-brand-500/20'
              : 'glass-card hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
          }`}
        >
          <Handshake className="w-4 h-4" />
          <span>៤. កិច្ចព្រមព្រៀង (មាតាបិតា & នាយក)</span>
        </button>

        <button
          onClick={() => setActiveTab('slow_learners')}
          className={`flex items-center gap-2 px-4 py-3 rounded-2xl text-xs font-extrabold transition-all shrink-0 border ${
            activeTab === 'slow_learners'
              ? 'bg-gradient-to-r from-brand-600 to-indigo-600 text-white border-brand-500 shadow-md shadow-brand-500/20'
              : 'glass-card hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
          }`}
        >
          <UserCheck className="w-4 h-4" />
          <span>៥. ជួយសិស្សរៀនយឺត</span>
        </button>

        <button
          onClick={() => setActiveTab('fitness')}
          className={`flex items-center gap-2 px-4 py-3 rounded-2xl text-xs font-extrabold transition-all shrink-0 border ${
            activeTab === 'fitness'
              ? 'bg-gradient-to-r from-brand-600 to-indigo-600 text-white border-brand-500 shadow-md shadow-brand-500/20'
              : 'glass-card hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>៦. តេស្តកាយសម្បទា</span>
        </button>

        <button
          onClick={() => setActiveTab('domains')}
          className={`flex items-center gap-2 px-4 py-3 rounded-2xl text-xs font-extrabold transition-all shrink-0 border ${
            activeTab === 'domains'
              ? 'bg-gradient-to-r from-brand-600 to-indigo-600 text-white border-brand-500 shadow-md shadow-brand-500/20'
              : 'glass-card hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
          }`}
        >
          <Award className="w-4 h-4" />
          <span>៧. ពិន្ទុសម្បទាទាំង៣</span>
        </button>
      </div>

      {/* =================================================================== */}
      {/* 1. TAB: របាយការណ៍ថ្ងៃព្រហស្បតិ៍ (Thursday Weekly Report) */}
      {/* =================================================================== */}
      {activeTab === 'thursday' && (
        <div className="space-y-6">
          <div className="glass-card p-6 space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-brand-500" />
                  របាយការណ៍ប្រចាំសប្តាហ៍ថ្ងៃព្រហស្បតិ៍ ({selectedClass})
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  របាយការណ៍ស្ដង់ដារ MoEYS រាល់ថ្ងៃព្រហស្បតិ៍៖ វត្តមានសិស្ស, ម៉ោងបង្រៀន, សិស្សរៀនយឺត, អនាម័យ និងសំណូមពរ
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-sm transition-colors"
                >
                  <Printer className="w-4 h-4" /> បោះពុម្ភរបាយការណ៍
                </button>
                {(userRole === 'admin' || userRole === 'teacher') && (
                  <button
                    onClick={() => setShowAddThursdayModal(true)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-extrabold text-xs shadow-md transition-all"
                  >
                    <Plus className="w-4 h-4" /> បង្កើតរបាយការណ៍ថ្មី
                  </button>
                )}
              </div>
            </div>

            {/* Thursday Reports List */}
            <div className="space-y-4">
              {thursdayReports.map(rep => (
                <div key={rep.id} className="glass-card-hover p-5 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full text-xs font-black bg-brand-500/10 text-brand-600 dark:text-brand-400 border border-brand-500/20">
                        {rep.weekNumber}
                      </span>
                      <span className="text-xs font-bold text-slate-500 font-mono">
                        កាលបរិច្ឆេទ ៖ {rep.reportDate}
                      </span>
                    </div>

                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> {rep.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                    <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/60">
                      <p className="text-[11px] text-slate-500">សិស្សសរុប / ស្រី</p>
                      <p className="font-extrabold text-slate-900 dark:text-slate-100 mt-0.5">
                        {rep.totalStudents} នាក់ (ស្រី {rep.femaleStudents} នាក់)
                      </p>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/60">
                      <p className="text-[11px] text-slate-500">វត្តមានសិស្ស</p>
                      <p className="font-extrabold text-slate-900 dark:text-slate-100 mt-0.5">
                        ច្បាប់ ៖ {rep.absentWithPermission} | អត់ច្បាប់ ៖ {rep.absentWithoutPermission}
                      </p>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/60">
                      <p className="text-[11px] text-slate-500">ម៉ោងបង្រៀនជាក់ស្តែង</p>
                      <p className="font-extrabold text-emerald-600 dark:text-emerald-400 mt-0.5">
                        {rep.actualTeachingHours} / {rep.plannedTeachingHours} ម៉ោង (១០០%)
                      </p>
                    </div>

                    <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/60">
                      <p className="text-[11px] text-slate-500">សិស្សក្រីក្រ (IDPoor)</p>
                      <p className="font-extrabold text-amber-600 dark:text-amber-400 mt-0.5">
                        {rep.idPoorStudents} នាក់
                      </p>
                    </div>
                  </div>

                  <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                    <p className="font-medium"><strong className="text-slate-900 dark:text-slate-100">សកម្មភាពជួយសិស្សរៀនយឺត ៖</strong> {rep.slowLearnersProgress}</p>
                    <p className="font-medium"><strong className="text-slate-900 dark:text-slate-100">ការទាក់ទងមាតាបិតា ៖</strong> {rep.parentContactNotes}</p>
                    <p className="font-medium"><strong className="text-slate-900 dark:text-slate-100">អនាម័យ & វិន័យ ៖</strong> {rep.cleanlinessDiscipline}</p>
                    {rep.principalRequests !== 'គ្មាន' && (
                      <p className="font-medium text-amber-600 dark:text-amber-400"><strong className="text-slate-900 dark:text-slate-100">សំណូមពរផ្ញើជូននាយក ៖</strong> {rep.principalRequests}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* 2. TAB: ផែនការបង្រៀន (៦ ប្រភេទ) */}
      {/* =================================================================== */}
      {activeTab === 'plans' && (
        <div className="space-y-6">
          <div className="glass-card p-6 space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-brand-500" />
                  ផែនការបង្រៀន និងកិច្ចតែងការ (Teaching Plans)
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  រៀបចំផែនការបង្រៀន ៦ ប្រភេទ៖ ប្រចាំថ្ងៃ, ប្រចាំសប្តាហ៍, ប្រចាំខែ, ប្រចាំត្រីមាស, ប្រចាំឆមាស និងប្រចាំឆ្នាំ
                </p>
              </div>

              {(userRole === 'admin' || userRole === 'teacher') && (
                <button
                  onClick={() => setShowAddPlanModal(true)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-brand-600 to-indigo-600 text-white font-extrabold text-xs shadow-md transition-all"
                >
                  <Plus className="w-4 h-4" /> បង្កើតផែនការបង្រៀនថ្មី
                </button>
              )}
            </div>

            {/* 6 Plan Frequency Filters */}
            <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 pt-2">
              {[
                { id: 'daily', label: 'ប្រចាំថ្ងៃ (Daily)' },
                { id: 'weekly', label: 'ប្រចាំសប្តាហ៍' },
                { id: 'monthly', label: 'ប្រចាំខែ' },
                { id: 'quarterly', label: 'ប្រចាំត្រីមាស' },
                { id: 'semester', label: 'ប្រចាំឆមាស' },
                { id: 'annual', label: 'ប្រចាំឆ្នាំ' }
              ].map(p => (
                <button
                  key={p.id}
                  onClick={() => setPlanType(p.id as any)}
                  className={`py-2 px-2 rounded-xl text-xs font-extrabold border transition-all text-center ${
                    planType === p.id
                      ? 'bg-brand-600 text-white border-brand-600 shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>

            {/* Plans List */}
            <div className="space-y-4 pt-2">
              {teachingPlans
                .filter(p => p.type === planType)
                .map(plan => (
                  <div key={plan.id} className="glass-card-hover p-5 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
                      <div>
                        <h4 className="text-sm font-extrabold text-slate-900 dark:text-slate-100">{plan.title}</h4>
                        <p className="text-[11px] text-slate-500">
                          មុខវិជ្ជា ៖ <strong className="text-brand-600 dark:text-brand-400">{plan.subject}</strong> | ថ្នាក់ ៖ {plan.gradeClass} | រយៈពេល ៖ {plan.duration}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => window.print()}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-brand-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                          title="បោះពុម្ភកិច្ចតែងការ"
                        >
                          <Printer className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                      <p><strong className="text-slate-900 dark:text-slate-100">១. វត្ថុបំណងមេរៀន ៖</strong> {plan.objective}</p>
                      <p><strong className="text-slate-900 dark:text-slate-100">២. ជំហានបង្រៀនទាំង ៥ ៖</strong> {plan.teachingSteps}</p>
                      <p><strong className="text-slate-900 dark:text-slate-100">៣. សម្ភារឧបទេស ៖</strong> {plan.resources}</p>
                    </div>
                  </div>
                ))}

              {teachingPlans.filter(p => p.type === planType).length === 0 && (
                <div className="py-8 text-center text-slate-400 text-xs">
                  មិនទាន់មានផែនការបង្រៀនប្រចាំ {planType} ក្នុងប្រព័ន្ធនៅឡើយទេ។ ចុច "បង្កើតផែនការបង្រៀនថ្មី" ដើម្បីបញ្ចូល។
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* 3. TAB: សារពើភ័ណ្ឌថ្នាក់រៀន Auto ចូលសាលា */}
      {/* =================================================================== */}
      {activeTab === 'inventory' && (
        <div className="space-y-6">
          <div className="glass-card p-6 space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Boxes className="w-5 h-5 text-brand-500" />
                  បញ្ជីសារពើភ័ណ្ឌក្នុងថ្នាក់រៀន ({selectedClass})
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  សម្ភារៈក្នុងថ្នាក់រៀនទាំងអស់នឹងត្រូវ <strong className="text-emerald-600 dark:text-emerald-400">Auto Sync</strong> ចូលក្នុងបញ្ជីសារពើភ័ណ្ឌសាលាដោយស្វ័យប្រវត្តិ
                </p>
              </div>

              {(userRole === 'admin' || userRole === 'teacher') && (
                <button
                  onClick={() => setShowAddInventoryModal(true)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-extrabold text-xs shadow-md transition-all"
                >
                  <Plus className="w-4 h-4" /> បន្ថែមសម្ភារៈថ្នាក់ (Auto-Sync)
                </button>
              )}
            </div>

            {/* Inventory Table */}
            <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-2xl">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-slate-100 dark:bg-slate-800 font-extrabold text-slate-700 dark:text-slate-300">
                  <tr>
                    <th className="p-3">ឈ្មោះសម្ភារៈ</th>
                    <th className="p-3">ប្រភេទ</th>
                    <th className="p-3 text-center">ចំនួនសរុប</th>
                    <th className="p-3 text-center">ស្ថានភាពសម្ភារៈ</th>
                    <th className="p-3 text-center">Auto-Sync ចូលសាលា</th>
                    <th className="p-3 text-right">កាលបរិច្ឆេទ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  {classInventory.map(item => (
                    <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                      <td className="p-3 font-extrabold text-slate-900 dark:text-slate-100">{item.assetName}</td>
                      <td className="p-3 text-slate-600 dark:text-slate-400">{item.category}</td>
                      <td className="p-3 text-center font-bold font-mono text-brand-600 dark:text-brand-400">
                        {item.quantity} {item.unit}
                      </td>
                      <td className="p-3 text-center">
                        <span className="px-2.5 py-1 rounded-full text-[10.5px] font-extrabold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                          {item.condition}
                        </span>
                      </td>
                      <td className="p-3 text-center">
                        <span className="px-2.5 py-1 rounded-full text-[10.5px] font-black bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 inline-flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Synced ចូលសាលា
                        </span>
                      </td>
                      <td className="p-3 text-right font-mono text-slate-500">{item.lastUpdated}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* 4. TAB: កិច្ចព្រមព្រៀង (មាតាបិតា & នាយក) */}
      {/* =================================================================== */}
      {activeTab === 'agreements' && (
        <div className="space-y-6">
          <div className="glass-card p-6 space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Handshake className="w-5 h-5 text-brand-500" />
                  កិច្ចព្រមព្រៀងផ្លូវការ (Partnership Agreements & Contracts)
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  កិច្ចព្រមព្រៀងរវាងអាណាព្យាបាល និង គ្រូបង្រៀន + កិច្ចព្រមព្រៀងរវាងគ្រូបង្រៀន និង នាយកសាលា
                </p>
              </div>

              {(userRole === 'admin' || userRole === 'teacher') && (
                <button
                  onClick={() => setShowAddAgreementModal(true)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-extrabold text-xs shadow-md transition-all"
                >
                  <Plus className="w-4 h-4" /> បង្កើតកិច្ចព្រមព្រៀងថ្មី
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => setAgreementType('parent')}
                className={`py-2 px-4 rounded-xl text-xs font-extrabold border transition-all ${
                  agreementType === 'parent'
                    ? 'bg-purple-600 text-white border-purple-600 shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
                }`}
              >
                🤝 កិច្ចព្រមព្រៀងមាតាបិតាសិស្ស
              </button>
              <button
                onClick={() => setAgreementType('principal')}
                className={`py-2 px-4 rounded-xl text-xs font-extrabold border transition-all ${
                  agreementType === 'principal'
                    ? 'bg-purple-600 text-white border-purple-600 shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
                }`}
              >
                📜 កិច្ចព្រមព្រៀងគ្រូ និង នាយកសាលា
              </button>
            </div>

            <div className="space-y-4 pt-2">
              {agreements
                .filter(a => a.type === agreementType)
                .map(agr => (
                  <div key={agr.id} className="glass-card-hover p-5 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
                      <div>
                        <h4 className="text-sm font-extrabold text-slate-900 dark:text-slate-100">
                          {agr.type === 'parent' ? `កិច្ចព្រមព្រៀងសហការ ៖ សិស្ស ${agr.studentName}` : `កិច្ចសន្យាបំពេញការងារ ៖ ${agr.teacherName}`}
                        </h4>
                        <p className="text-[11px] text-slate-500">
                          កាលបរិច្ឆេទ ៖ {agr.agreementDate} | ស្ថានភាព ៖ <strong className="text-emerald-600 dark:text-emerald-400">{agr.status}</strong>
                        </p>
                      </div>

                      <button
                        onClick={() => window.print()}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 font-bold text-xs"
                      >
                        <Printer className="w-3.5 h-3.5" /> បោះពុម្ភកិច្ចព្រមព្រៀង
                      </button>
                    </div>

                    <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                      <p><strong className="text-slate-900 dark:text-slate-100">ភាគីពាក់ព័ន្ធ ៖</strong> {agr.type === 'parent' ? `មាតាបិតា (${agr.parentName}) ជាមួយ គ្រូបន្ទុកថ្នាក់ (${agr.teacherName})` : `គ្រូបង្រៀន (${agr.teacherName}) ជាមួយ នាយកសាលា (${agr.principalName})`}</p>
                      <p><strong className="text-slate-900 dark:text-slate-100">លក្ខខណ្ឌកិច្ចព្រមព្រៀង ៖</strong> {agr.terms}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* 5. TAB: របាយការណ៍ជួយសិស្សរៀនយឺត */}
      {/* =================================================================== */}
      {activeTab === 'slow_learners' && (
        <div className="space-y-6">
          <div className="glass-card p-6 space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <UserCheck className="w-5 h-5 text-brand-500" />
                  របាយការណ៍ និងការតាមដានជួយសិស្សរៀនយឺត (Remedial Support)
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  តាមដានសិស្សជួបការលំបាកផ្នែកអំណាន គណិត និងសរសេរ រួមជាមួយវិធីសាស្ត្រអន្តរាគមន៍
                </p>
              </div>

              {(userRole === 'admin' || userRole === 'teacher') && (
                <button
                  onClick={() => setShowAddSlowLearnerModal(true)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 text-white font-extrabold text-xs shadow-md transition-all"
                >
                  <Plus className="w-4 h-4" /> បន្ថែមទិន្នន័យសិស្សរៀនយឺត
                </button>
              )}
            </div>

            <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-2xl">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-slate-100 dark:bg-slate-800 font-extrabold text-slate-700 dark:text-slate-300">
                  <tr>
                    <th className="p-3">ឈ្មោះសិស្ស</th>
                    <th className="p-3">មុខវិជ្ជាខ្សោយ</th>
                    <th className="p-3">កម្រិតពិការភាពការសិក្សា</th>
                    <th className="p-3">វិធីសាស្ត្រជួយ (Interventions)</th>
                    <th className="p-3 text-center">ពិន្ទុដើម vs ក្រោយជួយ</th>
                    <th className="p-3 text-center">ស្ថានភាព</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  {slowLearners.map(sl => (
                    <tr key={sl.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                      <td className="p-3 font-extrabold text-slate-900 dark:text-slate-100">{sl.studentName}</td>
                      <td className="p-3 font-bold text-amber-600 dark:text-amber-400">{sl.weakSubjects}</td>
                      <td className="p-3 text-slate-600 dark:text-slate-300">{sl.diagnosis}</td>
                      <td className="p-3 text-slate-600 dark:text-slate-300">{sl.interventions}</td>
                      <td className="p-3 text-center font-mono font-bold">
                        <span className="text-red-500">{sl.beforeScore}</span> ➔ <span className="text-emerald-600 dark:text-emerald-400">{sl.currentScore}</span>
                      </td>
                      <td className="p-3 text-center">
                        <span className="px-2.5 py-1 rounded-full text-[10.5px] font-extrabold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                          {sl.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* 6. TAB: តេស្តកាយសម្បទា (Physical Fitness Assessment) */}
      {/* =================================================================== */}
      {activeTab === 'fitness' && (
        <div className="space-y-6">
          <div className="glass-card p-6 space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-brand-500" />
                  តេស្តកាយសម្បទាសិស្ស (Physical Fitness Test Register)
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  វាយតម្លៃកម្ពស់, ទម្ងន់, សន្ទស្សន៍ BMI, ល្បឿន, កម្លាំងដៃ និងភាពបត់បែនតាមស្ដង់ដារ MoEYS
                </p>
              </div>

              {(userRole === 'admin' || userRole === 'teacher') && (
                <button
                  onClick={() => setShowAddFitnessModal(true)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-extrabold text-xs shadow-md transition-all"
                >
                  <Plus className="w-4 h-4" /> បញ្ចូលលទ្ធផលតេស្តថ្មី
                </button>
              )}
            </div>

            <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-2xl">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-slate-100 dark:bg-slate-800 font-extrabold text-slate-700 dark:text-slate-300">
                  <tr>
                    <th className="p-3">ឈ្មោះសិស្ស</th>
                    <th className="p-3 text-center">កម្ពស់ (cm)</th>
                    <th className="p-3 text-center">ទម្ងន់ (kg)</th>
                    <th className="p-3 text-center">សន្ទស្សន៍ BMI</th>
                    <th className="p-3 text-center">រត់ ៥០ម (វិនាទី)</th>
                    <th className="p-3 text-center">កម្លាំងដៃ (ដង)</th>
                    <th className="p-3 text-center">ភាពបត់បែន (cm)</th>
                    <th className="p-3 text-center">ការវាយតម្លៃ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  {fitnessRecords.map(ft => (
                    <tr key={ft.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                      <td className="p-3 font-extrabold text-slate-900 dark:text-slate-100">{ft.studentName}</td>
                      <td className="p-3 text-center font-mono">{ft.heightCm} cm</td>
                      <td className="p-3 text-center font-mono">{ft.weightKg} kg</td>
                      <td className="p-3 text-center font-bold text-emerald-600 dark:text-emerald-400">{ft.bmiStatus}</td>
                      <td className="p-3 text-center font-mono">{ft.sprint50mSec}s</td>
                      <td className="p-3 text-center font-mono">{ft.armStrengthCount}</td>
                      <td className="p-3 text-center font-mono">{ft.flexibilityCm} cm</td>
                      <td className="p-3 text-center font-bold text-purple-600 dark:text-purple-400">{ft.overallRating}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* 7. TAB: វាយតម្លៃពិន្ទុសម្បទាទាំង៣ (Cognitive, Affective, Psychomotor) */}
      {/* =================================================================== */}
      {activeTab === 'domains' && (
        <div className="space-y-6">
          <div className="glass-card p-6 space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Award className="w-5 h-5 text-brand-500" />
                  ការវាយតម្លៃពិន្ទុសម្បទាទាំង៣ (3 Learning Domains Matrix)
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  ១. វិជ្ជសម្បទា (ចំណេះដឹង) | ២. ចរិយាសម្បទា (សីលធម៌/វិន័យ) | ៣. ហត្ថសម្បទា (បំណិន/អនុវត្ត)
                </p>
              </div>

              {(userRole === 'admin' || userRole === 'teacher') && (
                <button
                  onClick={() => setShowAddDomainModal(true)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-extrabold text-xs shadow-md transition-all"
                >
                  <Plus className="w-4 h-4" /> វាយតម្លៃសម្បទាទាំង៣
                </button>
              )}
            </div>

            <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-2xl">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-slate-100 dark:bg-slate-800 font-extrabold text-slate-700 dark:text-slate-300">
                  <tr>
                    <th className="p-3">ឈ្មោះសិស្ស</th>
                    <th className="p-3 text-center">១. វិជ្ជសម្បទា (Cognitive)</th>
                    <th className="p-3 text-center">២. ចរិយាសម្បទា (Affective)</th>
                    <th className="p-3 text-center">៣. ហត្ថសម្បទា (Psychomotor)</th>
                    <th className="p-3 text-center">ពិន្ទុមធ្យមភាគ</th>
                    <th className="p-3 text-center">និទ្ទេសរួម</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  {domainScores.map(dm => {
                    const avg = ((dm.cognitiveScore + dm.affectiveScore + dm.psychomotorScore) / 3).toFixed(1);
                    return (
                      <tr key={dm.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                        <td className="p-3 font-extrabold text-slate-900 dark:text-slate-100">{dm.studentName}</td>
                        <td className="p-3 text-center font-bold font-mono text-blue-600 dark:text-blue-400">{dm.cognitiveScore} / 100</td>
                        <td className="p-3 text-center font-bold font-mono text-purple-600 dark:text-purple-400">{dm.affectiveScore} / 100</td>
                        <td className="p-3 text-center font-bold font-mono text-emerald-600 dark:text-emerald-400">{dm.psychomotorScore} / 100</td>
                        <td className="p-3 text-center font-black font-mono text-slate-900 dark:text-slate-100">{avg}</td>
                        <td className="p-3 text-center font-black text-brand-600 dark:text-brand-400">{dm.overallGrade}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* MODALS */}
      {/* =================================================================== */}
      {/* 1. Add Thursday Report Modal */}
      {showAddThursdayModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto font-sans">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-lg p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-slate-100">បង្កើតរបាយការណ៍ថ្ងៃព្រហស្បតិ៍ ({selectedClass})</h3>
              <button onClick={() => setShowAddThursdayModal(false)} className="text-slate-400 hover:text-slate-600"><X className="w-5 h-5" /></button>
            </div>

            <form onSubmit={handleAddThursdayReport} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold block mb-1">កាលបរិច្ឆេទ</label>
                  <input type="date" value={newReportDate} onChange={e => setNewReportDate(e.target.value)} className="w-full p-2 bg-slate-100 dark:bg-slate-800 rounded-xl font-bold" required />
                </div>
                <div>
                  <label className="font-bold block mb-1">សប្តាហ៍ទី</label>
                  <input type="text" value={newWeekNum} onChange={e => setNewWeekNum(e.target.value)} className="w-full p-2 bg-slate-100 dark:bg-slate-800 rounded-xl font-bold" required />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="font-bold block mb-1">អវត្តមានច្បាប់</label>
                  <input type="number" value={newAbsentPerm} onChange={e => setNewAbsentPerm(Number(e.target.value))} className="w-full p-2 bg-slate-100 dark:bg-slate-800 rounded-xl font-bold" />
                </div>
                <div>
                  <label className="font-bold block mb-1">អវត្តមានអត់ច្បាប់</label>
                  <input type="number" value={newAbsentNoPerm} onChange={e => setNewAbsentNoPerm(Number(e.target.value))} className="w-full p-2 bg-slate-100 dark:bg-slate-800 rounded-xl font-bold" />
                </div>
                <div>
                  <label className="font-bold block mb-1">ម៉ោងបង្រៀនស្តែង</label>
                  <input type="number" value={newTeachingHours} onChange={e => setNewTeachingHours(Number(e.target.value))} className="w-full p-2 bg-slate-100 dark:bg-slate-800 rounded-xl font-bold" />
                </div>
              </div>

              <div>
                <label className="font-bold block mb-1">សកម្មភាពជួយសិស្សរៀនយឺត</label>
                <textarea value={newSlowLearnersNote} onChange={e => setNewSlowLearnersNote(e.target.value)} placeholder="ឧ. បានបង្រៀនបន្ថែមម៉ោងអំណាន PLP" rows={2} className="w-full p-2 bg-slate-100 dark:bg-slate-800 rounded-xl font-medium" />
              </div>

              <div>
                <label className="font-bold block mb-1">ការទាក់ទងមាតាបិតាសិស្ស</label>
                <input type="text" value={newParentNote} onChange={e => setNewParentNote(e.target.value)} placeholder="ឧ. បានប្រជុំជាមួយអាណាព្យាបាលសិស្ស ៣រូប" className="w-full p-2 bg-slate-100 dark:bg-slate-800 rounded-xl font-medium" />
              </div>

              <div>
                <label className="font-bold block mb-1">អនាម័យ និងវិន័យថ្នាក់រៀន</label>
                <input type="text" value={newDisciplineNote} onChange={e => setNewDisciplineNote(e.target.value)} placeholder="ឧ. ថ្នាក់រៀនមានអនាម័យល្អ សិស្សពាក់ឯកសណ្ឋាន" className="w-full p-2 bg-slate-100 dark:bg-slate-800 rounded-xl font-medium" />
              </div>

              <div>
                <label className="font-bold block mb-1">សំណូមពរជូនលោកនាយក</label>
                <input type="text" value={newRequestNote} onChange={e => setNewRequestNote(e.target.value)} placeholder="ឧ. ស្នើសុំបន្ថែមសៀវភៅអាន" className="w-full p-2 bg-slate-100 dark:bg-slate-800 rounded-xl font-medium" />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button type="button" onClick={() => setShowAddThursdayModal(false)} className="px-4 py-2 bg-slate-200 dark:bg-slate-800 rounded-xl font-bold">បោះបង់</button>
                <button type="submit" className="px-5 py-2 bg-brand-600 text-white rounded-xl font-extrabold">រក្សាទុក</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. Add Teaching Plan Modal */}
      {showAddPlanModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto font-sans">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-lg p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-slate-100">បង្កើតផែនការបង្រៀនប្រចាំ {planType}</h3>
              <button onClick={() => setShowAddPlanModal(false)} className="text-slate-400 hover:text-slate-600"><X className="w-5 h-5" /></button>
            </div>

            <form onSubmit={handleAddPlan} className="space-y-3 text-xs">
              <div>
                <label className="font-bold block mb-1">ចំណងជើងផែនការ / កិច្ចតែងការ</label>
                <input type="text" value={newPlanTitle} onChange={e => setNewPlanTitle(e.target.value)} placeholder="ឧ. កិច្ចតែងការបង្រៀន ៖ ភាសាខ្មែរ មេរៀនទី៥" className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl font-bold" required />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold block mb-1">មុខវិជ្ជា</label>
                  <select value={newPlanSubject} onChange={e => setNewPlanSubject(e.target.value)} className="w-full p-2 bg-slate-100 dark:bg-slate-800 rounded-xl font-bold">
                    <option value="ភាសាខ្មែរ">ភាសាខ្មែរ</option>
                    <option value="គណិតវិទ្យា">គណិតវិទ្យា</option>
                    <option value="វិទ្យាសាស្ត្រ">វិទ្យាសាស្ត្រ</option>
                    <option value="សីលធម៌-ពលរដ្ឋ">សីលធម៌-ពលរដ្ឋ</option>
                    <option value="សិក្សាសង្គម">សិក្សាសង្គម</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold block mb-1">ថ្នាក់បន្ទុក</label>
                  <input type="text" value={selectedClass} disabled className="w-full p-2 bg-slate-200 dark:bg-slate-800 rounded-xl font-bold opacity-80" />
                </div>
              </div>

              <div>
                <label className="font-bold block mb-1">១. វត្ថុបំណងមេរៀន</label>
                <textarea value={newPlanObjective} onChange={e => setNewPlanObjective(e.target.value)} placeholder="ឱ្យសិស្សអាន និងយល់ន័យពាក្យ..." rows={2} className="w-full p-2 bg-slate-100 dark:bg-slate-800 rounded-xl font-medium" />
              </div>

              <div>
                <label className="font-bold block mb-1">២. ជំហានបង្រៀនទាំង៥</label>
                <textarea value={newPlanSteps} onChange={e => setNewPlanSteps(e.target.value)} placeholder="១. រំលឹកមេរៀន ២. ស្ទង់យល់ដឹង ៣. គ្រូពន្យល់ ៤. អនុវត្ត ៥. វាយតម្លៃ" rows={2} className="w-full p-2 bg-slate-100 dark:bg-slate-800 rounded-xl font-medium" />
              </div>

              <div>
                <label className="font-bold block mb-1">៣. សម្ភារឧបទេស / សៀវភៅជំនួយ</label>
                <input type="text" value={newPlanResources} onChange={e => setNewPlanResources(e.target.value)} placeholder="ឧ. សៀវភៅសិក្សាគោល, ប័ណ្ណពាក្យ, ក្តារឆ្នួន" className="w-full p-2 bg-slate-100 dark:bg-slate-800 rounded-xl font-medium" />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button type="button" onClick={() => setShowAddPlanModal(false)} className="px-4 py-2 bg-slate-200 dark:bg-slate-800 rounded-xl font-bold">បោះបង់</button>
                <button type="submit" className="px-5 py-2 bg-brand-600 text-white rounded-xl font-extrabold">រក្សាទុកផែនការ</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3. Add Classroom Asset Modal (Auto Sync) */}
      {showAddInventoryModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto font-sans">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-lg p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <div>
                <h3 className="text-base font-extrabold text-slate-900 dark:text-slate-100">បន្ថែមសម្ភារៈក្នុងថ្នាក់រៀន ({selectedClass})</h3>
                <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold">✅ នឹង Sync ចូលបញ្ជីសារពើភ័ណ្ឌសាលាដោយស្វ័យប្រវត្តិ</p>
              </div>
              <button onClick={() => setShowAddInventoryModal(false)} className="text-slate-400 hover:text-slate-600"><X className="w-5 h-5" /></button>
            </div>

            <form onSubmit={handleAddClassroomAsset} className="space-y-3 text-xs">
              <div>
                <label className="font-bold block mb-1">ឈ្មោះសម្ភារៈ</label>
                <input type="text" value={newAssetName} onChange={e => setNewAssetName(e.target.value)} placeholder="ឧ. តុ និងកៅអីសិស្ស, ទូរតាំងសៀវភៅ" className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl font-bold" required />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold block mb-1">ប្រភេទសម្ភារៈ</label>
                  <select value={newAssetCategory} onChange={e => setNewAssetCategory(e.target.value as any)} className="w-full p-2 bg-slate-100 dark:bg-slate-800 rounded-xl font-bold">
                    <option value="គ្រឿងសង្ហារិម">គ្រឿងសង្ហារិម</option>
                    <option value="ឧបករណ៍បង្រៀន">ឧបករណ៍បង្រៀន</option>
                    <option value="ឧបករណ៍បច្ចេកវិទ្យា">ឧបករណ៍បច្ចេកវិទ្យា</option>
                    <option value="សម្ភារអនាម័យ">សម្ភារអនាម័យ</option>
                    <option value="សម្ភារកីឡា">សម្ភារកីឡា</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold block mb-1">ចំនួន & ខ្នាត</label>
                  <div className="flex gap-1">
                    <input type="number" value={newAssetQty} onChange={e => setNewAssetQty(Number(e.target.value))} className="w-1/2 p-2 bg-slate-100 dark:bg-slate-800 rounded-xl font-bold" min={1} />
                    <input type="text" value={newAssetUnit} onChange={e => setNewAssetUnit(e.target.value)} className="w-1/2 p-2 bg-slate-100 dark:bg-slate-800 rounded-xl font-bold" />
                  </div>
                </div>
              </div>

              <div>
                <label className="font-bold block mb-1">ស្ថានភាពសម្ភារៈ</label>
                <select value={newAssetCondition} onChange={e => setNewAssetCondition(e.target.value as any)} className="w-full p-2 bg-slate-100 dark:bg-slate-800 rounded-xl font-bold">
                  <option value="ល្អ (Good)">ល្អ (Good)</option>
                  <option value="មធ្យម (Fair)">មធ្យម (Fair)</option>
                  <option value="ត្រូវការជួសជុល (Needs Repair)">ត្រូវការជួសជុល (Needs Repair)</option>
                  <option value="ខូចខាត (Broken)">ខូចខាត (Broken)</option>
                </select>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button type="button" onClick={() => setShowAddInventoryModal(false)} className="px-4 py-2 bg-slate-200 dark:bg-slate-800 rounded-xl font-bold">បោះបង់</button>
                <button type="submit" className="px-5 py-2 bg-emerald-600 text-white rounded-xl font-extrabold">បន្ថែម & Sync ចូលសាលា</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 4. Add Agreement Modal */}
      {showAddAgreementModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto font-sans">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-lg p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-slate-100">បង្កើតកិច្ចព្រមព្រៀង ({agreementType === 'parent' ? 'មាតាបិតា' : 'គ្រូ-នាយក'})</h3>
              <button onClick={() => setShowAddAgreementModal(false)} className="text-slate-400 hover:text-slate-600"><X className="w-5 h-5" /></button>
            </div>

            <form onSubmit={handleAddAgreement} className="space-y-3 text-xs">
              {agreementType === 'parent' ? (
                <>
                  <div>
                    <label className="font-bold block mb-1">ឈ្មោះសិស្ស</label>
                    <input type="text" value={selectedStudentForAgr} onChange={e => setSelectedStudentForAgr(e.target.value)} className="w-full p-2 bg-slate-100 dark:bg-slate-800 rounded-xl font-bold" required />
                  </div>
                  <div>
                    <label className="font-bold block mb-1">ឈ្មោះអាណាព្យាបាល</label>
                    <input type="text" value={parentNameAgr} onChange={e => setParentNameAgr(e.target.value)} className="w-full p-2 bg-slate-100 dark:bg-slate-800 rounded-xl font-bold" required />
                  </div>
                </>
              ) : (
                <div>
                  <label className="font-bold block mb-1">ឈ្មោះគ្រូបង្រៀន</label>
                  <input type="text" value="លោកគ្រូ ស៊ឹម សុផល" disabled className="w-full p-2 bg-slate-200 dark:bg-slate-800 rounded-xl font-bold opacity-80" />
                </div>
              )}

              <div>
                <label className="font-bold block mb-1">លក្ខខណ្ឌកិច្ចព្រមព្រៀង</label>
                <textarea value={termsAgr} onChange={e => setTermsAgr(e.target.value)} placeholder="បញ្ចូលលក្ខខណ្ឌព្រមព្រៀង..." rows={3} className="w-full p-2 bg-slate-100 dark:bg-slate-800 rounded-xl font-medium" required />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button type="button" onClick={() => setShowAddAgreementModal(false)} className="px-4 py-2 bg-slate-200 dark:bg-slate-800 rounded-xl font-bold">បោះបង់</button>
                <button type="submit" className="px-5 py-2 bg-purple-600 text-white rounded-xl font-extrabold">រក្សាទុកកិច្ចព្រមព្រៀង</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 5. Add Slow Learner Modal */}
      {showAddSlowLearnerModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto font-sans">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-lg p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-slate-100">បន្ថែមទិន្នន័យជួយសិស្សរៀនយឺត</h3>
              <button onClick={() => setShowAddSlowLearnerModal(false)} className="text-slate-400 hover:text-slate-600"><X className="w-5 h-5" /></button>
            </div>

            <form onSubmit={handleAddSlowLearner} className="space-y-3 text-xs">
              <div>
                <label className="font-bold block mb-1">ឈ្មោះសិស្ស</label>
                <input type="text" value={slStudentName} onChange={e => setSlStudentName(e.target.value)} placeholder="ឧ. ស៊ិន សុជាតិ" className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl font-bold" required />
              </div>

              <div>
                <label className="font-bold block mb-1">មុខវិជ្ជាខ្សោយ</label>
                <input type="text" value={slSubjects} onChange={e => setSlSubjects(e.target.value)} placeholder="ឧ. អំណាន និង គណិតវិទ្យា" className="w-full p-2 bg-slate-100 dark:bg-slate-800 rounded-xl font-bold" required />
              </div>

              <div>
                <label className="font-bold block mb-1">ការរៀបរាប់កម្រិតខ្សោយ (Diagnosis)</label>
                <input type="text" value={slDiagnosis} onChange={e => setSlDiagnosis(e.target.value)} placeholder="ឧ. មិនទាន់ស្គាល់ព្យញ្ជនៈតម្រួត" className="w-full p-2 bg-slate-100 dark:bg-slate-800 rounded-xl font-medium" />
              </div>

              <div>
                <label className="font-bold block mb-1">វិធីសាស្ត្រជួយ (Interventions)</label>
                <textarea value={slInterventions} onChange={e => setSlInterventions(e.target.value)} placeholder="ឧ. បង្រៀនបន្ថែមម៉ោង ១ម៉ោង/ថ្ងៃ" rows={2} className="w-full p-2 bg-slate-100 dark:bg-slate-800 rounded-xl font-medium" />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold block mb-1">ពិន្ទុមុនជួយ</label>
                  <input type="number" step="0.5" value={slBeforeScore} onChange={e => setSlBeforeScore(Number(e.target.value))} className="w-full p-2 bg-slate-100 dark:bg-slate-800 rounded-xl font-bold" />
                </div>
                <div>
                  <label className="font-bold block mb-1">ពិន្ទុបច្ចុប្បន្ន</label>
                  <input type="number" step="0.5" value={slCurrentScore} onChange={e => setSlCurrentScore(Number(e.target.value))} className="w-full p-2 bg-slate-100 dark:bg-slate-800 rounded-xl font-bold" />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button type="button" onClick={() => setShowAddSlowLearnerModal(false)} className="px-4 py-2 bg-slate-200 dark:bg-slate-800 rounded-xl font-bold">បោះបង់</button>
                <button type="submit" className="px-5 py-2 bg-amber-600 text-white rounded-xl font-extrabold">រក្សាទុក</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 6. Add Fitness Test Modal */}
      {showAddFitnessModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto font-sans">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-lg p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-slate-100">បញ្ចូលលទ្ធផលតេស្តកាយសម្បទា</h3>
              <button onClick={() => setShowAddFitnessModal(false)} className="text-slate-400 hover:text-slate-600"><X className="w-5 h-5" /></button>
            </div>

            <form onSubmit={handleAddFitness} className="space-y-3 text-xs">
              <div>
                <label className="font-bold block mb-1">ឈ្មោះសិស្ស</label>
                <input type="text" value={ftStudentName} onChange={e => setFtStudentName(e.target.value)} placeholder="ឧ. ឡុង សុវណ្ណារ៉ា" className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl font-bold" required />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold block mb-1">កម្ពស់ (cm)</label>
                  <input type="number" value={ftHeight} onChange={e => setFtHeight(Number(e.target.value))} className="w-full p-2 bg-slate-100 dark:bg-slate-800 rounded-xl font-bold" />
                </div>
                <div>
                  <label className="font-bold block mb-1">ទម្ងន់ (kg)</label>
                  <input type="number" value={ftWeight} onChange={e => setFtWeight(Number(e.target.value))} className="w-full p-2 bg-slate-100 dark:bg-slate-800 rounded-xl font-bold" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="font-bold block mb-1">រត់ ៥០ម (sec)</label>
                  <input type="number" step="0.1" value={ftSprint} onChange={e => setFtSprint(Number(e.target.value))} className="w-full p-2 bg-slate-100 dark:bg-slate-800 rounded-xl font-bold" />
                </div>
                <div>
                  <label className="font-bold block mb-1">កម្លាំងដៃ (ដង)</label>
                  <input type="number" value={ftArm} onChange={e => setFtArm(Number(e.target.value))} className="w-full p-2 bg-slate-100 dark:bg-slate-800 rounded-xl font-bold" />
                </div>
                <div>
                  <label className="font-bold block mb-1">បត់បែន (cm)</label>
                  <input type="number" value={ftFlex} onChange={e => setFtFlex(Number(e.target.value))} className="w-full p-2 bg-slate-100 dark:bg-slate-800 rounded-xl font-bold" />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button type="button" onClick={() => setShowAddFitnessModal(false)} className="px-4 py-2 bg-slate-200 dark:bg-slate-800 rounded-xl font-bold">បោះបង់</button>
                <button type="submit" className="px-5 py-2 bg-blue-600 text-white rounded-xl font-extrabold">រក្សាទុក</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 7. Add 3 Domains Modal */}
      {showAddDomainModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto font-sans">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-lg p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-slate-100">វាយតម្លៃពិន្ទុសម្បទាទាំង៣ (3 Learning Domains)</h3>
              <button onClick={() => setShowAddDomainModal(false)} className="text-slate-400 hover:text-slate-600"><X className="w-5 h-5" /></button>
            </div>

            <form onSubmit={handleAddDomainScore} className="space-y-3 text-xs">
              <div>
                <label className="font-bold block mb-1">ឈ្មោះសិស្ស</label>
                <input type="text" value={dmStudentName} onChange={e => setDmStudentName(e.target.value)} placeholder="ឧ. ឡុង សុវណ្ណារ៉ា" className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 rounded-xl font-bold" required />
              </div>

              <div>
                <label className="font-bold block mb-1 text-blue-600 dark:text-blue-400">១. វិជ្ជសម្បទា (Cognitive - ចំណេះដឹង និងការគិត / 100)</label>
                <input type="number" value={dmCognitive} onChange={e => setDmCognitive(Number(e.target.value))} min={0} max={100} className="w-full p-2 bg-slate-100 dark:bg-slate-800 rounded-xl font-bold" required />
              </div>

              <div>
                <label className="font-bold block mb-1 text-purple-600 dark:text-purple-400">២. ចរិយាសម្បទា (Affective - សីលធម៌ វិន័យ អាកប្បកិរិយា / 100)</label>
                <input type="number" value={dmAffective} onChange={e => setDmAffective(Number(e.target.value))} min={0} max={100} className="w-full p-2 bg-slate-100 dark:bg-slate-800 rounded-xl font-bold" required />
              </div>

              <div>
                <label className="font-bold block mb-1 text-emerald-600 dark:text-emerald-400">៣. ហត្ថសម្បទា (Psychomotor - បំណិន អនុវត្តដៃជើង / 100)</label>
                <input type="number" value={dmPsychomotor} onChange={e => setDmPsychomotor(Number(e.target.value))} min={0} max={100} className="w-full p-2 bg-slate-100 dark:bg-slate-800 rounded-xl font-bold" required />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button type="button" onClick={() => setShowAddDomainModal(false)} className="px-4 py-2 bg-slate-200 dark:bg-slate-800 rounded-xl font-bold">បោះបង់</button>
                <button type="submit" className="px-5 py-2 bg-purple-600 text-white rounded-xl font-extrabold">រក្សាទុកការវាយតម្លៃ</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
