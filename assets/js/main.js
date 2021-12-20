$(document).ready(function(){
    const form = $('form')
    
    form.submit(function(e){
        e.preventDefault()
        const numero = document.querySelector('.numero').value
        const regex = /^[1-9][0-9]*$/gm

        if(!regex.test(numero) || parseInt(numero) > 732){
            alert('Ingresa un numero entre 1 y 732')
        }
        else{
            consultaApi(numero)
        }

    })

    function consultaApi(numero){
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
                
                <div class="card-group row con_fondo">
                    <div class="card mb-4 col-6 ">
                        <h2 class="text-center bordes">Superhero encontrado</h2>
                        <div class="row no-gutters all_bordes">
                            <div class="col-sm-4 col-md-6 border-1">
                                <img class="altura" src="${img}" alt="...">
                            </div>
                            <div class="col-md-6">
                                <div class="card-body">
                                    <div class="card bg-transparent">
                                        <ul class="list-group list-group-flush ">
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
                    </div>
                    <div id="grafico" class="card col-6 "></div>
                </div>`
                contenido.innerHTML = html
                $(contenido).css({
                    'background-image': 'url("/assets/img/fondo_ficha.jpg")',
                    'background-size': 'cover'
                })
                let estadisticas = []
                console.log(data.powerstats);
                // data.powerstats.forEach(element => {
                //     estadisticas.push({y: Object.values(element), label: Object.keys(element)})
                // });

                Object.entries(data.powerstats).forEach((key, value)=>{
                    if(key[0]!=='null' && key[1]!=='null')
                    estadisticas.push({y: key[1], label: key[0]})
                    else{
                        estadisticas[0] = 'null'
                    }
                })

                if(estadisticas[0] === 'null'){
                    $("#grafico").html(`<h5 class="">No se encontraron datos de ${data.name}</h5>`)
                }
                else{
                    console.log(estadisticas);

                    var options = {
                        backgroundColor: "transparent",
                        title: {
                            text: `Estadisticas de poder para ${data.name}`,
                            fontColor: "white"
                        },
                        legend: {
                            fontColor: "white",
                            fontFamily: "Open Sans"
                        },
                        axisXs:{
                            labelFontColor: "white"
                          },
                        animationEnabled: true,
                        data: [{
                            type: "pie",
                            startAngle: 40,
                            toolTipContent: "<b>{label}</b>: {y}%",
                            showInLegend: "true",
                            legendText: "{label}",
                            indexLabelBackgroundColor: "#ffffffCC",
                            indexLabelFontSize: 16,
                            indexLabel: "{label} - {y}%",
                            dataPoints: estadisticas
                        }]
                };
                $("#grafico").CanvasJSChart(options);
                }

                
                
            },
            error: function (data) {
            //esta función se activa si ocurre algún error durante el proceso
            console.log('Rrror de comunicación')
            },
            async: true,
            });

    }
})


   