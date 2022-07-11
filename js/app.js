
//this is a new comment to test pull-request
(function() {

	
	$('form').submit(function(event) {
		event.preventDefault();

		var datos = $(this).serializeArray();
		console.log(datos);

		var url = 'https://api.github.com/users/'+datos[0].value;
		console.log(url);
		
		$.get(url)
			.done(function(data) {
				
				$('.img-avatar').attr('src',data.avatar_url);
				$('h3').html(data.name);
				$('p').html(data.login);
			})
			.done(function(data) {
				
				$.get(data.repos_url)
					.done(function(repos) {

						$('table tbody').html('');
						for (var i = repos.length - 1; i >= 0; i--) {

								var row = '<tr><td>'+repos[i].name;
								row += '<td>'+repos[i].description;
								row += '<td>'+repos[i].language;


								$('table tbody').append(row);

							}	
					});
			})
			.done(function(data) {
				$.get(data.followers_url)
					.done(function(seguidores) {
						console.log(seguidores);
						$.get('template/user-componente.html')
							.done(function(componente) {
								$('.contenedor').html('');
								 for(var i = 0; i < seguidores.length; i++){
								 		var componenteLocal = $(componente);
								 		componenteLocal.find('.componente-img').attr('src',seguidores[i].avatar_url);
								 		componenteLocal.find('.componente-title').html(seguidores[i].login);
								 		$('.contenedor').append(componenteLocal);
								 }
							});
					})
			})
			.fail(function() {
				alert('Error de AJAX');
				throw new Error("Error AJAX");
			});
	});

			
})();
