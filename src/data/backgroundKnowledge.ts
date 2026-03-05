/**
 * 배경지식 검사 문항 (에피소드 4 완료 후)
 */

export interface BackgroundKnowledgeItem {
  id: string;
  question: string;
  options: [string, string, string, string]; // A, B, C, D
  correctIndex: number; // 0=A, 1=B, 2=C, 3=D
}

export const backgroundKnowledgeItems: BackgroundKnowledgeItem[] = [
  {
    id: "bk1",
    question: "해양 생태계에서 플랑크톤(plankton)은 무엇을 의미하는가?",
    options: [
      "바닷속에 사는 물고기",
      "물속에 떠다니며 생활하는 매우 작은 생물",
      "바다 바닥에서만 사는 생물",
      "큰 포식성 어류",
    ],
    correctIndex: 1,
  },
  {
    id: "bk2",
    question: "다음 중 먹이사슬을 가장 잘 설명한 것은 무엇인가?",
    options: [
      "바다의 온도가 변하는 과정",
      "생물들이 서로 먹고 먹히는 관계로 연결된 구조",
      "물고기가 이동하는 경로",
      "바다의 깊이에 따른 생물 분포",
    ],
    correctIndex: 1,
  },
  {
    id: "bk3",
    question: "먹이사슬에서 포식성 어종은 일반적으로 어떤 특징을 가지는가?",
    options: [
      "주로 식물을 먹는다",
      "큰 몸 크기를 가진다",
      "항상 먹이사슬의 가장 아래에 있다",
      "다른 물고기나 동물을 먹는다",
    ],
    correctIndex: 3,
  },
  {
    id: "bk4",
    question: "해양 환경에서 일부 미세조류가 빠르게 증가하는 현상을 무엇이라고 하는가?",
    options: ["조류 증식", "조류 침식", "산호 형성", "조류 번성"],
    correctIndex: 3,
  },
  {
    id: "bk5",
    question: "신경독소(neurotoxin)는 무엇에 영향을 줄 수 있는 물질인가?",
    options: ["뼈 성장", "근육 크기", "사고 기능", "피부 색"],
    correctIndex: 2,
  },
  {
    id: "bk6",
    question: "다음 중 인간의 기억 형성과 가장 관련이 깊은 뇌 영역은 무엇인가?",
    options: ["소뇌", "해마", "연수", "대뇌"],
    correctIndex: 1,
  },
  {
    id: "bk7",
    question: '다음 중 "생물 농축"을 가장 잘 설명한 것은 무엇인가?',
    options: [
      "생물의 특성이 강화되는 과정",
      "생물이 성장하면서 몸 크기가 커지는 과정",
      "특정 물질이 생물의 몸속에 점차 쌓이는 과정",
      "생물이 새로운 종으로 진화하는 과정",
    ],
    correctIndex: 2,
  },
  {
    id: "bk8",
    question:
      "먹이사슬의 위쪽 단계로 갈수록 어떤 물질의 농도가 더 높아지는 현상을 무엇이라고 하는가?",
    options: ["광합성", "생물 증폭", "산소 교환", "증발"],
    correctIndex: 1,
  },
  {
    id: "bk9",
    question:
      "어떤 물질이 해양 먹이사슬을 따라 이동할 때 농도가 증가하는 이유로 가장 적절한 설명은 무엇인가?",
    options: [
      "해양포식자가 많은 먹이를 섭취하기 때문이다",
      "바다의 온도가 높아지기 때문이다",
      "물고기의 크기가 강해지기 때문이다",
      "물속의 산소가 많아지기 때문이다",
    ],
    correctIndex: 0,
  },
  {
    id: "bk10",
    question: "해양 독소에 노출되는 가장 일반적인 경로는 무엇인가?",
    options: [
      "바닷물을 마시는 것",
      "오염된 해산물을 섭취하는 것",
      "바닷물에 손을 넣는 것",
      "바닷가에 서 있는 것",
    ],
    correctIndex: 1,
  },
];
