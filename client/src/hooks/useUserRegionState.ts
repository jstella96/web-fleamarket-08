import { useRecoilState, useRecoilValue } from 'recoil';
import api from 'src/api';
import { userState } from 'src/recoil/atoms/user';
import { getPrimaryRegionCode } from 'src/recoil/selectors/user.selector';
import { Region } from 'src/types';

export const useUserRigionState = () => {
  const [user, setUser] = useRecoilState(userState);
  const primaryRegionCode = useRecoilValue(getPrimaryRegionCode)

  const changePrimaryRegion = async (regionCode: number) => {
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

  const setNewUser = async () => {
    const { data: newUser } = await api.getUser();
    setUser(newUser);
  };

  const submitRegion = async (region: Region) => {
    await api.setUserRegion(region.code);
    await setNewUser();
  };

  return {
    changePrimaryRegion,
    setNewUser,
    deleteRegion,
    submitRegion,
  };
};
