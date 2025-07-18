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
        this.initializeAnimations();
        this.setupIntersectionObserver();
    },

    /**
     * Load page data
     */
    loadData: function() {
        // Simulate loading marketing data
        console.log('Loading marketing services data...');
        
        // Show loading state
        this.showLoadingState();
        
        // In a real app, this would fetch data from the server
        setTimeout(() => {
            this.updateAgenciesList();
            this.updateSuccessStories();
            this.updateTestimonials();
            this.hideLoadingState();
        }, 800);
    },

    /**
     * Set up event listeners
     */
    setupEventListeners: function() {
        // Handle agency card clicks
        document.addEventListener('click', (e) => {
            if (e.target.closest('.mkt-agency-card')) {
                const agencyCard = e.target.closest('.mkt-agency-card');
                this.handleAgencyClick(agencyCard);
            }
            
            if (e.target.closest('.mkt-service-card')) {
                const serviceCard = e.target.closest('.mkt-service-card');
                this.handleServiceClick(serviceCard);
            }
            
            if (e.target.closest('.mkt-story-card')) {
                const storyCard = e.target.closest('.mkt-story-card');
                this.handleStoryClick(storyCard);
            }

            if (e.target.closest('.mkt-testimonial-card')) {
                const testimonialCard = e.target.closest('.mkt-testimonial-card');
                this.handleTestimonialClick(testimonialCard);
            }
        });

        // Handle quick action buttons
        document.addEventListener('click', (e) => {
            if (e.target.closest('.mkt-quick-action')) {
                const quickAction = e.target.closest('.mkt-quick-action');
                this.handleQuickAction(quickAction);
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

            if (e.target.matches('[data-action="get-free-consultation"]')) {
                this.handleFreeConsultation(e.target);
            }

            if (e.target.matches('[data-action="download-guide"]')) {
                this.handleDownloadGuide(e.target);
            }
        });

        // Handle scroll events for animations
        window.addEventListener('scroll', this.handleScroll.bind(this));
    },

    /**
     * Handle quick action clicks
     */
    handleQuickAction: function(quickAction) {
        const action = quickAction.getAttribute('data-action');
        const actionText = quickAction.querySelector('.mkt-quick-action-text').textContent;
        
        console.log('Quick action clicked:', action, actionText);
        
        // Add click animation
        quickAction.style.transform = 'scale(0.95)';
        setTimeout(() => {
            quickAction.style.transform = '';
        }, 150);

        switch(action) {
            case 'get-quote':
                this.showQuoteModal();
                break;
            case 'free-audit':
                this.showAuditModal();
                break;
            case 'consultation':
                this.showConsultationModal();
                break;
            case 'portfolio':
                this.showPortfolioModal();
                break;
        }
    },

    /**
     * Show quote request modal
     */
    showQuoteModal: function() {
        Toast.show('طلب عرض سعر', 'سيتم التواصل معك خلال 24 ساعة', 'success');
        
        setTimeout(() => {
            Modal.open('quote-request', {
                title: 'طلب عرض سعر',
                fields: [
                    { name: 'company', label: 'اسم الشركة', type: 'text', required: true },
                    { name: 'contact', label: 'رقم التواصل', type: 'tel', required: true },
                    { name: 'email', label: 'البريد الإلكتروني', type: 'email', required: true },
                    { name: 'services', label: 'الخدمات المطلوبة', type: 'select', options: ['SEO', 'Google Ads', 'Social Media', 'Content Marketing'] },
                    { name: 'budget', label: 'الميزانية الشهرية', type: 'select', options: ['1000-3000', '3000-5000', '5000-10000', '10000+'] },
                    { name: 'message', label: 'رسالة إضافية', type: 'textarea' }
                ]
            });
        }, 1000);
    },

    /**
     * Show free audit modal
     */
    showAuditModal: function() {
        Toast.show('فحص مجاني', 'سيتم إرسال تقرير الفحص المجاني لبريدك الإلكتروني', 'info');
        
        setTimeout(() => {
            Modal.open('free-audit', {
                title: 'فحص مجاني للموقع',
                fields: [
                    { name: 'website', label: 'رابط الموقع', type: 'url', required: true },
                    { name: 'email', label: 'البريد الإلكتروني', type: 'email', required: true },
                    { name: 'focus', label: 'التركيز على', type: 'select', options: ['SEO', 'الأداء', 'تجربة المستخدم', 'الأمان'] }
                ]
            });
        }, 1000);
    },

    /**
     * Show consultation modal
     */
    showConsultationModal: function() {
        Toast.show('استشارة مجانية', 'سيتم التواصل معك لتحديد موعد الاستشارة', 'success');
        
        setTimeout(() => {
            Modal.open('consultation', {
                title: 'حجز استشارة مجانية',
                fields: [
                    { name: 'name', label: 'الاسم الكامل', type: 'text', required: true },
                    { name: 'phone', label: 'رقم الهاتف', type: 'tel', required: true },
                    { name: 'email', label: 'البريد الإلكتروني', type: 'email', required: true },
                    { name: 'preferred_time', label: 'الوقت المفضل', type: 'select', options: ['صباحاً', 'مساءً', 'أي وقت'] },
                    { name: 'business_type', label: 'نوع النشاط', type: 'text' }
                ]
            });
        }, 1000);
    },

    /**
     * Show portfolio modal
     */
    showPortfolioModal: function() {
        Toast.show('معرض الأعمال', 'جاري تحميل معرض الأعمال', 'info');
        
        setTimeout(() => {
            Modal.open('portfolio', {
                title: 'معرض أعمالنا',
                projects: this.getPortfolioProjects()
            });
        }, 1000);
    },

    /**
     * Handle agency card click
     */
    handleAgencyClick: function(agencyCard) {
        const agencyName = agencyCard.querySelector('h4').textContent;
        const rating = agencyCard.querySelector('.mkt-agency-rating span').textContent;
        
        console.log('Agency clicked:', agencyName, rating);
        
        // Show agency details
        Toast.show('وكالة التسويق', `تم اختيار ${agencyName}`, 'info');
        
        // In a real app, this would open a modal or navigate to agency details
        setTimeout(() => {
            Modal.open('agency-details', {
                agency: agencyName,
                rating: rating,
                services: this.getAgencyServices(agencyName),
                stats: this.getAgencyStats(agencyCard)
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
                features: this.getServiceFeatures(serviceName),
                metrics: this.getServiceMetrics(serviceCard)
            });
        }, 1000);
    },

    /**
     * Handle success story click
     */
    handleStoryClick: function(storyCard) {
        const companyName = storyCard.querySelector('h4').textContent;
        const period = storyCard.querySelector('.mkt-story-period').textContent;
        
        console.log('Success story clicked:', companyName, period);
        
        // Show detailed success story
        Toast.show('قصة النجاح', `تعرف على قصة نجاح ${companyName}`, 'success');
        
        // In a real app, this would show detailed case study
        setTimeout(() => {
            Modal.open('case-study', {
                company: companyName,
                period: period,
                metrics: this.getStoryMetrics(storyCard),
                industry: storyCard.querySelector('.mkt-story-industry')?.textContent
            });
        }, 1000);
    },

    /**
     * Handle testimonial click
     */
    handleTestimonialClick: function(testimonialCard) {
        const authorName = testimonialCard.querySelector('h5').textContent;
        const authorRole = testimonialCard.querySelector('span').textContent;
        
        console.log('Testimonial clicked:', authorName, authorRole);
        
        // Show detailed testimonial
        Toast.show('رأي العميل', `تعرف على المزيد عن ${authorName}`, 'info');
        
        setTimeout(() => {
            Modal.open('testimonial-details', {
                author: authorName,
                role: authorRole,
                content: testimonialCard.querySelector('p').textContent,
                rating: this.getTestimonialRating(testimonialCard)
            });
        }, 1000);
    },

    /**
     * Handle quote request
     */
    handleQuoteRequest: function(button) {
        const agencyName = button.closest('.mkt-agency-card').querySelector('h4').textContent;
        
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
        const agencyName = button.closest('.mkt-agency-card').querySelector('h4').textContent;
        
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
     * Handle free consultation
     */
    handleFreeConsultation: function(button) {
        console.log('Free consultation requested');
        
        Toast.show('استشارة مجانية', 'سيتم التواصل معك خلال ساعة واحدة', 'success');
        
        setTimeout(() => {
            Modal.open('consultation', {
                title: 'حجز استشارة مجانية',
                fields: [
                    { name: 'name', label: 'الاسم الكامل', type: 'text', required: true },
                    { name: 'phone', label: 'رقم الهاتف', type: 'tel', required: true },
                    { name: 'email', label: 'البريد الإلكتروني', type: 'email', required: true },
                    { name: 'business_type', label: 'نوع النشاط', type: 'text' },
                    { name: 'current_challenges', label: 'التحديات الحالية', type: 'textarea' }
                ]
            });
        }, 1000);
    },

    /**
     * Handle download guide
     */
    handleDownloadGuide: function(button) {
        console.log('Marketing guide download requested');
        
        Toast.show('تحميل الدليل', 'جاري تحميل دليل التسويق الرقمي', 'info');
        
        // Simulate download
        setTimeout(() => {
            Toast.show('تم التحميل', 'تم تحميل الدليل بنجاح', 'success');
            // In a real app, this would trigger an actual download
        }, 2000);
    },

    /**
     * Get agency services
     */
    getAgencyServices: function(agencyName) {
        const services = {
            'وكالة التسويق الرقمي المتقدمة': ['SEO', 'Google Ads', 'Social Media', 'Content Marketing'],
            'مؤسسة التسويق الإبداعية': ['Content Marketing', 'Email Marketing', 'Branding', 'Design'],
            'شركة التسويق التحليلي': ['Data Analytics', 'Performance Marketing', 'Conversion Optimization', 'A/B Testing']
        };
        
        return services[agencyName] || [];
    },

    /**
     * Get agency stats
     */
    getAgencyStats: function(agencyCard) {
        const stats = [];
        const statElements = agencyCard.querySelectorAll('.mkt-stat-item');
        
        statElements.forEach(element => {
            const value = element.querySelector('.mkt-stat-value').textContent;
            const label = element.querySelector('.mkt-stat-label').textContent;
            stats.push({ value, label });
        });
        
        return stats;
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
            'إعلانات جوجل (Google Ads)': [
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
            ],
            'التسويق عبر البريد الإلكتروني': [
                'قوائم البريد',
                'تصميم الرسائل',
                'تحليل النتائج',
                'أتمتة الحملات'
            ],
            'التسويق بالمحتوى': [
                'كتابة المحتوى',
                'تصميم الرسوم',
                'الفيديو',
                'الإنفوجرافيك'
            ],
            'تحليل البيانات والتقارير': [
                'تحليل الأداء',
                'تقارير شهرية',
                'توصيات التحسين',
                'متابعة النتائج'
            ]
        };
        
        return features[serviceName] || [];
    },

    /**
     * Get service metrics
     */
    getServiceMetrics: function(serviceCard) {
        const metrics = [];
        const metricElements = serviceCard.querySelectorAll('.mkt-service-metric');
        
        metricElements.forEach(element => {
            const value = element.querySelector('.mkt-service-metric-value').textContent;
            const label = element.querySelector('.mkt-service-metric-label').textContent;
            metrics.push({ value, label });
        });
        
        return metrics;
    },

    /**
     * Get story metrics
     */
    getStoryMetrics: function(storyCard) {
        const metrics = [];
        const metricElements = storyCard.querySelectorAll('.mkt-metric');
        
        metricElements.forEach(element => {
            const value = element.querySelector('.mkt-metric-value').textContent;
            const label = element.querySelector('.mkt-metric-label').textContent;
            metrics.push({ value, label });
        });
        
        return metrics;
    },

    /**
     * Get testimonial rating
     */
    getTestimonialRating: function(testimonialCard) {
        const stars = testimonialCard.querySelectorAll('.mkt-testimonial-rating i.fas.fa-star');
        return stars.length;
    },

    /**
     * Get agency projects
     */
    getAgencyProjects: function(agencyName) {
        const projects = {
            'وكالة التسويق الرقمي المتقدمة': [
                { name: 'شركة الشحن السريع', result: 'زيادة المبيعات 200%', image: 'shipping.jpg' },
                { name: 'مستودعات الأمانة', result: 'تحسين ترتيب البحث', image: 'warehouse.jpg' },
                { name: 'شركة النقل الآمن', result: 'زيادة العملاء 150%', image: 'transport.jpg' }
            ],
            'مؤسسة التسويق الإبداعية': [
                { name: 'شركة التغليف المتقدمة', result: 'تحسين العلامة التجارية', image: 'packaging.jpg' },
                { name: 'مؤسسة التخليص الجمركي', result: 'زيادة الوعي بالعلامة', image: 'customs.jpg' }
            ],
            'شركة التسويق التحليلي': [
                { name: 'شركة اللوجستيات العالمية', result: 'تحسين معدل التحويل 45%', image: 'logistics.jpg' },
                { name: 'مؤسسة النقل البحري', result: 'زيادة الإيرادات 180%', image: 'maritime.jpg' }
            ]
        };
        
        return projects[agencyName] || [];
    },

    /**
     * Get portfolio projects
     */
    getPortfolioProjects: function() {
        return [
            {
                name: 'شركة الشحن السريع',
                category: 'خدمات الشحن',
                result: 'زيادة المبيعات 200%',
                image: 'shipping-project.jpg',
                description: 'حملة تسويقية شاملة تضمنت SEO وإعلانات Google'
            },
            {
                name: 'مستودعات الأمانة',
                category: 'خدمات التخزين',
                result: 'تحسين ترتيب البحث',
                image: 'warehouse-project.jpg',
                description: 'تحسين شامل للموقع وتحسين محركات البحث'
            },
            {
                name: 'شركة النقل الآمن',
                category: 'خدمات النقل',
                result: 'زيادة الطلبات 180%',
                image: 'transport-project.jpg',
                description: 'حملة تسويق عبر وسائل التواصل الاجتماعي'
            }
        ];
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
     * Update testimonials
     */
    updateTestimonials: function() {
        // In a real app, this would update testimonials with real data
        console.log('Testimonials updated');
    },

    /**
     * Initialize animations
     */
    initializeAnimations: function() {
        // Add fade-in animation to cards
        const cards = document.querySelectorAll('.mkt-service-card, .mkt-agency-card, .mkt-story-card, .mkt-testimonial-card');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    },

    /**
     * Setup intersection observer for scroll animations
     */
    setupIntersectionObserver: function() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('mkt-fade-in');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Observe all cards
        const cards = document.querySelectorAll('.mkt-service-card, .mkt-agency-card, .mkt-story-card, .mkt-testimonial-card');
        cards.forEach(card => observer.observe(card));
    },

    /**
     * Handle scroll events
     */
    handleScroll: function() {
        // Add scroll-based animations or effects here
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.mkt-hero-content');
        
        if (parallax) {
            const speed = scrolled * 0.5;
            parallax.style.transform = `translateY(${speed}px)`;
        }
    },

    /**
     * Show loading state
     */
    showLoadingState: function() {
        const cards = document.querySelectorAll('.mkt-service-card, .mkt-agency-card, .mkt-story-card');
        cards.forEach(card => {
            card.classList.add('mkt-loading');
        });
    },

    /**
     * Hide loading state
     */
    hideLoadingState: function() {
        const cards = document.querySelectorAll('.mkt-service-card, .mkt-agency-card, .mkt-story-card');
        cards.forEach(card => {
            card.classList.remove('mkt-loading');
        });
    },

    /**
     * Update designer notes
     */
    updateDesignerNotes: function() {
        const notes = `
            <h4>صفحة خدمات التسويق الرقمي المحسنة</h4>
            <p>تم تطوير الصفحة لتشمل:</p>
            <ul>
                <li>قسم رئيسي جذاب مع إحصائيات مهمة</li>
                <li>أزرار إجراءات سريعة للتفاعل المباشر</li>
                <li>عرض شامل لخدمات التسويق مع مقاييس الأداء</li>
                <li>وكالات تسويق معتمدة مع تقييمات وإحصائيات</li>
                <li>قصص نجاح مفصلة مع مقاييس النتائج</li>
                <li>آراء العملاء مع تقييمات</li>
                <li>قسم دعوة للعمل مع خيارات متعددة</li>
            </ul>
            <p><strong>التحسينات التقنية:</strong></p>
            <ul>
                <li>تصميم متجاوب بالكامل مع نهج Mobile-First</li>
                <li>رسوم متحركة سلسة وتفاعلية</li>
                <li>تحسين تجربة المستخدم مع تفاعلات فورية</li>
                <li>دعم الوضع المظلم والاتجاه RTL</li>
                <li>تحميل تدريجي للمحتوى مع حالات التحميل</li>
            </ul>
            <p><strong>ملاحظات للمطور:</strong></p>
            <ul>
                <li>إضافة نظام تتبع التحويلات</li>
                <li>ربط مع أدوات التحليل مثل Google Analytics</li>
                <li>إضافة نظام إدارة الحملات الإعلانية</li>
                <li>إضافة أداة تحليل الكلمات المفتاحية</li>
                <li>إضافة نظام تتبع النتائج في الوقت الفعلي</li>
                <li>إضافة معرض أعمال تفاعلي</li>
                <li>إضافة نظام حجز الاستشارات</li>
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
        window.removeEventListener('scroll', this.handleScroll);
    }
};

// Debug: Check if MarketingController is properly declared
console.log('MarketingController declared:', typeof MarketingController !== 'undefined');
console.log('MarketingController in window:', typeof window.MarketingController !== 'undefined');

// Explicitly attach to global scope
window.MarketingController = MarketingController;
console.log('MarketingController attached to window:', typeof window.MarketingController !== 'undefined'); 