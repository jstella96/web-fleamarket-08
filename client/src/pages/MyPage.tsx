import { useState } from 'react';
import Layout from 'src/components/common/Layout';
import ProductItemWrapper from 'src/components/common/ProductItemWrapper';
import Chat from 'src/components/menu/Chat';
import COLORS from 'src/constants/colors';
import { absoluteBottom, flexRow } from 'src/styles/common';
import styled from 'styled-components';
enum Menu {
  SalesList = '판매목록',
  Chat = '채팅',
  WishList = '관심목록',
}

export default function MyPage() {
  const [selectedMenu, setSelectedMenu] = useState<Menu>(Menu.SalesList);

  return (
    <Layout title="메뉴">
      <Nav>
        {Object.values(Menu).map((menuName, index) => (
          <NavButton
            key={index}
            className={selectedMenu === menuName ? 'selected' : ''}
            onClick={() => setSelectedMenu(menuName)}
          >
            {menuName}
          </NavButton>
        ))}
      </Nav>
      <MyPageMenu menu={selectedMenu} />
    </Layout>
  );
}

const Nav = styled.nav`
  ${flexRow};

  width: 100%;
  background: ${COLORS.offWhite};
`;

const NavButton = styled.button`
  position: relative;
  margin: 0.1rem 2rem;
  padding: 0.75rem;
  flex: 1;
  transition: border-bottom 0.2s;
  white-space: nowrap;

  &.selected {
    &:after {
      content: '';
      ${absoluteBottom};
      left: 0;
      width: 100%;
      height: 2px;
      background-color: ${COLORS.primary1};
    }
  }
`;

interface MyPageMenuProps {
  menu: Menu;
}

function MyPageMenu({ menu }: MyPageMenuProps) {
  switch (menu) {
    case Menu.SalesList:
      return <ProductItemWrapper type="sale" />;

    case Menu.Chat:
      return <Chat />;

    case Menu.WishList:
      return <ProductItemWrapper type="like" />;

    default:
      return <ProductItemWrapper type="sale" />;
  }
}
