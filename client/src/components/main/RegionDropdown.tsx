import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { MapPin } from 'src/assets/icons';
import { useUserRigionState } from 'src/hooks/useUserRegionState';
import { userState } from 'src/recoil/atoms/user';
import { getPrimaryRegionName } from 'src/recoil/selectors/user.selector';
import { getRegionName } from 'src/utils/region';
import { Dropdown, DropdownBody, DropdownHeader } from '../common/Dropdown';

export default function RegionDropdown() {
  const primaryRegionName = useRecoilValue(getPrimaryRegionName);
  const user = useRecoilValue(userState);
  const { changePrimaryRegion } = useUserRigionState();
  return (
    <Dropdown>
      <DropdownHeader>
        <MapPin />
        {primaryRegionName}
      </DropdownHeader>
      <DropdownBody>
        {user!.userRegions.map(({ region }) => {
          return (
            <button
              key={region.code}
              onClick={() => changePrimaryRegion(region.code)}
            >
              {getRegionName(region.name)}
            </button>
          );
        })}
        <Link to="/region">내 동네 설정하기</Link>
      </DropdownBody>
    </Dropdown>
  );
}
