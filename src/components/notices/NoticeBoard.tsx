import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import type { Announcement } from '../../types';
import { PrintHeader, PrintFooter } from '../common/PrintHeader';
import {
  Megaphone,
  Calendar,
  Plus,
  Clock,
  MapPin,
  User,
  Printer
} from 'lucide-react';

export const NoticeBoard: React.FC = () => {
  const { announcements, events, addAnnouncement, userRole, language } = useApp();
  const [showAddModal, setShowAddModal] = useState(false);

  // Form state
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<Announcement['category']>('ការសិក្សា');
  const [priority, setPriority] = useState<Announcement['priority']>('ខ្ពស់');
  const [targetAudience] = useState<Announcement['targetAudience']>('ទាំងអស់');

  const handlePostAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    addAnnouncement({
      title,
      content,
      category,
      priority,
      targetAudience,
      author: userRole === 'admin' ? 'គណៈគ្រប់គ្រងសាលា' : 'លោកគ្រូអ្នកគ្រូ',
      role: userRole === 'admin' ? 'ការិយាល័យរដ្ឋបាល' : 'គ្រូបង្រៀន'
    });

    setTitle('');
    setContent('');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 no-print">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100">
            {language === 'km' ? 'ព័ត៌មាន & កាលវិភាគព្រឹត្តិការណ៍សាលា' : 'Notices & Event Calendar'}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {language === 'km' ? 'សេចក្តីជូនដំណឹងសាលាបឋមសិក្សា ព័ត៌មានអាទិភាព និងកម្មវិធីប្រឡង' : 'Campus bulletins, priority announcements, and academic events'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-md transition-all"
          >
            <Printer className="w-4 h-4" /> {language === 'km' ? 'បោះពុម្ភសេចក្តីជូនដំណឹង' : 'Print Bulletins'}
          </button>

          {(userRole === 'admin' || userRole === 'teacher') && (
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-brand-600 to-indigo-600 text-white font-bold text-xs rounded-xl shadow-md hover:from-brand-500 hover:to-indigo-500 transition-all self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" /> {language === 'km' ? 'ចុះផ្សាយព័ត៌មានថ្មី' : 'Post Announcement'}
            </button>
          )}
        </div>
      </div>
      {/* Printable Notice Section */}
      <div className="hidden print:block">
        <PrintHeader
          title="សេចក្តីជូនដំណឹង និងកាលវិភាគព្រឹត្តិការណ៍សាលា"
          subtitle="សាលាបឋមសិក្សា អន្លង់តាម៉ី (MoEYS)"
          dateInfo={`ថ្ងៃខែឆ្នាំ ៖ ${new Date().toLocaleDateString('km-KH')}`}
        />

        <div className="space-y-6 text-black">
          <h2 className="text-base font-extrabold border-b border-black pb-1">១. សេចក្តីជូនដំណឹងសំខាន់ៗ ៖</h2>
          {announcements.map((ann, i) => (
            <div key={ann.id} className="border border-slate-400 p-4 rounded-lg space-y-2">
              <div className="flex justify-between items-center text-xs font-bold">
                <span>{i + 1}. {ann.title}</span>
                <span>កាលបរិច្ឆេទ ៖ {ann.date}</span>
              </div>
              <p className="text-xs leading-relaxed">{ann.content}</p>
              <p className="text-[11px] font-bold text-slate-700">អ្នកចុះផ្សាយ ៖ {ann.author} ({ann.role}) - ផ្ញើជូន ៖ {ann.targetAudience}</p>
            </div>
          ))}

          <h2 className="text-base font-extrabold border-b border-black pb-1 pt-4">២. កម្មវិធីប្រឡង និងព្រឹត្តិការណ៍សាលា ៖</h2>
          <table className="w-full text-left border-collapse border border-slate-400 text-xs">
            <thead>
              <tr className="bg-slate-100 font-extrabold">
                <th className="p-2 border border-slate-400">កាលបរិច្ឆេទ</th>
                <th className="p-2 border border-slate-400">ឈ្មោះកម្មវិធី/ព្រឹត្តិការណ៍</th>
                <th className="p-2 border border-slate-400">ប្រភេទ</th>
                <th className="p-2 border border-slate-400">ម៉ោង & ទីតាំង</th>
              </tr>
            </thead>
            <tbody>
              {events.map(ev => (
                <tr key={ev.id} className="border border-slate-400">
                  <td className="p-2 border border-slate-400 font-mono font-bold">{ev.date}</td>
                  <td className="p-2 border border-slate-400 font-bold">{ev.title}</td>
                  <td className="p-2 border border-slate-400">{ev.type}</td>
                  <td className="p-2 border border-slate-400">{ev.time} ({ev.location})</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <PrintFooter />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 no-print">
        
        {/* Bulletins Feed (2 columns) */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Megaphone className="w-5 h-5 text-brand-500" /> សេចក្តីជូនដំណឹងសាលាបឋមសិក្សា
          </h3>

          <div className="space-y-4">
            {announcements.map(ann => (
              <div key={ann.id} className="glass-card p-6 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      ann.priority === 'ខ្ពស់' ? 'bg-rose-500/10 text-rose-500 border border-rose-500/20' :
                      ann.priority === 'មធ្យម' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' :
                      'bg-brand-500/10 text-brand-500 border border-brand-500/20'
                    }`}>
                      អាទិភាព៖ {ann.priority}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      {ann.category}
                    </span>
                  </div>
                  <span className="text-xs text-slate-400 font-medium">{ann.date}</span>
                </div>

                <h4 className="text-lg font-extrabold text-slate-900 dark:text-slate-100">{ann.title}</h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{ann.content}</p>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1.5 font-medium">
                    <User className="w-3.5 h-3.5 text-brand-500" /> {ann.author} ({ann.role})
                  </span>
                  <span className="font-semibold text-slate-500 dark:text-slate-400">ផ្ញើជូន៖ {ann.targetAudience}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Event Calendar Sidebar (1 column) */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-purple-500" /> ព្រឹត្តិការណ៍ និងកម្មវិធីប្រឡង
          </h3>

          <div className="space-y-3">
            {events.map(ev => (
              <div key={ev.id} className="glass-card p-5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-purple-500/10 text-purple-600 dark:text-purple-300">
                    {ev.type}
                  </span>
                  <span className="text-xs font-bold text-brand-500">{ev.date}</span>
                </div>

                <h4 className="text-sm font-extrabold text-slate-900 dark:text-slate-100">{ev.title}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">{ev.description}</p>

                <div className="pt-2 text-[11px] text-slate-400 space-y-1">
                  <p className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" /> {ev.time}
                  </p>
                  <p className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-rose-400" /> {ev.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Post Announcement Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl p-6">
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-slate-100 mb-4">ចុះផ្សាយព័ត៌មានសាលា</h3>
            
            <form onSubmit={handlePostAnnouncement} className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">ចំណងជើង</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-medium"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">ខ្លឹមសារ</label>
                <textarea
                  rows={3}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-medium"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">ប្រភេទ</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-medium"
                  >
                    <option value="ការសិក្សា">ការសិក្សា</option>
                    <option value="រដ្ឋបាល">រដ្ឋបាល</option>
                    <option value="កីឡា">កីឡា</option>
                    <option value="កម្មវិធីសាលា">កម្មវិធីសាលា</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">កម្រិតអាទិភាព</label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value as any)}
                    className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-medium"
                  >
                    <option value="ខ្ពស់">ខ្ពស់</option>
                    <option value="មធ្យម">មធ្យម</option>
                    <option value="ធម្មតា">ធម្មតា</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 font-bold text-slate-700 dark:text-slate-300"
                >
                  បោះបង់
                </button>
                <button type="submit" className="px-4 py-2 rounded-xl bg-brand-600 text-white font-bold">
                  ចុះផ្សាយព័ត៌មាន
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
