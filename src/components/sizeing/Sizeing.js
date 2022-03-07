import { Dimensions } from "react-native";

export const Size = {
  ws: (percentage) => {
    return Dimensions.get('screen').width * (percentage / 100);
  },
  hs: (percentage) => {
    return Dimensions.get('screen').height * (percentage / 100);
  },
  ww: (percentage) => {
    return Dimensions.get('window').width * (percentage / 100);
  },
  hw: (percentage) => {
    return Dimensions.get('window').height * (percentage / 100);
  },
};