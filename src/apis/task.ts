import { Task } from "wasp/entities";
import { HttpError } from "wasp/server";
import { type GetTasks, CreateTask, UpdateTask } from "wasp/server/operations";

type CreateTaskPayload = Pick<Task, "description">;

export const getTasks: GetTasks<void, Task[]> = async (args, context) => {
  if (!context.user) {
    throw new HttpError(401);
  }
  return context.entities.Task.findMany({
    where: { user: { id: context.user.id } },
    orderBy: { id: "asc" },
  });
};

type UpdateTaskPayload = Pick<Task, "id" | "isDone">;

export const updateTask: UpdateTask<UpdateTaskPayload, Task> = async (
  { id, isDone },
  context
) => {
  if (!context.user) {
    throw new HttpError(401);
  }
  return context.entities.Task.update({
    where: { id, user: { id: context.user.id } },
    data: {
      isDone: isDone,
    },
  });
};

export const createTask: CreateTask<CreateTaskPayload, Task> = async (
  args,
  context
) => {
  if (!context.user) {
    throw new HttpError(401);
  }
  return context.entities.Task.create({
    data: {
      description: args.description,
      user: { connect: { id: context.user.id } },
    },
  });
};
