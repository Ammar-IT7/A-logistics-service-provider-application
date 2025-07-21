/**
 * Billing Controller - Service Provider Revenue Management
 */
const BillingController = {
    /**
     * Billing data structure - Service Provider Revenue Focus
     */
    data: {
        summary: {
            totalRevenue: 98750,
            pendingInvoices: 12,
            daysUntilDue: 3,
            onTimePaymentRate: 94
        },
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
                title: 'توصيل نهائي - شحنة من جدة إلى الرياض - ديسمبر 2024',
                amount: 2200,
                status: 'pending',
                date: '14 ديسمبر 2024',
                dueDate: '28 ديسمبر 2024',
                services: ['توصيل داخلي', 'تتبع مباشر', 'توقيع إلكتروني'],
                serviceType: 'lastmile',
                deliveryArea: 'وسط الرياض',
                vehicleType: 'دراجات نارية'
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
                packagingType: 'تغليف فاخر'
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

    /**
     * Initialize the billing page
     */
    init: function() {
        console.log('BillingController initialized - Service Provider Revenue Management');
        this.setupEventListeners();
        this.loadBillingData();
        this.addAnimations();
        this.setupRealTimeUpdates();
        this.optimizeForMobile();
    },
    
    /**
     * Set up page-specific event listeners
     */
    setupEventListeners: function() {
        const billingPage = document.getElementById('billing');
        if (!billingPage) return;
        
        // Handle client payment method actions
        billingPage.addEventListener('click', (e) => {
            const actionBtn = e.target.closest('.bil-action-btn');
            if (actionBtn) {
                e.preventDefault();
                const action = actionBtn.dataset.action;
                this.handlePaymentMethodAction(action, actionBtn);
            }
        });
        
        // Handle invoice actions (service provider perspective)
        billingPage.addEventListener('click', (e) => {
            const invoiceBtn = e.target.closest('.bil-btn');
            if (invoiceBtn) {
                e.preventDefault();
                const action = invoiceBtn.dataset.action;
                this.handleInvoiceAction(action, invoiceBtn);
            }
        });
        
        // Handle client payment method toggle
        billingPage.addEventListener('click', (e) => {
            const methodItem = e.target.closest('.bil-payment-method');
            if (methodItem && !e.target.closest('.bil-action-btn')) {
                this.togglePaymentMethod(methodItem);
            }
        });
        
        // Handle billing settings toggle
        billingPage.addEventListener('change', (e) => {
            if (e.target.type === 'checkbox') {
                this.handleBillingSetting(e.target);
            }
        });

        // Handle quick action cards (service provider actions)
        billingPage.addEventListener('click', (e) => {
            const actionCard = e.target.closest('.bil-action-card');
            if (actionCard) {
                const action = actionCard.dataset.action;
                this.handleQuickAction(action, actionCard);
            }
        });

        // Handle summary card interactions
        billingPage.addEventListener('click', (e) => {
            const summaryCard = e.target.closest('.bil-summary-card');
            if (summaryCard) {
                this.handleSummaryCardClick(summaryCard);
            }
        });

        // Handle search and filter interactions
        billingPage.addEventListener('input', (e) => {
            const searchInput = e.target.closest('[data-filter]');
            if (searchInput) {
                this.handleSearchFilter(searchInput);
            }
        });

        // Handle bulk action buttons
        billingPage.addEventListener('click', (e) => {
            const bulkBtn = e.target.closest('.bil-bulk-btn');
            if (bulkBtn) {
                const action = bulkBtn.dataset.action;
                this.handleBulkAction(action);
            }
        });

        // Handle invoice checkboxes for bulk selection
        billingPage.addEventListener('change', (e) => {
            const checkbox = e.target.closest('.bil-invoice-checkbox');
            if (checkbox) {
                this.handleInvoiceSelection(checkbox);
            }
        });
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
     * Handle summary card click
     */
    handleSummaryCardClick: function(summaryCard) {
        const label = summaryCard.querySelector('.bil-summary-label').textContent;
        Toast.show('تفاصيل الإيرادات', `عرض تفاصيل ${label}`, 'info');
        
        // Add click animation
        summaryCard.style.transform = 'scale(0.98)';
        setTimeout(() => {
            summaryCard.style.transform = '';
        }, 150);
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
            this.updateRevenueSummary();
            this.updateClientPaymentMethods();
            this.updateClientInvoices();
            this.updateRevenueHistory();
            this.removeLoadingState();
        }, 800);
    },
    
    /**
     * Update revenue summary with enhanced animations
     */
    updateRevenueSummary: function() {
        const summaryCards = document.querySelectorAll('.bil-summary-card');
        summaryCards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
            card.classList.add('bil-fade-in');
            
            // Animate values
            const valueElement = card.querySelector('.bil-summary-value');
            if (valueElement) {
                this.animateValue(valueElement);
            }
        });
    },
    
    /**
     * Animate numeric values
     */
    animateValue: function(element) {
        const text = element.textContent;
        const isCurrency = text.includes('ريال');
        const isPercentage = text.includes('%');
        const isDays = text.includes('أيام');
        
        let targetValue = 0;
        if (isCurrency) {
            targetValue = this.data.summary.totalRevenue;
        } else if (isPercentage) {
            targetValue = this.data.summary.onTimePaymentRate;
        } else if (isDays) {
            targetValue = this.data.summary.daysUntilDue;
        } else {
            targetValue = this.data.summary.pendingInvoices;
        }
        
        // Animate the value
        this.animateNumber(element, targetValue, isCurrency, isPercentage, isDays);
    },
    
    /**
     * Animate number with smooth transitions
     */
    animateNumber: function(element, target, isCurrency, isPercentage, isDays) {
        const start = 0;
        const duration = 1000;
        const startTime = performance.now();
        
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const current = start + (target - start) * this.easeOutQuart(progress);
            
            if (isCurrency) {
                element.textContent = `${Math.round(current).toLocaleString()} ريال`;
            } else if (isPercentage) {
                element.textContent = `${Math.round(current)}%`;
            } else if (isDays) {
                element.textContent = `${Math.round(current)} أيام`;
            } else {
                element.textContent = Math.round(current);
            }
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        requestAnimationFrame(animate);
    },
    
    /**
     * Easing function for smooth animations
     */
    easeOutQuart: function(t) {
        return 1 - Math.pow(1 - t, 4);
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
        
        // Add fade-in animation to summary cards
        const summaryCards = billingPage.querySelectorAll('.bil-summary-card');
        summaryCards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
            card.classList.add('bil-fade-in');
        });
        
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
        // Update summary every 30 seconds
        setInterval(() => {
            this.updateRevenueSummary();
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
     * Get revenue summary
     */
    getRevenueSummary: function() {
        return this.data.summary;
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
     * Generate revenue summary report
     */
    generateRevenueSummary: function(dateRange) {
        const invoices = this.data.clientInvoices.filter(inv => 
            new Date(inv.date) >= new Date(dateRange.start) &&
            new Date(inv.date) <= new Date(dateRange.end)
        );
        
        const totalRevenue = invoices.reduce((sum, inv) => sum + inv.amount, 0);
        const paidInvoices = invoices.filter(inv => inv.status === 'paid');
        const pendingInvoices = invoices.filter(inv => inv.status === 'pending');
        const overdueInvoices = invoices.filter(inv => inv.status === 'overdue');
        
        return {
            totalRevenue,
            totalInvoices: invoices.length,
            paidInvoices: paidInvoices.length,
            pendingInvoices: pendingInvoices.length,
            overdueInvoices: overdueInvoices.length,
            averageInvoiceAmount: totalRevenue / invoices.length || 0
        };
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
        const cards = document.querySelectorAll('.bil-summary-card, .bil-action-card, .bil-payment-method, .bil-invoice-item');
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