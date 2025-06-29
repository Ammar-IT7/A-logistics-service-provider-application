/**
 * State management for the application
 */
const State = {
    /**
     * Application state data
     */
    data: {
        currentPage: "home",
        isAuthenticated: false,
        user: {
            id: 1,
            name: 'أحمد محمد',
            email: 'ahmed@example.com',
            phone: '+966501234567',
            company: 'شركة النقل السريع',
            role: 'provider',
            avatar: null,
            notifications: true,
            darkMode: false,
            language: 'ar'
        },
        
        // Warehouse data
        warehouses: [
            {
                id: 1,
                name: 'مخزن الرياض الرئيسي',
                location: 'الرياض، المملكة العربية السعودية',
                capacity: '5000 متر مربع',
                availableSpace: '2000 متر مربع',
                temperature: 'مبرد (2-8°C)',
                status: 'active',
                orders: 15,
                revenue: 45000,
                rating: 4.8,
                image: 'warehouse-1.jpg'
            },
            {
                id: 2,
                name: 'مخزن جدة',
                location: 'جدة، المملكة العربية السعودية',
                capacity: '3000 متر مربع',
                availableSpace: '800 متر مربع',
                temperature: 'عادي (18-25°C)',
                status: 'active',
                orders: 8,
                revenue: 28000,
                rating: 4.6,
                image: 'warehouse-2.jpg'
            }
        ],
        
        // Shipping data
        shippingServices: [
            {
                id: 1,
                type: 'شحن بري',
                vehicle: 'شاحنة نقل كبيرة',
                capacity: '20 طن',
                route: 'الرياض - الدمام',
                status: 'active',
                orders: 12,
                revenue: 35000,
                rating: 4.7
            }
        ],
        
        // Customs data
        customsServices: [
            {
                id: 1,
                orderNumber: 'CUS-2024-001',
                client: 'شركة التقنية المتقدمة',
                goods: 'معدات إلكترونية',
                port: 'ميناء جدة الإسلامي',
                status: 'pending',
                value: 150000,
                date: '2024-01-15'
            },
            {
                id: 2,
                orderNumber: 'CUS-2024-002',
                client: 'مصنع الأثاث الحديث',
                goods: 'أخشاب وخامات',
                port: 'ميناء الدمام',
                status: 'completed',
                value: 85000,
                date: '2024-01-10'
            },
            {
                id: 3,
                orderNumber: 'CUS-2024-003',
                client: 'شركة الأدوية العالمية',
                goods: 'أدوية ومستحضرات طبية',
                port: 'ميناء جدة الإسلامي',
                status: 'in_progress',
                value: 220000,
                date: '2024-01-12'
            }
        ],
        
        // Packaging data
        packagingServices: [
            {
                id: 1,
                name: 'خدمة التغليف القياسي',
                type: 'تغليف بلاستيكي',
                capacity: '1000 قطعة/يوم',
                status: 'active',
                orders: 25,
                revenue: 18000,
                rating: 4.5
            },
            {
                id: 2,
                name: 'خدمة التغليف الفاخر',
                type: 'تغليف كرتوني مخصص',
                capacity: '500 قطعة/يوم',
                status: 'active',
                orders: 15,
                revenue: 22000,
                rating: 4.8
            }
        ],
        
        // LC Services data
        lcServices: [],
        
        // Last mile delivery data
        lastMileServices: [],
        
        // Notifications
        notifications: [
            { 
                id: 1, 
                title: 'طلب جديد', 
                message: 'تم استلام طلب تخزين جديد من شركة التقنية المتقدمة',
                type: 'order',
                isRead: false,
                timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
            },
            { 
                id: 2, 
                title: 'دفعة مكتملة', 
                message: 'تم إتمام عملية الدفع لطلب التخليص الجمركي #CUS-2024-002',
                type: 'payment',
                isRead: false,
                timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString()
            },
            { 
                id: 3, 
                title: 'تقييم جديد', 
                message: 'حصلت على تقييم 5 نجوم من عميل جديد',
                type: 'rating',
                isRead: true,
                timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
            }
        ],
        
        // Service providers
        serviceProviders: [
            {
                id: 1,
                name: 'شركة النقل السريع',
                type: 'شحن بري',
                rating: 4.8,
                orders: 150,
                location: 'الرياض',
                status: 'verified',
                image: 'provider-1.jpg'
            },
            {
                id: 2,
                name: 'مخازن الأمانة',
                type: 'تخزين',
                rating: 4.6,
                orders: 89,
                location: 'جدة',
                status: 'verified',
                image: 'provider-2.jpg'
            },
            {
                id: 3,
                name: 'التخليص الجمركي المتخصص',
                type: 'تخليص جمركي',
                rating: 4.9,
                orders: 234,
                location: 'الدمام',
                status: 'verified',
                image: 'provider-3.jpg'
            }
        ],
        
        // Statistics
        stats: {
            totalOrders: 45,
            activeServices: 5,
            monthlyRevenue: 125000,
            averageRating: 4.7,
            newRequests: 12
        }
    },
    
    /**
     * Initialize the state
     */
    init: function() {
        // Try to load state from localStorage
        const savedState = localStorage.getItem('appState');
        if (savedState) {
            try {
                const parsedState = JSON.parse(savedState);
                this.data = { ...this.data, ...parsedState };
            } catch (e) {
                console.error('Failed to parse saved state:', e);
            }
        }
    },
    
    /**
     * Get a value from the state
     * @param {string} key - Key to get from state
     * @returns {*} - The value from state
     */
    get: function(key) {
        if (key.includes('.')) {
            const keys = key.split('.');
            let value = this.data;
            
            for (const k of keys) {
                if (value === undefined) return undefined;
                value = value[k];
            }
            
            return value;
        }
        
        return this.data[key];
    },
    
    /**
     * Update a value in the state
     * @param {string} key - Key to update
     * @param {*} value - New value
     */
    update: function(key, value) {
        if (key.includes('.')) {
            const keys = key.split('.');
            let obj = this.data;
            
            for (let i = 0; i < keys.length - 1; i++) {
                const k = keys[i];
                if (!obj[k]) obj[k] = {};
                obj = obj[k];
            }
            
            obj[keys[keys.length - 1]] = value;
        } else {
            this.data[key] = value;
        }
        
        // Save to localStorage
        this.saveState();
        
        // Trigger state change event
        this.notifyStateChange(key, value);
    },
    
    /**
     * Add an item to an array in state
     * @param {string} key - Key of the array
     * @param {*} item - Item to add
     */
    add: function(key, item) {
        if (!this.data[key]) {
            this.data[key] = [];
        }
        
        // Generate ID if not provided
        if (!item.id) {
            item.id = Date.now();
        }
        
        this.data[key].push(item);
        this.saveState();
        this.notifyStateChange(key, this.data[key]);
    },
    
    /**
     * Remove an item from an array in state
     * @param {string} key - Key of the array
     * @param {number} id - ID of the item to remove
     */
    remove: function(key, id) {
        if (this.data[key]) {
            this.data[key] = this.data[key].filter(item => item.id !== id);
            this.saveState();
            this.notifyStateChange(key, this.data[key]);
        }
    },
    
    /**
     * Update an item in an array
     * @param {string} key - Key of the array
     * @param {number} id - ID of the item to update
     * @param {Object} updates - Updates to apply
     */
    updateItem: function(key, id, updates) {
        if (this.data[key]) {
            const index = this.data[key].findIndex(item => item.id === id);
            if (index !== -1) {
                this.data[key][index] = { ...this.data[key][index], ...updates };
                this.saveState();
                this.notifyStateChange(key, this.data[key]);
            }
        }
    },
    
    /**
     * Save the current state to localStorage
     */
    saveState: function() {
        try {
            localStorage.setItem('appState', JSON.stringify(this.data));
        } catch (e) {
            console.error('Failed to save state:', e);
        }
    },
    
    /**
     * Notify subscribers of state changes
     * @param {string} key - Key that was updated
     * @param {*} value - New value
     */
    notifyStateChange: function(key, value) {
        const event = new CustomEvent('stateChange', {
            detail: { key, value }
        });
        
        document.dispatchEvent(event);
    }
};