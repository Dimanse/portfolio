<?php
    @include_once __DIR__ . '/../templates/barra.php';
?>

<h1 class="nombre-pagina">Actualizar Servicio</h1>
<p class="descripcion-pagina">Modifica los campos para actualizar el servicio</p>

<?php
    @include_once __DIR__ . '/../templates/alertas.php';
?>

<form method="POST" class="formulario">

    <?php
        @include_once __DIR__ . '/formulario.php';
    ?>
    <input type="submit" value="Guardar Cambios" class="boton">
</form>