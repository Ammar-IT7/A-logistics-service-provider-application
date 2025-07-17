/**
 * Reports Controller
 */
const ReportsController = {
    /**
     * Initialize the reports page
     */
    init: function() {
        console.log('ReportsController initialized');
        this.setupReportTypes();
        this.setupDateRange();
        this.loadReportData();
        this.setupEventListeners();
        this.updateDesignerNotes();
    },

    /**
     * Setup report type selector
     */
    setupReportTypes: function() {
        const reportTypes = document.querySelectorAll('.report-type');
        
        reportTypes.forEach(type => {
            type.addEventListener('click', (e) => {
                // Remove active class from all types
                reportTypes.forEach(t => t.classList.remove('active'));
                // Add active class to clicked type
                e.target.closest('.report-type').classList.add('active');
                
                // Show corresponding report content
                const reportType = e.target.closest('.report-type').dataset.report;
                this.showReportContent(reportType);
            });
        });
    },

    /**
     * Show report content based on type
     */
    showReportContent: function(reportType) {
        // Hide all report contents
        document.querySelectorAll('.report-content').forEach(content => {
            content.style.display = 'none';
        });
        
        // Show selected report content
        const selectedContent = document.getElementById(`${reportType}-report`);
        if (selectedContent) {
            selectedContent.style.display = 'block';
        }
        
        // Update report data
        this.updateReportData(reportType);
    },

    /**
     * Setup date range selector
     */
    setupDateRange: function() {
        const generateBtn = document.querySelector('[data-action="generate-report"]');
        if (generateBtn) {
            generateBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.generateReport();
            });
        }
    },

    /**
     * Generate report based on selected parameters
     */
    generateReport: function() {
        const generateBtn = document.querySelector('[data-action="generate-report"]');
        if (generateBtn) {
            generateBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري التوليد...';
            generateBtn.disabled = true;
        }
        
        // Get date range
        const startDate = document.querySelector('.date-inputs input[type="date"]:first-child').value;
        const endDate = document.querySelector('.date-inputs input[type="date"]:last-child').value;
        
        // Get active report type
        const activeReportType = document.querySelector('.report-type.active').dataset.report;
        
        console.log(`Generating ${activeReportType} report from ${startDate} to ${endDate}`);
        
        // Simulate report generation
        setTimeout(() => {
            if (generateBtn) {
                generateBtn.innerHTML = '<i class="fas fa-sync-alt"></i> تحديث التقرير';
                generateBtn.disabled = false;
            }
            Toast.show('تم التوليد', 'تم توليد التقرير بنجاح', 'success');
            this.updateReportData(activeReportType);
        }, 2000);
    },

    /**
     * Update report data
     */
    updateReportData: function(reportType) {
        console.log(`Updating ${reportType} report data`);
        
        // Update summary cards based on report type
        this.updateSummaryCards(reportType);
        
        // Update charts and visualizations
        this.updateCharts(reportType);
    },

    /**
     * Update summary cards
     */
    updateSummaryCards: function(reportType) {
        const summaryData = {
            financial: {
                revenue: '125,000 ريال',
                expenses: '45,000 ريال',
                profit: '80,000 ريال',
                margin: '64%'
            },
            operational: {
                processing: '2.3 ساعة',
                completion: '94.2%',
                shipments: '156',
                utilization: '78%'
            },
            customer: {
                total: '89',
                new: '23',
                rating: '4.8',
                retention: '67%'
            },
            performance: {
                response: '4.2/5',
                quality: '4.6/5',
                satisfaction: '4.4/5',
                accuracy: '4.8/5'
            }
        };
        
        const data = summaryData[reportType];
        if (data) {
            Object.keys(data).forEach((key, index) => {
                const valueElement = document.querySelectorAll('.summary-value')[index];
                if (valueElement) {
                    valueElement.textContent = data[key];
                }
            });
        }
    },

    /**
     * Update charts
     */
    updateCharts: function(reportType) {
        console.log(`Updating charts for ${reportType} report`);
        
        // Update revenue breakdown bars
        if (reportType === 'financial') {
            this.updateRevenueBreakdown();
        }
        
        // Update performance metrics
        if (reportType === 'performance') {
            this.updatePerformanceMetrics();
        }
    },

    /**
     * Update revenue breakdown
     */
    updateRevenueBreakdown: function() {
        const breakdownData = [
            { label: 'خدمات الشحن', value: '45,000 ريال', percentage: 36 },
            { label: 'التخليص الجمركي', value: '35,000 ريال', percentage: 28 },
            { label: 'خدمات التخزين', value: '25,000 ريال', percentage: 20 },
            { label: 'خدمات التغليف', value: '15,000 ريال', percentage: 12 },
            { label: 'خدمات أخرى', value: '5,000 ريال', percentage: 4 }
        ];
        
        breakdownData.forEach((item, index) => {
            const breakdownItem = document.querySelectorAll('.breakdown-item')[index];
            if (breakdownItem) {
                const label = breakdownItem.querySelector('.breakdown-label');
                const value = breakdownItem.querySelector('.breakdown-value');
                const percentage = breakdownItem.querySelector('.breakdown-percentage');
                const barFill = breakdownItem.querySelector('.bar-fill');
                
                if (label) label.textContent = item.label;
                if (value) value.textContent = item.value;
                if (percentage) percentage.textContent = `${item.percentage}%`;
                if (barFill) barFill.style.width = `${item.percentage}%`;
            }
        });
    },

    /**
     * Update performance metrics
     */
    updatePerformanceMetrics: function() {
        const metricsData = [
            { label: 'سرعة الاستجابة', value: '4.2/5', percentage: 84 },
            { label: 'جودة الخدمة', value: '4.6/5', percentage: 92 },
            { label: 'رضا العملاء', value: '4.4/5', percentage: 88 },
            { label: 'دقة التوصيل', value: '4.8/5', percentage: 96 }
        ];
        
        metricsData.forEach((item, index) => {
            const metricItem = document.querySelectorAll('.metric-item')[index];
            if (metricItem) {
                const label = metricItem.querySelector('.metric-label');
                const value = metricItem.querySelector('.metric-value');
                const barFill = metricItem.querySelector('.bar-fill');
                
                if (label) label.textContent = item.label;
                if (value) value.textContent = item.value;
                if (barFill) barFill.style.width = `${item.percentage}%`;
            }
        });
    },

    /**
     * Load initial report data
     */
    loadReportData: function() {
        // Load financial report by default
        this.updateReportData('financial');
    },

    /**
     * Export report
     */
    exportReport: function() {
        const activeReportType = document.querySelector('.report-type.active').dataset.report;
        Toast.show('تصدير التقرير', `جاري تصدير تقرير ${activeReportType}...`, 'info');
        
        setTimeout(() => {
            Toast.show('تم التصدير', 'تم تصدير التقرير بنجاح', 'success');
        }, 2000);
    },

    /**
     * Export chart
     */
    exportChart: function() {
        Toast.show('تصدير الرسم البياني', 'جاري تصدير الرسم البياني...', 'info');
        
        setTimeout(() => {
            Toast.show('تم التصدير', 'تم تصدير الرسم البياني بنجاح', 'success');
        }, 1500);
    },

    /**
     * Set up event listeners
     */
    setupEventListeners: function() {
        const page = document.getElementById('reports');
        if (!page) return;

        // Handle export report button
        page.addEventListener('click', (e) => {
            if (e.target.closest('[data-action="export-report"]')) {
                e.preventDefault();
                this.exportReport();
            }
        });

        // Handle export chart button
        page.addEventListener('click', (e) => {
            if (e.target.closest('[data-action="export-chart"]')) {
                e.preventDefault();
                this.exportChart();
            }
        });

        // Handle detailed analytics button
        page.addEventListener('click', (e) => {
            if (e.target.closest('[data-action="view-detailed-analytics"]')) {
                e.preventDefault();
                Router.navigate('analytics');
            }
        });
    },

    /**
     * Update designer notes
     */
    updateDesignerNotes: function() {
        const notes = "صفحة التقارير تعرض تحليلات مفصلة للأداء المالي والتشغيلي. تتضمن أنواع مختلفة من التقارير مع إمكانية تحديد الفترة الزمنية وتصدير البيانات.";
        const notesContent = document.getElementById('designer-notes-content');
        if (notesContent) {
            notesContent.innerHTML = `<p>${notes}</p>`;
        }
    }
};

// Debug: Check if ReportsController is properly declared
console.log('ReportsController declared:', typeof ReportsController !== 'undefined');
console.log('ReportsController in window:', typeof window.ReportsController !== 'undefined');

// Explicitly attach to global scope
window.ReportsController = ReportsController;
console.log('ReportsController attached to window:', typeof window.ReportsController !== 'undefined'); 