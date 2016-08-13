+++
date = "2016-08-04T15:03:08-04:00"
seq = 1
title = "Drawing Venn Diagrams"
style = true
script = true

+++

<svg class='top block'>
	<defs>
    <linearGradient id="venn-diagrams-grad-c1" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#E84D4D" />
      <stop offset="100%" stop-color="#F8A2FF" />
    </linearGradient>
    <linearGradient id="venn-diagrams-grad-c2" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#4D6DE8" />
      <stop offset="100%" stop-color="#A2FFFF" />
    </linearGradient>
    <linearGradient id="venn-diagrams-grad-overlap" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FFE21E" />
      <stop offset="100%" stop-color="#E1D46F" />
    </linearGradient>
  </defs>
</svg>

Sometimes you want to draw an _area proportional_ venn diagram, where the overlap between two circles accurately represents the overlap between two sets. 

<svg class='overlaps block'></svg>

To do so, you need to know how far apart the circles should be. It turns out this distance doesn't have a closed form solution, but you can define a function from distance &#8594; overlap and find it via bisection search.

[See the code &raquo;](https://gist.github.com/yurivish/b6d2b883fcee198345436d6b574ae4ee)
