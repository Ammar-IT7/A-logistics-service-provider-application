/**
 * Dashboard page controller - Modern Mobile-First Design
 */
console.log('Loading dashboard.js file...');

const DashboardController = {
    /**
     * Initialize the dashboard page
     */
    init: function() {
        console.log('DashboardController initialized');
        this.loadDashboardData();
        this.setupEventListeners();
        this.initializeCharts();
        this.startRealTimeUpdates();
    },
    
    /**
     * Load and populate dashboard data
     */
    loadDashboardData: function() {
        this.updateUserInfo();
        this.updateStatsCards();
        this.updateRecentActivity();
        this.updatePerformanceMetrics();
        this.updateNotifications();
    },
    
    /**
     * Update user information in header
     */
    updateUserInfo: function() {
        const user = State.get('user') || {
            name: 'أحمد محمد',
            avatar: 'https://via.placeholder.com/40x40/667eea/ffffff?text=أ',
            role: 'مدير الخدمات اللوجستية'
        };
        
        const userNameElement = document.querySelector('.dashboard-user-name');
        const userAvatarElement = document.querySelector('.dashboard-user-avatar img');
        
        if (userNameElement) {
            userNameElement.textContent = user.name;
        }
        
        if (userAvatarElement && user.avatar) {
            userAvatarElement.src = user.avatar;
            userAvatarElement.alt = `صورة ${user.name}`;
        }
    },
    
    /**
     * Update stats cards with realistic data
     */
    updateStatsCards: function() {
        const stats = this.getDashboardStats();
        
        // Update revenue stat
        const revenueElement = document.querySelector('.dashboard-stat-card.dashboard-stat-primary .dashboard-stat-value');
        if (revenueElement) {
            revenueElement.textContent = this.formatCurrency(stats.revenue);
        }
        
        // Update orders stat
        const ordersElement = document.querySelector('.dashboard-stat-card.dashboard-stat-success .dashboard-stat-value');
        if (ordersElement) {
            ordersElement.textContent = stats.activeOrders.toLocaleString();
        }
        
        // Update customers stat
        const customersElement = document.querySelector('.dashboard-stat-card.dashboard-stat-warning .dashboard-stat-value');
        if (customersElement) {
            customersElement.textContent = stats.activeCustomers.toLocaleString();
        }
        
        // Update shipments stat
        const shipmentsElement = document.querySelector('.dashboard-stat-card.dashboard-stat-info .dashboard-stat-value');
        if (shipmentsElement) {
            shipmentsElement.textContent = stats.todayShipments.toLocaleString();
        }
        
        // Update change indicators
        this.updateChangeIndicators(stats);
    },
    
    /**
     * Get realistic dashboard statistics
     */
    getDashboardStats: function() {
        return {
            revenue: 125430,
            activeOrders: 1247,
            activeCustomers: 89,
            todayShipments: 156,
            revenueChange: 12.5,
            ordersChange: 8.3,
            customersChange: 5.2,
            shipmentsChange: -2.1
        };
    },
    
    /**
     * Update change indicators for stats
     */
    updateChangeIndicators: function(stats) {
        const changeElements = document.querySelectorAll('.dashboard-stat-change');
        
        changeElements.forEach((element, index) => {
            const changes = [stats.revenueChange, stats.ordersChange, stats.customersChange, stats.shipmentsChange];
            const change = changes[index];
            
            if (change !== undefined) {
                const icon = element.querySelector('i');
                const value = element.querySelector('span');
                
                if (icon && value) {
                    icon.className = change >= 0 ? 'fas fa-arrow-up' : 'fas fa-arrow-down';
                    value.textContent = `${Math.abs(change)}%`;
                    
                    element.className = `dashboard-stat-change ${change >= 0 ? 'dashboard-positive' : 'dashboard-negative'}`;
                }
            }
        });
    },
    
    /**
     * Update recent activity with realistic data
     */
    updateRecentActivity: function() {
        const activities = this.getRecentActivities();
        const ordersContainer = document.querySelector('.dashboard-orders-list');
        
        if (!ordersContainer) return;
        
        ordersContainer.innerHTML = activities.map(activity => `
            <div class="dashboard-order-card dashboard-${activity.status}">
                <div class="dashboard-order-icon">
                    <i class="${activity.icon}"></i>
                </div>
                <div class="dashboard-order-details">
                    <h4>${activity.title}</h4>
                    <p>${activity.description}</p>
                    <div class="dashboard-order-meta">
                        <span class="dashboard-order-status">${this.getActivityStatusText(activity.status)}</span>
                        <span class="dashboard-order-time">${activity.time}</span>
                        ${activity.amount ? `<span class="dashboard-order-amount">${this.formatCurrency(activity.amount)}</span>` : ''}
                    </div>
                </div>
                <div class="dashboard-order-actions">
                    <button class="dashboard-order-action-btn" data-action="${activity.action}" data-id="${activity.id}">
                        <i class="fas fa-eye"></i>
                    </button>
                </div>
            </div>
        `).join('');
    },
    
    /**
     * Get realistic recent activities
     */
    getRecentActivities: function() {
        return [
            {
                id: 'TRK-2024-001',
                type: 'shipping',
                title: 'طلب شحن جديد #TRK-2024-001',
                description: 'تم إنشاء طلب شحن من الرياض إلى جدة - 25 كجم',
                status: 'new',
                time: 'منذ 5 دقائق',
                amount: 450,
                icon: 'fas fa-truck',
                action: 'view-order'
            },
            {
                id: 'WH-001',
                type: 'warehouse',
                title: 'تحديث مخزن الرياض الرئيسي',
                description: 'تم تحديث معلومات المخزن وإضافة 500 متر مربع مساحة تخزين',
                status: 'completed',
                time: 'منذ 15 دقيقة',
                icon: 'fas fa-warehouse',
                action: 'view-warehouse'
            },
            {
                id: 'CUS-2024-089',
                type: 'customs',
                title: 'تخليص جمركي مكتمل #CUS-2024-089',
                description: 'تم إكمال إجراءات التخليص الجمركي للشحنة من الصين',
                status: 'completed',
                time: 'منذ ساعة',
                amount: 1200,
                icon: 'fas fa-clipboard-check',
                action: 'view-customs'
            },
            {
                id: 'CUST-2024-045',
                type: 'customer',
                title: 'عميل جديد مسجل',
                description: 'شركة التقنية المتقدمة - تم التسجيل في خدمة الشحن الدولي',
                status: 'new',
                time: 'منذ ساعتين',
                icon: 'fas fa-user-plus',
                action: 'view-customer'
            },
            {
                id: 'TRK-2024-002',
                type: 'shipping',
                title: 'شحنة في الطريق #TRK-2024-002',
                description: 'شحنة من دبي إلى الرياض - في مرحلة النقل',
                status: 'pending',
                time: 'منذ 3 ساعات',
                amount: 780,
                icon: 'fas fa-shipping-fast',
                action: 'view-order'
            }
        ];
    },
    
    /**
     * Update performance metrics
     */
    updatePerformanceMetrics: function() {
        const metrics = this.getPerformanceMetrics();
        
        metrics.forEach((metric, index) => {
            const metricCard = document.querySelectorAll('.dashboard-metric-card')[index];
            if (metricCard) {
                const valueElement = metricCard.querySelector('.dashboard-metric-value');
                const progressFill = metricCard.querySelector('.dashboard-progress-fill');
                const progressText = metricCard.querySelector('.dashboard-progress-text');
                
                if (valueElement) valueElement.textContent = metric.value;
                if (progressFill) {
                    progressFill.style.width = `${metric.percentage}%`;
                    if (metric.color) progressFill.classList.add(metric.color);
                }
                if (progressText) progressText.textContent = `${metric.percentage}%`;
            }
        });
    },
    
    /**
     * Get performance metrics data
     */
    getPerformanceMetrics: function() {
        return [
            {
                value: '4.8/5',
                percentage: 96,
                color: null
            },
            {
                value: '2.3 أيام',
                percentage: 85,
                color: 'dashboard-success'
            },
            {
                value: '98.5%',
                percentage: 98.5,
                color: 'dashboard-warning'
            },
            {
                value: '87%',
                percentage: 87,
                color: 'dashboard-info'
            }
        ];
    },
    
    /**
     * Update notifications count
     */
    updateNotifications: function() {
        const notificationCount = this.getNotificationCount();
        const badgeElement = document.querySelector('.dashboard-notification-badge');
        
        if (badgeElement) {
            badgeElement.textContent = notificationCount;
            badgeElement.style.display = notificationCount > 0 ? 'flex' : 'none';
        }
    },
    
    /**
     * Get notification count
     */
    getNotificationCount: function() {
        return Math.floor(Math.random() * 8) + 1; // Random number between 1-8
    },
    
    /**
     * Initialize chart interactions
     */
    initializeCharts: function() {
        this.setupChartBars();
        this.setupPieChart();
    },
    
    /**
     * Setup interactive chart bars
     */
    setupChartBars: function() {
        const chartBars = document.querySelectorAll('.dashboard-chart-bar');
        
        chartBars.forEach(bar => {
            bar.addEventListener('mouseenter', () => {
                bar.style.transform = 'scaleY(1.1)';
            });
            
            bar.addEventListener('mouseleave', () => {
                bar.style.transform = 'scaleY(1)';
            });
        });
    },
    
    /**
     * Setup pie chart interactions
     */
    setupPieChart: function() {
        const pieChart = document.querySelector('.dashboard-pie-chart');
        if (pieChart) {
            pieChart.addEventListener('click', () => {
                this.showServiceBreakdown();
            });
        }
    },
    
    /**
     * Show service breakdown modal
     */
    showServiceBreakdown: function() {
        // This would show a detailed breakdown of services
        console.log('Showing service breakdown...');
    },
    
    /**
     * Handle chart period changes
     */
    handleChartPeriodChange: function(period) {
        // Remove active class from all period buttons
        document.querySelectorAll('.dashboard-chart-period').forEach(btn => {
            btn.classList.remove('dashboard-active');
        });
        
        // Add active class to clicked button
        const activeButton = document.querySelector(`[data-period="${period}"]`);
        if (activeButton) {
            activeButton.classList.add('dashboard-active');
        }
        
        // Update chart data based on period
        this.updateChartDataForPeriod(period);
    },
    
    /**
     * Update chart data for specific period
     */
    updateChartDataForPeriod: function(period) {
        console.log(`Updating chart data for period: ${period}`);
        
        // Simulate chart data update
        const chartBars = document.querySelectorAll('.dashboard-chart-bar');
        chartBars.forEach((bar, index) => {
            const newHeight = Math.random() * 100;
            setTimeout(() => {
                bar.style.height = `${newHeight}%`;
            }, index * 100);
        });
    },
    
    /**
     * Handle quick action clicks
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
            case 'customers':
                Router.navigate('customers');
                break;
            case 'warehouses':
                Router.navigate('warehouses');
                break;
        }
    },
    
    /**
     * Handle order action clicks
     */
    handleOrderAction: function(action, id) {
        switch (action) {
            case 'view-order':
                Router.navigate('order-details', { id: id });
                break;
            case 'view-warehouse':
                Router.navigate('warehouse-details', { id: id });
                break;
            case 'view-customs':
                Router.navigate('customs-details', { id: id });
                break;
            case 'view-customer':
                Router.navigate('customer-details', { id: id });
                break;
        }
    },
    
    /**
     * Start real-time updates
     */
    startRealTimeUpdates: function() {
        // Update notifications every 30 seconds
        setInterval(() => {
            this.updateNotifications();
        }, 30000);
        
        // Update stats every 2 minutes
        setInterval(() => {
            this.updateStatsCards();
        }, 120000);
    },
    
    /**
     * Get activity status text in Arabic
     */
    getActivityStatusText: function(status) {
        const statusMap = {
            'new': 'جديد',
            'pending': 'قيد التنفيذ',
            'completed': 'مكتمل',
            'cancelled': 'ملغي'
        };
        return statusMap[status] || status;
    },
    
    /**
     * Format currency
     */
    formatCurrency: function(amount) {
        return `₺${amount.toLocaleString()}`;
    },
    
    /**
     * Set up event listeners
     */
    setupEventListeners: function() {
        // Handle quick action clicks
        document.addEventListener('click', (e) => {
            if (e.target.closest('.dashboard-action-card')) {
                const actionCard = e.target.closest('.dashboard-action-card');
                const action = actionCard.dataset.page;
                if (action) {
                    this.handleQuickAction(action);
                }
            }
        });
        
        // Handle chart period changes
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('dashboard-chart-period')) {
                const period = e.target.dataset.period;
                if (period) {
                    this.handleChartPeriodChange(period);
                }
            }
        });
        
        // Handle order action clicks
        document.addEventListener('click', (e) => {
            if (e.target.closest('.dashboard-order-action-btn')) {
                const actionBtn = e.target.closest('.dashboard-order-action-btn');
                const action = actionBtn.dataset.action;
                const id = actionBtn.dataset.id;
                if (action && id) {
                    this.handleOrderAction(action, id);
                }
            }
        });
        
        // Handle header actions
        document.addEventListener('click', (e) => {
            if (e.target.closest('.dashboard-header-action')) {
                const actionBtn = e.target.closest('.dashboard-header-action');
                const action = actionBtn.dataset.action;
                
                switch (action) {
                    case 'menu':
                        this.toggleSideMenu();
                        break;
                    case 'search':
                        this.openSearch();
                        break;
                    case 'notifications':
                        this.openNotifications();
                        break;
                }
            }
        });
    },
    
    /**
     * Toggle side menu
     */
    toggleSideMenu: function() {
        console.log('Toggle side menu');
        // Implementation for side menu toggle
    },
    
    /**
     * Open search
     */
    openSearch: function() {
        console.log('Open search');
        // Implementation for search functionality
    },
    
    /**
     * Open notifications
     */
    openNotifications: function() {
        console.log('Open notifications');
        // Implementation for notifications panel
    }
};

// Attach to window object
window.DashboardController = DashboardController; 

// Profile Drawer Logic
const profileDrawer = document.getElementById('profileDrawer');
const profileDrawerOverlay = document.getElementById('profileDrawerOverlay');

function openProfileDrawer() {
    if (profileDrawer && profileDrawerOverlay) {
        profileDrawer.classList.add('open');
        profileDrawerOverlay.classList.add('open');
        profileDrawerOverlay.style.display = 'block';
        document.body.style.overflow = 'hidden';
        // Render profile content
        if (window.ProfileController) {
            window.ProfileController.init();
        }
    }
}

function closeProfileDrawer() {
    if (profileDrawer && profileDrawerOverlay) {
        profileDrawer.classList.remove('open');
        profileDrawerOverlay.classList.remove('open');
        setTimeout(() => { profileDrawerOverlay.style.display = 'none'; }, 300);
        document.body.style.overflow = '';
    }
}

// Make function globally accessible
window.closeProfileDrawer = closeProfileDrawer;

// Open drawer on menu icon click
const dashboardMenuBtn = document.querySelector('.dashboard-header-action[data-action="menu"]');
if (dashboardMenuBtn) {
    dashboardMenuBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openProfileDrawer();
    });
}
// Close drawer on overlay click
if (profileDrawerOverlay) {
    profileDrawerOverlay.addEventListener('click', closeProfileDrawer);
}

// Close drawer on close button click
const closeDrawerBtn = document.querySelector('[data-action="close-drawer"]');
if (closeDrawerBtn) {
    closeDrawerBtn.addEventListener('click', closeProfileDrawer);
}

// Close drawer on ESC
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && profileDrawer.classList.contains('open')) {
        closeProfileDrawer();
    }
});
// Optionally, add a close button inside the drawer if needed 