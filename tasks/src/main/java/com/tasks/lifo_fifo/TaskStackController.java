package com.tasks.lifo_fifo;

import com.tasks.task.TaskInput;
import com.tasks.task.TaskOutput;
import com.tasks.task.TaskService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/stack")
public class TaskStackController {

    private final TaskService taskService;

    public TaskStackController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping
    public ResponseEntity<List<TaskOutput>> getAllStack() {
        var stack = taskService.getStack();
        return ResponseEntity.ok(taskService.getStack());
    }

    @DeleteMapping
    public ResponseEntity<Void> delete() {
        taskService.removeItemStack();
        return ResponseEntity.noContent().build();
    }
}
