/**
 * LC Service Form page controller
 */
const LCServiceFormController = {
    currentStep: 'basic',
    banks: [],
    documents: [],

    /**
     * Initialize the LC service form page
     */
    init: function() {
        // Check if we're on the LC service form page
        const page = document.getElementById('lcServiceForm');
        if (!page) {
            return; // Not on the LC service form page
        }

        console.log('LC Service Form initialized');

        this.setupEventListeners();
        this.setupFormNavigation();
        this.setupDynamicContent();
        this.setupFileUploads();
        this.setupFormSubmission();

        // Check if editing existing service
        const urlParams = new URLSearchParams(window.location.search);
        const lcId = urlParams.get('id');
        if (lcId) {
            this.loadExistingService(lcId);
        }
    },

    setupEventListeners: function() {
        const page = document.getElementById('lcServiceForm');
        if (!page) return;

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
                    // Re-validate dynamic items
                    if (window.Forms) {
                        window.Forms.validateDynamicItems(page);
                    }
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
    },

    setupFormNavigation: function() {
        // Use the centralized form navigation from Forms utility
        if (window.Forms) {
            // The Forms utility will handle step navigation automatically
            console.log('LC Service Form navigation setup complete');
        }
    },

    setupDynamicContent: function() {
        // Initialize with default items
        this.addBank();
        this.addDocument();
    },

    setupFileUploads: function() {
        const fileInputs = document.querySelectorAll('input[type="file"]');
        fileInputs.forEach(input => {
            const container = input.closest('.lcf-file-upload-container');
            if (!container) return;

            const uploadBtn = container.querySelector('.file-upload-btn');
            const fileNameSpan = container.querySelector('.lcf-file-name');

            uploadBtn?.addEventListener('click', () => {
                input.click();
            });

            input.addEventListener('change', () => {
                if (input.files.length > 0) {
                    if (input.multiple) {
                        fileNameSpan.textContent = `تم اختيار ${input.files.length} ملفات`;
                    } else {
                        fileNameSpan.textContent = input.files[0].name;
                    }
                } else {
                    fileNameSpan.textContent = 'لم يتم اختيار ملف';
                }
            });
        });
    },

    setupFormSubmission: function() {
        const form = document.getElementById('lcServiceForm');
        if (!form) return;

        // Save button handler
        const saveBtn = document.querySelector('[data-action="save-lc-service"]');
        if (saveBtn) {
            saveBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleFormSubmit();
            });
        }

        // Form submission handler
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmit();
        });
    },

    /**
     * Load existing service data for editing
     */
    loadExistingService: function(lcId) {
        // Get existing data from state
        const lcServices = State.get('lcServices') || [];
        const lc = lcServices.find(service => service.id == lcId);
        
        if (lc) {
            this.populateForm(lc);
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
     * Add new bank
     */
    addBank: function() {
        const container = document.querySelector('.lcf-banks-container');
        if (!container) return;

        const bankItem = document.createElement('div');
        bankItem.className = 'lcf-bank-item';
        bankItem.innerHTML = `
            <div class="lcf-bank-header">
                <h4 class="lcf-bank-title">بنك جديد</h4>
                <button type="button" class="btn btn-icon lcf-remove-btn" aria-label="إزالة">×</button>
            </div>
            <div class="form-group">
                <label class="form-label">اسم البنك <span class="required">*</span></label>
                <input type="text" class="form-control bank-name" placeholder="أدخل اسم البنك" required>
            </div>
            <div class="form-group">
                <label class="form-label">نوع البنك <span class="required">*</span></label>
                <select class="form-control bank-type" required>
                    <option value="">اختر نوع البنك</option>
                    <option value="commercial">بنك تجاري</option>
                    <option value="islamic">بنك إسلامي</option>
                    <option value="investment">بنك استثماري</option>
                    <option value="development">بنك تنمية</option>
                </select>
            </div>
            <div class="form-group">
                <label class="form-label">الفرع</label>
                <input type="text" class="form-control bank-branch" placeholder="أدخل اسم الفرع">
            </div>
            <div class="form-group">
                <label class="form-label">رقم الحساب</label>
                <input type="text" class="form-control bank-account" placeholder="أدخل رقم الحساب">
            </div>
            <div class="form-group">
                <label class="form-label">نسبة العمولة (%)</label>
                <input type="number" class="form-control bank-commission" placeholder="أدخل نسبة العمولة" min="0" max="100" step="0.01">
            </div>
        `;

        container.appendChild(bankItem);
    },

    /**
     * Add new document
     */
    addDocument: function() {
        const container = document.querySelector('.lcf-documents-container');
        if (!container) return;

        const documentItem = document.createElement('div');
        documentItem.className = 'lcf-document-item';
        documentItem.innerHTML = `
            <div class="lcf-document-header">
                <h4 class="lcf-document-title">مستند جديد</h4>
                <button type="button" class="btn btn-icon lcf-remove-btn" aria-label="إزالة">×</button>
            </div>
            <div class="form-group">
                <label class="form-label">نوع المستند <span class="required">*</span></label>
                <select class="form-control document-type" required>
                    <option value="">اختر نوع المستند</option>
                    <option value="commercial_register">السجل التجاري</option>
                    <option value="tax_card">البطاقة الضريبية</option>
                    <option value="bank_statement">كشف حساب بنكي</option>
                    <option value="financial_statement">كشف مالي</option>
                    <option value="contract">عقد</option>
                    <option value="other">أخرى</option>
                </select>
            </div>
            <div class="form-group">
                <label class="form-label">اسم المستند <span class="required">*</span></label>
                <input type="text" class="form-control document-name" placeholder="أدخل اسم المستند" required>
            </div>
            <div class="form-group">
                <label class="form-label">الوصف</label>
                <textarea class="form-control document-description" rows="2" placeholder="أدخل وصف المستند"></textarea>
            </div>
            <div class="form-group">
                <label class="form-label">
                    <input type="checkbox" class="form-checkbox document-required" checked>
                    <span>مطلوب</span>
                </label>
            </div>
        `;

        container.appendChild(documentItem);
    },

    /**
     * Render banks
     */
    renderBanks: function() {
        const container = document.querySelector('.lcf-banks-container');
        if (!container) return;

        container.innerHTML = '';
        this.banks.forEach(bank => {
            const bankItem = document.createElement('div');
            bankItem.className = 'lcf-bank-item';
            bankItem.innerHTML = `
                <div class="lcf-bank-header">
                    <h4 class="lcf-bank-title">${bank.name}</h4>
                    <button type="button" class="btn btn-icon lcf-remove-btn" aria-label="إزالة">×</button>
                </div>
                <div class="form-group">
                    <label class="form-label">اسم البنك</label>
                    <input type="text" class="form-control bank-name" value="${bank.name || ''}" required>
                </div>
                <div class="form-group">
                    <label class="form-label">نوع البنك</label>
                    <select class="form-control bank-type" required>
                        <option value="commercial" ${bank.type === 'commercial' ? 'selected' : ''}>بنك تجاري</option>
                        <option value="islamic" ${bank.type === 'islamic' ? 'selected' : ''}>بنك إسلامي</option>
                        <option value="investment" ${bank.type === 'investment' ? 'selected' : ''}>بنك استثماري</option>
                        <option value="development" ${bank.type === 'development' ? 'selected' : ''}>بنك تنمية</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">الفرع</label>
                    <input type="text" class="form-control bank-branch" value="${bank.branch || ''}">
                </div>
                <div class="form-group">
                    <label class="form-label">رقم الحساب</label>
                    <input type="text" class="form-control bank-account" value="${bank.account || ''}">
                </div>
                <div class="form-group">
                    <label class="form-label">نسبة العمولة (%)</label>
                    <input type="number" class="form-control bank-commission" value="${bank.commission || ''}" min="0" max="100" step="0.01">
                </div>
            `;
            container.appendChild(bankItem);
        });
    },

    /**
     * Render documents
     */
    renderDocuments: function() {
        const container = document.querySelector('.lcf-documents-container');
        if (!container) return;

        container.innerHTML = '';
        this.documents.forEach(doc => {
            const documentItem = document.createElement('div');
            documentItem.className = 'lcf-document-item';
            documentItem.innerHTML = `
                <div class="lcf-document-header">
                    <h4 class="lcf-document-title">${doc.name}</h4>
                    <button type="button" class="btn btn-icon lcf-remove-btn" aria-label="إزالة">×</button>
                </div>
                <div class="form-group">
                    <label class="form-label">نوع المستند</label>
                    <select class="form-control document-type" required>
                        <option value="commercial_register" ${doc.type === 'commercial_register' ? 'selected' : ''}>السجل التجاري</option>
                        <option value="tax_card" ${doc.type === 'tax_card' ? 'selected' : ''}>البطاقة الضريبية</option>
                        <option value="bank_statement" ${doc.type === 'bank_statement' ? 'selected' : ''}>كشف حساب بنكي</option>
                        <option value="financial_statement" ${doc.type === 'financial_statement' ? 'selected' : ''}>كشف مالي</option>
                        <option value="contract" ${doc.type === 'contract' ? 'selected' : ''}>عقد</option>
                        <option value="other" ${doc.type === 'other' ? 'selected' : ''}>أخرى</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">اسم المستند</label>
                    <input type="text" class="form-control document-name" value="${doc.name || ''}" required>
                </div>
                <div class="form-group">
                    <label class="form-label">الوصف</label>
                    <textarea class="form-control document-description" rows="2">${doc.description || ''}</textarea>
                </div>
                <div class="form-group">
                    <label class="form-label">
                        <input type="checkbox" class="form-checkbox document-required" ${doc.required ? 'checked' : ''}>
                        <span>مطلوب</span>
                    </label>
                </div>
            `;
            container.appendChild(documentItem);
        });
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
                if (window.Toast) {
                    Toast.show('خطأ في الملف', 'يجب اختيار ملف صورة أو PDF', 'error');
                }
                event.target.value = '';
                if (fileNameSpan) {
                    fileNameSpan.textContent = 'لم يتم اختيار ملف';
                }
            }
            
            // Validate file size (5MB max)
            if (file.size > 5 * 1024 * 1024) {
                if (window.Toast) {
                    Toast.show('خطأ في الملف', 'حجم الملف يجب أن يكون أقل من 5 ميجابايت', 'error');
                }
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
        const form = document.getElementById('lcServiceForm');
        if (!form) return;

        // Use the centralized validation
        if (window.Forms && !window.Forms.validateForm(form)) {
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
        const lcServices = State.get('lcServices') || [];
        const newService = {
            id: Date.now(),
            ...formData,
            status: 'active',
            rating: 0,
            orders: 0,
            revenue: 0
        };
        
        lcServices.push(newService);
        State.update('lcServices', lcServices);
        
        if (window.Toast) {
            Toast.show('تم الحفظ', 'تم إضافة خدمة الاعتماد المستندي بنجاح', 'success');
        }
        
        // Navigate back to LC services list
        setTimeout(() => {
            Router.navigate('mylcservices');
        }, 1500);
    },

    /**
     * Update existing LC service
     */
    updateLCService: function(lcId, formData) {
        const lcServices = State.get('lcServices') || [];
        const serviceIndex = lcServices.findIndex(service => service.id == lcId);
        
        if (serviceIndex !== -1) {
            lcServices[serviceIndex] = {
                ...lcServices[serviceIndex],
                ...formData,
                updatedAt: new Date().toISOString()
            };
            
            State.update('lcServices', lcServices);
            
            if (window.Toast) {
                Toast.show('تم التحديث', 'تم تحديث خدمة الاعتماد المستندي بنجاح', 'success');
            }
            
            // Navigate back to LC services list
            setTimeout(() => {
                Router.navigate('mylcservices');
            }, 1500);
        }
    }
};

// Explicitly attach to global scope
window.LCServiceFormController = LCServiceFormController; 
