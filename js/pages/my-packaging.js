/**
 * My Packaging page controller
 */
const MyPackagingController = {
    /**
     * Initialize the my packaging page
     */
    init: function() {
        console.log('My Packaging page initialized');
        this.renderPackagingServices();
        this.setupEventListeners();
    },
    
    /**
     * Render packaging services from state
     */
    renderPackagingServices: function() {
        const container = document.querySelector('.func-packaging-services-list');
        if (!container) return;
        
        const services = State.get('packagingServices');
        
        if (services.length === 0) {
            container.innerHTML = `
                <div class="func-empty-state">
                    <div class="func-empty-icon">
                        <i class="fas fa-box"></i>
                    </div>
                    <h3>لا توجد خدمات تغليف مسجلة</h3>
                    <p>ابدأ بإضافة خدمة تغليف جديدة لإدارة عمليات التعبئة والتغليف</p>
                    <button class="func-btn func-btn-primary" data-action="navigate" data-page="packaging-form">
                        <i class="fas fa-plus"></i>
                        إضافة خدمة تغليف
                    </button>
                </div>
            `;
            return;
        }
        
        container.innerHTML = services.map(service => `
            <div class="func-service-card" data-service-id="${service.id}">
                <div class="func-service-header">
                    <div class="func-service-icon">
                        <i class="fas fa-box"></i>
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
                            <i class="fas fa-boxes"></i>
                            <span>${service.materials}</span>
                        </div>
                        <div class="func-detail-item">
                            <i class="fas fa-weight-hanging"></i>
                            <span>${service.capacity}</span>
                        </div>
                        <div class="func-detail-item">
                            <i class="fas fa-clock"></i>
                            <span>${service.duration}</span>
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
                    <button class="func-btn func-btn-outline" data-action="navigate" data-page="packaging-details" data-id="${service.id}">
                        <i class="fas fa-eye"></i>
                        التفاصيل
                    </button>
                    <button class="func-btn func-btn-primary" data-action="navigate" data-page="packaging-form" data-id="${service.id}">
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
        const page = document.getElementById('my-packaging');
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
        const addButton = page.querySelector('[data-action="navigate"][data-page="packaging-form"]');
        if (addButton) {
            addButton.addEventListener('click', (e) => {
                e.preventDefault();
                Router.navigate('packaging-form');
            });
        }
    }
};

// Explicitly attach to global scope
window.MyPackagingController = MyPackagingController; 