angular.module('beets').filter('chunk', function() {
    return _.memoize(_.chunk);
});