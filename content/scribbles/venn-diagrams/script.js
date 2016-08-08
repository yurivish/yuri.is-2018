// TODO: Namespace – typescript?
// TODO: Make the UI to the function better – give it areas, not radiuses

let randomID = () => [
  'id',
  (Math.random() * 1000000000).toString(36),
  (+new Date()).toString(36)
].join('-')

function venn(sel, data) {

  let update = sel.selectAll('g.venn').data(data ? data : d => d)
  let enter = update.enter().append('g').attr('class', 'venn')

  let clipID = randomID()
  let inner = enter.append('g').attr('class', 'inner')
  inner.append('clipPath').attr('id', clipID)
    .append('circle').attr('class', 'clip')
  inner.append('circle').attr('class', 'c1')
  inner.append('circle').attr('class', 'c2')
  inner.append('circle').attr('class', 'overlap')
      .attr('clip-path', 'url(#' + clipID + ')')

  let both = update.merge(enter)
  both.select('.inner')
    // center
    .attr('transform', d => {
      let x = Math.cos(d.angle), y = Math.sin(d.angle)
      let offset = n => Math.sign(n) * 0.5 * (d.r1 - Math.max(d.r1, Math.abs(n) * d.distance + d.r2))
      return 'translate(' + [offset(x), offset(y)] + ')'
    })
  let c1 = (sel) => sel
    .attr('r', d => d.r1)
    .attr('cx', 0)
    .attr('cy', 0);
  both.select('.c1').call(c1)
  both.select('.clip').call(c1)

  let c2 = (sel) => sel
    .attr('r',  d => d.r2)
    .attr('cx', d => d.distance * Math.cos(d.angle))
    .attr('cy', d => d.distance * Math.sin(d.angle));
  both.select('.c2').call(c2)
  both.select('.overlap').call(c2)

  return enter
}

function one() {
  // requestAnimationFrame(one)
  var svg = d3.select('svg#drawing-venn-diagrams-1')
  let width = svg.node().getBoundingClientRect().width
  let height = 300

  svg.attr('height', height)

  let datum = {
    r1: 125,
    r2: 80,
    distance: 125,
    angle: -0.25*Math.PI
  }

  svg.call(venn, [datum])
  svg.selectAll('.venn').attr('transform', 'translate(' + [width/2, height/2] + ')')
  svg.selectAll('.c1').attr('fill', 'url(#drawing-venn-diagrams-grad-c1)')
  svg.selectAll('.c2').attr('fill', 'url(#drawing-venn-diagrams-grad-c2)')
  svg.selectAll('.overlap').attr('fill', 'url(#drawing-venn-diagrams-grad-overlap')

  // Subtle movement-shifting with mouse or touch.
  var ox = null, oy = null
  let update = (coords) => {
    let x = coords[0], y = coords[1]
    if (ox === null) {
      // prime with the original mouse position so we can use deltas.
      ox = x; oy = y
    }
    let scale = 0.025
    svg.selectAll('.c2, .overlap')
      .attr('cx', d => d.distance * Math.cos(d.angle) + (x - ox) * scale)
      .attr('cy', d => d.distance * Math.sin(d.angle) + (y - oy) * scale)
  }

  d3.select('body').on('mousemove.venn', () => {
    update(d3.mouse(svg.node()))
  }).on('touchmove', () => {
    update(d3.touches(svg.node())[0])
  })

}

function two() {
  let sq = x => x * x

  let overlapArea = (r1, r2, d) => {
    // Calculate the area in the overlap of two circles with
    // radii `r1` and `r2` that are `d` distance apart.
    // The math and variable names come from page 62 of
    // 'Generating and Drawing Area-Proportional Euler and Venn Diagrams' by SC Chow:
    // https://dspace.library.uvic.ca/bitstream/handle/1828/128/phdGradStudiesMay24.pdf
    console.assert(r2 <= r1)
    if (d <= r1 - r2) return Math.PI * sq(r)
    if (d >= r1 + r2) return 0;
    let alpha = 2 * Math.acos((sq(d) + sq(r1) - sq(r2)) / (2 * r1 * d))
    let beta = 2 * Math.acos((sq(d) + sq(r2) - sq(r1)) / (2 * r2 * d))
    return 1/2 * sq(r1) * (alpha - Math.sin(alpha)) + 1/2 * sq(r2) * (beta - Math.sin(beta))
  }

  // Because the overlapArea function is monotonic increasing, we can perform a
  // simple bisection search to find the distance that leads to an overlap
  // area within epsilon of the desired overlap.
  let calculateDistanceForOverlap = (r1, r2, desiredOverlap) => {
    if (r1 < r2) {
      let temp = r2; r1 = r2; r2 = temp;
    }
    var lo = r1 + r2, hi = r1 - r2, overlap;
    let eps = 0.075;
    for (var i = 1; i < 100; i++) {
      let dist = (lo + hi) / 2;
      overlap = overlapArea(r1, r2, dist);
      if (Math.abs(overlap - desiredOverlap) <= eps)
        return dist;
      if (overlap < desiredOverlap) {
        lo = dist;
      } else {
        hi = dist;
      }
    }
    return overlap;
  };

  let svg = d3.select('svg#drawing-venn-diagrams-2')
  let width = svg.node().getBoundingClientRect().width

  let spacings = [0.1, 0.25, 0.5, 0.75, 1]
  let x = d3.scaleBand().domain(d3.range(spacings.length))
    .rangeRound([0, width]).paddingOuter(0).paddingInner(0.25)
  let strokeWidth = 1.5, r = x.bandwidth() / 2 - strokeWidth
  let height = 5 * r + 20 // + C for labels 
  svg.attr('height', height)

  let data = spacings.map(pc => {
    return {
      pc: pc,
      r1: r,
      r2: r,
      distance: calculateDistanceForOverlap(r, r, pc * Math.PI * r * r),
      angle: -0.5*Math.PI
    }
  });

  let enter = venn(svg, data)

  let g = svg.selectAll('.venn')
    .attr('transform', (d, i) => 'translate(' + (x(i) + r + strokeWidth) + ', ' + (2 * r) + ')')
  let color = '#CFC7E2'
  g.select('.c1')
    .attr('fill', 'transparent')
    .attr('stroke', color)
    .style('stroke-width', strokeWidth)
    .attr('stroke-dasharray', '2,2')

  g.select('.c2')
    .attr('fill', 'transparent')
    .attr('stroke', color)
    .attr('stroke-width', strokeWidth)

  g.selectAll('.clip, .overlap')
    .attr('fill', color)
    .attr('r', d => d.r2 + strokeWidth)

  let format = d3.format('.0%')
  let text = enter.append('text')

  text.append('tspan')
    .attr('x', 0)
    .attr('class', 'pc')
 text
    .filter((d, i) => i == 0)
    .append('tspan')
      .attr('class', 'label')
      .attr('dy', '1.35em')
      .attr('x', 0)
      .text('Overlap')
      
  g.select('text')
    .attr('text-anchor', 'middle')
    .attr('transform', 'translate(0,' + (r * 2.75) + ')')
    .select('.pc')
      .text(d => format(d.pc))
}

let go = () => {
  console.log('goo')
  one();
  two();
}
setTimeout(go, 1)
d3.select(window).on('resize.venn', go)
