/**
 * My Last Mile Delivery page controller
 */
const MyLastMileController = {
    /**
     * Initialize the my last mile delivery page
     */
    init: function() {
        console.log('My Last Mile Delivery page initialized');
        this.renderLastMileServices();
        this.setupEventListeners();
    },
    
    /**
     * Render last mile delivery services from state
     */
    renderLastMileServices: function() {
        const container = document.querySelector('.func-last-mile-services-list');
        if (!container) return;
        
        const services = State.get('lastMileServices');
        
        if (services.length === 0) {
            container.innerHTML = `
                <div class="func-empty-state">
                    <div class="func-empty-icon">
                        <i class="fas fa-motorcycle"></i>
                    </div>
                    <h3>لا توجد خدمات توصيل نهائي</h3>
                    <p>ابدأ بإضافة خدمة توصيل نهائي جديدة لإدارة عمليات التوصيل للمنازل</p>
                    <button class="func-btn func-btn-primary" data-action="navigate" data-page="delivery-provider-form">
                        <i class="fas fa-plus"></i>
                        إضافة خدمة توصيل
                    </button>
                </div>
            `;
            return;
        }
        
        container.innerHTML = services.map(service => `
            <div class="func-service-card" data-service-id="${service.id}">
                <div class="func-service-header">
                    <div class="func-service-icon">
                        <i class="fas fa-motorcycle"></i>
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
                            <i class="fas fa-map-marker-alt"></i>
                            <span>${service.area}</span>
                        </div>
                        <div class="func-detail-item">
                            <i class="fas fa-clock"></i>
                            <span>${service.deliveryTime}</span>
                        </div>
                        <div class="func-detail-item">
                            <i class="fas fa-weight-hanging"></i>
                            <span>${service.maxWeight}</span>
                        </div>
                    </div>
                    
                    <div class="func-service-stats">
                        <div class="func-stat">
                            <span class="func-stat-value">${service.deliveries}</span>
                            <span class="func-stat-label">التوصيلات</span>
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
                    <button class="func-btn func-btn-outline" data-action="navigate" data-page="delivery-details" data-id="${service.id}">
                        <i class="fas fa-eye"></i>
                        التفاصيل
                    </button>
                    <button class="func-btn func-btn-primary" data-action="navigate" data-page="delivery-provider-form" data-id="${service.id}">
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
        const page = document.getElementById('my-last-mile');
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
        const addButton = page.querySelector('[data-action="navigate"][data-page="delivery-provider-form"]');
        if (addButton) {
            addButton.addEventListener('click', (e) => {
                e.preventDefault();
                Router.navigate('delivery-provider-form');
            });
        }
    }
};

// Explicitly attach to global scope
window.MyLastMileController = MyLastMileController; 