import { Dimensions } from "react-native";

export default function Util() {}

Util.isPortrait = (): boolean => {
  const dim = Dimensions.get("screen");
  return dim.height >= dim.width;
};
