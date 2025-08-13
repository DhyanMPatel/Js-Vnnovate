import { useState, useEffect } from 'react';
import i18n from '../i18n/config';

const useLanguage = () => {
  const [language, setLanguage] = useState<string>('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setLanguage(savedLanguage);
    i18n.changeLanguage(savedLanguage);
  }, []);

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'zh-tw' : 'en';
    console.log('Changing language to:', newLanguage);
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
    i18n.changeLanguage('zh-tw');
    console.log('Current language:', i18n.language); // Check current language
  };


  return { language, toggleLanguage };
};

export default useLanguage;
