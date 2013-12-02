/* Widget to auto-size iframe's based on a set ratio */
(function( $ ){

	var pluginName = 'iFrameAutoSize',
		dataAttr   = 'data-iframe-autosize',
		selector   = 'iframe['+ dataAttr +']',

		objs = false,

		isResizing = false,

		methods = {
			init: function() {
				//console.log('$().'+ pluginName +'.methods.init()');

				// assign to objs
				objs = this;

				// hook each element up
				objs.each(function( i ) {
					var $this = $( this );
					methods._setRatio( $this );
				});

				// add eventListeners to resize on window resize/origntation change events
				methods._bind();

				// run _resize() right away
				methods._resize();
			},

            add: function() {
				//console.log('$().'+ pluginName +'.methods.add()');

				// loop through and init new objects
				this.each(function( i ) {
					// set ratios
                    var $this = $( this );
                    methods._setRatio( $this );
					// resize it now
					methods._resizeItem( $this );
					// add lib, so we can keep track during events
					objs.push( $this.get(0) );
                });
            },

			_setRatio: function( $this ) {
				//console.log('  $().'+ pluginName +'.methods._setRatio()');

				// declare vars
				var newHeight=0; newWidth=0;

				// set original ratio, by data-attribute
				if ( $this.attr( dataAttr ).indexOf(':') > 0 ) {
					// set ratio
					var tmp = $this.attr( dataAttr ).split(':');
					if ( tmp.length==2 && parseInt(tmp[0])!==0 && parseInt(tmp[1])!==0 ) {
						newWidth  = parseInt(tmp[0]);
						newHeight = parseInt(tmp[1]);
					};
				};

				// alternately, set original width by attr/css
				if ( !newWidth && $this.attr('width') )
					newWidth = parseInt( $this.attr('width')  );  // attr
				if ( !newWidth && $this.css('width') )
					newWidth = parseInt( $this.css('width')  );   // css
				// alternately, set original height by attr/css
				if ( !newHeight && $this.attr('height') ) // attr
					newHeight = parseInt( $this.attr('height') ); // attr
				if ( !newHeight && $this.css('height') )
					newHeight = parseInt( $this.css('height') );  // css

				// attach to node, so we can use it later
				$this.attr( dataAttr +'-width',  newWidth  );
				$this.attr( dataAttr +'-height', newHeight );
	
			},

			_bind: function() {
				//console.log('  $().'+ pluginName +'.methods._bind');
				// touch vs. normal determines when/where/how we fire resize event handlers
				var isTouch  = ('ontouchend' in document.documentElement) ? true : false;	
				if (isTouch) {
					// determine if orientation change has happened
					$( window ).on( 'orientationchange', $.proxy( this, '_resize' ) );
				} else {
					// determine if window has changed size
					$( window ).on( 'resize', $.proxy( this, '_handleResize' ) );
	            };
			},

			_handleResize: function() {
				//console.log('$().'+ pluginName +'.methods._handleResize()');

				// if we're already doing this, don't bother doing it again, these happen really frequently
				if ( isResizing )
					clearTimeout( isResizing );
				// run method on resize
				isResizing = window.setTimeout( function() {
					methods._resize();
				}, 200);
			},

			_resize: function() {
				//console.log('$().'+ pluginName +'.methods._resize()');

				var currWidth=0, newHeight=0;
				objs.each( function(i) {
					var $this = $( this );
					methods._resizeItem( $this );
				});
			},

			_resizeItem: function( $this ) {
				//console.log('  $().'+ pluginName +'.methods._resizeItem()');
				if ( !$this ) return;

				// get current width
				var currWidth = parseInt( $this.outerWidth() );
				// size height according to ratio
				var newHeight = currWidth * parseInt( $this.attr(dataAttr+'-height') ) / parseInt( $this.attr(dataAttr+'-width') );
				newHeight = Math.round( newHeight );
				$this.css('height', newHeight);
			},

			EOF: null
		};

    // Collection Method
    $.fn[pluginName] = function(method) {
        //console.log('$().'+ pluginName +'('+ method +') - Collection Method');

        // method calling logic 
        if ( methods[method] && method.charAt(0) != '_' ) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1), Array.prototype.slice.call(arguments, 2));
        } else if ( typeof method === 'object' || ! method ) {
            return methods.init.apply( this, Array.prototype.slice.call(arguments, 0), Array.prototype.slice.call(arguments, 1) );
        } else {
            $.error('Method '+ method +' does not exist on $.'+ pluginName);
        };
    };

    // DOM-ready auto-init
    $( function(){
        console.log('$().'+ pluginName +' - Document.Ready ...');
        $( selector )[ pluginName ]();
    } );
})( jQuery );
