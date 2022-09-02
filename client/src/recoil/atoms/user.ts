import { atom } from 'recoil';
import { User } from 'src/types';

export const userState = atom<User | null>({
  key: 'User',
  default: null,
});

