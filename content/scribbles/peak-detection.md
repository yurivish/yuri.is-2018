+++
date = "2017-01-08T16:46:00-05:00"
title = "Finding Mount Everest"
seq = 4
style = true
script = true
draft = true

+++

<!-- Peak Detection For Minimalists -->
<!-- Recently I was working on a visualization of [food seasonality](http://rhythm-of-food.net) and needed to detect the times at which	 search interest spiked. -->
<!--  that I used on a [recent visualization project](http://rhythm-of-food.net) where it was put to work to find sudden spikes in various food searches on Google Search -->

<!-- Here's the simple approach I used to find the peaks in a time series. -->
Here's a simple way to find the peaks in a series of samples.

First, score each sample for spikiness by comparing it to its shortest neighbors on each side. The bigger the difference, the higher the score.

<!-- <svg class='some-time-series'></svg> -->
<!-- _data => scores => thresholds_ -->

<!-- Scores should be normalized to a common baseline. A good choice is `(score - mean(scores)) / stdev(scores)`, which normalizes scale but preserves outliers. -->


<!-- _illustration of scores for various standard shapes, comparing left & right_ -->
<!-- _show the scores for each sample in the original chart_ -->

Next, use the scores to pick out the globally strongest peaks. We apply a sensitivity threshold, keeping only the samples whose scores lie above and discarding the rest.

<!-- <svg></svg> -->
<!-- _show the above chart, now with a sensitivity waterline_ -->

<!-- <svg></svg> -->

To stop peaks that span multiple samples from appearing multiple times in our final list, we coalesce peaks that are close together.

<!-- There's a small problem -- peaks spanning multiple samples appear multiple times. To fix this, we coalesce peaks that are close together. -->


<!-- _final, coalesced peaks_ -->

[See the code »](#)

_Algorithm Notes --_ This idea comes from a paper on [simple algorithms for peak detection](https://www.researchgate.net/publication/228853276_Simple_Algorithms_for_Peak_Detection_in_Time-Series). I like this approach for its minimalism and because it's often good enough. If needed, [more](-) [sophisticated](-) [techniques](-) exist.


<!-- strikes a good balance between simplicity and power. -->



<!--
. The peakiness of a sample should be a measure of how flat or spiky it is, and we calculate it by comparing the sample to its neighbors on the left and right. -->

<!--

The first step is to score each sample based on its local spikiness by comparing it to its nearby neighbors on the left and the right.

-->
<!-- atticus lish? -->

<!-- A high _threshold_ keeps only the strongest peaks, while lowering the threshold starts to let in smaller peaks with lower scores. -->

<!--
So far the scores are in the same units as our original data, so the next step is to rescale them.  -->
<!-- Normalizing them  will allow us to consistently treat different time series. A good choice is `(score - mean(scores)) / stdev(scores)`, which normalizes scale but preserves outliers. -->

<!-- the same cutoff for different time series. -->
