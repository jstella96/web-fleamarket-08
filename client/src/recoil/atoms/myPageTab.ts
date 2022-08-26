import { atom } from 'recoil';
import MyPageTab from 'src/constants/myPageTab';

export const myPageTabState = atom<MyPageTab>({
  key: 'myPageTab',
  default: MyPageTab.SalesList,
});
