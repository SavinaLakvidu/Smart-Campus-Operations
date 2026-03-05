CREATE TABLE IF NOT EXISTS users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255),
    role ENUM('STUDENT','STAFF','ADMIN') NOT NULL,
    provider ENUM('LOCAL','GOOGLE') DEFAULT 'LOCAL',
    provider_user_id VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS resources (
    resource_id INT AUTO_INCREMENT PRIMARY KEY,
    resource_name VARCHAR(100) NOT NULL,
    resource_type VARCHAR(50) NOT NULL,
    location VARCHAR(100),
    capacity INT,
    status ENUM('AVAILABLE','UNAVAILABLE','MAINTENANCE') DEFAULT 'AVAILABLE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS bookings (
    booking_id INT AUTO_INCREMENT PRIMARY KEY,
    resource_id INT NOT NULL,
    user_id INT NOT NULL,

    booking_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,

    purpose VARCHAR(255),
    expected_attendees INT,

    status ENUM('PENDING','APPROVED','REJECTED','CANCELLED') DEFAULT 'PENDING',

    decision_reason VARCHAR(255),
    decided_by INT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_booking_resource
        FOREIGN KEY (resource_id) REFERENCES resources(resource_id),

    CONSTRAINT fk_booking_user
        FOREIGN KEY (user_id) REFERENCES users(user_id),

    CONSTRAINT fk_decided_by_admin
        FOREIGN KEY (decided_by) REFERENCES users(user_id)
);

CREATE INDEX idx_resource_date ON bookings(resource_id, booking_date);
CREATE INDEX idx_user_date ON bookings(user_id, booking_date);
CREATE INDEX idx_status ON bookings(status);