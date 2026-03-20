(function ($) {
  "use strict";

  /* SlickNav Responsive Menu */
  $('#responsive-menu').slicknav({
    duration: 500,
    easingOpen: 'easeInExpo',
    easingClose: 'easeOutExpo',
    closedSymbol: '<i class="arrow-indicator fa fa-angle-down"></i>',
    openedSymbol: '<i class="arrow-indicator fa fa-angle-up"></i>',
    prependTo: '#slicknav-mobile',
    allowParentLinks: true,
    label: ""
  });

  /* Dropdown Menu */
  var selected = $('#navbar li');
  selected.on("mouseenter", function () {
      $(this).find('ul').first().stop(true, true).delay(350).slideDown(500, 'easeInOutQuad');
  }).on("mouseleave", function () {
      $(this).find('ul').first().stop(true, true).delay(100).slideUp(150, 'easeInOutQuad');
  });

  /* Arrow Indicator for Submenus */
  if ($(window).width() > 992) {
      $(".navbar-arrow ul ul > li").has("ul").children("a").append("<i class='arrow-indicator fa fa-angle-right'></i>");
  }
  
     /* Back-to-top js Start */
    $(document).ready(() => {
      $('#back-to-top, .fast-service-badge').hide(); // Hide button initially
  
      $(window).on('scroll', () => {
          if ($(window).scrollTop() > 500) {
              $('#back-to-top, .fast-service-badge').fadeIn(200);
          } else {
              $('#back-to-top, .fast-service-badge').fadeOut(200);
          }
      });
  
      $(document).on('click', '#back-to-top, .back-to-top', () => {
          $('html, body').animate({
              scrollTop: 0
          }, 500);
          return false;
      });
    });

     /* Counter JS Start */
    document.addEventListener("DOMContentLoaded", () => {
        const valueDisplays = document.querySelectorAll(".num");
        const totalDuration = 2000; // total duration in ms
        const stepTime = 20;        // time per update in ms

        valueDisplays.forEach((valueDisplay) => {
            let startValue = 0;

            const endValue = parseFloat(valueDisplay.getAttribute("data-val"));

            if (isNaN(endValue)) return;

            // detect decimal places (e.g. 4.9 → 1, 4.75 → 2)
            const decimalPlaces = (endValue.toString().split(".")[1] || "").length;

            const steps = totalDuration / stepTime;
            const increment = endValue / steps;

            const counter = setInterval(() => {
            startValue += increment;

            if (startValue >= endValue) {
                valueDisplay.textContent = endValue.toFixed(decimalPlaces);
                clearInterval(counter);
            } else {
                valueDisplay.textContent = startValue.toFixed(decimalPlaces);
            }
            }, stepTime);
        });
    });
    /* Counter JS End */


    // Slider 
    $('.banner-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 6000,
        arrows: false,
        dots: false,
        fade: true,
    });

    $('.banner-slider1').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        arrows: false,
        dots: false,
        fade: true,
    });

    $('.partner-slider').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        arrows: false,
        dots: false,
        responsive: [
        { breakpoint: 1400, settings: { slidesToShow: 2, slidesToScroll: 1 } },
        { breakpoint: 786, settings: { slidesToShow: 1, slidesToScroll: 1 } },
        ]
    });

    $('.partner-slider1').slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        arrows: false,
        dots: false,
        responsive: [
        { breakpoint: 1400, settings: { slidesToShow: 4, slidesToScroll: 1 } },
        { breakpoint: 986, settings: { slidesToShow: 3, slidesToScroll: 1 } },
        { breakpoint: 786, settings: { slidesToShow: 1, slidesToScroll: 1 } },
        ]
    });

    $('.partner-slider2').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        arrows: false,
        dots: false,
        responsive: [
        { breakpoint: 1400, settings: { slidesToShow: 3, slidesToScroll: 1 } },
        { breakpoint: 986, settings: { slidesToShow: 2, slidesToScroll: 1 } },
        { breakpoint: 786, settings: { slidesToShow: 1, slidesToScroll: 1 } },
        ]
    });

    $('.service-slider').slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        arrows: false,
        dots: false,
        responsive: [
        { breakpoint: 1400, settings: { slidesToShow: 3, slidesToScroll: 1 } },
        { breakpoint: 976, settings: { slidesToShow: 2, slidesToScroll: 1 } },
        { breakpoint: 786, settings: { slidesToShow: 1, slidesToScroll: 1 } }
        ]
    });

    $('.service-slider1').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        arrows: false,
        dots: false,
        responsive: [
        { breakpoint: 1400, settings: { slidesToShow: 3, slidesToScroll: 1 } },
        { breakpoint: 976, settings: { slidesToShow: 2, slidesToScroll: 1 } },
        { breakpoint: 786, settings: { slidesToShow: 1, slidesToScroll: 1 } }
        ]
    });

    $('.testimonial-slider').slick({
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        arrows: false,
        dots: false,
        responsive: [
        { breakpoint: 786, settings: { slidesToShow: 1, slidesToScroll: 1 } },
        ]
    });

    $('.testimonial1-slider').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        centerPadding: '0px',
        centerMode: true,
        arrows: false,
        dots: false,
        responsive: [
        { breakpoint: 976, settings: { slidesToShow: 2, slidesToScroll: 1 } },
        { breakpoint: 786, settings: { slidesToShow: 1, slidesToScroll: 1 } },
        ]
    });
    

    /* Counter for progress bar start */
    let valueDisplayss = document.querySelectorAll(".progress-num");
    let intervall = 3000;

    valueDisplayss.forEach((valueDisplay) => {
        let startValue = 0;
        let endValue = parseInt(valueDisplay.getAttribute("data-val"),10);
        let duration = Math.floor(intervall / endValue);
        let counter = setInterval(function() {
            startValue += 1;
            valueDisplay.textContent = startValue;
            if (startValue === endValue) {
                clearInterval(counter);
            }
        }, duration);
    });


    /* Countdown Timer */
    const targetTime = new Date(Date.now() + 100 * 24 * 60 * 60 * 1000); // 100 days from now
    function updateCountdown() {
      const now = Date.now();
      const diff = targetTime - now;
      if (diff <= 0) {
        clearInterval(interval);
        $('#days, #hours, #minutes, #seconds').text('00');
        return;
      }
      
      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / (1000 * 60)) % 60);
      const s = Math.floor((diff / 1000) % 60);

      $('#days').text(d);
      $('#hours').text(h.toString().padStart(2, '0'));
      $('#minutes').text(m.toString().padStart(2, '0'));
      $('#seconds').text(s.toString().padStart(2, '0'));
    }
    
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);


    // SlickSlider for Fancybox 
    $(document).ready(function(){
    // Main slider
        $('.slider-for').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        asNavFor: '.slider-nav'
        });

        // Thumbnail slider
        $('.slider-nav').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        asNavFor: '.slider-for',
        dots: false,
        centerMode: true,
        focusOnSelect: true
        });

        // Fancybox
        Fancybox.bind("[data-fancybox='gallery']", {});
    });

    document.addEventListener('DOMContentLoaded', function () {
    // Check if Chart.js is loaded
        if (typeof Chart === 'undefined') return;

        // Check if canvas exists
        const ctx = document.getElementById('myChart');
            if (!ctx) return;

            new Chart(ctx, {
                type: 'bar',
                data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
                datasets: [{
                    label: 'Hrs in Gym',
                    data: [120, 190, 260, 250, 220],
                    backgroundColor: '#dc3545'
                }]
                },
                options: {
                responsive: true
                }
        });

    });

    const ctx1 = document.getElementById('myChart1');
        if (ctx1) {
            new Chart(ctx1, {
            type: 'pie',
            data: {
                labels: ['Protein', 'Creatine', 'Vitamins'],
                datasets: [{
                data: [45, 30, 25],
                backgroundColor: ['#A3050B', '#1D1E21', '#DC1D24'],
                borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                plugins: {
                legend: {
                    position: 'top'
                }
                }
            }
            });
        }

    /* Spin Animation For Banner */
    document.addEventListener("DOMContentLoaded", () => {
        const letters = document.querySelectorAll(".spin");

        letters.forEach((letter, index) => {
            letter.style.animationDelay = `${index * 0.12}s`;
        });
    });

    // Flip Animation
    document.addEventListener("DOMContentLoaded", function () {

        const words = document.querySelectorAll(".dynamic-text");

        // Do nothing if no dynamic text exists
        if (!words || words.length === 0) return;

        let index = 0;
        const interval = 2500;

        setInterval(function () {
            const current = words[index];
            if (!current) return;

            current.classList.remove("active");
            current.classList.add("inactive");

            index = (index + 1) % words.length;
            const next = words[index];

            if (!next) return;

            next.classList.remove("inactive");
            next.classList.add("active");

        }, interval);

    });



})(jQuery);
