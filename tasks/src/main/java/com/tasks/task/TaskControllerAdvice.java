package com.tasks.task;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import java.util.NoSuchElementException;

/**
 * O {@code TaskControllerAdvice} é um controlador global de exceções para o controlador de tarefas.
 * Ele intercepta e trata as exceções lançadas pelos métodos do {@code TaskController}.
 *
 * <p>Este controlador captura exceções específicas e retorna respostas HTTP apropriadas
 * com base no tipo de exceção ocorrida.</p>
 *
 * @author [Seu Nome]
 * @version 1.0
 */
@RestControllerAdvice
public class TaskControllerAdvice {

    /**
     * Captura exceções do tipo {@link EntityNotFoundException} e retorna uma resposta HTTP 404 (Not Found).
     *
     * @param ex A exceção {@link EntityNotFoundException} lançada quando a entidade não é encontrada.
     * @return {@link ResponseEntity} com a mensagem de erro e o status HTTP 404 (Not Found).
     */
    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<String> handleEntityNotFound(EntityNotFoundException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
    }

    /**
     * Captura exceções do tipo {@link IllegalStateException} e retorna uma resposta HTTP 400 (Bad Request).
     *
     * @param ex A exceção {@link IllegalStateException} lançada quando ocorre uma condição ilegal no estado da aplicação.
     * @return {@link ResponseEntity} com a mensagem de erro e o status HTTP 400 (Bad Request).
     */
    @ExceptionHandler(IllegalStateException.class)
    public ResponseEntity<String> handleIllegalState(IllegalStateException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
    }

    /**
     * Captura todas as exceções genéricas que não foram tratadas anteriormente e retorna uma resposta HTTP 500 (Internal Server Error).
     *
     * @param ex A exceção genérica que foi lançada no controlador.
     * @return {@link ResponseEntity} com uma mensagem de erro genérica e o status HTTP 500 (Internal Server Error).
     */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleGeneralException(Exception ex) {
        return new ResponseEntity<>("Ocorreu um erro inesperado: " + ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    /**
     * Captura exceções do tipo {@link NoSuchElementException} e retorna uma resposta HTTP 404 (Not Found).
     *
     * @param ex A exceção {@link NoSuchElementException} lançada quando um elemento não é encontrado em coleções ou listas.
     * @return {@link ResponseEntity} com a mensagem de erro e o status HTTP 404 (Not Found).
     */
    @ExceptionHandler(NoSuchElementException.class)
    public ResponseEntity<String> handleNoSuchElement(NoSuchElementException ex) {
        return new ResponseEntity<>("Elemento não encontrado: " + ex.getMessage(), HttpStatus.NOT_FOUND);
    }
}
