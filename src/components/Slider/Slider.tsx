import React, { useEffect } from 'react';
import { StyleSheet, Text } from 'react-native';
import { SliderProps } from './types';
import { deviceScreenWidth, deviceScreenHeight, dataForSlides } from '../../constants';
import { LiquidSwipe, MARGIN_WIDTH, MIN_LEDGE, Side } from '../LiquidSwipe';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { runOnJS, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { useVector, snapPoint } from "react-native-redash";
import { styles } from './Slider.styles';

export const Slider: React.FC<SliderProps> = ({
  next,
  index,
  children: current,
  changeSlide
}) => {
  const activeSide = useSharedValue(Side.NONE);
  const isTransitioningRight = useSharedValue(false);
  const right = useVector(0, deviceScreenHeight / 1.5);
  const slideButtonOpacity = useSharedValue(0);

  useEffect(() => {
    slideButtonOpacity.value = withTiming(1);
  }, [next]);

  const slideContainerAnimated = useAnimatedStyle(() => {
    return{
      opacity: slideButtonOpacity.value
    }
  }, []);

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (event) => {
      slideButtonOpacity.value = withTiming(0);
      if (event.x > deviceScreenWidth - MARGIN_WIDTH) {
        activeSide.value = Side.RIGHT;
      } else {
        activeSide.value = Side.NONE;
      }
    },
    onActive: (event) => {
      if ( activeSide.value === Side.RIGHT ) {
        right.x.value = deviceScreenWidth - event.x;
      }
    },
    onEnd: (event) => {
      if (activeSide.value === Side.RIGHT) {
        const snapPoints = [deviceScreenWidth - MIN_LEDGE, 0];
        const dest = snapPoint(event.x, event.velocityX, snapPoints);
        isTransitioningRight.value = dest === 0;
        right.x.value = withSpring(deviceScreenWidth - dest, { 
          velocity: event.velocityX,
          overshootClamping: isTransitioningRight.value ? true : false,
          restSpeedThreshold: isTransitioningRight.value ? 100 : 0.01,
          restDisplacementThreshold: isTransitioningRight.value ? 100 : 0.01,
        }, () => {
          if (isTransitioningRight.value) {
            runOnJS(changeSlide)();
          } else {
            slideButtonOpacity.value = withTiming(1);
          }
        });
      }
    }
  });

  useEffect(() => {
    right.x.value = withSpring(MIN_LEDGE);
  }, [right, index])

  return(
    <PanGestureHandler onGestureEvent={onGestureEvent}>
      <Animated.View style={StyleSheet.absoluteFill}>
        {current}
        {next && (
          <Animated.View style={[StyleSheet.absoluteFill]}>
            <LiquidSwipe 
              position={right}
            >
              {next}
            </LiquidSwipe>
            <Animated.View
              style={[
                styles.swipeButtonContainer,
                {borderColor: next.props.slide.colors.textSecondary},
                slideContainerAnimated
              ]}
            >
              <Text style={[
                styles.swipeText,
                {color: next.props.slide.colors.textSecondary}
              ]}>
                {'<'}
              </Text>
            </Animated.View>
          </Animated.View>
        )}
        
      </Animated.View>
    </PanGestureHandler>
  )
};
