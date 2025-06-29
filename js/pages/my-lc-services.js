/**
 * My LC Services page controller
 */
const MyLcServicesController = {
    /**
     * Initialize the my LC services page
     */
    init: function() {
        console.log('My LC Services page initialized');
        this.renderLcServices();
        this.setupEventListeners();
    },
    
    /**
     * Render LC services from state
     */
    renderLcServices: function() {
        const container = document.querySelector('.func-lc-services-list');
        if (!container) return;
        
        const services = State.get('lcServices');
        
        if (services.length === 0) {
            container.innerHTML = `
                <div class="func-empty-state">
                    <div class="func-empty-icon">
                        <i class="fas fa-file-invoice-dollar"></i>
                    </div>
                    <h3>لا توجد خدمات اعتمادات مستندية</h3>
                    <p>ابدأ بإضافة خدمة اعتمادات مستندية جديدة لإدارة المعاملات المالية</p>
                    <button class="func-btn func-btn-primary" data-action="navigate" data-page="lc-service-form">
                        <i class="fas fa-plus"></i>
                        إضافة خدمة اعتمادات
                    </button>
                </div>
            `;
            return;
        }
        
        container.innerHTML = services.map(service => `
            <div class="func-service-card" data-service-id="${service.id}">
                <div class="func-service-header">
                    <div class="func-service-icon">
                        <i class="fas fa-file-invoice-dollar"></i>
                    </div>
                    <div class="func-service-status ${service.status}">
                        <span class="func-status-dot"></span>
                        ${this.getStatusText(service.status)}
                    </div>
                </div>
                
                <div class="func-service-content">
                    <h3 class="func-service-title">${service.name}</h3>
                    <div class="func-service-details">
                        <div class="func-detail-item">
                            <i class="fas fa-university"></i>
                            <span>${service.bank}</span>
                        </div>
                        <div class="func-detail-item">
                            <i class="fas fa-money-bill-wave"></i>
                            <span>${service.amount.toLocaleString()} ريال</span>
                        </div>
                        <div class="func-detail-item">
                            <i class="fas fa-calendar"></i>
                            <span>${this.formatDate(service.expiryDate)}</span>
                        </div>
                    </div>
                    
                    <div class="func-service-stats">
                        <div class="func-stat">
                            <span class="func-stat-value">${service.transactions}</span>
                            <span class="func-stat-label">المعاملات</span>
                        </div>
                        <div class="func-stat">
                            <span class="func-stat-value">${service.rating}</span>
                            <span class="func-stat-label">تقييم</span>
                        </div>
                    </div>
                </div>
                
                <div class="func-service-actions">
                    <button class="func-btn func-btn-outline" data-action="navigate" data-page="lc-service-details" data-id="${service.id}">
                        <i class="fas fa-eye"></i>
                        التفاصيل
                    </button>
                    <button class="func-btn func-btn-primary" data-action="navigate" data-page="lc-service-form" data-id="${service.id}">
                        <i class="fas fa-edit"></i>
                        تعديل
                    </button>
                </div>
            </div>
        `).join('');
    },
    
    /**
     * Get status text in Arabic
     */
    getStatusText: function(status) {
        const statusMap = {
            'active': 'نشط',
            'inactive': 'غير نشط',
            'expired': 'منتهي الصلاحية',
            'suspended': 'معلق'
        };
        return statusMap[status] || status;
    },
    
    /**
     * Format date to Arabic format
     */
    formatDate: function(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('ar-SA');
    },
    
    /**
     * Set up event listeners
     */
    setupEventListeners: function() {
        const page = document.getElementById('my-lc-services');
        if (!page) return;
        
        // Handle service card clicks
        page.addEventListener('click', (e) => {
            const serviceCard = e.target.closest('.func-service-card');
            if (serviceCard) {
                const serviceId = parseInt(serviceCard.dataset.serviceId);
                // Handle service card interaction
            }
        });
        
        // Handle add new service button
        const addButton = page.querySelector('[data-action="navigate"][data-page="lc-service-form"]');
        if (addButton) {
            addButton.addEventListener('click', (e) => {
                e.preventDefault();
                Router.navigate('lc-service-form');
            });
        }
    }
};

// Explicitly attach to global scope
window.MyLcServicesController = MyLcServicesController; 