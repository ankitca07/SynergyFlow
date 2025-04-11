document.addEventListener('DOMContentLoaded', () => {

    // --- Intersection Observer for Scroll Animations ---
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    if (animatedElements.length > 0) {
        const observerOptions = {
            root: null, // Use the viewport as the root
            rootMargin: '0px',
            threshold: 0.1 // Trigger when 10% of the element is visible
        };

        const observerCallback = (entries, observer) => {
            entries.forEach(entry => {
                // If the element is intersecting (visible)
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    // Optional: Stop observing the element after it becomes visible
                    // observer.unobserve(entry.target);
                }
                // Optional: If you want the animation to reverse when scrolling up
                // else {
                //     entry.target.classList.remove('is-visible');
                // }
            });
        };

        // Create the observer
        const observer = new IntersectionObserver(observerCallback, observerOptions);

        // Observe each animated element
        animatedElements.forEach(el => {
            observer.observe(el);
        });
    }

    // --- Optional: Add simple active state to nav links on scroll ---
    const sections = document.querySelectorAll('section[id]'); // Get all sections with an ID
    const navLinks = document.querySelectorAll('.main-nav ul li a');

    const activateNavLink = () => {
        let currentSection = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Adjust offset for sticky header height if necessary
            const headerOffset = document.querySelector('.site-header')?.offsetHeight || 70;

            // Check if scroll position is within the current section bounds
            if (pageYOffset >= sectionTop - headerOffset - sectionHeight * 0.3) { // Trigger slightly before reaching top
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active'); // Remove active class from all links
            // Check if the link's href matches the current section ID
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active'); // Add active class to the matching link
            }
        });
    };

    window.addEventListener('scroll', activateNavLink);
    activateNavLink(); // Call once on load


    // --- Optional: Smooth scroll for internal links ---
    const internalLinks = document.querySelectorAll('a[href^="#"]');

    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            // Ensure it's a valid internal link and not just '#'
            if (targetId.length > 1 && document.querySelector(targetId)) {
                e.preventDefault(); // Prevent default anchor jump
                const targetElement = document.querySelector(targetId);
                const headerOffset = document.querySelector('.site-header')?.offsetHeight || 70; // Get header height
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth' // Smooth scroll behavior
                });
            }
        });
    });

}); // End DOMContentLoaded

// Add this to your CSS for the active nav link style:
/*
.main-nav ul li a.active::after {
    width: 100%;
     background: linear-gradient(135deg, #ff6a00 0%, #ee0979 100%); // Example active color
}
.main-nav ul li a.active {
    font-weight: 600; // Example active style
     color: var(--primary-color); // Example active style
}
*/