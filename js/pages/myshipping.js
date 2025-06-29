/**
 * My Shipping page controller
 */
const MyShippingController = {
    /**
     * Initialize the my shipping page
     */
    init: function() {
        console.log('My Shipping page initialized');
        this.renderShippingServices();
        this.setupEventListeners();
    },
    
    /**
     * Render shipping services from state
     */
    renderShippingServices: function() {
        const container = document.querySelector('.func-shipping-services-list');
        if (!container) return;
        
        const services = State.get('shippingServices');
        
        if (services.length === 0) {
            container.innerHTML = `
                <div class="func-empty-state">
                    <div class="func-empty-icon">
                        <i class="fas fa-truck"></i>
                    </div>
                    <h3>لا توجد خدمات شحن مسجلة</h3>
                    <p>ابدأ بإضافة خدمة شحن جديدة لإدارة عمليات النقل الخاصة بك</p>
                    <button class="func-btn func-btn-primary" data-action="navigate" data-page="shipping-form">
                        <i class="fas fa-plus"></i>
                        إضافة خدمة شحن
                    </button>
                </div>
            `;
            return;
        }
        
        container.innerHTML = services.map(service => `
            <div class="func-service-card" data-service-id="${service.id}">
                <div class="func-service-header">
                    <div class="func-service-icon">
                        <i class="fas fa-truck"></i>
                    </div>
                    <div class="func-service-status ${service.status}">
                        <span class="func-status-dot"></span>
                        ${this.getStatusText(service.status)}
                    </div>
                </div>
                
                <div class="func-service-content">
                    <h3 class="func-service-title">${service.type}</h3>
                    <div class="func-service-details">
                        <div class="func-detail-item">
                            <i class="fas fa-truck"></i>
                            <span>${service.vehicle}</span>
                        </div>
                        <div class="func-detail-item">
                            <i class="fas fa-weight-hanging"></i>
                            <span>${service.capacity}</span>
                        </div>
                        <div class="func-detail-item">
                            <i class="fas fa-route"></i>
                            <span>${service.route}</span>
                        </div>
                    </div>
                    
                    <div class="func-service-stats">
                        <div class="func-stat">
                            <span class="func-stat-value">${service.orders}</span>
                            <span class="func-stat-label">الطلبات</span>
                        </div>
                        <div class="func-stat">
                            <span class="func-stat-value">${service.revenue.toLocaleString()}</span>
                            <span class="func-stat-label">ريال</span>
                        </div>
                        <div class="func-stat">
                            <span class="func-stat-value">${service.rating}</span>
                            <span class="func-stat-label">تقييم</span>
                        </div>
                    </div>
                </div>
                
                <div class="func-service-actions">
                    <button class="func-btn func-btn-outline" data-action="navigate" data-page="vehicle-details" data-id="${service.id}">
                        <i class="fas fa-eye"></i>
                        التفاصيل
                    </button>
                    <button class="func-btn func-btn-primary" data-action="navigate" data-page="vehicle-form" data-id="${service.id}">
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
            'maintenance': 'صيانة',
            'suspended': 'معلق'
        };
        return statusMap[status] || status;
    },
    
    /**
     * Set up event listeners
     */
    setupEventListeners: function() {
        const page = document.getElementById('myshipping');
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
        const addButton = page.querySelector('[data-action="navigate"][data-page="shipping-form"]');
        if (addButton) {
            addButton.addEventListener('click', (e) => {
                e.preventDefault();
                Router.navigate('shipping-form');
            });
        }
    }
};

// Explicitly attach to global scope
window.MyShippingController = MyShippingController; 