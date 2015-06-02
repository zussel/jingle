<?php
/**
 * Created by PhpStorm.
 * User: sascha
 * Date: 5/28/15
 * Time: 9:10 AM
 */

require_once dirname(__FILE__) . '/vendor/autoload.php';

require_once dirname(__FILE__) . '/mpd/MPD.php';
use Monolog\Logger;
use Monolog\Handler\StreamHandler;
use Slim\Slim;
use RedBeanPHP\Facade as R;


$mpd = new mpd('localhost', 6600);

R::setup('sqlite:/home/sascha/.config/beets/music.blb');

$app = new Slim();
$app->add(new \Slim\Middleware\ContentTypes());
$app->config('debug', true);
$app->contentType('application/json; charset=utf-8');

// create a log channel
date_default_timezone_set('Europe/Berlin');
$log = new Logger('name');
$log->pushHandler(new StreamHandler(dirname(__FILE__) . '/log/beets.log', Logger::WARNING));

$app->get('/status', function() use ($app, $mpd) {
    $status = $mpd->GetStatus();
    echo json_encode($status);
});

$app->get('/test/query', function() use ($app, $mpd) {
    $result = $mpd->SendCommand('list album');
//    $result = $mpd->Search(MPD_SEARCH_ALBUM, "on");
    echo json_encode($result);
});

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

    $app->get('/:id', function ($id) use ($app) {
        $album = R::load('albums', $id);

        $items = R::find('items', 'album_id=? ORDER BY track asc', [$id]);
        $album->tracks = $items;
        $json = json_encode($album->export());
        echo $json;
    });
});

$app->run();