angular.module('jingle').config(function ($routeProvider) {
    'use strict';
    //var requires = {
    //site: ['SiteService', function (SiteService) {
    //    return SiteService.retrieveSite();
    //}]
    //};

    $routeProvider
        .when('/', {
            templateUrl: 'app/partials/dashboard.html',
            controller: 'DashboardCtrl'
            //redirectTo: '/album/query'
        })
        .when('/album/query/:query?', {
            templateUrl: 'app/partials/albums.html',
            controller: 'AlbumCtrl'
        })
        .when('/album/:id', {
            templateUrl: 'app/partials/album-details.html',
            controller: 'AlbumDetailsCtrl'
        });
});
