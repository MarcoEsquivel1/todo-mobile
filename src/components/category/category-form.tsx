import { CategoryData } from "./category";
import React, { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Modal from "react-native-modal";
import { ColorPicker, fromHsv } from "react-native-color-picker";
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	StyleSheet,
} from "react-native";
import Animated, {
	ZoomIn,
	FadeOut,
	Layout,
	color,
} from "react-native-reanimated";

const defaultData: CategoryData = {
	id: "",
	title: "",
	nTasks: 0,
	color: "#ff0000",
};

interface CategoryFormProps {
	showModal: boolean;
	onSubmit: (category: CategoryData) => void;
	onCancel: () => void;
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "transparent",
		alignItems: "center",
	},
	colorpiker: {
		width: 250,
		height: 250,
	},
});

export function CategoryForm(props: CategoryFormProps) {
	const { onSubmit, showModal, onCancel } = props;
	const [category, setCategory] = useState<CategoryData>(defaultData);
	const insets = useSafeAreaInsets();
	const setDefaultData = () => setCategory(defaultData);
	return (
		<Modal
			animationIn="slideInUp"
			animationOut="slideOutDown"
			animationInTiming={500}
			animationOutTiming={1000}
			isVisible={showModal}
			onBackButtonPress={() => {
				setDefaultData();
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
						Nueva Categoria
					</Text>

					<TextInput
						placeholder="Titulo de la categoria"
						className="bg-indigo-200 p-2 px-5 my-3 border text-lg w-full rounded-3xl"
						value={category.title}
						onChangeText={(e) => setCategory({ ...category, title: e })}
					/>

					<View style={styles.container}>
						<Text className="text-white">
							Selecciona un color para la categoria!
						</Text>
						<ColorPicker
							hideSliders={true}
							onColorSelected={(color) => alert(`Color selected: ${color}`)}
							onColorChange={(x) => {
								const hex = fromHsv(x);
								setCategory({ ...category, color: hex });
							}}
							style={styles.colorpiker}
						/>
					</View>

					<TouchableOpacity
						onPress={() => {
							if (!category.title) return;
							onSubmit(category);
							setDefaultData();
						}}
						className={`bg-pink-500 p-2 self-stretch rounded-xl items-center justify-items-center `}
					>
						<Text className="text-white text-lg">Agregar Categoria</Text>
					</TouchableOpacity>
				</Animated.View>
			</View>
			}
		</Modal>
	);
}
