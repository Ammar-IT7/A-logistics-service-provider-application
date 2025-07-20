/**
 * LC Services Page Controller
 */
const LCServicesController = {
    /**
     * Initialize the controller
     */
    init: function() {
        console.log('LCServicesController initialized');
        this.loadData();
        this.setupEventListeners();
        this.updateDesignerNotes();
    },

    /**
     * Load page data
     */
    loadData: function() {
        // Simulate loading LC services data
        console.log('Loading LC services data...');
        
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
            if (e.target.closest('.lcs-provider-card')) {
                const providerCard = e.target.closest('.lcs-provider-card');
                this.handleProviderClick(providerCard);
            }
            
            if (e.target.closest('.lcs-pricing-card')) {
                const pricingCard = e.target.closest('.lcs-pricing-card');
                this.handlePricingClick(pricingCard);
            }
            
            if (e.target.closest('.lcs-feature-card')) {
                const featureCard = e.target.closest('.lcs-feature-card');
                this.handleFeatureClick(featureCard);
            }
        });

        // Handle form submissions
        document.addEventListener('submit', (e) => {
            if (e.target.id === 'lcServicesForm') {
                e.preventDefault();
                this.handleFormSubmit(e.target);
            }
        });

        // Handle search functionality
        const searchInput = document.querySelector('.lcs-search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.handleSearch(e.target.value);
            });
        }

        // Handle filter functionality
        const filterBtn = document.querySelector('.lcs-filter-btn');
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
        Toast.show('معلومات المكتب التجاري', `تم اختيار ${providerName}`, 'info');
        
        // In a real app, this would open a modal or navigate to provider details
        setTimeout(() => {
            Modal.open('provider-details', {
                provider: providerName,
                rating: '4.8',
                experience: '8 سنوات',
                clients: '200+',
                location: this.getProviderLocation(providerId),
                specialties: this.getProviderSpecialties(providerId)
            });
        }, 1000);
    },

    /**
     * Handle pricing plan click
     */
    handlePricingClick: function(pricingCard) {
        const planName = pricingCard.querySelector('h4').textContent;
        const planPrice = pricingCard.querySelector('.lcs-amount').textContent;
        
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
        
        const providerCards = document.querySelectorAll('.lcs-provider-card');
        providerCards.forEach(card => {
            const providerName = card.querySelector('.lcs-provider-name').textContent.toLowerCase();
            const description = card.querySelector('.lcs-provider-description').textContent.toLowerCase();
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
            'china-office': 'قوانغتشو، الصين',
            'turkey-office': 'إسطنبول، تركيا',
            'germany-office': 'ميونخ، ألمانيا',
            'usa-office': 'نيويورك، الولايات المتحدة'
        };
        
        return locations[providerId] || 'غير محدد';
    },

    /**
     * Get provider specialties
     */
    getProviderSpecialties: function(providerId) {
        const specialties = {
            'china-office': ['مواد البناء', 'إلكترونيات', 'منسوجات', 'أثاث'],
            'turkey-office': ['منسوجات', 'أثاث', 'مواد غذائية', 'مواد بناء'],
            'germany-office': ['معدات طبية', 'سيارات', 'آلات صناعية', 'تقنيات متقدمة'],
            'usa-office': ['تكنولوجيا', 'برمجيات', 'معدات طبية', 'تقنيات متقدمة']
        };
        
        return specialties[providerId] || [];
    },

    /**
     * Get plan features
     */
    getPlanFeatures: function(planName) {
        const features = {
            'الخطة الأساسية': [
                'خدمات اعتمادات مستندية أساسية',
                'دعم فني أساسي',
                'تقارير شهرية'
            ],
            'الخطة المتقدمة': [
                'خدمات اعتمادات مستندية متقدمة',
                'دعم فني 24/7',
                'تقارير فورية',
                'تكامل مع الأنظمة المصرفية'
            ]
        };
        
        return features[planName] || [];
    },

    /**
     * Update providers list
     */
    updateProvidersList: function() {
        // In a real app, this would update the providers list with real data
        console.log('LC Services providers list updated');
    },

    /**
     * Update pricing plans
     */
    updatePricingPlans: function() {
        // In a real app, this would update pricing plans with real data
        console.log('LC Services pricing plans updated');
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
            <h4>صفحة خدمات الاعتمادات المستندية المحسنة</h4>
            <p>تم تحديث الصفحة لتشمل:</p>
            <ul>
                <li>استخدام بادئة 'lcs-' لجميع فئات CSS لتجنب التعارض</li>
                <li>عرض الميزات الرئيسية للخدمة مع تصميم محسن</li>
                <li>قائمة المكاتب التجارية مع التقييمات والعلامات</li>
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
                <li>ربط مع الأنظمة المصرفية</li>
                <li>إضافة خريطة تفاعلية لمواقع المكاتب</li>
                <li>إضافة نظام حجز المواعيد</li>
                <li>إضافة نظام تتبع المعاملات في الوقت الفعلي</li>
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
        console.log('LCServicesController destroyed');
        // Clean up any event listeners or timers
    }
};

// Debug: Check if LCServicesController is properly declared
console.log('LCServicesController declared:', typeof LCServicesController !== 'undefined');
console.log('LCServicesController in window:', typeof window.LCServicesController !== 'undefined');

// Explicitly attach to global scope
window.LCServicesController = LCServicesController;
console.log('LCServicesController attached to window:', typeof window.LCServicesController !== 'undefined'); 