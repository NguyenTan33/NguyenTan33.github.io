/* 
   NGUYỄN MINH TÂN - .NET BACKEND DEVELOPER PORTFOLIO
   Interactive Logic Script
*/

document.addEventListener('DOMContentLoaded', function() {
    initTypingEffect();
    switchCodeTab(0);
    initNavToggle();
    initScrollSpy();
});

// Dynamic Typing Effect
const typingTexts = [
    ".NET Backend Developer", 
    "Clean Architecture Advocate", 
    "SePay Webhook Integrator", 
    "HUFLIT IT Senior Student"
];

let textIdx = 0;
let charIdx = 0;
let isDeleting = false;

function initTypingEffect() {
    const elem = document.getElementById("typing-text");
    if (!elem) return;

    const currentText = typingTexts[textIdx];
    
    if (isDeleting) {
        elem.textContent = currentText.substring(0, charIdx - 1);
        charIdx--;
    } else {
        elem.textContent = currentText.substring(0, charIdx + 1);
        charIdx++;
    }

    let typeSpeed = isDeleting ? 35 : 75;

    if (!isDeleting && charIdx === currentText.length) {
        typeSpeed = 1800;
        isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        textIdx = (textIdx + 1) % typingTexts.length;
        typeSpeed = 400;
    }

    setTimeout(initTypingEffect, typeSpeed);
}

// Code Snippets for Terminal Playground
const codeSnippets = [
`// 1. SePayWebhookService.cs - Auto Payment Reconciliation 24/7
public async Task<(bool Success, string Message, int OrderId)> ProcessWebhookAsync(SePayWebhookModel model)
{
    // Regex trích xuất mã đơn BHX từ nội dung chuyển khoản VietinBank
    string searchContent = (model.content ?? "") + " " + (model.description ?? "");
    int orderId = ExtractOrderId(searchContent); // BHX1234 -> OrderID 1234
    
    var order = await _dbContext.Order.FirstOrDefaultAsync(o => o.Id == orderId);
    if (order == null) return (false, "Đơn hàng không tồn tại", 0);

    // Gạch nợ tự động 24/7 không cần con người can thiệp
    order.PaymentStatus = 1; // 1 = Đã Thanh Toán
    await _dbContext.SaveChangesAsync();

    // Gửi Email hóa đơn HTML tự động
    OrderInvoiceEmailService.SendOrderConfirmationEmail(order, order.User.Email);
    return (true, $"[GẠCH NỢ THÀNH CÔNG] Đơn #{orderId}!", orderId);
}`,
`// 2. OrderCheckoutService.cs - Thin Controller & Service Layer Pattern
public async Task<(Cart CartData, List<UserAddress> Addresses, List<VoucherResult> Vouchers)> 
GetCheckoutDataAsync(string userId, string selectedIds, string coupon)
{
    var cart = _cartService.GetCartByUserId(userId);
    var userAddresses = await _dbContext.UserAddresses
        .Where(a => a.UserId == userId).OrderByDescending(a => a.IsDefault).ToListAsync();

    // Đánh giá Smart Voucher Engine theo giỏ hàng thực tế
    var suggestedVouchers = _voucherService.GetSuggestedVouchersForCart(cart.CartDetails, userId);

    return (cart, userAddresses, suggestedVouchers);
}`,
`// 3. ProductSalesBOM.cs - Multi-Unit Conversion & Parent Stock Hierarchy
public class Product
{
    public int Id { get; set; }
    public string Name { get; set; } // Lon Coca-Cola lẻ vs Thùng 24 lon
    public int? ParentProductId { get; set; } // Con trỏ về sản phẩm mẹ (Lon lẻ)
    public int UnitMultiplier { get; set; } = 1; // Thùng = 24

    [NotMapped]
    public int AvailableStock => ParentProductId.HasValue && ParentProduct != null 
        ? ParentProduct.Quantity / (UnitMultiplier > 0 ? UnitMultiplier : 1) 
        : Quantity;
}`
];

function switchCodeTab(index) {
    const tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach((tab, i) => {
        tab.classList.toggle('active', i === index);
    });
    
    const contentBox = document.getElementById('code-content');
    if (contentBox) {
        contentBox.innerHTML = `<pre><code>${formatCode(codeSnippets[index])}</code></pre>`;
    }
}

function formatCode(code) {
    return code
        .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
        .replace(/\/\/.*/g, '<span class="code-comment">$&</span>')
        .replace(/(public|async|Task|string|int|bool|var|await|return|class|if|new)/g, '<span class="code-keyword">$1</span>')
        .replace(/(ProcessWebhookAsync|ExtractOrderId|FirstOrDefaultAsync|SaveChangesAsync|SendOrderConfirmationEmail|GetCheckoutDataAsync)/g, '<span class="code-func">$1</span>');
}

// Live Webhook Simulator
function runWebhookSimulation() {
    const orderInput = document.getElementById('sim-order-id');
    const amountInput = document.getElementById('sim-amount');
    const logBox = document.getElementById('sim-log');

    const orderId = orderInput ? (orderInput.value || "BHX8899") : "BHX8899";
    const amount = amountInput ? (parseInt(amountInput.value) || 150000) : 150000;

    logBox.innerHTML = `<span style="color:#38bdf8;">[${new Date().toLocaleTimeString()}] [WEBHOOK INCOMING] Received POST request from SePay Gateway...</span><br>`;
    
    setTimeout(() => {
        logBox.innerHTML += `<span style="color:#fbbf24;">[${new Date().toLocaleTimeString()}] [PAYLOAD PARSED] TransferAmount: ${amount.toLocaleString()}đ | Content: "CHUYEN TIEN THANH TOAN DON HANG ${orderId}"</span><br>`;
    }, 600);

    setTimeout(() => {
        logBox.innerHTML += `<span style="color:#a78bfa;">[${new Date().toLocaleTimeString()}] [REGEX MATCHED] Extracted OrderID: ${orderId.replace(/\D/g, '') || 8899} from transaction text.</span><br>`;
    }, 1200);

    setTimeout(() => {
        logBox.innerHTML += `<span style="color:#34d399; font-weight:bold;">[${new Date().toLocaleTimeString()}] [AUTO RECONCILED SUCCESS] Order #${orderId.replace(/\D/g, '') || 8899} PaymentStatus = 1 (PAID VIA VIETQR).</span><br>`;
    }, 1800);

    setTimeout(() => {
        logBox.innerHTML += `<span style="color:#60a5fa;">[${new Date().toLocaleTimeString()}] [SMTP EMAIL SENT] HTML Invoice & Receipt dispatched to Customer.</span><br>`;
    }, 2400);
}

// Copy Email Toast Notification
function copyEmail(e) {
    e.preventDefault();
    navigator.clipboard.writeText("nguyenminhtan301205@gmail.com");
    const toast = document.getElementById("toast");
    if (toast) {
        toast.style.display = "block";
        setTimeout(() => { toast.style.display = "none"; }, 3000);
    }
}

// Mobile Nav Toggle
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

        // Close menu on link click
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

// ScrollSpy Active Link Highlight
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}
