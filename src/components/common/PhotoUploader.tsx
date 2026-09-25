import React, { useRef, useState } from 'react';
import { Camera, Upload, Link, X, User } from 'lucide-react';

interface PhotoUploaderProps {
  value: string;
  onChange: (photoUrl: string) => void;
  label?: string;
  placeholderName?: string;
}

export const PhotoUploader: React.FC<PhotoUploaderProps> = ({
  value,
  onChange,
  label = 'រូបថតផ្ទាល់ខ្លួន (Photo)',
  placeholderName = 'សិស្ស / គ្រូ'
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [urlInputValue, setUrlInputValue] = useState('');

  // Handle local image file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('ទំហំរូបថតត្រូវតូចជាង 5MB! (File size must be less than 5MB)');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          onChange(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle image URL submission
  const handleUrlSubmit = () => {
    if (urlInputValue.trim()) {
      onChange(urlInputValue.trim());
      setShowUrlInput(false);
      setUrlInputValue('');
    }
  };

  const presetAvatars = [
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=250&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=250&q=80',
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=250&q=80',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80'
  ];

  return (
    <div className="space-y-2 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80">
      <div className="flex items-center justify-between">
        <label className="font-extrabold text-xs text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
          <Camera className="w-4 h-4 text-brand-500" />
          {label}
        </label>
        {value && (
          <button
            type="button"
            onClick={() => onChange('')}
            className="text-[11px] font-bold text-rose-500 hover:text-rose-600 flex items-center gap-1"
          >
            <X className="w-3.5 h-3.5" /> លុបរូប
          </button>
        )}
      </div>

      <div className="flex items-center gap-4">
        {/* Photo Preview Frame */}
        <div className="relative group shrink-0">
          <div className="w-20 h-20 rounded-2xl overflow-hidden bg-slate-200 dark:bg-slate-700 border-2 border-brand-500/30 dark:border-brand-500/50 shadow-inner flex items-center justify-center">
            {value ? (
              <img
                src={value}
                alt={placeholderName}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80';
                }}
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-slate-400">
                <User className="w-8 h-8" />
                <span className="text-[9px] font-bold mt-1">គ្មានរូប</span>
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="absolute -bottom-1 -right-1 w-7 h-7 rounded-xl bg-brand-600 text-white flex items-center justify-center shadow-md hover:bg-brand-500 transition-colors"
            title="ជ្រើសរើសរូបភាព"
          >
            <Camera className="w-4 h-4" />
          </button>
        </div>

        {/* Upload Controls */}
        <div className="flex-1 space-y-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-brand-500 font-bold text-xs text-slate-700 dark:text-slate-200 flex items-center gap-1.5 shadow-sm transition-all"
            >
              <Upload className="w-3.5 h-3.5 text-brand-500" />
              បញ្ចូលរូបពីកុំព្យូទ័រ / ទូរស័ព្ទ
            </button>

            <button
              type="button"
              onClick={() => setShowUrlInput(!showUrlInput)}
              className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-indigo-500 font-bold text-xs text-slate-700 dark:text-slate-200 flex items-center gap-1.5 shadow-sm transition-all"
            >
              <Link className="w-3.5 h-3.5 text-indigo-500" />
              តាម Link / URL
            </button>
          </div>

          {/* URL Input Bar */}
          {showUrlInput && (
            <div className="flex items-center gap-2 pt-1">
              <input
                type="url"
                value={urlInputValue}
                onChange={(e) => setUrlInputValue(e.target.value)}
                placeholder="https://example.com/photo.jpg"
                className="flex-1 px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="button"
                onClick={handleUrlSubmit}
                className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-sm"
              >
                កំណត់
              </button>
            </div>
          )}

          {/* Presets */}
          <div className="flex items-center gap-1.5 pt-0.5">
            <span className="text-[10px] font-bold text-slate-400">រូបគំរូ៖</span>
            <div className="flex items-center gap-1 overflow-x-auto">
              {presetAvatars.map((url, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => onChange(url)}
                  className={`w-6 h-6 rounded-full overflow-hidden border transition-transform hover:scale-110 ${
                    value === url ? 'ring-2 ring-brand-500 border-white' : 'border-slate-300 dark:border-slate-700'
                  }`}
                >
                  <img src={url} alt={`Preset ${i}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
