<?php

namespace Model;

class Usuario extends ActiveRecord{
    protected static $tabla = 'usuarios';
    protected static $columnasDB = [
        'id',
        'nombre',
        'apellido',
        'telefono',
        'email',
        'password',
        'admin',
        'confirmado',
        'token',
    ];

       public  $id;
       public  $nombre;
       public  $apellido;
       public  $telefono;
       public  $email;
       public  $password;
       public  $admin;
       public  $confirmado;
       public  $token;

       public function __construct($args = []){
        $this->id = $args['id'] ?? null;
        $this->nombre = $args['nombre'] ?? '';
        $this->apellido = $args['apellido'] ?? '';
        $this->telefono = $args['telefono'] ?? '';
        $this->email = $args['email'] ?? '';
        $this->password = $args['password'] ?? '';
        $this->admin = $args['admin'] ?? '0';
        $this->confirmado = $args['confirmado'] ?? '0';
        $this->token = $args['token'] ?? '';
       }

       // Mensajes de validación para la creacion de una cuenta
       public function validarNuevaCuenta(){
            if(!$this->nombre){
                self::$alertas['error'][] = 'El Nombre es Obligatorio';
            }

            if(!$this->apellido){
                self::$alertas['error'][] = 'El Apellido es Obligatorio';
            }

            if(!$this->telefono){
                self::$alertas['error'][] = 'El Teléfono es Obligatorio';
            }

            if(!$this->email){
                self::$alertas['error'][] = 'El E-mail es Obligatorio';
            }

            if(!$this->password){
                self::$alertas['error'][] = 'El Passsword es Obligatorio';
            }
            if(strlen($this->password) < 6){
                self::$alertas['error'][] = 'El Passsword Debe Tener al Menos 6 Caracteres ';
            }

            return self::$alertas;
       }

       public function validarLogin(){
        if(!$this->email){
            self::$alertas['error'][] = 'El Email es Obligatorio';
        }
        if(!$this->password){
            self::$alertas['error'][] = 'El Password es Obligatorio';
        }

        return self::$alertas;
       }
        
       public function validarEmail(){
        if(!$this->email){
            self::$alertas['error'][] = 'El Email es Obligatorio';
        }

        return self::$alertas;
       }

       public function validarPassword(){
        if(!$this->password){
            self::$alertas['error'][] = 'El Passsword es Obligatorio';
        }
        if(strlen($this->password) < 6){
            self::$alertas['error'][] = 'El Passsword Debe Tener al Menos 6 Caracteres ';
        }
        return self::$alertas;
       }

       // Revisa si el usuario ya existe
       public function existeUsuario(){
            $query = " SELECT * FROM " . self::$tabla . " WHERE email = '" . $this->email . "' LIMIT 1";
            // debuguear($query);
            $resultado = self::$db->query($query);
            // debuguear($resultado);
            if($resultado->num_rows){
                self::$alertas['error'][] = 'El Usuario Ya Esta Registrado';
            }
            return $resultado;
       }

       public function hashPassword(){
            $this->password = password_hash($this->password, PASSWORD_BCRYPT);
       }

       public function crearToken() {
        $this->token = uniqid();
       }

       public function confirmarCliente(){
        $this->confirmado = '1';
       }

       public function comprobarPasswordAndVerificado($password){
            $resultado = password_verify($password, $this->password);

            if(!$resultado || !$this->confirmado){
                self::$alertas['error'][] = 'El Password no es correcto o tu cuenta no ha sido confirmada';
            }else{
                return true;
            }
       }
}