import React from 'react';
import { useApp } from '../../context/AppContext';
import { MessageSquareText } from 'lucide-react';

export const ParentMessaging: React.FC = () => {
  const { parentMessages } = useApp();

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center">
          <MessageSquareText className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">ផ្ញើសារជូនអាណាព្យាបាល</h2>
          <p className="text-sm text-slate-500">ការទំនាក់ទំនងរវាងសាលា និងអាណាព្យាបាលសិស្ស</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {parentMessages.map(msg => (
          <div key={msg.id} className="p-4 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-slate-900 dark:text-white">{msg.subject}</h3>
                <span className="text-xs text-slate-500">{msg.sentDate}</span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-3">{msg.message}</p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-xs font-bold">
              <span className="text-slate-500">អត្តលេខសិស្ស៖ {msg.studentId}</span>
              <span className={`px-2 py-1 rounded-full ${
                msg.status === 'បានអាន' ? 'bg-indigo-100 text-indigo-700' :
                msg.status === 'បានផ្ញើ' ? 'bg-emerald-100 text-emerald-700' :
                'bg-slate-100 text-slate-700'
              }`}>
                {msg.status}
              </span>
            </div>
          </div>
        ))}
        {parentMessages.length === 0 && (
          <div className="col-span-full p-10 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl text-center text-slate-500">
            មិនទាន់មានប្រវត្តិនៃការផ្ញើសារទេ
          </div>
        )}
      </div>
    </div>
  );
};
