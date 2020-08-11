import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View, useWindowDimensions } from "react-native";
import Animated, { divide } from "react-native-reanimated";
import { useValue, onScrollEvent } from "react-native-redash";

import Video from "./src/components/Video";

type Slide = {
  url: string;
};

const slides: Slide[] = [
  {
    url:
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  },
  {
    url:
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
  },
  {
    url:
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
  },
  {
    url:
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  },
];

export default function App() {
  const { height } = useWindowDimensions();
  const y = useValue(0);
  const onScroll = onScrollEvent({ y });
  const currentIndex = divide(y, height);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Animated.ScrollView
        snapToInterval={height}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        bounces={false}
        scrollEventThrottle={1}
        {...{ onScroll }}
        style={{ flex: 1 }}
      >
        {slides.map(({ url }, index) => {
          return (
            <Video
              key={index}
              source={{ uri: url }}
              isLooping
              {...{ currentIndex, index }}
            />
          );
        })}
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
