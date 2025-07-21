// Global flag to prevent multiple initializations
let BillingControllerInitialized = false;

/**
 * Billing Controller - Service Provider Revenue Management
 */
const BillingController = {
    /**
     * Billing data structure - Service Provider Revenue Focus
     */
    data: {
        clientPaymentMethods: [
            {
                id: 1,
                type: 'visa',
                name: 'Visa - عميل افتراضي',
                expiry: '12/25',
                limit: '100,000 ريال',
                isAccepted: true
            },
            {
                id: 2,
                type: 'mastercard',
                name: 'Mastercard - عميل افتراضي',
                expiry: '08/26',
                limit: '150,000 ريال',
                isAccepted: true
            },
            {
                id: 3,
                type: 'bank',
                name: 'تحويل بنكي',
                details: 'البنك الأهلي السعودي',
                account: '1234567890',
                isAccepted: true
            },
            {
                id: 4,
                type: 'paypal',
                name: 'PayPal',
                details: 'user@example.com',
                limit: 'متصل بالحساب المصرفي',
                isAccepted: true
            }
        ],
        clientInvoices: [
            {
                id: 'INV-2024-015',
                client: 'شركة التقنية المتقدمة',
                title: 'شحن بحري - حاوية 40 قدم - ديسمبر 2024',
                amount: 12450,
                status: 'overdue',
                date: '20 ديسمبر 2024',
                dueDate: '15 ديسمبر 2024',
                services: ['شحن بحري', 'تخليص جمركي', 'تأمين'],
                serviceType: 'shipping',
                isUrgent: true,
                route: 'ميناء جدة الإسلامي - الرياض'
            },
            {
                id: 'INV-2024-014',
                client: 'شركة الأغذية العالمية',
                title: 'تخزين بارد - مستودع الرياض - ديسمبر 2024',
                amount: 8800,
                status: 'pending',
                date: '18 ديسمبر 2024',
                dueDate: '31 ديسمبر 2024',
                services: ['تخزين بارد', 'إدارة مخزون', 'تتبع GPS'],
                serviceType: 'storage',
                warehouse: 'مخزن الرياض الرئيسي'
            },
            {
                id: 'INV-2024-013',
                client: 'شركة النقل السريع',
                title: 'نقل بري - شحنة من الرياض إلى جدة - نوفمبر 2024',
                amount: 5950,
                status: 'paid',
                date: '30 نوفمبر 2024',
                paidDate: '15 ديسمبر 2024',
                services: ['نقل بري', 'تتبع مباشر', 'تأمين'],
                serviceType: 'transport',
                route: 'الرياض - جدة',
                vehicleType: 'شاحنة نقل كبيرة'
            },
            {
                id: 'INV-2024-012',
                client: 'شركة الإلكترونيات الحديثة',
                title: 'تخليص جمركي - شحنة إلكترونيات - ديسمبر 2024',
                amount: 3850,
                status: 'pending',
                date: '16 ديسمبر 2024',
                dueDate: '30 ديسمبر 2024',
                services: ['تخليص جمركي', 'وثائق شحن', 'فحص جمركي'],
                serviceType: 'customs',
                port: 'ميناء الدمام',
                cargoType: 'معدات إلكترونية'
            },
            {
                id: 'INV-2024-011',
                client: 'شركة التوصيل السريع',
                title: 'توصيل نهائي - شحنة من الرياض إلى الدمام - ديسمبر 2024',
                amount: 2200,
                status: 'pending',
                date: '14 ديسمبر 2024',
                dueDate: '28 ديسمبر 2024',
                services: ['توصيل داخلي', 'تتبع مباشر', 'توقيع إلكتروني'],
                serviceType: 'lastmile',
                route: 'الرياض - الدمام',
                deliveryType: 'توصيل منزل'
            },
            {
                id: 'INV-2024-010',
                client: 'شركة الهدايا الفاخرة',
                title: 'تغليف وتعبئة - شحنة هدايا - ديسمبر 2024',
                amount: 1800,
                status: 'pending',
                date: '12 ديسمبر 2024',
                dueDate: '26 ديسمبر 2024',
                services: ['تغليف خاص', 'تعبئة آمنة', 'طباعة تخصيصية'],
                serviceType: 'packaging',
                packagingType: 'تغليف فاخر',
                specialRequirements: 'طباعة شعار الشركة'
            }
        ],
        revenueHistory: [
            {
                id: 1,
                invoiceId: 'INV-2024-011',
                client: 'شركة التقنية المتقدمة',
                method: 'visa',
                amount: 8450,
                date: '15 ديسمبر 2024 - 14:30',
                status: 'completed',
                serviceType: 'shipping'
            },
            {
                id: 2,
                invoiceId: 'INV-2024-010',
                client: 'شركة الأغذية العالمية',
                method: 'bank',
                amount: 6800,
                date: '10 ديسمبر 2024 - 09:15',
                status: 'completed',
                serviceType: 'storage'
            },
            {
                id: 3,
                invoiceId: 'INV-2024-009',
                client: 'شركة النقل السريع',
                method: 'mastercard',
                amount: 4750,
                date: '5 ديسمبر 2024 - 16:45',
                status: 'completed',
                serviceType: 'transport'
            },
            {
                id: 4,
                invoiceId: 'INV-2024-008',
                client: 'شركة الإلكترونيات الحديثة',
                method: 'paypal',
                amount: 3100,
                date: '30 نوفمبر 2024 - 11:20',
                status: 'completed',
                serviceType: 'customs'
            }
        ],
        settings: {
            invoiceNotifications: true,
            paymentReminders: true,
            autoPayment: false,
            pdfInvoices: true,
            autoUpdates: true,
            monthlyReports: false
        },
        // Service-specific revenue data aligned with service provider perspective
        serviceRevenue: {
            shipping: {
                totalRevenue: 45250,
                pendingAmount: 8500,
                completedOrders: 25,
                activeVehicles: 8
            },
            storage: {
                totalRevenue: 28400,
                pendingAmount: 5600,
                occupiedSpace: '75%',
                activeWarehouses: 3
            },
            packaging: {
                totalRevenue: 18000,
                pendingAmount: 3200,
                completedPackages: 150,
                activeServices: 2
            },
            customs: {
                totalRevenue: 8950,
                pendingAmount: 4200,
                completedClearances: 18,
                activePorts: 4
            },
            transport: {
                totalRevenue: 15800,
                pendingAmount: 6800,
                completedRoutes: 42,
                activeVehicles: 12
            },
            lastmile: {
                totalRevenue: 12000,
                pendingAmount: 2100,
                completedDeliveries: 85,
                activeAreas: 6
            }
        }
    },

    // Flag to prevent multiple initializations
    initialized: false,

    /**
     * Initialize the billing page
     */
    init: function() {
        if (BillingControllerInitialized) {
            console.log('BillingController already initialized globally.');
            return;
        }
        
        if (this.initialized) {
            console.log('BillingController already initialized locally.');
            return;
        }
        
        console.log('BillingController initializing...');
        this.setupEventListeners();
        this.loadBillingData();
        this.addAnimations();
        this.setupRealTimeUpdates();
        this.optimizeForMobile();
        this.initializeTabFromHash();
        this.initializeDefaultTabState();
        
        this.initialized = true;
        BillingControllerInitialized = true;
        console.log('BillingController initialization complete');
    },
    
    /**
     * Set up event listeners
     */
    setupEventListeners: function() {
        // Tab navigation
        const tabButtons = document.querySelectorAll('.bil-tab-btn');
        tabButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchTab(e.target.closest('.bil-tab-btn'));
            });
        });

        // Quick actions
        document.querySelectorAll('.bil-action-card').forEach(card => {
            card.addEventListener('click', (e) => this.handleQuickAction(e.currentTarget.dataset.action));
        });

        // Invoice actions
        document.querySelectorAll('[data-action]').forEach(element => {
            element.addEventListener('click', (e) => this.handleInvoiceAction(e.currentTarget.dataset.action, e.currentTarget));
        });

        // Invoice selection
        document.querySelectorAll('.bil-invoice-checkbox').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => this.handleInvoiceSelection(e.target));
        });

        // Bulk actions
        document.querySelectorAll('.bil-bulk-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.handleBulkAction(e.currentTarget.dataset.action));
        });

        // Search and filters
        document.querySelectorAll('[data-filter]').forEach(input => {
            input.addEventListener('input', (e) => this.handleFilterChange(e.target));
        });

        // Clear filters
        const clearFiltersBtn = document.querySelector('[data-action="clear-filters"]');
        if (clearFiltersBtn) {
            clearFiltersBtn.addEventListener('click', () => this.clearFilters());
        }

        // Payment method actions
        document.querySelectorAll('.bil-action-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.handlePaymentMethodAction(e.currentTarget.dataset.action, e.currentTarget));
        });



        // Settings toggles
        document.querySelectorAll('.bil-switch input').forEach(toggle => {
            toggle.addEventListener('change', (e) => this.handleSettingToggle(e.target));
        });
    },

    /**
     * Switch between tabs
     */
    switchTab: function(activeTab) {
        if (!activeTab) return;
        
        const targetTab = activeTab.dataset.tab;
        
        // Update tab buttons
        document.querySelectorAll('.bil-tab-btn').forEach(btn => {
            btn.classList.remove('bil-active');
        });
        activeTab.classList.add('bil-active');
        
        // Update tab panels - hide all first
        document.querySelectorAll('.bil-tab-panel').forEach(panel => {
            panel.classList.remove('bil-active');
            panel.style.display = 'none'; // Force hide
        });
        
        // Show the target panel
        const targetPanel = document.querySelector(`.bil-tab-panel[data-tab="${targetTab}"]`);
        if (targetPanel) {
            targetPanel.classList.add('bil-active');
            targetPanel.style.display = 'block'; // Force show
        }
        
        // Add animation
        targetPanel?.classList.add('bil-fade-in');
        setTimeout(() => {
            targetPanel?.classList.remove('bil-fade-in');
        }, 300);
        
        // Update URL hash for deep linking
        window.location.hash = targetTab;
        
        // Load tab-specific data if needed
        this.loadTabData(targetTab);
    },

    /**
     * Load data specific to each tab
     */
    loadTabData: function(tabName) {
        switch (tabName) {
            case 'overview':
                this.loadOverviewData();
                break;
            case 'invoices':
                this.loadInvoiceData();
                break;
            case 'payments':
                this.loadPaymentData();
                break;

            case 'settings':
                this.loadSettingsData();
                break;
        }
    },

    /**
     * Load overview data
     */
    loadOverviewData: function() {
        // Load recent activity
        this.updateRecentActivity();
        
        // Update quick action counts
        this.updateQuickActionCounts();
    },

    /**
     * Load invoice data
     */
    loadInvoiceData: function() {
        // Load filtered invoices
        this.updateInvoiceListDisplay(this.data.clientInvoices);
        
        // Update invoice counts
        this.updateInvoiceCounts();
    },

    /**
     * Load payment data
     */
    loadPaymentData: function() {
        // Load payment methods
        this.updatePaymentMethods();
        
        // Load payment history
        this.updatePaymentHistory();
    },



    /**
     * Load settings data
     */
    loadSettingsData: function() {
        // Load billing settings
        this.updateBillingSettings();
    },

    /**
     * Update recent activity
     */
    updateRecentActivity: function() {
        const activityList = document.querySelector('.bil-activity-list');
        if (!activityList) return;
        
        // Simulate loading recent activities
        const activities = [
            {
                icon: 'fas fa-file-invoice',
                title: 'تم إنشاء فاتورة جديدة #INV-2024-016',
                desc: 'شركة التقنية المتقدمة - شحن بحري',
                time: 'منذ 5 دقائق'
            },
            {
                icon: 'fas fa-check-circle',
                title: 'تم دفع فاتورة #INV-2024-011',
                desc: 'شركة الأغذية العالمية - 8,450 ريال',
                time: 'منذ ساعة واحدة'
            },
            {
                icon: 'fas fa-bell',
                title: 'تم إرسال تذكير للفواتير المتأخرة',
                desc: '3 فواتير متأخرة تم إرسال تذكيرات لها',
                time: 'منذ 3 ساعات'
            }
        ];
        
        // Update activity items with animation
        activities.forEach((activity, index) => {
            const activityItem = activityList.children[index];
            if (activityItem) {
                activityItem.classList.add('bil-slide-in');
                setTimeout(() => {
                    activityItem.classList.remove('bil-slide-in');
                }, 300 + (index * 100));
            }
        });
    },

    /**
     * Update quick action counts
     */
    updateQuickActionCounts: function() {
        // Update action card counts if needed
        const actionCards = document.querySelectorAll('.bil-action-card');
        actionCards.forEach(card => {
            card.classList.add('bil-scale-in');
            setTimeout(() => {
                card.classList.remove('bil-scale-in');
            }, 200);
        });
    },

    /**
     * Update invoice counts
     */
    updateInvoiceCounts: function() {
        const pendingCount = this.data.clientInvoices.filter(inv => inv.status === 'pending').length;
        const overdueCount = this.data.clientInvoices.filter(inv => inv.status === 'overdue').length;
        
        // Update counts in UI if needed
    },

    /**
     * Update payment methods
     */
    updatePaymentMethods: function() {
        const paymentMethods = document.querySelectorAll('.bil-payment-method');
        paymentMethods.forEach((method, index) => {
            method.classList.add('bil-fade-in');
            setTimeout(() => {
                method.classList.remove('bil-fade-in');
            }, 200 + (index * 100));
        });
    },

    /**
     * Update payment history
     */
    updatePaymentHistory: function() {
        const paymentItems = document.querySelectorAll('.bil-payment-item');
        paymentItems.forEach((item, index) => {
            item.classList.add('bil-slide-in');
            setTimeout(() => {
                item.classList.remove('bil-slide-in');
            }, 200 + (index * 100));
        });
    },



    /**
     * Update billing settings
     */
    updateBillingSettings: function() {
        const settingItems = document.querySelectorAll('.bil-setting-item');
        settingItems.forEach((item, index) => {
            item.classList.add('bil-slide-in');
            setTimeout(() => {
                item.classList.remove('bil-slide-in');
            }, 200 + (index * 100));
        });
    },



    /**
     * Handle setting toggle
     */
    handleSettingToggle: function(toggle) {
        const settingName = toggle.closest('.bil-setting-item')?.querySelector('.bil-setting-title')?.textContent;
        const isEnabled = toggle.checked;
        
        Toast.show(
            'تحديث الإعدادات', 
            `${settingName} ${isEnabled ? 'مفعل' : 'معطل'}`, 
            'info'
        );
    },

    /**
     * Initialize tab from URL hash
     */
    initializeTabFromHash: function() {
        const hash = window.location.hash.replace('#', '');
        if (hash && ['overview', 'invoices', 'payments', 'settings'].includes(hash)) {
            const targetTab = document.querySelector(`[data-tab="${hash}"]`);
            if (targetTab) {
                this.switchTab(targetTab);
            }
        }
    },

    /**
     * Initialize default tab state
     */
    initializeDefaultTabState: function() {
        // Ensure overview tab is active by default
        const overviewTab = document.querySelector('[data-tab="overview"]');
        const overviewPanel = document.querySelector('.bil-tab-panel[data-tab="overview"]');
        
        if (overviewTab && overviewPanel) {
            // Remove active from all tabs and panels
            document.querySelectorAll('.bil-tab-btn').forEach(btn => {
                btn.classList.remove('bil-active');
            });
            document.querySelectorAll('.bil-tab-panel').forEach(panel => {
                panel.classList.remove('bil-active');
                panel.style.display = 'none'; // Force hide all
            });
            
            // Set overview as active
            overviewTab.classList.add('bil-active');
            overviewPanel.classList.add('bil-active');
            overviewPanel.style.display = 'block'; // Force show overview
        }
    },
    
    /**
     * Handle client payment method actions
     */
    handlePaymentMethodAction: function(action, button) {
        const methodItem = button.closest('.bil-payment-method');
        const methodName = methodItem.querySelector('.bil-method-name').textContent;
        
        // Add button loading state
        const originalHTML = button.innerHTML;
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        button.disabled = true;
        
        setTimeout(() => {
            switch (action) {
                case 'set-default':
                    this.setDefaultPaymentMethod(methodItem);
                    Toast.show('طريقة الدفع', `تم تعيين ${methodName} كطريقة دفع مقبولة`, 'success');
                    break;
                case 'remove-method':
                    this.removePaymentMethod(methodItem);
                    Toast.show('طريقة الدفع', `تم حذف ${methodName} من الطرق المقبولة`, 'info');
                    break;
                default:
                    console.log(`Unknown payment method action: ${action}`);
            }
            
            // Restore button state
            button.innerHTML = originalHTML;
            button.disabled = false;
        }, 500);
    },
    
    /**
     * Handle invoice actions (service provider perspective)
     */
    handleInvoiceAction: function(action, button) {
        const invoiceItem = button.closest('.bil-invoice-item');
        const invoiceNumber = invoiceItem.querySelector('.bil-invoice-number').textContent;
        const invoiceAmount = invoiceItem.querySelector('.bil-invoice-amount').textContent;
        const clientName = invoiceItem.querySelector('.bil-invoice-title').textContent.split(' - ')[0];
        
        // Add button loading state
        const originalHTML = button.innerHTML;
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري التحميل...';
        button.disabled = true;
        
        setTimeout(() => {
            switch (action) {
                case 'view-invoice':
                    this.viewInvoice(invoiceNumber);
                    Toast.show('عرض الفاتورة', `جاري فتح الفاتورة ${invoiceNumber}`, 'info');
                    break;
                case 'send-invoice':
                    this.sendInvoice(invoiceNumber, clientName);
                    Toast.show('إرسال الفاتورة', `جاري إرسال الفاتورة ${invoiceNumber} إلى ${clientName}`, 'info');
                    break;
                case 'send-reminder':
                    this.sendReminder(invoiceNumber, clientName);
                    Toast.show('إرسال تذكير', `جاري إرسال تذكير الدفع إلى ${clientName}`, 'info');
                    break;
                case 'download-invoice':
                    this.downloadInvoice(invoiceNumber);
                    Toast.show('تحميل الفاتورة', `جاري تحميل الفاتورة ${invoiceNumber}`, 'info');
                    break;
                default:
                    console.log(`Unknown invoice action: ${action}`);
            }
            
            // Restore button state
            button.innerHTML = originalHTML;
            button.disabled = false;
        }, 500);
    },
    
    /**
     * Handle quick action cards (service provider actions)
     */
    handleQuickAction: function(action, actionCard) {
        // Add click animation
        actionCard.style.transform = 'scale(0.98)';
        setTimeout(() => {
            actionCard.style.transform = '';
        }, 150);
        
        switch (action) {
            case 'create-invoice':
                this.createNewInvoice();
                break;
            case 'export-reports':
                this.exportRevenueReports();
                break;
            default:
                console.log(`Unknown quick action: ${action}`);
        }
    },
    

    
    /**
     * Create new invoice for client
     */
    createNewInvoice: function() {
        Toast.show('إنشاء فاتورة', 'جاري فتح نموذج إنشاء فاتورة جديدة...', 'info');
        
        setTimeout(() => {
            Router.navigate('create-invoice');
        }, 1000);
    },
    
    /**
     * Export revenue reports
     */
    exportRevenueReports: function() {
        Toast.show('تصدير التقارير', 'جاري تحضير تقارير الإيرادات...', 'info');
        
        setTimeout(() => {
            const link = document.createElement('a');
            link.href = '#';
            link.download = `revenue-report-${new Date().toISOString().split('T')[0]}.pdf`;
            link.click();
            Toast.show('تصدير التقارير', 'تم تصدير تقارير الإيرادات بنجاح', 'success');
        }, 2000);
    },
    
    /**
     * Set default payment method (accepted from clients)
     */
    setDefaultPaymentMethod: function(methodItem) {
        // Remove active class from all methods
        document.querySelectorAll('.bil-payment-method').forEach(method => {
            method.classList.remove('bil-active');
            const status = method.querySelector('.bil-method-status');
            if (status) status.textContent = '';
        });
        
        // Add active class to selected method
        methodItem.classList.add('bil-active');
        const status = methodItem.querySelector('.bil-method-status');
        if (status) status.textContent = 'مقبول';
        
        // Update data
        const methodName = methodItem.querySelector('.bil-method-name').textContent;
        this.data.clientPaymentMethods.forEach(method => {
            method.isAccepted = method.name === methodName;
        });
    },
    
    /**
     * Remove payment method with animation
     */
    removePaymentMethod: function(methodItem) {
        methodItem.style.animation = 'bilFadeOut 0.3s ease-out';
        setTimeout(() => {
            methodItem.remove();
            
            // Update data
            const methodName = methodItem.querySelector('.bil-method-name').textContent;
            this.data.clientPaymentMethods = this.data.clientPaymentMethods.filter(method => method.name !== methodName);
        }, 300);
    },
    
    /**
     * Toggle payment method selection
     */
    togglePaymentMethod: function(methodItem) {
        if (!methodItem.classList.contains('bil-active')) {
            this.setDefaultPaymentMethod(methodItem);
        }
    },
    
    /**
     * Handle billing settings with enhanced feedback
     */
    handleBillingSetting: function(checkbox) {
        const settingItem = checkbox.closest('.bil-setting-item');
        const settingName = settingItem.querySelector('.bil-setting-title').textContent;
        const isEnabled = checkbox.checked;
        
        // Add visual feedback
        settingItem.style.background = isEnabled ? 'rgba(34, 197, 94, 0.05)' : 'rgba(239, 68, 68, 0.05)';
        setTimeout(() => {
            settingItem.style.background = '';
        }, 1000);
        
        const status = isEnabled ? 'تم تفعيل' : 'تم إلغاء تفعيل';
        Toast.show('إعدادات الفواتير', `${status} ${settingName}`, 'success');
        
        // Update data
        const settingKey = this.getSettingKey(settingName);
        if (settingKey) {
            this.data.settings[settingKey] = isEnabled;
        }
    },
    
    /**
     * Get setting key from display name
     */
    getSettingKey: function(displayName) {
        const keyMap = {
            'إشعارات الفواتير': 'invoiceNotifications',
            'تذكير الدفع': 'paymentReminders',
            'الدفع التلقائي': 'autoPayment',
            'فواتير PDF': 'pdfInvoices',
            'تحديثات تلقائية': 'autoUpdates',
            'تقارير شهرية': 'monthlyReports'
        };
        return keyMap[displayName];
    },
    
    /**
     * View invoice with enhanced navigation
     */
    viewInvoice: function(invoiceNumber) {
        setTimeout(() => {
            Router.navigate('invoice-details', { invoice: invoiceNumber });
        }, 1000);
    },
    
    /**
     * Send invoice to client
     */
    sendInvoice: function(invoiceNumber, clientName) {
        setTimeout(() => {
            Router.navigate('send-invoice', { 
                invoice: invoiceNumber, 
                client: clientName 
            });
        }, 1000);
    },
    
    /**
     * Send payment reminder to client
     */
    sendReminder: function(invoiceNumber, clientName) {
        setTimeout(() => {
            Router.navigate('send-reminder', { 
                invoice: invoiceNumber, 
                client: clientName 
            });
        }, 1000);
    },
    
    /**
     * Download invoice with enhanced UX
     */
    downloadInvoice: function(invoiceNumber) {
        // Simulate download with progress
        Toast.show('تحميل الفاتورة', 'جاري تحضير الملف...', 'info');
        
        setTimeout(() => {
            const link = document.createElement('a');
            link.href = '#';
            link.download = `${invoiceNumber}.pdf`;
            link.click();
            Toast.show('تحميل الفاتورة', 'تم تحميل الفاتورة بنجاح', 'success');
        }, 1500);
    },
    
    /**
     * Load billing data with enhanced loading states
     */
    loadBillingData: function() {
        // Add loading states
        this.addLoadingState();
        
        // Simulate loading billing data
        setTimeout(() => {
            this.updateClientPaymentMethods();
            this.updateClientInvoices();
            this.updateRevenueHistory();
            this.removeLoadingState();
        }, 800);
    },
    
    
    
    /**
     * Update client payment methods with enhanced animations
     */
    updateClientPaymentMethods: function() {
        const paymentMethods = document.querySelectorAll('.bil-payment-method');
        paymentMethods.forEach((method, index) => {
            method.style.animationDelay = `${index * 0.05}s`;
            method.classList.add('bil-slide-in');
        });
    },
    
    /**
     * Update client invoices with enhanced animations
     */
    updateClientInvoices: function() {
        const invoices = document.querySelectorAll('.bil-invoice-item');
        invoices.forEach((invoice, index) => {
            invoice.style.animationDelay = `${index * 0.05}s`;
            invoice.classList.add('bil-fade-in');
        });
    },
    
    /**
     * Update revenue history with enhanced animations
     */
    updateRevenueHistory: function() {
        const payments = document.querySelectorAll('.bil-payment-item');
        payments.forEach((payment, index) => {
            payment.style.animationDelay = `${index * 0.05}s`;
            payment.classList.add('bil-scale-in');
        });
    },
    
    /**
     * Add loading state
     */
    addLoadingState: function() {
        const billingPage = document.getElementById('billing');
        if (billingPage) {
            billingPage.classList.add('bil-loading');
        }
    },
    
    /**
     * Remove loading state
     */
    removeLoadingState: function() {
        const billingPage = document.getElementById('billing');
        if (billingPage) {
            billingPage.classList.remove('bil-loading');
        }
    },
    
    /**
     * Add animations to billing elements
     */
    addAnimations: function() {
        const billingPage = document.getElementById('billing');
        if (!billingPage) return;
        

        
        // Add slide-in animation to payment methods
        const paymentMethods = billingPage.querySelectorAll('.bil-payment-method');
        paymentMethods.forEach((method, index) => {
            method.style.animationDelay = `${index * 0.05}s`;
            method.classList.add('bil-slide-in');
        });
        
        // Add fade-in animation to invoices
        const invoices = billingPage.querySelectorAll('.bil-invoice-item');
        invoices.forEach((invoice, index) => {
            invoice.style.animationDelay = `${index * 0.05}s`;
            invoice.classList.add('bil-fade-in');
        });
        
        // Add scale-in animation to payment history
        const payments = billingPage.querySelectorAll('.bil-payment-item');
        payments.forEach((payment, index) => {
            payment.style.animationDelay = `${index * 0.05}s`;
            payment.classList.add('bil-scale-in');
        });
    },
    
    /**
     * Setup real-time updates
     */
    setupRealTimeUpdates: function() {
        // Real-time updates for billing data
        setInterval(() => {
            // Update billing data as needed
        }, 30000);
    },
    
    /**
     * Export revenue data with enhanced UX
     */
    exportRevenueData: function() {
        Toast.show('تصدير البيانات', 'جاري تحضير ملف التصدير...', 'info');
        
        setTimeout(() => {
            const link = document.createElement('a');
            link.href = '#';
            link.download = `revenue-report-${new Date().toISOString().split('T')[0]}.csv`;
            link.click();
            Toast.show('تصدير البيانات', 'تم تصدير البيانات بنجاح', 'success');
        }, 2000);
    },
    
    /**
     * Add new client payment method with enhanced navigation
     */
    addClientPaymentMethod: function() {
        Toast.show('إضافة طريقة دفع', 'جاري فتح نموذج إضافة طريقة دفع جديدة...', 'info');
        
        setTimeout(() => {
            Router.navigate('add-payment-method');
        }, 1000);
    },
    

    
    /**
     * Get client payment methods
     */
    getClientPaymentMethods: function() {
        return this.data.clientPaymentMethods;
    },
    
    /**
     * Get client invoices
     */
    getClientInvoices: function() {
        return this.data.clientInvoices;
    },
    
    /**
     * Get revenue history
     */
    getRevenueHistory: function() {
        return this.data.revenueHistory;
    },
    
    /**
     * Get service revenue statistics
     */
    getServiceRevenue: function() {
        return this.data.serviceRevenue;
    },
    
    /**
     * Get invoices by service type
     */
    getInvoicesByServiceType: function(serviceType) {
        return this.data.clientInvoices.filter(invoice => invoice.serviceType === serviceType);
    },
    
    /**
     * Get total revenue by service type
     */
    getTotalRevenueByServiceType: function(serviceType) {
        const invoices = this.getInvoicesByServiceType(serviceType);
        return invoices.reduce((total, invoice) => total + invoice.amount, 0);
    },

    /**
     * Create new invoice with detailed service breakdown
     */
    createDetailedInvoice: function(clientData, services, terms) {
        const invoice = {
            id: this.generateInvoiceId(),
            client: clientData.name,
            clientId: clientData.id,
            title: `${services[0].type} - ${clientData.name} - ${new Date().toLocaleDateString('ar-SA')}`,
            amount: services.reduce((total, service) => total + service.amount, 0),
            status: 'pending',
            date: new Date().toLocaleDateString('ar-SA'),
            dueDate: this.calculateDueDate(terms.paymentTerms),
            services: services.map(s => s.name),
            serviceType: services[0].type,
            terms: terms,
            items: services.map(service => ({
                description: service.name,
                quantity: service.quantity,
                unitPrice: service.unitPrice,
                total: service.amount
            }))
        };
        
        this.data.clientInvoices.unshift(invoice);
        this.updateClientInvoices();
        return invoice;
    },

    /**
     * Generate unique invoice ID
     */
    generateInvoiceId: function() {
        const year = new Date().getFullYear();
        const count = this.data.clientInvoices.length + 1;
        return `INV-${year}-${count.toString().padStart(3, '0')}`;
    },

    /**
     * Calculate due date based on payment terms
     */
    calculateDueDate: function(paymentTerms) {
        const today = new Date();
        let dueDate = new Date(today);
        
        switch (paymentTerms) {
            case 'immediate':
                dueDate.setDate(today.getDate());
                break;
            case '7days':
                dueDate.setDate(today.getDate() + 7);
                break;
            case '15days':
                dueDate.setDate(today.getDate() + 15);
                break;
            case '30days':
                dueDate.setDate(today.getDate() + 30);
                break;
            case 'net30':
                dueDate.setDate(today.getDate() + 30);
                break;
            default:
                dueDate.setDate(today.getDate() + 30);
        }
        
        return dueDate.toLocaleDateString('ar-SA');
    },

    /**
     * Apply discount to invoice
     */
    applyDiscount: function(invoiceId, discountType, discountValue) {
        const invoice = this.data.clientInvoices.find(inv => inv.id === invoiceId);
        if (!invoice) return false;
        
        let discountAmount = 0;
        if (discountType === 'percentage') {
            discountAmount = (invoice.amount * discountValue) / 100;
        } else if (discountType === 'fixed') {
            discountAmount = discountValue;
        }
        
        invoice.originalAmount = invoice.amount;
        invoice.amount = Math.max(0, invoice.amount - discountAmount);
        invoice.discount = {
            type: discountType,
            value: discountValue,
            amount: discountAmount
        };
        
        this.updateClientInvoices();
        return true;
    },

    /**
     * Add late fees to overdue invoices
     */
    addLateFees: function(invoiceId, feePercentage = 5) {
        const invoice = this.data.clientInvoices.find(inv => inv.id === invoiceId);
        if (!invoice || invoice.status !== 'overdue') return false;
        
        const lateFee = (invoice.amount * feePercentage) / 100;
        invoice.lateFees = lateFee;
        invoice.totalAmount = invoice.amount + lateFee;
        
        this.updateClientInvoices();
        return true;
    },

    /**
     * Process partial payment
     */
    processPartialPayment: function(invoiceId, paymentAmount, paymentMethod) {
        const invoice = this.data.clientInvoices.find(inv => inv.id === invoiceId);
        if (!invoice || invoice.status === 'paid') return false;
        
        if (!invoice.payments) invoice.payments = [];
        
        const payment = {
            id: Date.now(),
            amount: paymentAmount,
            method: paymentMethod,
            date: new Date().toLocaleDateString('ar-SA'),
            status: 'completed'
        };
        
        invoice.payments.push(payment);
        
        const totalPaid = invoice.payments.reduce((sum, p) => sum + p.amount, 0);
        const remainingAmount = invoice.amount - totalPaid;
        
        if (remainingAmount <= 0) {
            invoice.status = 'paid';
            invoice.paidDate = new Date().toLocaleDateString('ar-SA');
        } else {
            invoice.status = 'partial';
            invoice.remainingAmount = remainingAmount;
        }
        
        // Add to revenue history
        this.data.revenueHistory.unshift({
            id: Date.now(),
            invoiceId: invoiceId,
            client: invoice.client,
            method: paymentMethod,
            amount: paymentAmount,
            date: `${new Date().toLocaleDateString('ar-SA')} - ${new Date().toLocaleTimeString('ar-SA')}`,
            status: 'completed',
            serviceType: invoice.serviceType
        });
        
        this.updateClientInvoices();
        this.updateRevenueHistory();
        return true;
    },

    /**
     * Generate recurring invoice
     */
    generateRecurringInvoice: function(templateId, frequency) {
        const template = this.getInvoiceTemplate(templateId);
        if (!template) return false;
        
        const nextDueDate = this.calculateNextRecurringDate(frequency);
        const invoice = {
            ...template,
            id: this.generateInvoiceId(),
            date: new Date().toLocaleDateString('ar-SA'),
            dueDate: nextDueDate,
            status: 'pending',
            isRecurring: true,
            recurringFrequency: frequency,
            templateId: templateId
        };
        
        this.data.clientInvoices.unshift(invoice);
        this.updateClientInvoices();
        return invoice;
    },

    /**
     * Get invoice template
     */
    getInvoiceTemplate: function(templateId) {
        // This would typically fetch from database
        const templates = {
            'shipping-monthly': {
                client: 'شركة التقنية المتقدمة',
                services: ['شحن بحري', 'تخليص جمركي', 'تأمين'],
                serviceType: 'shipping',
                amount: 12450,
                terms: { paymentTerms: 'net30' }
            },
            'storage-quarterly': {
                client: 'شركة الأغذية العالمية',
                services: ['تخزين بارد', 'إدارة مخزون', 'تتبع GPS'],
                serviceType: 'storage',
                amount: 8800,
                terms: { paymentTerms: 'net30' }
            }
        };
        
        return templates[templateId];
    },

    /**
     * Calculate next recurring date
     */
    calculateNextRecurringDate: function(frequency) {
        const today = new Date();
        let nextDate = new Date(today);
        
        switch (frequency) {
            case 'weekly':
                nextDate.setDate(today.getDate() + 7);
                break;
            case 'monthly':
                nextDate.setMonth(today.getMonth() + 1);
                break;
            case 'quarterly':
                nextDate.setMonth(today.getMonth() + 3);
                break;
            case 'yearly':
                nextDate.setFullYear(today.getFullYear() + 1);
                break;
        }
        
        return nextDate.toLocaleDateString('ar-SA');
    },

    /**
     * Send bulk reminders
     */
    sendBulkReminders: function(invoiceIds) {
        const invoices = this.data.clientInvoices.filter(inv => invoiceIds.includes(inv.id));
        let successCount = 0;
        
        invoices.forEach(invoice => {
            if (invoice.status === 'pending' || invoice.status === 'overdue') {
                this.sendReminder(invoice.id, invoice.client);
                successCount++;
            }
        });
        
        Toast.show('إرسال التذكيرات', `تم إرسال ${successCount} تذكير بنجاح`, 'success');
        return successCount;
    },

    /**
     * Generate financial reports
     */
    generateFinancialReport: function(reportType, dateRange) {
        const reports = {
            'revenue-summary': this.generateRevenueSummary(dateRange),
            'outstanding-invoices': this.generateOutstandingInvoices(dateRange),
            'payment-analysis': this.generatePaymentAnalysis(dateRange),
            'service-performance': this.generateServicePerformance(dateRange)
        };
        
        return reports[reportType] || null;
    },



    /**
     * Generate outstanding invoices report
     */
    generateOutstandingInvoices: function(dateRange) {
        return this.data.clientInvoices.filter(inv => 
            inv.status === 'pending' || inv.status === 'overdue'
        );
    },

    /**
     * Generate payment analysis report
     */
    generatePaymentAnalysis: function(dateRange) {
        const payments = this.data.revenueHistory.filter(payment => 
            new Date(payment.date) >= new Date(dateRange.start) &&
            new Date(payment.date) <= new Date(dateRange.end)
        );
        
        const paymentMethods = {};
        payments.forEach(payment => {
            if (!paymentMethods[payment.method]) {
                paymentMethods[payment.method] = { count: 0, total: 0 };
            }
            paymentMethods[payment.method].count++;
            paymentMethods[payment.method].total += payment.amount;
        });
        
        return {
            totalPayments: payments.length,
            totalAmount: payments.reduce((sum, p) => sum + p.amount, 0),
            paymentMethods,
            averagePayment: payments.reduce((sum, p) => sum + p.amount, 0) / payments.length || 0
        };
    },

    /**
     * Generate service performance report
     */
    generateServicePerformance: function(dateRange) {
        const serviceStats = {};
        
        this.data.clientInvoices.forEach(invoice => {
            if (!serviceStats[invoice.serviceType]) {
                serviceStats[invoice.serviceType] = {
                    totalRevenue: 0,
                    invoiceCount: 0,
                    averageAmount: 0
                };
            }
            
            serviceStats[invoice.serviceType].totalRevenue += invoice.amount;
            serviceStats[invoice.serviceType].invoiceCount++;
        });
        
        // Calculate averages
        Object.keys(serviceStats).forEach(service => {
            serviceStats[service].averageAmount = 
                serviceStats[service].totalRevenue / serviceStats[service].invoiceCount;
        });
        
        return serviceStats;
    },

    /**
     * Validate invoice data
     */
    validateInvoiceData: function(invoiceData) {
        const errors = [];
        
        if (!invoiceData.client) {
            errors.push('اسم العميل مطلوب');
        }
        
        if (!invoiceData.amount || invoiceData.amount <= 0) {
            errors.push('مبلغ الفاتورة يجب أن يكون أكبر من صفر');
        }
        
        if (!invoiceData.services || invoiceData.services.length === 0) {
            errors.push('يجب تحديد خدمة واحدة على الأقل');
        }
        
        if (!invoiceData.dueDate) {
            errors.push('تاريخ الاستحقاق مطلوب');
        }
        
        return {
            isValid: errors.length === 0,
            errors: errors
        };
    },

    /**
     * Archive old invoices
     */
    archiveOldInvoices: function(monthsOld = 12) {
        const cutoffDate = new Date();
        cutoffDate.setMonth(cutoffDate.getMonth() - monthsOld);
        
        const invoicesToArchive = this.data.clientInvoices.filter(invoice => {
            const invoiceDate = new Date(invoice.date);
            return invoiceDate < cutoffDate && invoice.status === 'paid';
        });
        
        // Move to archived invoices (in real app, this would be a separate table)
        if (!this.data.archivedInvoices) {
            this.data.archivedInvoices = [];
        }
        
        this.data.archivedInvoices.push(...invoicesToArchive);
        this.data.clientInvoices = this.data.clientInvoices.filter(invoice => 
            !invoicesToArchive.includes(invoice)
        );
        
        this.updateClientInvoices();
        return invoicesToArchive.length;
    },

    /**
     * Get invoice statistics
     */
    getInvoiceStatistics: function() {
        const totalInvoices = this.data.clientInvoices.length;
        const paidInvoices = this.data.clientInvoices.filter(inv => inv.status === 'paid').length;
        const pendingInvoices = this.data.clientInvoices.filter(inv => inv.status === 'pending').length;
        const overdueInvoices = this.data.clientInvoices.filter(inv => inv.status === 'overdue').length;
        
        return {
            total: totalInvoices,
            paid: paidInvoices,
            pending: pendingInvoices,
            overdue: overdueInvoices,
            paidPercentage: totalInvoices > 0 ? (paidInvoices / totalInvoices) * 100 : 0,
            overduePercentage: totalInvoices > 0 ? (overdueInvoices / totalInvoices) * 100 : 0
        };
    },

    /**
     * Search invoices
     */
    searchInvoices: function(query, filters = {}) {
        let results = this.data.clientInvoices;
        
        // Text search
        if (query) {
            results = results.filter(invoice => 
                invoice.client.toLowerCase().includes(query.toLowerCase()) ||
                invoice.id.toLowerCase().includes(query.toLowerCase()) ||
                invoice.title.toLowerCase().includes(query.toLowerCase())
            );
        }
        
        // Status filter
        if (filters.status) {
            results = results.filter(invoice => invoice.status === filters.status);
        }
        
        // Service type filter
        if (filters.serviceType) {
            results = results.filter(invoice => invoice.serviceType === filters.serviceType);
        }
        
        // Date range filter
        if (filters.dateFrom && filters.dateTo) {
            results = results.filter(invoice => {
                const invoiceDate = new Date(invoice.date);
                const fromDate = new Date(filters.dateFrom);
                const toDate = new Date(filters.dateTo);
                return invoiceDate >= fromDate && invoiceDate <= toDate;
            });
        }
        
        // Amount range filter
        if (filters.minAmount || filters.maxAmount) {
            results = results.filter(invoice => {
                if (filters.minAmount && invoice.amount < filters.minAmount) return false;
                if (filters.maxAmount && invoice.amount > filters.maxAmount) return false;
                return true;
            });
        }
        
        return results;
    },

    /**
     * Handle search and filter input
     */
    handleSearchFilter: function(input) {
        const filterType = input.dataset.filter;
        const value = input.value;
        
        // Store filter in session
        if (!this.currentFilters) this.currentFilters = {};
        this.currentFilters[filterType] = value;
        
        // Apply filters with debounce
        clearTimeout(this.searchTimeout);
        this.searchTimeout = setTimeout(() => {
            this.applySearchFilters();
        }, 300);
    },

    /**
     * Apply search filters to invoice list
     */
    applySearchFilters: function() {
        const filters = this.currentFilters || {};
        const results = this.searchInvoices(filters.search, filters);
        
        // Update invoice list display
        this.updateInvoiceListDisplay(results);
        
        // Show results count
        const resultsCount = results.length;
        Toast.show('نتائج البحث', `تم العثور على ${resultsCount} فاتورة`, 'info');
    },

    /**
     * Update invoice list display with filtered results
     */
    updateInvoiceListDisplay: function(invoices) {
        const invoiceList = document.querySelector('.bil-invoices-list');
        if (!invoiceList) return;
        
        // Clear current display
        invoiceList.innerHTML = '';
        
        if (invoices.length === 0) {
            invoiceList.innerHTML = `
                <div class="bil-no-results">
                    <i class="fas fa-search"></i>
                    <h3>لا توجد نتائج</h3>
                    <p>لم يتم العثور على فواتير تطابق معايير البحث</p>
                </div>
            `;
            return;
        }
        
        // Recreate invoice items
        invoices.forEach(invoice => {
            const invoiceElement = this.createInvoiceElement(invoice);
            invoiceList.appendChild(invoiceElement);
        });
    },

    /**
     * Create invoice element for display
     */
    createInvoiceElement: function(invoice) {
        const div = document.createElement('div');
        div.className = `bil-invoice-item ${invoice.isUrgent ? 'bil-urgent' : ''}`;
        div.innerHTML = `
            <div class="bil-invoice-header">
                <div class="bil-invoice-number">#${invoice.id}</div>
                <div class="bil-invoice-status bil-${invoice.status}">${this.getStatusText(invoice.status)}</div>
            </div>
            <div class="bil-invoice-content">
                <div class="bil-invoice-info">
                    <div class="bil-invoice-title">${invoice.title}</div>
                    <div class="bil-invoice-details">
                        <span class="bil-invoice-date">${invoice.date}</span>
                        <span class="bil-invoice-due">استحقاق: ${invoice.dueDate}</span>
                    </div>
                    <div class="bil-invoice-services">
                        ${invoice.services.map(service => `<span class="bil-service-tag">${service}</span>`).join('')}
                    </div>
                </div>
                <div class="bil-invoice-amount">${invoice.amount.toLocaleString()} ريال</div>
            </div>
            <div class="bil-invoice-actions">
                <button class="bil-btn bil-btn-outline" data-action="view-invoice">
                    <i class="fas fa-eye"></i>
                    عرض
                </button>
                ${this.getActionButtons(invoice)}
            </div>
        `;
        
        return div;
    },

    /**
     * Get status text in Arabic
     */
    getStatusText: function(status) {
        const statusMap = {
            'pending': 'معلق',
            'paid': 'مدفوع',
            'overdue': 'متأخر',
            'partial': 'مدفوع جزئياً'
        };
        return statusMap[status] || status;
    },

    /**
     * Get appropriate action buttons for invoice
     */
    getActionButtons: function(invoice) {
        switch (invoice.status) {
            case 'pending':
                return `
                    <button class="bil-btn bil-btn-primary" data-action="send-invoice">
                        <i class="fas fa-paper-plane"></i>
                        إرسال
                    </button>
                `;
            case 'overdue':
                return `
                    <button class="bil-btn bil-btn-danger" data-action="send-reminder">
                        <i class="fas fa-bell"></i>
                        تذكير
                    </button>
                `;
            case 'paid':
                return `
                    <button class="bil-btn bil-btn-outline" data-action="download-invoice">
                        <i class="fas fa-download"></i>
                        تحميل
                    </button>
                `;
            default:
                return '';
        }
    },

    /**
     * Handle invoice selection for bulk actions
     */
    handleInvoiceSelection: function(checkbox) {
        const invoiceItem = checkbox.closest('.bil-invoice-item');
        const invoiceId = checkbox.dataset.invoiceId;
        
        if (!this.selectedInvoices) this.selectedInvoices = new Set();
        
        if (checkbox.checked) {
            this.selectedInvoices.add(invoiceId);
            invoiceItem.classList.add('bil-selected');
        } else {
            this.selectedInvoices.delete(invoiceId);
            invoiceItem.classList.remove('bil-selected');
        }
        
        this.updateBulkActionsBar();
    },

    /**
     * Update bulk actions bar visibility
     */
    updateBulkActionsBar: function() {
        const bulkBar = document.querySelector('.bil-bulk-actions');
        if (!bulkBar) return;
        
        if (this.selectedInvoices && this.selectedInvoices.size > 0) {
            bulkBar.classList.add('bil-active');
            const countElement = bulkBar.querySelector('.bil-bulk-count');
            if (countElement) {
                countElement.textContent = `${this.selectedInvoices.size} فاتورة محددة`;
            }
        } else {
            bulkBar.classList.remove('bil-active');
        }
    },

    /**
     * Handle bulk actions
     */
    handleBulkAction: function(action) {
        if (!this.selectedInvoices || this.selectedInvoices.size === 0) {
            Toast.show('خطأ', 'يرجى تحديد فواتير أولاً', 'error');
            return;
        }
        
        const invoiceIds = Array.from(this.selectedInvoices);
        
        switch (action) {
            case 'send-reminders':
                this.sendBulkReminders(invoiceIds);
                break;
            case 'export-selected':
                this.exportSelectedInvoices(invoiceIds);
                break;
            case 'apply-discount':
                this.showBulkDiscountDialog(invoiceIds);
                break;
            case 'mark-as-paid':
                this.markInvoicesAsPaid(invoiceIds);
                break;
            default:
                console.log(`Unknown bulk action: ${action}`);
        }
    },

    /**
     * Export selected invoices
     */
    exportSelectedInvoices: function(invoiceIds) {
        const invoices = this.data.clientInvoices.filter(inv => invoiceIds.includes(inv.id));
        
        Toast.show('تصدير الفواتير', `جاري تصدير ${invoices.length} فاتورة...`, 'info');
        
        setTimeout(() => {
            const link = document.createElement('a');
            link.href = '#';
            link.download = `selected-invoices-${new Date().toISOString().split('T')[0]}.pdf`;
            link.click();
            Toast.show('تصدير الفواتير', 'تم تصدير الفواتير المحددة بنجاح', 'success');
        }, 1500);
    },

    /**
     * Show bulk discount dialog
     */
    showBulkDiscountDialog: function(invoiceIds) {
        // In a real app, this would show a modal dialog
        const discountType = prompt('نوع الخصم (percentage/fixed):', 'percentage');
        const discountValue = prompt('قيمة الخصم:', '10');
        
        if (discountType && discountValue) {
            let successCount = 0;
            invoiceIds.forEach(invoiceId => {
                if (this.applyDiscount(invoiceId, discountType, parseFloat(discountValue))) {
                    successCount++;
                }
            });
            
            Toast.show('تطبيق الخصم', `تم تطبيق الخصم على ${successCount} فاتورة`, 'success');
        }
    },

    /**
     * Mark invoices as paid
     */
    markInvoicesAsPaid: function(invoiceIds) {
        let successCount = 0;
        
        invoiceIds.forEach(invoiceId => {
            const invoice = this.data.clientInvoices.find(inv => inv.id === invoiceId);
            if (invoice && invoice.status !== 'paid') {
                invoice.status = 'paid';
                invoice.paidDate = new Date().toLocaleDateString('ar-SA');
                successCount++;
            }
        });
        
        if (successCount > 0) {
            this.updateClientInvoices();
            Toast.show('تحديث الحالة', `تم تحديث ${successCount} فاتورة كمدفوعة`, 'success');
        }
    },

    /**
     * Clear all filters
     */
    clearFilters: function() {
        this.currentFilters = {};
        
        // Clear all filter inputs
        document.querySelectorAll('[data-filter]').forEach(input => {
            input.value = '';
        });
        
        // Reset invoice list
        this.updateInvoiceListDisplay(this.data.clientInvoices);
        Toast.show('مسح الفلاتر', 'تم مسح جميع الفلاتر', 'info');
    },

    /**
     * Enhanced mobile touch interactions
     */
    setupMobileInteractions: function() {
        // Add touch feedback for cards
        const cards = document.querySelectorAll('.bil-action-card, .bil-payment-method, .bil-invoice-item');
        cards.forEach(card => {
            card.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.98)';
            });
            
            card.addEventListener('touchend', function() {
                this.style.transform = '';
            });
        });

        // Add swipe gestures for invoice items
        const invoiceItems = document.querySelectorAll('.bil-invoice-item');
        invoiceItems.forEach(item => {
            let startX = 0;
            let currentX = 0;
            
            item.addEventListener('touchstart', function(e) {
                startX = e.touches[0].clientX;
            });
            
            item.addEventListener('touchmove', function(e) {
                currentX = e.touches[0].clientX;
                const diff = currentX - startX;
                
                if (Math.abs(diff) > 50) {
                    this.style.transform = `translateX(${diff * 0.3}px)`;
                }
            });
            
            item.addEventListener('touchend', function() {
                this.style.transform = '';
                const diff = currentX - startX;
                
                if (diff > 100) {
                    // Swipe right - mark as paid
                    this.querySelector('[data-action="mark-as-paid"]')?.click();
                } else if (diff < -100) {
                    // Swipe left - send reminder
                    this.querySelector('[data-action="send-reminder"]')?.click();
                }
            });
        });
    },

    /**
     * Optimize for mobile performance
     */
    optimizeForMobile: function() {
        // Reduce animations on mobile for better performance
        if (window.innerWidth <= 768) {
            document.documentElement.style.setProperty('--animation-duration', '0.2s');
        }
        
        // Add mobile-specific event listeners
        this.setupMobileInteractions();
        
        // Optimize touch targets
        const buttons = document.querySelectorAll('.bil-btn, .bil-action-btn, .bil-bulk-btn');
        buttons.forEach(button => {
            button.style.minHeight = '44px'; // iOS recommended touch target size
            button.style.minWidth = '44px';
        });
    }
};

// Explicitly attach to global scope
window.BillingController = BillingController; 