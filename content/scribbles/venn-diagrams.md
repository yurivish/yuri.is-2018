+++
date = "2016-08-04T15:03:08-04:00"
title = "drawing venn diagrams"
draft = true
style = true
script = true
seq = 1

+++

# Drawing Venn Diagrams

<svg class='top block'>
	<defs>
    <linearGradient id="drawing-venn-diagrams-grad-c1" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#E84D4D" />
      <stop offset="100%" stop-color="#F8A2FF" />
    </linearGradient>
    <linearGradient id="drawing-venn-diagrams-grad-c2" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#4D6DE8" />
      <stop offset="100%" stop-color="#A2FFFF" />
    </linearGradient>
    <linearGradient id="drawing-venn-diagrams-grad-overlap" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FFE21E" />
      <stop offset="100%" stop-color="#E1D46F" />
    </linearGradient>
  </defs>
</svg>

Sometimes you want to draw a venn diagram that is _area proportional_, where the overlap between two circles accurately represents the overlap between two sets. 

<svg class='overlaps block'></svg>

To do so, you need to know how far apart the circles should be. It turns out that there's no closed-form expression for the distance, but you can define a function from distance to overlap area, then use it find the distance you want via an optimization-algorithm version of binary search.

[See the code &raquo;](-)

<!-- <script src='venn-diagrams/script.js'></script> -->

