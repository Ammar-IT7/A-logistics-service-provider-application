/**
 * Packaging Form page controller
 */
const PackagingFormController = {
    /**
     * Initialize the packaging form page
     */
    init: function() {
        // Check if we're on the packaging form page
        const form = document.getElementById('packagingForm');
        if (!form) {
            return; // Not on the packaging form page
        }
        
        console.log('Packaging Form page initialized');
        this.formData = {};
        this.materials = [];
        this.services = [];
        this.setupEventListeners();
        this.loadExistingData();
    },
    
    /**
     * Load existing data if editing
     */
    loadExistingData: function() {
        const urlParams = new URLSearchParams(window.location.search);
        const packagingId = urlParams.get('id');
        
        if (packagingId) {
            const packagingServices = State.get('packagingServices');
            const packaging = packagingServices.find(p => p.id == packagingId);
            
            if (packaging) {
                this.formData = { ...packaging };
                this.populateForm(packaging);
                this.updateHeaderTitle('تعديل خدمة التغليف');
            }
        }
    },
    
    /**
     * Populate form with existing data
     */
    populateForm: function(packaging) {
        // Basic info
        document.getElementById('serviceName').value = packaging.serviceName || '';
        document.getElementById('serviceType').value = packaging.serviceType || '';
        document.getElementById('description').value = packaging.description || '';
        
        // Contact info
        document.getElementById('contactName').value = packaging.contactName || '';
        document.getElementById('contactPhone').value = packaging.contactPhone || '';
        document.getElementById('contactEmail').value = packaging.contactEmail || '';
        document.getElementById('address').value = packaging.address || '';
        
        // Materials
        if (packaging.materials && packaging.materials.length > 0) {
            this.materials = [...packaging.materials];
            this.renderMaterials();
        }
        
        // Services
        if (packaging.services && packaging.services.length > 0) {
            this.services = [...packaging.services];
            this.renderServices();
        }
        
        // Pricing
        document.getElementById('basePrice').value = packaging.basePrice || '';
        document.getElementById('priceUnit').value = packaging.priceUnit || 'item';
        document.getElementById('minOrder').value = packaging.minOrder || '';
        document.getElementById('deliveryTime').value = packaging.deliveryTime || '';
        
        // Specializations
        if (packaging.specializations) {
            packaging.specializations.forEach(spec => {
                const checkbox = document.querySelector(`input[name="specialization"][value="${spec}"]`);
                if (checkbox) checkbox.checked = true;
            });
        }
        
        // Equipment
        if (packaging.equipment) {
            packaging.equipment.forEach(eq => {
                const checkbox = document.querySelector(`input[name="equipment"][value="${eq}"]`);
                if (checkbox) checkbox.checked = true;
            });
        }
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
        const page = document.getElementById('packaging-form');
        if (!page) return;
        
        // Form submission
        const form = document.getElementById('packagingForm');
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
                console.log('Packaging form - Navigating to step:', targetStep);
                this.navigateToStep(targetStep);
            }
        });
        
        // Save button in header
        const saveButton = page.querySelector('[data-action="save-packaging"]');
        if (saveButton) {
            saveButton.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleFormSubmit();
            });
        }
        
        // Add material button
        const addMaterialBtn = page.querySelector('[data-action="add-material"]');
        if (addMaterialBtn) {
            addMaterialBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.addMaterial();
            });
        }
        
        // Add service button
        const addServiceBtn = page.querySelector('[data-action="add-service"]');
        if (addServiceBtn) {
            addServiceBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.addService();
            });
        }
        
        // Remove buttons (delegated event handling)
        page.addEventListener('click', (e) => {
            const removeBtn = e.target.closest('.pkg-remove-btn');
            if (removeBtn) {
                e.preventDefault();
                const item = removeBtn.closest('.pkg-material-item, .pkg-service-item');
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
     * Add new material
     */
    addMaterial: function(data = null) {
        const container = document.querySelector('.pkg-materials-container');
        if (!container) return;
        
        const materialItem = document.createElement('div');
        materialItem.className = 'pkg-material-item';
        materialItem.innerHTML = `
            <div class="form-group">
                <label class="form-label">نوع المادة</label>
                <select class="form-control material-type">
                    <option value="">اختر نوع المادة</option>
                    <option value="cardboard" ${data?.type === 'cardboard' ? 'selected' : ''}>كرتون</option>
                    <option value="plastic" ${data?.type === 'plastic' ? 'selected' : ''}>بلاستيك</option>
                    <option value="wood" ${data?.type === 'wood' ? 'selected' : ''}>خشب</option>
                    <option value="fabric" ${data?.type === 'fabric' ? 'selected' : ''}>قماش</option>
                    <option value="bubble" ${data?.type === 'bubble' ? 'selected' : ''}>فقاعات هوائية</option>
                    <option value="other" ${data?.type === 'other' ? 'selected' : ''}>أخرى</option>
                </select>
            </div>
            <div class="form-group">
                <label class="form-label">الاسم</label>
                <input type="text" class="form-control material-name" placeholder="أدخل اسم المادة" value="${data?.name || ''}">
            </div>
            <div class="form-group">
                <label class="form-label">الوصف</label>
                <textarea class="form-control material-description" rows="2" placeholder="أدخل وصف المادة">${data?.description || ''}</textarea>
            </div>
            <div class="form-group">
                <label class="form-label">السعر (ريال)</label>
                <input type="number" class="form-control material-price" placeholder="أدخل السعر" value="${data?.price || ''}">
            </div>
            <button type="button" class="btn btn-icon pkg-remove-btn">×</button>
        `;
        
        container.appendChild(materialItem);
    },
    
    /**
     * Add new service
     */
    addService: function(data = null) {
        const container = document.querySelector('.pkg-services-container');
        if (!container) return;
        
        const serviceItem = document.createElement('div');
        serviceItem.className = 'pkg-service-item';
        serviceItem.innerHTML = `
            <div class="form-group">
                <label class="form-label">نوع الخدمة</label>
                <select class="form-control service-type">
                    <option value="">اختر نوع الخدمة</option>
                    <option value="basic" ${data?.type === 'basic' ? 'selected' : ''}>تغليف أساسي</option>
                    <option value="protective" ${data?.type === 'protective' ? 'selected' : ''}>تغليف واقي</option>
                    <option value="custom" ${data?.type === 'custom' ? 'selected' : ''}>تغليف مخصص</option>
                    <option value="gift" ${data?.type === 'gift' ? 'selected' : ''}>تغليف هدايا</option>
                    <option value="industrial" ${data?.type === 'industrial' ? 'selected' : ''}>تغليف صناعي</option>
                </select>
            </div>
            <div class="form-group">
                <label class="form-label">اسم الخدمة</label>
                <input type="text" class="form-control service-name" placeholder="أدخل اسم الخدمة" value="${data?.name || ''}">
            </div>
            <div class="form-group">
                <label class="form-label">الوصف</label>
                <textarea class="form-control service-description" rows="2" placeholder="أدخل وصف الخدمة">${data?.description || ''}</textarea>
            </div>
            <div class="form-group">
                <label class="form-label">السعر (ريال)</label>
                <input type="number" class="form-control service-price" placeholder="أدخل السعر" value="${data?.price || ''}">
            </div>
            <div class="form-group">
                <label class="form-label">الوقت المطلوب (ساعات)</label>
                <input type="number" class="form-control service-time" placeholder="أدخل الوقت المطلوب" value="${data?.time || ''}">
            </div>
            <button type="button" class="btn btn-icon pkg-remove-btn">×</button>
        `;
        
        container.appendChild(serviceItem);
    },
    
    /**
     * Render materials list
     */
    renderMaterials: function() {
        const container = document.querySelector('.pkg-materials-container');
        if (!container) return;
        
        container.innerHTML = '';
        this.materials.forEach(material => {
            this.addMaterial(material);
        });
    },
    
    /**
     * Render services list
     */
    renderServices: function() {
        const container = document.querySelector('.pkg-services-container');
        if (!container) return;
        
        container.innerHTML = '';
        this.services.forEach(service => {
            this.addService(service);
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
        const fileNameSpan = event.target.parentNode.querySelector('.pkg-file-name');
        
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
        // Collect materials
        const materials = [];
        const materialItems = document.querySelectorAll('.pkg-material-item');
        materialItems.forEach(item => {
            const material = {
                type: item.querySelector('.material-type').value,
                name: item.querySelector('.material-name').value,
                description: item.querySelector('.material-description').value,
                price: parseFloat(item.querySelector('.material-price').value) || 0
            };
            if (material.type && material.name) {
                materials.push(material);
            }
        });
        
        // Collect services
        const services = [];
        const serviceItems = document.querySelectorAll('.pkg-service-item');
        serviceItems.forEach(item => {
            const service = {
                type: item.querySelector('.service-type').value,
                name: item.querySelector('.service-name').value,
                description: item.querySelector('.service-description').value,
                price: parseFloat(item.querySelector('.service-price').value) || 0,
                time: parseFloat(item.querySelector('.service-time').value) || 0
            };
            if (service.type && service.name) {
                services.push(service);
            }
        });
        
        // Collect specializations
        const specializations = Array.from(document.querySelectorAll('input[name="specialization"]:checked'))
            .map(cb => cb.value);
        
        // Collect equipment
        const equipment = Array.from(document.querySelectorAll('input[name="equipment"]:checked'))
            .map(cb => cb.value);
        
        const formData = {
            // Basic info
            serviceName: document.getElementById('serviceName').value,
            serviceType: document.getElementById('serviceType').value,
            description: document.getElementById('description').value,
            
            // Contact info
            contactName: document.getElementById('contactName').value,
            contactPhone: document.getElementById('contactPhone').value,
            contactEmail: document.getElementById('contactEmail').value,
            address: document.getElementById('address').value,
            
            // Collections
            materials: materials,
            services: services,
            specializations: specializations,
            equipment: equipment,
            
            // Pricing
            basePrice: parseFloat(document.getElementById('basePrice').value) || 0,
            priceUnit: document.getElementById('priceUnit').value,
            minOrder: parseInt(document.getElementById('minOrder').value) || 0,
            deliveryTime: document.getElementById('deliveryTime').value,
            
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
        
        // Validate materials
        const materials = document.querySelectorAll('.pkg-material-item');
        if (materials.length === 0) {
            Toast.show('خطأ في التحقق', 'يجب إضافة مادة واحدة على الأقل', 'error');
            isValid = false;
        }
        
        // Validate services
        const services = document.querySelectorAll('.pkg-service-item');
        if (services.length === 0) {
            Toast.show('خطأ في التحقق', 'يجب إضافة خدمة واحدة على الأقل', 'error');
            isValid = false;
        }
        
        if (!isValid) {
            return;
        }
        
        // Collect form data
        const formData = this.collectFormData();
        
        // Check if editing or creating new
        const urlParams = new URLSearchParams(window.location.search);
        const packagingId = urlParams.get('id');
        
        if (packagingId) {
            // Update existing packaging service
            this.updatePackagingService(packagingId, formData);
        } else {
            // Create new packaging service
            this.createPackagingService(formData);
        }
    },
    
    /**
     * Create new packaging service
     */
    createPackagingService: function(formData) {
        const packagingServices = State.get('packagingServices');
        const newPackagingService = {
            id: Date.now(),
            type: formData.serviceType,
            service: formData.serviceName,
            materials: formData.materials.length,
            orders: 0,
            revenue: 0,
            rating: 0,
            status: 'active',
            ...formData
        };
        
        packagingServices.push(newPackagingService);
        State.set('packagingServices', packagingServices);
        
        Toast.show('تم الحفظ', 'تم إضافة خدمة التغليف بنجاح', 'success');
        
        // Navigate back to packaging list
        setTimeout(() => {
            Router.navigate('my-packaging');
        }, 1500);
    },
    
    /**
     * Update existing packaging service
     */
    updatePackagingService: function(packagingId, formData) {
        const packagingServices = State.get('packagingServices');
        const packagingIndex = packagingServices.findIndex(p => p.id == packagingId);
        
        if (packagingIndex !== -1) {
            const updatedPackagingService = {
                ...packagingServices[packagingIndex],
                ...formData,
                type: formData.serviceType,
                service: formData.serviceName,
                materials: formData.materials.length,
                updatedAt: new Date().toISOString()
            };
            
            packagingServices[packagingIndex] = updatedPackagingService;
            State.set('packagingServices', packagingServices);
            
            Toast.show('تم التحديث', 'تم تحديث خدمة التغليف بنجاح', 'success');
            
            // Navigate back to packaging list
            setTimeout(() => {
                Router.navigate('my-packaging');
            }, 1500);
        }
    },
    
    /**
     * Navigate to specific step
     */
    navigateToStep: function(step) {
        console.log('Packaging form - Current step:', this.currentStep, 'Target step:', step);
        
        // Validate current step before moving forward
        if (this.shouldValidateStep(step) && !this.validateCurrentStep()) {
            console.log('Packaging form - Validation failed, staying on current step');
            return;
        }
        
        // Update progress indicator
        const progressSteps = document.querySelectorAll('.pf-progress-step');
        progressSteps.forEach(stepEl => {
            stepEl.classList.remove('active', 'completed');
        });
        
        // Mark completed steps
        const stepOrder = ['basic', 'materials', 'services', 'docs'];
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
        const slides = document.querySelectorAll('.pf-form-slide');
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        const targetSlide = document.querySelector(`[data-slide="${step}"]`);
        if (targetSlide) {
            targetSlide.classList.add('active');
            console.log('Packaging form - Activated slide:', step);
        } else {
            console.error('Packaging form - Target slide not found:', step);
        }
        
        this.currentStep = step;
        
        // Scroll to top of form for better UX
        const form = document.getElementById('packagingForm');
        if (form) {
            form.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    },
    
    /**
     * Check if step should be validated before navigation
     */
    shouldValidateStep: function(targetStep) {
        const stepOrder = ['basic', 'materials', 'services', 'docs'];
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
window.PackagingFormController = PackagingFormController; 