copyright 2012
Robert William Stewart
torontographic.com
http://torontographic.wordpress.com/

mouseSwipe.js version 1.0.2

mouseSwipe is a jQuery content slider with tablet touch or mouse drag navigation. It weights in at just under 4kb in size.

revision: 1.0.2
Had to add e.preventDefault() on touchStart=function(e) 
for older versions of Android to scroll properly.