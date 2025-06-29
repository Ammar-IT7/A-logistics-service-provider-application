/**
 * My Warehouses page controller
 */
const MyWarehousesController = {
    /**
     * Initialize the my warehouses page
     */
    init: function() {
        console.log('My Warehouses page initialized');
        this.renderWarehouses();
        this.setupEventListeners();
    },
    
    /**
     * Render warehouses from state
     */
    renderWarehouses: function() {
        const container = document.querySelector('.func-warehouses-list');
        if (!container) return;
        
        const warehouses = State.get('warehouses');
        
        if (warehouses.length === 0) {
            container.innerHTML = `
                <div class="func-empty-state">
                    <div class="func-empty-icon">
                        <i class="fas fa-warehouse"></i>
                    </div>
                    <h3>لا توجد مستودعات مسجلة</h3>
                    <p>ابدأ بإضافة مستودع جديد لإدارة مخزونك وتخزين البضائع</p>
                    <button class="func-btn func-btn-primary" data-action="navigate" data-page="warehouse-form">
                        <i class="fas fa-plus"></i>
                        إضافة مستودع
                    </button>
                </div>
            `;
            return;
        }
        
        container.innerHTML = warehouses.map(warehouse => `
            <div class="func-service-card" data-warehouse-id="${warehouse.id}">
                <div class="func-service-header">
                    <div class="func-service-icon">
                        <i class="fas fa-warehouse"></i>
                    </div>
                    <div class="func-service-status ${warehouse.status}">
                        <span class="func-status-dot"></span>
                        ${this.getStatusText(warehouse.status)}
                    </div>
                </div>
                
                <div class="func-service-content">
                    <h3 class="func-service-title">${warehouse.name}</h3>
                    <div class="func-service-details">
                        <div class="func-detail-item">
                            <i class="fas fa-map-marker-alt"></i>
                            <span>${warehouse.location}</span>
                        </div>
                        <div class="func-detail-item">
                            <i class="fas fa-ruler-combined"></i>
                            <span>${warehouse.size}</span>
                        </div>
                        <div class="func-detail-item">
                            <i class="fas fa-thermometer-half"></i>
                            <span>${warehouse.temperature}</span>
                        </div>
                    </div>
                    
                    <div class="func-service-stats">
                        <div class="func-stat">
                            <span class="func-stat-value">${warehouse.occupancy}%</span>
                            <span class="func-stat-label">الإشغال</span>
                        </div>
                        <div class="func-stat">
                            <span class="func-stat-value">${warehouse.items}</span>
                            <span class="func-stat-label">أصناف</span>
                        </div>
                        <div class="func-stat">
                            <span class="func-stat-value">${warehouse.revenue.toLocaleString()}</span>
                            <span class="func-stat-label">ريال</span>
                        </div>
                    </div>
                    
                    <div class="func-progress-bar">
                        <div class="func-progress-fill" style="width: ${warehouse.occupancy}%"></div>
                    </div>
                </div>
                
                <div class="func-service-actions">
                    <button class="func-btn func-btn-outline" data-action="navigate" data-page="warehouse-details" data-id="${warehouse.id}">
                        <i class="fas fa-eye"></i>
                        التفاصيل
                    </button>
                    <button class="func-btn func-btn-primary" data-action="navigate" data-page="warehouse-form" data-id="${warehouse.id}">
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
            'full': 'ممتلئ'
        };
        return statusMap[status] || status;
    },
    
    /**
     * Set up event listeners
     */
    setupEventListeners: function() {
        const page = document.getElementById('mywarehouses');
        if (!page) return;
        
        // Handle warehouse card clicks
        page.addEventListener('click', (e) => {
            const warehouseCard = e.target.closest('.func-service-card');
            if (warehouseCard) {
                const warehouseId = parseInt(warehouseCard.dataset.warehouseId);
                // Handle warehouse card interaction
            }
        });
        
        // Handle add new warehouse button
        const addButton = page.querySelector('[data-action="navigate"][data-page="warehouse-form"]');
        if (addButton) {
            addButton.addEventListener('click', (e) => {
                e.preventDefault();
                Router.navigate('warehouse-form');
            });
        }
    }
};

// Explicitly attach to global scope
window.MyWarehousesController = MyWarehousesController; 