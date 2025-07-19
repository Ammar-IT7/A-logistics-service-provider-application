/**
 * Warehouse Management Page Controller
 */
const WarehouseManagementController = {
    /**
     * Initialize the controller
     */
    init: function() {
        console.log('WarehouseManagementController initialized');
        this.loadData();
        this.setupEventListeners();
        this.updateDesignerNotes();
    },

    /**
     * Load page data
     */
    loadData: function() {
        // Simulate loading warehouse management data
        console.log('Loading warehouse management data...');
        
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
            if (e.target.closest('.wm-provider-card')) {
                const providerCard = e.target.closest('.wm-provider-card');
                this.handleProviderClick(providerCard);
            }
            
            if (e.target.closest('.wm-pricing-card')) {
                const pricingCard = e.target.closest('.wm-pricing-card');
                this.handlePricingClick(pricingCard);
            }
            
            if (e.target.closest('.wm-feature-card')) {
                const featureCard = e.target.closest('.wm-feature-card');
                this.handleFeatureClick(featureCard);
            }
        });

        // Handle form submissions
        document.addEventListener('submit', (e) => {
            if (e.target.id === 'warehouseManagementForm') {
                e.preventDefault();
                this.handleFormSubmit(e.target);
            }
        });
    },

    /**
     * Handle provider card click
     */
    handleProviderClick: function(providerCard) {
        const providerName = providerCard.querySelector('h4').textContent;
        console.log('Provider clicked:', providerName);
        
        // Show provider details modal or navigate to provider page
        Toast.show('معلومات المزود', `تم اختيار ${providerName}`, 'info');
        
        // In a real app, this would open a modal or navigate to provider details
        setTimeout(() => {
            Modal.open('provider-details', {
                provider: providerName,
                rating: '4.8',
                experience: '5 سنوات',
                clients: '150+'
            });
        }, 1000);
    },

    /**
     * Handle pricing plan click
     */
    handlePricingClick: function(pricingCard) {
        const planName = pricingCard.querySelector('h4').textContent;
        const planPrice = pricingCard.querySelector('.wm-amount').textContent;
        
        console.log('Pricing plan clicked:', planName, planPrice);
        
        // Show pricing details or initiate subscription
        Toast.show('خطة الأسعار', `تم اختيار ${planName} بسعر ${planPrice} ريال/شهر`, 'success');
        
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
     * Get plan features
     */
    getPlanFeatures: function(planName) {
        const features = {
            'الخطة الأساسية': [
                'إدارة مخزون أساسية',
                'تقارير شهرية',
                'دعم فني أساسي'
            ],
            'الخطة المتقدمة': [
                'إدارة مخزون متقدمة',
                'تقارير فورية',
                'دعم فني 24/7',
                'تكامل مع أنظمة أخرى'
            ]
        };
        
        return features[planName] || [];
    },

    /**
     * Update providers list
     */
    updateProvidersList: function() {
        // In a real app, this would update the providers list with real data
        console.log('Providers list updated');
    },

    /**
     * Update pricing plans
     */
    updatePricingPlans: function() {
        // In a real app, this would update pricing plans with real data
        console.log('Pricing plans updated');
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
            <h4>صفحة إدارة المستودعات المحسنة</h4>
            <p>تم تحديث الصفحة لتشمل:</p>
            <ul>
                <li>استخدام بادئة 'wm-' لجميع فئات CSS لتجنب التعارض</li>
                <li>عرض الميزات الرئيسية للخدمة مع تصميم محسن</li>
                <li>قائمة مقدمي الخدمات مع التقييمات والعلامات</li>
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
                <li>ربط مع نظام الدفع</li>
                <li>إضافة خريطة تفاعلية لمواقع المستودعات</li>
                <li>إضافة نظام حجز المواعيد</li>
                <li>إضافة نظام إدارة المخزون في الوقت الفعلي</li>
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
        console.log('WarehouseManagementController destroyed');
        // Clean up any event listeners or timers
    }
};

// Debug: Check if WarehouseManagementController is properly declared
console.log('WarehouseManagementController declared:', typeof WarehouseManagementController !== 'undefined');
console.log('WarehouseManagementController in window:', typeof window.WarehouseManagementController !== 'undefined');

// Explicitly attach to global scope
window.WarehouseManagementController = WarehouseManagementController;
console.log('WarehouseManagementController attached to window:', typeof window.WarehouseManagementController !== 'undefined'); 