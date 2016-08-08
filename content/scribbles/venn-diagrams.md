+++
date = "2016-08-04T15:03:08-04:00"
title = "Drawing Venn Diagrams"
draft = true
+++

# Drawing Venn Diagrams

<svg id='drawing-venn-diagrams-1' class='block'>
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

Sometimes you want to draw an _area proportional_ venn diagram, in which the overlap between two circles accurately shows the overlap between two sets. 

<svg id='drawing-venn-diagrams-2' class='block'></svg>

You'll need to know the distance between the two circles that will give you the overlap you want. There is no closed-form solution, but you can optimize over an area function that returns the overlap for a given distance. 

You can find the code on [GitHub](-).

<script src='venn-diagrams/script.js'></script>

