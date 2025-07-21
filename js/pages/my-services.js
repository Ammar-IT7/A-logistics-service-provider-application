/**
 * My Services Page Controller
 */
const MyServicesController = {
    /**
     * Current active tab
     */
    currentTab: 'shipping',

    /**
     * Tab to form mapping
     */
    tabFormMapping: {
        'shipping': 'shipping-form',
        'warehouses': 'warehouse-form',
        'customs': 'customs-form',
        'packaging': 'packaging-form',
        'lc-services': 'lc-service-form',
        'last-mile': 'delivery-provider-form'
    },

    /**
     * Tab icons mapping
     */
    tabIconMapping: {
        'shipping': 'fas fa-shipping-fast',
        'warehouses': 'fas fa-warehouse',
        'customs': 'fas fa-clipboard-check',
        'packaging': 'fas fa-box',
        'lc-services': 'fas fa-file-contract',
        'last-mile': 'fas fa-motorcycle'
    },

    /**
     * Initialize the controller
     */
    init: function() {
        console.log('MyServicesController initialized');
        this.setupEventListeners();
        this.updateFloatingButton();
        this.loadServicesData();
        
        // Reconnect menu buttons for drawer functionality
        if (typeof DrawerHelper !== 'undefined') {
            DrawerHelper.reconnectMenuButtons();
        }
    },

    /**
     * Set up event listeners
     */
    setupEventListeners: function() {
        // Handle tab switching
        document.addEventListener('click', (e) => {
            if (e.target.closest('.ms-tab-btn')) {
                const tabBtn = e.target.closest('.ms-tab-btn');
                const tabName = tabBtn.dataset.tab;
                this.switchTab(tabName);
            }
        });

        // Handle service card actions
        document.addEventListener('click', (e) => {
            if (e.target.closest('.ms-service-card')) {
                const serviceCard = e.target.closest('.ms-service-card');
                this.handleServiceCardClick(serviceCard);
            }
        });

        // Handle edit service button
        document.addEventListener('click', (e) => {
            if (e.target.closest('[data-action="edit-service"]')) {
                const editBtn = e.target.closest('[data-action="edit-service"]');
                const serviceId = editBtn.dataset.service;
                this.editService(serviceId);
            }
        });

        // Handle view details button
        document.addEventListener('click', (e) => {
            if (e.target.closest('[data-action="view-details"]')) {
                const viewBtn = e.target.closest('[data-action="view-details"]');
                const serviceId = viewBtn.dataset.service;
                this.viewServiceDetails(serviceId);
            }
        });

        // Handle floating action button
        document.addEventListener('click', (e) => {
            if (e.target.closest('.ms-floating-action-button')) {
                e.preventDefault();
                this.addNewService();
            }
        });

        // Handle search functionality
        const searchInput = document.querySelector('.ms-search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.filterServices(e.target.value);
            });
        }


    },

    /**
     * Switch between tabs
     */
    switchTab: function(tabName) {
        console.log('Switching to tab:', tabName);
        
        // Remove active class from all tabs
        document.querySelectorAll('.ms-tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Hide all tab contents
        document.querySelectorAll('.ms-tab-content').forEach(content => {
            content.classList.remove('active');
        });
        
        // Add active class to selected tab
        const selectedTab = document.querySelector(`.ms-tab-btn[data-tab="${tabName}"]`);
        if (selectedTab) {
            selectedTab.classList.add('active');
            console.log('Activated tab button:', tabName);
        } else {
            console.error('Tab button not found:', tabName);
        }
        
        // Show selected tab content
        const selectedContent = document.querySelector(`.ms-tab-content[data-tab="${tabName}"]`);
        if (selectedContent) {
            selectedContent.classList.add('active');
            console.log('Activated tab content:', tabName);
        } else {
            console.error('Tab content not found:', tabName);
        }
        
        // Update current tab
        this.currentTab = tabName;
        
        // Update floating action button
        this.updateFloatingButton();
        
        // Update URL hash
        window.location.hash = `tab=${tabName}`;
        
        // Trigger custom event
        document.dispatchEvent(new CustomEvent('tabChanged', {
            detail: { tab: tabName }
        }));
    },

    /**
     * Update floating action button based on current tab
     */
    updateFloatingButton: function() {
        const fab = document.querySelector('.ms-floating-action-button');
        if (!fab) return;
        
        // Update the data attribute
        fab.setAttribute('data-current-tab', this.currentTab);
        
        // Update the icon if needed
        const fabIcon = fab.querySelector('.ms-fab-icon');
        if (fabIcon) {
            fabIcon.textContent = '+';
        }
        
        // Add visual feedback
        fab.style.transform = 'scale(1.1)';
        setTimeout(() => {
            fab.style.transform = '';
        }, 200);
        
        console.log('Floating button updated for tab:', this.currentTab);
    },

    /**
     * Add new service based on current tab
     */
    addNewService: function() {
        const formPage = this.tabFormMapping[this.currentTab];
        if (!formPage) {
            console.error('No form mapping found for tab:', this.currentTab);
            return;
        }
        
        console.log('Adding new service for tab:', this.currentTab, '->', formPage);
        
        // Show loading state
        this.showLoadingState();
        
        // Navigate to the appropriate form
        setTimeout(() => {
            if (typeof Router !== 'undefined' && Router.navigate) {
                Router.navigate(formPage);
            } else {
                window.location.href = `#${formPage}`;
            }
        }, 500);
    },

    /**
     * Handle service card click
     */
    handleServiceCardClick: function(serviceCard) {
        const serviceId = serviceCard.dataset.service;
        console.log('Service card clicked:', serviceId);
        
        // Add visual feedback
        serviceCard.style.transform = 'scale(0.98)';
        setTimeout(() => {
            serviceCard.style.transform = '';
        }, 150);
    },

    /**
     * Edit service
     */
    editService: function(serviceId) {
        console.log('Editing service:', serviceId);
        
        // Show loading state
        this.showLoadingState();
        
        // In a real app, this would navigate to the edit form
        setTimeout(() => {
            Toast.show('تعديل الخدمة', `جاري فتح نموذج تعديل ${serviceId}`, 'info');
            
            // Navigate to edit form (you can customize this based on service type)
            const editFormPage = this.getEditFormPage(serviceId);
            if (editFormPage && typeof Router !== 'undefined') {
                Router.navigate(editFormPage);
            }
        }, 1000);
    },

    /**
     * View service details
     */
    viewServiceDetails: function(serviceId) {
        console.log('Viewing service details:', serviceId);
        
        // Show service details modal
        this.showServiceDetailsModal(serviceId);
    },

    /**
     * Get edit form page based on service ID
     */
    getEditFormPage: function(serviceId) {
        // Extract service type from service ID
        const serviceType = serviceId.split('-')[0];
        return this.tabFormMapping[serviceType] || 'my-services';
    },

    /**
     * Show service details modal
     */
    showServiceDetailsModal: function(serviceId) {
        const serviceData = this.getServiceData(serviceId);
        if (!serviceData) return;
        
        const modalContent = `
            <div class="modal-header">
                <h3>تفاصيل الخدمة - ${serviceData.name}</h3>
                <button class="modal-close" data-action="close-modal">&times;</button>
            </div>
            <div class="modal-body">
                <div class="service-details">
                    <div class="detail-row">
                        <span class="detail-label">اسم الخدمة:</span>
                        <span class="detail-value">${serviceData.name}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">الحالة:</span>
                        <span class="detail-value status-${serviceData.status}">${serviceData.statusText}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">السعر:</span>
                        <span class="detail-value">${serviceData.price}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">التقييم:</span>
                        <span class="detail-value">${serviceData.rating}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">الوصف:</span>
                        <span class="detail-value">${serviceData.description}</span>
                    </div>
                </div>
            </div>
        `;
        
        // Show modal (assuming you have a Modal component)
        if (typeof Modal !== 'undefined') {
            Modal.show('service-details-modal', modalContent);
        } else {
            // Fallback: show alert
            alert(`تفاصيل الخدمة: ${serviceData.name}`);
        }
    },

    /**
     * Get service data
     */
    getServiceData: function(serviceId) {
        // Mock data - in a real app, this would come from the server
        const serviceData = {
            'shipping-1': {
                name: 'خدمة الشحن السريع',
                status: 'active',
                statusText: 'نشط',
                price: '150 ريال لكل شحنة',
                rating: '4.9 (15 تقييم)',
                description: 'خدمة شحن سريع للبضائع مع تتبع فوري وضمان التسليم'
            },
            'shipping-2': {
                name: 'الشحن البحري',
                status: 'active',
                statusText: 'نشط',
                price: '2,500 ريال لكل حاوية',
                rating: '4.7 (8 تقييم)',
                description: 'خدمات شحن بحري للبضائع الثقيلة والحاويات'
            },
            'warehouse-1': {
                name: 'مستودع الرياض المركزي',
                status: 'active',
                statusText: 'نشط',
                price: '3,500 ريال شهرياً',
                rating: '4.8 (12 تقييم)',
                description: 'مستودع مركزي في الرياض مع إدارة مخزون متقدمة'
            }
        };
        
        return serviceData[serviceId];
    },

    /**
     * Filter services based on search query
     */
    filterServices: function(query) {
        console.log('Filtering services with query:', query);
        
        const serviceCards = document.querySelectorAll('.ms-service-card');
        
        serviceCards.forEach(card => {
            const serviceName = card.querySelector('.ms-service-name').textContent;
            const serviceDesc = card.querySelector('.ms-service-description').textContent;
            
            const matches = serviceName.toLowerCase().includes(query.toLowerCase()) ||
                           serviceDesc.toLowerCase().includes(query.toLowerCase());
            
            card.style.display = matches ? 'flex' : 'none';
        });
    },



    /**
     * Show loading state
     */
    showLoadingState: function() {
        // Add loading overlay
        const loadingOverlay = document.createElement('div');
        loadingOverlay.id = 'loadingOverlay';
        loadingOverlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 999999;
            backdrop-filter: blur(4px);
        `;
        
        loadingOverlay.innerHTML = `
            <div style="
                background: white;
                padding: 20px;
                border-radius: 12px;
                display: flex;
                align-items: center;
                gap: 12px;
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
            ">
                <div class="spinner" style="
                    width: 20px;
                    height: 20px;
                    border: 2px solid #f3f3f3;
                    border-top: 2px solid var(--primary-color);
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                "></div>
                <span style="color: var(--text-primary); font-weight: 600;">جاري التحميل...</span>
            </div>
        `;
        
        document.body.appendChild(loadingOverlay);
        
        // Remove loading overlay after 2 seconds
        setTimeout(() => {
            if (loadingOverlay.parentNode) {
                loadingOverlay.remove();
            }
        }, 2000);
    },

    /**
     * Load services data
     */
    loadServicesData: function() {
        console.log('Loading services data...');
        
        // In a real app, this would fetch data from the server
        setTimeout(() => {
            this.updateServiceCounts();
            this.updateStats();
        }, 500);
    },

    /**
     * Update service counts in tab badges
     */
    updateServiceCounts: function() {
        // Mock data - in a real app, this would come from the server
        const serviceCounts = {
            'shipping': 8,
            'warehouses': 3,
            'customs': 5,
            'packaging': 4,
            'lc-services': 2,
            'last-mile': 2
        };
        
        Object.keys(serviceCounts).forEach(tabName => {
            const badge = document.querySelector(`[data-tab="${tabName}"] .ms-tab-badge`);
            if (badge) {
                badge.textContent = serviceCounts[tabName];
            }
        });
    },

    /**
     * Update stats overview
     */
    updateStats: function() {
        // Mock data - in a real app, this would come from the server
        const stats = {
            totalServices: 24,
            activeServices: 18,
            averageRating: 4.8,
            totalRevenue: '15,500'
        };
        
        // Update stats display
        const statElements = document.querySelectorAll('.ms-stat-value');
        if (statElements.length >= 4) {
            statElements[0].textContent = stats.totalServices;
            statElements[1].textContent = stats.activeServices;
            statElements[2].textContent = stats.averageRating;
            statElements[3].textContent = stats.totalRevenue;
        }
    },

    /**
     * Handle URL hash changes
     */
    handleHashChange: function() {
        const hash = window.location.hash;
        const tabMatch = hash.match(/tab=([^&]+)/);
        
        if (tabMatch && tabMatch[1]) {
            const tabName = tabMatch[1];
            if (this.tabFormMapping[tabName]) {
                this.switchTab(tabName);
            }
        }
    },

    /**
     * Clean up when leaving the page
     */
    destroy: function() {
        console.log('MyServicesController destroyed');
        // Clean up any event listeners or timers
    }
};

// Debug: Check if MyServicesController is properly declared
console.log('MyServicesController declared:', typeof MyServicesController !== 'undefined');
console.log('MyServicesController in window:', typeof window.MyServicesController !== 'undefined');

// Explicitly attach to global scope
window.MyServicesController = MyServicesController;
console.log('MyServicesController attached to window:', typeof window.MyServicesController !== 'undefined');

// Handle hash changes
window.addEventListener('hashchange', () => {
    if (typeof MyServicesController !== 'undefined') {
        MyServicesController.handleHashChange();
    }
}); 