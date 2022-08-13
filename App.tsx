import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { TextInput, Button } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { TailwindProvider } from 'tailwindcss-react-native';
import { Tasklist } from './src/components/task-list';

export default function App() {
  const [name, setName] = useState('');
  const [isName, setIsName] = useState(false)
  
  const onPress = () => {
    setIsName(true);
  }

  return (
    <TailwindProvider>
      <SafeAreaProvider className="bg-indigo-400">
        <StatusBar style="auto" />
        <SafeAreaView className="flex-1">
          {!isName?
          <View className='px-5 w-full h-full flex h-screen justify-center items-center'>
            <TextInput
              placeholder="Nombre"
              className="bg-white p-2 my-3 border text-lg w-full"
              onChangeText={(text) => setName(text)}
              value={name}
            />
            <Button
              className="w-full"
              onPress={onPress}
              title="Agregar Nombre"
              color="#841584"
            />
          </View>
          :
            <><Text className='text-gray-200 text-3xl px-4 pt-5'>Bienvenido {name}</Text>
            <Tasklist />
          </>}
        </SafeAreaView>
      </SafeAreaProvider>
    </TailwindProvider>
  );
}
