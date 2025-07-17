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
        const statsElements = document.querySelectorAll('.orders-stat-value');
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
        const stats = State.get('stats') || {};
        
        // Calculate counts for each status
        const totalOrders = stats.totalOrders || 0;
        const allCount = totalOrders;
        const newCount = Math.floor(totalOrders * 0.3); // 30% new
        const pendingCount = Math.floor(totalOrders * 0.4); // 40% pending
        const completedCount = Math.floor(totalOrders * 0.3); // 30% completed
        
        // Update tab counts
        const tabCounts = document.querySelectorAll('.orders-filter-count');
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
        
        // Advanced filters toggle
        const toggleBtn = document.querySelector('.orders-toggle-btn');
        const advancedPanel = document.querySelector('.orders-advanced-panel');
        
        if (toggleBtn && advancedPanel) {
            toggleBtn.addEventListener('click', () => {
                this.toggleAdvancedFilters(toggleBtn, advancedPanel);
            });
        }
        
        // Advanced filter options
        document.querySelectorAll('.orders-option input').forEach(input => {
            input.addEventListener('change', (e) => {
                this.handleAdvancedFilterChange(e);
            });
        });
        
        // Advanced filter actions
        document.querySelectorAll('[data-action]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = e.target.closest('[data-action]').dataset.action;
                this.handleFilterAction(action);
            });
        });
    },

    /**
     * Toggle advanced filters panel
     */
    toggleAdvancedFilters: function(toggleBtn, panel) {
        const isActive = panel.classList.contains('active');
        
        if (isActive) {
            panel.classList.remove('active');
            toggleBtn.classList.remove('active');
        } else {
            panel.classList.add('active');
            toggleBtn.classList.add('active');
        }
    },

    /**
     * Handle advanced filter changes
     */
    handleAdvancedFilterChange: function(event) {
        const input = event.target;
        const option = input.closest('.orders-option');
        
        // Update visual state
        if (input.checked) {
            option.classList.add('selected');
        } else {
            option.classList.remove('selected');
        }
        
        // Update active filters display
        this.updateActiveFilters();
    },

    /**
     * Update active filters display
     */
    updateActiveFilters: function() {
        const activeFiltersContainer = document.querySelector('.orders-active-filters');
        if (!activeFiltersContainer) return;
        
        const activeFilters = [];
        
        // Get status filter
        const activeStatusBtn = document.querySelector('.orders-filter-btn.orders-active');
        if (activeStatusBtn) {
            const statusText = activeStatusBtn.querySelector('.orders-filter-text').textContent;
            activeFilters.push({
                type: 'status',
                value: activeStatusBtn.dataset.filter,
                text: statusText
            });
        }
        
        // Get service type filters
        document.querySelectorAll('.orders-option input[name="serviceType"]:checked').forEach(input => {
            const option = input.closest('.orders-option');
            const text = option.querySelector('.orders-option-text').textContent;
            activeFilters.push({
                type: 'serviceType',
                value: input.value,
                text: text
            });
        });
        
        // Get priority filters
        document.querySelectorAll('.orders-option input[name="priority"]:checked').forEach(input => {
            const option = input.closest('.orders-option');
            const text = option.querySelector('.orders-option-badge').textContent;
            activeFilters.push({
                type: 'priority',
                value: input.value,
                text: text
            });
        });
        
        // Get time period filter
        const timeFilter = document.querySelector('.orders-option input[name="timePeriod"]:checked');
        if (timeFilter) {
            const option = timeFilter.closest('.orders-option');
            const text = option.querySelector('.orders-option-text').textContent;
            activeFilters.push({
                type: 'timePeriod',
                value: timeFilter.value,
                text: text
            });
        }
        
        // Render active filters
        this.renderActiveFilters(activeFiltersContainer, activeFilters);
    },

    /**
     * Render active filters
     */
    renderActiveFilters: function(container, filters) {
        if (filters.length === 0) {
            container.innerHTML = '<span class="orders-active-filter-tag"><span>الكل</span></span>';
            return;
        }
        
        container.innerHTML = filters.map(filter => `
            <span class="orders-active-filter-tag">
                <span>${filter.text}</span>
                <button type="button" class="orders-remove-filter" data-filter-type="${filter.type}" data-filter-value="${filter.value}">
                    <i class="fas fa-times"></i>
                </button>
            </span>
        `).join('');
        
        // Add event listeners to remove buttons
        container.querySelectorAll('.orders-remove-filter').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const filterType = e.target.closest('.orders-remove-filter').dataset.filterType;
                const filterValue = e.target.closest('.orders-remove-filter').dataset.filterValue;
                this.removeFilter(filterType, filterValue);
            });
        });
    },

    /**
     * Remove specific filter
     */
    removeFilter: function(filterType, filterValue) {
        if (filterType === 'status') {
            // Reset to "all" status
            this.handleStatusFilter('all');
        } else {
            // Uncheck the corresponding input
            const input = document.querySelector(`.orders-option input[name="${filterType}"][value="${filterValue}"]`);
            if (input) {
                input.checked = false;
                input.closest('.orders-option').classList.remove('selected');
            }
        }
        
        this.updateActiveFilters();
        this.applyAllFilters();
    },

    /**
     * Handle filter actions
     */
    handleFilterAction: function(action) {
        switch (action) {
            case 'clear-filters':
                this.clearAllFilters();
                break;
            case 'apply-filters':
                this.applyAllFilters();
                break;
        }
    },

    /**
     * Clear all filters
     */
    clearAllFilters: function() {
        // Reset status filter to "all"
        this.handleStatusFilter('all');
        
        // Uncheck all advanced filter inputs
        document.querySelectorAll('.orders-option input').forEach(input => {
            input.checked = false;
            input.closest('.orders-option').classList.remove('selected');
        });
        
        // Clear search
        const searchInput = document.querySelector('.orders-search-input');
        if (searchInput) {
            searchInput.value = '';
            const searchClear = document.querySelector('.orders-search-clear');
            if (searchClear) {
                searchClear.classList.remove('visible');
            }
        }
        
        // Update active filters display
        this.updateActiveFilters();
        
        // Show all orders
        this.showAllOrders();
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
            'اعتمادات مستندية': 'lc'
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
     * Handle service type filter
     */
    handleServiceFilter: function(serviceType) {
        if (!serviceType) return;
        
        const orderCards = document.querySelectorAll('.orders-order-card');
        
        orderCards.forEach(card => {
            const orderType = card.querySelector('.orders-order-type span').textContent;
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
    }
};

// Attach to window for router access
window.OrdersController = OrdersController; 