import { useState } from 'react';
import Layout from 'src/components/common/Layout';
import Chat from 'src/components/menu/Chat';
import SalesList from 'src/components/menu/SalesList';
import WishList from 'src/components/menu/WishList';
enum Menu {
  SalesList,
  Chat,
  WishList,
}
export default function MyPage() {
  const [menu, setMenu] = useState<Menu>(Menu.SalesList);
  return (
    <Layout title="메뉴">
      <nav>
        <button onClick={() => setMenu(Menu.SalesList)}>판매목록</button>
        <button onClick={() => setMenu(Menu.Chat)}>채팅</button>
        <button onClick={() => setMenu(Menu.WishList)}>관심목록</button>
      </nav>
      <MyPageMenu menu={menu} />
    </Layout>
  );
}

interface MyPageMenuProps {
  menu: Menu;
}

function MyPageMenu({ menu }: MyPageMenuProps) {
  switch (menu) {
    case Menu.SalesList:
      return <SalesList />;

    case Menu.Chat:
      return <Chat />;

    case Menu.WishList:
      return <WishList />;

    default:
      return <SalesList />;
  }
}
