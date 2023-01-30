import React from 'react';
import { StyleSheet } from 'react-native';
import { LiquidSwipeProps } from './types';
import MaskedView from "@react-native-community/masked-view";
import { Svg, Path } from 'react-native-svg';
import Animated, { useAnimatedProps } from 'react-native-reanimated';
import { deviceScreenHeight, deviceScreenWidth } from '../../constants';
import { MARGIN_WIDTH, MIN_LEDGE } from './constants';
import { Vector, clamp } from "react-native-redash";

const AnimatedPath = Animated.createAnimatedComponent(Path);

const vec2 = (x: number, y: number) => {
  "worklet";
  return { x, y };
};

const curve = (c1: Vector, c2: Vector, to: Vector) => {
  "worklet";
  return `C ${c1.x} ${c1.y} ${c2.x} ${c2.y} ${to.x} ${to.y}`;
}

export const LiquidSwipe: React.FC<LiquidSwipeProps> = ({
  children,
  position,
}) => {
  const R = clamp(position.x.value, MARGIN_WIDTH - MIN_LEDGE, deviceScreenWidth / 3);
  const animatedProps = useAnimatedProps(() => {
    const stepX = R / 2;
    const stepY = Math.max(position.x.value, MARGIN_WIDTH - MIN_LEDGE);
    const C =  R * 0.5522847498;

    const p1 = vec2(position.x.value, position.y.value - 2 * stepY);
    const p2 = vec2(p1.x + stepX, p1.y + stepY);
    const p3 = vec2(p2.x + stepX, p2.y + stepY);
    const p4 = vec2(p3.x - stepX, p3.y + stepY);
    const p5 = vec2(p4.x - stepX, p4.y + stepY);

    const c21 = vec2(p1.x, p1.y + C);
    const c22 = vec2(p2.x, p2.y); 

    const c31 = vec2(p2.x, p2.y);
    const c32 = vec2(p3.x, p3.y - C); 

    const c41 = vec2(p3.x, p3.y + C);
    const c42 = vec2(p4.x, p4.y); 

    const c51 = vec2(p4.x, p4.y);
    const c52 = vec2(p5.x, p5.y - C); 

    const d = [
      "M 0 0",
      `H ${p1.x}`,
      `V ${p1.y}`,
      curve(c21, c22, p2),
      curve(c31, c32, p3),
      curve(c41, c42, p4),
      curve(c51, c52, p5),
      `V ${deviceScreenHeight}`,
      'H 0',
      'Z'
    ];
    return {
      d: d.join(" "), 
    }
  });

  return(
    <MaskedView style = {StyleSheet.absoluteFill} maskElement={
      <Svg
        style={[
          StyleSheet.absoluteFill,
          {
            transform: [{ rotateY: "180deg"}],
          },
        ]}
      >
        <AnimatedPath
          fill={"black"}
          animatedProps={animatedProps}
        />
      </Svg>
    }>
      {children}
    </MaskedView>
  );
};