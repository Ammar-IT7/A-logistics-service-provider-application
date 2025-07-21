/**
 * Offer Form Controller
 * Modern UX with enhanced functionality - Updated to use offer-specific class names
 */
const OfferFormController = {
    currentStep: 1,
    totalSteps: 4,
    formData: {},
    
    /**
     * Initialize the controller
     */
    init: function() {
        console.log('OfferFormController initialized');
        console.log('Current step:', this.currentStep);
        console.log('Total steps:', this.totalSteps);
        
        this.setupEventListeners();
        this.initializeForm();
        this.setupChips();
        this.setupPricingCalculations();
        this.updateProgressBar();
        
        // Test: Check if all slides exist
        const slides = document.querySelectorAll('.offer-form-slide');
        console.log('Found slides:', slides.length);
        slides.forEach((slide, index) => {
            console.log(`Slide ${index + 1}:`, slide.getAttribute('data-step'), slide.classList.contains('active'));
        });
    },

    /**
     * Set up event listeners
     */
    setupEventListeners: function() {
        // Navigation buttons
        document.getElementById('nextStep').addEventListener('click', () => this.nextStep());
        document.getElementById('prevStep').addEventListener('click', () => this.prevStep());
        document.getElementById('submitForm').addEventListener('click', (e) => this.submitForm(e));

        // Form submission
        document.getElementById('offerForm').addEventListener('submit', (e) => this.submitForm(e));

        // Add feature button
        document.getElementById('addFeature').addEventListener('click', () => this.addFeature());
        document.getElementById('addService').addEventListener('click', () => this.addService());

        // Input events
        document.getElementById('featureInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.addFeature();
            }
        });

        // Form validation on input
        document.querySelectorAll('.offer-form-control').forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });

        // Pricing calculations
        document.querySelector('input[name="basePrice"]').addEventListener('input', () => this.calculateFinalPrice());
        document.querySelector('input[name="discountPercentage"]').addEventListener('input', () => this.calculateFinalPrice());
    },

    /**
     * Initialize form with default values
     */
    initializeForm: function() {
        // Set default values and populate with real-world data
        this.populateDefaultData();
        this.updateNavigationButtons();
    },

    /**
     * Populate form with realistic default data
     */
    populateDefaultData: function() {
        // Set default values for offer form
        const defaultValues = {
            'offerTitle': 'عرض تخزين مكيف مع خدمات متقدمة',
            'offerDescription': 'نقدم خدمات تخزين مكيف عالية الجودة مع نظام أمان متقدم وخدمة 24/7. تشمل الخدمة مساحات تخزين آمنة ومكيفة مع إمكانية الوصول على مدار الساعة.',
            'serviceLocation': 'الرياض، المملكة العربية السعودية',
            'deliveryTime': 'immediate',
            'offerValidity': '7',
            'contactPerson': 'أحمد محمد',
            'basePrice': '5000',
            'priceUnit': 'monthly',
            'paymentTerms': 'monthly',
            'warrantyPeriod': '90',
            'cancellationPolicy': 'moderate',
            'termsConditions': '1. الخدمة متاحة على مدار 24/7\n2. ضمان 90 يوم على جميع الخدمات\n3. إمكانية الإلغاء مع إشعار مسبق\n4. أسعار ثابتة طوال مدة العقد\n5. تقارير شهرية مفصلة'
        };

        // Apply default values
        Object.keys(defaultValues).forEach(key => {
            const element = document.querySelector(`[name="${key}"]`);
            if (element && !element.value) {
                element.value = defaultValues[key];
            }
        });

        // Calculate initial final price
        this.calculateFinalPrice();
    },

    /**
     * Setup chips functionality
     */
    setupChips: function() {
        // Remove chip functionality
        window.removeChip = function(element) {
            element.closest('.offer-form-chip').remove();
        };

        // Remove result functionality
        window.removeResult = function(element) {
            element.closest('.offer-form-result-item').remove();
        };
    },

    /**
     * Setup pricing calculations
     */
    setupPricingCalculations: function() {
        this.calculateFinalPrice();
    },

    /**
     * Calculate final price
     */
    calculateFinalPrice: function() {
        const basePriceInput = document.querySelector('input[name="basePrice"]');
        const discountInput = document.querySelector('input[name="discountPercentage"]');
        const finalPriceInput = document.querySelector('input[name="finalPrice"]');
        
        if (basePriceInput && discountInput && finalPriceInput) {
            const basePrice = parseFloat(basePriceInput.value) || 0;
            const discount = parseFloat(discountInput.value) || 0;
            const finalPrice = basePrice - (basePrice * discount / 100);
            finalPriceInput.value = finalPrice.toFixed(2);
        }
    },

    /**
     * Add feature chip
     */
    addFeature: function() {
        const input = document.getElementById('featureInput');
        const value = input.value.trim();
        
        if (value) {
            this.addChip('offerFeaturesChips', value);
            input.value = '';
            input.focus();
        }
    },

    /**
     * Add chip to container
     */
    addChip: function(containerId, text) {
        const container = document.getElementById(containerId);
        const chip = document.createElement('div');
        chip.className = 'offer-form-chip';
        chip.innerHTML = `
            <span>${text}</span>
            <span class="offer-form-chip-close" onclick="removeChip(this)">×</span>
        `;
        
        // Add animation
        chip.style.opacity = '0';
        chip.style.transform = 'scale(0.8)';
        container.appendChild(chip);
        
        // Animate in
        setTimeout(() => {
            chip.style.transition = 'all 0.3s ease';
            chip.style.opacity = '1';
            chip.style.transform = 'scale(1)';
        }, 10);
    },

    /**
     * Add service item
     */
    addService: function() {
        const container = document.querySelector('.offer-form-results-container');
        const serviceItem = document.createElement('div');
        serviceItem.className = 'offer-form-result-item';
        serviceItem.innerHTML = `
            <input type="text" name="serviceNames[]" class="offer-form-control" placeholder="اسم الخدمة" required>
            <input type="number" name="servicePrices[]" class="offer-form-control" placeholder="السعر" required>
            <button type="button" class="btn btn-outline btn-sm" onclick="removeResult(this)">
                <i class="fas fa-trash"></i>
            </button>
        `;
        
        container.appendChild(serviceItem);
        
        // Add animation
        serviceItem.style.opacity = '0';
        serviceItem.style.transform = 'translateY(20px)';
        setTimeout(() => {
            serviceItem.style.transition = 'all 0.3s ease';
            serviceItem.style.opacity = '1';
            serviceItem.style.transform = 'translateY(0)';
        }, 10);
    },

    /**
     * Navigate to next step
     */
    nextStep: function() {
        console.log('Next step clicked. Current step:', this.currentStep);
        
        // Temporarily bypass validation for testing
        if (this.currentStep < this.totalSteps) {
            this.currentStep++;
            console.log('Moving to step:', this.currentStep);
            this.showStep(this.currentStep);
            this.updateProgressBar();
            this.updateNavigationButtons();
        }
        
        // Original validation code (commented for testing)
        /*
        if (this.validateCurrentStep()) {
            if (this.currentStep < this.totalSteps) {
                this.currentStep++;
                console.log('Moving to step:', this.currentStep);
                this.showStep(this.currentStep);
                this.updateProgressBar();
                this.updateNavigationButtons();
            }
        } else {
            console.log('Validation failed for step:', this.currentStep);
        }
        */
    },

    /**
     * Navigate to previous step
     */
    prevStep: function() {
        console.log('Previous step clicked. Current step:', this.currentStep);
        if (this.currentStep > 1) {
            this.currentStep--;
            console.log('Moving to step:', this.currentStep);
            this.showStep(this.currentStep);
            this.updateProgressBar();
            this.updateNavigationButtons();
        }
    },

    /**
     * Show specific step
     */
    showStep: function(step) {
        console.log('Showing step:', step);
        
        // Hide all slides
        const allSlides = document.querySelectorAll('.offer-form-slide');
        console.log('Found slides:', allSlides.length);
        
        allSlides.forEach(slide => {
            slide.classList.remove('active');
            console.log('Removed active from slide:', slide.getAttribute('data-step'));
        });
        
        // Show current slide
        const currentSlide = document.querySelector(`.offer-form-slide[data-step="${step}"]`);
        console.log('Current slide element:', currentSlide);
        
        if (currentSlide) {
            currentSlide.classList.add('active');
            console.log('Added active to slide:', step);
        } else {
            console.error('Slide not found for step:', step);
        }
    },

    /**
     * Update progress bar
     */
    updateProgressBar: function() {
        const steps = document.querySelectorAll('.offer-form-progress-step');
        
        steps.forEach((step, index) => {
            const stepNumber = index + 1;
            step.classList.remove('active', 'completed');
            
            if (stepNumber < this.currentStep) {
                step.classList.add('completed');
            } else if (stepNumber === this.currentStep) {
                step.classList.add('active');
            }
        });
    },

    /**
     * Update navigation buttons
     */
    updateNavigationButtons: function() {
        const prevBtn = document.getElementById('prevStep');
        const nextBtn = document.getElementById('nextStep');
        const submitBtn = document.getElementById('submitForm');
        
        // Show/hide previous button
        if (this.currentStep > 1) {
            prevBtn.style.display = 'flex';
        } else {
            prevBtn.style.display = 'none';
        }
        
        // Show/hide next and submit buttons
        if (this.currentStep === this.totalSteps) {
            nextBtn.style.display = 'none';
            submitBtn.style.display = 'flex';
        } else {
            nextBtn.style.display = 'flex';
            submitBtn.style.display = 'none';
        }
    },

    /**
     * Validate current step
     */
    validateCurrentStep: function() {
        console.log('Validating step:', this.currentStep);
        const currentSlide = document.querySelector(`[data-step="${this.currentStep}"]`);
        
        if (!currentSlide) {
            console.error('Current slide not found');
            return false;
        }
        
        const requiredFields = currentSlide.querySelectorAll('[required]');
        console.log('Required fields found:', requiredFields.length);
        
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });
        
        console.log('Step validation result:', isValid);
        return isValid;
    },

    /**
     * Validate individual field
     */
    validateField: function(field) {
        const value = field.value.trim();
        let isValid = true;
        
        // Remove previous error state
        this.clearFieldError(field);
        
        // Check if required field is empty
        if (field.hasAttribute('required') && !value) {
            this.showFieldError(field, 'هذا الحقل مطلوب');
            isValid = false;
        }
        
        // Validate email
        if (field.type === 'email' && value && !this.isValidEmail(value)) {
            this.showFieldError(field, 'يرجى إدخال بريد إلكتروني صحيح');
            isValid = false;
        }
        
        // Validate URL
        if (field.type === 'url' && value && !this.isValidUrl(value)) {
            this.showFieldError(field, 'يرجى إدخال رابط صحيح');
            isValid = false;
        }
        
        // Validate number
        if (field.type === 'number' && value) {
            const num = parseFloat(value);
            if (isNaN(num)) {
                this.showFieldError(field, 'يرجى إدخال رقم صحيح');
                isValid = false;
            } else if (field.hasAttribute('min') && num < parseFloat(field.getAttribute('min'))) {
                this.showFieldError(field, `الحد الأدنى هو ${field.getAttribute('min')}`);
                isValid = false;
            } else if (field.hasAttribute('max') && num > parseFloat(field.getAttribute('max'))) {
                this.showFieldError(field, `الحد الأقصى هو ${field.getAttribute('max')}`);
                isValid = false;
            }
        }
        
        return isValid;
    },

    /**
     * Show field error
     */
    showFieldError: function(field, message) {
        field.classList.add('error');
        
        // Create error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.textContent = message;
        errorDiv.style.color = '#ef4444';
        errorDiv.style.fontSize = '12px';
        errorDiv.style.marginTop = '4px';
        errorDiv.style.fontWeight = '500';
        
        field.parentNode.appendChild(errorDiv);
    },

    /**
     * Clear field error
     */
    clearFieldError: function(field) {
        field.classList.remove('error');
        const errorDiv = field.parentNode.querySelector('.field-error');
        if (errorDiv) {
            errorDiv.remove();
        }
    },

    /**
     * Validate email
     */
    isValidEmail: function(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },

    /**
     * Validate URL
     */
    isValidUrl: function(url) {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    },

    /**
     * Submit form
     */
    submitForm: function(e) {
        e.preventDefault();
        
        if (this.validateCurrentStep()) {
            this.collectFormData();
            this.showLoadingState();
            
            // Simulate form submission
            setTimeout(() => {
                this.hideLoadingState();
                this.showSuccessMessage();
                
                // Navigate back to global request details after success
                setTimeout(() => {
                    Router.navigate('global-request-details');
                }, 2000);
            }, 2000);
        }
    },

    /**
     * Collect form data
     */
    collectFormData: function() {
        const form = document.getElementById('offerForm');
        const formData = new FormData(form);
        
        // Convert FormData to object
        this.formData = {};
        for (let [key, value] of formData.entries()) {
            if (this.formData[key]) {
                if (Array.isArray(this.formData[key])) {
                    this.formData[key].push(value);
                } else {
                    this.formData[key] = [this.formData[key], value];
                }
            } else {
                this.formData[key] = value;
            }
        }
        
        // Collect chips data
        this.formData.features = this.collectChipsData('offerFeaturesChips');
        
        // Add request data
        this.formData.requestId = this.getRequestId();
        this.formData.submittedAt = new Date().toISOString();
        
        console.log('Form data collected:', this.formData);
    },

    /**
     * Collect chips data
     */
    collectChipsData: function(containerId) {
        const container = document.getElementById(containerId);
        const chips = container.querySelectorAll('.offer-form-chip span:first-child');
        return Array.from(chips).map(chip => chip.textContent);
    },

    /**
     * Get request ID
     */
    getRequestId: function() {
        // This would typically come from URL parameters or state
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('requestId') || 'GLB-2024-1253';
    },

    /**
     * Show loading state
     */
    showLoadingState: function() {
        const form = document.getElementById('offerForm');
        form.classList.add('offer-form-loading');
        
        const submitBtn = document.getElementById('submitForm');
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الإرسال...';
        submitBtn.disabled = true;
    },

    /**
     * Hide loading state
     */
    hideLoadingState: function() {
        const form = document.getElementById('offerForm');
        form.classList.remove('offer-form-loading');
        
        const submitBtn = document.getElementById('submitForm');
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> تقديم العرض';
        submitBtn.disabled = false;
    },

    /**
     * Show success message
     */
    showSuccessMessage: function() {
        if (window.Toast) {
            Toast.show('تم الإرسال', 'تم تقديم عرضك بنجاح', 'success');
        } else {
            alert('تم تقديم عرضك بنجاح');
        }
    },

    /**
     * Save draft
     */
    saveDraft: function() {
        // Collect form data
        this.collectFormData();
        
        // Save to localStorage or state
        const drafts = JSON.parse(localStorage.getItem('offerDrafts') || '[]');
        const draft = {
            id: Date.now(),
            requestId: this.getRequestId(),
            data: this.formData,
            createdAt: new Date().toISOString()
        };
        
        drafts.push(draft);
        localStorage.setItem('offerDrafts', JSON.stringify(drafts));
        
        if (window.Toast) {
            Toast.show('تم الحفظ', 'تم حفظ المسودة بنجاح', 'success');
        } else {
            alert('تم حفظ المسودة بنجاح');
        }
    },

    /**
     * Clean up when leaving the page
     */
    destroy: function() {
        console.log('OfferFormController destroyed');
        // Clean up any event listeners or timers
    }
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    OfferFormController.init();
});

// Export for global access
window.OfferFormController = OfferFormController; 