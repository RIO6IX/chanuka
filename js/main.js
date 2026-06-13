
'use strict';

(function ($) {

    function setBackground($element) {
        if (!$element.length || $element.data('bg-loaded')) {
            return;
        }

        var bg = $element.data('setbg');

        if (bg) {
            $element.css('background-image', 'url(' + bg + ')');
            $element.data('bg-loaded', true);
        }
    }

    function loadVisibleBackgrounds($scope) {
        $scope.find('.set-bg').addBack('.set-bg').each(function () {
            setBackground($(this));
        });
    }

    function initPortfolioPagination() {
        var $gallery = $('.portfolio__gallery');
        var $pagination = $('.pagination__option');

        if (!$gallery.length || !$pagination.length) {
            return false;
        }

        var $items = $gallery.children('.mix');
        var itemsPerPage = 12;
        var activeFilter = '*';
        var currentPage = 1;

        function getFilteredItems() {
            if (activeFilter === '*') {
                return $items;
            }

            return $items.filter(activeFilter);
        }

        function renderPagination(totalPages) {
            var paginationHtml = '<a href="#" class="arrow__pagination left__arrow"><span class="arrow_left"></span> Prev</a>';

            for (var i = 1; i <= totalPages; i++) {
                paginationHtml += '<a href="#" class="number__pagination" data-page="' + i + '">' + i + '</a>';
            }

            paginationHtml += '<a href="#" class="arrow__pagination right__arrow">Next <span class="arrow_right"></span></a>';
            $pagination.html(paginationHtml).toggle(totalPages > 1);
        }

        function showPage(page) {
            var $filteredItems = getFilteredItems();
            var totalPages = Math.max(Math.ceil($filteredItems.length / itemsPerPage), 1);

            currentPage = Math.min(Math.max(page, 1), totalPages);

            var start = (currentPage - 1) * itemsPerPage;
            var end = start + itemsPerPage;

            $items.hide();
            $filteredItems.slice(start, end).show();
            loadVisibleBackgrounds($filteredItems.slice(start, end));

            renderPagination(totalPages);
            $pagination.find('[data-page="' + currentPage + '"]').addClass('active');
            $pagination.find('.left__arrow').toggleClass('disabled', currentPage === 1);
            $pagination.find('.right__arrow').toggleClass('disabled', currentPage === totalPages);
        }

        $('.portfolio__filter li').on('click', function () {
            $('.portfolio__filter li').removeClass('active');
            $(this).addClass('active');
            activeFilter = $(this).data('filter');
            showPage(1);
        });

        $pagination.on('click', 'a', function (event) {
            event.preventDefault();

            var $link = $(this);

            if ($link.hasClass('disabled') || $link.hasClass('active')) {
                return;
            }

            if ($link.hasClass('left__arrow')) {
                showPage(currentPage - 1);
            } else if ($link.hasClass('right__arrow')) {
                showPage(currentPage + 1);
            } else {
                showPage(parseInt($link.data('page'), 10));
            }

            $('html, body').animate({
                scrollTop: $('.portfolio').offset().top - 90
            }, 250);
        });

        showPage(1);
        return true;
    }

    /*------------------
        Preloader
    --------------------*/
    $(window).on('load', function () {
        $(".loader").fadeOut();
        $("#preloder").delay(200).fadeOut("slow");

        /*------------------
            Portfolio filter
        --------------------*/
        if (!initPortfolioPagination() && $('.portfolio__gallery').length > 0) {
            $('.portfolio__filter li').on('click', function () {
                $('.portfolio__filter li').removeClass('active');
                $(this).addClass('active');
            });
            var containerEl = document.querySelector('.portfolio__gallery');
            var mixer = mixitup(containerEl);
        }
    });

    /*------------------
        Background Set
    --------------------*/
    $('.set-bg').not('.portfolio__gallery .set-bg').each(function () {
        setBackground($(this));
    });

    //Masonary
    $('.work__gallery').masonry({
        itemSelector: '.work__item',
        columnWidth: '.grid-sizer',
        gutter: 10
    });

    /*------------------
		Navigation
	--------------------*/
    $(".mobile-menu").slicknav({
        prependTo: '#mobile-menu-wrap',
        allowParentLinks: true
    });

    /*------------------
		Hero Slider
	--------------------*/
    $('.hero__slider').owlCarousel({
        loop: true,
        dots: true,
        mouseDrag: false,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        items: 1,
        margin: 0,
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: true,
    });

    var dot = $('.hero__slider .owl-dot');
    dot.each(function () {
        var index = $(this).index() + 1;
        if (index < 10) {
            $(this).html('0').append(index);
        } else {
            $(this).html(index);
        }
    });

    /*------------------
        Testimonial Slider
    --------------------*/
    $(".testimonial__slider").owlCarousel({
        loop: true,
        margin: 0,
        items: 3,
        dots: true,
        dotsEach: 2,
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: true,
        responsive: {
            992: {
                items: 3
            },
            768: {
                items: 2
            },
            320: {
                items: 1
            }
        }
    });

    /*------------------
        Latest Slider
    --------------------*/
    $(".latest__slider").owlCarousel({
        loop: true,
        margin: 0,
        items: 3,
        dots: true,
        dotsEach: 2,
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: true,
        responsive: {
            992: {
                items: 3
            },
            768: {
                items: 2
            },
            320: {
                items: 1
            }
        }
    });

    /*------------------
        Logo Slider
    --------------------*/
    $(".logo__carousel").owlCarousel({
        loop: true,
        margin: 100,
        items: 6,
        dots: false,
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: true,
        responsive: {
            992: {
                items: 5
            },
            768: {
                items: 4
            },
            480: {
                items: 3
            },
            320: {
                items: 2
            }
        }
    });

    /*------------------
        Video Popup
    --------------------*/
    $('.video-popup').magnificPopup({
        type: 'iframe'
    });

    /*------------------
        Counter
    --------------------*/
    $('.counter_num').each(function () {
        var targetNumber = $(this).text();

        $(this).prop('Counter', 0).animate({
            Counter: targetNumber
        }, {
            duration: 4000,
            easing: 'swing',
            step: function (now) {
                $(this).text(Math.ceil(now));
            },
            complete: function () {
                $(this).text(targetNumber);
            }
        });
    });

})(jQuery);






