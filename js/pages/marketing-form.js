/**
 * Marketing Form Controller
 * Modern UX with enhanced functionality
 */
const MarketingFormController = {
    currentStep: 1,
    totalSteps: 4,
    formData: {},
    
    /**
     * Initialize the controller
     */
    init: function() {
        console.log('MarketingFormController initialized');
        console.log('Current step:', this.currentStep);
        console.log('Total steps:', this.totalSteps);
        
        this.setupEventListeners();
        this.initializeForm();
        this.setupFileUploads();
        this.setupChips();
        this.updateProgressBar();
        
        // Test: Check if all slides exist
        const slides = document.querySelectorAll('.mkt-form-slide');
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
        document.getElementById('marketingForm').addEventListener('submit', (e) => this.submitForm(e));

        // Add feature button
        document.getElementById('addFeature').addEventListener('click', () => this.addFeature());
        document.getElementById('addCoverage').addEventListener('click', () => this.addCoverage());
        document.getElementById('addSector').addEventListener('click', () => this.addSector());
        document.getElementById('addResult').addEventListener('click', () => this.addResult());
        document.getElementById('addPortfolioLink').addEventListener('click', () => this.addPortfolioLink());

        // Input events
        document.getElementById('featureInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.addFeature();
            }
        });

        document.getElementById('coverageInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.addCoverage();
            }
        });

        document.getElementById('sectorInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.addSector();
            }
        });

        // Form validation on input
        document.querySelectorAll('.mkt-form-control').forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });

        // Service type change
        document.getElementById('marketingServiceType').addEventListener('change', (e) => {
            this.handleServiceTypeChange(e.target.value);
        });

        // Pricing type change
        document.getElementById('pricingType').addEventListener('change', (e) => {
            this.handlePricingTypeChange(e.target.value);
        });
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
        // Service types with descriptions
        const serviceTypes = {
            'seo': 'تحسين محركات البحث لزيادة الظهور العضوي',
            'google-ads': 'إعلانات مدفوعة على جوجل لزيادة المبيعات',
            'facebook-ads': 'إعلانات على فيسبوك وإنستغرام للوصول للجمهور المستهدف',
            'social-media': 'إدارة حسابات التواصل الاجتماعي وإنشاء محتوى جذاب',
            'email-marketing': 'حملات بريد إلكتروني لبناء العلاقات وزيادة المبيعات',
            'content-marketing': 'إنشاء محتوى قيم لجذب العملاء المحتملين',
            'influencer-marketing': 'التعاون مع المؤثرين لتعزيز العلامة التجارية',
            'video-marketing': 'إنشاء محتوى فيديو جذاب للترويج للمنتجات',
            'branding': 'تصميم هوية بصرية متكاملة للعلامة التجارية',
            'web-design': 'تصميم مواقع إلكترونية احترافية وسهلة الاستخدام',
            'data-analytics': 'تحليل البيانات لتحسين استراتيجيات التسويق',
            'marketing-automation': 'أتمتة عمليات التسويق لتحسين الكفاءة',
            'pr-marketing': 'إدارة العلاقات العامة والترويج الإعلامي'
        };

        // Update service type descriptions
        const serviceTypeSelect = document.getElementById('marketingServiceType');
        serviceTypeSelect.addEventListener('change', (e) => {
            const description = serviceTypes[e.target.value];
            if (description) {
                const descriptionField = document.querySelector('textarea[name="marketingServiceDescription"]');
                if (descriptionField && !descriptionField.value) {
                    descriptionField.value = description;
                }
            }
        });
    },

    /**
     * Setup file upload functionality
     */
    setupFileUploads: function() {
        const fileInputs = document.querySelectorAll('input[type="file"]');
        
        fileInputs.forEach(input => {
            const container = input.closest('.mkt-form-file-upload-container');
            const button = container.querySelector('.mkt-form-file-upload-btn');
            const fileName = container.querySelector('.mkt-form-file-name');
            
            // Trigger file input when button is clicked
            button.addEventListener('click', () => input.click());
            
            // Handle file selection
            input.addEventListener('change', (e) => {
                const files = e.target.files;
                if (files.length > 0) {
                    if (files.length === 1) {
                        fileName.textContent = files[0].name;
                    } else {
                        fileName.textContent = `${files.length} ملفات مختارة`;
                    }
                    
                    // Add success styling
                    container.classList.add('mkt-form-success');
                    setTimeout(() => {
                        container.classList.remove('mkt-form-success');
                    }, 2000);
                } else {
                    fileName.textContent = input.multiple ? 'لم يتم اختيار ملفات' : 'لم يتم اختيار ملف';
                }
            });
        });
    },

    /**
     * Setup chips functionality
     */
    setupChips: function() {
        // Remove chip functionality
        window.removeChip = function(element) {
            element.closest('.mkt-form-chip').remove();
        };

        // Remove result functionality
        window.removeResult = function(element) {
            element.closest('.mkt-form-result-item').remove();
        };
    },

    /**
     * Add feature chip
     */
    addFeature: function() {
        const input = document.getElementById('featureInput');
        const value = input.value.trim();
        
        if (value) {
            this.addChip('marketingFeaturesChips', value);
            input.value = '';
            input.focus();
        }
    },

    /**
     * Add coverage chip
     */
    addCoverage: function() {
        const input = document.getElementById('coverageInput');
        const value = input.value.trim();
        
        if (value) {
            this.addChip('marketingCoverageChips', value);
            input.value = '';
            input.focus();
        }
    },

    /**
     * Add sector chip
     */
    addSector: function() {
        const input = document.getElementById('sectorInput');
        const value = input.value.trim();
        
        if (value) {
            this.addChip('marketingSectorsChips', value);
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
        chip.className = 'mkt-form-chip';
        chip.innerHTML = `
            <span>${text}</span>
            <span class="mkt-form-chip-close" onclick="removeChip(this)">×</span>
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
     * Add result item
     */
    addResult: function() {
        const container = document.querySelector('.mkt-form-results-container');
        const resultItem = document.createElement('div');
        resultItem.className = 'mkt-form-result-item';
        resultItem.innerHTML = `
            <input type="text" name="expectedResults[]" class="mkt-form-control" placeholder="مثال: زيادة حركة المرور">
            <input type="text" name="resultMetrics[]" class="mkt-form-control" placeholder="مثال: 50% خلال 3 أشهر">
            <button type="button" class="btn btn-outline btn-sm" onclick="removeResult(this)">
                <i class="fas fa-trash"></i>
            </button>
        `;
        
        container.appendChild(resultItem);
        
        // Add animation
        resultItem.style.opacity = '0';
        resultItem.style.transform = 'translateY(20px)';
        setTimeout(() => {
            resultItem.style.transition = 'all 0.3s ease';
            resultItem.style.opacity = '1';
            resultItem.style.transform = 'translateY(0)';
        }, 10);
    },

    /**
     * Add portfolio link
     */
    addPortfolioLink: function() {
        const container = document.querySelector('.mkt-form-links-container');
        const linkInput = document.createElement('div');
        linkInput.className = 'mkt-form-link-input';
        linkInput.innerHTML = `
            <input type="url" name="portfolioLinks[]" class="mkt-form-control" placeholder="مثال: https://behance.net/portfolio">
            <button type="button" class="btn btn-outline btn-sm" onclick="this.parentElement.remove()">
                <i class="fas fa-trash"></i>
            </button>
        `;
        
        container.appendChild(linkInput);
        
        // Add animation
        linkInput.style.opacity = '0';
        linkInput.style.transform = 'translateY(20px)';
        setTimeout(() => {
            linkInput.style.transition = 'all 0.3s ease';
            linkInput.style.opacity = '1';
            linkInput.style.transform = 'translateY(0)';
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
        const allSlides = document.querySelectorAll('.mkt-form-slide');
        console.log('Found slides:', allSlides.length);
        
        allSlides.forEach(slide => {
            slide.classList.remove('active');
            console.log('Removed active from slide:', slide.getAttribute('data-step'));
        });
        
        // Show current slide - use more specific selector for form slides
        const currentSlide = document.querySelector(`.mkt-form-slide[data-step="${step}"]`);
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
        const steps = document.querySelectorAll('.mkt-form-progress-step');
        
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
     * Handle service type change
     */
    handleServiceTypeChange: function(serviceType) {
        // Update form based on service type
        const descriptionField = document.querySelector('textarea[name="marketingServiceDescription"]');
        const pricingField = document.querySelector('input[name="basePrice"]');
        
        // Set default pricing based on service type
        const defaultPricing = {
            'seo': 3000,
            'google-ads': 2000,
            'facebook-ads': 1500,
            'social-media': 2500,
            'email-marketing': 1000,
            'content-marketing': 4000,
            'influencer-marketing': 5000,
            'video-marketing': 6000,
            'branding': 8000,
            'web-design': 10000,
            'data-analytics': 3500,
            'marketing-automation': 4500,
            'pr-marketing': 3000
        };
        
        if (defaultPricing[serviceType] && !pricingField.value) {
            pricingField.value = defaultPricing[serviceType];
        }
    },

    /**
     * Handle pricing type change
     */
    handlePricingTypeChange: function(pricingType) {
        const priceField = document.querySelector('input[name="basePrice"]');
        const currentPrice = parseFloat(priceField.value) || 0;
        
        // Adjust price based on pricing type
        const adjustments = {
            'hourly': currentPrice * 160, // 160 hours per month
            'monthly': currentPrice,
            'quarterly': currentPrice * 3,
            'yearly': currentPrice * 12
        };
        
        if (adjustments[pricingType]) {
            priceField.value = Math.round(adjustments[pricingType]);
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
                
                // Navigate back to marketing page after success
                setTimeout(() => {
                    Router.navigate('marketing');
                }, 2000);
            }, 2000);
        }
    },

    /**
     * Collect form data
     */
    collectFormData: function() {
        const form = document.getElementById('marketingForm');
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
        this.formData.features = this.collectChipsData('marketingFeaturesChips');
        this.formData.coverage = this.collectChipsData('marketingCoverageChips');
        this.formData.sectors = this.collectChipsData('marketingSectorsChips');
        
        console.log('Form data collected:', this.formData);
    },

    /**
     * Collect chips data
     */
    collectChipsData: function(containerId) {
        const container = document.getElementById(containerId);
        const chips = container.querySelectorAll('.mkt-form-chip span:first-child');
        return Array.from(chips).map(chip => chip.textContent);
    },

    /**
     * Show loading state
     */
    showLoadingState: function() {
        const form = document.getElementById('marketingForm');
        form.classList.add('mkt-form-loading');
        
        const submitBtn = document.getElementById('submitForm');
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الحفظ...';
        submitBtn.disabled = true;
    },

    /**
     * Hide loading state
     */
    hideLoadingState: function() {
        const form = document.getElementById('marketingForm');
        form.classList.remove('mkt-form-loading');
        
        const submitBtn = document.getElementById('submitForm');
        submitBtn.innerHTML = '<i class="fas fa-check"></i> حفظ الخدمة';
        submitBtn.disabled = false;
    },

    /**
     * Show success message
     */
    showSuccessMessage: function() {
        Toast.show('تم الحفظ بنجاح', 'تم إضافة خدمة التسويق بنجاح', 'success');
    },

    /**
     * Clean up when leaving the page
     */
    destroy: function() {
        console.log('MarketingFormController destroyed');
        // Clean up any event listeners or timers
    }
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    MarketingFormController.init();
});

// Export for global access
window.MarketingFormController = MarketingFormController; 