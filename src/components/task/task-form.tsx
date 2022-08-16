import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import Animated, { ZoomIn, FadeOut } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TaskData } from "./task";
import { useTaskStore } from '../../stores/task-store';
import shallow from 'zustand/shallow';

/* const defaultData: TaskData = {
    id: '',
    title: '',
    description: '',
    completed: false,
} */

interface TaskFormPrps{
    //task: TaskData
    onSubmit: (task: TaskData) => void
}

export function TaskForm(props: TaskFormPrps) {
    const {showModal, selectedTask} = useTaskStore(
        state => ({ 
            showModal: state.showTaskModal,
            selectedTask: state.selectedTask
        }), 
		shallow
	);
    const { onSubmit} = props;
    const [editedTask, setEditedTask] = useState(selectedTask);
    const insets = useSafeAreaInsets();
    
    const resetTask = () => {
        setEditedTask(selectedTask);
    }

    const onCancel = () => {
        useTaskStore.setState({showTaskModal: false});
    }

    useEffect(()=>{
        setEditedTask(selectedTask)
    }, [selectedTask])

    return(
        <Modal
            animationIn="slideInUp"
            animationOut="slideOutDown"
            animationInTiming={500}
            animationOutTiming={1000}
            isVisible={showModal}
            onBackButtonPress={() => {
                resetTask();
                onCancel();
            }}
            style={{ margin: 0 }}
        >
            {
                <View
				style={{ paddingTop: insets.top, flex: 1 }}
				className="bg-[#031956]  h-full px-5 py-5 items-center"
			>
				<Animated.View
					key={`${showModal}`}
					entering={ZoomIn.delay(500)}
					exiting={FadeOut}
					className="w-full space-y-4 pt-5"
				>
					<Text className="text-3xl text-center font-semibold text-pink-500">
						Modificar Tarea
					</Text>

					<TextInput
						placeholder="Titulo de la tarea"
						className="bg-indigo-200 p-2 px-5 my-3 border text-lg w-full rounded-3xl"
						value={editedTask.title}
						onChangeText={(e) => setEditedTask({ ...editedTask, title: e })}
					/>

					<TextInput
                        multiline={true}
                        numberOfLines={4}
                        placeholder="Descripción de la tarea"
						className="bg-indigo-200 p-2 px-5 my-3 border text-lg w-full rounded-3xl"
						value={editedTask.description}
						onChangeText={(e) => setEditedTask({ ...editedTask, description: e })}
                    />

					<TouchableOpacity
						onPress={() => {
							if (!editedTask.title) return;
							onSubmit(editedTask);
                            onCancel();
						}}
						className={`bg-pink-500 p-2 self-stretch rounded-xl items-center justify-items-center `}
					>
						<Text className="text-white text-lg">Actualizar Tarea</Text>
					</TouchableOpacity>
				</Animated.View>
			</View>
            }
        </Modal>
    );
};
