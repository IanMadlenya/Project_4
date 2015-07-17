'use strict';

angular.module('proj4App')
  .controller('StockShowCtrl', function ($stateParams, yahooFinanceService, twitSentService, stockService, portfolioService) {
    console.log('StockShowCtrl is alive!!' + $stateParams);

  var that = this;

  var id = $stateParams.stockId;

  console.log('StockShowCtrl id is :' + id);

  stockService.findStockById(id).then(function(json) {
    that.stock = json.data;
  });
//Stock Stuffs
   that.buyStock = function(stock) {
    portfolioService.buyStock(stock).then(function(json) {
      // console.log(JSON.stringify(json.data) + 'is returned after buyStock');
       that.myPortfolio = json; //TODO: fix what the server is returning
      // that.getUserPortfolio();
    });
  };
  that.sellStock = function(stock) {
    portfolioService.sellStock(stock).then(function(json) {
      // that.myPortfolio = json.data; //  TODO: fix this

    });
  };

  //Get historical stock data
  that.getHistorical = function(input) {
    yahooFinanceService.historicalSingle(input).success(function(json) {
      that.historicalData = json;
       that.chart();
    });
  }
//twitter
      that.twitSentQuery = function(input) {
      // console.log(that.userInput + 'is userInput');
      if (that.userInput !== '' || that.userInput !== null) { //Defensive programming - guard against empty answers TODO: research undefined
      twitSentService.search(input).success(function(json) {
        // console.log('twitSentQuery from DashboardCtrl');
        // console.log(json);
        that.twitAnalysis = json;

        console.log(that.twitAnalysis  + '     is that.twitAnalysis');
        // that.twitAnaylsisData = json;

      });
      }
    }
    that.open;
    that.close;
    that.low;
    that.volume;
    that.adjClose;
    //chart.js stuff
    that.chart = function() {
      that.open = _.pluck(that.historicalData, 'open');
      that.close = _.pluck(that.historicalData, 'close');
      that.low = _.pluck(that.historicalData, 'low');
      that.volume = _.pluck(that.historicalData, 'volume');
      that.adjClose = _.pluck(that.historicalData, 'adjClose');
      console.log(that.open);


    that.labels = ["2010", "2011", "2012", "2013", "2014", "2015"];
    that.series = ["Open", "Close", "Low", "Volume", "Adjusted Close"];
    that.data = [
      that.open
      // that.close,
      // that.low,
      // that.volume,
      // that.adjClose
  ];
  }
  that.onClick = function (points, evt) {
    console.log(points, evt);
  };

});
