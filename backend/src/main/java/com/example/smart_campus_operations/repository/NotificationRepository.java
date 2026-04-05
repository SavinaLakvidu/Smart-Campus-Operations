package com.example.smart_campus_operations.repository;

import com.example.smart_campus_operations.entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
}
