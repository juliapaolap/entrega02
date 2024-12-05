const app = Vue.createApp({
    
    data() 
    {
        return {
            productos: [],
            busqueda: '',
            categoriaSeleccionada: 'todos',
        };
    },

    computed: 
    {
        productosFiltrados() 
        {
            let productosFiltrados = this.productos;

            if (this.categoriaSeleccionada !== 'todos') 
                {
                    // Si la categoría seleccionada no es 'todos', se filtran los productos según la categoría elegida.
                    productosFiltrados = productosFiltrados.filter(cafe => 
                    { // Filtra los productos basándose en el id del producto y la categoría seleccionada


                        if (this.categoriaSeleccionada === 'calientes' && cafe.id <= 12) return true;
                        // Si la categoría seleccionada es 'calientes', se muestran solo los productos con id <= 12.


                        if (this.categoriaSeleccionada === 'frias' && cafe.id >= 13) return true;
                        // Si la categoría seleccionada es 'frias', se muestran solo los productos con id >= 13.

                        /*      === se utiliza para comparar dos valores de manera estricta, 
                                lo que significa que verifica tanto el valor como el tipo de dato de los dos operandos */
                    });
                }                

            if (this.busqueda) 
            {
                productosFiltrados = productosFiltrados.filter(cafe => cafe.title.toLowerCase().includes(this.busqueda.toLowerCase()));
            }

            return productosFiltrados;
        },

        porcentajeProductos() 
        {
            return this.productosFiltrados.length > 0 
                ? Math.round((this.productosFiltrados.length / this.productos.length) * 100) : 0;
        }
    },

    methods: 
    {
        cargarCafeCaliente() {
            axios.get("https://api.sampleapis.com/coffee/hot").then(respuesta => {
                this.productos = respuesta.data;
            });
        },

        filtrarProductos() 
        {
            // Este método ya está cubierto por los computed
        }
    },

    created() 
    {
        this.cargarCafeCaliente();
    }
});

app.mount("#contenedor");
