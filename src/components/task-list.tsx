import { FlatList, ScrollView, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Task, TaskData } from './task';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import Animated, {
  FadeInLeft,
  FadeOutRight,
  Layout,
} from 'react-native-reanimated';

const tasksMock: TaskData[] = [];

export function Tasklist() {
  const [tasks, setTask] = useState<TaskData[]>(tasksMock);
  const insets = useSafeAreaInsets();

  const addTask = () => {
    const newTask = {
      id: Date.now().toString(),
      title: `Tarea ${tasks.length + 1}`,
      description: `Descripción de la tarea ${tasks.length + 1}`,
      completed: false,
      assignedTo: 'Juan',
    };

    setTask([...tasks, newTask]);
  };

  return (
    <View className="flex-1">
      {/* <FlatList
        className={`flex-1 bg-indigo-400 px-4`}
        style={{ paddingTop: insets.top }}
        data={tasks}
        renderItem={({ item, index }) => (
          
        )}
      /> */}

      <Animated.ScrollView
        className={`flex-1 bg-indigo-400 px-4`}
        style={{ paddingTop: insets.top }}
      >
        {tasks.map((task, index) => (
          <Animated.View
            key={`task-${task.id}`}
            entering={FadeInLeft}
            exiting={FadeOutRight}
            onTouchEnd={() => {
              tasks.splice(index, 1);
              setTask([...tasks]);
            }}
            layout={Layout.springify().delay(400)}
            className="mb-3"
          >
            <Task task={task} />
          </Animated.View>
        ))}
      </Animated.ScrollView>

      <TouchableOpacity
        onPress={addTask}
        className="absolute bottom-7 right-7 bg-pink-500 rounded-full p-5"
      >
        <MaterialCommunityIcons name="plus" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
}
