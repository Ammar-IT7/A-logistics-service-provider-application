/**
 * Drawer Helper Utility - Easy integration for any page
 */
const DrawerHelper = {
    /**
     * Initialize drawer for any page
     */
    init: function() {
        // Ensure SideDrawer component is loaded
        if (typeof SideDrawer === 'undefined') {
            console.warn('SideDrawer component not found. Make sure to include side-drawer.js');
            return;
        }
        
        // Initialize the drawer
        SideDrawer.init();
        
        // Connect existing menu buttons to the drawer
        this.connectExistingMenuButtons();
        
        // Setup navigation listeners for SPA routing
        this.setupNavigationListeners();
    },

    /**
     * Connect existing menu buttons to the drawer
     */
    connectExistingMenuButtons: function() {
        // Find all existing menu buttons
        const menuButtons = document.querySelectorAll('[data-action="menu"], [data-action="toggle-drawer"], .menu-btn, .hamburger-btn, .sidebar-toggle');
        
        menuButtons.forEach(button => {
            // Check if this button already has our click handler
            if (button.hasAttribute('data-drawer-connected')) {
                return; // Skip if already connected
            }
            
            // Add a marker to prevent duplicate connections
            button.setAttribute('data-drawer-connected', 'true');
            
            // Add click handler directly without replacing the element
            button.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                if (typeof SideDrawer !== 'undefined') {
                    SideDrawer.toggle();
                }
            });
        });
    },

    /**
     * Add drawer toggle to any element
     */
    addToggleToElement: function(element, action = 'toggle') {
        if (!element) return;

        // Check if this element already has our click handler
        if (element.hasAttribute('data-drawer-connected')) {
            return; // Skip if already connected
        }

        // Add a marker to prevent duplicate connections
        element.setAttribute('data-drawer-connected', 'true');

        element.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            if (typeof SideDrawer !== 'undefined') {
                switch (action) {
                    case 'toggle':
                        SideDrawer.toggle();
                        break;
                    case 'open':
                        SideDrawer.open();
                        break;
                    case 'close':
                        SideDrawer.close();
                        break;
                }
            }
        });
    },

    /**
     * Create a floating menu button
     */
    createFloatingMenuButton: function() {
        const floatingBtn = document.createElement('button');
        floatingBtn.className = 'floating-menu-btn';
        floatingBtn.setAttribute('data-action', 'menu');
        floatingBtn.setAttribute('aria-label', 'فتح القائمة');
        floatingBtn.innerHTML = '<i class="fas fa-bars"></i>';
        floatingBtn.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            width: 56px;
            height: 56px;
            border: none;
            background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%);
            border-radius: 50%;
            color: white;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
            box-shadow: 0 4px 20px rgba(102, 126, 234, 0.3);
            z-index: 1000;
            font-size: 1.25rem;
        `;

        // Add hover effect
        floatingBtn.addEventListener('mouseenter', () => {
            floatingBtn.style.transform = 'scale(1.1)';
            floatingBtn.style.boxShadow = '0 6px 25px rgba(102, 126, 234, 0.4)';
        });

        floatingBtn.addEventListener('mouseleave', () => {
            floatingBtn.style.transform = 'scale(1)';
            floatingBtn.style.boxShadow = '0 4px 20px rgba(102, 126, 234, 0.3)';
        });

        // Add click handler
        floatingBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (typeof SideDrawer !== 'undefined') {
                SideDrawer.toggle();
            }
        });

        // Add to body
        document.body.appendChild(floatingBtn);
        return floatingBtn;
    },

    /**
     * Remove floating menu button
     */
    removeFloatingMenuButton: function() {
        const floatingBtn = document.querySelector('.floating-menu-btn');
        if (floatingBtn) {
            floatingBtn.remove();
        }
    },

    /**
     * Update drawer badges with custom data
     */
    updateBadges: function(badgeData) {
        if (typeof SideDrawer !== 'undefined' && SideDrawer.updateBadges) {
            // Store custom badge data
            SideDrawer.customBadgeData = badgeData;
            SideDrawer.updateBadges();
        }
    },

    /**
     * Update user info in drawer
     */
    updateUserInfo: function(userData) {
        if (typeof SideDrawer !== 'undefined' && SideDrawer.updateUserInfo) {
            // Store custom user data
            SideDrawer.customUserData = userData;
            SideDrawer.updateUserInfo();
        }
    },

    /**
     * Handle page navigation and re-connect menu buttons
     */
    handlePageNavigation: function() {
        // Wait a bit for DOM to be ready
        setTimeout(() => {
            this.connectExistingMenuButtons();
        }, 100);
    },

    /**
     * Setup navigation listeners for SPA routing
     */
    setupNavigationListeners: function() {
        // Listen for custom navigation events
        document.addEventListener('pageLoaded', () => {
            this.handlePageNavigation();
        });

        // Listen for hash changes
        window.addEventListener('hashchange', () => {
            this.handlePageNavigation();
        });

        // Listen for popstate (browser back/forward)
        window.addEventListener('popstate', () => {
            this.handlePageNavigation();
        });

        // Listen for custom router events
        document.addEventListener('router:navigate', () => {
            this.handlePageNavigation();
        });

        // Listen for content changes (for dynamic content loading)
        const observer = new MutationObserver((mutations) => {
            let shouldReconnect = false;
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                    // Check if any menu buttons were added
                    mutation.addedNodes.forEach((node) => {
                        if (node.nodeType === 1) { // Element node
                            if (node.matches && node.matches('[data-action="menu"], [data-action="toggle-drawer"], .menu-btn, .hamburger-btn, .sidebar-toggle')) {
                                shouldReconnect = true;
                            }
                            if (node.querySelector && node.querySelector('[data-action="menu"], [data-action="toggle-drawer"], .menu-btn, .hamburger-btn, .sidebar-toggle')) {
                                shouldReconnect = true;
                            }
                        }
                    });
                }
            });
            
            if (shouldReconnect) {
                this.handlePageNavigation();
            }
        });

        // Observe the entire document for changes
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });

        // Listen for side drawer initialization
        document.addEventListener('sideDrawer:initialized', () => {
            this.connectExistingMenuButtons();
        });
    },

    /**
     * Public method to manually reconnect menu buttons
     * Call this from page controllers after page content is loaded
     */
    reconnectMenuButtons: function() {
        this.connectExistingMenuButtons();
    }
};

// Attach to window object
window.DrawerHelper = DrawerHelper;

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Initialize drawer helper to connect existing menu buttons
    DrawerHelper.init();
}); 