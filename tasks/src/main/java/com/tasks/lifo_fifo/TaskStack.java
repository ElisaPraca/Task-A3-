package com.tasks.lifo_fifo;

import com.tasks.task.TaskOutput;
import java.util.Arrays;

/**
 * Representa uma estrutura de dados de pilha (Stack) com tamanho fixo,
 * mas que começa vazia e cresce conforme necessário até um limite máximo.
 */
public class TaskStack {

    /**
     * Array que armazena as tarefas na pilha.
     */
    private TaskOutput[] stack;

    /**
     * Índice do topo da pilha.
     */
    private int top;

    /**
     * Tamanho máximo da pilha.
     */
    private static final int MAX_SIZE = 100;

    /**
     * Constrói uma nova pilha vazia.
     */
    public TaskStack() {
        stack = new TaskOutput[0]; // Começa com tamanho 0
        top = -1;
    }

    /**
     * Adiciona uma nova tarefa ao topo da pilha, redimensionando conforme necessário.
     *
     * @param task A tarefa a ser adicionada à pilha.
     * @throws IllegalStateException Se o tamanho máximo da pilha for atingido.
     */
    public void push(TaskOutput task) {
        if (size() == MAX_SIZE) {
            throw new IllegalStateException("Pilha cheia");
        }
        if (stack.length == size()) {
            int newCapacity = Math.min(stack.length == 0 ? 1 : stack.length * 2, MAX_SIZE);
            stack = Arrays.copyOf(stack, newCapacity);
        }
        stack[++top] = task;
    }

    /**
     * Remove e retorna a tarefa no topo da pilha (última tarefa inserida).
     *
     * @return A tarefa que foi removida do topo da pilha.
     * @throws IllegalStateException Se a pilha estiver vazia.
     */
    public TaskOutput pop() {
        if (isEmpty()) {
            throw new IllegalStateException("Pilha vazia");
        }
        TaskOutput task = stack[top];
        stack[top--] = null; // Limpa a posição
        return task;
    }

    /**
     * Verifica se a pilha está vazia.
     *
     * @return {@code true} se a pilha estiver vazia, {@code false} caso contrário.
     */
    public boolean isEmpty() {
        return top == -1;
    }

    /**
     * Retorna o número de tarefas atualmente na pilha.
     *
     * @return O tamanho atual da pilha.
     */
    public int size() {
        return top + 1;
    }

    /**
     * Retorna a pilha como um array.
     *
     * @return Um array contendo todas as tarefas na pilha.
     */
    public TaskOutput[] listTasks() {
        return Arrays.copyOf(stack, size());
    }
}
