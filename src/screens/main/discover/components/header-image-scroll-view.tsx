import React, { useState, useEffect } from "react";
import {
  Animated,
  StyleSheet,
  View,
  Image,
  ScrollView,
  Text,
} from "react-native";

const HeaderImageScrollView = ({
  children,
  headerContent,
}: {
  children: React.ReactNode;
  headerContent?: React.ReactNode;
}) => {
  const [scrollY] = useState(new Animated.Value(0));
  const [isScrolledUp, setIsScrolledUp] = useState(false);
  const [isScrolledDown, setIsScrolledDown] = useState(true);
  const [fadeAnim] = useState(new Animated.Value(0));

  // Adjust these values as needed
  const HEADER_MAX_HEIGHT = 300;
  const HEADER_MIN_HEIGHT = 60;

  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: "clamp",
  });

  useEffect(() => {
    const listener = scrollY.addListener(({ value }) => {
      const scrolledUp = value >= HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
      const scrolledDown = value <= HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
      if (scrolledUp !== isScrolledUp) {
        setIsScrolledUp(scrolledUp);

        Animated.timing(fadeAnim, {
          toValue: scrolledUp ? 1 : 0, // 1 when scrolled up, 0 otherwise
          duration: 10000000000, // Slow fade duration
          useNativeDriver: false,
        }).start();
      }
      if (scrolledDown !== isScrolledDown) {
        setIsScrolledDown(scrolledDown);
      }
    });

    return () => scrollY.removeListener(listener);
  }, [isScrolledUp, fadeAnim, scrollY, isScrolledDown]);

  return (
    <View style={styles.container}>
      <Animated.View style={{ height: headerHeight }}>
        {isScrolledDown && (
          <>
            <Image
              source={require("../../../../../assets/backgrounds/soup.jpg")}
              style={styles.headerImage}
            />
            {headerContent && (
              <View style={styles.overlayContent}>{headerContent}</View>
            )}
          </>
        )}

        {isScrolledUp && (
          <Animated.View
            style={{
              height: HEADER_MIN_HEIGHT,
              backgroundColor: "white",
              opacity: fadeAnim,
            }}
          />
        )}
      </Animated.View>
      <ScrollView
        style={styles.scrollView}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
      >
        {children}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerImage: {
    width: "100%",
    height: "100%",
  },
  overlayContent: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  scrollView: {
    flex: 1,
  },
});

export default HeaderImageScrollView;
