export const archetypes = [
  "Рантье",
  "Флиппер",
  "Стратег",
  "Статусный",
  "Релокант",
  "Диверсификатор"
] as const;

export type Archetype = typeof archetypes[number];

export interface Question {
  question: string;
  answers: string[];
}

export const questions: Question[] = [
  {
    question: "Ваш бюджет для инвестиций?",
    answers: [
      "До $300 000",
      "$300 000 – $700 000",
      "$700 000 – $1 500 000",
      "От $1 500 000"
    ]
  },
  {
    question: "Ваша главная цель?",
    answers: [
      "Пассивный доход",
      "Перепродажа и заработок",
      "Релокация / жизнь в ОАЭ",
      "Диверсификация капитала"
    ]
  },
  {
    question: "Горизонт инвестиции?",
    answers: [
      "До 1 года",
      "От 1 до 3 лет",
      "От 3 до 5 лет",
      "От 10 лет и дольше"
    ]
  },
  {
    question: "Что для вас важнее всего?",
    answers: [
      "Стабильность",
      "Максимальная доходность",
      "Престиж и статус",
      "Ликвидность (быстро продать если нужно)"
    ]
  },
  {
    question: "Какой у вас стиль жизни?",
    answers: [
      "Городской ритм",
      "Море и тишина",
      "Бизнес-среда",
      "Семья и комфорт"
    ]
  }
];

// Scoring matrix from archetypes.xlsx
// Each entry: [Рантье, Флиппер, Стратег, Статусный, Релокант, Диверсификатор]
const scoringMatrix: number[][][] = [
  // Q1: Бюджет
  [
    [1, 2, 0, 0, 0, 0], // до $300K
    [1, 0, 0, 0, 0, 2], // $300K–700K
    [0, 0, 2, 0, 1, 0], // $700K–1.5M
    [0, 0, 1, 3, 0, 0], // от $1.5M
  ],
  // Q2: Цель
  [
    [3, 0, 0, 0, 0, 0], // Пассивный доход
    [0, 3, 0, 0, 0, 0], // Перепродажа
    [0, 0, 0, 0, 3, 0], // Переезд
    [0, 0, 2, 0, 0, 2], // Диверсификация
  ],
  // Q3: Горизонт
  [
    [0, 3, 0, 0, 0, 0], // до 1 года
    [0, 1, 0, 0, 0, 2], // 1–3 года
    [0, 0, 2, 1, 0, 0], // 3–5 лет
    [3, 0, 1, 0, 0, 0], // 10+ лет
  ],
  // Q4: Приоритет
  [
    [2, 0, 0, 0, 1, 0], // Стабильность
    [0, 3, 0, 0, 0, 0], // Максимальная доходность
    [0, 0, 0, 3, 0, 0], // Престиж
    [0, 1, 0, 0, 0, 2], // Ликвидность
  ],
  // Q5: Стиль жизни
  [
    [0, 1, 0, 2, 0, 0], // Городской ритм
    [2, 0, 0, 0, 0, 0], // Море и тишина
    [0, 0, 2, 0, 0, 1], // Бизнес-среда
    [0, 0, 0, 0, 3, 0], // Семья и комфорт
  ],
];

export function calculateArchetype(answers: number[]): Archetype {
  const scores = [0, 0, 0, 0, 0, 0]; // one per archetype

  answers.forEach((answerIndex, questionIndex) => {
    const points = scoringMatrix[questionIndex][answerIndex];
    points.forEach((p, archetypeIndex) => {
      scores[archetypeIndex] += p;
    });
  });

  // Find the archetype with the highest score
  let maxScore = 0;
  let winnerIndex = 0;
  scores.forEach((score, index) => {
    if (score > maxScore) {
      maxScore = score;
      winnerIndex = index;
    }
  });

  return archetypes[winnerIndex];
}
