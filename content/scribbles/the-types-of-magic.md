+++
date = "2016-08-11T22:06:15-04:00"
seq = 3
title = "The Types of Magic"
script = true
style = true

+++

Here's a visualization of [Magic](https://en.wikipedia.org/wiki/Magic:_The_Gathering) card types split by color and shown over time. 

Colors are the standard Magic fare: 
<img class='mana-legend' src='W.svg' title='White' />,
<img class='mana-legend' src='U.svg' title='Blue' />,
<img class='mana-legend' src='B.svg' title='Black' />,
<img class='mana-legend' src='R.svg' title='Red' />,
<img class='mana-legend' src='G.svg' title='Green' />,
<img class='mana-legend' src='1.svg' title='Colorless' />.

<a href='#' class='toggle'>Press here</a> to toggle between relative and absolute charts.

<svg class='block'>
	<defs><linearGradient id="the-types-of-magic-grad" x1="0" y1="0" x2="0" y2="100%"><stop offset="0" stop-color="#fff" stop-opacity="1"/><stop offset="100%" stop-color="#fff" stop-opacity="0.75"/></linearGradient>
</svg>

Colors in each chart are ordered by size, illustrating that every card type is most often found in a specific color -- creatures in <img class='mana-mini' src='G.svg' title='Green' />, instants in <img class='mana-mini' src='U.svg' title='Blue' />, enchantments in <img class='mana-mini' src='W.svg' title='White' />, and sorceries in <img class='mana-mini' src='B.svg' title='Black' />.

If you know your Magic history there are some fun things to note:

1. Enchantments hit a peak during [Theros block](http://mtgsalvation.gamepedia.com/Theros_block) which introduced enchantment creatures and enchantment artifacts.

1. Even though Planeswalker cards weren't introduced until Lorwyn, they were first foreshadowed in Future Sight on the reminder text for [Tarmogoyf](http://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=136142).

1. Dips in the chart happen when cards drop to zero, such as in 2003, when the all-creature set [Legions](https://en.wikipedia.org/wiki/Onslaught_(Magic:_The_Gathering)#Legions_2) was released.

1. There are three sets without artifacts: Torment, Legions, and Planar Chaos.

1. Mirrodin block has lots artifacts, but they're all creatures (or lands) since colorless spells weren't invented yet.

_Data notes --_ Relative and absolute views are normalized by set size, adjusted for cards with multiple colors and types. Here's where I got the [mana symbols](http://mtgsalvation.gamepedia.com/Category:Mana_symbols) and the [source data](http://mtgjson.com).
