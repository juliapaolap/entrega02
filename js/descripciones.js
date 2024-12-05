const app = Vue.createApp({

    data() 
    {
        return {
            producto: {}
        };
    },

    methods: 
    {
        cargarProducto() 
        {
            // Obtener el ID del producto desde la URL
            const urlParams = new URLSearchParams(window.location.search);
            const productoId = urlParams.get("id");

            if (productoId) 
            {
                axios.get(`https://api.sampleapis.com/coffee/hot/${productoId}`)
                    .then(response => 
                    {
                        this.producto = response.data;
                    })

                    .catch(error => {
                        console.error("Error al cargar el producto:", error);
                    });
            }
        }
    },

    created() 
    {
        this.cargarProducto();
    },
    
});

app.mount("#app");
