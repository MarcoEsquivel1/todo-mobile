import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Task, TaskData } from './task';

const task: TaskData = {
  id: '1',
  title: 'Tarea 1',
  description: 'Descripción de la tarea 1',
  completed: false,
  assignedTo: 'Juan',
  createdAt: '2020-01-01',
  updatedAt: '2020-01-01',
};

export function Tasklist() {
  const insets = useSafeAreaInsets();

  return (
    <View
      className={`flex-1 bg-indigo-400 px-4`}
      style={{ paddingTop: insets.top }}
    >
      <Task task={task} />
    </View>
  );
}
