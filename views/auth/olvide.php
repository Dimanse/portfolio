<h1 class="nombre-pagina">Olvidaste tu password</h1>
<p class="descripcion-pagina">Reestablece tu password escribiendo tu e-mail a continuación</p>

<?php
    @include_once __DIR__ . "/../templates/alertas.php";
?>

<form action="/olvide" method="POST" class="formulario">
    <div class="campo">
        <label for="emil">Email</label>
        <input
            type="email"
            id="email"
            placeholder="Tu email"
            name="email"
        />
    </div>
    
    <input type="submit" class="boton" value="Cambiar Password">

</form>

<div class="acciones">
    <a href="/crear-cuenta">¿Aún no tienes una cuenta? Crea una</a>
    <a href="/">¿Ya tienes una cuenta? Inicia Sesión</a>
</div>