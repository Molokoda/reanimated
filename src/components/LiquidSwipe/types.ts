import { JSXElementConstructor, ReactElement } from "react";
import Animated from "react-native-reanimated";
import { Vector } from "react-native-redash";
import { SlideType } from "../../types";
import { SlideProps } from "../Slide/types";

export type LiquidSwipeProps = {
  children: ReactElement<SlideProps, string | JSXElementConstructor<any>>,
  position: Vector<Animated.SharedValue<number>>,
};
