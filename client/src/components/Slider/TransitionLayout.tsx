import { useEffect } from 'react';
import { useOutlet } from 'react-router-dom';
import { SLIDER_POSITION } from 'src/constants/sliderPosition';
import { fixedTop } from 'src/styles/common';
import styled from 'styled-components/macro';
import PageSlider from './PageSlider';

export default function TransitionLayout() {
  const newPage = useOutlet();
  const animationCallback = () => {};

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <Animation>
      <PageSlider
        animationCallback={animationCallback}
        pagePosition={SLIDER_POSITION.FROM_RIGHT}
      >
        {newPage}
      </PageSlider>
    </Animation>
  );
}
const Animation = styled.div`
  z-index: 100;
  ${fixedTop};
  left: 0;
  width: 100%;
  height: 100%;
`;
