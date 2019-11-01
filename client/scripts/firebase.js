var firebaseConfig = {
    apiKey: "AIzaSyBIIZCuo09f5GO9llEobSHFmhrjzF9G0Eo",
    authDomain: "wasdpollutecheck.firebaseapp.com",
    databaseURL: "https://wasdpollutecheck.firebaseio.com",
    projectId: "wasdpollutecheck",
    storageBucket: "wasdpollutecheck.appspot.com",
    messagingSenderId: "755507818839",
    appId: "1:755507818839:web:8d3f6a7d5f2c29f8"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
console.log('BLA');
var ref = firebase.database().ref();
ref.on("value", function(snapshot) {
    console.log(snapshot.val());
}, function (error) {
    console.log("Error: " + error.code);
});

var ele = $('.first-chart');
console.log(ele);


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


// var ct1 = document.getElementsByClassName('second-chart')[0].getContext('2d');
// var myChart1 = new Chart(ct1, {
//     type: 'line',
//     data: {
//         labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
//         datasets: [{
//             label: 'Air Pollution duw to SO2',
//             data: [12, 19, 3, 5, 2, 3],
//             backgroundColor: 'rgba(255, 99, 132, 0.2)',
//             borderColor: 'rgba(255, 99, 132, 1)',
//             borderWidth: 1
//         },
//         {
//             label: 'Air Pollution due to CO',
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