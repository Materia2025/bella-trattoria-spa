
// script.js
// Aquui esta la app principal de Vue y todo el estado (los datos).

const app = Vue.createApp({

    data() {
        return {
           
            vista_inicio: true,
            vista_menu: false,
            vista_pedido: false,
            vista_reservas: false,
            vista_nosotros: false,

            // Guarda el nombre de la vista activa (sirve para marcar el boton del menú)
            vistaActual: 'inicio',

            // Lista de platos del menu (minimo 3 para el v-for, aqui hay 9)
            platos: [
                { id: 1, nombre: 'Bruschettas', categoria: 'Entradas', precio: 5500, imagen: 'img/bruchetas.jpg', destacado: false,
                  descripcion: 'Pan tostado con tomate, albahaca y aceite de oliva.' },
                { id: 2, nombre: 'Provoleta', categoria: 'Entradas', precio: 6200, imagen: 'img/provoleta.jpg', destacado: false,
                  descripcion: 'Queso provolone gratinado con orégano.' },
                { id: 3, nombre: 'Spaghetti', categoria: 'Pastas', precio: 9800, imagen: 'img/spagueti.jpg', destacado: true,
                  descripcion: 'Spaghetti con nuestra salsa de la casa.' },
                { id: 4, nombre: 'Ñoquis de papa', categoria: 'Pastas', precio: 9200, imagen: 'img/noquis.jpg', destacado: false,
                  descripcion: 'Ñoquis caseros con salsa a elección.' },
                { id: 5, nombre: 'Ravioles de ricota', categoria: 'Pastas', precio: 10500, imagen: 'img/ravioles.jpg', destacado: true,
                  descripcion: 'Ravioles rellenos de ricota y espinaca.' },
                { id: 6, nombre: 'Lasaña boloñesa', categoria: 'Pastas', precio: 11000, imagen: 'img/lasagna.jpg', destacado: false,
                  descripcion: 'Capas de pasta, carne y queso gratinado.' },
                { id: 7, nombre: 'Fettuccine', categoria: 'Pastas', precio: 10200, imagen: 'img/fettuccine.jpg', destacado: false,
                  descripcion: 'Fettuccine con crema y queso parmesano.' },
                { id: 8, nombre: 'Tiramisú', categoria: 'Postres', precio: 5800, imagen: 'img/tiramisu.jpg', destacado: true,
                  descripcion: 'Postre italiano con café, mascarpone y cacao.' },
                { id: 9, nombre: 'Panna cotta', categoria: 'Postres', precio: 5200, imagen: 'img/panacota.jpg', destacado: false,
                  descripcion: 'Crema suave con salsa de frutos rojos.' }
            ],

            // Platos que el cliente va agregando
            pedido: [],

            // Reservas que se van confirmando
            reservas: []
        }
    },

    computed: {
        // Solo los platos marcados como destacados (de la pagina de inicio)
        platosDestacados() {
            return this.platos.filter(plato => plato.destacado)
        },

        // Suma de precio x cantidad de todo el pedido
        totalPedido() {
            let total = 0
            for (const item of this.pedido) {
                total += item.precio * item.cantidad
            }
            return total
        },

        // Cantidad total de platos
        cantidadItems() {
            let cantidad = 0
            for (const item of this.pedido) {
                cantidad += item.cantidad
            }
            return cantidad
        }
    },

    methods: {
        // Pone todas las vistas en false y activa solo la que pedimos
        mostrarVista(vista) {
            this.vista_inicio = false
            this.vista_menu = false
            this.vista_pedido = false
            this.vista_reservas = false
            this.vista_nosotros = false

            this.vistaActual = vista

            if (vista == 'inicio') {
                this.vista_inicio = true
            } else if (vista == 'menu') {
                this.vista_menu = true
            } else if (vista == 'pedido') {
                this.vista_pedido = true
            } else if (vista == 'reservas') {
                this.vista_reservas = true
            } else if (vista == 'nosotros') {
                this.vista_nosotros = true
            }
        },

        // Agrega un plato al pedido. 
        agregarAlPedido(plato) {
            const existente = this.pedido.find(item => item.id === plato.id)
            if (existente) {
                existente.cantidad++
            } else {
                this.pedido.push({
                    id: plato.id,
                    nombre: plato.nombre,
                    precio: plato.precio,
                    cantidad: 1
                })
            }
        },

        // suma o resta la cantidad 
        cambiarCantidad(id, cambio) {
            const item = this.pedido.find(item => item.id === id)
            if (item) {
                item.cantidad += cambio
                if (item.cantidad <= 0) {
                    this.quitarDelPedido(id)
                }
            }
        },

        // saca un plato del pedido
        quitarDelPedido(id) {
            this.pedido = this.pedido.filter(item => item.id !== id)
        },

        // Vacia el pedido cuando el cliente confirma
        confirmarPedido() {
            this.pedido = []
        },

        // Guarda una reserva nueva (el formulario la manda desde el componente)
        confirmarReserva(reserva) {
            this.reservas.push(reserva)
        }
    }
})

 
registrarComponentes(app)

// Renderizamos la aplicación en el div con id="app"
app.mount('#app')