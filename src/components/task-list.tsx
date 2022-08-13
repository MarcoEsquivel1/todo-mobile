import { FlatList, ScrollView, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Task, TaskData } from './task';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';

const tasksMock: TaskData[] = [
  {
    id: '1',
    title: 'Tarea 1',
    description: 'Descripción de la tarea 1',
    completed: false,
    assignedTo: 'Juan',
    createdAt: '2020-01-01',
    updatedAt: '2020-01-01',
  },
  {
    id: '2',
    title: 'Tarea 2',
    description: 'Descripción de la tarea 2',

    completed: true,
  },
  {
    id: '3',
    title: 'Tarea 3',
    description: 'Descripción de la tarea 3',
    completed: false,
    assignedTo: 'Juan',
  },
  {
    id: '4',
    title: 'Tarea 4',
    description: 'Descripción de la tarea 4',
    completed: false,
  },
];

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
      <FlatList
        className={`flex-1 bg-indigo-400 px-4`}
        style={{ paddingTop: insets.top }}
        data={tasks}
        renderItem={({ item, index }) => (
          <Task key={`task-${item.id}-${index}`} task={item} classname="mb-3" />
        )}
      />

      <TouchableOpacity
        onPress={addTask}
        className="absolute bottom-7 right-7 bg-pink-500 rounded-full p-5"
      >
        <MaterialCommunityIcons name="plus" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
}
