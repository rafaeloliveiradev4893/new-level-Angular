import { Injectable, signal } from '@angular/core';
import { Category } from '../enums/category';
import { Difficulty } from '../enums/difficulty';

export interface XpReward {
  amount: number;
  attribute: string;
}

const xpByDifficulty: Record<Difficulty, number> = {
  [Difficulty.Easy]: 10,
  [Difficulty.Medium]: 20,
  [Difficulty.Hard]: 40,
};

const attributeByCategory: Record<Category, string> = {
  [Category.Easy]: 'Constituição',
  [Category.Fitness]: 'Força',
  [Category.Nutrition]: 'Constituição',
  [Category.Sleep]: 'Constituição',
  [Category.Mental_Healt]: 'Sabedoria',
  [Category.Study]: 'Inteligência',
  [Category.Work]: 'Inteligência',
  [Category.Finance]: 'Inteligência',
  [Category.Productivity]: 'Destreza',
  [Category.Personal_Growth]: 'Sabedoria',
  [Category.Social]: 'Carisma',
  [Category.Spirituality]: 'Sabedoria',
  [Category.Hobbies]: 'Destreza',
  [Category.Self_Care]: 'Constituição',
  [Category.Routine]: 'Destreza',
  [Category.Other]: 'Sabedoria',
  [Category.Undefined]: 'Sabedoria',
};

@Injectable({ providedIn: 'root' })
export class XpNotification {
  reward = signal<XpReward | null>(null);
  private dismissTimer: ReturnType<typeof setTimeout> | undefined;

  show(category: Category, difficulty: Difficulty): void {
    this.reward.set({
      amount: xpByDifficulty[difficulty],
      attribute: attributeByCategory[category],
    });
    this.resetDismissTimer();
  }

  dismiss(): void {
    if (this.dismissTimer) {
      clearTimeout(this.dismissTimer);
      this.dismissTimer = undefined;
    }
    this.reward.set(null);
  }

  private resetDismissTimer(): void {
    if (this.dismissTimer) {
      clearTimeout(this.dismissTimer);
    }
    this.dismissTimer = setTimeout(() => this.dismiss(), 5000);
  }
}
