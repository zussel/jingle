<?php
/**
 * Created by PhpStorm.
 * User: sascha
 * Date: 5/28/15
 * Time: 9:10 AM
 */

require_once dirname(__FILE__) . '/vendor/autoload.php';

use Monolog\Logger;
use Monolog\Handler\StreamHandler;
use Slim\Slim;
use RedBeanPHP\Facade as R;

R::setup('sqlite:/home/sascha/.config/beets/music.blb');

$app = new Slim();
$app->add(new \Slim\Middleware\ContentTypes());
$app->config('debug', true);
$app->contentType('application/json; charset=utf-8');

// create a log channel
date_default_timezone_set('Europe/Berlin');
$log = new Logger('name');
$log->pushHandler(new StreamHandler(dirname(__FILE__) . '/log/beets.log', Logger::WARNING));

$app->group('/albums', function () use ($app) {

    $app->get('/', function () use ($app) {
        $albums = R::findAll('albums');
        echo json_encode(R::exportAll($albums));
    });

    $app->get('/query', function() use ($app) {
        $field = $paramValue = $app->request()->get('field');
        $query = $paramValue = $app->request()->get('query');
        $albums = R::find('albums', $field.' LIKE ?', [ $query. '%' ]);
        echo json_encode(R::exportAll($albums));
    });
});

$app->run();