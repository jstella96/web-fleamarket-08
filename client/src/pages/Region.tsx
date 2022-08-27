import Layout from 'src/components/common/Layout';
import RegionSelect from 'src/components/region/RegionSelect';

export default function Region() {
  return (
    <Layout title="내 동네 설정하기">
      <RegionSelect />
    </Layout>
  );
}
