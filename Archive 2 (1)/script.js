document.addEventListener('DOMContentLoaded', () => {
    // Close button functionality
    const closeBtn = document.querySelector('.close-btn');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            // Add fade-out animation
            document.querySelector('.event-dashboard').style.opacity = '0';
            document.querySelector('.event-dashboard').style.transform = 'scale(0.95)';
            
            setTimeout(() => {
                window.close();
            }, 300);
        });
    }

    // Form Sections Animation
    const formSections = document.querySelectorAll('.form-section');
    formSections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, 100 * (index + 1));
    });

    // Form Validation
    const form = document.querySelector('.event-form');
    const inputs = form.querySelectorAll('input, select');

    inputs.forEach(input => {
        // Add focus effects
        input.addEventListener('focus', () => {
            input.closest('.form-field').classList.add('focused');
        });

        input.addEventListener('blur', () => {
            input.closest('.form-field').classList.remove('focused');
            validateField(input);
        });

        // Add change validation
        input.addEventListener('change', () => {
            validateField(input);
        });
    });

    // Date validation
    const startDate = form.querySelector('input[type="date"]:first-of-type');
    const endDate = form.querySelector('input[type="date"]:last-of-type');
    const startTime = form.querySelector('input[type="time"]:first-of-type');
    const endTime = form.querySelector('input[type="time"]:last-of-type');

    [startDate, endDate, startTime, endTime].forEach(input => {
        if (input) {
            input.addEventListener('change', () => {
                validateDates();
            });
        }
    });

    // Form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Validate all fields
        let isValid = true;
        inputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });

        if (!validateDates()) {
            isValid = false;
        }

        if (isValid) {
            // Add success animation
            const submitBtn = form.querySelector('button[type="submit"]');
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Saved';
            submitBtn.classList.add('success');
            
            // Simulate API call
            setTimeout(() => {
                window.close();
            }, 1000);
        }
    });

    // Validation functions
    function validateField(input) {
        const field = input.closest('.form-field');
        const value = input.value.trim();
        
        if (input.required && !value) {
            setFieldError(field, 'This field is required');
            return false;
        }
        
        // Remove any error states
        field.classList.remove('error');
        field.classList.add('success');
        const errorMessage = field.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
        
        return true;
    }

    function validateDates() {
        if (!startDate || !endDate || !startTime || !endTime) return true;

        const start = new Date(`${startDate.value} ${startTime.value}`);
        const end = new Date(`${endDate.value} ${endTime.value}`);

        if (end <= start) {
            setFieldError(endDate.closest('.form-field'), 'End date must be after start date');
            setFieldError(endTime.closest('.form-field'), 'End time must be after start time');
            return false;
        }

        return true;
    }

    function setFieldError(field, message) {
        field.classList.remove('success');
        field.classList.add('error');
        
        // Remove existing error message if any
        const existingError = field.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Add new error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        field.appendChild(errorDiv);
    }

    // Cancel button
    const cancelBtn = form.querySelector('.btn-secondary');
    if (cancelBtn) {
        cancelBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to cancel? All changes will be lost.')) {
                window.close();
            }
        });
    }

    // Add hover effects to info items
    const infoItems = document.querySelectorAll('.info-item');
    infoItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const icon = item.querySelector('i');
            icon.style.transform = 'scale(1.2)';
            icon.style.transition = 'transform 0.3s ease';
        });

        item.addEventListener('mouseleave', () => {
            const icon = item.querySelector('i');
            icon.style.transform = 'scale(1)';
        });
    });

    // Smooth scroll for modal content
    const modalContent = document.querySelector('.modal-content');
    if (modalContent) {
        modalContent.addEventListener('scroll', () => {
            requestAnimationFrame(() => {
                const sections = document.querySelectorAll('.content-section');
                sections.forEach(section => {
                    const rect = section.getBoundingClientRect();
                    if (rect.top < window.innerHeight && rect.bottom >= 0) {
                        section.style.opacity = '1';
                        section.style.transform = 'translateY(0)';
                    }
                });
            });
        });
    }

    // Initialize sections with fade-in effect
    const sections = document.querySelectorAll('.content-section');
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'all 0.3s ease';
        
        setTimeout(() => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, 100 * (index + 1));
    });
}); 