package com.tasks.task;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public final class TaskMapperServiceImp implements TaskMapperService {
    public TaskMapperServiceImp() {
    }

    @Override
    public TaskOutput entityToOutput(Task task) {
        return new TaskOutput(task.getId(), task.getTitle(), task.getDescription(), task.getStatus(), task.getCreatedAt());
    }

    @Override
    public Task toEntity(TaskInput taskInput) {
        return new Task(taskInput.title(), taskInput.description());
    }

    @Override
    public List<TaskOutput> entitiesToOutputs(List<Task> tasks) {
        return tasks.stream()
                .map(this::entityToOutput)
                .toList();
    }
}
