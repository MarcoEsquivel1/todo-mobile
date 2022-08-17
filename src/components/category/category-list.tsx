import { TouchableOpacity, View } from 'react-native';;
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Category, CategoryData } from './category';
import { CategoryForm } from './category-form';
import { useTaskStore } from '../../stores/task-store';
import shallow from 'zustand/shallow';
import Animated, {
    ZoomIn,
    SlideOutDown,
    Layout
} from 'react-native-reanimated';

export function CategoryList() {
    const {hasCategory, categories} = useTaskStore(
        state => ({ 
            hasCategory: state.hasCategory,
            categories: state.categories
        }), 
		shallow
	);

    const addCategory = (category: CategoryData) => {
        try {
            category.id = Date.now().toString();
            useTaskStore.setState({categories: [...categories, category]});
            useTaskStore.setState({showCategoryModal: false});
            if(!hasCategory){
                useTaskStore.setState({hasCategory: true})
            }
        } catch (error) {
            
        }
    }

    return(
        <View className=''> 
            <Animated.Text 
                entering={ZoomIn.delay(100)} 
                className='mx-5 w-min self-start px-2 font-medium text-indigo-300'
            >
                CATEGORIES
            </Animated.Text>
            <CategoryForm onSubmit={addCategory}/>                   
            <Animated.ScrollView
                contentContainerStyle={{paddingHorizontal: 12}}
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
                    onPress={() => {
                        useTaskStore.setState({showCategoryModal: true
                    })}}
                    className={`bg-[#031956] p-5 mx-2 rounded-3xl w-52 h-32 items-center justify-center`}    
                >
                    <MaterialCommunityIcons name='plus' size={50} color="white"/>
                </TouchableOpacity>
            </Animated.ScrollView>
        </View>
    );
};
