rIframe
==============

Iframes can be difficult to display in a responsive design layout, as the height and width are typically set as node height/width attributes or via CSS. While it's easy to override the width of the iframe by setting it to 100% (or whatever), the height is another matter. 

This jQuery plugin allows you to set the desired width:height ratio of an iframe, and then will resize the iframe to maintain that correct ratio. It will run automatically on page load, and then whenever the viewport changes width, or an orientation change event is triggered. You can also trigger it manually via the <strong>resize()</strong> method. 

To use, simply add the data attribute <em>data-iframe-autosize</em> to whatever iframe you would like to be responsive. Alternatively, use the <strong>setSelector()</strong> method before onDOMReady, to change which objects are gathered automatically by the plugin.

<strong>Public methods:</strong>

    <strong>add()</strong> - will add DOM elements to the plugin (automatically runs onDOMReady)
    <strong>remove()</strong> - will remove DOM elements from the plugin
    <strong>resize()</strong> - will run the plugin on all DOM elements currently saved in the plugin
    <strong>setSelector()</strong> - will change which selector is used to gather DOM elements when add() is called onDOMReady


<strong>To do:</strong>

Add a <strong>setRatio()</strong> method, that will allow you to manually set the ratio of an element instead of scraping it from the DOM. 

Add <strong>pause()</strong> and <strong>unpause()</strong> methods, to let you manually stop resizing from happening on resize events. 

Allow ratios to include an offset. For example 

    "16:9+80"  - 16 wide by 9 tall, plus 80px
    "16:9+20%" - 16 wide by 9 tall, plus an additional 20% of the new height
    "16:9-80"  - 16 wide by 9 tall, minus 80px
    "16:9-20%" - 16 wide by 9 tall, minus 20% of the new height
