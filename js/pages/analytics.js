/**
 * Analytics Controller - Modern Enhanced Version
 */
const AnalyticsController = {
    /**
     * Analytics data structure
     */
    data: {
        currentPeriod: '7d',
        metrics: {
            totalOrders: 1247,
            totalRevenue: 125000,
            activeCustomers: 89,
            conversionRate: 3.2
        },
        services: [
            {
                name: 'خدمات الشحن',
                icon: 'fas fa-truck',
                orders: 450,
                revenue: 45000,
                performance: 75,
                trend: '+12%'
            },
            {
                name: 'خدمات التخزين',
                icon: 'fas fa-warehouse',
                orders: 320,
                revenue: 25000,
                performance: 60,
                trend: '+8%'
            },
            {
                name: 'خدمات التخليص الجمركي',
                icon: 'fas fa-shipping-fast',
                orders: 280,
                revenue: 35000,
                performance: 85,
                trend: '+15%'
            },
            {
                name: 'خدمات التغليف',
                icon: 'fas fa-box',
                orders: 197,
                revenue: 20000,
                performance: 45,
                trend: '+5%'
            }
        ],
        customers: [
            {
                name: 'عملاء جدد',
                icon: 'fas fa-user-plus',
                value: '+23',
                label: 'عملاء جدد',
                trend: '+15% من الشهر الماضي',
                type: 'positive'
            },
            {
                name: 'معدل الاحتفاظ',
                icon: 'fas fa-user-check',
                value: '89%',
                label: 'معدل الاحتفاظ',
                trend: '+5% من الشهر الماضي',
                type: 'positive'
            },
            {
                name: 'متوسط التقييم',
                icon: 'fas fa-star',
                value: '4.8',
                label: 'متوسط التقييم',
                trend: '+0.2 من الشهر الماضي',
                type: 'positive'
            },
            {
                name: 'مراجعات إيجابية',
                icon: 'fas fa-comments',
                value: '156',
                label: 'مراجعات إيجابية',
                trend: '+12 من الشهر الماضي',
                type: 'positive'
            }
        ]
    },

    /**
     * Initialize the analytics page
     */
    init: function() {
        console.log('AnalyticsController initialized');
        this.setupEventListeners();
        this.loadAnalyticsData();
        this.addAnimations();
        this.initializeCharts();
        this.setupRealTimeUpdates();
    },
    
    /**
     * Set up page-specific event listeners
     */
    setupEventListeners: function() {
        const analyticsPage = document.getElementById('analytics');
        if (!analyticsPage) return;
        
        // Handle time period selection with enhanced UX
        analyticsPage.addEventListener('click', (e) => {
            const timeBtn = e.target.closest('.anl-time-btn');
            if (timeBtn) {
                e.preventDefault();
                this.handleTimePeriodChange(timeBtn);
            }
        });
        
        // Handle chart type selection
        analyticsPage.addEventListener('click', (e) => {
            const chartBtn = e.target.closest('.anl-chart-btn');
            if (chartBtn) {
                e.preventDefault();
                this.handleChartTypeChange(chartBtn);
            }
        });
        
        // Handle action buttons with enhanced feedback
        analyticsPage.addEventListener('click', (e) => {
            const actionBtn = e.target.closest('.anl-btn');
            if (actionBtn) {
                e.preventDefault();
                const action = actionBtn.dataset.action;
                this.handleAction(action, actionBtn);
            }
        });
        
        // Handle export analytics with loading state
        analyticsPage.addEventListener('click', (e) => {
            if (e.target.closest('[data-action="export-analytics"]')) {
                e.preventDefault();
                this.exportAnalytics();
            }
        });

        // Handle metric card interactions
        analyticsPage.addEventListener('click', (e) => {
            const metricCard = e.target.closest('.anl-metric-card');
            if (metricCard) {
                this.handleMetricCardClick(metricCard);
            }
        });

        // Handle service metric interactions
        analyticsPage.addEventListener('click', (e) => {
            const serviceMetric = e.target.closest('.anl-service-metric');
            if (serviceMetric) {
                this.handleServiceMetricClick(serviceMetric);
            }
        });
    },
    
    /**
     * Handle time period change with enhanced UX
     */
    handleTimePeriodChange: function(timeBtn) {
        const period = timeBtn.dataset.period;
        
        // Add loading state
        this.addLoadingState();
        
        // Remove active class from all buttons
        document.querySelectorAll('.anl-time-btn').forEach(btn => {
            btn.classList.remove('anl-active');
        });
        
        // Add active class to selected button with animation
        timeBtn.classList.add('anl-active');
        
        // Update analytics data based on period
        this.updateAnalyticsData(period);
        
        const periodNames = {
            '7d': '7 أيام',
            '30d': '30 يوم',
            '90d': '3 أشهر',
            '1y': 'سنة',
            'custom': 'فترة مخصصة'
        };
        
        // Show success feedback
        Toast.show('تحديث البيانات', `تم تحديث البيانات لـ ${periodNames[period]}`, 'success');
        
        // Remove loading state after delay
        setTimeout(() => {
            this.removeLoadingState();
        }, 1000);
    },
    
    /**
     * Handle chart type change with enhanced UX
     */
    handleChartTypeChange: function(chartBtn) {
        const chartType = chartBtn.dataset.chart;
        
        // Remove active class from all buttons
        document.querySelectorAll('.anl-chart-btn').forEach(btn => {
            btn.classList.remove('anl-active');
        });
        
        // Add active class to selected button
        chartBtn.classList.add('anl-active');
        
        // Update chart based on type with animation
        this.updateChart(chartType);
        
        const chartNames = {
            'revenue': 'الإيرادات',
            'orders': 'الطلبات',
            'customers': 'العملاء'
        };
        
        Toast.show('تحديث الرسم البياني', `تم تغيير الرسم البياني إلى ${chartNames[chartType]}`, 'info');
    },
    
    /**
     * Handle action buttons with enhanced feedback
     */
    handleAction: function(action, button) {
        // Add button loading state
        const originalText = button.innerHTML;
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري التحميل...';
        button.disabled = true;
        
        setTimeout(() => {
            switch (action) {
                case 'view-detailed-analytics':
                    this.viewDetailedAnalytics();
                    break;
                case 'view-customer-details':
                    this.viewCustomerDetails();
                    break;
                default:
                    console.log(`Unknown analytics action: ${action}`);
            }
            
            // Restore button state
            button.innerHTML = originalText;
            button.disabled = false;
        }, 500);
    },
    
    /**
     * Handle metric card click
     */
    handleMetricCardClick: function(metricCard) {
        const metricTitle = metricCard.querySelector('.anl-metric-title').textContent;
        Toast.show('تفاصيل المقياس', `عرض تفاصيل ${metricTitle}`, 'info');
        
        // Add click animation
        metricCard.style.transform = 'scale(0.98)';
        setTimeout(() => {
            metricCard.style.transform = '';
        }, 150);
    },
    
    /**
     * Handle service metric click
     */
    handleServiceMetricClick: function(serviceMetric) {
        const serviceName = serviceMetric.querySelector('.anl-service-name').textContent;
        Toast.show('تفاصيل الخدمة', `عرض تفاصيل ${serviceName}`, 'info');
        
        // Add click animation
        serviceMetric.style.transform = 'scale(0.98)';
        setTimeout(() => {
            serviceMetric.style.transform = '';
        }, 150);
    },
    
    /**
     * View detailed analytics
     */
    viewDetailedAnalytics: function() {
        Toast.show('التحليل المفصل', 'جاري فتح صفحة التحليل المفصل...', 'info');
        
        setTimeout(() => {
            Router.navigate('detailed-analytics');
        }, 1000);
    },
    
    /**
     * View customer details
     */
    viewCustomerDetails: function() {
        Toast.show('تفاصيل العملاء', 'جاري فتح صفحة تفاصيل العملاء...', 'info');
        
        setTimeout(() => {
            Router.navigate('customer-details');
        }, 1000);
    },
    
    /**
     * Export analytics data with enhanced UX
     */
    exportAnalytics: function() {
        Toast.show('تصدير التحليلات', 'جاري تحضير ملف التصدير...', 'info');
        
        // Simulate export process
        setTimeout(() => {
            const link = document.createElement('a');
            link.href = '#';
            link.download = `analytics-report-${new Date().toISOString().split('T')[0]}.csv`;
            link.click();
            Toast.show('تصدير التحليلات', 'تم تصدير البيانات بنجاح', 'success');
        }, 2000);
    },
    
    /**
     * Load analytics data with enhanced loading states
     */
    loadAnalyticsData: function() {
        // Add loading states to all sections
        this.addLoadingState();
        
        // Simulate loading analytics data
        setTimeout(() => {
            this.updateMetrics();
            this.updateServicePerformance();
            this.updateCustomerMetrics();
            this.removeLoadingState();
        }, 800);
    },
    
    /**
     * Update analytics data based on period
     */
    updateAnalyticsData: function(period) {
        this.data.currentPeriod = period;
        
        // Simulate data update with realistic variations
        const variations = {
            '7d': { orders: 1.0, revenue: 1.0, customers: 1.0, conversion: 1.0 },
            '30d': { orders: 1.2, revenue: 1.15, customers: 1.1, conversion: 0.95 },
            '90d': { orders: 1.4, revenue: 1.3, customers: 1.2, conversion: 0.9 },
            '1y': { orders: 1.6, revenue: 1.5, customers: 1.3, conversion: 0.85 }
        };
        
        const variation = variations[period] || variations['7d'];
        
        // Update metrics with realistic data
        this.data.metrics.totalOrders = Math.round(1247 * variation.orders);
        this.data.metrics.totalRevenue = Math.round(125000 * variation.revenue);
        this.data.metrics.activeCustomers = Math.round(89 * variation.customers);
        this.data.metrics.conversionRate = Math.round(3.2 * variation.conversion * 100) / 100;
        
        // Simulate data update
        setTimeout(() => {
            this.updateMetrics();
            this.updateServicePerformance();
            this.updateCustomerMetrics();
        }, 300);
    },
    
    /**
     * Update metrics with enhanced animations
     */
    updateMetrics: function() {
        const metricCards = document.querySelectorAll('.anl-metric-card');
        metricCards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
            card.classList.add('anl-fade-in');
            
            // Animate metric values
            const valueElement = card.querySelector('.anl-metric-value');
            if (valueElement) {
                this.animateValue(valueElement, this.data.metrics);
            }
        });
    },
    
    /**
     * Animate numeric values
     */
    animateValue: function(element, metrics) {
        const text = element.textContent;
        const isCurrency = text.includes('ريال');
        const isPercentage = text.includes('%');
        
        let targetValue = 0;
        if (isCurrency) {
            targetValue = metrics.totalRevenue;
        } else if (isPercentage) {
            targetValue = metrics.conversionRate;
        } else if (text.includes('عملاء')) {
            targetValue = metrics.activeCustomers;
        } else {
            targetValue = metrics.totalOrders;
        }
        
        // Animate the value
        this.animateNumber(element, targetValue, isCurrency, isPercentage);
    },
    
    /**
     * Animate number with smooth transitions
     */
    animateNumber: function(element, target, isCurrency, isPercentage) {
        const start = 0;
        const duration = 1000;
        const startTime = performance.now();
        
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const current = start + (target - start) * this.easeOutQuart(progress);
            
            if (isCurrency) {
                element.textContent = `${Math.round(current).toLocaleString()} ريال`;
            } else if (isPercentage) {
                element.textContent = `${current.toFixed(1)}%`;
            } else {
                element.textContent = Math.round(current).toLocaleString();
            }
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        requestAnimationFrame(animate);
    },
    
    /**
     * Easing function for smooth animations
     */
    easeOutQuart: function(t) {
        return 1 - Math.pow(1 - t, 4);
    },
    
    /**
     * Update service performance with enhanced animations
     */
    updateServicePerformance: function() {
        const serviceMetrics = document.querySelectorAll('.anl-service-metric');
        serviceMetrics.forEach((metric, index) => {
            metric.style.animationDelay = `${index * 0.05}s`;
            metric.classList.add('anl-slide-in');
            
            // Animate performance bars
            const barFill = metric.querySelector('.anl-bar-fill');
            if (barFill) {
                const performance = this.data.services[index]?.performance || 0;
                setTimeout(() => {
                    barFill.style.width = `${performance}%`;
                }, index * 100);
            }
        });
    },
    
    /**
     * Update customer metrics with enhanced animations
     */
    updateCustomerMetrics: function() {
        const customerMetrics = document.querySelectorAll('.anl-customer-metric');
        customerMetrics.forEach((metric, index) => {
            metric.style.animationDelay = `${index * 0.05}s`;
            metric.classList.add('anl-scale-in');
        });
    },
    
    /**
     * Update chart with enhanced animations
     */
    updateChart: function(chartType) {
        const chartPlaceholder = document.querySelector('.anl-chart-placeholder');
        if (!chartPlaceholder) return;
        
        const chartTitles = {
            'revenue': 'تحليل الإيرادات',
            'orders': 'تحليل الطلبات',
            'customers': 'تحليل العملاء'
        };
        
        const chartDescriptions = {
            'revenue': 'رسم بياني تفاعلي للإيرادات',
            'orders': 'رسم بياني تفاعلي للطلبات',
            'customers': 'رسم بياني تفاعلي للعملاء'
        };
        
        // Animate chart update
        chartPlaceholder.style.opacity = '0';
        chartPlaceholder.style.transform = 'scale(0.9)';
        
        setTimeout(() => {
            chartPlaceholder.querySelector('p').textContent = chartDescriptions[chartType];
            document.querySelector('.anl-chart-header h3').textContent = chartTitles[chartType];
            
            chartPlaceholder.style.opacity = '1';
            chartPlaceholder.style.transform = 'scale(1)';
        }, 200);
    },
    
    /**
     * Initialize charts with enhanced animations
     */
    initializeCharts: function() {
        // Simulate chart initialization
        setTimeout(() => {
            this.animateChartLines();
        }, 1000);
    },
    
    /**
     * Animate chart lines with enhanced effects
     */
    animateChartLines: function() {
        const chartLines = document.querySelectorAll('.anl-chart-line');
        chartLines.forEach((line, index) => {
            setTimeout(() => {
                line.style.animation = 'anlFadeIn 0.3s ease-out';
                line.style.opacity = '1';
            }, index * 50);
        });
    },
    
    /**
     * Add loading state
     */
    addLoadingState: function() {
        const analyticsPage = document.getElementById('analytics');
        if (analyticsPage) {
            analyticsPage.classList.add('anl-loading');
        }
    },
    
    /**
     * Remove loading state
     */
    removeLoadingState: function() {
        const analyticsPage = document.getElementById('analytics');
        if (analyticsPage) {
            analyticsPage.classList.remove('anl-loading');
        }
    },
    
    /**
     * Add animations to analytics elements
     */
    addAnimations: function() {
        const analyticsPage = document.getElementById('analytics');
        if (!analyticsPage) return;
        
        // Add fade-in animation to time selector
        const timeButtons = analyticsPage.querySelectorAll('.anl-time-btn');
        timeButtons.forEach((btn, index) => {
            btn.style.animationDelay = `${index * 0.05}s`;
            btn.classList.add('anl-fade-in');
        });
        
        // Add fade-in animation to metric cards
        const metricCards = analyticsPage.querySelectorAll('.anl-metric-card');
        metricCards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
            card.classList.add('anl-fade-in');
        });
        
        // Add slide-in animation to service metrics
        const serviceMetrics = analyticsPage.querySelectorAll('.anl-service-metric');
        serviceMetrics.forEach((metric, index) => {
            metric.style.animationDelay = `${index * 0.05}s`;
            metric.classList.add('anl-slide-in');
        });
        
        // Add scale-in animation to customer metrics
        const customerMetrics = analyticsPage.querySelectorAll('.anl-customer-metric');
        customerMetrics.forEach((metric, index) => {
            metric.style.animationDelay = `${index * 0.05}s`;
            metric.classList.add('anl-scale-in');
        });
    },
    
    /**
     * Setup real-time updates
     */
    setupRealTimeUpdates: function() {
        // Update metrics every 30 seconds
        setInterval(() => {
            this.updateMetrics();
        }, 30000);
    },
    
    /**
     * Refresh analytics data with enhanced UX
     */
    refreshData: function() {
        Toast.show('تحديث البيانات', 'جاري تحديث البيانات...', 'info');
        
        this.addLoadingState();
        
        setTimeout(() => {
            this.loadAnalyticsData();
            Toast.show('تحديث البيانات', 'تم تحديث البيانات بنجاح', 'success');
        }, 1500);
    },
    
    /**
     * Get analytics summary
     */
    getAnalyticsSummary: function() {
        return {
            totalOrders: this.data.metrics.totalOrders,
            totalRevenue: this.data.metrics.totalRevenue,
            activeCustomers: this.data.metrics.activeCustomers,
            conversionRate: this.data.metrics.conversionRate,
            period: this.data.currentPeriod
        };
    }
};

// Explicitly attach to global scope
window.AnalyticsController = AnalyticsController; 