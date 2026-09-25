import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  CalendarCheck,
  Award,
  Megaphone,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  X,
  Globe,
  Building2,
  FileSpreadsheet
} from 'lucide-react';

import {
  UserCheck,
  Heart,
  Trophy,
  Users2,
  Boxes
} from 'lucide-react';

export type NavTab = 
  | 'dashboard'
  | 'students'
  | 'teachers'
  | 'committees'
  | 'academics'
  | 'attendance'
  | 'gradebook'
  | 'census'
  | 'preschool'
  | 'support'
  | 'health'
  | 'activities'
  | 'parentMeetings'
  | 'inventory'
  | 'reports'
  | 'notices';

interface SidebarProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, isMobileOpen, onCloseMobile }) => {
  const { userRole, students, teachers, committees, announcements, censusChildren, preschoolAssessments, studentSupports, schoolActivities, parentMeetingPlans, schoolAssets, t, language } = useApp();

  const navItems: { id: NavTab; icon: any; badge?: number | string; roles: string[] }[] = [
    { id: 'dashboard', icon: LayoutDashboard, roles: ['admin', 'teacher', 'student', 'parent'] },
    { id: 'students', icon: Users, badge: students.length, roles: ['admin', 'teacher'] },
    { id: 'teachers', icon: GraduationCap, badge: teachers.length, roles: ['admin'] },
    { id: 'committees', icon: Building2, badge: committees.length, roles: ['admin', 'teacher', 'student', 'parent'] },
    { id: 'academics', icon: BookOpen, roles: ['admin', 'teacher', 'student', 'parent'] },
    { id: 'attendance', icon: CalendarCheck, roles: ['admin', 'teacher', 'student', 'parent'] },
    { id: 'gradebook', icon: Award, roles: ['admin', 'teacher', 'student', 'parent'] },
    { id: 'census', icon: UserCheck, badge: censusChildren.length, roles: ['admin', 'teacher', 'student', 'parent'] },
    { id: 'preschool', icon: Sparkles, badge: preschoolAssessments.length, roles: ['admin', 'teacher', 'student', 'parent'] },
    { id: 'support', icon: Heart, badge: studentSupports.length, roles: ['admin', 'teacher', 'student', 'parent'] },
    { id: 'health', icon: Heart, badge: 'សុខភាព', roles: ['admin', 'teacher', 'student', 'parent'] },
    { id: 'activities', icon: Trophy, badge: schoolActivities.length, roles: ['admin', 'teacher', 'student', 'parent'] },
    { id: 'parentMeetings', icon: Users2, badge: parentMeetingPlans.length, roles: ['admin', 'teacher', 'student', 'parent'] },
    { id: 'inventory', icon: Boxes, badge: schoolAssets.length, roles: ['admin', 'teacher', 'student', 'parent'] },
    { id: 'reports', icon: FileSpreadsheet, badge: 'មេ', roles: ['admin', 'teacher', 'student', 'parent'] },
    { id: 'notices', icon: Megaphone, badge: announcements.length, roles: ['admin', 'teacher', 'student', 'parent'] }
  ];

  const filteredNavItems = navItems.filter(item => item.roles.includes(userRole));

  const handleSelectTab = (tab: NavTab) => {
    setActiveTab(tab);
    if (onCloseMobile) onCloseMobile();
  };

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 via-indigo-600 to-purple-600 p-0.5 flex items-center justify-center shadow-lg shadow-brand-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-brand-400 animate-pulse" />
            </div>
          </div>
          <div>
            <h1 className="font-extrabold text-sm tracking-tight text-white flex items-center gap-1.5">
              បឋមសិក្សា អន្លង់តាម៉ី <span className="text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded bg-brand-500/20 text-brand-400 border border-brand-500/30">MoEYS</span>
            </h1>
            <p className="text-[11px] text-slate-400 font-medium">
              {language === 'km' ? 'ប្រព័ន្ធគ្រប់គ្រងសាលារៀនពីចម្ងាយ' : 'Remote School System'}
            </p>
          </div>
        </div>
        {onCloseMobile && (
          <button onClick={onCloseMobile} className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Cloud Remote Mode Status Pill */}
      <div className="px-4 pt-3">
        <div className="px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center gap-2 text-[10px] font-extrabold">
          <Globe className="w-3.5 h-3.5 text-emerald-400 animate-spin" style={{ animationDuration: '6s' }} />
          <span>ប្រព័ន្ធ Cloud Internet Sync ដំណើរការ</span>
        </div>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
        <div className="px-3 py-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
          {language === 'km' ? 'ម៉ឺនុយមេ' : 'Main Menu'}
        </div>

        {filteredNavItems.map(({ id, icon: Icon, badge }) => {
          const active = activeTab === id;
          return (
            <button
              key={id}
              onClick={() => handleSelectTab(id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                active
                  ? 'bg-gradient-to-r from-brand-600 to-indigo-600 text-white shadow-md shadow-brand-600/30'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${active ? 'text-white' : 'text-slate-400 group-hover:text-brand-400'}`} />
                <span>{t(id)}</span>
              </div>
              
              <div className="flex items-center gap-1.5">
                {badge !== undefined && (
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    active
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-800 text-slate-300'
                  }`}>
                    {badge}
                  </span>
                )}
                {active && <ChevronRight className="w-3.5 h-3.5 opacity-70" />}
              </div>
            </button>
          );
        })}
      </nav>

      {/* Footer System Status */}
      <div className="p-4 border-t border-slate-800 bg-slate-950/50">
        <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <div>
              <p className="text-[11px] font-semibold text-slate-200">សាលាបឋមសិក្សា អន្លង់តាម៉ី</p>
              <p className="text-[10px] text-slate-400">ឆ្នាំសិក្សា ២០២៥ - ២០២៦</p>
            </div>
          </div>
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar View */}
      <aside className="hidden lg:flex w-64 bg-slate-900 text-slate-100 flex-col shrink-0 h-screen sticky top-0 border-r border-slate-800 z-40">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay View */}
      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={onCloseMobile} />
          <aside className="relative w-72 bg-slate-900 text-slate-100 flex flex-col h-full shadow-2xl z-10 border-r border-slate-800 animate-in slide-in-from-left duration-200">
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
};

