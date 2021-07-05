'use strict';
var view = [];
var view2 = [];
var x = 0;
var dataRecieved = false;
var lineChartConfig;
var barChartConfig

window.chartColors = {
	green: '#75c181',
	gray: '#a9b5c9',
	text: '#252930',
	border: '#e7e9ed'
};

var LinearDataPoint = function(){ 
	view = [];
	firebase.database().ref('views').limitToLast(7).on('child_added',function(snapshot){
   view.push(snapshot.val().view);	
   c(view);
   dataRecieved = true;
   linearChart();
   var lineChart = document.getElementById('canvas-linechart').getContext('2d');
   window.myLine = new Chart(lineChart, lineChartConfig);
   
   var barChart = document.getElementById('canvas-barchart').getContext('2d');
   window.myBar = new Chart(barChart, barChartConfig);
})
};
LinearDataPoint();
function linearChart(){
//Chart.js Line Chart Example 
if(dataRecieved){
	 lineChartConfig = {
		type: 'line',
	
		data: {
			labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
			
			datasets: [{
				label: 'Current week',
				fill: false,
				backgroundColor: window.chartColors.green,
				borderColor: window.chartColors.green,
				data: [
					view[0],
					view[1],
					view[2],
					view[3],
					view[4],
					view[5],
					view[6]
				],
			}, {
				label: 'Previous week',
				borderDash: [3, 5],
				backgroundColor: window.chartColors.gray,
				borderColor: window.chartColors.gray,
				
				data: [
					view[0],
					view[1],
					view[2],
					view[3],
					view[4],
					view[5],
					view[6]
				],
				fill: false,
			}]
		},
		options: {
			responsive: true,	
			aspectRatio: 1.5,
			
			legend: {
				display: true,
				position: 'bottom',
				align: 'end',
			},
			
			title: {
				display: true,
				text: 'views recieved this week',
				
			}, 
			tooltips: {
				mode: 'index',
				intersect: false,
				titleMarginBottom: 10,
				bodySpacing: 10,
				xPadding: 16,
				yPadding: 16,
				borderColor: window.chartColors.border,
				borderWidth: 1,
				backgroundColor: '#fff',
				bodyFontColor: window.chartColors.text,
				titleFontColor: window.chartColors.text,
	
				callbacks: {
					//Ref: https://stackoverflow.com/questions/38800226/chart-js-add-commas-to-tooltip-and-y-axis
					label: function(tooltipItem, data) {
						if (parseInt(tooltipItem.value) >= 10) {
							return  'view'+ tooltipItem.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
						} else {
							return  'view' + tooltipItem.value ;
						}
					}
				},
	
			},
			hover: {
				mode: 'nearest',
				intersect: true
			},
			scales: {
				xAxes: [{
					display: true,
					gridLines: {
						drawBorder: false,
						color: window.chartColors.border,
					},
					scaleLabel: {
						display: false,
					
					}
				}],
				yAxes: [{
					display: true,
					gridLines: {
						drawBorder: false,
						color: window.chartColors.border,
					},
					scaleLabel: {
						display: false,
					},
					ticks: {
						beginAtZero: true,
						userCallback: function(value, index, values) {
							return  value.toLocaleString();   //Ref: https://stackoverflow.com/questions/38800226/chart-js-add-commas-to-tooltip-and-y-axis
						}
					},
				}]
			}
		}
	};
}
}

firebase.database().ref('views').limitToFirst(7).on('child_added',function(snapshot){
	view2.push(snapshot.val().view);	
    barChartData();
	var barChart = document.getElementById('canvas-barchart').getContext('2d');
	window.myBar = new Chart(barChart, barChartConfig);
 })

// Chart.js Bar Chart Example 
function barChartData(){
 barChartConfig = {
	type: 'bar',

	data: {
		labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
		datasets: [{
			label: 'Orders',
			backgroundColor: window.chartColors.green,
			borderColor: window.chartColors.green,
			borderWidth: 1,
			maxBarThickness: 16,
			
			data: [
				view2[0],
				view2[1],
				view2[2],
				view2[3],
				view2[4],
				view2[5],
				view2[6]
			]
		}]
	},
	options: {
		responsive: true,
		aspectRatio: 1.5,
		legend: {
			position: 'bottom',
			align: 'end',
		},
		title: {
			display: true,
			text: 'View Bar'
		},
		tooltips: {
			mode: 'index',
			intersect: false,
			titleMarginBottom: 10,
			bodySpacing: 10,
			xPadding: 16,
			yPadding: 16,
			borderColor: window.chartColors.border,
			borderWidth: 1,
			backgroundColor: '#fff',
			bodyFontColor: window.chartColors.text,
			titleFontColor: window.chartColors.text,

		},
		scales: {
			xAxes: [{
				display: true,
				gridLines: {
					drawBorder: false,
					color: window.chartColors.border,
				},

			}],
			yAxes: [{
				display: true,
				gridLines: {
					drawBorder: false,
					color: window.chartColors.borders,
				},

				
			}]
		}
		
	}
}
}






// Generate charts on load
window.addEventListener('load', function(){
	

	

});	
	
