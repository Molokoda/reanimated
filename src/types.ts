type Colors = {
  background: string,
  textPrimary: string,
  textSecondary: string,
};

export type SlideType = {
  image: any,
  firstLine: string,
  secondLine: string,
  text: string,
  colors: Colors
};

export type AnimatedContextType = {
  translateContainerX: number
};