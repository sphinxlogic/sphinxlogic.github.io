jQuery( document ).ready( function( $ ) {

    body_margin = parseInt( $('#page_content').css('margin-top') );

    /******************************************/
    /*** debouncing function from John Hann ***/
    /******************************************/
        (function($,sr){
            var debounce = function (func, threshold, execAsap) {
                var timeout;
                return function debounced () {
                    var obj = this, args = arguments;
                    function delayed () {
                        if (!execAsap)
                            func.apply(obj, args);
                        timeout = null;
                    };
                    if (timeout)
                        clearTimeout(timeout);
                    else if (execAsap)
                        func.apply(obj, args);
                    timeout = setTimeout(delayed, threshold || 100);
                };
            }
            // smartresize
            jQuery.fn[sr] = function(fn){
                return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr);
            };
        })(jQuery,'smartresize');


        // Refresh Waypoints after browser resize:
        $(window).smartresize(function(){
            Waypoint.refreshAll();
            body_margin = parseInt( $('#page_content').css('margin-top') );
        });



    /*********************************/
    /*** TRIGGER THE STICKY HEADER ***/
    /*********************************/

        var header_waypoint = new Waypoint({

            element: document.getElementById('page_content'),
            handler: function(direction) {
                var site_header = $('#site_header');
                header_height = site_header.height();
                body_margin_fix = header_height + body_margin;

                $('.sd-header-menu-row').each(function() {
                    $(this).css('display','');
                });
                $('#sticky_toggle i').removeClass('fa-close').addClass('fa-bars');

                if ( direction === 'down' ) {
                    $(site_header).slideDown().addClass('fixed-top');
                    $('#page_content').css('margin-top', body_margin_fix );

                }

                if ( direction === 'up' ) {
                    $(site_header).removeClass('fixed-top');
                    $('#page_content').css('margin-top', body_margin );

                }

            }

        });



    /************************************/
    /*** OPEN THE STICKY HEADER MENUS ***/
    /************************************/

        $('#sticky_toggle').on( 'click', function(event) {

            $('.sd-header-menu-row').each(function() {

                if( $(this).is(':visible') ) { // Hide the menus
                    $(this).css('display','');
                    $('#sticky_toggle i').removeClass('fa-close').addClass('fa-bars');

                } else { // Show the menus
                    $(this).show();
                    $('#sticky_toggle i').removeClass('fa-bars').addClass('fa-close');

                }

            });

        });



    /****************/
    /*** FUNCTION ***/
    /****************/

        function sd_has_class( element, className ) {
            return (" " + element.className + " ").replace(/[\n\t]/g, " ").indexOf(" " + className + " ") > -1
        }



    /*****************************/
    /*** FIXED HEADER FUNCTION ***/
    /*****************************/

        function sd_fixed_header() {
            // correct for wpadminbar
            var wpadminbar_height   = 0 + $('#wpadminbar').height(); // keep 0 for when height returns null

            if ( isNaN(wpadminbar_height) ) {
                var wpadminbar_height   = 0;
            }

            $('html').css('margin-top', wpadminbar_height );

            var sd_top_ad_height    = $('.sd-top-ad').height();
            var sd_main_menu_height = $('.site-header-container').height();

            if ( isNaN(sd_top_ad_height) ) {
                var sd_top_ad_height   = 0;

            if ( isNaN(sd_main_menu_height) ) {
                var sd_main_menu_height   = 0;
            }            }

            /*
            if ( $(window).width() > 991 ) {
                if ( $(window).scrollTop() > (sd_top_ad_height) ) {
                    $('.sd-header').addClass('sd-fixed-header');
                    $('.sd-header').css('top', 0 + wpadminbar_height );
                    $('html').css('margin-top', sd_main_menu_height + wpadminbar_height);
                    $('html').css('margin-bottom', sd_main_menu_height + wpadminbar_height);
                } else {
                    $('.sd-header').removeClass('sd-fixed-header');
                    $('.sd-header').css('top','auto');
                    $('html').css('margin-top', 0 + wpadminbar_height);
                    $('html').css('margin-bottom', 0 + wpadminbar_height);
                }
            } else {
                var sd_mobile_menu_height = $('.dmbs-mobile-menu').height();
                $('.dmbs-mobile-menu').css('top', 0 + wpadminbar_height);
                $('html').css('margin-top', 0 + wpadminbar_height + sd_mobile_menu_height );
                $('html').css('margin-bottom', 0 + wpadminbar_height + sd_mobile_menu_height );
                $('.dmbs-container').css('margin-top',0);
                $('#wpadminbar').css('position','fixed');
            }
            */


            if ( $(window).width() > 991 ) {

//                $('.sd-top-ad').addClass('sd-fixed-header').css('width', '100%').css('left', '');;
//                $('.sd-top-ad').css('top', 0 + wpadminbar_height );
//                $('.sd-header').addClass('sd-fixed-header');
//                $('.sd-header').css('top', 0 + wpadminbar_height + sd_top_ad_height );
//  $('.site-header-container').css('top', 0 + wpadminbar_height + sd_top_ad_height );
//                $('html').css('margin-top', sd_main_menu_height + sd_top_ad_height + wpadminbar_height);
//                $('html').css('margin-bottom', sd_main_menu_height + sd_top_ad_height + wpadminbar_height);
//$('.site-body-container').css('margin-top', sd_main_menu_height + 36 );

            } else {
                var sd_mobile_menu_height = $('.dmbs-mobile-menu').height();
                $('.dmbs-mobile-menu').css('top', 0 + wpadminbar_height);
                $('.sd-top-ad').addClass('sd-fixed-header').css('width', '100%').css('left', '15px');
                $('.sd-top-ad').css('top', 0 + wpadminbar_height + sd_mobile_menu_height );

//                $('html').css('margin-top', 0 + wpadminbar_height + sd_mobile_menu_height + sd_top_ad_height );
//                $('html').css('margin-bottom', 0 + wpadminbar_height + sd_mobile_menu_height + sd_top_ad_height );
$('.site-body-container').css('margin-top', 0 + wpadminbar_height + sd_mobile_menu_height + sd_top_ad_height );
//                $('.dmbs-container').css('margin-top',0);
                $('#wpadminbar').css('position','fixed');
            }


            /*
            var sd_total_header_height = sd_top_ad_height + sd_main_menu_height ;

            if ( $(window).width() > 991 ) {
                $('html').css('margin-top', sd_total_header_height + wpadminbar_height);
                $('html').css('margin-bottom', sd_total_header_height + wpadminbar_height);

            } else {
                var sd_mobile_menu_height = $('.dmbs-mobile-menu').height();
                $('.dmbs-mobile-menu').css('top', 0 + wpadminbar_height);
                $('.sd-fixed-header').css('margin-top',0 + wpadminbar_height + sd_mobile_menu_height);
                $('html').css('margin-top', 0 + wpadminbar_height + sd_mobile_menu_height + sd_total_header_height );
                $('html').css('margin-bottom', 0 + wpadminbar_height + sd_mobile_menu_height + sd_total_header_height );
                $('.dmbs-container').css('margin-top',0);
                $('#wpadminbar').css('position','fixed');
            }
            */



        }


    /******************/
    /*** MENU HOVER ***/
    /******************/

        $('.dmbs-top-menu .dropdown').hover(
            function() {
                // handler in
                if( $() )
                $(this).find('.dropdown-menu').first().stop(true, true).delay(150).slideDown();
            },
            function() {
                // handler out
                $(this).find('.dropdown-menu').first().stop(true, true).slideUp(1);
            }
        );



    /*************************************/
    /*** DROP DOWN MENU CLICK FUNCTION ***/
    /*************************************/

        $('.dmbs-top-menu .dropdown > a').click(function(){
            location.href = this.href;
        });



    /******************************************************/
    /*** move mobile topic nav to last position in menu ***/
    /******************************************************/

        $('#menu-main-desktop').append('<li id="menu-item-topics" class="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children dropdown"><a title="Topics" href="#" data-toggle="dropdown" class="dropdown-toggle" aria-haspopup="true">Topics <span class="caret"></span></a></li>');
        $('.mobile-topic-nav > ul').attr('role','menu');
        $('.mobile-topic-nav > ul').attr('class','dropdown-menu');
        $('#menu-item-topics').append( $('.mobile-topic-nav > ul') );



    /************************************/
    /*** SHOW AND HIDE THE SEARCH BOX ***/
    /************************************/

        $('#searchtoggle').on( 'click', function(event) {
            event.preventDefault();

            var search_input = $('#___gcse_0');
            var search_width = 250;
            var search_position = search_input.position();

            // HIDE THE SEARCH
            if( search_input.is(':visible') ) {
                $('#searchtoggle .one i').removeClass('fa-chevron-left').addClass('fa-search');

                search_input.animate(
                    {
                        left: -10,
                        width: 0
                    },
                    {
                        duration: 400,
                        complete: function() {
                            search_input.hide();
                            $('#searchtoggle').toggleClass('active');
                        }
                    }
                );


            // SHOW THE SEARCH
            } else {
                $('#searchtoggle').toggleClass('active');
                $('#searchtoggle .one i').removeClass('fa-search').addClass('fa-chevron-left');

                search_input.show();
                search_input.animate(
                    {
                        left:  40,
                        width: search_width
                    },
                    {
                        duration: 400,
                    }
                );

            }
        });

        $(document).mouseup(function (e) {
            if( $('#___gcse_0').is(':visible') ) {
                var container = $("#top-search-form");
                if(!container.is(e.target) && container.has(e.target).length === 0) {
                    $('#searchtoggle .one i').removeClass('fa-chevron-left').addClass('fa-search');
                    $('#___gcse_0').animate(
                        {
                            left: -10,
                            width: 0
                        },
                        {
                            duration: 400,
                            complete: function() {
                                $('#___gcse_0').hide();
                                $('#searchtoggle').toggleClass('active');
                            }
                        }
                    );

                }
            }
        });



    /***********************************************/
    /*** Custom Post Smart CTA                   ***/
    /*** (see mu-plugins/custom-post-smart-cta ) ***/
    /***********************************************/

        var smart_cta = $('#custom-post-smart-cta').detach();

        if ( sd_has_class( $('body')[0], 'single-post') ) {
            var paragraphs = $('.postContent p');

            if ( paragraphs.length >= 6 ) {
                var half = Math.floor( paragraphs.length / 2 );
                smart_cta.insertAfter( paragraphs[ half - 1 ] );
                smart_cta.show();
            } else {
                $('.postContent').append( smart_cta );
                smart_cta.show();
            }
        }



    /****************************************************/
    /*** Open external links in articles in a new tab ***/
    /****************************************************/

        var all_links = $('.postContent a');

        $.each( all_links, function(i,link) {
            var external = link.hostname && link.hostname !== location.hostname;
            if( external ) {
                $(link).attr('target','_blank');
            }
        } );



    /*****************************************************************/
    /*** CALL FIXED HEADER FUNCTION, ON LOAD, ON SCROLL, ON RESIZE ***/
    /*****************************************************************/

         $(window).load(function() {

            sd_fixed_header();

        });

        $(window).scroll( function() {

            sd_fixed_header();

        });

        $(window).resize( function() {

            sd_fixed_header();

        });


});
