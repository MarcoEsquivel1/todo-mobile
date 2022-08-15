import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { TextInput, Button } from 'react-native';
import { onChange } from 'react-native-reanimated';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { TailwindProvider } from 'tailwindcss-react-native';
import { Category, CategoryList } from './src/components/category';
import { Tasklist } from './src/components/task';

export default function App() {
  const [name, setName] = useState('');
  const [isNamed, setIsNamed] = useState(false);
  const [hasCategory, setHasCategory] = useState(false);
  
  const onPress = () => {
    setIsNamed(true);
  }

  const onChangeCategoryState = (state:boolean) =>{
    setHasCategory(state);
  }

  return (
    <TailwindProvider>
      <SafeAreaProvider className="bg-[#344EA1]">
        <StatusBar style="auto" />
        <SafeAreaView className="flex-1">
          {//!isNamed?
          /*<View className='px-5 w-full h-full flex h-screen justify-center items-center'>
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
          </View>*/
          //:
            <><Text className='text-gray-200 text-4xl font-extrabold px-4 p-5 mt-5'>Bienvenido {name}</Text>
            <CategoryList setHasCategory={onChangeCategoryState}/>
            <Tasklist hasCategory={hasCategory}/>
          </>//
          }
        </SafeAreaView>
      </SafeAreaProvider>
    </TailwindProvider>
  );
}
