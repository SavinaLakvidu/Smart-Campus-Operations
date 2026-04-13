package com.example.smart_campus_operations.service;

import com.example.smart_campus_operations.dto.request.CreateUserRequest;
import com.example.smart_campus_operations.entity.User;
import com.example.smart_campus_operations.entity.enums.UserProvider;
import com.example.smart_campus_operations.entity.enums.UserRole;
import com.example.smart_campus_operations.exception.ResourceNotFoundException;
import com.example.smart_campus_operations.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

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

    @Transactional(readOnly = true)
    public User getUserByEmail(String email) {
        return userRepository.findByEmailIgnoreCase(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    @Transactional
    public User createUser(CreateUserRequest request) {
        if (userRepository.existsByEmailIgnoreCase(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        UserRole role = UserRole.valueOf(request.getRole().toUpperCase());
        UserProvider provider = UserProvider.valueOf(request.getProvider().toUpperCase());

        String encodedPassword = null;

        if (provider == UserProvider.LOCAL) {
            if (request.getPassword() == null || request.getPassword().isBlank()) {
                throw new RuntimeException("Password is required for LOCAL users");
            }
            encodedPassword = passwordEncoder.encode(request.getPassword());
        }

        User user = User.builder()
                .username(request.getUsername())
                .email(request.getEmail())
                .password(encodedPassword)
                .role(role)
                .provider(provider)
                .providerUserId(null)
                .build();

        return userRepository.save(user);
    }

    @Transactional(readOnly = true)
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Transactional(readOnly = true)
    public List<User> searchAndFilterUsers(String keyword, String role) {
        boolean hasKeyword = keyword != null && !keyword.isBlank();
        boolean hasRole = role != null && !role.isBlank();

        if (hasKeyword && hasRole) {
            UserRole userRole = UserRole.valueOf(role.toUpperCase());
            return userRepository.findByRoleAndUsernameContainingIgnoreCaseOrRoleAndEmailContainingIgnoreCase(
                    userRole, keyword,
                    userRole, keyword
            );
        }

        if (hasKeyword) {
            return userRepository.findByUsernameContainingIgnoreCaseOrEmailContainingIgnoreCase(keyword, keyword);
        }

        if (hasRole) {
            UserRole userRole = UserRole.valueOf(role.toUpperCase());
            return userRepository.findByRole(userRole);
        }

        return userRepository.findAll();
    }
}