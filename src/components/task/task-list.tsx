import { FlatList, ScrollView, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Task, TaskData } from "./task";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { useTaskStore } from "../../stores/task-store";
import shallow from "zustand/shallow";
import Animated, {
	FadeInLeft,
	FadeOutRight,
	Layout,
	ZoomIn
} from "react-native-reanimated";
import { TaskForm } from "./task-form";

//const tasksMock: TaskData[] = [];

/* interface TaskListProps {
	//hasCategory: boolean;
} */

export function Tasklist(/* props: TaskListProps */) {
	const {hasCategory, tasks, selectedTask} = useTaskStore(
        state => ({ 
            hasCategory: state.hasCategory,
			tasks: state.tasks,
			selectedTask: state.selectedTask
        }), 
		shallow
	);
	//const { hasCategory } = props;
	//const [tasks, setTask] = useState<TaskData[]>(tasksMock);
	//const insets = useSafeAreaInsets();

	const addTask = () => {
		const newTask = {
			id: Date.now().toString(),
			title: `Tarea ${tasks.length + 1}`,
			description: `Descripción de la tarea ${tasks.length + 1}`,
			completed: false,
			assignedTo: "Juan",
		};
		//setTask([...tasks, newTask]);
		useTaskStore.setState({tasks: [...tasks, newTask]})
	};

	const upDate = (task: TaskData) => {
		//setTask(tasks.map((t) => (t.id === task.id ? task : t)));
		useTaskStore.setState({tasks: tasks.map((t) => (t.id === task.id ? task : t))})
	}

	return (
	<View className="flex-1">
		{
			/* <FlatList
			className={`flex-1 bg-indigo-400 px-4`}
			style={{ paddingTop: insets.top }}
			data={tasks}
			renderItem={({ item, index }) => (

			)}
			/> */
		}
		<Animated.Text 
			entering={ZoomIn.delay(100)} 
			className='mx-5 mt-5  w-min self-start px-2 font-medium text-indigo-300'
		>
			CATEGORIES
		</Animated.Text>
		<TaskForm onSubmit={upDate}/>
		<Animated.ScrollView
			contentContainerStyle={{ paddingVertical: 20 }}
			className={`h-full bg-[#344EA1] px-5`}
			//style={{ paddingTop: insets.top }}
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
					onChange={upDate/* (task: TaskData) => {
						//setTask(tasks.map((t) => (t.id === task.id ? task : t)));
						useTaskStore.setState({tasks: tasks.map((t) => (t.id === task.id ? task : t))})
						console.log(tasks[0].title)
					} */}
				/>
				</Animated.View>
			))
		}
		</Animated.ScrollView>

		<TouchableOpacity
			onPress={addTask}
			className="absolute bottom-7 right-7 bg-pink-500 rounded-full p-5"
			disabled={!hasCategory}
		>
			<MaterialCommunityIcons name="plus" size={30} color="white" />
		</TouchableOpacity>
	</View>
	);
}
