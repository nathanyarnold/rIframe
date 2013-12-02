iFrameAutoSize
==============

Iframes can be difficult to display in a responsive design layout, as the height and width are typically set as node attributes. While it's easy to override the width of the iframe, the height is another matter. 

This jQuery plugin allows you to set the correct initial ratio of the iframe, and then resize the height of the iframe to maintain this ratio whenever the page is resized. 

To use, simply add the data attr "data-iframe-autosize" to whatever iframe you would like to be responsive. Alternatively, remove this requirement from the library, and it will operate on all iframes on the page. 

Two public methods are provided - init() runs onDomReady, and add() can be called at any time after the page has loaded to add a new iframe to the script. add() can be run on any iframe, regardless of whether it has the "data-iframe-autosize" attribute. 
