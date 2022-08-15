import React from 'react';
import { View, Text, ViewStyle, TouchableOpacity } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

export interface CategoryData{
    id?: string;
    title: string;
    nTasks: number;
}

export interface CategoryProps{
    category: CategoryData;
    classname?: string;
    onChange: (category: CategoryData) => void;
}
export function Category(props: CategoryProps){
    const { category, classname, onChange} = props;

    return (
        <View   
        className={`bg-[#031956] space-y-2 p-5 rounded-3xl w-52 h-32 flex-colitems-center ${classname}`}    
        >
            <Text className='text-gray-500'>{category.nTasks} tasks</Text>
            <Text className='text-xl text-white'>{category.title}</Text>
        </View>
    );
}
