$(document).ready(function(){
    const form = $('form')
    
    form.submit(function(e){
        e.preventDefault()
        const numero = document.querySelector('.numero').value
        const regex = /^[1-9][0-9]*$/gm
        
        if(!regex.test(numero) || parseInt(numero) > 732){
            alert('Ingresa un numero entre 1 y 732')
        }


        $.ajax({
            url: "https://superheroapi.com/api.php/10220042197018751/"+numero ,
            dataType: "json" ,
            success: function (data) {
            //si todo sale bien, se agrega la funcionalidad aquí 
                const contenido = document.querySelector('div.contenido')
                let img = ''
                if(data.image.url===''){
                    img = 'assets/img/sh2.jpg'
                } else{
                    img = data.image.url
                }
                const html = `
                <h2 class="text-center">Superhero encontrado</h2>
                <div class="card mb-4">
                    <div class="row no-gutters">
                        <div class="col-md-6">
                            <img src="${img}" alt="...">
                        </div>
                        <div class="col-md-6">
                            <div class="card-body">
                                <div class="card" style="width: 18rem;">
                                    <ul class="list-group list-group-flush">
                                        <li class="list-group-item"> <h5 class="card-title">Nombre: ${data.name}</h5></li>
                                        <li class="list-group-item">Publicado por: ${data.biography.publisher}</li>
                                        <li class="list-group-item">Ocupación: ${data.work.occupation}</li>
                                        <li class="list-group-item">Primera apariación: ${data.biography["first-appearance"]}</li>
                                        <li class="list-group-item">Altura: ${data.appearance.height.join(', ')}</li>
                                        <li class="list-group-item">Peso: ${data.appearance.weight.join(', ')}</li>
                                        <li class="list-group-item">Alias: ${data.biography.aliases.join(', ')}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`
                contenido.innerHTML = html
                
            console.log(data);
            },
            error: function (data) {
            //esta función se activa si ocurre algún error durante el proceso
            console.log('Rrror de comunicación')
            },
            async: true,
            });
    })})
   