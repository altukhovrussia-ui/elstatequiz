import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Lock, ChevronDown } from 'lucide-react';

const archetypeData: Record<string, { emoji: string; traits: string[]; description: string; ideal: string }> = {
  'Рантье': {
    emoji: '🏦',
    traits: ['Стабильность', 'Пассивный доход', 'Долгосрочность'],
    description: 'Ваш фокус — надёжный арендный доход. Вы предпочитаете проверенные локации с гарантированной доходностью от 7% до 10% годовых.',
    ideal: 'Dubai Marina, JLT, Business Bay',
  },
  'Флиппер': {
    emoji: '⚡',
    traits: ['Скорость', 'Высокий ROI', 'Активные сделки'],
    description: 'Вы нацелены на быструю перепродажу объектов на этапе off-plan строительства. Ваш горизонт — до 1-3 лет с максимальной прибылью.',
    ideal: 'Dubailand, JVC, MBR City',
  },
  'Стратег': {
    emoji: '♟️',
    traits: ['Аналитика', 'Потенциал роста', 'Диверсификация'],
    description: 'Вы ищете недооцененные районы с высоким потенциалом роста. Глубокий анализ рынка — ваш главный инструмент.',
    ideal: 'Al Furjan, Dubai South, Ras Al Khaimah',
  },
  'Статусный': {
    emoji: '👑',
    traits: ['Престиж', 'Эксклюзивность', 'Премиум'],
    description: 'Инвестиции для вас — это не только доход, но и статус. Вы выбираете трофейные объекты в лучших локациях мира.',
    ideal: 'Palm Jumeirah, Emirates Hills, Bluewaters',
  },
  'Релокант': {
    emoji: '🌍',
    traits: ['Комфорт', 'ВНЖ', 'Семья'],
    description: 'Ваша цель — переезд и жизнь в ОАЭ. Вы ищете идеальный баланс между комфортом проживания и инвестиционной привлекательностью.',
    ideal: 'Arabian Ranches, Dubai Hills, Mirdif',
  },
  'Диверсификатор': {
    emoji: '📊',
    traits: ['Защита активов', 'Ликвидность', 'Гибкость'],
    description: 'Вы распределяете капитал по разным рынкам для минимизации рисков. ОАЭ — одно из направлений в вашем портфеле.',
    ideal: 'Downtown Dubai, DIFC, Dubai Creek Harbour',
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
  const [formData, setFormData] = useState({ name: '', phone: '', countryCode: '+971', messenger: 'whatsapp' });
  const [phoneError, setPhoneError] = useState('');
  const [showCountryCodes, setShowCountryCodes] = useState(false);
  const data = archetypeData[archetype] || archetypeData['Рантье'];

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
    <div className="min-h-screen flex items-center justify-center p-4 md:p-8 bg-black">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="w-full max-w-lg bg-[#111111] border border-brand-gold/15 overflow-hidden"
      >
        {/* Profile Header */}
        <div className="relative px-8 pt-10 pb-8 text-center bg-gradient-to-b from-brand-gold/[0.06] to-transparent">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-brand-gold/10 border-2 border-brand-gold/30 flex items-center justify-center">
            <span className="text-5xl">{data.emoji}</span>
          </div>
          <span className="text-brand-gold text-xs tracking-[0.3em] uppercase block mb-3 font-medium">
            Ваш архетип инвестора
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-light text-white leading-tight">
            {archetype}
          </h2>
        </div>

        {/* Traits badges */}
        <div className="flex flex-wrap justify-center gap-2 px-8 pb-6">
          {data.traits.map((trait, i) => (
            <span key={i} className="px-4 py-1.5 border border-brand-gold/20 text-brand-gold text-[11px] tracking-wider uppercase font-medium">
              {trait}
            </span>
          ))}
        </div>

        {/* Profile description */}
        <div className="px-8 pb-6">
          <p className="text-white/70 text-sm leading-relaxed font-light text-center">{data.description}</p>
        </div>

        {/* Blurred teaser */}
        <div className="px-8 pb-6">
          <div className="relative overflow-hidden p-5 border border-brand-gold/10 bg-white/[0.02]">
            <div className="flex items-center gap-3 mb-3">
              <MapPin className="w-4 h-4 text-brand-gold" />
              <span className="text-white/50 text-xs uppercase tracking-wider font-medium">Идеальные локации</span>
            </div>
            <p className="text-white/30 text-sm font-light blur-[6px] select-none pointer-events-none">
              {data.ideal} — с прогнозируемой доходностью 8-12% годовых и потенциалом роста капитализации до 30% за 3 года.
            </p>
            <div className="absolute inset-0 flex items-center justify-center bg-black/30">
              <div className="flex items-center gap-2 text-brand-gold/80">
                <Lock className="w-4 h-4" />
                <span className="text-xs tracking-wider uppercase font-medium">Доступно после заполнения</span>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full h-px bg-brand-gold/10" />

        {/* Lead form */}
        <div className="px-8 py-8">
          <h3 className="text-center font-serif text-xl text-white font-light mb-2">Откройте полный профиль</h3>
          <p className="text-center text-xs text-white/40 mb-8 font-light">Оставьте контакт — мы подберём проекты именно под ваш архетип</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <input
              type="text"
              placeholder="Ваше Имя"
              required
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
              className="w-full border-b border-white/15 py-3 bg-transparent placeholder:text-white/30 focus:outline-none focus:border-brand-gold transition-colors text-white font-light text-sm"
            />

            {/* Phone with country code */}
            <div>
              <div className="flex items-center gap-0 border-b border-white/15 focus-within:border-brand-gold transition-colors">
                {/* Country code selector */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowCountryCodes(!showCountryCodes)}
                    className="flex items-center gap-1 py-3 pr-3 text-white/70 text-sm hover:text-white transition-colors bg-transparent !rounded-none"
                  >
                    <span>{formData.countryCode}</span>
                    <ChevronDown className="w-3 h-3" />
                  </button>
                  {showCountryCodes && (
                    <div className="absolute bottom-full left-0 mb-1 bg-[#1a1a1a] border border-white/10 max-h-48 overflow-y-auto z-50 w-40 no-scrollbar">
                      {countryCodes.map(cc => (
                        <button
                          key={cc.code}
                          type="button"
                          onClick={() => {
                            setFormData({...formData, countryCode: cc.code});
                            setShowCountryCodes(false);
                          }}
                          className="w-full text-left px-4 py-2.5 text-sm text-white/70 hover:bg-white/5 hover:text-white transition-colors flex items-center justify-between bg-transparent !rounded-none"
                        >
                          <span>{cc.country}</span>
                          <span className="text-white/40 text-xs">{cc.code}</span>
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
                  className="flex-1 py-3 bg-transparent placeholder:text-white/30 focus:outline-none text-white font-light text-sm"
                />
              </div>
              {phoneError && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-xs mt-2 font-light"
                >
                  {phoneError}
                </motion.p>
              )}
            </div>

            {/* Messenger toggle */}
            <div className="flex gap-8 justify-center mt-1">
              {['whatsapp', 'telegram'].map(m => (
                <label key={m} className="flex items-center gap-3 cursor-pointer group">
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${formData.messenger === m ? 'border-brand-gold' : 'border-white/20 group-hover:border-brand-gold/50'}`}>
                    {formData.messenger === m && <div className="w-2.5 h-2.5 bg-brand-gold rounded-full" />}
                  </div>
                  <input type="radio" name="messenger" value={m} onChange={() => setFormData({...formData, messenger: m})} className="hidden" />
                  <span className={`text-sm capitalize ${formData.messenger === m ? 'text-white' : 'text-white/40'}`}>
                    {m === 'whatsapp' ? 'WhatsApp' : 'Telegram'}
                  </span>
                </label>
              ))}
            </div>

            <button
              type="submit"
              className="w-full mt-3 bg-brand-gold text-black py-4 font-semibold tracking-[0.1em] text-xs uppercase hover:bg-brand-gold-dark transition-colors"
            >
              Получить индивидуальную подборку
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
