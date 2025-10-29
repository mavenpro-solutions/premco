$(document).ready(function() {

    
    // ================================================================= //
    // ============== START: UNIVERSAL HEADER LOGIC ============== //
    // ================================================================= //

    // --- Sticky Header ---
    const header = $('#universal-header');
    if (header.length) {
        const scrollThreshold = 10; 

        $(window).on('scroll', function() {
            if (window.scrollY > scrollThreshold) {
                header.addClass('header-is-sticky');
            } else {
                header.removeClass('header-is-sticky');
            }
        });
    }

    // --- Mobile Menu Toggle ---
    const hamburgerButton = $('#hamburger-button');
    const mobileMenu = $('#mobile-menu');

    if (hamburgerButton.length && mobileMenu.length) {
        hamburgerButton.on('click', function() {
            mobileMenu.toggleClass('hidden');
        });
    }

    // =============================================================== //
    // ============== END: UNIVERSAL HEADER LOGIC ============== //
    // =============================================================== //

      // ================================================================= //
    // ============== START: NUMBER COUNTING ANIMATION CODE ============== //
    // ================================================================= //
    const counters = $('.number-counter');
    const animationDuration = 2000; // Duration in milliseconds (e.g., 2000ms = 2s)

    const startCounter = (counter) => {
        const finalValue = parseInt(counter.attr('data-final-value'), 10);
        let startTime = null;

        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const percentage = Math.min(progress / animationDuration, 1);
            const currentVal = Math.floor(percentage * finalValue);

            // Add commas for thousands and the appropriate suffix (+, km, %)
            let displayVal = currentVal.toLocaleString('en-US');
            if (counter.data('suffix') === '+') {
                displayVal += '+';
            } else if (counter.data('suffix') === 'km') {
                displayVal += ' km';
            } else if (counter.data('suffix') === '%') {
                displayVal += '%';
            }

            counter.text(displayVal);

            if (progress < animationDuration) {
                requestAnimationFrame(animate);
            } else {
                 // Ensure the final value is exactly as intended after animation
                 let finalDisplayVal = finalValue.toLocaleString('en-US');
                 if (counter.data('suffix') === '+') {
                    finalDisplayVal += '+';
                } else if (counter.data('suffix') === 'km') {
                    finalDisplayVal += ' km';
                } else if (counter.data('suffix') === '%') {
                    finalDisplayVal += '%';
                }
                 counter.text(finalDisplayVal);
            }
        };

        requestAnimationFrame(animate);
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const countersToAnimate = $(entry.target).find('.number-counter');
                countersToAnimate.each(function() {
                    startCounter($(this));
                });
                observer.unobserve(entry.target); // Stop observing after animation starts
            }
        });
    }, {
        root: null, // viewport
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    const trackRecordSection = $('#track-record-section');
    if (trackRecordSection.length) {
        observer.observe(trackRecordSection[0]);
    }
    // =============================================================== //
    // ============== END: NUMBER COUNTING ANIMATION CODE ============== //
    // =============================================================== //

    
// --- Initialize Swiper ---
const testimonialSwiper = new Swiper('.testimonial-swiper', {
    // Optional parameters
    loop: true,
    spaceBetween: 30, // Space between slides in px

    // Responsive breakpoints
    breakpoints: {
        // when window width is >= 640px
        640: {
            slidesPerView: 1,
        },
        // when window width is >= 768px
        768: {
            slidesPerView: 2,
        },
        // when window width is >= 1024px
        1024: {
            slidesPerView: 3,
        }
    },

    // Custom Navigation
    navigation: {
        nextEl: '.swiper-button-next-custom',
        prevEl: '.swiper-button-prev-custom',
    },
});


// ================================================================= //
// ============== START: SUSTAINABILITY SLIDER CODE ============== //
// ================================================================= //
const commitmentSwiper = new Swiper('.commitment-swiper', {
    loop: true,
    slidesPerView: 1,
    effect: 'fade', // Use a fade effect for smooth text transition
    fadeEffect: {
        crossFade: true
    },
    autoplay: {
        delay: 5000, // Change slide every 5 seconds
        disableOnInteraction: false,
    },
    // Custom Navigation
    navigation: {
        nextEl: '.commitment-swiper-next',
        prevEl: '.commitment-swiper-prev',
    },
});
// =============================================================== //
// ============== END: SUSTAINABILITY SLIDER CODE ============== //
// =============================================================== //


// ================================================================= //
// ============== START: FAQ ACCORDION CODE ============== //
// ================================================================= //
$('.faq-toggle').on('click', function() {
    const parentItem = $(this).closest('.faq-item');
    const content = parentItem.find('.faq-content');
    const icon = $(this).find('.faq-icon');

    // Find all sibling items within the same column
    const otherItems = parentItem.siblings('.faq-item');

    // Close all other items in the same column
    otherItems.removeClass('bg-white border-gray-200 shadow-md').addClass('bg-faq-blue border-transparent');
    otherItems.find('.faq-content').slideUp(300);
    otherItems.find('.faq-icon').removeClass('rotate-180');

    // Toggle the clicked item
    content.slideToggle(300);
    icon.toggleClass('rotate-180');
    parentItem.toggleClass('bg-white border-gray-200 shadow-md bg-faq-blue border-transparent');
});
// =============================================================== //
// ============== END: FAQ ACCORDION CODE ============== //
// =============================================================== //


// ================================================================= //
// ============== START: TEAM SLIDER CODE ============== //
// ================================================================= //
const teamSwiper = new Swiper('.team-swiper', {
    loop: true,
    spaceBetween: 24, // Space between slides in pixels

    // Responsive breakpoints
    breakpoints: {
        // when window width is >= 640px (sm)
        640: {
            slidesPerView: 1,
        },
        // when window width is >= 768px (md)
        768: {
            slidesPerView: 2,
        },
        // when window width is >= 1024px (lg)
        1024: {
            slidesPerView: 3,
        }
    },

    // Custom Navigation
    navigation: {
        nextEl: '.team-swiper-next',
        prevEl: '.team-swiper-prev',
    },
});
// =============================================================== //
// ============== END: TEAM SLIDER CODE ============== //
// =============================================================== //


// ================================================================= //
// ============== START: STICKY NAVBAR FOR CONTACT PAGE ============== //
// ================================================================= //
const navbar = $('#sticky-navbar');

// Check if the sticky navbar element exists on the current page
if (navbar.length) {
    // Get the initial top offset of the navbar
    const stickyPoint = navbar.offset().top;

    $(window).on('scroll', function() {
        // Compare the window's scroll position to the navbar's original position
        if (window.pageYOffset > stickyPoint) {
            navbar.addClass('navbar-sticky');
        } else {
            navbar.removeClass('navbar-sticky');
        }
    });
}
// =============================================================== //
// ============== END: STICKY NAVBAR FOR CONTACT PAGE ============== //
// =============================================================== //


// ================================================================= //
// ============== START: CUSTOM FILE UPLOAD LOGIC ============== //
// ================================================================= //
const fileUploadInput = $('#cv-upload');
const fileNameDisplay = $('#file-name-display');

if (fileUploadInput.length && fileNameDisplay.length) {
    fileUploadInput.on('change', function() {
        const fileName = $(this).val().split('\\').pop(); // Get the file name
        if (fileName) {
            fileNameDisplay.val(fileName); // Display it in the text field
        } else {
            fileNameDisplay.val('Upload your CV'); // Reset if no file is chosen
        }
    });
}
// =============================================================== //
// ============== END: CUSTOM FILE UPLOAD LOGIC ============== //
// =============================================================== //

});