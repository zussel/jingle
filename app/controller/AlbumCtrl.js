angular.module('beets').controller('AlbumCtrl', ['$scope', 'Albums', function($scope, Albums) {
    $scope.filter = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

    $scope.fields = {
        album: 'Album',
        albumartist: 'Künstler'
    };

    $scope.field = 'album';
    $scope.columns = function() {
        return 6;
    };

    $scope.query = function(query) {
        $scope.currentQuery = query;
        Albums.find({ query: query, field: $scope.field }, function (response) {
            $scope.albums = [];
            _.each(response, function (album) {
                album.artpath = album.artpath.replace('/home/sascha', '');
                $scope.albums.push(album);
            });
        }, function () {
            console.log("failure");
        });
    };

    $scope.all = function() {
        $scope.currentQuery = 'all';
        Albums.query(function (response) {
            $scope.albums = [];
            _.each(response, function (album) {
                album.artpath = album.artpath.replace('/home/sascha', '');
                $scope.albums.push(album);
            });
        }, function () {
            console.log("failure");
        });
    };

    $scope.all();
}]);
