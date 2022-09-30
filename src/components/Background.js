import React, { useEffect, useState } from 'react';
import { Animated, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Background = () => {
  const [xValue] = useState(new Animated.Value(windowWidth - 30));
  const [yValue] = useState(new Animated.Value(90));
  const [_xValue] = useState(new Animated.Value(0));
  const [_yValue] = useState(new Animated.Value(90));

  const simpleOrder = () => {
    setTimeout(() => {
      Animated.timing(xValue, {
        toValue: 0,
        duration: 2500,
        useNativeDriver: true,
      }).start();
      Animated.timing(_xValue, {
        toValue: windowWidth - 30,
        duration: 2500,
        useNativeDriver: true,
      }).start();
    }, 1000);
    setTimeout(() => {
      Animated.timing(xValue, {
        toValue: windowWidth - 30,
        duration: 2500,
        useNativeDriver: true,
      }).start();
      Animated.timing(yValue, {
        toValue: windowHeight - 30,
        duration: 5000,
        useNativeDriver: true,
      }).start();
      Animated.timing(_xValue, {
        toValue: 0,
        duration: 2500,
        useNativeDriver: true,
      }).start();
      Animated.timing(_yValue, {
        toValue: windowHeight - 30,
        duration: 5000,
        useNativeDriver: true,
      }).start();
    }, 3500);
    setTimeout(() => {
      Animated.timing(xValue, {
        toValue: 0,
        duration: 2500,
        useNativeDriver: true,
      }).start();
      Animated.timing(_xValue, {
        toValue: windowWidth - 30,
        duration: 2500,
        useNativeDriver: true,
      }).start();
    }, 6000);
    setTimeout(() => {
      Animated.timing(xValue, {
        toValue: windowWidth - 30,
        duration: 2500,
        useNativeDriver: true,
      }).start();
      Animated.timing(_xValue, {
        toValue: 0,
        duration: 2500,
        useNativeDriver: true,
      }).start();
    }, 8500);
    setTimeout(reverseOrder, 11000);
  };

  const reverseOrder = () => {
    setTimeout(() => {
      Animated.timing(xValue, {
        toValue: 0,
        duration: 2500,
        useNativeDriver: true,
      }).start();
      Animated.timing(_xValue, {
        toValue: windowWidth - 30,
        duration: 2500,
        useNativeDriver: true,
      }).start();
    }, 1000);
    setTimeout(() => {
      Animated.timing(xValue, {
        toValue: windowWidth - 30,
        duration: 2500,
        useNativeDriver: true,
      }).start();
      Animated.timing(yValue, {
        toValue: 90,
        duration: 5000,
        useNativeDriver: true,
      }).start();
      Animated.timing(_xValue, {
        toValue: 0,
        duration: 2500,
        useNativeDriver: true,
      }).start();
      Animated.timing(_yValue, {
        toValue: 90,
        duration: 5000,
        useNativeDriver: true,
      }).start();
    }, 3500);
    setTimeout(() => {
      Animated.timing(xValue, {
        toValue: 0,
        duration: 2500,
        useNativeDriver: true,
      }).start();
      Animated.timing(_xValue, {
        toValue: windowWidth - 30,
        duration: 2500,
        useNativeDriver: true,
      }).start();
    }, 6000);
    setTimeout(() => {
      Animated.timing(xValue, {
        toValue: windowWidth - 30,
        duration: 2500,
        useNativeDriver: true,
      }).start();
      Animated.timing(_xValue, {
        toValue: 0,
        duration: 2500,
        useNativeDriver: true,
      }).start();
    }, 8500);
    setTimeout(simpleOrder, 11000);
  };

  useEffect(() => {
    simpleOrder();
  }, []);

  return (
    <>
      <Animated.View
        style={[
          {
            width: 25,
            height: 25,
            zIndex: 1,
            borderRadius: 100 / 2,
            transform: [{ translateX: xValue }, { translateY: yValue }],
            borderColor: 'white',
            borderWidth: 2,
            backgroundColor: 'red',
            position: 'absolute',
          },
        ]}
      />
      <Animated.View
        style={[
          {
            width: 25,
            height: 25,
            zIndex: 1,
            borderRadius: 100 / 2,
            transform: [{ translateX: _xValue }, { translateY: _yValue }],
            borderColor: 'white',
            borderWidth: 2,
            backgroundColor: 'red',
            position: 'absolute',
          },
        ]}
      />
    </>
  );
};

export default Background;
