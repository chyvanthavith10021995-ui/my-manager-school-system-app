import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/layout/Sidebar';
import type { NavTab } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { AdminDashboard } from './components/dashboard/AdminDashboard';
import { TeacherDashboard } from './components/dashboard/TeacherDashboard';
import { StudentDashboard } from './components/dashboard/StudentDashboard';
import { StudentManagement } from './components/students/StudentManagement';
import { TeacherManagement } from './components/teachers/TeacherManagement';
import { CommitteeManagement } from './components/committees/CommitteeManagement';
import { AcademicsView } from './components/academics/AcademicsView';
import { AttendanceRegister } from './components/attendance/AttendanceRegister';
import { GradebookView } from './components/gradebook/GradebookView';
import { MasterReportsView } from './components/reports/MasterReportsView';
import { ReportCardModal } from './components/gradebook/ReportCardModal';
import { NoticeBoard } from './components/notices/NoticeBoard';
import { AddStudentModal } from './components/students/AddStudentModal';
import { AddTeacherModal } from './components/teachers/AddTeacherModal';
import { MoEYSStandardReportsModal } from './components/reports/MoEYSStandardReportsModal';
import { SchoolSettingsModal } from './components/settings/SchoolSettingsModal';
import { QuickLoginModal } from './components/common/QuickLoginModal';

// Cambodian Education View Imports
import { EnrollmentCensusView } from './components/enrollment/EnrollmentCensusView';
import { PreschoolAssessmentView } from './components/preschool/PreschoolAssessmentView';
import { StudentSupportView } from './components/support/StudentSupportView';
import { StudentHealthView } from './components/health/StudentHealthView';
import { SchoolActivitiesView } from './components/activities/SchoolActivitiesView';
import { ParentMeetingPlanView } from './components/parentMeetings/ParentMeetingPlanView';
import { InventoryHandoverView } from './components/inventory/InventoryHandoverView';

const AppContent: React.FC = () => {
  const { userRole, students, grades } = useApp();
  const [activeTab, setActiveTab] = useState<NavTab>('dashboard');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  
  // Modals
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [showAddTeacherModal, setShowAddTeacherModal] = useState(false);
  const [showReportCardModal, setShowReportCardModal] = useState(false);
  const [showStandardReportsModal, setShowStandardReportsModal] = useState(false);
  const [showSchoolSettingsModal, setShowSchoolSettingsModal] = useState(false);
  const [showQuickLoginModal, setShowQuickLoginModal] = useState(false);

  // Render view based on role and tab
  const renderMainContent = () => {
    switch (activeTab) {
      case 'dashboard':
        if (userRole === 'admin') {
          return (
            <AdminDashboard
              onNavigate={setActiveTab}
              onOpenAddStudent={() => setShowAddStudentModal(true)}
              onOpenAddTeacher={() => setShowAddTeacherModal(true)}
              onOpenReports={() => setActiveTab('reports')}
              onOpenSettings={() => setShowSchoolSettingsModal(true)}
            />
          );
        } else if (userRole === 'teacher') {
          return <TeacherDashboard onNavigate={setActiveTab} />;
        } else {
          return (
            <StudentDashboard
              onNavigate={setActiveTab}
              onOpenReportCard={() => setShowReportCardModal(true)}
            />
          );
        }
      case 'students':
        return <StudentManagement onOpenAddModal={() => setShowAddStudentModal(true)} />;
      case 'teachers':
        return <TeacherManagement onOpenAddModal={() => setShowAddTeacherModal(true)} />;
      case 'committees':
        return <CommitteeManagement />;
      case 'academics':
        return <AcademicsView />;
      case 'attendance':
        return <AttendanceRegister />;
      case 'gradebook':
        return <GradebookView />;
      case 'census':
        return <EnrollmentCensusView />;
      case 'preschool':
        return <PreschoolAssessmentView />;
      case 'support':
        return <StudentSupportView />;
      case 'health':
        return <StudentHealthView />;
      case 'activities':
        return <SchoolActivitiesView />;
      case 'parentMeetings':
        return <ParentMeetingPlanView />;
      case 'inventory':
        return <InventoryHandoverView />;
      case 'reports':
        return <MasterReportsView />;
      case 'notices':
        return <NoticeBoard />;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans">
      
      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main App Container */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Header */}
        <Header 
          onOpenReports={() => setShowStandardReportsModal(true)}
          onOpenSettings={() => setShowSchoolSettingsModal(true)}
          onToggleMobileSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
          onOpenQuickLogin={() => setShowQuickLoginModal(true)}
        />

        {/* Content View Container */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {renderMainContent()}
          </div>
        </main>

      </div>

      {/* Modals */}
      {showAddStudentModal && (
        <AddStudentModal onClose={() => setShowAddStudentModal(false)} />
      )}

      {showAddTeacherModal && (
        <AddTeacherModal onClose={() => setShowAddTeacherModal(false)} />
      )}

      {showReportCardModal && (
        <ReportCardModal
          student={students[1] || students[0]}
          grades={grades}
          onClose={() => setShowReportCardModal(false)}
        />
      )}

      {showStandardReportsModal && (
        <MoEYSStandardReportsModal onClose={() => setShowStandardReportsModal(false)} />
      )}

      {showSchoolSettingsModal && (
        <SchoolSettingsModal onClose={() => setShowSchoolSettingsModal(false)} />
      )}

      {showQuickLoginModal && (
        <QuickLoginModal onClose={() => setShowQuickLoginModal(false)} />
      )}

    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
