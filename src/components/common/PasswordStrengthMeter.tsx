import React from 'react';
import { Check, X, ShieldCheck, ShieldAlert } from 'lucide-react';

interface PasswordStrengthMeterProps {
  password: string;
}

export const checkPasswordStrength = (pwd: string) => {
  const hasMinLength = pwd.length >= 8;
  const hasUpper = /[A-Z]/.test(pwd);
  const hasLower = /[a-z]/.test(pwd);
  const hasNumber = /[0-9]/.test(pwd);
  const hasSpecial = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(pwd);

  const passedCount = [hasMinLength, hasUpper, hasLower, hasNumber, hasSpecial].filter(Boolean).length;

  let score: ' weak' | 'medium' | 'strong' | 'very-strong' = ' weak';
  let percentage = 20;

  if (passedCount >= 5) {
    score = 'very-strong';
    percentage = 100;
  } else if (passedCount >= 4) {
    score = 'strong';
    percentage = 80;
  } else if (passedCount >= 3) {
    score = 'medium';
    percentage = 50;
  } else {
    score = ' weak';
    percentage = 25;
  }

  return {
    hasMinLength,
    hasUpper,
    hasLower,
    hasNumber,
    hasSpecial,
    passedCount,
    score,
    percentage,
    isValid: passedCount >= 4 // Requires at least 4 rules passed for strong security
  };
};

export const PasswordStrengthMeter: React.FC<PasswordStrengthMeterProps> = ({ password }) => {
  if (!password) return null;

  const {
    hasMinLength,
    hasUpper,
    hasLower,
    hasNumber,
    hasSpecial,
    score,
    percentage,
    isValid
  } = checkPasswordStrength(password);

  const getScoreText = () => {
    switch (score) {
      case 'very-strong':
        return { text: 'សុវត្ថិភាពខ្ពស់បំផុត (Very Strong)', color: 'text-emerald-500', bar: 'bg-emerald-500' };
      case 'strong':
        return { text: 'សុវត្ថិភាពល្អ (Strong)', color: 'text-emerald-400', bar: 'bg-emerald-400' };
      case 'medium':
        return { text: 'សុវត្ថិភាពមធ្យម (Medium)', color: 'text-amber-500', bar: 'bg-amber-500' };
      default:
        return { text: 'សុវត្ថិភាពខ្សោយ (Weak)', color: 'text-rose-500', bar: 'bg-rose-500' };
    }
  };

  const status = getScoreText();

  return (
    <div className="p-3 bg-slate-100 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700/80 space-y-2.5 text-xs font-sans">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 font-bold">
          {isValid ? (
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
          ) : (
            <ShieldAlert className="w-4 h-4 text-amber-500" />
          )}
          <span className="text-slate-700 dark:text-slate-300">កម្រិតសុវត្ថិភាពពាក្យសម្ងាត់:</span>
        </div>
        <span className={`font-extrabold ${status.color}`}>{status.text}</span>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-300 ${status.bar}`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Criteria Rules Checklist */}
      <div className="grid grid-cols-2 gap-1.5 pt-1 text-[11px]">
        <div className={`flex items-center gap-1 ${hasMinLength ? 'text-emerald-500 font-semibold' : 'text-slate-400 dark:text-slate-500'}`}>
          {hasMinLength ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
          <span>យ៉ាងហោចណាស់ ៨ តួអក្សរ</span>
        </div>
        <div className={`flex items-center gap-1 ${hasUpper ? 'text-emerald-500 font-semibold' : 'text-slate-400 dark:text-slate-500'}`}>
          {hasUpper ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
          <span>មានអក្សរធំ (A-Z)</span>
        </div>
        <div className={`flex items-center gap-1 ${hasLower ? 'text-emerald-500 font-semibold' : 'text-slate-400 dark:text-slate-500'}`}>
          {hasLower ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
          <span>មានអក្សរតូច (a-z)</span>
        </div>
        <div className={`flex items-center gap-1 ${hasNumber ? 'text-emerald-500 font-semibold' : 'text-slate-400 dark:text-slate-500'}`}>
          {hasNumber ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
          <span>មានលេខ (0-9)</span>
        </div>
        <div className="col-span-2 flex items-center gap-1 text-[11px] font-semibold text-slate-600 dark:text-slate-400">
          <div className={`flex items-center gap-1 ${hasSpecial ? 'text-emerald-500 font-semibold' : 'text-slate-400 dark:text-slate-500'}`}>
            {hasSpecial ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
            <span>មានសញ្ញាពិសេស (!@#$%^&*)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
