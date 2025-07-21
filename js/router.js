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
     * Navigate to a page
     * @param {string} pageId - ID of the page to navigate to
     */
    navigate: function(pageId) {
        console.log(`Navigating to: ${pageId}`);
        
        // Clean the pageId to remove query parameters for comparison
        const cleanPageId = pageId.split('?')[0];
        
        // Don't navigate if we're already on this page
        if (this.currentPage === cleanPageId) return;
        
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
                this.currentPage = cleanPageId;
                
                // Update app state
                State.update('currentPage', cleanPageId);
                
                // Initialize page controller if exists - ensure DOM is ready
                setTimeout(() => {
                    this.initializePageController(pageId);
                }, 100);
                
                // Ensure side drawer is properly connected after navigation
                setTimeout(() => {
                    if (typeof DrawerHelper !== 'undefined') {
                        DrawerHelper.reconnectMenuButtons();
                    }
                    
                    // Ensure side drawer exists and is properly initialized
                    if (typeof SideDrawer !== 'undefined') {
                        // Check if drawer exists, if not recreate it
                        if (!document.getElementById('sideDrawer')) {
                            console.log('Side drawer not found, recreating...');
                            SideDrawer.forceRecreate();
                        }
                    }
                }, 300);
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
            // Clean the pageId to remove query parameters
            const cleanPageId = pageId.split('?')[0];
            
            // Check if the page is cached
            if (this.pageCache[cleanPageId]) {
                this.renderPage(cleanPageId, this.pageCache[cleanPageId]);
                resolve();
                return;
            }
            
            // Fetch the page template
            fetch(`templates/pages/${cleanPageId}.html`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Page not found');
                    }
                    return response.text();
                })
                .then(html => {
                    // Cache the page
                    this.pageCache[cleanPageId] = html;
                    
                    // Render the page
                    this.renderPage(cleanPageId, html);
                    
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
        // Clean the pageId to remove query parameters
        const cleanPageId = pageId.split('?')[0];
        
        // Create page element if it doesn't exist
        let pageElement = document.getElementById(cleanPageId);
        
        if (!pageElement) {
            pageElement = document.createElement('div');
            pageElement.id = cleanPageId;
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
        // Clean the pageId to remove query parameters
        const cleanPageId = pageId.split('?')[0];
        
        // Hide all pages
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
            page.style.display = 'none'; // Force hide all pages
        });
        
        // Show the active page
        const activePage = document.getElementById(cleanPageId);
        if (activePage) {
            activePage.classList.add('active');
            activePage.style.display = 'flex'; // Force show active page
            console.log(`Activated page: ${cleanPageId}`);
        } else {
            console.error(`Page element not found: ${cleanPageId}`);
        }
    },
    
    /**
     * Update the bottom navigation active state
     * @param {string} pageId - ID of the active page
     */
    updateNavigation: function(pageId) {
        // Clean the pageId to remove query parameters
        const cleanPageId = pageId.split('?')[0];
        
        // Remove active class from all nav items
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Add active class to the current nav item
        const activeNav = document.querySelector(`.nav-item[data-page="${cleanPageId}"]`);
        if (activeNav) {
            activeNav.classList.add('active');
        }
    },
    
    /**
     * Initialize page controller if exists
     * @param {string} pageId - ID of the page to initialize controller for
     */
    initializePageController: function(pageId) {
        // Clean the pageId to remove query parameters
        const cleanPageId = pageId.split('?')[0];
        
        // Map page IDs to controller names
        const controllerMap = {
            'warehouse-form': 'WarehouseFormController',
            'customs-form': 'CustomsFormController',
            'vehicle-form': 'VehicleFormController',
            'packaging-form': 'PackagingFormController',
            'lc-service-form': 'LCServiceFormController',
            'delivery-provider-form': 'DeliveryProviderFormController',
            'shipping-form': 'ShippingFormController',
            'marketing-form': 'MarketingFormController',
            'warehouses': 'WarehousesController',
            'dashboard': 'DashboardController',
            'orders': 'OrdersController',
            'reports': 'ReportsController',
            'analytics': 'AnalyticsController',
            'billing': 'BillingController',
            'help': 'HelpController',
            'account-management': 'AccountManagementController',
            'my-packaging': 'MyPackagingController',
            'my-lc-services': 'MyLcServicesController',
            'my-last-mile': 'MyLastMileController',
            'my-services': 'MyServicesController',
            'service-providers': 'ServiceProvidersController',
            'notifications': 'NotificationsController',
            'profile': 'ProfileController',
            'settings': 'SettingsController',
            'shipping': 'ShippingController',
            'warehouse-management': 'WarehouseManagementController',
            'marketing': 'MarketingController',
            'order-form': 'OrderFormController',
            'order-details': 'OrderDetailsController',
            'global-request-details': 'GlobalRequestDetailsController',
            'getting-started': 'GettingStartedController',
            'warehouse-management-form': 'WarehouseManagementFormController',
            'offer-form': 'OfferFormController',
            'my-offers': 'MyOffersController',
            
        };
        
        // Get controller name from map or generate default
        const controllerName = controllerMap[cleanPageId] || cleanPageId.charAt(0).toUpperCase() + cleanPageId.slice(1) + 'Controller';
        
        // Debug: Check what controllers are available
        console.log(`Looking for controller: ${controllerName}`);
        console.log('Available controllers:', Object.keys(window).filter(key => key.endsWith('Controller')));
        
        // Initialize controller if it exists
        if (window[controllerName]) {
            console.log(`Initializing controller: ${controllerName} for page: ${cleanPageId}`);
            window[controllerName].init();
            
            // Dispatch custom event for side drawer integration
            setTimeout(() => {
                document.dispatchEvent(new CustomEvent('pageLoaded', { detail: { pageId: cleanPageId } }));
            }, 200);
        } else {
            console.log(`Controller not found: ${controllerName} for page: ${cleanPageId}`);
            console.log('Available controllers:', Object.keys(window).filter(key => key.endsWith('Controller')));
        }
    }
};