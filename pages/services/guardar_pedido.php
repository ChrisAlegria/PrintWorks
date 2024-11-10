<?php
// Establecer la cabecera para que el servidor devuelva un JSON
header('Content-Type: application/json');

// Obtener los datos enviados desde el formulario
$data = json_decode(file_get_contents("php://input"), true);

// Comprobar si los datos llegaron correctamente
if ($data) {
    // Ruta del archivo donde guardaremos los registros
    $file = __DIR__ . '/pedidos.json';  // Usamos __DIR__ para obtener la ruta absoluta en el directorio de este archivo PHP

    // Si el archivo ya existe, leer su contenido y agregar los nuevos registros
    if (file_exists($file)) {
        $pedidos = json_decode(file_get_contents($file), true); // Leer el archivo JSON
    } else {
        $pedidos = []; // Si no existe el archivo, creamos un array vacío
    }

    // Agregar el nuevo pedido al array
    $pedidos[] = $data;

    // Guardar el array actualizado en el archivo JSON
    if (file_put_contents($file, json_encode($pedidos, JSON_PRETTY_PRINT))) {
        // Si el archivo se guardó correctamente, devolver una respuesta JSON
        echo json_encode(['status' => 'success', 'message' => 'Pedido guardado con éxito']);
    } else {
        // Si hubo un error al guardar el archivo
        echo json_encode(['status' => 'error', 'message' => 'Error al guardar el pedido']);
    }
} else {
    // Si los datos no llegaron correctamente
    echo json_encode(['status' => 'error', 'message' => 'Datos inválidos']);
}
?>
