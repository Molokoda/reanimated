import { Dimensions } from "react-native";
import { first, second } from "./assets";

export const dataForSlides = [
  {
    image: first,
    firstLine: 'For',
    secondLine: 'GAMERS',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sit amet dui mauris. Sed sit amet libero quis sapien egestas sagittis imperdiet et augue.',
    colors: {
      background: 'white',
      textPrimary: 'black',
      textSecondary: 'black'
    }
  },
  {
    image: second,
    firstLine: 'Online',
    secondLine: 'GAMBLING',
    text: 'Donec lobortis auctor accumsan. Sed imperdiet libero ut fermentum auctor. Aenean quis augue felis. Nunc suscipit eleifend turpis, ac semper erat.',
    colors: {
      background: '#4F015E',
      textPrimary: '#FF5D83',
      textSecondary: 'white'
    }
  },
];

export const deviceScreenWidth = Dimensions.get('screen').width;
export const deviceScreenHeight = Dimensions.get('screen').height;