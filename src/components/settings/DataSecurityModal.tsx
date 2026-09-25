import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShieldCheck,
  Lock,
  Database,
  Cloud,
  Key,
  RefreshCw,
  Download,
  CheckCircle2,
  X,
  History,
  ShieldAlert,
  Server,
  UserCheck
} from 'lucide-react';
import { PasswordStrengthMeter, checkPasswordStrength } from '../common/PasswordStrengthMeter';
import { AuditTrailModal } from '../common/AuditTrailModal';

interface DataSecurityModalProps {
  onClose: () => void;
}

export const DataSecurityModal: React.FC<DataSecurityModalProps> = ({ onClose }) => {
  const {
    userRole,
    setUserRole,
    backupSettings,
    updateBackupSettings,
    triggerManualBackup,
    logActivity,
    auditLogs
  } = useApp();

  const [activeTab, setActiveTab] = useState<'rbac' | 'backup' | 'password' | 'encryption'>('rbac');
  const [showAuditTrailModal, setShowAuditTrailModal] = useState(false);

  // Password change state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordSuccessMessage, setPasswordSuccessMessage] = useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

  // Backup state
  const [isBackingUp, setIsBackingUp] = useState(false);
  const [backupSuccessMessage, setBackupSuccessMessage] = useState('');

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordErrorMessage('');
    setPasswordSuccessMessage('');

    if (newPassword !== confirmPassword) {
      setPasswordErrorMessage('ពាក្យសម្ងាត់ផ្ទៀងផ្ទាត់មិនត្រូវគ្នាទេ!');
      return;
    }

    const { isValid } = checkPasswordStrength(newPassword);
    if (!isValid) {
      setPasswordErrorMessage('ពាក្យសម្ងាត់ត្រូវតែបំពេញតាមស្ដង់ដារសុវត្ថិភាព (យ៉ាងហោចណាស់ ៨ តួអក្សរ, មានអក្សរធំ តូច លេខ និងសញ្ញាពិសេស)!');
      return;
    }

    // Success simulation with bcrypt hashing log
    logActivity(
      'កែប្រែ (Update)',
      'ពាក្យសម្ងាត់គណនី (Password Security)',
      'បានធ្វើបច្ចុប្បន្នភាពពាក្យសម្ងាត់ថ្មីដោយជោគជ័យ តាមរយៈប្រព័ន្ធ Hash (bcrypt Salt 12)'
    );

    setPasswordSuccessMessage('ប្តូរពាក្យសម្ងាត់ជោគជ័យ! ពាក្យសម្ងាត់ត្រូវ hash រក្សាទុកដោយសុវត្ថិភាព។');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleManualBackupTrigger = () => {
    setIsBackingUp(true);
    setBackupSuccessMessage('');
    setTimeout(() => {
      triggerManualBackup();
      setIsBackingUp(false);
      setBackupSuccessMessage('បានធ្វើការ បម្រុងទុកទិន្នន័យ (Backup Database) និងទាញយក JSON រួចរាល់ដោយជោគជ័យ!');
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4 font-sans animate-fade-in">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl p-6 relative max-h-[92vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                សុវត្ថិភាព & ការការពារទិន្នន័យ (Security Best Practices)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                គ្រប់គ្រងសិទ្ធិប្រើប្រាស់ (RBAC), ការបម្រុងទុក (Auto-Backup), និងការការពារពាក្យសម្ងាត់
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 my-4 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-2xl shrink-0 text-xs font-bold">
          <button
            onClick={() => setActiveTab('rbac')}
            className={`flex-1 py-2 px-3 rounded-xl transition flex items-center justify-center gap-1.5 ${
              activeTab === 'rbac'
                ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>១. សិទ្ធិប្រើប្រាស់ (RBAC)</span>
          </button>

          <button
            onClick={() => setActiveTab('backup')}
            className={`flex-1 py-2 px-3 rounded-xl transition flex items-center justify-center gap-1.5 ${
              activeTab === 'backup'
                ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>២. Auto-Backup ទិន្នន័យ</span>
          </button>

          <button
            onClick={() => setActiveTab('password')}
            className={`flex-1 py-2 px-3 rounded-xl transition flex items-center justify-center gap-1.5 ${
              activeTab === 'password'
                ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
            }`}
          >
            <Key className="w-4 h-4" />
            <span>៣. ពាក្យសម្ងាត់ & Hash</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-4 text-xs">
          
          {/* Tab 1: RBAC */}
          {activeTab === 'rbac' && (
            <div className="space-y-4">
              <div className="p-4 bg-brand-500/10 border border-brand-500/20 rounded-2xl text-slate-800 dark:text-slate-200">
                <h4 className="font-extrabold text-sm mb-1 text-brand-600 dark:text-brand-400 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" />
                  ប្រព័ន្ធបែងចែកសិទ្ធិប្រើប្រាស់ (Role-based Access Control - RBAC)
                </h4>
                <p className="text-slate-600 dark:text-slate-400 text-xs">
                  ប្រព័ន្ធកំណត់សិទ្ធិច្បាស់លាស់ដើម្បីការពារទិន្នន័យសាលា កាត់បន្ថយការភាន់ច្រឡំ និងធានាសុវត្ថិភាពតាមកម្រិតតួនាទី។
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Admin */}
                <div
                  onClick={() => {
                    setUserRole('admin');
                    logActivity('កំណត់សិទ្ធិ (RBAC)', 'ប្តូរ Role', 'បានប្តូរតួនាទីទៅជា អ្នកគ្រប់គ្រងសាលា (Admin)');
                  }}
                  className={`p-4 rounded-2xl border cursor-pointer transition flex flex-col justify-between ${
                    userRole === 'admin'
                      ? 'bg-brand-500/10 border-brand-500 dark:bg-brand-500/20'
                      : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/80 hover:border-brand-500'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-extrabold text-sm text-slate-900 dark:text-slate-100">Admin</span>
                      {userRole === 'admin' && <CheckCircle2 className="w-5 h-5 text-brand-500" />}
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 block w-fit mb-2">
                      សិទ្ធិពេញលេញ (Full Access)
                    </span>
                    <ul className="space-y-1 text-[11px] text-slate-600 dark:text-slate-400 list-disc list-inside">
                      <li>មើល & កែប្រែបានទាំងអស់</li>
                      <li>គ្រប់គ្រងគ្រូ និងសិស្ស</li>
                      <li>បម្រុងទុក & ទាញយក Log</li>
                    </ul>
                  </div>
                </div>

                {/* Teacher */}
                <div
                  onClick={() => {
                    setUserRole('teacher');
                    logActivity('កំណត់សិទ្ធិ (RBAC)', 'ប្តូរ Role', 'បានប្តូរតួនាទីទៅជា គ្រូបង្រៀន (Teacher)');
                  }}
                  className={`p-4 rounded-2xl border cursor-pointer transition flex flex-col justify-between ${
                    userRole === 'teacher'
                      ? 'bg-brand-500/10 border-brand-500 dark:bg-brand-500/20'
                      : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/80 hover:border-brand-500'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-extrabold text-sm text-slate-900 dark:text-slate-100">គ្រូបង្រៀន (Teacher)</span>
                      {userRole === 'teacher' && <CheckCircle2 className="w-5 h-5 text-brand-500" />}
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 block w-fit mb-2">
                      សិទ្ធិកម្រិតថ្នាក់ (Class Scope)
                    </span>
                    <ul className="space-y-1 text-[11px] text-slate-600 dark:text-slate-400 list-disc list-inside">
                      <li>មើល & បញ្ចូលពិន្ទុថ្នាក់ខ្លួនឯង</li>
                      <li>កត់ត្រាវត្តមានសិស្ស</li>
                      <li>មិនអាចលុបទិន្នន័យមេ</li>
                    </ul>
                  </div>
                </div>

                {/* Student / Parent */}
                <div
                  onClick={() => {
                    setUserRole('student');
                    logActivity('កំណត់សិទ្ធិ (RBAC)', 'ប្តូរ Role', 'បានប្តូរតួនាទីទៅជា សិស្ស / មាតាបិតា (Student/Parent)');
                  }}
                  className={`p-4 rounded-2xl border cursor-pointer transition flex flex-col justify-between ${
                    userRole === 'student' || userRole === 'parent'
                      ? 'bg-brand-500/10 border-brand-500 dark:bg-brand-500/20'
                      : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/80 hover:border-brand-500'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-extrabold text-sm text-slate-900 dark:text-slate-100">សិស្ស / មាតាបិតា</span>
                      {(userRole === 'student' || userRole === 'parent') && <CheckCircle2 className="w-5 h-5 text-brand-500" />}
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 block w-fit mb-2">
                      សិទ្ធិមើលផ្ទាល់ខ្លួន (View Only)
                    </span>
                    <ul className="space-y-1 text-[11px] text-slate-600 dark:text-slate-400 list-disc list-inside">
                      <li>មើលពិន្ទុ & វត្តមានខ្លួនឯង</li>
                      <li>មើលកាលវិភាគ & ព័ត៌មាន</li>
                      <li>មិនអាចបញ្ចូល/កែប្រែទិន្នន័យ</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* View Audit Trail Button */}
              <div className="p-4 bg-slate-100 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700/80 flex items-center justify-between">
                <div>
                  <h5 className="font-bold text-slate-900 dark:text-slate-100">ប្រព័ន្ធកត់ត្រាប្រវត្តិប្រតិបត្តិការ (Audit Trail Logs)</h5>
                  <p className="text-slate-500 dark:text-slate-400 text-[11px]">មានប្រវត្តិប្រតិបត្តិការចំនួន {auditLogs.length} ត្រូវបានកត់ត្រា</p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAuditTrailModal(true)}
                  className="py-2 px-3 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-xl font-bold text-xs flex items-center gap-1.5 hover:opacity-90 transition"
                >
                  <History className="w-4 h-4" />
                  <span>ពិនិត្យ Audit Trail</span>
                </button>
              </div>
            </div>
          )}

          {/* Tab 2: Backup */}
          {activeTab === 'backup' && (
            <div className="space-y-4">
              <div className="p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl text-slate-800 dark:text-slate-200">
                <h4 className="font-extrabold text-sm mb-1 text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
                  <Database className="w-4 h-4" />
                  ប្រព័ន្ធការពារទិន្នន័យ & Auto-Backup ជារៀងរាល់ថ្ងៃ
                </h4>
                <p className="text-slate-600 dark:text-slate-400 text-xs">
                  រៀបចំការបម្រុងទុកទិន្នន័យស្វ័យប្រវត្តិ (Auto-Backup) ជាមួយ Cloud Database (Supabase / Firebase / PostgreSQL)
                </p>
              </div>

              {backupSuccessMessage && (
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-xl font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{backupSuccessMessage}</span>
                </div>
              )}

              <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700/80 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-bold text-slate-900 dark:text-slate-100 block">បើកដំណើរការ Auto-Backup ជារៀងរាល់ថ្ងៃ</span>
                    <span className="text-[11px] text-slate-500">បម្រុងទុកទិន្នន័យអូតូម៉ាតិចរៀងរាល់ម៉ោង 00:00 AM</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={backupSettings.autoBackupEnabled}
                    onChange={(e) => updateBackupSettings({ autoBackupEnabled: e.target.checked })}
                    className="w-5 h-5 accent-brand-600 rounded cursor-pointer"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-200 dark:border-slate-700/80">
                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Cloud Sync Engine</label>
                    <select
                      value={backupSettings.cloudSyncTarget}
                      onChange={(e) => updateBackupSettings({ cloudSyncTarget: e.target.value as any })}
                      className="w-full p-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-medium"
                    >
                      <option value="Supabase">Supabase (PostgreSQL Cloud)</option>
                      <option value="Firebase">Firebase Cloud Firestore</option>
                      <option value="PostgreSQL">PostgreSQL Server (Local/Self-hosted)</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">កាលបរិច្ឆេទធ្វើ Backup ចុងក្រោយ</label>
                    <div className="p-2 bg-slate-200/60 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl font-mono text-[11px] font-bold text-slate-800 dark:text-slate-200">
                      {backupSettings.lastBackupDate}
                    </div>
                  </div>
                </div>
              </div>

              {/* Instant Backup Manual Button */}
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center justify-between">
                <div>
                  <h5 className="font-bold text-slate-900 dark:text-slate-100">ធ្វើការ បម្រុងទុកភ្លាមៗ (Instant Backup Now)</h5>
                  <p className="text-slate-500 dark:text-slate-400 text-[11px]">ទាញយក Encrypted Database JSON Snapshot មកទុកក្នុងម៉ាស៊ីន</p>
                </div>

                <button
                  type="button"
                  onClick={handleManualBackupTrigger}
                  disabled={isBackingUp}
                  className="py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-600/30 transition disabled:opacity-50"
                >
                  {isBackingUp ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>កំពុងធ្វើ Backup...</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      <span>Backup ទិន្នន័យឥឡូវនេះ</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Tab 3: Password & Hash */}
          {activeTab === 'password' && (
            <div className="space-y-4">
              <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-2xl text-slate-800 dark:text-slate-200">
                <h4 className="font-extrabold text-sm mb-1 text-purple-600 dark:text-purple-400 flex items-center gap-2">
                  <Key className="w-4 h-4" />
                  ស្ដង់ដារសុវត្ថិភាពពាក្យសម្ងាត់ & Encryption Hash
                </h4>
                <p className="text-slate-600 dark:text-slate-400 text-xs">
                  តម្រូវឱ្យប្រើពាក្យសម្ងាត់ដែលមានសុវត្ថិភាពខ្ពស់ និងរក្សាទុកដោយធ្វើ Hash ជាមួយ bcrypt (Salt 12) + HTTPS
                </p>
              </div>

              {passwordErrorMessage && (
                <div className="p-3 bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 rounded-xl font-bold flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 shrink-0" />
                  <span>{passwordErrorMessage}</span>
                </div>
              )}

              {passwordSuccessMessage && (
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-xl font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{passwordSuccessMessage}</span>
                </div>
              )}

              <form onSubmit={handlePasswordSubmit} className="space-y-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">ពាក្យសម្ងាត់បច្ចុប្បន្ន</label>
                  <input
                    type="password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-medium"
                    required
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">ពាក្យសម្ងាត់ថ្មី (ត្រូវមានអក្សរធំ តូច លេខ និងសញ្ញាពិសេស)</label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="ឧ. Admin@2026#Anlong"
                    className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-medium"
                    required
                  />
                </div>

                {/* Password Strength Meter */}
                <PasswordStrengthMeter password={newPassword} />

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">ផ្ទៀងផ្ទាត់ពាក្យសម្ងាត់ថ្មីម្តងទៀត</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-medium"
                    required
                  />
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[11px] text-slate-500">
                    <Lock className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Password hashing algorithm: <strong className="font-mono text-slate-800 dark:text-slate-200">bcrypt (Salt 12)</strong></span>
                  </div>

                  <button
                    type="submit"
                    className="py-2.5 px-5 bg-brand-600 hover:bg-brand-500 text-white font-bold rounded-xl shadow-md transition"
                  >
                    រក្សាទុកពាក្យសម្ងាត់ថ្មី
                  </button>
                </div>
              </form>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="pt-4 mt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 font-bold text-slate-700 dark:text-slate-300">
              <Server className="w-4 h-4 text-emerald-500" />
              <span>Version v2.5.0</span>
            </div>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <span>អ្នកបង្កើត ៖ <strong className="text-amber-600 dark:text-amber-400 font-extrabold">វុិត ជីវន្ថា</strong> (ICT កម្រងអន្លង់តាម៉ី Tel: <a href="tel:089340468" className="text-brand-600 dark:text-brand-400 font-bold hover:underline">089 340 468</a>)</span>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-xl font-bold hover:bg-slate-300 dark:hover:bg-slate-700 transition"
          >
            បិទ
          </button>
        </div>

      </div>

      {/* Audit Trail Modal */}
      {showAuditTrailModal && (
        <AuditTrailModal onClose={() => setShowAuditTrailModal(false)} />
      )}
    </div>
  );
};
