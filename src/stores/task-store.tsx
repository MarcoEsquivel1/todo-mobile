import create from "zustand";
import { TaskData } from "../components/task";
interface Context{
    userName: string,
    setUserName: Function,
    hasCategory: boolean,
    tasks: TaskData[],
    showTaskModal: boolean,
    selectedTask: TaskData,
    showCategoryModal: boolean,
}

const tasksMock: TaskData[] = [];
const defaultTask: TaskData = {
    id: '',
    title: '',
    description: '',
    completed: false,
}

export const useTaskStore = create<Context>((set, get) => ({
    userName: '',
    setUserName: (u: string) => {
        if(u){
            set({userName: u});
        }
    },
    hasCategory: false,
    tasks: tasksMock,
    showTaskModal: false,
    selectedTask: defaultTask,
    showCategoryModal: false,
}));