/**
 * My Offers Controller
 * Manages the my offers page functionality
 */
const MyOffersController = {
    currentFilters: {},
    searchTerm: '',
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
        
        // Initialize search and filters
        this.initSearch();
        this.initFilters();
        
        // Update stats
        this.updateStats();
    },

    /**
     * Load offers data
     */
    loadOffersData: function() {
        // Mock data for offers
        this.offers = [
            {
                id: 'OFF-2024-1253',
                title: 'عرض تخزين مكيف مع خدمات متقدمة',
                description: 'تخزين آمن ومكيف للمنتجات الغذائية مع نظام أمان متقدم وتأمين شامل',
                serviceType: 'warehouse',
                status: 'pending',
                client: 'شركة التقنية المتقدمة للتجارة',
                location: 'الرياض، المملكة العربية السعودية',
                submittedAt: '2024-01-16',
                price: 9200,
                priceUnit: 'شهرياً',
                priority: 'high',
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
                submittedAt: '2024-01-12',
                price: 3500,
                priceUnit: '',
                priority: 'medium',
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
                submittedAt: '2024-01-10',
                price: 8750,
                priceUnit: '',
                priority: 'low',
                isFeatured: false
            },
            {
                id: 'OFF-2024-9876',
                title: 'خدمة تغليف احترافية مع طباعة',
                description: 'تغليف احترافي للمنتجات الإلكترونية مع طباعة الشعارات والعلامات التجارية',
                serviceType: 'packaging',
                status: 'pending',
                client: 'شركة التغليف المتقدمة',
                location: 'جدة، المملكة العربية السعودية',
                submittedAt: '2024-01-14',
                price: 2800,
                priceUnit: '',
                priority: 'medium',
                isFeatured: false
            },
            {
                id: 'OFF-2024-5432',
                title: 'خدمة توصيل نهائي سريع',
                description: 'توصيل نهائي سريع للمنتجات مع خدمة التتبع المباشر والتأكيد الإلكتروني',
                serviceType: 'last-mile',
                status: 'accepted',
                client: 'شركة التوصيل السريع',
                location: 'الدمام، المملكة العربية السعودية',
                submittedAt: '2024-01-08',
                price: 1200,
                priceUnit: '',
                priority: 'low',
                isFeatured: false
            }
        ];
        
        this.renderOffers();
    },

    /**
     * Set up event listeners
     */
    setupEventListeners: function() {
        // Handle offer card clicks
        document.addEventListener('click', (e) => {
            const offerCard = e.target.closest('.my-offers-offer-card');
            if (offerCard) {
                const action = offerCard.dataset.action;
                const page = offerCard.dataset.page;
                const offerId = offerCard.dataset.offerId;
                
                if (action === 'navigate' && page && offerId) {
                    console.log(`Navigating to ${page} with offer ID: ${offerId}`);
                    Router.navigate(`${page}?offerId=${offerId}`);
                }
            }
        });

        // Handle filter button clicks
        document.addEventListener('click', (e) => {
            const filterBtn = e.target.closest('.my-offers-filter-btn');
            if (filterBtn) {
                const filter = filterBtn.dataset.filter;
                this.applyStatusFilter(filter);
            }
        });

        // Handle advanced filters modal
        document.addEventListener('click', (e) => {
            if (e.target.closest('[data-action="toggle-advanced-filters"]')) {
                this.toggleAdvancedFilters();
            }
            
            if (e.target.closest('[data-action="close-filters"]')) {
                this.closeAdvancedFilters();
            }
            
            if (e.target.closest('[data-action="apply-filters"]')) {
                this.applyAdvancedFilters();
            }
            
            if (e.target.closest('[data-action="clear-filters"]')) {
                this.clearFilters();
            }
        });

        // Handle export action
        document.addEventListener('click', (e) => {
            if (e.target.closest('[data-action="export-offers"]')) {
                this.exportOffers();
            }
        });

        // Handle search input
        const searchInput = document.querySelector('.my-offers-search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchTerm = e.target.value;
                this.performSearch();
            });
        }

        // Handle search clear
        const searchClear = document.querySelector('.my-offers-search-clear');
        if (searchClear) {
            searchClear.addEventListener('click', () => {
                const searchInput = document.querySelector('.my-offers-search-input');
                if (searchInput) {
                    searchInput.value = '';
                    this.searchTerm = '';
                    this.performSearch();
                }
            });
        }
    },

    /**
     * Initialize search functionality
     */
    initSearch: function() {
        const searchInput = document.querySelector('.my-offers-search-input');
        const searchClear = document.querySelector('.my-offers-search-clear');
        
        if (searchInput) {
            // Show/hide clear button based on input
            searchInput.addEventListener('input', (e) => {
                if (e.target.value.length > 0) {
                    searchClear.classList.add('visible');
                } else {
                    searchClear.classList.remove('visible');
                }
            });
        }
    },

    /**
     * Initialize filters
     */
    initFilters: function() {
        this.initPriceRangeSliders();
        this.initFilterCheckboxes();
    },

    /**
     * Initialize price range sliders
     */
    initPriceRangeSliders: function() {
        const priceRangeMin = document.getElementById('priceRangeMin');
        const priceRangeMax = document.getElementById('priceRangeMax');
        const priceFrom = document.getElementById('priceFrom');
        const priceTo = document.getElementById('priceTo');

        if (priceRangeMin && priceRangeMax && priceFrom && priceTo) {
            // Update input fields when sliders change
            priceRangeMin.addEventListener('input', (e) => {
                priceFrom.value = e.target.value;
            });

            priceRangeMax.addEventListener('input', (e) => {
                priceTo.value = e.target.value;
            });

            // Update sliders when input fields change
            priceFrom.addEventListener('input', (e) => {
                priceRangeMin.value = e.target.value;
            });

            priceTo.addEventListener('input', (e) => {
                priceRangeMax.value = e.target.value;
            });
        }
    },

    /**
     * Initialize filter checkboxes
     */
    initFilterCheckboxes: function() {
        const checkboxes = document.querySelectorAll('.my-offers-option input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                this.applyFilters();
            });
        });
    },

    /**
     * Apply status filter
     */
    applyStatusFilter: function(status) {
        // Update active filter button
        document.querySelectorAll('.my-offers-filter-btn').forEach(btn => {
            btn.classList.remove('my-offers-active');
        });
        
        const activeBtn = document.querySelector(`[data-filter="${status}"]`);
        if (activeBtn) {
            activeBtn.classList.add('my-offers-active');
        }

        // Filter offers
        this.currentFilters.status = status === 'all' ? null : status;
        this.applyFilters();
    },

    /**
     * Apply all filters
     */
    applyFilters: function() {
        let filteredOffers = [...this.offers];

        // Apply status filter
        if (this.currentFilters.status && this.currentFilters.status !== 'all') {
            filteredOffers = filteredOffers.filter(offer => offer.status === this.currentFilters.status);
        }

        // Apply search filter
        if (this.searchTerm) {
            filteredOffers = filteredOffers.filter(offer => 
                this.matchesSearchTerm(offer, this.searchTerm)
            );
        }

        // Apply service type filter
        if (this.currentFilters.serviceType && this.currentFilters.serviceType.length > 0) {
            filteredOffers = filteredOffers.filter(offer => 
                this.currentFilters.serviceType.includes(offer.serviceType)
            );
        }

        // Apply location filter
        if (this.currentFilters.location && this.currentFilters.location.length > 0) {
            filteredOffers = filteredOffers.filter(offer => 
                this.currentFilters.location.some(loc => 
                    offer.location.toLowerCase().includes(loc.toLowerCase())
                )
            );
        }

        // Apply price range filter
        if (this.currentFilters.priceRange) {
            filteredOffers = filteredOffers.filter(offer => 
                offer.price >= this.currentFilters.priceRange.min && 
                offer.price <= this.currentFilters.priceRange.max
            );
        }

        this.renderOffers(filteredOffers);
        this.updateStats();
    },

    /**
     * Check if offer matches search term
     */
    matchesSearchTerm: function(offer, searchTerm) {
        const searchLower = searchTerm.toLowerCase();
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
     * Update service type filter
     */
    updateServiceTypeFilter: function() {
        const checkboxes = document.querySelectorAll('input[name="serviceType"]:checked');
        this.currentFilters.serviceType = Array.from(checkboxes).map(cb => cb.value);
        this.applyFilters();
    },

    /**
     * Update location filter
     */
    updateLocationFilter: function() {
        const checkboxes = document.querySelectorAll('input[name="location"]:checked');
        this.currentFilters.location = Array.from(checkboxes).map(cb => cb.value);
        this.applyFilters();
    },

    /**
     * Update time period filter
     */
    updateTimePeriodFilter: function() {
        const selectedPeriod = document.querySelector('input[name="timePeriod"]:checked');
        if (selectedPeriod) {
            this.currentFilters.timePeriod = selectedPeriod.value;
            this.applyFilters();
        }
    },

    /**
     * Toggle advanced filters modal
     */
    toggleAdvancedFilters: function() {
        const modal = document.getElementById('filtersModal');
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    },

    /**
     * Close advanced filters modal
     */
    closeAdvancedFilters: function() {
        const modal = document.getElementById('filtersModal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    },

    /**
     * Apply advanced filters
     */
    applyAdvancedFilters: function() {
        // Get selected service types
        const serviceTypeCheckboxes = document.querySelectorAll('input[name="serviceType"]:checked');
        this.currentFilters.serviceType = Array.from(serviceTypeCheckboxes).map(cb => cb.value);

        // Get selected locations
        const locationCheckboxes = document.querySelectorAll('input[name="location"]:checked');
        this.currentFilters.location = Array.from(locationCheckboxes).map(cb => cb.value);

        // Get price range
        const priceFrom = document.getElementById('priceFrom').value;
        const priceTo = document.getElementById('priceTo').value;
        if (priceFrom && priceTo) {
            this.currentFilters.priceRange = {
                min: parseInt(priceFrom),
                max: parseInt(priceTo)
            };
        }

        this.applyFilters();
        this.closeAdvancedFilters();
    },

    /**
     * Clear all filters
     */
    clearFilters: function() {
        // Clear all checkboxes
        document.querySelectorAll('.my-offers-option input[type="checkbox"]').forEach(cb => {
            cb.checked = false;
        });

        // Clear radio buttons
        document.querySelectorAll('.my-offers-option input[type="radio"]').forEach(rb => {
            rb.checked = false;
        });

        // Clear price inputs
        document.getElementById('priceFrom').value = '';
        document.getElementById('priceTo').value = '';
        document.getElementById('priceRangeMin').value = 0;
        document.getElementById('priceRangeMax').value = 50000;

        // Reset filters
        this.currentFilters = {};
        this.searchTerm = '';

        // Clear search input
        const searchInput = document.querySelector('.my-offers-search-input');
        if (searchInput) {
            searchInput.value = '';
        }

        // Reset status filter to 'all'
        this.applyStatusFilter('all');

        this.applyFilters();
    },

    /**
     * Update stats
     */
    updateStats: function() {
        const totalOffers = this.offers.length;
        const acceptedOffers = this.offers.filter(offer => offer.status === 'accepted').length;
        const pendingOffers = this.offers.filter(offer => offer.status === 'pending').length;
        const rejectedOffers = this.offers.filter(offer => offer.status === 'rejected').length;
        const totalValue = this.offers.reduce((sum, offer) => sum + offer.price, 0);

        // Update stat values
        const statValues = document.querySelectorAll('.my-offers-stat-value');
        if (statValues.length >= 4) {
            statValues[0].textContent = totalOffers;
            statValues[1].textContent = acceptedOffers;
            statValues[2].textContent = pendingOffers;
            statValues[3].textContent = `${totalValue.toLocaleString()} ريال`;
        }

        // Update filter counts
        const filterCounts = document.querySelectorAll('.my-offers-filter-count');
        if (filterCounts.length >= 4) {
            filterCounts[0].textContent = totalOffers;
            filterCounts[1].textContent = pendingOffers;
            filterCounts[2].textContent = acceptedOffers;
            filterCounts[3].textContent = rejectedOffers;
        }
    },

    /**
     * Export offers
     */
    exportOffers: function() {
        console.log('Exporting offers...');
        // This would typically trigger a file download
        // For now, just show a message
        if (typeof Toast !== 'undefined') {
            Toast.show('تصدير العروض', 'سيتم تحميل ملف Excel قريباً', 'success');
        } else {
            alert('سيتم تصدير العروض قريباً');
        }
    },

    // Helper functions
    getServiceIcon: function(serviceType) {
        const icons = {
            'warehouse': 'warehouse',
            'shipping': 'truck',
            'customs': 'clipboard-list',
            'packaging': 'box',
            'last-mile': 'shipping-fast'
        };
        return icons[serviceType] || 'cog';
    },

    getServiceTypeText: function(serviceType) {
        const texts = {
            'warehouse': 'تخزين',
            'shipping': 'شحن',
            'customs': 'تخليص جمركي',
            'packaging': 'تغليف',
            'last-mile': 'توصيل نهائي'
        };
        return texts[serviceType] || 'خدمة أخرى';
    },

    getStatusIcon: function(status) {
        const icons = {
            'pending': 'clock',
            'accepted': 'check-circle',
            'rejected': 'times-circle'
        };
        return icons[status] || 'question-circle';
    },

    getStatusText: function(status) {
        const texts = {
            'pending': 'قيد المراجعة',
            'accepted': 'مقبولة',
            'rejected': 'مرفوضة'
        };
        return texts[status] || 'غير محدد';
    },

    getPriorityIcon: function(priority) {
        const icons = {
            'high': 'exclamation-triangle',
            'medium': 'minus-circle',
            'low': 'check-circle'
        };
        return icons[priority] || 'circle';
    },

    getPriorityText: function(priority) {
        const texts = {
            'high': 'عالية',
            'medium': 'متوسطة',
            'low': 'منخفضة'
        };
        return texts[priority] || 'غير محدد';
    },

    formatDate: function(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('ar-SA', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    },

    getTimeAgo: function(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
        
        if (diffInHours < 1) {
            return 'منذ أقل من ساعة';
        } else if (diffInHours < 24) {
            return `منذ ${diffInHours} ساعة`;
        } else if (diffInHours < 48) {
            return 'منذ يوم واحد';
        } else if (diffInHours < 168) {
            return `منذ ${Math.floor(diffInHours / 24)} أيام`;
        } else {
            return `منذ ${Math.floor(diffInHours / 24 / 7)} أسابيع`;
        }
    }
};

// Attach to window for router access
window.MyOffersController = MyOffersController; 