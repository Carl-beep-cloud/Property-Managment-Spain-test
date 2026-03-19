document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const desktopNav = document.querySelector('.desktop-nav');
    
    if(mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            desktopNav.classList.toggle('active');
            // Toggle icon between bars and times (close)
            const icon = mobileMenuBtn.querySelector('i');
            if(desktopNav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Close mobile menu when a link is clicked
    const navLinks = document.querySelectorAll('.desktop-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if(window.innerWidth <= 768) {
                desktopNav.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
    });

    // 2. FAQ Accordion Logic
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const isActive = question.classList.contains('active');
            
            // Close all other FAQs first (Optional: for accordion style)
            document.querySelectorAll('.faq-question').forEach(q => {
                q.classList.remove('active');
                q.nextElementSibling.style.maxHeight = null;
            });

            // Toggle current FAQ
            if (!isActive) {
                question.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });

    // 3. Header Scroll Effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '0.5rem 0';
            header.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
        } else {
            header.style.padding = '1rem 0';
            header.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';
        }
    });
});
