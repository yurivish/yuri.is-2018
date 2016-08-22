"use strict";

// declare let d3: any

(function(slug) {
	
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
		const even =   [['M', 'even'],   ['M', 'even'],   ['F', 'even'],   ['F', 'even']]
		const uneven = [['M', 'uneven'], ['F', 'uneven'], ['F', 'uneven'], ['F', 'uneven']]
		const F = d3.shuffle(pop.filter(d => d[0] == 'F'))
		const M = d3.shuffle(pop.filter(d => d[0] == 'M'))
		const pairs = d3.zip(F, M)
		const kids = flatten(
			pairs.map(d => {
				const f = d[0][1], m = d[1][1]
				if (f == m) {
					return f == 'even' ? even : uneven
				} else {
					return Math.random() < 0.5 ? even : uneven
				}
			})
		)
		return kids.length <= N ? kids : sample(kids, N)
	}

	function go() {
		let sortfn = (a, b) => (a[0] == 'M' && b[0] == 'M' ? d3.ascending : d3.descending)(a, b)
		const svg = d3.select(`#${slug} svg`)
		// generation().forEach(d => console.log(d[0], d[1], d[2], d[3]))
		let log = pop => {
			let ml = pop.filter(d => d[0] == 'M').length
			let fl = pop.length - ml
			console.log(ml, fl, ml/pop.length)
		}


		let pop = []
		for (let i = 0; i < N; i++) {
			pop.push([Math.random() < 0.55 ? 'M' : 'F', Math.random() < 0.0 ? 'even' : 'uneven'])
		}
		let pops = [pop.sort(sortfn)]
		log(pop)
		for (let i = 0; i < 50; i++) {
			pop = generation(pop)
			log(pop)
			pops.push(pop.sort(sortfn))
		}

		let gs = svg.selectAll('g').data(pops)
		let enter = gs.enter().append('g')
		let r = 2, pad = 2
		gs.merge(enter)
			.attr('transform', (d, i) => `translate(${2*r}, ${(i+1) * (2*r+pad)})`)
			.selectAll('circle')
			.data(d => d)
			.enter()
			.append('circle')
			.attr('cx', (d, i) => i * (2*r+pad))
			.attr('cy', (d, i) => 0)
			.attr('r', r)
			.attr('fill', d => d[1] == 'even' ? 'transparent' : (d[0] == 'M' ? '#76EBFF': '#FFD99A'))
			.attr('stroke', d => d[0] == 'M' ? '#76EBFF': '#FFD99A')
			.attr('stroke-width', 1)
	}
	go()
	d3.select(window).on(`resize.${slug}`, go)
})('sex-ratios') // TODO: Get this from the script url?

/*
	two groups - A and B. A = 0.5s, B = 0.25s. Population could be represented as a mix of As and Bs.
	*/
