// スキルカテゴリーの定義
const SKILL_CATEGORIES = {
    PROGRAMMING: 'プログラミング',
    DATA_SCIENCE: 'データサイエンス',
    WEB: 'Web開発'
};

// スキルレベルの定義
const SKILL_LEVELS = {
    BEGINNER: { id: 1, name: '初級' },
    INTERMEDIATE: { id: 2, name: '中級' },
    ADVANCED: { id: 3, name: '上級' }
};

const skillsData = [
    {
        category: SKILL_CATEGORIES.PROGRAMMING,
        name: 'JavaScript',
        level: SKILL_LEVELS.INTERMEDIATE.id,
        children: [
            { name: 'React', level: SKILL_LEVELS.INTERMEDIATE.id },
            { name: 'Vue.js', level: SKILL_LEVELS.BEGINNER.id }
        ]
    },
    {
        category: SKILL_CATEGORIES.DATA_SCIENCE,
        name: 'Python',
        level: SKILL_LEVELS.INTERMEDIATE.id,
        children: [
            { name: 'データ分析', level: SKILL_LEVELS.INTERMEDIATE.id },
            { name: '機械学習', level: SKILL_LEVELS.BEGINNER.id }
        ]
    },
    {
        category: SKILL_CATEGORIES.WEB,
        name: 'HTML/CSS',
        level: SKILL_LEVELS.ADVANCED.id,
        children: [
            { name: 'レスポンシブ', level: SKILL_LEVELS.ADVANCED.id },
            { name: 'アニメーション', level: SKILL_LEVELS.INTERMEDIATE.id }
        ]
    }
];

export { skillsData, SKILL_CATEGORIES, SKILL_LEVELS };
