/**
 * Side Drawer Component - Reusable Navigation Component
 */
const SideDrawer = {
    /**
     * Ensure side drawer CSS is properly applied
     */
    ensureCSSApplied: function() {
        const sideDrawer = document.getElementById('sideDrawer');
        const sideDrawerOverlay = document.getElementById('sideDrawerOverlay');
        
        if (sideDrawer) {
            // Ensure CSS classes are applied
            sideDrawer.className = 'side-drawer';
            sideDrawer.style.cssText = `
                position: fixed !important;
                top: 0 !important;
                right: -320px !important;
                width: 320px !important;
                height: 100vh !important;
                background: linear-gradient(180deg, #ffffff 0%, #f8f9fa 100%) !important;
                box-shadow: -4px 0 20px rgba(0, 0, 0, 0.15) !important;
                z-index: 99999 !important;
                display: flex !important;
                flex-direction: column !important;
                transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) !important;
                border-left: 1px solid rgba(0, 0, 0, 0.1) !important;
                transform: translateX(0) !important;
                visibility: visible !important;
                opacity: 1 !important;
                overflow: visible !important;
            `;
            
            // Force layout recalculation
            sideDrawer.offsetHeight;
        }
        
        if (sideDrawerOverlay) {
            sideDrawerOverlay.className = 'side-drawer-overlay';
            sideDrawerOverlay.style.cssText = `
                position: fixed !important;
                top: 0 !important;
                left: 0 !important;
                right: 0 !important;
                bottom: 0 !important;
                background: rgba(0, 0, 0, 0.5) !important;
                backdrop-filter: blur(4px) !important;
                z-index: 99998 !important;
                opacity: 0 !important;
                visibility: hidden !important;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
            `;
        }
        
        console.log('CSS forcefully applied to drawer elements');
    },

    /**
     * Ensure drawer is properly closed and hidden
     */
    ensureDrawerClosed: function() {
        const sideDrawer = document.getElementById('sideDrawer');
        const sideDrawerOverlay = document.getElementById('sideDrawerOverlay');
        
        if (sideDrawer) {
            sideDrawer.style.right = '-320px';
            sideDrawer.style.transform = 'translateX(0)';
            sideDrawer.classList.remove('open');
            console.log('Ensured drawer is closed');
        }
        
        if (sideDrawerOverlay) {
            sideDrawerOverlay.style.opacity = '0';
            sideDrawerOverlay.style.visibility = 'hidden';
            sideDrawerOverlay.classList.remove('open');
            console.log('Ensured overlay is hidden');
        }
    },

    /**
     * Initialize the side drawer component
     */
    init: function() {
        console.log('SideDrawer component initialized');
        this.loadDrawerHTML();
        this.setupEventListeners();
        this.updateUserInfo();
        this.updateBadges();
        
        // Ensure CSS is properly applied
        setTimeout(() => {
            this.ensureCSSApplied();
            // Ensure drawer starts in closed state
            this.ensureDrawerClosed();
        }, 100);
        
        // Emit custom event for other components
        document.dispatchEvent(new CustomEvent('sideDrawer:initialized'));
        
        console.log('SideDrawer initialization complete');
    },

    /**
     * Load drawer HTML into the page
     */
    loadDrawerHTML: function() {
        console.log('Loading drawer HTML...');
        // Check if drawer already exists
        if (document.getElementById('sideDrawer')) {
            console.log('Drawer already exists, skipping creation');
            return;
        }

        console.log('Creating drawer HTML structure...');
        // Create the drawer structure dynamically
        this.createDrawerStructure();
        console.log('Drawer HTML structure created');
    },

    /**
     * Create drawer structure dynamically
     */
    createDrawerStructure: function() {
        console.log('Creating drawer structure...');
        const drawerHTML = `
            <!-- Side Drawer Overlay -->
            <div id="sideDrawerOverlay" class="side-drawer-overlay"></div>

            <!-- Side Drawer Container -->
            <div id="sideDrawer" class="side-drawer">
                <!-- Side Drawer Header -->
                <div class="side-drawer-header">
                    <div class="side-drawer-header-content">
                        <div class="side-drawer-logo">
                            <i class="fas fa-truck"></i>
                            <span>خدمات لوجستية</span>
                        </div>
                        <button class="side-drawer-close" data-action="close-side-drawer" aria-label="إغلاق القائمة">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                </div>

                <!-- Side Drawer Content -->
                <div class="side-drawer-content">
                    <!-- User Section -->
                    <div class="side-drawer-user">
                        <div class="side-drawer-user-avatar">
                            <img src="https://via.placeholder.com/60x60/667eea/ffffff?text=أ" alt="صورة المستخدم">
                            <div class="side-drawer-user-status side-drawer-status-online"></div>
                        </div>
                        <div class="side-drawer-user-info">
                            <h3 class="side-drawer-user-name">أحمد محمد</h3>
                            <p class="side-drawer-user-role">مدير الخدمات اللوجستية</p>
                        </div>
                    </div>

                    <!-- Navigation Sections -->
                    <nav class="side-drawer-nav">
                        <!-- Main Services -->
                        <div class="side-drawer-nav-section">
                            <h5 class="side-drawer-nav-title">الخدمات الرئيسية</h5>
                            <div class="side-drawer-nav-items">
                                <a href="#" class="side-drawer-nav-item" data-action="navigate" data-page="dashboard">
                                    <div class="side-drawer-nav-icon">
                                        <i class="fas fa-tachometer-alt"></i>
                                    </div>
                                    <span class="side-drawer-nav-text">لوحة التحكم</span>
                                </a>
                                
                                <a href="#" class="side-drawer-nav-item" data-action="navigate" data-page="orders">
                                    <div class="side-drawer-nav-icon">
                                        <i class="fas fa-clipboard-list"></i>
                                    </div>
                                    <span class="side-drawer-nav-text">الطلبات</span>
                                    <div class="side-drawer-nav-badge">24</div>
                                </a>
                                
                                <a href="#" class="side-drawer-nav-item" data-action="navigate" data-page="reports">
                                    <div class="side-drawer-nav-icon">
                                        <i class="fas fa-chart-bar"></i>
                                    </div>
                                    <span class="side-drawer-nav-text">التقارير</span>
                                </a>
                                
                                <a href="#" class="side-drawer-nav-item" data-action="navigate" data-page="analytics">
                                    <div class="side-drawer-nav-icon">
                                        <i class="fas fa-chart-line"></i>
                                    </div>
                                    <span class="side-drawer-nav-text">التحليلات</span>
                                </a>
                                
                                <a href="#" class="side-drawer-nav-item" data-action="navigate" data-page="billing">
                                    <div class="side-drawer-nav-icon">
                                        <i class="fas fa-file-invoice-dollar"></i>
                                    </div>
                                    <span class="side-drawer-nav-text">الفواتير</span>
                                    <div class="side-drawer-nav-badge side-drawer-nav-badge-warning">8</div>
                                </a>
                            </div>
                        </div>

                        <!-- My Services -->
                        <div class="side-drawer-nav-section">
                            <h5 class="side-drawer-nav-title">خدماتي</h5>
                            <div class="side-drawer-nav-items">
                                <a href="#" class="side-drawer-nav-item" data-action="navigate" data-page="myshipping">
                                    <div class="side-drawer-nav-icon">
                                        <i class="fas fa-truck"></i>
                                    </div>
                                    <span class="side-drawer-nav-text">خدمات الشحن</span>
                                    <div class="side-drawer-nav-badge">3</div>
                                </a>
                                
                                <a href="#" class="side-drawer-nav-item" data-action="navigate" data-page="mywarehouses">
                                    <div class="side-drawer-nav-icon">
                                        <i class="fas fa-warehouse"></i>
                                    </div>
                                    <span class="side-drawer-nav-text">المخازن</span>
                                    <div class="side-drawer-nav-badge">2</div>
                                </a>
                                
                                <a href="#" class="side-drawer-nav-item" data-action="navigate" data-page="mycustoms">
                                    <div class="side-drawer-nav-icon">
                                        <i class="fas fa-clipboard-check"></i>
                                    </div>
                                    <span class="side-drawer-nav-text">التخليص الجمركي</span>
                                    <div class="side-drawer-nav-badge">8</div>
                                </a>
                                
                                <a href="#" class="side-drawer-nav-item" data-action="navigate" data-page="my-packaging">
                                    <div class="side-drawer-nav-icon">
                                        <i class="fas fa-box"></i>
                                    </div>
                                    <span class="side-drawer-nav-text">خدمات التغليف</span>
                                    <div class="side-drawer-nav-badge">2</div>
                                </a>
                                
                                <a href="#" class="side-drawer-nav-item" data-action="navigate" data-page="my-lc-services">
                                    <div class="side-drawer-nav-icon">
                                        <i class="fas fa-file-contract"></i>
                                    </div>
                                    <span class="side-drawer-nav-text">خطابات الاعتماد</span>
                                    <div class="side-drawer-nav-badge">0</div>
                                </a>
                                
                                <a href="#" class="side-drawer-nav-item" data-action="navigate" data-page="my-last-mile">
                                    <div class="side-drawer-nav-icon">
                                        <i class="fas fa-motorcycle"></i>
                                    </div>
                                    <span class="side-drawer-nav-text">التوصيل النهائي</span>
                                    <div class="side-drawer-nav-badge">0</div>
                                </a>
                            </div>
                        </div>

                        <!-- Public Services -->
                        <div class="side-drawer-nav-section">
                            <h5 class="side-drawer-nav-title">الخدمات العامة</h5>
                            <div class="side-drawer-nav-items">
                                <a href="#" class="side-drawer-nav-item" data-action="navigate" data-page="shipping">
                                    <div class="side-drawer-nav-icon">
                                        <i class="fas fa-shipping-fast"></i>
                                    </div>
                                    <span class="side-drawer-nav-text">خدمات الشحن</span>
                                </a>
                                
                                <a href="#" class="side-drawer-nav-item" data-action="navigate" data-page="warehouses">
                                    <div class="side-drawer-nav-icon">
                                        <i class="fas fa-warehouse"></i>
                                    </div>
                                    <span class="side-drawer-nav-text">المخازن</span>
                                </a>
                                
                                <a href="#" class="side-drawer-nav-item" data-action="navigate" data-page="customs">
                                    <div class="side-drawer-nav-icon">
                                        <i class="fas fa-clipboard-check"></i>
                                    </div>
                                    <span class="side-drawer-nav-text">التخليص الجمركي</span>
                                </a>
                                
                                <a href="#" class="side-drawer-nav-item" data-action="navigate" data-page="packaging">
                                    <div class="side-drawer-nav-icon">
                                        <i class="fas fa-box"></i>
                                    </div>
                                    <span class="side-drawer-nav-text">خدمات التغليف</span>
                                </a>
                                
                                <a href="#" class="side-drawer-nav-item" data-action="navigate" data-page="lc-services">
                                    <div class="side-drawer-nav-icon">
                                        <i class="fas fa-file-contract"></i>
                                    </div>
                                    <span class="side-drawer-nav-text">خطابات الاعتماد</span>
                                </a>
                                
                                <a href="#" class="side-drawer-nav-item" data-action="navigate" data-page="last-mile-delivery">
                                    <div class="side-drawer-nav-icon">
                                        <i class="fas fa-motorcycle"></i>
                                    </div>
                                    <span class="side-drawer-nav-text">التوصيل النهائي</span>
                                </a>
                            </div>
                        </div>

                        <!-- Quick Actions -->
                        <div class="side-drawer-quick-actions">
                            <h5 class="side-drawer-nav-title">إجراءات سريعة</h5>
                            <div class="side-drawer-quick-grid">
                                <button class="side-drawer-quick-btn" data-action="navigate" data-page="warehouse-form">
                                    <i class="fas fa-plus"></i>
                                    <span>إضافة مخزن</span>
                                </button>
                                <button class="side-drawer-quick-btn" data-action="navigate" data-page="shipping-form">
                                    <i class="fas fa-truck"></i>
                                    <span>إضافة شحن</span>
                                </button>
                                <button class="side-drawer-quick-btn" data-action="navigate" data-page="customs-form">
                                    <i class="fas fa-clipboard-check"></i>
                                    <span>إضافة تخليص</span>
                                </button>
                                <button class="side-drawer-quick-btn" data-action="navigate" data-page="packaging-form">
                                    <i class="fas fa-box"></i>
                                    <span>إضافة تغليف</span>
                                </button>
                            </div>
                        </div>

                        <!-- System Status -->
                        <div class="side-drawer-system-status">
                            <div class="side-drawer-status-item">
                                <div class="side-drawer-status-indicator side-drawer-status-online"></div>
                                <span class="side-drawer-status-text">النظام متصل</span>
                            </div>
                            <div class="side-drawer-status-item">
                                <div class="side-drawer-status-indicator side-drawer-status-sync"></div>
                                <span class="side-drawer-status-text">مزامنة البيانات</span>
                            </div>
                        </div>
                    </nav>
                </div>

                <!-- Drawer Footer -->
                <div class="side-drawer-footer">
                    <div class="side-drawer-footer-actions">
                        <button class="side-drawer-footer-btn" data-action="settings">
                            <i class="fas fa-cog"></i>
                            <span>الإعدادات</span>
                        </button>
                        <button class="side-drawer-footer-btn" data-action="help">
                            <i class="fas fa-question-circle"></i>
                            <span>المساعدة</span>
                        </button>
                        <button class="side-drawer-footer-btn" data-action="logout">
                            <i class="fas fa-sign-out-alt"></i>
                            <span>تسجيل الخروج</span>
                        </button>
                    </div>
                </div>
            </div>
        `;

        console.log('Inserting drawer HTML into body...');
        document.body.insertAdjacentHTML('beforeend', drawerHTML);
        console.log('Drawer HTML inserted successfully');
        console.log('Drawer element now exists:', !!document.getElementById('sideDrawer'));
        
        // Immediately apply CSS to ensure proper styling
        setTimeout(() => {
            this.ensureCSSApplied();
            console.log('CSS applied immediately after creation');
        }, 10);
    },

    /**
     * Create a minimal visible drawer for testing
     */
    createMinimalDrawer: function() {
        console.log('Creating minimal visible drawer for testing...');
        
        // Remove existing drawer
        const existingDrawer = document.getElementById('sideDrawer');
        const existingOverlay = document.getElementById('sideDrawerOverlay');
        if (existingDrawer) existingDrawer.remove();
        if (existingOverlay) existingOverlay.remove();
        
        // Create minimal drawer HTML
        const minimalHTML = `
            <div id="sideDrawerOverlay" style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); z-index: 99998;"></div>
            <div id="sideDrawer" style="position: fixed; top: 0; right: 0; width: 320px; height: 100vh; background: white; z-index: 99999; display: flex; flex-direction: column; box-shadow: -4px 0 20px rgba(0,0,0,0.15);">
                <div style="padding: 20px; background: #667eea; color: white; font-weight: bold;">Side Drawer Test</div>
                <div style="flex: 1; padding: 20px; overflow-y: auto;">
                    <h3>Test Content</h3>
                    <p>This is a test drawer to verify visibility.</p>
                    <p>If you can see this, the drawer is working!</p>
                </div>
                <div style="padding: 20px; border-top: 1px solid #eee;">
                    <button onclick="SideDrawer.close()" style="padding: 10px 20px; background: #667eea; color: white; border: none; border-radius: 5px; cursor: pointer;">Close</button>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', minimalHTML);
        console.log('Minimal drawer created for testing');
    },

    /**
     * Set up event listeners for the drawer
     */
    setupEventListeners: function() {
        // Handle side drawer navigation
        document.addEventListener('click', (e) => {
            if (e.target.closest('.side-drawer-nav-item')) {
                const navItem = e.target.closest('.side-drawer-nav-item');
                const page = navItem.dataset.page;
                if (page) {
                    e.preventDefault();
                    this.handleNavigation(page);
                }
            }
        });

        // Handle side drawer quick actions
        document.addEventListener('click', (e) => {
            if (e.target.closest('.side-drawer-quick-btn')) {
                const quickBtn = e.target.closest('.side-drawer-quick-btn');
                const page = quickBtn.dataset.page;
                if (page) {
                    e.preventDefault();
                    this.handleNavigation(page);
                }
            }
        });

        // Handle side drawer quick add service buttons
        document.addEventListener('click', (e) => {
            if (e.target.closest('.side-drawer-quick-add-btn')) {
                const quickAddBtn = e.target.closest('.side-drawer-quick-add-btn');
                const page = quickAddBtn.dataset.page;
                if (page) {
                    e.preventDefault();
                    this.handleQuickAddService(page);
                }
            }
        });

        // Handle side drawer footer actions
        document.addEventListener('click', (e) => {
            if (e.target.closest('.side-drawer-footer-btn')) {
                const footerBtn = e.target.closest('.side-drawer-footer-btn');
                const action = footerBtn.dataset.action;
                if (action) {
                    e.preventDefault();
                    this.handleFooterAction(action);
                }
            }
        });

        // Handle side drawer close button
        document.addEventListener('click', (e) => {
            if (e.target.closest('.side-drawer-close') || e.target.closest('[data-action="close-side-drawer"]')) {
                e.preventDefault();
                this.close();
            }
        });

        // Handle side drawer overlay click
        document.addEventListener('click', (e) => {
            if (e.target.id === 'sideDrawerOverlay') {
                this.close();
            }
        });

        // Handle ESC key to close drawer
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const sideDrawer = document.getElementById('sideDrawer');
                if (sideDrawer && sideDrawer.classList.contains('open')) {
                    this.close();
                }
            }
        });

        // Handle menu button clicks (for opening drawer)
        document.addEventListener('click', (e) => {
            if (e.target.closest('[data-action="menu"]') || e.target.closest('[data-action="toggle-drawer"]')) {
                e.preventDefault();
                this.toggle();
            }
        });
    },

    /**
     * Force recreate the drawer if it's missing
     */
    forceRecreate: function() {
        console.log('Force recreating drawer...');
        // Remove existing drawer if it exists
        const existingDrawer = document.getElementById('sideDrawer');
        const existingOverlay = document.getElementById('sideDrawerOverlay');
        
        if (existingDrawer) {
            existingDrawer.remove();
        }
        if (existingOverlay) {
            existingOverlay.remove();
        }
        
        // Recreate the drawer
        this.createDrawerStructure();
        this.setupEventListeners();
        this.updateUserInfo();
        this.updateBadges();
        
        console.log('Drawer force recreated');
    },

    /**
     * Toggle the side drawer
     */
    toggle: function() {
        console.log('SideDrawer toggle called');
        const sideDrawer = document.getElementById('sideDrawer');
        const sideDrawerOverlay = document.getElementById('sideDrawerOverlay');
        
        console.log('Side drawer element:', sideDrawer);
        console.log('Side drawer overlay element:', sideDrawerOverlay);
        
        if (sideDrawer && sideDrawerOverlay) {
            // Check if drawer is currently open by checking right position
            const currentRight = window.getComputedStyle(sideDrawer).right;
            const isOpen = currentRight === '0px' || sideDrawer.classList.contains('open');
            console.log('Drawer is currently open:', isOpen, 'Current right position:', currentRight);
            
            if (isOpen) {
                this.close();
            } else {
                this.open();
            }
        } else {
            console.error('Side drawer elements not found!');
            console.log('Available elements with "side" in ID:', document.querySelectorAll('[id*="side"]'));
            // Try to force recreate the drawer
            this.forceRecreate();
            // Try to open it again
            setTimeout(() => {
                this.open();
            }, 100);
        }
    },

    /**
     * Force drawer to be visible by hiding conflicting elements
     */
    forceDrawerVisible: function() {
        console.log('Forcing drawer to be visible...');
        
        // Temporarily hide any elements that might conflict
        const conflictingElements = document.querySelectorAll('.orders-filters-modal, .orders-floating-filter');
        conflictingElements.forEach(element => {
            element.style.display = 'none';
            console.log('Hidden conflicting element:', element.className);
        });
        
        const sideDrawer = document.getElementById('sideDrawer');
        const sideDrawerOverlay = document.getElementById('sideDrawerOverlay');
        
        if (sideDrawer) {
            // Force the drawer to be visible with maximum z-index
            sideDrawer.style.cssText = `
                position: fixed !important;
                top: 0 !important;
                right: 0 !important;
                width: 320px !important;
                height: 100vh !important;
                background: linear-gradient(180deg, #ffffff 0%, #f8f9fa 100%) !important;
                box-shadow: -4px 0 20px rgba(0, 0, 0, 0.15) !important;
                z-index: 999999 !important;
                display: flex !important;
                flex-direction: column !important;
                visibility: visible !important;
                opacity: 1 !important;
                overflow: visible !important;
                transform: translateX(0) !important;
            `;
            
            // Force a repaint
            sideDrawer.offsetHeight;
        }
        
        if (sideDrawerOverlay) {
            sideDrawerOverlay.style.cssText = `
                position: fixed !important;
                top: 0 !important;
                left: 0 !important;
                right: 0 !important;
                bottom: 0 !important;
                background: rgba(0, 0, 0, 0.5) !important;
                backdrop-filter: blur(4px) !important;
                z-index: 999998 !important;
                opacity: 1 !important;
                visibility: visible !important;
                display: block !important;
            `;
        }
        
        console.log('Drawer forced to be visible');
    },

    /**
     * Force drawer to be visible (only when opening)
     */
    forceVisible: function() {
        const sideDrawer = document.getElementById('sideDrawer');
        const sideDrawerOverlay = document.getElementById('sideDrawerOverlay');
        
        if (sideDrawer) {
            sideDrawer.style.display = 'flex';
            sideDrawer.style.visibility = 'visible';
            sideDrawer.style.opacity = '1';
            sideDrawer.style.zIndex = '99999';
            sideDrawer.style.position = 'fixed';
            sideDrawer.style.top = '0';
            sideDrawer.style.right = '0'; // Only set to 0 when opening
            sideDrawer.style.width = '320px';
            sideDrawer.style.height = '100vh';
            sideDrawer.style.transform = 'translateX(0)';
            sideDrawer.style.background = 'linear-gradient(180deg, #ffffff 0%, #f8f9fa 100%)';
            sideDrawer.style.boxShadow = '-4px 0 20px rgba(0, 0, 0, 0.15)';
            sideDrawer.style.borderLeft = '1px solid rgba(0, 0, 0, 0.1)';
            sideDrawer.style.flexDirection = 'column';
            sideDrawer.style.overflow = 'visible';
            console.log('Forced drawer visibility (opened)');
        }
        
        if (sideDrawerOverlay) {
            sideDrawerOverlay.style.display = 'block';
            sideDrawerOverlay.style.visibility = 'visible';
            sideDrawerOverlay.style.opacity = '1';
            sideDrawerOverlay.style.zIndex = '99998';
            sideDrawerOverlay.style.position = 'fixed';
            sideDrawerOverlay.style.top = '0';
            sideDrawerOverlay.style.left = '0';
            sideDrawerOverlay.style.right = '0';
            sideDrawerOverlay.style.bottom = '0';
            sideDrawerOverlay.style.background = 'rgba(0, 0, 0, 0.5)';
            sideDrawerOverlay.style.backdropFilter = 'blur(4px)';
            console.log('Forced overlay visibility (opened)');
        }
    },

    /**
     * Check for elements that might be covering the drawer
     */
    checkCoveringElements: function() {
        const sideDrawer = document.getElementById('sideDrawer');
        if (!sideDrawer) return;
        
        const drawerRect = sideDrawer.getBoundingClientRect();
        const allElements = document.querySelectorAll('*');
        const coveringElements = [];
        
        allElements.forEach(element => {
            if (element === sideDrawer || element === document.getElementById('sideDrawerOverlay')) {
                return; // Skip the drawer itself
            }
            
            const rect = element.getBoundingClientRect();
            const style = window.getComputedStyle(element);
            
            // Check if element overlaps with drawer
            if (rect.right > drawerRect.left && 
                rect.left < drawerRect.right && 
                rect.bottom > drawerRect.top && 
                rect.top < drawerRect.bottom &&
                style.zIndex !== 'auto' && 
                parseInt(style.zIndex) >= 9999) {
                coveringElements.push({
                    element: element,
                    tagName: element.tagName,
                    className: element.className,
                    zIndex: style.zIndex,
                    rect: rect
                });
            }
        });
        
        console.log('Elements that might be covering the drawer:', coveringElements);
        return coveringElements;
    },

    /**
     * Temporarily hide elements that might be covering the drawer
     */
    hideCoveringElements: function() {
        const coveringElements = this.checkCoveringElements();
        
        coveringElements.forEach(item => {
            if (item.zIndex >= 9999) {
                item.element.style.display = 'none';
                console.log('Hidden covering element:', item.tagName, item.className);
            }
        });
    },

    /**
     * Check and ensure drawer content is visible
     */
    ensureDrawerContentVisible: function() {
        const sideDrawer = document.getElementById('sideDrawer');
        if (!sideDrawer) return;
        
        // Check if drawer has content
        const hasContent = sideDrawer.children.length > 0;
        console.log('Drawer has content:', hasContent, 'Children count:', sideDrawer.children.length);
        
        // If no content, recreate the drawer
        if (!hasContent) {
            console.log('Drawer has no content, recreating...');
            this.forceRecreate();
            return;
        }
        
        // Ensure all child elements are visible
        const children = sideDrawer.querySelectorAll('*');
        children.forEach(child => {
            const style = window.getComputedStyle(child);
            if (style.display === 'none' || style.visibility === 'hidden') {
                child.style.display = '';
                child.style.visibility = 'visible';
                console.log('Made child element visible:', child.tagName, child.className);
            }
        });
        
        // Force a repaint
        sideDrawer.style.display = 'none';
        sideDrawer.offsetHeight; // Force reflow
        sideDrawer.style.display = 'flex';
        
        console.log('Drawer content visibility ensured');
    },

    /**
     * Check and ensure drawer content is taking up space
     */
    ensureDrawerContentSpace: function() {
        const sideDrawer = document.getElementById('sideDrawer');
        if (!sideDrawer) return;
        
        // Check if drawer content has proper dimensions
        const content = sideDrawer.querySelector('.side-drawer-content');
        if (content) {
            content.style.flex = '1';
            content.style.display = 'flex';
            content.style.flexDirection = 'column';
            content.style.overflowY = 'auto';
            content.style.padding = '20px';
            content.style.gap = '24px';
            console.log('Ensured drawer content takes up space');
        }
        
        // Ensure header has proper dimensions
        const header = sideDrawer.querySelector('.side-drawer-header');
        if (header) {
            header.style.padding = '20px';
            header.style.borderBottom = '1px solid rgba(0, 0, 0, 0.1)';
            header.style.background = 'linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%)';
            header.style.color = 'white';
            console.log('Ensured drawer header has proper dimensions');
        }
        
        // Ensure footer has proper dimensions
        const footer = sideDrawer.querySelector('.side-drawer-footer');
        if (footer) {
            footer.style.padding = '20px';
            footer.style.borderTop = '1px solid rgba(0, 0, 0, 0.1)';
            footer.style.background = 'rgba(0, 0, 0, 0.02)';
            console.log('Ensured drawer footer has proper dimensions');
        }
        
        // Force a repaint to ensure dimensions are calculated
        sideDrawer.style.display = 'none';
        sideDrawer.offsetHeight; // Force reflow
        sideDrawer.style.display = 'flex';
        
        console.log('Drawer content space ensured');
    },

    /**
     * Check if drawer is in viewport and visible
     */
    checkDrawerViewport: function() {
        const sideDrawer = document.getElementById('sideDrawer');
        if (!sideDrawer) return false;
        
        const rect = sideDrawer.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        
        console.log('Viewport check:', {
            drawerRect: rect,
            viewportWidth: viewportWidth,
            viewportHeight: viewportHeight,
            isInViewport: rect.right > 0 && rect.left < viewportWidth && rect.bottom > 0 && rect.top < viewportHeight,
            hasDimensions: rect.width > 0 && rect.height > 0
        });
        
        return rect.right > 0 && rect.left < viewportWidth && rect.bottom > 0 && rect.top < viewportHeight && rect.width > 0 && rect.height > 0;
    },

    /**
     * Check for CSS properties that might affect drawer positioning
     */
    checkDrawerCSSConflicts: function() {
        const sideDrawer = document.getElementById('sideDrawer');
        if (!sideDrawer) return;
        
        const style = window.getComputedStyle(sideDrawer);
        const parentStyle = window.getComputedStyle(sideDrawer.parentElement);
        
        console.log('Drawer CSS analysis:', {
            drawer: {
                position: style.position,
                top: style.top,
                right: style.right,
                width: style.width,
                height: style.height,
                transform: style.transform,
                zIndex: style.zIndex,
                display: style.display,
                visibility: style.visibility,
                opacity: style.opacity
            },
            parent: {
                position: parentStyle.position,
                transform: parentStyle.transform,
                overflow: parentStyle.overflow,
                zIndex: parentStyle.zIndex
            }
        });
        
        // Check if parent has any transforms that might affect positioning
        if (parentStyle.transform !== 'none') {
            console.warn('Parent element has transform that might affect drawer positioning');
        }
        
        // Check if parent has overflow hidden
        if (parentStyle.overflow === 'hidden') {
            console.warn('Parent element has overflow hidden that might hide the drawer');
        }
        
        return {
            hasParentTransform: parentStyle.transform !== 'none',
            hasParentOverflowHidden: parentStyle.overflow === 'hidden'
        };
    },

    /**
     * Ensure drawer is positioned relative to viewport
     */
    ensureViewportPositioning: function() {
        const sideDrawer = document.getElementById('sideDrawer');
        const sideDrawerOverlay = document.getElementById('sideDrawerOverlay');
        
        if (sideDrawer) {
            // Move drawer to body if it's not already there
            if (sideDrawer.parentElement !== document.body) {
                document.body.appendChild(sideDrawer);
                console.log('Moved drawer to body for proper positioning');
            }
            
            // Ensure drawer is positioned relative to viewport
            sideDrawer.style.position = 'fixed';
            sideDrawer.style.top = '0';
            sideDrawer.style.right = '0';
            sideDrawer.style.width = '320px';
            sideDrawer.style.height = '100vh';
            sideDrawer.style.zIndex = '999999';
            sideDrawer.style.transform = 'translateX(0)';
            console.log('Ensured viewport positioning for drawer');
        }
        
        if (sideDrawerOverlay) {
            // Move overlay to body if it's not already there
            if (sideDrawerOverlay.parentElement !== document.body) {
                document.body.appendChild(sideDrawerOverlay);
                console.log('Moved overlay to body for proper positioning');
            }
            
            // Ensure overlay is positioned relative to viewport
            sideDrawerOverlay.style.position = 'fixed';
            sideDrawerOverlay.style.top = '0';
            sideDrawerOverlay.style.left = '0';
            sideDrawerOverlay.style.right = '0';
            sideDrawerOverlay.style.bottom = '0';
            sideDrawerOverlay.style.zIndex = '999998';
            console.log('Ensured viewport positioning for overlay');
        }
    },

    /**
     * Open the side drawer
     */
    open: function() {
        console.log('SideDrawer open called');
        const sideDrawer = document.getElementById('sideDrawer');
        const sideDrawerOverlay = document.getElementById('sideDrawerOverlay');
        
        console.log('Opening drawer elements:', { sideDrawer, sideDrawerOverlay });
        
        if (sideDrawer && sideDrawerOverlay) {
            // Check for CSS conflicts
            this.checkDrawerCSSConflicts();
            
            // Ensure viewport positioning
            this.ensureViewportPositioning();
            
            // Ensure CSS is properly applied
            this.ensureCSSApplied();
            
            // Ensure drawer content is visible
            this.ensureDrawerContentVisible();
            
            // Ensure drawer content takes up space
            this.ensureDrawerContentSpace();
            
            sideDrawer.classList.add('open');
            sideDrawerOverlay.classList.add('open');
            document.body.style.overflow = 'hidden';
            
            // Force visibility in case of CSS conflicts
            this.forceVisible();
            
            // Force drawer to be visible (additional measure)
            this.forceDrawerVisible();
            
            // Temporarily hide covering elements
            this.hideCoveringElements();
            
            // Add entrance animation for nav items
            this.animateNavItems();
            console.log('Drawer opened successfully');
            
            // Debug drawer visibility
            setTimeout(() => {
                const computedStyle = window.getComputedStyle(sideDrawer);
                console.log('Drawer visibility debug:', {
                    display: computedStyle.display,
                    visibility: computedStyle.visibility,
                    opacity: computedStyle.opacity,
                    zIndex: computedStyle.zIndex,
                    position: computedStyle.position,
                    right: computedStyle.right,
                    transform: computedStyle.transform,
                    width: computedStyle.width,
                    height: computedStyle.height
                });
                
                // Check if drawer is actually visible
                const rect = sideDrawer.getBoundingClientRect();
                console.log('Drawer bounding rect:', rect);
                console.log('Drawer is visible:', rect.width > 0 && rect.height > 0);
                
                // Check if drawer is in viewport
                const isInViewport = this.checkDrawerViewport();
                console.log('Drawer is in viewport:', isInViewport);
                
                // Check for covering elements
                this.checkCoveringElements();
            }, 100);
        } else {
            console.error('Cannot open drawer - elements not found');
        }
    },

    /**
     * Close the side drawer
     */
    close: function() {
        console.log('SideDrawer close called');
        const sideDrawer = document.getElementById('sideDrawer');
        const sideDrawerOverlay = document.getElementById('sideDrawerOverlay');
        
        console.log('Closing drawer elements:', { sideDrawer, sideDrawerOverlay });
        
        if (sideDrawer && sideDrawerOverlay) {
            sideDrawer.classList.remove('open');
            sideDrawerOverlay.classList.remove('open');
            document.body.style.overflow = '';
            
            // Ensure drawer is properly hidden
            sideDrawer.style.right = '-320px';
            sideDrawerOverlay.style.opacity = '0';
            sideDrawerOverlay.style.visibility = 'hidden';
            
            console.log('Drawer closed successfully');
        } else {
            console.error('Cannot close drawer - elements not found');
        }
    },

    /**
     * Animate navigation items on drawer open
     */
    animateNavItems: function() {
        const navItems = document.querySelectorAll('.side-drawer-nav-item');
        
        navItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(20px)';
            
            setTimeout(() => {
                item.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, 100 + (index * 50));
        });
    },

    /**
     * Handle quick add service navigation
     */
    handleQuickAddService: function(page) {
        console.log('Quick add service clicked:', page);
        
        // Close the drawer first
        this.close();
        
        // Show loading indicator
        this.showLoadingIndicator();
        
        // Add a small delay for smooth transition
        setTimeout(() => {
            if (typeof Router !== 'undefined' && Router.navigate) {
                Router.navigate(page);
            } else {
                // Fallback navigation
                window.location.href = `#${page}`;
            }
            
            // Hide loading indicator
            this.hideLoadingIndicator();
            
            // Show success message
            this.showSuccessMessage('تم فتح نموذج إضافة الخدمة');
        }, 300);
    },

    /**
     * Show loading indicator
     */
    showLoadingIndicator: function() {
        // Create loading overlay if it doesn't exist
        if (!document.getElementById('loadingOverlay')) {
            const loadingHTML = `
                <div id="loadingOverlay" style="
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
                ">
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
                </div>
                <style>
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                </style>
            `;
            document.body.insertAdjacentHTML('beforeend', loadingHTML);
        } else {
            document.getElementById('loadingOverlay').style.display = 'flex';
        }
    },

    /**
     * Hide loading indicator
     */
    hideLoadingIndicator: function() {
        const loadingOverlay = document.getElementById('loadingOverlay');
        if (loadingOverlay) {
            loadingOverlay.style.display = 'none';
        }
    },

    /**
     * Show success message
     */
    showSuccessMessage: function(message) {
        // Create success message if it doesn't exist
        if (!document.getElementById('successMessage')) {
            const successHTML = `
                <div id="successMessage" style="
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: #2ed573;
                    color: white;
                    padding: 12px 20px;
                    border-radius: 8px;
                    box-shadow: 0 4px 12px rgba(46, 213, 115, 0.3);
                    z-index: 999999;
                    transform: translateX(100%);
                    transition: transform 0.3s ease;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                ">
                    <i class="fas fa-check-circle"></i>
                    <span>${message}</span>
                </div>
            `;
            document.body.insertAdjacentHTML('beforeend', successHTML);
        }
        
        const successMessage = document.getElementById('successMessage');
        successMessage.style.transform = 'translateX(0)';
        
        // Hide after 3 seconds
        setTimeout(() => {
            successMessage.style.transform = 'translateX(100%)';
        }, 3000);
    },

    /**
     * Handle navigation to different pages
     */
    handleNavigation: function(page) {
        console.log('Navigating to:', page);
        
        this.close();
        
        // Add a small delay for smooth transition
        setTimeout(() => {
            if (typeof Router !== 'undefined' && Router.navigate) {
                Router.navigate(page);
            } else {
                // Fallback navigation
                window.location.href = `#${page}`;
            }
        }, 300);
    },

    /**
     * Handle footer actions
     */
    handleFooterAction: function(action) {
        switch (action) {
            case 'navigate':
                const page = event.target.closest('.side-drawer-footer-btn').dataset.page;
                if (page) {
                    this.handleNavigation(page);
                }
                break;
            case 'settings':
                this.close();
                if (typeof Router !== 'undefined' && Router.navigate) {
                    Router.navigate('settings');
                }
                break;
            case 'help':
                this.close();
                if (typeof Router !== 'undefined' && Router.navigate) {
                    Router.navigate('help');
                }
                break;
            case 'logout':
                this.close();
                this.handleLogout();
                break;
        }
    },

    /**
     * Handle logout
     */
    handleLogout: function() {
        // Show confirmation dialog
        if (confirm('هل أنت متأكد من تسجيل الخروج؟')) {
            // Clear user data
            if (typeof State !== 'undefined' && State.clear) {
                State.clear();
            }
            
            // Navigate to login
            if (typeof Router !== 'undefined' && Router.navigate) {
                Router.navigate('login');
            }
            
            // Show success message
            if (typeof Toast !== 'undefined' && Toast.show) {
                Toast.show('تم تسجيل الخروج بنجاح', 'شكراً لاستخدامك التطبيق', 'success');
            }
        }
    },

    /**
     * Update user information in the drawer
     */
    updateUserInfo: function() {
        const user = State.get('user') || {
            name: 'أحمد محمد',
            avatar: 'https://via.placeholder.com/60x60/667eea/ffffff?text=أ',
            role: 'مدير الخدمات اللوجستية'
        };
        
        const userNameElement = document.querySelector('.side-drawer-user-name');
        const userRoleElement = document.querySelector('.side-drawer-user-role');
        const userAvatarElement = document.querySelector('.side-drawer-user-avatar img');
        
        if (userNameElement) {
            userNameElement.textContent = user.name;
        }
        
        if (userRoleElement) {
            userRoleElement.textContent = user.role;
        }
        
        if (userAvatarElement && user.avatar) {
            userAvatarElement.src = user.avatar;
            userAvatarElement.alt = `صورة ${user.name}`;
        }
    },

    /**
     * Update badges with real data
     */
    updateBadges: function() {
        // This would be updated with real data from the backend
        const badgeData = {
            orders: 24,
            billing: 8,
            myshipping: 3,
            mywarehouses: 2,
            mycustoms: 8,
            'my-packaging': 2,
            'my-lc-services': 0,
            'my-last-mile': 0
        };

        // Update badges
        Object.keys(badgeData).forEach(page => {
            const badge = document.querySelector(`[data-page="${page}"] .side-drawer-nav-badge`);
            if (badge) {
                badge.textContent = badgeData[page];
                if (badgeData[page] === 0) {
                    badge.style.display = 'none';
                } else {
                    badge.style.display = 'flex';
                }
            }
        });
    },

    /**
     * Update system status
     */
    updateSystemStatus: function() {
        // This would check actual system status
        const isOnline = navigator.onLine;
        const onlineIndicator = document.querySelector('.side-drawer-status-online');
        
        if (onlineIndicator) {
            if (isOnline) {
                onlineIndicator.style.background = '#2ed573';
            } else {
                onlineIndicator.style.background = '#ff4757';
            }
        }
    },

    /**
     * Test drawer functionality
     */
    testDrawer: function() {
        console.log('=== Testing Side Drawer ===');
        
        const sideDrawer = document.getElementById('sideDrawer');
        const sideDrawerOverlay = document.getElementById('sideDrawerOverlay');
        
        console.log('1. Drawer elements exist:', {
            sideDrawer: !!sideDrawer,
            sideDrawerOverlay: !!sideDrawerOverlay
        });
        
        if (sideDrawer) {
            const rect = sideDrawer.getBoundingClientRect();
            const style = window.getComputedStyle(sideDrawer);
            
            console.log('2. Drawer dimensions:', {
                width: rect.width,
                height: rect.height,
                display: style.display,
                visibility: style.visibility,
                opacity: style.opacity,
                zIndex: style.zIndex
            });
            
            console.log('3. Drawer content:', {
                childrenCount: sideDrawer.children.length,
                hasHeader: !!sideDrawer.querySelector('.side-drawer-header'),
                hasContent: !!sideDrawer.querySelector('.side-drawer-content'),
                hasFooter: !!sideDrawer.querySelector('.side-drawer-footer')
            });
        }
        
        console.log('4. Testing drawer open...');
        this.open();
        
        setTimeout(() => {
            console.log('5. Testing drawer close...');
            this.close();
            console.log('=== Test Complete ===');
        }, 2000);
    },

    /**
     * Public method to open drawer from external code
     */
    openDrawer: function() {
        this.open();
    },

    /**
     * Public method to close drawer from external code
     */
    closeDrawer: function() {
        this.close();
    },

    /**
     * Public method to toggle drawer from external code
     */
    toggleDrawer: function() {
        this.toggle();
    }
};

// Attach to window object for global access
window.SideDrawer = SideDrawer;
window.testSideDrawer = SideDrawer.testDrawer;
window.createMinimalDrawer = SideDrawer.createMinimalDrawer;

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    SideDrawer.init();
}); 