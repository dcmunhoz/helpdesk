<?php
/**
 * @author Daniel Munhoz <dc.munhoz@hotmail.com>
 * 
 * Arquivo de rotas para as views da administração.
 * 
 */

use \App\View as View;
use \App\User;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Message\ResponseInterface;

$app->get("/admin", function(){

    User::verifyLogin(true);

    $view = new View(true, false, false);
    $view->draw('admin-home');

});

// Pagina login do admin.
$app->get("/admin/signin", function(){

    $view = new View(false, false, false);

    $view->draw("admin-signin");

});

$app->post("/admin/signin", function(ServerRequestInterface $req, ResponseInterface $res){

    $body = $req->getParsedBody();

    $user = new User();
    $result = $user->login($body);    
    
    if($result['error']){
        $newResponse = $res->withStatus(500);
    
        return $newResponse->withJson($result);
    }    
    
    return $res->withJson([]);

});

$app->get("/admin/tickets", function(){

    User::verifyLogin(true);

    $view = new View(true, false, false);

    $view->draw("admin-tickets");

});

$app->get("/admin/ticket/4", function(){

    User::verifyLogin(true);

    $view = new View(true, false, false);

    $view->draw("admin-ticket-details");

});

$app->get("/admin/ticket/new", function(){

    User::verifyLogin(true);

    $view = new View(true, false, false);

    $view->draw("admin-ticket-new");

});

$app->get("/admin/configs", function(){
    
    User::verifyLogin(true);

    $view = new View(true, false, false);

    $view->draw('admin-configs');

});

$app->get("/admin/user/new", function(){

    User::verifyLogin(true);

    $view = new View(true, false, false);

    $view->draw('admin-user-new');


});

$app->get("/admin/company/new", function(){

    User::verifyLogin(true);

    $view = new View(true, false, false);

    $view->draw('admin-company-new');


});

$app->get("/admin/place/new", function(){

    User::verifyLogin(true);

    $view = new View(true, false, false);

    $view->draw('admin-place-new');


});

$app->get("/admin/sector/new", function(){

    User::verifyLogin(true);

    $view = new View(true, false, false);

    $view->draw('admin-sector-new');


});

$app->get("/admin/user/4", function(){

    User::verifyLogin(true);

    $view = new View(true, false, false);

    $view->draw('admin-user-update');

});

$app->get("/admin/company/4", function(){

    User::verifyLogin(true);

    $view = new View(true, false, false);

    $view->draw('admin-company-update');

});

$app->get("/admin/place/4", function(){

    User::verifyLogin(true);

    $view = new View(true, false, false);

    $view->draw('admin-place-update');

});

$app->get("/admin/sector/4", function(){

    User::verifyLogin(true);

    $view = new View(true, false, false);

    $view->draw('admin-sector-update');

});

?>