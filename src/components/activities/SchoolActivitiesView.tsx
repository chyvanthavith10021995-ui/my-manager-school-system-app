import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import type { SchoolActivityRecord, ActivityType } from '../../types';
import {
  Trophy,
  Users,
  Building2,
  BookOpen,
  BadgeCheck,
  Plus,
  Search,
  Calendar,
  MapPin,
  FileText,
  Trash2,
  Award,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  BarChart3,
  FileSpreadsheet,
  CheckSquare,
  Layers,
  Heart,
  Boxes,
  UserCheck
} from 'lucide-react';

export const SchoolActivitiesView: React.FC = () => {
  const {
    schoolActivities,
    addSchoolActivity,
    deleteSchoolActivity,
    students,
    teachers,
    committees,
    censusChildren,
    preschoolAssessments,
    studentSupports,
    parentMeetingPlans,
    schoolAssets,
    financialTransactions
  } = useApp();

  const [activeTab, setActiveTab] = useState<'activities' | 'checklist' | 'indicators' | 'gaps' | 'mapping'>('checklist');
  const [search, setSearch] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedStandardFilter, setSelectedStandardFilter] = useState<string>('all');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Unmet Gap Indicators & Action Resolution Plan State (10 Exhaustive Detailed Gap Items)
  const [gapItems, setGapItems] = useState([
    {
      id: 'gap1',
      stdId: 'std1',
      stdCode: 'ស្ដង់ដារទី១',
      stdTitle: 'លទ្ធផលសិក្សារបស់សិស្ស',
      gapTitle: 'សិស្សរៀនយឺត (Slow Readers) ថ្នាក់ទី១ (៥ នាក់) និង ទី២ (៣ នាក់)',
      gapDescription: 'សិស្សចំនួន ៨ នាក់ (ថ្នាក់ទី១-២) នៅខ្សោយការភ្ជុំព្យញ្ជនៈ ស្រៈ និងប្រមាណវិធីបូកដកលេខលើសពី ១០។ មូលហេតុ៖ អវត្តមានញឹកញាប់ដោយសារឪពុកម្តាយរវល់ធ្វើការចម្ការ និងខ្វះសម្ភារសិក្សានៅផ្ទះ។',
      actionRequired: 'បង្កើត «ថ្នាក់បំប៉នអំណានពិសេស (Remediation Program)» ៣ ម៉ោង/សប្ដាហ៍ ដោយប្រើប្រាស់កញ្ចប់ EGR/EGM របស់ក្រសួង និងចុះកិច្ចព្រមព្រៀងជាមួយអាណាព្យាបាលសិស្ស។',
      actionSteps: [
        'បង្កើតថ្នាក់បំប៉នអំណាន ២ ម៉ោង/សប្ដាហ៍ ដោយប្រើប្រាស់កញ្ចប់ EGR/EGM',
        'ចុះកិច្ចព្រមព្រៀងជាមួយអាណាព្យាបាលសិស្សទាំង ៨ នាក់ ដើម្បីជំរុញការអាននៅផ្ទះ ១៥-៣០ នាទី/ថ្ងៃ',
        'ធ្វើតេស្តស្ទង់សមត្ថភាពអំណានរៀងរាល់ដំណាច់ខែដើម្បីតាមដានការរីកចម្រើន'
      ],
      requiredResources: 'កញ្ចប់សៀវភៅជំនួយ EGR/EGM និងបណ្ណអក្សរចល័ត',
      responsiblePerson: 'អ្នកគ្រូ គឹម ស្រីពៅ & គ្រូបន្ទុកថ្នាក់ទី១-២',
      targetDate: '២០២៦-១០-៣០',
      completed: false
    },
    {
      id: 'gap2',
      stdId: 'std1',
      stdCode: 'ស្ដង់ដារទី១',
      stdTitle: 'លទ្ធផលសិក្សារបស់សិស្ស',
      gapTitle: 'ក្លឹបសិក្សាស្រាវជ្រាវសិស្សពូកែ & បណ្ណសរសើរលើកទឹកចិត្ត',
      gapDescription: 'សិស្សពូកែថ្នាក់ទី៤-៦ ពុំទាន់មានក្លឹបសិក្សាស្រាវជ្រាវ (Study Club) សម្រាប់ត្រៀមប្រឡងសិស្សពូកែកម្រិតស្រុក/ខេត្ត និងខ្វះបណ្ណសរសើរលើកទឹកចិត្តសិស្សដែលមានការចម្រើនផ្នែកចរិយាសម្បទា។',
      actionRequired: 'បង្កើត «ក្លឹបសិស្សពូកែ គណិតវិទ្យា-ភាសាខ្មែរ» ដឹកនាំដោយលោកគ្រូអ្នកគ្រូថ្នាក់ទី៥-៦ និងរៀបចំពិធីប្រគល់បណ្ណសរសើរប្រចាំខែ។',
      actionSteps: [
        'បង្កើត «ក្លឹបសិស្សពូកែ គណិតវិទ្យា-ភាសាខ្មែរ» ដឹកនាំដោយលោកគ្រូអ្នកគ្រូថ្នាក់ទី៥-៦',
        'រៀបចំកាលវិភាគស្វ័យសិក្សានៅបណ្ណាល័យ ២ ម៉ោង/សប្ដាហ៍ ជាមួយលោកស្រី សឹង រតនា',
        'រៀបចំពិធីប្រគល់បណ្ណសរសើរ និងរង្វាន់លើកទឹកចិត្តសិស្សជ័យលាភីប្រចាំខែ'
      ],
      requiredResources: 'បណ្ណសរសើរ, សៀវភៅលំហាត់សិស្សពូកែ និងថវិការង្វាន់ គគថ',
      responsiblePerson: 'លោក ឈិត សារ៉ាំ (នាយក) & លោកគ្រូអ្នកគ្រូថ្នាក់ទី៥-៦',
      targetDate: '២០២៦-១១-០៥',
      completed: false
    },
    {
      id: 'gap3',
      stdId: 'std2',
      stdCode: 'ស្ដង់ដារទី២',
      stdTitle: 'ការបង្រៀន និងរៀន',
      gapTitle: 'ការផលិតសម្ភារឧបទេសបង្រៀន (Teaching Aids) តាមមុខវិជ្ជា STEM',
      gapDescription: 'គ្រូបង្រៀនថ្នាក់ទី១ ដល់ ទី៤ មួយចំនួននៅប្រើប្រាស់សម្ភារឧបទេសចាស់ៗ មិនទាន់បានផលិតសម្ភារឧបទេសបង្រៀនច្នៃប្រឌិតថ្មីៗ តាមមុខវិជ្ជា STEM/វិទ្យាសាស្ត្រ និងទស្សនវិទ្យាអនុវត្ត។',
      actionRequired: 'រៀបចំទិវា «សិក្ខាសាលាផលិតសម្ភារឧបទេសបង្រៀនច្នៃប្រឌិត» និងបង្កើតជ្រុងសម្ភារឧបទេសបង្រៀន (Learning Resources Corner)។',
      actionSteps: [
        'រៀបចំទិវា «សិក្ខាសាលាផលិតសម្ភារឧបទេសបង្រៀនច្នៃប្រឌិត» ត្រីមាសទី១',
        'បង្កើតជ្រុងសម្ភារឧបទេសបង្រៀន (Learning Resources Corner) ក្នុងបន្ទប់ប្រជុំបច្ចេកទេស',
        'វាយតម្លៃ និងជ្រើសរើសសម្ភារឧបទេសឆ្នើមប្រចាំសាលាដើម្បីផ្ញើសុំសរសើរពីការិយាល័យអប់រំស្រុកបាណន់'
      ],
      requiredResources: 'ក្រដាសរឹង, ពណ៌, កាតុងច្នៃប្រឌិត, ថវិកាសម្ភារៈ PB',
      responsiblePerson: 'លោក ប្រុញ វឿន (នាយករង) & ប្រធានកម្រងបច្ចេកទេស',
      targetDate: '២០២៦-១០-២៥',
      completed: false
    },
    {
      id: 'gap4',
      stdId: 'std2',
      stdCode: 'ស្ដង់ដារទី២',
      stdTitle: 'ការបង្រៀន និងរៀន',
      gapTitle: 'ការបង្រៀនតាមប្រព័ន្ធឌីជីថល (ICT Slides & Video Tools)',
      gapDescription: 'ថ្នាក់ទី១ ដល់ ទី៤ មិនទាន់មានម៉ាស៊ីនបញ្ចាំង Projector/Smart TV សម្រាប់បង្រៀនមាតិកាឌីជីថល និងវីដេអូបង្រៀនចលនា MoEYS។',
      actionRequired: 'បំពាក់ Smart TV ឬ Projector ឌីជីថលបន្ថែម ១ កញ្ចប់ សម្រាប់បន្ទប់សិក្សាថ្នាក់ដំបូង និងរៀបចំប្រជុំ PLC ផលិតស្លាយ។',
      actionSteps: [
        'បំពាក់ Smart TV ឬ Projector ឌីជីថលបន្ថែម ១ កញ្ចប់ សម្រាប់បន្ទប់សិក្សាថ្នាក់ដំបូង',
        'រៀបចំប្រជុំកម្រង PLC បណ្តុះបណ្តាលការបង្រៀនតាមបែបឌីជីថល (Digital Teaching Methodology)',
        'បង្កើតបណ្ណាល័យស្លាយបង្រៀន (Slide Repository) ទុកចែករំលែកក្នុងក្រុមគ្រូបង្រៀនសាលា'
      ],
      requiredResources: 'កញ្ចប់ Smart TV ៥៥ អ៊ីញ និងជើងទម្រចល័ត',
      responsiblePerson: 'លោក វ៉ិត ជីវន្ថា (លេខា) & គណៈកម្មការបច្ចេកទេស',
      targetDate: '២០២៦-១១-១៥',
      completed: false
    },
    {
      id: 'gap5',
      stdId: 'std3',
      stdCode: 'ស្ដង់ដារទី៣',
      stdTitle: 'ការចូលរួមរបស់សហគមន៍',
      gapTitle: 'អាណាព្យាបាលសិស្សធ្វើចំណាកស្រុក (១២%) & Digital Parent Group',
      gapDescription: 'អាណាព្យាបាលសិស្សប្រមាណ ១២% ធ្វើចំណាកស្រុកទៅធ្វើការនៅខេត្តផ្សេង ឬប្រទេសជិតខាង មិនទាន់បានចូលរួមប្រជុំមាតាបិតាផ្ទាល់នៅសាលា។',
      actionRequired: 'បង្កើត Digital Parent Community Group (Telegram Broadcast & Call System) ដើម្បីផ្ញើបណ្ណព័ត៌មានសិក្សាជូន។',
      actionSteps: [
        'បង្កើត Digital Parent Community Group (Telegram Broadcast & Dedicated Phone Call)',
        'ផ្ញើបណ្ណព័ត៌មានសិក្សា វត្តមានសិស្ស និងរូបថតសកម្មភាពកូនៗតាម Telegram រៀងរាល់ចុងខែ',
        'រៀបចំការប្រជុំពិភាក្សាអនឡាញ/ទូរស័ព្ទផ្ទាល់ជាមួយអាណាព្យាបាលឆ្ងាយ'
      ],
      requiredResources: 'ប្រព័ន្ធគ្រប់គ្រងទំនាក់ទំនង Telegram/Call System',
      responsiblePerson: 'លោក ប្រុញ វឿន & គ្រូបន្ទុកថ្នាក់គ្រប់កម្រិត',
      targetDate: '២០២៦-១០-១៥',
      completed: false
    }
  ]);

  // Full Official MoEYS 5 Model Primary School Standards Breakdown (All Categories & Sub-Indicators)
  const [keySubIndicatorsData, setKeySubIndicatorsData] = useState([
    {
      id: 'std1',
      code: 'ស្ដង់ដារទី១',
      title: 'លទ្ធផលសិក្សារបស់សិស្ស (Student Learning Outcomes)',
      keyIndicators: [
        {
          code: '១. ការប្រមូលកុមារចូលរៀន',
          title: 'ការប្រមូលកុមារចូលរៀនតាមអាយុ',
          weight: '២០%',
          subIndicators: [
            {
              code: '១.១',
              title: 'ភាគរយកុមារថ្នាក់ទី១ ចូលរៀនត្រឹមត្រូវតាមអាយុ (៦ ឆ្នាំ)',
              targetBenchmark: '១០០%',
              currentResult: '៩៨.២%',
              status: 'សម្រេចបានល្អ',
              score: 98,
              evidence: 'បញ្ជីជំរឿនកុមារភូមិចំការស្វាយ & ភូមិអន្លង់តាម៉ី',
              mappedReport: 'របាយការណ៍ជំរឿនកុមារ'
            }
          ]
        },
        {
          code: '២. កុមាររៀនបានគង់វង្សក្នុងសាលារៀន',
          title: 'ការរក្សាសិស្សឱ្យស្ថិតក្នុងសាលារៀន',
          weight: '២០%',
          subIndicators: [
            {
              code: '២.១',
              title: 'អត្រាបោះបង់ការសិក្សា',
              targetBenchmark: '≤ ២.០%',
              currentResult: '០.៨%',
              status: 'សម្រេចបានល្អ',
              score: 98,
              evidence: 'បញ្ជីវត្តមានសិស្ស & សៀវភៅតាមដានអវត្តមាន',
              mappedReport: 'របាយការណ៍អវត្តមាន'
            },
            {
              code: '២.២',
              title: 'អត្រាត្រួតថ្នាក់',
              targetBenchmark: '≤ ៣.០%',
              currentResult: '០.៧%',
              status: 'សម្រេចបានល្អ',
              score: 99,
              evidence: 'របាយការណ៍លទ្ធផលប្រឡងប្រចាំឆ្នាំ',
              mappedReport: 'របាយការណ៍សៀវភៅពិន្ទុ'
            }
          ]
        },
        {
          code: '៣. លទ្ធផលនៃការសិក្សារបស់សិស្ស',
          title: 'សមត្ថភាពសិក្សាភាសាខ្មែរ គណិតវិទ្យា & អំណានស្ដង់ដារ',
          weight: '៣០%',
          subIndicators: [
            {
              code: '៣.១',
              title: 'ភាគរយសិស្សមាននិទ្ទេស AB និង C មុខវិជ្ជាភាសាខ្មែរ',
              targetBenchmark: '≥ ៨៥.០%',
              currentResult: '៩២.៥%',
              status: 'សម្រេចបានល្អ',
              score: 93,
              evidence: 'សៀវភៅពិន្ទុ & លទ្ធផលប្រឡងភាសាខ្មែរ',
              mappedReport: 'របាយការណ៍សៀវភៅពិន្ទុ'
            },
            {
              code: '៣.២',
              title: 'ភាគរយសិស្សមាននិទ្ទេស AB និង C មុខវិជ្ជាគណិតវិទ្យា',
              targetBenchmark: '≥ ៨៥.០%',
              currentResult: '៩០.០%',
              status: 'សម្រេចបានល្អ',
              score: 90,
              evidence: 'សៀវភៅពិន្ទុ & លទ្ធផលប្រឡងគណិតវិទ្យា',
              mappedReport: 'របាយការណ៍សៀវភៅពិន្ទុ'
            },
            {
              code: '៣.៣',
              title: 'ភាគរយសិស្សថ្នាក់ទី៣ មានសមត្ថភាពអានតាមស្តង់ដារ (៤៥ ទៅ ៦០ ពាក្យ/នាទី)',
              targetBenchmark: '≥ ៨៥.០%',
              currentResult: '៨៨.០%',
              status: 'សម្រេចបានល្អ',
              score: 88,
              evidence: 'លទ្ធផលតេស្តអំណានថ្នាក់ទី៣',
              mappedReport: 'របាយការណ៍តេស្ត EGR'
            },
            {
              code: '៣.៤',
              title: 'ភាគរយសិស្សថ្នាក់ទី៦ មានសមត្ថភាពអានតាមស្ដង់ដារ (១០០ ទៅ ១២០ ពាក្យ/នាទី)',
              targetBenchmark: '≥ ៨៥.០%',
              currentResult: '៨៦.៥%',
              status: 'សម្រេចបានល្អ',
              score: 87,
              evidence: 'លទ្ធផលតេស្តអំណានថ្នាក់ទី៦',
              mappedReport: 'របាយការណ៍តេស្តអំណាន'
            }
          ]
        },
        {
          code: '៤. ស្ថានភាពអាហារូបត្ថម្ភ',
          title: 'សុខភាព និងការគាំទ្រអាហារូបត្ថម្ភសិស្ស',
          weight: '១៥%',
          subIndicators: [
            {
              code: '៤.១',
              title: 'ភាគរយសិស្សមានស្ថានភាពអាហារូបត្ថម្ភធម្មតា',
              targetBenchmark: '≥ ៩០.០%',
              currentResult: '៩៤.០%',
              status: 'សម្រេចបានល្អ',
              score: 94,
              evidence: 'សៀវភៅតាមដានកាយសម្បទា WFP',
              mappedReport: 'របាយការណ៍ជំនួយសិស្ស'
            },
            {
              code: '៤.២',
              title: 'ភាគរយសិស្សដែលមានបញ្ហាអាហារូបត្ថម្ភទទួលបានកិច្ចអន្តរាគមន៍',
              targetBenchmark: '១០០%',
              currentResult: '៩៥.០%',
              status: 'សម្រេចបានល្អ',
              score: 95,
              evidence: 'របាយការណ៍អន្តរាគមន៍សុខភាពសិស្ស',
              mappedReport: 'របាយការណ៍សុខភាព'
            },
            {
              code: '៤.៣',
              title: 'ភាគរយសិស្សក្រីក្រទទួលបានអាហារូបករណ៍ ឬ ការឧបត្ថម្ភនានា',
              targetBenchmark: '១០០%',
              currentResult: '១០០%',
              status: 'សម្រេចបានល្អ',
              score: 100,
              evidence: 'បញ្ជីឈ្មោះសិស្សអាហារូបករណ៍ IDPoor',
              mappedReport: 'របាយការណ៍អាហារូបករណ៍'
            }
          ]
        },
        {
          code: '៥. សីលធម៌និងឥរិយាបថសិស្ស',
          title: 'ការប្រឹក្សាយោបល់ និងការវាយតម្លៃចរិយាសម្បទា',
          weight: '១៥%',
          subIndicators: [
            {
              code: '៥.១',
              title: 'ភាគរយកុមារទទួលបានការប្រឹក្សាយោបល់',
              targetBenchmark: '១០០%',
              currentResult: '៩៥.០%',
              status: 'សម្រេចបានល្អ',
              score: 95,
              evidence: 'កំណត់ហេតុប្រឹក្សាយោបល់សិស្ស',
              mappedReport: 'របាយការណ៍ការងារសិស្ស'
            },
            {
              code: '៥.២',
              title: 'ភាគរយថ្នាក់រៀនដាក់ពិន្ទុ បំណិនសម្បទា និងចរិយាសម្បទាដល់សិស្សប្រចាំឆ្នាំ',
              targetBenchmark: '១០០%',
              currentResult: '១០០%',
              status: 'សម្រេចបានល្អ',
              score: 100,
              evidence: 'សៀវភៅតាមដានបំណិន & ចរិយាសម្បទា',
              mappedReport: 'របាយការណ៍សៀវភៅពិន្ទុ'
            }
          ]
        }
      ]
    },
    {
      id: 'std2',
      code: 'ស្ដង់ដារទី២',
      title: 'ការបង្រៀន និងរៀន (Teaching and Learning)',
      keyIndicators: [
        {
          code: '១. ការអភិវឌ្ឍសមត្ថភាព និងការបង្រៀន',
          title: 'ការបណ្តុះបណ្តាល និងសម្ភារឧបទេសអំណាន/គណិតថ្នាក់ដំបូង',
          weight: '២០%',
          subIndicators: [
            {
              code: '១.១',
              title: 'ភាគរយគ្រូបង្រៀនថ្នាក់ទី១ និង/ឬ ទី២ និង/ឬ ទី៣ អនុវត្តកញ្ចប់សម្ភារៈអំណានថ្នាក់ដំបូង កម្រិត ២ និង៣',
              targetBenchmark: '១០០%',
              currentResult: '១០០%',
              status: 'សម្រេចបានល្អ',
              score: 100,
              evidence: 'កញ្ចប់សម្ភារៈអំណានថ្នាក់ដំបូង EGR',
              mappedReport: 'របាយការណ៍អំណានថ្នាក់ដំបូង'
            },
            {
              code: '១.២',
              title: 'ភាគរយគ្រូបង្រៀនថ្នាក់ទី១ និង/ឬ ទី២ និង/ឬ ទី៣ អនុវត្តកញ្ចប់សម្ភារៈគណិតវិទ្យាថ្នាក់ដំបូង កម្រិត ២ និង៣',
              targetBenchmark: '១០០%',
              currentResult: '១០០%',
              status: 'សម្រេចបានល្អ',
              score: 100,
              evidence: 'កញ្ចប់សម្ភារៈគណិតថ្នាក់ដំបូង EGM',
              mappedReport: 'របាយការណ៍គណិតថ្នាក់ដំបូង'
            },
            {
              code: '១.៣',
              title: 'ភាគរយគ្រូបង្រៀនចូលរៀនវគ្គអភិវឌ្ឍសមត្ថភាពប្រចាំឆ្នាំ (កញ្ចប់អំណាន/គណិត គរុកោសល្យ វិន័យវិជ្ជមាន)',
              targetBenchmark: '១០០%',
              currentResult: '៩២.៣%',
              status: 'សម្រេចបានល្អ',
              score: 92,
              evidence: 'វិញ្ញាបនបត្រ & បញ្ជីវត្តមានវគ្គបណ្តុះបណ្តាល',
              mappedReport: 'របាយការណ៍អភិវឌ្ឍគ្រូ'
            },
            {
              code: '១.៤',
              title: 'ចំនួនកិច្ចការជាគម្រោង ដែលគ្រូថ្នាក់ទី៤-៦ បានដាក់ឱ្យសិស្សអនុវត្ត ក្នុងមួយឆ្នាំ (មធ្យម)',
              targetBenchmark: '≥ ២ គម្រោង/ឆ្នាំ',
              currentResult: '២ គម្រោង/ឆ្នាំ',
              status: 'សម្រេចបានល្អ',
              score: 100,
              evidence: 'សំណុំឯកសារគម្រោងសិក្សាសិស្ស',
              mappedReport: 'របាយការណ៍គម្រោងសិស្ស'
            },
            {
              code: '១.៥',
              title: 'ភាគរយសិស្សបានធ្វើកិច្ចការផ្ទះតាមមេរៀន ភាសាខ្មែរ និងគណិតវិទ្យា និងមានការកែពីគ្រូ',
              targetBenchmark: '≥ ៩០.០%',
              currentResult: '៩៥.០%',
              status: 'សម្រេចបានល្អ',
              score: 95,
              evidence: 'សៀវភៅកិច្ចការផ្ទះសិស្សដែលមានការកែ',
              mappedReport: 'របាយការណ៍តាមដានការបង្រៀន'
            }
          ]
        },
        {
          code: '២. ការអនុវត្តកម្មវិធីសិក្សានិងការរៀបចំផែនការបង្រៀន',
          title: 'បំណែងចែកកម្មវិធី, កិច្ចតែងការ, ម៉ោងសិក្សា & កម្មវិធីបន្ថែម',
          weight: '២០%',
          subIndicators: [
            {
              code: '២.១',
              title: 'ភាគរយថ្នាក់រៀនដែលមានបំណែងចែកកម្មវិធីសិក្សាគ្រប់មុខវិជ្ជាសិក្សាគោល',
              targetBenchmark: '១០០%',
              currentResult: '១០០%',
              status: 'សម្រេចបានល្អ',
              score: 100,
              evidence: 'កាលវិភាគ & បំណែងចែកកម្មវិធីសិក្សា',
              mappedReport: 'កាលវិភាគស្ដង់ដារ'
            },
            {
              code: '២.២',
              title: 'ភាគរយគ្រូបង្រៀនដែលបានរៀបចំកិច្ចតែងការបង្រៀនថ្មី ឬ ធ្វើបច្ចុប្បន្នកម្ម គ្រប់មេរៀន និងគ្រប់មុខវិជ្ជា',
              targetBenchmark: '១០០%',
              currentResult: '១០០%',
              status: 'សម្រេចបានល្អ',
              score: 100,
              evidence: 'សៀវភៅកិច្ចតែងការបង្រៀនលោកគ្រូអ្នកគ្រូ',
              mappedReport: 'បញ្ជីឈ្មោះគ្រូបង្រៀន'
            },
            {
              code: '២.៣',
              title: 'ចំនួនដងថ្នាក់រៀនបិទទ្វារ (សរុបថ្នាក់ទាំងអស់គិតជាមធ្យម)',
              targetBenchmark: '០ ដង',
              currentResult: '០ ដង',
              status: 'សម្រេចបានល្អ',
              score: 100,
              evidence: 'សៀវភៅតាមដានវត្តមានថ្នាក់រៀន',
              mappedReport: 'របាយការណ៍វត្តមានសាលា'
            },
            {
              code: '២.៤',
              title: 'ចំនួនថ្ងៃសាលារៀនបិទទ្វារមិនតាមប្រតិទិនសិក្សាប្រចាំឆ្នាំ',
              targetBenchmark: '០ ថ្ងៃ',
              currentResult: '០ ថ្ងៃ',
              status: 'សម្រេចបានល្អ',
              score: 100,
              evidence: 'ប្រតិទិនសិក្សាសាលារៀន MoEYS',
              mappedReport: 'ប្រតិទិនសិក្សា'
            },
            {
              code: '២.៥',
              title: 'ភាគរយថ្នាក់ទី៤-៦ បានបង្រៀនភាសាបរទេស (ភាសាអង់គ្លេស)',
              targetBenchmark: '១០០%',
              currentResult: '១០០%',
              status: 'សម្រេចបានល្អ',
              score: 100,
              evidence: 'កាលវិភាគបង្រៀនភាសាអង់គ្លេសថ្នាក់ទី៤-៦',
              mappedReport: 'កាលវិភាគស្ដង់ដារ'
            },
            {
              code: '២.៦',
              title: 'ភាគរយថ្នាក់ទី៤-៦ បានបង្រៀនមេរៀន បំណិនជីវិតមូលដ្ឋាន',
              targetBenchmark: '១០០%',
              currentResult: '១០០%',
              status: 'សម្រេចបានល្អ',
              score: 100,
              evidence: 'កិច្ចតែងការ និងរូបថតថ្នាក់បំណិនជីវិត',
              mappedReport: 'របាយការណ៍បំណិនជីវិត'
            },
            {
              code: '២.៧',
              title: 'ភាគរយសិស្សអវត្តមានលើស ៤ដង ក្នុងមួយឆ្នាំសិក្សា',
              targetBenchmark: '≤ ៥.០%',
              currentResult: '២.៥%',
              status: 'សម្រេចបានល្អ',
              score: 95,
              evidence: 'សៀវភៅតាមដានអវត្តមានសិស្ស',
              mappedReport: 'របាយការណ៍អវត្តមាន'
            }
          ]
        },
        {
          code: '៣. សម្ភារៈរៀននិងបង្រៀន',
          title: 'សៀវភៅសិក្សាគោល, កញ្ចប់អំណាន/គណិត, សម្ភារឧបទេស & ICT',
          weight: '១៥%',
          subIndicators: [
            {
              code: '៣.១',
              title: 'ភាគរយសិស្សមានសៀវភៅសិក្សាគោលតាមនិយាម',
              targetBenchmark: '១០០%',
              currentResult: '១០០%',
              status: 'សម្រេចបានល្អ',
              score: 100,
              evidence: 'បញ្ជីប្រគល់-ទទួលសៀវភៅសិក្សាគោល',
              mappedReport: 'របាយការណ៍ប្រគល់សៀវភៅ'
            },
            {
              code: '៣.២',
              title: 'ភាគរយសិស្សថ្នាក់ទី១ និង/ឬ ទី២ និង/ឬ ទី៣ មានកញ្ចប់សម្ភារៈអំណាន និងគណិតវិទ្យាថ្នាក់ដំបូង',
              targetBenchmark: '១០០%',
              currentResult: '១០០%',
              status: 'សម្រេចបានល្អ',
              score: 100,
              evidence: 'បញ្ជីប្រគល់កញ្ចប់សម្ភារៈ EGR/EGM',
              mappedReport: 'របាយការណ៍សម្ភារៈអំណាន'
            },
            {
              code: '៣.៣',
              title: 'ភាគរយគ្រូបង្រៀនផលិត និងប្រើប្រាស់សម្ភារឧបទេសជាប្រចាំ',
              targetBenchmark: '≥ ៩០.០%',
              currentResult: '៨៥.០%',
              status: 'កំពុងកែលម្អ',
              score: 85,
              evidence: 'ជ្រុងសម្ភារឧបទេសបង្រៀនច្នៃប្រឌិត',
              mappedReport: 'របាយការណ៍សម្ភារឧបទេស'
            },
            {
              code: '៣.៤',
              title: 'ភាគរយគ្រូបង្រៀនប្រើប្រាស់បច្ចេកវិទ្យាបម្រើឱ្យការរៀន និងបង្រៀន',
              targetBenchmark: '≥ ៨០.០%',
              currentResult: '៧៥.០%',
              status: 'កំពុងកែលម្អ',
              score: 75,
              evidence: 'ឧបករណ៍ Smart TV/Projector & ស្លាយ',
              mappedReport: 'របាយការណ៍ ICT'
            }
          ]
        },
        {
          code: '៤. ការជួយគាំទ្រសិស្ស',
          title: 'កិច្ចព្រមព្រៀងរៀនសូត្រ, ប្រជុំមាតាបិតាប្រចាំខែ & បំប៉នសិស្សយឺត',
          weight: '១៥%',
          subIndicators: [
            {
              code: '៤.១',
              title: 'ភាគរយសិស្ស និងមាតាបិតាបានចុះកិច្ចព្រមព្រៀងរៀនសូត្រប្រចាំឆ្នាំជាមួយគ្រូបង្រៀន',
              targetBenchmark: '១០០%',
              currentResult: '៩៥.០%',
              status: 'សម្រេចបានល្អ',
              score: 95,
              evidence: 'សំណុំកិច្ចព្រមព្រៀងរៀនសូត្រប្រចាំឆ្នាំ',
              mappedReport: 'របាយការណ៍កិច្ចព្រមព្រៀង'
            },
            {
              code: '៤.២',
              title: 'ភាគរយថ្នាក់រៀនមានការប្រជុំជាមួយមាតាបិតា ពិនិត្យតាមដានការរៀនសូត្រទៀងទាត់ ១ ខែម្តង',
              targetBenchmark: '១០០%',
              currentResult: '៨៥.០%',
              status: 'កំពុងកែលម្អ',
              score: 85,
              evidence: 'កំណត់ហេតុប្រជុំមាតាបិតាប្រចាំខែ',
              mappedReport: 'របាយការណ៍ប្រជុំមាតាបិតា'
            },
            {
              code: '៤.៣',
              title: 'ភាគរយសិស្សរៀនយឺតបានទទួលការជួយប្រចាំខែ ផ្អែកតាមលទ្ធផលតេស្តស្ដង់ដារប្រចាំខែ',
              targetBenchmark: '១០០%',
              currentResult: '៨៧.៥%',
              status: 'កំពុងកែលម្អ',
              score: 88,
              evidence: 'ផែនការ & បញ្ជីបំប៉នសិស្សរៀនយឺត ៨ នាក់',
              mappedReport: 'ផែនការបំប៉នសិស្សយឺត'
            }
          ]
        },
        {
          code: '៥. ដំណើរការបណ្ណាល័យ',
          title: 'ការខ្ចី-សងសៀវភៅ & ម៉ោងអានសៀវភៅក្នុងបណ្ណាល័យ',
          weight: '១០%',
          subIndicators: [
            {
              code: '៥.១',
              title: 'ចំនួនសៀវភៅដែលសិស្សម្នាក់ៗ ខ្ចី-សង ក្នុងមួយឆ្នាំសិក្សា',
              targetBenchmark: '≥ ១០ ក្បាល/ឆ្នាំ',
              currentResult: '១២ ក្បាល/ឆ្នាំ',
              status: 'សម្រេចបានល្អ',
              score: 100,
              evidence: 'សៀវភៅតាមដានការខ្ចី-សងសៀវភៅបណ្ណាល័យ',
              mappedReport: 'របាយការណ៍បណ្ណាល័យ'
            },
            {
              code: '៥.២',
              title: 'ចំនួនដង គ្រូបង្រៀនម្នាក់ៗក្នុងមួយឆ្នាំសិក្សា នាំសិស្សចូលបណ្ណាល័យអនុវត្តសាស្ត្រអំណាន',
              targetBenchmark: '≥ ៣០ ដង/ឆ្នាំ',
              currentResult: '៣២ ដង/ឆ្នាំ',
              status: 'សម្រេចបានល្អ',
              score: 100,
              evidence: 'បញ្ជីវត្តមាននាំសិស្សចូលបណ្ណាល័យ',
              mappedReport: 'របាយការណ៍បណ្ណាល័យ'
            }
          ]
        },
        {
          code: '៦. ការធ្វើអធិការកិច្ចផ្ទៃក្នុង',
          title: 'ការផ្តល់ប្រឹក្សាគរុកោសល្យ និងពិនិត្យថ្នាក់រៀន',
          weight: '៥%',
          subIndicators: [
            {
              code: '៦.១',
              title: 'ភាគរយគ្រូបង្រៀនទទួលបានការផ្តល់ប្រឹក្សាគរុកោសល្យ/អធិការកិច្ចថ្នាក់រៀន យ៉ាងតិចម្តង/ខែ',
              targetBenchmark: '១០០%',
              currentResult: '៩២.៣%',
              status: 'សម្រេចបានល្អ',
              score: 92,
              evidence: 'ទម្រង់វាយតម្លៃអធិការកិច្ចថ្នាក់រៀនរបស់នាយក',
              mappedReport: 'របាយការណ៍អធិការកិច្ច'
            }
          ]
        },
        {
          code: '៧. ការប្រជុំបច្ចេកទេស',
          title: 'អង្គប្រជុំកម្រងបច្ចេកទេសគ្រូបង្រៀន (PLC)',
          weight: '៥%',
          subIndicators: [
            {
              code: '៧.១',
              title: 'ចំនួនដងសាលារៀនរៀបចំប្រជុំបច្ចេកទេស',
              targetBenchmark: '≥ ២៤ ដង/ឆ្នាំ',
              currentResult: '២៤ ដង/ឆ្នាំ',
              status: 'សម្រេចបានល្អ',
              score: 100,
              evidence: 'កំណត់ហេតុប្រជុំកម្រងបច្ចេកទេស PLC',
              mappedReport: 'កំណត់ហេតុប្រជុំបច្ចេកទេស'
            }
          ]
        },
        {
          code: '៨. ការអនុវត្តកម្មវិធីសិក្សាក្រៅម៉ោង',
          title: 'ការប្រកួតប្រជែង, ក្លឹបសិក្សា & ទស្សនកិច្ចសិក្សា',
          weight: '៥%',
          subIndicators: [
            {
              code: '៨.១',
              title: 'ចំនួនដងប្រកួតប្រជែងអំណាន និងធ្វើលំហាត់គណិតវិទ្យា ក្នុងមួយឆ្នាំសិក្សា',
              targetBenchmark: '≥ ៤ ដង/ឆ្នាំ',
              currentResult: '៤ ដង/ឆ្នាំ',
              status: 'សម្រេចបានល្អ',
              score: 100,
              evidence: 'លទ្ធផល & រូបថតការប្រកួតប្រជែងអំណាន/គណិត',
              mappedReport: 'របាយការណ៍សកម្មភាពសាលា'
            },
            {
              code: '៨.២',
              title: 'ចំនួនក្លឹបសិក្សាបានបង្កើតដើម្បីជួយសិស្សរៀនយឺត និងជួយការងារផ្សេងៗរបស់សាលារៀន',
              targetBenchmark: '≥ ២ ក្លឹប',
              currentResult: '២ ក្លឹប (គណិត/ខ្មែរ)',
              status: 'សម្រេចបានល្អ',
              score: 100,
              evidence: 'បញ្ជីឈ្មោះសមាជិកក្លឹបសិក្សាសាលារៀន',
              mappedReport: 'របាយការណ៍ក្លឹបសិក្សា'
            },
            {
              code: '៨.៣',
              title: 'ចំនួនដងសិស្សានុសិស្សបានចុះទស្សនកិច្ចសិក្សានៅតាមទីកន្លែងនានា ក្នុងមួយឆ្នាំសិក្សា',
              targetBenchmark: '≥ ១ ដង/ឆ្នាំ',
              currentResult: '១ ដង/ឆ្នាំ',
              status: 'សម្រេចបានល្អ',
              score: 100,
              evidence: 'របាយការណ៍ & រូបថតទស្សនកិច្ចសិក្សាសិស្ស',
              mappedReport: 'របាយការណ៍ទស្សនកិច្ច'
            }
          ]
        },
        {
          code: '៩. ការអនុវត្តការអប់រំសីលធម៌ ចរិយាធម៌',
          title: 'កម្មវិធីចរិយាធម៌, ធម្មទេសនាព្រះសង្ឃ & សកម្មភាពសិល្បៈ',
          weight: '៥%',
          subIndicators: [
            {
              code: '៩.១',
              title: 'សាលារៀនមានកម្មវិធីលើកកម្ពស់ចរិយាធម៌ (ស្អាត សុភាព របៀប ទៀងពេល និងសមាធិ)',
              targetBenchmark: 'មានកម្មវិធី',
              currentResult: 'អនុវត្តរៀងរាល់ព្រឹក',
              status: 'សម្រេចបានល្អ',
              score: 100,
              evidence: 'កម្មវិធី & កាលវិភាគចរិយាធម៌សាលា',
              mappedReport: 'របាយការណ៍ចរិយាធម៌'
            },
            {
              code: '៩.២',
              title: 'ចំនួនដងព្រះសង្ឃនិមន្តមកសំដែងធម៌ទេសនាអប់រំ ក្នុងមួយឆ្នាំសិក្សា',
              targetBenchmark: '≥ ៣ ដង/ឆ្នាំ',
              currentResult: '៣ ដង/ឆ្នាំ',
              status: 'សម្រេចបានល្អ',
              score: 100,
              evidence: 'កំណត់ហេតុ & រូបថតព្រះសង្ឃសំដែងធម៌',
              mappedReport: 'របាយការណ៍សកម្មភាពសាលា'
            },
            {
              code: '៩.៣',
              title: 'សាលារៀនមានសកម្មភាពអប់រំសិល្បៈ (ចម្រៀង គំនូរ របាំ តន្ត្រី)',
              targetBenchmark: 'មានសកម្មភាព',
              currentResult: 'មានថ្នាក់សិល្បៈ/គំនូរ',
              status: 'សម្រេចបានល្អ',
              score: 100,
              evidence: 'ស្នាដៃគំនូរ & សកម្មភាពក្រុមសិល្បៈសិស្ស',
              mappedReport: 'របាយការណ៍សកម្មភាពសាលា'
            }
          ]
        }
      ]
    },
    {
      id: 'std3',
      code: 'ស្ដង់ដារទី៣',
      title: 'ការចូលរួមរបស់សហគមន៍ (Community Participation)',
      keyIndicators: [
        {
          code: '១. ការបង្កើត និងដំណើរការ គគស និង គគថ',
          title: 'ដំណើរការគណៈកម្មការគ្រប់គ្រងសាលារៀន និងថ្នាក់រៀន',
          weight: '៤០%',
          subIndicators: [
            {
              code: '១.១',
              title: 'ចំនួនដងគណៈកម្មការគ្រប់គ្រងសាលារៀន (គគស) ប្រជុំ',
              targetBenchmark: '≥ ៣ ដង/ឆ្នាំ',
              currentResult: '៣ ដង/ឆ្នាំ',
              status: 'សម្រេចបានល្អ',
              score: 100,
              evidence: 'កំណត់ហេតុប្រជុំ គគស (SMC) ទាំង ៣ លើក',
              mappedReport: 'របាយការណ៍ គគស (SMC)'
            },
            {
              code: '១.២',
              title: 'ភាគរយថ្នាក់រៀនបង្កើត និងដំណើរការគណៈកម្មការគ្រប់គ្រងថ្នាក់រៀន (គគថ)',
              targetBenchmark: '១០០%',
              currentResult: '១០០% (ថ្នាក់ទី១-៦)',
              status: 'សម្រេចបានល្អ',
              score: 100,
              evidence: 'បញ្ជីឈ្មោះ & រចនាសម្ព័ន្ធ គគថ ថ្នាក់ទី១-៦',
              mappedReport: 'របាយការណ៍ គគថ (SSC)'
            }
          ]
        },
        {
          code: '២. ការចូលរួមរបស់សហគមន៍',
          title: 'ដៃគូវិនិយោគសង្គម & ការត្រឡប់មកសិក្សាវិញរបស់សិស្ស',
          weight: '៣០%',
          subIndicators: [
            {
              code: '២.១',
              title: 'សាលារៀនមានកិច្ចសហប្រតិបត្តិការភាពជាដៃគូវិនិយោគជាមួយ វិស័យសាធារណៈ ឯកជន និងដៃគូអភិវឌ្ឍ',
              targetBenchmark: 'មានដៃគូ',
              currentResult: 'មាន WFP & ដៃគូអភិវឌ្ឍ',
              status: 'សម្រេចបានល្អ',
              score: 100,
              evidence: 'កិច្ចព្រមព្រៀងដៃគូ & លិខិតសហប្រតិបត្តិការ',
              mappedReport: 'របាយការណ៍ដៃគូអភិវឌ្ឍ'
            },
            {
              code: '២.២',
              title: 'ការសិក្សាបានត្រឡប់មករៀនវិញទៀងទាត់ ក្រោមការគាំទ្រពីសហគមន៍',
              targetBenchmark: '១០០%',
              currentResult: '៩៥.០%',
              status: 'សម្រេចបានល្អ',
              score: 95,
              evidence: 'បញ្ជីសិស្សអាក់ខានដែលបានត្រឡប់ចូលរៀន',
              mappedReport: 'របាយការណ៍ជំរឿន'
            }
          ]
        },
        {
          code: '៣. ការគាំទ្ររបស់សហគមន៍',
          title: 'មូលនិធិសហគមន៍ & វិភាគទានសប្បុរសជន',
          weight: '៣០%',
          subIndicators: [
            {
              code: '៣.១',
              title: 'បរិមាណចំណូលមូលនិធិបង់ចូលសាលារៀន',
              targetBenchmark: 'តម្លាភាព ១០០%',
              currentResult: 'គ្រប់គ្រងតម្លាភាព',
              status: 'សម្រេចបានល្អ',
              score: 98,
              evidence: 'សៀវភៅមូលនិធិ & ផ្ទាំងតម្លាភាពសហគមន៍',
              mappedReport: 'របាយការណ៍ហិរញ្ញវត្ថុ'
            }
          ]
        }
      ]
    },
    {
      id: 'std4',
      code: 'ស្ដង់ដារទី៤',
      title: 'ដំណើរការប្រតិបត្តិ និងរដ្ឋបាលសាលារៀន (Operations & Administration)',
      keyIndicators: [
        {
          code: '១. ការគ្រប់គ្រងរដ្ឋបាលទូទៅ',
          title: 'បណ្ណសារទីចាត់ការ, App គ្រប់គ្រងទិន្នន័យ & បុគ្គលិក',
          weight: '១៥%',
          subIndicators: [
            {
              code: '១.១',
              title: 'ការរៀបចំទីចាត់ការទុកដាក់ឯកសារមានសណ្ដាប់ធ្នាប់ និងរៀបរយ',
              targetBenchmark: 'រៀបរយ ១០០%',
              currentResult: 'ទុកដាក់រៀបរយ',
              status: 'សម្រេចបានល្អ',
              score: 100,
              evidence: 'បណ្ណសារទីចាត់ការ & សៀវភៅលិខិតចេញ-ចូល',
              mappedReport: 'របាយការណ៍រដ្ឋបាល'
            },
            {
              code: '១.២',
              title: 'សាលារៀនប្រើប្រាស់ App សម្រាប់ប្រព័ន្ធគ្រប់គ្រងទិន្នន័យសាលារៀន',
              targetBenchmark: 'ប្រើប្រាស់ ១០០%',
              currentResult: 'ប្រើ App គ្រប់គ្រងសាលា',
              status: 'សម្រេចបានល្អ',
              score: 100,
              evidence: 'ប្រព័ន្ធគ្រប់គ្រងទិន្នន័យសាលារៀនឌីជីថល',
              mappedReport: 'ទិន្នន័យមេ (Master Reports)'
            },
            {
              code: '១.៣',
              title: 'ភាគរយគ្រូលើសខ្វះ បានថយចុះ',
              targetBenchmark: '០% គ្រូខ្វះ',
              currentResult: 'គ្រប់គ្រាន់ (១៣ នាក់)',
              status: 'សម្រេចបានល្អ',
              score: 100,
              evidence: 'បញ្ជីក្របខ័ណ្ឌ និងកិច្ចសន្យាគ្រូបង្រៀន',
              mappedReport: 'បញ្ជីឈ្មោះគ្រូបង្រៀន'
            }
          ]
        },
        {
          code: '២. ការរៀបចំផែនការអភិវឌ្ឍសាលារៀន',
          title: 'ផែនការ SDP ៥ឆ្នាំ, ផែនការថវិកា ៣ឆ្នាំ & AOP',
          weight: '១៥%',
          subIndicators: [
            {
              code: '២.១',
              title: 'ផែនការយុទ្ធសាស្ត្រអភិវឌ្ឍន៍សាលារៀន ៥ឆ្នាំ ផែនការយុទ្ធសាស្ត្រថវិកា៣ឆ្នាំ ផែនការថវិកាប្រចាំឆ្នាំ និងផែនការប្រតិបត្តិប្រចាំឆ្នាំ',
              targetBenchmark: 'មានគ្រប់ផែនការ',
              currentResult: 'មាន SDP, PB & AOP',
              status: 'សម្រេចបានល្អ',
              score: 98,
              evidence: 'សៀវភៅផែនការ SDP ៥ឆ្នាំ & AOP',
              mappedReport: 'ផែនការអភិវឌ្ឍន៍សាលា'
            }
          ]
        },
        {
          code: '៣. ការវាយតម្លៃការបំពេញការងាររបស់បុគ្គលិក',
          title: 'កិច្ចព្រមព្រៀងលទ្ធផលការងារគ្រូ & គណៈគ្រប់គ្រង',
          weight: '១៥%',
          subIndicators: [
            {
              code: '៣.១',
              title: 'ភាគរយគ្រូបង្រៀន និងបុគ្គលិកអប់រំ បានចុះកិច្ចព្រមព្រៀងលទ្ធផលការងារប្រចាំឆ្នាំ',
              targetBenchmark: '១០០%',
              currentResult: '១០០%',
              status: 'សម្រេចបានល្អ',
              score: 100,
              evidence: 'កិច្ចព្រមព្រៀងលទ្ធផលការងារគ្រូ ១៣ នាក់',
              mappedReport: 'របាយការណ៍បុគ្គលិក'
            },
            {
              code: '៣.២',
              title: 'ចំនួននាយកសាលានិងនាយករងបានចុះកិច្ចព្រមព្រៀងលទ្ធផលការងារប្រចាំឆ្នាំ',
              targetBenchmark: '២ រូប',
              currentResult: 'នាយក ឈិត សារ៉ាំ & នាយករង ប្រុញ វឿន',
              status: 'សម្រេចបានល្អ',
              score: 100,
              evidence: 'កិច្ចព្រមព្រៀងលទ្ធផលការងារគណៈគ្រប់គ្រង',
              mappedReport: 'របាយការណ៍បុគ្គលិក'
            }
          ]
        },
        {
          code: '៤. រង្វាយតម្លៃលទ្ធផលសិក្សា',
          title: 'តេស្តស្ដង់ដារដើមឆ្នាំ, ប្រចាំខែ, ឆមាស & ថ្នាក់ទី៣/ទី៦',
          weight: '១៥%',
          subIndicators: [
            {
              code: '៤.១',
              title: 'ការរៀបចំធ្វើតេស្តស្តង់ដារដើមឆ្នាំ ឬ ចុងឆ្នាំ ប្រចាំខែ ឆមាស និងតេស្ដស្ដង់ដារថ្នាក់ទី៣ និងទី៦ បានរៀបចំទៀងទាត់',
              targetBenchmark: 'ទៀងទាត់ ១០០%',
              currentResult: 'រៀបចំទៀងទាត់',
              status: 'សម្រេចបានល្អ',
              score: 96,
              evidence: 'សំណុំតេស្តស្ដង់ដារ & លទ្ធផលប្រឡង',
              mappedReport: 'របាយការណ៍សៀវភៅពិន្ទុ'
            }
          ]
        },
        {
          code: '៥. ការលើកកម្ពស់សុខភាព និងអាហារូបត្ថម្ភ',
          title: 'សុខភាព, ទឹកស្អាត, អនាម័យ, សុវត្ថិភាព, បរិស្ថាន & កីឡា',
          weight: '២៥%',
          subIndicators: [
            {
              code: '៥.១',
              title: 'ការលើកកម្ពស់សេវាថែទាំសុខភាពបឋម',
              targetBenchmark: 'មានសេវា',
              currentResult: 'មានប្រអប់ថ្នាំសង្គ្រោះ',
              status: 'សម្រេចបានល្អ',
              score: 100,
              evidence: 'ប្រអប់ថ្នាំសង្គ្រោះបឋម & សៀវភៅសុខភាព',
              mappedReport: 'របាយការណ៍សុខភាព'
            },
            {
              code: '៥.២',
              title: 'ការពិនិត្យសុខភាពសិស្ស',
              targetBenchmark: '≥ ២ ដង/ឆ្នាំ',
              currentResult: '២ ដង/ឆ្នាំ',
              status: 'សម្រេចបានល្អ',
              score: 100,
              evidence: 'របាយការណ៍ពិនិត្យសុខភាពសិស្ស',
              mappedReport: 'របាយការណ៍សុខភាព'
            },
            {
              code: '៥.៣',
              title: 'ការលើកកម្ពស់ទឹកស្អាតនិងអនាម័យ',
              targetBenchmark: 'ទឹកស្អាត ១០០%',
              currentResult: 'អាងចម្រោះទឹក & បន្ទប់ទឹក',
              status: 'សម្រេចបានល្អ',
              score: 95,
              evidence: 'លទ្ធផលតេស្តគុណភាពទឹកពិសា',
              mappedReport: 'របាយការណ៍អនាម័យ'
            },
            {
              code: '៥.៤',
              title: 'ការលើកកម្ពស់សុវត្ថិភាពចំណីអាហារ និងអាហារប្រកបដោយសុខភាព',
              targetBenchmark: 'គ្មានអាហារហាមឃាត់',
              currentResult: 'ត្រួតពិនិត្យអាហារ WFP',
              status: 'សម្រេចបានល្អ',
              score: 100,
              evidence: 'កំណត់ហេតុពិនិត្យអនាម័យអាហារ WFP',
              mappedReport: 'របាយការណ៍អាហារ WFP'
            },
            {
              code: '៥.៥',
              title: 'ការអនុវត្តមុខវិជ្ជាអប់រំសុខភាព',
              targetBenchmark: '១០០%',
              currentResult: 'បង្រៀនទៀងទាត់',
              status: 'សម្រេចបានល្អ',
              score: 100,
              evidence: 'កាលវិភាគ & កិច្ចតែងការអប់រំសុខភាព',
              mappedReport: 'កាលវិភាគស្ដង់ដារ'
            },
            {
              code: '៥.៦',
              title: 'ការលើកកម្ពស់បរិស្ថាន ស្អាត បៃតង សុវត្ថិភាព អនាម័យ និងមេត្រីភាព',
              targetBenchmark: 'បៃតង-អនាម័យ',
              currentResult: 'ដាំដើមឈើ ៥០ ដើម',
              status: 'កំពុងកែលម្អ',
              score: 80,
              evidence: 'រូបថតសួនច្បារបៃតង & បរិស្ថានសាលា',
              mappedReport: 'របាយការណ៍បរិស្ថាន'
            },
            {
              code: '៥.៧',
              title: 'ការរក្សាសន្តិសុខ សណ្តាប់ធ្នាប់ ការការពារកុមារ ការបង្ការគ្រោះមហន្តរាយនានា',
              targetBenchmark: 'សុវត្ថិភាព ១០០%',
              currentResult: 'មានរបង & ផែនការសុវត្ថិភាព',
              status: 'សម្រេចបានល្អ',
              score: 98,
              evidence: 'ផែនការការពារកុមារ & សុវត្ថិភាពសាលា',
              mappedReport: 'របាយការណ៍សុវត្ថិភាព'
            },
            {
              code: '៥.៨',
              title: 'ការអនុវត្តសកម្មភាពអប់រំកាយ និងកីឡា',
              targetBenchmark: '២ ម៉ោង/សប្ដាហ៍',
              currentResult: '២ ម៉ោង/សប្ដាហ៍',
              status: 'សម្រេចបានល្អ',
              score: 100,
              evidence: 'កាលវិភាគ & សកម្មភាពអប់រំកាយ-កីឡា',
              mappedReport: 'របាយការណ៍កីឡា'
            }
          ]
        },
        {
          code: '៦. ការអភិវឌ្ឍហេដ្ឋារចនាសម្ព័ន្ធ',
          title: 'អគ្គិសនី, Internet, ឧបករណ៍ទំនើប (Smart TV/LCD), បណ្ណាល័យ, បន្ទប់ ICT & ទីលាន',
          weight: '១៥%',
          subIndicators: [
            {
              code: '៦.១',
              title: 'សាលារៀនមានបណ្ដាញអគ្គិសនី បំពាក់អ៊ីនធើណិត',
              targetBenchmark: 'មានអគ្គិសនី & Internet',
              currentResult: 'មានអគ្គិសនី & Wi-Fi',
              status: 'សម្រេចបានល្អ',
              score: 100,
              evidence: 'វិក្កយបត្រអគ្គិសនី & សេវាអ៊ីនធើណិត',
              mappedReport: 'របាយការណ៍ហេដ្ឋារចនាសម្ព័ន្ធ'
            },
            {
              code: '៦.២',
              title: 'ភាគរយបន្ទប់រៀនបំពាក់ឧបករណ៍សិក្សាទំនើប (LCD, Smart TV, Smart Board...)',
              targetBenchmark: '≥ ៥០.០%',
              currentResult: '៤០.០% (កំពុងបំពាក់បន្ថែម)',
              status: 'កំពុងកែលម្អ',
              score: 80,
              evidence: 'បញ្ជីសារពើភ័ណ្ឌបរិក្ខារ ICT ថ្នាក់រៀន',
              mappedReport: 'របាយការណ៍ ICT'
            },
            {
              code: '៦.៣',
              title: 'សាលារៀនមានបណ្ណាល័យ',
              targetBenchmark: 'មានបណ្ណាល័យ',
              currentResult: 'បណ្ណាល័យសកម្ម (អ្នកស្រី សឹង រតនា)',
              status: 'សម្រេចបានល្អ',
              score: 100,
              evidence: 'សៀវភៅតាមដានដំណើរការបណ្ណាល័យ',
              mappedReport: 'របាយការណ៍បណ្ណាល័យ'
            },
            {
              code: '៦.៤',
              title: 'សាលារៀនមានបន្ទប់កុំព្យូទ័រសម្រាប់សិស្សរៀន',
              targetBenchmark: 'មានបន្ទប់ ICT',
              currentResult: 'មានកុំព្យូទ័រសិស្ស',
              status: 'សម្រេចបានល្អ',
              score: 95,
              evidence: 'បញ្ជីកុំព្យូទ័រ & កាលវិភាគរៀន ICT',
              mappedReport: 'របាយការណ៍បន្ទប់កុំព្យូទ័រ'
            },
            {
              code: '៦.៥',
              title: 'សាលារៀនមានទីលានកីឡារួមមាន តារាងបាល់ទះ បាល់ទាត់ បាល់បោះ វាយសី...',
              targetBenchmark: 'មានទីលានកីឡា',
              currentResult: 'មានតារាងបាល់ទះ/បាល់ទាត់',
              status: 'សម្រេចបានល្អ',
              score: 95,
              evidence: 'រូបថតទីលានកីឡាសាលារៀន',
              mappedReport: 'របាយការណ៍ទីលានកីឡា'
            }
          ]
        }
      ]
    },
    {
      id: 'std5',
      code: 'ស្ដង់ដារទី៥',
      title: 'គណនេយ្យភាព (Accountability & National Support)',
      keyIndicators: [
        {
          code: '១. វេទិកាសាធារណៈ',
          title: 'អង្គប្រជុំមាតាបិតាសិស្ស និងវេទិកាសាធារណៈ',
          weight: '៣០%',
          subIndicators: [
            {
              code: '១.១',
              title: 'ការជួបប្រជុំមាតាបិតាសិស្ស',
              targetBenchmark: '≥ ៣ ដង/ឆ្នាំ',
              currentResult: '៣ ដង/ឆ្នាំ',
              status: 'សម្រេចបានល្អ',
              score: 100,
              evidence: 'កំណត់ហេតុ & បញ្ជីវត្តមានប្រជុំមាតាបិតា',
              mappedReport: 'ផែនការប្រជុំមាតាបិតា'
            }
          ]
        },
        {
          code: '២. ការផ្សព្វផ្សាយព័ត៌មានជាសាធារណៈ',
          title: 'ការបិទផ្សាយលទ្ធផលតេស្តស្ដង់ដារ & ព័ត៌មានតម្លាភាព',
          weight: '៣៥%',
          subIndicators: [
            {
              code: '២.១',
              title: 'លទ្ធផលតេស្តវាយតម្លៃស្តង់ដារនិងព័ត៌មាននានាត្រូវបាន អនុម័តដោយ គ.គ.ស. និង/ឬ បិទផ្សាយជាសាធារណៈ',
              targetBenchmark: 'បិទផ្សាយតម្លាភាព',
              currentResult: 'បិទផ្សាយលើផ្ទាំងតម្លាភាព',
              status: 'សម្រេចបានល្អ',
              score: 98,
              evidence: 'រូបថតផ្ទាំងតម្លាភាព & កំណត់ហេតុ គគស',
              mappedReport: 'របាយការណ៍តម្លាភាព'
            }
          ]
        },
        {
          code: '៣. ការទទួលបានការគាំទ្រពីថ្នាក់ជាតិ',
          title: 'ការហ្វឹកហាត់នាយក/គ្រូ, កញ្ចប់អំណាន/គណិត & ទស្សនកិច្ចសិក្សា',
          weight: '៣៥%',
          subIndicators: [
            {
              code: '៣.១',
              title: 'ចំនួនដងនាយកសាលានិងនាយករង បានទទួលការហ្វឹកហាត់អនុវត្តស្តង់ដារសាលារៀនគំរូ ពីនាយកសាលាផ្សេង ឬ មកពីថ្នាក់លើ',
              targetBenchmark: '≥ ២ ដង/ឆ្នាំ',
              currentResult: '២ ដង/ឆ្នាំ',
              status: 'សម្រេចបានល្អ',
              score: 100,
              evidence: 'វិញ្ញាបនបត្រហ្វឹកហាត់ថ្នាក់ដឹកនាំ',
              mappedReport: 'របាយការណ៍ហ្វឹកហាត់'
            },
            {
              code: '៣.២',
              title: 'ភាគរយគ្រូបង្រៀនបានទទួលការហ្វឹកហាត់ការអនុវត្តកញ្ចប់សម្ភារៈអំណាន និងគណិតវិទ្យាថ្នាក់ដំបូង និង/ឬវិធីសាស្ត្របង្រៀន',
              targetBenchmark: '១០០%',
              currentResult: '៩២.៣%',
              status: 'សម្រេចបានល្អ',
              score: 92,
              evidence: 'របាយការណ៍ហ្វឹកហាត់គ្រូបង្រៀន',
              mappedReport: 'របាយការណ៍ហ្វឹកហាត់'
            },
            {
              code: '៣.៣',
              title: 'ភាគរយគ្រូបង្រៀន បំពេញទស្សនកិច្ចសិក្សា ទៅសាលាផ្សេងក្នុងមួយឆ្នាំ',
              targetBenchmark: '≥ ៥០.០%',
              currentResult: '៥៣.៨%',
              status: 'សម្រេចបានល្អ',
              score: 100,
              evidence: 'របាយការណ៍ទស្សនកិច្ចសិក្សាគ្រូបង្រៀន',
              mappedReport: 'របាយការណ៍ទស្សនកិច្ច'
            }
          ]
        }
      ]
    }
  ]);

  const toggleSubIndicatorStatus = (subCode: string) => {
    setKeySubIndicatorsData(prev =>
      prev.map(std => ({
        ...std,
        keyIndicators: std.keyIndicators.map(key => ({
          ...key,
          subIndicators: key.subIndicators.map(sub => {
            if (sub.code === subCode) {
              const nextStatus = sub.status === 'សម្រេចបានល្អ' ? 'កំពុងកែលម្អ' : 'សម្រេចបានល្អ';
              const nextScore = nextStatus === 'សម្រេចបានល្អ' ? 100 : 75;
              return { ...sub, status: nextStatus, score: nextScore };
            }
            return sub;
          })
        }))
      }))
    );
  };

  const completedGapsCount = gapItems.filter(g => g.completed).length;

  const toggleGapItem = (id: string) => {
    setGapItems(prev =>
      prev.map(item => (item.id === id ? { ...item, completed: !item.completed } : item))
    );
  };

  const allSubIndicators = keySubIndicatorsData.flatMap(s => s.keyIndicators.flatMap(k => k.subIndicators));
  const totalKeyIndicatorsCount = keySubIndicatorsData.reduce((acc, curr) => acc + curr.keyIndicators.length, 0);
  const totalSubIndicatorsCount = allSubIndicators.length;
  const currentComplianceScore = Math.round(
    allSubIndicators.reduce((acc, curr) => acc + (curr.score || 0), 0) / (allSubIndicators.length || 1)
  );

  // Form State
  const [title, setTitle] = useState('');
  const [activityType, setActivityType] = useState<ActivityType>('ការប្រកួតប្រជែង');
  const [standardCategory, setStandardCategory] = useState<SchoolActivityRecord['standardCategory']>(
    'ស្ដង់ដារទី១ (ការសិក្សាសិស្ស)'
  );
  const [date, setDate] = useState('2026-09-24');
  const [location, setLocation] = useState('សាលាបឋមសិក្សា អន្លង់តាម៉ី');
  const [leadPerson, setLeadPerson] = useState('អ្នកគ្រូ គឹម ស្រីពៅ');
  const [participantsCount, setParticipantsCount] = useState(30);
  const [description, setDescription] = useState('');
  const [outcomeEvidence, setOutcomeEvidence] = useState('');

  const filteredActivities = schoolActivities.filter(item => {
    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.leadPerson.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase());
    const matchesType = selectedType === 'all' || item.activityType === selectedType;
    return matchesSearch && matchesType;
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !leadPerson) return;

    addSchoolActivity({
      title,
      activityType,
      standardCategory,
      date,
      location,
      leadPerson,
      participantsCount,
      description,
      outcomeEvidence
    });

    setIsAddModalOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setOutcomeEvidence('');
    setParticipantsCount(30);
  };

  // 5 Model School Standards Detailed Action Criteria & Status
  const standardsData = [
    {
      id: 'std1',
      code: 'ស្ដង់ដារទី១',
      title: 'លទ្ធផលសិក្សារបស់សិស្ស (Student Learning Outcomes)',
      status: 'សម្រេចបានល្អប្រសើរ (៩៨%)',
      score: 98,
      badgeColor: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300 border-emerald-300',
      description: 'សិស្សានុសិស្សទទួលបានលទ្ធផលសិក្សាខ្ពស់ មានជំនាញអាន គណិតវិទ្យាដំបូង និងអត្រាឡើងថ្នាក់ខ្ពស់',
      criteriaList: [
        { task: 'អត្រាសិស្សឡើងថ្នាក់ ឬប្រឡងជាប់ ៩៥%+ (សាលាសម្រេចបាន ៩៨.៥%)', completed: true },
        { task: 'អត្រាបោះបង់ការសិក្សា ០% ទៅ ២% (សាលាសម្រេចបាន ០.៨% ក្នុងភូមិចំណុះ)', completed: true },
        { task: 'តេស្តស្ទាត់ជំនាញអាន (EGR) និងគណិតវិទ្យាដំបូង (EGM) ជាប់ ៩០%+', completed: true },
        { task: 'ការប្រកួតប្រជែងសិស្សពូកែ និងការផ្តល់បណ្ណសរសើរជ័យលាភីប្រចាំខែ/ឆមាស', completed: true }
      ],
      autoMappedReports: [
        { name: 'សៀវភៅពិន្ទុ & ចំណាត់ថ្នាក់សិស្ស (Gradebook)', count: students.length + ' សិស្ស' },
        { name: 'បណ្ណសរសើរ & លិខិតសរសើរជ័យលាភី (Certificates)', count: 'គ្រប់កម្រិតថ្នាក់' },
        { name: 'របាយការណ៍លទ្ធផលប្រឡងប្រចាំខែ & ឆមាស', count: '១៣ មុខវិជ្ជា' }
      ]
    },
    {
      id: 'std2',
      code: 'ស្ដង់ដារទី២',
      title: 'ការបង្រៀន និងរៀន (Teaching and Learning)',
      status: 'សម្រេចបានល្អប្រសើរ (៩៦%)',
      score: 96,
      badgeColor: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 border-blue-300',
      description: 'លោកគ្រូអ្នកគ្រូមានវិធីសាស្ត្របង្រៀនស្ដង់ដារ ប្រើប្រាស់កិច្ចតែងការ MoEYS និងសម្ភារឧបទេសច្នៃប្រឌិត',
      criteriaList: [
        { task: 'គ្រូបង្រៀនមានកិច្ចតែងការបង្រៀនស្ដង់ដារ MoEYS ១០០% (ថ្នាក់ទី១ ដល់ ទី៦)', completed: true },
        { task: 'អនុវត្តកាលវិភាគបង្រៀនស្ដង់ដារ ៣០ ម៉ោង/សប្ដាហ៍ ដោយមានសម្ភារឧបទេស', completed: true },
        { task: 'ការប្រជុំកម្រងបច្ចេកទេសគ្រូបង្រៀន (PLC) យ៉ាងតិច ២ដង/ខែ', completed: true },
        { task: 'ការប្រើប្រាស់ឧបករណ៍វាយតម្លៃមត្តេយ្យសិក្សា ៥ វិស័យអភិវឌ្ឍន៍កុមារ', completed: true }
      ],
      autoMappedReports: [
        { name: 'បញ្ជីឈ្មោះ & ប្រភេទគ្រូបង្រៀន (Teachers Roster)', count: teachers.length + ' នាក់ (ក្របខ័ណ្ឌ/កិច្ចសន្យា/កិច្ចព្រមព្រៀង)' },
        { name: 'កាលវិភាគបង្រៀនស្ដង់ដារ MoEYS (Timetables)', count: 'គ្រប់កម្រិតថ្នាក់' },
        { name: 'ឧបករណ៍វាយតម្លៃមត្តេយ្យសិក្សា (Preschool Rubrics)', count: preschoolAssessments.length + ' ឯកសារ' },
        { name: 'កំណត់ហេតុប្រជុំកម្រងបច្ចេកទេសគ្រូ', count: 'ប្រចាំខែ' }
      ]
    },
    {
      id: 'std3',
      code: 'ស្ដង់ដារទី៣',
      title: 'ការចូលរួមរបស់សហគមន៍ (Community Participation & SSC)',
      status: 'សម្រេចបានល្អ (៩៥%)',
      score: 95,
      badgeColor: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300 border-amber-300',
      description: 'សហគមន៍ មាតាបិតា អាជ្ញាធរដែនដី និងព្រះសង្ឃ ចូលរួមទ្រទ្រង់អភិវឌ្ឍន៍សាលារៀនយ៉ាងសកម្ម',
      criteriaList: [
        { task: 'គណៈកម្មាធិការទ្រទ្រង់សាលារៀន (គគថ) ដំណើរការសកម្ម និងប្រជុំ ៣ដង/ឆ្នាំ', completed: true },
        { task: 'អនុវត្តផែនការប្រជុំមាតាបិតាសិស្ស ៣លើក/ឆ្នាំ (ដើមឆ្នាំ, ឆមាសទី១, ដំណាច់ឆ្នាំ)', completed: true },
        { task: 'ការកៀងគរវិភាគទានសហគមន៍ ថវិកាសប្បុរសជន និងវត្តអារាម សម្រាប់អភិវឌ្ឍសាលា', completed: true },
        { task: 'ការផ្សព្វផ្សាយរបាយការណ៍ហិរញ្ញវត្ថុតម្លាភាពជូនសហគមន៍', completed: true }
      ],
      autoMappedReports: [
        { name: 'បញ្ជីឈ្មោះ & រចនាសម្ព័ន្ធ គណៈកម្មាធិការ គគថ (SSC)', count: committees.filter(m => m.committeeType === 'គគថ').length + ' សមាជិក' },
        { name: 'ផែនការប្រជុំមាតាបិតាសិស្ស ១ ឆ្នាំសិក្សា (Parent Meeting Plan)', count: parentMeetingPlans.length + ' លើក' },
        { name: 'របាយការណ៍វិភាគទានសហគមន៍ & ជំនួយសប្បុរសជន', count: 'តម្លាភាព' }
      ]
    },
    {
      id: 'std4',
      code: 'ស្ដង់ដារទី៤',
      title: 'ប្រតិបត្តិការ និងការគ្រប់គ្រងសាលារៀន (School Operations & SMC)',
      status: 'សម្រេចបានល្អប្រសើរ (៩៧%)',
      score: 97,
      badgeColor: 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300 border-purple-300',
      description: 'ការគ្រប់គ្រងរដ្ឋបាល ហិរញ្ញវត្ថុ ថវិការដ្ឋ PB បញ្ជីវត្តមាន និងជំរឿនកុមារភូមិចំណុះមានប្រសិទ្ធភាព',
      criteriaList: [
        { task: 'មាន ផែនការអភិវឌ្ឍន៍សាលារៀន (SDP) និងថវិកាកម្មវិធី (PB) ត្រឹមត្រូវ', completed: true },
        { task: 'ជំរឿនកុមារគ្រប់អាយុក្នុងភូមិចំណុះ (ភូមិចំការស្វាយ & ភូមិអន្លង់តាម៉ី) ចូលរៀន ១០០%', completed: true },
        { task: 'ប្រព័ន្ធគ្រប់គ្រងវត្តមានសិស្ស-គ្រូ និងកត់ត្រាអវត្តមានទៀងទាត់', completed: true },
        { task: 'គ្រប់គ្រងសារពើភ័ណ្ឌ គ្រឿងសង្ហារិម និងឧបករណ៍បច្ចេកវិទ្យាសាលារៀន', completed: true }
      ],
      autoMappedReports: [
        { name: 'បញ្ជីឈ្មោះ គណៈកម្មាធិការគ្រប់គ្រងសាលារៀន គគស (SMC)', count: committees.filter(m => m.committeeType === 'គគស').length + ' សមាជិក' },
        { name: 'ជំរឿនកុមារគ្រប់អាយុក្នុងភូមិចំណុះ (Catchment Census)', count: censusChildren.length + ' កុមារ (ភូមិចំការស្វាយ/អន្លង់តាម៉ី)' },
        { name: 'បញ្ជីវត្តមានសិស្សប្រចាំថ្ងៃ (Attendance Register)', count: 'គ្រប់ថ្នាក់' },
        { name: 'បញ្ជីគ្រប់គ្រងសម្ភារៈសារពើភ័ណ្ឌ (Asset Inventory)', count: schoolAssets.length + ' មុខសម្ភារៈ' },
        { name: 'សៀវភៅកត់ត្រាចំណូល-ចំណាយ ថវិការដ្ឋ (PB Ledger)', count: financialTransactions.length + ' ប្រតិបត្តិការ' }
      ]
    },
    {
      id: 'std5',
      code: 'ស្ដង់ដារទី៥',
      title: 'គណនេយ្យភាព និងបរិស្ថានសាលារៀន (Accountability & Environment)',
      status: 'សម្រេចបានល្អ (៩៤%)',
      score: 94,
      badgeColor: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/40 dark:text-cyan-300 border-cyan-300',
      description: 'បរិស្ថានសាលារៀនបៃតង ស្អាត សុវត្ថិភាព អាហារូបត្ថម្ភ WFP និងអាហារូបករណ៍សិស្សក្រីក្រ (ក្រ១/ក្រ២)',
      criteriaList: [
        { task: 'បរិស្ថានសាលារៀនបៃតង មានដើមឈើ សួនច្បារ បន្ទប់ទឹកអនាម័យ និងទឹកស្អាត', completed: true },
        { task: 'ផ្តល់អាហារពេលព្រឹកក្ដៅៗ WFP/MoEYS ដល់សិស្សរៀងរាល់ថ្ងៃសិក្សា', completed: true },
        { task: 'ផ្តល់អាហារូបករណ៍រដ្ឋ និងកញ្ចប់ជំនួយដល់សិស្សបណ្ណសមធម៌ (ក្រ១ / ក្រ២)', completed: true },
        { task: 'បញ្ជីប្រគល់-ទទួលសៀវភៅសិក្សាគោល និងសម្ភារឧបទេសដល់សិស្ស', completed: true }
      ],
      autoMappedReports: [
        { name: 'របាយការណ៍ជំនួយសិស្ស & អាហារូបត្ថម្ភ WFP (Student Support)', count: studentSupports.length + ' សិស្ស' },
        { name: 'បញ្ជីប្រគល់-ទទួលសម្ភារៈ & សៀវភៅសិក្សា (Material Handovers)', count: 'គ្រប់កម្រិតថ្នាក់' },
        { name: 'របាយការណ៍បរិស្ថានបៃតង & អនាម័យសាលារៀន', count: 'សួនបៃតង' }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700/60 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300">
              ក្រសួងអប់រំ យុវជន និងកីឡា
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">MoEYS 5 Model School Standards Framework</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
            សកម្មភាពសាលា & ប្រព័ន្ធស្ដង់ដារសាលារៀនគំរូ ៥
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">
            ការគ្រប់គ្រងលក្ខខណ្ឌវិនិច្ឆ័យដើម្បីជាប់ជាសាលាស្ដង់ដារគំរូ និងការភ្ជាប់របាយការណ៍ទាំងអស់ចូលតាមស្ដង់ដារនីមួយៗ
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3.5 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs font-extrabold flex items-center gap-1.5 shadow-sm">
            <BadgeCheck className="w-4 h-4 text-emerald-500" />
            <span>ពិន្ទុស្ដង់ដារសរុប ({currentComplianceScore}%)</span>
          </span>
          <button
            onClick={() => {
              resetForm();
              setIsAddModalOpen(true);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-xl transition font-medium text-sm shadow-md shadow-purple-500/20"
          >
            <Plus size={18} />
            <span>បន្ថែមសកម្មភាព / ភស្ដុតាង</span>
          </button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-700 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab('checklist')}
          className={`px-4 py-3 font-semibold text-sm rounded-t-xl transition border-b-2 flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'checklist'
              ? 'border-purple-600 text-purple-600 dark:text-purple-400 bg-white dark:bg-slate-800'
              : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
          }`}
        >
          <CheckSquare size={18} />
          <span>១. អ្វីដែលសាលាត្រូវធ្វើដើម្បីជាប់ស្ដង់ដារ</span>
        </button>

        <button
          onClick={() => setActiveTab('indicators')}
          className={`px-4 py-3 font-semibold text-sm rounded-t-xl transition border-b-2 flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'indicators'
              ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400 bg-white dark:bg-slate-800'
              : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
          }`}
        >
          <BarChart3 size={18} />
          <span>២. ក្របខ័ណ្ឌសូចនាករគន្លឹះ & សូចនាកររង ({totalKeyIndicatorsCount} គន្លឹះ • {totalSubIndicatorsCount} រង)</span>
        </button>

        <button
          onClick={() => setActiveTab('gaps')}
          className={`px-4 py-3 font-semibold text-sm rounded-t-xl transition border-b-2 flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'gaps'
              ? 'border-amber-600 text-amber-600 dark:text-amber-400 bg-white dark:bg-slate-800'
              : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
          }`}
        >
          <AlertCircle size={18} />
          <span>
            ៣. ចំណុចខ្វះខាត & ផែនការសកម្មភាព ({gapItems.length - completedGapsCount} ខ្វះ)
          </span>
        </button>

        <button
          onClick={() => setActiveTab('mapping')}
          className={`px-4 py-3 font-semibold text-sm rounded-t-xl transition border-b-2 flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'mapping'
              ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 bg-white dark:bg-slate-800'
              : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
          }`}
        >
          <Layers size={18} />
          <span>៤. ការភ្ជាប់របាយការណ៍ស្វ័យប្រវត្តិ</span>
        </button>

        <button
          onClick={() => setActiveTab('activities')}
          className={`px-4 py-3 font-semibold text-sm rounded-t-xl transition border-b-2 flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'activities'
              ? 'border-blue-600 text-blue-600 dark:text-blue-400 bg-white dark:bg-slate-800'
              : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
          }`}
        >
          <Trophy size={18} />
          <span>៥. បញ្ជីសកម្មភាព & ភស្ដុតាងសាលា ({schoolActivities.length})</span>
        </button>
      </div>

      {/* TAB 1: REQUIREMENTS CHECKLIST & ROADMAP */}
      {activeTab === 'checklist' && (
        <div className="space-y-6">
          {/* Banner Summary */}
          <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 text-white p-6 rounded-2xl shadow-md border border-purple-800/40">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <ShieldCheck className="text-amber-400 shrink-0 mt-1" size={36} />
                <div>
                  <h2 className="text-xl font-bold">លក្ខខណ្ឌវិនិច្ឆ័យ ៥ ស្ដង់ដារសាលារៀនគំរូ ក្រសួងអប់រំ យុវជន និងកីឡា</h2>
                  <p className="text-xs text-purple-200 mt-1">
                    សាលាបឋមសិក្សា អន្លង់តាម៉ី (ភូមិអន្លង់តាម៉ី ឃុំឈើទាល ស្រុកបាណន់ ខេត្តបាត់ដំបង)
                  </p>
                </div>
              </div>
              <div className="px-4 py-2 bg-white/10 backdrop-blur rounded-xl border border-white/20 text-right shrink-0">
                <span className="text-[11px] text-purple-200 block">កម្រិតវាយតម្លៃបច្ចុប្បន្ន</span>
                <span className="text-lg font-black text-amber-300">{currentComplianceScore}% / ១០០%</span>
              </div>
            </div>
          </div>

          {/* 5 Standards Checklist Cards */}
          <div className="space-y-6">
            {standardsData.map(std => {
              const currentGap = gapItems.find(g => g.stdId === std.id);

              return (
                <div
                  key={std.id}
                  className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700/60 shadow-sm space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-700/60 pb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-0.5 text-xs font-bold rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300">
                          {std.code}
                        </span>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">{std.title}</h3>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{std.description}</p>
                    </div>

                    <span className={`px-3 py-1 text-xs font-extrabold border rounded-full shrink-0 ${std.badgeColor}`}>
                      {std.status}
                    </span>
                  </div>

                  {/* Requirements Checklist */}
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-2 uppercase tracking-wider">
                      អ្វីដែលសាលាត្រូវធ្វើ និងបានសម្រេច៖
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {std.criteriaList.map((item, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700/60 flex items-start gap-2.5 text-xs"
                        >
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span className="font-medium text-slate-800 dark:text-slate-200">{item.task}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Highlight Gap & Action Plan */}
                  {currentGap && (
                    <div className={`p-4 rounded-xl border text-xs space-y-2 transition ${
                      currentGap.completed 
                        ? 'bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/40' 
                        : 'bg-amber-50/60 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800/40'
                    }`}>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <AlertCircle className={`w-4 h-4 ${currentGap.completed ? 'text-emerald-600' : 'text-amber-600'}`} />
                          <span className={`font-bold ${currentGap.completed ? 'text-emerald-900 dark:text-emerald-300' : 'text-amber-900 dark:text-amber-300'}`}>
                            {currentGap.completed ? 'បានបំពេញចំណុចខ្វះខាតរួចរាល់ (១០០%):' : 'ចំណុចខ្វះខាតរង់ចាំបំពេញបន្ថែមដើម្បីបាន ១០០%៖'}
                          </span>
                        </div>
                        <button
                          onClick={() => toggleGapItem(currentGap.id)}
                          className={`px-3 py-1 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 shrink-0 ${
                            currentGap.completed
                              ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                              : 'bg-amber-600 text-white hover:bg-amber-700'
                          }`}
                        >
                          {currentGap.completed ? (
                            <>
                              <CheckCircle2 size={14} />
                              <span>សម្រេចបាន ១០០%</span>
                            </>
                          ) : (
                            <>
                              <Plus size={14} />
                              <span>ចុចដើម្បី Mark ថាបានបំពេញ</span>
                            </>
                          )}
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-1 text-slate-700 dark:text-slate-300">
                        <div>
                          <span className="font-semibold text-slate-900 dark:text-white block mb-0.5">⚠️ ចំណុចខ្វះខាត៖</span>
                          <p>{currentGap.gapDescription}</p>
                        </div>
                        <div>
                          <span className="font-semibold text-slate-900 dark:text-white block mb-0.5">🎯 ផែនការសកម្មភាពត្រូវធ្វើបន្ត៖</span>
                          <p className="text-amber-800 dark:text-amber-300 font-medium">{currentGap.actionRequired}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Auto Mapped Reports Preview */}
                  <div className="pt-2">
                    <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 block mb-2">
                      🔗 របាយការណ៍ប្រព័ន្ធដែលភ្ជាប់ចូលស្ដង់ដារនេះស្រាប់៖
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {std.autoMappedReports.map((rep, idx) => (
                        <div
                          key={idx}
                          className="px-3 py-1.5 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/40 rounded-xl text-xs flex items-center gap-2"
                        >
                          <FileSpreadsheet className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                          <span className="font-semibold text-slate-900 dark:text-slate-100">{rep.name}</span>
                          <span className="px-1.5 py-0.5 text-[10px] font-bold bg-indigo-200 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 rounded">
                            {rep.count}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: KEY & SUB-INDICATORS FULL FRAMEWORK (12 KEY • 26 SUB) */}
      {activeTab === 'indicators' && (
        <div className="space-y-6">
          {/* Header Banner & Filters */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700/60 shadow-sm space-y-4">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-700/60 pb-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <BarChart3 className="text-emerald-500" />
                  <span>ក្របខ័ណ្ឌសូចនាករគន្លឹះ & សូចនាកររង ស្ដង់ដារសាលារៀនគំរូ ៥ (MoEYS Standard Framework)</span>
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  គ្រប់គ្រង និងតាមដាន ៥ ស្ដង់ដារ • {totalKeyIndicatorsCount} សូចនាករគន្លឹះ • {totalSubIndicatorsCount} សូចនាកររង ព្រមទាំងភស្ដុតាងផ្ទៀងផ្ទាត់ និងរបាយការណ៍ប្រព័ន្ធ
                </p>
              </div>

              {/* Stat Counters */}
              <div className="flex items-center gap-3 shrink-0">
                <div className="px-3.5 py-2 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/40 rounded-xl text-center">
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-semibold">ស្ដង់ដារគំរូ</span>
                  <span className="text-sm font-black text-emerald-700 dark:text-emerald-300">៥ ស្ដង់ដារ</span>
                </div>
                <div className="px-3.5 py-2 bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800/40 rounded-xl text-center">
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-semibold">សូចនាករគន្លឹះ</span>
                  <span className="text-sm font-black text-purple-700 dark:text-purple-300">{totalKeyIndicatorsCount} គន្លឹះ</span>
                </div>
                <div className="px-3.5 py-2 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/40 rounded-xl text-center">
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-semibold">សូចនាកររង</span>
                  <span className="text-sm font-black text-blue-700 dark:text-blue-300">{totalSubIndicatorsCount} សូចនាកររង</span>
                </div>
              </div>
            </div>

            {/* Filter Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div>
                <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1 block">
                  🔍 ស្វែងរកសូចនាកររង/ភស្ដុតាង៖
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
                  <input
                    type="text"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="វាយបញ្ចូលកូដ ឬឈ្មោះសូចនាកររង..."
                    className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1 block">
                  📂 ជ្រើសរើសស្ដង់ដារ៖
                </label>
                <select
                  value={selectedStandardFilter}
                  onChange={e => setSelectedStandardFilter(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                >
                  <option value="all">គ្រប់ស្ដង់ដារទាំង ៥</option>
                  <option value="std1">ស្ដង់ដារទី១ (លទ្ធផលសិក្សាសិស្ស)</option>
                  <option value="std2">ស្ដង់ដារទី២ (ការបង្រៀន & រៀន)</option>
                  <option value="std3">ស្ដង់ដារទី៣ (ការចូលរួមសហគមន៍)</option>
                  <option value="std4">ស្ដង់ដារទី៤ (ប្រតិបត្តិការ & គ្រប់គ្រង)</option>
                  <option value="std5">ស្ដង់ដារទី៥ (គណនេយ្យភាព & បរិស្ថាន)</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1 block">
                  📊 ជ្រើសរើសស្ថានភាពសម្រេចបាន៖
                </label>
                <select
                  value={selectedStatusFilter}
                  onChange={e => setSelectedStatusFilter(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                >
                  <option value="all">គ្រប់ស្ថានភាពទាំងអស់</option>
                  <option value="សម្រេចបានល្អ">សម្រេចបានល្អ (១០០%)</option>
                  <option value="កំពុងកែលម្អ">កំពុងកែលម្អ (៧៥%)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Key & Sub Indicators Tree & Tables */}
          <div className="space-y-6">
            {keySubIndicatorsData
              .filter(std => selectedStandardFilter === 'all' || std.id === selectedStandardFilter)
              .map(std => {
                // Filter sub indicators inside
                const hasMatchingSubIndicators = std.keyIndicators.some(key =>
                  key.subIndicators.some(
                    sub =>
                      (selectedStatusFilter === 'all' || sub.status === selectedStatusFilter) &&
                      (sub.code.toLowerCase().includes(search.toLowerCase()) ||
                        sub.title.toLowerCase().includes(search.toLowerCase()) ||
                        sub.evidence.toLowerCase().includes(search.toLowerCase()))
                  )
                );

                if (!hasMatchingSubIndicators) return null;

                return (
                  <div
                    key={std.id}
                    className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700/60 shadow-sm space-y-6"
                  >
                    {/* Standard Header */}
                    <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-700/60 pb-3">
                      <span className="px-3.5 py-1 text-xs font-black rounded-lg bg-emerald-600 text-white shadow-sm">
                        {std.code}
                      </span>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">{std.title}</h3>
                    </div>

                    {/* Key Indicators List */}
                    <div className="space-y-6">
                      {std.keyIndicators.map((keyInd, kIdx) => {
                        const matchingSubs = keyInd.subIndicators.filter(
                          sub =>
                            (selectedStatusFilter === 'all' || sub.status === selectedStatusFilter) &&
                            (sub.code.toLowerCase().includes(search.toLowerCase()) ||
                              sub.title.toLowerCase().includes(search.toLowerCase()) ||
                              sub.evidence.toLowerCase().includes(search.toLowerCase()))
                        );

                        if (matchingSubs.length === 0) return null;

                        return (
                          <div
                            key={kIdx}
                            className="p-5 rounded-2xl border border-slate-200 dark:border-slate-700/80 bg-slate-50/50 dark:bg-slate-900/40 space-y-3"
                          >
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/60 dark:border-slate-800 pb-2">
                              <div className="flex items-center gap-2">
                                <span className="px-2.5 py-0.5 text-xs font-bold rounded bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-300">
                                  {keyInd.code}
                                </span>
                                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                                  {keyInd.title}
                                </h4>
                              </div>

                              <span className="px-2.5 py-0.5 text-[11px] font-bold rounded-full bg-purple-100/80 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 shrink-0">
                                ទម្ងន់សូចនាករ៖ {keyInd.weight}
                              </span>
                            </div>

                            {/* Sub-Indicators Table */}
                            <div className="overflow-x-auto">
                              <table className="w-full text-left text-xs border-collapse">
                                <thead>
                                  <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
                                    <th className="py-2.5 px-3">កូដសូចនាកររង</th>
                                    <th className="py-2.5 px-3">ខ្លឹមសារសូចនាកររង (Sub-Indicator)</th>
                                    <th className="py-2.5 px-3">គោលដៅស្ដង់ដារ (Benchmark)</th>
                                    <th className="py-2.5 px-3">លទ្ធផលជាក់ស្ដែង</th>
                                    <th className="py-2.5 px-3 text-center">ស្ថានភាព</th>
                                    <th className="py-2.5 px-3">ភស្ដុតាងផ្ទៀងផ្ទាត់ (Evidence)</th>
                                    <th className="py-2.5 px-3">របាយការណ៍ស្វ័យប្រវត្តិ</th>
                                    <th className="py-2.5 px-3 text-center">សកម្មភាព</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                  {matchingSubs.map((sub, sIdx) => (
                                    <tr
                                      key={sIdx}
                                      className="hover:bg-slate-100/60 dark:hover:bg-slate-800/60 transition"
                                    >
                                      <td className="py-3 px-3 font-bold text-slate-800 dark:text-slate-200 whitespace-nowrap">
                                        {sub.code}
                                      </td>
                                      <td className="py-3 px-3 font-medium text-slate-900 dark:text-white">
                                        {sub.title}
                                      </td>
                                      <td className="py-3 px-3 text-slate-600 dark:text-slate-300 font-semibold whitespace-nowrap">
                                        {sub.targetBenchmark}
                                      </td>
                                      <td className="py-3 px-3 font-extrabold text-emerald-700 dark:text-emerald-400 whitespace-nowrap">
                                        {sub.currentResult}
                                      </td>
                                      <td className="py-3 px-3 text-center whitespace-nowrap">
                                        <span
                                          className={`px-2.5 py-1 text-[11px] font-bold rounded-full border ${
                                            sub.status === 'សម្រេចបានល្អ'
                                              ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300 border-emerald-300'
                                              : 'bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 border-amber-300'
                                          }`}
                                        >
                                          {sub.status} ({sub.score}%)
                                        </span>
                                      </td>
                                      <td className="py-3 px-3 text-slate-600 dark:text-slate-300">
                                        <div className="flex items-center gap-1.5">
                                          <FileText className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400 shrink-0" />
                                          <span>{sub.evidence}</span>
                                        </div>
                                      </td>
                                      <td className="py-3 px-3 whitespace-nowrap">
                                        <span className="px-2 py-1 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 font-semibold rounded-lg border border-indigo-200 dark:border-indigo-900/40">
                                          {sub.mappedReport}
                                        </span>
                                      </td>
                                      <td className="py-3 px-3 text-center whitespace-nowrap">
                                        <button
                                          onClick={() => toggleSubIndicatorStatus(sub.code)}
                                          className="px-2.5 py-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition shadow-sm text-[11px]"
                                        >
                                          {sub.status === 'សម្រេចបានល្អ' ? 'កែសម្រួល' : 'Mark ថាសម្រេច'}
                                        </button>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {/* TAB 3: GAP ANALYSIS & ACTION PLAN */}
      {activeTab === 'gaps' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700/60 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-700/60 pb-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <AlertCircle className="text-amber-500" />
                  <span>ផែនការសកម្មភាពបំពេញចំណុចខ្វះខាត ឆ្ពោះទៅ ១០០% ស្ដង់ដារគំរូ</span>
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  វិភាគចំណុចខ្វះខាតបច្ចុប្បន្ន និងកាលវិភាគអនុវត្តសកម្មភាពកែលម្អដើម្បីទទួលបានស្ដង់ដារគំរូឥតខ្ចោះ
                </p>
              </div>

              <div className="flex items-center gap-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/40 p-3 rounded-xl">
                <BarChart3 className="text-amber-600 dark:text-amber-400" size={24} />
                <div>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block font-medium">ភាពសម្រេចបាន</span>
                  <span className="text-sm font-black text-amber-700 dark:text-amber-300">
                    {completedGapsCount} / {gapItems.length} ចំណុចបានលុបបំបាត់
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {gapItems.map(item => (
                <div
                  key={item.id}
                  className={`p-5 rounded-2xl border transition space-y-3 ${
                    item.completed
                      ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/40'
                      : 'bg-white dark:bg-slate-900/60 border-slate-200 dark:border-slate-700/60 shadow-sm'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 text-xs font-bold rounded-lg bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300">
                        {item.stdCode} • {item.stdTitle}
                      </span>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white">
                        {item.gapTitle}
                      </h3>
                    </div>

                    <button
                      onClick={() => toggleGapItem(item.id)}
                      className={`px-4 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-2 shrink-0 ${
                        item.completed
                          ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm'
                          : 'bg-amber-500 text-white hover:bg-amber-600 shadow-sm'
                      }`}
                    >
                      <CheckCircle2 size={16} />
                      <span>{item.completed ? 'បានអនុវត្តរួចរាល់ (១០០%)' : 'Mark ថាបានអនុវត្ត'}</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                    <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 space-y-2">
                      <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                        <AlertCircle className="w-4 h-4 text-amber-500" />
                        <span>ស្ថានភាព & ចំណុចខ្វះខាតបច្ចុប្បន្ន (Gap Analysis)៖</span>
                      </span>
                      <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{item.gapDescription}</p>

                      {item.requiredResources && (
                        <div className="pt-1.5 border-t border-slate-200/50 dark:border-slate-700/50 flex items-center gap-1.5 text-[11px] text-purple-700 dark:text-purple-300 font-medium">
                          <span>📦 សម្ភារ/ធនធានតម្រូវ៖</span>
                          <span className="font-bold">{item.requiredResources}</span>
                        </div>
                      )}
                    </div>

                    <div className="p-3.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/40 space-y-2">
                      <span className="font-bold text-amber-900 dark:text-amber-300 flex items-center gap-1.5">
                        <CheckSquare className="w-4 h-4 text-amber-600" />
                        <span>សកម្មភាពអនុវត្តដំណាក់កាលលម្អិត (Action Steps)៖</span>
                      </span>
                      
                      {item.actionSteps && item.actionSteps.length > 0 ? (
                        <ul className="space-y-1.5 text-amber-950 dark:text-amber-200">
                          {item.actionSteps.map((step, idx) => (
                            <li key={idx} className="flex items-start gap-1.5">
                              <span className="w-4 h-4 rounded-full bg-amber-200 dark:bg-amber-900 text-amber-900 dark:text-amber-100 text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5">
                                {idx + 1}
                              </span>
                              <span>{step}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-amber-950 dark:text-amber-200 font-medium">{item.actionRequired}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-1">
                    <span className="flex items-center gap-1.5">
                      👤 អ្នកទទួលខុសត្រូវ៖ <strong className="text-slate-800 dark:text-slate-200">{item.responsiblePerson}</strong>
                    </span>
                    <span className="flex items-center gap-1.5">
                      📅 ឱសានកាលកំណត់៖ <strong className="text-slate-800 dark:text-slate-200">{item.targetDate}</strong>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: AUTO MAPPED REPORTS MATRIX */}
      {activeTab === 'mapping' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700/60 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
              តារាងសន្ទស្សន៍របាយការណ៍ស្វ័យប្រវត្តិ តាម ៥ ស្ដង់ដារសាលារៀនគំរូ MoEYS
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
              រាល់របាយការណ៍ដែលបង្កើតក្នុងប្រព័ន្ធទាំងអស់ (ស្ថិតិសិស្ស, គ្រូបង្រៀន, គណៈកម្មាធិការ, ថវិកា, ជំរឿន...) ត្រូវបានបែងចែកចូលតាមស្ដង់ដារនីមួយៗស្វ័យប្រវត្តិ
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Standard 1 Matrix */}
              <div className="p-5 rounded-2xl border border-emerald-200 dark:border-emerald-900/40 bg-emerald-50/40 dark:bg-emerald-950/20 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-emerald-600 text-white">
                    ស្ដង់ដារទី១
                  </span>
                  <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">លទ្ធផលសិក្សាសិស្ស</span>
                </div>
                <ul className="space-y-2 text-xs">
                  <li className="flex items-center gap-2 p-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
                    <Award className="w-4 h-4 text-emerald-600" />
                    <span>សៀវភៅពិន្ទុ & ចំណាត់ថ្នាក់ ({students.length} សិស្ស)</span>
                  </li>
                  <li className="flex items-center gap-2 p-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
                    <Trophy className="w-4 h-4 text-emerald-600" />
                    <span>បណ្ណសរសើរ & ជ័យលាភីសិស្សពូកែ</span>
                  </li>
                  <li className="flex items-center gap-2 p-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
                    <BarChart3 className="w-4 h-4 text-emerald-600" />
                    <span>តេស្តប្រចាំខែ & ឆមាស (១៣ មុខវិជ្ជា)</span>
                  </li>
                </ul>
              </div>

              {/* Standard 2 Matrix */}
              <div className="p-5 rounded-2xl border border-blue-200 dark:border-blue-900/40 bg-blue-50/40 dark:bg-blue-950/20 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-blue-600 text-white">
                    ស្ដង់ដារទី២
                  </span>
                  <span className="text-xs font-semibold text-blue-700 dark:text-blue-400">ការបង្រៀន & រៀន</span>
                </div>
                <ul className="space-y-2 text-xs">
                  <li className="flex items-center gap-2 p-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
                    <Users className="w-4 h-4 text-blue-600" />
                    <span>បញ្ជីគ្រូបង្រៀន ({teachers.length} នាក់)</span>
                  </li>
                  <li className="flex items-center gap-2 p-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
                    <BookOpen className="w-4 h-4 text-blue-600" />
                    <span>កាលវិភាគបង្រៀនស្ដង់ដារ MoEYS</span>
                  </li>
                  <li className="flex items-center gap-2 p-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
                    <Sparkles className="w-4 h-4 text-blue-600" />
                    <span>ឧបករណ៍វាយតម្លៃមត្តេយ្យ ({preschoolAssessments.length} បណ្ណ)</span>
                  </li>
                </ul>
              </div>

              {/* Standard 3 Matrix */}
              <div className="p-5 rounded-2xl border border-amber-200 dark:border-amber-900/40 bg-amber-50/40 dark:bg-amber-950/20 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-amber-600 text-white">
                    ស្ដង់ដារទី៣
                  </span>
                  <span className="text-xs font-semibold text-amber-700 dark:text-amber-400">ការចូលរួមសហគមន៍</span>
                </div>
                <ul className="space-y-2 text-xs">
                  <li className="flex items-center gap-2 p-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
                    <Building2 className="w-4 h-4 text-amber-600" />
                    <span>គណៈកម្មាធិការ គគថ (SSC - {committees.filter(m => m.committeeType === 'គគថ').length} នាក់)</span>
                  </li>
                  <li className="flex items-center gap-2 p-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
                    <Users className="w-4 h-4 text-amber-600" />
                    <span>ផែនការប្រជុំមាតាបិតា ({parentMeetingPlans.length} លើក/ឆ្នាំ)</span>
                  </li>
                  <li className="flex items-center gap-2 p-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
                    <BadgeCheck className="w-4 h-4 text-amber-600" />
                    <span>វិភាគទានសហគមន៍ & សប្បុរសជន</span>
                  </li>
                </ul>
              </div>

              {/* Standard 4 Matrix */}
              <div className="p-5 rounded-2xl border border-purple-200 dark:border-purple-900/40 bg-purple-50/40 dark:bg-purple-950/20 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-purple-600 text-white">
                    ស្ដង់ដារទី៤
                  </span>
                  <span className="text-xs font-semibold text-purple-700 dark:text-purple-400">ប្រតិបត្តិការ & គ្រប់គ្រង</span>
                </div>
                <ul className="space-y-2 text-xs">
                  <li className="flex items-center gap-2 p-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
                    <ShieldCheck className="w-4 h-4 text-purple-600" />
                    <span>គណៈកម្មាធិការ គគស (SMC - {committees.filter(m => m.committeeType === 'គគស').length} នាក់)</span>
                  </li>
                  <li className="flex items-center gap-2 p-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
                    <UserCheck className="w-4 h-4 text-purple-600" />
                    <span>ជំរឿនកុមារភូមិចំណុះ ({censusChildren.length} កុមារ)</span>
                  </li>
                  <li className="flex items-center gap-2 p-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
                    <Boxes className="w-4 h-4 text-purple-600" />
                    <span>បញ្ជីគ្រប់គ្រងសម្ភារៈ ({schoolAssets.length} មុខ)</span>
                  </li>
                  <li className="flex items-center gap-2 p-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
                    <FileSpreadsheet className="w-4 h-4 text-purple-600" />
                    <span>ថវិការដ្ឋ & ចំណូល-ចំណាយ ({financialTransactions.length} ប័ណ្ណ)</span>
                  </li>
                </ul>
              </div>

              {/* Standard 5 Matrix */}
              <div className="p-5 rounded-2xl border border-cyan-200 dark:border-cyan-900/40 bg-cyan-50/40 dark:bg-cyan-950/20 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-cyan-600 text-white">
                    ស្ដង់ដារទី៥
                  </span>
                  <span className="text-xs font-semibold text-cyan-700 dark:text-cyan-400">គណនេយ្យភាព & បរិស្ថាន</span>
                </div>
                <ul className="space-y-2 text-xs">
                  <li className="flex items-center gap-2 p-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
                    <Heart className="w-4 h-4 text-cyan-600" />
                    <span>ជំនួយសិស្ស & អាហារ WFP ({studentSupports.length} សិស្ស)</span>
                  </li>
                  <li className="flex items-center gap-2 p-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
                    <Boxes className="w-4 h-4 text-cyan-600" />
                    <span>បញ្ជីប្រគល់-ទទួលសៀវភៅ & សម្ភារ</span>
                  </li>
                  <li className="flex items-center gap-2 p-2 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
                    <Sparkles className="w-4 h-4 text-cyan-600" />
                    <span>បរិស្ថានបៃតង & អនាម័យសាលា</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: ACTIVITIES LIST */}
      {activeTab === 'activities' && (
        <div className="space-y-6">
          {/* Filter and Search */}
          <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700/60 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="ស្វែងរកចំណងជើងសកម្មភាព, អ្នកដឹកនាំ, ភស្ដុតាង..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 dark:text-white"
              />
            </div>

            <select
              value={selectedType}
              onChange={e => setSelectedType(e.target.value)}
              className="px-3 py-2 text-sm bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl dark:text-white"
            >
              <option value="all">គ្រប់ប្រភេទសកម្មភាព</option>
              <option value="ការប្រកួតប្រជែង">ការប្រកួតប្រជែង</option>
              <option value="ក្លឹបសិក្សា">ក្លឹបសិក្សា</option>
              <option value="ទស្សនកិច្ច">ទស្សនកិច្ច</option>
              <option value="ទំនាក់ទំនងព្រះសង្ឃ/សហគមន៍">ទំនាក់ទំនងព្រះសង្ឃ/សហគមន៍</option>
              <option value="ប្រជុំបច្ចេកទេស">ប្រជុំបច្ចេកទេស</option>
              <option value="ភស្ដុតាងសាលាស្ដង់ដារគំរូ">ភស្ដុតាងសាលាស្ដង់ដារគំរូ</option>
            </select>
          </div>

          {/* Cards List Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredActivities.length === 0 ? (
              <div className="col-span-full bg-white dark:bg-slate-800 p-12 text-center rounded-2xl border border-slate-200 dark:border-slate-700 text-slate-400">
                មិនមានទិន្នន័យសកម្មភាពសាលាឡើយ
              </div>
            ) : (
              filteredActivities.map(item => (
                <div
                  key={item.id}
                  className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700/60 shadow-sm hover:shadow-md transition flex flex-col justify-between overflow-hidden"
                >
                  <div className="p-5 space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300">
                        {item.activityType}
                      </span>
                      <button
                        onClick={() => deleteSchoolActivity(item.id)}
                        className="p-1 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <h3 className="font-bold text-slate-900 dark:text-white text-base leading-snug">{item.title}</h3>

                    {item.standardCategory && (
                      <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 block bg-amber-50 dark:bg-amber-950/30 px-2.5 py-1 rounded-lg border border-amber-200 dark:border-amber-900/30 w-fit">
                        {item.standardCategory}
                      </span>
                    )}

                    <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3">{item.description}</p>

                    <div className="pt-2 border-t border-slate-100 dark:border-slate-700/60 space-y-1 text-xs text-slate-500 dark:text-slate-400">
                      <div className="flex items-center gap-2">
                        <Calendar size={14} className="text-purple-500" />
                        <span>{item.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin size={14} className="text-purple-500" />
                        <span>{item.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users size={14} className="text-purple-500" />
                        <span>
                          អ្នកដឹកនាំ: <strong>{item.leadPerson}</strong> ({item.participantsCount} នាក់ចូលរួម)
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Evidence Footer */}
                  <div className="p-4 bg-purple-50 dark:bg-purple-950/20 border-t border-purple-100 dark:border-purple-900/30">
                    <span className="text-xs font-semibold text-purple-900 dark:text-purple-300 block mb-0.5">
                      ភស្ដុតាង & លទ្ធផលសម្រេច:
                    </span>
                    <p className="text-xs text-purple-800 dark:text-purple-200 font-medium">{item.outcomeEvidence}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Modal Add Activity */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-700/60">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
              បន្ថែមសកម្មភាពសាលា / ភស្ដុតាងស្ដង់ដារ
            </h2>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  ចំណងជើងសកម្មភាព *
                </label>
                <input
                  type="text"
                  required
                  placeholder="ឧ. ការប្រកួតអានអត្ថបទ, ទស្សនកិច្ចសិក្សា..."
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-xl bg-slate-50 dark:bg-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    ប្រភេទសកម្មភាព
                  </label>
                  <select
                    value={activityType}
                    onChange={e => setActivityType(e.target.value as ActivityType)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-xl bg-slate-50 dark:bg-slate-900 dark:text-white"
                  >
                    <option value="ការប្រកួតប្រជែង">ការប្រកួតប្រជែង</option>
                    <option value="ក្លឹបសិក្សា">ក្លឹបសិក្សា</option>
                    <option value="ទស្សនកិច្ច">ទស្សនកិច្ច</option>
                    <option value="ទំនាក់ទំនងព្រះសង្ឃ/សហគមន៍">ទំនាក់ទំនងព្រះសង្ឃ/សហគមន៍</option>
                    <option value="ប្រជុំបច្ចេកទេស">ប្រជុំបច្ចេកទេស</option>
                    <option value="ភស្ដុតាងសាលាស្ដង់ដារគំរូ">ភស្ដុតាងសាលាស្ដង់ដារគំរូ</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    ស្ដង់ដារសាលារៀនគំរូ (MoEYS)
                  </label>
                  <select
                    value={standardCategory}
                    onChange={e => setStandardCategory(e.target.value as any)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-xl bg-slate-50 dark:bg-slate-900 dark:text-white"
                  >
                    <option value="ស្ដង់ដារទី១ (ការសិក្សាសិស្ស)">ស្ដង់ដារទី១ (ការសិក្សាសិស្ស)</option>
                    <option value="ស្ដង់ដារទី២ (ការបង្រៀន)">ស្ដង់ដារទី២ (ការបង្រៀន)</option>
                    <option value="ស្ដង់ដារទី៣ (ការគ្រប់គ្រង)">ស្ដង់ដារទី៣ (ការគ្រប់គ្រង)</option>
                    <option value="ស្ដង់ដារទី៤ (បរិស្ថាន)">ស្ដង់ដារទី៤ (បរិស្ថាន)</option>
                    <option value="ស្ដង់ដារទី៥ (សហគមន៍)">ស្ដង់ដារទី៥ (សហគមន៍)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    កាលបរិច្ឆេទ
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-xl bg-slate-50 dark:bg-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    ចំនួនអ្នកចូលរួម (នាក់)
                  </label>
                  <input
                    type="number"
                    value={participantsCount}
                    onChange={e => setParticipantsCount(Number(e.target.value))}
                    className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-xl bg-slate-50 dark:bg-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    ទីកន្លែង
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-xl bg-slate-50 dark:bg-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    អ្នកទទួលខុសត្រូវដឹកនាំ *
                  </label>
                  <input
                    type="text"
                    required
                    value={leadPerson}
                    onChange={e => setLeadPerson(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-xl bg-slate-50 dark:bg-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  បរិយាយសកម្មភាព
                </label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-xl bg-slate-50 dark:bg-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  ភស្ដុតាង / លទ្ធផលសម្រេច
                </label>
                <input
                  type="text"
                  placeholder="ឧ. លិខិតសរសើរ, រូបថតសកម្មភាព, កំណត់ហេតុប្រជុំ..."
                  value={outcomeEvidence}
                  onChange={e => setOutcomeEvidence(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-xl bg-slate-50 dark:bg-slate-900 dark:text-white"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl"
                >
                  បោះបង់
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-xl shadow-md"
                >
                  រក្សាទុក
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
