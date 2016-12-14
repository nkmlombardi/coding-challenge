angular.module('app', ['smart-table'])
    .controller('controllers.application', ApplicationController)

ApplicationController.$inject = [
    '$rootScope',
    '$scope',
    '$http'
]

function ApplicationController(
    $rootScope,
    $scope,
    $http
) {
    $scope.data = {}
    $scope.overview = []
    $scope.initial = []

    $http({
        method: 'GET',
        url: '/data'

    }).then(function success(response) {
        $scope.data = _.groupBy(response.data, function(item) {
            return item.identifier
        })

        Object.keys($scope.data).forEach(function(itemKey) {
            $scope.overview.push({
                id: itemKey,

                // Iterate through array, keep oldest
                oldest: $scope.data[itemKey].reduceRight(function(previous, current) {
                    return current.date > previous.date ? current : previous
                }),

                // Iterate through array, keep newest
                newest: $scope.data[itemKey].reduce(function(previous, current) {
                    return current.date < previous.date ? current : previous
                }),

                // Array Length
                count: $scope.data[itemKey].length
            })
        })

        // Load in the asynchronous data
        $scope.initial = [].concat($scope.overview)


        $scope.chartData = function(itemKey) {
            console.log('chartData', itemKey)

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
