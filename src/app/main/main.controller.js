export class MainController {
  constructor ($scope, $timeout, $log) {
    'ngInject';

    let patents = [
        {
            "id": 810775,
            "stripped_patnum": "RE42714",
            "country_code": "US",
            "patent_family": "09/557,113 US6778662B1 (2 US Patents)",
            "patnum": "USRE42714E1",
            "overall_score": 0.7,
            "has_representative_claims": true,
            "topic_cluster": "mobile communication",
            "expiration_date": "2020-04-24",
            "app_filing_date": "2004-10-08",
            "present_in_portfolio": true,
            "is_analyzed": true,
            "priority_date": "1999-04-22",
            "score": 0.8888888,
            "co_pending": 0.6,
            "num_forward_citations": 0.33,
            "num_backward_citations": 0.40
        },
        {
            "id": 4378682,
            "stripped_patnum": "6778662",
            "country_code": "US",
            "patent_family": "09/557,113 US6778662B1 (2 US Patents)",
            "patnum": "US6778662B1",
            "overall_score": 0.45,
            "has_representative_claims": false,
            "topic_cluster": "cellular phones",
            "expiration_date": "2019-04-24",
            "app_filing_date": "2000-04-24",
            "present_in_portfolio": false,
            "is_analyzed": true,
            "priority_date": "1999-04-22",
            "score": 0.4,
            "co_pending": 0.6,
            "num_forward_citations": 0.56,
            "num_backward_citations": 0.44
        }
    ];

    this.availableSizeOptions = [{"value": "co_pending", name: "Co Pending"}, {"value": "num_forward_citations", name: "Num Forward Citations"}, {"value": "num_backward_citations", name: "Num Backward Citations"}];
    this.availableXOptions = [{"value": "priority_date", name: "Priority Date"},  {"value": "expiration_date", name: "Expiration Date"}, {"value": "app_filing_date", name: "App Filing Date"}];
    this.availableYOptions = [{"value": "score", name: "Score"}, {"value": "overall_score", name: "Overall Score"}];
    this.availableColorOptions = [{"value": "cluster", name: "Cluster"}];
    this.selectionValues = {"x": "expiration_date", "y": "score", "size": "co_pending", "color": "cluster"};
    let controllerThis = this;
    updateChartOptions();
    $scope.$watch(() => { 
        return controllerThis.selectionValues 
      }, (newVal, oldVal) => {
      controllerThis.chartLoaded = false;
      updateChartOptions();
    }, true);

    function updateChartOptions() {
      controllerThis.chartLoaded = false;
      let chartData = _.map(patents, (val) => {
        var datObj = new Date(val[controllerThis.selectionValues.x]);
        return {x: Date.UTC(datObj.getFullYear(), datObj.getMonth(), datObj.getDate()),
                        y: val[controllerThis.selectionValues.y],
                        z: val[controllerThis.selectionValues.size]};
      });

      controllerThis.chartOptions = {
        chart: {
            type: 'bubble',
            plotBorderWidth: 1,
            zoomType: 'xy'
        },

        legend: {
            enabled: false
        },

        xAxis: {
            type: 'datetime',
            title: {
                text: controllerThis.selectionValues.x
            }
        },

        yAxis: {
            title: {
                text: controllerThis.selectionValues.y
            },
            maxPadding: 0.2
        },

        plotOptions: {
            series: {
                dataLabels: {
                    enabled: true,
                    format: '{point.value}'
                }
            }
        },

        series: [{
            data: chartData
        }]
      }

      $timeout(() => {controllerThis.chartLoaded = true}, 200);
    }
  }
}
