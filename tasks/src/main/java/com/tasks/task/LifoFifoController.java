package com.tasks.task;

import com.tasks.lifo_fifo.TaskQueue;
import com.tasks.lifo_fifo.TaskStack;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/lifofifo")
public class LifoFifoController {

    private final TaskService taskService;
    private final TaskQueue taskQueue;  // Instância da fila
    private final TaskStack taskStack;

    public LifoFifoController(TaskService taskService, TaskQueue taskQueue, TaskStack taskStack) {
        this.taskService = taskService;
        this.taskQueue = taskQueue;
        this.taskStack = taskStack;
    }

    /**
     * Endpoint para obter todas as tarefas utilizando a fila (primeira a entrar, primeira a sair).
     * Aqui a fila pode ser usada para listar as tarefas conforme a ordem em que foram criadas.
     *
     * @return ResponseEntity com a lista de tarefas ou uma resposta vazia caso não haja tarefas.
     */
    @GetMapping("/queue")
    public ResponseEntity<List<TaskOutput>> getTasksFromQueue(){
        List<TaskOutput> tasks = taskService.getList(); // Pode ser qualquer lista de tarefas
        taskService.getList().forEach(taskQueue::enqueue); // Enfileira todas as tarefas
        return ResponseEntity.of(Optional.ofNullable(tasks));
    }

    /**
     * Endpoint para obter todas as tarefas utilizando a pilha (última a entrar, primeira a sair).
     * Aqui a pilha pode ser usada para recuperar tarefas na ordem inversa de criação.
     *
     * @return ResponseEntity com a lista de tarefas ou uma resposta vazia caso não haja tarefas.
     */
    @GetMapping("/stack")
    public ResponseEntity<List<TaskOutput>> getTasksFromStack(){
        List<TaskOutput> tasks = taskService.getList(); // Pode ser qualquer lista de tarefas
        tasks.forEach(taskStack::push); // Empilha todas as tarefas
        return ResponseEntity.of(Optional.of(tasks));
    }
}
