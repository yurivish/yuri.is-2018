let square = x => x * x

let overlapArea = (r1, r2, d) => {
  console.assert(r2 <= r1)
  if (d <= r1 - r2) return Math.PI * square(r)
  if (d >= r1 + r2) return 0;
  let alpha = 2 * Math.acos((square(d) + square(r1) - square(r2)) / (2 * r1 * d))
  let beta = 2 * Math.acos((square(d) + square(r2) - square(r1)) / (2 * r2 * d))
  return 1/2 * square(r1) * (alpha - Math.sin(alpha)) + 1/2 * square(r2) * (beta - Math.sin(beta))
}

let calculateDistanceApart = (r1, r2, desiredOverlap) => {
  if (r1 < r2) {
    let temp = r2; r1 = r2; r2 = temp;
  }
  var lo = r1 + r2, hi = r1 - r2, overlap;
  let eps = 0.1;
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

console.log(overlapArea(5, 3, calculateDistanceApart(5, 3, 2)))

let svg = d3.select('svg') .attr('width', 500) .attr('height', 500)

let vis = svg.append('g')
console.log('g', vis)
let r1 = 125, r2 = 80, dist = 110
let xoff = 150, yoff = xoff

let c1 = vis.append('circle')
  .attr('class', 'c1')
  .attr('fill', 'url("#drawing-venn-diagrams-grad-c1")')
  .attr('cy', yoff)
  .attr('r', r1)
  .attr('cx', xoff)

let c2 = vis.append('circle')
  .attr('class', 'c2')
  .attr('fill', 'url("#drawing-venn-diagrams-grad-c2")')
  .attr('cy', yoff)
  .attr('r', r2)
  .attr('cx', xoff + dist)

let clip = vis.append('clipPath').attr('id', 'clip')
let clipCircle = clip.append('circle')
  .attr('class', 'c1')
  .attr('fill', '#000')
  .attr('cy', yoff)
  .attr('r', r1)
  .attr('cx', xoff)

let overlapCircle = vis.append('circle')
  .attr('clip-path', 'url(#clip)')
  .attr('class', 'overlap')
  .attr('fill', 'url("#drawing-venn-diagrams-grad-overlap")')
  .attr('cy', yoff)
  .attr('r', r2)
  .attr('cx', xoff + dist)



  d3.select('body').on('mousemove.drawing-venn-diagrams', () => {
      let mouse = d3.mouse(svg.node()), x = mouse[0], y = mouse[1]
      let dx = xoff - x, dy = yoff - y
      let dist = Math.sqrt(square(dx) + square(dy)); // <- important ;
      [c2, overlapCircle].forEach(c => c.attr('cx', x).attr('cy', y))

      // area = overlapArea(r1, r2, dist)
      // c1area = Math.PI * square(r1)
      // c2area = Math.PI * square(r2)
      // format = d3.format('%')
      // console.log('% area of overlap of c1:', format(area / c1area))
      // console.log('% area of overlap of c2:', format(area / c2area))
      // console.log('--')
  })


/*
Original, with cool demo:

svg = d3.select('svg').attr height: window.innerHeight, width: window.innerWidth
vis = svg.append('g')

r1 = 125
r2 = 80
dist = 110
xoff = yoff = 200

c1 = vis.append('circle').attr class: 'c1', fill: '#F8A2FF', cy: yoff, r: r1, cx: xoff  
c2 = vis.append('circle').attr class: 'c2', fill: '#E84D4D', cy: yoff, r: r2, cx: xoff + dist

clip = vis.append('clipPath').attr('id', 'clip')
clipCircle = clip.append('circle').attr class: 'c1', fill: '#F8A2FF', cy: yoff, r: r1, cx: xoff  

overlap = vis.append('circle').attr 'clip-path': 'url(#clip)', class: 'overlap', fill: '#E84D4D', cy: yoff, r: r2, cx: xoff + dist

# Center c1 at (0, 0)
#      * (xDist, yDist)
#     /|
# r1 / |
#   /  | yDist
#  /   |
# /____|
# xDist
#
# Pythagoras says: xDistSq + yDistSq = r1Sq

sq = (n) -> n * n
circleArea = (radius) -> Math.PI * sq(radius)
arcArea = (radius, arcAngle) ->
    totalAngle = 2 * Math.PI
    (arcAngle / totalAngle) * circleArea(radius)
triangleArea = (baseLength, height) -> (baseLength * height) / 2

overlapArea = (r1, r2, dist) ->
    if r1 < r2 then [r1, r2] = [r2, r1]

    area1 = circleArea(r1)
    area2 = circleArea(r2)

    return area2 if dist < r1 - r2
    return 0 if dist > r1 + r2
        
    r1Sq = sq(r1)
    r2Sq = sq(r2)
    distSq = sq(dist)

    xDist = (r1Sq - r2Sq + distSq) / (2 * dist)
    xDistSq = sq(xDist)
    yDist = Math.sqrt(r1Sq - xDistSq)

    area1 = arcArea(r1, Math.acos(xDist / r1)) - triangleArea(xDist, yDist)
    area2 = arcArea(r2, Math.acos(dist - xDist / r2)) - triangleArea(dist - xDist, yDist)

    2 * (area1 + area2)


calcArea = (r1, r2, dist) ->
    if r1 < r2 then [r1, r2] = [r2, r1]

    c1area = Math.PI * r1*r1
    c2area = Math.PI * r2*r2
    if dist < r1 - r2
        area = Math.min(c1area, c2area)
    else if dist > r1 + r2
        area = 0
    else
        x1 = (r1*r1 - r2*r2 + dist*dist) / (2 * dist)
        x2 = dist - x1

        h = Math.sqrt r1*r1 - x1*x1 # = sqrt(r2*r2 - x2*x2)

        θ1 = Math.acos x1 / r1
        θ2 = Math.acos x2 / r2

        area1 = θ1 * r1*r1 - x1*h
        area2 = θ2 * r2*r2 - x2*h
        area = area1 + area2

    area

d3.select('body').on('mousemove', ->
    [x, y] = d3.mouse(this)
    # y = yoff
    dx = xoff - x
    dy = yoff - y
    dist = Math.sqrt dx*dx + dy*dy

    c2.attr cx: x, cy: y
    overlap.attr cx: x, cy: y
    area = overlapArea(r1, r2, dist)

    c1area = Math.PI * r1*r1
    c2area = Math.PI * r2*r2
    format = d3.format '%'
    d '% area of overlap of c1:', format area / c1area
    d '% area of overlap of c2:', format area / c2area
    d '--'

)

circleDistance: (r1, r2, desiredOverlap) ->
    if r2 > r1 then [r1, r2] = [r2, r1] # r1 should always be the greater radius.
    lo = r1 + r2 # overlap area is minimal at r1 + r2 (the circles don't overlap)
    hi = r1 - r2 # overlap area is maximal at r1 - r2 (the circles fully overlap)
    eps = 0.1

    # Because the overlapArea function is monotonic increasing, we can perform a
    # simple bisection search to find the value of dist that leads to an overlap
    # area within epsilon of the desired overlap.
    for i in [1..100]
        dist = (lo + hi) / 2
        overlap = @overlapArea(r1, r2, dist)
        if Math.abs(overlap - desiredOverlap) <= eps then return dist
        if overlap < desiredOverlap then lo = dist else hi = dist

    d "Warning: circleDistance failed to converge after 100 iterations.
       Current best: #{dist} with overlap #{overlap} (desired: #{desiredOverlap})"
    overlap

key 'r', ->
    r1 = 200 * Math.random()
    r2 = 200 * Math.random()

    c1.transition().attr r: r1
    clipCircle.transition().attr r: r1
    c2.transition().attr r: r2
    overlap.transition().attr r: r2

*/
