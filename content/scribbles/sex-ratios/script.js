// fitness of individual as a function of gene

"use strict";

// declare let d3: any


/*
	
*/

(function(slug) {
	const inc = (() => {let i = 0; return () => i++})()
	const flatten = arr => [].concat.apply([], arr)
	const sample = (arr, n) => {
		const indices = d3.shuffle(d3.range(arr.length))
		const ret = []
		for (let i = 0; i < n; i++)
			ret.push(arr[indices[i]])
		return ret
	}
	const N = 50

	function generation(pop) {
		const even   = () => [['M', 'even'],   ['M', 'even'],   ['F', 'even'],   ['F', 'even']]
		const uneven = () => [['M', 'uneven'], ['F', 'uneven'], ['F', 'uneven'], ['F', 'uneven']]
		const F = d3.shuffle(pop.filter(d => d[0] == 'F'))
		const M = d3.shuffle(pop.filter(d => d[0] == 'M'))
		const pairs = d3.zip(F, M)
		// const pairs = F.map(f => [f, M[~~(Math.random() * M.length)]])

		// console.log(F.length, M.length, pop)
		const kids = flatten(
			pairs.map(d => {
				const f = d[0][1], m = d[1][1]
				if (f == m) {
					return f == 'even' ? even() : uneven()
				} else {
					return Math.random() < 0.5 ? even() : uneven()
				}
			})
		)
		// return JSON.parse(JSON.stringify(pop))
		return kids.length <= N ? kids : sample(kids, N)
	}

	function go() {
		let sortfn = (a, b) => (a[0] == 'M' && b[0] == 'M' ? d3.ascending : d3.descending)(a, b)
		const svg = d3.select(`#${slug} svg`)
			.attr('height', 600)
		// generation().forEach(d => console.log(d[0], d[1], d[2], d[3]))
		let log = pop => {
			let ml = pop.filter(d => d[0] == 'M').length
			let fl = pop.length - ml
			// console.log(ml, fl, ml/pop.length)
		}

		let pop = []
		for (let i = 0; i < N; i++) {
			pop.push([0==i%4?'M':'F', 'uneven'])
		}

		let pops = []
		// log(pop)
		for (let i = 0; i < N*4; i++) {
			pop.sort(sortfn)

			if (i == 3) {
				// pop[30][0] = 'M'
				// console.log(pop[4][0] = 'F')
				for (let x = 0; x < pop.length; x += ~~(N/5))
					pop[x][1] = 'even'
			}

			pops.push(pop)
			pop = generation(pop)
		}

		let gs = svg.selectAll('g').data(pops)
		let enter = gs.enter().append('g')
		let r = 5, pad = 5
		gs.merge(enter)
			.attr('transform', (d, i) => `translate(${2*r}, ${(i+1) * (2*r+pad)})`)
			.selectAll('circle')
			.data(d => d)
			.enter()
			.append('circle')
			.attr('cx', (d, i) => i * (2*r+pad))
			.attr('cy', (d, i) => 0)
			.attr('r', r)
			.attr('fill', d => d[1] == 'even' ? 'transparent' : '#FF768D')//'#76EBFF' : 'transparent')//'transparent' : (d[0] == 'M' ? '#76EBFF': '#FF768D'))
			// .attr('fill-opacity', 0.5)
			.attr('stroke', d => d[0] == 'M' ? '#76EBFF': '#FF768D')
			.attr('stroke-width', 1.5)
	}
	go()
	d3.select(window).on(`resize.${slug}`, go)
})('sex-ratios') // TODO: Get this from the script url?

/*
	two groups - A and B. A = 0.5s, B = 0.25s. Population could be represented as a mix of As and Bs.
	*/
