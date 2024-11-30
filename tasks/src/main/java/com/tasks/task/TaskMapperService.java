package com.tasks.task;

import java.util.List;

public sealed interface TaskMapperService permits TaskMapperServiceImp {
    TaskOutput entityToOutput(Task task);

    Task toEntity(TaskInput taskInput);

    List<TaskOutput> entitiesToOutputs(List<Task> tasks);
}
