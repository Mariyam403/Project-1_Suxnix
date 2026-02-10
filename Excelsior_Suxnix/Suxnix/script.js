const btnCart=document.getElementById('btnCart');
    const btnSearch=document.getElementById('btnSearch');
    const btnApps=document.getElementById('btnApps');
    const backdrop=document.getElementById('backdrop');
    const cartDrawer=document.getElementById('cartDrawer');
    const miniCart=document.getElementById('miniCart');
    const searchModal=document.getElementById('searchModal');
    const appsMenu=document.getElementById('appsMenu');
    const infoPanel=document.getElementById('infoPanel');
    const menu=document.getElementById('menu');
    const homeTrigger=document.getElementById('homeTrigger');
    const homeDropdown=document.getElementById('homeDropdown');
    const shopTrigger=document.getElementById('shopTrigger');
    const shopDropdown=document.getElementById('shopDropdown');
    const newsTrigger=document.getElementById('newsTrigger');
    const newsDropdown=document.getElementById('newsDropdown');

    function closeAll(){
      cartDrawer.classList.remove('open');
      miniCart.classList.remove('open');
      searchModal.classList.remove('open');
      appsMenu.classList.remove('open');
      infoPanel.classList.remove('open');
      homeDropdown?.classList.remove('open');
      backdrop.classList.remove('show');
    }

    btnCart?.addEventListener('click',()=>{
      closeAll();
      miniCart.classList.add('open');
      backdrop.classList.add('show');
    });
    btnSearch?.addEventListener('click',()=>{
      closeAll();
      searchModal.classList.add('open');
      backdrop.classList.add('show');
      document.getElementById('searchInput')?.focus();
    });
    btnApps?.addEventListener('click',()=>{
      closeAll();
      if(window.innerWidth>=1024){
        infoPanel.classList.add('open');
      }else{
        appsMenu.classList.add('open');
      }
      backdrop.classList.add('show');
    });

    const closeCartBtn = document.getElementById('closeCart');
    const closeInfoBtn = document.getElementById('closeInfo');
    const closeAppsBtn = document.getElementById('closeApps');

    if (closeCartBtn) closeCartBtn.addEventListener('click', closeAll);
    if (closeInfoBtn) closeInfoBtn.addEventListener('click', closeAll);
    if (closeAppsBtn) closeAppsBtn.addEventListener('click', closeAll);

    if (backdrop) backdrop.addEventListener('click', closeAll);
    window.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeAll(); });

    menu?.querySelectorAll('a')?.forEach(a=>a.addEventListener('click',()=>{
      if(menu?.classList?.contains('mobile')) menu?.classList?.remove('mobile');
    }));

    // Simple lightbox video popup
document.addEventListener('DOMContentLoaded', function() {
  const videoLinks = document.querySelectorAll('.popup-video');
  
  videoLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const videoUrl = this.getAttribute('href');
      const videoId = getYouTubeVideoId(videoUrl);
      
      // Create modal
      const modal = document.createElement('div');
      modal.className = 'video-modal';
      modal.innerHTML = `
        <div class="video-modal-content">
          <span class="video-modal-close">&times;</span>
          <iframe 
            width="100%" 
            height="100%" 
            src="https://www.youtube.com/embed/${videoId}?autoplay=1" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen>
          </iframe>
        </div>
      `;
      
      document.body.appendChild(modal);
      
      // Close modal
      const closeBtn = modal.querySelector('.video-modal-close');
      closeBtn.addEventListener('click', () => {
        modal.remove();
      });
      
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.remove();
        }
      });
    });
  });
  
  function getYouTubeVideoId(url) {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[7].length === 11) ? match[7] : false;
  }
});
// Counter Animation and Circle Progress
document.addEventListener('DOMContentLoaded', function() {
  
  // Intersection Observer for triggering animations
  const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateStats(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all stat items
  const statItems = document.querySelectorAll('.stat-item');
  statItems.forEach(item => observer.observe(item));

  function animateStats(statItem) {
    const circle = statItem.querySelector('.stat-circle');
    const counter = statItem.querySelector('.counter');
    const progressCircle = statItem.querySelector('.circle-progress');
    
    const percentage = parseInt(circle.getAttribute('data-percentage'));
    const target = parseInt(counter.getAttribute('data-target'));
    
    // Animate circle progress
    const circumference = 2 * Math.PI * 50; // radius = 50
    const offset = circumference - (percentage / 100) * circumference;
    progressCircle.style.strokeDashoffset = offset;
    
    // Animate counter
    animateCounter(counter, 0, target, 2000);
  }

  function animateCounter(element, start, end, duration) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        element.textContent = end;
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(current);
      }
    }, 16);
  }
});

// Simple scroll-reveal animation
window.addEventListener('scroll', () => {
    const section = document.querySelector('.suxnix-formula');
    const sectionPos = section.getBoundingClientRect().top;
    const screenPos = window.innerHeight / 1.3;

    if (sectionPos < screenPos) {
        section.style.opacity = "1";
        section.querySelector('.text-column').style.transform = "translateX(0)";
        section.querySelector('.image-column').style.transform = "translateX(0)";
    }
});

// Set initial state for animation
document.addEventListener('DOMContentLoaded', () => {
    const text = document.querySelector('.text-column');
    const img = document.querySelector('.image-column');
    
    text.style.transition = "all 0.8s ease-out";
    img.style.transition = "all 0.8s ease-out";
    
    text.style.transform = "translateX(-50px)";
    img.style.transform = "translateX(50px)";
});

// ---------------------------------------------------------------------------------------------------------//

document.querySelectorAll('.package-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });

    // Handle Buy Now clicks
    const btn = card.querySelector('.buy-now-btn');
    btn.addEventListener('click', (e) => {
        const packageName = card.querySelector('.bottle-count').innerText;
        console.log(`User selected: ${packageName} ${card.querySelector('.product-name').innerText}`);
        // Add redirect to cart logic here
    });
});

// ---------------------------------------------------------------------------------------------------------//


document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('track');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    const slides = Array.from(track.children);
    
    let index = 0;
    let autoPlayInterval;

    const updateCarousel = () => {
        const slideWidth = track.offsetWidth;
        track.style.transform = `translateX(-${index * slideWidth}px)`;
    };

    const moveNext = () => {
        index++;
        if (index >= slides.length) {
            index = 0; // Reset to first slide
        }
        updateCarousel();
    };

    const movePrev = () => {
        index--;
        if (index < 0) {
            index = slides.length - 1; // Move to last slide
        }
        updateCarousel();
    };

    // Button Click Listeners
    nextBtn.addEventListener('click', () => {
        moveNext();
        startAutoPlay(); // Reset timer on manual click
    });

    prevBtn.addEventListener('click', () => {
        movePrev();
        startAutoPlay(); // Reset timer on manual click
    });

    // Auto-Play Logic (Left to Right)
    const startAutoPlay = () => {
        clearInterval(autoPlayInterval);
        autoPlayInterval = setInterval(moveNext, 5000); // Moves every 5 seconds
    };

    // Initial Start
    startAutoPlay();

    // Responsive adjustment
    window.addEventListener('resize', () => {
        // Disable transition during resize to prevent "snapping" visuals
        track.style.transition = 'none';
        updateCarousel();
        setTimeout(() => {
            track.style.transition = 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)';
        }, 10);
    });
});

// ---------------------------------------------------------------------------------------------------------//

  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach(item => {
    const header = item.querySelector(".faq-header");
    const arrow = item.querySelector(".arrow");

    header.addEventListener("click", () => {
      faqItems.forEach(i => {
        i.classList.remove("active");
        i.querySelector(".arrow").textContent = "▼";
      });

      item.classList.add("active");
      arrow.textContent = "▲";
    });
  });


// ---------------------------------------------------------------------------------------------------------//

document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('testimonialTrack');
    const slides = Array.from(track.children);
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    
    let currentIdx = 0;

    const moveSlide = (targetIdx) => {
        const slideWidth = slides[0].getBoundingClientRect().width;
        track.style.transform = `translateX(-${targetIdx * slideWidth}px)`;
        currentIdx = targetIdx;
    };

    // Right to Left Default Auto-play
    const autoPlay = () => {
        currentIdx++;
        if (currentIdx >= slides.length) currentIdx = 0;
        moveSlide(currentIdx);
    };

    let timer = setInterval(autoPlay, 5000);

    // Click Events
    nextBtn.addEventListener('click', () => {
        clearInterval(timer);
        currentIdx = (currentIdx + 1) % slides.length;
        moveSlide(currentIdx);
        timer = setInterval(autoPlay, 5000);
    });

    prevBtn.addEventListener('click', () => {
        clearInterval(timer);
        currentIdx = (currentIdx - 1 + slides.length) % slides.length;
        moveSlide(currentIdx);
        timer = setInterval(autoPlay, 5000);
    });
});

// ---------------------------------------------------------------------------------------------------------//
// Contact.html

document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.info-card');
    
    // Animate cards on load
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease-out';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 200 * index);
    });
});

// ---------------------------------------------------------------------------------------------------------//


// Initialize Google Map
function initMap() {
  // Barclays Center coordinates
  const barclaysCenter = { lat: 40.6826, lng: -73.9754 };
  
  // Map options
  const mapOptions = {
    zoom: 12,
    center: barclaysCenter,
    styles: [
      {
        featureType: "water",
        elementType: "geometry",
        stylers: [{ color: "#a2daf2" }]
      },
      {
        featureType: "landscape.man_made",
        elementType: "geometry",
        stylers: [{ color: "#f7f1df" }]
      }
    ]
  };
  
  // Create map
<div class="map-side">
  <iframe 
    class="google-map"
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3025.4068193095703!2d-73.9775827!3d40.6826!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25bae694479a3%3A0xb9949385da52e69e!2sBarclays%20Center!5e0!3m2!1sen!2sus!4v1234567890"
    style="border:0;" 
    allowfullscreen="" 
    loading="lazy">
  </iframe>
</div>  

  // Add marker
  const marker = new google.maps.Marker({
    position: barclaysCenter,
    map: map,
    title: "Barclays Center",
    animation: google.maps.Animation.DROP
  });
  
  // Info window
  const infoWindow = new google.maps.InfoWindow({
    content: `
      <div style="padding: 10px; font-family: Arial, sans-serif;">
        <h3 style="margin: 0 0 5px 0; font-size: 16px;">Barclays Center</h3>
        <p style="margin: 0; font-size: 14px; color: #666;">620 Atlantic Ave, Brooklyn, NY 11217, United States</p>
        <p style="margin: 5px 0 0 0; font-size: 14px;">
          <span style="color: #ff9800;">★★★★☆</span> 4.5 (22,780 reviews)
        </p>
      </div>
    `
  });
  
  // Show info window on marker click
  marker.addEventListener("click", () => {
    infoWindow.open(map, marker);
  });
}

// Form submission handler
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
      };
      
      // Form validation
      if (!formData.name || !formData.email || !formData.subject || !formData.message) {
        alert('Please fill in all fields');
        return;
      }
      
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        alert('Please enter a valid email address');
        return;
      }
      
      // Here you would normally send the data to your server
      console.log('Form submitted:', formData);
      
      // Show success message
      alert('Thank you! Your message has been sent successfully.');
      
      // Reset form
      contactForm.reset();
    });
  }
  
  // Custom select styling enhancement
  const selectElement = document.getElementById('subject');
  if (selectElement) {
    selectElement.addEventListener('change', function() {
      if (this.value) {
        this.style.color = '#333';
      }
    });
  }
});


/* ---------------------------------------------------------------------------------- */

// login.js

// Form submission handler
document.addEventListener('DOMContentLoaded', function() {
  const loginForm = document.getElementById('loginForm');
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  
  // Login form submission
  if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const remember = document.getElementById('remember').checked;
      
      // Basic validation
      if (!email || !password) {
        alert('Please fill in all fields');
        return;
      }
      
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return;
      }
      
      // Password validation (minimum 6 characters)
      if (password.length < 6) {
        alert('Password must be at least 6 characters long');
        return;
      }
      
      // Here you would normally send the data to your server
      console.log('Login attempt:', {
        email: email,
        password: password,
        remember: remember
      });
      
      // Simulate successful login
      alert('Login successful! Welcome back!');
      
      // Redirect to dashboard or home page
      // window.location.href = '/dashboard';
    });
  }
  
  // Scroll to top button functionality
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  });
  
  scrollTopBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  // Password visibility toggle (optional enhancement)
  const passwordInput = document.getElementById('password');
  
  // Add show/hide password button (optional)
  // You can add this feature if needed
  
  // Remember me functionality
  const rememberCheckbox = document.getElementById('remember');
  
  // Check if user was remembered
  if (localStorage.getItem('rememberedEmail')) {
    document.getElementById('email').value = localStorage.getItem('rememberedEmail');
    rememberCheckbox.checked = true;
  }
  
  // Save email if remember me is checked
  loginForm.addEventListener('submit', function() {
    if (rememberCheckbox.checked) {
      localStorage.setItem('rememberedEmail', document.getElementById('email').value);
    } else {
      localStorage.removeItem('rememberedEmail');
    }
  });
});

// Add input focus effects
document.querySelectorAll('.form-group input').forEach(input => {
  input.addEventListener('focus', function() {
    this.parentElement.classList.add('focused');
  });
  
  input.addEventListener('blur', function() {
    this.parentElement.classList.remove('focused');
  });
});

/* ---------------------------------------------------------------------------------------------------------------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', function() {
  const registerForm = document.getElementById('registerForm');
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  const passwordInput = document.getElementById('password');
  const confirmPasswordInput = document.getElementById('confirmPassword');
  const passwordHint = document.getElementById('passwordHint');
  const passwordMatch = document.getElementById('passwordMatch');
  
  // Password strength checker
  passwordInput.addEventListener('input', function() {
    const password = this.value;
    const strength = checkPasswordStrength(password);
    
    if (password.length === 0) {
      passwordHint.textContent = '';
      passwordHint.className = 'password-hint';
      this.classList.remove('error', 'success');
      return;
    }
    
    if (strength === 'weak') {
      passwordHint.textContent = 'Weak password. Use at least 8 characters with numbers and symbols.';
      passwordHint.className = 'password-hint weak';
      this.classList.add('error');
      this.classList.remove('success');
    } else if (strength === 'medium') {
      passwordHint.textContent = 'Medium strength. Add more variety for better security.';
      passwordHint.className = 'password-hint medium';
      this.classList.remove('error', 'success');
    } else {
      passwordHint.textContent = 'Strong password!';
      passwordHint.className = 'password-hint strong';
      this.classList.add('success');
      this.classList.remove('error');
    }
    
    // Check password match when password changes
    checkPasswordMatch();
  });
  
  // Confirm password matcher
  confirmPasswordInput.addEventListener('input', checkPasswordMatch);
  
  function checkPasswordMatch() {
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    
    if (confirmPassword.length === 0) {
      passwordMatch.textContent = '';
      passwordMatch.className = 'password-match';
      confirmPasswordInput.classList.remove('error', 'success');
      return;
    }
    
    if (password === confirmPassword) {
      passwordMatch.textContent = 'Passwords match!';
      passwordMatch.className = 'password-match success';
      confirmPasswordInput.classList.add('success');
      confirmPasswordInput.classList.remove('error');
    } else {
      passwordMatch.textContent = 'Passwords do not match.';
      passwordMatch.className = 'password-match error';
      confirmPasswordInput.classList.add('error');
      confirmPasswordInput.classList.remove('success');
    }
  }
  
  function checkPasswordStrength(password) {
    let strength = 0;
    
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;
    
    if (strength <= 2) return 'weak';
    if (strength <= 4) return 'medium';
    return 'strong';
  }
  
  // Form submission handler
  registerForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    
    // Validation
    let isValid = true;
    
    // Check if all fields are filled
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      alert('Please fill in all fields');
      isValid = false;
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address');
      isValid = false;
      return;
    }
    
    // Password validation
    if (password.length < 6) {
      alert('Password must be at least 6 characters long');
      isValid = false;
      return;
    }
    
    // Password match validation
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      isValid = false;
      return;
    }
    
    if (isValid) {
      // Here you would normally send the data to your server
      console.log('Registration data:', {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
      });
      
      // Simulate successful registration
      alert('Account created successfully! Welcome to Suxnix!');
      
      // Redirect to login or dashboard
      // window.location.href = '/login';
      
      // Reset form
      registerForm.reset();
      passwordHint.textContent = '';
      passwordMatch.textContent = '';
    }
  });
  
  // Scroll to top button functionality
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  });
  
  scrollTopBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  // Add input focus effects
  document.querySelectorAll('.form-group input').forEach(input => {
    input.addEventListener('focus', function() {
      this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
      this.parentElement.classList.remove('focused');
    });
  });
});

/* ---------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* ourshop.html */

let allProducts = [];

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Store all products
    allProducts = Array.from(document.querySelectorAll('.product-card'));
    
    // Initialize filters
    initializeSortFilter();
    initializePriceFilter();
    initializeCategoryFilter();
    initializeTagFilter();
    
    // Update product count
    updateProductCount();
});

// Sort Filter
function initializeSortFilter() {
    const sortSelect = document.getElementById('sortSelect');
    
    sortSelect.addEventListener('change', function() {
        const sortValue = this.value;
        const productsGrid = document.getElementById('productsGrid');
        const visibleProducts = Array.from(allProducts).filter(product => !product.classList.contains('hidden'));
        
        // Sort products based on selection
        let sortedProducts = [...visibleProducts];
        
        switch(sortValue) {
            case 'alphabetically-az':
                sortedProducts.sort((a, b) => {
                    const nameA = a.dataset.name.toLowerCase();
                    const nameB = b.dataset.name.toLowerCase();
                    return nameA.localeCompare(nameB);
                });
                break;
                
            case 'alphabetically-za':
                sortedProducts.sort((a, b) => {
                    const nameA = a.dataset.name.toLowerCase();
                    const nameB = b.dataset.name.toLowerCase();
                    return nameB.localeCompare(nameA);
                });
                break;
                
            case 'price-low-high':
                sortedProducts.sort((a, b) => {
                    return parseFloat(a.dataset.price) - parseFloat(b.dataset.price);
                });
                break;
                
            case 'price-high-low':
                sortedProducts.sort((a, b) => {
                    return parseFloat(b.dataset.price) - parseFloat(a.dataset.price);
                });
                break;
                
            case 'best-selling':
                // For demo purposes, shuffle randomly
                sortedProducts.sort(() => Math.random() - 0.5);
                break;
                
            case 'date-old-new':
                // Keep original order
                sortedProducts = visibleProducts;
                break;
                
            case 'date-new-old':
                // Reverse order
                sortedProducts.reverse();
                break;
                
            default: // featured
                sortedProducts = visibleProducts;
        }
        
        // Clear grid
        productsGrid.innerHTML = '';
        
        // Re-append sorted products
        sortedProducts.forEach(product => {
            productsGrid.appendChild(product);
        });
        
        // Re-append hidden products at the end
        allProducts.forEach(product => {
            if (product.classList.contains('hidden') && !productsGrid.contains(product)) {
                productsGrid.appendChild(product);
            }
        });
    });
}

// Price Filter
function initializePriceFilter() {
    const minPriceSlider = document.getElementById('minPrice');
    const maxPriceSlider = document.getElementById('maxPrice');
    const minPriceDisplay = document.getElementById('minPriceDisplay');
    const maxPriceDisplay = document.getElementById('maxPriceDisplay');
    const filterBtn = document.getElementById('filterBtn');
    const sliderTrack = document.querySelector('.slider-track');
    
    // Update display when sliders move
    minPriceSlider.addEventListener('input', function() {
        const minVal = parseInt(this.value);
        const maxVal = parseInt(maxPriceSlider.value);
        
        if (minVal >= maxVal) {
            this.value = maxVal - 10;
        }
        
        minPriceDisplay.textContent = this.value;
        updateSliderTrack();
    });
    
    maxPriceSlider.addEventListener('input', function() {
        const minVal = parseInt(minPriceSlider.value);
        const maxVal = parseInt(this.value);
        
        if (maxVal <= minVal) {
            this.value = minVal + 10;
        }
        
        maxPriceDisplay.textContent = this.value;
        updateSliderTrack();
    });
    
    // Filter on button click
    filterBtn.addEventListener('click', function() {
        applyPriceFilter();
    });
    
    function updateSliderTrack() {
        const minVal = parseInt(minPriceSlider.value);
        const maxVal = parseInt(maxPriceSlider.value);
        const minPercent = (minVal / 280) * 100;
        const maxPercent = (maxVal / 280) * 100;
        
        sliderTrack.style.background = `linear-gradient(to right, #e0e0e0 ${minPercent}%, #2ecc71 ${minPercent}%, #2ecc71 ${maxPercent}%, #e0e0e0 ${maxPercent}%)`;
    }
    
    function applyPriceFilter() {
        const minPrice = parseInt(minPriceSlider.value);
        const maxPrice = parseInt(maxPriceSlider.value);
        
        allProducts.forEach(product => {
            const productPrice = parseFloat(product.dataset.price);
            
            if (productPrice >= minPrice && productPrice <= maxPrice) {
                product.classList.remove('hidden');
            } else {
                product.classList.add('hidden');
            }
        });
        
        updateProductCount();
        
        // Re-apply current sort
        const sortSelect = document.getElementById('sortSelect');
        sortSelect.dispatchEvent(new Event('change'));
    }
    
    // Initialize slider track
    updateSliderTrack();
}

// Category Filter
function initializeCategoryFilter() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    let activeCategory = null;
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.dataset.category;
            
            // Toggle active state
            if (activeCategory === category) {
                // Deactivate
                this.classList.remove('active');
                activeCategory = null;
                showAllProducts();
            } else {
                // Remove active from all buttons
                categoryButtons.forEach(btn => btn.classList.remove('active'));
                
                // Activate current button
                this.classList.add('active');
                activeCategory = category;
                
                // Filter products
                filterByCategory(category);
            }
        });
    });
}

function filterByCategory(category) {
    allProducts.forEach(product => {
        const productCategories = product.dataset.category.split(' ');
        
        if (productCategories.includes(category)) {
            product.classList.remove('hidden');
        } else {
            product.classList.add('hidden');
        }
    });
    
    updateProductCount();
    
    // Re-apply current sort
    const sortSelect = document.getElementById('sortSelect');
    sortSelect.dispatchEvent(new Event('change'));
}

// Tag Filter
function initializeTagFilter() {
    const tagButtons = document.querySelectorAll('.tag-btn');
    let activeTag = null;
    
    tagButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tag = this.dataset.tag;
            
            // Toggle active state
            if (activeTag === tag) {
                // Deactivate
                this.classList.remove('active');
                activeTag = null;
                showAllProducts();
            } else {
                // Remove active from all buttons
                tagButtons.forEach(btn => btn.classList.remove('active'));
                
                // Activate current button
                this.classList.add('active');
                activeTag = tag;
                
                // Filter products
                filterByTag(tag);
            }
        });
    });
}

function filterByTag(tag) {
    allProducts.forEach(product => {
        const productTags = product.dataset.tags.split(' ');
        
        if (productTags.includes(tag)) {
            product.classList.remove('hidden');
        } else {
            product.classList.add('hidden');
        }
    });
    
    updateProductCount();
    
    // Re-apply current sort
    const sortSelect = document.getElementById('sortSelect');
    sortSelect.dispatchEvent(new Event('change'));
}

// Show all products
function showAllProducts() {
    allProducts.forEach(product => {
        product.classList.remove('hidden');
    });
    
    updateProductCount();
    
    // Re-apply current sort
    const sortSelect = document.getElementById('sortSelect');
    sortSelect.dispatchEvent(new Event('change'));
}

// Update product count
function updateProductCount() {
    const visibleProducts = allProducts.filter(product => !product.classList.contains('hidden'));
    const totalProducts = allProducts.length;
    const visibleCount = visibleProducts.length;
    
    document.getElementById('showing-count').textContent = visibleCount > 0 ? `1-${visibleCount}` : '0';
    document.getElementById('total-count').textContent = totalProducts;
}

// Add to cart functionality
document.addEventListener('click', function(e) {
    if (e.target.closest('.add-to-cart')) {
        const productCard = e.target.closest('.product-card');
        const productName = productCard.querySelector('.product-title').textContent;
        
        // Simple alert for demo
        alert(`Added "${productName}" to cart!`);
        
        // Update cart badge
        const badge = document.querySelector('.badge');
        const currentCount = parseInt(badge.textContent);
        badge.textContent = currentCount + 1;
    }
});

/* ------------------------------------------------------------------------------------------------------- */
/* shopdetails.html */

function changeImage(thumbnail) {
    // Change main image source
    document.getElementById('current-img').src = thumbnail.src;
    
    // Update active class
    document.querySelectorAll('.thumb').forEach(t => t.classList.remove('active'));
    thumbnail.classList.add('active');
}

function updateQty(val) {
    const qtyInput = document.getElementById('qty');
    let current = parseInt(qtyInput.value);
    if (current + val >= 1) {
        qtyInput.value = current + val;
    }
}

document.querySelectorAll('.badge').forEach(badge => {
    badge.addEventListener('click', (e) => {
        console.log("Filtering by: " + e.target.innerText);
        // You could redirect to a search page here
    });
});

 document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');

            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
});

// Add to Cart functionality
        document.querySelectorAll('.btn-add-to-cart').forEach(button => {
            button.addEventListener('click', function() {
                // Add animation feedback
                this.style.transform = 'scale(0.9)';
                setTimeout(() => {
                    this.style.transform = 'scale(1.1)';
                }, 100);
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 200);

                // You can add your cart logic here
                console.log('Product added to cart');
            });
        });

        // Buy Now functionality
        document.querySelectorAll('.btn-buy-now').forEach(button => {
            button.addEventListener('click', function() {
                // Add click animation
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
                
                // You can add your buy now logic here
                console.log('Buy now clicked');
            });
        });

        // Pagination dots functionality
        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                // Remove active class from all dots
                dots.forEach(d => d.classList.remove('active'));
                // Add active class to clicked dot
                this.classList.add('active');
                
                // You can add carousel/slider logic here
                console.log('Switched to page:', index + 1);
            });
        });

/* --------------------------------------------------------------------------------------------------------------------- */
/* ourblog.html */

document.querySelector('.search-btn').addEventListener('click', function() {
    const searchInput = document.querySelector('.search-input');
    const searchTerm = searchInput.value.trim();
    
    if (searchTerm) {
        console.log('Searching for:', searchTerm);
        // Add your search logic here
        alert('Searching for: ' + searchTerm);
    }
});

// Search on Enter key
document.querySelector('.search-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        document.querySelector('.search-btn').click();
    }
});

// Smooth scroll for read more button
document.querySelector('.read-more-btn').addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({
        top: document.querySelector('.post-image-secondary').offsetTop - 100,
        behavior: 'smooth'
    });
});

// Add hover effect to popular posts
const popularPosts = document.querySelectorAll('.popular-post');
popularPosts.forEach(post => {
    post.addEventListener('mouseenter', function() {
        this.style.transform = 'translateX(5px)';
        this.style.transition = 'transform 0.3s ease';
    });
    
    post.addEventListener('mouseleave', function() {
        this.style.transform = 'translateX(0)';
    });
});

// Category hover effect
const categoryItems = document.querySelectorAll('.category-item');
categoryItems.forEach(item => {
    item.style.cursor = 'pointer';
    item.addEventListener('mouseenter', function() {
        this.style.backgroundColor = '#f8f9fa';
        this.style.transition = 'background-color 0.3s ease';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.backgroundColor = 'transparent';
    });
});

// Social Icons Click Handler
        const socialIcons = document.querySelectorAll('.social-icon');
        socialIcons.forEach(icon => {
            icon.addEventListener('click', function(e) {
                e.preventDefault();
                const socialPlatform = this.getAttribute('data-social');
                console.log(`Clicked on ${socialPlatform}`);
                
                // Add animation effect
                this.style.transform = 'scale(0.9)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 200);
                
                // You can add actual social media links here
                // window.open('https://facebook.com/yourpage', '_blank');
            });
        });

        // Twitter Feed Links
        const tweetLinks = document.querySelectorAll('.tweet-link');
        tweetLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                console.log('Opening tweet link:', this.href);
            });
        });

        // Instagram Items Click Handler
        const instagramItems = document.querySelectorAll('.instagram-item');
        instagramItems.forEach(item => {
            item.addEventListener('click', function() {
                console.log('Instagram item clicked');
                // Add your Instagram lightbox or redirect logic here
                // For example: openLightbox(this.querySelector('.instagram-image').src);
                
                // Add click animation
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
            });
        });

        // Popular Tags Click Handler
        const tags = document.querySelectorAll('.tag');
        tags.forEach(tag => {
            tag.addEventListener('click', function(e) {
                e.preventDefault();
                const tagName = this.getAttribute('data-tag');
                console.log(`Filtering by tag: ${tagName}`);
                
                // Remove active class from all tags
                tags.forEach(t => t.classList.remove('active'));
                
                // Add active class to clicked tag
                this.classList.add('active');
                
                // You can add filtering logic here
                // filterPostsByTag(tagName);
            });
        });

        // Add active state style
        const style = document.createElement('style');
        style.textContent = `
            .tag.active {
                background: #10b981 !important;
                color: #fff !important;
                border-color: #10b981 !important;
            }
        `;
        document.head.appendChild(style);

        // Twitter Feed Animation on Scroll
        function animateOnScroll() {
            const twitterFeeds = document.querySelectorAll('.twitter-feed');
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '0';
                        entry.target.style.transform = 'translateX(-20px)';
                        
                        setTimeout(() => {
                            entry.target.style.transition = 'all 0.5s ease';
                            entry.target.style.opacity = '1';
                            entry.target.style.transform = 'translateX(0)';
                        }, 100);
                    }
                });
            }, { threshold: 0.1 });
            
            twitterFeeds.forEach(feed => observer.observe(feed));
        }

        // Initialize animations
        animateOnScroll();

        // Instagram Grid Stagger Animation
        function staggerInstagramGrid() {
            const instagramItems = document.querySelectorAll('.instagram-item');
            instagramItems.forEach((item, index) => {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                
                setTimeout(() => {
                    item.style.transition = 'all 0.4s ease';
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, index * 50);
            });
        }

        // Run stagger animation on load
        window.addEventListener('load', staggerInstagramGrid);

        // Lazy Loading for Instagram Images
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.classList.add('loaded');
                        imageObserver.unobserve(img);
                    }
                });
            });

            const images = document.querySelectorAll('.instagram-image');
            images.forEach(img => imageObserver.observe(img));
        }

        // Add tooltip to social icons
        socialIcons.forEach(icon => {
            const platform = icon.getAttribute('data-social');
            icon.setAttribute('title', `Follow us on ${platform.charAt(0).toUpperCase() + platform.slice(1)}`);
        });

        // Count tweets and display
        const tweetCount = document.querySelectorAll('.twitter-feed').length;
        console.log(`Total tweets displayed: ${tweetCount}`);

        // Instagram counter
        const instagramCount = document.querySelectorAll('.instagram-item').length;
        console.log(`Total Instagram posts: ${instagramCount}`);

        // Tags counter
        const tagsCount = document.querySelectorAll('.tag').length;
        console.log(`Total tags available: ${tagsCount}`);

/* ----------------------------------------------------------------------------------------------- */
/* blogdetails.html */

//Comment form submission
const commentForm = document.getElementById('commentForm');
        
commentForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const message = document.getElementById('commentMessage').value;
    const name = document.getElementById('commentName').value;
    const email = document.getElementById('commentEmail').value;
    
    if (message && name && email) {
        console.log('Comment submitted:', { message, name, email });
        
        // Show success message
        alert('Thank you for your comment! It has been submitted for review.');
        
        // Reset form
        commentForm.reset();
    }
});

// Form field focus effects
const formControls = document.querySelectorAll('.form-control');

formControls.forEach(control => {
    control.addEventListener('focus', function() {
        this.parentElement.querySelector('.form-icon').style.color = '#10b981';
    });
    
    control.addEventListener('blur', function() {
        this.parentElement.querySelector('.form-icon').style.color = '#999';
    });
});

// Share buttons functionality
const shareIcons = document.querySelectorAll('.share-icon');

shareIcons.forEach(icon => {
    icon.addEventListener('click', function(e) {
        e.preventDefault();
        
        const platform = this.getAttribute('aria-label');
        console.log(`Sharing on ${platform}`);
        
        // Add animation
        this.style.transform = 'scale(0.9)';
        setTimeout(() => {
            this.style.transform = '';
        }, 200);
        
        // You can add actual sharing functionality here
        // Example: window.open('https://twitter.com/share?url=' + encodeURIComponent(window.location.href));
    });
});

// Tag items click handler
const tagItems = document.querySelectorAll('.tag-item');

tagItems.forEach(tag => {
    tag.addEventListener('click', function(e) {
        e.preventDefault();
        const tagName = this.textContent;
        console.log(`Filtering by tag: ${tagName}`);
        
        // You can add filtering logic here
    });
});

// Post navigation links
const navLinks = document.querySelectorAll('.nav-post');

navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const direction = this.classList.contains('next') ? 'Next' : 'Previous';
        console.log(`Navigating to ${direction} post`);
        
        // Add your navigation logic here
    });
});

// Smooth scroll animation for checklist items
const checklistItems = document.querySelectorAll('.checklist-item');

const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateX(-20px)';
            
            setTimeout(() => {
                entry.target.style.transition = 'all 0.5s ease';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }, 100);
            
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

checklistItems.forEach(item => observer.observe(item));

// Quote box animation
const quoteBox = document.querySelector('.quote-box');

const quoteObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'scale(0.95)';
            
            setTimeout(() => {
                entry.target.style.transition = 'all 0.6s ease';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'scale(1)';
            }, 200);
            
            quoteObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

if (quoteBox) {
    quoteObserver.observe(quoteBox);
}

// Form validation with custom messages
const emailInput = document.getElementById('commentEmail');

emailInput.addEventListener('blur', function() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (this.value && !emailRegex.test(this.value)) {
        this.style.borderLeft = '3px solid #ef4444';
    } else {
        this.style.borderLeft = 'none';
    }
});

// Character counter for message (optional)
const messageArea = document.getElementById('commentMessage');
let charCount = 0;

messageArea.addEventListener('input', function() {
    charCount = this.value.length;
    console.log(`Characters: ${charCount}`);
});

// Submit button hover effect enhancement
const submitButton = document.querySelector('.submit-button');

submitButton.addEventListener('mouseenter', function() {
    this.querySelector('i').style.transform = 'rotate(15deg)';
});

submitButton.addEventListener('mouseleave', function() {
    this.querySelector('i').style.transform = 'rotate(0deg)';
});


/* ----------------------------------------------------------------------------------------------- */
