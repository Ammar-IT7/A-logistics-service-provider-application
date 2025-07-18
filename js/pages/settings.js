/**
 * Settings page controller - Updated for prefixed CSS classes and Arabic text
 */
const SettingsController = {
    /**
     * Initialize the settings page
     */
    init: function() {
        console.log('SettingsController initialized');
        this.updateSettingsUI();
        this.setupEventListeners();
        this.addAnimations();
    },
    
    /**
     * Update settings UI elements based on state
     */
    updateSettingsUI: function() {
        const settingsPage = document.getElementById('settings');
        if (!settingsPage) return;
        
        const user = State.get('user');
        
        // Update form elements with prefixed classes
        const notificationsCheckbox = settingsPage.querySelector('#notifications');
        const darkModeCheckbox = settingsPage.querySelector('#darkMode');
        const languageSelect = settingsPage.querySelector('.stg-form-control');
        
        if (notificationsCheckbox) notificationsCheckbox.checked = user.notifications || false;
        if (darkModeCheckbox) darkModeCheckbox.checked = user.darkMode || false;
        
        if (languageSelect) {
            Array.from(languageSelect.options).forEach(option => {
                if (option.value === (user.language || 'Arabic')) {
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
        if (settingsPage) {
            // Handle language selection change
            const languageSelect = settingsPage.querySelector('.stg-form-control');
            if (languageSelect) {
                languageSelect.addEventListener('change', function(e) {
                    State.update('user.language', e.target.value);
                    const languageNames = {
                        'Arabic': 'العربية',
                        'English': 'English',
                        'Spanish': 'Español',
                        'French': 'Français'
                    };
                    Toast.show('اللغة', `تم تعيين اللغة إلى ${languageNames[e.target.value]}`, 'info');
                });
            }
            
            // Handle logout
            const logoutButton = settingsPage.querySelector('.stg-btn-accent');
            if (logoutButton) {
                logoutButton.addEventListener('click', function() {
                    Toast.show('تسجيل الخروج', 'تم تسجيل خروجك بنجاح', 'info');
                    // In a real app, would clear state and redirect to login
                });
            }
            
            // Handle checkbox changes
            const checkboxes = settingsPage.querySelectorAll('.stg-form-check-input');
            checkboxes.forEach(checkbox => {
                checkbox.addEventListener('change', function(e) {
                    const setting = e.target.id;
                    const value = e.target.checked;
                    State.update(`user.${setting}`, value);
                    
                    const settingNames = {
                        'notifications': 'الإشعارات',
                        'darkMode': 'الوضع المظلم'
                    };
                    
                    const status = value ? 'تم تفعيل' : 'تم إلغاء تفعيل';
                    Toast.show('تحديث الإعدادات', `${status} ${settingNames[setting]}`, 'success');
                });
            });
            
            // Handle outline button clicks
            const outlineButtons = settingsPage.querySelectorAll('.stg-btn-outline');
            outlineButtons.forEach(button => {
                button.addEventListener('click', function(e) {
                    const action = e.target.textContent.trim();
                    const actionMessages = {
                        'عرض': 'جاري فتح الصفحة...',
                        'View': 'Opening page...'
                    };
                    Toast.show('إجراء', actionMessages[action] || `${action} button clicked`, 'info');
                });
            });
        }
    },
    
    /**
     * Add animations to settings sections
     */
    addAnimations: function() {
        const settingsPage = document.getElementById('settings');
        if (!settingsPage) return;
        
        const sections = settingsPage.querySelectorAll('.stg-settings-section');
        sections.forEach((section, index) => {
            section.style.animationDelay = `${index * 0.1}s`;
            section.classList.add('stg-fade-in');
        });
    },
    
    /**
     * Toggle dark mode
     */
    toggleDarkMode: function() {
        const darkModeCheckbox = document.querySelector('#darkMode');
        if (darkModeCheckbox) {
            darkModeCheckbox.checked = !darkModeCheckbox.checked;
            State.update('user.darkMode', darkModeCheckbox.checked);
            const status = darkModeCheckbox.checked ? 'تم تفعيل' : 'تم إلغاء تفعيل';
            Toast.show('الوضع المظلم', `${status} الوضع المظلم`, 'success');
        }
    },
    
    /**
     * Toggle notifications
     */
    toggleNotifications: function() {
        const notificationsCheckbox = document.querySelector('#notifications');
        if (notificationsCheckbox) {
            notificationsCheckbox.checked = !notificationsCheckbox.checked;
            State.update('user.notifications', notificationsCheckbox.checked);
            const status = notificationsCheckbox.checked ? 'تم تفعيل' : 'تم إلغاء تفعيل';
            Toast.show('الإشعارات', `${status} الإشعارات`, 'success');
        }
    }
};

// Explicitly attach to global scope
window.SettingsController = SettingsController;