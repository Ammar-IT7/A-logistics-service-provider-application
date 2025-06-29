/**
 * Warehouses Controller
 * Handles the warehouses listing page
 */

const WarehousesController = {
    init: function() {
        console.log('Warehouses page initialized');
        this.setupEventListeners();
        this.loadWarehouses();
    },

    setupEventListeners: function() {
        const page = document.getElementById('warehouses');
        if (!page) return;

        // Search functionality
        const searchInput = page.querySelector('.search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.filterWarehouses(e.target.value);
            });
        }

        // Filter buttons
        const filterButtons = page.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.handleFilterClick(e.target);
            });
        });

        // Warehouse card clicks
        page.addEventListener('click', (e) => {
            const warehouseCard = e.target.closest('.wh-card');
            if (warehouseCard) {
                const warehouseId = warehouseCard.dataset.id;
                if (warehouseId) {
                    Router.navigate('warehouse-details', { id: warehouseId });
                }
            }
        });
    },

    loadWarehouses: function() {
        const warehouses = State.get('warehouses') || [];
        this.renderWarehouses(warehouses);
    },

    renderWarehouses: function(warehouses) {
        const container = document.querySelector('.warehouse-cards');
        if (!container) return;

        if (warehouses.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <div class="empty-icon">🏭</div>
                    <h3>لا توجد مستودعات</h3>
                    <p>لم يتم العثور على مستودعات متاحة حالياً</p>
                </div>
            `;
            return;
        }

        container.innerHTML = warehouses.map(warehouse => `
            <div class="wh-card" data-action="view-warehouse" data-id="${warehouse.id}">
                <div class="wh-card-header">
                    <h3>${warehouse.name}</h3>
                    <span class="wh-status-badge ${warehouse.status}">${this.getStatusText(warehouse.status)}</span>
                </div>
                <div class="wh-card-content">
                    <div class="wh-card-info">
                        <div class="wh-info-item">
                            <div class="wh-info-label">النوع:</div>
                            <div class="wh-info-value">${warehouse.type}</div>
                        </div>
                        <div class="wh-info-item">
                            <div class="wh-info-label">الموقع:</div>
                            <div class="wh-info-value">${warehouse.location}</div>
                        </div>
                        <div class="wh-info-item">
                            <div class="wh-info-label">المساحة:</div>
                            <div class="wh-info-value">${warehouse.size}</div>
                        </div>
                        <div class="wh-info-item">
                            <div class="wh-info-label">نسبة الإشغال:</div>
                            <div class="wh-occupation-indicator">
                                <div class="wh-occupation-bar" style="width: ${warehouse.occupancy}%"></div>
                                <span>${warehouse.occupancy}%</span>
                            </div>
                        </div>
                    </div>
                    <div class="wh-card-actions">
                        <button class="btn btn-sm btn-outline" data-action="navigate" data-page="warehouse-details" data-id="${warehouse.id}">التفاصيل</button>
                    </div>
                </div>
            </div>
        `).join('');
    },

    filterWarehouses: function(searchTerm) {
        const warehouses = State.get('warehouses') || [];
        const filtered = warehouses.filter(warehouse => 
            warehouse.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            warehouse.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
            warehouse.type.toLowerCase().includes(searchTerm.toLowerCase())
        );
        this.renderWarehouses(filtered);
    },

    handleFilterClick: function(clickedBtn) {
        // Remove active class from all filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });

        // Add active class to clicked button
        clickedBtn.classList.add('active');

        const filter = clickedBtn.dataset.filter;
        const warehouses = State.get('warehouses') || [];

        if (filter === 'all') {
            this.renderWarehouses(warehouses);
        } else {
            const filtered = warehouses.filter(warehouse => 
                warehouse.type.toLowerCase().includes(filter.toLowerCase())
            );
            this.renderWarehouses(filtered);
        }
    },

    getStatusText: function(status) {
        const statusMap = {
            'active': 'متاح',
            'busy': 'مشغول',
            'maintenance': 'صيانة',
            'inactive': 'غير متاح'
        };
        return statusMap[status] || 'غير محدد';
    }
};

// Explicitly attach to global scope
window.WarehousesController = WarehousesController;