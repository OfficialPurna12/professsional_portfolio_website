 // Dark Mode Toggle
        const themeToggle = document.getElementById('themeToggle');
        const themeIcon = document.getElementById('themeIcon');
        const html = document.documentElement;

        // Check for saved theme preference
        const currentTheme = localStorage.getItem('theme');
        if (currentTheme) {
            html.setAttribute('data-theme', currentTheme);
            updateThemeIcon(currentTheme);
        }

        themeToggle.addEventListener('click', () => {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });

        function updateThemeIcon(theme) {
            if (theme === 'dark') {
                themeIcon.classList.remove('bi-moon-fill');
                themeIcon.classList.add('bi-sun-fill');
            } else {
                themeIcon.classList.remove('bi-sun-fill');
                themeIcon.classList.add('bi-moon-fill');
            }
        }

        // Certificate Modal Functions
        function openCertificate(certId) {
            const modal = document.getElementById('certificateModal');
            const img = document.getElementById('certificateImage');
            
            // Set certificate image path (upload your certificates to /images/ folder)
            if (certId === 'certificate1') {
                img.src = 'assets/images/ui_ux_certificate.png'; // Upload UI/UX certificate
            } else if (certId === 'certificate2') {
                img.src = 'assets/images/Graphics_Design.png'; // Upload Graphic Design certificate
            }else if (certId === 'certificate3') {
                img.src = 'assets/images/2.jpg'; // Upload Web Development certificate
            }
            
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeCertificate(event) {
            if (!event || event.target.id === 'certificateModal' || event.target.closest('.certificate-close')) {
                const modal = document.getElementById('certificateModal');
                modal.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        }

        // Close modal on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeCertificate();
            }
        });

        // Navbar Scroll Effect
        const navbar = document.querySelector('.navbar');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Back to Top Button
        const backToTop = document.getElementById('backToTop');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTop.classList.add('active');
            } else {
                backToTop.classList.remove('active');
            }
        });

        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        // Smooth Scrolling for Navigation Links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    // Close mobile menu if open
                    const navbarCollapse = document.querySelector('.navbar-collapse');
                    if (navbarCollapse.classList.contains('show')) {
                        navbarCollapse.classList.remove('show');
                    }
                }
            });
        });

        // Fade In Animation on Scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Animate progress bars if inside the element
                    const progressBars = entry.target.querySelectorAll('.progress-bar');
                    progressBars.forEach(bar => {
                        const width = bar.getAttribute('data-width');
                        bar.style.width = width;
                    });
                }
            });
        }, observerOptions);

        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });

        // Form Validation
        const contactForm = document.getElementById('contactForm');
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            
            // Reset validation states
            [name, email, message].forEach(field => {
                field.classList.remove('is-invalid');
            });
            
            // Validate Name
            if (name.value.trim() === '') {
                name.classList.add('is-invalid');
                isValid = false;
            }
            
            // Validate Email
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email.value.trim())) {
                email.classList.add('is-invalid');
                isValid = false;
            }
            
            // Validate Message
            if (message.value.trim() === '') {
                message.classList.add('is-invalid');
                isValid = false;
            }
            
            if (isValid) {
                // Show success message (in real scenario, you would send data to server)
                alert('Thank you for your message! I will get back to you soon.');
                contactForm.reset();
            }
        });

        // Add active class to nav links based on scroll position
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');

        window.addEventListener('scroll', () => {
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
                if (link.getAttribute('href').slice(1) === current) {
                    link.classList.add('active');
                }
            });
        });