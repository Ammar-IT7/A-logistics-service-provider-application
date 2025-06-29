/**
 * Profile page controller
 */
const ProfileController = {
    /**
     * Initialize the profile page
     */
    init: function() {
        console.log('Profile page initialized');
        this.renderProfile();
        this.setupEventListeners();
    },
    
    /**
     * Render profile data from state
     */
    renderProfile: function() {
        const user = State.get('user');
        
        // Update profile header
        const profileHeader = document.querySelector('.func-profile-header');
        if (profileHeader) {
            profileHeader.innerHTML = `
                <div class="func-profile-avatar">
                    <img src="${user.avatar}" alt="${user.name}" onerror="this.src='https://via.placeholder.com/120x120/007bff/ffffff?text=${user.name.charAt(0)}'">
                    <button class="func-avatar-edit" data-action="edit-avatar">
                        <i class="fas fa-camera"></i>
                    </button>
                </div>
                <div class="func-profile-info">
                    <h2 class="func-profile-name">${user.name}</h2>
                    <p class="func-profile-email">${user.email}</p>
                    <p class="func-profile-phone">${user.phone}</p>
                    <div class="func-profile-status">
                        <span class="func-status-badge ${user.status}">
                            <i class="fas fa-circle"></i>
                            ${this.getStatusText(user.status)}
                        </span>
                    </div>
                </div>
            `;
        }
        
        // Update profile stats
        const statsContainer = document.querySelector('.func-profile-stats');
        if (statsContainer) {
            const stats = State.get('stats');
            statsContainer.innerHTML = `
                <div class="func-stat-card">
                    <div class="func-stat-icon">
                        <i class="fas fa-shopping-cart"></i>
                    </div>
                    <div class="func-stat-content">
                        <span class="func-stat-value">${stats.totalOrders}</span>
                        <span class="func-stat-label">إجمالي الطلبات</span>
                    </div>
                </div>
                <div class="func-stat-card">
                    <div class="func-stat-icon">
                        <i class="fas fa-star"></i>
                    </div>
                    <div class="func-stat-content">
                        <span class="func-stat-value">${stats.averageRating}</span>
                        <span class="func-stat-label">متوسط التقييم</span>
                    </div>
                </div>
                <div class="func-stat-card">
                    <div class="func-stat-icon">
                        <i class="fas fa-calendar-check"></i>
                    </div>
                    <div class="func-stat-content">
                        <span class="func-stat-value">${user.memberSince}</span>
                        <span class="func-stat-label">عضو منذ</span>
                    </div>
                </div>
            `;
        }
        
        // Update profile details
        const detailsContainer = document.querySelector('.func-profile-details');
        if (detailsContainer) {
            detailsContainer.innerHTML = `
                <div class="func-detail-section">
                    <h3 class="func-section-title">المعلومات الشخصية</h3>
                    <div class="func-detail-grid">
                        <div class="func-detail-item">
                            <span class="func-detail-label">الاسم الكامل:</span>
                            <span class="func-detail-value">${user.name}</span>
                        </div>
                        <div class="func-detail-item">
                            <span class="func-detail-label">البريد الإلكتروني:</span>
                            <span class="func-detail-value">${user.email}</span>
                        </div>
                        <div class="func-detail-item">
                            <span class="func-detail-label">رقم الهاتف:</span>
                            <span class="func-detail-value">${user.phone}</span>
                        </div>
                        <div class="func-detail-item">
                            <span class="func-detail-label">العنوان:</span>
                            <span class="func-detail-value">${user.address}</span>
                        </div>
                        <div class="func-detail-item">
                            <span class="func-detail-label">المدينة:</span>
                            <span class="func-detail-value">${user.city}</span>
                        </div>
                        <div class="func-detail-item">
                            <span class="func-detail-label">نوع الحساب:</span>
                            <span class="func-detail-value">${user.accountType}</span>
                        </div>
                    </div>
                </div>
                
                <div class="func-detail-section">
                    <h3 class="func-section-title">إحصائيات النشاط</h3>
                    <div class="func-activity-stats">
                        <div class="func-activity-item">
                            <div class="func-activity-icon">
                                <i class="fas fa-warehouse"></i>
                            </div>
                            <div class="func-activity-content">
                                <span class="func-activity-value">${State.get('warehouses').length}</span>
                                <span class="func-activity-label">مستودعات</span>
                            </div>
                        </div>
                        <div class="func-activity-item">
                            <div class="func-activity-icon">
                                <i class="fas fa-truck"></i>
                            </div>
                            <div class="func-activity-content">
                                <span class="func-activity-value">${State.get('shippingServices').length}</span>
                                <span class="func-activity-label">خدمات شحن</span>
                            </div>
                        </div>
                        <div class="func-activity-item">
                            <div class="func-activity-icon">
                                <i class="fas fa-clipboard-check"></i>
                            </div>
                            <div class="func-activity-content">
                                <span class="func-activity-value">${State.get('customsServices').length}</span>
                                <span class="func-activity-label">خدمات تخليص</span>
                            </div>
                        </div>
                        <div class="func-activity-item">
                            <div class="func-activity-icon">
                                <i class="fas fa-box"></i>
                            </div>
                            <div class="func-activity-content">
                                <span class="func-activity-value">${State.get('packagingServices').length}</span>
                                <span class="func-activity-label">خدمات تغليف</span>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
    },
    
    /**
     * Get status text in Arabic
     */
    getStatusText: function(status) {
        const statusMap = {
            'active': 'نشط',
            'inactive': 'غير نشط',
            'suspended': 'معلق',
            'pending': 'قيد المراجعة'
        };
        return statusMap[status] || status;
    },
    
    /**
     * Set up event listeners
     */
    setupEventListeners: function() {
        const page = document.getElementById('profile');
        if (!page) return;
        
        // Handle edit profile button
        const editProfileBtn = page.querySelector('[data-action="edit-profile"]');
        if (editProfileBtn) {
            editProfileBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.showEditProfileModal();
            });
        }
        
        // Handle edit avatar button
        page.addEventListener('click', (e) => {
            const editAvatarBtn = e.target.closest('[data-action="edit-avatar"]');
            if (editAvatarBtn) {
                e.preventDefault();
                this.editAvatar();
            }
        });
        
        // Handle settings button
        const settingsBtn = page.querySelector('[data-action="settings"]');
        if (settingsBtn) {
            settingsBtn.addEventListener('click', (e) => {
                e.preventDefault();
                Router.navigate('settings');
            });
        }
        
        // Handle logout button
        const logoutBtn = page.querySelector('[data-action="logout"]');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.logout();
            });
        }
    },
    
    /**
     * Show edit profile modal
     */
    showEditProfileModal: function() {
        const user = State.get('user');
        
        const modalContent = `
            <div class="modal-header">
                <h3>تعديل الملف الشخصي</h3>
                <button class="modal-close" data-action="close-modal">&times;</button>
            </div>
            <div class="modal-body">
                <form class="func-profile-form" id="editProfileForm">
                    <div class="func-form-group">
                        <label for="editName">الاسم الكامل</label>
                        <input type="text" id="editName" name="name" value="${user.name}" required>
                    </div>
                    <div class="func-form-group">
                        <label for="editEmail">البريد الإلكتروني</label>
                        <input type="email" id="editEmail" name="email" value="${user.email}" required>
                    </div>
                    <div class="func-form-group">
                        <label for="editPhone">رقم الهاتف</label>
                        <input type="tel" id="editPhone" name="phone" value="${user.phone}" required>
                    </div>
                    <div class="func-form-group">
                        <label for="editAddress">العنوان</label>
                        <textarea id="editAddress" name="address" rows="3" required>${user.address}</textarea>
                    </div>
                    <div class="func-form-group">
                        <label for="editCity">المدينة</label>
                        <input type="text" id="editCity" name="city" value="${user.city}" required>
                    </div>
                    
                    <div class="func-form-actions">
                        <button type="button" class="func-btn func-btn-outline" data-action="close-modal">إلغاء</button>
                        <button type="submit" class="func-btn func-btn-primary">حفظ التغييرات</button>
                    </div>
                </form>
            </div>
        `;
        
        Modal.show('edit-profile-modal', modalContent);
        
        // Handle form submission
        const form = document.getElementById('editProfileForm');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.updateProfile(form);
            });
        }
    },
    
    /**
     * Update profile information
     */
    updateProfile: function(form) {
        const formData = new FormData(form);
        const updatedUser = {
            ...State.get('user'),
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            address: formData.get('address'),
            city: formData.get('city')
        };
        
        State.set('user', updatedUser);
        this.renderProfile();
        Modal.close();
        Toast.show('تم التحديث', 'تم تحديث الملف الشخصي بنجاح', 'success');
    },
    
    /**
     * Edit avatar
     */
    editAvatar: function() {
        Toast.show('تحديث الصورة', 'سيتم إضافة ميزة تحديث الصورة قريباً', 'info');
    },
    
    /**
     * Logout user
     */
    logout: function() {
        if (confirm('هل أنت متأكد من تسجيل الخروج؟')) {
            // Clear user data
            State.set('user', null);
            State.set('isAuthenticated', false);
            
            // Navigate to login
            Router.navigate('login');
            Toast.show('تم تسجيل الخروج', 'تم تسجيل الخروج بنجاح', 'success');
        }
    }
};

// Explicitly attach to global scope
window.ProfileController = ProfileController; 