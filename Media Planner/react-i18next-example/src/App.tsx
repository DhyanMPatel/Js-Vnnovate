import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const App: React.FC = () => {
  const { t, i18n } = useTranslation('common');

  const changeLang = (newLang: string) => {
    console.log(`Switching to language: ${newLang}`);
    i18n.changeLanguage(newLang);
    console.log('Current language:', i18n.language);
    console.log('Current translations:', i18n.getDataByLanguage(newLang));
    console.log('Translation for welcome:', t('welcome'));
  };

  useEffect(() => {
    console.log('Current translations after language change:', i18n.getDataByLanguage(i18n.language));
  }, [i18n]);

  return (
    <>
      <div className="container">
        <h1>{t('welcome')}</h1>
        <div className="button-container">
          <button onClick={() => changeLang('en')}>Switch to English</button>
          <button onClick={() => changeLang('tw')}>切換到正體中文</button>
          <button onClick={() => changeLang('cn')}>切换到简体中文</button>
        </div>
      </div>
    </>
  );
};

export default App;
