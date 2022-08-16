import {  TouchableOpacity, View, Text} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Category, CategoryData } from './category';
import { CategoryForm } from './category-form';
import Animated, {
    ZoomIn,
    SlideOutDown,
    Layout
} from 'react-native-reanimated';

const categoryMock: CategoryData[] = [];

interface CategoryListProps{
    setHasCategory: (state: boolean) => void;
}

export function CategoryList(props: CategoryListProps) {
    const {setHasCategory}=props;
    const [categories, setCategories] = useState<CategoryData[]>(categoryMock);
    const [showModal, setShowModal] = useState(false);
    const insets = useSafeAreaInsets();

    const addCategory = (category: CategoryData) => {
        try {
            category.id = Date.now().toString();
            setCategories([...categories, category]);
            hideForm();
            setHasCategory(true);
        } catch (error) {
            
        }
    }

    const displayForm = () => {
        setShowModal(true);
    }
    
    const hideForm = () => {
        setShowModal(false);
    }

    return(
        <View className=''> 
            <Animated.Text entering={ZoomIn.delay(100)} className='mx-5 w-min self-start px-2 font-medium text-indigo-300'>CATEGORIES</Animated.Text>
            <CategoryForm showModal={showModal} onSubmit={addCategory} onCancel={hideForm}/>                   
            <Animated.ScrollView
                contentContainerStyle={{paddingHorizontal: 20}}
                className={` bg-[#344EA1] w-full py-3`}
                horizontal={true}
                layout={Layout.springify()}
            >
                
                {
                    categories.map((category, index) => (
                        <Animated.View
                            key={`task-${category.id}`}
                            entering={ZoomIn.delay(300)}
                            exiting={SlideOutDown}
                            layout={Layout.springify()}
                            className="mx-2"
                        >
                            <Category
                                category={category}
                                onChange={()=>{}}
                            />
                        </Animated.View>
                    ))
                }
                <TouchableOpacity
                    onPress={displayForm}
                    className={`bg-[#031956] p-5 mx-2 rounded-3xl w-52 h-32 items-center justify-center`}    
                >
                    <MaterialCommunityIcons name='plus' size={50} color="white"/>
                </TouchableOpacity>
            </Animated.ScrollView>
        </View>
    );
};
