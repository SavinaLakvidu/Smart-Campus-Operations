package com.example.smart_campus_operations.service;

import com.example.smart_campus_operations.dto.BookingRequestDTO;
import com.example.smart_campus_operations.dto.BookingResponseDTO;
import com.example.smart_campus_operations.entity.Booking;
import com.example.smart_campus_operations.entity.Resource;
import com.example.smart_campus_operations.entity.User;
import com.example.smart_campus_operations.entity.enums.BookingStatus;
import com.example.smart_campus_operations.repository.BookingRepository;
import com.example.smart_campus_operations.repository.ResourceRepository;
import com.example.smart_campus_operations.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BookingService {

    private final BookingRepository bookingRepository;
    private final ResourceRepository resourceRepository;
    private final UserRepository userRepository;

    // Create a new booking
    public BookingResponseDTO createBooking(BookingRequestDTO dto, Integer userId) {
        // Validate end time is after start time
        if (!dto.getEndTime().isAfter(dto.getStartTime())) {
            throw new IllegalArgumentException("End time must be after start time");
        }

        // Check resource exists
        Resource resource = resourceRepository.findById(dto.getResourceId())
            .orElseThrow(() -> new RuntimeException("Resource not found"));

        // Check resource is available
        if (resource.getStatus() != com.example.smart_campus_operations.entity.enums.ResourceStatus.AVAILABLE) {
            throw new IllegalStateException("Resource is not available for booking");
        }

        // Check capacity
        if (dto.getExpectedAttendees() != null && resource.getCapacity() != null) {
            if (dto.getExpectedAttendees() > resource.getCapacity()) {
                throw new IllegalArgumentException(
                    "Expected attendees exceed resource capacity of " + resource.getCapacity()
                );
            }
        }

        // Check for scheduling conflicts
        boolean conflict = bookingRepository.existsConflict(
            dto.getResourceId(),
            dto.getBookingDate(),
            dto.getStartTime(),
            dto.getEndTime()
        );
        if (conflict) {
            throw new IllegalStateException("Resource is already booked for this time slot");
        }

        // Get user
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));

        // Build and save booking
        Booking booking = Booking.builder()
            .resource(resource)
            .user(user)
            .bookingDate(dto.getBookingDate())
            .startTime(dto.getStartTime())
            .endTime(dto.getEndTime())
            .purpose(dto.getPurpose())
            .expectedAttendees(dto.getExpectedAttendees())
            .status(BookingStatus.PENDING)
            .build();

        return mapToResponse(bookingRepository.save(booking));
    }

    // Get all bookings for a user
    public List<BookingResponseDTO> getUserBookings(Integer userId) {
        return bookingRepository.findByUserUserId(userId)
            .stream()
            .map(this::mapToResponse)
            .collect(Collectors.toList());
    }

    // Get all bookings (admin only)
    public List<BookingResponseDTO> getAllBookings() {
        return bookingRepository.findAll()
            .stream()
            .map(this::mapToResponse)
            .collect(Collectors.toList());
    }

    // Get booking by ID
    public BookingResponseDTO getBookingById(Integer bookingId) {
        Booking booking = bookingRepository.findById(bookingId)
            .orElseThrow(() -> new RuntimeException("Booking not found"));
        return mapToResponse(booking);
    }

    // Approve or reject a booking (admin only)
    public BookingResponseDTO decideBooking(Integer bookingId, String decision,
                                            String reason, Integer adminId) {
        Booking booking = bookingRepository.findById(bookingId)
            .orElseThrow(() -> new RuntimeException("Booking not found"));

        if (booking.getStatus() != BookingStatus.PENDING) {
            throw new IllegalStateException("Only PENDING bookings can be approved or rejected");
        }

        User admin = userRepository.findById(adminId)
            .orElseThrow(() -> new RuntimeException("Admin not found"));

        if (decision.equalsIgnoreCase("APPROVE")) {
            booking.setStatus(BookingStatus.APPROVED);
        } else if (decision.equalsIgnoreCase("REJECT")) {
            if (reason == null || reason.isBlank()) {
                throw new IllegalArgumentException("A reason is required when rejecting a booking");
            }
            booking.setStatus(BookingStatus.REJECTED);
        } else {
            throw new IllegalArgumentException("Decision must be APPROVE or REJECT");
        }

        booking.setDecisionReason(reason);
        booking.setDecidedBy(admin);

        return mapToResponse(bookingRepository.save(booking));
    }

    // Cancel a booking (user cancels their own approved booking)
    public BookingResponseDTO cancelBooking(Integer bookingId, Integer userId) {
        Booking booking = bookingRepository.findById(bookingId)
            .orElseThrow(() -> new RuntimeException("Booking not found"));

        if (!booking.getUser().getUserId().equals(userId)) {
            throw new IllegalStateException("You can only cancel your own bookings");
        }

        if (booking.getStatus() != BookingStatus.APPROVED &&
            booking.getStatus() != BookingStatus.PENDING) {
            throw new IllegalStateException("Only APPROVED or PENDING bookings can be cancelled");
        }

        booking.setStatus(BookingStatus.CANCELLED);
        return mapToResponse(bookingRepository.save(booking));
    }

    // Map entity to response DTO
    private BookingResponseDTO mapToResponse(Booking booking) {
        return BookingResponseDTO.builder()
            .bookingId(booking.getBookingId())
            .resourceId(booking.getResource().getResourceId())
            .resourceName(booking.getResource().getResourceName())
            .resourceLocation(booking.getResource().getLocation())
            .userId(booking.getUser().getUserId())
            .username(booking.getUser().getUsername())
            .bookingDate(booking.getBookingDate())
            .startTime(booking.getStartTime())
            .endTime(booking.getEndTime())
            .purpose(booking.getPurpose())
            .expectedAttendees(booking.getExpectedAttendees())
            .status(booking.getStatus())
            .decisionReason(booking.getDecisionReason())
            .decidedBy(booking.getDecidedBy() != null ?
                booking.getDecidedBy().getUsername() : null)
            .createdAt(booking.getCreatedAt())
            .updatedAt(booking.getUpdatedAt())
            .build();
    }
}