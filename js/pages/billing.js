/**
 * Billing Controller - Updated for prefixed CSS classes and Arabic text
 */
const BillingController = {
    /**
     * Initialize the billing page
     */
    init: function() {
        console.log('BillingController initialized');
        this.setupEventListeners();
        this.loadBillingData();
        this.addAnimations();
    },
    
    /**
     * Set up page-specific event listeners
     */
    setupEventListeners: function() {
        const billingPage = document.getElementById('billing');
        if (!billingPage) return;
        
        // Handle payment method actions
        billingPage.addEventListener('click', (e) => {
            const actionBtn = e.target.closest('.bil-action-btn');
            if (actionBtn) {
                e.preventDefault();
                const action = actionBtn.dataset.action;
                this.handlePaymentMethodAction(action, actionBtn);
            }
        });
        
        // Handle invoice actions
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
        
        // Handle billing settings toggle
        billingPage.addEventListener('change', (e) => {
            if (e.target.type === 'checkbox') {
                this.handleBillingSetting(e.target);
            }
        });
    },
    
    /**
     * Handle payment method actions
     */
    handlePaymentMethodAction: function(action, button) {
        const methodItem = button.closest('.bil-payment-method');
        const methodName = methodItem.querySelector('.bil-method-name').textContent;
        
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
    },
    
    /**
     * Handle invoice actions
     */
    handleInvoiceAction: function(action, button) {
        const invoiceItem = button.closest('.bil-invoice-item');
        const invoiceNumber = invoiceItem.querySelector('.bil-invoice-number').textContent;
        const invoiceAmount = invoiceItem.querySelector('.bil-invoice-amount').textContent;
        
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
    },
    
    /**
     * Remove payment method
     */
    removePaymentMethod: function(methodItem) {
        methodItem.style.animation = 'bilFadeOut 0.3s ease-out';
        setTimeout(() => {
            methodItem.remove();
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
     * Handle billing settings
     */
    handleBillingSetting: function(checkbox) {
        const settingName = checkbox.closest('.bil-setting-item').querySelector('.bil-setting-title').textContent;
        const isEnabled = checkbox.checked;
        
        const status = isEnabled ? 'تم تفعيل' : 'تم إلغاء تفعيل';
        Toast.show('إعدادات الفواتير', `${status} ${settingName}`, 'success');
        
        // Update state
        State.update(`billing.${checkbox.id}`, isEnabled);
    },
    
    /**
     * View invoice
     */
    viewInvoice: function(invoiceNumber) {
        setTimeout(() => {
            Router.navigate('invoice-details', { invoice: invoiceNumber });
        }, 1000);
    },
    
    /**
     * Pay invoice
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
     * Download invoice
     */
    downloadInvoice: function(invoiceNumber) {
        // Simulate download
        const link = document.createElement('a');
        link.href = '#';
        link.download = `${invoiceNumber}.pdf`;
        link.click();
    },
    
    /**
     * Load billing data
     */
    loadBillingData: function() {
        // Simulate loading billing data
        setTimeout(() => {
            this.updateBillingSummary();
            this.updatePaymentMethods();
            this.updateInvoices();
        }, 500);
    },
    
    /**
     * Update billing summary
     */
    updateBillingSummary: function() {
        const summaryCards = document.querySelectorAll('.bil-summary-card');
        summaryCards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
            card.classList.add('bil-fade-in');
        });
    },
    
    /**
     * Update payment methods
     */
    updatePaymentMethods: function() {
        const paymentMethods = document.querySelectorAll('.bil-payment-method');
        paymentMethods.forEach((method, index) => {
            method.style.animationDelay = `${index * 0.05}s`;
            method.classList.add('bil-slide-in');
        });
    },
    
    /**
     * Update invoices
     */
    updateInvoices: function() {
        const invoices = document.querySelectorAll('.bil-invoice-item');
        invoices.forEach((invoice, index) => {
            invoice.style.animationDelay = `${index * 0.05}s`;
            invoice.classList.add('bil-fade-in');
        });
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
    },
    
    /**
     * Export billing data
     */
    exportBillingData: function() {
        Toast.show('تصدير البيانات', 'جاري تصدير بيانات الفواتير...', 'info');
        
        setTimeout(() => {
            const link = document.createElement('a');
            link.href = '#';
            link.download = 'billing-report.csv';
            link.click();
            Toast.show('تصدير البيانات', 'تم تصدير البيانات بنجاح', 'success');
        }, 2000);
    },
    
    /**
     * Add new payment method
     */
    addPaymentMethod: function() {
        Toast.show('إضافة طريقة دفع', 'جاري فتح نموذج إضافة طريقة دفع جديدة...', 'info');
        
        setTimeout(() => {
            Router.navigate('add-payment-method');
        }, 1000);
    }
};

// Explicitly attach to global scope
window.BillingController = BillingController; 