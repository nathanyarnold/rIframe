/* Widget to auto-set the height of an iframe based on it's original (or defined) ratio */
(function( $ ){

	var pluginName = 'iFrameAutoSize',
		dataAttr   = 'data-rIframe',
		selector   = 'iframe['+ dataAttr +']',

		objs = $(),			// hold jQuery objects we want to work with

		isResizing = false,	// window.setTimeout object, used to throttle how often we resize during a resize event
		isBound = false,	// no need to bind eventListeners more than once. Keep track of this here. 

		methods = {
			// call this to add new DOM-nodes to the plugin
			// it's called automatically on DOM-ready as well, using the default selector
			add: function() {
				//console.log('$().'+ pluginName +'.methods.add()');

				// loop through and init new objects
				this.each( function( i ) {
					// set ratios
					var $this = $( this );
					methods._setRatio( $this );
					// resize it now
					methods._resizeItem( $this );
					// add lib, so we can keep track during events
					objs.push( $this.get(0) );
				} );

				// add eventListener to page for future resizes
				if ( objs.length > 0 ) {
					methods._bind();
				};
			},

			// call this to remove DOM-nodes from this plugin
			remove: function( ) {
				//console.log('$().'+ pluginName +'.methods.remove()');

				// loop through each node and remove
				this.each( function ( i ) {
					// remove from plugin obj
					var _this = this;
					objs.each( function( i ) {
						if ( this == _this) 
							objs.splice( i, 1 );
					} );

					// remove related data-attributes
					var $this = $( this );
					$this.removeAttr( dataAttr +'-width');
					$this.removeAttr( dataAttr +'-height');
				} );

				// remove eventListeners if we don't need them anymore
				if ( !objs.length ) {
					methods._unbind();
				};
			},

			// call this to set the selector that is called on DOM-ready
			setSelector: function( newSelector ) {
				//console.log('$().'+ pluginName +'.methods.setSelector('+ newSelector +')');
				if ( newSelector )
					selector = newSelector;
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

				// don't do this more than once
				if ( isBound ) return;

				// touch vs. normal determines when/where/how we fire resize event handlers
				var isTouch  = ('ontouchend' in document.documentElement) ? true : false;	

				// add eventListeners
				if (isTouch) {
					// determine if orientation change has happened
					$( window ).on( 'orientationchange', $.proxy( this, '_handleResize' ) );
				} else {
					// determine if window has changed size
					$( window ).on( 'resize', $.proxy( this, '_handleResize' ) );
				};

				// set a flag on this, so we don't do it more than once
				isBound = true;
			},

			_unbind: function() {
				//console.log('  $().'+ pluginName +'.methods._unbind');

				// remove eventListeners
				$( window ).off( 'orientationchange', $.proxy( this, '_handleResize' ) );
				$( window ).off( 'resize', $.proxy( this, '_handleResize' ) );

				// set flag on this, so we can re-bind this later, if necessary
				isBound = false;
			},

			_handleResize: function() {
				//console.log('$().'+ pluginName +'.methods._handleResize()');

				// if we're already doing this, don't bother doing it again, this event happens frequently
				if ( isResizing )
					clearTimeout( isResizing );

				// run method on resize
				isResizing = window.setTimeout( function() {
					methods._resizeAll();
				}, 100);
			},

			_resizeAll: function() {
				//console.log('$().'+ pluginName +'.methods._resizeAll()');

				// resize each element
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
			// run any public method
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1), Array.prototype.slice.call(arguments, 2));
		} else if ( typeof method === 'object' || ! method ) {
			// run 'add' method by default
			return methods.add.apply( this, Array.prototype.slice.call(arguments, 0), Array.prototype.slice.call(arguments, 1) );
		} else {
			$.error('Method '+ method +' does not exist on $.'+ pluginName);
		};
	};

	// DOM-ready auto-init
	$( function(){
		//console.log('$().'+ pluginName +' - Document.Ready ...');
		$( selector )[ pluginName ]();
	} );
})( jQuery );
