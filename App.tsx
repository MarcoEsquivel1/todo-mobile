import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { TextInput, Button } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { TailwindProvider } from 'tailwindcss-react-native';
import { CategoryList } from './src/components/category';
import { Tasklist } from './src/components/task';
import { useTaskStore } from './src/stores/task-store';
import shallow from 'zustand/shallow'
export default function App() {
	const {userName} = useTaskStore(
        state => ({ 
            userName: state.userName,
        }), 
		shallow
	);
	const [isNamed, setIsNamed] = useState(false);

	const onPress = () => {
		setIsNamed(true);
	}

	return (
		<TailwindProvider>
			<SafeAreaProvider className="bg-[#344EA1]">
				<StatusBar style="auto" />
				<SafeAreaView className="flex-1">
					{!isNamed ?
						<View className='px-5 w-full h-full flex justify-center items-center'>
							<TextInput
								placeholder="Nombre"
								className="bg-white p-2 my-3 border text-lg w-full"
								onChangeText={(text) => useTaskStore.setState({userName: text})}
								value={userName}
							/>
							<Button
								className="w-full"
								onPress={onPress}
								title="Agregar Nombre"
								color="#841584"
							/>
						</View>
						: 
						<>
							<Text className='text-gray-200 text-4xl font-extrabold px-4 p-5 mt-5'>Bienvenido {userName}</Text>
							<CategoryList/>
							<Tasklist/>
						</>
					}
				</SafeAreaView>
			</SafeAreaProvider>
		</TailwindProvider>
	);
}

