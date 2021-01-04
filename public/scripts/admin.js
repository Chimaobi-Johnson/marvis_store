// MAP LOGIC
var ctx = document.getElementById('reportChart').getContext('2d');

var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
            label: 'My First dataset',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: [0, 10, 5, 2, 20, 30, 45]
        }]
    },

    // Configuration options go here
    options: {
        backgroundColor: 'rgba(0, 0, 0, 0.1)'
    }
});


const showMenu = (menu) => {
    const result = document.getElementById(menu).style.display;
    if(result === 'block') {
        document.getElementById(menu).style.display = 'none'
    } else {
        document.getElementById(menu).style.display = 'block'
    }
}