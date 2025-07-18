/**
 * Help Controller - Updated for prefixed CSS classes
 */
const HelpController = {
    /**
     * Initialize the help page
     */
    init: function() {
        console.log('HelpController initialized');
        this.setupSearch();
        this.setupCategories();
        this.setupEventListeners();
        this.updateDesignerNotes();
        this.addAnimations();
    },

    /**
     * Setup search functionality
     */
    setupSearch: function() {
        const searchInput = document.querySelector('.hlp-search-input');
        const searchBtn = document.querySelector('.hlp-search-btn');
        
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                const query = e.target.value.toLowerCase();
                this.searchHelp(query);
            });
            
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.performSearch();
                }
            });
        }
        
        if (searchBtn) {
            searchBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.performSearch();
            });
        }
    },

    /**
     * Search help content
     */
    searchHelp: function(query) {
        if (query.length < 2) {
            // Show all content if query is too short
            this.showAllContent();
            return;
        }
        
        // Search in categories
        const categories = document.querySelectorAll('.hlp-help-category');
        categories.forEach(category => {
            const title = category.querySelector('.hlp-category-title').textContent.toLowerCase();
            const desc = category.querySelector('.hlp-category-desc').textContent.toLowerCase();
            
            const matches = title.includes(query) || desc.includes(query);
            category.style.display = matches ? 'flex' : 'none';
        });
        
        // Search in articles
        const articles = document.querySelectorAll('.hlp-article-item');
        articles.forEach(article => {
            const title = article.querySelector('.hlp-article-title').textContent.toLowerCase();
            const desc = article.querySelector('.hlp-article-desc').textContent.toLowerCase();
            
            const matches = title.includes(query) || desc.includes(query);
            article.style.display = matches ? 'flex' : 'none';
        });
    },

    /**
     * Perform search
     */
    performSearch: function() {
        const searchInput = document.querySelector('.hlp-search-input');
        const query = searchInput.value.trim();
        
        if (query) {
            Toast.show('البحث', `جاري البحث عن "${query}"...`, 'info');
            this.searchHelp(query);
        }
    },

    /**
     * Show all content
     */
    showAllContent: function() {
        document.querySelectorAll('.hlp-help-category, .hlp-article-item').forEach(item => {
            item.style.display = 'flex';
        });
    },

    /**
     * Setup help categories
     */
    setupCategories: function() {
        const categories = document.querySelectorAll('.hlp-help-category');
        
        categories.forEach(category => {
            category.addEventListener('click', (e) => {
                const page = category.dataset.page;
                if (page) {
                    e.preventDefault();
                    this.navigateToCategory(page);
                }
            });
        });
    },

    /**
     * Navigate to help category
     */
    navigateToCategory: function(category) {
        Toast.show('انتقال', `جاري الانتقال إلى ${category}...`, 'info');
        
        setTimeout(() => {
            // In a real app, this would navigate to the category page
            // For now, we'll show a modal with category content
            this.showCategoryModal(category);
        }, 1000);
    },

    /**
     * Show category modal
     */
    showCategoryModal: function(category) {
        const categoryTitles = {
            'getting-started': 'البدء السريع',
            'account-management': 'إدارة الحساب',
            'services-guide': 'دليل الخدمات',
            'billing-help': 'الفواتير والمدفوعات',
            'technical-support': 'الدعم الفني',
            'api-documentation': 'وثائق API'
        };
        
        const title = categoryTitles[category] || category;
        const content = `
            <div class="modal-header">
                <h3>${title}</h3>
                <button class="modal-close" data-action="close-modal">&times;</button>
            </div>
            <div class="modal-body">
                <p>محتوى ${title} سيتم عرضه هنا. هذه صفحة مساعدة تفصيلية تحتوي على جميع المعلومات المطلوبة.</p>
                <div class="help-articles">
                    <div class="help-article">
                        <h4>كيفية البدء</h4>
                        <p>خطوات بسيطة للبدء في استخدام النظام...</p>
                    </div>
                    <div class="help-article">
                        <h4>النصائح المهمة</h4>
                        <p>نصائح مفيدة لتحسين تجربتك...</p>
                    </div>
                </div>
            </div>
        `;
        
        Modal.show('help-category-modal', content);
    },

    /**
     * Handle help actions
     */
    handleHelpAction: function(action) {
        switch (action) {
            case 'contact-support':
                this.contactSupport();
                break;
            case 'live-chat':
                this.startLiveChat();
                break;
            case 'faq':
                this.showFAQ();
                break;
            case 'tutorials':
                this.showTutorials();
                break;
            default:
                console.log(`Unknown help action: ${action}`);
        }
    },

    /**
     * Contact support
     */
    contactSupport: function() {
        Toast.show('تواصل مع الدعم', 'جاري فتح نموذج التواصل مع الدعم...', 'info');
        
        setTimeout(() => {
            Router.navigate('contact-support');
        }, 1000);
    },

    /**
     * Start live chat
     */
    startLiveChat: function() {
        Toast.show('المحادثة المباشرة', 'جاري بدء المحادثة المباشرة...', 'info');
        
        setTimeout(() => {
            Router.navigate('live-chat');
        }, 1000);
    },

    /**
     * Show FAQ
     */
    showFAQ: function() {
        Toast.show('الأسئلة الشائعة', 'جاري فتح صفحة الأسئلة الشائعة...', 'info');
        
        setTimeout(() => {
            Router.navigate('faq');
        }, 1000);
    },

    /**
     * Show tutorials
     */
    showTutorials: function() {
        Toast.show('الدروس التعليمية', 'جاري فتح صفحة الدروس التعليمية...', 'info');
        
        setTimeout(() => {
            Router.navigate('tutorials');
        }, 1000);
    },

    /**
     * Handle article clicks
     */
    handleArticleClick: function(articleId) {
        Toast.show('عرض المقال', `جاري فتح المقال ${articleId}...`, 'info');
        
        setTimeout(() => {
            Router.navigate('article-details');
        }, 1000);
    },

    /**
     * Handle feedback
     */
    handleFeedback: function(rating) {
        const feedbackMessages = {
            'positive': 'شكراً لك! نحن سعداء أن الصفحة كانت مفيدة.',
            'negative': 'نعتذر عن ذلك. سنعمل على تحسين المحتوى.'
        };
        
        Toast.show('شكراً لك', feedbackMessages[rating], 'success');
        
        // Hide feedback buttons after rating
        const feedbackButtons = document.querySelectorAll('.hlp-feedback-btn');
        feedbackButtons.forEach(btn => {
            btn.style.display = 'none';
        });
        
        // Show thank you message
        const feedbackCard = document.querySelector('.hlp-feedback-card');
        if (feedbackCard) {
            feedbackCard.innerHTML = '<h4>شكراً لك على ملاحظاتك!</h4><p>سنستخدم ملاحظاتك لتحسين المحتوى.</p>';
        }
    },

    /**
     * Add animations to help elements
     */
    addAnimations: function() {
        const helpPage = document.getElementById('help');
        if (!helpPage) return;
        
        // Add fade-in animation to help actions
        const helpActions = helpPage.querySelectorAll('.hlp-help-action');
        helpActions.forEach((action, index) => {
            action.style.animationDelay = `${index * 0.1}s`;
            action.classList.add('hlp-fade-in');
        });
        
        // Add slide-in animation to categories
        const categories = helpPage.querySelectorAll('.hlp-help-category');
        categories.forEach((category, index) => {
            category.style.animationDelay = `${index * 0.05}s`;
            category.classList.add('hlp-slide-in');
        });
    },

    /**
     * Set up event listeners
     */
    setupEventListeners: function() {
        const page = document.getElementById('help');
        if (!page) return;

        // Handle help action buttons
        page.addEventListener('click', (e) => {
            const helpAction = e.target.closest('.hlp-help-action');
            if (helpAction) {
                e.preventDefault();
                const action = helpAction.dataset.action;
                if (action) {
                    this.handleHelpAction(action);
                }
            }
        });

        // Handle article clicks
        page.addEventListener('click', (e) => {
            const articleItem = e.target.closest('.hlp-article-item');
            if (articleItem) {
                e.preventDefault();
                const articleId = articleItem.dataset.articleId;
                if (articleId) {
                    this.handleArticleClick(articleId);
                }
            }
        });

        // Handle feedback buttons
        page.addEventListener('click', (e) => {
            const feedbackBtn = e.target.closest('.hlp-feedback-btn');
            if (feedbackBtn) {
                e.preventDefault();
                const rating = feedbackBtn.dataset.rating;
                if (rating) {
                    this.handleFeedback(rating);
                }
            }
        });

        // Handle contact support button
        page.addEventListener('click', (e) => {
            if (e.target.closest('[data-action="navigate"][data-page="contact-support"]')) {
                e.preventDefault();
                this.contactSupport();
            }
        });

        // Handle view all articles
        page.addEventListener('click', (e) => {
            if (e.target.closest('[data-action="navigate"][data-page="all-articles"]')) {
                e.preventDefault();
                Router.navigate('all-articles');
            }
        });
    },

    /**
     * Update designer notes
     */
    updateDesignerNotes: function() {
        const notes = "صفحة المساعدة والدعم تعرض فئات المساعدة المختلفة والمقالات الشائعة. تتضمن بحث في المحتوى وطرق التواصل مع الدعم ونظام تقييم المحتوى.";
        const notesContent = document.getElementById('designer-notes-content');
        if (notesContent) {
            notesContent.innerHTML = `<p>${notes}</p>`;
        }
    }
};

// Debug: Check if HelpController is properly declared
console.log('HelpController declared:', typeof HelpController !== 'undefined');
console.log('HelpController in window:', typeof window.HelpController !== 'undefined');

// Explicitly attach to global scope
window.HelpController = HelpController;
console.log('HelpController attached to window:', typeof window.HelpController !== 'undefined'); 