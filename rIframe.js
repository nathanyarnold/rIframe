/* Widget to auto-set the height of an iframe based on it's original (or defined) ratio */
(function( $ ){

	var pluginName  = 'rIframe',
		dataAttr    = 'data-rIframe',
		dataAttrExc = dataAttr + '-exclude';
		selector    = '['+ dataAttr +']',

		objs = $(),         // hold jQuery objects we want to work with

		isResizing = false,	// window.setTimeout object, used to throttle how often we resize during a resize event
		isBound = false,    // no need to bind eventListeners more than once. Keep track of this here. 

		methods = {


			// ADD/REMOVE METHODS

			// call this to add new DOM-nodes to the plugin
			// it's called automatically on DOM-ready as well, using the default selector
			add: function() {
				//console.log('$().'+ pluginName +'.methods.add()');

				// loop through and init new objects
				this.each( function( i ) {
					var $this = $( this );
					// check to see if element is already being tracked, don't track more than once
					if ( objs.is( this ) )
						return;
					// never add nodes with the 'dataAttrExc' data-attribute set
					if ( $this.is( '['+ dataAttrExc +']' ) )
						return;
					// set ratios
					methods._setRatio( $this );
					// resize it now
					methods._resizeNode( $this );
					// add lib, so we can keep track during events
					objs.push( $this.get(0) );
				} );

				//console.log( objs );

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



			// SET/GET RATIO METHODS

			_setRatio: function( $this ) { // format: '16:9' or '16:9+20' or '16:9+20%'
				//console.log('  $().'+ pluginName +'.methods._setRatio()');

				// declare vars
				var newHeight=0; newWidth=0, newOffset=0, tmp=[], tmp2=[];

				// set ratio by looking at original width/height attributes
				if ( !newWidth && $this.attr('width') )
					newWidth = parseInt( $this.attr('width')  );  // attr
				// alternately, set original height by attr/css
				if ( !newHeight && $this.attr('height') ) // attr
					newHeight = parseInt( $this.attr('height') ); // attr

				// alternately, set ratio by looking at the initializing data attribute
				if ( $this.attr(dataAttr) && $this.attr(dataAttr).indexOf(':') > -1 ) {
					// set ratio
					tmp = $this.attr( dataAttr ).split(':');
					if ( tmp.length > 1 ) {
						// width is always first
						newWidth  = parseInt( tmp[0] );
						// account for an offset
						if ( tmp[1].indexOf('+') > -1 ) {
							// additive offset
							tmp2 = tmp[1].split('+');
							newHeight = parseInt( tmp2[0] );
							newOffset = tmp2[1];
						} else if (tmp[1].indexOf('-') > -1 ) {
							// subtractive offset
							tmp2 = tmp[1].split('-');
							newHeight = parseInt( tmp2[0] );
							newOffset = '-'+ tmp2[1];
						} else {
							// no offset, simply add height
							newHeight = parseInt( tmp[1] );
						};
					};
				};

				// attach to node, so we can use it later
				// Note: DO NOT overright any existing data-attributes, these should always take precedence
				if ( !$this.attr(dataAttr + '-width') )
					$this.attr( dataAttr+'-width', newWidth );
				if ( !$this.attr(dataAttr + '-height') )
					$this.attr( dataAttr+'-height', newHeight );
				if ( newOffset && !$this.attr(dataAttr + '-offset') )
					$this.attr( dataAttr+'-offset', newOffset );

			},

			_getHeight: function( newWidth, $this ) {
				//console.log('  $().'+ pluginName +'.methods._getHeight('+ newWidth +')');
				var newHeight=0, offset, offsetValue;

				// get new ratio
				var newHeight = newWidth * parseInt( $this.attr(dataAttr+'-height') ) / parseInt( $this.attr(dataAttr+'-width') );

				// add/subtract offset
				if ( $this.attr(dataAttr+'-offset') ) {
					// figure out the offset value
					var offset = $this.attr(dataAttr+'-offset');
					if ( offset.indexOf('%') > -1 ) {
						offsetValue = Math.round( newHeight * parseInt(offset) / 100 );
					} else {
						offsetValue = parseInt(offset);
					};
					// add/subtract the offset value
					newHeight = (newHeight + offsetValue > 0) ? newHeight + offsetValue : 0;
				};

				// return;
				return Math.round(newHeight);
			},



			// ADD/REMOVE EVENT LISTENER METHODS

			_bind: function() {
				//console.log('  $().'+ pluginName +'.methods._bind');

				// don't do this more than once
				if ( isBound ) return;

				// touch vs. normal determines when/where/how we fire resize event handlers
				var isTouch  = ('ontouchend' in document.documentElement) ? true : false;	

				// add eventListeners
				if (isTouch) {
					// determine if orientation change has happened
					$( window ).on( 'orientationchange', $.proxy( this, 'resize' ) );
				} else {
					// determine if window has changed size
					$( window ).on( 'resize', $.proxy( this, 'resize' ) );
				};

				// set a flag on this, so we don't do it more than once
				isBound = true;
			},

			_unbind: function() {
				//console.log('  $().'+ pluginName +'.methods._unbind');

				// remove eventListeners
				$( window ).off( 'orientationchange', $.proxy( this, 'resize' ) );
				$( window ).off( 'resize', $.proxy( this, 'resize' ) );

				// set flag on this, so we can re-bind this later, if necessary
				isBound = false;
			},



			// RESIZE METHODS 

			// call this to manually resize all DOM objects currently tracked in the plugin
			resize: function() {
				//console.log('$().'+ pluginName +'.methods.resize()');

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
					methods._resizeNode( $this );
				});
			},

			_resizeNode: function( $this ) {
				//console.log('  $().'+ pluginName +'.methods._resizeNode()');
				if ( !$this ) return;

				// get current width
				var currWidth = parseInt( $this.outerWidth() );
				// size height according to ratio
				var newHeight = methods._getHeight( currWidth, $this );
				$this.css( 'height', newHeight );
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
