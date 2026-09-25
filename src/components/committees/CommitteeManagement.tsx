import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import type { CommitteeMember, CommitteeType } from '../../types';
import { PrintHeader, PrintFooter } from '../common/PrintHeader';
import { PhotoUploader } from '../common/PhotoUploader';
import {
  Building2,
  ShieldCheck,
  Plus,
  Edit3,
  Trash2,
  Eye,
  Printer,
  X,
  Save,
  GraduationCap,
  Briefcase,
  Calendar,
  CheckCircle2,
  UserCheck
} from 'lucide-react';

export const CommitteeManagement: React.FC = () => {
  const { committees, addCommitteeMember, updateCommitteeMember, deleteCommitteeMember, userRole, schoolInfo, language } = useApp();
  
  const [activeCommittee, setActiveCommittee] = useState<CommitteeType>('គគថ');
  const [activeViewMode, setActiveViewMode] = useState<'structure' | 'biography'>('structure');
  
  // Modals state
  const [viewingBioMember, setViewingBioMember] = useState<CommitteeMember | null>(null);
  const [editingMember, setEditingMember] = useState<CommitteeMember | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // Form state
  const [formName, setFormName] = useState('');
  const [formGender, setFormGender] = useState<'ប្រុស' | 'ស្រី'>('ប្រុស');
  const [formRole, setFormRole] = useState('សមាជិក');
  const [formExternalRole, setFormExternalRole] = useState('');
  const [formPhone, setFormPhone] = useState('012 000 000');
  const [formEmail, setFormEmail] = useState('');
  const [formAvatar, setFormAvatar] = useState('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80');
  const [formJoinedYear, setFormJoinedYear] = useState('២០២៥');
  const [formEducation, setFormEducation] = useState('បរិញ្ញាបត្រអប់រំ');
  const [formBiography, setFormBiography] = useState('');
  const [formResponsibilities, setFormResponsibilities] = useState<string>('ចូលរួមប្រជុំប្រចាំត្រីមាស, ជួយសម្របសម្រួលសកម្មភាពសាលារៀន');

  // Filter members by selected committee type (គគថ or គគស)
  const currentMembers = committees
    .filter(m => m.committeeType === activeCommittee)
    .sort((a, b) => a.order - b.order);

  // Leadership levels for hierarchy chart
  const chairman = currentMembers.find(m => m.role.includes('ប្រធាន') && !m.role.includes('អនុ') && !m.role.includes('ក្រុម'));
  const viceChairmen = currentMembers.filter(m => m.role.includes('អនុប្រធាន'));
  const secretarial = currentMembers.filter(m => m.role.includes('លេខាធិការ') || m.role.includes('បេឡាធិការ') || m.role.includes('ប្រធានក្រុម'));
  const otherMembers = currentMembers.filter(m => 
    !m.role.includes('ប្រធាន') && !m.role.includes('អនុប្រធាន') && !m.role.includes('លេខាធិការ') && !m.role.includes('បេឡាធិការ') && !m.role.includes('ប្រធានក្រុម')
  );

  const openEditModal = (member: CommitteeMember) => {
    setEditingMember(member);
    setFormName(member.name);
    setFormGender(member.gender as any);
    setFormRole(member.role);
    setFormExternalRole(member.externalRole);
    setFormPhone(member.phone);
    setFormEmail(member.email || '');
    setFormAvatar(member.avatar);
    setFormJoinedYear(member.joinedYear);
    setFormEducation(member.education);
    setFormBiography(member.biography);
    setFormResponsibilities(member.responsibilities.join('\n'));
  };

  const handleSaveAddEdit = (e: React.FormEvent) => {
    e.preventDefault();
    const respArray = formResponsibilities
      .split('\n')
      .map(r => r.trim())
      .filter(r => r.length > 0);

    if (editingMember) {
      updateCommitteeMember(editingMember.id, {
        name: formName,
        gender: formGender,
        role: formRole,
        externalRole: formExternalRole,
        phone: formPhone,
        email: formEmail,
        avatar: formAvatar,
        joinedYear: formJoinedYear,
        education: formEducation,
        biography: formBiography,
        responsibilities: respArray
      });
      setEditingMember(null);
    } else {
      addCommitteeMember({
        committeeType: activeCommittee,
        name: formName,
        gender: formGender,
        role: formRole,
        externalRole: formExternalRole,
        phone: formPhone,
        email: formEmail,
        avatar: formAvatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',
        joinedYear: formJoinedYear,
        education: formEducation,
        biography: formBiography || `សមាជិកគណៈកម្មាធិការ ${activeCommittee} សាលាបឋមសិក្សា អន្លង់តាម៉ី។`,
        responsibilities: respArray,
        order: currentMembers.length + 1
      });
      setShowAddModal(false);
    }
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-amber-950 via-slate-900 to-indigo-950 p-6 sm:p-8 rounded-3xl border border-amber-800/40 text-white shadow-xl no-print">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-amber-500/20 text-amber-300 border border-amber-400/30 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" /> គណៈកម្មាធិការសាលារៀនស្ដង់ដារ MoEYS
            </span>
            <span className="text-xs text-slate-300">{schoolInfo.schoolName}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            {language === 'km' ? 'រចនាសម្ព័ន្ធ និងជីវប្រវត្តិរូប (គគថ & គគស)' : 'School Committees Structure & Biographies'}
          </h2>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl">
            គ្រប់គ្រងរចនាសម្ព័ន្ធគណៈកម្មាធិការទ្រទ្រង់សាលារៀន (គគថ - SSC) និងគណៈកម្មាធិការគ្រប់គ្រងសាលារៀន (គគស - SMC) ដោយមានតារាងជីវប្រវត្តិរូប និងភារកិច្ចទទួលខុសត្រូវ
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs rounded-xl shadow-md transition-all"
          >
            <Printer className="w-4 h-4" /> បោះពុម្ភរចនាសម្ព័ន្ធ
          </button>

          {userRole === 'admin' && (
            <button
              onClick={() => {
                setEditingMember(null);
                setFormName('');
                setFormRole('សមាជិក');
                setFormExternalRole('');
                setFormBiography('');
                setShowAddModal(true);
              }}
              className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-amber-600 to-indigo-600 hover:from-amber-500 hover:to-indigo-500 text-white font-extrabold text-xs rounded-xl shadow-md transition-all"
            >
              <Plus className="w-4 h-4" /> បន្ថែមសមាជិក {activeCommittee}
            </button>
          )}
        </div>
      </div>

      {/* Main Switcher Bar: គគថ vs គគស & Structure vs Biography */}
      <div className="glass-card p-4 flex flex-col md:flex-row items-center justify-between gap-4 no-print">
        
        {/* Committee Type Switcher */}
        <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 w-full md:w-auto">
          <button
            onClick={() => setActiveCommittee('គគថ')}
            className={`flex-1 md:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black transition-all ${
              activeCommittee === 'គគថ'
                ? 'bg-amber-600 text-white shadow-md shadow-amber-600/30'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
            }`}
          >
            <Building2 className="w-4 h-4" /> គគថ (គណៈកម្មាធិការទ្រទ្រង់សាលារៀន - SSC)
          </button>
          <button
            onClick={() => setActiveCommittee('គគស')}
            className={`flex-1 md:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black transition-all ${
              activeCommittee === 'គគស'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
            }`}
          >
            <UserCheck className="w-4 h-4" /> គគស (គណៈកម្មាធិការគ្រប់គ្រងសាលារៀន - SMC)
          </button>
        </div>

        {/* View Mode Toggle: រចនាសម្ព័ន្ធ (Structure Tree) vs ជីវប្រវត្តរូប (Full Bios Grid) */}
        <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 w-full md:w-auto">
          <button
            onClick={() => setActiveViewMode('structure')}
            className={`flex-1 md:flex-initial flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${
              activeViewMode === 'structure'
                ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-sm'
                : 'text-slate-500 dark:text-slate-400'
            }`}
          >
            🌳 រចនាសម្ព័ន្ធ Hierarchy
          </button>
          <button
            onClick={() => setActiveViewMode('biography')}
            className={`flex-1 md:flex-initial flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${
              activeViewMode === 'biography'
                ? 'bg-white dark:bg-slate-900 text-brand-600 dark:text-brand-400 shadow-sm'
                : 'text-slate-500 dark:text-slate-400'
            }`}
          >
            📖 ជីវប្រវត្តិរូប និងភារកិច្ច ({currentMembers.length} នាក់)
          </button>
        </div>

      </div>

      {/* VIEW MODE 1: Interactive Hierarchy Organizational Chart / Structure */}
      {activeViewMode === 'structure' && (
        <div className="glass-card p-6 sm:p-10 space-y-10 no-print">
          
          <div className="text-center max-w-xl mx-auto space-y-1">
            <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-amber-500/10 text-amber-600 dark:text-amber-400 uppercase tracking-widest">
              Organizational Hierarchy Chart
            </span>
            <h3 className="text-xl font-black text-slate-900 dark:text-slate-100">
              រចនាសម្ព័ន្ធដឹកនាំ {activeCommittee === 'គគថ' ? 'គណៈកម្មាធិការទ្រទ្រង់សាលារៀន (គគថ)' : 'គណៈកម្មាធិការគ្រប់គ្រងសាលារៀន (គគស)'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              តារាងខ្សែរយៈបណ្ដោយ និងការទទួលខុសត្រូវរវាងប្រធាន អនុប្រធាន លេខាធិការ និងសមាជិក
            </p>
          </div>

          {/* Hierarchy Level 1: Chairman / President */}
          {chairman && (
            <div className="flex flex-col items-center relative">
              <div className="w-full max-w-sm glass-card-hover p-5 rounded-3xl border-2 border-amber-500 bg-gradient-to-b from-amber-500/10 via-white dark:via-slate-900 to-amber-500/5 shadow-xl text-center relative group">
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-amber-500 text-white font-black text-[10px] uppercase shadow-md">
                  👑 {chairman.role}
                </div>
                <div className="flex flex-col items-center mt-2">
                  <img src={chairman.avatar} alt={chairman.name} className="w-20 h-20 rounded-full object-cover ring-4 ring-amber-500/40 shadow-lg" />
                  <h4 className="text-lg font-black text-slate-900 dark:text-slate-100 mt-2">{chairman.name}</h4>
                  <p className="text-xs font-bold text-amber-700 dark:text-amber-300 mt-0.5">{chairman.externalRole}</p>
                  <p className="text-[11px] font-mono text-slate-400 mt-1">📞 {chairman.phone}</p>
                  
                  <div className="mt-3 flex items-center justify-center gap-2 pt-2 border-t border-slate-200 dark:border-slate-800 w-full">
                    <button
                      onClick={() => setViewingBioMember(chairman)}
                      className="px-3 py-1.5 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-300 font-extrabold text-[11px] hover:bg-amber-500/20 transition-all flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" /> មើលជីវប្រវត្តិរូប
                    </button>
                    {userRole === 'admin' && (
                      <button
                        onClick={() => openEditModal(chairman)}
                        className="p-1.5 rounded-xl text-slate-400 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-slate-800"
                        title="កែប្រែ"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Connecting Line down */}
              <div className="w-0.5 h-10 bg-gradient-to-b from-amber-500 to-slate-300 dark:to-slate-700" />
            </div>
          )}

          {/* Hierarchy Level 2: Vice Chairmen */}
          {viceChairmen.length > 0 && (
            <div className="space-y-4">
              <div className="flex flex-wrap justify-center gap-6 relative">
                {viceChairmen.map(vc => (
                  <div key={vc.id} className="w-72 glass-card-hover p-4 rounded-2xl border border-indigo-500/40 bg-indigo-50/20 dark:bg-indigo-950/20 shadow-md text-center relative group">
                    <span className="px-2.5 py-0.5 rounded-full bg-indigo-600 text-white font-extrabold text-[10px] inline-block mb-2">
                      ⭐ {vc.role}
                    </span>
                    <div className="flex items-center gap-3">
                      <img src={vc.avatar} alt={vc.name} className="w-14 h-14 rounded-2xl object-cover ring-2 ring-indigo-500/30" />
                      <div className="text-left min-w-0">
                        <h4 className="text-sm font-black text-slate-900 dark:text-slate-100 truncate">{vc.name}</h4>
                        <p className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 truncate">{vc.externalRole}</p>
                        <p className="text-[10px] font-mono text-slate-400">📞 {vc.phone}</p>
                      </div>
                    </div>
                    
                    <div className="mt-3 flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px]">
                      <button
                        onClick={() => setViewingBioMember(vc)}
                        className="text-indigo-600 dark:text-indigo-400 font-extrabold hover:underline flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5" /> ជីវប្រវត្តិរូប
                      </button>
                      {userRole === 'admin' && (
                        <div className="flex items-center gap-1">
                          <button onClick={() => openEditModal(vc)} className="p-1 text-slate-400 hover:text-amber-500">
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="w-0.5 h-10 bg-slate-300 dark:bg-slate-700 mx-auto" />
            </div>
          )}

          {/* Hierarchy Level 3: Secretarial / Tech Leaders */}
          {secretarial.length > 0 && (
            <div className="space-y-4">
              <div className="flex flex-wrap justify-center gap-4">
                {secretarial.map(sec => (
                  <div key={sec.id} className="w-64 glass-card p-4 rounded-2xl border border-slate-200 dark:border-slate-800 text-center">
                    <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-purple-500/10 text-purple-600 dark:text-purple-300 mb-2 inline-block">
                      📌 {sec.role}
                    </span>
                    <div className="flex items-center gap-3 text-left">
                      <img src={sec.avatar} alt={sec.name} className="w-12 h-12 rounded-xl object-cover" />
                      <div className="min-w-0">
                        <h4 className="text-xs font-black text-slate-900 dark:text-slate-100 truncate">{sec.name}</h4>
                        <p className="text-[10px] font-medium text-slate-500 dark:text-slate-400 truncate">{sec.externalRole}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setViewingBioMember(sec)}
                      className="mt-3 w-full py-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-[10px] font-bold transition-all"
                    >
                      មើលជីវប្រវត្តិរូប
                    </button>
                  </div>
                ))}
              </div>
              {otherMembers.length > 0 && <div className="w-0.5 h-10 bg-slate-300 dark:bg-slate-700 mx-auto" />}
            </div>
          )}

          {/* Hierarchy Level 4: Other Members */}
          {otherMembers.length > 0 && (
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
              <h4 className="text-xs font-bold text-slate-400 uppercase text-center mb-4">សមាជិកគណៈកម្មាធិការទាំងអស់</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {otherMembers.map(om => (
                  <div key={om.id} className="glass-card-hover p-4 rounded-2xl flex items-center justify-between">
                    <div className="flex items-center gap-3 min-w-0">
                      <img src={om.avatar} alt={om.name} className="w-12 h-12 rounded-xl object-cover" />
                      <div className="min-w-0">
                        <h5 className="text-xs font-extrabold text-slate-900 dark:text-slate-100 truncate">{om.name}</h5>
                        <p className="text-[10px] text-slate-500 truncate">{om.externalRole}</p>
                        <span className="text-[9px] font-mono text-amber-600 dark:text-amber-400 font-bold">{om.role}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => setViewingBioMember(om)}
                      className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-amber-600"
                      title="មើលជីវប្រវត្តិរូប"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      )}

      {/* VIEW MODE 2: Full Biographies Grid Cards */}
      {activeViewMode === 'biography' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 no-print">
          {currentMembers.map(member => (
            <div key={member.id} className="glass-card-hover p-6 flex flex-col justify-between border-t-4 border-t-amber-500 relative">
              <div>
                {/* Member Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img src={member.avatar} alt={member.name} className="w-16 h-16 rounded-2xl object-cover ring-2 ring-amber-500/30 shadow-md" />
                    <div>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                        {member.role}
                      </span>
                      <h3 className="text-base font-black text-slate-900 dark:text-slate-100 mt-1">
                        {member.name}
                      </h3>
                      <p className="text-xs font-bold text-slate-500 dark:text-slate-400">{member.externalRole}</p>
                    </div>
                  </div>

                  {/* Actions */}
                  {userRole === 'admin' && (
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => openEditModal(member)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-slate-800"
                        title="កែប្រែ"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`លុបសមាជិក ${member.name} ចេញពី ${activeCommittee}?`)) {
                            deleteCommitteeMember(member.id);
                          }
                        }}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-slate-800"
                        title="លុប"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Attributes */}
                <div className="mt-4 space-y-2 text-xs border-t border-b border-slate-100 dark:border-slate-800 py-3">
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                    <GraduationCap className="w-4 h-4 text-purple-500 shrink-0" />
                    <span className="font-bold truncate">{member.education}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 font-mono">
                    <Briefcase className="w-4 h-4 text-amber-500 shrink-0" />
                    <span className="truncate">ចូលរួម ៖ ឆ្នាំ {member.joinedYear}</span>
                  </div>
                </div>

                {/* Biography Excerpt */}
                <div className="mt-3">
                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                    {member.biography}
                  </p>
                </div>

                {/* Responsibilities list */}
                {member.responsibilities.length > 0 && (
                  <div className="mt-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 space-y-1">
                    <p className="text-[10px] font-black text-amber-700 dark:text-amber-400 uppercase">ភារកិច្ចទទួលខុសត្រូវ ៖</p>
                    <ul className="space-y-1">
                      {member.responsibilities.slice(0, 2).map((r, i) => (
                        <li key={i} className="text-[11px] text-slate-700 dark:text-slate-300 flex items-start gap-1.5 font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Card Footer Button */}
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={() => setViewingBioMember(member)}
                  className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Eye className="w-4 h-4" /> មើលជីវប្រវត្តិរូបពេញលេញ
                </button>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* Printable Committee Document (Only visible when printing) */}
      <div className="hidden print:block">
        <PrintHeader
          title={`បញ្ជីរចនាសម្ព័ន្ធ ${activeCommittee === 'គគថ' ? 'គណៈកម្មាធិការទ្រទ្រង់សាលារៀន (គគថ - SSC)' : 'គណៈកម្មាធិការគ្រប់គ្រងសាលារៀន (គគស - SMC)'}`}
          subtitle={`សាលាបឋមសិក្សា អន្លង់តាម៉ី (ឆ្នាំសិក្សា ៖ ${schoolInfo.academicYear})`}
          dateInfo={`កាលបរិច្ឆេទ ៖ ${new Date().toLocaleDateString('km-KH')}`}
        />

        <table className="w-full text-left border-collapse my-4 text-xs">
          <thead>
            <tr className="bg-amber-100 text-amber-950 font-extrabold border border-amber-400">
              <th className="p-2.5 text-center">ល.រ</th>
              <th className="p-2.5">គោត្តនាម - នាម</th>
              <th className="p-2.5 text-center">ភេទ</th>
              <th className="p-2.5">តួនាទីក្នុងគណៈកម្មាធិការ</th>
              <th className="p-2.5">តួនាទី/មុខរបរក្រៅសាលា</th>
              <th className="p-2.5">កម្រិតវប្បធម៌</th>
              <th className="p-2.5 font-mono">លេខទូរស័ព្ទ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-300">
            {currentMembers.map((m, idx) => (
              <tr key={m.id} className="border border-slate-300">
                <td className="p-2.5 text-center font-bold">{idx + 1}</td>
                <td className="p-2.5 font-bold text-slate-900">{m.name}</td>
                <td className="p-2.5 text-center">{m.gender}</td>
                <td className="p-2.5 font-extrabold text-amber-800">{m.role}</td>
                <td className="p-2.5">{m.externalRole}</td>
                <td className="p-2.5">{m.education}</td>
                <td className="p-2.5 font-mono">{m.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <PrintFooter />
      </div>

      {/* MODAL 1: Member Biography Full View Profile Modal */}
      {viewingBioMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-md p-4 overflow-y-auto font-sans">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-6 max-h-[92vh] flex flex-col relative">
            
            <button
              onClick={() => setViewingBioMember(null)}
              className="absolute right-4 top-4 p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Profile Header Card */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
              <img
                src={viewingBioMember.avatar}
                alt={viewingBioMember.name}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl object-cover ring-4 ring-amber-500/30 shadow-xl"
              />
              <div className="text-center sm:text-left space-y-1">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-black bg-amber-500 text-white shadow-sm">
                    {viewingBioMember.role}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    {viewingBioMember.committeeType}
                  </span>
                </div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-slate-100 pt-1">
                  {viewingBioMember.name}
                </h3>
                <p className="text-sm font-bold text-amber-700 dark:text-amber-400">
                  {viewingBioMember.externalRole}
                </p>
                <div className="flex flex-wrap justify-center sm:justify-start gap-4 text-xs text-slate-500 font-mono pt-1">
                  <span>📞 {viewingBioMember.phone}</span>
                  {viewingBioMember.email && <span>✉️ {viewingBioMember.email}</span>}
                </div>
              </div>
            </div>

            {/* Profile Content Body */}
            <div className="flex-1 overflow-y-auto space-y-5 text-xs pr-1">
              
              {/* Detailed Biography Text */}
              <div className="p-4 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-800/40 space-y-2">
                <h4 className="font-extrabold text-sm text-amber-900 dark:text-amber-300 flex items-center gap-2">
                  📖 ជីវប្រវត្តិរូប និងប្រវត្តិសង្ខេប (Biography)
                </h4>
                <p className="text-slate-800 dark:text-slate-200 leading-relaxed font-serif text-sm">
                  {viewingBioMember.biography}
                </p>
              </div>

              {/* Education & Experience */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">កម្រិតវប្បធម៌ / សញ្ញាបត្រ</span>
                  <p className="text-xs font-black text-slate-900 dark:text-slate-100 flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-purple-500" /> {viewingBioMember.education}
                  </p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">ឆ្នាំចូលរួមគណៈកម្មាធិការ</span>
                  <p className="text-xs font-black text-slate-900 dark:text-slate-100 flex items-center gap-2 font-mono">
                    <Calendar className="w-4 h-4 text-amber-500" /> ឆ្នាំ {viewingBioMember.joinedYear}
                  </p>
                </div>
              </div>

              {/* Responsibilities list */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-3">
                <h4 className="font-extrabold text-xs text-slate-800 dark:text-slate-200 uppercase">
                  🎯 ភារកិច្ច និងការទទួលខុសត្រូវ ៖
                </h4>
                <div className="space-y-2">
                  {viewingBioMember.responsibilities.map((resp, i) => (
                    <div key={i} className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-slate-800 dark:text-slate-200 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{resp}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end">
              <button
                onClick={() => setViewingBioMember(null)}
                className="px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-slate-800 text-white font-bold text-xs"
              >
                បិទផ្ទាំង
              </button>
            </div>

          </div>
        </div>
      )}

      {/* MODAL 2: Add / Edit Committee Member Modal */}
      {(showAddModal || editingMember) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-md p-4 overflow-y-auto font-sans">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-5 max-h-[92vh] flex flex-col relative">
            
            <button
              onClick={() => { setShowAddModal(false); setEditingMember(null); }}
              className="absolute right-4 top-4 p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900 dark:text-slate-100">
                  {editingMember ? `កែប្រែសមាជិក ${editingMember.name}` : `បន្ថែមសមាជិក ${activeCommittee} ថ្មី`}
                </h3>
                <p className="text-xs text-slate-400">បំពេញព័ត៌មានរចនាសម្ព័ន្ធ និងជីវប្រវត្តិរូបសមាជិក</p>
              </div>
            </div>

            <form onSubmit={handleSaveAddEdit} className="flex-1 overflow-y-auto space-y-4 pr-1 text-xs">
              
              <PhotoUploader
                value={formAvatar}
                onChange={setFormAvatar}
                label="រូបថតសមាជិក (Member Photo)"
                placeholderName={formName || 'សមាជិក'}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">ឈ្មោះសមាជិក ៖</label>
                  <input
                    type="text"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    required
                    placeholder="ឧ. លោក ចាន់ ធារ៉ា"
                    className="w-full px-3 py-2 font-bold bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">ភេទ ៖</label>
                  <select
                    value={formGender}
                    onChange={(e) => setFormGender(e.target.value as any)}
                    className="w-full px-3 py-2 font-bold bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                  >
                    <option value="ប្រុស">ប្រុស</option>
                    <option value="ស្រី">ស្រី</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">តួនាទីក្នុងគណៈកម្មាធិការ ៖</label>
                  <input
                    type="text"
                    value={formRole}
                    onChange={(e) => setFormRole(e.target.value)}
                    required
                    placeholder="ឧ. ប្រធាន, អនុប្រធាន, លេខាធិការ, សមាជិក"
                    className="w-full px-3 py-2 font-bold bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-amber-700 dark:text-amber-400"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">តួនាទី/មុខរបរក្រៅសាលា ៖</label>
                  <input
                    type="text"
                    value={formExternalRole}
                    onChange={(e) => setFormExternalRole(e.target.value)}
                    required
                    placeholder="ឧ. មេភូមិអន្លង់តាម៉ី, នាយកសាលា"
                    className="w-full px-3 py-2 font-bold bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">លេខទូរស័ព្ទ ៖</label>
                  <input
                    type="text"
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    required
                    className="w-full px-3 py-2 font-mono font-bold bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">កម្រិតវប្បធម៌ ៖</label>
                  <input
                    type="text"
                    value={formEducation}
                    onChange={(e) => setFormEducation(e.target.value)}
                    required
                    placeholder="ឧ. បរិញ្ញាបត្រអប់រំ"
                    className="w-full px-3 py-2 font-bold bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">ជីវប្រវត្តិរូប និងប្រវត្តិសង្ខេប (Biography) ៖</label>
                <textarea
                  value={formBiography}
                  onChange={(e) => setFormBiography(e.target.value)}
                  rows={3}
                  placeholder="សរសេរជីវប្រវត្តិរូបសង្ខេប..."
                  className="w-full p-3 font-medium bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">ភារកិច្ចទទួលខុសត្រូវ (ចុះបន្ទាត់ដើម្បីបំបែក) ៖</label>
                <textarea
                  value={formResponsibilities}
                  onChange={(e) => setFormResponsibilities(e.target.value)}
                  rows={3}
                  placeholder="ភារកិច្ចទី១&#10;ភារកិច្ចទី២"
                  className="w-full p-3 font-medium bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => { setShowAddModal(false); setEditingMember(null); }}
                  className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 font-bold"
                >
                  បោះបង់
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-black shadow-md"
                >
                  <Save className="w-4 h-4" /> រក្សាទុក
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};
