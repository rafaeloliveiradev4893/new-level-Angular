export const Category = {
    Easy: 'HEALTH',          // Saúde física
    Fitness: 'FITNESS',         // Exercícios
    Nutrition: 'NUTRITION',       // Alimentação
    Sleep: 'SLEEP',            // Sono
    Mental_Healt: 'MENTAL_HEALTH',   // Saúde mental / bem-estar
    Study: 'STUDY',            // Estudos
    Work: 'WORK',             // Trabalho / carreira
    Finance: 'FINANCE',         // Finanças
    Productivity: 'PRODUCTIVITY',     // Produtividade
    Personal_Growth: 'PERSONAL_GROWTH',  // Desenvolvimento pessoal
    Social: 'SOCIAL',           // Vida social / relacionamentos
    Spirituality: 'SPIRITUALITY',     // Espiritualidade
    Hobbies: 'HOBBIES',          // Hobbies
    Self_Care: 'SELF_CARE',        // Autocuidado
    Routine: 'ROUTINE',          // Hábitos de rotina
    Other: 'OTHER',            // Outros
    Undefined: 'UNDEFINED'         // Sem Categoria
} as const;

export type Category = typeof Category[keyof typeof Category];
