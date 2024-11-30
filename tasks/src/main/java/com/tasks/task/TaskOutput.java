package com.tasks.task;

import java.time.LocalDateTime;

public record TaskOutput(Long id, String title, String description, TaskStatus status, LocalDateTime createdAt) {
}
