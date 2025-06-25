import React from 'react';

const TabletMenu = ({ sections, onSelect, language = 'en', onLanguageChange }) => {
    const headerText = {
        en: 'What We Offer',
        tr: 'Hizmetlerimiz',
        ru: 'Наши Услуги',
        de: 'Unsere Angebote'
    };


    return (
        <div className="w-screen h-screen bg-[#f5f2f0] text-[#3b2e26] p-8 font-sans relative">
            {/* 🌍 Dil Seçimi */}
            <div className="absolute top-6 right-6 flex gap-2">
                {/* {['en', 'tr', 'ru'].map((langCode) => (
                    <button
                        key={langCode}
                        onClick={() => onLanguageChange(langCode)}
                        className={`px-3 py-1 rounded ${language === langCode ? 'bg-[#976a4d] text-white' : 'bg-white text-[#976a4d]'
                            } border border-[#976a4d] transition`}
                    >
                        {langCode === 'en' ? 'English' : langCode === 'tr' ? 'Türkçe' : 'Русский'}
                    </button>
                ))} */}
                {['en', 'tr', 'ru', 'de'].map((langCode) => (
                    <button
                        key={langCode}
                        onClick={() => onLanguageChange(langCode)}
                        className={`px-3 py-1 rounded ${language === langCode ? 'bg-[#976a4d] text-white' : 'bg-white text-[#976a4d]'
                            } border border-[#976a4d] transition`}
                    >
                        {langCode === 'en'
                            ? 'English'
                            : langCode === 'tr'
                                ? 'Türkçe'
                                : langCode === 'ru'
                                    ? 'Русский'
                                    : 'Deutsch'}
                    </button>
                ))}

            </div>

            {/* Başlık */}
            <h2 className="text-3xl font-bold text-[#976a4d] mb-6 border-b border-[#976a4d]/40">
                {headerText[language]}
            </h2>

            {/* Liste */}
            <ul className="space-y-4 text-lg">
                {sections.map((section, index) => (
                    <li
                        key={index}
                        onClick={() => onSelect(index)}
                        className="cursor-pointer px-5 py-3 rounded-lg bg-white shadow
              hover:bg-[#976a4d]/10 active:bg-[#976a4d]/20 focus:bg-[#976a4d]/20
              transition outline-none"
                        tabIndex={0}
                    >
                        {section.title[language]}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TabletMenu;