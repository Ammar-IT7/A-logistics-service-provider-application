/**
 * LC Service Form page controller
 */
const LCServiceFormController = {
    /**
     * Initialize the LC service form page
     */
    init: function() {
        // Check if we're on the LC service form page
        const form = document.getElementById('lcServiceForm');
        if (!form) {
            return; // Not on the LC service form page
        }
        
        console.log('LC Service Form page initialized');
        this.formData = {};
        this.banks = [];
        this.documents = [];
        this.setupEventListeners();
        this.loadExistingData();
    },
    
    /**
     * Load existing data if editing
     */
    loadExistingData: function() {
        const urlParams = new URLSearchParams(window.location.search);
        const lcId = urlParams.get('id');
        
        if (lcId) {
            const lcServices = State.get('lcServices');
            const lc = lcServices.find(l => l.id == lcId);
            
            if (lc) {
                this.formData = { ...lc };
                this.populateForm(lc);
                this.updateHeaderTitle('تعديل خدمة الاعتماد المستندي');
            }
        }
    },
    
    /**
     * Populate form with existing data
     */
    populateForm: function(lc) {
        // Basic info
        document.getElementById('serviceName').value = lc.serviceName || '';
        document.getElementById('serviceType').value = lc.serviceType || '';
        document.getElementById('description').value = lc.description || '';
        
        // Contact info
        document.getElementById('contactName').value = lc.contactName || '';
        document.getElementById('contactPhone').value = lc.contactPhone || '';
        document.getElementById('contactEmail').value = lc.contactEmail || '';
        document.getElementById('address').value = lc.address || '';
        
        // Banks
        if (lc.banks && lc.banks.length > 0) {
            this.banks = [...lc.banks];
            this.renderBanks();
        }
        
        // Documents
        if (lc.documents && lc.documents.length > 0) {
            this.documents = [...lc.documents];
            this.renderDocuments();
        }
        
        // Fees
        document.getElementById('applicationFee').value = lc.applicationFee || '';
        document.getElementById('processingFee').value = lc.processingFee || '';
        document.getElementById('commissionRate').value = lc.commissionRate || '';
        document.getElementById('minAmount').value = lc.minAmount || '';
        document.getElementById('maxAmount').value = lc.maxAmount || '';
        
        // Processing time
        document.getElementById('processingTime').value = lc.processingTime || '';
        
        // Specializations
        if (lc.specializations) {
            lc.specializations.forEach(spec => {
                const checkbox = document.querySelector(`input[name="specialization"][value="${spec}"]`);
                if (checkbox) checkbox.checked = true;
            });
        }
        
        // Experience
        document.getElementById('experienceYears').value = lc.experienceYears || '';
        document.getElementById('completedLCs').value = lc.completedLCs || '';
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
        const page = document.getElementById('lc-service-form');
        if (!page) return;
        
        // Form submission
        const form = document.getElementById('lcServiceForm');
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
                console.log('LC Service form - Navigating to step:', targetStep);
                this.navigateToStep(targetStep);
            }
        });
        
        // Save button in header
        const saveButton = page.querySelector('[data-action="save-lc-service"]');
        if (saveButton) {
            saveButton.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleFormSubmit();
            });
        }
        
        // Add bank button
        const addBankBtn = page.querySelector('[data-action="add-bank"]');
        if (addBankBtn) {
            addBankBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.addBank();
            });
        }
        
        // Add document button
        const addDocBtn = page.querySelector('[data-action="add-document"]');
        if (addDocBtn) {
            addDocBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.addDocument();
            });
        }
        
        // Remove buttons (delegated event handling)
        page.addEventListener('click', (e) => {
            const removeBtn = e.target.closest('.lcf-remove-btn');
            if (removeBtn) {
                e.preventDefault();
                const item = removeBtn.closest('.lcf-bank-item, .lcf-document-item');
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
     * Add new bank
     */
    addBank: function(data = null) {
        const container = document.querySelector('.lcf-banks-container');
        if (!container) return;
        
        const bankItem = document.createElement('div');
        bankItem.className = 'lcf-bank-item';
        bankItem.innerHTML = `
            <div class="form-group">
                <label class="form-label">اسم البنك</label>
                <input type="text" class="form-control bank-name" placeholder="أدخل اسم البنك" value="${data?.name || ''}">
            </div>
            <div class="form-group">
                <label class="form-label">نوع البنك</label>
                <select class="form-control bank-type">
                    <option value="">اختر نوع البنك</option>
                    <option value="local" ${data?.type === 'local' ? 'selected' : ''}>محلي</option>
                    <option value="international" ${data?.type === 'international' ? 'selected' : ''}>دولي</option>
                    <option value="islamic" ${data?.type === 'islamic' ? 'selected' : ''}>إسلامي</option>
                    <option value="commercial" ${data?.type === 'commercial' ? 'selected' : ''}>تجاري</option>
                </select>
            </div>
            <div class="form-group">
                <label class="form-label">الفرع</label>
                <input type="text" class="form-control bank-branch" placeholder="أدخل اسم الفرع" value="${data?.branch || ''}">
            </div>
            <div class="form-group">
                <label class="form-label">رقم الحساب</label>
                <input type="text" class="form-control bank-account" placeholder="أدخل رقم الحساب" value="${data?.account || ''}">
            </div>
            <div class="form-group">
                <label class="form-label">معدل العمولة (%)</label>
                <input type="number" class="form-control bank-commission" placeholder="أدخل معدل العمولة" step="0.01" value="${data?.commission || ''}">
            </div>
            <button type="button" class="btn btn-icon lcf-remove-btn">×</button>
        `;
        
        container.appendChild(bankItem);
    },
    
    /**
     * Add new document
     */
    addDocument: function(data = null) {
        const container = document.querySelector('.lcf-documents-container');
        if (!container) return;
        
        const documentItem = document.createElement('div');
        documentItem.className = 'lcf-document-item';
        documentItem.innerHTML = `
            <div class="form-group">
                <label class="form-label">نوع المستند</label>
                <select class="form-control document-type">
                    <option value="">اختر نوع المستند</option>
                    <option value="invoice" ${data?.type === 'invoice' ? 'selected' : ''}>فاتورة تجارية</option>
                    <option value="packing" ${data?.type === 'packing' ? 'selected' : ''}>قائمة التعبئة</option>
                    <option value="certificate" ${data?.type === 'certificate' ? 'selected' : ''}>شهادة منشأ</option>
                    <option value="insurance" ${data?.type === 'insurance' ? 'selected' : ''}>وثيقة تأمين</option>
                    <option value="transport" ${data?.type === 'transport' ? 'selected' : ''}>وثيقة نقل</option>
                    <option value="other" ${data?.type === 'other' ? 'selected' : ''}>أخرى</option>
                </select>
            </div>
            <div class="form-group">
                <label class="form-label">اسم المستند</label>
                <input type="text" class="form-control document-name" placeholder="أدخل اسم المستند" value="${data?.name || ''}">
            </div>
            <div class="form-group">
                <label class="form-label">الوصف</label>
                <textarea class="form-control document-description" rows="2" placeholder="أدخل وصف المستند">${data?.description || ''}</textarea>
            </div>
            <div class="form-group">
                <label class="form-label">مطلوب</label>
                <div class="lcf-checkbox-container">
                    <label class="lcf-checkbox-item">
                        <input type="checkbox" class="document-required" ${data?.required ? 'checked' : ''}>
                        <span>مستند مطلوب</span>
                    </label>
                </div>
            </div>
            <button type="button" class="btn btn-icon lcf-remove-btn">×</button>
        `;
        
        container.appendChild(documentItem);
    },
    
    /**
     * Render banks list
     */
    renderBanks: function() {
        const container = document.querySelector('.lcf-banks-container');
        if (!container) return;
        
        container.innerHTML = '';
        this.banks.forEach(bank => {
            this.addBank(bank);
        });
    },
    
    /**
     * Render documents list
     */
    renderDocuments: function() {
        const container = document.querySelector('.lcf-documents-container');
        if (!container) return;
        
        container.innerHTML = '';
        this.documents.forEach(document => {
            this.addDocument(document);
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
        const fileNameSpan = event.target.parentNode.querySelector('.lcf-file-name');
        
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
        // Collect banks
        const banks = [];
        const bankItems = document.querySelectorAll('.lcf-bank-item');
        bankItems.forEach(item => {
            const bank = {
                name: item.querySelector('.bank-name').value,
                type: item.querySelector('.bank-type').value,
                branch: item.querySelector('.bank-branch').value,
                account: item.querySelector('.bank-account').value,
                commission: parseFloat(item.querySelector('.bank-commission').value) || 0
            };
            if (bank.name && bank.type) {
                banks.push(bank);
            }
        });
        
        // Collect documents
        const documents = [];
        const documentItems = document.querySelectorAll('.lcf-document-item');
        documentItems.forEach(item => {
            const document = {
                type: item.querySelector('.document-type').value,
                name: item.querySelector('.document-name').value,
                description: item.querySelector('.document-description').value,
                required: item.querySelector('.document-required').checked
            };
            if (document.type && document.name) {
                documents.push(document);
            }
        });
        
        // Collect specializations
        const specializations = Array.from(document.querySelectorAll('input[name="specialization"]:checked'))
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
            banks: banks,
            documents: documents,
            specializations: specializations,
            
            // Fees
            applicationFee: parseFloat(document.getElementById('applicationFee').value) || 0,
            processingFee: parseFloat(document.getElementById('processingFee').value) || 0,
            commissionRate: parseFloat(document.getElementById('commissionRate').value) || 0,
            minAmount: parseFloat(document.getElementById('minAmount').value) || 0,
            maxAmount: parseFloat(document.getElementById('maxAmount').value) || 0,
            
            // Processing time
            processingTime: document.getElementById('processingTime').value,
            
            // Experience
            experienceYears: parseInt(document.getElementById('experienceYears').value) || 0,
            completedLCs: parseInt(document.getElementById('completedLCs').value) || 0,
            
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
        
        // Validate banks
        const banks = document.querySelectorAll('.lcf-bank-item');
        if (banks.length === 0) {
            Toast.show('خطأ في التحقق', 'يجب إضافة بنك واحد على الأقل', 'error');
            isValid = false;
        }
        
        // Validate documents
        const documents = document.querySelectorAll('.lcf-document-item');
        if (documents.length === 0) {
            Toast.show('خطأ في التحقق', 'يجب إضافة مستند واحد على الأقل', 'error');
            isValid = false;
        }
        
        if (!isValid) {
            return;
        }
        
        // Collect form data
        const formData = this.collectFormData();
        
        // Check if editing or creating new
        const urlParams = new URLSearchParams(window.location.search);
        const lcId = urlParams.get('id');
        
        if (lcId) {
            // Update existing LC service
            this.updateLCService(lcId, formData);
        } else {
            // Create new LC service
            this.createLCService(formData);
        }
    },
    
    /**
     * Create new LC service
     */
    createLCService: function(formData) {
        const lcServices = State.get('lcServices');
        const newLCService = {
            id: Date.now(),
            type: formData.serviceType,
            service: formData.serviceName,
            banks: formData.banks.length,
            orders: 0,
            revenue: 0,
            rating: 0,
            status: 'active',
            ...formData
        };
        
        lcServices.push(newLCService);
        State.set('lcServices', lcServices);
        
        Toast.show('تم الحفظ', 'تم إضافة خدمة الاعتماد المستندي بنجاح', 'success');
        
        // Navigate back to LC services list
        setTimeout(() => {
            Router.navigate('my-lc-services');
        }, 1500);
    },
    
    /**
     * Update existing LC service
     */
    updateLCService: function(lcId, formData) {
        const lcServices = State.get('lcServices');
        const lcIndex = lcServices.findIndex(l => l.id == lcId);
        
        if (lcIndex !== -1) {
            const updatedLCService = {
                ...lcServices[lcIndex],
                ...formData,
                type: formData.serviceType,
                service: formData.serviceName,
                banks: formData.banks.length,
                updatedAt: new Date().toISOString()
            };
            
            lcServices[lcIndex] = updatedLCService;
            State.set('lcServices', lcServices);
            
            Toast.show('تم التحديث', 'تم تحديث خدمة الاعتماد المستندي بنجاح', 'success');
            
            // Navigate back to LC services list
            setTimeout(() => {
                Router.navigate('my-lc-services');
            }, 1500);
        }
    },
    
    /**
     * Navigate to specific step
     */
    navigateToStep: function(step) {
        console.log('LC Service form - Current step:', this.currentStep, 'Target step:', step);
        
        // Validate current step before moving forward
        if (this.shouldValidateStep(step) && !this.validateCurrentStep()) {
            console.log('LC Service form - Validation failed, staying on current step');
            return;
        }
        
        // Update progress indicator
        const progressSteps = document.querySelectorAll('.lcf-progress-step');
        progressSteps.forEach(stepEl => {
            stepEl.classList.remove('active', 'completed');
        });
        
        // Mark completed steps
        const stepOrder = ['basic', 'banks', 'documents', 'fees'];
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
        const slides = document.querySelectorAll('.lcf-form-slide');
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        const targetSlide = document.querySelector(`[data-slide="${step}"]`);
        if (targetSlide) {
            targetSlide.classList.add('active');
            console.log('LC Service form - Activated slide:', step);
        } else {
            console.error('LC Service form - Target slide not found:', step);
        }
        
        this.currentStep = step;
        
        // Scroll to top of form for better UX
        const form = document.getElementById('lcServiceForm');
        if (form) {
            form.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    },
    
    /**
     * Check if step should be validated before navigation
     */
    shouldValidateStep: function(targetStep) {
        const stepOrder = ['basic', 'banks', 'documents', 'fees'];
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
window.LCServiceFormController = LCServiceFormController; 