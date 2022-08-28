import api from 'src/api';
import { Location } from 'src/types';

export const getMyLocation = (callback: (location: Location) => void) => {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { data } = await api.getLocation(
          `${position.coords.longitude},${position.coords.latitude}`
        );
        callback(data);
      },

      (error) => alert('위치 권한이 없습니다.')
    );
  } else {
    alert('위치제공을 지원하지 않는 기기입니다.');
  }
};
