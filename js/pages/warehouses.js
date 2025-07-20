/**
 * Warehouses Page Controller
 */
const WarehousesController = {
    /**
     * Initialize the controller
     */
    init: function() {
        console.log('WarehousesController initialized');
        this.loadData();
        this.setupEventListeners();
        this.updateDesignerNotes();
    },

    /**
     * Load page data
     */
    loadData: function() {
        // Simulate loading warehouses data
        console.log('Loading warehouses data...');
        
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
            if (e.target.closest('.wh-provider-card')) {
                const providerCard = e.target.closest('.wh-provider-card');
                this.handleProviderClick(providerCard);
            }
            
            if (e.target.closest('.wh-pricing-card')) {
                const pricingCard = e.target.closest('.wh-pricing-card');
                this.handlePricingClick(pricingCard);
            }
            
            if (e.target.closest('.wh-feature-card')) {
                const featureCard = e.target.closest('.wh-feature-card');
                this.handleFeatureClick(featureCard);
            }
        });

        // Handle form submissions
        document.addEventListener('submit', (e) => {
            if (e.target.id === 'warehouseForm') {
                e.preventDefault();
                this.handleFormSubmit(e.target);
            }
        });

        // Handle search functionality
        const searchInput = document.querySelector('.wh-search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.handleSearch(e.target.value);
            });
        }

        // Handle filter functionality
        const filterBtn = document.querySelector('.wh-filter-btn');
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
        Toast.show('معلومات المستودع', `تم اختيار ${providerName}`, 'info');
        
        // In a real app, this would open a modal or navigate to provider details
        setTimeout(() => {
            Modal.open('provider-details', {
                provider: providerName,
                rating: '4.8',
                experience: '5 سنوات',
                clients: '150+',
                location: this.getProviderLocation(providerId),
                specialties: this.getProviderSpecialties(providerId),
                area: this.getProviderArea(providerId),
                occupancy: this.getProviderOccupancy(providerId)
            });
        }, 1000);
    },

    /**
     * Handle pricing plan click
     */
    handlePricingClick: function(pricingCard) {
        const planName = pricingCard.querySelector('h4').textContent;
        const planPrice = pricingCard.querySelector('.wh-amount').textContent;
        
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
        Toast.show('ميزة المستودع', `تعرف على المزيد عن ${featureName}`, 'info');
    },

    /**
     * Handle search functionality
     */
    handleSearch: function(searchTerm) {
        console.log('Searching for:', searchTerm);
        
        const providerCards = document.querySelectorAll('.wh-provider-card');
        providerCards.forEach(card => {
            const providerName = card.querySelector('.wh-provider-name').textContent.toLowerCase();
            const description = card.querySelector('.wh-provider-description').textContent.toLowerCase();
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
            'sanaa-central': 'صنعاء، الحي التجاري',
            'aden-refrigerated': 'عدن، المنطقة الصناعية',
            'hodeidah-medical': 'الحديدة، حي الميناء',
            'taiz-industrial': 'تعز، المنطقة الصناعية'
        };
        
        return locations[providerId] || 'غير محدد';
    },

    /**
     * Get provider specialties
     */
    getProviderSpecialties: function(providerId) {
        const specialties = {
            'sanaa-central': ['عادي', 'مركزي', 'أمن عالي', '24/7'],
            'aden-refrigerated': ['مبرد', 'مواد غذائية', 'تحكم حراري', 'مراقبة مستمرة'],
            'hodeidah-medical': ['طبي', 'أدوية', 'معدات طبية', 'معايير صحية'],
            'taiz-industrial': ['صناعي', 'مواد خام', 'رافعات', 'سكك حديدية']
        };
        
        return specialties[providerId] || [];
    },

    /**
     * Get provider area
     */
    getProviderArea: function(providerId) {
        const areas = {
            'sanaa-central': '1,500 م²',
            'aden-refrigerated': '800 م²',
            'hodeidah-medical': '600 م²',
            'taiz-industrial': '2,500 م²'
        };
        
        return areas[providerId] || 'غير محدد';
    },

    /**
     * Get provider occupancy
     */
    getProviderOccupancy: function(providerId) {
        const occupancies = {
            'sanaa-central': '35%',
            'aden-refrigerated': '90%',
            'hodeidah-medical': '20%',
            'taiz-industrial': '75%'
        };
        
        return occupancies[providerId] || 'غير محدد';
    },

    /**
     * Get plan features
     */
    getPlanFeatures: function(planName) {
        const features = {
            'الخطة الأساسية': [
                'تخزين أساسي',
                'أمن قياسي',
                'دعم فني أساسي'
            ],
            'الخطة المتقدمة': [
                'تخزين متقدم',
                'أمن عالي',
                'دعم فني 24/7',
                'مراقبة CCTV'
            ]
        };
        
        return features[planName] || [];
    },

    /**
     * Update providers list
     */
    updateProvidersList: function() {
        // In a real app, this would update the providers list with real data
        console.log('Warehouses providers list updated');
    },

    /**
     * Update pricing plans
     */
    updatePricingPlans: function() {
        // In a real app, this would update pricing plans with real data
        console.log('Warehouses pricing plans updated');
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
            <h4>صفحة المستودعات المحسنة</h4>
            <p>تم تحديث الصفحة لتشمل:</p>
            <ul>
                <li>استخدام بادئة 'wh-' لجميع فئات CSS لتجنب التعارض</li>
                <li>عرض الميزات الرئيسية للمستودعات مع تصميم محسن</li>
                <li>قائمة المستودعات مع التقييمات والعلامات</li>
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
                <li>ربط مع نظام إدارة المخزون</li>
                <li>إضافة خريطة تفاعلية لمواقع المستودعات</li>
                <li>إضافة نظام حجز المساحات</li>
                <li>إضافة نظام مراقبة المستودعات في الوقت الفعلي</li>
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
        console.log('WarehousesController destroyed');
        // Clean up any event listeners or timers
    }
};

// Debug: Check if WarehousesController is properly declared
console.log('WarehousesController declared:', typeof WarehousesController !== 'undefined');
console.log('WarehousesController in window:', typeof window.WarehousesController !== 'undefined');

// Explicitly attach to global scope
window.WarehousesController = WarehousesController;
console.log('WarehousesController attached to window:', typeof window.WarehousesController !== 'undefined'); 