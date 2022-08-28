import { useRecoilState } from 'recoil';
import ChatList from 'src/components/common/ChatList';
import Layout from 'src/components/common/Layout';
import ProductItemList from 'src/components/common/ProductItemList';
import COLORS from 'src/constants/colors';
import MyPageTab from 'src/constants/myPageTab';
import SIZES from 'src/constants/sizes';
import { myPageTabState } from 'src/recoil/atoms/myPageTab';
import { absoluteBottom, flexRow } from 'src/styles/common';
import styled from 'styled-components';

export default function MyPage() {
  const [selectedTab, setSelectedTab] = useRecoilState(myPageTabState);

  return (
    <Layout title="마이페이지">
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
      <Container>
        <MyPageMenu menu={selectedTab} />
      </Container>
    </Layout>
  );
}

const Nav = styled.nav`
  position: fixed;
  ${flexRow};
  width: 100%;
  background: ${COLORS.offWhite};
`;

const NavButton = styled.button`
  position: relative;
  margin: 0 2rem;
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

const Container = styled.div`
  padding-top: ${SIZES.myPageNav};
`;

interface MyPageMenuProps {
  menu: MyPageTab;
}

function MyPageMenu({ menu }: MyPageMenuProps) {
  switch (menu) {
    case MyPageTab.SalesList:
      return <ProductItemList type="sale" />;

    case MyPageTab.Chat:
      return <ChatList />;

    case MyPageTab.WishList:
      return <ProductItemList type="like" />;

    default:
      return <ProductItemList type="sale" />;
  }
}
