/**
 * Orders page controller
 */
console.log('Loading orders.js file...');

const OrdersController = {
    /**
     * Initialize the orders page
     */
    init: function() {
        console.log('OrdersController initialized');
        this.renderOrdersData();
        this.setupEventListeners();
        this.updateStats();
        this.loadOrdersData();
    },
    
    /**
     * Render orders page data from state
     */
    renderOrdersData: function() {
        this.updateWelcomeMessage();
        this.updateStatsCards();
        this.updateOrdersList();
        this.updateStatusTabs();
    },
    
    /**
     * Update welcome message with user data
     */
    updateWelcomeMessage: function() {
        const user = State.get('user');
        const welcomeElement = document.querySelector('.user-name');
        if (welcomeElement) {
            welcomeElement.textContent = user.name;
        }
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
        const ordersContainer = document.querySelector('.orders-list');
        if (!ordersContainer) return;
        
        // Create mock orders since we don't have orders in state yet
        const mockOrders = [
            {
                id: '1253',
                type: 'warehouse',
                title: 'طلب تخزين #1253',
                description: 'منتجات غذائية - 3 طن - مخزن الرياض',
                status: 'new',
                time: 'منذ ساعتين',
                icon: 'fas fa-box'
            },
            {
                id: '4587',
                type: 'customs',
                title: 'طلب تخليص #4587',
                description: 'معدات إلكترونية - ميناء جدة',
                status: 'pending',
                time: 'منذ يوم واحد',
                icon: 'fas fa-clipboard-list'
            },
            {
                id: '8975',
                type: 'shipping',
                title: 'طلب شحن #8975',
                description: 'الرياض - الدمام - 2 طن',
                status: 'completed',
                time: 'منذ 3 أيام',
                icon: 'fas fa-truck-loading'
            },
            {
                id: '6321',
                type: 'packaging',
                title: 'طلب تغليف #6321',
                description: 'منتجات زجاجية - خدمة تغليف فاخر',
                status: 'new',
                time: 'منذ 4 ساعات',
                icon: 'fas fa-boxes'
            },
            {
                id: '7890',
                type: 'lc',
                title: 'طلب اعتماد #7890',
                description: 'اعتماد مستندي - بنك الرياض - 50,000 ريال',
                status: 'pending',
                time: 'منذ يومين',
                icon: 'fas fa-file-invoice-dollar'
            }
        ];
        
        const ordersToDisplay = mockOrders;
        
        ordersContainer.innerHTML = ordersToDisplay.map(order => `
            <div class="order-card ${order.status}" data-action="navigate" data-page="order-details">
                <div class="order-icon">
                    <i class="${order.icon}"></i>
                </div>
                <div class="order-details">
                    <h4>${order.title}</h4>
                    <p>${order.description}</p>
                    <div class="order-meta">
                        <span class="order-status">${this.getOrderStatusText(order.status)}</span>
                        <span class="order-time">${order.time}</span>
                    </div>
                </div>
            </div>
        `).join('');
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
        const tabCounts = document.querySelectorAll('.tab-count');
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
     * Load orders data
     */
    loadOrdersData: function() {
        // Simulate loading orders data
        setTimeout(() => {
            console.log('Orders data loaded');
        }, 500);
    },
    
    /**
     * Handle quick actions
     */
    handleQuickAction: function(action) {
        switch (action) {
            case 'order-form':
                Router.navigate('order-form');
                break;
            case 'reports':
                Router.navigate('reports');
                break;
            case 'analytics':
                Router.navigate('analytics');
                break;
            case 'billing':
                Router.navigate('billing');
                break;
        }
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
        console.log(`Filtering orders by status: ${status}`);
        // This would typically filter the orders list based on status
        // For now, we'll just log the action
    },
    
    /**
     * Set up event listeners
     */
    setupEventListeners: function() {
        // Handle quick action clicks
        document.addEventListener('click', (e) => {
            if (e.target.closest('.action-card')) {
                const actionCard = e.target.closest('.action-card');
                const action = actionCard.dataset.page;
                if (action) {
                    this.handleQuickAction(action);
                }
            }
        });
        
        // Handle status tab changes
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('status-tab')) {
                const status = e.target.dataset.status;
                if (status) {
                    this.handleStatusTabChange(status);
                }
            }
        });
        
        // Handle order card clicks
        document.addEventListener('click', (e) => {
            if (e.target.closest('.order-card')) {
                const orderCard = e.target.closest('.order-card');
                const action = orderCard.dataset.action;
                const page = orderCard.dataset.page;
                if (action === 'navigate' && page) {
                    Router.navigate(page);
                }
            }
        });
    }
};

// Attach to window object
window.OrdersController = OrdersController; 