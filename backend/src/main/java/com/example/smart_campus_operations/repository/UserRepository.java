package com.example.smart_campus_operations.repository;

import com.example.smart_campus_operations.entity.User;
import com.example.smart_campus_operations.entity.enums.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByEmailIgnoreCase(String email);

    List<User> findByRoleInOrderByUsernameAsc(Collection<UserRole> roles);
}