angular.module('beets').factory("Albums", ['$resource', function ($resource) {
    return $resource("api/albums/:id", { id: "@id" }, {
        "update": {
            method: "PUT"
        },
        "find": {
            method: "GET",
            url: 'api/albums/query',
            isArray: true
        }
    });
}]);
