/**
 * Billing Controller - Modern Enhanced Version
 */
const BillingController = {
    /**
     * Billing data structure - Aligned with logistics service provider app
     */
    data: {
        summary: {
            totalDue: 18750,
            pendingInvoices: 12,
            daysUntilDue: 3,
            onTimePaymentRate: 94
        },
        paymentMethods: [
            {
                id: 1,
                type: 'visa',
                name: 'Visa تنتهي بـ 1234',
                expiry: '12/25',
                limit: '50,000 ريال',
                isDefault: true
            },
            {
                id: 2,
                type: 'mastercard',
                name: 'Mastercard تنتهي بـ 5678',
                expiry: '08/26',
                limit: '75,000 ريال',
                isDefault: false
            },
            {
                id: 3,
                type: 'bank',
                name: 'تحويل بنكي',
                details: 'البنك الأهلي السعودي',
                account: '1234567890',
                isDefault: false
            },
            {
                id: 4,
                type: 'paypal',
                name: 'PayPal',
                details: 'user@example.com',
                limit: 'متصل بالحساب المصرفي',
                isDefault: false
            }
        ],
        invoices: [
            {
                id: 'INV-2024-015',
                title: 'خدمات الشحن الدولي - ديسمبر 2024',
                amount: 4250,
                status: 'overdue',
                date: '20 ديسمبر 2024',
                dueDate: '15 ديسمبر 2024',
                services: ['شحن بحري', 'تخليص جمركي', 'تأمين'],
                serviceType: 'shipping',
                isUrgent: true,
                client: 'شركة التقنية المتقدمة',
                route: 'ميناء جدة الإسلامي - الرياض'
            },
            {
                id: 'INV-2024-014',
                title: 'خدمات التخزين - ديسمبر 2024',
                amount: 2800,
                status: 'pending',
                date: '18 ديسمبر 2024',
                dueDate: '31 ديسمبر 2024',
                services: ['تخزين بارد', 'إدارة مخزون'],
                serviceType: 'storage',
                client: 'مصنع الأثاث الحديث',
                warehouse: 'مخزن الرياض الرئيسي'
            },
            {
                id: 'INV-2024-013',
                title: 'خدمات التغليف والتعبئة - نوفمبر 2024',
                amount: 1950,
                status: 'paid',
                date: '30 نوفمبر 2024',
                paidDate: '15 ديسمبر 2024',
                services: ['تغليف خاص', 'تعبئة آمنة'],
                serviceType: 'packaging',
                client: 'شركة الأدوية العالمية',
                packagingType: 'تغليف فاخر'
            },
            {
                id: 'INV-2024-012',
                title: 'خدمات النقل البري - ديسمبر 2024',
                amount: 3100,
                status: 'pending',
                date: '16 ديسمبر 2024',
                dueDate: '30 ديسمبر 2024',
                services: ['نقل بري', 'تتبع GPS'],
                serviceType: 'transport',
                client: 'شركة النفط الوطنية',
                route: 'الرياض - الدمام',
                vehicleType: 'شاحنة نقل كبيرة'
            },
            {
                id: 'INV-2024-011',
                title: 'خدمات التخليص الجمركي - ديسمبر 2024',
                amount: 1850,
                status: 'pending',
                date: '14 ديسمبر 2024',
                dueDate: '28 ديسمبر 2024',
                services: ['تخليص جمركي', 'وثائق شحن'],
                serviceType: 'customs',
                client: 'شركة الاستيراد العالمية',
                port: 'ميناء الدمام',
                cargoType: 'معدات إلكترونية'
            },
            {
                id: 'INV-2024-010',
                title: 'خدمات التوصيل النهائي - ديسمبر 2024',
                amount: 1200,
                status: 'pending',
                date: '12 ديسمبر 2024',
                dueDate: '26 ديسمبر 2024',
                services: ['توصيل داخلي', 'تتبع مباشر'],
                serviceType: 'lastmile',
                client: 'متجر الأزياء الفاخر',
                deliveryArea: 'وسط الرياض',
                vehicleType: 'دراجات نارية'
            }
        ],
        payments: [
            {
                id: 1,
                invoiceId: 'INV-2024-009',
                method: 'visa',
                amount: 2450,
                date: '15 ديسمبر 2024 - 14:30',
                status: 'completed',
                serviceType: 'shipping',
                client: 'شركة الشحن السريع'
            },
            {
                id: 2,
                invoiceId: 'INV-2024-008',
                method: 'bank',
                amount: 3800,
                date: '10 ديسمبر 2024 - 09:15',
                status: 'completed',
                serviceType: 'storage',
                client: 'مخازن الرياض المتحدة'
            },
            {
                id: 3,
                invoiceId: 'INV-2024-007',
                method: 'mastercard',
                amount: 1750,
                date: '5 ديسمبر 2024 - 16:45',
                status: 'completed',
                serviceType: 'packaging',
                client: 'شركة التغليف المتخصصة'
            },
            {
                id: 4,
                invoiceId: 'INV-2024-006',
                method: 'paypal',
                amount: 2100,
                date: '30 نوفمبر 2024 - 11:20',
                status: 'completed',
                serviceType: 'customs',
                client: 'مكتب التخليص الجمركي المتقدم'
            },
            {
                id: 5,
                invoiceId: 'INV-2024-005',
                method: 'visa',
                amount: 1650,
                date: '25 نوفمبر 2024 - 13:15',
                status: 'completed',
                serviceType: 'transport',
                client: 'شركة النقل البري'
            },
            {
                id: 6,
                invoiceId: 'INV-2024-004',
                method: 'bank',
                amount: 950,
                date: '20 نوفمبر 2024 - 10:30',
                status: 'completed',
                serviceType: 'lastmile',
                client: 'خدمات التوصيل السريع'
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
        // Service-specific billing data aligned with app structure
        serviceStats: {
            shipping: {
                totalRevenue: 45000,
                pendingAmount: 8500,
                completedOrders: 25,
                activeVehicles: 8
            },
            storage: {
                totalRevenue: 32000,
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
                totalRevenue: 28000,
                pendingAmount: 4200,
                completedClearances: 18,
                activePorts: 4
            },
            transport: {
                totalRevenue: 35000,
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
        console.log('BillingController initialized');
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
        
        // Handle payment method actions with enhanced UX
        billingPage.addEventListener('click', (e) => {
            const actionBtn = e.target.closest('.bil-action-btn');
            if (actionBtn) {
                e.preventDefault();
                const action = actionBtn.dataset.action;
                this.handlePaymentMethodAction(action, actionBtn);
            }
        });
        
        // Handle invoice actions with enhanced feedback
        billingPage.addEventListener('click', (e) => {
            const invoiceBtn = e.target.closest('.bil-btn');
            if (invoiceBtn) {
                e.preventDefault();
                const action = invoiceBtn.dataset.action;
                this.handleInvoiceAction(action, invoiceBtn);
            }
        });
        
        // Handle payment method toggle
        billingPage.addEventListener('click', (e) => {
            const methodItem = e.target.closest('.bil-payment-method');
            if (methodItem && !e.target.closest('.bil-action-btn')) {
                this.togglePaymentMethod(methodItem);
            }
        });
        
        // Handle billing settings toggle with enhanced feedback
        billingPage.addEventListener('change', (e) => {
            if (e.target.type === 'checkbox') {
                this.handleBillingSetting(e.target);
            }
        });

        // Handle quick action cards
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
     * Handle payment method actions with enhanced UX
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
                    Toast.show('طريقة الدفع', `تم تعيين ${methodName} كطريقة دفع افتراضية`, 'success');
                    break;
                case 'remove-method':
                    this.removePaymentMethod(methodItem);
                    Toast.show('طريقة الدفع', `تم حذف ${methodName}`, 'info');
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
     * Handle invoice actions with enhanced feedback
     */
    handleInvoiceAction: function(action, button) {
        const invoiceItem = button.closest('.bil-invoice-item');
        const invoiceNumber = invoiceItem.querySelector('.bil-invoice-number').textContent;
        const invoiceAmount = invoiceItem.querySelector('.bil-invoice-amount').textContent;
        
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
                case 'pay-invoice':
                    this.payInvoice(invoiceNumber, invoiceAmount);
                    Toast.show('دفع الفاتورة', `جاري معالجة الدفع للفاتورة ${invoiceNumber}`, 'info');
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
     * Handle quick action cards
     */
    handleQuickAction: function(action, actionCard) {
        // Add click animation
        actionCard.style.transform = 'scale(0.98)';
        setTimeout(() => {
            actionCard.style.transform = '';
        }, 150);
        
        switch (action) {
            case 'pay-all':
                this.payAllInvoices();
                break;
            case 'export-invoices':
                this.exportAllInvoices();
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
        Toast.show('تفاصيل المقياس', `عرض تفاصيل ${label}`, 'info');
        
        // Add click animation
        summaryCard.style.transform = 'scale(0.98)';
        setTimeout(() => {
            summaryCard.style.transform = '';
        }, 150);
    },
    
    /**
     * Pay all pending invoices
     */
    payAllInvoices: function() {
        const pendingInvoices = this.data.invoices.filter(inv => inv.status === 'pending');
        const totalAmount = pendingInvoices.reduce((sum, inv) => sum + inv.amount, 0);
        
        Toast.show('دفع الكل', `جاري معالجة دفع ${pendingInvoices.length} فواتير بقيمة ${totalAmount.toLocaleString()} ريال`, 'info');
        
        setTimeout(() => {
            Router.navigate('bulk-payment', { 
                invoices: pendingInvoices.map(inv => inv.id),
                totalAmount: totalAmount
            });
        }, 1000);
    },
    
    /**
     * Export all invoices
     */
    exportAllInvoices: function() {
        Toast.show('تصدير الفواتير', 'جاري تحضير ملف PDF للفواتير...', 'info');
        
        setTimeout(() => {
            const link = document.createElement('a');
            link.href = '#';
            link.download = `invoices-${new Date().toISOString().split('T')[0]}.pdf`;
            link.click();
            Toast.show('تصدير الفواتير', 'تم تصدير الفواتير بنجاح', 'success');
        }, 2000);
    },
    
    /**
     * Set default payment method
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
        if (status) status.textContent = 'افتراضي';
        
        // Update data
        const methodName = methodItem.querySelector('.bil-method-name').textContent;
        this.data.paymentMethods.forEach(method => {
            method.isDefault = method.name === methodName;
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
            this.data.paymentMethods = this.data.paymentMethods.filter(method => method.name !== methodName);
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
     * Pay invoice with enhanced navigation
     */
    payInvoice: function(invoiceNumber, amount) {
        setTimeout(() => {
            Router.navigate('payment', { 
                invoice: invoiceNumber, 
                amount: amount 
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
            this.updateBillingSummary();
            this.updatePaymentMethods();
            this.updateInvoices();
            this.updatePaymentHistory();
            this.removeLoadingState();
        }, 800);
    },
    
    /**
     * Update billing summary with enhanced animations
     */
    updateBillingSummary: function() {
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
            targetValue = this.data.summary.totalDue;
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
     * Update payment methods with enhanced animations
     */
    updatePaymentMethods: function() {
        const paymentMethods = document.querySelectorAll('.bil-payment-method');
        paymentMethods.forEach((method, index) => {
            method.style.animationDelay = `${index * 0.05}s`;
            method.classList.add('bil-slide-in');
        });
    },
    
    /**
     * Update invoices with enhanced animations
     */
    updateInvoices: function() {
        const invoices = document.querySelectorAll('.bil-invoice-item');
        invoices.forEach((invoice, index) => {
            invoice.style.animationDelay = `${index * 0.05}s`;
            invoice.classList.add('bil-fade-in');
        });
    },
    
    /**
     * Update payment history with enhanced animations
     */
    updatePaymentHistory: function() {
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
            this.updateBillingSummary();
        }, 30000);
    },
    
    /**
     * Export billing data with enhanced UX
     */
    exportBillingData: function() {
        Toast.show('تصدير البيانات', 'جاري تحضير ملف التصدير...', 'info');
        
        setTimeout(() => {
            const link = document.createElement('a');
            link.href = '#';
            link.download = `billing-report-${new Date().toISOString().split('T')[0]}.csv`;
            link.click();
            Toast.show('تصدير البيانات', 'تم تصدير البيانات بنجاح', 'success');
        }, 2000);
    },
    
    /**
     * Add new payment method with enhanced navigation
     */
    addPaymentMethod: function() {
        Toast.show('إضافة طريقة دفع', 'جاري فتح نموذج إضافة طريقة دفع جديدة...', 'info');
        
        setTimeout(() => {
            Router.navigate('add-payment-method');
        }, 1000);
    },
    
    /**
     * Get billing summary
     */
    getBillingSummary: function() {
        return this.data.summary;
    },
    
    /**
     * Get payment methods
     */
    getPaymentMethods: function() {
        return this.data.paymentMethods;
    },
    
    /**
     * Get invoices
     */
    getInvoices: function() {
        return this.data.invoices;
    },
    
    /**
     * Get payments
     */
    getPayments: function() {
        return this.data.payments;
    },
    
    /**
     * Get service statistics
     */
    getServiceStats: function() {
        return this.data.serviceStats;
    },
    
    /**
     * Get invoices by service type
     */
    getInvoicesByServiceType: function(serviceType) {
        return this.data.invoices.filter(invoice => invoice.serviceType === serviceType);
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