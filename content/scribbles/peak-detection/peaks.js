//
// Note: This uses functions from [d3-array](https://github.com/d3/d3-array)
//

function findPeaks(data, lookaround=2, sensitivity=1.5, coalesce=2) {
	// Assigns a spikiness score to `value`, based on its `left` and `right` neighbors
	var score = (left, value, right) =>
		value - d3.mean([
			left.length  ? d3.min(left)  : value,
			right.length ? d3.min(right) : value
		])

	// Compute a score for every sample value in `data`
	var scores = data.map(
		(value, index) => score(
			data.slice(Math.max(0, index - lookaround), index),
			value,
			data.slice(index + 1, index + lookaround + 1)
		)
	)

	// Normalize the scores
	var mean = d3.mean(scores), stdev = d3.deviation(scores)
	scores = scores.map(score => (score - mean) / stdev)

	// `peaks` are indices whose score is above the sensitivity threshold
	var peaks = d3.range(scores.length).filter(index => scores[index] > sensitivity)
	if (peaks.length < 2) return peaks

	// If we have multiple peaks, coalesce those that are close together
	var groups = [peaks.slice(0, 1)]
	d3.pairs(peaks)
		.forEach(([a, b]) => {
			if (b - a < coalesce) {
				groups[groups.length - 1].push(b)
			} else {
				groups.push([b])
			}
		})

	// Represent every group of peaks by the highest peak in the group
	return groups.map(group => group[d3.scan(group, (a, b) => data[b] - data[a])])
};
