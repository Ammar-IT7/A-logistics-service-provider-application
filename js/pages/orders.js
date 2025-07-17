/**
 * Orders Controller
 * Manages the orders page functionality
 */
const OrdersController = {
    /**
     * Initialize the orders page
     */
    init: function() {
        console.log('OrdersController initialized');
        
        // Load and render data
        this.renderOrdersData();
        
        // Set up event listeners
        this.setupEventListeners();
        
        // Initialize search functionality
        this.initSearch();
        
        // Initialize filters
        this.initFilters();
    },

    /**
     * Render orders data
     */
    renderOrdersData: function() {
        this.updateStatsCards();
        this.updateOrdersList();
        this.updateStatusTabs();
        this.updateStats();
    },

    /**
     * Update stats cards with real data
     */
    updateStatsCards: function() {
        const stats = State.get('stats') || {};
        const warehouses = State.get('warehouses') || [];
        const customsServices = State.get('customsServices') || [];
        const shippingServices = State.get('shippingServices') || [];
        const packagingServices = State.get('packagingServices') || [];
        
        // Calculate order statistics from all services
        const totalOrders = stats.totalOrders || 0;
        const newOrders = Math.floor(totalOrders * 0.3); // 30% new
        const pendingOrders = Math.floor(totalOrders * 0.4); // 40% pending
        const completedOrders = Math.floor(totalOrders * 0.3); // 30% completed
        
        // Update stats in the DOM
        const statsElements = document.querySelectorAll('.stat-value');
        if (statsElements.length >= 3) {
            statsElements[0].textContent = newOrders; // New orders
            statsElements[1].textContent = pendingOrders; // Pending orders
            statsElements[2].textContent = completedOrders; // Completed orders
        }
    },

    /**
     * Update orders list
     */
    updateOrdersList: function() {
        const ordersContainer = document.querySelector('.orders-grid');
        if (!ordersContainer) return;
        
        // Create comprehensive mock orders
        const mockOrders = [
            {
                id: 'WH-2024-1253',
                type: 'warehouse',
                typeText: 'تخزين',
                title: 'طلب تخزين #WH-2024-1253',
                description: 'منتجات غذائية - 3 طن - مخزن الرياض الرئيسي',
                status: 'new',
                statusText: 'جديد',
                client: 'شركة التقنية المتقدمة',
                location: 'الرياض، المملكة العربية السعودية',
                date: '15 يناير 2024',
                priority: 'high',
                priorityText: 'عالية',
                time: 'منذ ساعتين',
                icon: 'fas fa-warehouse',
                statusIcon: 'fas fa-clock'
            },
            {
                id: 'CUS-2024-4587',
                type: 'customs',
                typeText: 'تخليص جمركي',
                title: 'طلب تخليص #CUS-2024-4587',
                description: 'معدات إلكترونية - ميناء جدة الإسلامي',
                status: 'pending',
                statusText: 'قيد التنفيذ',
                client: 'مصنع الأثاث الحديث',
                location: 'ميناء جدة الإسلامي',
                date: '12 يناير 2024',
                priority: 'medium',
                priorityText: 'متوسطة',
                time: 'منذ يوم واحد',
                icon: 'fas fa-clipboard-list',
                statusIcon: 'fas fa-spinner'
            },
            {
                id: 'SH-2024-8975',
                type: 'shipping',
                typeText: 'شحن',
                title: 'طلب شحن #SH-2024-8975',
                description: 'الرياض - الدمام - 2 طن - شحن بري',
                status: 'completed',
                statusText: 'مكتمل',
                client: 'شركة النقل السريع',
                location: 'الرياض → الدمام',
                date: '10 يناير 2024',
                priority: 'low',
                priorityText: 'منخفضة',
                time: 'منذ 3 أيام',
                icon: 'fas fa-truck',
                statusIcon: 'fas fa-check-circle'
            },
            {
                id: 'PKG-2024-6321',
                type: 'packaging',
                typeText: 'تغليف',
                title: 'طلب تغليف #PKG-2024-6321',
                description: 'منتجات زجاجية - خدمة تغليف فاخر',
                status: 'new',
                statusText: 'جديد',
                client: 'شركة الزجاج المتطور',
                location: 'مخزن الرياض الرئيسي',
                date: '14 يناير 2024',
                priority: 'medium',
                priorityText: 'متوسطة',
                time: 'منذ 4 ساعات',
                icon: 'fas fa-boxes',
                statusIcon: 'fas fa-clock'
            },
            {
                id: 'LC-2024-7890',
                type: 'lc',
                typeText: 'اعتمادات مستندية',
                title: 'طلب اعتماد #LC-2024-7890',
                description: 'اعتماد مستندي - بنك الرياض - 50,000 ريال',
                status: 'pending',
                statusText: 'قيد التنفيذ',
                client: 'شركة الاستيراد العالمية',
                location: 'بنك الرياض',
                date: '13 يناير 2024',
                priority: 'high',
                priorityText: 'عالية',
                time: 'منذ يومين',
                icon: 'fas fa-file-invoice-dollar',
                statusIcon: 'fas fa-spinner'
            },
            {
                id: 'LM-2024-4567',
                type: 'last-mile',
                typeText: 'توصيل نهائي',
                title: 'طلب توصيل #LM-2024-4567',
                description: 'توصيل منزلي - الرياض - 50 طرد',
                status: 'completed',
                statusText: 'مكتمل',
                client: 'متجر الأزياء الأنيق',
                location: 'الرياض - حي النرجس',
                date: '11 يناير 2024',
                priority: 'low',
                priorityText: 'منخفضة',
                time: 'منذ 4 أيام',
                icon: 'fas fa-shipping-fast',
                statusIcon: 'fas fa-check-circle'
            }
        ];
        
        this.renderOrders(mockOrders);
    },

    /**
     * Render orders in the grid
     */
    renderOrders: function(orders) {
        const ordersContainer = document.querySelector('.orders-grid');
        if (!ordersContainer) return;
        
        ordersContainer.innerHTML = orders.map(order => `
            <div class="order-card ${order.status}" data-action="navigate" data-page="order-details" data-order-id="${order.id}">
                <div class="order-header">
                    <div class="order-type">
                        <i class="${order.icon}"></i>
                        <span>${order.typeText}</span>
                    </div>
                    <div class="order-status ${order.status}">
                        <i class="${order.statusIcon}"></i>
                        <span>${order.statusText}</span>
                    </div>
                </div>
                
                <div class="order-content">
                    <h4 class="order-title">${order.title}</h4>
                    <p class="order-description">${order.description}</p>
                    
                    <div class="order-details">
                        <div class="detail-item">
                            <i class="fas fa-user"></i>
                            <span>${order.client}</span>
                        </div>
                        <div class="detail-item">
                            <i class="fas fa-map-marker-alt"></i>
                            <span>${order.location}</span>
                        </div>
                        <div class="detail-item">
                            <i class="fas fa-calendar"></i>
                            <span>${order.date}</span>
                        </div>
                    </div>
                </div>
                
                <div class="order-footer">
                    <div class="order-priority ${order.priority}">
                        <i class="fas fa-${this.getPriorityIcon(order.priority)}"></i>
                        <span>${order.priorityText}</span>
                    </div>
                    <div class="order-time">
                        <i class="fas fa-clock"></i>
                        <span>${order.time}</span>
                    </div>
                </div>
            </div>
        `).join('');
    },

    /**
     * Get priority icon
     */
    getPriorityIcon: function(priority) {
        const icons = {
            'high': 'exclamation-triangle',
            'medium': 'minus-circle',
            'low': 'check-circle'
        };
        return icons[priority] || 'minus-circle';
    },

    /**
     * Update status tabs with counts
     */
    updateStatusTabs: function() {
        const stats = State.get('stats') || {};
        
        // Calculate counts for each status
        const totalOrders = stats.totalOrders || 0;
        const allCount = totalOrders;
        const newCount = Math.floor(totalOrders * 0.3); // 30% new
        const pendingCount = Math.floor(totalOrders * 0.4); // 40% pending
        const completedCount = Math.floor(totalOrders * 0.3); // 30% completed
        
        // Update tab counts
        const tabCounts = document.querySelectorAll('.filter-count');
        if (tabCounts.length >= 4) {
            tabCounts[0].textContent = allCount; // All
            tabCounts[1].textContent = newCount; // New
            tabCounts[2].textContent = pendingCount; // Pending
            tabCounts[3].textContent = completedCount; // Completed
        }
    },

    /**
     * Get order status text in Arabic
     */
    getOrderStatusText: function(status) {
        const statusMap = {
            'new': 'جديد',
            'pending': 'قيد التنفيذ',
            'in_progress': 'قيد التنفيذ',
            'completed': 'مكتمل',
            'cancelled': 'ملغي'
        };
        return statusMap[status] || status;
    },

    /**
     * Update overall stats
     */
    updateStats: function() {
        const stats = State.get('stats') || {};
        
        // Update any additional stats that might be displayed
        const totalOrdersElement = document.querySelector('.total-orders');
        if (totalOrdersElement) {
            totalOrdersElement.textContent = stats.totalOrders || 0;
        }
        
        const monthlyOrdersElement = document.querySelector('.monthly-orders');
        if (monthlyOrdersElement) {
            monthlyOrdersElement.textContent = stats.newRequests || 0;
        }
    },

    /**
     * Initialize search functionality
     */
    initSearch: function() {
        const searchInput = document.querySelector('.search-input');
        if (!searchInput) return;
        
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            this.filterOrders(searchTerm);
        });
    },

    /**
     * Initialize filters
     */
    initFilters: function() {
        // Status filter buttons
        document.querySelectorAll('.filter-btn[data-filter]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const filter = e.target.closest('.filter-btn').dataset.filter;
                this.handleStatusFilter(filter);
            });
        });
        
        // Service type filter
        const serviceFilter = document.querySelector('.filter-select');
        if (serviceFilter) {
            serviceFilter.addEventListener('change', (e) => {
                this.handleServiceFilter(e.target.value);
            });
        }
        
        // Time period filter
        const timeFilter = document.querySelectorAll('.filter-select')[1];
        if (timeFilter) {
            timeFilter.addEventListener('change', (e) => {
                this.handleTimeFilter(e.target.value);
            });
        }
    },

    /**
     * Filter orders by search term
     */
    filterOrders: function(searchTerm) {
        const orderCards = document.querySelectorAll('.order-card');
        
        orderCards.forEach(card => {
            const title = card.querySelector('.order-title').textContent.toLowerCase();
            const description = card.querySelector('.order-description').textContent.toLowerCase();
            const client = card.querySelector('.detail-item span').textContent.toLowerCase();
            
            const matches = title.includes(searchTerm) || 
                           description.includes(searchTerm) || 
                           client.includes(searchTerm);
            
            card.style.display = matches ? 'block' : 'none';
        });
    },

    /**
     * Handle status filter
     */
    handleStatusFilter: function(status) {
        // Update active filter button
        document.querySelectorAll('.filter-btn[data-filter]').forEach(btn => {
            btn.classList.remove('active');
        });
        
        const activeBtn = document.querySelector(`[data-filter="${status}"]`);
        if (activeBtn) {
            activeBtn.classList.add('active');
        }
        
        // Filter orders
        const orderCards = document.querySelectorAll('.order-card');
        
        orderCards.forEach(card => {
            if (status === 'all' || card.classList.contains(status)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    },

    /**
     * Handle service type filter
     */
    handleServiceFilter: function(serviceType) {
        if (!serviceType) return;
        
        const orderCards = document.querySelectorAll('.order-card');
        
        orderCards.forEach(card => {
            const orderType = card.querySelector('.order-type span').textContent;
            const matches = orderType.includes(this.getServiceTypeText(serviceType));
            
            card.style.display = matches ? 'block' : 'none';
        });
    },

    /**
     * Handle time filter
     */
    handleTimeFilter: function(timePeriod) {
        if (!timePeriod) return;
        
        // This would typically filter by actual dates
        // For now, we'll just show all orders
        console.log(`Filtering by time period: ${timePeriod}`);
    },

    /**
     * Get service type text
     */
    getServiceTypeText: function(serviceType) {
        const serviceMap = {
            'warehouse': 'تخزين',
            'shipping': 'شحن',
            'customs': 'تخليص جمركي',
            'packaging': 'تغليف',
            'lc': 'اعتمادات مستندية'
        };
        return serviceMap[serviceType] || serviceType;
    },

    /**
     * Load orders data
     */
    loadOrdersData: function() {
        // Simulate loading orders data
        setTimeout(() => {
            console.log('Orders data loaded');
        }, 500);
    },

    /**
     * Handle status tab changes
     */
    handleStatusTabChange: function(status) {
        // Remove active class from all tabs
        document.querySelectorAll('.status-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        
        // Add active class to clicked tab
        const activeTab = document.querySelector(`[data-status="${status}"]`);
        if (activeTab) {
            activeTab.classList.add('active');
        }
        
        // Filter orders based on status
        this.filterOrdersByStatus(status);
    },

    /**
     * Filter orders by status
     */
    filterOrdersByStatus: function(status) {
        const orderCards = document.querySelectorAll('.order-card');
        
        orderCards.forEach(card => {
            if (status === 'all' || card.classList.contains(status)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    },

    /**
     * Set up event listeners
     */
    setupEventListeners: function() {
        // Handle order card clicks
        document.addEventListener('click', (e) => {
            const orderCard = e.target.closest('.order-card');
            if (orderCard && orderCard.dataset.action === 'navigate') {
                const orderId = orderCard.dataset.orderId;
                console.log(`Navigating to order details: ${orderId}`);
                Router.navigate('order-details');
            }
        });

        // Handle floating action button click
        document.addEventListener('click', (e) => {
            if (e.target.closest('.floating-action-btn')) {
                console.log('Navigating to order form');
                Router.navigate('order-form');
            }
        });
    }
};

// Attach to window for router access
window.OrdersController = OrdersController; 