package com.example.smart_campus_operations.service;

import com.example.smart_campus_operations.entity.User;
import com.example.smart_campus_operations.entity.enums.UserProvider;
import com.example.smart_campus_operations.entity.enums.UserRole;
import com.example.smart_campus_operations.exception.ResourceNotFoundException;
import com.example.smart_campus_operations.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    @Transactional
    public User findOrCreateOauthUser(String email, String fullName) {
        return userRepository.findByEmailIgnoreCase(email)
                .map(existing -> {
                    existing.setUsername(fullName);
                    existing.setProvider(UserProvider.GOOGLE);
                    return userRepository.save(existing);
                })
                .orElseGet(() -> userRepository.save(User.builder()
                        .email(email)
                        .username(fullName)
                        .role(UserRole.STUDENT)
                        .provider(UserProvider.GOOGLE)
                        .build()));
    }

    @Transactional(readOnly = true)
    public User getByEmail(String email) {
        return userRepository.findByEmailIgnoreCase(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));
    }

    @Transactional(readOnly = true)
    public User getById(Integer id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + id));
    }

    public User getUserByEmail(String email) {
    return userRepository.findByEmailIgnoreCase(email)
            .orElseThrow(() -> new RuntimeException("User not found"));
    }
}
