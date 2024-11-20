<?php
    @include_once __DIR__ . '/../templates/barra.php';
?>
<h1 class="nombre-pagina">Crea Nueva Cita</h1>
<p class="descripcion-pagina">Elige tus servicios y coloca tus datos</p>


<div id="app">
    <nav class="tabs">
        <button class="actual" type="button" data-paso="1">Servicios</button>
        <button type="button" data-paso="2">Información Cita</button>
        <button type="button" data-paso="3">Resumen</button>
    </nav>

    <div id="paso-1" class="seccion">
        <h2>Servicios</h2>
        <p class="text-center">Elige tus servicios a continuación</p>
        <div id="servicios" class="listado-servicios"></div>
    </div>
    <div id="paso-2" class="seccion">
        <h2>Tus Datos y Cita</h2>
        <p class="text-center">Coloca tus datos y fecha de tu cita</p>
        <form class="formulario">
            <div class="campo">
                <label for="nombre">Nombre</label>
                <input 
                    type="text" 
                    id="nombre"
                    placeholder="Tu nombre"
                    value="<?php echo $nombre; ?>"
                    disabled
                    >
                
            </div>

            <div class="campo">
                <label for="fecha">Fecha</label>
                <input 
                    type="date" 
                    id="fecha"
                    min="<?php echo date('Y-m-d', strtotime('+1 day')); ?>"
                    name="fecha"
                   
                    
                >
            </div>

            <!-- <div class="campo">
                <label for="hora">Hora</label>
                <input 
                    type="time" 
                    id="hora"
                >

            </div> -->
            <input type="hidden" id="fecha_value" value="" />
            <div class="campo-horas">
                <label for="hora">Seleccionar hora</label>
                <ul class="horas" id="horas">
                    <?php foreach($horas as $hora) { ?>
                        <li class="hora hora--deshabilitada" data-hora-id="<?php echo $hora->id; ?>" value="<?php echo $hora->hora ?>"> <?php echo $hora->hora ?> </li>
                    <?php } ?>
                </ul>

                <input type="hidden" name="hora_id" value="" />
            </div>

            <input 
                type="hidden"
                id="id"
                value="<?php echo $id; ?>"
            />
        </form>
    </div>
    <div id="paso-3" class="seccion contenido-resumen">
        <h2>Resumen</h2>
        <p class="text-center">Verifica que la información sea correcta</p>
    </div>

    <div class="paginacion">
        <button id="anterior" type="button" class="boton"> &laquo; Anterior</button>
        <button id="siguiente" type="button" class="boton">  Siguiente &raquo;</button>
    </div>
    
</div>

<?php
    $script = "
        <script src='https://cdn.jsdelivr.net/npm/sweetalert2@11'></script>
        <script src='build/js/app.js'></script>
    ";
?>