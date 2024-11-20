<?php

namespace Model;

class AdminCita extends ActiveRecord {
    // Base de datos
    protected static $tabla = 'citasservicios';
    protected static $columnasDB = ['id', 'hora_id', 'hora', 'cliente', 'email', 'telefono', 'servicio', 'precio'];
    
    public $id;
    public $hora_id;
    public $hora;
    public $cliente;
    public $email;
    public $telefono;
    public $servicio;
    public $precio;

    public function __construct($args = [])
    {
        $this->id = $args['id'] ?? null;
        $this->hora_id = $args['hora_id'] ?? '';
        $this->hora = $args['hora'] ?? '';
        $this->cliente = $args['cliente'] ?? '';
        $this->email = $args['email'] ?? '';
        $this->telefono = $args['telefono'] ?? '';
        $this->servicio = $args['servicio'] ?? '';
        $this->precio = $args['precio'] ?? '';
    }

}
