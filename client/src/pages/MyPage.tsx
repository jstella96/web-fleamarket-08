import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import ChatList from 'src/components/common/ChatList';
import Layout from 'src/components/common/Layout';
import ProductItemWrapper from 'src/components/common/ProductItemWrapper';
import COLORS from 'src/constants/colors';
import MyPageTab from 'src/constants/myPageTab';
import { myPageTabState } from 'src/recoil/atoms/myPageTab';
import { absoluteBottom, flexRow } from 'src/styles/common';
import styled from 'styled-components';

export default function MyPage() {
  const [selectedTab, setSelectedTab] = useRecoilState(myPageTabState);

  return (
    <Layout title="메뉴">
      <Nav>
        {Object.values(MyPageTab).map((menuName, index) => (
          <NavButton
            key={index}
            className={selectedTab === menuName ? 'selected' : ''}
            onClick={() => setSelectedTab(menuName)}
          >
            {menuName}
          </NavButton>
        ))}
      </Nav>
      <MyPageMenu menu={selectedTab} />
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
  menu: MyPageTab;
}

function MyPageMenu({ menu }: MyPageMenuProps) {
  switch (menu) {
    case MyPageTab.SalesList:
      return <ProductItemWrapper type="sale" />;

    case MyPageTab.Chat:
      return <ChatList />;

    case MyPageTab.WishList:
      return <ProductItemWrapper type="like" />;

    default:
      return <ProductItemWrapper type="sale" />;
  }
}
