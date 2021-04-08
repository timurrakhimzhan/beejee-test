import { Status } from '@prisma/client';
import {TaskStatusNumber} from "../types/task-schema";

export const statusNumbers: Array<number> = [0, 1, 10, 11];
export const statusEnums: Array<Status> = [Status.TASK_CREATED, Status.TASK_FINISHED,
    Status.TASK_CREATED_EDITED, Status.TASK_FINISHED_EDITED];

export const statusNumberToEnum: {[key in TaskStatusNumber]: Status}  = {
    0: Status.TASK_CREATED,
    10: Status.TASK_CREATED_EDITED,
    11: Status.TASK_FINISHED_EDITED,
    1: Status.TASK_FINISHED
}

export const statusEnumToNumber: {[key in Status]: TaskStatusNumber}  = {
    [Status.TASK_CREATED]: 0,
    [Status.TASK_CREATED_EDITED]: 10,
    [Status.TASK_FINISHED_EDITED]: 11,
    [Status.TASK_FINISHED]: 1,
}