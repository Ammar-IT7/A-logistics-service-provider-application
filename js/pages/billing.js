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
    }
};

// Explicitly attach to global scope
window.BillingController = BillingController; 