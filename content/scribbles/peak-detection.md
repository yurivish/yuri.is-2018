+++
date = "2017-01-08T16:46:00-05:00"
title = "Peak Detection"
seq = 5
style = true
script = true
draft = true

+++

Sometimes you want to find the peaks in a time series. Here's a simple but effective approach that I used on a [recent project](http://rhythm-of-food.net).

_chart with peaks identified_

The basic idea is to give each sample a spikiness score based on local context and then use it to pick out the globally strongest peaks.

_data => scores => thresholding_

First, we score each sample by comparing it to its shortest neighbors on each side. The bigger the difference, the higher the score.

_illustration of scores for various standard shapes, comparing left & right_

Next, we normalize the scores to a common baseline. A good choice is `(score - mean(scores)) / stdev(scores)`, which normalizes scale but preserves outliers.

_show the chart along with scores for each sample_

Now we can use a sensitivity threshold to pick our peaks, keeping samples with scores above the threshold and discarding the rest.

_show the above chart, now with a sensitivity waterline_

There's a small problem -- peaks spanning multiple samples appear multiple times. To fix this, we coalesce peaks that are close together.

_final, coalesced peaks_

[See the code »](#)



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
