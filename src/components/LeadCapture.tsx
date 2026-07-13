import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronDown, Lock, FileText, CreditCard } from 'lucide-react';
import { guideNames } from '../data';
import type { Archetype } from '../data';
import elstateLogo from '../assets/elstate-logo.svg';

const countryCodes = [
  { code: '+7', country: '🇷🇺 RU' },
  { code: '+971', country: '🇦🇪 UAE' },
  { code: '+1', country: '🇺🇸 US' },
  { code: '+44', country: '🇬🇧 UK' },
  { code: '+49', country: '🇩🇪 DE' },
  { code: '+33', country: '🇫🇷 FR' },
  { code: '+86', country: '🇨🇳 CN' },
  { code: '+91', country: '🇮🇳 IN' },
  { code: '+90', country: '🇹🇷 TR' },
  { code: '+966', country: '🇸🇦 SA' },
  { code: '+380', country: '🇺🇦 UA' },
  { code: '+375', country: '🇧🇾 BY' },
  { code: '+77', country: '🇰🇿 KZ' },
  { code: '+998', country: '🇺🇿 UZ' },
];

export function LeadCapture({ archetype, onSubmit }: { archetype: string; onSubmit: () => void }) {
  const [formData, setFormData] = useState({ name: '', phone: '', countryCode: '+7' });
  const [phoneError, setPhoneError] = useState('');
  const [showCountryCodes, setShowCountryCodes] = useState(false);

  const guideName = guideNames[archetype as Archetype] || guideNames['Рантье'];

  const validatePhone = (phone: string): boolean => {
    const digitsOnly = phone.replace(/[\s\-\(\)]/g, '');
    if (digitsOnly.length < 7 || digitsOnly.length > 15) return false;
    if (!/^\d+$/.test(digitsOnly)) return false;
    return true;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^\d\s\-\(\)]/g, '');
    setFormData({...formData, phone: value});
    if (phoneError && value.length > 0) {
      setPhoneError(validatePhone(value) ? '' : 'Неверный номер телефона');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePhone(formData.phone)) {
      setPhoneError('Неверный номер телефона');
      return;
    }
    setPhoneError('');
    onSubmit();
  };

  return (
    <div className="h-[100dvh] flex items-start md:items-center justify-center bg-brand-beige-light overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="w-full max-w-lg bg-white border border-black/8 shadow-xl overflow-hidden my-2 md:my-8 mx-4 rounded-xl"
      >
        {/* Status Header */}
        <div className="relative px-5 md:px-8 pt-6 md:pt-10 pb-5 md:pb-8 text-center bg-gradient-to-b from-brand-gold/[0.06] to-transparent">
          <img src={elstateLogo} alt="Elstate" className="h-5 md:h-6 mx-auto mb-4" />
          <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl text-black font-bold uppercase leading-snug">
            Вы — {archetype}
          </h2>
        </div>

        {/* Description */}
        <div className="px-5 md:px-8 pb-4 md:pb-6">
          <p className="text-black/70 text-xs md:text-sm leading-relaxed font-light text-center">
            Анализ ваших ответов завершен. Узнайте, какая стратегия на рынке недвижимости Дубая принесёт вам максимальную доходность в текущем цикле
          </p>
        </div>

        {/* Unlock items */}
        <div className="px-5 md:px-8 pb-5 md:pb-6">
          <p className="text-center text-xs md:text-sm text-black/70 font-medium mb-4">
            Оставьте свои контакты, чтобы моментально разблокировать:
          </p>
          <div className="flex flex-col gap-3">
            {/* Item 1: Personal Card */}
            <div className="relative flex items-center gap-4 py-5 md:py-6 px-4 md:px-5 border border-brand-gold/20 rounded-xl overflow-hidden shadow-sm">
              <div 
                className="absolute inset-0 bg-[url('/bg/bg-1.webp')] bg-cover bg-center blur-[2px] scale-[1.03]"
              />
              <div className="absolute inset-0 bg-black/40" />

              <div className="relative z-10 w-10 h-10 md:w-12 md:h-12 flex-shrink-0 rounded-xl bg-white/10 backdrop-blur-md shadow-sm border border-white/20 flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-brand-gold" />
              </div>
              <div className="relative z-10 flex-1 min-w-0">
                <p className="text-sm md:text-base font-bold text-white leading-snug">Персональная карточка инвестора</p>
                <p className="text-[11px] md:text-xs text-white/70 mt-1 font-medium leading-snug">«{guideName}»</p>
              </div>
              <div className="relative z-10 flex-shrink-0 ml-1">
                <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-white/10 backdrop-blur-md shadow-sm border border-white/20 flex items-center justify-center">
                  <Lock className="w-3.5 h-3.5 md:w-4 md:h-4 text-brand-gold" />
                </div>
              </div>
            </div>

            {/* Item 2: General Projects Card */}
            <div className="relative flex items-center gap-4 py-5 md:py-6 px-4 md:px-5 border border-brand-gold/20 rounded-xl overflow-hidden shadow-sm">
              <div 
                className="absolute inset-0 bg-[url('/bg/bg-2.webp')] bg-cover bg-center blur-[2px] scale-[1.03]"
              />
              <div className="absolute inset-0 bg-black/40" />

              <div className="relative z-10 w-10 h-10 md:w-12 md:h-12 flex-shrink-0 rounded-xl bg-white/10 backdrop-blur-md shadow-sm border border-white/20 flex items-center justify-center">
                <FileText className="w-5 h-5 text-brand-gold" />
              </div>
              <div className="relative z-10 flex-1 min-w-0">
                <p className="text-sm md:text-base font-bold text-white leading-snug">Специальный PDF-Гайд</p>
                <p className="text-[11px] md:text-xs text-white/70 mt-1 font-medium leading-snug">«Проекты-лидеры для инвестиций - Июль 2026»</p>
              </div>
              <div className="relative z-10 flex-shrink-0 ml-1">
                <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-white/10 backdrop-blur-md shadow-sm border border-white/20 flex items-center justify-center">
                  <Lock className="w-3.5 h-3.5 md:w-4 md:h-4 text-brand-gold" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full h-px bg-black/5" />

        {/* Broker message */}
        <div className="px-5 md:px-8 pt-5 md:pt-6">
          <p className="text-center text-xs md:text-sm text-black/70 font-light leading-relaxed">
            Совсем скоро с вами свяжется наш брокер с <span className="font-bold">ИНДИВИДУАЛЬНОЙ</span> подборкой под ваш запрос
          </p>
        </div>

        {/* Form */}
        <div className="px-5 md:px-8 py-5 md:py-8">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <input
              type="text"
              placeholder="Ваше Имя"
              required
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
              className="w-full border-b border-black/10 py-3 bg-transparent placeholder:text-black/30 focus:outline-none focus:border-brand-gold transition-colors text-black font-light text-sm"
            />

            {/* Phone with country code */}
            <div>
              <div className="flex items-center gap-0 border-b border-black/10 focus-within:border-brand-gold transition-colors">
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowCountryCodes(!showCountryCodes)}
                    className="flex items-center gap-1 py-3 pr-3 text-black/50 text-sm hover:text-black transition-colors bg-transparent !rounded-none"
                  >
                    <span>{formData.countryCode}</span>
                    <ChevronDown className="w-3 h-3" />
                  </button>
                  {showCountryCodes && (
                    <div className="absolute bottom-full left-0 mb-1 bg-white border border-black/10 shadow-lg max-h-48 overflow-y-auto z-50 w-40 rounded-lg no-scrollbar">
                      {countryCodes.map(cc => (
                        <button
                          key={cc.code}
                          type="button"
                          onClick={() => {
                            setFormData({...formData, countryCode: cc.code});
                            setShowCountryCodes(false);
                          }}
                          className="w-full text-left px-4 py-2.5 text-sm text-black/60 hover:bg-brand-beige-light hover:text-black transition-colors flex items-center justify-between bg-transparent !rounded-none"
                        >
                          <span>{cc.country}</span>
                          <span className="text-black/30 text-xs">{cc.code}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <input
                  type="tel"
                  placeholder="Номер телефона"
                  required
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  onBlur={() => {
                    if (formData.phone && !validatePhone(formData.phone)) {
                      setPhoneError('Неверный номер телефона');
                    }
                  }}
                  className="flex-1 py-3 bg-transparent placeholder:text-black/30 focus:outline-none text-black font-light text-sm"
                />
              </div>
              {phoneError && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-xs mt-2 font-light"
                >
                  {phoneError}
                </motion.p>
              )}
            </div>

            <button
              type="submit"
              className="w-full mt-2 bg-brand-gold text-white px-4 py-4 font-semibold tracking-normal md:tracking-[0.1em] text-[11px] md:text-xs uppercase hover:bg-brand-gold-dark transition-colors rounded-lg"
            >
              Разблокировать материалы
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
