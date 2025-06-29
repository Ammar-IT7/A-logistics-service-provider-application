/**
 * Home page controller
 */
console.log('Loading home.js file...');

const HomeController = {
    /**
     * Initialize the home page
     */
    init: function() {
        console.log('Home page initialized');
        this.renderHomeData();
        this.setupEventListeners();
        this.updateStats();
    },
    
    /**
     * Render home page data from state
     */
    renderHomeData: function() {
        this.updateWelcomeMessage();
        this.updateStatsCards();
        this.updateRecentOrders();
        this.updateServiceCounts();
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
        const stats = State.get('stats');
        const warehouses = State.get('warehouses');
        const shippingServices = State.get('shippingServices');
        const customsServices = State.get('customsServices');
        const packagingServices = State.get('packagingServices');
        
        // Calculate active services count
        const activeServices = [
            ...warehouses.filter(w => w.status === 'active'),
            ...shippingServices.filter(s => s.status === 'active'),
            ...customsServices.filter(c => c.status === 'in_progress' || c.status === 'pending'),
            ...packagingServices.filter(p => p.status === 'active')
        ].length;
        
        // Update stats in the DOM
        const statsElements = document.querySelectorAll('.func-stat-value');
        if (statsElements.length >= 3) {
            statsElements[0].textContent = activeServices; // Active services
            statsElements[1].textContent = stats.newRequests; // New requests
            statsElements[2].textContent = stats.averageRating; // Average rating
        }
    },
    
    /**
     * Update service counts in service cards
     */
    updateServiceCounts: function() {
        const warehouses = State.get('warehouses');
        const customsServices = State.get('customsServices');
        const shippingServices = State.get('shippingServices');
        const packagingServices = State.get('packagingServices');
        const lcServices = State.get('lcServices');
        
        // Update warehouse count
        const warehouseBadge = document.querySelector('[data-page="mywarehouses"] .func-service-badge');
        if (warehouseBadge) {
            warehouseBadge.textContent = warehouses.length;
        }
        
        // Update customs count
        const customsBadge = document.querySelector('[data-page="mycustoms"] .func-service-badge');
        if (customsBadge) {
            customsBadge.textContent = customsServices.length;
        }
        
        // Update shipping count
        const shippingBadge = document.querySelector('[data-page="myshipping"] .func-service-badge');
        if (shippingBadge) {
            shippingBadge.textContent = shippingServices.length;
        }
        
        // Update packaging count
        const packagingBadge = document.querySelector('[data-page="my-packaging"] .func-service-badge');
        if (packagingBadge) {
            packagingBadge.textContent = packagingServices.length;
        }
        
        // Update LC services count
        const lcBadge = document.querySelector('[data-page="my-lc-services"] .func-service-badge');
        if (lcBadge) {
            lcBadge.textContent = lcServices.length;
        }
    },
    
    /**
     * Update recent orders section
     */
    updateRecentOrders: function() {
        const ordersContainer = document.querySelector('.func-orders-list');
        if (!ordersContainer) return;
        
        // Get recent orders from different services
        const warehouses = State.get('warehouses');
        const customsServices = State.get('customsServices');
        const shippingServices = State.get('shippingServices');
        
        // Create mock recent orders
        const recentOrders = [
            {
                id: 1,
                type: 'warehouse',
                title: 'طلب تخزين #1253',
                description: 'منتجات غذائية - 3 طن',
                status: 'new',
                time: 'منذ ساعتين',
                icon: 'fas fa-box'
            },
            {
                id: 2,
                type: 'customs',
                title: 'طلب تخليص #4587',
                description: 'معدات إلكترونية - ميناء جدة',
                status: 'pending',
                time: 'منذ يوم واحد',
                icon: 'fas fa-clipboard-list'
            },
            {
                id: 3,
                type: 'shipping',
                title: 'طلب شحن #8975',
                description: 'الرياض - الدمام',
                status: 'completed',
                time: 'منذ 3 أيام',
                icon: 'fas fa-truck-loading'
            }
        ];
        
        ordersContainer.innerHTML = recentOrders.map(order => `
            <div class="func-order-card ${order.status}">
                <div class="func-order-icon">
                    <i class="${order.icon}"></i>
                </div>
                <div class="func-order-details">
                    <h4>${order.title}</h4>
                    <p>${order.description}</p>
                    <div class="func-order-meta">
                        <span class="func-order-status">${this.getOrderStatusText(order.status)}</span>
                        <span class="func-order-time">${order.time}</span>
                    </div>
                </div>
            </div>
        `).join('');
    },
    
    /**
     * Get order status text in Arabic
     */
    getOrderStatusText: function(status) {
        const statusMap = {
            'new': 'جديد',
            'pending': 'قيد التنفيذ',
            'completed': 'مكتمل',
            'cancelled': 'ملغي'
        };
        return statusMap[status] || status;
    },
    
    /**
     * Update overall stats
     */
    updateStats: function() {
        const stats = State.get('stats');
        
        // Update any additional stats that might be displayed
        const totalOrdersElement = document.querySelector('.total-orders');
        if (totalOrdersElement) {
            totalOrdersElement.textContent = stats.totalOrders;
        }
        
        const monthlyRevenueElement = document.querySelector('.monthly-revenue');
        if (monthlyRevenueElement) {
            monthlyRevenueElement.textContent = stats.monthlyRevenue.toLocaleString();
        }
    },
    
    /**
     * Handle quick actions
     */
    handleQuickAction: function(action) {
        switch (action) {
            case 'add-service':
                this.showAddServiceModal();
                break;
            case 'view-all-orders':
                Router.navigate('orders');
                break;
            case 'view-all-services':
                Router.navigate('services');
                break;
            default:
                Toast.show('إجراء سريع', 'سيتم تنفيذ الإجراء قريباً', 'info');
        }
    },
    
    /**
     * Show add service modal
     */
    showAddServiceModal: function() {
        const modalContent = `
            <div class="modal-header">
                <h3>إضافة خدمة جديدة</h3>
                <button class="modal-close" data-action="close-modal">&times;</button>
            </div>
            <div class="modal-body">
                <div class="func-service-options">
                    <div class="func-service-option" data-action="navigate" data-page="warehouse-form">
                        <i class="fas fa-warehouse"></i>
                        <span>مخزن</span>
                    </div>
                    <div class="func-service-option" data-action="navigate" data-page="shipping-form">
                        <i class="fas fa-truck"></i>
                        <span>شحن</span>
                    </div>
                    <div class="func-service-option" data-action="navigate" data-page="customs-form">
                        <i class="fas fa-clipboard-check"></i>
                        <span>تخليص جمركي</span>
                    </div>
                    <div class="func-service-option" data-action="navigate" data-page="packaging-form">
                        <i class="fas fa-box"></i>
                        <span>تغليف</span>
                    </div>
                </div>
            </div>
        `;
        
        Modal.show('add-service-modal', modalContent);
    },
    
    /**
     * Set up event listeners
     */
    setupEventListeners: function() {
        const page = document.getElementById('home');
        if (!page) return;
        
        // Handle service card clicks
        page.addEventListener('click', (e) => {
            const serviceCard = e.target.closest('.func-service-card');
            if (serviceCard) {
                const pageName = serviceCard.dataset.page;
                if (pageName) {
                    Router.navigate(pageName);
                }
            }
        });
        
        // Handle quick action buttons
        page.addEventListener('click', (e) => {
            const actionButton = e.target.closest('.func-action-card');
            if (actionButton) {
                const action = actionButton.dataset.action;
                if (action) {
                    this.handleQuickAction(action);
                }
            }
        });
        
        // Handle "view all" links
        page.addEventListener('click', (e) => {
            const viewAllLink = e.target.closest('.func-section-link');
            if (viewAllLink) {
                e.preventDefault();
                const section = viewAllLink.closest('.func-section-container');
                if (section) {
                    const sectionTitle = section.querySelector('.func-section-title').textContent;
                    if (sectionTitle.includes('خدماتك')) {
                        Router.navigate('services');
                    } else if (sectionTitle.includes('آخر الطلبات')) {
                        Router.navigate('orders');
                    }
                }
            }
        });
        
        // Handle notification button
        const notificationButton = page.querySelector('[data-action="notifications"]');
        if (notificationButton) {
            notificationButton.addEventListener('click', (e) => {
                e.preventDefault();
                Router.navigate('notifications');
            });
        }
        
        // Handle menu button
        const menuButton = page.querySelector('[data-action="menu"]');
        if (menuButton) {
            menuButton.addEventListener('click', (e) => {
                e.preventDefault();
                Router.navigate('profile');
            });
        }
    }
};

// Debug: Check if HomeController is properly declared
console.log('HomeController declared:', typeof HomeController !== 'undefined');
console.log('HomeController in window:', typeof window.HomeController !== 'undefined');

// Explicitly attach to global scope
window.HomeController = HomeController;
console.log('HomeController attached to window:', typeof window.HomeController !== 'undefined');