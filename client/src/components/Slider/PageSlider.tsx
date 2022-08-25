import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { SLIDER_POSITION } from 'src/constants/sliderPosition';
import styled, { css } from 'styled-components/macro';

interface PageSliderProps {
  children: ReactNode;
  animationCallback: any;
  pagePosition: SLIDER_POSITION;
}

export default function PageSlider({
  children,
  animationCallback,
  pagePosition,
}: PageSliderProps) {
  const [position, setPosition] = useState<SLIDER_POSITION>(
    SLIDER_POSITION.CENTER
  );
  const sliderRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const startAnimation = () => {
      setPosition(pagePosition);
    };

    const onTransitionEnd = (e: any) => {
      if (e.propertyName !== 'transform') return;
      animationCallback();
    };

    if (sliderRef.current) {
      sliderRef.current.addEventListener('transitionend', onTransitionEnd);
      startAnimation();
    }
  }, [children, animationCallback, pagePosition]);

  return (
    <Container ref={sliderRef} pagePosition={pagePosition} position={position}>
      {children}
    </Container>
  );
}

const Container = styled.div<{
  pagePosition: SLIDER_POSITION;
  position: SLIDER_POSITION;
}>`
  background: inherit;
  will-change: transform;
  transition: transform 0.35s;
  ${({ pagePosition }) => {
    switch (pagePosition) {
      case SLIDER_POSITION.TO_LEFT:
        return css`
          transform: translateX(-1px);
        `;
      case SLIDER_POSITION.FROM_RIGHT:
        return css`
          transform: translateX(110%);
        `;
    }
  }}

  ${({ position }) => {
    switch (position) {
      case SLIDER_POSITION.TO_LEFT:
        return css`
          transform: translateX(-110%);
        `;
      case SLIDER_POSITION.FROM_RIGHT:
        return css`
          transform: translateX(0);
        `;
    }
  }}
`;
