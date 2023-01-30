import React, { useState } from 'react';
import { Slide } from '../../components/Slide';
import { dataForSlides } from '../../constants';
import { Slider } from '../../components/Slider';

export const MainScreen = () => {
  const [index, setIndex] = useState(0);
  const next = dataForSlides[index === dataForSlides.length - 1 ? 0 : index + 1];
  const changeSlide = () => {
    if ( index === dataForSlides.length - 1) {
      setIndex(0);
    } else {
      setIndex(index + 1);
    }
  }
  return(
    <Slider
      key={index}
      index={index}
      changeSlide={changeSlide}
      next={next && <Slide slide={next} />}
    >
      <Slide slide={dataForSlides[index]} />
    </Slider>
  )
};
