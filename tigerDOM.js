/**
 * TigerDOM Plugin
 * TigerDOM is a multi-function jQuery plugin that allows you to do a multitude of things elegantly in the DOM.
 * Author: Beau Beauchamp, WebTIGERS
 * License: MIT
 * Version 2.0.0
 */

( function ( $ ) {

    // The baseTime is the speed of all animations within the plugin. //
    let baseTime        = 400;
    let baseTimeFast    = 200;

    let Class = {

        init : function ( ) {

            $(document).ready(function() {

            });

        },

        /* ============ TIGER Utility DOM Functions ============ */

        /**
         * Animates the count, up or down, of any numbers. Call this function like this:
         *
         * $().tigerDOM('animateCount', {
         *      begin    : some_number,
         *      end      : another_number, 
         *      callback : function( c ){ console.log( c ); }
         * });
         *
         */
        animateCount : function ( oParams ) {

            let from = { count : oParams.begin };
            let to   = { count : oParams.end };

            $(from).animate(to, {
                duration: baseTime,
                step: function() {
                    oParams.callback(Math.round(this.count));
                },
                complete: function () {
                    oParams.callback( oParams.end );
                }
            });
        },

        /**
         * Counts the number of properties (keys) in an array
         */
        count : function ( obj ) {
            let count = 0, key;
            for (key in obj) {
                if (obj.hasOwnProperty(key)) { count++; }
            }
            return count;
        },

        /**
         * A utility function that sets all of the passed in
         * elements to the same height as the tallest element
         */
        equalHeights : function ( ) {

            let tallest = 0;

            $(this).each( function() {

                let thisHeight = $(this).height();
                if(thisHeight > tallest) {
                    tallest = thisHeight;
                }
            });

            $(this).height(tallest);
        },

        initScrollTo : function ( ) {

            $('[data-tiger-scrollto]').each(function() {

                let $control = $(this);
                let $target = $($control.attr('data-tiger-scrollto'));

                $control.on( 'click', function ( ) {
                    $('html, body').animate({
                        scrollTop: $target.offset().top
                    }, 1000);
                });

            });

        },

        /* ============ TIGER Elegant DOM Functions ============ */

        /**
         * Container Controls
         *
         * Searches the DOM looking for the attribute:
         *
         *     data-tiger-control="#container-element"
         *
         * The target then becomes the control for toggling (opening and closing the target container. Sweet!
         *
         * If the initial state of the control is to be hidden, set the container element to display:none
         * with a class named "hide".
         *
         *     .hide { display: none; }
         *
         * Initialize the toggle controls in your JS like this:
         *
         *     $().tigerDOM('initTigerControls');
         *
         * To toggle a class on an open/close icon, setup your trigger with data attributes of
         * data-tiger-class-open="tiger-open" and data-tiger-class-close="tiger-close". TigerDOM
         * will apply these classes to your trigger icon for open and close operations.
         *
         *     <div class="p-3 mb-3" style="cursor :pointer;" data-tiger-control="#demo-container" data-tiger-class-open="tiger-open" data-tiger-class-close="tiger-close">
         *        <i class="fa fa-angle-down mr-1 tiger-open" style="margin-top: -8px; float: left"></i>
         *     </div>
         *
         */
        initTigerControls : function ( ) {

            $('[data-tiger-control]').each(function(){

                let $control = $(this);
                let $icon = $control.find('i');
                let $target = $( $control.attr('data-tiger-control') );

                let toggleClose = function ( $icon, $target ){
                    $icon.addClass( $control.attr('data-tiger-class-close') );
                    $icon.removeClass( $control.attr('data-tiger-class-open') );
                    $target.tigerDOM('close');
                }

                let toggleOpen = function ( $icon, $target ){
                    $icon.addClass( $control.attr('data-tiger-class-open') );
                    $icon.removeClass( $control.attr('data-tiger-class-close') );
                    $target.tigerDOM('open');
                }

                /** Setup initial state if the target is hidden. */
                if ( ! $target.is(':visible') ) {
                    $target.css('overflow', 'hidden').css('height', '0').css('opacity', '0').css('display', '').removeClass('hide');
                    toggleClose( $icon, $target );
                }

                $(this).on('click', {target:$target}, function( event ){
                    event.preventDefault();
                    if ( ! $target.is(':visible') ) {
                        toggleOpen( $icon, $target );
                    } else {
                        toggleClose( $icon, $target );
                    }
                });
            });

        },

        /**
         * TIGER Elegant Show
         *
         * Elegatnly fades in a hidden element with the .hide class.
         *
         *   .hide { display: none; }
         *
         * Pass in a callback function to automatically call the function once the animation completes.
         */
        show : function ( callback ) {

            return this.each(function(){

                let $this = $(this);

                $this.css('opacity', 0)
                    .removeClass('hide')
                    .animate( {opacity: 1}, baseTime, callback(this) );

            });

        },

        /**
         * TIGER Elegant Hide
         *
         * Elegantly fades out an element.
         *
         * Pass in a callback function to automatically call the function
         * once the animation completes.
         */
        hide : function ( callback ) {

            return this.each(function(){

                let $this = $(this);

                $this.animate({opacity: 0}, baseTime, callback(this));

            });

        },

        /**
         * TIGER Elegant Open
         *
         * Elegantly opens the container element with a smooth animation and then fades in the invisible content.
         *
         * NOTE: The Target container element's CSS style should already be set to "overflow:hidden;"
         */
        open : function ( callback ) {

            let fnCallback = (typeof callback === 'function') ? callback : null;

            return this.each(function(){

                let $this = $(this);

                $this.removeClass( 'hide' );
                let height = parseInt( $this.prop('scrollHeight'), 10 );

                $this
                    .css( 'opacity' , 0 )
                    .css( 'height'  , 0 )
                    .css( 'overflow', 'hidden' );

                // Expand the target container to accommodate the hidden content.
                $this.animate( { height : height }, baseTime, function(){

                    // Now make the content visible.
                    $this.animate( { opacity : 1 }, baseTime, function(){
                        $this.css( 'height', '' ).css( 'overflow', '').css( 'opacity', '');
                        fnCallback;
                    });

                });

            });

        },

        /**
         * TIGER Elegant Close
         *
         * Fades out the container contents and then closes the
         * container with a smooth animation.
         *
         * NOTE: the Target container element's CSS needs to be
         * set to "overflow:hidden;"
         */
        close : function ( callback ) {

            callback = (typeof callback == 'function')
                ? callback
                : null;

            return this.each(function(){

                let $this = $(this);

                return $this.css('overflow', 'hidden').animate({
                    'opacity': 0
                }, baseTime, function(){
                    $this.animate({
                        'height': 0
                    }, baseTime, function (){
                        $this.addClass('hide');
                        $this.css('opacity', '').css('height', '').css('display', '');
                        callback;
                    });
                });

            });
        },

        /**
         * TIGER Elegant Insert
         *
         * Insert elegantly inserts content into a container (target)
         * based on the oParams set.
         *
         * let oMessage = { 
         *      content       : '',
         *      removeClick   : false,
         *      removeTimeout : 0
         * };
         *
         * NOTE: the Target container element's CSS needs to be
         * set to "overflow:hidden;"
         */
        insert : function ( oParams ) {

            let callback = (typeof oParams.callback == 'function')
                ? oParams.callback
                : function ( ) { return false; };

            return this.each( function ( ) {

                let $this = $(this);

                // Helps us get a more accurate parentHeight.
                $this.css('position','relative')
                    .css('overflow', 'auto');

                // Get the current height of the parent container element 
                // let parentHeight = $this.prop('clientHeight');
                let parentHeight = $this.prop('scrollHeight');

                // Now specifically set the height of container element.
                $this.css('height', parentHeight);

                // Create and insert the content
                let $content = $( oParams.content ).css('opacity', 0).appendTo( $this );

                $this.css('height', 'auto');
                // The fully expanded container innerHeight
                let containerHeight = $this.innerHeight();
                $this.css('overflow','hidden').css('height', parentHeight);

                // Expand or contract the container
                containerHeight = ( oParams.content !== '' ) ? containerHeight : 0;

                // Expand/contract the target container to accommodate the new invisible content
                $this.animate({'height': containerHeight}, baseTime, function () {
                    $content.animate({opacity: 1}, baseTime, callback( $this[0] ) );
                });

                // Attach a removeClick listener (optional)
                if (oParams.removeClick && oParams.removeClick === true) {
                    $content
                        .addClass('pointer')
                        .on('click', function( ) {
                            $this = $(this);
                            $this.tigerDOM('remove');
                        });
                }

                // Attach a removeTimeout listener (optional)
                if (oParams.removeTimeout && oParams.removeTimeout > 0) {
                    setTimeout( function( ){$content.tigerDOM('remove');}, oParams.removeTimeout );
                }

            });

        },

        /**
         * TIGER Elegant Remove
         *
         * Remove function elegantly deletes content (targeted elements).
         */
        remove : function ( callback ) {

            callback = (typeof callback === 'function')
                ? callback
                : null;

            return this.each(function(){

                let $content = $(this);
                let contentHeight = $content.outerHeight(true);

                let $parent  = $content.parent();

                // Helps us get more accurate heights.
                $parent
                    .css('position','relative')
                    .css('overflow', 'auto');

                let parentHeight = $parent.innerHeight();

                let height = parseInt(parentHeight - contentHeight, 10);
                let adjustedHeight = ( $parent.children().length > 0 ) ? height : 1;
                let minHeight = parseInt( $parent.css('min-height'), 10 );

                adjustedHeight = ( minHeight > 0 ) ? minHeight : adjustedHeight;

                // set an element static height on the container
                $parent.css('height', parentHeight);

                return $content.animate({'opacity': 0}, baseTime, function(){

                    // Computed margins and padding need to dealt with for a smooth animation.
                    // So we engage in a little CSS gymnastics for a smooth removal of the elements
                    // that doesn't make the DOM jump around.
                    let style = $content[0].currentStyle || window.getComputedStyle( $content[0] );
                    let elHeight = parseInt(style.height,10) +
                        parseInt(style.marginTop,10) + parseInt(style.marginBottom,10);

                    $content
                        .css('margin-top', 0)
                        .css('margin-bottom', 0)
                        .css('height', elHeight)
                        .css('overflow', 'hidden')
                        .css('padding-top', 0)
                        .css('padding-bottom', 0);

                    $content.animate({'height': 0 }, baseTime, function(){

                        // Prevent browsers like Chrome from collapsing empty elements
                        if ( adjustedHeight === 0 ) { $parent.css('margin-bottom', '1px') }

                        $content.remove();

                        return $parent.animate( {'height': adjustedHeight}, baseTime, callback );

                    });
                });

            });

        },

        /**
         * TIGER Elegant Change
         *
         * Sometimes we want to elegantly change (remove and then insert)
         * the content. Target the parent with the oParams content (see
         * insert for the params object).
         *
         * NOTE: See insert() function for oParams.
         */
        change : function ( oParams ) {

            return this.each(function(){

                let $target = $(this);

                $target
                    .css('position','relative')
                    .css('overflow', 'auto');

                // fade out all the kids
                if ($target.children().length > 0) {

                    // Set the parent height so it doesn't change 
                    // height when children are removed
                    $target.css('height', $target.innerHeight());

                    // Queue fadeOut of any children
                    $target.queue('change', function(next){
                        $target.children().each(function(){
                            $(this).fadeOut(baseTime, function(){
                                next();
                            });
                        });
                    });

                    //Queue removal of any children
                    $target.queue('change', function(next){
                        $target.children().each( function(){ $(this).remove(); } );
                        next();
                    });

                    // Queue insert of any children and execute callback
                    $target.queue('change', function(next){
                        $target.tigerDOM('insert', oParams);
                        next();
                    });

                    $target.dequeue('change');

                } else {

                    $target.tigerDOM('insert', oParams);

                }

            });

        },

        /**
         * TIGER Elegant Switch
         *
         * Sometimes we want to elegantly change (hide and then show) the content within a container.
         * Target the parent with the oMessage content (see insert for the oMessage object). Make sure
         * there is no margin on the content_parent for a more smooth animation.
         *
         * let oMessage = { 
         *      out      : content_parent,
         *      in       : content_parent,
         *      callback : function
         * };
         *
         */
        switch : function ( oParams ) {

            let callback = (typeof oParams.callback === 'function')
                ? oParams.callback
                : null;

            return this.each(function(){

                let $target = $(this);
                let $out    = $(oParams.out);
                let $in     = $(oParams.in);

                // Set the parent height so it doesn't change height when the out content is hidden.
                $target.css('height', $target.innerHeight() ).css('overflow', 'hidden');

                // Queue fadeOut of the out content
                $target.queue('switch', function(next){
                    $in.css('opacity', 0);
                    $out.fadeOut(baseTimeFast, function(){
                        $out.addClass('hide');
                        next();
                    });
                });

                // Queue adjust the height of the parent container.
                $target.queue('switch', function(){

                    $in.removeClass('hide');

                    // Calculate what the total height of the incoming container.
                    let minHeight = parseInt($in.css('min-height'), 10);

                    let containerHeight = $in.outerHeight()
                        + parseInt($in.css('margin-top'), 10)
                        + parseInt($in.css('margin-bottom'), 10);

                    containerHeight = (minHeight > 0 && minHeight > containerHeight)
                        ? minHeight
                        : containerHeight;

                    // Expand / contract the target container to accommodate
                    // the inserted content and then run the callback. Done!
                    $target.animate({'height': containerHeight}, baseTimeFast, function () {
                        $in.css('display', '').animate({opacity: 1}, baseTimeFast, function(){
                            $target.css('height', '').css('overflow', '');
                            callback
                        });
                    });

                });

                $target.dequeue('switch');

            });

        }

    };

    $.fn.tigerDOM = function( method ) {
        if ( Class[method] ) {
            return Class[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
            return Class.init.apply( this, arguments );
        } else {
            $.error( 'Method ' +  method + ' does not exist on jQuery.tigerDOM' );
        }
    };

    $().tigerDOM();

} ) ( jQuery );
