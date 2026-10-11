
// componentes.js
// Aqui estan todos los componentes de la app.
// Se registran dentro de una funcion que se llama desde script.js.

function registrarComponentes(app) {

    // -----------HEADER (menu de navegacion)---------------------------------------
   
    app.component('mi-header', {
        props: ['vistaActual', 'cantidadPedido'],
        emits: ['cambiar-vista'],
        data() {
            return {
                // Botones del menu (Reservas va aparte, como boton destacado)
                opciones: [
                    { vista: 'inicio', texto: 'Inicio' },
                    { vista: 'menu', texto: 'Menú' },
                    { vista: 'pedido', texto: 'Mi pedido', icono: 'bi-basket' },
                    { vista: 'nosotros', texto: 'Nosotros' }
                ],
                // Pasa a true cuando se baja la pagina
                bajo: false
            }
        },
        computed: {
            // Clases del menu segun la vista y el scroll
            clasesMenu() {
                if (this.vistaActual !== 'inicio') {
                    return 'sticky-top bg-dark shadow'
                }
                if (this.bajo) {
                    return 'fixed-top bg-dark shadow'
                }
                return 'fixed-top nav-transparente'
            }
        },
        methods: {
            // Revisa si se bajo la pagina
            revisarScroll() {
                this.bajo = window.scrollY > 50
            }
        },
        mounted() {
            window.addEventListener('scroll', this.revisarScroll)
        },

        template: `
        <!-- En Inicio el menú flota sobre la foto y se oscurece al bajar. En las otras vistas es una barra oscura -->

        <nav class="navbar navbar-expand-lg z-3" data-bs-theme="dark" :class="clasesMenu">
            <div class="container">

                <a class="navbar-brand d-flex flex-column lh-1 py-0 ps-3 border-start border-3 border-dorado" href="#"
                   @click.prevent="$emit('cambiar-vista', 'inicio')">
                    <span class="fs-4 fw-bold fuente-titulo">Bella Trattoria</span>
                    <span class="small text-uppercase text-dorado-claro espaciado">Restaurante</span>
                </a>

                <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#menuPrincipal" aria-controls="menuPrincipal"
                        aria-expanded="false" aria-label="Mostrar menú">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse justify-content-end" id="menuPrincipal">
                    <ul class="navbar-nav align-items-lg-center gap-lg-2">
                        <li class="nav-item" v-for="op in opciones" :key="op.vista">
                            <button type="button" class="nav-link text-uppercase small fw-medium espaciado"
                                    :class="vistaActual === op.vista ? 'active fw-bold border-bottom border-2 border-dorado' : ''"
                                    @click="$emit('cambiar-vista', op.vista)">
                                <i v-if="op.icono" class="bi me-1" :class="op.icono"></i>{{ op.texto }}
                                <span v-if="op.vista === 'pedido' && cantidadPedido > 0"
                                      class="badge rounded-pill text-bg-light ms-1">{{ cantidadPedido }}</span>
                            </button>
                        </li>

                        <!-- Boton destacado para reservar -->
                        <li class="nav-item ms-lg-3 mt-2 mt-lg-0">
                            <button type="button" class="btn btn-dorado text-uppercase small fw-semibold espaciado"
                                    :class="{ active: vistaActual === 'reservas' }"
                                    @click="$emit('cambiar-vista', 'reservas')">
                                Reservar
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>`
    })
    // ---------------------------TARJETA DE PLATO------------------------------------ 
   
    app.component('plato-card', {
        props: ['plato'],
        emits: ['agregar'],
        template: `
        <div class="card h-100 shadow-sm border-0 overflow-hidden">
            <div class="ratio ratio-4x3">
                <img :src="plato.imagen" :alt="plato.nombre" class="object-fit-cover">
            </div>
            <div class="card-body d-flex flex-column text center">
                <span class="badge rounded-pill text-bg-danger align-self-center mb-2">{{ plato.categoria }}</span>
                <h5 class="card-title fw-bold fuente-titulo">{{ plato.nombre }}</h5>
                <p class="card-text text-secondary">{{ plato.descripcion }}</p>
                <div class="mt-auto d-flex justify-content-center align-items-center gap-3">
                    <span class="fw-bold fs-5">$ {{ plato.precio.toLocaleString('es-AR') }}</span>
                    <button type="button" class="btn btn-danger" @click="$emit('agregar', plato)">
                        <i class="bi bi-plus-lg me-1"></i>Agregar
                    </button>
                </div>
            </div>
        </div>`
    })

    // ---------------------------VISTA INICIO -------------------------------------------- 


    app.component('vista-inicio', {
        props: ['destacados'],
        emits: ['agregar', 'ir-a'],
        template: `
        <div>
            <!-- Portada: foto de fondo, degradado oscuro -->
            <section class="position-relative text-white min-vh-100 d-flex align-items-center">
                <img src="img/portada-bella.jpg" alt="Interior del restaurante Bella Trattoria"
                     class="position-absolute top-0 start-0 w-100 h-100 object-fit-cover">
                <div class="position-absolute top-0 start-0 w-100 h-100 degradado-hero"></div>

                <div class="container position-relative py-5">
                    <div class="row justify-content-center">
                        <div class="col-12 col-lg-8 text-center">
                            <h1 class="display-2 fw-bold fuente-titulo mb-2">Bella Trattoria</h1>
                            <p class="text-uppercase text-dorado-claro fw-semibold fs-5 espaciado mb-3">Cocina italiana</p>
                            <p class="lead mb-4">Pastas caseras en un ambiente cálido, pensado para compartir.</p>
                            <div class="d-flex flex-wrap justify-content-center gap-2">
                                <button type="button" class="btn btn-dorado btn-lg text-uppercase fw-semibold px-4"
                                        @click="$emit('ir-a', 'reservas')">Reservar mesa</button>
                                <button type="button" class="btn btn-outline-light btn-lg text-uppercase fw-semibold px-4"
                                        @click="$emit('ir-a', 'menu')">Ver el menú</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div class="container py-5">
                <div class="text-center mb-4">
                    <span class="text-uppercase text-muted fw-bold small">Los favoritos</span>
                    <h2 class="fw-bold fuente-titulo">Platos destacados</h2>
                </div>
                <div class="row g-4">
                    <div class="col-12 col-md-6 col-lg-4" v-for="plato in destacados" :key="plato.id">
                        <plato-card :plato="plato" @agregar="$emit('agregar', $event)"></plato-card>
                    </div>
                </div>
            </section>
        </div>`
    })

    //  VISTA MENU (con buscador y filtro por categoria)-------------------------------------

    app.component('vista-menu', {
        props: ['platos'],
        emits: ['agregar'],
        data() {
            return {
                // Lo que escribe el usuario en el buscador
                busqueda: '',
                categoriaElegida: 'Todas',
                categorias: ['Todas', 'Entradas', 'Pastas', 'Postres']
            }
        },
        computed: {
            // Lista de platos segun el buscador y la categoria
            platosFiltrados() {
                const texto = this.busqueda.toLowerCase()
                return this.platos.filter(plato => {
                    const coincideTexto = plato.nombre.toLowerCase().includes(texto)
                    const coincideCategoria = this.categoriaElegida === 'Todas' || plato.categoria === this.categoriaElegida
                    return coincideTexto && coincideCategoria
                })
            }
        },
        template: `
        <div class="container pb-5 pt-nav">
            <div class="text-center mb-4">
                <span class="text-uppercase text-muted fw-bold small">Carta</span>
                <h2 class="fw-bold fuente-titulo">Nuestro menú</h2>
            </div>

            <div class="row g-3 mb-4 align-items-center">
                <div class="col-12 col-md-6">
                    <label for="busqueda" class="visually-hidden">Buscar plato</label>
                    <input type="text" id="busqueda" name="busqueda" class="form-control"
                           placeholder="Buscar un plato..." v-model="busqueda">
                    <small class="text-muted" v-if="busqueda !== ''">Buscando: {{ busqueda }}</small>
                </div>
                <div class="col-12 col-md-6 text-md-end">
                    <button type="button" class="btn me-2 mb-1" v-for="cat in categorias" :key="cat"
                            :class="categoriaElegida === cat ? 'btn-danger' : 'btn-outline-danger'"
                            @click="categoriaElegida = cat">{{ cat }}</button>
                </div>
            </div>

            <div class="row g-4" v-if="platosFiltrados.length > 0">
                <div class="col-12 col-md-6 col-lg-4" v-for="plato in platosFiltrados" :key="plato.id">
                    <plato-card :plato="plato" @agregar="$emit('agregar', $event)"></plato-card>
                </div>
            </div>
            <div class="alert alert-warning text-center" v-else>
                No encontramos platos con esa búsqueda.
            </div>
        </div>`
    })

    // ---------------------- VISTA PEDIDO----------------------------------
    // Recibe: pedido, total
    // Avisa: cambiar-cantidad, quitar, ir-a
    
    app.component('vista-pedido', {
        props: ['pedido', 'total'],
        emits: ['cambiar-cantidad', 'quitar', 'confirmar', 'ir-a'],
        data() {
            return {
                // controla si se muestra el aviso de exito
                pedidoConfirmado: false
            }
        },
        watch: {
            // si el cliente vuelve a agregar platos, se oculta el aviso
            total(nuevo) {
                if (nuevo > 0) {
                    this.pedidoConfirmado = false
                }
            }
        },

        methods: {
            confirmar() {
                this.$emit('confirmar')
                this.pedidoConfirmado = true
            }
        },

        template: `

        <div class="container pb-5 pt-nav">
            <h2 class="fw-bold fuente-titulo mb-4">Mi pedido</h2>

            <!-- Aviso de exito -->
            <div v-if="pedidoConfirmado" class="alert alert-success alert-dismissible fade show"        role="alert">
                <strong>¡Pedido confirmado!</strong> Gracias por elegir Bella Trattoria, ya lo estamos preparando.
                <div class="mt-3">
                    <button type="button" class="btn btn-dorado btn-sm" @click="$emit('ir-a', 'menu')">Hacer otro pedido</button>
                </div>
                <button type="button" class="btn-close" aria-label="Cerrar" @click="pedidoConfirmado = false"></button>
            </div>

            <!-- Si el pedido esta vacio -->
            <div v-if="pedido.length === 0 && !pedidoConfirmado" class="text-center py-5">
                <i class="bi bi-basket display-1 text-muted"></i>
                <p class="lead mt-3">Todavía no agregaste ningún plato.</p>
                <button type="button" class="btn btn-dorado" @click="$emit('ir-a', 'menu')">Ir al menú</button>
            </div>

            <!-- Si hay platos -->
            <div v-else-if="pedido.length > 0">
                <ul class="list-group shadow-sm mb-3">
                    <li class="list-group-item d-flex flex-wrap align-items-center justify-content-between gap-2"
                        v-for="item in pedido" :key="item.id">
                        <div>
                            <strong>{{ item.nombre }}</strong><br>
                            <small class="text-muted">$ {{ item.precio.toLocaleString('es-AR') }} c/u</small>
                        </div>
                        <div class="d-flex align-items-center gap-2">
                            <button type="button" class="btn btn-outline-secondary btn-sm" aria-label="Quitar uno"
                                    @click="$emit('cambiar-cantidad', item.id, -1)">
                                <i class="bi bi-dash-lg"></i>
                            </button>
                            <span class="fw-bold px-2">{{ item.cantidad }}</span>
                            <button type="button" class="btn btn-outline-secondary btn-sm" aria-label="Agregar uno"
                                    @click="$emit('cambiar-cantidad', item.id, 1)">
                                <i class="bi bi-plus-lg"></i>
                            </button>
                            <span class="ms-3 fw-bold">$ {{ (item.precio * item.cantidad).toLocaleString('es-AR') }}</span>
                            <button type="button" class="btn btn-outline-danger btn-sm ms-2" aria-label="Quitar del pedido"
                                    @click="$emit('quitar', item.id)">
                                <i class="bi bi-trash"></i>
                            </button>
                        </div>
                    </li>
                </ul>
                                <div class="d-flex justify-content-between align-items-center">
                    <span class="fs-4">Total</span>
                    <span class="fs-3 fw-bold text-body">$ {{ total.toLocaleString('es-AR') }}</span>
                </div>

                <div class="d-grid d-md-flex justify-content-md-end mt-4">
                    <button type="button" class="btn btn-dorado btn-lg" @click="confirmar">
                        <i class="bi bi-check-lg me-1"></i>Confirmar pedido
                    </button>
                </div>
            </div>
        </div>`
    })


    // --------------------VISTA RESERVAS (formulario con v-model)---------------------------------
   
    app.component('vista-reservas', {
        props: ['reservas'],
        emits: ['reservar'],
        data() {
            return {
                // Borrador del formulario (lo que se va escribiendo)
                reserva: { nombre: '', fecha: '', personas: 2, turno: 'almuerzo', hora: '', comentario: '' },
                mostrarError: false,
                mostrarExito: false,

                // Horarios disponibles segun el turno
                horarios: {
                    almuerzo: ['12:00', '12:30', '13:00', '13:30', '14:00', '14:30'],
                    cena: ['20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00']
                }
            }
        },
        computed: {
            // Devuelve los horarios del turno elegido
            horariosDisponibles() {
                return this.horarios[this.reserva.turno]
            }
        },
        watch: {
            // Si cambia el turno, se borra el horario que estaba elegido
            'reserva.turno'() {
                this.reserva.hora = ''
            }
        },

    
        methods: {
            enviar() {
            // Si faltan datos, mostramos el error y salimos
                if (this.reserva.nombre === '' || this.reserva.fecha === '' || this.reserva.hora === '') {
                    this.mostrarError = true
                    this.mostrarExito = false
                    return
                }
                // Mandamos una copia de la reserva a la raiz
                this.$emit('reservar', { ...this.reserva })

                // Limpiamos el formulario
                this.reserva = { nombre: '', fecha: '', personas: 2, turno: 'almuerzo', hora: '', comentario: '' }
                this.mostrarError = false
                this.mostrarExito = true
                setTimeout(() => { this.mostrarExito = false }, 4000)
            }
        },

        template: `
        <div class="container pb-5 pt-nav">
            <div class="text-center mb-4">
                <span class="text-uppercase text-muted fw-bold small">Mesa para vos</span>
                <h2 class="fw-bold fuente-titulo">Reservas</h2>
            </div>

            <div class="row g-4">
                <div class="col-12 col-lg-5">
                    <img src="img/mesa-copas.jpg" alt="Mesa servida con copas" class="w-100 h-100 object-fit-cover rounded shadow">
                </div>

                <div class="col-12 col-lg-7">
                    <form class="p-4 bg-white rounded-3 shadow-sm border" novalidate @submit.prevent="enviar">
                        <div class="mb-3">
                            <label for="nombre-reserva" class="form-label fw-medium">Nombre</label>
                            <input type="text" class="form-control" id="nombre-reserva" name="nombre"
                                   placeholder="Tu nombre" required v-model="reserva.nombre">
                        </div>
                        <div class="row">
                            <div class="col-12 col-md-6 mb-3">
                                <label for="fecha-reserva" class="form-label fw-medium">Fecha</label>
                                <input type="date" class="form-control" id="fecha-reserva" name="fecha"
                                       required v-model="reserva.fecha">
                            </div>
                            <div class="col-12 col-md-6 mb-3">
                                <label for="personas-reserva" class="form-label fw-medium">Personas</label>
                                <input type="number" min="1" max="12" class="form-control" id="personas-reserva"
                                       name="personas" v-model.number="reserva.personas">
                            </div>
                            <div class="row">
                            <div class="col-12 col-md-6 mb-3">
                                <span class="form-label fw-medium d-block">Turno</span>
                                <div class="btn-group w-100" role="group" aria-label="Turno">
                                    <input type="radio" class="btn-check" name="turno" id="turno-almuerzo"
                                        value="almuerzo" v-model="reserva.turno">
                                    <label class="btn btn-outline-dorado" for="turno-almuerzo">Almuerzo</label>

                                    <input type="radio" class="btn-check" name="turno" id="turno-cena"
                                        value="cena" v-model="reserva.turno">
                                    <label class="btn btn-outline-dorado" for="turno-cena">Cena</label>
                                </div>
                            </div>
                            <div class="col-12 col-md-6 mb-3">
                                <label for="hora-reserva" class="form-label fw-medium">Horario</label>
                                <select class="form-select" id="hora-reserva" name="hora" required v-model="reserva.hora">
                                    <option value="" disabled>Elegí un horario</option>
                                    <option v-for="h in horariosDisponibles" :key="h" :value="h">{{ h }} hs</option>
                                </select>
                            </div>
                        </div>
                               
                        <div class="mb-3">
                            <label for="comentario-reserva" class="form-label fw-medium">Comentario</label>
                            <textarea class="form-control" id="comentario-reserva" name="comentario" rows="3"
                                      placeholder=" Es un cumpleaños, Aniversario, etc." v-model="reserva.comentario"></textarea>
                            
                        </div>

                        <button type="submit" class="btn btn-dorado w-100 py-2">Confirmar reserva</button>
                    </form>
                </div>
            </div>

            <!-- Resumen y avisos: van debajo para que el formulario y la foto no cambien de tamaño -->

            <div class="mt-3">
                <p class="small text-muted mb-2" v-if="reserva.comentario !== ''">
                    Estás escribiendo: {{ reserva.comentario }}
                </p>

                <div class="alert alert-light border" v-if="reserva.nombre !== ''">
                    Reserva a nombre de <strong>{{ reserva.nombre }}</strong>
                    para {{ reserva.personas }} persona(s).
                </div>

                <div class="alert alert-danger" v-if="mostrarError">
                    <div class="alert alert-danger" v-if="mostrarError">
                        Completá tu nombre, la fecha y el horario para reservar.
                    </div>
                </div>
                <div class="alert alert-success" v-if="mostrarExito">
                    ¡Reserva confirmada! Te esperamos.
                </div>
            </div>

            <h3 class="h4 fuente-titulo mt-5">Reservas confirmadas</h3>
            <p class="text-muted" v-if="reservas.length === 0">Todavía no hay reservas.</p>
            <ul class="list-group" v-else>
                <li class="list-group-item" v-for="(r, indice) in reservas" :key="indice">
                    <i class="bi bi-calendar-check text-dorado me-2"></i>
                    {{ r.nombre }} - {{ r.fecha }} - {{ r.hora }} hs ({{ r.turno }}) - {{ r.personas }} persona(s)
                </li>
            </ul>
        </div>`
    })

    // ------------------------------------- VISTA NOSOTROS-------------------------------------


    app.component('vista-nosotros', {
        template: `
        <div class="container pb-5 pt-nav">
            <div class="row g-4 align-items-center">
                <div class="col-12 col-lg-6">
                    <img src="img/equipo-cocina.jpg" alt="Equipo de cocina de Bella Trattoria"
                         class="img-fluid rounded shadow">
                </div>
                <div class="col-12 col-lg-6">
                    <span class="text-uppercase text-muted fw-bold small">Nuestra historia</span>
                    <h2 class="fw-bold fuente-titulo mb-3">Sobre nosotros</h2>
                    <p class="text-secondary">
                        Bella Trattoria es un restaurante de pastas caseras. Amasamos todos los días
                        y cocinamos con ingredientes frescos, como se hace en las trattorias de Italia.
                    </p>
                    <ul class="list-unstyled text-secondary">
                        <li class="mb-2"><i class="bi bi-geo-alt text-danger me-2"></i>Av. Belgrano 1233</li>
                        <li class="mb-2"><i class="bi bi-clock text-danger me-2"></i>Abierto de martes a domingo, de 12 a 15 h y de 20 a 24 h</li>
                        <li class="mb-2"><i class="bi bi-telephone text-danger me-2"></i>(0385) 154-340244</li>
                    </ul>
                </div>
            </div>
        </div>`
    })

    // ------------------------------------- FOOTER------------------------------------

    app.component('mi-footer', {
        data() {
            return {
                anio: new Date().getFullYear(),
                redes: [
                    { nombre: 'Instagram', icono: 'bi-instagram', url: 'https://www.instagram.com' },
                    { nombre: 'Facebook', icono: 'bi-facebook', url: 'https://www.facebook.com' },
                    { nombre: 'WhatsApp', icono: 'bi-whatsapp', url: 'https://www.whatsapp.com' }
                ]
            }
        },
        template: `
        <footer class="bg-dark text-white text-center py-4 mt-5">
            <div class="container">
                <div class="mb-2">
                    <a v-for="red in redes" :key="red.nombre" :href="red.url" target="_blank" rel="noopener"
                       :aria-label="red.nombre" class="text-white fs-4 mx-2">
                        <i class="bi" :class="red.icono"></i>
                    </a>
                </div>
                <p class="mb-0">&copy; {{ anio }} Bella Trattoria. Todos los derechos reservados.</p>
            </div>
        </footer>`
    })

}