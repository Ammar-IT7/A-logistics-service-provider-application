/**
 * Customs Services Page Controller
 */
const CustomsController = {
    /**
     * Initialize the controller
     */
    init: function() {
        console.log('CustomsController initialized');
        this.loadData();
        this.setupEventListeners();
        this.updateDesignerNotes();
    },

    /**
     * Load page data
     */
    loadData: function() {
        // Simulate loading customs services data
        console.log('Loading customs services data...');
        
        // In a real app, this would fetch data from the server
        setTimeout(() => {
            this.updateProvidersList();
            this.updatePricingPlans();
        }, 500);
    },

    /**
     * Set up event listeners
     */
    setupEventListeners: function() {
        // Handle provider card clicks
        document.addEventListener('click', (e) => {
            if (e.target.closest('.cst-provider-card')) {
                const providerCard = e.target.closest('.cst-provider-card');
                this.handleProviderClick(providerCard);
            }
            
            if (e.target.closest('.cst-pricing-card')) {
                const pricingCard = e.target.closest('.cst-pricing-card');
                this.handlePricingClick(pricingCard);
            }
            
            if (e.target.closest('.cst-feature-card')) {
                const featureCard = e.target.closest('.cst-feature-card');
                this.handleFeatureClick(featureCard);
            }
        });

        // Handle form submissions
        document.addEventListener('submit', (e) => {
            if (e.target.id === 'customsForm') {
                e.preventDefault();
                this.handleFormSubmit(e.target);
            }
        });

        // Handle search functionality
        const searchInput = document.querySelector('.cst-search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.handleSearch(e.target.value);
            });
        }

        // Handle filter functionality
        const filterBtn = document.querySelector('.cst-filter-btn');
        if (filterBtn) {
            filterBtn.addEventListener('click', () => {
                this.handleFilter();
            });
        }
    },

    /**
     * Handle provider card click
     */
    handleProviderClick: function(providerCard) {
        const providerName = providerCard.querySelector('h4').textContent;
        const providerId = providerCard.dataset.provider;
        console.log('Provider clicked:', providerName, providerId);
        
        // Show provider details modal or navigate to provider page
        Toast.show('معلومات مكتب التخليص', `تم اختيار ${providerName}`, 'info');
        
        // In a real app, this would open a modal or navigate to provider details
        setTimeout(() => {
            Modal.open('provider-details', {
                provider: providerName,
                rating: '4.7',
                experience: '8 سنوات',
                clients: '120+',
                location: this.getProviderLocation(providerId),
                specialties: this.getProviderSpecialties(providerId),
                license: this.getProviderLicense(providerId),
                ports: this.getProviderPorts(providerId)
            });
        }, 1000);
    },

    /**
     * Handle pricing plan click
     */
    handlePricingClick: function(pricingCard) {
        const planName = pricingCard.querySelector('h4').textContent;
        const planPrice = pricingCard.querySelector('.cst-amount').textContent;
        
        console.log('Pricing plan clicked:', planName, planPrice);
        
        // Show pricing details or initiate subscription
        Toast.show('خطة الأسعار', `تم اختيار ${planName} بسعر ${planPrice} ريال`, 'success');
        
        // In a real app, this would open a subscription modal
        setTimeout(() => {
            Modal.open('subscription-modal', {
                plan: planName,
                price: planPrice,
                features: this.getPlanFeatures(planName)
            });
        }, 1000);
    },

    /**
     * Handle feature card click
     */
    handleFeatureClick: function(featureCard) {
        const featureName = featureCard.querySelector('h3').textContent;
        console.log('Feature clicked:', featureName);
        
        // Show feature details
        Toast.show('ميزة الخدمة', `تعرف على المزيد عن ${featureName}`, 'info');
    },

    /**
     * Handle search functionality
     */
    handleSearch: function(searchTerm) {
        console.log('Searching for:', searchTerm);
        
        const providerCards = document.querySelectorAll('.cst-provider-card');
        providerCards.forEach(card => {
            const providerName = card.querySelector('.cst-provider-name').textContent.toLowerCase();
            const description = card.querySelector('.cst-provider-description').textContent.toLowerCase();
            const searchLower = searchTerm.toLowerCase();
            
            if (providerName.includes(searchLower) || description.includes(searchLower)) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    },

    /**
     * Handle filter functionality
     */
    handleFilter: function() {
        console.log('Filter button clicked');
        
        // In a real app, this would open a filter modal
        Toast.show('تصفية النتائج', 'سيتم إضافة خيارات التصفية قريباً', 'info');
    },

    /**
     * Get provider location
     */
    getProviderLocation: function(providerId) {
        const locations = {
            'yemen-customs': 'مطار صنعاء الدولي',
            'hodeidah-customs': 'ميناء الحديدة',
            'aden-customs': 'ميناء عدن، منفذ المنظر',
            'mukalla-customs': 'ميناء المكلا، منفذ الشحر'
        };
        
        return locations[providerId] || 'غير محدد';
    },

    /**
     * Get provider specialties
     */
    getProviderSpecialties: function(providerId) {
        const specialties = {
            'yemen-customs': ['جوي', 'تخليص سريع', 'خدمة 24/7', 'متابعة مباشرة'],
            'hodeidah-customs': ['بحري', 'حاويات', 'بضائع عامة', 'تخليص شامل'],
            'aden-customs': ['بحري', 'بري', 'جوي', 'خدمة شاملة'],
            'mukalla-customs': ['بري', 'بحري', 'تخليص سريع', 'أسعار تنافسية']
        };
        
        return specialties[providerId] || [];
    },

    /**
     * Get provider license
     */
    getProviderLicense: function(providerId) {
        const licenses = {
            'yemen-customs': 'YC-5423-23',
            'hodeidah-customs': 'YC-3287-22',
            'aden-customs': 'YC-7845-23',
            'mukalla-customs': 'YC-9123-24'
        };
        
        return licenses[providerId] || 'غير محدد';
    },

    /**
     * Get provider ports
     */
    getProviderPorts: function(providerId) {
        const ports = {
            'yemen-customs': 'مطار صنعاء الدولي',
            'hodeidah-customs': 'ميناء الحديدة',
            'aden-customs': 'ميناء عدن، منفذ المنظر البري',
            'mukalla-customs': 'ميناء المكلا، منفذ الشحر'
        };
        
        return ports[providerId] || 'غير محدد';
    },

    /**
     * Get plan features
     */
    getPlanFeatures: function(planName) {
        const features = {
            'الخطة الأساسية': [
                'تخليص أساسي',
                'متابعة بسيطة',
                'دعم فني أساسي'
            ],
            'الخطة المتقدمة': [
                'تخليص متقدم',
                'متابعة مباشرة',
                'دعم فني 24/7',
                'خدمة VIP'
            ]
        };
        
        return features[planName] || [];
    },

    /**
     * Update providers list
     */
    updateProvidersList: function() {
        // In a real app, this would update the providers list with real data
        console.log('Customs services providers list updated');
    },

    /**
     * Update pricing plans
     */
    updatePricingPlans: function() {
        // In a real app, this would update pricing plans with real data
        console.log('Customs services pricing plans updated');
    },

    /**
     * Handle form submission
     */
    handleFormSubmit: function(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        console.log('Form submitted:', data);
        
        // Show loading state
        Loader.show();
        
        // Simulate form submission
        setTimeout(() => {
            Loader.hide();
            Toast.show('تم الإرسال', 'تم إرسال طلبك بنجاح', 'success');
            
            // Reset form
            form.reset();
            
            // Navigate back to service providers
            setTimeout(() => {
                Router.navigate('service-providers');
            }, 1500);
        }, 2000);
    },

    /**
     * Update designer notes
     */
    updateDesignerNotes: function() {
        const notes = `
            <h4>صفحة مكاتب التخليص الجمركي المحسنة</h4>
            <p>تم تحديث الصفحة لتشمل:</p>
            <ul>
                <li>استخدام بادئة 'cst-' لجميع فئات CSS لتجنب التعارض</li>
                <li>عرض الميزات الرئيسية للخدمة مع تصميم محسن</li>
                <li>قائمة مكاتب التخليص مع التقييمات والعلامات</li>
                <li>خطط الأسعار المختلفة مع تصميم جذاب</li>
                <li>إمكانية طلب عرض سعر وعرض التفاصيل</li>
                <li>تصميم متجاوب بالكامل</li>
            </ul>
            <p><strong>التحسينات التقنية:</strong></p>
            <ul>
                <li>فصل CSS في ملف مخصص لتسهيل الصيانة</li>
                <li>استخدام بادئات CSS لتجنب التعارض مع الصفحات الأخرى</li>
                <li>تحسين تجربة المستخدم مع تفاعلات سلسة</li>
                <li>دعم الاتجاه RTL</li>
                <li>تصميم Mobile-First</li>
            </ul>
            <p><strong>ملاحظات للمطور:</strong></p>
            <ul>
                <li>إضافة نظام تقييم تفاعلي</li>
                <li>ربط مع نظام الجمارك</li>
                <li>إضافة تتبع حالة التخليص</li>
                <li>إضافة نظام حجز المواعيد</li>
                <li>إضافة نظام إشعارات في الوقت الفعلي</li>
                <li>إضافة تقارير تحليلية متقدمة</li>
            </ul>
        `;
        
        const notesContent = document.getElementById('designer-notes-content');
        if (notesContent) {
            notesContent.innerHTML = notes;
        }
    },

    /**
     * Clean up when leaving the page
     */
    destroy: function() {
        console.log('CustomsController destroyed');
        // Clean up any event listeners or timers
    }
};

// Debug: Check if CustomsController is properly declared
console.log('CustomsController declared:', typeof CustomsController !== 'undefined');
console.log('CustomsController in window:', typeof window.CustomsController !== 'undefined');

// Explicitly attach to global scope
window.CustomsController = CustomsController;
console.log('CustomsController attached to window:', typeof window.CustomsController !== 'undefined'); 