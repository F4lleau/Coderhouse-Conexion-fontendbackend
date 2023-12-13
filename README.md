# Conexion-fontendbackend
3ra preentrega
- El chat no va (Ya no se actualizara en el curso y opcionalmente se puede eliminar del proyecto).

- Delimitar acceso a endpoints:

Solo el admin puede crear, actualizar y eliminar productos
Solo el user puede agregar productos al carrito


- Modelo Ticket (Funcionara a forma de comprobante de pago, no factura). Con los campos:

Id (Autogenerado por mongo)
code (String autogenerado y unique. Se sugiere usar el modulo crypto, metodo randomUUID())
purchase_datetime (Guardar fecha y hora en la que se formaliza la compra (Es un created_at))
amount: Number (Suma del total de la compra)
purchaser: String (Email del usuario que compra)


- En el router de carts, agregar ruta /:cid/purchase para finalizar el proceso de compra

- A tener en cuenta para la funcionalidad purchase:

Si el producto tiene stock suficiente para la cantidad indicada, restarlo del stock del producto en la BD y continuar
Si el producto no tiene stock, sacarlo del carrito y continuar
Al final, usar el servicio de Tickets para generar un ticket con los datos de la compra


**DESAFÍO CLASE 20**

Desafío de Documentar API:

Realizar la configuración necesaria para tener documentado el proyecto final a partir de Swagger.


A tener en cuenta (Endpoints a documentar):

carrito -> Documentar 1 endpoint. Especificar el id de carrito y el id de producto (Donde se encuentra, el nombre y el tipo).
users -> Se puede usar el ejemplo de clase.
sesiones -> No se documenta
productos -> Documentar todos los endpoint. Similar al ejemplo de clase (Users)
