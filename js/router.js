/**
 * Router for handling page navigation
 */
const Router = {
    currentPage: null,
    pageCache: {},
    
    /**
     * Initialize the router
     */
    init: function() {
        this.pageContainer = document.getElementById('page-container');
    },
    
    /**
     * Navigate to a specific page
     * @param {string} pageId - ID of the page to navigate to
     */
    navigate: function(pageId) {
        // Don't navigate if we're already on this page
        if (this.currentPage === pageId) return;
        
        // Show loader during navigation
        Loader.show();
        
        // Load the page content
        this.loadPage(pageId)
            .then(() => {
                // Update active state
                this.setActivePage(pageId);
                
                // Update bottom navigation
                this.updateNavigation(pageId);
                
                // Hide loader
                setTimeout(() => Loader.hide(), 300);
                
                // Update current page
                this.currentPage = pageId;
                
                // Update app state
                State.update('currentPage', pageId);
                
                // Initialize page controller if exists - ensure DOM is ready
                setTimeout(() => {
                    this.initializePageController(pageId);
                }, 100);
            })
            .catch(error => {
                console.error('Error loading page:', error);
                Toast.show('غير جاهزة بعد', 'يتم تصميمها في الوقت الحالي', 'danger');
                Loader.hide();
            });
    },
    
    /**
     * Load a page from cache or fetch from server
     * @param {string} pageId - ID of the page to load
     * @returns {Promise} - Promise that resolves when the page is loaded
     */
    loadPage: function(pageId) {
        return new Promise((resolve, reject) => {
            // Check if the page is cached
            if (this.pageCache[pageId]) {
                this.renderPage(pageId, this.pageCache[pageId]);
                resolve();
                return;
            }
            
            // Fetch the page template
            fetch(`templates/pages/${pageId}.html`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Page not found');
                    }
                    return response.text();
                })
                .then(html => {
                    // Cache the page
                    this.pageCache[pageId] = html;
                    
                    // Render the page
                    this.renderPage(pageId, html);
                    
                    resolve();
                })
                .catch(error => {
                    reject(error);
                });
        });
    },
    
    /**
     * Render a page to the page container
     * @param {string} pageId - ID of the page
     * @param {string} html - HTML content of the page
     */
    renderPage: function(pageId, html) {
        // Create page element if it doesn't exist
        let pageElement = document.getElementById(pageId);
        
        if (!pageElement) {
            pageElement = document.createElement('div');
            pageElement.id = pageId;
            pageElement.className = 'page';
            this.pageContainer.appendChild(pageElement);
        }
        
        // Set the page content
        pageElement.innerHTML = html;
    },
    
    /**
     * Set the active page
     * @param {string} pageId - ID of the page to set as active
     */
    setActivePage: function(pageId) {
        console.log(`Setting active page: ${pageId}`);
        // Hide all pages
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
            page.style.display = 'none'; // Force hide all pages
        });
        
        // Show the active page
        const activePage = document.getElementById(pageId);
        if (activePage) {
            activePage.classList.add('active');
            activePage.style.display = 'flex'; // Force show active page
            console.log(`Activated page: ${pageId}`);
        } else {
            console.error(`Page element not found: ${pageId}`);
        }
    },
    
    /**
     * Update the bottom navigation active state
     * @param {string} pageId - ID of the active page
     */
    updateNavigation: function(pageId) {
        // Remove active class from all nav items
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Add active class to the current nav item
        const activeNav = document.querySelector(`.nav-item[data-page="${pageId}"]`);
        if (activeNav) {
            activeNav.classList.add('active');
        }
    },
    
    /**
     * Initialize page controller if exists
     * @param {string} pageId - ID of the page to initialize controller for
     */
    initializePageController: function(pageId) {
        // Map page IDs to controller names
        const controllerMap = {
            'warehouse-form': 'WarehouseFormController',
            'customs-form': 'CustomsFormController',
            'vehicle-form': 'VehicleFormController',
            'packaging-form': 'PackagingFormController',
            'lc-service-form': 'LCServiceFormController',
            'delivery-provider-form': 'DeliveryProviderFormController',
            'shipping-form': 'ShippingFormController',
            'warehouses': 'WarehousesController',
            'dashboard': 'DashboardController',
            'orders': 'OrdersController',
            'reports': 'ReportsController',
            'analytics': 'AnalyticsController',
            'billing': 'BillingController',
            'help': 'HelpController',
            'myshipping': 'MyShippingController',
            'mycustoms': 'MyCustomsController',
            'mywarehouses': 'MyWarehousesController',
            'my-packaging': 'MyPackagingController',
            'my-lc-services': 'MyLcServicesController',
            'my-last-mile': 'MyLastMileController',
            'service-providers': 'ServiceProvidersController',
            'notifications': 'NotificationsController',
            'profile': 'ProfileController',
            'settings': 'SettingsController',
            'shipping': 'ShippingController',
            'warehouse-management': 'WarehouseManagementController',
            'marketing': 'MarketingController',
            'order-form': 'OrderFormController',
            'order-details': 'OrderDetailsController',
            'getting-started': 'GettingStartedController'
        };
        
        // Get controller name from map or generate default
        const controllerName = controllerMap[pageId] || pageId.charAt(0).toUpperCase() + pageId.slice(1) + 'Controller';
        
        // Debug: Check what controllers are available
        console.log(`Looking for controller: ${controllerName}`);
        console.log('Available controllers:', Object.keys(window).filter(key => key.endsWith('Controller')));
        
        // Initialize controller if it exists
        if (window[controllerName]) {
            console.log(`Initializing controller: ${controllerName} for page: ${pageId}`);
            window[controllerName].init();
        } else {
            console.log(`Controller not found: ${controllerName} for page: ${pageId}`);
            console.log('Available controllers:', Object.keys(window).filter(key => key.endsWith('Controller')));
        }
    }
};