<?php

namespace Controllers;

use Model\Hora;
use MVC\Router;
class CitaController{
    public static function index(Router $router){
        if(!isset($_SESSION)){
            session_start();
        }
        // debuguear($_SESSION);
        
        isAuth();

        $horas = Hora::all('ASC');
        // debuguear($horas);

        $router->render('cita/index', [
            'nombre' => $_SESSION['nombre'],
            'id' => $_SESSION['id'],
            'horas' => $horas,

        ]);
    }
}