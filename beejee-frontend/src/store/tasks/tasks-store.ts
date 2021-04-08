import BaseStore from "../base-store";
import {TASKS_PER_PAGE} from "../../constants";

export default class TasksStore extends BaseStore {
    totalTaskCount: number = 0;
    currentPage: number = 1;
    totalPages: number = 0;

    displayTasksIds: Array<number> = [];
    allTasksIds: Array<number> = [];
    idTaskMap: {[key: number]: Task} = {};

    sortDirection: TaskSortDirection = 'asc';
    sortField: TaskSortField = 'id';

    isLoadingTasks: boolean = false;
    editingTaskId: number | null = null;


    setTotalTaskCount(totalTaskCount: number) {
        this.totalTaskCount = totalTaskCount;
        this.totalPages = Math.ceil(totalTaskCount / TASKS_PER_PAGE);
    }

    setPage(page: number) {
        this.currentPage = page;
    }

    setDisplayTasksIds(displayTasksIds: Array<number>) {
        this.displayTasksIds = displayTasksIds;
    }

    addTask(task: Task) {
        if(!this.idTaskMap[task.id]) {
            this.allTasksIds.push(task.id);
            this.idTaskMap[task.id] = task;
        }
    }

    editTask(task: Task) {
        if(this.idTaskMap[task.id]) {
            this.idTaskMap[task.id] = task;
        }
    }

    setIsLoadingTasks(isLoadingTasks: boolean) {
        this.isLoadingTasks = isLoadingTasks;
    }

    setSortField(sortField: TaskSortField) {
        this.sortField = sortField;
    }

    setSortDirection(sortDirection: TaskSortDirection) {
        this.sortDirection = sortDirection;
    }

    setEditingTaskId(editingTaskId: number) {
        this.editingTaskId = editingTaskId;
    }

    disableEditing() {
        this.editingTaskId = null;
    }

}