import { ReactElement } from "react"
import { SlideProps } from "../Slide/types"

export type SliderProps = {
  children: ReactElement<SlideProps>,
  index?: number,
  changeSlide: () => void,
  prev?: ReactElement<SlideProps>,
  next?: ReactElement<SlideProps>,
}