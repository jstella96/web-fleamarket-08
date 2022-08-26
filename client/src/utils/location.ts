import { KaKaoRegion } from 'src/types';

export const getMyLocation = (callback: (result: any, status: any) => void) => {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        searchAddrFromCoords(
          position.coords.latitude,
          position.coords.longitude,
          callback
        );
      },
      (error) => alert('위치 권한이 없습니다.')
    );
  } else {
    alert('위치제공을 지원하지 않는 기기입니다.');
  }
};

export const fillterRegion = (result: KaKaoRegion[], status: string) => {
  for (var i = 0; i < result.length; i++) {
    // 법정동의 region_type 값은 'B'
    if (result[i].region_type === 'B') {
      const region = result[i].region_3depth_name;
      return region;
    }
    return '';
  }
};

// 좌표로 행정동 주소 정보를 요청
const searchAddrFromCoords = (
  lat: number,
  lng: number,
  callback: (result: KaKaoRegion[], status: string) => void
) => {
  const geocoder = new window.kakao.maps.services.Geocoder();
  geocoder.coord2RegionCode(lng, lat, callback);
};
