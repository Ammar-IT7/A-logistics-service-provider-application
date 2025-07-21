/**
 * Service Providers page controller
 */
console.log('Loading service-providers.js file...');

const ServiceProvidersController = {
    /**
     * Initialize the service providers page
     */
    init: function() {
        console.log('Service Providers page initialized');
        this.renderServiceProviders();
        this.setupEventListeners();
        
        // Reconnect menu buttons for drawer functionality
        if (typeof DrawerHelper !== 'undefined') {
            DrawerHelper.reconnectMenuButtons();
        }
    },
    
    /**
     * Render service providers from state
     */
    renderServiceProviders: function() {
        const container = document.querySelector('.func-providers-list');
        if (!container) return;
        
        const providers = State.get('serviceProviders');
        
        if (providers.length === 0) {
            container.innerHTML = `
                <div class="func-empty-state">
                    <div class="func-empty-icon">
                        <i class="fas fa-users"></i>
                    </div>
                    <h3>لا توجد مزودي خدمات</h3>
                    <p>لا يوجد مزودي خدمات مسجلين حالياً</p>
                </div>
            `;
            return;
        }
        
        container.innerHTML = providers.map(provider => `
            <div class="func-provider-card" data-provider-id="${provider.id}">
                <div class="func-provider-header">
                    <div class="func-provider-avatar">
                        <img src="${provider.avatar}" alt="${provider.name}" onerror="this.src='https://via.placeholder.com/60x60/007bff/ffffff?text=${provider.name.charAt(0)}'">
                    </div>
                    <div class="func-provider-status ${provider.status}">
                        <span class="func-status-dot"></span>
                        ${this.getStatusText(provider.status)}
                    </div>
                </div>
                
                <div class="func-provider-content">
                    <h3 class="func-provider-name">${provider.name}</h3>
                    <p class="func-provider-type">${provider.type}</p>
                    
                    <div class="func-provider-details">
                        <div class="func-detail-item">
                            <i class="fas fa-map-marker-alt"></i>
                            <span>${provider.location}</span>
                        </div>
                        <div class="func-detail-item">
                            <i class="fas fa-star"></i>
                            <span>${provider.rating} (${provider.reviews} تقييم)</span>
                        </div>
                        <div class="func-detail-item">
                            <i class="fas fa-clock"></i>
                            <span>${provider.responseTime}</span>
                        </div>
                    </div>
                    
                    <div class="func-provider-stats">
                        <div class="func-stat">
                            <span class="func-stat-value">${provider.completedOrders}</span>
                            <span class="func-stat-label">طلبات مكتملة</span>
                        </div>
                        <div class="func-stat">
                            <span class="func-stat-value">${provider.satisfactionRate}%</span>
                            <span class="func-stat-label">رضا العملاء</span>
                        </div>
                    </div>
                </div>
                
                <div class="func-provider-actions">
                    <button class="func-btn func-btn-outline" data-action="view-profile" data-id="${provider.id}">
                        <i class="fas fa-eye"></i>
                        عرض الملف الشخصي
                    </button>
                    <button class="func-btn func-btn-primary" data-action="contact-provider" data-id="${provider.id}">
                        <i class="fas fa-phone"></i>
                        التواصل
                    </button>
                </div>
            </div>
        `).join('');
    },
    
    /**
     * Get status text in Arabic
     */
    getStatusText: function(status) {
        const statusMap = {
            'online': 'متصل',
            'offline': 'غير متصل',
            'busy': 'مشغول',
            'available': 'متاح'
        };
        return statusMap[status] || status;
    },
    
    /**
     * Set up event listeners
     */
    setupEventListeners: function() {
        const page = document.getElementById('service-providers');
        if (!page) return;
        
        // Handle provider card clicks
        page.addEventListener('click', (e) => {
            const providerCard = e.target.closest('.func-provider-card');
            if (providerCard) {
                const providerId = parseInt(providerCard.dataset.providerId);
                // Handle provider card interaction
            }
        });
        
        // Handle view profile button
        page.addEventListener('click', (e) => {
            const viewProfileBtn = e.target.closest('[data-action="view-profile"]');
            if (viewProfileBtn) {
                e.preventDefault();
                const providerId = viewProfileBtn.dataset.id;
                this.showProviderProfile(providerId);
            }
        });
        
        // Handle contact provider button
        page.addEventListener('click', (e) => {
            const contactBtn = e.target.closest('[data-action="contact-provider"]');
            if (contactBtn) {
                e.preventDefault();
                const providerId = contactBtn.dataset.id;
                this.contactProvider(providerId);
            }
        });
    },
    
    /**
     * Show provider profile modal
     */
    showProviderProfile: function(providerId) {
        const providers = State.get('serviceProviders');
        const provider = providers.find(p => p.id == providerId);
        
        if (!provider) return;
        
        const modalContent = `
            <div class="modal-header">
                <h3>الملف الشخصي - ${provider.name}</h3>
                <button class="modal-close" data-action="close-modal">&times;</button>
            </div>
            <div class="modal-body">
                <div class="func-provider-profile">
                    <div class="func-profile-header">
                        <img src="${provider.avatar}" alt="${provider.name}" class="func-profile-avatar">
                        <div class="func-profile-info">
                            <h4>${provider.name}</h4>
                            <p>${provider.type}</p>
                            <div class="func-rating">
                                <i class="fas fa-star"></i>
                                <span>${provider.rating} (${provider.reviews} تقييم)</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="func-profile-details">
                        <div class="func-detail-row">
                            <span class="func-detail-label">الموقع:</span>
                            <span class="func-detail-value">${provider.location}</span>
                        </div>
                        <div class="func-detail-row">
                            <span class="func-detail-label">وقت الاستجابة:</span>
                            <span class="func-detail-value">${provider.responseTime}</span>
                        </div>
                        <div class="func-detail-row">
                            <span class="func-detail-label">الطلبات المكتملة:</span>
                            <span class="func-detail-value">${provider.completedOrders}</span>
                        </div>
                        <div class="func-detail-row">
                            <span class="func-detail-label">معدل الرضا:</span>
                            <span class="func-detail-value">${provider.satisfactionRate}%</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        Modal.show('provider-profile-modal', modalContent);
    },
    
    /**
     * Contact provider
     */
    contactProvider: function(providerId) {
        const providers = State.get('serviceProviders');
        const provider = providers.find(p => p.id == providerId);
        
        if (!provider) return;
        
        Toast.show('تواصل مع المزود', `سيتم التواصل مع ${provider.name} قريباً`, 'info');
    }
}; 

// Debug: Check if ServiceProvidersController is properly declared
console.log('ServiceProvidersController declared:', typeof ServiceProvidersController !== 'undefined');
console.log('ServiceProvidersController in window:', typeof window.ServiceProvidersController !== 'undefined');

// Explicitly attach to global scope
window.ServiceProvidersController = ServiceProvidersController;
console.log('ServiceProvidersController attached to window:', typeof window.ServiceProvidersController !== 'undefined'); 