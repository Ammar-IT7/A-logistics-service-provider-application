/**
 * Warehouse Form page controller
 */
const WarehouseFormController = {
    /**
     * Initialize the warehouse form page
     */
    init: function() {
        // Check if we're on the warehouse form page
        const form = document.getElementById('warehouseForm');
        if (!form) {
            return; // Not on the warehouse form page
        }
        
        console.log('Warehouse Form page initialized');
        this.currentStep = 'basic';
        this.formData = {};
        this.setupEventListeners();
        this.loadExistingData();
        this.setStepRequiredAttributes(this.currentStep);
    },
    
    /**
     * Load existing data if editing
     */
    loadExistingData: function() {
        const urlParams = new URLSearchParams(window.location.search);
        const warehouseId = urlParams.get('id');
        
        if (warehouseId) {
            const warehouses = State.get('warehouses');
            const warehouse = warehouses.find(w => w.id == warehouseId);
            
            if (warehouse) {
                this.formData = { ...warehouse };
                this.populateForm(warehouse);
                this.updateHeaderTitle('تعديل المستودع');
            }
        }
    },
    
    /**
     * Populate form with existing data
     */
    populateForm: function(warehouse) {
        // Basic info
        document.getElementById('city').value = warehouse.city || '';
        document.getElementById('district').value = warehouse.district || '';
        document.getElementById('neighborhood').value = warehouse.neighborhood || '';
        document.getElementById('warehouseType').value = warehouse.type || '';
        document.getElementById('totalArea').value = warehouse.totalArea || '';
        document.getElementById('availableArea').value = warehouse.availableArea || '';
        
        // Usage radio
        const usageRadios = document.querySelectorAll('input[name="warehouseUsage"]');
        usageRadios.forEach(radio => {
            if (radio.value === warehouse.usage) {
                radio.checked = true;
            }
        });
        
        // Fees
        document.getElementById('monthlyFee').value = warehouse.monthlyFee || '';
        document.getElementById('annualFee').value = warehouse.annualFee || '';
        document.getElementById('managerName').value = warehouse.managerName || '';
        document.getElementById('managerPhone').value = warehouse.managerPhone || '';
        
        // Safety features
        if (warehouse.securityFeatures) {
            warehouse.securityFeatures.forEach(feature => {
                const checkbox = document.querySelector(`input[name="securityFeature"][value="${feature}"]`);
                if (checkbox) checkbox.checked = true;
            });
        }
        
        document.getElementById('safetyNotes').value = warehouse.safetyNotes || '';
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
        const page = document.getElementById('warehouse-form');
        if (!page) return;
        
        // Form submission
        const form = document.getElementById('warehouseForm');
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
                console.log('Navigating to step:', targetStep);
                this.navigateToStep(targetStep);
            }
        });
        
        // Save button in header
        const saveButton = page.querySelector('[data-action="save-warehouse"]');
        if (saveButton) {
            saveButton.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleFormSubmit();
            });
        }
        
        // File upload handling
        const fileInputs = page.querySelectorAll('input[type="file"]');
        fileInputs.forEach(input => {
            input.addEventListener('change', (e) => {
                this.handleFileUpload(e);
            });
        });
        
        // Map location selection
        const mapContainer = page.querySelector('.wh-map-container');
        if (mapContainer) {
            mapContainer.addEventListener('click', (e) => {
                e.preventDefault();
                this.selectLocation();
            });
        }
        
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
        console.log('Current step:', this.currentStep, 'Target step:', step);
        // Set required attributes for the target step only
        this.setStepRequiredAttributes(step);
        // Validate current step before moving forward
        if (this.shouldValidateStep(step) && !this.validateCurrentStep()) {
            console.log('Validation failed, staying on current step');
            return;
        }
        
        // Update progress indicator
        const progressSteps = document.querySelectorAll('.wh-progress-step');
        progressSteps.forEach(stepEl => {
            stepEl.classList.remove('active', 'completed');
        });
        
        // Mark completed steps
        const stepOrder = ['basic', 'details', 'safety', 'media'];
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
        const slides = document.querySelectorAll('.wh-form-slide');
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        const targetSlide = document.querySelector(`[data-slide="${step}"]`);
        if (targetSlide) {
            targetSlide.classList.add('active');
            // Safety: remove 'active' from all siblings
            const siblings = targetSlide.parentNode.querySelectorAll('.wh-form-slide');
            siblings.forEach(sib => { if (sib !== targetSlide) sib.classList.remove('active'); });
            console.log('Activated slide:', step);
        } else {
            console.error('Target slide not found:', step);
        }
        // Bulletproof: force only the active slide to display
        const slidesAll = document.querySelectorAll('.wh-form-slide');
        slidesAll.forEach(slide => {
            if (slide.classList.contains('active')) {
                slide.style.display = 'block';
            } else {
                slide.style.display = 'none';
            }
        });
        
        this.currentStep = step;
        
        // Scroll to top of form for better UX
        const form = document.getElementById('warehouseForm');
        if (form) {
            form.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    },
    
    /**
     * Check if step should be validated before navigation
     */
    shouldValidateStep: function(targetStep) {
        const stepOrder = ['basic', 'details', 'safety', 'media'];
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
        // Special validation for checkboxes
        if (this.currentStep === 'safety') {
            const securityFeatures = currentSlide.querySelectorAll('input[name="securityFeature"]:checked');
            if (securityFeatures.length === 0) {
                if (window.Toast) Toast.show('خطأ في التحقق', 'يجب اختيار ميزة أمان واحدة على الأقل', 'error');
                isValid = false;
            }
            // Validate safety document file
            const safetyDoc = document.getElementById('safetyDocument');
            if (safetyDoc && !safetyDoc.value) {
                if (window.Forms) window.Forms.showFieldError(safetyDoc, 'شهادة الأمن والسلامة مطلوبة');
                isValid = false;
            }
        }
        if (this.currentStep === 'media') {
            // Validate images
            const imagesInput = document.getElementById('warehouseImages');
            if (imagesInput && !imagesInput.value) {
                if (window.Forms) window.Forms.showFieldError(imagesInput, 'صور المستودع مطلوبة');
                isValid = false;
            }
        }
        return isValid;
    },
    
    /**
     * Handle file upload
     */
    handleFileUpload: function(event) {
        const file = event.target.files[0];
        const fileNameSpan = event.target.parentNode.querySelector('.wh-file-name, .cof-file-name');
        
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
     * Select location on map
     */
    selectLocation: function() {
        // Simulate location selection
        const mapContainer = document.querySelector('.wh-map-container');
        const mapText = mapContainer.querySelector('.wh-map-text');
        const locationInput = document.getElementById('warehouseLocation');
        
        // In a real app, this would open a map picker
        const mockLocation = '15.3694,44.1910'; // Sanaa coordinates
        locationInput.value = mockLocation;
        mapText.textContent = 'تم تحديد الموقع: صنعاء، اليمن';
        mapContainer.style.background = '#e8f5e8';
        
        Toast.show('تم تحديد الموقع', 'تم تحديد موقع المستودع بنجاح', 'success');
    },
    
    /**
     * Collect form data
     */
    collectFormData: function() {
        const formData = {
            // Basic info
            city: document.getElementById('city').value,
            district: document.getElementById('district').value,
            neighborhood: document.getElementById('neighborhood').value,
            location: document.getElementById('warehouseLocation').value,
            type: document.getElementById('warehouseType').value,
            totalArea: parseFloat(document.getElementById('totalArea').value) || 0,
            availableArea: parseFloat(document.getElementById('availableArea').value) || 0,
            usage: document.querySelector('input[name="warehouseUsage"]:checked')?.value,
            
            // Fees
            monthlyFee: parseFloat(document.getElementById('monthlyFee').value) || 0,
            annualFee: parseFloat(document.getElementById('annualFee').value) || 0,
            managerName: document.getElementById('managerName').value,
            managerPhone: document.getElementById('managerPhone').value,
            
            // Safety
            securityFeatures: Array.from(document.querySelectorAll('input[name="securityFeature"]:checked'))
                .map(cb => cb.value),
            safetyNotes: document.getElementById('safetyNotes').value,
            
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
        const steps = ['basic', 'details', 'safety', 'media'];
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
        const warehouseId = urlParams.get('id');
        if (warehouseId) {
            // Update existing warehouse
            this.updateWarehouse(warehouseId, formData);
        } else {
            // Create new warehouse
            this.createWarehouse(formData);
        }
    },
    
    /**
     * Create new warehouse
     */
    createWarehouse: function(formData) {
        const warehouses = State.get('warehouses');
        const newWarehouse = {
            id: Date.now(),
            name: `${formData.type} - ${formData.district}`,
            location: `${formData.city}, ${formData.district}`,
            size: `${formData.totalArea} م²`,
            temperature: formData.type === 'refrigerated' ? 'مبرد' : 'عادي',
            status: 'active',
            occupancy: Math.round((formData.availableArea / formData.totalArea) * 100),
            items: Math.floor(Math.random() * 50) + 10,
            revenue: formData.monthlyFee * formData.totalArea,
            ...formData
        };
        
        warehouses.push(newWarehouse);
        State.set('warehouses', warehouses);
        
        Toast.show('تم الحفظ', 'تم إضافة المستودع بنجاح', 'success');
        
        // Navigate back to warehouses list
        setTimeout(() => {
            Router.navigate('mywarehouses');
        }, 1500);
    },
    
    /**
     * Update existing warehouse
     */
    updateWarehouse: function(warehouseId, formData) {
        const warehouses = State.get('warehouses');
        const warehouseIndex = warehouses.findIndex(w => w.id == warehouseId);
        
        if (warehouseIndex !== -1) {
            const updatedWarehouse = {
                ...warehouses[warehouseIndex],
                ...formData,
                name: `${formData.type} - ${formData.district}`,
                location: `${formData.city}, ${formData.district}`,
                size: `${formData.totalArea} م²`,
                temperature: formData.type === 'refrigerated' ? 'مبرد' : 'عادي',
                occupancy: Math.round((formData.availableArea / formData.totalArea) * 100),
                updatedAt: new Date().toISOString()
            };
            
            warehouses[warehouseIndex] = updatedWarehouse;
            State.set('warehouses', warehouses);
            
            Toast.show('تم التحديث', 'تم تحديث المستودع بنجاح', 'success');
            
            // Navigate back to warehouses list
            setTimeout(() => {
                Router.navigate('mywarehouses');
            }, 1500);
        }
    },
    
    /**
     * Set required attributes only for visible step fields
     */
    setStepRequiredAttributes: function(step) {
        // Remove required from all fields in all steps
        document.querySelectorAll('.wh-form-slide [required]').forEach(field => {
            field.setAttribute('data-original-required', 'true');
            field.removeAttribute('required');
        });
        // Add required only to fields in the current step
        const currentSlide = document.querySelector(`.wh-form-slide[data-slide="${step}"]`);
        if (currentSlide) {
            currentSlide.querySelectorAll('[data-original-required]').forEach(field => {
                field.setAttribute('required', 'required');
            });
        }
    }
};

// Explicitly attach to global scope
window.WarehouseFormController = WarehouseFormController; 