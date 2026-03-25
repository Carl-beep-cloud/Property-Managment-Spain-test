document.addEventListener('DOMContentLoaded', () => {

    // 1. FAQ Accordion Interaction
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const isExpanded = header.getAttribute('aria-expanded') === 'true';
            
            // Close all other accordions
            accordionHeaders.forEach(h => {
                h.setAttribute('aria-expanded', 'false');
                h.nextElementSibling.style.maxHeight = null;
            });

            // Toggle current
            if (!isExpanded) {
                header.setAttribute('aria-expanded', 'true');
                const content = header.nextElementSibling;
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });

    // 2. Client-side Form Validation
    const form = document.getElementById('lead-form');
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            let isValid = true;
            const fields = ['name', 'email', 'phone', 'message'];
            
            fields.forEach(fieldId => {
                const input = document.getElementById(fieldId);
                const group = input.parentElement;
                
                // Simple validation check
                if (!input.value.trim() || (input.type === 'email' && !input.value.includes('@'))) {
                    group.classList.add('invalid');
                    isValid = false;
                } else {
                    group.classList.remove('invalid');
                }
                
                // Remove error on input change
                input.addEventListener('input', () => {
                    group.classList.remove('invalid');
                }, { once: true });
            });
            
            if (isValid) {
                // Trigger success state
                form.querySelector('.form-submit').disabled = true;
                form.querySelector('.form-submit').textContent = 'Sending...';
                
                // Simulate network request
                setTimeout(() => {
                    form.reset();
                    form.querySelector('.form-submit').disabled = false;
                    form.querySelector('.form-submit').textContent = 'Send Message';
                    document.getElementById('form-success').classList.remove('hidden');
                    
                    // Hide success message after 5 seconds
                    setTimeout(() => {
                        document.getElementById('form-success').classList.add('hidden');
                    }, 5000);
                }, 1000);
            }
        });
    }

    // 3. Analytics Tracking Placeholders
    const trackedElements = document.querySelectorAll('[data-track]');
    
    trackedElements.forEach(el => {
        el.addEventListener('click', (e) => {
            const trackName = el.getAttribute('data-track');
            // e.g. send to GA/GTM or custom analytics:
            console.log(`[Analytics Event] Interaction detected: ${trackName}`);
        });
    });

    // 4. Scroll Depth Tracking Placeholder
    let reportedDepths = new Set();
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        const documentHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercentage = Math.round((scrollPosition / documentHeight) * 100);
        
        const marks = [25, 50, 75, 100];
        marks.forEach(mark => {
            if (scrollPercentage >= mark && !reportedDepths.has(mark)) {
                reportedDepths.add(mark);
                console.log(`[Analytics Event] Scroll depth reached: ${mark}%`);
            }
        });
    });
});
