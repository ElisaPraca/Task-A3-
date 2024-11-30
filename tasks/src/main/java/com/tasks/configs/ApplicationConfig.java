package com.tasks.configs;

import com.tasks.lifo_fifo.TaskQueue;
import com.tasks.lifo_fifo.TaskStack;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ApplicationConfig {

    @Bean
    public TaskQueue taskQueue() {
        return new TaskQueue();
    }

    @Bean
    public TaskStack taskStack() {
        return new TaskStack();
    }
}
