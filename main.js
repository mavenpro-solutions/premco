$(document).ready(function () {
	// --- Desktop Sticky Header ---
	const header = $("#main-header");
	const scrollTrigger = 50; // Pixels to scroll before the header becomes sticky

	$(window).on("scroll", function () {
		// We only want this behavior on desktop (screens wider than 768px)
		if ($(window).width() > 768) {
			if ($(this).scrollTop() > scrollTrigger) {
				header.addClass("header-scrolled");
			} else {
				header.removeClass("header-scrolled");
			}
		}
	});

	// --- Mobile Menu Toggle ---
	$("#mobile-menu-button").on("click", function () {
		$("#mobile-menu").slideToggle("fast");
	});
});