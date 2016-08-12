"use strict";
(function (slug) {
    // Since `overlapArea` function is monotonic increasing, we can perform a
    // simple bisection search to find the distance that leads to an overlap
    // area within epsilon of the desired overlap.
    var distanceForOverlapArea = function (r1, r2, desiredOverlap) {
        // Use a small epsilon for subpixel precision
        var eps = 0.075;
        // Set up initial values for our search space
        var bestGuess, lo = r1 + r2, hi = r1 - r2;
        // Run a fixed number of search iterations to converge on
        // a final value, which will hopefully be close enough.
        // This isn't too precise, but I've found a hundred iterations
        // to be plenty enough in practice
        for (var i = 1; i < 100; i++) {
            var dist = (lo + hi) / 2;
            bestGuess = overlapArea(r1, r2, dist);
            if (Math.abs(bestGuess - desiredOverlap) <= eps)
                return dist;
            if (bestGuess < desiredOverlap) {
                lo = dist;
            }
            else {
                hi = dist;
            }
        }
        return bestGuess;
    };
    function overlapArea(r1, r2, dist) {
        // Calculate the area in the overlap of two circles with
        // radii `r1` and `r2` that are `dist` distance apart.
        // A utility squaring function
        var sq = function (x) { return x * x; };
        // If one circle is inside the other, return the size of the smaller.
        if (dist <= r1 - r2)
            return Math.PI * sq(Math.min(r1, r2));
        // If the circles aren't even touching, then the overlap is zero.
        if (dist >= r1 + r2)
            return 0;
        // The math and variable names follow page 62 of 'Generating
        // and Drawing Area-Proportional Euler and Venn Diagrams' by SC Chow:
        // https://dspace.library.uvic.ca/bitstream/handle/1828/128/phdGradStudiesMay24.pdf
        var alpha = 2 * Math.acos((sq(dist) + sq(r1) - sq(r2)) / (2 * r1 * dist));
        var beta = 2 * Math.acos((sq(dist) + sq(r2) - sq(r1)) / (2 * r2 * dist));
        return 0.5 * (sq(r1) * (alpha - Math.sin(alpha)) + sq(r2) * (beta - Math.sin(beta)));
    }
    ;
    var randomID = function () { return [
        'id',
        (Math.random() * 1000000000).toString(36),
        (+new Date()).toString(36)
    ].join('-'); };
    var sign = function (x) {
        x = +x; // convert to a number
        if (x === 0 || isNaN(x)) {
            return x;
        }
        return x > 0 ? 1 : -1;
    };
    function venn(update) {
        var clipID = randomID();
        var enter = update.enter().append('g').attr('class', 'venn');
        var inner = enter.append('g').attr('class', 'inner');
        inner.append('clipPath').attr('id', clipID)
            .append('circle').attr('class', 'clip');
        inner.append('circle').attr('class', 'c1');
        inner.append('circle').attr('class', 'c2');
        inner.append('circle').attr('class', 'overlap')
            .attr('clip-path', 'url(#' + clipID + ')');
        var both = update.merge(enter);
        both.select('.inner')
            .attr('transform', function (d) {
            var x = Math.cos(d.angle), y = Math.sin(d.angle);
            var offset = function (n) { return sign(n) * 0.5 * (d.r1 - Math.max(d.r1, Math.abs(n) * d.distance + d.r2)); };
            return 'translate(' + [offset(x), offset(y)] + ')';
        });
        var c1 = function (sel) { return sel
            .attr('r', function (d) { return d.r1; })
            .attr('cx', 0)
            .attr('cy', 0); };
        both.select('.c1').call(c1);
        both.select('.clip').call(c1);
        var c2 = function (sel) { return sel
            .attr('r', function (d) { return d.r2; })
            .attr('cx', function (d) { return d.distance * Math.cos(d.angle); })
            .attr('cy', function (d) { return d.distance * Math.sin(d.angle); }); };
        both.select('.c2').call(c2);
        both.select('.overlap').call(c2);
        return enter;
    }
    function one() {
        var svg = d3.select('#' + slug + ' svg.top');
        var width = svg.node().getBoundingClientRect().width;
        var height = 325;
        svg.attr('height', height);
        var datum = {
            r1: 125,
            r2: 80,
            distance: 125,
            angle: -0.25 * Math.PI
        };
        svg.selectAll('g.venn').data([datum]).call(venn);
        svg.selectAll('.venn').attr('transform', 'translate(' + [width / 2, height / 2] + ')');
        svg.selectAll('.c1').attr('fill', 'url(#' + slug + '-grad-c1)');
        svg.selectAll('.c2').attr('fill', 'url(#' + slug + '-grad-c2)');
        svg.selectAll('.overlap').attr('fill', 'url(#' + slug + '-grad-overlap)');
        // Subtle movement-shifting with mouse or touch.
        var update = function (coords) {
            var x = coords[0], y = coords[1];
            var rect = svg.node().getBoundingClientRect();
            var ox = rect.left + rect.height / 2, oy = rect.top + rect.width / 2; // origin
            var scale = 0.025;
            svg.selectAll('.c2, .overlap')
                .attr('cx', function (d) { return d.distance * Math.cos(d.angle) + (x - ox) * scale; })
                .attr('cy', function (d) { return d.distance * Math.sin(d.angle) + (y - oy) * scale; });
        };
        d3.select('body').on('mousemove.venn', function () {
            update([d3.event.clientX, d3.event.clientY]); // relative to window, not page
        }).on('touchmove', function () {
            // actually, this interacts badly with scroll; just have a static post instead.
            // update(d3.touches(svg.node())[0])
        });
    }
    function two() {
        var svg = d3.select('#' + slug + ' svg.overlaps');
        var width = svg.node().getBoundingClientRect().width;
        var spacings = [0.1, 0.25, 0.5, 0.75, 1];
        var x = d3.scaleBand().domain(d3.range(spacings.length))
            .rangeRound([0, width]).paddingOuter(0).paddingInner(0.35);
        var strokeWidth = 1.5, r = x.bandwidth() / 2 - strokeWidth;
        var height = 5 * r + 20; // +constant for labels 
        svg.attr('height', height);
        var data = spacings.map(function (pc) {
            return {
                pc: pc,
                r1: r,
                r2: r,
                distance: distanceForOverlapArea(r, r, pc * Math.PI * r * r),
                angle: -0.5 * Math.PI
            };
        });
        var enter = venn(svg.selectAll('g.venn').data(data));
        var g = svg.selectAll('g.venn')
            .attr('transform', function (d, i) { return 'translate(' + (x(i) + r + strokeWidth) + ', ' + (2 * r) + ')'; });
        var color = '#CFC7E2';
        g.select('.c1')
            .attr('fill', 'transparent')
            .attr('stroke', color)
            .style('stroke-width', strokeWidth)
            .attr('stroke-dasharray', '2,2');
        g.select('.c2')
            .attr('fill', 'transparent')
            .attr('stroke', color)
            .attr('stroke-width', strokeWidth);
        g.selectAll('.clip, .overlap')
            .attr('fill', color)
            .attr('r', function (d) { return d.r2 + strokeWidth; });
        var format = d3.format('.0%');
        var text = enter.append('text');
        text.append('tspan')
            .attr('x', 0)
            .attr('class', 'pc');
        text
            .filter(function (d, i) { return i == 0; })
            .append('tspan')
            .attr('class', 'label')
            .attr('dy', '1.35em')
            .attr('x', 0)
            .text('Overlap');
        g.select('text')
            .attr('text-anchor', 'middle')
            .attr('transform', 'translate(0,' + (r * 2.75) + ')')
            .select('.pc').text(function (d) { return format(d.pc); });
    }
    var go = function () {
        one();
        two();
    };
    setTimeout(go, 1);
    d3.select(window).on('resize.venn', go);
})('venn-diagrams');
