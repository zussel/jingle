angular.module('jingle').controller('DashboardCtrl', function($scope, $http) {
   $http.get('api/test/query').success(function(data) {
       $scope.status = data;
   });
});
