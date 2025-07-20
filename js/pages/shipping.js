/**
 * Shipping Page Controller
 */
const ShippingController = {
    /**
     * Initialize the controller
     */
    init: function() {
        console.log('ShippingController initialized');
        this.loadData();
        this.setupEventListeners();
        this.updateDesignerNotes();
    },

    /**
     * Load page data
     */
    loadData: function() {
        // Simulate loading shipping data
        console.log('Loading shipping data...');
        
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
            if (e.target.closest('.shp-provider-card')) {
                const providerCard = e.target.closest('.shp-provider-card');
                this.handleProviderClick(providerCard);
            }
            
            if (e.target.closest('.shp-pricing-card')) {
                const pricingCard = e.target.closest('.shp-pricing-card');
                this.handlePricingClick(pricingCard);
            }
            
            if (e.target.closest('.shp-feature-card')) {
                const featureCard = e.target.closest('.shp-feature-card');
                this.handleFeatureClick(featureCard);
            }
        });

        // Handle form submissions
        document.addEventListener('submit', (e) => {
            if (e.target.id === 'shippingForm') {
                e.preventDefault();
                this.handleFormSubmit(e.target);
            }
        });

        // Handle search functionality
        const searchInput = document.querySelector('.shp-search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.handleSearch(e.target.value);
            });
        }

        // Handle filter functionality
        const filterBtn = document.querySelector('.shp-filter-btn');
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
        Toast.show('معلومات شركة الشحن', `تم اختيار ${providerName}`, 'info');
        
        // In a real app, this would open a modal or navigate to provider details
        setTimeout(() => {
            Modal.open('provider-details', {
                provider: providerName,
                rating: '4.8',
                experience: '5 سنوات',
                clients: '150+',
                location: this.getProviderLocation(providerId),
                specialties: this.getProviderSpecialties(providerId),
                serviceType: this.getProviderServiceType(providerId),
                coverage: this.getProviderCoverage(providerId)
            });
        }, 1000);
    },

    /**
     * Handle pricing plan click
     */
    handlePricingClick: function(pricingCard) {
        const planName = pricingCard.querySelector('h4').textContent;
        const planPrice = pricingCard.querySelector('.shp-amount').textContent;
        
        console.log('Pricing plan clicked:', planName, planPrice);
        
        // Show pricing details or initiate subscription
        Toast.show('خطة الأسعار', `تم اختيار ${planName} بسعر ${planPrice}`, 'success');
        
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
        Toast.show('ميزة الشحن', `تعرف على المزيد عن ${featureName}`, 'info');
    },

    /**
     * Handle search functionality
     */
    handleSearch: function(searchTerm) {
        console.log('Searching for:', searchTerm);
        
        const providerCards = document.querySelectorAll('.shp-provider-card');
        providerCards.forEach(card => {
            const providerName = card.querySelector('.shp-provider-name').textContent.toLowerCase();
            const description = card.querySelector('.shp-provider-description').textContent.toLowerCase();
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
            'yemen-air-shipping': 'صنعاء، عدن',
            'hodeidah-sea-shipping': 'ميناء الحديدة',
            'mukalla-land-shipping': 'جميع محافظات اليمن',
            'sanaa-transport': 'صنعاء، تعز، الحديدة، إب'
        };
        
        return locations[providerId] || 'غير محدد';
    },

    /**
     * Get provider specialties
     */
    getProviderSpecialties: function(providerId) {
        const specialties = {
            'yemen-air-shipping': ['جوي', 'سريع', 'تتبع مباشر', '24/7'],
            'hodeidah-sea-shipping': ['بحري', 'حاويات', 'GPS تتبع', 'اقتصادي'],
            'mukalla-land-shipping': ['بري', 'مبردة', 'GPS', 'محلي ودولي'],
            'sanaa-transport': ['ثقيلة', 'مبردة', 'مؤمنة', 'سائقين مرخصين']
        };
        
        return specialties[providerId] || [];
    },

    /**
     * Get provider service type
     */
    getProviderServiceType: function(providerId) {
        const serviceTypes = {
            'yemen-air-shipping': 'شحن جوي',
            'hodeidah-sea-shipping': 'شحن بحري',
            'mukalla-land-shipping': 'شحن بري',
            'sanaa-transport': 'نقل بري'
        };
        
        return serviceTypes[providerId] || 'غير محدد';
    },

    /**
     * Get provider coverage
     */
    getProviderCoverage: function(providerId) {
        const coverages = {
            'yemen-air-shipping': 'محلي ودولي',
            'hodeidah-sea-shipping': 'دولي',
            'mukalla-land-shipping': 'محلي ودولي',
            'sanaa-transport': 'محلي'
        };
        
        return coverages[providerId] || 'غير محدد';
    },

    /**
     * Get plan features
     */
    getPlanFeatures: function(planName) {
        const features = {
            'الخطة الأساسية': [
                'شحن أساسي',
                'تتبع بسيط',
                'دعم فني أساسي'
            ],
            'الخطة المتقدمة': [
                'شحن سريع',
                'تتبع مباشر',
                'دعم فني 24/7',
                'تأمين شامل'
            ]
        };
        
        return features[planName] || [];
    },

    /**
     * Update providers list
     */
    updateProvidersList: function() {
        // In a real app, this would update the providers list with real data
        console.log('Shipping providers list updated');
    },

    /**
     * Update pricing plans
     */
    updatePricingPlans: function() {
        // In a real app, this would update pricing plans with real data
        console.log('Shipping pricing plans updated');
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
            <h4>صفحة خدمات الشحن والنقل المحسنة</h4>
            <p>تم تحديث الصفحة لتشمل:</p>
            <ul>
                <li>استخدام بادئة 'shp-' لجميع فئات CSS لتجنب التعارض</li>
                <li>عرض الميزات الرئيسية لخدمات الشحن مع تصميم محسن</li>
                <li>قائمة شركات الشحن مع التقييمات والعلامات</li>
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
                <li>ربط مع نظام تتبع الشحنات</li>
                <li>إضافة خريطة تفاعلية لمسارات الشحن</li>
                <li>إضافة نظام حجز الشحنات</li>
                <li>إضافة نظام مراقبة الشحنات في الوقت الفعلي</li>
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
        console.log('ShippingController destroyed');
        // Clean up any event listeners or timers
    }
};

// Debug: Check if ShippingController is properly declared
console.log('ShippingController declared:', typeof ShippingController !== 'undefined');
console.log('ShippingController in window:', typeof window.ShippingController !== 'undefined');

// Explicitly attach to global scope
window.ShippingController = ShippingController;
console.log('ShippingController attached to window:', typeof window.ShippingController !== 'undefined');