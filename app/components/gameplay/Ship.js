import React, { useRef, useState } from "react";
import {
  Text,
  StyleSheet,
  PanResponder,
  Animated,
  TouchableWithoutFeedback,
} from "react-native";
import gameSettings from "../../config/gameSettings";

const Ship = ({ size, isHorizontal = true, onDragEnd }) => {
  const [horizontal, setHorizontal] = useState(isHorizontal);
  const [position, setPosition] = useState("relative");
  const [visible, setVisible] = useState(true);
  const ref = useRef();

  const AnimatedTouchable = Animated.createAnimatedComponent(
    TouchableWithoutFeedback
  );

  // Animated values for position
  const pan = useRef(new Animated.ValueXY()).current;
  // PanResponder for handling drag gestures
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      // onPanResponderGrant: (evt, gestureState) => {
      //   setPosition("absolute");
      // },

      onPanResponderMove: Animated.event(
        [
          null,
          {
            dx: pan.x,
            dy: pan.y,
          },
        ],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: (evt, gestureState) => {
        // Call onDragEnd when dragging ends
        pan.extractOffset();
        ref.current.measure((x, y, width, height, pageX, pageY) => {
          setVisible(
            !onDragEnd(size, isHorizontal, {
              x: gestureState.moveX - (gestureState.x0 - pageX),
              y: gestureState.moveY - (gestureState.y0 - pageY),
            })
          );
        });
      },
    })
  ).current;

  return (
    visible && (
      <Animated.View
        {...panResponder.panHandlers}
        ref={ref}
        style={[
          styles.ship,
          {
            width: horizontal
              ? size * gameSettings.CELL_SIZE
              : gameSettings.CELL_SIZE,
            height: horizontal
              ? gameSettings.CELL_SIZE
              : size * gameSettings.CELL_SIZE,
            transform: pan.getTranslateTransform(),
            position: position,
          },
        ]}
      >
        {/* <TouchableWithoutFeedback
        onPress={() => {
          console.log(horizontal);
          setHorizontal(!horizontal);
        }}
      > */}
        <Text style={styles.shipText}>{`Ship (${size})`}</Text>
        {/* </TouchableWithoutFeedback> */}
      </Animated.View>
    )
  );
};

const styles = StyleSheet.create({
  ship: {
    backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    zIndex: 2,
    marginBottom: 10,
  },
  shipText: {
    color: "white",
  },
});

export default Ship;
