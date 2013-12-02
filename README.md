iFrameAutoSize
==============

Iframes can be difficult to display in a responsive design layout, as the height and with is typically set as node attributes.

This jQuery plugin allows you to override the height/width of an iframe set at the attribute level, and will dynamically resize the iframe to fit it's environment based on whatever responsive-design css rules have been established. 

The original ratio of the iframe will always be maintained, meaning that if the iframe is 400px wide by 200px tall, it will always maintain a 2:1 aspect ratio as it's resized to fit the viewport. 

To use, simply add the data attr "data-iframe-autosize" to whatever iframe you would like to be responsive. Alternatively, remove this requirement from the library, and it will operate on all iframes on the page. 

Two public methods are provided - init() runs onDomReady, and add() can be called at any time after the page has loaded to add a new iframe to the script. add() can be run on any iframe, regardless of whether it has the "data-iframe-autosize" attribute. 
