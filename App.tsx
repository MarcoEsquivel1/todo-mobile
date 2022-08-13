import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View } from 'react-native';
import {
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { TailwindProvider } from 'tailwindcss-react-native';
import { Task, TaskData } from './src/components';
import { Loading } from './src/components/loading';
import { Tasklist } from './src/components/task-list';

export default function App() {
  return (
    <TailwindProvider>
      <SafeAreaProvider>
        <StatusBar style="auto" />
        {/* <Tasklist /> */}
        <Loading />
      </SafeAreaProvider>
    </TailwindProvider>
  );
}
