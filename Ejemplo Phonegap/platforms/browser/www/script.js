$(document).ready(function()
{
        var original;

	$("#hacer_foto").click(function()
	{
		var opciones = 
		{ 
			quality:80,
			destinationType: Camera.DestinationType.FILE_URI,
			targetWidth:300,
			targetHeight:300,
			correctOrientation: true,
                        sourceType:Camera.PictureSourceType.CAMERA
		}

		navigator.camera.getPicture(fue_bien, fue_mal, opciones);
	});

        $("#foto_galeria").click(function()
        {
                /*var canvas = document.querySelector("#foto");
                var context = canvas.getContext('2d');
                context.clearRect(0, 0, canvas.width, canvas.height);*/
                var opciones = 
                { 
                        quality:80,
                        destinationType: Camera.DestinationType.FILE_URI,
                        targetWidth:300,
                        targetHeight:300,
                        correctOrientation: true,
                        sourceType:Camera.PictureSourceType.PHOTOLIBRARY
                }

                navigator.camera.getPicture(fue_bien, fue_mal, opciones);
        });


        function fue_bien(image)
        {
                
                var img = document.createElement('img');
                img.onload = function()
                {
                        pintar_foto(img);
                }

                img.src = image;
                original = image;
        }

        function pintar_foto(img)
        {
                var canvas = document.querySelector("#foto");
                var context = canvas.getContext('2d');
                canvas.width = img.width;
                canvas.height = img.height;
                context.drawImage(img, 0, 0, img.width, img.height);
        }

        function fue_mal(message)
        {
                alert("Se canceló la foto o hubo un error");
        }

        function aplicar_filtro(filter)
        {
                fue_bien(original);

                setTimeout(function()
                {
                        if (filter != 'ori')
                        {
                                var canvas = document.querySelector("#foto");
                                var context = canvas.getContext('2d');
                                imageData = context.getImageData(0,0, canvas.width, canvas.height);
                                effects[filter](imageData.data);

                                context.putImageData(imageData,0,0);
                                
                        }
                },2);
                
                
        }

        $(".filter").click(function()
        {
                var tipo = $(this).data('id');
                aplicar_filtro(tipo);
        });
});

