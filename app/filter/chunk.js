angular.module('jingle').filter('chunk', function() {
    return _.memoize(_.chunk);
});