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
    },

    /**
     * Load page data
     */
    loadData: function() {
        // Simulate loading marketing services data
        console.log('Loading marketing services data...');
        
        // Show loading state
        this.showLoadingState();
        
        // In a real app, this would fetch data from the server
        setTimeout(() => {
            this.updateServicesList();
            this.updateStats();
            this.hideLoadingState();
        }, 800);
    },

    /**
     * Set up event listeners
     */
    setupEventListeners: function() {
        // Handle service card clicks
        document.addEventListener('click', (e) => {
            if (e.target.closest('.sp-service-card')) {
                const serviceCard = e.target.closest('.sp-service-card');
                this.handleServiceCardClick(serviceCard);
            }
        });

        // Handle contact button clicks
        document.addEventListener('click', (e) => {
            if (e.target.closest('[data-action="contact"]')) {
                const button = e.target.closest('[data-action="contact"]');
                const providerId = button.getAttribute('data-provider');
                this.handleContactClick(providerId);
            }
        });

        // Handle portfolio button clicks
        document.addEventListener('click', (e) => {
            if (e.target.closest('[data-action="view-portfolio"]')) {
                const button = e.target.closest('[data-action="view-portfolio"]');
                const providerId = button.getAttribute('data-provider');
                this.handlePortfolioClick(providerId);
            }
        });

        // Handle search functionality
        const searchInput = document.querySelector('.mkt-search-input');
        if (searchInput) {
            searchInput.addEventListener('input', this.handleSearch.bind(this));
        }

        // Handle filter button
        const filterBtn = document.querySelector('.mkt-filter-btn');
        if (filterBtn) {
            filterBtn.addEventListener('click', this.handleFilter.bind(this));
        }
    },

    /**
     * Handle service card click
     */
    handleServiceCardClick: function(serviceCard) {
        const providerId = serviceCard.getAttribute('data-provider');
        const serviceTitle = serviceCard.querySelector('.sp-service-title').textContent;
        const rating = serviceCard.querySelector('.mkt-service-badge').textContent;
        
        console.log('Marketing service clicked:', providerId, serviceTitle, rating);
        
        // Show service details
        Toast.show('خدمة التسويق', `عرض تفاصيل ${serviceTitle}`, 'info');
        
        // In a real app, this would navigate to service details page
        setTimeout(() => {
            // For now, show a modal with service details
            this.showServiceDetails(providerId, serviceTitle, rating);
        }, 1000);
    },

    /**
     * Handle contact button click
     */
    handleContactClick: function(providerId) {
        const serviceData = this.getServiceData(providerId);
        
        console.log('Contact requested for:', serviceData.provider);
        
        Toast.show('طلب تواصل', `سيتم التواصل مع ${serviceData.provider} خلال 24 ساعة`, 'success');
        
        // Show contact form modal
        setTimeout(() => {
            this.showContactForm(serviceData);
        }, 1000);
    },

    /**
     * Handle portfolio button click
     */
    handlePortfolioClick: function(providerId) {
        const serviceData = this.getServiceData(providerId);
        
        console.log('Portfolio requested for:', serviceData.provider);
        
        Toast.show('معرض الأعمال', `عرض أعمال ${serviceData.provider}`, 'info');
        
        // Show portfolio modal
        setTimeout(() => {
            this.showPortfolio(serviceData);
        }, 1000);
    },

    /**
     * Show contact form modal
     */
    showContactForm: function(serviceData) {
        Modal.open('contact-form', {
            title: `طلب تواصل مع ${serviceData.provider}`,
            provider: serviceData.provider,
            contact: serviceData.contact,
            fields: [
                { name: 'name', label: 'الاسم الكامل', type: 'text', required: true },
                { name: 'company', label: 'اسم الشركة', type: 'text', required: true },
                { name: 'phone', label: 'رقم الهاتف', type: 'tel', required: true },
                { name: 'email', label: 'البريد الإلكتروني', type: 'email', required: true },
                { name: 'service_type', label: 'نوع الخدمة المطلوبة', type: 'select', options: serviceData.services },
                { name: 'budget', label: 'الميزانية المتوقعة', type: 'select', options: ['1000-3000', '3000-5000', '5000-10000', '10000+'] },
                { name: 'message', label: 'رسالة إضافية', type: 'textarea' }
            ]
        });
    },

    /**
     * Show portfolio modal
     */
    showPortfolio: function(serviceData) {
        const portfolioData = this.getPortfolioData(serviceData.provider);
        
        Modal.open('portfolio', {
            title: `معرض أعمال ${serviceData.provider}`,
            provider: serviceData.provider,
            projects: portfolioData.projects,
            stats: portfolioData.stats,
            testimonials: portfolioData.testimonials
        });
    },

    /**
     * Show service details modal
     */
    showServiceDetails: function(providerId, serviceTitle, rating) {
        const serviceData = this.getServiceData(providerId);
        
        Modal.open('service-details', {
            title: serviceTitle,
            provider: serviceData.provider,
            rating: rating,
            description: serviceData.description,
            services: serviceData.services,
            pricing: serviceData.pricing,
            contact: serviceData.contact,
            features: serviceData.features,
            guarantees: serviceData.guarantees,
            process: serviceData.process
        });
    },

    /**
     * Handle search functionality
     */
    handleSearch: function(e) {
        const searchTerm = e.target.value.toLowerCase();
        const serviceCards = document.querySelectorAll('.sp-service-card');
        
        serviceCards.forEach(card => {
            const title = card.querySelector('.sp-service-title').textContent.toLowerCase();
            const description = card.querySelector('.sp-service-desc').textContent.toLowerCase();
            const tags = Array.from(card.querySelectorAll('.mkt-service-tag')).map(tag => tag.textContent.toLowerCase());
            
            if (title.includes(searchTerm) || description.includes(searchTerm) || tags.some(tag => tag.includes(searchTerm))) {
                card.style.display = 'block';
                card.style.opacity = '1';
            } else {
                card.style.display = 'none';
                card.style.opacity = '0';
            }
        });
    },

    /**
     * Handle filter functionality
     */
    handleFilter: function() {
        console.log('Filter button clicked');
        
        // Show filter options modal
        Modal.open('filter-options', {
            title: 'تصفية خدمات التسويق',
            filters: [
                { name: 'service_type', label: 'نوع الخدمة', type: 'checkbox', options: ['SEO', 'Google Ads', 'Social Media', 'Content Marketing', 'Email Marketing', 'Analytics', 'Branding', 'Video Marketing', 'Influencer Marketing', 'E-commerce', 'Local SEO', 'Conversion Optimization'] },
                { name: 'location', label: 'الموقع', type: 'checkbox', options: ['الرياض', 'جدة', 'الدمام', 'جميع المدن'] },
                { name: 'experience', label: 'سنوات الخبرة', type: 'radio', options: ['1-3 سنوات', '4-6 سنوات', '7+ سنوات'] },
                { name: 'price_range', label: 'نطاق السعر', type: 'radio', options: ['أقل من 1000 ريال', '1000-3000 ريال', '3000-5000 ريال', 'أكثر من 5000 ريال'] },
                { name: 'rating', label: 'التقييم', type: 'radio', options: ['4.5+', '4.0+', '3.5+'] }
            ]
        });
    },

    /**
     * Update stats
     */
    updateStats: function() {
        // In a real app, this would update stats with real data
        console.log('Stats updated');
    },

    /**
     * Get portfolio data for a specific provider
     */
    getPortfolioData: function(providerName) {
        const portfolios = {
            'وكالة التسويق الرقمي المتقدمة': {
                projects: [
                    { name: 'شركة الشحن السريع', result: 'زيادة المبيعات 200%', image: 'shipping-project.jpg', description: 'حملة SEO شاملة مع إعلانات Google' },
                    { name: 'مستودعات الأمانة', result: 'تحسين ترتيب البحث', image: 'warehouse-project.jpg', description: 'تحسين محركات البحث للموقع' },
                    { name: 'شركة النقل الآمن', result: 'زيادة العملاء 150%', image: 'transport-project.jpg', description: 'حملة إعلانات مدفوعة' }
                ],
                stats: { total_projects: 45, success_rate: 95, avg_increase: 180 },
                testimonials: [
                    { author: 'أحمد محمد', company: 'شركة الشحن السريع', content: 'نتائج مذهلة في وقت قياسي' },
                    { author: 'فاطمة علي', company: 'مستودعات الأمانة', content: 'احترافية عالية ونتائج مضمونة' }
                ]
            },
            'مؤسسة التسويق الإبداعية': {
                projects: [
                    { name: 'شركة التغليف المتقدمة', result: 'زيادة المتابعين 300%', image: 'packaging-project.jpg', description: 'إدارة حسابات التواصل الاجتماعي' },
                    { name: 'مؤسسة التخليص الجمركي', result: 'تحسين التفاعل 250%', image: 'customs-project.jpg', description: 'إنشاء محتوى تفاعلي' }
                ],
                stats: { total_projects: 32, success_rate: 92, avg_increase: 220 },
                testimonials: [
                    { author: 'خالد عبدالله', company: 'شركة التغليف المتقدمة', content: 'محتوى إبداعي ومتفاعل' },
                    { author: 'نورا أحمد', company: 'مؤسسة التخليص الجمركي', content: 'نتائج تفوق التوقعات' }
                ]
            }
        };
        
        return portfolios[providerName] || {
            projects: [],
            stats: { total_projects: 0, success_rate: 0, avg_increase: 0 },
            testimonials: []
        };
    },

    /**
     * Get service data for a specific provider
     */
    getServiceData: function(providerId) {
        const servicesData = {
            'seo-expert': {
                provider: 'وكالة التسويق الرقمي المتقدمة',
                description: 'وكالة متخصصة في تحسين محركات البحث وإعلانات جوجل مع نتائج مضمونة وزيادة في المبيعات',
                services: ['SEO', 'Google Ads', 'تحليل الكلمات المفتاحية', 'تحسين المحتوى'],
                pricing: 'يبدأ من 2,000 ريال شهرياً',
                contact: '+966 50 123 4567',
                features: ['تحليل شامل للموقع', 'تحسين الكلمات المفتاحية', 'بناء الروابط', 'تقارير شهرية'],
                guarantees: ['زيادة الزيارات العضوية', 'تحسين ترتيب البحث', 'نتائج مضمونة خلال 3 أشهر'],
                process: ['تحليل الموقع', 'إعداد الاستراتيجية', 'التنفيذ', 'المتابعة والتطوير']
            },
            'social-media-pro': {
                provider: 'مؤسسة التسويق الإبداعية',
                description: 'مؤسسة متخصصة في إدارة حسابات التواصل الاجتماعي وإنشاء محتوى جذاب ومتفاعل مع العملاء',
                services: ['إدارة الحسابات', 'إنشاء المحتوى', 'التفاعل مع العملاء', 'تحليل النتائج'],
                pricing: 'يبدأ من 1,500 ريال شهرياً',
                contact: '+966 50 234 5678',
                features: ['إدارة 3 حسابات', 'إنشاء 15 منشور شهرياً', 'تفاعل يومي', 'تقارير أسبوعية'],
                guarantees: ['زيادة المتابعين', 'تحسين التفاعل', 'بناء العلاقات مع العملاء'],
                process: ['تحليل الحسابات', 'إعداد المحتوى', 'النشر والتفاعل', 'تحليل الأداء']
            },
            'content-masters': {
                provider: 'شركة المحتوى الإبداعية',
                description: 'شركة متخصصة في كتابة المحتوى الاحترافي واستراتيجيات تسويق المحتوى لبناء العلامة التجارية',
                services: ['كتابة المحتوى', 'تصميم الرسوم', 'الفيديو', 'الإنفوجرافيك'],
                pricing: 'يبدأ من 1,200 ريال شهرياً',
                contact: '+966 50 345 6789',
                features: ['محتوى أصلي ومميز', 'تصميم احترافي', 'تحسين SEO', 'تسليم في الوقت المحدد'],
                guarantees: ['محتوى عالي الجودة', 'تحسين الوعي بالعلامة', 'زيادة التفاعل'],
                process: ['فهم المتطلبات', 'إعداد المحتوى', 'المراجعة والتطوير', 'التسليم']
            },
            'email-specialists': {
                provider: 'مؤسسة التسويق عبر البريد',
                description: 'مؤسسة متخصصة في حملات البريد الإلكتروني الفعالة وأتمتة التسويق لزيادة المبيعات والتفاعل',
                services: ['قوائم البريد', 'تصميم الرسائل', 'أتمتة الحملات', 'تحليل النتائج'],
                pricing: 'يبدأ من 800 ريال شهرياً',
                contact: '+966 50 456 7890',
                features: ['تصميم رسائل جذابة', 'أتمتة الحملات', 'تحليل معدل الفتح', 'تحسين التحويل'],
                guarantees: ['زيادة معدل الفتح', 'تحسين معدل النقر', 'زيادة المبيعات'],
                process: ['بناء قائمة البريد', 'تصميم الحملة', 'الإرسال', 'تحليل النتائج']
            },
            'ads-experts': {
                provider: 'شركة الإعلانات الرقمية',
                description: 'شركة متخصصة في إدارة حملات إعلانات جوجل مع أفضل عائد على الاستثمار ونتائج مضمونة',
                services: ['إعلانات البحث', 'إعلانات العرض', 'تحسين الحملات', 'تحليل الأداء'],
                pricing: 'يبدأ من 3,000 ريال شهرياً',
                contact: '+966 50 567 8901',
                features: ['إدارة ميزانية الحملات', 'تحسين الكلمات المفتاحية', 'تحليل المنافسين', 'تقارير مفصلة'],
                guarantees: ['زيادة المبيعات', 'تحسين عائد الاستثمار', 'نتائج مضمونة'],
                process: ['تحليل السوق', 'إعداد الحملة', 'المراقبة والتحسين', 'تحليل النتائج']
            },
            'analytics-pro': {
                provider: 'شركة التسويق التحليلي',
                description: 'شركة متخصصة في تحليل البيانات وتقارير الأداء لتحسين الاستراتيجيات وزيادة النتائج',
                services: ['تحليل الأداء', 'التقارير', 'تحسين الاستراتيجيات', 'متابعة النتائج'],
                pricing: 'يبدأ من 1,800 ريال شهرياً',
                contact: '+966 50 678 9012',
                features: ['تحليل شامل للبيانات', 'تقارير شهرية', 'توصيات التحسين', 'متابعة مستمرة'],
                guarantees: ['شفافية كاملة', 'توصيات عملية', 'تحسين الأداء'],
                process: ['جمع البيانات', 'التحليل', 'إعداد التقارير', 'التوصيات']
            },
            'brand-masters': {
                provider: 'استوديو العلامات التجارية',
                description: 'استوديو متخصص في تصميم الهوية البصرية وتطوير العلامات التجارية لبناء صورة قوية',
                services: ['تصميم الشعارات', 'الهوية البصرية', 'المواد التسويقية', 'العلامات التجارية'],
                pricing: 'يبدأ من 2,500 ريال شهرياً',
                contact: '+966 50 789 0123',
                features: ['تصميم احترافي', 'هوية بصرية متكاملة', 'مواد تسويقية متنوعة', 'دعم فني'],
                guarantees: ['تصميم فريد', 'هوية متسقة', 'رضا العميل'],
                process: ['فهم العلامة', 'التصميم', 'المراجعة', 'التسليم']
            },
            'video-creators': {
                provider: 'استوديو الفيديو التسويقي',
                description: 'استوديو متخصص في إنتاج الفيديوهات التسويقية الاحترافية للمنصات المختلفة ووسائل التواصل',
                services: ['إنتاج الفيديو', 'تحرير الفيديو', 'الرسوم المتحركة', 'التوزيع'],
                pricing: 'يبدأ من 4,000 ريال شهرياً',
                contact: '+966 50 890 1234',
                features: ['إنتاج احترافي', 'تحرير متقدم', 'رسوم متحركة', 'توزيع على المنصات'],
                guarantees: ['جودة عالية', 'تسليم في الوقت', 'نتائج مضمونة'],
                process: ['كتابة السيناريو', 'التصوير', 'التحرير', 'التوزيع']
            },
            'influencer-network': {
                provider: 'شبكة المؤثرين الرقمية',
                description: 'شبكة متخصصة في ربط العلامات التجارية بالمؤثرين المناسبين لزيادة الوعي والمبيعات',
                services: ['اختيار المؤثرين', 'إدارة الحملات', 'متابعة النتائج', 'التفاعل'],
                pricing: 'يبدأ من 5,000 ريال شهرياً',
                contact: '+966 50 901 2345',
                features: ['شبكة واسعة من المؤثرين', 'إدارة الحملات', 'تحليل النتائج', 'ضمان الجودة'],
                guarantees: ['زيادة الوعي', 'تفاعل عالي', 'نتائج مضمونة'],
                process: ['اختيار المؤثرين', 'إعداد الحملة', 'التنفيذ', 'تحليل النتائج']
            },
            'ecommerce-pro': {
                provider: 'متخصصي تسويق التجارة الإلكترونية',
                description: 'متخصصون في استراتيجيات التسويق المخصصة للمتاجر الإلكترونية لزيادة المبيعات',
                services: ['تسويق المتاجر', 'تحسين التحويل', 'إدارة الحملات', 'تحليل المبيعات'],
                pricing: 'يبدأ من 2,200 ريال شهرياً',
                contact: '+966 50 012 3456',
                features: ['استراتيجيات مخصصة', 'تحسين التحويل', 'إدارة الحملات', 'تحليل المبيعات'],
                guarantees: ['زيادة المبيعات', 'تحسين التحويل', 'نتائج مضمونة'],
                process: ['تحليل المتجر', 'إعداد الاستراتيجية', 'التنفيذ', 'التحسين المستمر']
            },
            'local-seo': {
                provider: 'خبراء التسويق المحلي',
                description: 'خبراء متخصصون في تحسين الظهور في البحث المحلي وإدارة المراجعات لزيادة العملاء المحليين',
                services: ['SEO المحلي', 'إدارة المراجعات', 'خرائط جوجل', 'البحث المحلي'],
                pricing: 'يبدأ من 1,600 ريال شهرياً',
                contact: '+966 50 123 4567',
                features: ['تحسين البحث المحلي', 'إدارة المراجعات', 'تحسين خرائط جوجل', 'زيادة العملاء المحليين'],
                guarantees: ['ظهور في البحث المحلي', 'تحسين المراجعات', 'زيادة العملاء'],
                process: ['تحليل الموقع المحلي', 'التحسين', 'إدارة المراجعات', 'المتابعة']
            },
            'conversion-experts': {
                provider: 'متخصصي تحسين التحويل',
                description: 'متخصصون في تحسين معدلات التحويل واختبار A/B للحصول على أفضل النتائج والمبيعات',
                services: ['تحسين التحويل', 'اختبار A/B', 'تحليل السلوك', 'تحسين الموقع'],
                pricing: 'يبدأ من 2,800 ريال شهرياً',
                contact: '+966 50 234 5678',
                features: ['تحليل سلوك المستخدمين', 'اختبار A/B', 'تحسين التحويل', 'تقارير مفصلة'],
                guarantees: ['زيادة التحويل', 'تحسين الأداء', 'نتائج مضمونة'],
                process: ['تحليل السلوك', 'إعداد الاختبارات', 'التنفيذ', 'تحليل النتائج']
            }
        };
        
        return servicesData[providerId] || {
            provider: 'مزود خدمة غير معروف',
            description: 'لا توجد معلومات متاحة لهذا المزود',
            services: [],
            pricing: 'غير متوفر',
            contact: 'غير متوفر',
            features: [],
            guarantees: [],
            process: []
        };
    },

    /**
     * Update services list
     */
    updateServicesList: function() {
        // In a real app, this would update the services list with real data
        console.log('Marketing services list updated');
    },

    /**
     * Initialize animations
     */
    initializeAnimations: function() {
        // Add fade-in animation to cards
        const cards = document.querySelectorAll('.sp-service-card.mkt-enhanced');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });

        // Add animation to stats
        const stats = document.querySelectorAll('.mkt-stat-item');
        stats.forEach((stat, index) => {
            stat.style.opacity = '0';
            stat.style.transform = 'translateY(20px)';
            stat.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            
            setTimeout(() => {
                stat.style.opacity = '1';
                stat.style.transform = 'translateY(0)';
            }, index * 150);
        });
    },

    /**
     * Show loading state
     */
    showLoadingState: function() {
        const cards = document.querySelectorAll('.sp-service-card.mkt-enhanced');
        cards.forEach(card => {
            card.classList.add('loading');
        });
    },

    /**
     * Hide loading state
     */
    hideLoadingState: function() {
        const cards = document.querySelectorAll('.sp-service-card.mkt-enhanced');
        cards.forEach(card => {
            card.classList.remove('loading');
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
                <li>نظرة عامة على الإحصائيات مع 4 مؤشرات رئيسية</li>
                <li>بطاقات خدمات محسنة مع معلومات تفصيلية</li>
                <li>علامات الخدمات لسهولة التصنيف</li>
                <li>معلومات الموقع والخبرة وعدد العملاء</li>
                <li>عرض الأسعار بشكل واضح</li>
                <li>أزرار التواصل وعرض معرض الأعمال</li>
                <li>وظيفة البحث المتقدمة</li>
                <li>خيارات التصفية المتعددة</li>
            </ul>
            <p><strong>التحسينات التقنية:</strong></p>
            <ul>
                <li>تصميم متجاوب بالكامل مع نهج Mobile-First</li>
                <li>رسوم متحركة سلسة وتفاعلية</li>
                <li>تحسين تجربة المستخدم مع تفاعلات فورية</li>
                <li>دعم الوضع المظلم والاتجاه RTL</li>
                <li>تحميل تدريجي للمحتوى مع حالات التحميل</li>
                <li>نظام تقييمات ومراجعات</li>
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
                <li>إضافة نظام المقارنة بين الخدمات</li>
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