/**
 * Customs Form page controller
 */
const CustomsFormController = {
    /**
     * Initialize the customs form page
     */
    init: function() {
        // Check if we're on the customs form page
        const form = document.getElementById('customsForm');
        if (!form) {
            return; // Not on the customs form page
        }
        
        console.log('Customs Form page initialized');
        this.formData = {};
        this.authorityCounter = 1;
        this.teamCounter = 1;
        this.setupEventListeners();
        this.loadExistingData();
    },
    
    /**
     * Load existing data if editing
     */
    loadExistingData: function() {
        const urlParams = new URLSearchParams(window.location.search);
        const customsId = urlParams.get('id');
        
        if (customsId) {
            const customsServices = State.get('customsServices');
            const customs = customsServices.find(c => c.id == customsId);
            
            if (customs) {
                this.formData = { ...customs };
                this.populateForm(customs);
                this.updateHeaderTitle('تعديل مكتب التخليص');
            }
        }
    },
    
    /**
     * Populate form with existing data
     */
    populateForm: function(customs) {
        // Basic info
        document.getElementById('officeName').value = customs.officeName || '';
        document.getElementById('licenseNumber').value = customs.licenseNumber || '';
        document.getElementById('licenseIssuer').value = customs.licenseIssuer || '';
        document.getElementById('licenseExpiry').value = customs.licenseExpiry || '';
        document.getElementById('experienceYears').value = customs.experienceYears || '';
        document.getElementById('officeAddress').value = customs.officeAddress || '';
        
        // Populate authorities if they exist
        if (customs.authorities && customs.authorities.length > 0) {
            this.clearAuthorities();
            customs.authorities.forEach(authority => {
                this.addAuthority(authority);
            });
        }
        
        // Populate team members if they exist
        if (customs.team && customs.team.length > 0) {
            this.clearTeamMembers();
            customs.team.forEach(member => {
                this.addTeamMember(member);
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
        const page = document.getElementById('customs-form');
        if (!page) return;
        
        // Form submission
        const form = document.getElementById('customsForm');
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
                console.log('Customs form - Navigating to step:', targetStep);
                this.navigateToStep(targetStep);
            }
        });
        
        // Save button in header
        const saveButton = page.querySelector('[data-action="save-customs"]');
        if (saveButton) {
            saveButton.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleFormSubmit();
            });
        }
        
        // Add authority button
        const addAuthorityBtn = page.querySelector('[data-action="add-authority"]');
        if (addAuthorityBtn) {
            addAuthorityBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.addAuthority();
            });
        }
        
        // Add team member button
        const addTeamBtn = page.querySelector('[data-action="add-team-member"]');
        if (addTeamBtn) {
            addTeamBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.addTeamMember();
            });
        }
        
        // Remove buttons (delegated event handling)
        page.addEventListener('click', (e) => {
            const removeBtn = e.target.closest('.cof-remove-btn');
            if (removeBtn) {
                e.preventDefault();
                const item = removeBtn.closest('.cof-authority-item, .cof-team-member');
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
        
        // Form validation on input (use centralized Forms utility)
        const requiredInputs = page.querySelectorAll('input[required], select[required], textarea[required]');
        requiredInputs.forEach(input => {
            input.addEventListener('blur', (e) => {
                if (window.Forms) window.Forms.validateField(e.target);
            });
        });
    },
    
    /**
     * Add new authority
     */
    addAuthority: function(data = null) {
        const container = document.querySelector('.cof-customs-authorities-container');
        if (!container) return;
        
        const authorityItem = document.createElement('div');
        authorityItem.className = 'cof-authority-item';
        authorityItem.innerHTML = `
            <div class="form-group">
                <label class="form-label">الدولة</label>
                <select class="form-control authority-country">
                    <option value="yemen" ${data?.country === 'yemen' ? 'selected' : ''}>اليمن</option>
                    <option value="saudi" ${data?.country === 'saudi' ? 'selected' : ''}>السعودية</option>
                    <option value="oman" ${data?.country === 'oman' ? 'selected' : ''}>عمان</option>
                    <option value="other" ${data?.country === 'other' ? 'selected' : ''}>أخرى</option>
                </select>
            </div>
            <div class="form-group">
                <label class="form-label">المحافظة</label>
                <select class="form-control authority-governorate">
                    <option value="">اختر المحافظة</option>
                    <option value="sanaa" ${data?.governorate === 'sanaa' ? 'selected' : ''}>صنعاء</option>
                    <option value="aden" ${data?.governorate === 'aden' ? 'selected' : ''}>عدن</option>
                    <option value="hodeidah" ${data?.governorate === 'hodeidah' ? 'selected' : ''}>الحديدة</option>
                    <option value="taiz" ${data?.governorate === 'taiz' ? 'selected' : ''}>تعز</option>
                    <option value="hadramout" ${data?.governorate === 'hadramout' ? 'selected' : ''}>حضرموت</option>
                    <option value="other" ${data?.governorate === 'other' ? 'selected' : ''}>أخرى</option>
                </select>
            </div>
            <div class="form-group">
                <label class="form-label">اسم المصلحة</label>
                <select class="form-control authority-name">
                    <option value="">اختر اسم المصلحة</option>
                    <option value="sanaa-airport" ${data?.name === 'sanaa-airport' ? 'selected' : ''}>مطار صنعاء الدولي</option>
                    <option value="aden-port" ${data?.name === 'aden-port' ? 'selected' : ''}>ميناء عدن</option>
                    <option value="hodeidah-port" ${data?.name === 'hodeidah-port' ? 'selected' : ''}>ميناء الحديدة</option>
                    <option value="shahen-border" ${data?.name === 'shahen-border' ? 'selected' : ''}>منفذ شحن الحدودي</option>
                    <option value="alwadiah-border" ${data?.name === 'alwadiah-border' ? 'selected' : ''}>منفذ الوديعة الحدودي</option>
                    <option value="other" ${data?.name === 'other' ? 'selected' : ''}>أخرى</option>
                </select>
            </div>
            <div class="form-group">
                <label class="form-label">الموقع</label>
                <input type="text" class="form-control authority-location" placeholder="أدخل الموقع التفصيلي" value="${data?.location || ''}">
            </div>
            <button type="button" class="btn btn-icon cof-remove-btn">×</button>
        `;
        
        container.appendChild(authorityItem);
        this.authorityCounter++;
    },
    
    /**
     * Add new team member
     */
    addTeamMember: function(data = null) {
        const container = document.querySelector('.cof-team-container');
        if (!container) return;
        
        const memberItem = document.createElement('div');
        memberItem.className = 'cof-team-member';
        memberItem.innerHTML = `
            <div class="cof-member-header">
                <span class="cof-member-number">عضو ${this.teamCounter}</span>
                <button type="button" class="btn btn-icon cof-remove-btn">×</button>
            </div>
            <div class="form-group">
                <label class="form-label">الاسم</label>
                <input type="text" class="form-control member-name" placeholder="أدخل اسم الموظف" value="${data?.name || ''}">
            </div>
            <div class="form-group">
                <label class="form-label">المسمى الوظيفي</label>
                <select class="form-control member-role">
                    <option value="">اختر المسمى الوظيفي</option>
                    <option value="customs-broker" ${data?.role === 'customs-broker' ? 'selected' : ''}>مخلص جمركي</option>
                    <option value="representative" ${data?.role === 'representative' ? 'selected' : ''}>مندوب</option>
                    <option value="manager" ${data?.role === 'manager' ? 'selected' : ''}>مدير</option>
                </select>
            </div>
            <div class="form-group">
                <label class="form-label">رقم التواصل</label>
                <input type="tel" class="form-control member-phone" placeholder="أدخل رقم الجوال" value="${data?.phone || ''}">
            </div>
        `;
        
        container.appendChild(memberItem);
        this.teamCounter++;
    },
    
    /**
     * Clear all authorities
     */
    clearAuthorities: function() {
        const container = document.querySelector('.cof-customs-authorities-container');
        if (container) {
            container.innerHTML = '';
        }
    },
    
    /**
     * Clear all team members
     */
    clearTeamMembers: function() {
        const container = document.querySelector('.cof-team-container');
        if (container) {
            container.innerHTML = '';
        }
    },
    
    /**
     * Handle file upload
     */
    handleFileUpload: function(event) {
        const file = event.target.files[0];
        const fileNameSpan = event.target.parentNode.querySelector('.cof-file-name');
        
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
        // Collect authorities
        const authorities = [];
        const authorityItems = document.querySelectorAll('.cof-authority-item');
        authorityItems.forEach(item => {
            const authority = {
                country: item.querySelector('.authority-country').value,
                governorate: item.querySelector('.authority-governorate').value,
                name: item.querySelector('.authority-name').value,
                location: item.querySelector('.authority-location').value
            };
            if (authority.country && authority.governorate && authority.name) {
                authorities.push(authority);
            }
        });
        
        // Collect team members
        const team = [];
        const teamItems = document.querySelectorAll('.cof-team-member');
        teamItems.forEach(item => {
            const member = {
                name: item.querySelector('.member-name').value,
                role: item.querySelector('.member-role').value,
                phone: item.querySelector('.member-phone').value
            };
            if (member.name && member.role && member.phone) {
                team.push(member);
            }
        });
        
        const formData = {
            // Basic info
            officeName: document.getElementById('officeName').value,
            licenseNumber: document.getElementById('licenseNumber').value,
            licenseIssuer: document.getElementById('licenseIssuer').value,
            licenseExpiry: document.getElementById('licenseExpiry').value,
            experienceYears: parseInt(document.getElementById('experienceYears').value) || 0,
            officeAddress: document.getElementById('officeAddress').value,
            
            // Collections
            authorities: authorities,
            team: team,
            
            // Timestamps
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        
        return formData;
    },
    
    /**
     * Handle form submission (validate all fields and dynamic sections using centralized Forms utility)
     */
    handleFormSubmit: function() {
        const form = document.getElementById('customsForm');
        if (!form) return;
        let isValid = true;
        if (window.Forms) {
            isValid = window.Forms.validateForm(form);
        }
        // Validate authorities
        const authorities = document.querySelectorAll('.cof-authority-item');
        if (authorities.length === 0) {
            if (window.Toast) Toast.show('خطأ في التحقق', 'يجب إضافة جهة جمركية واحدة على الأقل', 'error');
            isValid = false;
        }
        // Validate team members
        const teamMembers = document.querySelectorAll('.cof-team-member');
        if (teamMembers.length === 0) {
            if (window.Toast) Toast.show('خطأ في التحقق', 'يجب إضافة عضو فريق واحد على الأقل', 'error');
            isValid = false;
        }
        if (!isValid) {
            return;
        }
        // Collect form data
        const formData = this.collectFormData();
        // Check if editing or creating new
        const urlParams = new URLSearchParams(window.location.search);
        const customsId = urlParams.get('id');
        if (customsId) {
            // Update existing customs service
            this.updateCustomsService(customsId, formData);
        } else {
            // Create new customs service
            this.createCustomsService(formData);
        }
    },
    
    /**
     * Create new customs service
     */
    createCustomsService: function(formData) {
        const customsServices = State.get('customsServices');
        const newCustomsService = {
            id: Date.now(),
            type: 'تخليص جمركي',
            port: formData.authorities[0]?.name || 'غير محدد',
            cargoType: 'عام',
            date: new Date().toLocaleDateString('ar-SA'),
            containers: Math.floor(Math.random() * 10) + 1,
            value: Math.floor(Math.random() * 100000) + 10000,
            progress: Math.floor(Math.random() * 100),
            status: 'pending',
            ...formData
        };
        
        customsServices.push(newCustomsService);
        State.update('customsServices', customsServices);
        
        Toast.show('تم الحفظ', 'تم إضافة مكتب التخليص بنجاح', 'success');
        
        // Navigate back to customs list
        setTimeout(() => {
            Router.navigate('mycustoms');
        }, 1500);
    },
    
    /**
     * Update existing customs service
     */
    updateCustomsService: function(customsId, formData) {
        const customsServices = State.get('customsServices');
        const customsIndex = customsServices.findIndex(c => c.id == customsId);
        
        if (customsIndex !== -1) {
            const updatedCustomsService = {
                ...customsServices[customsIndex],
                ...formData,
                type: 'تخليص جمركي',
                port: formData.authorities[0]?.name || 'غير محدد',
                updatedAt: new Date().toISOString()
            };
            
            customsServices[customsIndex] = updatedCustomsService;
            State.update('customsServices', customsServices);
            
            Toast.show('تم التحديث', 'تم تحديث مكتب التخليص بنجاح', 'success');
            
            // Navigate back to customs list
            setTimeout(() => {
                Router.navigate('mycustoms');
            }, 1500);
        }
    },
    
    /**
     * Navigate to specific step
     */
    navigateToStep: function(step) {
        console.log('Customs form - Current step:', this.currentStep, 'Target step:', step);
        
        // Validate current step before moving forward
        if (this.shouldValidateStep(step) && !this.validateCurrentStep()) {
            console.log('Customs form - Validation failed, staying on current step');
            return;
        }
        
        // Update progress indicator
        const progressSteps = document.querySelectorAll('.cof-progress-step');
        progressSteps.forEach(stepEl => {
            stepEl.classList.remove('active', 'completed');
        });
        
        // Mark completed steps
        const stepOrder = ['basic', 'authorities', 'team', 'documents'];
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
        const slides = document.querySelectorAll('.cof-form-slide');
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        const targetSlide = document.querySelector(`[data-slide="${step}"]`);
        if (targetSlide) {
            targetSlide.classList.add('active');
            console.log('Customs form - Activated slide:', step);
        } else {
            console.error('Customs form - Target slide not found:', step);
        }
        
        this.currentStep = step;
        
        // Scroll to top of form for better UX
        const form = document.getElementById('customsForm');
        if (form) {
            form.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    },
    
    /**
     * Check if step should be validated before navigation
     */
    shouldValidateStep: function(targetStep) {
        const stepOrder = ['basic', 'authorities', 'team', 'documents'];
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
        return isValid;
    }
};

// Explicitly attach to global scope
window.CustomsFormController = CustomsFormController; 