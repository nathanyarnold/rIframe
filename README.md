rIframe
=======

iFrames can be difficult to display in a responsive design layout, as the height and width are typically set as node height/width attributes or via CSS. While it's easy to override the width of the iframe by setting it to 100% (or whatever), the height is another matter. 

This jQuery plugin allows you to set the desired width:height ratio of an iframe, and then will resize the iframe to maintain that correct ratio. It will run automatically on page load (onDOMReady), and then whenever the viewport changes width, or an orientation change event is triggered. You can also trigger it manually via the **resize()** method. 

Instructions
============

At it's easiest, simply add the plugin to your page and the attribute *data-rIframe="true"* to any iframes you would like to be responsive. The plugin will run onDOMReady, look for any iframes with the *data-rIframe* attribute, and then do it's thing. The plugin will calculate the correct width:height ratio of each iframe by looking at the original height and width attributes of that iframe. 

Alternately, you can set the ratio for each iframe via the *data-rIframe* attribute itself, by specifying the ratio instead of the value "true" (eg. *data-rIframe="16:9"*). 

Alternately, you can set values for each ratio dimension via their own attribute. Eg *data-rIframe-width="16"* to set the width, and *data-rIframe-height="19"* to set the height.

You can add an offset to the ratio (eg. 16:9 plus 50px) either by adding the offset to the *data-rIframe* attribute (eg. *data-rIframe="16:9+50"*), or by placing it in a *data-rIframe-offset* attribute (eg. *data-rIframe-offset="50"*). The amount of offset can either be a pixel amount (eg. "50") or a % amount (eg. "20%"). You can subtract an offset by using the - sign (eg. *data-rIframe="16:9-50"* or *data-rIframe-offset="-50"*)

You can also manually add a DOM element to the plugin at any time by using the **add()** method. Eg. *$('iframe.someClass').rIframe('add')*;

You can remove a DOM element from the plugin by using the **remove()** method. Eg. *$('iframe.someClass').rIframe('remove')*;

You can specifically set an iframe so that it can't be collected or added to the plugin by giving it the data attribute *data-rIframe-exclude* with any value.

Public methods
--------------

**add()** - will add DOM elements to the plugin (automatically runs onDOMReady)

**remove()** - will remove DOM elements from the plugin

**resize()** - will run the plugin on all DOM elements currently saved in the plugin

**setSelector()** - will change which selector is used to gather DOM elements when add() is called onDOMReady


To do's
-------

Add **pause()** and **unpause()** methods, to let you manually stop resizing from happening on resize events.

Add a true/false boolean argument to the **add()** and **remove()** methods to indicate you want the item to resize itself immediately upon being added to the library, or reset to the original height upon being removed. The default will be **add(true)** and **remove(false)**. 

