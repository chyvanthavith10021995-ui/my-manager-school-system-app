import React from 'react';
import { useApp } from '../../context/AppContext';
import { BookOpen } from 'lucide-react';

export const LibraryManagement: React.FC = () => {
  const { libraryBooks } = useApp();

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-2xl bg-brand-500/10 text-brand-600 flex items-center justify-center">
          <BookOpen className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">គ្រប់គ្រងបណ្ណាល័យ</h2>
          <p className="text-sm text-slate-500">បញ្ជីសៀវភៅ និងការខ្ចីសង</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {libraryBooks.map(book => (
          <div key={book.id} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
            <h3 className="font-bold text-lg text-slate-900 dark:text-white">{book.title}</h3>
            <p className="text-sm text-slate-500 mb-2">កូដ៖ {book.bookCode} | ប្រភេទ៖ {book.category}</p>
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-600 dark:text-slate-400">អ្នកនិពន្ធ៖ {book.author}</span>
              <span className="font-bold text-brand-600 bg-brand-50 px-2 py-1 rounded">មាន {book.availableCopies}/{book.totalCopies}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
