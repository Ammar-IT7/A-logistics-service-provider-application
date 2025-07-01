/**
 * Shipping Form Controller
 * Handles form navigation, validation, and dynamic content
 */

const ShippingFormController = {
    init: function() {
        // Check if we're on the shipping form page
        const form = document.getElementById('vehicleForm');
        if (!form) {
            return; // Not on the shipping form page
        }
        
        console.log('Shipping Vehicle Form initialized');

        this.form = form;
        this.slides = document.querySelectorAll('.shipping-form-slide');
        this.progressSteps = document.querySelectorAll('.shipping-progress-step');

        this.setupFormNavigation();
        this.setupConditionalFields();
        this.setupFileUploads();
        this.setupChipsInputs();
        this.setupDriversAndMaintenance();
        this.setupFormSubmission();

        // Save button handler
        const saveBtn = document.querySelector('[data-action="save-vehicle"]');
        if (saveBtn) {
            saveBtn.addEventListener('click', () => {
                this.form.dispatchEvent(new Event('submit'));
            });
        }
    },

    setupFormNavigation: function() {
        // Use the centralized form navigation from Forms utility
        if (window.Forms) {
            // The Forms utility will handle step navigation automatically
            console.log('Shipping Form navigation setup complete');
        }
    },

    setupConditionalFields: function() {
        const shippingTypeSelect = document.getElementById('shippingType');
        const vehicleTypeSelect = document.getElementById('vehicleType');
        const self = this;

        if (!shippingTypeSelect || !vehicleTypeSelect) return;

        shippingTypeSelect.addEventListener('change', () => {
            self.updateVehicleTypeOptions();
            self.updateVisibleFields();
        });

        vehicleTypeSelect.addEventListener('change', () => {
            self.updateVisibleFields();
        });

        const coverageTypeRadios = document.querySelectorAll('input[name="coverageType"]');
        coverageTypeRadios.forEach(radio => {
            radio.addEventListener('change', () => {
                self.updateCoverageFields();
            });
        });

        self.updateVehicleTypeOptions();
        self.updateVisibleFields();
        self.updateCoverageFields();
    },

    updateVehicleTypeOptions: function() {
        const shippingTypeSelect = document.getElementById('shippingType');
        const vehicleTypeSelect = document.getElementById('vehicleType');
        if (!shippingTypeSelect || !vehicleTypeSelect) return;

        const shippingType = shippingTypeSelect.value;
        const vehicleTypeOptgroups = vehicleTypeSelect.querySelectorAll('optgroup');

        vehicleTypeOptgroups.forEach(optgroup => {
            optgroup.querySelectorAll('option').forEach(option => {
                option.style.display = 'none';
            });
        });

        if (shippingType) {
            let label = '';
            if (shippingType === 'land') label = 'شحن بري';
            else if (shippingType === 'air') label = 'شحن جوي';
            else if (shippingType === 'sea') label = 'شحن بحري';

            const relevantOptgroup = Array.from(vehicleTypeOptgroups).find(optgroup => optgroup.label === label);

            if (relevantOptgroup) {
                relevantOptgroup.querySelectorAll('option').forEach(option => {
                    option.style.display = '';
                });

                const firstOption = relevantOptgroup.querySelector('option');
                if (firstOption) {
                    vehicleTypeSelect.value = firstOption.value;
                }
            }
        }
    },

    updateVisibleFields: function() {
        const shippingTypeSelect = document.getElementById('shippingType');
        if (!shippingTypeSelect) return;

        const shippingType = shippingTypeSelect.value;

        // Land-specific fields
        const landVehicleFields = document.getElementById('landVehicleFields');
        const landSpecsFields = document.getElementById('landSpecsFields');
        const landDocsFields = document.getElementById('landDocsFields');
        const landStaffFields = document.getElementById('landStaffFields');

        if (landVehicleFields) landVehicleFields.style.display = 'none';
        if (landSpecsFields) landSpecsFields.style.display = 'none';
        if (landDocsFields) landDocsFields.style.display = 'none';
        if (landStaffFields) landStaffFields.style.display = 'none';

        if (shippingType === 'land') {
            if (landVehicleFields) landVehicleFields.style.display = 'block';
            if (landSpecsFields) landSpecsFields.style.display = 'block';
            if (landDocsFields) landDocsFields.style.display = 'block';
            if (landStaffFields) landStaffFields.style.display = 'block';
        }
    },

    updateCoverageFields: function() {
        const coverageType = document.querySelector('input[name="coverageType"]:checked')?.value;
        const localCoverageFields = document.getElementById('localCoverageFields');
        const internationalCoverageFields = document.getElementById('internationalCoverageFields');

        if (!localCoverageFields || !internationalCoverageFields) return;

        if (coverageType === 'local') {
            localCoverageFields.style.display = 'block';
            internationalCoverageFields.style.display = 'none';
        } else {
            localCoverageFields.style.display = 'none';
            internationalCoverageFields.style.display = 'block';
        }
    },

    setupFileUploads: function() {
        const fileInputs = document.querySelectorAll('input[type="file"]');

        fileInputs.forEach(fileInput => {
            const container = fileInput.closest('.shipping-file-upload-container');
            if (!container) return;

            const uploadBtn = container.querySelector('.file-upload-btn');
            const fileNameSpan = container.querySelector('.shipping-file-name');

            uploadBtn?.addEventListener('click', () => {
                fileInput.click();
            });

            fileInput.addEventListener('change', () => {
                if (fileInput.files.length > 0) {
                    if (fileInput.multiple) {
                        fileNameSpan.textContent = `تم اختيار ${fileInput.files.length} ملفات`;
                    } else {
                        fileNameSpan.textContent = fileInput.files[0].name;
                    }
                } else {
                    fileNameSpan.textContent = 'لم يتم اختيار ملف';
                }
            });
        });
    },

    setupChipsInputs: function() {
        this.setupChipInput('localAreaInput', 'localAreasChips');
        this.setupChipInput('countryInput', 'countriesChips');
    },

    setupChipInput: function(inputId, containerId) {
        const input = document.getElementById(inputId);
        const container = document.getElementById(containerId);

        if (!input || !container) return;

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && input.value.trim()) {
                e.preventDefault();
                this.addChip(input.value.trim(), container);
                input.value = '';
            }
        });

        // Initial demo chips
        if (containerId === 'localAreasChips') {
            this.addChip('الرياض', container);
            this.addChip('جدة', container);
        } else if (containerId === 'countriesChips') {
            this.addChip('السعودية', container);
            this.addChip('الإمارات', container);
        }
    },

    addChip: function(text, container) {
        const chip = document.createElement('div');
        chip.className = 'shipping-chip';
        chip.innerHTML = `
            <span class="shipping-chip-close">×</span>
            <span class="shipping-chip-text">${text}</span>
        `;

        chip.querySelector('.shipping-chip-close').addEventListener('click', () => {
            chip.remove();
        });

        container.appendChild(chip);
    },

    setupDriversAndMaintenance: function() {
        const addDriverBtn = document.getElementById('addDriver');
        const driversContainer = document.querySelector('.shipping-drivers-container');
        const addMaintenanceBtn = document.getElementById('addMaintenance');
        const maintenanceContainer = document.querySelector('.shipping-maintenance-container');
        const self = this;

        if (addDriverBtn && driversContainer) {
            addDriverBtn.addEventListener('click', () => {
                const driverCount = driversContainer.querySelectorAll('.shipping-driver-item').length + 1;
                const newDriver = self.createDriverItem(driverCount);
                driversContainer.appendChild(newDriver);
                self.setupFileUploads();
            });

            driversContainer.addEventListener('click', (e) => {
                if (e.target.classList.contains('shipping-remove-driver')) {
                    const driverItem = e.target.closest('.shipping-driver-item');
                    if (driversContainer.querySelectorAll('.shipping-driver-item').length > 1) {
                        driverItem.remove();
                        self.renumberDrivers(driversContainer);
                    } else {
                        if (window.Toast) {
                            Toast.show('خطأ', 'يجب أن يكون هناك سائق واحد على الأقل', 'error');
                        }
                    }
                }
            });
        }

        if (addMaintenanceBtn && maintenanceContainer) {
            addMaintenanceBtn.addEventListener('click', () => {
                const maintenanceCount = maintenanceContainer.querySelectorAll('.shipping-maintenance-item').length + 1;
                const newMaintenance = self.createMaintenanceItem(maintenanceCount);
                maintenanceContainer.appendChild(newMaintenance);
            });

            maintenanceContainer.addEventListener('click', (e) => {
                if (e.target.classList.contains('shipping-remove-maintenance')) {
                    const maintenanceItem = e.target.closest('.shipping-maintenance-item');
                    if (maintenanceContainer.querySelectorAll('.shipping-maintenance-item').length > 1) {
                        maintenanceItem.remove();
                        self.renumberMaintenance(maintenanceContainer);
                    } else {
                        if (window.Toast) {
                            Toast.show('خطأ', 'يجب أن تكون هناك صيانة واحدة على الأقل', 'error');
                        }
                    }
                }
            });
        }
    },

    createDriverItem: function(index) {
        const driverItem = document.createElement('div');
        driverItem.className = 'shipping-driver-item';
        driverItem.innerHTML = `
            <div class="shipping-driver-header">
                <h4 class="shipping-driver-title">السائق ${index}</h4>
                <button type="button" class="btn btn-icon shipping-remove-driver" aria-label="إزالة">×</button>
            </div>
            <div class="form-group">
                <label class="form-label">اسم السائق <span class="required">*</span></label>
                <input type="text" name="driverName[]" class="form-control" placeholder="أدخل اسم السائق" required>
            </div>
            <div class="form-group">
                <label class="form-label">رقم رخصة القيادة <span class="required">*</span></label>
                <input type="text" name="driverLicense[]" class="form-control" placeholder="أدخل رقم الرخصة" required>
            </div>
            <div class="form-group">
                <label class="form-label">تاريخ انتهاء الرخصة <span class="required">*</span></label>
                <input type="date" name="driverLicenseExpiry[]" class="form-control" required data-future-only>
            </div>
            <div class="form-group">
                <label class="form-label">رقم الجوال <span class="required">*</span></label>
                <input type="tel" name="driverPhone[]" class="form-control" placeholder="أدخل رقم الجوال" required>
            </div>
            <div class="form-group">
                <label class="form-label">صورة الهوية</label>
                <div class="shipping-file-upload-container">
                    <input type="file" name="driverID[]" class="form-control" accept="image/*,.pdf">
                    <button type="button" class="btn btn-outline btn-sm file-upload-btn">اختر الملف</button>
                    <span class="shipping-file-name">لم يتم اختيار ملف</span>
                </div>
            </div>
        `;
        return driverItem;
    },

    createMaintenanceItem: function(index) {
        const maintenanceItem = document.createElement('div');
        maintenanceItem.className = 'shipping-maintenance-item';
        maintenanceItem.innerHTML = `
            <div class="shipping-maintenance-header">
                <h4 class="shipping-maintenance-title">الصيانة ${index}</h4>
                <button type="button" class="btn btn-icon shipping-remove-maintenance" aria-label="إزالة">×</button>
            </div>
            <div class="form-group">
                <label class="form-label">نوع الصيانة <span class="required">*</span></label>
                <input type="text" name="maintenanceType[]" class="form-control" placeholder="أدخل نوع الصيانة" required>
            </div>
            <div class="form-group">
                <label class="form-label">تاريخ آخر صيانة</label>
                <input type="date" name="lastMaintenance[]" class="form-control">
            </div>
            <div class="form-group">
                <label class="form-label">تاريخ الصيانة القادمة</label>
                <input type="date" name="nextMaintenance[]" class="form-control" data-future-only>
            </div>
        `;
        return maintenanceItem;
    },

    renumberDrivers: function(driversContainer) {
        const drivers = driversContainer.querySelectorAll('.shipping-driver-item');
        drivers.forEach((driver, index) => {
            driver.querySelector('.shipping-driver-title').textContent = `السائق ${index + 1}`;
        });
    },

    renumberMaintenance: function(maintenanceContainer) {
        const maintenanceItems = maintenanceContainer.querySelectorAll('.shipping-maintenance-item');
        maintenanceItems.forEach((item, index) => {
            item.querySelector('.shipping-maintenance-title').textContent = `الصيانة ${index + 1}`;
        });
    },

    setupFormSubmission: function() {
        const self = this;

        this.form.addEventListener('submit', (e) => {
            e.preventDefault();

            // Use the centralized validation
            if (window.Forms && !window.Forms.validateForm(this.form)) {
                return;
            }

            self.saveVehicleData();
        });
    },

    saveVehicleData: function() {
        const formData = new FormData(this.form);

        // Add chips data
        const localAreas = Array.from(document.querySelectorAll('#localAreasChips .shipping-chip-text')).map(chip => chip.textContent);
        const countries = Array.from(document.querySelectorAll('#countriesChips .shipping-chip-text')).map(chip => chip.textContent);

        // Collect form data
        const vehicleData = {
            id: Date.now(),
            vehicleName: formData.get('vehicleName'),
            vehicleType: formData.get('vehicleType'),
            shippingType: formData.get('shippingType'),
            licensePlate: formData.get('licensePlate'),
            vehicleStatus: formData.get('vehicleStatus'),
            maxLoad: formData.get('maxLoad'),
            weightUnit: formData.get('weightUnit'),
            length: formData.get('length'),
            width: formData.get('width'),
            height: formData.get('height'),
            fuelType: formData.get('fuelType'),
            fuelConsumption: formData.get('fuelConsumption'),
            coverageType: formData.get('coverageType'),
            localAreas: localAreas,
            countries: countries,
            trackingOptions: formData.getAll('trackingOptions'),
            drivers: this.collectDriversData(),
            maintenance: this.collectMaintenanceData(),
            status: 'available',
            orders: 0,
            revenue: 0,
            rating: 0,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        // Save to state
        const shippingServices = State.get('shippingServices') || [];
        shippingServices.push(vehicleData);
        State.set('shippingServices', shippingServices);

        this.showSaveSuccessMessage();
    },

    collectDriversData: function() {
        const drivers = [];
        const driverItems = document.querySelectorAll('.shipping-driver-item');
        
        driverItems.forEach(item => {
            const driver = {
                name: item.querySelector('[name="driverName[]"]').value,
                license: item.querySelector('[name="driverLicense[]"]').value,
                licenseExpiry: item.querySelector('[name="driverLicenseExpiry[]"]').value,
                phone: item.querySelector('[name="driverPhone[]"]').value
            };
            if (driver.name && driver.license) {
                drivers.push(driver);
            }
        });
        
        return drivers;
    },

    collectMaintenanceData: function() {
        const maintenance = [];
        const maintenanceItems = document.querySelectorAll('.shipping-maintenance-item');
        
        maintenanceItems.forEach(item => {
            const maint = {
                type: item.querySelector('[name="maintenanceType[]"]').value,
                lastMaintenance: item.querySelector('[name="lastMaintenance[]"]').value,
                nextMaintenance: item.querySelector('[name="nextMaintenance[]"]').value
            };
            if (maint.type) {
                maintenance.push(maint);
            }
        });
        
        return maintenance;
    },

    showSaveSuccessMessage: function() {
        if (window.Toast) {
            Toast.show('تم الحفظ بنجاح', 'تم حفظ بيانات وسيلة الشحن بنجاح', 'success');
        }

        // Navigate back to shipping list
        setTimeout(() => {
            Router.navigate('myshipping');
        }, 1500);
    }
};

// Explicitly attach to global scope
window.ShippingFormController = ShippingFormController;