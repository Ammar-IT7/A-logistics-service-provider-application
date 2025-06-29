/**
 * My Customs page controller
 */
const MyCustomsController = {
    /**
     * Initialize the my customs page
     */
    init: function() {
        console.log('My Customs page initialized');
        this.renderCustomsServices();
        this.setupEventListeners();
    },
    
    /**
     * Render customs services from state
     */
    renderCustomsServices: function() {
        const container = document.querySelector('.func-customs-services-list');
        if (!container) return;
        
        const services = State.get('customsServices');
        
        if (services.length === 0) {
            container.innerHTML = `
                <div class="func-empty-state">
                    <div class="func-empty-icon">
                        <i class="fas fa-clipboard-check"></i>
                    </div>
                    <h3>لا توجد خدمات تخليص جمركي</h3>
                    <p>ابدأ بإضافة خدمة تخليص جمركي جديدة لإدارة عمليات الاستيراد والتصدير</p>
                    <button class="func-btn func-btn-primary" data-action="navigate" data-page="customs-form">
                        <i class="fas fa-plus"></i>
                        إضافة خدمة تخليص
                    </button>
                </div>
            `;
            return;
        }
        
        container.innerHTML = services.map(service => `
            <div class="func-service-card" data-service-id="${service.id}">
                <div class="func-service-header">
                    <div class="func-service-icon">
                        <i class="fas fa-clipboard-check"></i>
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
                            <i class="fas fa-ship"></i>
                            <span>${service.port}</span>
                        </div>
                        <div class="func-detail-item">
                            <i class="fas fa-box"></i>
                            <span>${service.cargoType}</span>
                        </div>
                        <div class="func-detail-item">
                            <i class="fas fa-calendar"></i>
                            <span>${service.date}</span>
                        </div>
                    </div>
                    
                    <div class="func-service-stats">
                        <div class="func-stat">
                            <span class="func-stat-value">${service.containers}</span>
                            <span class="func-stat-label">حاويات</span>
                        </div>
                        <div class="func-stat">
                            <span class="func-stat-value">${service.value.toLocaleString()}</span>
                            <span class="func-stat-label">ريال</span>
                        </div>
                        <div class="func-stat">
                            <span class="func-stat-value">${service.progress}%</span>
                            <span class="func-stat-label">التقدم</span>
                        </div>
                    </div>
                    
                    <div class="func-progress-bar">
                        <div class="func-progress-fill" style="width: ${service.progress}%"></div>
                    </div>
                </div>
                
                <div class="func-service-actions">
                    <button class="func-btn func-btn-outline" data-action="navigate" data-page="customs-details" data-id="${service.id}">
                        <i class="fas fa-eye"></i>
                        التفاصيل
                    </button>
                    <button class="func-btn func-btn-primary" data-action="navigate" data-page="customs-form" data-id="${service.id}">
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
            'pending': 'قيد الانتظار',
            'in_progress': 'قيد التنفيذ',
            'completed': 'مكتمل',
            'cancelled': 'ملغي',
            'on_hold': 'معلق'
        };
        return statusMap[status] || status;
    },
    
    /**
     * Set up event listeners
     */
    setupEventListeners: function() {
        const page = document.getElementById('mycustoms');
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
        const addButton = page.querySelector('[data-action="navigate"][data-page="customs-form"]');
        if (addButton) {
            addButton.addEventListener('click', (e) => {
                e.preventDefault();
                Router.navigate('customs-form');
            });
        }
    }
};

// Explicitly attach to global scope
window.MyCustomsController = MyCustomsController; 