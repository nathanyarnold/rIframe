iFrameAutoSize
==============

Iframes can be difficult to display in a responsive design layout, as the height and width are typically set as node height/width attributes or via CSS. While it's easy to override the width of the iframe by setting it to 100% (or whatever), the height is another matter. 

This jQuery plugin allows you to set the desired width:height ratio of an iframe, and then will resize the iframe to maintain that correct ratio. It will run automatically on page load, and then whenever the viewport changes width, or an orientation change event is triggered. You can also trigger it manually via the 'resize()' method. 

To use, simply add the data attribute "data-iframe-autosize" to whatever iframe you would like to be responsive. Alternatively, use the 'setSelector()' method before onDOMReady, to change which objects are gathered automatically by the plugin.

Four public methods are provided:
    add() - will add DOM elements to the plugin (automatically runs onDOMReady)
    remove() - will remove DOM elements from the plugin
    resize() - will run the plugin on all DOM elements currently saved in the plugin
    setSelector() - will change which selector is used to gather DOM elements when add() is called onDOMReady
