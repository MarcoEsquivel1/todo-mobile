import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Text } from 'react-native';
import { TextInput } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { TailwindProvider } from 'tailwindcss-react-native';
import { Tasklist } from './src/components/task-list';

export default function App() {
  const [name, setName] = useState('');

  return (
    <TailwindProvider>
      <SafeAreaProvider className="bg-indigo-400">
        <StatusBar style="auto" />
        <SafeAreaView className="flex-1">
          <TextInput
            placeholder="Nombre"
            className="bg-white p-2 border text-lg"
            onChangeText={(text) => setName(text)}
            value={name}
          />
          <Text>{name}</Text>
          <Tasklist />
        </SafeAreaView>
      </SafeAreaProvider>
    </TailwindProvider>
  );
}
