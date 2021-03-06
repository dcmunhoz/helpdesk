<?php
/**
 * @author Daniel Munhoz <dc.munhoz@hotmail.com>
 * 
 * Arquivo de rotas para as views da administração.
 * 
 */

use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Message\ResponseInterface;
use Source\App\Admin;
use Source\Core\User;

/**
 * ADMIN
 */
$app->group('/admin', function(Slim\App $app){

    $app->get("", Admin::class . ":home");
    $app->get("/signin", Admin::class . ":signin");
    $app->post("/signin", Admin::class . ":signinPost");
    $app->get("/tickets", Admin::class . ":tickets");
    $app->get("/ticket/new", Admin::class . ":ticketNew");
    $app->get("/ticket/{ticketId}", Admin::class . ":ticketDetails");
    $app->get("/configs", Admin::class . ":configs");
    $app->get("/user/new", Admin::class . ":userNew");
    $app->post("/user/new", Admin::class . ":postUserNew");
    $app->get("/company/new", Admin::class . ":companyNew");
    $app->post("/company/new", Admin::class . ":postCompanyNew");
    $app->get("/place/new", Admin::class . ":placeNew");
    $app->get("/sector/new", Admin::class . ":sectorNew");
    $app->get("/priority/new", Admin::class . ":priorityNew");
    $app->get("/user/{idUser}", Admin::class . ":userUpdate");
    $app->get("/user/{idUser}/find", Admin::class . ":userFind");
    $app->post("/user/{idUser}", Admin::class . ":postUserUpdate");
    $app->get("/company/{idCompany}", Admin::class . ":companyUpdate");
    $app->get("/place/{idPlace}", Admin::class . ":placeUpdate");
    $app->get("/sector/{idSector}", Admin::class . ":sectorUpdate");
    $app->get("/priority/{idPriority}", Admin::class . ":priorityUpdate");
    $app->get("/user/{idUser}/password-reset", Admin::class . ":userResetPassword");

})->add(function($req, $res, $next){

    
    $path = $req->getUri()->getPath();
    $excluded = ['/admin/signin', '/admin/signup'];
    
    if( !in_array($path, $excluded) ){

        User::verifyLogin(true);

    }    
    
    $res = $next($req, $res);
    return $res;


});

?>