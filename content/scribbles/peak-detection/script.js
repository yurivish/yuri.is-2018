"use strict";

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

	// Walk through the `data` array and compute scores for every element
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
	return [scores, groups.map(group => group[d3.scan(group, (a, b) => data[b] - data[a])])]
};


(function(slug) {
	const svg = d3.select(`#${slug} .some-time-series`)
	const data = [{"size":142,"date":980640000000},{"size":117,"date":982368000000},{"size":151,"date":984960000000},{"size":210,"date":988243200000},{"size":212,"date":990576000000},{"size":246,"date":993772800000},{"size":289,"date":995587200000},{"size":197,"date":998524800000},{"size":299,"date":1000252800000},{"size":415,"date":1002412800000},{"size":1317,"date":1006905600000},{"size":2000,"date":1009152000000},{"size":2109,"date":1011916800000},{"size":1748,"date":1013040000000},{"size":1976,"date":1015113600000},{"size":1934,"date":1019520000000},{"size":1873,"date":1021680000000},{"size":1231,"date":1022976000000},{"size":2109,"date":1027641600000},{"size":2740,"date":1030147200000},{"size":2167,"date":1032652800000},{"size":2262,"date":1034467200000},{"size":3321,"date":1037664000000},{"size":4130,"date":1039219200000},{"size":3707,"date":1044057600000},{"size":3108,"date":1045612800000},{"size":3349,"date":1047081600000},{"size":3562,"date":1050364800000},{"size":3435,"date":1052956800000},{"size":4520,"date":1054512000000},{"size":5972,"date":1057190400000},{"size":5521,"date":1062374400000},{"size":3714,"date":1063065600000},{"size":3989,"date":1066521600000},{"size":4104,"date":1070150400000},{"size":4559,"date":1072224000000},{"size":4543,"date":1075075200000},{"size":3678,"date":1076284800000},{"size":4050,"date":1079481600000},{"size":4264,"date":1082073600000},{"size":4421,"date":1084838400000},{"size":7289,"date":1087171200000},{"size":6757,"date":1089072000000},{"size":6134,"date":1091664000000},{"size":4499,"date":1095897600000},{"size":4427,"date":1099180800000},{"size":3964,"date":1100736000000},{"size":5349,"date":1102809600000},{"size":5407,"date":1106092800000},{"size":4625,"date":1107820800000},{"size":4693,"date":1111449600000},{"size":4572,"date":1112486400000},{"size":4403,"date":1115596800000},{"size":5645,"date":1118707200000},{"size":7691,"date":1120521600000},{"size":7316,"date":1125532800000},{"size":4867,"date":1127088000000},{"size":4575,"date":1129593600000},{"size":5313,"date":1131840000000},{"size":6484,"date":1135555200000},{"size":6099,"date":1137542400000},{"size":4930,"date":1140998400000},{"size":5618,"date":1142812800000},{"size":5497,"date":1145232000000},{"size":5488,"date":1148860800000},{"size":5606,"date":1151107200000},{"size":6600,"date":1152748800000},{"size":5996,"date":1155686400000},{"size":4407,"date":1159315200000},{"size":4305,"date":1161648000000},{"size":4461,"date":1164672000000},{"size":5275,"date":1166313600000},{"size":4887,"date":1170028800000},{"size":4603,"date":1172361600000},{"size":4294,"date":1174953600000},{"size":4370,"date":1176768000000},{"size":4570,"date":1180051200000},{"size":5562,"date":1181520000000},{"size":10495,"date":1185235200000},{"size":9578,"date":1186358400000},{"size":5773,"date":1189987200000},{"size":5628,"date":1191801600000},{"size":4975,"date":1195862400000},{"size":5914,"date":1197072000000},{"size":5925,"date":1200268800000},{"size":5176,"date":1204243200000},{"size":5933,"date":1205625600000},{"size":5209,"date":1208822400000},{"size":4974,"date":1209772800000},{"size":5663,"date":1212883200000},{"size":6481,"date":1217376000000},{"size":5703,"date":1220227200000},{"size":4056,"date":1221350400000},{"size":4189,"date":1224547200000},{"size":4098,"date":1227916800000},{"size":5075,"date":1230595200000},{"size":5039,"date":1232841600000},{"size":3867,"date":1233532800000},{"size":4333,"date":1236470400000},{"size":4325,"date":1239235200000},{"size":4736,"date":1242604800000},{"size":5682,"date":1244851200000},{"size":8790,"date":1249084800000},{"size":8464,"date":1250726400000},{"size":5037,"date":1252022400000},{"size":4615,"date":1256947200000},{"size":4355,"date":1258156800000},{"size":5913,"date":1261785600000},{"size":5963,"date":1263945600000},{"size":4733,"date":1265155200000},{"size":4960,"date":1269475200000},{"size":4988,"date":1270684800000},{"size":5106,"date":1273622400000},{"size":6241,"date":1275868800000},{"size":7010,"date":1279584000000},{"size":6751,"date":1281916800000},{"size":5130,"date":1284076800000},{"size":5425,"date":1286409600000},{"size":6771,"date":1290470400000},{"size":8714,"date":1292544000000},{"size":7804,"date":1294704000000},{"size":6033,"date":1298160000000},{"size":4867,"date":1301443200000},{"size":7106,"date":1302566400000},{"size":6439,"date":1305590400000},{"size":8032,"date":1309392000000},{"size":13414,"date":1311465600000},{"size":13030,"date":1313366400000},{"size":8820,"date":1316563200000},{"size":7996,"date":1317600000000},{"size":7854,"date":1320364800000},{"size":9680,"date":1325376000000},{"size":8147,"date":1327276800000},{"size":6981,"date":1329523200000},{"size":6933,"date":1332028800000},{"size":7225,"date":1333497600000},{"size":6721,"date":1337644800000},{"size":7788,"date":1339632000000},{"size":8464,"date":1341619200000},{"size":8118,"date":1344988800000},{"size":6248,"date":1347926400000},{"size":6295,"date":1350777600000},{"size":5866,"date":1353888000000},{"size":7072,"date":1354579200000},{"size":6867,"date":1357603200000},{"size":5983,"date":1360022400000},{"size":6696,"date":1362614400000},{"size":6219,"date":1366848000000},{"size":6243,"date":1369180800000},{"size":7590,"date":1372204800000},{"size":8202,"date":1375142400000},{"size":7589,"date":1377388800000},{"size":6053,"date":1380499200000},{"size":5913,"date":1380758400000},{"size":5437,"date":1384300800000},{"size":6689,"date":1387756800000},{"size":6466,"date":1388793600000},{"size":5729,"date":1392422400000},{"size":5404,"date":1396224000000},{"size":5056,"date":1397174400000},{"size":5695,"date":1401321600000},{"size":5212,"date":1401667200000},{"size":5592,"date":1405036800000},{"size":5384,"date":1407196800000},{"size":4467,"date":1411862400000},{"size":4598,"date":1413331200000},{"size":4243,"date":1416960000000},{"size":5129,"date":1417910400000},{"size":5187,"date":1420243200000},{"size":4528,"date":1423958400000},{"size":4787,"date":1426377600000},{"size":4744,"date":1427932800000},{"size":4720,"date":1432944000000},{"size":5231,"date":1435276800000},{"size":5564,"date":1436572800000},{"size":4705,"date":1439856000000},{"size":4601,"date":1442966400000},{"size":4274,"date":1446163200000},{"size":3762,"date":1446768000000},{"size":4864,"date":1450396800000},{"size":1697,"date":1451692800000}]
	const pubdates = [
		{ "media": "book", "serialNumber": 1, "name": "Harry Potter and the Sorcerer's Stone", "published": "6/26/1997" },
		{ "media": "book", "serialNumber": 2, "name": "Harry Potter and the Chamber of Secrets", "published": "7/2/1998" },
		{ "media": "book", "serialNumber": 3, "name": "Harry Potter and the Prizoner of Azkaban", "published": "7/8/1999" },
		{ "media": "book", "serialNumber": 4, "name": "Harry Potter and the Goblet of Fire", "published": "7/8/2000" },
		{ "media": "book", "serialNumber": 5, "name": "Harry Potter and the Order of the Phoenix", "published": "6/21/2003" },
		{ "media": "book", "serialNumber": 6, "name": "Harry Potter and the Half-blood Prince", "published": "7/16/2005" },
		{ "media": "book", "serialNumber": 7, "name": "Harry Potter and the Deathly Hallows", "published": "7/21/2007" },

		{ "media": "play", "name": "Harry Potter and the Cursed Child", "published": "7/31/2016" },

		{ "media": "movie", "serialNumber": 1, "name": "Harry Potter and the Sorcerer's Stone", "published": "11/16/2001" },
		{ "media": "movie", "serialNumber": 2, "name": "Harry Potter and the Chamber of Secrets", "published": "11/14/2002" },
		{ "media": "movie", "serialNumber": 3, "name": "Harry Potter and the Prizoner of Azkaban", "published": "5/31/2004" },
		{ "media": "movie", "serialNumber": 4, "name": "Harry Potter and the Goblet of Fire", "published": "11/18/2005" },
		{ "media": "movie", "serialNumber": 5, "name": "Harry Potter and the Order of the Phoenix", "published": "7/11/2007" },
		{ "media": "movie", "serialNumber": 6, "name": "Harry Potter and the Half-blood Prince", "published": "7/15/2009" },
		{ "media": "movie", "serialNumber": 7, "name": "Harry Potter and the Deathly Hallows Pt. 1", "published": "11/19/2010" },
		{ "media": "movie", "serialNumber": 7.2, "name": "Harry Potter and the Deathly Hallows Pt. 2", "published": "7/15/2011" }
	]
	pubdates.forEach(d => d.published = new Date(d.published))

	const everest = [[11148.3,10078.7,9183.07,9425.85,10301.8,10515.1,9872.05,9064.96,7995.41,7083.33,7316.27,7860.89,8353.02,8874.67,9514.44,10439.6,11551.8,12539.4,13192.3,13878.0,13779.5,13736.9,12998.7,12473.8,12923.2,13884.5,14635.8,14954.1,15295.3,15738.2,16309.1,17588.6,18090.6,17089.9,16190.9,15334.6,14645.7,14074.8,13425.2,13563.0,14455.4,14678.5,14304.5,13677.8,13057.7,12336.0,11699.5,11000.7,10262.5,8927.17,8566.27,9048.56,10748.0,12208.0,13159.4,12014.4,10226.4,9078.08,10075.5,10853.0,11545.3,12654.2,13881.2,14803.1,15419.9,15708.7,15449.5,15397.0,15725.1,15915.4,16112.2,17083.3,17457.3,16715.9,16332.0,16207.3,16243.4,15876.0,15705.4,15055.8,13946.9,13782.8,14110.9,14544.0,14980.3,15216.5,15344.5,15544.6,15702.1,15826.8,16000.7,16194.2,16584.6,17171.9,18369.4,18307.1,18428.5,19028.9,19858.9,18943.6,19028.9,19478.3,18969.8,18589.2,18395.7,18635.2,19071.5,19261.8,18211.9,17647.6,17342.5,17149.0,16994.8,16820.9,16860.2,17188.3,17565.6,17641.1,17572.2,17611.5,17414.7,17240.8,16699.5,16036.7,15885.8,16151.6,16233.6,16610.9,16988.2,17680.4,17998.7,17539.4,17283.5,17290.0,17011.2,17240.8,17398.3,16994.8,16289.4,16020.3,15971.1,16502.6,17440.9,17322.8,17263.8,17116.1,17099.7,17214.6,17181.8,17103.0,17198.2,17358.9,17526.2,17936.4,18602.4,18195.5,17956.0,18349.7,18372.7,17545.9,17339.2,17165.4,17158.8,17500.0,17792.0,17490.2,17299.9,17145.7,17286.7,17811.7,18930.4,20009.8,19691.6,19790.0,20839.9,22322.8,22690.3,22956.0,23425.2,24599.7,26000.7,27244.1,28005.2,26857.0,25098.4,23838.6,22611.5,21194.2,19521.0,18579.4,18077.4,17965.9,17887.1,17670.6,17588.6,17526.2,17470.5,17424.5,17280.2,17188.3,17116.1,17047.2,16965.2,16873.4,16811.0,16758.5,16725.7,16620.7,16545.3,16565.0,16437.0,16361.5,16400.9,16302.5,16000.7,15531.5,15410.1,15528.2,15498.7,15459.3,14809.7,14353.7,14160.1,14084.6,14048.6,13848.4,13884.5,14301.2,14448.8,14570.2,14740.8,14816.3,14616.1,14402.9,14980.3,15229.7,14832.7,14324.1,13664.7,14147.0,14868.8,15167.3,15620.1,16036.7,16200.8,16519.0,16348.4,15941.6,15603.7,15938.3,16082.7,15446.2,15367.5,15695.5,15393.7,15065.6,14858.9,14219.2,13228.3,12591.9,12434.4,12591.9,12795.3,12250.7,11696.2,11263.1,11020.3,10495.4,10771.0,11768.4,12240.8,12608.3,13100.4,13553.1,13546.6,14035.4,14235.6,14393.0,14891.7,14862.2,15318.2,15584.0,14553.8,14330.7,15019.7,15731.6,15892.4,15134.5,14537.4,14940.9,15282.2,15475.7,15298.6,14990.2,14813.0,15036.1,15820.2,16614.2,16548.6,16017.1,15879.3,16115.5,15954.7,16469.8,16824.1,16391.1,16115.5,16614.2,16673.2,15951.4,15794.0,16315.6,16397.6,16617.5,16942.3,16827.4,16666.7,16151.6,15351.0,14901.6,15479.0,16259.8,16896.3,17378.6,17299.9,16784.8,16781.5,17345.8,17854.3,18034.8,17808.4,17650.9,17263.8,16630.6,16351.7,16709.3,17716.5,18572.8,18369.4,18313.6,18257.9,18225.1,18435.0,18599.1,18835.3,19097.8,19261.8,19186.4,19225.7,19658.8,19612.9,19265.1,18933.7,18799.2,19071.5,19143.7,19055.1,18799.2,18290.7,18271.0,18694.2,18733.6,18497.4,18530.2]]

	function go() {
		let {width: chartWidth, height: chartHeight} = svg.node().getBoundingClientRect()
		var [scores, peaks] = findPeaks(data.map(d => d.size))

		// let x = d3.scaleLinear().domain([0, data.length]).range([0, chartWidth])
		svg.selectAll('line.a').data(data).enter().append('line')
			.attr('class', 'a')
			.attr('x1', (d, i) => i * 3)//x(i))
			.attr('x2', (d, i) => i * 3)//x(i))
			.attr('y1', (d, i) => chartHeight)
			.attr('y2', (d, i) => chartHeight - d.size / 100)
			.attr('stroke', '#7DDBFF')
			.attr('stroke-width', 2)
			.attr('stroke-linecap', 'round')
			.on('mouseenter', (d,i)=>console.log(i, new Date(d.date)))
			// .attr('shape-rendering', 'crispEdges')

		// svg.selectAll('line.b').data(data).enter().append('line')
		// 	.attr('class', 'b')
		// 	.attr('x1', (d, i) => i * 4)//x(i))
		// 	.attr('x2', (d, i) => i * 4)//x(i))
		// 	.attr('y1', (d, i) => chartHeight / 2)
		// 	.attr('y2', (d, i) => chartHeight / 2 - 5 * scores[i])
		// 	.attr('stroke', 'red')
		// 	.attr('stroke-width', 2)
		// 	.attr('stroke-linecap', 'round')
		// 	.on('mouseenter', (d,i)=>console.log(i, new Date(d.date)))
			// .attr('shape-rendering', 'crispEdges')


	let xDate = d3.scaleLinear().domain(d3.extent(data, d => d.date)).range([0, data.length * 4])
	// let chartHeight = 145

	let published = svg.selectAll('g.published').data(pubdates)
		.enter().append('g').attr('class', 'published')
		.attr('transform', d => `translate(${xDate(d.published)}, ${chartHeight + 2})`)
	window.data = data.map(d=>d.size)

	published.append('circle').attr('r', 2).attr('fill', 'cyan')

	}
	go()
	d3.select(window).on(`resize.${slug}`, go)
})('peak-detection') // TODO: Get this from the script url?
