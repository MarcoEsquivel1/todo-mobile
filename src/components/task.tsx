import { View, Text, ViewStyle } from 'react-native';

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
  classname?: string;
}

export function Task(props: TaskProps) {
  const { task, classname } = props;
  return (
    <View
      className={`bg-indigo-900 p-4 rounded-xl w-full flex-row items-center ${classname}`}
    >
      <View className="rounded-full border-2 border-pink-400 h-5 w-5 mr-3" />
      <Text className="text-white font-medium">{task.title}</Text>
    </View>
  );
}
