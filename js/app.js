(function() {

	var url = 'https://api.github.com/users/leodufer';
	
		$.get(url)
			.done(function(data) {
				$('.img-avatar').attr('src',data.avatar_url);
				$('h3').html(data.name);
				$('p').html(data.login);
				$('.panel').show();
				$('.loader').hide();
			})
			
})();