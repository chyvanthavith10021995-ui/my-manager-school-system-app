import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import type { UserRole } from '../../types';
import {
  Search,
  Bell,
  Sun,
  Moon,
  Shield,
  GraduationCap,
  UserCheck,
  Users,
  RotateCcw,
  CheckCircle,
  X,
  Sparkles,
  FileText,
  Settings,
  Menu,
  KeyRound
} from 'lucide-react';

interface HeaderProps {
  onOpenReports?: () => void;
  onOpenSettings?: () => void;
  onToggleMobileSidebar?: () => void;
  onOpenQuickLogin?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenReports, onOpenSettings, onToggleMobileSidebar, onOpenQuickLogin }) => {
  const {
    userRole,
    setUserRole,
    language,
    setLanguage,
    t,
    theme,
    toggleTheme,
    searchQuery,
    setSearchQuery,
    notifications,
    markNotificationRead,
    clearNotifications,
    resetDemoData
  } = useApp();

  const [showNotifications, setShowNotifications] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  const roles: { role: UserRole; key: string; icon: any; bgClass: string }[] = [
    { role: 'admin', key: 'admin', icon: Shield, bgClass: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30' },
    { role: 'teacher', key: 'teacher', icon: GraduationCap, bgClass: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30' },
    { role: 'student', key: 'student', icon: UserCheck, bgClass: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30' },
    { role: 'parent', key: 'parent', icon: Users, bgClass: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30' }
  ];

  return (
    <header className="sticky top-0 z-30 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 px-4 lg:px-8 py-3 transition-colors">
      <div className="flex items-center justify-between gap-3">
        
        {/* Mobile Hamburger & Logo Header */}
        <div className="flex items-center gap-2 lg:hidden">
          {onToggleMobileSidebar && (
            <button
              onClick={onToggleMobileSidebar}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Open navigation menu"
            >
              <Menu className="w-5 h-5 text-brand-600 dark:text-brand-400" />
            </button>
          )}
          <img src="/school-logo.svg" alt="School Logo" className="w-7 h-7 object-contain drop-shadow" />
        </div>

        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder={t('searchPlaceholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm bg-slate-100 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500/50 text-slate-900 dark:text-slate-100 placeholder-slate-400 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Header Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">

          {/* Teacher Quick Login Button */}
          {onOpenQuickLogin && (
            <button
              onClick={onOpenQuickLogin}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-black text-xs rounded-xl shadow-md transition-all shrink-0"
              title="ទម្រង់ចូលប្រព័ន្ធសម្រាប់លោកគ្រូអ្នកគ្រូ និងនាយកសាលា"
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>ចូលប្រព័ន្ធ</span>
            </button>
          )}

          {/* Role Switcher */}
          <div className="hidden sm:flex items-center bg-slate-100 dark:bg-slate-800/70 p-1 rounded-xl border border-slate-200 dark:border-slate-700/80">
            <span className="text-xs font-semibold text-slate-400 px-2 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-brand-500" /> {t('role')}
            </span>
            {roles.map(({ role, key, icon: Icon, bgClass }) => {
              const active = userRole === role;
              return (
                <button
                  key={role}
                  onClick={() => setUserRole(role)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    active
                      ? `${bgClass} border shadow-sm`
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                  }`}
                  title={`Switch view to ${t(key)}`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{t(key)}</span>
                </button>
              );
            })}
          </div>

          {/* Language Switcher Pill */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-800/70 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setLanguage('km')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                language === 'km' ? 'bg-brand-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              🇰🇭 ខ្មែរ
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                language === 'en' ? 'bg-brand-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              🇺🇸 EN
            </button>
          </div>

          {/* Standard MoEYS Reports Button */}
          {onOpenReports && (
            <button
              onClick={onOpenReports}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-brand-500/10 hover:bg-brand-500/20 text-brand-600 dark:text-brand-400 border border-brand-500/20 font-bold text-xs transition-all"
              title="មជ្ឈមណ្ឌលរបាយការណ៍ស្ដង់ដារ MoEYS"
            >
              <FileText className="w-3.5 h-3.5 text-brand-500" />
              <span>របាយការណ៍ស្ដង់ដារ</span>
            </button>
          )}

          {/* School Settings Button */}
          {onOpenSettings && userRole === 'admin' && (
            <button
              onClick={onOpenSettings}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="ការកំណត់សាលារៀន (School Settings)"
            >
              <Settings className="w-4 h-4 text-slate-500" />
            </button>
          )}

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title={`Switch Theme`}
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
          </button>

          {/* Reset Demo Data Button */}
          <button
            onClick={() => {
              if (confirm('Reset demo data back to default state?')) {
                resetDemoData();
              }
            }}
            className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
            title={t('resetDemo')}
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Notifications Popover Toggle */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white dark:ring-slate-900 animate-pulse" />
              )}
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl z-50 overflow-hidden">
                <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">Notifications</h4>
                    {unreadCount > 0 && (
                      <span className="px-2 py-0.5 text-xs font-semibold bg-brand-100 text-brand-700 dark:bg-brand-950 dark:text-brand-300 rounded-full">
                        {unreadCount} new
                      </span>
                    )}
                  </div>
                  {notifications.length > 0 && (
                    <button
                      onClick={clearNotifications}
                      className="text-xs text-slate-400 hover:text-rose-500 transition-colors"
                    >
                      Clear all
                    </button>
                  )}
                </div>

                <div className="max-h-80 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/60">
                  {notifications.length === 0 ? (
                    <div className="p-6 text-center text-slate-400 text-xs">
                      No new notifications
                    </div>
                  ) : (
                    notifications.map(n => (
                      <div
                        key={n.id}
                        onClick={() => markNotificationRead(n.id)}
                        className={`p-4 flex items-start gap-3 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors cursor-pointer ${
                          !n.read ? 'bg-brand-50/50 dark:bg-brand-950/20' : ''
                        }`}
                      >
                        <CheckCircle className={`w-4 h-4 mt-0.5 ${
                          n.type === 'success' ? 'text-emerald-500' :
                          n.type === 'warning' ? 'text-amber-500' : 'text-brand-500'
                        }`} />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">{n.title}</p>
                            <span className="text-[10px] text-slate-400">{n.timestamp}</span>
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{n.message}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Summary */}
          <div className="flex items-center gap-3 pl-2 border-l border-slate-200 dark:border-slate-800">
            <img
              src={
                userRole === 'admin' ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80' :
                userRole === 'teacher' ? 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80' :
                'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80'
              }
              alt="User profile"
              className="w-8 h-8 rounded-full object-cover ring-2 ring-brand-500/20"
            />
            <div className="hidden md:block text-left">
              <p className="text-xs font-bold text-slate-800 dark:text-slate-100 leading-tight">
                {userRole === 'admin' ? 'Super Administrator' :
                 userRole === 'teacher' ? 'Dr. Elizabeth Vance' :
                 userRole === 'student' ? 'Sophia Chen' : 'Robert Wright (Parent)'}
              </p>
              <p className="text-[10px] text-slate-400 uppercase tracking-wider font-medium">
                {userRole}
              </p>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
};
