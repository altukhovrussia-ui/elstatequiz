import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Lock, ChevronDown, Download, Phone } from 'lucide-react';

const archetypeData: Record<string, { emoji: string; traits: string[]; description: string; features: string[]; expectedReturn: string }> = {
  'Арендодатель': {
    emoji: '🏦',
    traits: ['Стабильность', 'Пассивный доход', 'Долгосрочность'],
    description: 'Ваш фокус — надёжный арендный доход. Вы предпочитаете проверенные локации с гарантированной доходностью.',
    features: ['Доходность 7–10% годовых', 'Локации: Dubai Marina, JLT, Business Bay', 'Срок окупаемости: 10–14 лет', 'Минимальное управление через агента'],
    expectedReturn: '7–10% годовых',
  },
  'Флиппер': {
    emoji: '⚡',
    traits: ['Скорость', 'Высокий ROI', 'Активные сделки'],
    description: 'Вы нацелены на быструю перепродажу объектов на этапе строительства для максимальной прибыли.',
    features: ['ROI 20–40% за 1–3 года', 'Локации: Dubailand, JVC, MBR City', 'Off-plan объекты с рассрочкой', 'Быстрый выход из актива'],
    expectedReturn: '20–40% за цикл',
  },
  'Резидент': {
    emoji: '🌍',
    traits: ['Комфорт', 'ВНЖ', 'Семья'],
    description: 'Ваша цель — жизнь в ОАЭ. Вы ищете баланс между комфортом и инвестиционной привлекательностью.',
    features: ['ВНЖ при покупке от $205 000', 'Локации: Arabian Ranches, Dubai Hills', 'Инфраструктура: школы, парки, медицина', 'Потенциал роста капитала 15–25%'],
    expectedReturn: '15–25% рост капитала',
  },
  'Портфельный инвестор': {
    emoji: '📊',
    traits: ['Диверсификация', 'Премиум', 'Гибкость'],
    description: 'Вы распределяете капитал по разным типам объектов и рынкам для максимальной защиты и роста.',
    features: ['Микс аренды и перепродажи', 'Локации: Downtown, DIFC, Palm Jumeirah', 'Портфель из 2–4 объектов', 'Совокупная доходность 12–18%'],
    expectedReturn: '12–18% совокупно',
  },
};

const countryCodes = [
  { code: '+971', country: '🇦🇪 UAE' },
  { code: '+7', country: '🇷🇺 RU' },
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
  const [formData, setFormData] = useState({ name: '', phone: '', countryCode: '+971', contactMethod: 'whatsapp' });
  const [phoneError, setPhoneError] = useState('');
  const [showCountryCodes, setShowCountryCodes] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const data = archetypeData[archetype] || archetypeData['Арендодатель'];

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
    setSubmitted(true);
  };

  const handleDownload = () => {
    // After download, proceed to handoff
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
        {/* Profile Header */}
        <div className="relative px-6 md:px-8 pt-6 md:pt-10 pb-5 md:pb-8 text-center bg-gradient-to-b from-brand-gold/[0.06] to-transparent">
          <div className="w-16 h-16 md:w-24 md:h-24 mx-auto mb-4 md:mb-6 rounded-full bg-brand-gold/10 border-2 border-brand-gold/30 flex items-center justify-center">
            <span className="text-3xl md:text-5xl">{data.emoji}</span>
          </div>
          <span className="text-brand-gold text-[10px] md:text-xs tracking-[0.3em] uppercase block mb-2 md:mb-3 font-medium">
            Ваш профиль инвестора
          </span>
          <h2 className="font-serif text-3xl md:text-5xl font-light text-black leading-tight">
            {archetype}
          </h2>
        </div>

        {/* Traits badges */}
        <div className="flex flex-wrap justify-center gap-1.5 md:gap-2 px-5 md:px-8 pb-4 md:pb-6">
          {data.traits.map((trait, i) => (
            <span key={i} className="px-3 md:px-4 py-1 md:py-1.5 border border-brand-gold/20 text-brand-gold text-[10px] md:text-[11px] tracking-wider uppercase font-medium rounded-full">
              {trait}
            </span>
          ))}
        </div>

        {/* Description */}
        <div className="px-5 md:px-8 pb-4 md:pb-6">
          <p className="text-black/60 text-xs md:text-sm leading-relaxed font-light text-center">{data.description}</p>
        </div>

        {/* Blurred features — hidden until form submitted */}
        <div className="px-5 md:px-8 pb-4 md:pb-6">
          <div className="relative overflow-hidden p-4 md:p-5 border border-brand-gold/10 bg-brand-beige-light/50 rounded-lg">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-black/40 text-xs uppercase tracking-wider font-medium">Характеристики и доходность</span>
            </div>
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, filter: 'blur(10px)' }}
                animate={{ opacity: 1, filter: 'blur(0px)' }}
                transition={{ duration: 0.8 }}
              >
                <ul className="space-y-2">
                  {data.features.map((f, i) => (
                    <li key={i} className="text-black/70 text-sm font-light flex items-start gap-2">
                      <span className="text-brand-gold mt-0.5">•</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 pt-3 border-t border-brand-gold/10">
                  <span className="text-xs text-brand-gray uppercase tracking-wider">Ожидаемая доходность: </span>
                  <span className="text-sm font-semibold text-brand-gold">{data.expectedReturn}</span>
                </div>
              </motion.div>
            ) : (
              <>
                <div className="space-y-2">
                  {data.features.map((f, i) => (
                    <p key={i} className="text-black/20 text-sm font-light blur-[6px] select-none pointer-events-none">{f}</p>
                  ))}
                </div>
                <div className="absolute inset-0 flex items-center justify-center bg-white/40 backdrop-blur-[2px]">
                  <div className="flex items-center gap-2 text-brand-gold/80">
                    <Lock className="w-4 h-4" />
                    <span className="text-xs tracking-wider uppercase font-medium">Заполните форму для доступа</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="w-full h-px bg-black/5" />

        {/* Form or Download */}
        {!submitted ? (
          <div className="px-5 md:px-8 py-5 md:py-8">
            <h3 className="text-center font-serif text-lg md:text-xl text-black font-light mb-1 md:mb-2">Скачайте карточку профиля</h3>
            <p className="text-center text-[10px] md:text-xs text-black/40 mb-5 md:mb-8 font-light">Оставьте контакт — получите полный профиль с рекомендациями</p>

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

              {/* Contact method toggle — WhatsApp, Telegram, Call */}
              <div className="flex gap-4 md:gap-8 justify-center mt-1 flex-wrap">
                {[
                  { id: 'whatsapp', label: 'WhatsApp' },
                  { id: 'telegram', label: 'Telegram' },
                  { id: 'call', label: 'Звонок' },
                ].map(m => (
                  <label key={m.id} className="flex items-center gap-2 md:gap-3 cursor-pointer group">
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${formData.contactMethod === m.id ? 'border-brand-gold' : 'border-black/15 group-hover:border-brand-gold/50'}`}>
                      {formData.contactMethod === m.id && <div className="w-2.5 h-2.5 bg-brand-gold rounded-full" />}
                    </div>
                    <input type="radio" name="contactMethod" value={m.id} onChange={() => setFormData({...formData, contactMethod: m.id})} className="hidden" />
                    <span className={`text-xs md:text-sm ${formData.contactMethod === m.id ? 'text-black' : 'text-black/35'}`}>
                      {m.id === 'call' && <Phone className="w-3 h-3 inline mr-1" />}
                      {m.label}
                    </span>
                  </label>
                ))}
              </div>

              <button
                type="submit"
                className="w-full mt-3 bg-brand-gold text-white px-4 py-4 font-semibold tracking-normal md:tracking-[0.1em] text-[11px] md:text-xs uppercase hover:bg-brand-gold-dark transition-colors rounded-lg"
              >
                Получить карточку профиля
              </button>
            </form>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="px-5 md:px-8 py-6 md:py-8 text-center"
          >
            <h3 className="font-serif text-lg md:text-xl text-black font-light mb-2">Ваша карточка готова!</h3>
            <p className="text-[10px] md:text-xs text-black/40 mb-6 font-light">Скачайте карточку с полным описанием вашего профиля и рекомендациями</p>

            <button
              onClick={handleDownload}
              className="w-full max-w-xs mx-auto flex items-center justify-center gap-2 bg-black text-white px-6 py-4 font-semibold tracking-[0.1em] text-xs uppercase hover:bg-zinc-800 transition-colors rounded-lg"
            >
              <Download className="w-4 h-4" />
              Скачать карточку
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
