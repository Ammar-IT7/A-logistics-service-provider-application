/**
 * Marketing Services Page Controller
 */
const MarketingController = {
    /**
     * Initialize the controller
     */
    init: function() {
        console.log('MarketingController initialized');
        this.loadData();
        this.setupEventListeners();
        this.updateDesignerNotes();
    },

    /**
     * Load page data
     */
    loadData: function() {
        // Simulate loading marketing data
        console.log('Loading marketing services data...');
        
        // In a real app, this would fetch data from the server
        setTimeout(() => {
            this.updateAgenciesList();
            this.updateSuccessStories();
        }, 500);
    },

    /**
     * Set up event listeners
     */
    setupEventListeners: function() {
        // Handle agency card clicks
        document.addEventListener('click', (e) => {
            if (e.target.closest('.agency-card')) {
                const agencyCard = e.target.closest('.agency-card');
                this.handleAgencyClick(agencyCard);
            }
            
            if (e.target.closest('.service-card')) {
                const serviceCard = e.target.closest('.service-card');
                this.handleServiceClick(serviceCard);
            }
            
            if (e.target.closest('.story-card')) {
                const storyCard = e.target.closest('.story-card');
                this.handleStoryClick(storyCard);
            }
        });

        // Handle button clicks
        document.addEventListener('click', (e) => {
            if (e.target.matches('[data-action="request-quote"]')) {
                this.handleQuoteRequest(e.target);
            }
            
            if (e.target.matches('[data-action="view-portfolio"]')) {
                this.handlePortfolioView(e.target);
            }
        });
    },

    /**
     * Handle agency card click
     */
    handleAgencyClick: function(agencyCard) {
        const agencyName = agencyCard.querySelector('h4').textContent;
        const rating = agencyCard.querySelector('.agency-rating span').textContent;
        
        console.log('Agency clicked:', agencyName, rating);
        
        // Show agency details
        Toast.show('وكالة التسويق', `تم اختيار ${agencyName}`, 'info');
        
        // In a real app, this would open a modal or navigate to agency details
        setTimeout(() => {
            Modal.open('agency-details', {
                agency: agencyName,
                rating: rating,
                services: this.getAgencyServices(agencyName)
            });
        }, 1000);
    },

    /**
     * Handle service card click
     */
    handleServiceClick: function(serviceCard) {
        const serviceName = serviceCard.querySelector('h3').textContent;
        console.log('Service clicked:', serviceName);
        
        // Show service details
        Toast.show('خدمة التسويق', `تعرف على المزيد عن ${serviceName}`, 'info');
        
        // In a real app, this would show detailed service information
        setTimeout(() => {
            Modal.open('service-details', {
                service: serviceName,
                description: serviceCard.querySelector('p').textContent,
                features: this.getServiceFeatures(serviceName)
            });
        }, 1000);
    },

    /**
     * Handle success story click
     */
    handleStoryClick: function(storyCard) {
        const companyName = storyCard.querySelector('h4').textContent;
        const period = storyCard.querySelector('.story-period').textContent;
        
        console.log('Success story clicked:', companyName, period);
        
        // Show detailed success story
        Toast.show('قصة النجاح', `تعرف على قصة نجاح ${companyName}`, 'success');
        
        // In a real app, this would show detailed case study
        setTimeout(() => {
            Modal.open('case-study', {
                company: companyName,
                period: period,
                metrics: this.getStoryMetrics(storyCard)
            });
        }, 1000);
    },

    /**
     * Handle quote request
     */
    handleQuoteRequest: function(button) {
        const agencyName = button.closest('.agency-card').querySelector('h4').textContent;
        
        console.log('Quote requested for:', agencyName);
        
        // Show quote request form
        Toast.show('طلب عرض سعر', `تم إرسال طلب عرض سعر لـ ${agencyName}`, 'success');
        
        // In a real app, this would open a quote request form
        setTimeout(() => {
            Modal.open('quote-request', {
                agency: agencyName,
                services: ['SEO', 'Google Ads', 'Social Media']
            });
        }, 1000);
    },

    /**
     * Handle portfolio view
     */
    handlePortfolioView: function(button) {
        const agencyName = button.closest('.agency-card').querySelector('h4').textContent;
        
        console.log('Portfolio requested for:', agencyName);
        
        // Show portfolio
        Toast.show('معرض الأعمال', `عرض أعمال ${agencyName}`, 'info');
        
        // In a real app, this would show the agency's portfolio
        setTimeout(() => {
            Modal.open('portfolio', {
                agency: agencyName,
                projects: this.getAgencyProjects(agencyName)
            });
        }, 1000);
    },

    /**
     * Get agency services
     */
    getAgencyServices: function(agencyName) {
        const services = {
            'وكالة التسويق الرقمي المتقدمة': ['SEO', 'Google Ads', 'Social Media', 'Content Marketing'],
            'مؤسسة التسويق الإبداعية': ['Content Marketing', 'Email Marketing', 'Branding', 'Design']
        };
        
        return services[agencyName] || [];
    },

    /**
     * Get service features
     */
    getServiceFeatures: function(serviceName) {
        const features = {
            'تحسين محركات البحث (SEO)': [
                'تحليل الكلمات المفتاحية',
                'تحسين المحتوى',
                'بناء الروابط',
                'تحليل المنافسين'
            ],
            'إعلانات جوجل': [
                'إعلانات بحث',
                'إعلانات عرض',
                'تحسين الحملات',
                'تحليل الأداء'
            ],
            'التسويق عبر وسائل التواصل': [
                'إدارة الحسابات',
                'إنشاء محتوى',
                'تفاعل العملاء',
                'تحليل النتائج'
            ]
        };
        
        return features[serviceName] || [];
    },

    /**
     * Get story metrics
     */
    getStoryMetrics: function(storyCard) {
        const metrics = [];
        const metricElements = storyCard.querySelectorAll('.metric');
        
        metricElements.forEach(element => {
            const value = element.querySelector('.metric-value').textContent;
            const label = element.querySelector('.metric-label').textContent;
            metrics.push({ value, label });
        });
        
        return metrics;
    },

    /**
     * Get agency projects
     */
    getAgencyProjects: function(agencyName) {
        const projects = {
            'وكالة التسويق الرقمي المتقدمة': [
                { name: 'شركة الشحن السريع', result: 'زيادة المبيعات 200%' },
                { name: 'مستودعات الأمانة', result: 'تحسين ترتيب البحث' },
                { name: 'شركة النقل الآمن', result: 'زيادة العملاء 150%' }
            ],
            'مؤسسة التسويق الإبداعية': [
                { name: 'شركة التغليف المتقدمة', result: 'تحسين العلامة التجارية' },
                { name: 'مؤسسة التخليص الجمركي', result: 'زيادة الوعي بالعلامة' }
            ]
        };
        
        return projects[agencyName] || [];
    },

    /**
     * Update agencies list
     */
    updateAgenciesList: function() {
        // In a real app, this would update the agencies list with real data
        console.log('Agencies list updated');
    },

    /**
     * Update success stories
     */
    updateSuccessStories: function() {
        // In a real app, this would update success stories with real data
        console.log('Success stories updated');
    },

    /**
     * Update designer notes
     */
    updateDesignerNotes: function() {
        const notes = `
            <h4>صفحة خدمات التسويق</h4>
            <p>هذه الصفحة تعرض خدمات التسويق الرقمي مع:</p>
            <ul>
                <li>عرض خدمات التسويق المختلفة (SEO، إعلانات جوجل، وسائل التواصل)</li>
                <li>قائمة وكالات التسويق مع التقييمات والإحصائيات</li>
                <li>قصص النجاح مع النتائج المحققة</li>
                <li>إمكانية طلب عرض سعر وعرض الأعمال</li>
            </ul>
            <p><strong>ملاحظات للمطور:</strong></p>
            <ul>
                <li>إضافة نظام تقييم تفاعلي للوكالات</li>
                <li>ربط مع نظام إدارة الحملات الإعلانية</li>
                <li>إضافة أداة تحليل الكلمات المفتاحية</li>
                <li>إضافة نظام تتبع النتائج</li>
                <li>إضافة معرض أعمال تفاعلي</li>
            </ul>
        `;
        
        const notesContent = document.getElementById('designer-notes-content');
        if (notesContent) {
            notesContent.innerHTML = notes;
        }
    },

    /**
     * Clean up when leaving the page
     */
    destroy: function() {
        console.log('MarketingController destroyed');
        // Clean up any event listeners or timers
    }
};

// Debug: Check if MarketingController is properly declared
console.log('MarketingController declared:', typeof MarketingController !== 'undefined');
console.log('MarketingController in window:', typeof window.MarketingController !== 'undefined');

// Explicitly attach to global scope
window.MarketingController = MarketingController;
console.log('MarketingController attached to window:', typeof window.MarketingController !== 'undefined'); 