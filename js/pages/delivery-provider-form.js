/**
 * Delivery Provider Form page controller
 */
const DeliveryProviderFormController = {
    /**
     * Initialize the delivery provider form page
     */
    init: function() {
        // Check if we're on the delivery provider form page
        const form = document.getElementById('deliveryProviderForm');
        if (!form) {
            return; // Not on the delivery provider form page
        }
        
        console.log('Delivery Provider Form page initialized');
        this.formData = {};
        this.vehicles = [];
        this.areas = [];
        this.setupEventListeners();
        this.loadExistingData();
    },
    
    /**
     * Load existing data if editing
     */
    loadExistingData: function() {
        const urlParams = new URLSearchParams(window.location.search);
        const providerId = urlParams.get('id');
        
        if (providerId) {
            const lastMileServices = State.get('lastMileServices');
            const provider = lastMileServices.find(p => p.id == providerId);
            
            if (provider) {
                this.formData = { ...provider };
                this.populateForm(provider);
                this.updateHeaderTitle('تعديل مزود خدمة التوصيل');
            }
        }
    },
    
    /**
     * Populate form with existing data
     */
    populateForm: function(provider) {
        // Basic info
        document.getElementById('providerName').value = provider.providerName || '';
        document.getElementById('providerType').value = provider.providerType || '';
        document.getElementById('description').value = provider.description || '';
        
        // Contact info
        document.getElementById('contactName').value = provider.contactName || '';
        document.getElementById('contactPhone').value = provider.contactPhone || '';
        document.getElementById('contactEmail').value = provider.contactEmail || '';
        document.getElementById('address').value = provider.address || '';
        
        // Vehicles
        if (provider.vehicles && provider.vehicles.length > 0) {
            this.vehicles = [...provider.vehicles];
            this.renderVehicles();
        }
        
        // Coverage areas
        if (provider.areas && provider.areas.length > 0) {
            this.areas = [...provider.areas];
            this.renderAreas();
        }
        
        // Pricing
        document.getElementById('basePrice').value = provider.basePrice || '';
        document.getElementById('priceUnit').value = provider.priceUnit || 'km';
        document.getElementById('minOrder').value = provider.minOrder || '';
        document.getElementById('deliveryTime').value = provider.deliveryTime || '';
        
        // Operating hours
        document.getElementById('startTime').value = provider.startTime || '';
        document.getElementById('endTime').value = provider.endTime || '';
        document.getElementById('workingDays').value = provider.workingDays || '';
        
        // Specializations
        if (provider.specializations) {
            provider.specializations.forEach(spec => {
                const checkbox = document.querySelector(`input[name="specialization"][value="${spec}"]`);
                if (checkbox) checkbox.checked = true;
            });
        }
        
        // Experience
        document.getElementById('experienceYears').value = provider.experienceYears || '';
        document.getElementById('completedDeliveries').value = provider.completedDeliveries || '';
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
        const page = document.getElementById('delivery-provider-form');
        if (!page) return;
        
        // Form submission
        const form = document.getElementById('deliveryProviderForm');
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
                console.log('Delivery Provider form - Navigating to step:', targetStep);
                this.navigateToStep(targetStep);
            }
        });
        
        // Save button in header
        const saveButton = page.querySelector('[data-action="save-delivery-provider"]');
        if (saveButton) {
            saveButton.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleFormSubmit();
            });
        }
        
        // Add vehicle button
        const addVehicleBtn = page.querySelector('[data-action="add-vehicle"]');
        if (addVehicleBtn) {
            addVehicleBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.addVehicle();
            });
        }
        
        // Add area button
        const addAreaBtn = page.querySelector('[data-action="add-area"]');
        if (addAreaBtn) {
            addAreaBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.addArea();
            });
        }
        
        // Remove buttons (delegated event handling)
        page.addEventListener('click', (e) => {
            const removeBtn = e.target.closest('.dpf-remove-btn');
            if (removeBtn) {
                e.preventDefault();
                const item = removeBtn.closest('.dpf-vehicle-item, .dpf-area-item');
                if (item) {
                    item.remove();
                }
            }
        });
        
        // File upload handling
        const fileInputs = page.querySelectorAll('input[type="file"]');
        fileInputs.forEach(input => {
            input.addEventListener('change', (e) => {
                this.handleFileUpload(e);
            });
        });
        
        // Form validation on input
        const requiredInputs = page.querySelectorAll('input[required], select[required], textarea[required]');
        requiredInputs.forEach(input => {
            input.addEventListener('blur', (e) => {
                this.validateField(e.target);
            });
        });
    },
    
    /**
     * Add new vehicle
     */
    addVehicle: function(data = null) {
        const container = document.querySelector('.dpf-vehicles-container');
        if (!container) return;
        
        const vehicleItem = document.createElement('div');
        vehicleItem.className = 'dpf-vehicle-item';
        vehicleItem.innerHTML = `
            <div class="form-group">
                <label class="form-label">نوع المركبة</label>
                <select class="form-control vehicle-type">
                    <option value="">اختر نوع المركبة</option>
                    <option value="motorcycle" ${data?.type === 'motorcycle' ? 'selected' : ''}>دراجة نارية</option>
                    <option value="car" ${data?.type === 'car' ? 'selected' : ''}>سيارة</option>
                    <option value="van" ${data?.type === 'van' ? 'selected' : ''}>شاحنة صغيرة</option>
                    <option value="truck" ${data?.type === 'truck' ? 'selected' : ''}>شاحنة</option>
                    <option value="bicycle" ${data?.type === 'bicycle' ? 'selected' : ''}>دراجة هوائية</option>
                </select>
            </div>
            <div class="form-group">
                <label class="form-label">رقم اللوحة</label>
                <input type="text" class="form-control vehicle-plate" placeholder="أدخل رقم اللوحة" value="${data?.plate || ''}">
            </div>
            <div class="form-group">
                <label class="form-label">اللون</label>
                <input type="text" class="form-control vehicle-color" placeholder="أدخل لون المركبة" value="${data?.color || ''}">
            </div>
            <div class="form-group">
                <label class="form-label">السعة (كجم)</label>
                <input type="number" class="form-control vehicle-capacity" placeholder="أدخل السعة القصوى" value="${data?.capacity || ''}">
            </div>
            <div class="form-group">
                <label class="form-label">الحالة</label>
                <select class="form-control vehicle-status">
                    <option value="available" ${data?.status === 'available' ? 'selected' : ''}>متاحة</option>
                    <option value="busy" ${data?.status === 'busy' ? 'selected' : ''}>مشغولة</option>
                    <option value="maintenance" ${data?.status === 'maintenance' ? 'selected' : ''}>صيانة</option>
                </select>
            </div>
            <button type="button" class="btn btn-icon dpf-remove-btn">×</button>
        `;
        
        container.appendChild(vehicleItem);
    },
    
    /**
     * Add new area
     */
    addArea: function(data = null) {
        const container = document.querySelector('.dpf-areas-container');
        if (!container) return;
        
        const areaItem = document.createElement('div');
        areaItem.className = 'dpf-area-item';
        areaItem.innerHTML = `
            <div class="form-group">
                <label class="form-label">المحافظة</label>
                <select class="form-control area-governorate">
                    <option value="">اختر المحافظة</option>
                    <option value="sanaa" ${data?.governorate === 'sanaa' ? 'selected' : ''}>صنعاء</option>
                    <option value="aden" ${data?.governorate === 'aden' ? 'selected' : ''}>عدن</option>
                    <option value="taiz" ${data?.governorate === 'taiz' ? 'selected' : ''}>تعز</option>
                    <option value="hodeidah" ${data?.governorate === 'hodeidah' ? 'selected' : ''}>الحديدة</option>
                    <option value="ibb" ${data?.governorate === 'ibb' ? 'selected' : ''}>إب</option>
                    <option value="hadramaut" ${data?.governorate === 'hadramaut' ? 'selected' : ''}>حضرموت</option>
                </select>
            </div>
            <div class="form-group">
                <label class="form-label">المدينة/المنطقة</label>
                <input type="text" class="form-control area-city" placeholder="أدخل المدينة أو المنطقة" value="${data?.city || ''}">
            </div>
            <div class="form-group">
                <label class="form-label">الحي</label>
                <input type="text" class="form-control area-district" placeholder="أدخل الحي" value="${data?.district || ''}">
            </div>
            <div class="form-group">
                <label class="form-label">سعر التوصيل (ريال)</label>
                <input type="number" class="form-control area-price" placeholder="أدخل سعر التوصيل" value="${data?.price || ''}">
            </div>
            <div class="form-group">
                <label class="form-label">وقت التوصيل (دقائق)</label>
                <input type="number" class="form-control area-time" placeholder="أدخل وقت التوصيل" value="${data?.time || ''}">
            </div>
            <button type="button" class="btn btn-icon dpf-remove-btn">×</button>
        `;
        
        container.appendChild(areaItem);
    },
    
    /**
     * Render vehicles list
     */
    renderVehicles: function() {
        const container = document.querySelector('.dpf-vehicles-container');
        if (!container) return;
        
        container.innerHTML = '';
        this.vehicles.forEach(vehicle => {
            this.addVehicle(vehicle);
        });
    },
    
    /**
     * Render areas list
     */
    renderAreas: function() {
        const container = document.querySelector('.dpf-areas-container');
        if (!container) return;
        
        container.innerHTML = '';
        this.areas.forEach(area => {
            this.addArea(area);
        });
    },
    
    /**
     * Validate individual field
     */
    validateField: function(field) {
        const value = field.value.trim();
        const fieldName = field.getAttribute('placeholder') || field.getAttribute('name') || 'هذا الحقل';
        
        // Remove existing error styling
        field.classList.remove('error');
        const existingError = field.parentNode.querySelector('.field-error');
        if (existingError) {
            existingError.remove();
        }
        
        // Check if required field is empty
        if (field.hasAttribute('required') && !value) {
            this.showFieldError(field, `${fieldName} مطلوب`);
            return false;
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
        }
        
        return true;
    },
    
    /**
     * Show field error
     */
    showFieldError: function(field, message) {
        field.classList.add('error');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'field-error';
        errorDiv.textContent = message;
        field.parentNode.appendChild(errorDiv);
    },
    
    /**
     * Handle file upload
     */
    handleFileUpload: function(event) {
        const file = event.target.files[0];
        const fileNameSpan = event.target.parentNode.querySelector('.dpf-file-name');
        
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
        // Collect vehicles
        const vehicles = [];
        const vehicleItems = document.querySelectorAll('.dpf-vehicle-item');
        vehicleItems.forEach(item => {
            const vehicle = {
                type: item.querySelector('.vehicle-type').value,
                plate: item.querySelector('.vehicle-plate').value,
                color: item.querySelector('.vehicle-color').value,
                capacity: parseFloat(item.querySelector('.vehicle-capacity').value) || 0,
                status: item.querySelector('.vehicle-status').value
            };
            if (vehicle.type && vehicle.plate) {
                vehicles.push(vehicle);
            }
        });
        
        // Collect areas
        const areas = [];
        const areaItems = document.querySelectorAll('.dpf-area-item');
        areaItems.forEach(item => {
            const area = {
                governorate: item.querySelector('.area-governorate').value,
                city: item.querySelector('.area-city').value,
                district: item.querySelector('.area-district').value,
                price: parseFloat(item.querySelector('.area-price').value) || 0,
                time: parseInt(item.querySelector('.area-time').value) || 0
            };
            if (area.governorate && area.city) {
                areas.push(area);
            }
        });
        
        // Collect specializations
        const specializations = Array.from(document.querySelectorAll('input[name="specialization"]:checked'))
            .map(cb => cb.value);
        
        const formData = {
            // Basic info
            providerName: document.getElementById('providerName').value,
            providerType: document.getElementById('providerType').value,
            description: document.getElementById('description').value,
            
            // Contact info
            contactName: document.getElementById('contactName').value,
            contactPhone: document.getElementById('contactPhone').value,
            contactEmail: document.getElementById('contactEmail').value,
            address: document.getElementById('address').value,
            
            // Collections
            vehicles: vehicles,
            areas: areas,
            specializations: specializations,
            
            // Pricing
            basePrice: parseFloat(document.getElementById('basePrice').value) || 0,
            priceUnit: document.getElementById('priceUnit').value,
            minOrder: parseFloat(document.getElementById('minOrder').value) || 0,
            deliveryTime: document.getElementById('deliveryTime').value,
            
            // Operating hours
            startTime: document.getElementById('startTime').value,
            endTime: document.getElementById('endTime').value,
            workingDays: document.getElementById('workingDays').value,
            
            // Experience
            experienceYears: parseInt(document.getElementById('experienceYears').value) || 0,
            completedDeliveries: parseInt(document.getElementById('completedDeliveries').value) || 0,
            
            // Timestamps
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        
        return formData;
    },
    
    /**
     * Handle form submission
     */
    handleFormSubmit: function() {
        // Validate form
        const requiredFields = document.querySelectorAll('input[required], select[required], textarea[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });
        
        // Validate vehicles
        const vehicles = document.querySelectorAll('.dpf-vehicle-item');
        if (vehicles.length === 0) {
            Toast.show('خطأ في التحقق', 'يجب إضافة مركبة واحدة على الأقل', 'error');
            isValid = false;
        }
        
        // Validate areas
        const areas = document.querySelectorAll('.dpf-area-item');
        if (areas.length === 0) {
            Toast.show('خطأ في التحقق', 'يجب إضافة منطقة واحدة على الأقل', 'error');
            isValid = false;
        }
        
        if (!isValid) {
            return;
        }
        
        // Collect form data
        const formData = this.collectFormData();
        
        // Check if editing or creating new
        const urlParams = new URLSearchParams(window.location.search);
        const providerId = urlParams.get('id');
        
        if (providerId) {
            // Update existing delivery provider
            this.updateDeliveryProvider(providerId, formData);
        } else {
            // Create new delivery provider
            this.createDeliveryProvider(formData);
        }
    },
    
    /**
     * Create new delivery provider
     */
    createDeliveryProvider: function(formData) {
        const lastMileServices = State.get('lastMileServices');
        const newDeliveryProvider = {
            id: Date.now(),
            type: formData.providerType,
            provider: formData.providerName,
            vehicles: formData.vehicles.length,
            orders: 0,
            revenue: 0,
            rating: 0,
            status: 'active',
            ...formData
        };
        
        lastMileServices.push(newDeliveryProvider);
        State.update('lastMileServices', lastMileServices);
        
        Toast.show('تم الحفظ', 'تم إضافة مزود خدمة التوصيل بنجاح', 'success');
        
        // Navigate back to last mile services list
        setTimeout(() => {
            Router.navigate('my-last-mile');
        }, 1500);
    },
    
    /**
     * Update existing delivery provider
     */
    updateDeliveryProvider: function(providerId, formData) {
        const lastMileServices = State.get('lastMileServices');
        const providerIndex = lastMileServices.findIndex(p => p.id == providerId);
        
        if (providerIndex !== -1) {
            const updatedDeliveryProvider = {
                ...lastMileServices[providerIndex],
                ...formData,
                type: formData.providerType,
                provider: formData.providerName,
                vehicles: formData.vehicles.length,
                updatedAt: new Date().toISOString()
            };
            
            lastMileServices[providerIndex] = updatedDeliveryProvider;
            State.update('lastMileServices', lastMileServices);
            
            Toast.show('تم التحديث', 'تم تحديث مزود خدمة التوصيل بنجاح', 'success');
            
            // Navigate back to last mile services list
            setTimeout(() => {
                Router.navigate('my-last-mile');
            }, 1500);
        }
    },
    
    /**
     * Navigate to specific step
     */
    navigateToStep: function(step) {
        console.log('Delivery Provider form - Current step:', this.currentStep, 'Target step:', step);
        
        // Validate current step before moving forward
        if (this.shouldValidateStep(step) && !this.validateCurrentStep()) {
            console.log('Delivery Provider form - Validation failed, staying on current step');
            return;
        }
        
        // Update progress indicator
        const progressSteps = document.querySelectorAll('.dpf-progress-step');
        progressSteps.forEach(stepEl => {
            stepEl.classList.remove('active', 'completed');
        });
        
        // Mark completed steps
        const stepOrder = ['basic', 'vehicles', 'areas', 'docs'];
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
        const slides = document.querySelectorAll('.dpf-form-slide');
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        const targetSlide = document.querySelector(`[data-slide="${step}"]`);
        if (targetSlide) {
            targetSlide.classList.add('active');
            console.log('Delivery Provider form - Activated slide:', step);
        } else {
            console.error('Delivery Provider form - Target slide not found:', step);
        }
        
        this.currentStep = step;
        
        // Scroll to top of form for better UX
        const form = document.getElementById('deliveryProviderForm');
        if (form) {
            form.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    },
    
    /**
     * Check if step should be validated before navigation
     */
    shouldValidateStep: function(targetStep) {
        const stepOrder = ['basic', 'vehicles', 'areas', 'docs'];
        const currentIndex = stepOrder.indexOf(this.currentStep);
        const targetIndex = stepOrder.indexOf(targetStep);
        
        // Only validate when moving forward
        return targetIndex > currentIndex;
    },
    
    /**
     * Validate current step
     */
    validateCurrentStep: function() {
        const currentSlide = document.querySelector(`[data-slide="${this.currentStep}"]`);
        if (!currentSlide) return true;
        
        const requiredFields = currentSlide.querySelectorAll('input[required], select[required], textarea[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });
        
        return isValid;
    }
};

// Explicitly attach to global scope
window.DeliveryProviderFormController = DeliveryProviderFormController; 
