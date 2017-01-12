"use strict";

(function(slug) {
	const svg = d3.select(`#${slug} .some-time-series`)
	
	function go() {
		const data = [1, 1, 1, 1, 5, 3, 2, 2.5, 1, 1, 2, 3, 8, 4, 4]
		svg.selectAll('line').data(data).enter().append('line')
			.attr('x1', (d, i) => 2/2 + 25 * i)
			.attr('x2', (d, i) => 2/2 + 25 * i)
			.attr('y1', (d, i) => 140)
			.attr('y2', (d, i) => 140 - 15 * d)
			.attr('stroke', '#fff6ae')
			.attr('stroke-width', 2)
			.attr('stroke-linecap', 'round')
	}
	go()
	d3.select(window).on(`resize.${slug}`, go)
})('finding-peaks') // TODO: Get this from the script url?
