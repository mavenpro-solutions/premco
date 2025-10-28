$(document).ready(function() {

    // --- Mobile Menu Toggle ---
    $('#hamburger-button').on('click', function() {
        $('#mobile-menu').toggleClass('hidden');
    });

    // --- Sticky Header Logic ---
    const header = $('#main-header');
    const logoContainer = $('#main-logo-container');
    const stickyThreshold = 50; // How many pixels to scroll before the header becomes sticky

    $(window).on('scroll', function() {
        // Check if the user has scrolled past the threshold
        if ($(window).scrollTop() > stickyThreshold) {
            header.addClass('header-scrolled');
            logoContainer.addClass('lg:hidden'); // Hide the main logo on desktop
        } else {
            header.removeClass('header-scrolled');
            logoContainer.removeClass('lg:hidden'); // Show the main logo on desktop
        }
    });


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


// --- Modal Logic ---
const modal = $('#testimonial-modal');
const modalOverlay = $('#modal-overlay');
const modalQuote = $('#modal-quote');
const modalAuthor = $('#modal-author');
const closeModalButton = $('#close-modal-button');

// Open modal when a "Read More" link is clicked
$('.open-modal-link').on('click', function(e) {
    e.preventDefault();
    const quote = $(this).siblings('p.testimonial-quote').text();
    const author = $(this).siblings('cite.testimonial-author').text();

    modalQuote.text(quote);
    modalAuthor.text(author);

    modal.removeClass('hidden');
});

// Function to close the modal
const closeModal = () => {
    modal.addClass('hidden');
};

// Close modal using the button or by clicking the overlay
closeModalButton.on('click', closeModal);
modalOverlay.on('click', closeModal);



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

});