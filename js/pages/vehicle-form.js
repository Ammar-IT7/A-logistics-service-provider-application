/**
 * Vehicle Form page controller
 */
const VehicleFormController = {
    /**
     * Initialize the vehicle form page
     */
    init: function() {
        // Check if we're on the vehicle form page
        const form = document.getElementById('vehicleForm');
        if (!form) {
            return; // Not on the vehicle form page
        }
        
        console.log('Vehicle Form page initialized');
        this.currentStep = 'basic';
        this.formData = {};
        this.localAreas = [];
        this.countries = [];
        this.setupEventListeners();
        this.loadExistingData();
    },
    
    /**
     * Load existing data if editing
     */
    loadExistingData: function() {
        const urlParams = new URLSearchParams(window.location.search);
        const vehicleId = urlParams.get('id');
        
        if (vehicleId) {
            const shippingServices = State.get('shippingServices');
            const vehicle = shippingServices.find(v => v.id == vehicleId);
            
            if (vehicle) {
                this.formData = { ...vehicle };
                this.populateForm(vehicle);
                this.updateHeaderTitle('تعديل وسيلة الشحن');
            }
        }
    },
    
    /**
     * Populate form with existing data
     */
    populateForm: function(vehicle) {
        // Basic info
        document.getElementById('shippingType').value = vehicle.shippingType || '';
        document.getElementById('vehicleName').value = vehicle.vehicleName || '';
        document.getElementById('vehicleType').value = vehicle.vehicleType || '';
        document.getElementById('licensePlate').value = vehicle.licensePlate || '';
        document.getElementById('vehicleStatus').value = vehicle.vehicleStatus || 'available';
        
        // Coverage areas
        if (vehicle.coverageType) {
            const coverageRadio = document.querySelector(`input[name="coverageType"][value="${vehicle.coverageType}"]`);
            if (coverageRadio) {
                coverageRadio.checked = true;
                this.toggleCoverageFields(vehicle.coverageType);
            }
        }
        
        // Populate areas
        if (vehicle.localAreas) {
            this.localAreas = [...vehicle.localAreas];
            this.renderChips('localAreasChips', this.localAreas);
        }
        
        if (vehicle.countries) {
            this.countries = [...vehicle.countries];
            this.renderChips('countriesChips', this.countries);
        }
        
        // Tracking options
        if (vehicle.trackingOptions) {
            vehicle.trackingOptions.forEach(option => {
                const checkbox = document.querySelector(`input[name="trackingOptions"][value="${option}"]`);
                if (checkbox) checkbox.checked = true;
            });
        }
        
        // Specifications
        document.getElementById('maxLoad').value = vehicle.maxLoad || '';
        document.getElementById('weightUnit').value = vehicle.weightUnit || 'ton';
        document.getElementById('length').value = vehicle.length || '';
        document.getElementById('width').value = vehicle.width || '';
        document.getElementById('height').value = vehicle.height || '';
        document.getElementById('fuelType').value = vehicle.fuelType || 'diesel';
        document.getElementById('fuelConsumption').value = vehicle.fuelConsumption || '';
        
        // Documents
        document.getElementById('registrationNumber').value = vehicle.registrationNumber || '';
        document.getElementById('insuranceNumber').value = vehicle.insuranceNumber || '';
        document.getElementById('driverLicense').value = vehicle.driverLicense || '';
    },
    
    /**
     * Update header title
     */
    updateHeaderTitle: function(title) {
        const headerTitle = document.querySelector('.header-title');
        if (headerTitle) {
            headerTitle.textContent = title;
        }
    },
    
    /**
     * Set up event listeners
     */
    setupEventListeners: function() {
        const page = document.getElementById('vehicle-form');
        if (!page) return;
        
        // Form submission
        const form = document.getElementById('vehicleForm');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmit();
            });
        }
        
        // Step navigation - use event delegation for dynamically loaded content
        document.addEventListener('click', (e) => {
            const gotoButton = e.target.closest('[data-action="goto-slide"]');
            if (gotoButton) {
                e.preventDefault();
                const targetStep = gotoButton.dataset.target;
                console.log('Vehicle form - Navigating to step:', targetStep);
                this.navigateToStep(targetStep);
            }
        });
        
        // Save button in header
        const saveButton = page.querySelector('[data-action="save-vehicle"]');
        if (saveButton) {
            saveButton.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleFormSubmit();
            });
        }
        
        // Add local area button
        const addAreaBtn = page.querySelector('[data-action="add-local-area"]');
        if (addAreaBtn) {
            addAreaBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.addLocalArea();
            });
        }
        
        // Add country button
        const addCountryBtn = page.querySelector('[data-action="add-country"]');
        if (addCountryBtn) {
            addCountryBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.addCountry();
            });
        }
        
        // File upload handling
        const fileInputs = page.querySelectorAll('input[type="file"]');
        fileInputs.forEach(input => {
            input.addEventListener('change', (e) => {
                this.handleFileUpload(e);
            });
        });
        
        // Form validation on input (use centralized Forms utility)
        const requiredInputs = page.querySelectorAll('input[required], select[required], textarea[required]');
        requiredInputs.forEach(input => {
            input.addEventListener('blur', (e) => {
                if (window.Forms) window.Forms.validateField(e.target);
            });
        });
    },
    
    /**
     * Navigate to specific step
     */
    navigateToStep: function(step) {
        console.log('Vehicle form - Current step:', this.currentStep, 'Target step:', step);
        
        // Validate current step before moving forward
        if (this.shouldValidateStep(step) && !this.validateCurrentStep()) {
            console.log('Vehicle form - Validation failed, staying on current step');
            return;
        }
        
        // Update progress indicator
        const progressSteps = document.querySelectorAll('.shipping-progress-step');
        progressSteps.forEach(stepEl => {
            stepEl.classList.remove('active', 'completed');
        });
        
        // Mark completed steps
        const stepOrder = ['basic', 'specs', 'docs'];
        const currentIndex = stepOrder.indexOf(this.currentStep);
        const targetIndex = stepOrder.indexOf(step);
        
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
        const slides = document.querySelectorAll('.shipping-form-slide');
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        const targetSlide = document.querySelector(`[data-slide="${step}"]`);
        if (targetSlide) {
            targetSlide.classList.add('active');
            console.log('Vehicle form - Activated slide:', step);
        } else {
            console.error('Vehicle form - Target slide not found:', step);
        }
        
        this.currentStep = step;
        
        // Scroll to top of form for better UX
        const form = document.getElementById('vehicleForm');
        if (form) {
            form.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    },
    
    /**
     * Check if step should be validated before navigation
     */
    shouldValidateStep: function(targetStep) {
        const stepOrder = ['basic', 'specs', 'docs'];
        const currentIndex = stepOrder.indexOf(this.currentStep);
        const targetIndex = stepOrder.indexOf(targetStep);
        
        // Only validate when moving forward
        return targetIndex > currentIndex;
    },
    
    /**
     * Validate current step (use centralized Forms utility)
     */
    validateCurrentStep: function() {
        const currentSlide = document.querySelector(`[data-slide="${this.currentStep}"]`);
        if (!currentSlide) return true;
        let isValid = true;
        if (window.Forms) {
            isValid = window.Forms.validateForm(currentSlide);
        }
        // Special validation for coverage areas
        if (this.currentStep === 'basic') {
            const coverageType = document.querySelector('input[name="coverageType"]:checked')?.value;
            if (coverageType === 'local' && this.localAreas.length === 0) {
                if (window.Toast) Toast.show('خطأ في التحقق', 'يجب إضافة منطقة محلية واحدة على الأقل', 'error');
                isValid = false;
            } else if (coverageType === 'international' && this.countries.length === 0) {
                if (window.Toast) Toast.show('خطأ في التحقق', 'يجب إضافة دولة واحدة على الأقل', 'error');
                isValid = false;
            }
        }
        // Special validation for required files
        if (this.currentStep === 'docs') {
            const licenseDoc = document.getElementById('licenseDocument');
            if (licenseDoc && !licenseDoc.value) {
                if (window.Forms) window.Forms.showFieldError(licenseDoc, 'صورة وثائق الترخيص مطلوبة');
                isValid = false;
            }
        }
        return isValid;
    },
    
    /**
     * Handle shipping type change
     */
    handleShippingTypeChange: function(shippingType) {
        const landFields = document.getElementById('landVehicleFields');
        const landSpecsFields = document.getElementById('landSpecsFields');
        
        if (shippingType === 'land') {
            if (landFields) landFields.style.display = 'block';
            if (landSpecsFields) landSpecsFields.style.display = 'block';
        } else {
            if (landFields) landFields.style.display = 'none';
            if (landSpecsFields) landSpecsFields.style.display = 'none';
        }
    },
    
    /**
     * Toggle coverage fields
     */
    toggleCoverageFields: function(coverageType) {
        const localFields = document.getElementById('localCoverageFields');
        const internationalFields = document.getElementById('internationalCoverageFields');
        
        if (coverageType === 'local') {
            if (localFields) localFields.style.display = 'block';
            if (internationalFields) internationalFields.style.display = 'none';
        } else if (coverageType === 'international') {
            if (localFields) localFields.style.display = 'none';
            if (internationalFields) internationalFields.style.display = 'block';
        }
    },
    
    /**
     * Add local area
     */
    addLocalArea: function() {
        const input = document.getElementById('localAreaInput');
        const area = input.value.trim();
        
        if (area && !this.localAreas.includes(area)) {
            this.localAreas.push(area);
            this.renderChips('localAreasChips', this.localAreas);
            input.value = '';
        }
    },
    
    /**
     * Add country
     */
    addCountry: function() {
        const input = document.getElementById('countryInput');
        const country = input.value.trim();
        
        if (country && !this.countries.includes(country)) {
            this.countries.push(country);
            this.renderChips('countriesChips', this.countries);
            input.value = '';
        }
    },
    
    /**
     * Render chips
     */
    renderChips: function(containerId, items) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        container.innerHTML = items.map(item => `
            <span class="shipping-chip">
                ${item}
                <button type="button" class="shipping-chip-remove" data-item="${item}">×</button>
            </span>
        `).join('');
        
        // Add remove event listeners
        container.addEventListener('click', (e) => {
            if (e.target.classList.contains('shipping-chip-remove')) {
                const item = e.target.dataset.item;
                if (containerId === 'localAreasChips') {
                    this.localAreas = this.localAreas.filter(area => area !== item);
                    this.renderChips('localAreasChips', this.localAreas);
                } else if (containerId === 'countriesChips') {
                    this.countries = this.countries.filter(country => country !== item);
                    this.renderChips('countriesChips', this.countries);
                }
            }
        });
    },
    
    /**
     * Handle file upload
     */
    handleFileUpload: function(event) {
        const file = event.target.files[0];
        const fileNameSpan = event.target.parentNode.querySelector('.shipping-file-name');
        
        if (file) {
            if (fileNameSpan) {
                fileNameSpan.textContent = file.name;
            }
            
            // Validate file type
            const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];
            if (!allowedTypes.includes(file.type)) {
                Toast.show('خطأ في الملف', 'يجب اختيار ملف صورة أو PDF', 'error');
                event.target.value = '';
                if (fileNameSpan) {
                    fileNameSpan.textContent = 'لم يتم اختيار ملف';
                }
            }
            
            // Validate file size (5MB max)
            if (file.size > 5 * 1024 * 1024) {
                Toast.show('خطأ في الملف', 'حجم الملف يجب أن يكون أقل من 5 ميجابايت', 'error');
                event.target.value = '';
                if (fileNameSpan) {
                    fileNameSpan.textContent = 'لم يتم اختيار ملف';
                }
            }
        }
    },
    
    /**
     * Collect form data
     */
    collectFormData: function() {
        const formData = {
            // Basic info
            shippingType: document.getElementById('shippingType').value,
            vehicleName: document.getElementById('vehicleName').value,
            vehicleType: document.getElementById('vehicleType').value,
            licensePlate: document.getElementById('licensePlate').value,
            vehicleStatus: document.getElementById('vehicleStatus').value,
            
            // Coverage
            coverageType: document.querySelector('input[name="coverageType"]:checked')?.value,
            localAreas: this.localAreas,
            countries: this.countries,
            
            // Tracking options
            trackingOptions: Array.from(document.querySelectorAll('input[name="trackingOptions"]:checked'))
                .map(cb => cb.value),
            
            // Specifications
            maxLoad: parseFloat(document.getElementById('maxLoad').value) || 0,
            weightUnit: document.getElementById('weightUnit').value,
            length: parseFloat(document.getElementById('length').value) || 0,
            width: parseFloat(document.getElementById('width').value) || 0,
            height: parseFloat(document.getElementById('height').value) || 0,
            fuelType: document.getElementById('fuelType').value,
            fuelConsumption: parseFloat(document.getElementById('fuelConsumption').value) || 0,
            
            // Documents
            registrationNumber: document.getElementById('registrationNumber').value,
            insuranceNumber: document.getElementById('insuranceNumber').value,
            driverLicense: document.getElementById('driverLicense').value,
            
            // Timestamps
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        
        return formData;
    },
    
    /**
     * Handle form submission (validate all steps using centralized Forms utility)
     */
    handleFormSubmit: function() {
        // Validate all steps
        const steps = ['basic', 'specs', 'docs'];
        for (let step of steps) {
            this.currentStep = step;
            if (!this.validateCurrentStep()) {
                this.navigateToStep(step);
                return;
            }
        }
        // Collect form data
        const formData = this.collectFormData();
        // Check if editing or creating new
        const urlParams = new URLSearchParams(window.location.search);
        const vehicleId = urlParams.get('id');
        if (vehicleId) {
            // Update existing vehicle
            this.updateVehicle(vehicleId, formData);
        } else {
            // Create new vehicle
            this.createVehicle(formData);
        }
    },
    
    /**
     * Create new vehicle
     */
    createVehicle: function(formData) {
        const shippingServices = State.get('shippingServices');
        const newVehicle = {
            id: Date.now(),
            type: formData.vehicleType,
            vehicle: formData.vehicleName,
            capacity: `${formData.maxLoad} ${formData.weightUnit}`,
            route: formData.coverageType === 'local' ? formData.localAreas.join(', ') : formData.countries.join(', '),
            orders: 0,
            revenue: 0,
            rating: 0,
            status: formData.vehicleStatus,
            ...formData
        };
        
        shippingServices.push(newVehicle);
        State.update('shippingServices', shippingServices);
        
        Toast.show('تم الحفظ', 'تم إضافة وسيلة الشحن بنجاح', 'success');
        
        // Navigate back to shipping list
        setTimeout(() => {
            Router.navigate('myshipping');
        }, 1500);
    },
    
    /**
     * Update existing vehicle
     */
    updateVehicle: function(vehicleId, formData) {
        const shippingServices = State.get('shippingServices');
        const vehicleIndex = shippingServices.findIndex(v => v.id == vehicleId);
        
        if (vehicleIndex !== -1) {
            const updatedVehicle = {
                ...shippingServices[vehicleIndex],
                ...formData,
                type: formData.vehicleType,
                vehicle: formData.vehicleName,
                capacity: `${formData.maxLoad} ${formData.weightUnit}`,
                route: formData.coverageType === 'local' ? formData.localAreas.join(', ') : formData.countries.join(', '),
                updatedAt: new Date().toISOString()
            };
            
            shippingServices[vehicleIndex] = updatedVehicle;
            State.update('shippingServices', shippingServices);
            
            Toast.show('تم التحديث', 'تم تحديث وسيلة الشحن بنجاح', 'success');
            
            // Navigate back to shipping list
            setTimeout(() => {
                Router.navigate('myshipping');
            }, 1500);
        }
    }
};

// Explicitly attach to global scope
window.VehicleFormController = VehicleFormController; 