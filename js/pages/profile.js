/**
 * Profile page controller - Personal Focused Version
 */
const ProfileController = {
    /**
     * Initialize the profile page
     */
    init: function() {
        console.log('Profile page initialized');
        this.loadUserData();
        this.renderProfile();
        this.setupEventListeners();
        this.initializeAnimations();
    },
    
    /**
     * Load personal user data
     */
    loadUserData: function() {
        const userData = {
            name: 'أحمد محمد علي',
            email: 'ahmed.mohamed@logistics.com',
            phone: '+966 50 123 4567',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
            status: 'active',
            address: 'شارع الملك فهد، حي النزهة',
            city: 'الرياض',
            accountType: 'مزود خدمة لوجستي',
            memberSince: '8',
            company: 'شركة النقل السريع',
            position: 'مدير العمليات',
            rating: 4.8,
            verificationStatus: 'متحقق',
            subscriptionPlan: 'الخطة المميزة',
            subscriptionExpiry: '15 ديسمبر 2024',
            lastActive: 'منذ 5 دقائق',
            // Personal settings
            notifications: 'مفعلة',
            language: 'العربية',
            theme: 'فاتح',
            twoFactorAuth: 'مفعل',
            // Service counts (personal context)
            warehouses: 4,
            shippingServices: 12,
            customsServices: 8,
            packagingServices: 3
        };
        
        State.set('user', userData);
        
        // Set personal activity data
        State.set('personalActivities', [
            {
                id: 1,
                title: 'تم تحديث الصورة الشخصية',
                subtitle: 'منذ 15 دقيقة',
                type: 'profile',
                status: 'completed'
            },
            {
                id: 2,
                title: 'تم تغيير كلمة المرور',
                subtitle: 'منذ يوم',
                type: 'security',
                status: 'completed'
            },
            {
                id: 3,
                title: 'تم تفعيل المصادقة الثنائية',
                subtitle: 'منذ 3 أيام',
                type: 'security',
                status: 'completed'
            },
            {
                id: 4,
                title: 'تم تحديث معلومات الاتصال',
                subtitle: 'منذ أسبوع',
                type: 'profile',
                status: 'completed'
            },
            {
                id: 5,
                title: 'تم تغيير اللغة إلى العربية',
                subtitle: 'منذ أسبوعين',
                type: 'settings',
                status: 'completed'
            }
        ]);
    },
    
    /**
     * Render profile data with enhanced UI
     */
    renderProfile: function() {
        const user = State.get('user');
        if (!user) return;
        
        // Update profile info with animation
        this.updateProfileInfo(user);
        this.updateProfileStats(user);
        this.updateProfileDetails(user);
        this.updateAccountSettings(user);
        this.updateServiceStats(user);
        this.updatePersonalActivity();
        this.updateProfileStatus(user);
    },
    
    /**
     * Update profile information with smooth animations
     */
    updateProfileInfo: function(user) {
        const profileName = document.querySelector('.profile-name');
        const profileEmail = document.querySelector('.profile-email');
        const profilePhone = document.querySelector('.profile-phone');
        const profileAvatar = document.querySelector('.profile-avatar');
        
        if (profileName) {
            profileName.style.opacity = '0';
            setTimeout(() => {
                profileName.textContent = user.name;
                profileName.style.opacity = '1';
            }, 200);
        }
        
        if (profileEmail) {
            profileEmail.style.opacity = '0';
            setTimeout(() => {
                profileEmail.textContent = user.email;
                profileEmail.style.opacity = '1';
            }, 300);
        }
        
        if (profilePhone) {
            profilePhone.style.opacity = '0';
            setTimeout(() => {
                profilePhone.textContent = user.phone;
                profilePhone.style.opacity = '1';
            }, 400);
        }
        
        if (profileAvatar && user.avatar) {
            profileAvatar.style.opacity = '0';
            setTimeout(() => {
                profileAvatar.src = user.avatar;
                profileAvatar.alt = `صورة ${user.name}`;
                profileAvatar.style.opacity = '1';
            }, 100);
        }
    },
    
    /**
     * Update profile status with enhanced styling
     */
    updateProfileStatus: function(user) {
        const profileStatus = document.querySelector('.profile-status span');
        if (profileStatus) {
            profileStatus.textContent = this.getStatusText(user.status);
            
            // Add status-specific styling
            const statusContainer = document.querySelector('.profile-status');
            if (statusContainer) {
                statusContainer.className = `profile-status ${user.status}`;
            }
        }
    },
    
    /**
     * Update profile statistics with personal data
     */
    updateProfileStats: function(user) {
        const statCards = document.querySelectorAll('.profile-stat-card');
        if (statCards.length >= 3) {
            // Member since stat
            const memberValue = statCards[0].querySelector('.profile-stat-value');
            if (memberValue) {
                memberValue.textContent = user.memberSince;
            }
            
            // Rating stat
            const ratingValue = statCards[1].querySelector('.profile-stat-value');
            if (ratingValue) {
                this.animateNumber(ratingValue, 0, user.rating, 1000, 1);
            }
            
            // Verification status stat
            const verificationValue = statCards[2].querySelector('.profile-stat-value');
            if (verificationValue) {
                verificationValue.textContent = user.verificationStatus;
            }
        }
    },
    
    /**
     * Update profile details with comprehensive personal information
     */
    updateProfileDetails: function(user) {
        const detailItems = document.querySelectorAll('.profile-detail-item');
        
        const details = [
            { label: 'الاسم الكامل', value: user.name },
            { label: 'البريد الإلكتروني', value: user.email },
            { label: 'رقم الهاتف', value: user.phone },
            { label: 'الشركة', value: user.company },
            { label: 'المنصب', value: user.position },
            { label: 'العنوان', value: user.address },
            { label: 'المدينة', value: user.city },
            { label: 'نوع الحساب', value: user.accountType },
            { label: 'حالة التحقق', value: user.verificationStatus },
            { label: 'خطة الاشتراك', value: user.subscriptionPlan },
            { label: 'تاريخ انتهاء الاشتراك', value: user.subscriptionExpiry },
            { label: 'آخر نشاط', value: user.lastActive }
        ];
        
        detailItems.forEach((item, index) => {
            if (index < details.length) {
                const label = item.querySelector('.profile-detail-label');
                const value = item.querySelector('.profile-detail-value');
                
                if (label && value) {
                    label.textContent = details[index].label + ':';
                    value.textContent = details[index].value;
                    
                    // Add animation
                    item.style.opacity = '0';
                    item.style.transform = 'translateX(20px)';
                    setTimeout(() => {
                        item.style.transition = 'all 0.3s ease';
                        item.style.opacity = '1';
                        item.style.transform = 'translateX(0)';
                    }, index * 100);
                }
            }
        });
    },
    
    /**
     * Update account settings with personal preferences
     */
    updateAccountSettings: function(user) {
        const activityItems = document.querySelectorAll('.profile-activity-item');
        
        const settings = [
            { icon: 'fas fa-bell', value: user.notifications, label: 'الإشعارات' },
            { icon: 'fas fa-language', value: user.language, label: 'اللغة' },
            { icon: 'fas fa-moon', value: user.theme, label: 'المظهر' },
            { icon: 'fas fa-lock', value: user.twoFactorAuth, label: 'المصادقة الثنائية' }
        ];
        
        activityItems.forEach((item, index) => {
            if (index < settings.length) {
                const icon = item.querySelector('.profile-activity-icon i');
                const value = item.querySelector('.profile-activity-value');
                const label = item.querySelector('.profile-activity-label');
                
                if (icon) icon.className = settings[index].icon;
                if (value) value.textContent = settings[index].value;
                if (label) label.textContent = settings[index].label;
                
                // Add animation
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    item.style.transition = 'all 0.3s ease';
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, index * 150);
            }
        });
    },
    
    /**
     * Update service statistics (personal context)
     */
    updateServiceStats: function(user) {
        const performanceItems = document.querySelectorAll('.profile-performance-item');
        
        const services = [
            { icon: 'fas fa-warehouse', value: user.warehouses, label: 'مستودعات' },
            { icon: 'fas fa-truck', value: user.shippingServices, label: 'خدمات شحن' },
            { icon: 'fas fa-clipboard-check', value: user.customsServices, label: 'خدمات تخليص' },
            { icon: 'fas fa-box', value: user.packagingServices, label: 'خدمات تغليف' }
        ];
        
        performanceItems.forEach((item, index) => {
            if (index < services.length) {
                const icon = item.querySelector('.profile-performance-icon i');
                const value = item.querySelector('.profile-performance-value');
                const label = item.querySelector('.profile-performance-label');
                
                if (icon) icon.className = services[index].icon;
                if (value) {
                    this.animateNumber(value, 0, services[index].value, 800);
                }
                if (label) label.textContent = services[index].label;
                
                // Add animation
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    item.style.transition = 'all 0.3s ease';
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, index * 150);
            }
        });
    },
    
    /**
     * Update personal activity with dynamic content
     */
    updatePersonalActivity: function() {
        const activities = State.get('personalActivities') || [];
        const activityList = document.querySelector('.profile-activity-list');
        
        if (activityList) {
            activityList.innerHTML = activities.map((activity, index) => `
                <div class="profile-activity-item-card" style="opacity: 0; transform: translateX(20px);">
                    <div class="profile-activity-item-content">
                        <div class="profile-activity-item-title">${activity.title}</div>
                        <div class="profile-activity-item-subtitle">${activity.subtitle}</div>
                    </div>
                </div>
            `).join('');
            
            // Animate items in
            const cards = activityList.querySelectorAll('.profile-activity-item-card');
            cards.forEach((card, index) => {
                setTimeout(() => {
                    card.style.transition = 'all 0.3s ease';
                    card.style.opacity = '1';
                    card.style.transform = 'translateX(0)';
                }, index * 200);
            });
        }
    },
    
    /**
     * Animate number counting
     */
    animateNumber: function(element, start, end, duration, decimals = 0) {
        const startTime = performance.now();
        const difference = end - start;
        
        function updateNumber(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const current = start + (difference * progress);
            element.textContent = decimals > 0 ? current.toFixed(decimals) : Math.floor(current);
            
            if (progress < 1) {
                requestAnimationFrame(updateNumber);
            }
        }
        
        requestAnimationFrame(updateNumber);
    },
    
    /**
     * Initialize smooth animations
     */
    initializeAnimations: function() {
        // Add intersection observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        // Observe all cards and sections
        document.querySelectorAll('.profile-stat-card, .profile-detail-item, .profile-activity-item, .profile-performance-item').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'all 0.3s ease';
            observer.observe(el);
        });
    },
    
    /**
     * Get status text in Arabic with enhanced styling
     */
    getStatusText: function(status) {
        const statusMap = {
            'active': 'نشط',
            'inactive': 'غير نشط',
            'suspended': 'معلق',
            'pending': 'قيد المراجعة',
            'verified': 'متحقق',
            'premium': 'مميز'
        };
        return statusMap[status] || status;
    },
    
    /**
     * Set up enhanced event listeners
     */
    setupEventListeners: function() {
        const page = document.getElementById('profile');
        if (!page) return;
        
        // Handle edit profile button with enhanced feedback
        const editProfileBtn = page.querySelector('[data-action="edit-profile"]');
        if (editProfileBtn) {
            editProfileBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.addButtonFeedback(editProfileBtn);
                setTimeout(() => this.showEditProfileModal(), 150);
            });
        }
        
        // Handle edit avatar with file upload
        page.addEventListener('click', (e) => {
            const editAvatarBtn = e.target.closest('[data-action="edit-avatar"]');
            if (editAvatarBtn) {
                e.preventDefault();
                this.addButtonFeedback(editAvatarBtn);
                setTimeout(() => this.editAvatar(), 150);
            }
        });
        
        // Handle settings button
        const settingsBtn = page.querySelector('[data-action="settings"]');
        if (settingsBtn) {
            settingsBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.addButtonFeedback(settingsBtn);
                setTimeout(() => Router.navigate('settings'), 150);
            });
        }
        
        // Handle logout button with confirmation
        const logoutBtn = page.querySelector('[data-action="logout"]');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.addButtonFeedback(logoutBtn);
                setTimeout(() => this.logout(), 150);
            });
        }
        
        // Handle close drawer button
        const closeDrawerBtn = page.querySelector('[data-action="close-drawer"]');
        if (closeDrawerBtn) {
            closeDrawerBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.addButtonFeedback(closeDrawerBtn);
                setTimeout(() => {
                    if (window.closeProfileDrawer) {
                        window.closeProfileDrawer();
                    }
                }, 150);
            });
        }
        
        // Add hover effects for interactive elements
        this.addHoverEffects();
    },
    
    /**
     * Add button feedback animation
     */
    addButtonFeedback: function(button) {
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = 'scale(1)';
        }, 150);
    },
    
    /**
     * Add hover effects for better UX
     */
    addHoverEffects: function() {
        // Add ripple effect to buttons
        document.querySelectorAll('.profile-btn, .profile-header-action').forEach(btn => {
            btn.addEventListener('mouseenter', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                btn.style.setProperty('--ripple-x', x + 'px');
                btn.style.setProperty('--ripple-y', y + 'px');
            });
        });
    },
    
    /**
     * Show enhanced edit profile modal
     */
    showEditProfileModal: function() {
        const user = State.get('user');
        
        const modalContent = `
            <div class="modal-header">
                <h3>تعديل الملف الشخصي</h3>
                <button class="modal-close" data-action="close-modal">&times;</button>
            </div>
            <div class="modal-body">
                <form class="profile-form" id="editProfileForm">
                    <div class="profile-form-group">
                        <label for="editName" class="profile-form-label">الاسم الكامل</label>
                        <input type="text" id="editName" name="name" class="profile-form-control" value="${user.name}" required>
                    </div>
                    <div class="profile-form-group">
                        <label for="editEmail" class="profile-form-label">البريد الإلكتروني</label>
                        <input type="email" id="editEmail" name="email" class="profile-form-control" value="${user.email}" required>
                    </div>
                    <div class="profile-form-group">
                        <label for="editPhone" class="profile-form-label">رقم الهاتف</label>
                        <input type="tel" id="editPhone" name="phone" class="profile-form-control" value="${user.phone}" required>
                    </div>
                    <div class="profile-form-group">
                        <label for="editCompany" class="profile-form-label">الشركة</label>
                        <input type="text" id="editCompany" name="company" class="profile-form-control" value="${user.company}" required>
                    </div>
                    <div class="profile-form-group">
                        <label for="editPosition" class="profile-form-label">المنصب</label>
                        <input type="text" id="editPosition" name="position" class="profile-form-control" value="${user.position}" required>
                    </div>
                    <div class="profile-form-group">
                        <label for="editAddress" class="profile-form-label">العنوان</label>
                        <textarea id="editAddress" name="address" class="profile-form-control" rows="3" required>${user.address}</textarea>
                    </div>
                    <div class="profile-form-group">
                        <label for="editCity" class="profile-form-label">المدينة</label>
                        <input type="text" id="editCity" name="city" class="profile-form-control" value="${user.city}" required>
                    </div>
                    
                    <div class="profile-form-actions">
                        <button type="button" class="profile-btn profile-btn-outline" data-action="close-modal">إلغاء</button>
                        <button type="submit" class="profile-btn profile-btn-primary">حفظ التغييرات</button>
                    </div>
                </form>
            </div>
        `;
        
        Modal.show('edit-profile-modal', modalContent);
        
        // Handle form submission with enhanced validation
        const form = document.getElementById('editProfileForm');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.updateProfile(form);
            });
        }
    },
    
    /**
     * Update profile information with enhanced feedback
     */
    updateProfile: function(form) {
        const formData = new FormData(form);
        const updatedUser = {
            ...State.get('user'),
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            company: formData.get('company'),
            position: formData.get('position'),
            address: formData.get('address'),
            city: formData.get('city')
        };
        
        State.set('user', updatedUser);
        this.renderProfile();
        Modal.close();
        
        Toast.show('تم التحديث', 'تم تحديث الملف الشخصي بنجاح', 'success');
        
        // Add to personal activities
        const activities = State.get('personalActivities') || [];
        activities.unshift({
            id: Date.now(),
            title: 'تم تحديث معلومات الملف الشخصي',
            subtitle: 'الآن',
            type: 'profile',
            status: 'completed'
        });
        State.set('personalActivities', activities.slice(0, 5)); // Keep only 5 recent activities
    },
    
    /**
     * Enhanced avatar upload with preview
     */
    editAvatar: function() {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*';
        fileInput.style.display = 'none';
        
        fileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                this.uploadAvatar(file);
            }
        });
        
        document.body.appendChild(fileInput);
        fileInput.click();
        document.body.removeChild(fileInput);
    },
    
    /**
     * Upload avatar with enhanced feedback
     */
    uploadAvatar: function(file) {
        // Show loading state
        const avatar = document.querySelector('.profile-avatar');
        if (avatar) {
            avatar.style.opacity = '0.5';
        }
        
        Toast.show('جاري التحميل', 'جاري تحميل الصورة...', 'info');
        
        // Simulate upload process
        setTimeout(() => {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (avatar) {
                    avatar.src = e.target.result;
                    avatar.style.opacity = '1';
                }
                
                Toast.show('تم التحديث', 'تم تحديث الصورة الشخصية بنجاح', 'success');
                
                // Add to personal activities
                const activities = State.get('personalActivities') || [];
                activities.unshift({
                    id: Date.now(),
                    title: 'تم تحديث الصورة الشخصية',
                    subtitle: 'الآن',
                    type: 'profile',
                    status: 'completed'
                });
                State.set('personalActivities', activities.slice(0, 5));
            };
            reader.readAsDataURL(file);
        }, 1500);
    },
    
    /**
     * Enhanced logout with better UX
     */
    logout: function() {
        const confirmMessage = 'هل أنت متأكد من تسجيل الخروج؟ سيتم إغلاق جميع الجلسات النشطة.';
        
        if (confirm(confirmMessage)) {
            Toast.show('جاري تسجيل الخروج', 'جاري إغلاق الجلسة...', 'info');
            
            setTimeout(() => {
            // Clear user data
            State.set('user', null);
            State.set('isAuthenticated', false);
                State.set('personalActivities', []);
            
            // Navigate to login
            Router.navigate('login');
            Toast.show('تم تسجيل الخروج', 'تم تسجيل الخروج بنجاح', 'success');
            }, 1000);
        }
    }
};

// Explicitly attach to global scope
window.ProfileController = ProfileController; 