angular.module('jingle').controller('AlbumDetailsCtrl', function($scope, $routeParams, Albums) {
    Albums.get({id:$routeParams.id}, function(response) {
        $scope.album = response;
    }, function() {
        console.log("failure");
    });
});
