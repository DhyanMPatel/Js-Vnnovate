import React from 'react';
import useLanguage from '../hooks/useLanguage';

const LanguageToggle: React.FC = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button onClick={toggleLanguage}>
      {language === 'en' ? '切換到中文' : 'Switch to English'}
    </button>
  );
};

export default LanguageToggle;
