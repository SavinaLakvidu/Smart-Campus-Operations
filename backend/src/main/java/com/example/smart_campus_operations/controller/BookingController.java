package com.example.smart_campus_operations.controller;

import com.example.smart_campus_operations.dto.BookingRequestDTO;
import com.example.smart_campus_operations.dto.BookingResponseDTO;
import com.example.smart_campus_operations.service.BookingService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/bookings")
@RequiredArgsConstructor
public class BookingController {

    private final BookingService bookingService;

    // POST /api/bookings — create a booking
    @PostMapping
    public ResponseEntity<BookingResponseDTO> createBooking(
            @Valid @RequestBody BookingRequestDTO dto,
            @RequestParam Integer userId) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(bookingService.createBooking(dto, userId));
    }

    // GET /api/bookings/my?userId=1 — get current user's bookings
    @GetMapping("/my")
    public ResponseEntity<List<BookingResponseDTO>> getMyBookings(
            @RequestParam Integer userId) {
        return ResponseEntity.ok(bookingService.getUserBookings(userId));
    }

    // GET /api/bookings — get all bookings (admin only)
    @GetMapping
    public ResponseEntity<List<BookingResponseDTO>> getAllBookings() {
        return ResponseEntity.ok(bookingService.getAllBookings());
    }

    // GET /api/bookings/{id} — get booking by ID
    @GetMapping("/{id}")
    public ResponseEntity<BookingResponseDTO> getBookingById(@PathVariable Integer id) {
        return ResponseEntity.ok(bookingService.getBookingById(id));
    }

    // PATCH /api/bookings/{id}/decision — approve or reject (admin only)
    @PatchMapping("/{id}/decision")
    public ResponseEntity<BookingResponseDTO> decideBooking(
            @PathVariable Integer id,
            @RequestParam String decision,
            @RequestParam(required = false) String reason,
            @RequestParam Integer adminId) {
        return ResponseEntity.ok(
                bookingService.decideBooking(id, decision, reason, adminId));
    }

    // PATCH /api/bookings/{id}/cancel — cancel a booking
    @PatchMapping("/{id}/cancel")
    public ResponseEntity<BookingResponseDTO> cancelBooking(
            @PathVariable Integer id,
            @RequestParam Integer userId) {
        return ResponseEntity.ok(bookingService.cancelBooking(id, userId));
    }
}