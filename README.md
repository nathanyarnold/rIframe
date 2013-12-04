rIframe
=======

iFrames can be difficult to display in a responsive design layout, as the height and width are typically set as node height/width attributes or via CSS. While it's easy to override the width of the iframe by setting it to 100% (or whatever), the height is another matter. 

This jQuery plugin allows you to set the desired width:height ratio of an iframe, and then will resize the iframe to maintain that correct ratio. It will run automatically on page load, and then whenever the viewport changes width, or an orientation change event is triggered. You can also trigger it manually via the **resize()** method. 

To use, simply add the data attribute *[data-rIframe]* to whatever iframe you would like to be responsive, you can set the property of this to true to have it simply run, or specify a set ratio here (like "16:9") to set it to that ratio. Alternatively, use the **setSelector()** method before onDOMReady, to change which objects are gathered automatically by the plugin. You can also add a DOM node (any node, it doesn't have to be an iFrame) manually at any time using the **add** method. 

Public methods
--------------

    add() - will add DOM elements to the plugin (automatically runs onDOMReady)
    remove() - will remove DOM elements from the plugin
    resize() - will run the plugin on all DOM elements currently saved in the plugin
    setSelector() - will change which selector is used to gather DOM elements when add() is called onDOMReady


To do's
-------

Add a **setRatio()** method, that will allow you to manually set the ratio of an element instead of scraping it from the DOM. 

Add **pause()** and **unpause()** methods, to let you manually stop resizing from happening on resize events.

Add a true/false boolean argument to the **add()** and **remove()** methods to indicate you want the item to resize itself immediately upon being added to the library, or reset to the original height upon being removed. The default will be **add(true)** and **remove(false)**. 

Find some way to specifically prevent an iframe from being added to the plugin. Maybe the attribute *[data-rIframe-exclude]* ??

Allow ratios to include an offset. For example 

    "16:9+80"  - 16 wide by 9 tall, plus 80px
    "16:9+20%" - 16 wide by 9 tall, plus an additional 20% of the new height
    "16:9-80"  - 16 wide by 9 tall, minus 80px
    "16:9-20%" - 16 wide by 9 tall, minus 20% of the new height

