/**
 * Dashboard page controller
 */
console.log('Loading dashboard.js file...');

const DashboardController = {
    /**
     * Initialize the dashboard page
     */
    init: function() {
        console.log('DashboardController initialized');
        this.renderDashboardData();
        this.setupEventListeners();
        this.updateStats();
        this.loadActivityData();
    },
    
    /**
     * Render dashboard page data from state
     */
    renderDashboardData: function() {
        this.updateWelcomeMessage();
        this.updateStatsCards();
        this.updateRecentActivity();
        this.updateChartData();
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
        
        // Calculate total revenue from all services
        const totalRevenue = stats.monthlyRevenue || 0;
        
        // Calculate active orders from all services
        const activeOrders = stats.totalOrders || 0;
        
        // Calculate active services
        const activeServices = stats.activeServices || 0;
        
        // Update stats in the DOM
        const statsElements = document.querySelectorAll('.stat-value');
        if (statsElements.length >= 3) {
            statsElements[0].textContent = totalRevenue.toLocaleString(); // Total revenue
            statsElements[1].textContent = activeOrders; // Active orders
            statsElements[2].textContent = activeServices; // Active services
        }
    },
    
    /**
     * Update recent activity section
     */
    updateRecentActivity: function() {
        const ordersContainer = document.querySelector('.orders-list');
        if (!ordersContainer) return;
        
        // Get recent activity from different services
        const warehouses = State.get('warehouses');
        const customsServices = State.get('customsServices');
        const shippingServices = State.get('shippingServices');
        
        // Create mock recent activity
        const recentActivity = [
            {
                id: 1,
                type: 'shipping',
                title: 'طلب شحن جديد',
                description: 'تم إنشاء طلب شحن من الرياض إلى جدة',
                status: 'new',
                time: 'منذ 5 دقائق',
                icon: 'fas fa-truck'
            },
            {
                id: 2,
                type: 'warehouse',
                title: 'تحديث المخزن',
                description: 'تم تحديث معلومات مخزن الرياض الرئيسي',
                status: 'completed',
                time: 'منذ 15 دقيقة',
                icon: 'fas fa-warehouse'
            },
            {
                id: 3,
                type: 'customs',
                title: 'تخليص جمركي',
                description: 'تم إكمال إجراءات التخليص الجمركي للشحنة #12345',
                status: 'completed',
                time: 'منذ ساعة',
                icon: 'fas fa-clipboard-check'
            }
        ];
        
        ordersContainer.innerHTML = recentActivity.map(activity => `
            <div class="order-card ${activity.status}">
                <div class="order-icon">
                    <i class="${activity.icon}"></i>
                </div>
                <div class="order-details">
                    <h4>${activity.title}</h4>
                    <p>${activity.description}</p>
                    <div class="order-meta">
                        <span class="order-status">${this.getActivityStatusText(activity.status)}</span>
                        <span class="order-time">${activity.time}</span>
                    </div>
                </div>
            </div>
        `).join('');
    },
    
    /**
     * Get activity status text in Arabic
     */
    getActivityStatusText: function(status) {
        const statusMap = {
            'new': 'قيد المعالجة',
            'pending': 'قيد التنفيذ',
            'completed': 'مكتمل',
            'cancelled': 'ملغي'
        };
        return statusMap[status] || status;
    },
    
    /**
     * Update chart data
     */
    updateChartData: function() {
        // This would typically load chart data from an API
        // For now, we'll just show placeholder charts
        console.log('Chart data updated');
    },
    
    /**
     * Update overall stats
     */
    updateStats: function() {
        const stats = State.get('stats') || {};
        
        // Update any additional stats that might be displayed
        const totalRevenueElement = document.querySelector('.total-revenue');
        if (totalRevenueElement) {
            totalRevenueElement.textContent = (stats.monthlyRevenue || 0).toLocaleString();
        }
        
        const activeOrdersElement = document.querySelector('.active-orders');
        if (activeOrdersElement) {
            activeOrdersElement.textContent = stats.totalOrders || 0;
        }
    },
    
    /**
     * Load activity data
     */
    loadActivityData: function() {
        // Simulate loading activity data
        setTimeout(() => {
            console.log('Activity data loaded');
        }, 500);
    },
    
    /**
     * Handle quick actions
     */
    handleQuickAction: function(action) {
        switch (action) {
            case 'orders':
                Router.navigate('orders');
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
     * Handle chart period changes
     */
    handleChartPeriodChange: function(period) {
        // Remove active class from all period buttons
        document.querySelectorAll('.chart-period').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Add active class to clicked button
        const activeButton = document.querySelector(`[data-period="${period}"]`);
        if (activeButton) {
            activeButton.classList.add('active');
        }
        
        // Update chart data based on period
        this.updateChartDataForPeriod(period);
    },
    
    /**
     * Update chart data for specific period
     */
    updateChartDataForPeriod: function(period) {
        console.log(`Updating chart data for period: ${period}`);
        // This would typically fetch new chart data from API
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
        
        // Handle chart period changes
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('chart-period')) {
                const period = e.target.dataset.period;
                if (period) {
                    this.handleChartPeriodChange(period);
                }
            }
        });
    }
};

// Attach to window object
window.DashboardController = DashboardController; 