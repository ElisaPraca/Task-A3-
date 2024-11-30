package com.tasks.task;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/tasks")
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping
    public ResponseEntity<List<TaskOutput>> getAll() {
        return ResponseEntity.of(Optional.ofNullable(taskService.getList()));
    }

    @PostMapping
    public ResponseEntity<TaskOutput> create(@RequestBody TaskInput taskInput) {
        return ResponseEntity.ok(taskService.create(taskInput));
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<TaskOutput> update(@PathVariable Long id, @RequestBody TaskInput taskInput) throws Exception {
        return ResponseEntity.ok(taskService.update(id, taskInput));
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        taskService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
