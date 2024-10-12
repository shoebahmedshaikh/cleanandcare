document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Mobile menu toggle
    const menuToggle = document.createElement('div');
    menuToggle.classList.add('menu-toggle');
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    document.querySelector('nav').appendChild(menuToggle);

    menuToggle.addEventListener('click', function() {
        document.querySelector('nav ul').classList.toggle('active');
    });

    // Scroll-triggered animations
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    function checkScroll() {
        const triggerBottom = window.innerHeight / 5 * 4;

        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;

            if (elementTop < triggerBottom) {
                element.classList.add('show');
            } else {
                element.classList.remove('show');
            }
        });
    }

    window.addEventListener('scroll', checkScroll);
    checkScroll();

    // Form submission
    const form = document.getElementById('inquiry-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Replace this URL with your Google Apps Script Web App URL
            const scriptURL = 'https://script.google.com/macros/s/your-script-id/exec';
            
            fetch(scriptURL, { method: 'POST', body: new FormData(form) })
                .then(response => {
                    if (response.ok) {
                        alert('Thank you for your inquiry. We will get back to you soon!');
                        form.reset();
                    } else {
                        throw new Error('Network response was not ok.');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('There was an error submitting the form. Please try again later.');
                });
        });
    }

    // Services page - animated counters
    const counters = document.querySelectorAll('.counter');
    const speed = 200;

    function animateCounter(counter) {
        const target = +counter.getAttribute('data-target');
        let count = 0;
        const inc = target / speed;

        function updateCount() {
            if (count < target) {
                count += inc;
                counter.innerText = Math.ceil(count);
                setTimeout(updateCount, 1);
            } else {
                counter.innerText = target;
            }
        }

        updateCount();
    }

    if (counters.length > 0) {
        window.addEventListener('scroll', function() {
            counters.forEach(counter => {
                if (counter.getBoundingClientRect().top < window.innerHeight) {
                    animateCounter(counter);
                }
            });
        });
    }

    // Testimonial slider
    const testimonials = document.querySelector('.testimonials');
    if (testimonials) {
        const testimonialSlider = new Swiper('.testimonial-slider', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });
    }
});