import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

export function Loading() {
  const rotate = useSharedValue(180);
  const styles = useAnimatedStyle(
    () => ({
      transform: [
        {
          rotateZ: `${rotate.value}deg`,
        },
      ],
    }),
    [rotate.value]
  );

  useEffect(() => {
    rotate.value = withRepeat(
      withSequence(
        withTiming(360 * 2, { duration: 1000 }),
        withTiming(-(360 * 2), { duration: 1000 })
      ),
      -1,
      true
    );
  });

  return (
    <Animated.View
      className="flex-1 justify-center items-center"
      style={styles}
    >
      <MaterialCommunityIcons name="loading" size={50} color="black" />
    </Animated.View>
  );
}
