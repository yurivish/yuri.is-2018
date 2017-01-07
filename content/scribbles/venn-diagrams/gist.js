// Since `overlapArea` function is monotonic increasing, we can perform a
// simple bisection search to find the distance that leads to an overlap
// area within epsilon of the desired overlap.
var distanceForOverlapArea = function (r1, r2, desiredOverlap) {
    // Ensure r1 <= r2
    if (r1 > r2) {
        var temp = r2;
        r2 = r1;
        r1 = temp;
    }
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
    // Assumes `r1` <= `r2`.
    // A utility squaring function
    var sq = function (x) { return x * x; };
    // If one circle is inside the other, return the size of the smaller.
    if (dist <= r1 - r2)
        return Math.PI * sq(r2);
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