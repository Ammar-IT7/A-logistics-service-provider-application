/**
 * Reports Controller - Modern Design with Enhanced UX for Logistics Service Providers
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
        this.initializeAnimations();
        
        // Reconnect menu buttons for drawer functionality
        if (typeof DrawerHelper !== 'undefined') {
            DrawerHelper.reconnectMenuButtons();
        }
    },

    /**
     * Setup report type selector with enhanced interactions
     */
    setupReportTypes: function() {
        const reportTypes = document.querySelectorAll('.report-type');
        
        reportTypes.forEach(type => {
            type.addEventListener('click', (e) => {
                // Add loading state
                this.showLoadingState();
                
                // Remove active class from all types
                reportTypes.forEach(t => t.classList.remove('active'));
                // Add active class to clicked type
                e.target.closest('.report-type').classList.add('active');
                
                // Show corresponding report content with animation
                const reportType = e.target.closest('.report-type').dataset.report;
                this.showReportContent(reportType);
            });
        });
    },

    /**
     * Show report content with smooth transitions
     */
    showReportContent: function(reportType) {
        // Hide all report contents with fade out
        document.querySelectorAll('.report-content').forEach(content => {
            content.style.opacity = '0';
            content.style.transform = 'translateY(20px)';
            setTimeout(() => {
                content.style.display = 'none';
            }, 300);
        });
        
        // Show selected report content with fade in
        setTimeout(() => {
            const selectedContent = document.getElementById(`${reportType}-report`);
            if (selectedContent) {
                selectedContent.style.display = 'block';
                setTimeout(() => {
                    selectedContent.style.opacity = '1';
                    selectedContent.style.transform = 'translateY(0)';
                }, 50);
            }
            
            // Update report data
            this.updateReportData(reportType);
            
            // Hide loading state
            this.hideLoadingState();
        }, 300);
    },

    /**
     * Show loading state
     */
    showLoadingState: function() {
        const generateBtn = document.querySelector('[data-action="generate-report"]');
        if (generateBtn) {
            generateBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري التحميل...';
            generateBtn.disabled = true;
        }
    },

    /**
     * Hide loading state
     */
    hideLoadingState: function() {
        const generateBtn = document.querySelector('[data-action="generate-report"]');
        if (generateBtn) {
            generateBtn.innerHTML = '<i class="fas fa-sync-alt"></i> تحديث التقرير';
            generateBtn.disabled = false;
        }
    },

    /**
     * Setup date range selector with enhanced UX
     */
    setupDateRange: function() {
        const generateBtn = document.querySelector('[data-action="generate-report"]');
        if (generateBtn) {
            generateBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.generateReport();
            });
        }

        // Add date input validation and real-time updates
        const dateInputs = document.querySelectorAll('.report-date-input input');
        dateInputs.forEach(input => {
            input.addEventListener('change', () => {
                this.validateDateRange();
            });
        });
    },

    /**
     * Validate date range
     */
    validateDateRange: function() {
        const startDate = document.querySelector('.report-date-inputs input[type="date"]:first-child').value;
        const endDate = document.querySelector('.report-date-inputs input[type="date"]:last-child').value;
        
        if (startDate && endDate && startDate > endDate) {
            Toast.show('خطأ في التاريخ', 'تاريخ البداية يجب أن يكون قبل تاريخ النهاية', 'error');
            return false;
        }
        return true;
    },

    /**
     * Generate report with enhanced feedback
     */
    generateReport: function() {
        if (!this.validateDateRange()) {
            return;
        }

        const generateBtn = document.querySelector('[data-action="generate-report"]');
        if (generateBtn) {
            generateBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري التوليد...';
            generateBtn.disabled = true;
        }
        
        // Get date range
        const startDate = document.querySelector('.report-date-inputs input[type="date"]:first-child').value;
        const endDate = document.querySelector('.report-date-inputs input[type="date"]:last-child').value;
        
        // Get active report type
        const activeReportType = document.querySelector('.report-type.active').dataset.report;
        
        console.log(`Generating ${activeReportType} report from ${startDate} to ${endDate}`);
        
        // Show progress toast
        Toast.show('توليد التقرير', 'جاري تحليل البيانات وتوليد التقرير...', 'info');
        
        // Simulate report generation with progress
        setTimeout(() => {
            Toast.show('تحليل البيانات', 'جاري معالجة البيانات المالية...', 'info');
        }, 500);
        
        setTimeout(() => {
            Toast.show('إنشاء الرسوم البيانية', 'جاري إنشاء الرسوم البيانية والتحليلات...', 'info');
        }, 1500);
        
        setTimeout(() => {
            if (generateBtn) {
                generateBtn.innerHTML = '<i class="fas fa-sync-alt"></i> تحديث التقرير';
                generateBtn.disabled = false;
            }
            Toast.show('تم التوليد بنجاح', 'تم توليد التقرير وتحديث جميع البيانات', 'success');
            this.updateReportData(activeReportType);
            this.animateDataUpdates();
        }, 2500);
    },

    /**
     * Animate data updates
     */
    animateDataUpdates: function() {
        // Animate summary cards
        document.querySelectorAll('.report-summary-value').forEach((element, index) => {
            setTimeout(() => {
                element.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    element.style.transform = 'scale(1)';
                }, 200);
            }, index * 100);
        });

        // Animate progress bars
        document.querySelectorAll('.report-bar-fill').forEach((bar, index) => {
            const currentWidth = bar.style.width;
            bar.style.width = '0%';
            setTimeout(() => {
                bar.style.width = currentWidth;
            }, index * 50);
        });
    },

    /**
     * Update report data with enhanced information for logistics services
     */
    updateReportData: function(reportType) {
        console.log(`Updating ${reportType} report data`);
        
        // Update summary cards based on report type
        this.updateSummaryCards(reportType);
        
        // Update charts and visualizations
        this.updateCharts(reportType);
        
        // Update performance metrics
        this.updatePerformanceMetrics(reportType);
    },

    /**
     * Update summary cards with realistic logistics data
     */
    updateSummaryCards: function(reportType) {
        const summaryData = {
            financial: {
                revenue: '2,847,500 ريال',
                expenses: '1,234,800 ريال',
                profit: '1,612,700 ريال',
                margin: '56.7%'
            },
            'service-performance': {
                shipments: '1,247',
                warehouseUtilization: '85%',
                customsClearance: '234',
                packagingOrders: '1,856',
                lastMileDelivery: '98.2%',
                lcProcessing: '45'
            },
            operational: {
                processing: '1.8 ساعة',
                completion: '96.8%',
                shipments: '234',
                utilization: '82%',
                onTime: '98.2%',
                complaints: '1.2%'
            },
            customer: {
                total: '1,247',
                new: '89',
                rating: '4.8',
                retention: '78%',
                vip: '156',
                avgOrders: '2.3'
            },
            logistics: {
                routes: '1,856',
                coverage: '24',
                vehicles: '156',
                warehouses: '12',
                ports: '8',
                airports: '6'
            },
            compliance: {
                safety: '100%',
                quality: '98.7%',
                customs: '99.2%',
                packaging: '97.8%',
                training: '100%',
                certificates: '15'
            }
        };
        
        const data = summaryData[reportType];
        if (data) {
            Object.keys(data).forEach((key, index) => {
                const valueElement = document.querySelectorAll('.report-summary-value')[index];
                if (valueElement) {
                    valueElement.textContent = data[key];
                }
            });
        }
    },

    /**
     * Update charts with enhanced visualizations for logistics
     */
    updateCharts: function(reportType) {
        console.log(`Updating charts for ${reportType} report`);
        
        // Update revenue breakdown bars with animation
        if (reportType === 'financial') {
            this.updateRevenueBreakdown();
        }
        
        // Update logistics performance metrics
        if (reportType === 'logistics') {
            this.updateLogisticsMetrics();
        }
        
        // Update service performance metrics
        if (reportType === 'service-performance') {
            this.updateServicePerformanceMetrics();
        }
        
        // Update compliance metrics
        if (reportType === 'compliance') {
            this.updateComplianceMetrics();
        }
    },

    /**
     * Update revenue breakdown with detailed logistics data
     */
    updateRevenueBreakdown: function() {
        const breakdownData = [
            { label: 'خدمات الشحن (جوي/بحري/بري)', value: '1,025,100 ريال - 36% من الإيرادات', percentage: 36 },
            { label: 'التخليص الجمركي', value: '797,250 ريال - 28% من الإيرادات', percentage: 28 },
            { label: 'خدمات التخزين والمستودعات', value: '569,500 ريال - 20% من الإيرادات', percentage: 20 },
            { label: 'خدمات التغليف والتعبئة', value: '341,700 ريال - 12% من الإيرادات', percentage: 12 },
            { label: 'التوصيل النهائي وخطابات الاعتماد', value: '113,950 ريال - 4% من الإيرادات', percentage: 4 }
        ];
        
        breakdownData.forEach((item, index) => {
            const breakdownItem = document.querySelectorAll('.report-breakdown-item')[index];
            if (breakdownItem) {
                const label = breakdownItem.querySelector('.report-breakdown-label');
                const value = breakdownItem.querySelector('.report-breakdown-value');
                const percentage = breakdownItem.querySelector('.report-breakdown-percentage');
                const barFill = breakdownItem.querySelector('.report-bar-fill');
                
                if (label) label.textContent = item.label;
                if (value) value.textContent = item.value;
                if (percentage) percentage.textContent = `${item.percentage}%`;
                if (barFill) {
                    barFill.style.width = '0%';
                    setTimeout(() => {
                        barFill.style.width = `${item.percentage}%`;
                    }, index * 100);
                }
            }
        });
    },

    /**
     * Update logistics performance metrics
     */
    updateLogisticsMetrics: function() {
        const metricsData = [
            { label: 'متوسط وقت النقل البري', value: '2.4 يوم', percentage: 88 },
            { label: 'متوسط وقت النقل البحري', value: '8.2 يوم', percentage: 92 },
            { label: 'متوسط وقت النقل الجوي', value: '1.1 يوم', percentage: 95 },
            { label: 'كفاءة استخدام المركبات', value: '87.3%', percentage: 87 },
            { label: 'معدل تتبع الشحنات', value: '99.5%', percentage: 100 },
            { label: 'دقة التوقعات الزمنية', value: '94.2%', percentage: 94 }
        ];
        
        metricsData.forEach((item, index) => {
            const metricItem = document.querySelectorAll('.report-metric-item')[index];
            if (metricItem) {
                const label = metricItem.querySelector('.report-metric-label');
                const value = metricItem.querySelector('.report-metric-value');
                const barFill = metricItem.querySelector('.report-bar-fill');
                
                if (label) label.textContent = item.label;
                if (value) value.textContent = item.value;
                if (barFill) {
                    barFill.style.width = '0%';
                    setTimeout(() => {
                        barFill.style.width = `${item.percentage}%`;
                    }, index * 80);
                }
            }
        });
    },

    /**
     * Update service performance metrics
     */
    updateServicePerformanceMetrics: function() {
        const metricsData = [
            { label: 'متوسط وقت معالجة الشحنة', value: '2.3 ساعة', percentage: 85 },
            { label: 'معدل نجاح التخليص الجمركي', value: '96.8%', percentage: 97 },
            { label: 'كفاءة استخدام المستودعات', value: '92.4%', percentage: 92 },
            { label: 'دقة التغليف والتعبئة', value: '99.1%', percentage: 99 },
            { label: 'سرعة معالجة خطابات الاعتماد', value: '4.2/5', percentage: 84 },
            { label: 'رضا العملاء عن التوصيل النهائي', value: '4.7/5', percentage: 94 }
        ];
        
        metricsData.forEach((item, index) => {
            const metricItem = document.querySelectorAll('.report-metric-item')[index];
            if (metricItem) {
                const label = metricItem.querySelector('.report-metric-label');
                const value = metricItem.querySelector('.report-metric-value');
                const barFill = metricItem.querySelector('.report-bar-fill');
                
                if (label) label.textContent = item.label;
                if (value) value.textContent = item.value;
                if (barFill) {
                    barFill.style.width = '0%';
                    setTimeout(() => {
                        barFill.style.width = `${item.percentage}%`;
                    }, index * 80);
                }
            }
        });
    },

    /**
     * Update compliance metrics
     */
    updateComplianceMetrics: function() {
        const metricsData = [
            { label: 'معدل الحوادث', value: '0.02%', percentage: 98 },
            { label: 'التوافق مع اللوائح الجمركية', value: '99.8%', percentage: 100 },
            { label: 'جودة خدمة العملاء', value: '4.8/5', percentage: 96 },
            { label: 'دقة تتبع الشحنات', value: '99.9%', percentage: 100 },
            { label: 'التوافق مع معايير ISO', value: '100%', percentage: 100 },
            { label: 'رضا العملاء عن الجودة', value: '4.9/5', percentage: 98 }
        ];
        
        metricsData.forEach((item, index) => {
            const metricItem = document.querySelectorAll('.report-metric-item')[index];
            if (metricItem) {
                const label = metricItem.querySelector('.report-metric-label');
                const value = metricItem.querySelector('.report-metric-value');
                const barFill = metricItem.querySelector('.report-bar-fill');
                
                if (label) label.textContent = item.label;
                if (value) value.textContent = item.value;
                if (barFill) {
                    barFill.style.width = '0%';
                    setTimeout(() => {
                        barFill.style.width = `${item.percentage}%`;
                    }, index * 80);
                }
            }
        });
    },

    /**
     * Update performance metrics with enhanced data
     */
    updatePerformanceMetrics: function() {
        const metricsData = [
            { label: 'سرعة الاستجابة للعملاء', value: '4.6/5', percentage: 92 },
            { label: 'جودة الخدمة المقدمة', value: '4.8/5', percentage: 96 },
            { label: 'رضا العملاء العام', value: '4.7/5', percentage: 94 },
            { label: 'دقة التوصيل والمواعيد', value: '4.9/5', percentage: 98 },
            { label: 'كفاءة فريق العمل', value: '4.5/5', percentage: 90 },
            { label: 'التواصل مع العملاء', value: '4.4/5', percentage: 88 }
        ];
        
        metricsData.forEach((item, index) => {
            const metricItem = document.querySelectorAll('.report-metric-item')[index];
            if (metricItem) {
                const label = metricItem.querySelector('.report-metric-label');
                const value = metricItem.querySelector('.report-metric-value');
                const barFill = metricItem.querySelector('.report-bar-fill');
                
                if (label) label.textContent = item.label;
                if (value) value.textContent = item.value;
                if (barFill) {
                    barFill.style.width = '0%';
                    setTimeout(() => {
                        barFill.style.width = `${item.percentage}%`;
                    }, index * 80);
                }
            }
        });
    },

    /**
     * Load initial report data
     */
    loadReportData: function() {
        // Load financial report by default
        this.updateReportData('financial');
        
        // Add initial animations
        setTimeout(() => {
            this.animateDataUpdates();
        }, 500);
    },

    /**
     * Export report with enhanced functionality
     */
    exportReport: function() {
        const activeReportType = document.querySelector('.report-type.active').dataset.report;
        const reportTypes = {
            financial: 'التقرير المالي',
            'service-performance': 'تقرير أداء الخدمات',
            operational: 'تقرير الأداء التشغيلي',
            customer: 'تقرير تحليل العملاء',
            logistics: 'التقرير اللوجستي',
            compliance: 'تقرير التوافق والجودة'
        };
        
        Toast.show('تصدير التقرير', `جاري تحضير ${reportTypes[activeReportType]} للتصدير...`, 'info');
        
        setTimeout(() => {
            Toast.show('تم التصدير', `تم تصدير ${reportTypes[activeReportType]} بنجاح`, 'success');
        }, 2000);
    },

    /**
     * Export chart with enhanced options
     */
    exportChart: function() {
        Toast.show('تصدير الرسم البياني', 'جاري تحضير الرسم البياني للتصدير...', 'info');
        
        setTimeout(() => {
            Toast.show('تم التصدير', 'تم تصدير الرسم البياني بصيغة PDF', 'success');
        }, 1500);
    },

    /**
     * Initialize animations and interactions
     */
    initializeAnimations: function() {
        // Add hover effects to cards
        document.querySelectorAll('.report-summary-card, .report-kpi-card, .report-customer-stat').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-4px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Add click effects to buttons
        document.querySelectorAll('.report-type, .report-export-btn').forEach(button => {
            button.addEventListener('click', function() {
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
            });
        });
    },

    /**
     * Set up event listeners with enhanced interactions
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

        // Add keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                // Close any open modals or return to previous view
                console.log('Escape key pressed');
            }
        });
    },

    /**
     * Update designer notes with enhanced information for logistics
     */
    updateDesignerNotes: function() {
        const notes = "صفحة التقارير والتحليلات المحدثة لتتناسب مع احتياجات مقدمي الخدمات اللوجستية. تتضمن 6 أنواع من التقارير: مالية، أداء الخدمات، تشغيلي، تحليل العملاء، لوجستي، والتوافق والجودة. جميع البيانات واقعية ومحدثة لتوفير رؤية شاملة لأداء الخدمات اللوجستية المختلفة.";
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