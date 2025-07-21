/**
 * Main App Controller
 */
const App = {
    /**
     * App configuration
     */
    config: {
        templatesPath: 'templates/pages/',
        defaultPage: 'dashboard'
    },

    /**
     * Initialize the application
     */
    init: function() {
        // Initialize state first
        State.init();
        
        // Check authentication
        if (!State.get('isAuthenticated')) {
            // Not authenticated, redirect to auth
            document.getElementById('app-container').style.display = 'none';
            document.getElementById('auth-container').style.display = '';
            return;
        }
        
        // Initialize router
        Router.init();
        
        // Initialize UI components
        Modal.init();
        Toast.init();
        Loader.init();
        Forms.init();
        
        // Initialize side drawer components
        if (typeof SideDrawer !== 'undefined') {
            SideDrawer.init();
        }
        if (typeof DrawerHelper !== 'undefined') {
            DrawerHelper.init();
        }
        
        // Fallback initialization for side drawer components
        setTimeout(() => {
            if (typeof SideDrawer !== 'undefined' && !document.getElementById('sideDrawer')) {
                SideDrawer.init();
            }
            if (typeof DrawerHelper !== 'undefined') {
                DrawerHelper.reconnectMenuButtons();
            }
            
            // Check drawer status and fix any issues
            this.checkDrawerStatus();
        }, 500);
        
        // Initialize page controllers
        this.initializePageControllers();
        
        // Set up event listeners
        this.setupEventListeners();
        
        // Navigate to default page
        Router.navigate(this.config.defaultPage);
        
        // Update notification badge
        this.updateNotificationBadge();
        
        // Test side drawer functionality
        this.testSideDrawer();
    },

    /**
     * Test side drawer functionality
     */
    testSideDrawer: function() {
        setTimeout(() => {
            console.log('Testing side drawer functionality...');
            console.log('SideDrawer available:', typeof SideDrawer !== 'undefined');
            console.log('DrawerHelper available:', typeof DrawerHelper !== 'undefined');
            console.log('Side drawer element exists:', !!document.getElementById('sideDrawer'));
            console.log('Menu buttons found:', document.querySelectorAll('[data-action="menu"]').length);
            
            if (typeof SideDrawer !== 'undefined') {
                console.log('Side drawer is ready for use');
            } else {
                console.warn('Side drawer not available');
            }
        }, 1000);
    },

    /**
     * Global test function for side drawer (can be called from console)
     */
    testDrawer: function() {
        console.log('=== Side Drawer Test ===');
        console.log('1. Testing SideDrawer availability:', typeof SideDrawer !== 'undefined');
        console.log('2. Testing DrawerHelper availability:', typeof DrawerHelper !== 'undefined');
        console.log('3. Testing side drawer element:', !!document.getElementById('sideDrawer'));
        console.log('4. Testing menu buttons:', document.querySelectorAll('[data-action="menu"]').length);
        
        if (typeof SideDrawer !== 'undefined') {
            console.log('5. Testing drawer toggle...');
            SideDrawer.toggle();
            setTimeout(() => {
                console.log('6. Drawer toggle test complete');
            }, 1000);
        }
        
        if (typeof DrawerHelper !== 'undefined') {
            console.log('7. Testing menu button reconnection...');
            DrawerHelper.reconnectMenuButtons();
        }
        
        console.log('=== Test Complete ===');
    },

    /**
     * Check drawer status and fix issues
     */
    checkDrawerStatus: function() {
        console.log('=== Drawer Status Check ===');
        
        const sideDrawer = document.getElementById('sideDrawer');
        const sideDrawerOverlay = document.getElementById('sideDrawerOverlay');
        const menuButtons = document.querySelectorAll('[data-action="menu"]');
        
        console.log('Drawer element exists:', !!sideDrawer);
        console.log('Overlay element exists:', !!sideDrawerOverlay);
        console.log('Menu buttons found:', menuButtons.length);
        
        if (!sideDrawer || !sideDrawerOverlay) {
            console.log('Drawer elements missing, recreating...');
            if (typeof SideDrawer !== 'undefined') {
                SideDrawer.forceRecreate();
            }
        }
        
        if (menuButtons.length === 0) {
            console.log('No menu buttons found');
        } else {
            console.log('Menu buttons found, checking connections...');
            menuButtons.forEach((btn, index) => {
                console.log(`Button ${index + 1}:`, {
                    connected: btn.hasAttribute('data-drawer-connected'),
                    visible: btn.offsetParent !== null,
                    clickable: btn.style.pointerEvents !== 'none'
                });
            });
        }
        
        console.log('=== Status Check Complete ===');
    },

    /**
     * Initialize all page controllers
     */
    initializePageControllers: function() {
        // All page controllers are now initialized by the router when their pages are loaded
        // This prevents initialization conflicts and ensures controllers only run when needed
        console.log('App initialized - page controllers will be initialized by router');
    },

    /**
     * Set up global event listeners
     */
    setupEventListeners: function() {
        // Global click handler using event delegation
        document.addEventListener('click', function(e) {
            // Handle data-action attributes
            const action = e.target.dataset.action;
            if (action) {
                switch (action) {
                    case 'navigate':
                        Router.navigate(e.target.dataset.page);
                        break;
                    case 'open-modal':
                        Modal.open(e.target.dataset.modal);
                        break;
                    case 'close-modal':
                        Modal.close(e.target.dataset.modal);
                        break;
                    case 'submit-modal':
                        Modal.handleSubmit(e.target.dataset.modal);
                        break;
                    case 'show-toast':
                        Toast.show(
                            e.target.dataset.title, 
                            e.target.dataset.message, 
                            e.target.dataset.type,
                            e.target.dataset.duration
                        );
                        break;
                    case 'submit-form':
                        Forms.handleSubmit(e.target.dataset.form);
                        break;
                    case 'logout':
                        Auth.logout();
                        break;
                    case 'notifications':
                        Router.navigate('notifications');
                        break;
                    case 'profile':
                        Router.navigate('profile');
                        break;
                    case 'menu':
                        // Handle menu button clicks for side drawer
                        if (typeof SideDrawer !== 'undefined') {
                            e.preventDefault();
                            e.stopPropagation();
                            SideDrawer.toggle();
                        }
                        break;
                }
            }
            
            // Close modals when clicking outside
            if (e.target.classList.contains('modal')) {
                Modal.close();
            }
        });

        // Handle bottom navigation
        document.querySelectorAll('.bottom-nav .nav-item').forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                Router.navigate(this.dataset.page);
            });
        });
        
        // Listen for state changes to update UI
        document.addEventListener('stateChange', (e) => {
            this.handleStateChange(e.detail.key, e.detail.value);
        });
    },
    
    /**
     * Handle state changes
     */
    handleStateChange: function(key, value) {
        switch (key) {
            case 'notifications':
                this.updateNotificationBadge();
                break;
            case 'currentPage':
                this.updateDesignerNotes(value);
                break;
        }
    },
    
    /**
     * Update notification badge
     */
    updateNotificationBadge: function() {
        const notifications = State.get('notifications');
        const unreadCount = notifications.filter(n => !n.isRead).length;
        const badge = document.querySelector('.notification-badge');
        
        if (badge) {
            if (unreadCount > 0) {
                badge.textContent = unreadCount;
                badge.style.display = 'block';
            } else {
                badge.style.display = 'none';
            }
        }
    },
    
    /**
     * Update designer notes
     */
    updateDesignerNotes: function(pageName) {
        const notes = designerNotes[pageName] || "لا توجد ملاحظات لهذه الصفحة.";
        const notesContent = document.getElementById('designer-notes-content');
        if (notesContent) {
            notesContent.innerHTML = `<p>${notes}</p>`;
        }
    }
};

// Attach test function to window for console access
window.testDrawer = App.testDrawer;
window.checkDrawerStatus = App.checkDrawerStatus;

// Designer notes for each page
const designerNotes = {
    login: "صفحة تسجيل الدخول. يمكن للمستخدم إدخال بيانات تسجيل الدخول أو الانتقال لإنشاء حساب جديد.",
    register: "صفحة إنشاء حساب جديد لمزودي الخدمة. تتضمن حقول إدخال البيانات الأساسية ونوع الخدمة.",
    home: "الصفحة الرئيسية تعرض نظرة عامة على جميع الخدمات والإحصائيات والطلبات الحديثة.",
    myshipping: "صفحة خدمات الشحن المسجلة. تعرض جميع مركبات الشحن والخدمات المتاحة.",
    mycustoms: "صفحة خدمات التخليص الجمركي. تعرض جميع طلبات التخليص وحالتها.",
    mywarehouses: "صفحة المخازن المسجلة. تعرض جميع المخازن المتاحة ومساحاتها.",
    'my-packaging': "صفحة خدمات التغليف والتعبئة. تعرض جميع خدمات التغليف المتاحة.",
    'my-lc-services': "صفحة خدمات الاعتمادات المستندية. تعرض جميع المعاملات المالية.",
    'my-last-mile': "صفحة خدمات التوصيل النهائي. تعرض خدمات التوصيل المحلي.",
    'service-providers': "صفحة مقدمي الخدمات. تعرض جميع مقدمي الخدمات المتاحين للتواصل.",
    notifications: "صفحة الإشعارات. تعرض جميع الإشعارات الجديدة والقديمة.",
    profile: "صفحة الملف الشخصي. تعرض معلومات المستخدم والإعدادات.",
    settings: "صفحة الإعدادات. تتيح للمستخدم تخصيص التطبيق.",
    'warehouse-form': "نموذج إضافة/تعديل مخزن. يتضمن جميع البيانات المطلوبة للمخزن مع خطوات متعددة.",
    'vehicle-form': "نموذج إضافة/تعديل مركبة شحن. يتضمن بيانات المركبة والمواصفات والوثائق.",
    'customs-form': "نموذج إضافة/تعديل خدمة تخليص جمركي. يتضمن الجهات الجمركية وفريق العمل.",
    'packaging-form': "نموذج إضافة/تعديل خدمة تغليف. يتضمن المواد والخدمات والتخصصات.",
    'lc-service-form': "نموذج إضافة/تعديل خدمة اعتمادات مستندية. يتضمن البنوك والمستندات المطلوبة.",
    'delivery-provider-form': "نموذج إضافة/تعديل مزود خدمة التوصيل. يتضمن المركبات ومناطق التغطية.",
    'marketing-form': "نموذج إضافة/تعديل خدمة تسويق. يتضمن تفاصيل الخدمة والمناطق المستهدفة والوثائق.",
    'warehouse-details': "صفحة تفاصيل المخزن. تعرض معلومات مفصلة عن المخزن وطاقته.",
    'vehicle-details': "صفحة تفاصيل المركبة. تعرض معلومات مفصلة عن مركبة الشحن.",
    'customs-details': "صفحة تفاصيل التخليص الجمركي. تعرض تفاصيل طلب التخليص.",
    'packaging-details': "صفحة تفاصيل خدمة التغليف. تعرض تفاصيل خدمة التغليف.",
    'last-mile-details': "صفحة تفاصيل خدمة التوصيل النهائي. تعرض تفاصيل خدمة التوصيل.",
    'lc-service-details': "صفحة تفاصيل خدمة الاعتمادات المستندية. تعرض تفاصيل المعاملة المالية.",
    warehouses: "صفحة المخازن العامة. تعرض جميع المخازن المتاحة للاستئجار.",
    shipping: "صفحة خدمات الشحن العامة. تعرض جميع خدمات الشحن المتاحة.",
    customs: "صفحة خدمات التخليص الجمركي العامة. تعرض جميع خدمات التخليص المتاحة.",
    packaging: "صفحة خدمات التغليف العامة. تعرض جميع خدمات التغليف المتاحة.",
    'lc-services': "صفحة خدمات الاعتمادات المستندية العامة. تعرض جميع الخدمات المالية المتاحة.",
    'last-mile-delivery': "صفحة خدمات التوصيل النهائي العامة. تعرض جميع خدمات التوصيل المتاحة."
};