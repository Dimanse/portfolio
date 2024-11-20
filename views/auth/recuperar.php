<h1 class="nombre-pagina">Recupera Tu Password</h1>
<p class="descripcion-pagina">Coloca Tu Nuevo Password a contiunuación</p>

<?php
    @include_once __DIR__ . "/../templates/alertas.php";
?>

<?php
    if($error) return
?>
<form method="POST" class="formulario">
    <div class="campo">
        <label for="password">Password</label>
        <input
            type="password"
            id="password"
            placeholder="Tu Nuevo Password"
            name="password"
        />
    </div>
    
    <input type="submit" class="boton" value="Guardar Nuevo Password">

</form>

<div class="acciones">
    <a href="/">¿Ya tienes una cuenta? Inicia Sesión</a>
    <a href="/crear-cuenta">¿Aún no tienes una cuenta? Crea una</a>
</div>