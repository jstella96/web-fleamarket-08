import { useRecoilState } from 'recoil';
import api from 'src/api';
import { userState } from 'src/recoil/atoms/user';
import { Region } from 'src/types';

export const useUserRigionState = () => {
  const [user, setUser] = useRecoilState(userState);

  const changePrimaryRegion = async (regionCode: number) => {
    const primaryRegionCode = getPrimaryRegionCode();
    if (regionCode === primaryRegionCode) return;
    await api.changeUserPrimaryRegion(regionCode);
    setNewUser();
  };

  const deleteRegion = async (regionCode: number) => {
    if (user?.userRegions.length === 1) {
      return;
    }
    await api.deleteUserRegion(regionCode);
    setNewUser();
  };

  //다른곳에 가야할거 같다.
  const setNewUser = async () => {
    const { data: newUser } = await api.getUser();
    setUser(newUser);
  };

  const submitRegion = async (region: Region) => {
    await api.setUserRegion(region.code);
    await setNewUser();
  };
  //이게 selecter
  const getPrimaryRegionCode = () => {
    const primaryRegion = user?.userRegions.find(
      (region) => region.isPrimary === true
    );
    return primaryRegion?.region.code;
  };

  const getPrimaryRegionName = () => {
    if (!user?.userRegions) return '장소';
    const primaryRegion = user?.userRegions.find(
      (region) => region.isPrimary === true
    );
    return primaryRegion?.region.name || '장소';
  };

  return {
    changePrimaryRegion,
    setNewUser,
    deleteRegion,
    submitRegion,
    getPrimaryRegionName,
  };
};
