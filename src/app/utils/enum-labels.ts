import { Category } from '../enums/category';
import { Difficulty } from '../enums/difficulty';

const categoryLabels: Record<Category, string> = {
  [Category.Easy]: 'Saúde',
  [Category.Fitness]: 'Fitness',
  [Category.Nutrition]: 'Nutrição',
  [Category.Sleep]: 'Sono',
  [Category.Mental_Healt]: 'Saúde mental',
  [Category.Study]: 'Estudos',
  [Category.Work]: 'Trabalho',
  [Category.Finance]: 'Finanças',
  [Category.Productivity]: 'Produtividade',
  [Category.Personal_Growth]: 'Crescimento pessoal',
  [Category.Social]: 'Social',
  [Category.Spirituality]: 'Espiritualidade',
  [Category.Hobbies]: 'Hobbies',
  [Category.Self_Care]: 'Autocuidado',
  [Category.Routine]: 'Rotina',
  [Category.Other]: 'Outro',
  [Category.Undefined]: 'Sem categoria',
};

const difficultyLabels: Record<Difficulty, string> = {
  [Difficulty.Easy]: 'Fácil',
  [Difficulty.Medium]: 'Média',
  [Difficulty.Hard]: 'Difícil',
};

export function categoryLabel(category: Category): string {
  return categoryLabels[category];
}

export function difficultyLabel(difficulty: Difficulty): string {
  return difficultyLabels[difficulty];
}
