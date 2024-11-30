package com.tasks.lifo_fifo;

import com.tasks.task.TaskOutput;

import java.util.Arrays;
import java.util.List;
import java.util.Objects;

public class TaskQueue {

    private TaskOutput[] queue;
    private int front;
    private int rear;
    private int size;

    private static final int MAX_SIZE = 100;

    public TaskQueue() {
        queue = new TaskOutput[1]; // Inicia com capacidade mínima de 1
        front = 0;
        rear = -1;
        size = 0;
    }

    public void enqueue(TaskOutput task) {
        if (size == MAX_SIZE) {
            throw new IllegalStateException("Fila cheia");
        }

        if (size == queue.length) {
            // Expansão da fila para o dobro do tamanho atual ou até MAX_SIZE
            int newCapacity = Math.min(queue.length == 0 ? 1 : queue.length * 2, MAX_SIZE);
            TaskOutput[] newQueue = new TaskOutput[newCapacity];

            // Copia os elementos da fila original para o novo array
            System.arraycopy(queue, 0, newQueue, 0, size);

            queue = newQueue;  // Atualiza a fila
            front = 0;  // Sempre começa no índice 0 após a expansão
            rear = size - 1; // O rear aponta para o último item após a expansão
        }

        // Insere o item no final da fila
        rear = (rear + 1) % queue.length;
        queue[rear] = task;
        size++;
    }

    public TaskOutput dequeue() {
        if (size == 0) {
            throw new IllegalStateException("Fila vazia");
        }

        TaskOutput task = queue[front]; // Pega o item no início da fila
        queue[front] = null; // Limpa o item removido (libera o índice)
        front = (front + 1) % queue.length; // Avança o front circularmente
        size--; // Decrementa o tamanho da fila

        // Ajuste: caso a fila esteja com mais de 25% de espaço vazio, redimensiona
        if (size > 0 && size <= queue.length / 4) {
            // Se a fila estiver com muito espaço vazio, redimensiona para liberar memória
            int newCapacity = Math.max(queue.length / 2, 1);
            TaskOutput[] newQueue = new TaskOutput[newCapacity];

            // Copia os elementos da fila original para o novo array, considerando o novo tamanho
            if (front <= rear) {
                System.arraycopy(queue, front, newQueue, 0, size);
            } else {
                int firstPartLength = queue.length - front;
                System.arraycopy(queue, front, newQueue, 0, firstPartLength); // Copia a primeira parte
                System.arraycopy(queue, 0, newQueue, firstPartLength, rear + 1); // Copia a segunda parte
            }

            queue = newQueue;
            front = 0;
            rear = size - 1;
        }
        return task;
    }

    public boolean isEmpty() {
        return size == 0;
    }

    public int size() {
        return size;
    }

    public List<TaskOutput> listTasks() {
        return Arrays.asList(queue).stream().filter(Objects::nonNull).toList();
    }
}


