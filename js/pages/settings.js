/**
 * Settings page controller - Modern Mobile-First Design with Enhanced UX
 */
const SettingsController = {
    /**
     * Initialize the settings page
     */
    init: function() {
        console.log('SettingsController initialized');
        this.populateSettingsData();
        this.setupEventListeners();
        this.addAnimations();
        this.setupQuickActions();
    },
    
    /**
     * Populate settings-specific data (avoiding profile duplicates)
     */
    populateSettingsData: function() {
        const settingsPage = document.getElementById('settings');
        if (!settingsPage) return;
        
        // Get business data from state or use default values
        const businessData = State.get('businessData') || {};
        
        // Only populate business-specific data, not profile duplicates
        const crNumber = settingsPage.querySelector('#stg-cr-number');
        const address = settingsPage.querySelector('#stg-address');
        
        // Set business-specific data
        if (crNumber) crNumber.textContent = businessData.crNumber || '4030000001';
        if (address) address.textContent = businessData.address || 'شارع الملك فهد، حي النزهة، الرياض';
        
        // Set toggle states
        this.updateToggleStates();
        
        // Set language and timezone
        this.updateLanguageAndTimezone();
    },
    
    /**
     * Update toggle switch states
     */
    updateToggleStates: function() {
        const settingsPage = document.getElementById('settings');
        if (!settingsPage) return;
        
        const user = State.get('user') || {};
        
        const toggles = {
            'stg-notifications': user.notifications || false,
            'stg-dark-mode': user.darkMode || false,
            'stg-2fa': user.twoFactorAuth || true,
            'stg-biometric': user.biometric || false,
            'stg-data-sharing': user.dataSharing || false
        };
        
        Object.entries(toggles).forEach(([id, value]) => {
            const toggle = settingsPage.querySelector(`#${id}`);
            if (toggle) {
                toggle.checked = value;
            }
        });
    },
    
    /**
     * Update language and timezone dropdowns
     */
    updateLanguageAndTimezone: function() {
        const settingsPage = document.getElementById('settings');
        if (!settingsPage) return;
        
        const user = State.get('user') || {};
        
        // Set language
        const languageSelect = settingsPage.querySelector('#stg-language');
        if (languageSelect) {
            Array.from(languageSelect.options).forEach(option => {
                if (option.value === (user.language || 'ar')) {
                    option.selected = true;
                }
            });
        }
        
        // Set timezone
        const timezoneSelect = settingsPage.querySelector('#stg-timezone');
        if (timezoneSelect) {
            Array.from(timezoneSelect.options).forEach(option => {
                if (option.value === (user.timezone || 'Asia/Riyadh')) {
                    option.selected = true;
                }
            });
        }
    },
    
    /**
     * Set up page-specific event listeners
     */
    setupEventListeners: function() {
        const settingsPage = document.getElementById('settings');
        if (!settingsPage) return;
        
        // Toggle switches
        const toggles = settingsPage.querySelectorAll('.stg-toggle-input');
        toggles.forEach(toggle => {
            toggle.addEventListener('change', this.handleToggleChange.bind(this));
        });
        
        // Language and timezone changes
        const languageSelect = settingsPage.querySelector('#stg-language');
        if (languageSelect) {
            languageSelect.addEventListener('change', this.handleLanguageChange.bind(this));
        }
        
        const timezoneSelect = settingsPage.querySelector('#stg-timezone');
        if (timezoneSelect) {
            timezoneSelect.addEventListener('change', this.handleTimezoneChange.bind(this));
        }
        
        // Action buttons
        const actionButtons = settingsPage.querySelectorAll('[data-action]');
        actionButtons.forEach(button => {
            button.addEventListener('click', this.handleActionClick.bind(this));
        });
        
        // Form controls
        const formControls = settingsPage.querySelectorAll('.stg-form-control');
        formControls.forEach(control => {
            control.addEventListener('change', this.handleFormControlChange.bind(this));
        });
    },
    
    /**
     * Handle toggle switch changes
     */
    handleToggleChange: function(e) {
        const setting = e.target.id;
        const value = e.target.checked;
        
        // Update state
        State.update(`user.${setting.replace('stg-', '')}`, value);
        
        // Show feedback
        const settingNames = {
            'stg-notifications': 'الإشعارات',
            'stg-dark-mode': 'الوضع المظلم',
            'stg-2fa': 'المصادقة الثنائية',
            'stg-biometric': 'تسجيل الدخول الآمن',
            'stg-data-sharing': 'مشاركة البيانات'
        };
        
        const status = value ? 'تم تفعيل' : 'تم إلغاء تفعيل';
        Toast.show('تحديث الإعدادات', `${status} ${settingNames[setting]}`, 'success');
        
        // Special handling for dark mode
        if (setting === 'stg-dark-mode') {
            this.toggleDarkMode(value);
        }
    },
    
    /**
     * Handle language change
     */
    handleLanguageChange: function(e) {
        const language = e.target.value;
        State.update('user.language', language);
        
        const languageNames = {
            'ar': 'العربية',
            'en': 'English',
            'es': 'Español',
            'fr': 'Français'
        };
        
        Toast.show('تغيير اللغة', `تم تعيين اللغة إلى ${languageNames[language]}`, 'info');
        
        // In a real app, would reload the page or update all text
        setTimeout(() => {
            Toast.show('تطبيق التغييرات', 'سيتم تطبيق التغييرات بعد إعادة تحميل الصفحة', 'info');
        }, 1000);
    },
    
    /**
     * Handle timezone change
     */
    handleTimezoneChange: function(e) {
        const timezone = e.target.value;
        State.update('user.timezone', timezone);
        
        const timezoneNames = {
            'Asia/Riyadh': 'توقيت الرياض',
            'Asia/Dubai': 'توقيت دبي',
            'Asia/Kuwait': 'توقيت الكويت'
        };
        
        Toast.show('تغيير المنطقة الزمنية', `تم تعيين المنطقة الزمنية إلى ${timezoneNames[timezone]}`, 'success');
    },
    
    /**
     * Handle action button clicks
     */
    handleActionClick: function(e) {
        const action = e.currentTarget.dataset.action;
        
        switch (action) {
            case 'edit-profile':
                this.editProfile();
                break;
            case 'security-settings':
                this.openSecuritySettings();
                break;
            case 'notification-center':
                this.openNotificationCenter();
                break;
            case 'edit-cr':
                this.editField('crNumber', 'رقم السجل التجاري');
                break;
            case 'edit-address':
                this.editField('address', 'العنوان');
                break;
            case 'change-password':
                this.changePassword();
                break;
            case 'manage-services':
                this.manageServices();
                break;
            case 'check-updates':
                this.checkUpdates();
                break;
            case 'view-terms':
                this.viewTerms();
                break;
            case 'view-privacy':
                this.viewPrivacy();
                break;
            case 'view-cookies':
                this.viewCookies();
                break;
            case 'help-center':
                this.openHelpCenter();
                break;
            case 'contact-support':
                this.contactSupport();
                break;
            case 'rate-app':
                this.rateApp();
                break;
            case 'logout':
                this.logout();
                break;
            case 'delete-account':
                this.deleteAccount();
                break;
            case 'refresh-settings':
                this.refreshSettings();
                break;
        }
    },
    
    /**
     * Handle form control changes
     */
    handleFormControlChange: function(e) {
        const control = e.target;
        const value = control.value;
        
        Toast.show('تم التحديث', 'تم حفظ التغييرات بنجاح', 'success');
    },
    
    /**
     * Setup quick actions
     */
    setupQuickActions: function() {
        const quickActions = document.querySelectorAll('.stg-quick-action');
        quickActions.forEach(action => {
            action.addEventListener('click', (e) => {
                const actionType = e.currentTarget.dataset.action;
                this.handleQuickAction(actionType);
            });
        });
    },
    
    /**
     * Handle quick actions
     */
    handleQuickAction: function(action) {
        switch (action) {
            case 'edit-profile':
                this.editProfile();
                break;
            case 'security-settings':
                this.openSecuritySettings();
                break;
            case 'notification-center':
                this.openNotificationCenter();
                break;
        }
    },
    
    /**
     * Add animations to settings sections
     */
    addAnimations: function() {
        const settingsPage = document.getElementById('settings');
        if (!settingsPage) return;
        
        // Add fade-in animation to sections
        const sections = settingsPage.querySelectorAll('.stg-settings-section');
        sections.forEach((section, index) => {
            section.style.animationDelay = `${index * 0.1}s`;
            section.classList.add('stg-fade-in');
        });
        
        // Add scale-in animation to quick actions
        const quickActions = settingsPage.querySelectorAll('.stg-quick-action');
        quickActions.forEach((action, index) => {
            action.style.animationDelay = `${index * 0.05}s`;
            action.classList.add('stg-scale-in');
        });
    },
    
    /**
     * Toggle dark mode
     */
    toggleDarkMode: function(enabled) {
        if (enabled) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    },
    
    /**
     * Edit profile - Navigate to profile page
     */
    editProfile: function() {
        Router.navigate('profile');
    },
    
    /**
     * Open security settings
     */
    openSecuritySettings: function() {
        Toast.show('إعدادات الأمان', 'سيتم فتح صفحة إعدادات الأمان قريباً', 'info');
    },
    
    /**
     * Open notification center
     */
    openNotificationCenter: function() {
        Router.navigate('notifications');
    },
    
    /**
     * Edit field
     */
    editField: function(field, label) {
        Toast.show(`تعديل ${label}`, 'سيتم فتح نموذج التعديل قريباً', 'info');
    },
    
    /**
     * Change password
     */
    changePassword: function() {
        Toast.show('تغيير كلمة المرور', 'سيتم فتح نموذج تغيير كلمة المرور قريباً', 'info');
    },
    
    /**
     * Manage services
     */
    manageServices: function() {
        Toast.show('إدارة الخدمات', 'سيتم فتح صفحة إدارة الخدمات قريباً', 'info');
    },
    
    /**
     * Check updates
     */
    checkUpdates: function() {
        Toast.show('فحص التحديثات', 'جاري فحص التحديثات المتاحة...', 'info');
        setTimeout(() => {
            Toast.show('التحديثات', 'التطبيق محدث إلى أحدث إصدار', 'success');
        }, 2000);
    },
    
    /**
     * View terms
     */
    viewTerms: function() {
        Toast.show('شروط الخدمة', 'سيتم فتح صفحة شروط الخدمة قريباً', 'info');
    },
    
    /**
     * View privacy
     */
    viewPrivacy: function() {
        Toast.show('سياسة الخصوصية', 'سيتم فتح صفحة سياسة الخصوصية قريباً', 'info');
    },
    
    /**
     * View cookies
     */
    viewCookies: function() {
        Toast.show('ملفات تعريف الارتباط', 'سيتم فتح صفحة سياسة ملفات تعريف الارتباط قريباً', 'info');
    },
    
    /**
     * Open help center
     */
    openHelpCenter: function() {
        Toast.show('مركز المساعدة', 'سيتم فتح مركز المساعدة قريباً', 'info');
    },
    
    /**
     * Contact support
     */
    contactSupport: function() {
        Toast.show('الدعم الفني', 'سيتم فتح صفحة التواصل مع الدعم قريباً', 'info');
    },
    
    /**
     * Rate app
     */
    rateApp: function() {
        Toast.show('تقييم التطبيق', 'سيتم فتح صفحة التقييم قريباً', 'info');
    },
    
    /**
     * Logout
     */
    logout: function() {
        if (confirm('هل أنت متأكد من تسجيل الخروج؟')) {
            Toast.show('جاري تسجيل الخروج', 'جاري إغلاق الجلسة...', 'info');
            
            setTimeout(() => {
                // Clear user data
                State.update('user', null);
                State.update('isAuthenticated', false);
                
                // Navigate to login
                Router.navigate('login');
                Toast.show('تم تسجيل الخروج', 'تم تسجيل الخروج بنجاح', 'success');
            }, 1000);
        }
    },
    
    /**
     * Delete account
     */
    deleteAccount: function() {
        if (confirm('هل أنت متأكد من حذف الحساب؟ هذا الإجراء لا يمكن التراجع عنه.')) {
            Toast.show('حذف الحساب', 'سيتم حذف الحساب قريباً', 'warning');
        }
    },
    
    /**
     * Refresh settings
     */
    refreshSettings: function() {
        const refreshBtn = document.querySelector('[data-action="refresh-settings"]');
        if (refreshBtn) {
            refreshBtn.classList.add('stg-loading');
            setTimeout(() => {
                this.populateSettingsData();
                refreshBtn.classList.remove('stg-loading');
                Toast.show('تحديث الإعدادات', 'تم تحديث الإعدادات بنجاح', 'success');
            }, 1000);
        }
    }
};

// Explicitly attach to global scope
window.SettingsController = SettingsController;