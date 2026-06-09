export const archetypes = [
  "Рантье",
  "Флиппер",
  "Стратег",
  "Релокант",
] as const;

export type Archetype = typeof archetypes[number];

export interface Question {
  question: string;
  answers: string[];
  images: string[];
}

export const questions: Question[] = [
  {
    question: "Ваш бюджет для инвестиций?",
    answers: [
      "До $300 000",
      "$300 000 – $700 000",
      "$700 000 – $1 500 000",
      "От $1 500 000",
    ],
    images: [
      "/quiz-images/money/300.webp",
      "/quiz-images/money/300-700.webp",
      "/quiz-images/money/700-1500.webp",
      "/quiz-images/money/1500000.webp",
    ],
  },
  {
    question: "Какова ваша главная цель?",
    answers: [
      "Сдача в аренду",
      "Перепродажа",
      "Для себя",
    ],
    images: [
      "/quiz-images/goal/rent.webp",
      "/quiz-images/goal/resale.webp",
      "/quiz-images/goal/self.webp",
    ],
  },
  {
    question: "Какой тип недвижимости вас интересует?",
    answers: [
      "Апартаменты",
      "Таунхаус",
      "Вилла",
      "Пентхаус",
    ],
    images: [
      "/quiz-images/property/apartment.webp",
      "/quiz-images/property/townhouse.webp",
      "/quiz-images/property/villa.webp",
      "/quiz-images/property/penthouse.webp",
    ],
  },
  {
    question: "Какой район рассматриваете?",
    answers: [
      "Семейный",
      "Первая береговая линия",
      "Центр",
      "Район не важен",
    ],
    images: [
      "/quiz-images/area/family.webp",
      "/quiz-images/area/sea.webp",
      "/quiz-images/area/downtown.webp",
      "/quiz-images/area/any.webp",
    ],
  },
];

// PDF guide names per archetype
export const guideNames: Record<Archetype, string> = {
  'Рантье': 'Как выбрать район в Дубае, где квартира будет сдаваться 365 дней в году',
  'Флиппер': '3 жестких маркера проекта с потенциалом роста 25–40% до сдачи ключей',
  'Стратег': '5 маркеров безопасного проекта для защиты капитала и долгосрочного роста',
  'Релокант': 'Как выбрать идеальный дом в ОАЭ',
};

// Scoring matrix based on calculation_new.numbers
// Order: [Рантье, Флиппер, Стратег, Релокант]
const scoringMatrix: number[][][] = [
  // Q1: Бюджет
  [
    [2, 2, 0, 0],  // До $300K
    [2, 2, 1, 1],  // $300K–700K
    [1, 1, 2, 2],  // $700K–1.5M
    [0, 0, 3, 2],  // От $1.5M
  ],
  // Q2: Цель
  [
    [3, 0, 1, 0],  // Сдача в аренду
    [0, 3, 2, 0],  // Перепродажа
    [0, 0, 0, 3],  // Для себя
  ],
  // Q3: Тип недвижимости
  [
    [2, 2, 1, 0],  // Апартаменты
    [1, 0, 1, 2],  // Таунхаус
    [0, 0, 2, 3],  // Вилла
    [0, 1, 3, 0],  // Пентхаус
  ],
  // Q4: Район
  [
    [1, 0, 0, 3],  // Семейный
    [2, 2, 2, 1],  // Первая береговая линия
    [0, 3, 2, 0],  // Центр
    [1, 1, 2, 1],  // Район не важен
  ],
];

export function calculateArchetype(answers: number[]): Archetype {
  const scores = [0, 0, 0, 0]; // one per archetype

  answers.forEach((answerIndex, questionIndex) => {
    const points = scoringMatrix[questionIndex]?.[answerIndex];
    if (points) {
      points.forEach((p, archetypeIndex) => {
        scores[archetypeIndex] += p;
      });
    }
  });

  // Find the archetype with the highest score
  let maxScore = -1;
  let winnerIndex = 0;
  scores.forEach((score, index) => {
    if (score > maxScore) {
      maxScore = score;
      winnerIndex = index;
    }
  });

  return archetypes[winnerIndex];
}
