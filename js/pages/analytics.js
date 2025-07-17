/**
 * Analytics Controller
 */
const AnalyticsController = {
    /**
     * Initialize the analytics page
     */
    init: function() {
        console.log('AnalyticsController initialized');
        this.setupTimeSelector();
        this.loadAnalyticsData();
        this.setupEventListeners();
        this.updateDesignerNotes();
    },

    /**
     * Setup time period selector
     */
    setupTimeSelector: function() {
        const timeButtons = document.querySelectorAll('.time-btn');
        
        timeButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                // Remove active class from all buttons
                timeButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                e.target.closest('.time-btn').classList.add('active');
                
                // Update analytics data based on period
                const period = e.target.closest('.time-btn').dataset.period;
                this.updateAnalyticsData(period);
            });
        });
    },

    /**
     * Update analytics data based on time period
     */
    updateAnalyticsData: function(period) {
        console.log(`Updating analytics data for period: ${period}`);
        
        // Show loading state
        Toast.show('تحديث البيانات', 'جاري تحديث البيانات...', 'info');
        
        // Simulate data update
        setTimeout(() => {
            this.updateMetrics(period);
            this.updateCharts(period);
            this.updateServicePerformance(period);
            this.updateGeographicData(period);
            this.updateCustomerInsights(period);
            this.updateTrends(period);
            
            Toast.show('تم التحديث', 'تم تحديث البيانات بنجاح', 'success');
        }, 1500);
    },

    /**
     * Update metrics overview
     */
    updateMetrics: function(period) {
        const metricsData = {
            '7d': {
                orders: '1,247',
                revenue: '125,000 ريال',
                customers: '89',
                conversion: '3.2%'
            },
            '30d': {
                orders: '5,234',
                revenue: '450,000 ريال',
                customers: '156',
                conversion: '3.8%'
            },
            '90d': {
                orders: '15,678',
                revenue: '1,250,000 ريال',
                customers: '234',
                conversion: '4.1%'
            },
            '1y': {
                orders: '45,890',
                revenue: '3,500,000 ريال',
                customers: '456',
                conversion: '4.5%'
            }
        };
        
        const data = metricsData[period] || metricsData['7d'];
        
        // Update metric values
        document.querySelectorAll('.metric-value').forEach((element, index) => {
            const values = Object.values(data);
            if (values[index]) {
                element.textContent = values[index];
            }
        });
    },

    /**
     * Update charts
     */
    updateCharts: function(period) {
        console.log(`Updating charts for period: ${period}`);
        
        // Update chart controls
        const chartButtons = document.querySelectorAll('.chart-btn');
        chartButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                // Remove active class from all buttons
                chartButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                e.target.closest('.chart-btn').classList.add('active');
                
                // Update chart type
                const chartType = e.target.closest('.chart-btn').dataset.chart;
                this.updateChartType(chartType);
            });
        });
    },

    /**
     * Update chart type
     */
    updateChartType: function(chartType) {
        console.log(`Switching to chart type: ${chartType}`);
        
        const chartTitle = document.querySelector('.chart-header h3');
        if (chartTitle) {
            const titles = {
                'revenue': 'تحليل الإيرادات',
                'orders': 'تحليل الطلبات',
                'customers': 'تحليل العملاء'
            };
            chartTitle.textContent = titles[chartType] || 'تحليل البيانات';
        }
    },

    /**
     * Update service performance
     */
    updateServicePerformance: function(period) {
        const performanceData = {
            '7d': [
                { name: 'خدمات الشحن', orders: 450, revenue: '45,000 ريال', performance: 75 },
                { name: 'خدمات التخزين', orders: 320, revenue: '25,000 ريال', performance: 60 },
                { name: 'التخليص الجمركي', orders: 280, revenue: '35,000 ريال', performance: 85 },
                { name: 'خدمات التغليف', orders: 197, revenue: '15,000 ريال', performance: 45 }
            ]
        };
        
        const data = performanceData[period] || performanceData['7d'];
        
        data.forEach((service, index) => {
            const serviceMetric = document.querySelectorAll('.service-metric')[index];
            if (serviceMetric) {
                const name = serviceMetric.querySelector('.service-name');
                const stats = serviceMetric.querySelector('.service-stats');
                const performance = serviceMetric.querySelector('.performance-value');
                const barFill = serviceMetric.querySelector('.bar-fill');
                
                if (name) name.textContent = service.name;
                if (stats) stats.innerHTML = `<span>${service.orders} طلب</span><span>•</span><span>${service.revenue}</span>`;
                if (performance) performance.textContent = `${service.performance}%`;
                if (barFill) barFill.style.width = `${service.performance}%`;
            }
        });
    },

    /**
     * Update geographic data
     */
    updateGeographicData: function(period) {
        const geoData = {
            '7d': [
                { region: 'الرياض', orders: 450, percentage: 36 },
                { region: 'جدة', orders: 320, percentage: 26 },
                { region: 'الدمام', orders: 280, percentage: 22 },
                { region: 'أخرى', orders: 197, percentage: 16 }
            ]
        };
        
        const data = geoData[period] || geoData['7d'];
        
        data.forEach((region, index) => {
            const geoRegion = document.querySelectorAll('.geo-region')[index];
            if (geoRegion) {
                const name = geoRegion.querySelector('.region-name');
                const orders = geoRegion.querySelector('.region-orders');
                const percentage = geoRegion.querySelector('.region-percentage');
                
                if (name) name.textContent = region.region;
                if (orders) orders.textContent = `${region.orders} طلب`;
                if (percentage) percentage.textContent = `${region.percentage}%`;
            }
        });
    },

    /**
     * Update customer insights
     */
    updateCustomerInsights: function(period) {
        const insightsData = {
            '7d': {
                new: '23',
                rating: '4.8',
                retention: '67%',
                satisfaction: '92%'
            }
        };
        
        const data = insightsData[period] || insightsData['7d'];
        
        Object.keys(data).forEach((key, index) => {
            const insightCard = document.querySelectorAll('.insight-card')[index];
            if (insightCard) {
                const value = insightCard.querySelector('.insight-value');
                if (value) value.textContent = data[key];
            }
        });
    },

    /**
     * Update trends
     */
    updateTrends: function(period) {
        const trendsData = {
            '7d': [
                { type: 'positive', title: 'زيادة في طلبات الشحن البحري', desc: 'ارتفاع بنسبة 25% في الطلبات خلال الأسبوع الماضي' },
                { type: 'positive', title: 'تحسن في أوقات التوصيل', desc: 'انخفاض متوسط وقت التوصيل بنسبة 15%' },
                { type: 'negative', title: 'انخفاض في طلبات التخزين', desc: 'انخفاض بنسبة 8% مقارنة بالشهر الماضي' },
                { type: 'positive', title: 'زيادة في العملاء من منطقة الدمام', desc: 'ارتفاع بنسبة 30% في العملاء الجدد' }
            ]
        };
        
        const data = trendsData[period] || trendsData['7d'];
        
        data.forEach((trend, index) => {
            const trendItem = document.querySelectorAll('.trend-item')[index];
            if (trendItem) {
                // Update trend type class
                trendItem.className = `trend-item ${trend.type}`;
                
                const title = trendItem.querySelector('.trend-title');
                const desc = trendItem.querySelector('.trend-desc');
                const icon = trendItem.querySelector('.trend-icon i');
                
                if (title) title.textContent = trend.title;
                if (desc) desc.textContent = trend.desc;
                if (icon) {
                    icon.className = trend.type === 'positive' ? 'fas fa-arrow-up' : 'fas fa-arrow-down';
                }
            }
        });
    },

    /**
     * Load initial analytics data
     */
    loadAnalyticsData: function() {
        // Load 7-day data by default
        this.updateAnalyticsData('7d');
    },

    /**
     * Export analytics
     */
    exportAnalytics: function() {
        const activePeriod = document.querySelector('.time-btn.active').dataset.period;
        Toast.show('تصدير التحليلات', `جاري تصدير تحليلات الفترة ${activePeriod}...`, 'info');
        
        setTimeout(() => {
            Toast.show('تم التصدير', 'تم تصدير التحليلات بنجاح', 'success');
        }, 2000);
    },

    /**
     * Set up event listeners
     */
    setupEventListeners: function() {
        const page = document.getElementById('analytics');
        if (!page) return;

        // Handle export analytics button
        page.addEventListener('click', (e) => {
            if (e.target.closest('[data-action="export-analytics"]')) {
                e.preventDefault();
                this.exportAnalytics();
            }
        });

        // Handle detailed analytics button
        page.addEventListener('click', (e) => {
            if (e.target.closest('[data-action="view-detailed-analytics"]')) {
                e.preventDefault();
                Router.navigate('reports');
            }
        });
    },

    /**
     * Update designer notes
     */
    updateDesignerNotes: function() {
        const notes = "صفحة التحليلات تعرض مؤشرات الأداء التفصيلية والرسوم البيانية. تتضمن تحليل الخدمات والتوزيع الجغرافي ورؤى العملاء مع إمكانية تحديد الفترة الزمنية.";
        const notesContent = document.getElementById('designer-notes-content');
        if (notesContent) {
            notesContent.innerHTML = `<p>${notes}</p>`;
        }
    }
};

// Debug: Check if AnalyticsController is properly declared
console.log('AnalyticsController declared:', typeof AnalyticsController !== 'undefined');
console.log('AnalyticsController in window:', typeof window.AnalyticsController !== 'undefined');

// Explicitly attach to global scope
window.AnalyticsController = AnalyticsController;
console.log('AnalyticsController attached to window:', typeof window.AnalyticsController !== 'undefined'); 