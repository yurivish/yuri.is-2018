let sets = [
	"Limited Edition Alpha",
	"Limited Edition Beta",
	"Unlimited Edition",
	"Arabian Nights",
	"Antiquities",
	"Revised Edition",
	"Legends",
	"The Dark",
	"Fallen Empires",
	"Fourth Edition",
	"Ice Age",
	"Homelands",
	"Alliances",
	"Mirage",
	"Visions",
	"Fifth Edition",
	"Weatherlight",
	"Tempest",
	"Stronghold",
	"Exodus",
	"Urza's Saga",
	"Urza's Legacy",
	"Classic Sixth Edition",
	"Urza's Destiny",
	"Mercadian Masques",
	"Nemesis",
	"Prophecy",
	"Invasion",
	"Planeshift",
	"Seventh Edition",
	"Apocalypse",
	"Odyssey",
	"Torment",
	"Judgment",
	"Onslaught",
	"Legions",
	"Scourge",
	"Eighth Edition",
	"Mirrodin",
	"Darksteel",
	"Fifth Dawn",
	"Champions of Kamigawa",
	"Betrayers of Kamigawa",
	"Saviors of Kamigawa",
	"Ninth Edition",
	"Ravnica: City of Guilds",
	"Guildpact",
	"Dissension",
	"Coldsnap",
	"Time Spiral \"Timeshifted\"",
	"Time Spiral",
	"Planar Chaos",
	"Future Sight",
	"Tenth Edition",
	"Lorwyn",
	"Morningtide",
	"Shadowmoor",
	"Eventide",
	"Shards of Alara",
	"Conflux",
	"Alara Reborn",
	"Magic 2010",
	"Zendikar",
	"Worldwake",
	"Rise of the Eldrazi",
	"Magic 2011",
	"Scars of Mirrodin",
	"Mirrodin Besieged",
	"New Phyrexia",
	"Magic 2012",
	"Innistrad",
	"Dark Ascension",
	"Avacyn Restored",
	"Magic 2013",
	"Return to Ravnica",
	"Gatecrash",
	"Dragon's Maze",
	"Magic 2014 Core Set",
	"Theros",
	"Born of the Gods",
	"Journey into Nyx",
	"Magic 2015 Core Set",
	"Khans of Tarkir",
	"Fate Reforged",
	"Dragons of Tarkir",
	"Magic Origins",
	"Battle for Zendikar",
	"Oath of the Gatewatch",
	"Shadows over Innistrad",
	"Eldritch Moon"
]

let obj = {
	"Kev Walker": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 2, 4, 3, 5, 6, 4, 5, 5, 3, 4, 6, 3, 3, 6, 9, 8, 5, 10, 1, 3, 8, 8, 7, 14, 9, 8, 6, 9, 8, 8, 18, 13, 7, 8, 3, 4, 7, 7, 6, 20, 4, 3, 4, 2, 3, 2, 2, 11, 5, 2, 0, 5, 4, 3, 5, 7, 4, 3, 4, 6, 5, 4, 8, 4, 6, 3, 2, 7, 3, 3, 6, 4, 3, 3, 6, 4],
	"Dan Frazier": [38, 39, 39, 6, 4, 32, 13, 2, 6, 33, 16, 4, 4, 4, 1, 14, 3, 5, 2, 0, 0, 2, 11, 2, 7, 2, 2, 3, 2, 4, 0, 0, 0, 0, 4, 0, 0, 3, 0, 0, 0, 0, 0, 4, 1, 0, 0, 0, 0, 2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
	"John Avon": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 3, 6, 3, 0, 0, 0, 8, 3, 6, 4, 0, 0, 0, 7, 4, 9, 3, 10, 3, 4, 8, 3, 5, 16, 9, 2, 4, 13, 4, 2, 18, 7, 5, 5, 3, 0, 4, 10, 4, 14, 2, 3, 4, 2, 0, 2, 5, 5, 12, 3, 6, 10, 2, 1, 0, 4, 5, 2, 3, 3, 5, 2, 1, 2, 0, 1, 1, 5, 2, 1, 0, 4, 0, 0, 1, 2],
	"Mark Tedin": [16, 16, 16, 5, 8, 15, 11, 8, 7, 21, 12, 6, 6, 0, 0, 23, 1, 0, 0, 0, 5, 5, 3, 2, 4, 4, 2, 4, 3, 2, 3, 5, 2, 4, 4, 2, 3, 4, 5, 3, 3, 5, 1, 3, 3, 4, 0, 4, 0, 3, 6, 1, 0, 7, 4, 2, 3, 1, 5, 1, 1, 3, 3, 0, 1, 2, 4, 2, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	"Greg Staples": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8, 5, 0, 4, 3, 4, 3, 6, 3, 9, 5, 9, 4, 3, 11, 6, 5, 9, 9, 9, 6, 9, 5, 2, 11, 7, 7, 8, 0, 0, 9, 5, 1, 14, 6, 2, 2, 2, 4, 1, 3, 8, 2, 1, 2, 6, 1, 3, 3, 7, 5, 0, 4, 3, 7, 3, 4, 7, 4, 3, 3, 3, 2, 0, 0, 4, 0, 2, 4, 2],
	"Pete Venters": [0, 0, 0, 0, 6, 1, 5, 3, 7, 4, 7, 5, 8, 5, 6, 7, 7, 8, 7, 5, 8, 7, 5, 5, 12, 5, 3, 7, 2, 6, 3, 6, 4, 5, 8, 4, 6, 6, 6, 6, 5, 5, 5, 4, 6, 5, 4, 5, 4, 2, 6, 3, 0, 7, 4, 2, 4, 2, 3, 2, 3, 1, 0, 0, 0, 2, 3, 2, 1, 2, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 0],
	"Anson Maddocks": [30, 30, 30, 6, 9, 29, 12, 11, 7, 33, 17, 11, 6, 0, 0, 26, 1, 0, 0, 0, 0, 0, 12, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 2, 3, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	"Christopher Moeller": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 6, 5, 2, 8, 3, 7, 6, 12, 5, 4, 5, 6, 5, 9, 4, 4, 4, 5, 6, 6, 5, 7, 2, 3, 2, 1, 6, 3, 1, 7, 8, 4, 3, 3, 2, 1, 2, 7, 9, 4, 4, 9, 1, 0, 0, 5, 7, 3, 7, 4, 7, 3, 1, 4, 2, 3, 1, 3, 0, 0, 2, 1, 0, 0, 3, 4],
	"Douglas Shuler": [28, 29, 29, 6, 5, 28, 9, 5, 8, 29, 16, 4, 5, 8, 1, 12, 4, 6, 1, 0, 0, 4, 10, 4, 0, 0, 0, 2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 2, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	"Ron Spencer": [1, 1, 1, 0, 0, 1, 0, 10, 8, 4, 5, 0, 3, 7, 3, 10, 6, 10, 9, 7, 13, 5, 6, 4, 5, 3, 3, 10, 3, 8, 5, 9, 3, 3, 10, 4, 4, 9, 4, 2, 3, 5, 3, 3, 4, 2, 3, 0, 3, 3, 4, 0, 0, 5, 4, 2, 4, 2, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	"Carl Critchlow": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 11, 4, 0, 4, 12, 5, 3, 8, 1, 10, 5, 10, 3, 5, 10, 5, 5, 10, 7, 4, 8, 9, 6, 4, 16, 9, 3, 6, 2, 1, 7, 3, 0, 11, 0, 0, 5, 3, 5, 1, 3, 7, 0, 0, 0, 3, 2, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 1, 0, 0, 0, 0],
	"Mark Poole": [24, 25, 25, 6, 9, 26, 14, 7, 10, 26, 16, 5, 4, 4, 1, 12, 2, 7, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 3, 0, 0, 1, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
	"Rob Alexander": [7, 7, 7, 2, 0, 6, 4, 2, 7, 2, 6, 4, 6, 0, 0, 2, 0, 0, 3, 1, 4, 3, 2, 0, 6, 0, 2, 9, 0, 10, 3, 8, 2, 2, 5, 0, 2, 8, 8, 1, 3, 8, 1, 4, 10, 6, 4, 3, 2, 1, 5, 3, 0, 8, 4, 1, 4, 2, 0, 0, 0, 4, 1, 4, 3, 5, 0, 0, 0, 2, 2, 0, 0, 2, 0, 0, 0, 1, 5, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 0],
	"Heather Hudson": [0, 0, 0, 0, 0, 0, 3, 0, 10, 1, 6, 5, 5, 0, 0, 5, 1, 7, 5, 5, 10, 7, 0, 4, 9, 3, 3, 9, 4, 6, 4, 7, 2, 5, 11, 1, 0, 6, 4, 2, 2, 4, 3, 3, 7, 2, 3, 4, 2, 3, 3, 3, 0, 5, 3, 1, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	"Matt Cavotta": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5, 5, 3, 8, 4, 7, 4, 8, 4, 2, 8, 3, 4, 7, 7, 4, 4, 7, 5, 4, 3, 1, 2, 2, 2, 1, 2, 3, 3, 6, 3, 3, 6, 4, 4, 3, 2, 4, 6, 3, 4, 4, 7, 4, 2, 2, 0, 0, 0, 1, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 1, 0, 0, 0, 0],
	"Christopher Rush": [11, 12, 12, 9, 7, 11, 13, 10, 6, 16, 11, 5, 5, 0, 4, 8, 0, 3, 1, 0, 0, 0, 5, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 3, 0, 0, 2, 5, 3, 1, 8, 2, 0, 4, 2, 5, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
	"Terese Nielsen": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 7, 7, 3, 3, 8, 6, 5, 7, 0, 3, 0, 8, 3, 3, 7, 3, 6, 2, 6, 3, 0, 3, 0, 0, 1, 2, 3, 2, 2, 0, 0, 3, 5, 0, 1, 0, 0, 3, 3, 0, 9, 3, 1, 0, 1, 0, 0, 0, 5, 0, 0, 0, 5, 0, 2, 2, 3, 5, 4, 2, 1, 4, 2, 1, 0, 1, 1, 2, 0, 0, 0, 0, 1, 0, 0, 0, 2],
	"Daren Bader": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 7, 5, 8, 12, 6, 1, 1, 3, 3, 2, 5, 3, 5, 5, 6, 4, 1, 5, 4, 4, 5, 5, 3, 4, 6, 3, 4, 1, 3, 4, 6, 4, 4, 5, 3, 4, 5, 3, 2, 4, 0, 0, 0, 0, 2, 2, 2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0],
	"Dan Scott": [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 0, 0, 7, 5, 6, 3, 0, 5, 5, 5, 3, 4, 4, 7, 4, 4, 2, 0, 3, 5, 2, 2, 2, 2, 4, 5, 4, 5, 3, 5, 4, 7, 4, 2, 2, 3, 2, 1, 2, 2, 3, 4, 5, 6, 3, 7, 3],
	"Jesper Myrfors": [24, 26, 26, 5, 4, 29, 9, 10, 3, 26, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
};

let accumulate = values => {
	var output = new Array(values.length)
	values.forEach((value, i) => { output[i] = i == 0 ? values[0] : output[i - 1] + values[i] })
	return output
}

console.log(accumulate([1,2,3,4]))


let svg = d3.select('#the-artists-of-magic-1')
let svgwidth = svg.node().getBoundingClientRect().width

let numValues = obj[Object.keys(obj)[0]].length
let width = numValues * 2
let height = 50
let cols = 3
let xpad = (svgwidth - (cols*width)) / (cols - 1)
let ypad = xpad + 50
svg.attr('height', Math.ceil(numValues/cols)*(height+ypad))

let data = Object.keys(obj).map(key => {
	let y = d3.scaleLinear().domain([0, d3.max(obj[key])]).range([1, height/2])
	return { name: key, values: obj[key], sum: accumulate(obj[key]), y: y }
}).sort((a, b) => d3.descending(a.sum[a.sum.length - 1], b.sum[b.sum.length - 1])) // sort most prolific to top

let update = svg.selectAll('g.sparkline').data(data)
let enter = update.enter().append('g')
	.attr('class', 'sparkline')
	.attr('transform', (d, i) => 'translate(' + [(width + xpad) * (i % cols), (height + ypad) * ~~(i / cols)] + ')')


let x = d3.scaleLinear().domain([1, data[0].values.length]).range([0, width]).clamp(true) // compensate for concatenated zeros

enter.append('rect')
	.attr('fill', 'transparent')
	.attr('x', 0)
	.attr('y', 0)
	.attr('width', width)
	.attr('height', height + 25) // for text
	.on('mousemove', function(d) {
		let i = ~~x.invert(d3.mouse(this)[0]) - 1
		// d3.select(this.parentNode).select('.num').classed('active', true).text(d.values[i]).append('tspan').attr('text-anchor', 'middle').attr('x', width).attr('dy', '1.25em').text(sets[i])
		svg.selectAll('.num').classed('active', true).text(d => d.values[i] + ' cards').append('tspan').attr('text-anchor', 'right').attr('x', width).attr('dy', '1.5em').text(sets[i])
		svg.selectAll('rect.hover')
			.style('display', 'block')
			.attr('x', x(i))
			.attr('y', d => height/2 - d.y(d.values[i]))
			.attr('height', d => 2 * d.y(d.values[i]))
	}).on('mouseleave', function(d) {
		svg.selectAll('.num').classed('active', false).text(d => d.sum[d.sum.length-1] + ' cards').append('tspan').attr('text-anchor', 'right').attr('x', width).attr('dy', '1.5em').text(sets[i])
		svg.selectAll('rect.hover')
			.style('display', 'none')
	})

enter.append('path')
		.style('pointer-events', 'none')
		.attr('fill', 'url(#the-artists-of-magic-g1)')
		.attr('d', d => {
			let y = d.y
			let val = d.values
			let line = d3.area()
				.x1((d, i) =>x(i))
				.y1(d =>  height/2 + y(d))
				.x0((d, i) => x(i))
				.y0(d => height/2 + -y(d))
				.curve(d3.curveStepAfter) // most accurate, but ugly...
			return line([0].concat(val).concat([0])) // start and end on zero for path fill.
		})


enter.append('rect')
	.attr('fill', '#fff')
	.attr('class', 'hover')
	.attr('width', x(2) - x(1))
	.style('display', 'none')


// enter.append('text').text(d => d.sum[d.sum.length - 1]).style('font-size', 12).attr('text-anchor', 'right').attr('x', width - 15).attr('y', -5)
enter.append('text').style('pointer-events', 'none').attr('class', 'name').text(d => d.name).attr('text-anchor', 'start').attr('y', height + 25)//.attr('x', d => width/2)
enter.append('text').style('pointer-events', 'none').attr('class', 'num').text(d => d.sum[d.sum.length-1]).attr('text-anchor', 'end').attr('y', height + 25).attr('x', d => width)

console.log('wo0')
