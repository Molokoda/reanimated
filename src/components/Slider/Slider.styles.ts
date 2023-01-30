import { StyleSheet } from "react-native";
import { deviceScreenHeight } from "../../constants";

export const styles = StyleSheet.create({
  swipeButtonContainer: {
    position: 'absolute',
    top: deviceScreenHeight / 1.5 - 20,
    right: 5,
    paddingHorizontal: 15,
    paddingVertical: 10, 
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    borderWidth: 1,
  },
  swipeText: {
    fontSize: 18
  },
});