-- CreateEnum
CREATE TYPE "Status" AS ENUM ('TASK_CREATED', 'TASK_FINISHED', 'TASK_CREATED_EDITED', 'TASK_FINISHED_EDITED');

-- CreateTable
CREATE TABLE "Task" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT E'TASK_CREATED',

    PRIMARY KEY ("id")
);
