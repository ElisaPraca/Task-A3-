package com.tasks.lifo_fifo;

import com.tasks.task.TaskInput;
import com.tasks.task.TaskOutput;
import com.tasks.task.TaskService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/queue")
public class TaskQueueController {

    private final TaskService taskService;

    public TaskQueueController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping
    public ResponseEntity<List<TaskOutput>> getAllQueue() {
        var queue = taskService.getQueue();
        return ResponseEntity.ok(taskService.getQueue());
    }

    @DeleteMapping
    public ResponseEntity<Void> delete() {
        taskService.removeItemQueue();
        return ResponseEntity.noContent().build();
    }
}
