/**
 * Offer Form Controller
 * Manages the offer form functionality for providers submitting offers to global requests
 */
const OfferFormController = {
    // Current step
    currentStep: 1,
    totalSteps: 4,
    
    // Form data
    formData: {},
    
    // Request data
    requestData: null,

    /**
     * Initialize the offer form
     */
    init: function() {
        console.log('OfferFormController initialized');
        
        // Load request data
        this.loadRequestData();
        
        // Set up event listeners
        this.setupEventListeners();
        
        // Initialize pricing calculations
        this.initPricingCalculations();
        
        // Initialize dynamic features/services
        this.initDynamicSections();
        
        // Initialize form validation
        this.initFormValidation();
    },

    /**
     * Load request data
     */
    loadRequestData: function() {
        // Get request ID from URL or state
        const requestId = this.getRequestId();
        
        // Mock request data - in real app, this would come from API
        this.requestData = {
            id: requestId,
            serviceType: 'تخزين',
            client: 'شركة التقنية المتقدمة للتجارة',
            location: 'الرياض، المملكة العربية السعودية',
            duration: '6 أشهر',
            deadline: '20 يناير 2024',
            status: 'مفتوح للعروض'
        };
        
        // Update request summary
        this.updateRequestSummary();
    },

    /**
     * Get request ID from URL or state
     */
    getRequestId: function() {
        // This would typically come from URL parameters or state
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('requestId') || 'GLB-2024-1253';
    },

    /**
     * Update request summary
     */
    updateRequestSummary: function() {
        if (!this.requestData) return;
        
        // Update title
        const titleElement = document.querySelector('.offer-form-header-title');
        if (titleElement) {
            titleElement.textContent = `تقديم عرض للطلب العام #${this.requestData.id}`;
        }
        
        // Update summary values
        const summaryValues = document.querySelectorAll('.offer-form-summary-value');
        if (summaryValues.length >= 5) {
            summaryValues[0].textContent = this.requestData.serviceType;
            summaryValues[1].textContent = this.requestData.client;
            summaryValues[2].textContent = this.requestData.location;
            summaryValues[3].textContent = this.requestData.duration;
            summaryValues[4].textContent = this.requestData.deadline;
        }
    },

    /**
     * Set up event listeners
     */
    setupEventListeners: function() {
        // Handle navigation buttons
        document.addEventListener('click', (e) => {
            const action = e.target.closest('[data-action]')?.dataset.action;
            
            switch (action) {
                case 'navigate':
                    this.handleNavigation(e);
                    break;
                case 'save-draft':
                    this.saveDraft();
                    break;
                case 'next-step':
                    this.nextStep();
                    break;
                case 'prev-step':
                    this.prevStep();
                    break;
                case 'submit-offer':
                    this.submitOffer(e);
                    break;
                case 'add-feature':
                    this.addFeature();
                    break;
                case 'remove-feature':
                    this.removeFeature(e);
                    break;
                case 'add-service':
                    this.addService();
                    break;
                case 'remove-service':
                    this.removeService(e);
                    break;
            }
        });
        
        // Handle form submission
        const form = document.getElementById('offerForm');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.submitOffer(e);
            });
        }
    },

    /**
     * Handle navigation
     */
    handleNavigation: function(e) {
        const targetPage = e.target.closest('[data-action="navigate"]').dataset.page;
        console.log(`Navigating to: ${targetPage}`);
        Router.navigate(targetPage);
    },

    /**
     * Initialize pricing calculations
     */
    initPricingCalculations: function() {
        const basePriceInput = document.getElementById('basePrice');
        const discountInput = document.getElementById('discountPercentage');
        const finalPriceInput = document.getElementById('finalPrice');
        
        if (basePriceInput && discountInput && finalPriceInput) {
            // Calculate final price when base price or discount changes
            const calculateFinalPrice = () => {
                const basePrice = parseFloat(basePriceInput.value) || 0;
                const discount = parseFloat(discountInput.value) || 0;
                const finalPrice = basePrice - (basePrice * discount / 100);
                finalPriceInput.value = finalPrice.toFixed(2);
            };
            
            basePriceInput.addEventListener('input', calculateFinalPrice);
            discountInput.addEventListener('input', calculateFinalPrice);
        }
    },

    /**
     * Initialize dynamic sections
     */
    initDynamicSections: function() {
        // Add initial feature and service items
        this.addFeature();
        this.addService();
    },

    /**
     * Initialize form validation
     */
    initFormValidation: function() {
        // Use centralized Forms utility if available
        if (window.Forms) {
            console.log('Using centralized Forms utility');
        }
    },

    /**
     * Next step
     */
    nextStep: function() {
        if (this.validateCurrentStep()) {
            if (this.currentStep < this.totalSteps) {
                this.currentStep++;
                this.updateStep();
            }
        }
    },

    /**
     * Previous step
     */
    prevStep: function() {
        if (this.currentStep > 1) {
            this.currentStep--;
            this.updateStep();
        }
    },

    /**
     * Update step
     */
    updateStep: function() {
        // Update progress bar
        this.updateProgressBar();
        
        // Update slides
        this.updateSlides();
        
        // Update buttons
        this.updateButtons();
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    /**
     * Update progress bar
     */
    updateProgressBar: function() {
        const progressSteps = document.querySelectorAll('.offer-form-progress-step');
        
        progressSteps.forEach((step, index) => {
            const stepNumber = index + 1;
            step.classList.remove('offer-form-active', 'offer-form-completed');
            
            if (stepNumber < this.currentStep) {
                step.classList.add('offer-form-completed');
            } else if (stepNumber === this.currentStep) {
                step.classList.add('offer-form-active');
            }
        });
    },

    /**
     * Update slides
     */
    updateSlides: function() {
        const slides = document.querySelectorAll('.offer-form-slide');
        
        slides.forEach((slide, index) => {
            const slideNumber = index + 1;
            slide.classList.remove('offer-form-active');
            
            if (slideNumber === this.currentStep) {
                slide.classList.add('offer-form-active');
            }
        });
    },

    /**
     * Update buttons
     */
    updateButtons: function() {
        const prevBtn = document.getElementById('prevStepBtn');
        const nextBtn = document.getElementById('nextStepBtn');
        const submitBtn = document.getElementById('submitOfferBtn');
        
        if (prevBtn) {
            prevBtn.style.display = this.currentStep > 1 ? 'flex' : 'none';
        }
        
        if (nextBtn) {
            nextBtn.style.display = this.currentStep < this.totalSteps ? 'flex' : 'none';
        }
        
        if (submitBtn) {
            submitBtn.style.display = this.currentStep === this.totalSteps ? 'flex' : 'none';
        }
    },

    /**
     * Validate current step
     */
    validateCurrentStep: function() {
        const currentSlide = document.querySelector(`[data-slide="${this.currentStep}"]`);
        if (!currentSlide) return false;
        
        const requiredFields = currentSlide.querySelectorAll('input[required], select[required], textarea[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });
        
        if (!isValid) {
            this.showStepError();
        }
        
        return isValid;
    },

    /**
     * Validate field
     */
    validateField: function(field) {
        const value = field.value.trim();
        const isRequired = field.hasAttribute('required');
        
        if (isRequired && !value) {
            this.showFieldError(field, 'هذا الحقل مطلوب');
            return false;
        }
        
        // Remove error styling
        this.removeFieldError(field);
        return true;
    },

    /**
     * Show field error
     */
    showFieldError: function(field, message) {
        field.style.borderColor = '#ef4444';
        field.style.boxShadow = '0 0 0 3px rgba(239, 68, 68, 0.1)';
        
        // Add error message if not exists
        let errorElement = field.parentNode.querySelector('.offer-form-error');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'offer-form-error';
            errorElement.style.color = '#ef4444';
            errorElement.style.fontSize = '0.75rem';
            errorElement.style.marginTop = '0.25rem';
            field.parentNode.appendChild(errorElement);
        }
        errorElement.textContent = message;
    },

    /**
     * Remove field error
     */
    removeFieldError: function(field) {
        field.style.borderColor = '';
        field.style.boxShadow = '';
        
        const errorElement = field.parentNode.querySelector('.offer-form-error');
        if (errorElement) {
            errorElement.remove();
        }
    },

    /**
     * Show step error
     */
    showStepError: function() {
        if (window.Toast) {
            Toast.show('خطأ في التحقق', 'يرجى إكمال جميع الحقول المطلوبة في هذه الخطوة', 'error');
        } else {
            alert('يرجى إكمال جميع الحقول المطلوبة في هذه الخطوة');
        }
    },

    /**
     * Add feature
     */
    addFeature: function() {
        const featuresList = document.getElementById('featuresList');
        if (!featuresList) return;
        
        const featureItem = document.createElement('div');
        featureItem.className = 'offer-form-feature-item';
        featureItem.innerHTML = `
            <input type="text" name="features[]" class="offer-form-input" placeholder="أدخل الميزة" required>
            <button type="button" class="offer-form-btn offer-form-btn-danger" data-action="remove-feature">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        featuresList.appendChild(featureItem);
    },

    /**
     * Remove feature
     */
    removeFeature: function(e) {
        const featureItem = e.target.closest('.offer-form-feature-item');
        if (featureItem && document.querySelectorAll('.offer-form-feature-item').length > 1) {
            featureItem.remove();
        }
    },

    /**
     * Add service
     */
    addService: function() {
        const servicesList = document.getElementById('servicesList');
        if (!servicesList) return;
        
        const serviceItem = document.createElement('div');
        serviceItem.className = 'offer-form-service-item';
        serviceItem.innerHTML = `
            <div class="offer-form-service-inputs">
                <input type="text" name="serviceNames[]" class="offer-form-input" placeholder="اسم الخدمة" required>
                <input type="number" name="servicePrices[]" class="offer-form-input" placeholder="السعر" required>
            </div>
            <button type="button" class="offer-form-btn offer-form-btn-danger" data-action="remove-service">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        servicesList.appendChild(serviceItem);
    },

    /**
     * Remove service
     */
    removeService: function(e) {
        const serviceItem = e.target.closest('.offer-form-service-item');
        if (serviceItem && document.querySelectorAll('.offer-form-service-item').length > 1) {
            serviceItem.remove();
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
     * Collect form data
     */
    collectFormData: function() {
        const form = document.getElementById('offerForm');
        if (!form) return;
        
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
        
        // Add request data
        this.formData.requestId = this.getRequestId();
        this.formData.submittedAt = new Date().toISOString();
        
        console.log('Form data collected:', this.formData);
    },

    /**
     * Submit offer
     */
    submitOffer: function(e) {
        e.preventDefault();
        
        if (!this.validateCurrentStep()) {
            return;
        }
        
        // Collect form data
        this.collectFormData();
        
        // Show loading state
        this.showLoadingState();
        
        // Simulate offer submission
        setTimeout(() => {
            this.hideLoadingState();
            this.showSuccessMessage();
            
            // Navigate back to global request details after success
            setTimeout(() => {
                Router.navigate('global-request-details');
            }, 2000);
        }, 2000);
    },

    /**
     * Show loading state
     */
    showLoadingState: function() {
        const submitBtn = document.getElementById('submitOfferBtn');
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الإرسال...';
        }
    },

    /**
     * Hide loading state
     */
    hideLoadingState: function() {
        const submitBtn = document.getElementById('submitOfferBtn');
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> تقديم العرض';
        }
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
    }
};

// Attach to window for router access
window.OfferFormController = OfferFormController; 