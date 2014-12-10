(function (ng) {
  ng.module('amnesiaDemo', ['str.amnesia-cache'])
    .controller('FooController', ctrl)
    .run(run);

  function ctrl($scope, $http, AmnesiaCache) {
    $scope.data = {};

    this.get = function (url) {
      $http.get('data/' + url, {
        cache : true
      })
      .success(function (data, status, headers, config) {
        $scope.data = data;
      });
    };
  }

  function run($http, AmnesiaCache, $rootScope) {
    $http.defaults.cache = new AmnesiaCache( 5000 );

    var tos = [];

    $rootScope.timeouts = tos;

    $rootScope.$on('amnesia:add', function(ev, id) {
      if (!~tos.indexOf(id)) {
        tos.push(id);
      }
    });

    $rootScope.$on('amnesia:remove', function(ev, id) {
      $rootScope.$apply( function () {
        var index = tos.indexOf(id);

        if (~index) {
          tos.splice(index,1);
        }
      });
    });
  }
})(window.angular);
