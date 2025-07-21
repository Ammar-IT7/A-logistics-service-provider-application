/**
 * Orders Controller
 * Manages the orders page functionality for both direct and global requests
 */
const OrdersController = {
    // Current request type
    currentRequestType: 'direct',
    
    // Filter state
    activeFilters: {
        requestType: [],
        serviceType: [],
        location: [],
        experience: '',
        price_range: '',
        rating: ''
    },

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
        
        // Initialize request type tabs
        this.initRequestTypeTabs();
        
        // Reconnect menu buttons for drawer functionality
        if (typeof DrawerHelper !== 'undefined') {
            DrawerHelper.reconnectMenuButtons();
        }
    },

    /**
     * Initialize request type tabs
     */
    initRequestTypeTabs: function() {
        const requestTabs = document.querySelectorAll('.orders-request-tab');
        
        requestTabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                const requestType = e.target.closest('.orders-request-tab').dataset.requestType;
                this.switchRequestType(requestType);
            });
        });
    },

    /**
     * Switch between request types
     */
    switchRequestType: function(requestType) {
        // Update active tab
        document.querySelectorAll('.orders-request-tab').forEach(tab => {
            tab.classList.remove('orders-active');
        });
        
        const activeTab = document.querySelector(`[data-request-type="${requestType}"]`);
        if (activeTab) {
            activeTab.classList.add('orders-active');
        }
        
        // Update current request type
        this.currentRequestType = requestType;
        
        // Show/hide sections
        const directSection = document.getElementById('direct-requests');
        const globalSection = document.getElementById('global-requests');
        
        if (requestType === 'direct') {
            directSection.style.display = 'block';
            globalSection.style.display = 'none';
        } else {
            directSection.style.display = 'none';
            globalSection.style.display = 'block';
        }
        
        // Update stats and filters for the new request type
        this.updateStatsForRequestType(requestType);
        this.updateFiltersForRequestType(requestType);
        
        console.log(`Switched to ${requestType} requests`);
    },

    /**
     * Update stats for specific request type
     */
    updateStatsForRequestType: function(requestType) {
        const stats = this.getStatsForRequestType(requestType);
        
        // Update stats cards
        const statsElements = document.querySelectorAll('.orders-stat-value');
        if (statsElements.length >= 4) {
            statsElements[0].textContent = stats.total.toLocaleString();
            statsElements[1].textContent = stats.completed.toLocaleString();
            statsElements[2].textContent = stats.pending.toLocaleString();
            statsElements[3].textContent = stats.new.toLocaleString();
        }
        
        // Update filter counts
        const filterCounts = document.querySelectorAll('.orders-filter-count');
        if (filterCounts.length >= 4) {
            filterCounts[0].textContent = stats.total.toLocaleString();
            filterCounts[1].textContent = stats.new.toLocaleString();
            filterCounts[2].textContent = stats.pending.toLocaleString();
            filterCounts[3].textContent = stats.completed.toLocaleString();
        }
    },

    /**
     * Get stats for specific request type
     */
    getStatsForRequestType: function(requestType) {
        const stats = {
            direct: {
                total: 1847,
                new: 168,
                pending: 223,
                completed: 1456
            },
            global: {
                total: 1000,
                new: 100,
                pending: 200,
                completed: 700
            }
        };
        
        return stats[requestType] || stats.direct;
    },

    /**
     * Update filters for specific request type
     */
    updateFiltersForRequestType: function(requestType) {
        // Update filter options based on request type
        const filterOptions = document.querySelectorAll('.orders-filter-options');
        
        filterOptions.forEach(option => {
            if (requestType === 'global') {
                // Add global-specific filter options
                this.addGlobalFilterOptions(option);
            } else {
                // Remove global-specific filter options
                this.removeGlobalFilterOptions(option);
            }
        });
    },

    /**
     * Add global-specific filter options
     */
    addGlobalFilterOptions: function(container) {
        // Add offer count filter if not exists
        if (!container.querySelector('[name="offerCount"]')) {
            const offerCountGroup = document.createElement('div');
            offerCountGroup.className = 'orders-filter-group';
            offerCountGroup.innerHTML = `
                <label class="orders-filter-label">عدد العروض</label>
                <div class="orders-filter-options">
                    <label class="orders-option">
                        <input type="checkbox" name="offerCount" value="low">
                        <span class="orders-option-text">أقل من 5 عروض</span>
                    </label>
                    <label class="orders-option">
                        <input type="checkbox" name="offerCount" value="medium">
                        <span class="orders-option-text">5-10 عروض</span>
                    </label>
                    <label class="orders-option">
                        <input type="checkbox" name="offerCount" value="high">
                        <span class="orders-option-text">أكثر من 10 عروض</span>
                    </label>
                </div>
            `;
            container.appendChild(offerCountGroup);
        }
    },

    /**
     * Remove global-specific filter options
     */
    removeGlobalFilterOptions: function(container) {
        const offerCountGroup = container.querySelector('[name="offerCount"]');
        if (offerCountGroup) {
            offerCountGroup.closest('.orders-filter-group').remove();
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
        const stats = this.getStatsForRequestType(this.currentRequestType);
        
        // Update stats in the DOM
        const statsElements = document.querySelectorAll('.orders-stat-value');
        if (statsElements.length >= 4) {
            statsElements[0].textContent = stats.total.toLocaleString(); // Total orders
            statsElements[1].textContent = stats.completed.toLocaleString(); // Completed orders
            statsElements[2].textContent = stats.pending.toLocaleString(); // Pending orders
            statsElements[3].textContent = stats.new.toLocaleString(); // New orders
        }
    },

    /**
     * Update orders list
     */
    updateOrdersList: function() {
        const ordersContainer = document.querySelector('.orders-grid');
        if (!ordersContainer) return;
        
        // Create comprehensive mock orders with realistic data
        const mockOrders = this.getMockOrders();
        
        this.renderOrders(mockOrders);
    },

    /**
     * Get mock orders based on current request type
     */
    getMockOrders: function() {
        if (this.currentRequestType === 'direct') {
            return this.getDirectOrders();
        } else {
            return this.getGlobalOrders();
        }
    },

    /**
     * Get direct orders data
     */
    getDirectOrders: function() {
        return [
            {
                id: 'DIR-2024-1253',
                type: 'warehouse',
                typeText: 'تخزين',
                title: 'طلب تخزين #DIR-2024-1253',
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
                amount: '12,500 ريال',
                requestType: 'direct'
            },
            {
                id: 'DIR-2024-4587',
                type: 'customs',
                typeText: 'تخليص جمركي',
                title: 'طلب تخليص #DIR-2024-4587',
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
                amount: '8,750 ريال',
                requestType: 'direct'
            },
            {
                id: 'DIR-2024-8975',
                type: 'shipping',
                typeText: 'شحن',
                title: 'طلب شحن #DIR-2024-8975',
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
                amount: '3,200 ريال',
                requestType: 'direct'
            }
        ];
    },

    /**
     * Get global orders data
     */
    getGlobalOrders: function() {
        return [
            {
                id: 'GLB-2024-1253',
                type: 'warehouse',
                typeText: 'تخزين',
                title: 'طلب تخزين عام #GLB-2024-1253',
                description: 'منتجات غذائية - 3 طن - مخزن الرياض الرئيسي - مدة التخزين: 6 أشهر',
                status: 'open_for_offers',
                statusText: 'مفتوح للعروض',
                client: 'شركة التقنية المتقدمة للتجارة',
                location: 'الرياض، المملكة العربية السعودية',
                date: '15 يناير 2024',
                priority: 'high',
                priorityText: 'عالية',
                time: 'منذ ساعتين',
                icon: 'fas fa-warehouse',
                statusIcon: 'fas fa-globe',
                offersCount: '5 عروض مقدمة',
                requestType: 'global',
                myOfferStatus: 'not_submitted', // Provider's offer status
                myOfferAmount: null,
                deadline: '20 يناير 2024'
            },
            {
                id: 'GLB-2024-4587',
                type: 'customs',
                typeText: 'تخليص جمركي',
                title: 'طلب تخليص عام #GLB-2024-4587',
                description: 'معدات إلكترونية - ميناء جدة الإسلامي - 5 حاويات - قيمة الشحنة: 250,000 ريال',
                status: 'reviewing_offers',
                statusText: 'قيد مراجعة العروض',
                client: 'مصنع الأثاث الحديث للتصنيع',
                location: 'ميناء جدة الإسلامي',
                date: '12 يناير 2024',
                priority: 'medium',
                priorityText: 'متوسطة',
                time: 'منذ يوم واحد',
                icon: 'fas fa-clipboard-list',
                statusIcon: 'fas fa-spinner',
                offersCount: '8 عروض مقدمة',
                requestType: 'global',
                myOfferStatus: 'submitted',
                myOfferAmount: '8,750 ريال',
                deadline: '18 يناير 2024'
            },
            {
                id: 'GLB-2024-8975',
                type: 'shipping',
                typeText: 'شحن',
                title: 'طلب شحن عام #GLB-2024-8975',
                description: 'الرياض - الدمام - 2 طن - شحن بري - خدمة التوصيل السريع',
                status: 'offer_selected',
                statusText: 'تم اختيار عرض آخر',
                client: 'شركة النقل السريع للخدمات اللوجستية',
                location: 'الرياض → الدمام',
                date: '10 يناير 2024',
                priority: 'low',
                priorityText: 'منخفضة',
                time: 'منذ 3 أيام',
                icon: 'fas fa-truck',
                statusIcon: 'fas fa-times-circle',
                offersCount: '12 عرض مقدمة',
                requestType: 'global',
                myOfferStatus: 'rejected',
                myOfferAmount: '3,500 ريال',
                deadline: '15 يناير 2024'
            }
        ];
    },

    /**
     * Render orders in the grid
     */
    renderOrders: function(orders) {
        const ordersContainer = document.querySelector('.orders-grid');
        if (!ordersContainer) return;
        
        ordersContainer.innerHTML = orders.map(order => {
            // For global requests, show provider's offer status
            let offerStatusBadge = '';
            if (order.requestType === 'global') {
                const offerStatusMap = {
                    'not_submitted': { text: 'لم أقدم عرض', class: 'offer-not-submitted', icon: 'fas fa-plus' },
                    'submitted': { text: 'عرضي مقدمة', class: 'offer-submitted', icon: 'fas fa-check' },
                    'rejected': { text: 'عرضي مرفوض', class: 'offer-rejected', icon: 'fas fa-times' },
                    'selected': { text: 'عرضي مقبول', class: 'offer-selected', icon: 'fas fa-star' }
                };
                const status = offerStatusMap[order.myOfferStatus] || offerStatusMap['not_submitted'];
                offerStatusBadge = `
                    <div class="orders-offer-status ${status.class}">
                        <i class="${status.icon}"></i>
                        <span>${status.text}</span>
                    </div>
                `;
            }
            
            return `
                <div class="orders-order-card orders-${order.status} orders-${order.requestType}" data-action="navigate" data-page="${order.requestType === 'global' ? 'global-request-details' : 'order-details'}" data-${order.requestType === 'global' ? 'request' : 'order'}-id="${order.id}">
                    <div class="orders-order-header">
                        <div class="orders-order-type">
                            <i class="${order.icon}"></i>
                            <span>${order.typeText}</span>
                        </div>
                        <div class="orders-order-status orders-${order.status}">
                            <i class="${order.statusIcon}"></i>
                            <span>${order.statusText}</span>
                        </div>
                        <div class="orders-request-badge orders-${order.requestType}-badge">
                            <i class="fas fa-${order.requestType === 'direct' ? 'user-check' : 'globe'}"></i>
                            <span>${order.requestType === 'direct' ? 'مباشر' : 'عام'}</span>
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
                                <i class="fas fa-${order.requestType === 'direct' ? 'money-bill-wave' : 'users'}"></i>
                                <span>${order.requestType === 'direct' ? order.amount : order.offersCount}</span>
                            </div>
                            ${order.requestType === 'global' && order.myOfferAmount ? `
                                <div class="orders-detail-item">
                                    <i class="fas fa-tag"></i>
                                    <span>عرضي: ${order.myOfferAmount}</span>
                                </div>
                            ` : ''}
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
                        ${offerStatusBadge}
                    </div>
                </div>
            `;
        }).join('');
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
        const stats = this.getStatsForRequestType(this.currentRequestType);
        
        // Update tab counts
        const tabCounts = document.querySelectorAll('.orders-filter-count');
        if (tabCounts.length >= 4) {
            tabCounts[0].textContent = stats.total.toLocaleString(); // All
            tabCounts[1].textContent = stats.new.toLocaleString(); // New
            tabCounts[2].textContent = stats.pending.toLocaleString(); // Pending
            tabCounts[3].textContent = stats.completed.toLocaleString(); // Completed
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
            const stats = this.getStatsForRequestType(this.currentRequestType);
            totalOrdersElement.textContent = stats.total.toLocaleString();
        }
        
        const monthlyOrdersElement = document.querySelector('.monthly-orders');
        if (monthlyOrdersElement) {
            const stats = this.getStatsForRequestType(this.currentRequestType);
            monthlyOrdersElement.textContent = stats.new.toLocaleString();
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
        // Request type filters
        document.querySelectorAll('.orders-option input[name="requestType"]').forEach(input => {
            input.addEventListener('change', (e) => {
                this.handleModalFilterChange(e);
            });
        });
        
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
            
            // Check request type filters
            const selectedRequestTypes = Array.from(document.querySelectorAll('.orders-option input[name="requestType"]:checked'))
                .map(input => input.value);
            
            if (selectedRequestTypes.length > 0) {
                const cardRequestType = this.getOrderRequestType(card);
                if (!selectedRequestTypes.includes(cardRequestType)) {
                    shouldShow = false;
                }
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
     * Get order request type from card
     */
    getOrderRequestType: function(card) {
        if (card.classList.contains('orders-direct')) return 'direct';
        if (card.classList.contains('orders-global')) return 'global';
        return '';
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
                const orderId = orderCard.dataset.orderId || orderCard.dataset.requestId;
                const page = orderCard.dataset.page;
                console.log(`Navigating to ${page}: ${orderId}`);
                Router.navigate(page);
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
                case 'export-offers':
                    this.exportOffers();
                    break;
                case 'submit-offer':
                    this.submitOffer();
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
    },

    /**
     * Export offers
     */
    exportOffers: function() {
        console.log('Exporting offers...');
        // Implementation for exporting offers
        alert('جاري تصدير العروض...');
    },

    /**
     * Submit offer
     */
    submitOffer: function() {
        console.log('Submitting offer...');
        // Get the current global request ID from the active card
        const activeGlobalCard = document.querySelector('.orders-order-card.orders-global');
        if (activeGlobalCard) {
            const requestId = activeGlobalCard.dataset.requestId;
            // Navigate to offer form with request ID
            Router.navigate(`offer-form?requestId=${requestId}`);
        } else {
            // Fallback to offer form without specific request ID
            Router.navigate('offer-form');
        }
    }
};

// Attach to window for router access
window.OrdersController = OrdersController; 