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

interface TaskListProps{
  hasCategory: boolean
}

export function Tasklist(props: TaskListProps) {
  const {hasCategory} = props;
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
        className={`flex-1 bg-[#344EA1] px-4`}
        style={{ paddingTop: insets.top }}
      >
        {tasks.map((task, index) => (
          <Animated.View
            key={`task-${task.id}`}
            entering={FadeInLeft}
            exiting={FadeOutRight}
            layout={Layout.springify().delay(400)}
            className="mb-3"
          >
            <Task
              task={task}
              onChange={(task: TaskData) => {
                setTask(tasks.map((t) => (t.id === task.id ? task : t)));
              }}
            />
          </Animated.View>
        ))}
      </Animated.ScrollView>

      <TouchableOpacity
        onPress={addTask}
        className="absolute bottom-7 right-7 bg-pink-500 rounded-full p-5"
        disabled={!hasCategory}
      >
        <MaterialCommunityIcons name="plus" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
}
