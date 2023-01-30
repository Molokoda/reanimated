import { StyleSheet } from "react-native";
import { deviceScreenWidth, deviceScreenHeight } from "../../constants";

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    flex: 1,
    padding: 32,
    paddingTop: 64,
    paddingBottom: 128,
    justifyContent: 'space-between',
    width: deviceScreenWidth,
    minHeight: deviceScreenHeight * 0.95,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
  imageContainer: {
    width: 250,
    height: 220,
    alignSelf: 'center',
  },
  image: {
    borderRadius: 50,
    alignSelf: 'center'
  },
  firstLine: {
    fontSize: 30,
    marginBottom: 5
  },
  secondLine: {
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 20
  },
  swipeButtonContainer: {
    position: 'absolute',
    right: 20,
    bottom: 250,
    width: 50,
    height: 50,
    borderRadius: 50,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
