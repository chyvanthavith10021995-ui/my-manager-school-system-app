export const checkPasswordStrength = (pwd: string) => {
  const hasMinLength = pwd.length >= 8;
  const hasUpper = /[A-Z]/.test(pwd);
  const hasLower = /[a-z]/.test(pwd);
  const hasNumber = /[0-9]/.test(pwd);
  const hasSpecial = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(pwd);

  const passedCount = [hasMinLength, hasUpper, hasLower, hasNumber, hasSpecial].filter(Boolean).length;

  let score: 'weak' | 'medium' | 'strong' | 'very-strong' = 'weak';
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
    score = 'weak';
    percentage = 25;
  }

  return {
    hasMinLength,
    hasUpper,
    hasLower,
    hasNumber,
    hasSpecial,
    score,
    percentage,
    passedCount,
    isValid: passedCount >= 4
  };
};
