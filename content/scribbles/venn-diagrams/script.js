// TODO: Namespace – typescript?
// TODO: Make the UI to the function better – give it areas, not radiuses

function venn(sel, data) {
  let randomID = () => [
    'id',
    (Math.random() * 1000000000).toString(36),
    (+new Date()).toString(36)
  ].join('-')

  let clipID = randomID()

  let update = sel.selectAll('g.venn').data(data)
  let enter = update.enter().append('g').attr('class', 'venn')

  let inner = enter.append('g').attr('class', 'inner')
  inner.append('clipPath').attr('id', clipID)
    .append('circle').attr('class', 'clip')
  inner.append('circle').attr('class', 'c1')
  inner.append('circle').attr('class', 'c2')
  inner.append('circle').attr('class', 'overlap')
      .attr('clip-path', 'url(#' + clipID + ')')

  let both = update.merge(enter)
    // .attr('transform', d => {
    //   let xsign = -Math.cos(d.angle) / Math.abs(Math.cos(d.angle))
    //   let ysign = -Math.sin(d.angle) / Math.abs(Math.sin(d.angle))
    //   let xoff = Math.max(d.r1, (d.r2 + d.distance * Math.abs(Math.cos(d.angle))))
    //   let yoff = Math.max(d.r1, (d.r2 + d.distance * Math.abs(Math.sin(d.angle))))
    //   console.log('xsign', xsign, 'ysign', ysign, 'xoff', xoff, 'yoff', yoff)
    //   return 'translate(' + [
    //     0.5 * (xoff - d.r1) * xsign, 0.5 * (yoff - d.r1) * ysign
    //   ] + ')'
    // })

  let c1 = (sel) => sel
    .attr('foo', d => console.log(d.angle))
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
var t = 0

function one() {
  t++
  // console.log(t)
  if (t == 1) requestAnimationFrame(one)

  var svg = d3.select('svg#drawing-venn-diagrams-1')
  let width = svg.node().getBoundingClientRect().width
  let height = 400

  // 
  svg
    .attr('width', width) // todo: remove
    .attr('height', height) //2 * yoff)



  let datum = {
    r1: 125,
    r2: 80,
    distance: 125,
    angle: -0.35*Math.PI + 0.3*t//-Math.PI * 0.15
  }
  // console.log(datum.angle)

  svg.call(venn, [datum])
  svg.selectAll('.venn').attr('transform', 'translate(' + [width/2, height/2] + ')')
    // .attr('transform', 'translate(150, 50)')
  svg.selectAll('.c1').attr('fill', 'red')
  svg.selectAll('.c2').attr('fill', 'blue')
  svg.selectAll('.overlap').attr('fill', 'yellow')


  // Subtle movement-shifting with mouse or touch.
//   var mx = null, my = null
//   let update = (coords) => {
//     if (mx === null) {
//       // prime with the original mouse position so we can use deltas.
//       mx = coords[0]
//       my = coords[1]
//       return
//     }
//     let x = ocoords[0] + (coords[0] - mx) * 0.025, y = ocoords[1] + (coords[1] - my) * 0.025
//     c2.attr('cx', x).attr('cy', y)
//     overlapCircle.attr('cx', x).attr('cy', y)
//   }

//   d3.select('body').on('mousemove.venn', () => {
//     update(d3.mouse(svg.node()))
//   }).on('touchmove', () => {
//     update(d3.touches(svg.node())[0])
//   })

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
      distance: calculateDistanceForOverlap(r, r, pc * Math.PI * r * r)
    }
  })
  console.log(data)

  let svg = d3.select('svg#drawing-venn-diagrams-2')
  let width = svg.node().getBoundingClientRect().width
  console.log('w', width)
  svg
    // todo: make it so things are vertically centered within the height
    .attr('height', 5 * r + 2 * pad) 

  let x = d3.scalePoint().domain(d3.range(data.length)).rangeRound([pad, width - pad])
  console.log('bw', x.bandwidth(), x(0), x(1))
  let g = svg.selectAll('g').data(data)
  g = g.enter().append('g')
    .merge(g)
    .attr('transform', (d, i) => "translate(" + x(i) + ", " + (2 * r) + ")")

  // TODO: Make the diagrams centered
  g.append('circle')
    .attr('fill', 'transparent')
    .attr('stroke', '#CFC7E2')
    .style('stroke-width', strokeWidth)
    .attr('r', r)
    .attr('cy', d => r - 0.5 * d.distance)

  g.append('circle')
    .attr('fill', 'transparent')
    .attr('stroke', '#CFC7E2')
    .attr('stroke-width', strokeWidth)
    .attr('r', r)
    .attr('cy', d =>  r - 0.5 * d.distance + d.distance)
    .attr('stroke-dasharray', '2,2')

  let clip = g.append('clipPath').attr('id', (d, i) => 'clip-' + i)
  let clipCircle = clip.append('circle')
    .attr('fill', '#000')
    .attr('r', r + strokeWidth) // + stroke size
    .attr('cy', d => r - 0.5 * d.distance)// 0.5 * (-d.distance - r))

  let overlapCircle = g.append('circle')
    .attr('clip-path', (d, i) => 'url(#clip-' + i + ')')
    .attr('class', 'overlap')
    .attr('fill', '#CFC7E2')
    .attr('r', r + strokeWidth)
    .attr('cy', d => r - 0.5 * d.distance + d.distance)

  // let format = d3.format('%')
  let format = pc => Math.round(100 * pc) + '%'
  g.append('text')
    .text(d => format(d.pc))
    .attr('text-anchor', 'middle')
    .attr('transform', "translate(0," + 4 * r + ")")
    .filter((d, i) => i == 0)
    .attr('text-anchor', 'start')
    .text(d => '' + format(d.pc) + ' Overlap')
    .attr('transform', "translate(" + -x(0) + "," + 4 * r + ")")
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
