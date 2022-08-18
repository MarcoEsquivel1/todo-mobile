import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import Animated, { ZoomIn, FadeOut } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TaskData } from "./task";
import { useTaskStore } from '../../stores/task-store';
import shallow from 'zustand/shallow';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import SelectList from 'react-native-dropdown-select-list'

interface TaskFormPrps{
    onSubmit: (task: TaskData, oldCat?: string) => void
}

export function TaskForm(props: TaskFormPrps) {
    const {showModal, selectedTask, categories, searchTitleById} = useTaskStore(
        state => ({ 
            showModal: state.showTaskModal,
            selectedTask: state.selectedTask, 
            categories: state.categories,
            searchTitleById: state.searchTitleById
        }), 
		shallow
	);
    
    const { onSubmit} = props;
    const [selected, setSelected] = useState("");
    const [editedTask, setEditedTask] = useState(selectedTask);
    const insets = useSafeAreaInsets();
    const oldCat = selectedTask.categoryId
    
    const resetTask = () => {
        setEditedTask(selectedTask);
    }

    const onCancel = () => {
        useTaskStore.setState({showTaskModal: false});
    }

    useEffect(()=>{
        setEditedTask(selectedTask)
    }, [selectedTask])

    let data = categories.map((cat) => {
        return {key: cat.id, value: cat.title}
    });

    
    let styles = StyleSheet.create({
        box:{
            backgroundColor: '#c7d2fe',
            borderRadius: 24,
            marginTop: 12,
            marginBottom: 12,
            paddingHorizontal: 20
        },
        dropdownBox:{
            backgroundColor: '#e9d5ff',
            borderRadius: 24,
            marginVertical: 12
        },
        dropdownItem:{
            borderTopWidth: 0.5,
            borderBottomWidth: 0.5,
            margin: 0,
            alignItems: 'center'
        },
        text:{
            fontSize: 18
        },
        dropdownText:{
            fontSize: 18,
            fontWeight: '500',
            lineHdveight: '1.75rem',
            color: '#1E3A8A'
        }
    });

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
                    <Text className="text-lg text-start mx-2 font-semibold text-pink-500">
						Categoria actual
					</Text>
                    <TextInput
						className="bg-indigo-200 p-2 px-5 mt-3 border text-lg w-full rounded-3xl"
						value={!selectedTask.categoryId ? 'Sin categoria' : searchTitleById(selectedTask.categoryId)}
						editable={false} selectTextOnFocus={false}
					/>
                    <Text className="text-lg text-start mx-2 font-semibold text-pink-500">
						Nueva categoria
					</Text>
                    <SelectList 
                        value={selected}
                        placeholder='Selecciona una categoria'
                        onSelect={() => setEditedTask({...editedTask, categoryId: selected})}
                        setSelected={setSelected} 
                        data={data}  
                        arrowicon={<MaterialCommunityIcons name="chevron-down" size={20} color={'black'} />} 
                        searchicon={<MaterialCommunityIcons name="magnify" size={20} color={'black'} />} 
                        search={true} 
                        inputStyles={styles.text}
                        boxStyles={styles.box}
                        dropdownItemStyles={styles.dropdownItem}   
                        dropdownStyles={styles.dropdownBox}  
                        dropdownTextStyles={styles.dropdownText} 
                        maxHeight={150}
                    />
					<TouchableOpacity
						onPress={() => {
							if (!editedTask.title) return;
							onSubmit(editedTask, oldCat);
                            onCancel();
						}}
						className={`bg-pink-500 p-2 self-stretch rounded-xl items-center justify-items-center `}
					>
						<Text className="text-white text-lg">Actualizar Tarea</Text>
					</TouchableOpacity>
				</Animated.View>
			</View>       
        </Modal>
    );
};
