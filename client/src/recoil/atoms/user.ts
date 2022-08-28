import { atom, selector } from 'recoil';
import { User } from 'src/types';

export const userState = atom<User | null>({
  key: 'User',
  default: null,
});

export const getPrimaryRegionCode = selector({
  key: 'getPrimaryRegionCode',
  get: ({ get }) => {
    const user = get(userState);
    if (!user?.userRegions) return;
    const primaryRegion = user?.userRegions.find(
      (region) => region.isPrimary === true
    );
    return primaryRegion?.region.code;
  },
});
