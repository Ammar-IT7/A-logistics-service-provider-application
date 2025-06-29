/**
 * Notifications page controller
 */
const NotificationsController = {
    /**
     * Initialize the notifications page
     */
    init: function() {
        console.log('Notifications page initialized');
        this.renderNotifications();
        this.setupEventListeners();
    },
    
    /**
     * Render notifications from state
     */
    renderNotifications: function() {
        const container = document.querySelector('.func-notifications-list');
        if (!container) return;
        
        const notifications = State.get('notifications');
        
        if (notifications.length === 0) {
            container.innerHTML = `
                <div class="func-empty-state">
                    <div class="func-empty-icon">
                        <i class="fas fa-bell"></i>
                    </div>
                    <h3>لا توجد إشعارات</h3>
                    <p>ستظهر الإشعارات الجديدة هنا عند وصولها</p>
                </div>
            `;
            return;
        }
        
        container.innerHTML = notifications.map(notification => `
            <div class="func-notification-card ${notification.read ? 'read' : 'unread'}" data-notification-id="${notification.id}">
                <div class="func-notification-icon ${notification.type}">
                    <i class="${this.getNotificationIcon(notification.type)}"></i>
                </div>
                
                <div class="func-notification-content">
                    <h4 class="func-notification-title">${notification.title}</h4>
                    <p class="func-notification-message">${notification.message}</p>
                    
                    <div class="func-notification-meta">
                        <span class="func-notification-time">${this.formatTime(notification.timestamp)}</span>
                        ${notification.read ? '' : '<span class="func-notification-badge">جديد</span>'}
                    </div>
                </div>
                
                <div class="func-notification-actions">
                    <button class="func-btn func-btn-icon" data-action="mark-read" data-id="${notification.id}" title="تحديد كمقروء">
                        <i class="fas fa-check"></i>
                    </button>
                    <button class="func-btn func-btn-icon" data-action="delete-notification" data-id="${notification.id}" title="حذف">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');
    },
    
    /**
     * Get notification icon based on type
     */
    getNotificationIcon: function(type) {
        const iconMap = {
            'success': 'fas fa-check-circle',
            'warning': 'fas fa-exclamation-triangle',
            'error': 'fas fa-times-circle',
            'info': 'fas fa-info-circle',
            'order': 'fas fa-shopping-cart',
            'payment': 'fas fa-credit-card',
            'delivery': 'fas fa-truck',
            'system': 'fas fa-cog'
        };
        return iconMap[type] || 'fas fa-bell';
    },
    
    /**
     * Format timestamp to relative time
     */
    formatTime: function(timestamp) {
        const now = new Date();
        const notificationTime = new Date(timestamp);
        const diffInMinutes = Math.floor((now - notificationTime) / (1000 * 60));
        
        if (diffInMinutes < 1) {
            return 'الآن';
        } else if (diffInMinutes < 60) {
            return `منذ ${diffInMinutes} دقيقة`;
        } else if (diffInMinutes < 1440) {
            const hours = Math.floor(diffInMinutes / 60);
            return `منذ ${hours} ساعة`;
        } else {
            const days = Math.floor(diffInMinutes / 1440);
            return `منذ ${days} يوم`;
        }
    },
    
    /**
     * Set up event listeners
     */
    setupEventListeners: function() {
        const page = document.getElementById('notifications');
        if (!page) return;
        
        // Handle mark as read
        page.addEventListener('click', (e) => {
            const markReadBtn = e.target.closest('[data-action="mark-read"]');
            if (markReadBtn) {
                e.preventDefault();
                const notificationId = parseInt(markReadBtn.dataset.id);
                this.markAsRead(notificationId);
            }
        });
        
        // Handle delete notification
        page.addEventListener('click', (e) => {
            const deleteBtn = e.target.closest('[data-action="delete-notification"]');
            if (deleteBtn) {
                e.preventDefault();
                const notificationId = parseInt(deleteBtn.dataset.id);
                this.deleteNotification(notificationId);
            }
        });
        
        // Handle mark all as read
        const markAllReadBtn = page.querySelector('[data-action="mark-all-read"]');
        if (markAllReadBtn) {
            markAllReadBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.markAllAsRead();
            });
        }
        
        // Handle clear all notifications
        const clearAllBtn = page.querySelector('[data-action="clear-all"]');
        if (clearAllBtn) {
            clearAllBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.clearAllNotifications();
            });
        }
    },
    
    /**
     * Mark notification as read
     */
    markAsRead: function(notificationId) {
        const notifications = State.get('notifications');
        const notification = notifications.find(n => n.id === notificationId);
        
        if (notification && !notification.read) {
            notification.read = true;
            State.set('notifications', notifications);
            this.renderNotifications();
            Toast.show('تم التحديث', 'تم تحديد الإشعار كمقروء', 'success');
        }
    },
    
    /**
     * Delete notification
     */
    deleteNotification: function(notificationId) {
        const notifications = State.get('notifications');
        const updatedNotifications = notifications.filter(n => n.id !== notificationId);
        
        State.set('notifications', updatedNotifications);
        this.renderNotifications();
        Toast.show('تم الحذف', 'تم حذف الإشعار بنجاح', 'success');
    },
    
    /**
     * Mark all notifications as read
     */
    markAllAsRead: function() {
        const notifications = State.get('notifications');
        const updatedNotifications = notifications.map(n => ({ ...n, read: true }));
        
        State.set('notifications', updatedNotifications);
        this.renderNotifications();
        Toast.show('تم التحديث', 'تم تحديد جميع الإشعارات كمقروءة', 'success');
    },
    
    /**
     * Clear all notifications
     */
    clearAllNotifications: function() {
        State.set('notifications', []);
        this.renderNotifications();
        Toast.show('تم المسح', 'تم مسح جميع الإشعارات', 'success');
    }
};

// Explicitly attach to global scope
window.NotificationsController = NotificationsController; 