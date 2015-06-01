angular.module('jingle').factory("Albums", function ($resource) {
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
});
