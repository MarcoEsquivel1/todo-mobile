import { TouchableOpacity, View } from "react-native";
import { Task, TaskData } from "./task";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { useTaskStore } from "../../stores/task-store";
import shallow from "zustand/shallow";
import Animated, {
	FadeInLeft,
	FadeOutRight,
	Layout,
	ZoomIn
} from "react-native-reanimated";
import { TaskForm } from "./task-form";

export function Tasklist() {
	const {hasCategory, tasks} = useTaskStore(
        state => ({ 
            hasCategory: state.hasCategory,
			tasks: state.tasks
        }), 
		shallow
	);

	const addTask = () => {
		const newTask = {
			id: Date.now().toString(),
			title: `Tarea ${tasks.length + 1}`,
			description: `Descripción de la tarea ${tasks.length + 1}`,
			completed: false,
			assignedTo: "Juan",
		};
		useTaskStore.setState({tasks: [...tasks, newTask]})
	};

	const showAlert = () => {
		alert('Crea primero una categoria!')
	}

	const upDate = (task: TaskData) => {
		useTaskStore.setState({tasks: tasks.map((t) => (t.id === task.id ? task : t))})
	}

	return (
	<View className="flex-1">		
		<Animated.Text 
			entering={ZoomIn.delay(100)} 
			className='mx-5 mt-5  w-min self-start px-2 font-medium text-indigo-300'
		>
			TASKS
		</Animated.Text>
		<TaskForm onSubmit={upDate}/>
		<Animated.ScrollView
			contentContainerStyle={{ paddingVertical: 20 }}
			className={`h-full bg-[#344EA1] px-5`}
		>
		{
			tasks.map((task, index) => (
				<Animated.View
					key={`task-${task.id}`}
					entering={FadeInLeft}
					exiting={FadeOutRight}
					layout={Layout.springify().delay(400)}
					className="mb-3"
				>
				<Task
					task={task}
					onChange={upDate}
				/>
				</Animated.View>
			))
		}
		</Animated.ScrollView>
		<TouchableOpacity
			onPress={!hasCategory ? showAlert : addTask}
			className="absolute bottom-7 right-7 bg-pink-500 rounded-full p-5"
		>
			<MaterialCommunityIcons name="plus" size={30} color="white" />
		</TouchableOpacity>
	</View>
	);
}
