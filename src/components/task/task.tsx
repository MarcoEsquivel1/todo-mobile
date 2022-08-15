import React from 'react';
import { View, Text, ViewStyle, TouchableOpacity } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

export interface TaskData {
  id?: string;
  title: string;
  description: string;
  completed: boolean;
  categoryId?: string;
  // TODO: Add assignedTo property to Task component
  assignedTo?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface TaskProps {
  task: TaskData;
  classname?: string;
  onChange: (task: TaskData) => void;
}

export function Task(props: TaskProps) {
  const { task, classname, onChange } = props;

  const containerStyle = useAnimatedStyle(
    () => ({
      opacity: withTiming(task.completed ? 0.5 : 1, { duration: 300 }),
    }),
    [task.completed]
  );

  const circleStyle = useAnimatedStyle(
    () => ({
      backgroundColor: withTiming(task.completed ? '#c026d3' : '#312e81', {
        duration: 500,
      }),
    }),
    [task.completed]
  );

  const borderStyle = useAnimatedStyle(
    () => ({
      borderColor: withTiming(task.categoryId ? '#fff' : '#000', {
        duration: 500,
      }),
    }),
    [task.categoryId]
  );

  const textStyle = useAnimatedStyle(
    () => ({
      textDecorationLine: task.completed ? 'line-through' : 'none',
    }),
    [task.completed]
  );

  return (
    <Animated.View
      className={`bg-[#031956] p-4 rounded-xl w-full flex-row items-center ${classname}`}
      onTouchEnd={() => {
        onChange({ ...task, completed: !task.completed });
      }}
      style={containerStyle}
    >
      <Animated.View
        className="rounded-full border-2 h-5 w-5 mr-3"
        style={[circleStyle, borderStyle]}
      />
      <Animated.Text className="text-white font-medium" style={textStyle}>
        {task.title}
      </Animated.Text>
    </Animated.View>
  );
}
