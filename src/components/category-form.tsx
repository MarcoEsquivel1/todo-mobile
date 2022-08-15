import { CategoryData } from "./category";
import React, { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { View, Text, TextInput, TouchableOpacity} from "react-native";
import Modal from "react-native-modal";
import Animated, {
    ZoomIn,
    FadeOut,
    Layout
  } from 'react-native-reanimated';
const defaultData: CategoryData = {
    id: '',
    title: '',
    nTasks: 0
}

interface CategoryFormProps{
    showModal: boolean,
    onSubmit:(category: CategoryData) => void;
    onCancel:()=>void;
}

export function CategoryForm(props: CategoryFormProps) {
    const {onSubmit, showModal, onCancel}=props;
    const [category, setCategory] = useState<CategoryData>(defaultData);
    const insets = useSafeAreaInsets();
    const setDefaultData = () => setCategory(defaultData);

    return(
        
        <Modal
                animationIn='slideInUp'
                animationOut='slideOutDown'
                animationInTiming={500}
                animationOutTiming={1000}
                isVisible={showModal}
                onBackButtonPress={()=>{setDefaultData(); onCancel()}}
                style={{ margin: 0 }}
            >
                <View
                    style={{ paddingTop: insets.top, flex:1 }}
                    className='bg-[#031956]  h-full px-5 py-5 items-center'>
                    <Animated.View
                        key={`${showModal}`}
                        entering={ZoomIn.delay(500)}
                        exiting={FadeOut}
                        className="w-full space-y-4 pt-5"
                    >
                        <Text className='text-3xl text-center font-semibold text-pink-500'>Nueva Categoria</Text>
                    
                    
                    <TextInput 
                        placeholder='Titulo de la categoria'
                        className="bg-indigo-200 p-2 px-5 my-3 border text-lg w-full rounded-3xl"
                        value={category.title}
                        onChangeText={(e) => setCategory({...category, title: e})}
                    />
                    <TouchableOpacity
                        onPress={()=>{
                            if(!category.title) return
                            onSubmit(category);
                            setDefaultData();
                        }}
                        className={`bg-pink-500 p-2 self-stretch rounded-xl items-center justify-items-center `}    
                    >
                    <Text className='text-white text-lg'>Agregar Categoria</Text>
                    </TouchableOpacity>
                    </Animated.View>
                </View>
            </Modal>
    );
};
