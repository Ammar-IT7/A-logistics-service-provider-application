/**
 * Billing Controller
 */
const BillingController = {
    /**
     * Initialize the billing page
     */
    init: function() {
        console.log('BillingController initialized');
        this.loadBillingData();
        this.setupPaymentMethods();
        this.setupEventListeners();
        this.updateDesignerNotes();
    },

    /**
     * Load billing data
     */
    loadBillingData: function() {
        this.updateBillingSummary();
        this.loadInvoices();
        this.loadPaymentHistory();
        this.setupBillingSettings();
    },

    /**
     * Update billing summary
     */
    updateBillingSummary: function() {
        const summaryData = {
            total: '15,500 ريال',
            pending: '8',
            dueDate: '5 أيام'
        };
        
        // Update summary cards
        document.querySelectorAll('.summary-value').forEach((element, index) => {
            const values = Object.values(summaryData);
            if (values[index]) {
                element.textContent = values[index];
            }
        });
    },

    /**
     * Setup payment methods
     */
    setupPaymentMethods: function() {
        const paymentMethods = document.querySelectorAll('.payment-method');
        
        paymentMethods.forEach(method => {
            // Handle set default action
            const setDefaultBtn = method.querySelector('[data-action="set-default"]');
            if (setDefaultBtn) {
                setDefaultBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    this.setDefaultPaymentMethod(method);
                });
            }
            
            // Handle remove method action
            const removeBtn = method.querySelector('[data-action="remove-method"]');
            if (removeBtn) {
                removeBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    this.removePaymentMethod(method);
                });
            }
        });
    },

    /**
     * Set default payment method
     */
    setDefaultPaymentMethod: function(method) {
        // Remove active class from all methods
        document.querySelectorAll('.payment-method').forEach(m => {
            m.classList.remove('active');
            const status = m.querySelector('.method-status');
            if (status) status.textContent = '';
        });
        
        // Add active class to selected method
        method.classList.add('active');
        const status = method.querySelector('.method-status');
        if (status) status.textContent = 'افتراضي';
        
        Toast.show('تم التحديث', 'تم تعيين طريقة الدفع كافتراضية', 'success');
    },

    /**
     * Remove payment method
     */
    removePaymentMethod: function(method) {
        const methodName = method.querySelector('.method-name').textContent;
        
        if (confirm(`هل أنت متأكد من حذف ${methodName}؟`)) {
            method.remove();
            Toast.show('تم الحذف', 'تم حذف طريقة الدفع بنجاح', 'success');
        }
    },

    /**
     * Load invoices
     */
    loadInvoices: function() {
        // Invoices are static for now
        // In a real app, this would fetch from the server
        console.log('Invoices loaded');
    },

    /**
     * Load payment history
     */
    loadPaymentHistory: function() {
        // Payment history is static for now
        // In a real app, this would fetch from the server
        console.log('Payment history loaded');
    },

    /**
     * Setup billing settings
     */
    setupBillingSettings: function() {
        const switches = document.querySelectorAll('.switch input[type="checkbox"]');
        
        switches.forEach(switchInput => {
            switchInput.addEventListener('change', (e) => {
                const settingTitle = e.target.closest('.setting-item').querySelector('.setting-title').textContent;
                const isEnabled = e.target.checked;
                
                Toast.show(
                    'تم التحديث', 
                    `${settingTitle} ${isEnabled ? 'مفعل' : 'معطل'}`, 
                    'success'
                );
            });
        });
    },

    /**
     * Handle invoice actions
     */
    handleInvoiceAction: function(action, invoiceId) {
        switch (action) {
            case 'view-invoice':
                this.viewInvoice(invoiceId);
                break;
            case 'pay-invoice':
                this.payInvoice(invoiceId);
                break;
            case 'download-invoice':
                this.downloadInvoice(invoiceId);
                break;
            default:
                console.log(`Unknown invoice action: ${action} for invoice: ${invoiceId}`);
        }
    },

    /**
     * View invoice
     */
    viewInvoice: function(invoiceId) {
        Toast.show('عرض الفاتورة', `جاري فتح الفاتورة ${invoiceId}`, 'info');
        
        setTimeout(() => {
            // Open invoice modal
            Modal.open('invoice-modal');
        }, 1000);
    },

    /**
     * Pay invoice
     */
    payInvoice: function(invoiceId) {
        Toast.show('دفع الفاتورة', `جاري فتح صفحة الدفع للفاتورة ${invoiceId}`, 'info');
        
        setTimeout(() => {
            // Open payment modal
            Modal.open('payment-modal');
        }, 1000);
    },

    /**
     * Download invoice
     */
    downloadInvoice: function(invoiceId) {
        Toast.show('تحميل الفاتورة', `جاري تحميل الفاتورة ${invoiceId}`, 'info');
        
        setTimeout(() => {
            Toast.show('تم التحميل', 'تم تحميل الفاتورة بنجاح', 'success');
        }, 2000);
    },

    /**
     * Handle payment method actions
     */
    handlePaymentMethodAction: function(action, methodId) {
        switch (action) {
            case 'set-default':
                this.setDefaultPaymentMethod(methodId);
                break;
            case 'remove-method':
                this.removePaymentMethod(methodId);
                break;
            default:
                console.log(`Unknown payment method action: ${action}`);
        }
    },

    /**
     * Add payment method
     */
    addPaymentMethod: function() {
        Toast.show('إضافة طريقة دفع', 'جاري فتح نموذج إضافة طريقة دفع جديدة', 'info');
        
        setTimeout(() => {
            Router.navigate('add-payment-method');
        }, 1000);
    },

    /**
     * Export billing data
     */
    exportBillingData: function() {
        Toast.show('تصدير البيانات', 'جاري تصدير بيانات الفواتير والمدفوعات', 'info');
        
        setTimeout(() => {
            Toast.show('تم التصدير', 'تم تصدير البيانات بنجاح', 'success');
        }, 2000);
    },

    /**
     * Set up event listeners
     */
    setupEventListeners: function() {
        const page = document.getElementById('billing');
        if (!page) return;

        // Handle invoice actions
        page.addEventListener('click', (e) => {
            const invoiceAction = e.target.closest('[data-action="view-invoice"], [data-action="pay-invoice"], [data-action="download-invoice"]');
            if (invoiceAction) {
                e.preventDefault();
                e.stopPropagation();
                
                const action = invoiceAction.dataset.action;
                const invoiceId = invoiceAction.closest('.invoice-item').querySelector('.invoice-number').textContent;
                
                this.handleInvoiceAction(action, invoiceId);
            }
        });

        // Handle add payment method
        page.addEventListener('click', (e) => {
            if (e.target.closest('[data-action="navigate"][data-page="add-payment-method"]')) {
                e.preventDefault();
                this.addPaymentMethod();
            }
        });

        // Handle view all invoices
        page.addEventListener('click', (e) => {
            if (e.target.closest('[data-action="navigate"][data-page="all-invoices"]')) {
                e.preventDefault();
                Router.navigate('all-invoices');
            }
        });

        // Handle payment methods page
        page.addEventListener('click', (e) => {
            if (e.target.closest('[data-action="navigate"][data-page="payment-methods"]')) {
                e.preventDefault();
                Router.navigate('payment-methods');
            }
        });
    },

    /**
     * Update designer notes
     */
    updateDesignerNotes: function() {
        const notes = "صفحة الفواتير والمدفوعات تعرض ملخص الفواتير وطرق الدفع المتاحة. تتضمن إدارة طرق الدفع وعرض الفواتير الحديثة وسجل المدفوعات وإعدادات الفواتير.";
        const notesContent = document.getElementById('designer-notes-content');
        if (notesContent) {
            notesContent.innerHTML = `<p>${notes}</p>`;
        }
    }
};

// Debug: Check if BillingController is properly declared
console.log('BillingController declared:', typeof BillingController !== 'undefined');
console.log('BillingController in window:', typeof window.BillingController !== 'undefined');

// Explicitly attach to global scope
window.BillingController = BillingController;
console.log('BillingController attached to window:', typeof window.BillingController !== 'undefined'); 