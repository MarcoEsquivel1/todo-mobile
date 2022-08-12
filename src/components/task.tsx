import { View, Text } from 'react-native';

export interface TaskData {
  id?: string;
  title: string;
  description: string;
  completed: boolean;

  // TODO: Add assignedTo property to Task component
  assignedTo?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface TaskProps {
  task: TaskData;
}

export function Task(props: TaskProps) {
  const { task } = props;
  return (
    <View className="bg-indigo-900 p-4 rounded-xl w-full flex-row items-center">
      <View className="rounded-full border-2 border-pink-400 h-5 w-5 mr-3" />
      <Text className="text-white font-medium">{task.title}</Text>
    </View>
  );
}
