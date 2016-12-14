// Initialize Angular & inject global dependencies
angular.module('app', ['smart-table'])
    .controller('controllers.application', ApplicationController)

// Dependency Injection
ApplicationController.$inject = [
    '$rootScope',
    '$scope',
    '$http'
]

// Controller Function
function ApplicationController(
    $rootScope,
    $scope,
    $http
) {
    // Set scope variables to be populated
    $scope.data = {}
    $scope.overview = []
    $scope.initial = []

    // Make HTTP Request to backend for data
    $http({ method: 'GET', url: '/data'}).then(function success(response) {

        // Group the array of objects into an associative array 
        // with their identifier as their key
        $scope.data = _.groupBy(response.data, function(item) {
            return item.identifier
        })


        // Iterate over the keys of that associative array and populate
        // the array we are going to use to display the data in smart
        // table. Calculate oldest, newest and count. This will act as 
        // the overview of our data and won't contain the specific values
        // that are going to be charted
        Object.keys($scope.data).forEach(function(itemKey) {
            $scope.overview.push({
                // Send identifier straight through
                id: itemKey,

                // Iterate through array, keep oldest
                oldest: $scope.data[itemKey].reduceRight(function(previous, current) {
                    return current.date > previous.date ? current : previous
                }),

                // Iterate through array, keep newest
                newest: $scope.data[itemKey].reduce(function(previous, current) {
                    return current.date < previous.date ? current : previous
                }),

                // Array length
                count: $scope.data[itemKey].length
            })
        })


        // Load in the asynchronous data to smart-table.
        // This prevents the table from expecting data that 
        // isn't there yet and breaking.
        $scope.initial = [].concat($scope.overview)


        // This event is fired when a row of the table is clicked. We are
        // generating a new Highstock Chart in the DOM element with the id 
        // of container. Inject the values of the selected key from the orignal 
        // grouped array. Highstock is expecting dates in UNIX timestamp, so 
        // convert to that.
        $scope.chartData = function(itemKey) {
            Highcharts.stockChart('container', {
                rangeSelector: {
                    selected: 1
                },

                title: {
                    text: 'Identifier Chart'
                },

                xAxis: {
                    type: 'datetime',
                    title: {
                        text: 'Date'
                    }
                },

                series: [{
                    name: itemKey,
                    data: $scope.data[itemKey].map(function(item) {
                        return [new Date(item.date).getTime(), item.value]
                    }),
                    tooltip: {
                        valueDecimals: 2
                    }
                }]
            })
        }
    })

}
