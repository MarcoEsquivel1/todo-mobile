import create from "zustand";
import { CategoryData } from "../components/category";
import { TaskData } from "../components/task";
interface Context{
    userName: string,
    setUserName: Function,
    hasCategory: boolean,
    tasks: TaskData[],
    showTaskModal: boolean,
    selectedTask: TaskData,
    showCategoryModal: boolean,
    categories: CategoryData[],
    searchTitleById: Function
}

const tasksMock: TaskData[] = [];
const categoryMock: CategoryData[] = [];
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
    categories: categoryMock,
    searchTitleById: (id: String) =>{
        const list = get().categories
        let obj = list.find(c => c.id === id)

        return obj?.title
    }
}));