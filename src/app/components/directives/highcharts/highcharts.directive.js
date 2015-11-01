export function HighchartsDirective($window){
  'ngInject';

  let directive = {
    link: (scope, el, attrs) => {
      var options = scope.$eval(attrs.highcharts);
      options.chart.renderTo = el[0];
      new $window.Highcharts.Chart(options);
    }
  };

  return directive;
}
