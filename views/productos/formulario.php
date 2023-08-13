<fieldset class="form" >
    <legend>Producto</legend>

    <label for="descripcion">Descripcion:</label>
    <input type="text" id="descripcion" name="productos[descripcion]" placeholder="Nombre del producto" value="<?php echo s(trim( $producto->descripcion ) ); ?>">

    <p></p>
    
    <label for="categoria">Categoria:</label>
    <select name="productos[categoria_id]">
        <option value="" disabled selected>-- Seleccione --</option>
        <?php foreach ($categorias as $categoria) { ?>
            <option <?php echo $producto->categoria_id === $categoria->id ? 'selected' : ''; ?> value="<?php echo s($categoria->id); ?>"> <?php echo s($categoria->nombre); ?> </option>
        <?php } ?>
    </select>
    
    <p></p>
    
    <label for="imagen">Imagen:</label>
    <input type="file" id="imagen" accept="image/jpeg, image/png" name="productos[imagen_producto]">

    <?php if($producto->imagen_producto) { ?>
        <img src="/imagenes/<?php echo $producto->imagen_producto ?>" class="imagen-small">
    <?php } ?>

    <p></p>


</fieldset>