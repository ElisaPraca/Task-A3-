package com.tasks.task;

import java.util.List;
import java.util.Optional;

public interface TaskService {

    TaskOutput create(TaskInput taskInput);

    TaskOutput update(Long id, TaskInput taskInput) throws Exception;

    Optional<TaskOutput> getOne(Long id);

    List<TaskOutput> getList();

    void delete(Long id);

    List<TaskOutput> getQueue();

    List<TaskOutput> getStack();

    void removeItemQueue();

    void removeItemStack();

}
