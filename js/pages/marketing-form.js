/**
 * Marketing Form Controller
 * Handles form navigation, validation, and dynamic content
 */

const MarketingFormController = {
    init: function() {
        // Check if we're on the marketing form page
        const form = document.getElementById('marketingForm');
        if (!form) {
            return; // Not on the marketing form page
        }
        
        console.log('Marketing Form initialized');

        this.form = form;
        this.slides = document.querySelectorAll('.mkt-form-slide');
        this.progressSteps = document.querySelectorAll('.mkt-form-progress-step');
        this.currentStep = 1;
        this.totalSteps = 4;

        this.setupFormNavigation();
        this.setupConditionalFields();
        this.setupFileUploads();
        this.setupChipsInputs();
        this.setupDynamicFields();
        this.setupFormSubmission();

        // Save button handler
        const saveBtn = document.querySelector('[data-action="save-marketing"]');
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
            console.log('Marketing Form navigation setup complete');
        }

        // Setup step navigation
        const nextBtn = document.getElementById('nextStep');
        const prevBtn = document.getElementById('prevStep');
        const submitBtn = document.getElementById('submitForm');

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                if (this.validateCurrentStep()) {
                    this.nextStep();
                }
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                this.prevStep();
            });
        }

        if (submitBtn) {
            submitBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.form.dispatchEvent(new Event('submit'));
            });
        }
    },

    setupConditionalFields: function() {
        const marketingServiceTypeSelect = document.getElementById('marketingServiceType');
        const pricingTypeSelect = document.getElementById('pricingType');
        const self = this;

        if (marketingServiceTypeSelect) {
            marketingServiceTypeSelect.addEventListener('change', () => {
                self.updateServiceSpecificFields();
            });
        }

        if (pricingTypeSelect) {
            pricingTypeSelect.addEventListener('change', () => {
                self.updatePricingFields();
            });
        }

        self.updateServiceSpecificFields();
        self.updatePricingFields();
    },

    updateServiceSpecificFields: function() {
        const serviceType = document.getElementById('marketingServiceType')?.value;
        
        // Update features based on service type
        const featuresContainer = document.getElementById('marketingFeaturesChips');
        if (featuresContainer) {
            featuresContainer.innerHTML = '';
            
            const defaultFeatures = this.getDefaultFeatures(serviceType);
            defaultFeatures.forEach(feature => {
                this.addChip(feature, featuresContainer);
            });
        }
    },

    updatePricingFields: function() {
        const pricingType = document.getElementById('pricingType')?.value;
        const basePriceInput = document.querySelector('[name="basePrice"]');
        
        if (basePriceInput) {
            switch(pricingType) {
                case 'hourly':
                    basePriceInput.placeholder = 'السعر بالساعة';
                    break;
                case 'monthly':
                    basePriceInput.placeholder = 'السعر الشهري';
                    break;
                case 'project':
                    basePriceInput.placeholder = 'سعر المشروع';
                    break;
                case 'performance':
                    basePriceInput.placeholder = 'سعر الأداء';
                    break;
                default:
                    basePriceInput.placeholder = 'السعر';
            }
        }
    },

    setupFileUploads: function() {
        const fileInputs = document.querySelectorAll('input[type="file"]');

        fileInputs.forEach(fileInput => {
            const container = fileInput.closest('.mkt-form-file-upload-container');
            if (!container) return;

            const uploadBtn = container.querySelector('.mkt-form-file-upload-btn');
            const fileNameSpan = container.querySelector('.mkt-form-file-name');

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
        this.setupChipInput('featureInput', 'marketingFeaturesChips', 'addFeature');
        this.setupChipInput('coverageInput', 'marketingCoverageChips', 'addCoverage');
        this.setupChipInput('sectorInput', 'marketingSectorsChips', 'addSector');
    },

    setupChipInput: function(inputId, containerId, buttonId) {
        const input = document.getElementById(inputId);
        const container = document.getElementById(containerId);
        const button = document.getElementById(buttonId);

        if (!input || !container) return;

        const addChipHandler = () => {
            if (input.value.trim()) {
                this.addChip(input.value.trim(), container);
                input.value = '';
            }
        };

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                addChipHandler();
            }
        });

        if (button) {
            button.addEventListener('click', addChipHandler);
        }

        // Initial demo chips for coverage and sectors
        if (containerId === 'marketingCoverageChips') {
            this.addChip('الرياض', container);
            this.addChip('جدة', container);
            this.addChip('الدمام', container);
        } else if (containerId === 'marketingSectorsChips') {
            this.addChip('التجارة الإلكترونية', container);
            this.addChip('الخدمات', container);
            this.addChip('التصنيع', container);
        }
    },

    addChip: function(text, container) {
        const chip = document.createElement('div');
        chip.className = 'mkt-form-chip';
        chip.innerHTML = `
            <span class="mkt-form-chip-close">×</span>
            <span class="mkt-form-chip-text">${text}</span>
        `;

        chip.querySelector('.mkt-form-chip-close').addEventListener('click', () => {
            chip.remove();
        });

        container.appendChild(chip);
    },

    setupDynamicFields: function() {
        const addResultBtn = document.getElementById('addResult');
        const addPortfolioLinkBtn = document.getElementById('addPortfolioLink');
        const self = this;

        if (addResultBtn) {
            addResultBtn.addEventListener('click', () => {
                const resultsContainer = document.querySelector('.mkt-form-results-container');
                const newResult = self.createResultItem();
                resultsContainer.appendChild(newResult);
            });
        }

        if (addPortfolioLinkBtn) {
            addPortfolioLinkBtn.addEventListener('click', () => {
                const linksContainer = document.querySelector('.mkt-form-links-container');
                const newLink = self.createPortfolioLinkItem();
                linksContainer.appendChild(newLink);
            });
        }
    },

    createResultItem: function() {
        const resultItem = document.createElement('div');
        resultItem.className = 'mkt-form-result-item';
        resultItem.innerHTML = `
            <input type="text" name="expectedResults[]" class="mkt-form-control" placeholder="نتيجة متوقعة">
            <input type="text" name="resultMetrics[]" class="mkt-form-control" placeholder="مقياس النتيجة">
            <button type="button" class="btn btn-icon mkt-form-remove-result" aria-label="إزالة">×</button>
        `;

        resultItem.querySelector('.mkt-form-remove-result').addEventListener('click', () => {
            resultItem.remove();
        });

        return resultItem;
    },

    createPortfolioLinkItem: function() {
        const linkItem = document.createElement('div');
        linkItem.className = 'mkt-form-link-input';
        linkItem.innerHTML = `
            <input type="url" name="portfolioLinks[]" class="mkt-form-control" placeholder="أدخل رابط معرض الأعمال">
            <button type="button" class="btn btn-icon mkt-form-remove-link" aria-label="إزالة">×</button>
        `;

        linkItem.querySelector('.mkt-form-remove-link').addEventListener('click', () => {
            linkItem.remove();
        });

        return linkItem;
    },

    getDefaultFeatures: function(serviceType) {
        const features = {
            'seo': ['تحليل الكلمات المفتاحية', 'تحسين المحتوى', 'بناء الروابط', 'تحليل المنافسين'],
            'google-ads': ['إعلانات بحث', 'إعلانات عرض', 'تحسين الحملات', 'تحليل الأداء'],
            'social-media': ['إدارة الحسابات', 'إنشاء محتوى', 'تفاعل العملاء', 'تحليل النتائج'],
            'email-marketing': ['قوائم البريد', 'تصميم الرسائل', 'تحليل النتائج', 'أتمتة الحملات'],
            'content-marketing': ['كتابة المحتوى', 'تصميم الرسوم', 'الفيديو', 'الإنفوجرافيك'],
            'data-analytics': ['تحليل الأداء', 'تقارير شهرية', 'توصيات التحسين', 'متابعة النتائج'],
            'branding': ['تصميم الشعار', 'الهوية البصرية', 'الألوان والخطوط', 'دليل العلامة التجارية'],
            'web-design': ['تصميم الموقع', 'تطوير الواجهات', 'تجربة المستخدم', 'الاستجابة'],
            'video-marketing': ['إنتاج الفيديو', 'تحرير المحتوى', 'النشر والتوزيع', 'تحليل الأداء'],
            'influencer-marketing': ['اختيار المؤثرين', 'إدارة الحملات', 'متابعة النتائج', 'تحليل ROI']
        };
        
        return features[serviceType] || [];
    },

    nextStep: function() {
        if (this.currentStep < this.totalSteps) {
            this.slides[this.currentStep - 1].classList.remove('active');
            this.progressSteps[this.currentStep - 1].classList.remove('active');
            
            this.currentStep++;
            
            this.slides[this.currentStep - 1].classList.add('active');
            this.progressSteps[this.currentStep - 1].classList.add('active');
            
            this.updateNavigationButtons();
        }
    },

    prevStep: function() {
        if (this.currentStep > 1) {
            this.slides[this.currentStep - 1].classList.remove('active');
            this.progressSteps[this.currentStep - 1].classList.remove('active');
            
            this.currentStep--;
            
            this.slides[this.currentStep - 1].classList.add('active');
            this.progressSteps[this.currentStep - 1].classList.add('active');
            
            this.updateNavigationButtons();
        }
    },

    updateNavigationButtons: function() {
        const prevBtn = document.getElementById('prevStep');
        const nextBtn = document.getElementById('nextStep');
        const submitBtn = document.getElementById('submitForm');

        if (prevBtn) {
            prevBtn.style.display = this.currentStep > 1 ? 'inline-block' : 'none';
        }

        if (nextBtn) {
            nextBtn.style.display = this.currentStep < this.totalSteps ? 'inline-block' : 'none';
        }

        if (submitBtn) {
            submitBtn.style.display = this.currentStep === this.totalSteps ? 'inline-block' : 'none';
        }
    },

    validateCurrentStep: function() {
        const currentSlide = this.slides[this.currentStep - 1];
        const requiredFields = currentSlide.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                field.classList.add('error');
                isValid = false;
            } else {
                field.classList.remove('error');
            }
        });

        if (!isValid) {
            if (window.Toast) {
                Toast.show('خطأ', 'يرجى ملء جميع الحقول المطلوبة', 'error');
            }
        }

        return isValid;
    },

    setupFormSubmission: function() {
        const self = this;

        this.form.addEventListener('submit', (e) => {
            e.preventDefault();

            // Use the centralized validation
            if (window.Forms && !window.Forms.validateForm(this.form)) {
                return;
            }

            self.saveMarketingData();
        });
    },

    saveMarketingData: function() {
        const formData = new FormData(this.form);

        // Add chips data
        const features = Array.from(document.querySelectorAll('#marketingFeaturesChips .mkt-form-chip-text')).map(chip => chip.textContent);
        const coverage = Array.from(document.querySelectorAll('#marketingCoverageChips .mkt-form-chip-text')).map(chip => chip.textContent);
        const sectors = Array.from(document.querySelectorAll('#marketingSectorsChips .mkt-form-chip-text')).map(chip => chip.textContent);

        // Collect form data
        const marketingData = {
            id: Date.now(),
            serviceName: formData.get('marketingServiceName'),
            serviceType: formData.get('marketingServiceType'),
            description: formData.get('marketingServiceDescription'),
            status: formData.get('marketingServiceStatus'),
            features: features,
            clientRequirements: formData.get('clientRequirements'),
            executionDuration: formData.get('executionDuration'),
            executionUnit: formData.get('executionUnit'),
            expectedResults: formData.getAll('expectedResults'),
            resultMetrics: formData.getAll('resultMetrics'),
            toolsAndTechnologies: formData.get('toolsAndTechnologies'),
            pricingType: formData.get('pricingType'),
            basePrice: formData.get('basePrice'),
            currency: formData.get('currency'),
            coverage: coverage,
            sectors: sectors,
            targetCompanySize: formData.getAll('targetCompanySize'),
            portfolioLinks: formData.getAll('portfolioLinks'),
            additionalNotes: formData.get('additionalNotes'),
            status: 'active',
            orders: 0,
            revenue: 0,
            rating: 0,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        // Save to state
        const marketingServices = State.get('marketingServices') || [];
        marketingServices.push(marketingData);
        State.update('marketingServices', marketingServices);

        this.showSaveSuccessMessage();
    },

    showSaveSuccessMessage: function() {
        if (window.Toast) {
            Toast.show('تم الحفظ بنجاح', 'تم حفظ خدمة التسويق بنجاح', 'success');
        }

        // Navigate back to marketing list
        setTimeout(() => {
            Router.navigate('marketing');
        }, 1500);
    }
};

// Explicitly attach to global scope
window.MarketingFormController = MarketingFormController; 