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
        
        // Initialize floating filter
        this.initFloatingFilter();
        
        // Reconnect menu buttons for drawer functionality
        if (typeof DrawerHelper !== 'undefined') {
            DrawerHelper.reconnectMenuButtons();
        }
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
        const totalOrders = 2847;
        const newOrders = 268;
        const pendingOrders = 423;
        const completedOrders = 2156;
        
        // Update stats in the DOM
        const statsElements = document.querySelectorAll('.orders-stat-value');
        if (statsElements.length >= 4) {
            statsElements[0].textContent = totalOrders.toLocaleString(); // Total orders
            statsElements[1].textContent = completedOrders.toLocaleString(); // Completed orders
            statsElements[2].textContent = pendingOrders.toLocaleString(); // Pending orders
            statsElements[3].textContent = newOrders.toLocaleString(); // New orders
        }
    },

    /**
     * Update orders list
     */
    updateOrdersList: function() {
        const ordersContainer = document.querySelector('.orders-grid');
        if (!ordersContainer) return;
        
        // Create comprehensive mock orders with realistic data
        const mockOrders = [
            {
                id: 'WH-2024-1253',
                type: 'warehouse',
                typeText: 'تخزين',
                title: 'طلب تخزين #WH-2024-1253',
                description: 'منتجات غذائية - 3 طن - مخزن الرياض الرئيسي - مدة التخزين: 6 أشهر',
                status: 'new',
                statusText: 'جديد',
                client: 'شركة التقنية المتقدمة للتجارة',
                location: 'الرياض، المملكة العربية السعودية',
                date: '15 يناير 2024',
                priority: 'high',
                priorityText: 'عالية',
                time: 'منذ ساعتين',
                icon: 'fas fa-warehouse',
                statusIcon: 'fas fa-clock',
                amount: '12,500 ريال'
            },
            {
                id: 'CUS-2024-4587',
                type: 'customs',
                typeText: 'تخليص جمركي',
                title: 'طلب تخليص #CUS-2024-4587',
                description: 'معدات إلكترونية - ميناء جدة الإسلامي - 5 حاويات - قيمة الشحنة: 250,000 ريال',
                status: 'pending',
                statusText: 'قيد التنفيذ',
                client: 'مصنع الأثاث الحديث للتصنيع',
                location: 'ميناء جدة الإسلامي',
                date: '12 يناير 2024',
                priority: 'medium',
                priorityText: 'متوسطة',
                time: 'منذ يوم واحد',
                icon: 'fas fa-clipboard-list',
                statusIcon: 'fas fa-spinner',
                amount: '8,750 ريال'
            },
            {
                id: 'SH-2024-8975',
                type: 'shipping',
                typeText: 'شحن',
                title: 'طلب شحن #SH-2024-8975',
                description: 'الرياض - الدمام - 2 طن - شحن بري - خدمة التوصيل السريع',
                status: 'completed',
                statusText: 'مكتمل',
                client: 'شركة النقل السريع للخدمات اللوجستية',
                location: 'الرياض → الدمام',
                date: '10 يناير 2024',
                priority: 'low',
                priorityText: 'منخفضة',
                time: 'منذ 3 أيام',
                icon: 'fas fa-truck',
                statusIcon: 'fas fa-check-circle',
                amount: '3,200 ريال'
            },
            {
                id: 'PKG-2024-6321',
                type: 'packaging',
                typeText: 'تغليف',
                title: 'طلب تغليف #PKG-2024-6321',
                description: 'منتجات زجاجية - خدمة تغليف فاخر - 150 قطعة - تغليف مضاد للكسر',
                status: 'new',
                statusText: 'جديد',
                client: 'شركة الزجاج المتطور للصناعات',
                location: 'مخزن الرياض الرئيسي',
                date: '14 يناير 2024',
                priority: 'medium',
                priorityText: 'متوسطة',
                time: 'منذ 4 ساعات',
                icon: 'fas fa-boxes',
                statusIcon: 'fas fa-clock',
                amount: '2,800 ريال'
            },
            {
                id: 'LC-2024-7890',
                type: 'lc',
                typeText: 'اعتمادات مستندية',
                title: 'طلب اعتماد #LC-2024-7890',
                description: 'اعتماد مستندي - بنك الرياض - 50,000 ريال - استيراد معدات صناعية',
                status: 'pending',
                statusText: 'قيد التنفيذ',
                client: 'شركة الاستيراد العالمية للتجارة',
                location: 'بنك الرياض',
                date: '13 يناير 2024',
                priority: 'high',
                priorityText: 'عالية',
                time: 'منذ يومين',
                icon: 'fas fa-file-invoice-dollar',
                statusIcon: 'fas fa-spinner',
                amount: '1,250 ريال'
            },
            {
                id: 'LM-2024-4567',
                type: 'last-mile',
                typeText: 'توصيل نهائي',
                title: 'طلب توصيل #LM-2024-4567',
                description: 'توصيل منزلي - الرياض - 50 طرد - خدمة التوصيل في نفس اليوم',
                status: 'completed',
                statusText: 'مكتمل',
                client: 'متجر الأزياء الأنيق للتجارة الإلكترونية',
                location: 'الرياض - حي النرجس',
                date: '11 يناير 2024',
                priority: 'low',
                priorityText: 'منخفضة',
                time: 'منذ 4 أيام',
                icon: 'fas fa-shipping-fast',
                statusIcon: 'fas fa-check-circle',
                amount: '1,800 ريال'
            },
            {
                id: 'WH-2024-9876',
                type: 'warehouse',
                typeText: 'تخزين',
                title: 'طلب تخزين #WH-2024-9876',
                description: 'أثاث منزلي - 5 طن - مخزن جدة - مدة التخزين: 3 أشهر - تخزين مكيف',
                status: 'pending',
                statusText: 'قيد التنفيذ',
                client: 'شركة الأثاث الفاخر للاستيراد',
                location: 'جدة، المملكة العربية السعودية',
                date: '16 يناير 2024',
                priority: 'medium',
                priorityText: 'متوسطة',
                time: 'منذ 6 ساعات',
                icon: 'fas fa-warehouse',
                statusIcon: 'fas fa-spinner',
                amount: '8,900 ريال'
            },
            {
                id: 'SH-2024-5432',
                type: 'shipping',
                typeText: 'شحن',
                title: 'طلب شحن #SH-2024-5432',
                description: 'الدمام - الرياض - 1.5 طن - شحن جوي - خدمة الشحن السريع',
                status: 'new',
                statusText: 'جديد',
                client: 'شركة الأدوية المتقدمة للصناعات الطبية',
                location: 'الدمام → الرياض',
                date: '17 يناير 2024',
                priority: 'high',
                priorityText: 'عالية',
                time: 'منذ ساعة واحدة',
                icon: 'fas fa-truck',
                statusIcon: 'fas fa-clock',
                amount: '4,500 ريال'
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
            <div class="orders-order-card orders-${order.status}" data-action="navigate" data-page="order-details" data-order-id="${order.id}">
                <div class="orders-order-header">
                    <div class="orders-order-type">
                        <i class="${order.icon}"></i>
                        <span>${order.typeText}</span>
                    </div>
                    <div class="orders-order-status orders-${order.status}">
                        <i class="${order.statusIcon}"></i>
                        <span>${order.statusText}</span>
                    </div>
                </div>
                
                <div class="orders-order-content">
                    <h4 class="orders-order-title">${order.title}</h4>
                    <p class="orders-order-description">${order.description}</p>
                    
                    <div class="orders-order-details">
                        <div class="orders-detail-item">
                            <i class="fas fa-user"></i>
                            <span>${order.client}</span>
                        </div>
                        <div class="orders-detail-item">
                            <i class="fas fa-map-marker-alt"></i>
                            <span>${order.location}</span>
                        </div>
                        <div class="orders-detail-item">
                            <i class="fas fa-calendar"></i>
                            <span>${order.date}</span>
                        </div>
                        <div class="orders-detail-item">
                            <i class="fas fa-money-bill-wave"></i>
                            <span>${order.amount}</span>
                        </div>
                    </div>
                </div>
                
                <div class="orders-order-footer">
                    <div class="orders-order-priority orders-${order.priority}">
                        <i class="fas fa-${this.getPriorityIcon(order.priority)}"></i>
                        <span>${order.priorityText}</span>
                    </div>
                    <div class="orders-order-time">
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
        // Calculate counts for each status
        const totalOrders = 2847;
        const allCount = totalOrders;
        const newCount = 268;
        const pendingCount = 423;
        const completedCount = 2156;
        
        // Update tab counts
        const tabCounts = document.querySelectorAll('.orders-filter-count');
        if (tabCounts.length >= 4) {
            tabCounts[0].textContent = allCount.toLocaleString(); // All
            tabCounts[1].textContent = newCount.toLocaleString(); // New
            tabCounts[2].textContent = pendingCount.toLocaleString(); // Pending
            tabCounts[3].textContent = completedCount.toLocaleString(); // Completed
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
        // Update any additional stats that might be displayed
        const totalOrdersElement = document.querySelector('.total-orders');
        if (totalOrdersElement) {
            totalOrdersElement.textContent = '2,847';
        }
        
        const monthlyOrdersElement = document.querySelector('.monthly-orders');
        if (monthlyOrdersElement) {
            monthlyOrdersElement.textContent = '268';
        }
    },

    /**
     * Initialize search functionality
     */
    initSearch: function() {
        const searchInput = document.querySelector('.orders-search-input');
        const searchClear = document.querySelector('.orders-search-clear');
        
        if (!searchInput) return;
        
        // Handle search input
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            this.filterOrders(searchTerm);
            
            // Show/hide clear button
            if (searchClear) {
                if (searchTerm.length > 0) {
                    searchClear.classList.add('visible');
                } else {
                    searchClear.classList.remove('visible');
                }
            }
        });
        
        // Handle clear search
        if (searchClear) {
            searchClear.addEventListener('click', () => {
                searchInput.value = '';
                searchClear.classList.remove('visible');
                this.filterOrders('');
            });
        }
    },

    /**
     * Initialize filters
     */
    initFilters: function() {
        // Status filter buttons
        document.querySelectorAll('.orders-filter-btn[data-filter]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const filter = e.target.closest('.orders-filter-btn').dataset.filter;
                this.handleStatusFilter(filter);
            });
        });
    },

    /**
     * Initialize floating filter
     */
    initFloatingFilter: function() {
        const floatingFilterBtn = document.querySelector('.orders-floating-filter-btn');
        const filtersModal = document.querySelector('.orders-filters-modal');
        const modalOverlay = document.querySelector('.orders-filters-modal-overlay');
        const modalClose = document.querySelector('.orders-filters-modal-close');
        
        if (!floatingFilterBtn || !filtersModal) return;
        
        // Open modal
        floatingFilterBtn.addEventListener('click', () => {
            this.openFiltersModal();
        });
        
        // Close modal
        if (modalOverlay) {
            modalOverlay.addEventListener('click', () => {
                this.closeFiltersModal();
            });
        }
        
        if (modalClose) {
            modalClose.addEventListener('click', () => {
                this.closeFiltersModal();
            });
        }
        
        // Close on ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && filtersModal.classList.contains('active')) {
                this.closeFiltersModal();
            }
        });
        
        // Initialize modal filters
        this.initModalFilters();
    },

    /**
     * Open filters modal
     */
    openFiltersModal: function() {
        const filtersModal = document.querySelector('.orders-filters-modal');
        if (filtersModal) {
            filtersModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    },

    /**
     * Close filters modal
     */
    closeFiltersModal: function() {
        const filtersModal = document.querySelector('.orders-filters-modal');
        if (filtersModal) {
            filtersModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    },

    /**
     * Initialize modal filters
     */
    initModalFilters: function() {
        // Service type filters
        document.querySelectorAll('.orders-option input[name="serviceType"]').forEach(input => {
            input.addEventListener('change', (e) => {
                this.handleModalFilterChange(e);
            });
        });
        
        // Time period filters
        document.querySelectorAll('.orders-option input[name="timePeriod"]').forEach(input => {
            input.addEventListener('change', (e) => {
                this.handleModalFilterChange(e);
            });
        });
        
        // Priority filters
        document.querySelectorAll('.orders-option input[name="priority"]').forEach(input => {
            input.addEventListener('change', (e) => {
                this.handleModalFilterChange(e);
            });
        });
        
        // Location filters
        document.querySelectorAll('.orders-option input[name="location"]').forEach(input => {
            input.addEventListener('change', (e) => {
                this.handleModalFilterChange(e);
            });
        });
        
        // Price range inputs
        const priceFrom = document.getElementById('priceFrom');
        const priceTo = document.getElementById('priceTo');
        const priceRangeMin = document.getElementById('priceRangeMin');
        const priceRangeMax = document.getElementById('priceRangeMax');
        
        if (priceFrom && priceTo && priceRangeMin && priceRangeMax) {
            // Sync range sliders with inputs
            priceRangeMin.addEventListener('input', (e) => {
                priceFrom.value = e.target.value;
                this.handleModalFilterChange(e);
            });
            
            priceRangeMax.addEventListener('input', (e) => {
                priceTo.value = e.target.value;
                this.handleModalFilterChange(e);
            });
            
            // Sync inputs with range sliders
            priceFrom.addEventListener('input', (e) => {
                priceRangeMin.value = e.target.value;
                this.handleModalFilterChange(e);
            });
            
            priceTo.addEventListener('input', (e) => {
                priceRangeMax.value = e.target.value;
                this.handleModalFilterChange(e);
            });
        }
        
        // Modal action buttons
        document.querySelectorAll('[data-action="clear-filters"]').forEach(btn => {
            btn.addEventListener('click', () => {
                this.clearModalFilters();
            });
        });
        
        document.querySelectorAll('[data-action="apply-filters"]').forEach(btn => {
            btn.addEventListener('click', () => {
                this.applyModalFilters();
            });
        });
    },

    /**
     * Handle modal filter changes
     */
    handleModalFilterChange: function(event) {
        const input = event.target;
        const option = input.closest('.orders-option');
        
        if (option) {
            // Update visual state
            if (input.checked) {
                option.classList.add('selected');
            } else {
                option.classList.remove('selected');
            }
        }
    },

    /**
     * Clear modal filters
     */
    clearModalFilters: function() {
        // Uncheck all filter inputs
        document.querySelectorAll('.orders-option input').forEach(input => {
            input.checked = false;
            input.closest('.orders-option').classList.remove('selected');
        });
        
        // Reset price range
        const priceFrom = document.getElementById('priceFrom');
        const priceTo = document.getElementById('priceTo');
        const priceRangeMin = document.getElementById('priceRangeMin');
        const priceRangeMax = document.getElementById('priceRangeMax');
        
        if (priceFrom && priceTo && priceRangeMin && priceRangeMax) {
            priceFrom.value = '';
            priceTo.value = '';
            priceRangeMin.value = 0;
            priceRangeMax.value = 50000;
        }
        
        // Show all orders
        this.showAllOrders();
    },

    /**
     * Apply modal filters
     */
    applyModalFilters: function() {
        this.applyAllFilters();
        this.closeFiltersModal();
    },

    /**
     * Apply all filters
     */
    applyAllFilters: function() {
        const orderCards = document.querySelectorAll('.orders-order-card');
        
        orderCards.forEach(card => {
            let shouldShow = true;
            
            // Check status filter
            const activeStatus = document.querySelector('.orders-filter-btn.orders-active').dataset.filter;
            if (activeStatus !== 'all' && !card.classList.contains(`orders-${activeStatus}`)) {
                shouldShow = false;
            }
            
            // Check service type filters
            const selectedServiceTypes = Array.from(document.querySelectorAll('.orders-option input[name="serviceType"]:checked'))
                .map(input => input.value);
            
            if (selectedServiceTypes.length > 0) {
                const cardServiceType = this.getOrderServiceType(card);
                if (!selectedServiceTypes.includes(cardServiceType)) {
                    shouldShow = false;
                }
            }
            
            // Check priority filters
            const selectedPriorities = Array.from(document.querySelectorAll('.orders-option input[name="priority"]:checked'))
                .map(input => input.value);
            
            if (selectedPriorities.length > 0) {
                const cardPriority = this.getOrderPriority(card);
                if (!selectedPriorities.includes(cardPriority)) {
                    shouldShow = false;
                }
            }
            
            // Check location filters
            const selectedLocations = Array.from(document.querySelectorAll('.orders-option input[name="location"]:checked'))
                .map(input => input.value);
            
            if (selectedLocations.length > 0) {
                const cardLocation = this.getOrderLocation(card);
                if (!selectedLocations.includes(cardLocation)) {
                    shouldShow = false;
                }
            }
            
            // Check price range
            const priceFrom = document.getElementById('priceFrom');
            const priceTo = document.getElementById('priceTo');
            
            if (priceFrom && priceTo && (priceFrom.value || priceTo.value)) {
                const cardAmount = this.getOrderAmount(card);
                const fromPrice = priceFrom.value ? parseFloat(priceFrom.value) : 0;
                const toPrice = priceTo.value ? parseFloat(priceTo.value) : Infinity;
                
                if (cardAmount < fromPrice || cardAmount > toPrice) {
                    shouldShow = false;
                }
            }
            
            // Show/hide card
            card.style.display = shouldShow ? 'block' : 'none';
        });
    },

    /**
     * Get order service type from card
     */
    getOrderServiceType: function(card) {
        const typeText = card.querySelector('.orders-order-type span').textContent;
        const serviceTypeMap = {
            'تخزين': 'warehouse',
            'شحن': 'shipping',
            'تخليص جمركي': 'customs',
            'تغليف': 'packaging',
            'اعتمادات مستندية': 'lc',
            'توصيل نهائي': 'last-mile'
        };
        return serviceTypeMap[typeText] || '';
    },

    /**
     * Get order priority from card
     */
    getOrderPriority: function(card) {
        const priorityElement = card.querySelector('.orders-order-priority');
        if (priorityElement.classList.contains('orders-high')) return 'high';
        if (priorityElement.classList.contains('orders-medium')) return 'medium';
        if (priorityElement.classList.contains('orders-low')) return 'low';
        return '';
    },

    /**
     * Get order location from card
     */
    getOrderLocation: function(card) {
        const locationText = card.querySelector('.orders-detail-item:nth-child(2) span').textContent;
        if (locationText.includes('الرياض')) return 'riyadh';
        if (locationText.includes('جدة')) return 'jeddah';
        if (locationText.includes('الدمام')) return 'dammam';
        return 'other';
    },

    /**
     * Get order amount from card
     */
    getOrderAmount: function(card) {
        const amountText = card.querySelector('.orders-detail-item:nth-child(4) span').textContent;
        const amount = amountText.replace(/[^\d]/g, '');
        return parseInt(amount) || 0;
    },

    /**
     * Show all orders
     */
    showAllOrders: function() {
        const orderCards = document.querySelectorAll('.orders-order-card');
        orderCards.forEach(card => {
            card.style.display = 'block';
        });
    },

    /**
     * Filter orders by search term
     */
    filterOrders: function(searchTerm) {
        const orderCards = document.querySelectorAll('.orders-order-card');
        
        orderCards.forEach(card => {
            const title = card.querySelector('.orders-order-title').textContent.toLowerCase();
            const description = card.querySelector('.orders-order-description').textContent.toLowerCase();
            const client = card.querySelector('.orders-detail-item span').textContent.toLowerCase();
            
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
        document.querySelectorAll('.orders-filter-btn[data-filter]').forEach(btn => {
            btn.classList.remove('orders-active');
        });
        
        const activeBtn = document.querySelector(`[data-filter="${status}"]`);
        if (activeBtn) {
            activeBtn.classList.add('orders-active');
        }
        
        // Filter orders
        const orderCards = document.querySelectorAll('.orders-order-card');
        
        orderCards.forEach(card => {
            if (status === 'all' || card.classList.contains(`orders-${status}`)) {
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
            const orderCard = e.target.closest('.orders-order-card');
            if (orderCard && orderCard.dataset.action === 'navigate') {
                const orderId = orderCard.dataset.orderId;
                console.log(`Navigating to order details: ${orderId}`);
                Router.navigate('order-details');
            }
        });
        
        // Handle section action buttons
        document.addEventListener('click', (e) => {
            const actionBtn = e.target.closest('[data-action]');
            if (!actionBtn) return;
            
            const action = actionBtn.dataset.action;
            
            switch (action) {
                case 'export-orders':
                    this.exportOrders();
                    break;
                case 'new-order':
                    this.createNewOrder();
                    break;
            }
        });
    },

    /**
     * Export orders
     */
    exportOrders: function() {
        console.log('Exporting orders...');
        // Implementation for exporting orders
        alert('جاري تصدير الطلبات...');
    },

    /**
     * Create new order
     */
    createNewOrder: function() {
        console.log('Creating new order...');
        // Implementation for creating new order
        Router.navigate('order-form');
    }
};

// Attach to window for router access
window.OrdersController = OrdersController; 