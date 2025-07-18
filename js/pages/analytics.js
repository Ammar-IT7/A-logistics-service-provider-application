/**
 * Analytics Controller - Updated for prefixed CSS classes and Arabic text
 */
const AnalyticsController = {
    /**
     * Initialize the analytics page
     */
    init: function() {
        console.log('AnalyticsController initialized');
        this.setupEventListeners();
        this.loadAnalyticsData();
        this.addAnimations();
        this.initializeCharts();
    },
    
    /**
     * Set up page-specific event listeners
     */
    setupEventListeners: function() {
        const analyticsPage = document.getElementById('analytics');
        if (!analyticsPage) return;
        
        // Handle time period selection
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
        
        // Handle action buttons
        analyticsPage.addEventListener('click', (e) => {
            const actionBtn = e.target.closest('.anl-btn');
            if (actionBtn) {
                e.preventDefault();
                const action = actionBtn.dataset.action;
                this.handleAction(action, actionBtn);
            }
        });
        
        // Handle export analytics
        analyticsPage.addEventListener('click', (e) => {
            if (e.target.closest('[data-action="export-analytics"]')) {
                e.preventDefault();
                this.exportAnalytics();
            }
        });
    },
    
    /**
     * Handle time period change
     */
    handleTimePeriodChange: function(timeBtn) {
        const period = timeBtn.dataset.period;
        
        // Remove active class from all buttons
        document.querySelectorAll('.anl-time-btn').forEach(btn => {
            btn.classList.remove('anl-active');
        });
        
        // Add active class to selected button
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
        
        Toast.show('تحديث البيانات', `تم تحديث البيانات لـ ${periodNames[period]}`, 'info');
    },
    
    /**
     * Handle chart type change
     */
    handleChartTypeChange: function(chartBtn) {
        const chartType = chartBtn.dataset.chart;
        
        // Remove active class from all buttons
        document.querySelectorAll('.anl-chart-btn').forEach(btn => {
            btn.classList.remove('anl-active');
        });
        
        // Add active class to selected button
        chartBtn.classList.add('anl-active');
        
        // Update chart based on type
        this.updateChart(chartType);
        
        const chartNames = {
            'revenue': 'الإيرادات',
            'orders': 'الطلبات',
            'customers': 'العملاء'
        };
        
        Toast.show('تحديث الرسم البياني', `تم تغيير الرسم البياني إلى ${chartNames[chartType]}`, 'info');
    },
    
    /**
     * Handle action buttons
     */
    handleAction: function(action, button) {
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
     * Export analytics data
     */
    exportAnalytics: function() {
        Toast.show('تصدير التحليلات', 'جاري تصدير بيانات التحليلات...', 'info');
        
        setTimeout(() => {
            const link = document.createElement('a');
            link.href = '#';
            link.download = 'analytics-report.csv';
            link.click();
            Toast.show('تصدير التحليلات', 'تم تصدير البيانات بنجاح', 'success');
        }, 2000);
    },
    
    /**
     * Load analytics data
     */
    loadAnalyticsData: function() {
        // Simulate loading analytics data
        setTimeout(() => {
            this.updateMetrics();
            this.updateServicePerformance();
            this.updateCustomerMetrics();
        }, 500);
    },
    
    /**
     * Update analytics data based on period
     */
    updateAnalyticsData: function(period) {
        // Simulate data update
        setTimeout(() => {
            this.updateMetrics();
            this.updateServicePerformance();
            this.updateCustomerMetrics();
        }, 300);
    },
    
    /**
     * Update metrics
     */
    updateMetrics: function() {
        const metricCards = document.querySelectorAll('.anl-metric-card');
        metricCards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
            card.classList.add('anl-fade-in');
        });
    },
    
    /**
     * Update service performance
     */
    updateServicePerformance: function() {
        const serviceMetrics = document.querySelectorAll('.anl-service-metric');
        serviceMetrics.forEach((metric, index) => {
            metric.style.animationDelay = `${index * 0.05}s`;
            metric.classList.add('anl-slide-in');
        });
    },
    
    /**
     * Update customer metrics
     */
    updateCustomerMetrics: function() {
        const customerMetrics = document.querySelectorAll('.anl-customer-metric');
        customerMetrics.forEach((metric, index) => {
            metric.style.animationDelay = `${index * 0.05}s`;
            metric.classList.add('anl-scale-in');
        });
    },
    
    /**
     * Update chart
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
        
        chartPlaceholder.querySelector('p').textContent = chartDescriptions[chartType];
        document.querySelector('.anl-chart-header h3').textContent = chartTitles[chartType];
        
        // Add animation to chart update
        chartPlaceholder.style.animation = 'anlScaleIn 0.4s ease-out';
        setTimeout(() => {
            chartPlaceholder.style.animation = '';
        }, 400);
    },
    
    /**
     * Initialize charts
     */
    initializeCharts: function() {
        // Simulate chart initialization
        setTimeout(() => {
            this.animateChartLines();
        }, 1000);
    },
    
    /**
     * Animate chart lines
     */
    animateChartLines: function() {
        const chartLines = document.querySelectorAll('.anl-chart-line');
        chartLines.forEach((line, index) => {
            setTimeout(() => {
                line.style.animation = 'anlFadeIn 0.3s ease-out';
            }, index * 50);
        });
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
     * Refresh analytics data
     */
    refreshData: function() {
        Toast.show('تحديث البيانات', 'جاري تحديث البيانات...', 'info');
        
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
            totalOrders: 1247,
            totalRevenue: 125000,
            activeCustomers: 89,
            conversionRate: 3.2,
            period: '7d'
        };
    }
};

// Explicitly attach to global scope
window.AnalyticsController = AnalyticsController; 