import { selector } from "recoil";
import { getRegionName } from "src/utils/region";
import { userState } from "../atoms/user";

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
  
  export const getPrimaryRegionName = selector({
    key: 'getPrimaryRegionName',
    get: ({ get }) => {
      const user = get(userState);
      if (!user?.userRegions) return '로그인해주세요';
      const primaryRegion = user?.userRegions.find(
        (region) => region.isPrimary === true
      );
      return getRegionName(primaryRegion?.region.name) || '동네를 설정해주세요';
    },
  });