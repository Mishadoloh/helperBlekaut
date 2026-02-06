
export type DishCategory = 'без_вогню' | 'швидко' | 'ситне' | 'термос' | 'десерт';

export interface Dish {
  id: number;
  title: string;
  category: DishCategory;
  time: string;
  ingredients: string[]; // Масив для зв'язку з магазином
  description: string;
  instructions: string;
}

export interface ShopItem {
  id: number;
  name: string;
  price: number;
  category: 'крупи' | 'консерви' | 'бакалія' | 'солодощі';
  desc: string;
}

export interface CartItem extends ShopItem {
  quantity: number;
}

// Fix: Adding missing ChecklistItem interface used in components/Checklist.tsx
export interface ChecklistItem {
  id: number;
  task: string;
  category: string;
}
