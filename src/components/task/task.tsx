import React, { useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { View, Text, ViewStyle, TouchableOpacity } from 'react-native';
import Animated, {
	useAnimatedStyle,
	withTiming,
} from 'react-native-reanimated';
import { TaskForm } from './task-form';

export interface TaskData {
	id?: string;
	title: string;
	description: string;
	completed: boolean;
	categoryId?: string;
	// TODO: Add assignedTo property to Task component
	assignedTo?: string;
	createdAt?: string;
	updatedAt?: string;
}

export interface TaskProps {
	task: TaskData;
	classname?: string;
	onChange: (task: TaskData) => void;
}

export function Task(props: TaskProps) {
	const [showModal, setShowModal] = useState(false);
	const { task, classname, onChange } = props;

	const containerStyle = useAnimatedStyle(
		() => ({
			opacity: withTiming(task.completed ? 0.5 : 1, { duration: 300 }),
		}),
		[task.completed]
	);

	const circleStyle = useAnimatedStyle(
		() => ({
			backgroundColor: withTiming(task.completed ? '#c026d3' : '#312e81', {
				duration: 500,
			}),
		}),
		[task.completed]
	);

	const borderStyle = useAnimatedStyle(
		() => ({
			borderColor: withTiming(task.categoryId ? '#fff' : '#000', {
				duration: 500,
			}),
		}),
		[task.categoryId]
	);

	const textStyle = useAnimatedStyle(
		() => ({
			textDecorationLine: task.completed ? 'line-through' : 'none',
		}),
		[task.completed]
	);

	const displayForm = () => {
        setShowModal(true);
    }
    
    const hideForm = () => {
        setShowModal(false);
    }
	

	return (
		<Animated.View className='flex-row' style={containerStyle}>
			<TaskForm task={task} showModal={showModal} onSubmit={onChange} onCancel={hideForm}/>
			<View
				className={`bg-[#031956] p-4 px-5 rounded-l-xl flex-1 flex-row items-center ${classname}`}
				onTouchEnd={() => {
					onChange({ ...task, completed: !task.completed });
				}}
			>
				<Animated.View
					className="rounded-full border-2 h-5 w-5 mr-3"
					style={[circleStyle, borderStyle]}
				/>
				<Animated.Text className="text-white font-medium" style={textStyle}>
					{task.title}
				</Animated.Text>
			</View>
			<TouchableOpacity
				onPress={displayForm}
				className={`bg-pink-400 rounded-r-xl px-3 items-center justify-center`}    
				disabled={task.completed}
			>
				<MaterialCommunityIcons name='pencil' size={28} color="white"/>
			</TouchableOpacity>
		</Animated.View>
	);
}
