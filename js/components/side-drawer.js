/**
 * Side Drawer Component - Reusable Navigation Component
 */
const SideDrawer = {
    /**
     * Initialize the side drawer component
     */
    init: function() {
        console.log('SideDrawer component initialized');
        this.loadDrawerHTML();
        this.setupEventListeners();
        this.updateUserInfo();
        this.updateBadges();
        
        // Emit custom event for other components
        document.dispatchEvent(new CustomEvent('sideDrawer:initialized'));
    },

    /**
     * Load drawer HTML into the page
     */
    loadDrawerHTML: function() {
        // Check if drawer already exists
        if (document.getElementById('sideDrawer')) {
            return;
        }

        // Create the drawer structure dynamically
        this.createDrawerStructure();
    },

    /**
     * Create drawer structure dynamically
     */
    createDrawerStructure: function() {
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

        document.body.insertAdjacentHTML('beforeend', drawerHTML);
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
     * Toggle the side drawer
     */
    toggle: function() {
        const sideDrawer = document.getElementById('sideDrawer');
        const sideDrawerOverlay = document.getElementById('sideDrawerOverlay');
        
        if (sideDrawer && sideDrawerOverlay) {
            const isOpen = sideDrawer.classList.contains('open');
            
            if (isOpen) {
                this.close();
            } else {
                this.open();
            }
        }
    },

    /**
     * Open the side drawer
     */
    open: function() {
        const sideDrawer = document.getElementById('sideDrawer');
        const sideDrawerOverlay = document.getElementById('sideDrawerOverlay');
        
        if (sideDrawer && sideDrawerOverlay) {
            sideDrawer.classList.add('open');
            sideDrawerOverlay.classList.add('open');
            document.body.style.overflow = 'hidden';
            
            // Add entrance animation for nav items
            this.animateNavItems();
        }
    },

    /**
     * Close the side drawer
     */
    close: function() {
        const sideDrawer = document.getElementById('sideDrawer');
        const sideDrawerOverlay = document.getElementById('sideDrawerOverlay');
        
        if (sideDrawer && sideDrawerOverlay) {
            sideDrawer.classList.remove('open');
            sideDrawerOverlay.classList.remove('open');
            document.body.style.overflow = '';
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
     * Handle navigation to different pages
     */
    handleNavigation: function(page) {
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

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    SideDrawer.init();
}); 