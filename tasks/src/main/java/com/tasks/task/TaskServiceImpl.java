package com.tasks.task;

import com.tasks.lifo_fifo.TaskQueue;
import com.tasks.lifo_fifo.TaskStack;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
public class TaskServiceImpl implements TaskService {
    private final TaskRepository taskRepository;
    private final TaskMapperService taskMapperService;
    private final TaskQueue taskQueue;
    private final TaskStack taskStack;

    public TaskServiceImpl(TaskRepository taskRepository, TaskMapperService taskMapperService, TaskQueue taskQueue, TaskStack taskStack) {
        this.taskRepository = taskRepository;
        this.taskMapperService = taskMapperService;
        this.taskQueue = taskQueue;
        this.taskStack = taskStack;
    }

    @Override
    public TaskOutput create(TaskInput taskInput) {
        var task = taskMapperService.toEntity(taskInput);
        var taskCreated = taskMapperService.entityToOutput(taskRepository.save(task));
        // Enfileira a nova tarefa
        taskQueue.enqueue(taskCreated);
        // Empilha a nova tarefa
        taskStack.push(taskCreated);
        return taskCreated;
    }

    @Override
    @Transactional
    public TaskOutput update(Long id, TaskInput taskInput) throws Exception {
        var task = taskRepository.findById(id)
                .orElseThrow(() -> new Exception("Task not found with id: ".concat(id.toString())));
        task.setTitle(taskInput.title());
        task.setDescription(taskInput.description());
        return taskMapperService.entityToOutput(taskRepository.save(task));
    }

    @Override
    public Optional<TaskOutput> getOne(Long id) {
        return taskRepository.findById(id)
                .map(taskMapperService::entityToOutput);
    }

    @Override
    public List<TaskOutput> getList() {
        var tasks = taskRepository.findAll();
        return taskMapperService.entitiesToOutputs(tasks);
    }

    @Override
    public void delete(Long id) {
        taskRepository.deleteById(id);
    }

    @Override
    public List<TaskOutput> getQueue() {
        return taskQueue.listTasks();
    }

    @Override
    public List<TaskOutput> getStack() {
        return Arrays.asList(taskStack.listTasks());
    }

    @Override
    public void removeItemQueue() {
        taskQueue.dequeue();
    }

    @Override
    public void removeItemStack() {
        taskStack.pop();
    }
}
