        // Initialize AOS
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100
        });

        // Navbar scroll effect
        window.addEventListener('scroll', function() {
            const navbar = document.querySelector('.navbar');
            const scrollTop = document.getElementById('scrollTop');
            
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
                scrollTop.classList.add('visible');
            } else {
                navbar.classList.remove('scrolled');
                scrollTop.classList.remove('visible');
            }
        });

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Counter animation with support for "+" suffix
        function animateCounters() {
            const counters = document.querySelectorAll('.animate-counter');
            const speed = 200;

            counters.forEach(counter => {
                const updateCount = () => {
                    const targetValue = counter.getAttribute('data-target');
                    const hasPlus = targetValue.includes('+');
                    const target = parseInt(targetValue.replace('+', ''));
                    const count = parseInt(counter.innerText.replace('+', '')) || 0;
                    const inc = target / speed;

                    if (count < target) {
                        const newCount = Math.ceil(count + inc);
                        counter.innerText = hasPlus ? newCount + '+' : newCount;
                        setTimeout(updateCount, 1);
                    } else {
                        counter.innerText = hasPlus ? target + '+' : target;
                    }
                };
                updateCount();
            });
        }
        // Trigger counter animation when hero section is in view
        const heroSection = document.querySelector('.hero');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    observer.unobserve(entry.target);
                }
            });
        });
        observer.observe(heroSection);

        // Form submission
        const form = document.getElementById('form');
        const result = document.getElementById('result');

        form.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(form);
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);
        result.innerHTML = "Please wait..."

            fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: json
                })
                .then(async (response) => {
                    let json = await response.json();
                    if (response.status == 200) {
                        result.innerHTML = "Form submitted successfully";
                    } else {
                        console.log(response);
                        result.innerHTML = json.message;
                    }
                })
                .catch(error => {
                    console.log(error);
                    result.innerHTML = "Something went wrong!";
                })
                .then(function() {
                    form.reset();
                    setTimeout(() => {
                        result.style.display = "none";
                    }, 3000);
                });
        });
        // Mobile menu close on link click
        document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
            link.addEventListener('click', () => {
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                    bsCollapse.hide();
                }
            });
        });

        // Add loading animation
        window.addEventListener('load', function() {
            document.body.style.opacity = '0';
            document.body.style.transition = 'opacity 0.5s ease-in-out';
            
            setTimeout(() => {
                document.body.style.opacity = '1';
            }, 100);
        });

        // Navbar active link highlighting
        window.addEventListener('scroll', function() {
            const sections = document.querySelectorAll('section[id]');
            const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
            
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (scrollY >= (sectionTop - 200)) {
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


        // Optional: Add click to expand functionality
        document.addEventListener('DOMContentLoaded', function() {
            const galleryItems = document.querySelectorAll('.gallery-item-container');
            
            // Create modal for expanded view
            const modal = document.createElement('div');
            modal.className = 'gallery-modal';
            modal.innerHTML = `
                <div class="gallery-modal-content">
                    <button class="gallery-modal-close">&times;</button>
                    <img src="" alt="">
                    <div class="text-center mt-3 text-white">
                        <h4 class="modal-title"></h4>
                        <p class="modal-description"></p>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);
            
            const modalImg = modal.querySelector('img');
            const modalTitle = modal.querySelector('.modal-title');
            const modalDescription = modal.querySelector('.modal-description');
            const closeBtn = modal.querySelector('.gallery-modal-close');
            
            // Add click event to gallery items
            galleryItems.forEach(item => {
                item.addEventListener('click', function() {
                    const img = this.querySelector('img');
                    const title = this.querySelector('h5').textContent;
                    const description = this.querySelector('p').textContent;
                    
                    modalImg.src = img.src;
                    modalImg.alt = img.alt;
                    modalTitle.textContent = title;
                    modalDescription.textContent = description;
                    modal.classList.add('active');
                });
            });
            
            // Close modal events
            closeBtn.addEventListener('click', function() {
                modal.classList.remove('active');
            });
            
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    modal.classList.remove('active');
                }
            });
            
            // Close with Escape key
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && modal.classList.contains('active')) {
                    modal.classList.remove('active');
                }
            });
        });

        // Add parallax effect to hero section
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            const rate = scrolled * -0.5;
            
            if (hero) {
                hero.style.transform = `translateY(${rate}px)`;
            }
        });

        // Service cards hover effect
        document.querySelectorAll('.service-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Project cards hover effect
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px) rotateY(5deg)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) rotateY(0deg)';
            });
        });

        document.querySelectorAll('.service-card').forEach((card, index) => {
        card.addEventListener('click', function() {
            const services = ['electrical', 'instrumentation', 'plc-scada', 'hvac', 'power-systems', 'solar-pv'];
            const serviceType = services[index] || 'electrical';
            window.location.href = `service-details.html?service=${serviceType}`;
        });
        });