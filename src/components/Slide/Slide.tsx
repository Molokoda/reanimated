import React, { useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import { styles } from './Slide.styles';
import { SlideProps } from './types';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';

export const Slide: React.FC<SlideProps> = ({slide}) => {
  const imageWidth = useSharedValue(180);
  const imageHeight = useSharedValue(160);

  const imageAnimdatedStyles = useAnimatedStyle(() => {
    return{
      width: imageWidth.value,
      height: imageHeight.value
    }
  }, []);

  useEffect(() => {
    imageWidth.value = withSpring(240);
    imageHeight.value = withSpring(200);
  }, [slide]);

  return(
    <View style={[styles.container, {backgroundColor: slide.colors.background}]}>
      <View style={styles.headerContainer}>
        <Text style={{color: slide.colors.textSecondary}}>GameCoin</Text>
        <Text style={{color: slide.colors.textPrimary}}>Skip</Text>
      </View>
      <View style={styles.imageContainer}>
       <Animated.Image style={[styles.image, imageAnimdatedStyles]} source={slide.image}/>
      </View>
      <View>
        <Text style={[styles.firstLine, {color: slide.colors.textPrimary}]}>{slide.firstLine}</Text>
        <Text style={[styles.secondLine, {color: slide.colors.textPrimary}]}>{slide.secondLine}</Text>
        <View>
          <Text style={{color: slide.colors.textSecondary}}>{slide.text}</Text>
        </View>
      </View>
    </View>
  )
};