/**
 * Packaging Form page controller
 */
const PackagingFormController = {
    currentStep: 'basic',
    materials: [],
    services: [],

    /**
     * Initialize the packaging form page
     */
    init: function() {
        // Check if we're on the packaging form page
        const page = document.getElementById('packagingForm');
        if (!page) {
            return; // Not on the packaging form page
        }

        console.log('Packaging Form initialized');

        this.setupEventListeners();
        this.setupFormNavigation();
        this.setupDynamicContent();
        this.setupFileUploads();
        this.setupFormSubmission();

        // Check if editing existing service
        const urlParams = new URLSearchParams(window.location.search);
        const packagingId = urlParams.get('id');
        if (packagingId) {
            this.loadExistingService(packagingId);
        }
    },

    setupEventListeners: function() {
        const page = document.getElementById('packagingForm');
        if (!page) return;

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
            console.log('Packaging Form navigation setup complete');
        }
    },

    setupDynamicContent: function() {
        // Initialize with default items
        this.addMaterial();
        this.addService();
    },

    setupFileUploads: function() {
        const fileInputs = document.querySelectorAll('input[type="file"]');
        fileInputs.forEach(input => {
            const container = input.closest('.pkg-file-upload-container');
            if (!container) return;

            const uploadBtn = container.querySelector('.file-upload-btn');
            const fileNameSpan = container.querySelector('.pkg-file-name');

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
        const form = document.getElementById('packagingForm');
        if (!form) return;

        // Save button handler
        const saveBtn = document.querySelector('[data-action="save-packaging"]');
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
    loadExistingService: function(packagingId) {
        // Get existing data from state
        const packagingServices = State.get('packagingServices') || [];
        const packaging = packagingServices.find(service => service.id == packagingId);
        
        if (packaging) {
            this.populateForm(packaging);
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
            packaging.equipment.forEach(equip => {
                const checkbox = document.querySelector(`input[name="equipment"][value="${equip}"]`);
                if (checkbox) checkbox.checked = true;
            });
        }
    },

    /**
     * Add new material
     */
    addMaterial: function() {
        const container = document.querySelector('.pkg-materials-container');
        if (!container) return;

        const materialItem = document.createElement('div');
        materialItem.className = 'pkg-material-item';
        materialItem.innerHTML = `
            <div class="pkg-material-header">
                <h4 class="pkg-material-title">مادة جديدة</h4>
                <button type="button" class="btn btn-icon pkg-remove-btn" aria-label="إزالة">×</button>
            </div>
            <div class="form-group">
                <label class="form-label">نوع المادة <span class="required">*</span></label>
                <select class="form-control material-type" required>
                    <option value="">اختر نوع المادة</option>
                    <option value="cardboard">كرتون</option>
                    <option value="plastic">بلاستيك</option>
                    <option value="wood">خشب</option>
                    <option value="fabric">قماش</option>
                    <option value="paper">ورق</option>
                    <option value="bubble_wrap">فقاعات هوائية</option>
                    <option value="other">أخرى</option>
                </select>
            </div>
            <div class="form-group">
                <label class="form-label">اسم المادة <span class="required">*</span></label>
                <input type="text" class="form-control material-name" placeholder="أدخل اسم المادة" required>
            </div>
            <div class="form-group">
                <label class="form-label">الوصف</label>
                <textarea class="form-control material-description" rows="2" placeholder="أدخل وصف المادة"></textarea>
            </div>
            <div class="form-group">
                <label class="form-label">السعر (ريال)</label>
                <input type="number" class="form-control material-price" placeholder="أدخل السعر" min="0" step="0.01">
            </div>
        `;

        container.appendChild(materialItem);
    },

    /**
     * Add new service
     */
    addService: function() {
        const container = document.querySelector('.pkg-services-container');
        if (!container) return;

        const serviceItem = document.createElement('div');
        serviceItem.className = 'pkg-service-item';
        serviceItem.innerHTML = `
            <div class="pkg-service-header">
                <h4 class="pkg-service-title">خدمة جديدة</h4>
                <button type="button" class="btn btn-icon pkg-remove-btn" aria-label="إزالة">×</button>
            </div>
            <div class="form-group">
                <label class="form-label">نوع الخدمة <span class="required">*</span></label>
                <select class="form-control service-type" required>
                    <option value="">اختر نوع الخدمة</option>
                    <option value="basic">تغليف أساسي</option>
                    <option value="protective">تغليف واقي</option>
                    <option value="custom">تغليف مخصص</option>
                    <option value="gift">تغليف هدايا</option>
                    <option value="industrial">تغليف صناعي</option>
                </select>
            </div>
            <div class="form-group">
                <label class="form-label">اسم الخدمة <span class="required">*</span></label>
                <input type="text" class="form-control service-name" placeholder="أدخل اسم الخدمة" required>
            </div>
            <div class="form-group">
                <label class="form-label">الوصف</label>
                <textarea class="form-control service-description" rows="2" placeholder="أدخل وصف الخدمة"></textarea>
            </div>
            <div class="form-group">
                <label class="form-label">السعر (ريال)</label>
                <input type="number" class="form-control service-price" placeholder="أدخل السعر" min="0" step="0.01">
            </div>
            <div class="form-group">
                <label class="form-label">الوقت المطلوب (ساعات)</label>
                <input type="number" class="form-control service-time" placeholder="أدخل الوقت المطلوب" min="0">
            </div>
        `;

        container.appendChild(serviceItem);
    },

    /**
     * Render materials
     */
    renderMaterials: function() {
        const container = document.querySelector('.pkg-materials-container');
        if (!container) return;

        container.innerHTML = '';
        this.materials.forEach(material => {
            const materialItem = document.createElement('div');
            materialItem.className = 'pkg-material-item';
            materialItem.innerHTML = `
                <div class="pkg-material-header">
                    <h4 class="pkg-material-title">${material.name}</h4>
                    <button type="button" class="btn btn-icon pkg-remove-btn" aria-label="إزالة">×</button>
                </div>
                <div class="form-group">
                    <label class="form-label">نوع المادة</label>
                    <select class="form-control material-type" required>
                        <option value="cardboard" ${material.type === 'cardboard' ? 'selected' : ''}>كرتون</option>
                        <option value="plastic" ${material.type === 'plastic' ? 'selected' : ''}>بلاستيك</option>
                        <option value="wood" ${material.type === 'wood' ? 'selected' : ''}>خشب</option>
                        <option value="fabric" ${material.type === 'fabric' ? 'selected' : ''}>قماش</option>
                        <option value="paper" ${material.type === 'paper' ? 'selected' : ''}>ورق</option>
                        <option value="bubble_wrap" ${material.type === 'bubble_wrap' ? 'selected' : ''}>فقاعات هوائية</option>
                        <option value="other" ${material.type === 'other' ? 'selected' : ''}>أخرى</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">اسم المادة</label>
                    <input type="text" class="form-control material-name" value="${material.name || ''}" required>
                </div>
                <div class="form-group">
                    <label class="form-label">الوصف</label>
                    <textarea class="form-control material-description" rows="2">${material.description || ''}</textarea>
                </div>
                <div class="form-group">
                    <label class="form-label">السعر (ريال)</label>
                    <input type="number" class="form-control material-price" value="${material.price || ''}" min="0" step="0.01">
                </div>
            `;
            container.appendChild(materialItem);
        });
    },

    /**
     * Render services
     */
    renderServices: function() {
        const container = document.querySelector('.pkg-services-container');
        if (!container) return;

        container.innerHTML = '';
        this.services.forEach(service => {
            const serviceItem = document.createElement('div');
            serviceItem.className = 'pkg-service-item';
            serviceItem.innerHTML = `
                <div class="pkg-service-header">
                    <h4 class="pkg-service-title">${service.name}</h4>
                    <button type="button" class="btn btn-icon pkg-remove-btn" aria-label="إزالة">×</button>
                </div>
                <div class="form-group">
                    <label class="form-label">نوع الخدمة</label>
                    <select class="form-control service-type" required>
                        <option value="basic" ${service.type === 'basic' ? 'selected' : ''}>تغليف أساسي</option>
                        <option value="protective" ${service.type === 'protective' ? 'selected' : ''}>تغليف واقي</option>
                        <option value="custom" ${service.type === 'custom' ? 'selected' : ''}>تغليف مخصص</option>
                        <option value="gift" ${service.type === 'gift' ? 'selected' : ''}>تغليف هدايا</option>
                        <option value="industrial" ${service.type === 'industrial' ? 'selected' : ''}>تغليف صناعي</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label">اسم الخدمة</label>
                    <input type="text" class="form-control service-name" value="${service.name || ''}" required>
                </div>
                <div class="form-group">
                    <label class="form-label">الوصف</label>
                    <textarea class="form-control service-description" rows="2">${service.description || ''}</textarea>
                </div>
                <div class="form-group">
                    <label class="form-label">السعر (ريال)</label>
                    <input type="number" class="form-control service-price" value="${service.price || ''}" min="0" step="0.01">
                </div>
                <div class="form-group">
                    <label class="form-label">الوقت المطلوب (ساعات)</label>
                    <input type="number" class="form-control service-time" value="${service.time || ''}" min="0">
                </div>
            `;
            container.appendChild(serviceItem);
        });
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
        const form = document.getElementById('packagingForm');
        if (!form) return;

        // Use the centralized validation
        if (window.Forms && !window.Forms.validateForm(form)) {
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
        const packagingServices = State.get('packagingServices') || [];
        const newService = {
            id: Date.now(),
            ...formData,
            status: 'active',
            rating: 0,
            orders: 0,
            revenue: 0
        };
        
        packagingServices.push(newService);
        State.update('packagingServices', packagingServices);
        
        if (window.Toast) {
            Toast.show('تم الحفظ', 'تم إضافة خدمة التغليف بنجاح', 'success');
        }
        
        // Navigate back to packaging services list
        setTimeout(() => {
            Router.navigate('mypackaging');
        }, 1500);
    },

    /**
     * Update existing packaging service
     */
    updatePackagingService: function(packagingId, formData) {
        const packagingServices = State.get('packagingServices') || [];
        const serviceIndex = packagingServices.findIndex(service => service.id == packagingId);
        
        if (serviceIndex !== -1) {
            packagingServices[serviceIndex] = {
                ...packagingServices[serviceIndex],
                ...formData,
                updatedAt: new Date().toISOString()
            };
            
            State.update('packagingServices', packagingServices);
            
            if (window.Toast) {
                Toast.show('تم التحديث', 'تم تحديث خدمة التغليف بنجاح', 'success');
            }
            
            // Navigate back to packaging services list
            setTimeout(() => {
                Router.navigate('mypackaging');
            }, 1500);
        }
    }
};

// Explicitly attach to global scope
window.PackagingFormController = PackagingFormController; 