/* 
   ==========================================================================
   NGUYEN MINH TAN - .NET BACKEND & FULLSTACK ARCHITECT
   FUTURISTIC HIGH-TECH PORTFOLIO & INTERACTION ENGINE
   ==========================================================================
*/

document.addEventListener('DOMContentLoaded', function() {
    initTypingEffect();
    initCatalogFilters();
    initNavToggle();
    initScrollSpy();
    initTerminalTabs();
});

/* --------------------------------------------------------------------------
   1. TYPING EFFECT (HERO SECTION)
   -------------------------------------------------------------------------- */
const typingPhrases = [
    ".NET 8 & ASP.NET Core Specialist",
    "Clean Architecture & DDD Practitioner",
    "Offline-First SQLite & Delta-Sync Architect",
    "Google Gemini Pro AI RAG Integrator",
    "VietQR SePay Webhook Auto-Reconciliation",
    "HUFLIT Software Engineering Final-Year"
];

let phraseIdx = 0;
let letterIdx = 0;
let isRemoving = false;

function initTypingEffect() {
    const targetElem = document.getElementById("typing-text");
    if (!targetElem) return;

    const currentPhrase = typingPhrases[phraseIdx];
    
    if (isRemoving) {
        targetElem.textContent = currentPhrase.substring(0, letterIdx - 1);
        letterIdx--;
    } else {
        targetElem.textContent = currentPhrase.substring(0, letterIdx + 1);
        letterIdx++;
    }

    let speed = isRemoving ? 30 : 65;

    if (!isRemoving && letterIdx === currentPhrase.length) {
        speed = 2000;
        isRemoving = true;
    } else if (isRemoving && letterIdx === 0) {
        isRemoving = false;
        phraseIdx = (phraseIdx + 1) % typingPhrases.length;
        speed = 400;
    }

    setTimeout(initTypingEffect, speed);
}

/* --------------------------------------------------------------------------
   2. HERO TERMINAL TABS (INTERACTIVE CODE SWITCHER)
   -------------------------------------------------------------------------- */
const terminalCodeSnippets = {
    webhook: `
<div class="terminal-line"><span class="t-num">01</span><span><span class="t-comment">// 1. Tự động gạch nợ ngân hàng trong 2-3s</span></span></div>
<div class="terminal-line"><span class="t-num">02</span><span><span class="t-key">public async</span> <span class="t-type">Task</span>&lt;<span class="t-type">OrderResult</span>&gt; <span class="t-func">ProcessWebhookAsync</span>(<span class="t-type">SePayWebhookDto</span> dto)</span></div>
<div class="terminal-line"><span class="t-num">03</span><span>{</span></div>
<div class="terminal-line"><span class="t-num">04</span><span>&nbsp;&nbsp;&nbsp;&nbsp;<span class="t-key">var</span> orderId = <span class="t-func">ExtractOrderId</span>(dto.Content); <span class="t-comment">// Regex /(BHX\\d+)/i</span></span></div>
<div class="terminal-line"><span class="t-num">05</span><span>&nbsp;&nbsp;&nbsp;&nbsp;<span class="t-key">var</span> order = <span class="t-key">await</span> _dbContext.Orders.<span class="t-func">FindAsync</span>(orderId);</span></div>
<div class="terminal-line"><span class="t-num">06</span><span>&nbsp;&nbsp;&nbsp;&nbsp;<span class="t-key">if</span> (order == <span class="t-key">null</span> || order.PaymentStatus == <span class="t-type">Paid</span>) <span class="t-key">return</span>;</span></div>
<div class="terminal-line"><span class="t-num">07</span><span>&nbsp;&nbsp;&nbsp;&nbsp;<span class="t-comment">// Cập nhật trạng thái + Trừ kho Sales BOM đa đơn vị</span></span></div>
<div class="terminal-line"><span class="t-num">08</span><span>&nbsp;&nbsp;&nbsp;&nbsp;order.PaymentStatus = <span class="t-type">PaymentStatus</span>.<span class="t-func">Paid</span>;</span></div>
<div class="terminal-line"><span class="t-num">09</span><span>&nbsp;&nbsp;&nbsp;&nbsp;<span class="t-key">await</span> _inventoryService.<span class="t-func">DeductStockAsync</span>(order.Items);</span></div>
<div class="terminal-line"><span class="t-num">10</span><span>&nbsp;&nbsp;&nbsp;&nbsp;<span class="t-key">await</span> _emailService.<span class="t-func">SendInvoiceHtmlAsync</span>(order);</span></div>
<div class="terminal-line"><span class="t-num">11</span><span>&nbsp;&nbsp;&nbsp;&nbsp;<span class="t-key">return</span> <span class="t-type">OrderResult</span>.<span class="t-func">Success</span>(orderId);</span></div>
<div class="terminal-line"><span class="t-num">12</span><span>}</span></div>`,

    cleanarch: `
<div class="terminal-line"><span class="t-num">01</span><span><span class="t-comment">// 2. Clean Architecture CQRS Command Handler</span></span></div>
<div class="terminal-line"><span class="t-num">02</span><span><span class="t-key">public class</span> <span class="t-type">CreateDeclarationCommandHandler</span> : <span class="t-type">IRequestHandler</span>&lt;<span class="t-type">CreateCmd</span>, <span class="t-type">Guid</span>&gt;</span></div>
<div class="terminal-line"><span class="t-num">03</span><span>{</span></div>
<div class="terminal-line"><span class="t-num">04</span><span>&nbsp;&nbsp;&nbsp;&nbsp;<span class="t-key">private readonly</span> <span class="t-type">IDeclarationRepository</span> _repository;</span></div>
<div class="terminal-line"><span class="t-num">05</span><span>&nbsp;&nbsp;&nbsp;&nbsp;<span class="t-key">public</span> <span class="t-func">CreateDeclarationCommandHandler</span>(<span class="t-type">IDeclarationRepository</span> repo)</span></div>
<div class="terminal-line"><span class="t-num">06</span><span>&nbsp;&nbsp;&nbsp;&nbsp;{ _repository = repo; }</span></div>
<div class="terminal-line"><span class="t-num">07</span><span>&nbsp;&nbsp;&nbsp;&nbsp;<span class="t-key">public async</span> <span class="t-type">Task</span>&lt;<span class="t-type">Guid</span>&gt; <span class="t-func">Handle</span>(<span class="t-type">CreateCmd</span> cmd, <span class="t-type">CancellationToken</span> ct)</span></div>
<div class="terminal-line"><span class="t-num">08</span><span>&nbsp;&nbsp;&nbsp;&nbsp;{</span></div>
<div class="terminal-line"><span class="t-num">09</span><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="t-key">var</span> entity = <span class="t-type">CustomsDeclaration</span>.<span class="t-func">Create</span>(cmd.Code, cmd.Vessel);</span></div>
<div class="terminal-line"><span class="t-num">10</span><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="t-key">await</span> _repository.<span class="t-func">AddAsync</span>(entity, ct);</span></div>
<div class="terminal-line"><span class="t-num">11</span><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="t-key">return</span> entity.Id;</span></div>
<div class="terminal-line"><span class="t-num">12</span><span>&nbsp;&nbsp;&nbsp;&nbsp;}</span></div>
<div class="terminal-line"><span class="t-num">13</span><span>}</span></div>`,

    offlinesync: `
<div class="terminal-line"><span class="t-num">01</span><span><span class="t-comment">// 3. SQLite Offline-First AutoSync Engine</span></span></div>
<div class="terminal-line"><span class="t-num">02</span><span><span class="t-key">export async function</span> <span class="t-func">syncOutboxQueue</span>(): <span class="t-type">Promise</span>&lt;<span class="t-type">void</span>&gt; {</span></div>
<div class="terminal-line"><span class="t-num">03</span><span>&nbsp;&nbsp;&nbsp;&nbsp;<span class="t-key">const</span> pendingEvents = <span class="t-key">await</span> db.<span class="t-func">getAllFromOutbox</span>();</span></div>
<div class="terminal-line"><span class="t-num">04</span><span>&nbsp;&nbsp;&nbsp;&nbsp;<span class="t-key">if</span> (!pendingEvents.length) <span class="t-key">return</span>;</span></div>
<div class="terminal-line"><span class="t-num">05</span><span>&nbsp;&nbsp;&nbsp;&nbsp;</span></div>
<div class="terminal-line"><span class="t-num">06</span><span>&nbsp;&nbsp;&nbsp;&nbsp;<span class="t-comment">// Push batch to .NET 8 Backend Gateway</span></span></div>
<div class="terminal-line"><span class="t-num">07</span><span>&nbsp;&nbsp;&nbsp;&nbsp;<span class="t-key">const</span> res = <span class="t-key">await</span> api.<span class="t-func">post</span>(<span class="t-str">'/api/sync/delta-push'</span>, pendingEvents);</span></div>
<div class="terminal-line"><span class="t-num">08</span><span>&nbsp;&nbsp;&nbsp;&nbsp;<span class="t-key">if</span> (res.data.success) {</span></div>
<div class="terminal-line"><span class="t-num">09</span><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="t-key">await</span> db.<span class="t-func">markOutboxResolved</span>(res.data.syncedIds);</span></div>
<div class="terminal-line"><span class="t-num">10</span><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="t-key">await</span> <span class="t-func">pullLatestCourseDeltas</span>(res.data.lastSeq);</span></div>
<div class="terminal-line"><span class="t-num">11</span><span>&nbsp;&nbsp;&nbsp;&nbsp;}</span></div>
<div class="terminal-line"><span class="t-num">12</span><span>}</span></div>`
};

function initTerminalTabs() {
    const tabBtns = document.querySelectorAll('.terminal-tab-btn');
    const terminalBody = document.getElementById('terminal-code-body');

    if (!tabBtns.length || !terminalBody) return;

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            tabBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const tabKey = this.getAttribute('data-tab');
            if (terminalCodeSnippets[tabKey]) {
                terminalBody.innerHTML = terminalCodeSnippets[tabKey].trim();
            }
        });
    });
}

/* --------------------------------------------------------------------------
   3. CATALOG MARKETPLACE FILTER (ĐA NỀN TẢNG, THƯƠNG MẠI, ERP, DESKTOP, EDUCATION)
   -------------------------------------------------------------------------- */
function initCatalogFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    if (!filterButtons.length || !productCards.length) return;

    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            productCards.forEach(card => {
                const categories = (card.getAttribute('data-category') || '').split(' ');
                
                if (filterValue === 'all' || categories.includes(filterValue)) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(15px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 250);
                }
            });
        });
    });
}

/* --------------------------------------------------------------------------
   4. YOUTUBE VIDEO DEMO MODAL (CINEMA MODE)
   -------------------------------------------------------------------------- */
function openVideoModal(youtubeUrl, projectTitle) {
    const modal = document.getElementById('video-modal');
    const iframe = document.getElementById('video-modal-iframe');
    const frameContainer = document.getElementById('video-frame-container');
    const titleElem = document.getElementById('video-modal-title');
    const noticeElem = document.getElementById('video-modal-notice');
    
    if (!modal) return;

    if (titleElem) {
        titleElem.innerHTML = `<i class="fa-brands fa-youtube"></i> ${projectTitle || 'Demo Dự Án'}`;
    }

    let embedUrl = (youtubeUrl || '').trim();
    if (embedUrl) {
        if (embedUrl.includes('watch?v=')) {
            const videoId = embedUrl.split('watch?v=')[1].split('&')[0];
            embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
        } else if (embedUrl.includes('youtu.be/')) {
            const videoId = embedUrl.split('youtu.be/')[1].split('?')[0];
            embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
        } else if (!embedUrl.includes('autoplay=') && embedUrl.startsWith('http')) {
            embedUrl += (embedUrl.includes('?') ? '&autoplay=1' : '?autoplay=1');
        }
    }

    const hasValidVideo = embedUrl && embedUrl !== '#' && embedUrl.startsWith('http') && !embedUrl.includes('YOUR_VIDEO_ID');

    if (hasValidVideo) {
        if (iframe) iframe.src = embedUrl;
        if (frameContainer) frameContainer.style.display = 'block';
        if (noticeElem) noticeElem.style.display = 'none';
    } else {
        if (iframe) iframe.src = '';
        if (frameContainer) frameContainer.style.display = 'none';
        if (noticeElem) {
            noticeElem.innerHTML = `
                <div class="notice-content">
                    <i class="fa-brands fa-youtube notice-icon"></i>
                    <div class="notice-title">Hiện chưa có video khả dụng đang được admin cập nhật</div>
                    <button type="button" onclick="closeVideoModal()" class="btn btn-secondary btn-sm" style="margin-top: 20px;">
                        <i class="fa-solid fa-xmark"></i> Đóng
                    </button>
                </div>
            `;
            noticeElem.style.display = 'flex';
        }
    }

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeVideoModal() {
    const modal = document.getElementById('video-modal');
    const iframe = document.getElementById('video-modal-iframe');
    const frameContainer = document.getElementById('video-frame-container');
    const noticeElem = document.getElementById('video-modal-notice');

    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    if (iframe) {
        iframe.src = '';
    }
    if (frameContainer) {
        frameContainer.style.display = 'none';
    }
    if (noticeElem) {
        noticeElem.style.display = 'none';
    }
}

/* --------------------------------------------------------------------------
   5. CONSULTATION & ORDER MODAL
   -------------------------------------------------------------------------- */
function openOrderModal(serviceName) {
    const modal = document.getElementById("order-modal");
    const serviceSelect = document.getElementById("modal-service-select");
    
    if (modal) {
        modal.classList.add("active");
        document.body.style.overflow = "hidden";
    }

    if (serviceSelect && serviceName) {
        serviceSelect.value = serviceName;
    }
}

function closeOrderModal() {
    const modal = document.getElementById("order-modal");
    if (modal) {
        modal.classList.remove("active");
        document.body.style.overflow = "auto";
    }
}

// Global modal listeners (Escape & Outside click)
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeOrderModal();
        closeVideoModal();
    }
});

window.addEventListener('click', function(e) {
    const orderModal = document.getElementById("order-modal");
    const videoModal = document.getElementById("video-modal");
    if (e.target === orderModal) closeOrderModal();
    if (e.target === videoModal) closeVideoModal();
});

/* --------------------------------------------------------------------------
   6. COPY EMAIL & QUICK ACTIONS
   -------------------------------------------------------------------------- */
function copyEmail(e) {
    if (e) e.preventDefault();
    const email = "nguyenminhtan301205@gmail.com";
    navigator.clipboard.writeText(email).then(() => {
        showToast("Đã sao chép email: " + email);
    }).catch(() => {
        showToast("Email: " + email);
    });
}

function showToast(message) {
    let toast = document.getElementById("toast");
    if (!toast) {
        toast = document.createElement("div");
        toast.id = "toast";
        toast.className = "toast-msg";
        document.body.appendChild(toast);
    }
    toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color:#10b981;"></i> ${message}`;
    toast.style.display = "flex";

    setTimeout(() => {
        toast.style.display = "none";
    }, 3500);
}

/* --------------------------------------------------------------------------
   7. MOBILE NAVIGATION TOGGLE
   -------------------------------------------------------------------------- */
function initNavToggle() {
    const toggleBtn = document.getElementById('nav-toggle-btn');
    const navMenu = document.getElementById('nav-menu');
    
    if (toggleBtn && navMenu) {
        toggleBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            const icon = toggleBtn.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-xmark');
            }
        });

        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = toggleBtn.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-xmark');
                }
            });
        });
    }
}

/* --------------------------------------------------------------------------
   8. SCROLL SPY FOR NAVBAR ACTIVE LINK
   -------------------------------------------------------------------------- */
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        const scrollPosition = window.scrollY + 120;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });
}
