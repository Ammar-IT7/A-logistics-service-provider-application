/**
 * My Offers Controller
 * Manages the my offers page functionality for providers to view and manage their submitted offers
 */
const MyOffersController = {
    // Current filters
    currentFilters: {
        status: 'all',
        serviceType: [],
        timePeriod: '',
        priceRange: { min: 0, max: 50000 },
        location: []
    },
    
    // Search term
    searchTerm: '',
    
    // Offers data
    offers: [],

    /**
     * Initialize the my offers page
     */
    init: function() {
        console.log('MyOffersController initialized');
        
        // Load offers data
        this.loadOffersData();
        
        // Set up event listeners
        this.setupEventListeners();
        
        // Initialize search functionality
        this.initSearch();
        
        // Initialize filters
        this.initFilters();
        
        // Update stats
        this.updateStats();
    },

    /**
     * Load offers data
     */
    loadOffersData: function() {
        // Mock offers data - in real app, this would come from API
        this.offers = [
            {
                id: 'OFF-2024-1253',
                title: 'عرض تخزين مكيف مع خدمات متقدمة',
                description: 'تخزين آمن ومكيف للمنتجات الغذائية مع نظام أمان متقدم وتأمين شامل',
                serviceType: 'warehouse',
                status: 'pending',
                client: 'شركة التقنية المتقدمة للتجارة',
                location: 'الرياض، المملكة العربية السعودية',
                price: 9200,
                priceUnit: 'شهرياً',
                priority: 'high',
                submittedAt: '2024-01-16T10:30:00Z',
                requestId: 'GLB-2024-1253',
                isFeatured: true
            },
            {
                id: 'OFF-2024-4587',
                title: 'خدمة شحن سريع مع تتبع متقدم',
                description: 'شحن بري سريع من الرياض إلى الدمام مع خدمة التتبع المتقدمة والتأمين الشامل',
                serviceType: 'shipping',
                status: 'accepted',
                client: 'شركة النقل السريع للخدمات اللوجستية',
                location: 'الرياض → الدمام',
                price: 3500,
                priceUnit: 'مرة واحدة',
                priority: 'medium',
                submittedAt: '2024-01-12T14:15:00Z',
                requestId: 'GLB-2024-4587',
                isFeatured: false
            },
            {
                id: 'OFF-2024-8975',
                title: 'خدمة تخليص جمركي شاملة',
                description: 'تخليص جمركي شامل للمعدات الإلكترونية مع إدارة المستندات والمرافقة',
                serviceType: 'customs',
                status: 'rejected',
                client: 'مصنع الأثاث الحديث للتصنيع',
                location: 'ميناء جدة الإسلامي',
                price: 8750,
                priceUnit: 'مرة واحدة',
                priority: 'low',
                submittedAt: '2024-01-10T09:45:00Z',
                requestId: 'GLB-2024-8975',
                isFeatured: false
            }
        ];
        
        // Render offers
        this.renderOffers();
    },

    /**
     * Set up event listeners
     */
    setupEventListeners: function() {
        // Handle offer card clicks
        document.addEventListener('click', (e) => {
            const offerCard = e.target.closest('.my-offers-offer-card');
            if (offerCard && offerCard.dataset.action === 'navigate') {
                const offerId = offerCard.dataset.offerId;
                const page = offerCard.dataset.page;
                console.log(`Navigating to ${page}: ${offerId}`);
                Router.navigate(page);
            }
        });
        
        // Handle filter buttons
        document.addEventListener('click', (e) => {
            const filterBtn = e.target.closest('.my-offers-filter-btn');
            if (filterBtn) {
                const filter = filterBtn.dataset.filter;
                this.applyStatusFilter(filter);
            }
        });
        
        // Handle section action buttons
        document.addEventListener('click', (e) => {
            const actionBtn = e.target.closest('[data-action]');
            if (!actionBtn) return;
            
            const action = actionBtn.dataset.action;
            
            switch (action) {
                case 'export-offers':
                    this.exportOffers();
                    break;
                case 'toggle-advanced-filters':
                    this.toggleAdvancedFilters();
                    break;
                case 'close-filters':
                    this.closeAdvancedFilters();
                    break;
                case 'apply-filters':
                    this.applyAdvancedFilters();
                    break;
                case 'clear-filters':
                    this.clearFilters();
                    break;
            }
        });
    },

    /**
     * Initialize search functionality
     */
    initSearch: function() {
        const searchInput = document.querySelector('.my-offers-search-input');
        const searchClear = document.querySelector('.my-offers-search-clear');
        
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchTerm = e.target.value.trim();
                this.performSearch();
            });
        }
        
        if (searchClear) {
            searchClear.addEventListener('click', () => {
                if (searchInput) {
                    searchInput.value = '';
                    this.searchTerm = '';
                    this.performSearch();
                }
            });
        }
    },

    /**
     * Initialize filters
     */
    initFilters: function() {
        // Initialize price range sliders
        this.initPriceRangeSliders();
        
        // Initialize filter checkboxes
        this.initFilterCheckboxes();
    },

    /**
     * Initialize price range sliders
     */
    initPriceRangeSliders: function() {
        const minSlider = document.getElementById('priceRangeMin');
        const maxSlider = document.getElementById('priceRangeMax');
        const minInput = document.getElementById('priceFrom');
        const maxInput = document.getElementById('priceTo');
        
        if (minSlider && maxSlider && minInput && maxInput) {
            // Set initial values
            minSlider.value = this.currentFilters.priceRange.min;
            maxSlider.value = this.currentFilters.priceRange.max;
            minInput.value = this.currentFilters.priceRange.min;
            maxInput.value = this.currentFilters.priceRange.max;
            
            // Add event listeners
            minSlider.addEventListener('input', (e) => {
                const value = parseInt(e.target.value);
                this.currentFilters.priceRange.min = value;
                minInput.value = value;
                this.applyFilters();
            });
            
            maxSlider.addEventListener('input', (e) => {
                const value = parseInt(e.target.value);
                this.currentFilters.priceRange.max = value;
                maxInput.value = value;
                this.applyFilters();
            });
            
            minInput.addEventListener('input', (e) => {
                const value = parseInt(e.target.value) || 0;
                this.currentFilters.priceRange.min = value;
                minSlider.value = value;
                this.applyFilters();
            });
            
            maxInput.addEventListener('input', (e) => {
                const value = parseInt(e.target.value) || 50000;
                this.currentFilters.priceRange.max = value;
                maxSlider.value = value;
                this.applyFilters();
            });
        }
    },

    /**
     * Initialize filter checkboxes
     */
    initFilterCheckboxes: function() {
        // Service type checkboxes
        const serviceTypeCheckboxes = document.querySelectorAll('input[name="serviceType"]');
        serviceTypeCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                this.updateServiceTypeFilter();
            });
        });
        
        // Location checkboxes
        const locationCheckboxes = document.querySelectorAll('input[name="location"]');
        locationCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                this.updateLocationFilter();
            });
        });
        
        // Time period radio buttons
        const timePeriodRadios = document.querySelectorAll('input[name="timePeriod"]');
        timePeriodRadios.forEach(radio => {
            radio.addEventListener('change', () => {
                this.updateTimePeriodFilter();
            });
        });
    },

    /**
     * Update service type filter
     */
    updateServiceTypeFilter: function() {
        const checkedBoxes = document.querySelectorAll('input[name="serviceType"]:checked');
        this.currentFilters.serviceType = Array.from(checkedBoxes).map(cb => cb.value);
        this.applyFilters();
    },

    /**
     * Update location filter
     */
    updateLocationFilter: function() {
        const checkedBoxes = document.querySelectorAll('input[name="location"]:checked');
        this.currentFilters.location = Array.from(checkedBoxes).map(cb => cb.value);
        this.applyFilters();
    },

    /**
     * Update time period filter
     */
    updateTimePeriodFilter: function() {
        const checkedRadio = document.querySelector('input[name="timePeriod"]:checked');
        this.currentFilters.timePeriod = checkedRadio ? checkedRadio.value : '';
        this.applyFilters();
    },

    /**
     * Apply status filter
     */
    applyStatusFilter: function(status) {
        // Update active filter button
        const filterButtons = document.querySelectorAll('.my-offers-filter-btn');
        filterButtons.forEach(btn => {
            btn.classList.remove('my-offers-active');
        });
        
        const activeButton = document.querySelector(`[data-filter="${status}"]`);
        if (activeButton) {
            activeButton.classList.add('my-offers-active');
        }
        
        this.currentFilters.status = status;
        this.applyFilters();
    },

    /**
     * Apply all filters
     */
    applyFilters: function() {
        const filteredOffers = this.offers.filter(offer => {
            // Status filter
            if (this.currentFilters.status !== 'all' && offer.status !== this.currentFilters.status) {
                return false;
            }
            
            // Service type filter
            if (this.currentFilters.serviceType.length > 0 && !this.currentFilters.serviceType.includes(offer.serviceType)) {
                return false;
            }
            
            // Price range filter
            if (offer.price < this.currentFilters.priceRange.min || offer.price > this.currentFilters.priceRange.max) {
                return false;
            }
            
            // Search term filter
            if (this.searchTerm && !this.matchesSearchTerm(offer)) {
                return false;
            }
            
            return true;
        });
        
        this.renderOffers(filteredOffers);
        this.updateStats(filteredOffers);
    },

    /**
     * Check if offer matches search term
     */
    matchesSearchTerm: function(offer) {
        const searchLower = this.searchTerm.toLowerCase();
        return (
            offer.title.toLowerCase().includes(searchLower) ||
            offer.description.toLowerCase().includes(searchLower) ||
            offer.client.toLowerCase().includes(searchLower) ||
            offer.location.toLowerCase().includes(searchLower) ||
            offer.id.toLowerCase().includes(searchLower)
        );
    },

    /**
     * Perform search
     */
    performSearch: function() {
        this.applyFilters();
        
        // Show/hide clear button
        const searchClear = document.querySelector('.my-offers-search-clear');
        if (searchClear) {
            if (this.searchTerm) {
                searchClear.classList.add('visible');
            } else {
                searchClear.classList.remove('visible');
            }
        }
    },

    /**
     * Render offers
     */
    renderOffers: function(offers = this.offers) {
        const offersGrid = document.querySelector('.my-offers-grid');
        if (!offersGrid) return;
        
        if (offers.length === 0) {
            offersGrid.innerHTML = `
                <div class="my-offers-empty-state">
                    <div class="my-offers-empty-icon">
                        <i class="fas fa-handshake"></i>
                    </div>
                    <h3>لا توجد عروض</h3>
                    <p>لم يتم العثور على عروض تطابق معايير البحث المحددة</p>
                </div>
            `;
            return;
        }
        
        offersGrid.innerHTML = offers.map(offer => `
            <div class="my-offers-offer-card my-offers-${offer.status}" data-action="navigate" data-page="offer-details" data-offer-id="${offer.id}">
                <div class="my-offers-offer-header">
                    <div class="my-offers-offer-type">
                        <i class="fas fa-${this.getServiceIcon(offer.serviceType)}"></i>
                        <span>${this.getServiceTypeText(offer.serviceType)}</span>
                    </div>
                    <div class="my-offers-offer-status my-offers-${offer.status}">
                        <i class="fas fa-${this.getStatusIcon(offer.status)}"></i>
                        <span>${this.getStatusText(offer.status)}</span>
                    </div>
                    ${offer.isFeatured ? `
                        <div class="my-offers-offer-badge my-offers-featured-badge">
                            <i class="fas fa-star"></i>
                            <span>مميز</span>
                        </div>
                    ` : ''}
                </div>
                
                <div class="my-offers-offer-content">
                    <h4 class="my-offers-offer-title">${offer.title}</h4>
                    <p class="my-offers-offer-description">${offer.description}</p>
                    
                    <div class="my-offers-offer-details">
                        <div class="my-offers-detail-item">
                            <i class="fas fa-user"></i>
                            <span>${offer.client}</span>
                        </div>
                        <div class="my-offers-detail-item">
                            <i class="fas fa-map-marker-alt"></i>
                            <span>${offer.location}</span>
                        </div>
                        <div class="my-offers-detail-item">
                            <i class="fas fa-calendar"></i>
                            <span>${this.formatDate(offer.submittedAt)}</span>
                        </div>
                        <div class="my-offers-detail-item">
                            <i class="fas fa-money-bill-wave"></i>
                            <span>${offer.price.toLocaleString()} ريال ${offer.priceUnit}</span>
                        </div>
                    </div>
                </div>
                
                <div class="my-offers-offer-footer">
                    <div class="my-offers-offer-priority my-offers-${offer.priority}">
                        <i class="fas fa-${this.getPriorityIcon(offer.priority)}"></i>
                        <span>${this.getPriorityText(offer.priority)}</span>
                    </div>
                    <div class="my-offers-offer-time">
                        <i class="fas fa-clock"></i>
                        <span>${this.getTimeAgo(offer.submittedAt)}</span>
                    </div>
                </div>
            </div>
        `).join('');
    },

    /**
     * Get service icon
     */
    getServiceIcon: function(serviceType) {
        const icons = {
            warehouse: 'warehouse',
            shipping: 'truck',
            customs: 'clipboard-list',
            packaging: 'box',
            lc: 'file-invoice-dollar',
            'last-mile': 'shipping-fast'
        };
        return icons[serviceType] || 'cog';
    },

    /**
     * Get service type text
     */
    getServiceTypeText: function(serviceType) {
        const texts = {
            warehouse: 'تخزين',
            shipping: 'شحن',
            customs: 'تخليص جمركي',
            packaging: 'تغليف',
            lc: 'اعتمادات مستندية',
            'last-mile': 'توصيل نهائي'
        };
        return texts[serviceType] || 'خدمة أخرى';
    },

    /**
     * Get status icon
     */
    getStatusIcon: function(status) {
        const icons = {
            pending: 'clock',
            accepted: 'check-circle',
            rejected: 'times-circle'
        };
        return icons[status] || 'question-circle';
    },

    /**
     * Get status text
     */
    getStatusText: function(status) {
        const texts = {
            pending: 'قيد المراجعة',
            accepted: 'مقبولة',
            rejected: 'مرفوضة'
        };
        return texts[status] || 'غير معروف';
    },

    /**
     * Get priority icon
     */
    getPriorityIcon: function(priority) {
        const icons = {
            high: 'exclamation-triangle',
            medium: 'minus-circle',
            low: 'check-circle'
        };
        return icons[priority] || 'circle';
    },

    /**
     * Get priority text
     */
    getPriorityText: function(priority) {
        const texts = {
            high: 'عالية',
            medium: 'متوسطة',
            low: 'منخفضة'
        };
        return texts[priority] || 'غير محدد';
    },

    /**
     * Format date
     */
    formatDate: function(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('ar-SA', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    },

    /**
     * Get time ago
     */
    getTimeAgo: function(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
        
        if (diffInHours < 1) {
            return 'منذ لحظات';
        } else if (diffInHours < 24) {
            return `منذ ${diffInHours} ساعة`;
        } else {
            const diffInDays = Math.floor(diffInHours / 24);
            return `منذ ${diffInDays} يوم`;
        }
    },

    /**
     * Update stats
     */
    updateStats: function(offers = this.offers) {
        const stats = {
            total: offers.length,
            accepted: offers.filter(o => o.status === 'accepted').length,
            pending: offers.filter(o => o.status === 'pending').length,
            rejected: offers.filter(o => o.status === 'rejected').length,
            totalValue: offers.reduce((sum, o) => sum + o.price, 0)
        };
        
        // Update stat values
        const statValues = document.querySelectorAll('.my-offers-stat-value');
        if (statValues.length >= 4) {
            statValues[0].textContent = stats.total;
            statValues[1].textContent = stats.accepted;
            statValues[2].textContent = stats.pending;
            statValues[3].textContent = `${stats.totalValue.toLocaleString()} ريال`;
        }
        
        // Update filter counts
        const filterCounts = document.querySelectorAll('.my-offers-filter-count');
        if (filterCounts.length >= 4) {
            filterCounts[0].textContent = stats.total;
            filterCounts[1].textContent = stats.pending;
            filterCounts[2].textContent = stats.accepted;
            filterCounts[3].textContent = stats.rejected;
        }
    },

    /**
     * Toggle advanced filters
     */
    toggleAdvancedFilters: function() {
        const modal = document.getElementById('filtersModal');
        if (modal) {
            modal.classList.add('active');
        }
    },

    /**
     * Close advanced filters
     */
    closeAdvancedFilters: function() {
        const modal = document.getElementById('filtersModal');
        if (modal) {
            modal.classList.remove('active');
        }
    },

    /**
     * Apply advanced filters
     */
    applyAdvancedFilters: function() {
        this.closeAdvancedFilters();
        this.applyFilters();
    },

    /**
     * Clear filters
     */
    clearFilters: function() {
        // Reset all checkboxes and radio buttons
        const checkboxes = document.querySelectorAll('.my-offers-filters-modal input[type="checkbox"]');
        checkboxes.forEach(cb => cb.checked = false);
        
        const radios = document.querySelectorAll('.my-offers-filters-modal input[type="radio"]');
        radios.forEach(radio => radio.checked = false);
        
        // Reset price range
        this.currentFilters.priceRange = { min: 0, max: 50000 };
        this.initPriceRangeSliders();
        
        // Reset filters
        this.currentFilters = {
            status: 'all',
            serviceType: [],
            timePeriod: '',
            priceRange: { min: 0, max: 50000 },
            location: []
        };
        
        this.applyFilters();
    },

    /**
     * Export offers
     */
    exportOffers: function() {
        console.log('Exporting offers...');
        // Implementation for exporting offers
        if (window.Toast) {
            Toast.show('تم التصدير', 'جاري تصدير العروض...', 'success');
        } else {
            alert('جاري تصدير العروض...');
        }
    }
};

// Attach to window for router access
window.MyOffersController = MyOffersController; 