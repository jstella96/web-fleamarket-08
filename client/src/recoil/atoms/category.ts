import { atom } from 'recoil';
import { Category } from 'src/types';

export const categoryState = atom<Category | null>({
  key: 'Category',
  default: null,
});
