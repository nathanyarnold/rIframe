iFrameAutoSize
==============

Iframes can be difficult to display in a responsive design layout, as they're widths are typically hardcoded as node attributes.

This jQuery plugin allows you to override the height/width of an iframe set at the attribute level, and will dynamically resize the iframe to fit it's environment based on whatever responsive-design css rules have been established. 

The original ratio of the iframe will always be maintained, meaning that if the iframe is 400px wide by 200px tall, it will 
always maintain a 2:1 aspect ratio as it's resized to fit the viewport. 
