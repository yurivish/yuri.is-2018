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

  // // Subtle movement-shifting with mouse or touch.
  // var mx = null, my = null
  // let update = (coords) => {
  //   if (mx === null) {
  //     // prime with the original mouse position so we can use deltas.
  //     mx = coords[0]
  //     my = coords[1]
  //     return
  //   }
  //   let x = ocoords[0] + (coords[0] - mx) * 0.025, y = ocoords[1] + (coords[1] - my) * 0.025
  //   c2.attr('cx', x).attr('cy', y)
  //   overlapCircle.attr('cx', x).attr('cy', y)
  // }

  // d3.select('body').on('mousemove.venn', () => {
  //   update(d3.mouse(svg.node()))
  // }).on('touchmove', () => {
  //   update(d3.touches(svg.node())[0])
  // })

}

function two() {
  let sq = x => x * x

  let overlapArea = (r1, r2, d) => {
    // Calculate the area in the overlap of two circles with
    // radii `r1` and `r2` that are `d` distance apart.
    // The math and variable names come from page 62 of
    // "Generating and Drawing Area-Proportional Euler and Venn Diagrams" by SC Chow:
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

  // TODO: Determine r from svg width
  // TODO: Can this be computed from the scalePoint? Maybe we want a scaleBar
  let r = 35, strokeWidth = 1.5, pad = r + strokeWidth // for stroke width

  let data = [0.1, 0.25, 0.5, 0.75, 1].map(pc => {
    return {
      pc: pc,
      r1: r,
      r2: r,
      distance: calculateDistanceForOverlap(r, r, pc * Math.PI * r * r),
      angle: -0.5*Math.PI
    }
  })
  console.log(data)

  let svg = d3.select('svg#drawing-venn-diagrams-2')
  let width = svg.node().getBoundingClientRect().width
  console.log('w', width)
  svg
    // todo: make it so things are vertically centered within the height
    .attr('height', 5 * r + 2 * pad) 

  // TODO: Band, since we have widths
  let x = d3.scalePoint().domain(d3.range(data.length)).rangeRound([pad, width - pad])
  console.log('bw', x.bandwidth(), x(0), x(1))
  let g = svg.call(venn, data).selectAll('.venn')
    .attr('transform', (d, i) => "translate(" + x(i) + ", " + (2 * r) + ")")
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
  g.append('text')
    .text(d => format(d.pc))
    .attr('text-anchor', 'middle')
    .attr('transform', "translate(0," + 3 * r + ")")
    .filter((d, i) => i == 0)
    .attr('text-anchor', 'start')
    .text(d => '' + format(d.pc) + ' Overlap')
    .attr('transform', "translate(" + -x(0) + "," + 3 * r + ")")
}

let go = () => {
  // TODO: Work properly with enter and update and exit
  // TODO: Work properly with unsetting the svg width if needed
  console.log('goo')
  one();
  two();
}
setTimeout(go, 1)
d3.select(window).on('resize.venn', go)
