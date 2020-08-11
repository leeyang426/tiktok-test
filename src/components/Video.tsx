import React, { useRef } from "react";
import { StyleSheet, useWindowDimensions } from "react-native";
import { Video as RNVideo, VideoProps } from "expo-av";
import Animated, {
  interpolate,
  Extrapolate,
  useCode,
  call,
} from "react-native-reanimated";

import Util from "../utils";

interface Props extends VideoProps {
  index: number;
  currentIndex: Animated.Node<number>;
}

const Video: React.FC<Props> = ({ currentIndex, index, ...props }) => {
  const [dimension, setDimension] = React.useState({ width: 0, height: 0 });
  const { width, height } = useWindowDimensions();
  const videoRef = useRef<RNVideo>(null);

  const opacity = interpolate(currentIndex, {
    inputRange: [index - 1, index, index + 1],
    outputRange: [0.7, 1, 0.7],
    extrapolate: Extrapolate.CLAMP,
  });

  const resizeVideoPlayer = () => {
    if (Util.isPortrait()) {
      setDimension({ width, height: width * 0.56 });
    } else {
      setDimension({ height: height, width: height * 1.77 });
    }
  };

  const onLayout = () => {
    resizeVideoPlayer();
  };

  useCode(
    () =>
      Animated.onChange(
        currentIndex,
        call([currentIndex], ([i]) => {
          if (i === index) {
            videoRef.current!.playAsync();
          } else if (i - 1 === index || i + 1 === index) {
            videoRef
              .current!.stopAsync()
              .then()
              .catch((err) => console.log(err.error));
          }
        })
      ),
    [currentIndex]
  );

  return (
    <Animated.View
      onLayout={onLayout}
      style={[styles.container, { width, height, opacity }]}
    >
      <RNVideo
        ref={videoRef}
        style={{ width: dimension.width, height: dimension.height }}
        {...props}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
});

export default Video;
