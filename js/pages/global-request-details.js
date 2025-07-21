/**
 * Global Request Details Controller
 * Manages the global request details page functionality from provider perspective
 */
const GlobalRequestDetailsController = {
    /**
     * Initialize the global request details page
     */
    init: function() {
        console.log('GlobalRequestDetailsController initialized');
        
        // Load global request details data
        this.loadGlobalRequestDetails();
        
        // Set up event listeners
        this.setupEventListeners();
        
        // Initialize timeline
        this.initTimeline();
        
        // Initialize my offer section
        this.initMyOfferSection();
        
        // Initialize market analysis
        this.initMarketAnalysis();
    },

    /**
     * Load global request details data
     */
    loadGlobalRequestDetails: function() {
        // Get request ID from URL or state
        const requestId = this.getRequestId();
        
        // Simulate loading global request details
        setTimeout(() => {
            this.renderGlobalRequestDetails(requestId);
        }, 500);
    },

    /**
     * Get request ID from URL or state
     */
    getRequestId: function() {
        // This would typically come from URL parameters or state
        // For now, return a default request ID
        return 'GLB-2024-1253';
    },

    /**
     * Render global request details
     */
    renderGlobalRequestDetails: function(requestId) {
        console.log(`Loading global request details for request: ${requestId}`);
        
        // Update request title
        const titleElement = document.querySelector('.global-request-header-title');
        if (titleElement) {
            titleElement.textContent = `تفاصيل الطلب العام #${requestId}`;
        }
        
        // Update request information
        this.updateRequestInfo();
        
        // Update timeline
        this.updateTimeline();
        
        // Update my offer section
        this.updateMyOfferSection();
        
        // Update market analysis
        this.updateMarketAnalysis();
    },

    /**
     * Update request information
     */
    updateRequestInfo: function() {
        // This would typically fetch real data from an API
        const requestInfo = {
            serviceType: 'تخزين',
            priority: 'عالية',
            publishDate: '15 يناير 2024',
            deadline: '20 يناير 2024',
            client: 'شركة التقنية المتقدمة للتجارة',
            offersCount: '5 عروض مقدمة'
        };
        
        // Update info cards
        const infoCards = document.querySelectorAll('.global-request-info-card');
        if (infoCards.length >= 6) {
            infoCards[0].querySelector('.global-request-info-value').textContent = requestInfo.serviceType;
            infoCards[1].querySelector('.global-request-info-value').textContent = requestInfo.priority;
            infoCards[2].querySelector('.global-request-info-value').textContent = requestInfo.publishDate;
            infoCards[3].querySelector('.global-request-info-value').textContent = requestInfo.deadline;
            infoCards[4].querySelector('.global-request-info-value').textContent = requestInfo.client;
            infoCards[5].querySelector('.global-request-info-value').textContent = requestInfo.offersCount;
        }
    },

    /**
     * Initialize timeline
     */
    initTimeline: function() {
        const timelineItems = document.querySelectorAll('.global-request-timeline-item');
        
        timelineItems.forEach((item, index) => {
            // Add animation delay
            item.style.animationDelay = `${index * 0.2}s`;
        });
    },

    /**
     * Update timeline
     */
    updateTimeline: function() {
        // This would typically update based on real request status
        console.log('Timeline updated');
    },

    /**
     * Initialize my offer section
     */
    initMyOfferSection: function() {
        // This would check if the provider has submitted an offer
        const hasOffer = false; // Mock data - would come from API
        
        if (hasOffer) {
            this.showMyOffer();
        } else {
            this.showNoOffer();
        }
    },

    /**
     * Show my offer
     */
    showMyOffer: function() {
        const myOfferSection = document.querySelector('.global-request-my-offer');
        if (myOfferSection) {
            myOfferSection.innerHTML = `
                <div class="global-request-my-offer-content">
                    <div class="global-request-my-offer-header">
                        <h4>عرضي المقدم</h4>
                        <span class="global-request-my-offer-price">9,200 ريال</span>
                    </div>
                    <div class="global-request-my-offer-details">
                        <div class="global-request-my-offer-item">
                            <span>الحالة:</span>
                            <span class="global-request-offer-status-submitted">مقدمة</span>
                        </div>
                        <div class="global-request-my-offer-item">
                            <span>تاريخ التقديم:</span>
                            <span>16 يناير 2024</span>
                        </div>
                        <div class="global-request-my-offer-item">
                            <span>صالح حتى:</span>
                            <span>23 يناير 2024</span>
                        </div>
                    </div>
                    <div class="global-request-my-offer-actions">
                        <button class="global-request-btn global-request-btn-outline" data-action="edit-offer">
                            <i class="fas fa-edit"></i>
                            تعديل العرض
                        </button>
                        <button class="global-request-btn global-request-btn-outline" data-action="withdraw-offer">
                            <i class="fas fa-times"></i>
                            سحب العرض
                        </button>
                    </div>
                </div>
            `;
        }
    },

    /**
     * Show no offer
     */
    showNoOffer: function() {
        const myOfferSection = document.querySelector('.global-request-my-offer');
        if (myOfferSection) {
            myOfferSection.innerHTML = `
                <div class="global-request-no-offer">
                    <div class="global-request-no-offer-icon">
                        <i class="fas fa-plus-circle"></i>
                    </div>
                    <h4>لم تقدم عرضاً بعد</h4>
                    <p>يمكنك تقديم عرض لهذا الطلب للحصول على الفرصة</p>
                    <button class="global-request-btn global-request-btn-primary" data-action="submit-offer">
                        <i class="fas fa-plus"></i>
                        تقديم عرض
                    </button>
                </div>
            `;
        }
    },

    /**
     * Update my offer section
     */
    updateMyOfferSection: function() {
        // This would typically update based on real offer data
        console.log('My offer section updated');
    },

    /**
     * Initialize market analysis
     */
    initMarketAnalysis: function() {
        // This would load market analysis data
        console.log('Market analysis initialized');
    },

    /**
     * Update market analysis
     */
    updateMarketAnalysis: function() {
        // This would typically fetch real market data
        const marketData = {
            averagePrice: '8,500 ريال',
            lowestOffer: '7,200 ريال',
            highestOffer: '12,000 ريال',
            totalOffers: '5 عروض'
        };
        
        // Update market analysis
        const analysisValue = document.querySelector('.global-request-analysis-value');
        if (analysisValue) {
            analysisValue.textContent = marketData.averagePrice;
        }
        
        const analysisItems = document.querySelectorAll('.global-request-analysis-item');
        if (analysisItems.length >= 3) {
            analysisItems[0].querySelector('span:last-child').textContent = marketData.lowestOffer;
            analysisItems[1].querySelector('span:last-child').textContent = marketData.highestOffer;
            analysisItems[2].querySelector('span:last-child').textContent = marketData.totalOffers;
        }
    },

    /**
     * Set up event listeners
     */
    setupEventListeners: function() {
        // Handle back button
        document.addEventListener('click', (e) => {
            if (e.target.closest('.global-request-header-action[data-action="navigate"]')) {
                const targetPage = e.target.closest('[data-action="navigate"]').dataset.page;
                console.log(`Navigating to: ${targetPage}`);
                Router.navigate(targetPage);
            }
        });

        // Handle action buttons
        document.addEventListener('click', (e) => {
            const actionButton = e.target.closest('[data-action]');
            if (actionButton) {
                const action = actionButton.dataset.action;
                this.handleAction(action);
            }
        });
    },

    /**
     * Handle action button clicks
     */
    handleAction: function(action) {
        switch (action) {
            case 'submit-offer':
                this.submitOffer();
                break;
            case 'edit-offer':
                this.editOffer();
                break;
            case 'withdraw-offer':
                this.withdrawOffer();
                break;
            case 'download-request':
                this.downloadRequest();
                break;
            case 'contact-client':
                this.contactClient();
                break;
            default:
                console.log(`Action not handled: ${action}`);
        }
    },

    /**
     * Submit offer
     */
    submitOffer: function() {
        console.log('Submit offer action triggered');
        // This would typically navigate to offer form
        this.showMessage('سيتم فتح نموذج تقديم العرض قريباً');
    },

    /**
     * Edit offer
     */
    editOffer: function() {
        console.log('Edit offer action triggered');
        // This would typically navigate to offer edit form
        this.showMessage('سيتم فتح نموذج تعديل العرض قريباً');
    },

    /**
     * Withdraw offer
     */
    withdrawOffer: function() {
        console.log('Withdraw offer action triggered');
        // This would typically show confirmation dialog
        if (confirm('هل أنت متأكد من سحب عرضك؟')) {
            this.showMessage('تم سحب العرض بنجاح');
        }
    },

    /**
     * Download request
     */
    downloadRequest: function() {
        console.log('Download request action triggered');
        // This would typically trigger a file download
        this.showMessage('سيتم تحميل تفاصيل الطلب قريباً');
    },

    /**
     * Contact client
     */
    contactClient: function() {
        console.log('Contact client action triggered');
        // This would typically open contact form or call
        this.showMessage('سيتم الاتصال بالعميل قريباً');
    },

    /**
     * Show message to user
     */
    showMessage: function(message) {
        // This would typically use a toast or modal component
        console.log(`Message: ${message}`);
        alert(message);
    },

    /**
     * Load global request details data
     */
    loadGlobalRequestDetailsData: function() {
        // Simulate loading global request details data
        setTimeout(() => {
            console.log('Global request details data loaded');
        }, 500);
    }
};

// Attach to window for router access
window.GlobalRequestDetailsController = GlobalRequestDetailsController; 