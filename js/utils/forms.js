/**
 * Forms handler
 */
const Forms = {
    /**
     * Initialize the forms handler
     */
    init: function() {
        // Set up event listeners for form elements
        document.addEventListener('change', e => {
            // Handle settings toggles
            if (e.target.id === 'notifications') {
                State.update('user.notifications', e.target.checked);
                Toast.show('Notifications', e.target.checked ? 'Notifications enabled' : 'Notifications disabled', 'info');
            }
            
            if (e.target.id === 'darkMode') {
                State.update('user.darkMode', e.target.checked);
                Toast.show('Dark Mode', e.target.checked ? 'Dark mode enabled' : 'Dark mode disabled', 'info');
                
                // Apply dark mode (implement this for your UI)
                if (e.target.checked) {
                    document.documentElement.classList.add('dark-mode');
                } else {
                    document.documentElement.classList.remove('dark-mode');
                }
            }
        });
        this.setupProfileAvatarPreview();
    },
    
    /**
     * Initialize form validation for all service forms
     */
    initValidation: function() {
        this.setupFormValidation();
        this.setupRealTimeValidation();
        this.setupStepValidation();
        this.setupFileUploadPreviews();
        this.setupConditionalFields();
    },

    /**
     * Setup form validation for all service forms
     */
    setupFormValidation: function() {
        // Add validation to all form controls
        document.addEventListener('blur', (e) => {
            if (e.target.matches('input, select, textarea')) {
                this.validateField(e.target);
            }
        }, true);

        // Add validation on form submission
        document.addEventListener('submit', (e) => {
            if (e.target.matches('form')) {
                e.preventDefault();
                this.validateForm(e.target);
            }
        });
    },

    /**
     * Setup real-time validation
     */
    setupRealTimeValidation: function() {
        // Validate on input for immediate feedback
        document.addEventListener('input', (e) => {
            if (e.target.matches('input, select, textarea')) {
                // Clear error on input
                this.clearFieldError(e.target);
                
                // Validate after a short delay for better UX
                clearTimeout(e.target.validationTimer);
                e.target.validationTimer = setTimeout(() => {
                    this.validateField(e.target);
                }, 500);
            }
        });
    },

    /**
     * Setup step validation for multi-step forms
     */
    setupStepValidation: function() {
        // Handle step navigation with validation
        document.addEventListener('click', (e) => {
            const stepBtn = e.target.closest('[data-action="goto-slide"], [data-action="next-step"]');
            if (stepBtn) {
                e.preventDefault();
                const targetStep = stepBtn.getAttribute('data-target') || stepBtn.getAttribute('data-step');
                const currentStep = this.getCurrentStep();
                
                if (this.validateCurrentStep(currentStep)) {
                    this.navigateToStep(targetStep);
                } else {
                    this.showStepError(currentStep);
                }
            }
        });
    },

    /**
     * Validate individual field
     */
    validateField: function(field) {
        const value = field.value.trim();
        const fieldName = field.getAttribute('placeholder') || field.getAttribute('name') || field.getAttribute('id') || 'هذا الحقل';
        
        // Clear existing error
        this.clearFieldError(field);
        
        // Check if required field is empty
        if (field.hasAttribute('required') && !value) {
            this.showFieldError(field, `${fieldName} مطلوب`);
            return false;
        }
        
        // Skip validation if field is empty and not required
        if (!value && !field.hasAttribute('required')) {
            return true;
        }
        
        // Email validation
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                this.showFieldError(field, 'البريد الإلكتروني غير صحيح');
                return false;
            }
        }
        
        // Phone validation
        if (field.type === 'tel' && value) {
            const phoneRegex = /^[\+]?[0-9\s\-\(\)]{8,}$/;
            if (!phoneRegex.test(value)) {
                this.showFieldError(field, 'رقم الهاتف غير صحيح');
                return false;
            }
        }
        
        // Number validation
        if (field.type === 'number' && value) {
            const numValue = parseFloat(value);
            if (isNaN(numValue) || numValue < 0) {
                this.showFieldError(field, 'يجب إدخال رقم صحيح موجب');
                return false;
            }
            
            // Check min/max values
            const min = field.getAttribute('min');
            const max = field.getAttribute('max');
            
            if (min && numValue < parseFloat(min)) {
                this.showFieldError(field, `القيمة يجب أن تكون ${min} أو أكثر`);
                return false;
            }
            
            if (max && numValue > parseFloat(max)) {
                this.showFieldError(field, `القيمة يجب أن تكون ${max} أو أقل`);
                return false;
            }
        }
        
        // URL validation
        if (field.type === 'url' && value) {
            try {
                new URL(value);
            } catch {
                this.showFieldError(field, 'الرابط غير صحيح');
                return false;
            }
        }
        
        // Date validation
        if (field.type === 'date' && value) {
            const date = new Date(value);
            if (isNaN(date.getTime())) {
                this.showFieldError(field, 'التاريخ غير صحيح');
                return false;
            }
            
            // Check if date is in the past for expiry dates
            if (field.getAttribute('data-future-only') && date < new Date()) {
                this.showFieldError(field, 'التاريخ يجب أن يكون في المستقبل');
                return false;
            }
        }
        
        // Custom validation for specific fields
        if (field.id === 'licensePlate' && value) {
            const plateRegex = /^[0-9]{2,3}\s?[أ-ي]{1,3}\s?[0-9]{3,4}$/;
            if (!plateRegex.test(value)) {
                this.showFieldError(field, 'رقم اللوحة غير صحيح');
                return false;
            }
        }
        
        // Show success state
        this.showFieldSuccess(field);
        return true;
    },

    /**
     * Show field error
     */
    showFieldError: function(field, message) {
        field.classList.add('error');
        field.classList.remove('success');
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.textContent = message;
        errorDiv.style.color = '#dc3545';
        errorDiv.style.fontSize = '0.875rem';
        errorDiv.style.marginTop = '4px';
        errorDiv.style.display = 'flex';
        errorDiv.style.alignItems = 'center';
        errorDiv.style.gap = '4px';
        
        // Add error icon
        errorDiv.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
        
        field.parentNode.appendChild(errorDiv);
        
        // Add shake animation
        field.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => {
            field.style.animation = '';
        }, 500);
    },

    /**
     * Show field success
     */
    showFieldSuccess: function(field) {
        field.classList.remove('error');
        field.classList.add('success');
        
        // Remove success message after a delay
        setTimeout(() => {
            field.classList.remove('success');
        }, 2000);
    },

    /**
     * Clear field error
     */
    clearFieldError: function(field) {
        field.classList.remove('error', 'success');
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
    },

    /**
     * Validate entire form
     */
    validateForm: function(form) {
        const requiredFields = form.querySelectorAll('input[required], select[required], textarea[required]');
        let isValid = true;
        let firstErrorField = null;
        
        requiredFields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
                if (!firstErrorField) {
                    firstErrorField = field;
                }
            }
        });
        
        // Validate dynamic items (banks, documents, etc.)
        const dynamicValidation = this.validateDynamicItems(form);
        if (!dynamicValidation.isValid) {
            isValid = false;
            if (!firstErrorField) {
                firstErrorField = dynamicValidation.firstError;
            }
        }
        
        if (!isValid && firstErrorField) {
            // Scroll to first error
            firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
            firstErrorField.focus();
            
            // Show error toast
            if (window.Toast) {
                Toast.show('خطأ في التحقق', 'يرجى تصحيح الأخطاء المذكورة أعلاه', 'error');
            }
        }
        
        return isValid;
    },

    /**
     * Validate dynamic items (banks, documents, materials, etc.)
     */
    validateDynamicItems: function(form) {
        let isValid = true;
        let firstError = null;
        
        // Check for minimum required items
        const itemTypes = ['bank', 'document', 'material', 'service', 'authority', 'team-member', 'driver', 'maintenance'];
        
        itemTypes.forEach(type => {
            const items = form.querySelectorAll(`.${type}-item, .lcf-${type}-item, .pkg-${type}-item, .cof-${type}-item, .shipping-${type}-item`);
            const minRequired = form.getAttribute(`data-min-${type}s`) || 1;
            
            if (items.length < minRequired) {
                isValid = false;
                
                // Show error message
                const errorMsg = `يجب إضافة ${minRequired} ${this.getItemTypeName(type)} على الأقل`;
                if (window.Toast) {
                    Toast.show('خطأ في التحقق', errorMsg, 'error');
                }
                
                if (!firstError) {
                    firstError = items[0] || form;
                }
            }
        });
        
        return { isValid, firstError };
    },

    /**
     * Get item type name in Arabic
     */
    getItemTypeName: function(type) {
        const names = {
            'bank': 'بنك',
            'document': 'مستند',
            'material': 'مادة',
            'service': 'خدمة',
            'authority': 'جهة جمركية',
            'team-member': 'عضو فريق',
            'driver': 'سائق',
            'maintenance': 'صيانة'
        };
        return names[type] || type;
    },

    /**
     * Get current step
     */
    getCurrentStep: function() {
        const activeSlide = document.querySelector('.form-slide.active, .shipping-form-slide.active, .lcf-form-slide.active, .pkg-form-slide.active, .cof-form-slide.active');
        return activeSlide ? activeSlide.getAttribute('data-slide') : 'basic';
    },

    /**
     * Validate current step
     */
    validateCurrentStep: function(step) {
        const stepElement = document.querySelector(`[data-slide="${step}"]`);
        if (!stepElement) return true;
        
        const requiredFields = stepElement.querySelectorAll('input[required], select[required], textarea[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });
        
        return isValid;
    },

    /**
     * Navigate to step
     */
    navigateToStep: function(targetStep) {
        // Update progress indicator
        const progressSteps = document.querySelectorAll('.progress-step, .shipping-progress-step, .lcf-progress-step, .pkg-progress-step, .cof-progress-step');
        progressSteps.forEach(stepEl => {
            stepEl.classList.remove('active', 'completed');
        });
        
        // Mark completed steps
        const stepOrder = ['basic', 'banks', 'documents', 'fees', 'specs', 'staff', 'materials', 'services'];
        const currentIndex = stepOrder.indexOf(this.getCurrentStep());
        const targetIndex = stepOrder.indexOf(targetStep);
        
        stepOrder.forEach((stepName, index) => {
            const stepEl = document.querySelector(`[data-step="${stepName}"]`);
            if (stepEl) {
                if (index < targetIndex) {
                    stepEl.classList.add('completed');
                } else if (index === targetIndex) {
                    stepEl.classList.add('active');
                }
            }
        });
        
        // Update form slides
        const slides = document.querySelectorAll('.form-slide, .shipping-form-slide, .lcf-form-slide, .pkg-form-slide, .cof-form-slide');
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        const targetSlide = document.querySelector(`[data-slide="${targetStep}"]`);
        if (targetSlide) {
            targetSlide.classList.add('active');
        }
        
        // Scroll to top of form
        const form = document.querySelector('form');
        if (form) {
            form.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    },

    /**
     * Show step error
     */
    showStepError: function(step) {
        const stepElement = document.querySelector(`[data-slide="${step}"]`);
        if (stepElement) {
            stepElement.style.animation = 'shake 0.5s ease-in-out';
            setTimeout(() => {
                stepElement.style.animation = '';
            }, 500);
        }
        
        if (window.Toast) {
            Toast.show('خطأ في التحقق', 'يرجى إكمال جميع الحقول المطلوبة في هذه الخطوة', 'error');
        }
    },

    /**
     * Handle form submission
     * @param {string} formId - ID of the form to submit
     */
    handleSubmit: function(formId) {
        const form = document.getElementById(formId);
        
        if (!form) return;
        
        // Validate form
        if (!this.validateForm(form)) {
            return;
        }
        
        // Handle different forms
        if (formId === 'exampleForm') {
            const nameInput = form.querySelector('#name');
            const emailInput = form.querySelector('#email');
            const messageInput = form.querySelector('#message');
            
            // Show success message
            if (window.Toast) {
                Toast.show('تم الإرسال', 'شكراً لك على إرسال النموذج!', 'success');
            }
            
            // Reset form
            form.reset();
        }
    },

    /**
     * Add CSS animations for validation
     */
    addValidationStyles: function() {
        if (!document.getElementById('validation-styles')) {
            const style = document.createElement('style');
            style.id = 'validation-styles';
            style.textContent = `
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-5px); }
                    75% { transform: translateX(5px); }
                }
                
                .form-control.error {
                    border-color: #dc3545 !important;
                    box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, 0.25) !important;
                }
                
                .form-control.success {
                    border-color: #28a745 !important;
                    box-shadow: 0 0 0 0.2rem rgba(40, 167, 69, 0.25) !important;
                }
                
                .field-error {
                    color: #dc3545;
                    font-size: 0.875rem;
                    margin-top: 4px;
                    display: flex;
                    align-items: center;
                    gap: 4px;
                }
                
                .field-error i {
                    font-size: 0.75rem;
                }
                
                .progress-step.completed {
                    background-color: #28a745;
                    color: white;
                }
                
                .progress-step.error {
                    background-color: #dc3545;
                    color: white;
                }
            `;
            document.head.appendChild(style);
        }
    },

    /**
     * Set up file upload previews for all file inputs
     */
    setupFileUploadPreviews: function() {
        document.addEventListener('change', function(e) {
            if (e.target.type === 'file') {
                const input = e.target;
                const files = input.files;
                const fileNameSpan = input.parentNode.querySelector('.file-name, .register-screen-file-name, .wh-file-name');
                const previewContainer = input.parentNode.querySelector('.image-preview-grid, #warehouseImagesPreview');
                if (fileNameSpan) {
                    if (files.length === 0) {
                        fileNameSpan.innerHTML = '<i class="fa-regular fa-file"></i> لم يتم اختيار ملف';
                    } else if (files.length === 1) {
                        fileNameSpan.innerHTML = `<i class="fa-regular fa-file"></i> ${files[0].name}`;
                    } else {
                        fileNameSpan.innerHTML = `<i class="fa-regular fa-file"></i> ${files.length} ملفات مختارة`;
                    }
                }
                // Image preview for images only
                if (previewContainer) {
                    previewContainer.innerHTML = '';
                    Array.from(files).forEach(file => {
                        if (file.type.startsWith('image/')) {
                            const reader = new FileReader();
                            reader.onload = function(ev) {
                                const img = document.createElement('img');
                                img.src = ev.target.result;
                                img.className = 'preview-thumb';
                                img.style.maxWidth = '80px';
                                img.style.maxHeight = '80px';
                                img.style.margin = '4px';
                                previewContainer.appendChild(img);
                            };
                            reader.readAsDataURL(file);
                        }
                    });
                }
            }
        });
    },

    /**
     * Set up conditional logic for registration form fields
     */
    setupConditionalFields: function() {
        // Show Tax Card only if country is Yemen
        document.addEventListener('change', function(e) {
            if (e.target.id === 'country') {
                const taxCardGroup = document.getElementById('taxCardGroup');
                if (taxCardGroup) {
                    if (e.target.value === 'Yemen' || e.target.value === 'اليمن') {
                        taxCardGroup.style.display = '';
                    } else {
                        taxCardGroup.style.display = 'none';
                    }
                }
            }
        });
    },

    /**
     * Set up profile avatar preview
     */
    setupProfileAvatarPreview: function() {
        const avatarInput = document.getElementById('profileAvatar');
        const avatarPreview = document.getElementById('profileAvatarPreview');
        if (avatarInput && avatarPreview) {
            avatarInput.addEventListener('change', function() {
                if (avatarInput.files && avatarInput.files[0]) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        avatarPreview.src = e.target.result;
                    };
                    reader.readAsDataURL(avatarInput.files[0]);
                }
            });
        }
    }
};

// Initialize validation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    Forms.initValidation();
    Forms.addValidationStyles();
});

// Export for use in other modules
window.Forms = Forms;