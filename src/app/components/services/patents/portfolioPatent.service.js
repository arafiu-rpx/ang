export class PortfolioPatentService {
  constructor ($resource) {
    'ngInject';
    return $resource("http://localhost:8000/analysis/portfolios/:id/patents", {id: "@id"},{
      getPatents: {
        method: "GET"
      }
    });
  }
}
