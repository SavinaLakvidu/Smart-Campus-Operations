package com.example.smart_campus_operations.repository;

import com.example.smart_campus_operations.entity.User;
import com.example.smart_campus_operations.entity.enums.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    // Already existing
    Optional<User> findByEmailIgnoreCase(String email);

    // 🔥 NEW — check if email exists
    boolean existsByEmailIgnoreCase(String email);

    // 🔥 NEW — filter by role
    List<User> findByRole(UserRole role);

    // 🔥 NEW — search by username OR email
    List<User> findByUsernameContainingIgnoreCaseOrEmailContainingIgnoreCase(
            String username, String email
    );

    // 🔥 NEW — search + filter (role + keyword)
    List<User> findByRoleAndUsernameContainingIgnoreCaseOrRoleAndEmailContainingIgnoreCase(
            UserRole role1, String username,
            UserRole role2, String email
    );
}