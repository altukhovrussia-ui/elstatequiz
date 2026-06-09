export const archetypes = [
  "Арендодатель",
  "Флиппер",
  "Резидент",
  "Портфельный инвестор",
] as const;

export type Archetype = typeof archetypes[number];

export interface Question {
  question: string;
  answers: string[];
  multiSelect?: boolean;
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
  },
  {
    question: "Какова ваша главная цель?",
    answers: [
      "Сдача в аренду",
      "Перепродажа",
      "Для себя",
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
  },
  {
    question: "Какой район рассматриваете?",
    answers: [
      "Семейный",
      "Первая береговая линия",
      "Центр",
      "Район не важен",
    ],
  },
];

// Scoring matrix
// Each answer gives points to: [Арендодатель, Флиппер, Резидент, Портфельный инвестор]
const scoringMatrix: number[][][] = [
  // Q1: Бюджет (multi-select — all selected answers contribute)
  [
    [2, 2, 0, 0],  // до $300K — rental or flip entry-level
    [2, 1, 1, 1],  // $300K–700K — versatile mid-range
    [1, 0, 2, 2],  // $700K–1.5M — residential or portfolio
    [0, 0, 2, 3],  // от $1.5M — premium residential or portfolio
  ],
  // Q2: Цель (primary driver)
  [
    [4, 0, 0, 1],  // Сдача в аренду → Арендодатель
    [0, 4, 0, 1],  // Перепродажа → Флиппер
    [0, 0, 4, 0],  // Для себя → Резидент
  ],
  // Q3: Тип недвижимости
  [
    [3, 2, 0, 1],  // Апартаменты — rental/flip friendly
    [1, 0, 3, 1],  // Таунхаус — residential
    [0, 0, 3, 2],  // Вилла — residential/portfolio
    [1, 1, 1, 3],  // Пентхаус — portfolio/premium
  ],
  // Q4: Район
  [
    [1, 0, 3, 0],  // Семейный → Резидент
    [2, 1, 1, 2],  // Первая береговая линия — rental/portfolio
    [1, 3, 0, 2],  // Центр — flip/portfolio
    [1, 1, 1, 3],  // Район не важен → portfolio diversifier
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
