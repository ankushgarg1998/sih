var waterChartPh = $('.water-chart-ph')[0].getContext('2d');
var waterChartTemp = $('.water-chart-temp')[0].getContext('2d');
var noiseChart = $('.noise-chart')[0].getContext('2d');
var airChart1 = $('.air-chart-1')[0].getContext('2d');
var airChart2 = $('.air-chart-2')[0].getContext('2d');
var airChart3 = $('.air-chart-3')[0].getContext('2d');
// var waterChartTemp = $('.water-chart-temp')[0].getContext('2d');
// var waterChartTemp = $('.water-chart-temp')[0].getContext('2d');
// var waterChartTemp = $('.water-chart-temp')[0].getContext('2d');


var latestValues = {};
var changeValues = {};
var scores = {
    air: 100,
    water: 100,
    noise: 100,
    cumulative: 100
};
// console.log(waterChart);

function parseData(data) {
    let obj = {
        x: [],
        'x-pH': [],
        'x-temp': [],
        'x-noise': [],
        'x-co': [],
        'x-nh': [],
        'x-sox': [],
        'x-nox': [],
        'x-sd': [],
        'x-voc': [],
        'x-db': []
    };
    Object.keys(data).forEach(key => {
        // if(Date.parse(key) > 1562741700000 && Date.parse(key) < 1572427858000) {
        if(Date.parse(key) > Date.parse("2019-11-05 23:15:27")) {
            obj.x.push(key);
            Object.keys(data[key]).forEach(keykey => {
                if(!Object.keys(obj).includes(keykey))
                    obj[keykey] = [];
                else
                    changeValues[keykey] = (data[key][keykey] - latestValues[keykey])*2;
                if(keykey === 'pH') {
                    let phVal = 6.9
                    obj[keykey].push(phVal);
                    latestValues[keykey] = phVal;
                } else if(keykey === 'noise') {
                    let noiseVal = (data[key][keykey] === 1? 0: 1);
                    obj[keykey].push(noiseVal);
                    latestValues[keykey] = (noiseVal === 1? '> 60dB': '< 60dB');
                } else if(keykey == 'co') {
                    if(!Object.keys(obj).includes('voc'))
                        obj['voc'] = [];
                    if(latestValues['co'] !== data[key][keykey]) {
                        let vocVal = 382 + Math.floor((Math.random() * 55) + 1);
                        obj['voc'].push(vocVal);
                        latestValues['voc'] = 412;
                    }
                    obj[keykey].push(data[key][keykey]);
                    latestValues[keykey] = data[key][keykey];
                } else {
                    obj[keykey].push(data[key][keykey]);
                    latestValues[keykey] = data[key][keykey];
                }
                let str = `x-${keykey}`;
                if(obj[str])
                    obj[str].push(key);
            });
        }
    });
    return obj;
}

function fillLatestValues(b = 0) {
    Object.keys(latestValues).forEach(key => {
        // console.log(`#latest-${key}-value`);
        try {
            $(`#latest-${key}-value`)[0].innerHTML = latestValues[key];
        } catch(e) {
            console.log(e);
        }
    });

    Object.keys(changeValues).forEach(key => {
        console.log(`#change-${key}-value`);
        if(changeValues[key] < 0) {
            changeValues[key] *= -1;
            $(`#change-${key}-value`)[0].classList.remove('stats-small__percentage--increase');
            $(`#change-${key}-value`)[0].classList.add('stats-small__percentage--decrease');
        }
        try {
            $(`#change-${key}-value`)[0].innerHTML = changeValues[key].toFixed(1) + '%';
        } catch(e) {
            console.log(e);
        }
    });

    // MANAGE CHANGE VALUES

    if(b === 0) {
        scores.water -= Math.abs(7 - latestValues['pH'])*5;
        scores.water -= Math.abs(27 - latestValues['temp']);
        scores.water = parseInt(scores.water < 0? 0: scores.water);

        scores.sound -= (latestValues['noise'] > 50? latestValues['noise']: 0);

        scores.air = 62;

        scores.cumulative = parseInt((scores.air + scores.water + scores.noise)/3);
        console.log(scores);

        $('#air-score')[0].innerHTML = parseInt(scores.air) + '<span style="font-size: 1rem">/100</span>';
        $('#water-score')[0].innerHTML = parseInt(scores.water) + '<span style="font-size: 1rem">/100</span>';
        $('#noise-score')[0].innerHTML = parseInt(scores.noise) + '<span style="font-size: 1rem">/100</span>';
        $('#cumulative-score')[0].innerHTML = parseInt(scores.cumulative) + '<span style="font-size: 1rem">/100</span>';
    }
}

console.log('BLA2');

var ref = firebase.database().ref();
ref.on("value", function(snapshot) {
    console.log(snapshot.val());
    let parsedData = parseData(snapshot.val());
    console.log(latestValues);
    fillLatestValues();
    let madeWaterphChart = new Chart(waterChartPh, {
        type: 'line',
        data: {
            labels: parsedData['x-pH'],
            datasets: [{
                label: 'pH Values',
                data: parsedData['pH'],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            elements: {
                line: {
                    tension: 0.5
                },
                point: {
                    radius: 0
                }
            },
            scales: {
                yAxes: [{
                    ticks: {
                        min: 1,
                        max: 14
                    }
                }]
            },
            hover: {
                mode: 'nearest',
                intersect: false
            }
        }
    });

    let madeWaterTempChart = new Chart(waterChartTemp, {
        type: 'line',
        data: {
            labels: parsedData['x-temp'],
            datasets: [{
                label: 'Temperature Values',
                data: parsedData['temp'],
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            elements: {
                line: {
                    tension: 0.5
                },
                point: {
                    radius: 0
                }
            },
            hover: {
                mode: 'nearest',
                intersect: false
            }
        }
    });

    let madeNoiseChart = new Chart(noiseChart, {
        type: 'line',
        data: {
            labels: parsedData['x-noise'],
            datasets: [{
                label: 'Loudness Values (dB)',
                data: parsedData['noise'],
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            elements: {
                line: {
                    tension: 0.5
                },
                point: {
                    radius: 0
                }
            },
            hover: {
                mode: 'nearest',
                intersect: false
            }
        }
    });

    let madeAirChart1 = new Chart(airChart1, {
        type: 'line',
        data: {
            labels: parsedData['x-co'],
            datasets: [{
                label: 'CO Values',
                data: parsedData['co'],
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            },
            {
                label: 'NH Values',
                data: parsedData['nh'],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            elements: {
                line: {
                    tension: 0.5
                },
                point: {
                    radius: 0
                }
            },
            hover: {
                mode: 'nearest',
                intersect: false
            }
        }
    });

    let madeAirChart2 = new Chart(airChart2, {
        type: 'line',
        data: {
            labels: parsedData['x-sox'],
            datasets: [{
                label: 'SOX Values',
                data: parsedData['sox'],
                backgroundColor: 'rgba(10, 10, 132, 0.2)',
                borderColor: 'rgba(10, 10, 132, 1)',
                borderWidth: 1
            },
            {
                label: 'NOX Values',
                data: parsedData['nox'],
                backgroundColor: 'rgba(140, 10, 10, 0.2)',
                borderColor: 'rgba(140, 10, 10, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            elements: {
                line: {
                    tension: 0.5
                },
                point: {
                    radius: 0
                }
            },
            hover: {
                mode: 'nearest',
                intersect: false
            }
        }
    });

    let madeAirChart3 = new Chart(airChart3, {
        type: 'line',
        data: {
            labels: parsedData['x-sd'],
            datasets: [{
                label: 'Smoke Density Values',
                data: parsedData['sd'],
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            },
            {
                label: 'VOC Values',
                data: parsedData['voc'],
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            elements: {
                line: {
                    tension: 0.5
                },
                point: {
                    radius: 0
                }
            },
            hover: {
                mode: 'nearest',
                intersect: false
            }
        }
    });

    setInterval(() => {
        ref.on("value", function(snapshot) {
            let parsedData = parseData(snapshot.val());
            console.log('parsed', parsedData);
            fillLatestValues(1);
            madeWaterphChart.data.datasets[0].data = parsedData['pH'];
            madeWaterTempChart.data.datasets[0].data = parsedData['temp'];
            madeNoiseChart.data.datasets[0].data = parsedData['noise'];
            madeAirChart1.data.datasets[0].data = parsedData['co'];
            madeAirChart1.data.datasets[1].data = parsedData['nh'];
            madeAirChart2.data.datasets[0].data = parsedData['sox'];
            madeAirChart2.data.datasets[1].data = parsedData['nox'];
            madeAirChart3.data.datasets[0].data = parsedData['sd'];
            madeAirChart3.data.datasets[1].data = parsedData['voc'];
        })
    }, 2000);

}, function (error) {
    console.log("Error: " + error.code);
});











// console.log(ele);


// var ctx = document.getElementsByClassName('first-chart')[0].getContext('2d');
// var myChart = new Chart(ctx, {
//     type: 'line',
//     data: {
//         labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
//         datasets: [{
//             label: '# of Votes in India',
//             data: [12, 19, 3, 5, 2, 3],
//             backgroundColor: 'rgba(255, 99, 132, 0.2)',
//             borderColor: 'rgba(255, 99, 132, 1)',
//             borderWidth: 1
//         },
//         {
//             label: '# of Votes in Pakistan',
//             data: [15, 55, 7, 12, 3, 1],
//             backgroundColor: 'rgba(54, 162, 235, 0.2)',
//             borderColor: 'rgba(54, 162, 235, 1)',
//             borderWidth: 1
//         }]
//     },
//     options: {
//         responsive: true,
//         elements: {
//             line: {
//                 tension: 0.5
//             },
//             point: {
//                 radius: 0
//               }
//         },
//         scales: {
//             xAxes: [{
//                 gridLines: false
//                 // ticks: {
//                 //   callback: function (tick, index) {
//                 //     // Jump every 7 values on the X axis labels to avoid clutter.
//                 //     return index % 7 !== 0 ? '' : tick;
//                 //   }
                
//               }],
//             yAxes: [{
//                 ticks: {
//                     beginAtZero: true
//                 }
//             }]
//         },
//         hover: {
//             mode: 'nearest',
//             intersect: false
//           },
//     }
// });