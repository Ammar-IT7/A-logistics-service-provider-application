/**
 * Account Management Controller - Updated for prefixed CSS classes and Arabic text
 */
const AccountManagementController = {
    /**
     * Initialize the account management page
     */
    init: function() {
        console.log('AccountManagementController initialized');
        this.setupEventListeners();
        this.loadAccountData();
        this.addAnimations();
    },
    
    /**
     * Set up page-specific event listeners
     */
    setupEventListeners: function() {
        const accountPage = document.getElementById('account-management');
        if (!accountPage) return;
        
        // Handle topic navigation
        accountPage.addEventListener('click', (e) => {
            const topicItem = e.target.closest('.acm-topic-item');
            if (topicItem) {
                e.preventDefault();
                const page = topicItem.dataset.page;
                if (page) {
                    this.navigateToTopic(page);
                }
            }
        });
        
        // Handle task navigation
        accountPage.addEventListener('click', (e) => {
            const taskItem = e.target.closest('.acm-task-item');
            if (taskItem) {
                e.preventDefault();
                this.showTaskDetails(taskItem);
            }
        });
        
        // Handle support actions
        accountPage.addEventListener('click', (e) => {
            const supportBtn = e.target.closest('.acm-btn');
            if (supportBtn) {
                e.preventDefault();
                const action = supportBtn.dataset.action;
                this.handleSupportAction(action);
            }
        });
        
        // Handle problem actions
        accountPage.addEventListener('click', (e) => {
            const problemBtn = e.target.closest('.acm-btn-outline');
            if (problemBtn) {
                e.preventDefault();
                const action = problemBtn.dataset.action;
                this.handleProblemAction(action);
            }
        });
    },
    
    /**
     * Navigate to help topic
     */
    navigateToTopic: function(topic) {
        Toast.show('انتقال', `جاري الانتقال إلى ${topic}...`, 'info');
        
        setTimeout(() => {
            Router.navigate(topic);
        }, 1000);
    },
    
    /**
     * Show task details
     */
    showTaskDetails: function(taskItem) {
        const taskTitle = taskItem.querySelector('h4').textContent;
        Toast.show('تفاصيل المهمة', `عرض تفاصيل ${taskTitle}`, 'info');
        
        // In a real app, this would show a modal with detailed steps
        setTimeout(() => {
            this.showTaskModal(taskTitle);
        }, 1000);
    },
    
    /**
     * Show task modal
     */
    showTaskModal: function(taskTitle) {
        const content = `
            <div class="modal-header">
                <h3>${taskTitle}</h3>
                <button class="modal-close" data-action="close-modal">&times;</button>
            </div>
            <div class="modal-body">
                <p>تفاصيل مفصلة حول ${taskTitle} ستظهر هنا.</p>
                <div class="task-steps">
                    <h4>الخطوات التفصيلية:</h4>
                    <ol>
                        <li>الخطوة الأولى</li>
                        <li>الخطوة الثانية</li>
                        <li>الخطوة الثالثة</li>
                        <li>الخطوة الرابعة</li>
                    </ol>
                </div>
                <div class="task-tips">
                    <h4>نصائح مهمة:</h4>
                    <ul>
                        <li>تأكد من صحة المعلومات</li>
                        <li>احفظ التغييرات قبل الخروج</li>
                        <li>تواصل مع الدعم عند الحاجة</li>
                    </ul>
                </div>
            </div>
        `;
        
        Modal.show('task-details-modal', content);
    },
    
    /**
     * Handle support actions
     */
    handleSupportAction: function(action) {
        switch (action) {
            case 'start-chat':
                this.startLiveChat();
                break;
            case 'send-email':
                this.sendEmail();
                break;
            case 'call-support':
                this.callSupport();
                break;
            default:
                console.log(`Unknown support action: ${action}`);
        }
    },
    
    /**
     * Handle problem actions
     */
    handleProblemAction: function(action) {
        switch (action) {
            case 'reset-password':
                this.resetPassword();
                break;
            case 'contact-support':
                this.contactSupport();
                break;
            case 'payment-help':
                this.paymentHelp();
                break;
            default:
                console.log(`Unknown problem action: ${action}`);
        }
    },
    
    /**
     * Start live chat
     */
    startLiveChat: function() {
        Toast.show('المحادثة المباشرة', 'جاري بدء المحادثة المباشرة...', 'info');
        
        setTimeout(() => {
            Router.navigate('live-chat');
        }, 1000);
    },
    
    /**
     * Send email
     */
    sendEmail: function() {
        Toast.show('البريد الإلكتروني', 'جاري فتح تطبيق البريد الإلكتروني...', 'info');
        
        setTimeout(() => {
            window.open('mailto:support@logistics.com?subject=استفسار حول إدارة الحساب');
        }, 1000);
    },
    
    /**
     * Call support
     */
    callSupport: function() {
        Toast.show('اتصال', 'جاري الاتصال بفريق الدعم...', 'info');
        
        setTimeout(() => {
            window.open('tel:920000000');
        }, 1000);
    },
    
    /**
     * Reset password
     */
    resetPassword: function() {
        Toast.show('إعادة تعيين كلمة المرور', 'جاري فتح نموذج إعادة تعيين كلمة المرور...', 'info');
        
        setTimeout(() => {
            Router.navigate('reset-password');
        }, 1000);
    },
    
    /**
     * Contact support
     */
    contactSupport: function() {
        Toast.show('تواصل مع الدعم', 'جاري فتح نموذج التواصل مع الدعم...', 'info');
        
        setTimeout(() => {
            Router.navigate('contact-support');
        }, 1000);
    },
    
    /**
     * Payment help
     */
    paymentHelp: function() {
        Toast.show('مساعدة الدفع', 'جاري فتح صفحة مساعدة الدفع...', 'info');
        
        setTimeout(() => {
            Router.navigate('payment-help');
        }, 1000);
    },
    
    /**
     * Load account data
     */
    loadAccountData: function() {
        // Simulate loading account data
        setTimeout(() => {
            this.updateAccountInfo();
            this.updateSecurityTips();
        }, 500);
    },
    
    /**
     * Update account information
     */
    updateAccountInfo: function() {
        const accountPage = document.getElementById('account-management');
        if (!accountPage) return;
        
        // Update user information if available
        const user = State.get('user');
        if (user) {
            const nameElement = accountPage.querySelector('.acm-user-name');
            if (nameElement) {
                nameElement.textContent = user.name || 'اسم المستخدم';
            }
        }
    },
    
    /**
     * Update security tips
     */
    updateSecurityTips: function() {
        const securityTips = document.querySelectorAll('.acm-tip-card');
        securityTips.forEach((tip, index) => {
            tip.style.animationDelay = `${index * 0.1}s`;
            tip.classList.add('acm-fade-in');
        });
    },
    
    /**
     * Add animations to account management elements
     */
    addAnimations: function() {
        const accountPage = document.getElementById('account-management');
        if (!accountPage) return;
        
        // Add fade-in animation to intro card
        const introCard = accountPage.querySelector('.acm-intro-card');
        if (introCard) {
            introCard.classList.add('acm-fade-in');
        }
        
        // Add slide-in animation to topics
        const topics = accountPage.querySelectorAll('.acm-topic-item');
        topics.forEach((topic, index) => {
            topic.style.animationDelay = `${index * 0.05}s`;
            topic.classList.add('acm-slide-in');
        });
        
        // Add fade-in animation to tasks
        const tasks = accountPage.querySelectorAll('.acm-task-item');
        tasks.forEach((task, index) => {
            task.style.animationDelay = `${index * 0.1}s`;
            task.classList.add('acm-fade-in');
        });
        
        // Add slide-in animation to security tips
        const securityTips = accountPage.querySelectorAll('.acm-tip-card');
        securityTips.forEach((tip, index) => {
            tip.style.animationDelay = `${index * 0.05}s`;
            tip.classList.add('acm-slide-in');
        });
        
        // Add fade-in animation to support cards
        const supportCards = accountPage.querySelectorAll('.acm-support-card');
        supportCards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
            card.classList.add('acm-fade-in');
        });
    },
    
    /**
     * Export account data
     */
    exportAccountData: function() {
        Toast.show('تصدير البيانات', 'جاري تصدير بيانات الحساب...', 'info');
        
        setTimeout(() => {
            const link = document.createElement('a');
            link.href = '#';
            link.download = 'account-data.json';
            link.click();
            Toast.show('تصدير البيانات', 'تم تصدير البيانات بنجاح', 'success');
        }, 2000);
    },
    
    /**
     * Update designer notes
     */
    updateDesignerNotes: function() {
        const notes = "صفحة إدارة الحساب تعرض دليل شامل لإدارة الحساب الشخصي، بما في ذلك تحديث المعلومات والإعدادات والأمان. تتضمن نصائح أمان وحلول للمشاكل الشائعة وطرق التواصل مع الدعم.";
        const notesContent = document.getElementById('designer-notes-content');
        if (notesContent) {
            notesContent.innerHTML = `<p>${notes}</p>`;
        }
    }
};

// Explicitly attach to global scope
window.AccountManagementController = AccountManagementController; 
