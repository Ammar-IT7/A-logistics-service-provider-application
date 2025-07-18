/**
 * Marketing Services Page Controller
 */
const MarketingController = {
    // Filter state
    activeFilters: {
        service_type: [],
        location: [],
        experience: '',
        price_range: '',
        rating: ''
    },

    // Service data with metadata for filtering
    servicesData: {
        'seo-expert': {
            provider: 'وكالة التسويق الرقمي المتقدمة',
            description: 'وكالة متخصصة في تحسين محركات البحث وإعلانات جوجل مع نتائج مضمونة وزيادة في المبيعات',
            services: ['SEO', 'Google Ads', 'تحليل الكلمات المفتاحية', 'تحسين المحتوى'],
            pricing: 'يبدأ من 2,000 ريال شهرياً',
            price_value: 2000,
            contact: '+966 50 123 4567',
            location: ['الرياض', 'جدة', 'الدمام'],
            experience: 7,
            rating: 4.8,
            features: ['تحليل شامل للموقع', 'تحسين الكلمات المفتاحية', 'بناء الروابط', 'تقارير شهرية'],
            guarantees: ['زيادة الزيارات العضوية', 'تحسين ترتيب البحث', 'نتائج مضمونة خلال 3 أشهر'],
            process: ['تحليل الموقع', 'إعداد الاستراتيجية', 'التنفيذ', 'المتابعة والتطوير']
        },
        'social-media-pro': {
            provider: 'مؤسسة التسويق الإبداعية',
            description: 'مؤسسة متخصصة في إدارة حسابات التواصل الاجتماعي وإنشاء محتوى جذاب ومتفاعل مع العملاء',
            services: ['إدارة الحسابات', 'إنشاء المحتوى', 'التفاعل مع العملاء', 'تحليل النتائج'],
            pricing: 'يبدأ من 1,500 ريال شهرياً',
            price_value: 1500,
            contact: '+966 50 234 5678',
            location: ['الرياض', 'جدة'],
            experience: 5,
            rating: 4.6,
            features: ['إدارة 3 حسابات', 'إنشاء 15 منشور شهرياً', 'تفاعل يومي', 'تقارير أسبوعية'],
            guarantees: ['زيادة المتابعين', 'تحسين التفاعل', 'بناء العلاقات مع العملاء'],
            process: ['تحليل الحسابات', 'إعداد المحتوى', 'النشر والتفاعل', 'تحليل الأداء']
        },
        'content-masters': {
            provider: 'شركة المحتوى الإبداعية',
            description: 'شركة متخصصة في كتابة المحتوى الاحترافي واستراتيجيات تسويق المحتوى لبناء العلامة التجارية',
            services: ['كتابة المحتوى', 'تصميم الرسوم', 'الفيديو', 'الإنفوجرافيك'],
            pricing: 'يبدأ من 1,200 ريال شهرياً',
            price_value: 1200,
            contact: '+966 50 345 6789',
            location: ['الرياض', 'الدمام'],
            experience: 6,
            rating: 4.7,
            features: ['محتوى أصلي ومميز', 'تصميم احترافي', 'تحسين SEO', 'تسليم في الوقت المحدد'],
            guarantees: ['محتوى عالي الجودة', 'تحسين الوعي بالعلامة', 'زيادة التفاعل'],
            process: ['فهم المتطلبات', 'إعداد المحتوى', 'المراجعة والتطوير', 'التسليم']
        },
        'email-specialists': {
            provider: 'مؤسسة التسويق عبر البريد',
            description: 'مؤسسة متخصصة في حملات البريد الإلكتروني الفعالة وأتمتة التسويق لزيادة المبيعات والتفاعل',
            services: ['قوائم البريد', 'تصميم الرسائل', 'أتمتة الحملات', 'تحليل النتائج'],
            pricing: 'يبدأ من 800 ريال شهرياً',
            price_value: 800,
            contact: '+966 50 456 7890',
            location: ['الرياض'],
            experience: 4,
            rating: 4.5,
            features: ['تصميم رسائل جذابة', 'أتمتة الحملات', 'تحليل معدل الفتح', 'تحسين التحويل'],
            guarantees: ['زيادة معدل الفتح', 'تحسين معدل النقر', 'زيادة المبيعات'],
            process: ['بناء قائمة البريد', 'تصميم الحملة', 'الإرسال', 'تحليل النتائج']
        },
        'ads-experts': {
            provider: 'شركة الإعلانات الرقمية',
            description: 'شركة متخصصة في إدارة حملات إعلانات جوجل مع أفضل عائد على الاستثمار ونتائج مضمونة',
            services: ['إعلانات البحث', 'إعلانات العرض', 'تحسين الحملات', 'تحليل الأداء'],
            pricing: 'يبدأ من 3,000 ريال شهرياً',
            price_value: 3000,
            contact: '+966 50 567 8901',
            location: ['الرياض', 'جدة', 'الدمام'],
            experience: 8,
            rating: 4.9,
            features: ['إدارة ميزانية الحملات', 'تحسين الكلمات المفتاحية', 'تحليل المنافسين', 'تقارير مفصلة'],
            guarantees: ['زيادة المبيعات', 'تحسين عائد الاستثمار', 'نتائج مضمونة'],
            process: ['تحليل السوق', 'إعداد الحملة', 'المراقبة والتحسين', 'تحليل النتائج']
        },
        'analytics-pro': {
            provider: 'شركة التسويق التحليلي',
            description: 'شركة متخصصة في تحليل البيانات وتقارير الأداء لتحسين الاستراتيجيات وزيادة النتائج',
            services: ['تحليل الأداء', 'التقارير', 'تحسين الاستراتيجيات', 'متابعة النتائج'],
            pricing: 'يبدأ من 1,800 ريال شهرياً',
            price_value: 1800,
            contact: '+966 50 678 9012',
            location: ['الرياض', 'جدة'],
            experience: 6,
            rating: 4.8,
            features: ['تحليل شامل للبيانات', 'تقارير شهرية', 'توصيات التحسين', 'متابعة مستمرة'],
            guarantees: ['شفافية كاملة', 'توصيات عملية', 'تحسين الأداء'],
            process: ['جمع البيانات', 'التحليل', 'إعداد التقارير', 'التوصيات']
        },
        'brand-masters': {
            provider: 'استوديو العلامات التجارية',
            description: 'استوديو متخصص في تصميم الهوية البصرية وتطوير العلامات التجارية لبناء صورة قوية',
            services: ['تصميم الشعارات', 'الهوية البصرية', 'المواد التسويقية', 'العلامات التجارية'],
            pricing: 'يبدأ من 2,500 ريال شهرياً',
            price_value: 2500,
            contact: '+966 50 789 0123',
            location: ['الرياض', 'الدمام'],
            experience: 7,
            rating: 4.7,
            features: ['تصميم احترافي', 'هوية بصرية متكاملة', 'مواد تسويقية متنوعة', 'دعم فني'],
            guarantees: ['تصميم فريد', 'هوية متسقة', 'رضا العميل'],
            process: ['فهم العلامة', 'التصميم', 'المراجعة', 'التسليم']
        },
        'video-creators': {
            provider: 'استوديو الفيديو التسويقي',
            description: 'استوديو متخصص في إنتاج الفيديوهات التسويقية الاحترافية للمنصات المختلفة ووسائل التواصل',
            services: ['إنتاج الفيديو', 'تحرير الفيديو', 'الرسوم المتحركة', 'التوزيع'],
            pricing: 'يبدأ من 4,000 ريال شهرياً',
            price_value: 4000,
            contact: '+966 50 890 1234',
            location: ['الرياض', 'جدة'],
            experience: 5,
            rating: 4.6,
            features: ['إنتاج احترافي', 'تحرير متقدم', 'رسوم متحركة', 'توزيع على المنصات'],
            guarantees: ['جودة عالية', 'تسليم في الوقت', 'نتائج مضمونة'],
            process: ['كتابة السيناريو', 'التصوير', 'التحرير', 'التوزيع']
        },
        'influencer-network': {
            provider: 'شبكة المؤثرين الرقمية',
            description: 'شبكة متخصصة في ربط العلامات التجارية بالمؤثرين المناسبين لزيادة الوعي والمبيعات',
            services: ['اختيار المؤثرين', 'إدارة الحملات', 'متابعة النتائج', 'التفاعل'],
            pricing: 'يبدأ من 5,000 ريال شهرياً',
            price_value: 5000,
            contact: '+966 50 901 2345',
            location: ['الرياض', 'جدة', 'الدمام'],
            experience: 4,
            rating: 4.5,
            features: ['شبكة واسعة من المؤثرين', 'إدارة الحملات', 'تحليل النتائج', 'ضمان الجودة'],
            guarantees: ['زيادة الوعي', 'تفاعل عالي', 'نتائج مضمونة'],
            process: ['اختيار المؤثرين', 'إعداد الحملة', 'التنفيذ', 'تحليل النتائج']
        },
        'ecommerce-pro': {
            provider: 'متخصصي تسويق التجارة الإلكترونية',
            description: 'متخصصون في استراتيجيات التسويق المخصصة للمتاجر الإلكترونية لزيادة المبيعات',
            services: ['تسويق المتاجر', 'تحسين التحويل', 'إدارة الحملات', 'تحليل المبيعات'],
            pricing: 'يبدأ من 2,200 ريال شهرياً',
            price_value: 2200,
            contact: '+966 50 012 3456',
            location: ['الرياض', 'جدة'],
            experience: 6,
            rating: 4.8,
            features: ['استراتيجيات مخصصة', 'تحسين التحويل', 'إدارة الحملات', 'تحليل المبيعات'],
            guarantees: ['زيادة المبيعات', 'تحسين التحويل', 'نتائج مضمونة'],
            process: ['تحليل المتجر', 'إعداد الاستراتيجية', 'التنفيذ', 'التحسين المستمر']
        },
        'local-seo': {
            provider: 'خبراء التسويق المحلي',
            description: 'خبراء متخصصون في تحسين الظهور في البحث المحلي وإدارة المراجعات لزيادة العملاء المحليين',
            services: ['SEO المحلي', 'إدارة المراجعات', 'خرائط جوجل', 'البحث المحلي'],
            pricing: 'يبدأ من 1,600 ريال شهرياً',
            price_value: 1600,
            contact: '+966 50 123 4567',
            location: ['جميع المدن'],
            experience: 5,
            rating: 4.7,
            features: ['تحسين البحث المحلي', 'إدارة المراجعات', 'تحسين خرائط جوجل', 'زيادة العملاء المحليين'],
            guarantees: ['ظهور في البحث المحلي', 'تحسين المراجعات', 'زيادة العملاء'],
            process: ['تحليل الموقع المحلي', 'التحسين', 'إدارة المراجعات', 'المتابعة']
        },
        'conversion-experts': {
            provider: 'متخصصي تحسين التحويل',
            description: 'متخصصون في تحسين معدلات التحويل واختبار A/B للحصول على أفضل النتائج والمبيعات',
            services: ['تحسين التحويل', 'اختبار A/B', 'تحليل السلوك', 'تحسين الموقع'],
            pricing: 'يبدأ من 2,800 ريال شهرياً',
            price_value: 2800,
            contact: '+966 50 234 5678',
            location: ['الرياض', 'جدة', 'الدمام'],
            experience: 7,
            rating: 4.9,
            features: ['تحليل سلوك المستخدمين', 'اختبار A/B', 'تحسين التحويل', 'تقارير مفصلة'],
            guarantees: ['زيادة التحويل', 'تحسين الأداء', 'نتائج مضمونة'],
            process: ['تحليل السلوك', 'إعداد الاختبارات', 'التنفيذ', 'تحليل النتائج']
        }
    },

    /**
     * Initialize the controller
     */
    init: function() {
        console.log('MarketingController initialized');
        this.loadData();
        this.setupEventListeners();
        this.updateDesignerNotes();
        this.initializeAnimations();
        this.createFilterChips();
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

        // Handle filter chip removal
        document.addEventListener('click', (e) => {
            if (e.target.closest('.mkt-filter-chip-remove')) {
                const chip = e.target.closest('.mkt-filter-chip');
                this.removeFilterChip(chip);
            }
        });

        // Handle clear all filters
        document.addEventListener('click', (e) => {
            if (e.target.closest('.mkt-clear-filters')) {
                this.clearAllFilters();
            }
        });
    },

    /**
     * Create filter chips container
     */
    createFilterChips: function() {
        const searchBar = document.querySelector('.mkt-search-bar');
        if (!searchBar) return;

        // Create filter chips container
        const filterChipsContainer = document.createElement('div');
        filterChipsContainer.className = 'mkt-filter-chips';
        filterChipsContainer.style.display = 'none';
        
        // Insert after search bar
        searchBar.parentNode.insertBefore(filterChipsContainer, searchBar.nextSibling);
    },

    /**
     * Update filter chips display
     */
    updateFilterChips: function() {
        const filterChipsContainer = document.querySelector('.mkt-filter-chips');
        if (!filterChipsContainer) return;

        const activeFilters = this.getActiveFiltersList();
        
        if (activeFilters.length === 0) {
            filterChipsContainer.style.display = 'none';
            return;
        }

        filterChipsContainer.style.display = 'flex';
        filterChipsContainer.innerHTML = `
            <div class="mkt-filter-chips-content">
                ${activeFilters.map(filter => `
                    <div class="mkt-filter-chip" data-filter-type="${filter.type}" data-filter-value="${filter.value}">
                        <span class="mkt-filter-chip-text">${filter.label}</span>
                        <button class="mkt-filter-chip-remove" aria-label="إزالة الفلتر">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                `).join('')}
            </div>
            <button class="mkt-clear-filters" aria-label="مسح جميع الفلاتر">
                مسح الكل
            </button>
        `;
    },

    /**
     * Get active filters as a list
     */
    getActiveFiltersList: function() {
        const filters = [];
        
        // Service types
        this.activeFilters.service_type.forEach(type => {
            filters.push({ type: 'service_type', value: type, label: type });
        });
        
        // Locations
        this.activeFilters.location.forEach(location => {
            filters.push({ type: 'location', value: location, label: location });
        });
        
        // Experience
        if (this.activeFilters.experience) {
            filters.push({ type: 'experience', value: this.activeFilters.experience, label: this.activeFilters.experience });
        }
        
        // Price range
        if (this.activeFilters.price_range) {
            filters.push({ type: 'price_range', value: this.activeFilters.price_range, label: this.activeFilters.price_range });
        }
        
        // Rating
        if (this.activeFilters.rating) {
            filters.push({ type: 'rating', value: this.activeFilters.rating, label: this.activeFilters.rating });
        }
        
        return filters;
    },

    /**
     * Remove a specific filter chip
     */
    removeFilterChip: function(chip) {
        const filterType = chip.getAttribute('data-filter-type');
        const filterValue = chip.getAttribute('data-filter-value');
        
        if (filterType === 'service_type' || filterType === 'location') {
            const index = this.activeFilters[filterType].indexOf(filterValue);
            if (index > -1) {
                this.activeFilters[filterType].splice(index, 1);
            }
        } else {
            this.activeFilters[filterType] = '';
        }
        
        this.applyFilters();
        this.updateFilterChips();
        this.updateFilterButtonState();
    },

    /**
     * Clear all active filters
     */
    clearAllFilters: function() {
        this.activeFilters = {
            service_type: [],
            location: [],
            experience: '',
            price_range: '',
            rating: ''
        };
        
        this.applyFilters();
        this.updateFilterChips();
        this.updateFilterButtonState();
        
        Toast.show('تم مسح الفلاتر', 'تم إزالة جميع الفلاتر النشطة', 'info');
    },

    /**
     * Update filter button state
     */
    updateFilterButtonState: function() {
        const filterBtn = document.querySelector('.mkt-filter-btn');
        if (!filterBtn) return;

        const hasActiveFilters = this.getActiveFiltersList().length > 0;
        
        if (hasActiveFilters) {
            filterBtn.classList.add('active');
            filterBtn.innerHTML = `
                <i class="fas fa-sliders-h"></i>
                <span>تصفية (${this.getActiveFiltersList().length})</span>
            `;
        } else {
            filterBtn.classList.remove('active');
            filterBtn.innerHTML = `
                <i class="fas fa-sliders-h"></i>
                <span>تصفية</span>
            `;
        }
    },

    /**
     * Apply all active filters
     */
    applyFilters: function() {
        const serviceCards = document.querySelectorAll('.sp-service-card.mkt-enhanced');
        let visibleCount = 0;
        
        serviceCards.forEach(card => {
            const providerId = card.getAttribute('data-provider');
            const serviceData = this.servicesData[providerId];
            
            if (!serviceData) {
                card.style.display = 'none';
                return;
            }
            
            const isVisible = this.matchesFilters(serviceData);
            
            if (isVisible) {
                card.style.display = 'block';
                card.style.opacity = '1';
                visibleCount++;
            } else {
                card.style.display = 'none';
                card.style.opacity = '0';
            }
        });
        
        // Update results count
        this.updateResultsCount(visibleCount);
        
        // Show no results message if needed
        if (visibleCount === 0) {
            this.showNoResultsMessage();
        } else {
            this.hideNoResultsMessage();
        }
    },

    /**
     * Check if service data matches active filters
     */
    matchesFilters: function(serviceData) {
        // Service type filter
        if (this.activeFilters.service_type.length > 0) {
            const hasMatchingService = this.activeFilters.service_type.some(filterType => 
                serviceData.services.some(service => 
                    service.toLowerCase().includes(filterType.toLowerCase()) ||
                    this.getServiceTypeMapping(filterType).some(mapping => 
                        service.toLowerCase().includes(mapping.toLowerCase())
                    )
                )
            );
            if (!hasMatchingService) return false;
        }
        
        // Location filter
        if (this.activeFilters.location.length > 0) {
            const hasMatchingLocation = this.activeFilters.location.some(filterLocation => 
                serviceData.location.some(location => 
                    location === filterLocation || 
                    (filterLocation === 'جميع المدن' && location === 'جميع المدن')
                )
            );
            if (!hasMatchingLocation) return false;
        }
        
        // Experience filter
        if (this.activeFilters.experience) {
            const experienceRange = this.getExperienceRange(this.activeFilters.experience);
            if (serviceData.experience < experienceRange.min || serviceData.experience > experienceRange.max) {
                return false;
            }
        }
        
        // Price range filter
        if (this.activeFilters.price_range) {
            const priceRange = this.getPriceRange(this.activeFilters.price_range);
            if (serviceData.price_value < priceRange.min || serviceData.price_value > priceRange.max) {
                return false;
            }
        }
        
        // Rating filter
        if (this.activeFilters.rating) {
            const minRating = parseFloat(this.activeFilters.rating);
            if (serviceData.rating < minRating) {
                return false;
            }
        }
        
        return true;
    },

    /**
     * Get service type mapping for better matching
     */
    getServiceTypeMapping: function(filterType) {
        const mappings = {
            'SEO': ['seo', 'تحسين محركات البحث', 'تحسين البحث'],
            'Google Ads': ['google ads', 'إعلانات جوجل', 'إعلانات البحث'],
            'Social Media': ['وسائل التواصل', 'التواصل الاجتماعي', 'إدارة الحسابات'],
            'Content Marketing': ['تسويق المحتوى', 'كتابة المحتوى', 'إنشاء المحتوى'],
            'Email Marketing': ['البريد الإلكتروني', 'أتمتة التسويق', 'قوائم البريد'],
            'Analytics': ['تحليل البيانات', 'التقارير', 'تحليل الأداء'],
            'Branding': ['العلامات التجارية', 'الهوية البصرية', 'تصميم الشعارات'],
            'Video Marketing': ['الفيديو', 'إنتاج الفيديو', 'تحرير الفيديو'],
            'Influencer Marketing': ['المؤثرين', 'إدارة الحملات'],
            'E-commerce': ['التجارة الإلكترونية', 'تسويق المتاجر'],
            'Local SEO': ['SEO المحلي', 'البحث المحلي', 'خرائط جوجل'],
            'Conversion Optimization': ['تحسين التحويل', 'اختبار A/B', 'تحليل السلوك']
        };
        
        return mappings[filterType] || [filterType];
    },

    /**
     * Get experience range from filter value
     */
    getExperienceRange: function(experienceFilter) {
        const ranges = {
            '1-3 سنوات': { min: 1, max: 3 },
            '4-6 سنوات': { min: 4, max: 6 },
            '7+ سنوات': { min: 7, max: 99 }
        };
        
        return ranges[experienceFilter] || { min: 0, max: 99 };
    },

    /**
     * Get price range from filter value
     */
    getPriceRange: function(priceFilter) {
        const ranges = {
            'أقل من 1000 ريال': { min: 0, max: 999 },
            '1000-3000 ريال': { min: 1000, max: 3000 },
            '3000-5000 ريال': { min: 3000, max: 5000 },
            'أكثر من 5000 ريال': { min: 5000, max: 99999 }
        };
        
        return ranges[priceFilter] || { min: 0, max: 99999 };
    },

    /**
     * Update results count display
     */
    updateResultsCount: function(count) {
        let resultsCountElement = document.querySelector('.mkt-results-count');
        
        if (!resultsCountElement) {
            const searchBar = document.querySelector('.mkt-search-bar');
            if (searchBar) {
                resultsCountElement = document.createElement('div');
                resultsCountElement.className = 'mkt-results-count';
                searchBar.parentNode.insertBefore(resultsCountElement, searchBar.nextSibling);
            }
        }
        
        if (resultsCountElement) {
            resultsCountElement.textContent = `تم العثور على ${count} خدمة`;
            resultsCountElement.style.display = count > 0 ? 'block' : 'none';
        }
    },

    /**
     * Show no results message
     */
    showNoResultsMessage: function() {
        let noResultsElement = document.querySelector('.mkt-no-results');
        
        if (!noResultsElement) {
            const serviceCards = document.querySelector('.sp-service-cards');
            if (serviceCards) {
                noResultsElement = document.createElement('div');
                noResultsElement.className = 'mkt-no-results';
                noResultsElement.innerHTML = `
                    <div class="mkt-no-results-content">
                        <i class="fas fa-search"></i>
                        <h3>لا توجد نتائج</h3>
                        <p>جرب تغيير الفلاتر أو البحث بكلمات مختلفة</p>
                        <button class="btn btn-primary" onclick="MarketingController.clearAllFilters()">
                            مسح جميع الفلاتر
                        </button>
                    </div>
                `;
                serviceCards.appendChild(noResultsElement);
            }
        }
        
        if (noResultsElement) {
            noResultsElement.style.display = 'block';
        }
    },

    /**
     * Hide no results message
     */
    hideNoResultsMessage: function() {
        const noResultsElement = document.querySelector('.mkt-no-results');
        if (noResultsElement) {
            noResultsElement.style.display = 'none';
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
        const serviceData = this.servicesData[providerId];
        
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
        const serviceData = this.servicesData[providerId];
        
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
        const serviceData = this.servicesData[providerId];
        
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
        const serviceCards = document.querySelectorAll('.sp-service-card.mkt-enhanced');
        let visibleCount = 0;
        
        serviceCards.forEach(card => {
            const title = card.querySelector('.sp-service-title').textContent.toLowerCase();
            const description = card.querySelector('.sp-service-desc').textContent.toLowerCase();
            const tags = Array.from(card.querySelectorAll('.mkt-service-tag')).map(tag => tag.textContent.toLowerCase());
            
            const matchesSearch = title.includes(searchTerm) || 
                                description.includes(searchTerm) || 
                                tags.some(tag => tag.includes(searchTerm));
            
            // Apply both search and filters
            const providerId = card.getAttribute('data-provider');
            const serviceData = this.servicesData[providerId];
            const matchesFilters = serviceData ? this.matchesFilters(serviceData) : false;
            
            if (matchesSearch && matchesFilters) {
                card.style.display = 'block';
                card.style.opacity = '1';
                visibleCount++;
            } else {
                card.style.display = 'none';
                card.style.opacity = '0';
            }
        });
        
        // Update results count
        this.updateResultsCount(visibleCount);
        
        // Show no results message if needed
        if (visibleCount === 0) {
            this.showNoResultsMessage();
        } else {
            this.hideNoResultsMessage();
        }
    },

    /**
     * Handle filter functionality
     */
    handleFilter: function() {
        console.log('Filter button clicked');
        
        // Open the filter modal
        Modal.open('filter-options');
        
        // Set up modal event listeners after modal is loaded
        setTimeout(() => {
            this.setupFilterModalEvents();
            this.populateFilterForm();
        }, 100);
    },

    /**
     * Set up filter modal event listeners
     */
    setupFilterModalEvents: function() {
        const modal = document.getElementById('filter-options');
        if (!modal) return;

        // Apply filters button
        const applyBtn = modal.querySelector('[data-action="apply-filters"]');
        if (applyBtn) {
            applyBtn.addEventListener('click', () => {
                this.applyFilterForm();
            });
        }

        // Clear filters button
        const clearBtn = modal.querySelector('[data-action="clear-filters"]');
        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                this.clearFilterForm();
            });
        }

        // Close modal button
        const closeBtn = modal.querySelector('[data-action="close-modal"]');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                Modal.close('filter-options');
            });
        }

        // Quick action buttons
        const selectAllBtn = modal.querySelector('[data-action="select-all"]');
        if (selectAllBtn) {
            selectAllBtn.addEventListener('click', () => {
                this.selectAllFilters();
            });
        }

        const clearAllBtn = modal.querySelector('[data-action="clear-all"]');
        if (clearAllBtn) {
            clearAllBtn.addEventListener('click', () => {
                this.clearAllFilters();
            });
        }

        const popularFiltersBtn = modal.querySelector('[data-action="popular-filters"]');
        if (popularFiltersBtn) {
            popularFiltersBtn.addEventListener('click', () => {
                this.applyPopularFilters();
            });
        }

        // Collapsible sections
        const sectionHeaders = modal.querySelectorAll('.mkt-filter-section-header');
        sectionHeaders.forEach(header => {
            header.addEventListener('click', () => {
                this.toggleFilterSection(header);
            });
        });

        // Filter option changes
        const filterInputs = modal.querySelectorAll('input[type="checkbox"], input[type="radio"]');
        filterInputs.forEach(input => {
            input.addEventListener('change', () => {
                this.updateFilterCounts();
                this.updateActiveFiltersCount();
            });
        });
    },

    /**
     * Toggle filter section collapse/expand
     */
    toggleFilterSection: function(header) {
        const section = header.closest('.mkt-filter-section');
        const toggle = header.querySelector('.mkt-filter-toggle i');
        const options = section.querySelector('.mkt-filter-options');
        
        if (section.classList.contains('collapsed')) {
            section.classList.remove('collapsed');
            toggle.style.transform = 'rotate(0deg)';
            options.style.display = 'grid';
        } else {
            section.classList.add('collapsed');
            toggle.style.transform = 'rotate(-90deg)';
            options.style.display = 'none';
        }
    },

    /**
     * Select all filters in a section
     */
    selectAllFilters: function() {
        const modal = document.getElementById('filter-options');
        if (!modal) return;

        const checkboxes = modal.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.checked = true;
        });

        this.updateFilterCounts();
        this.updateActiveFiltersCount();
        
        Toast.show('تم تحديد الكل', 'تم تحديد جميع خيارات الفلترة', 'success');
    },

    /**
     * Apply popular filters
     */
    applyPopularFilters: function() {
        const modal = document.getElementById('filter-options');
        if (!modal) return;

        // Clear all first
        this.clearFilterForm();

        // Apply popular combinations
        const popularFilters = {
            'service_type': ['SEO', 'Google Ads', 'Social Media'],
            'location': ['الرياض', 'جدة'],
            'experience': '4-6 سنوات',
            'price_range': '1000-3000 ريال',
            'rating': '4.0+'
        };

        // Apply service types
        popularFilters.service_type.forEach(serviceType => {
            const checkbox = modal.querySelector(`input[name="service_type"][value="${serviceType}"]`);
            if (checkbox) checkbox.checked = true;
        });

        // Apply locations
        popularFilters.location.forEach(location => {
            const checkbox = modal.querySelector(`input[name="location"][value="${location}"]`);
            if (checkbox) checkbox.checked = true;
        });

        // Apply experience
        const experienceRadio = modal.querySelector(`input[name="experience"][value="${popularFilters.experience}"]`);
        if (experienceRadio) experienceRadio.checked = true;

        // Apply price range
        const priceRadio = modal.querySelector(`input[name="price_range"][value="${popularFilters.price_range}"]`);
        if (priceRadio) priceRadio.checked = true;

        // Apply rating
        const ratingRadio = modal.querySelector(`input[name="rating"][value="${popularFilters.rating}"]`);
        if (ratingRadio) ratingRadio.checked = true;

        this.updateFilterCounts();
        this.updateActiveFiltersCount();
        
        Toast.show('الفلاتر الشائعة', 'تم تطبيق الفلاتر الأكثر شعبية', 'success');
    },

    /**
     * Update filter counts for each section
     */
    updateFilterCounts: function() {
        const modal = document.getElementById('filter-options');
        if (!modal) return;

        // Update service type count
        const serviceTypeCheckboxes = modal.querySelectorAll('input[name="service_type"]:checked');
        const serviceTypeCount = serviceTypeCheckboxes.length;
        const serviceTypeCountElement = modal.querySelector('[data-section="service-type"] .mkt-filter-count');
        if (serviceTypeCountElement) {
            serviceTypeCountElement.textContent = `${serviceTypeCount} محدد`;
            serviceTypeCountElement.style.display = serviceTypeCount > 0 ? 'inline' : 'none';
        }

        // Update location count
        const locationCheckboxes = modal.querySelectorAll('input[name="location"]:checked');
        const locationCount = locationCheckboxes.length;
        const locationCountElement = modal.querySelector('[data-section="location"] .mkt-filter-count');
        if (locationCountElement) {
            locationCountElement.textContent = `${locationCount} محدد`;
            locationCountElement.style.display = locationCount > 0 ? 'inline' : 'none';
        }
    },

    /**
     * Update active filters count in footer
     */
    updateActiveFiltersCount: function() {
        const modal = document.getElementById('filter-options');
        if (!modal) return;

        const activeFiltersCount = this.getActiveFiltersList().length;
        const countElement = modal.querySelector('.mkt-filter-active-filters-count');
        
        if (countElement) {
            if (activeFiltersCount === 0) {
                countElement.textContent = 'لا توجد فلاتر نشطة';
            } else if (activeFiltersCount === 1) {
                countElement.textContent = 'فلتر واحد نشط';
            } else {
                countElement.textContent = `${activeFiltersCount} فلاتر نشطة`;
            }
        }
    },

    /**
     * Populate filter form with current active filters
     */
    populateFilterForm: function() {
        const modal = document.getElementById('filter-options');
        if (!modal) return;

        // Populate service type checkboxes
        this.activeFilters.service_type.forEach(serviceType => {
            const checkbox = modal.querySelector(`input[name="service_type"][value="${serviceType}"]`);
            if (checkbox) checkbox.checked = true;
        });

        // Populate location checkboxes
        this.activeFilters.location.forEach(location => {
            const checkbox = modal.querySelector(`input[name="location"][value="${location}"]`);
            if (checkbox) checkbox.checked = true;
        });

        // Populate experience radio
        if (this.activeFilters.experience) {
            const radio = modal.querySelector(`input[name="experience"][value="${this.activeFilters.experience}"]`);
            if (radio) radio.checked = true;
        }

        // Populate price range radio
        if (this.activeFilters.price_range) {
            const radio = modal.querySelector(`input[name="price_range"][value="${this.activeFilters.price_range}"]`);
            if (radio) radio.checked = true;
        }

        // Populate rating radio
        if (this.activeFilters.rating) {
            const radio = modal.querySelector(`input[name="rating"][value="${this.activeFilters.rating}"]`);
            if (radio) radio.checked = true;
        }

        // Update counts after populating
        this.updateFilterCounts();
        this.updateActiveFiltersCount();
    },

    /**
     * Apply filters from the form
     */
    applyFilterForm: function() {
        const modal = document.getElementById('filter-options');
        if (!modal) return;

        // Get form data
        const formData = new FormData(modal.querySelector('#filter-form'));
        
        // Reset active filters
        this.activeFilters = {
            service_type: [],
            location: [],
            experience: '',
            price_range: '',
            rating: ''
        };

        // Collect service types
        const serviceTypes = formData.getAll('service_type');
        this.activeFilters.service_type = serviceTypes;

        // Collect locations
        const locations = formData.getAll('location');
        this.activeFilters.location = locations;

        // Get single values
        this.activeFilters.experience = formData.get('experience') || '';
        this.activeFilters.price_range = formData.get('price_range') || '';
        this.activeFilters.rating = formData.get('rating') || '';

        // Apply filters
        this.applyFilters();
        this.updateFilterChips();
        this.updateFilterButtonState();

        // Close modal
        Modal.close('filter-options');

        // Show success message
        const activeFiltersCount = this.getActiveFiltersList().length;
        if (activeFiltersCount > 0) {
            const visibleCount = document.querySelectorAll('.sp-service-card.mkt-enhanced[style*="display: block"]').length;
            Toast.show('تم تطبيق الفلاتر', `تم العثور على ${visibleCount} خدمة`, 'success');
        } else {
            Toast.show('تم مسح الفلاتر', 'تم إزالة جميع الفلاتر النشطة', 'info');
        }
    },

    /**
     * Clear filter form
     */
    clearFilterForm: function() {
        const modal = document.getElementById('filter-options');
        if (!modal) return;

        // Uncheck all checkboxes and radios
        const inputs = modal.querySelectorAll('input[type="checkbox"], input[type="radio"]');
        inputs.forEach(input => {
            input.checked = false;
        });

        // Clear active filters
        this.clearAllFilters();
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
        return this.servicesData[providerId] || {
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
     * Update stats
     */
    updateStats: function() {
        // In a real app, this would update stats with real data
        console.log('Stats updated');
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
            <h4>صفحة خدمات التسويق الرقمي المحسنة مع نظام تصفية متقدم</h4>
            <p>تم تطوير الصفحة لتشمل:</p>
            <ul>
                <li>نظرة عامة على الإحصائيات مع 4 مؤشرات رئيسية</li>
                <li>بطاقات خدمات محسنة مع معلومات تفصيلية</li>
                <li>علامات الخدمات لسهولة التصنيف</li>
                <li>معلومات الموقع والخبرة وعدد العملاء</li>
                <li>عرض الأسعار بشكل واضح</li>
                <li>أزرار التواصل وعرض معرض الأعمال</li>
                <li>نظام بحث متقدم مع تصفية فورية</li>
                <li>نظام تصفية شامل مع شرائح تفاعلية</li>
                <li>إدارة حالة الفلاتر مع إمكانية المسح</li>
                <li>رسائل "لا توجد نتائج" مع اقتراحات</li>
                <li>عرض عدد النتائج المطابقة</li>
            </ul>
            <p><strong>التحسينات التقنية:</strong></p>
            <ul>
                <li>تصميم متجاوب بالكامل مع نهج Mobile-First</li>
                <li>رسوم متحركة سلسة وتفاعلية</li>
                <li>تحسين تجربة المستخدم مع تفاعلات فورية</li>
                <li>دعم الاتجاه RTL</li>
                <li>تحميل تدريجي للمحتوى مع حالات التحميل</li>
                <li>نظام تقييمات ومراجعات</li>
                <li>إدارة حالة الفلاتر المتقدمة</li>
                <li>خوارزمية مطابقة ذكية للفلاتر</li>
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
                <li>إضافة حفظ تفضيلات الفلاتر</li>
                <li>إضافة تصفية متقدمة بالذكاء الاصطناعي</li>
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