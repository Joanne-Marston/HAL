var handle;
var currentpage=0;

function toggleview(type)
{
	if (type=="flip")
	{			
		$('#bookarea').empty();
		
		$('#bookarea').append("<div id='flipbook'></div>");
		$('#flipbook').append($('.clone').clone());
		
		$('#flipbook').turn({gradients: true, acceleration: true});
		$('#flipbook').turn('page', currentpage*2);
		
		$('#flip').attr("disabled", "disabled");
		$('#slide').removeAttr("disabled");
		
		$(document).unbind('keydown');
		$(document).bind('keydown', function(e){
		if (e.keyCode==37)
			$('#flipbook').turn('previous');
		else if (e.keyCode==39)
			$('#flipbook').turn('next');
		});
	}
	else
	{
		$(document).unbind("mousemove");
		$(document).unbind("mouseup");
		clearInterval(handle);
		if ($('#flipbook').turn('page')%2==0)
		{
			currentpage=$('#flipbook').turn('page')/2;
		}
		else
		{
			currentpage=($('#flipbook').turn('page')-1)/2;
		}
		
		
		$('#bookarea').empty();
		
		$('#bookarea').append($('#content').clone().attr('id', 'slidebook'));
		
		var wrap=jQuery('#slidebook'),
			slides=wrap.find('.panel'),
			width=wrap.width();
		
		$('#panel'+currentpage).addClass('active');
		
		slides.on('swipeleft', function(e) 
		{
			if (currentpage === slides.length - 1) { return; }
			slides.eq(currentpage + 1).trigger('activate');
		})
		.on('swiperight', function(e) 
		{
			if (currentpage === 0) { return; }
			slides.eq(currentpage - 1).trigger('activate');
		})
		.on('activate', function(e) 
		{
			slides.eq(currentpage).removeClass('active');

			jQuery(e.target).addClass('active');

			// Update the active slide index
			currentpage = slides.index(e.target);
		})
		.on('movestart', function(e) 
		{
			// If the movestart heads off in a upwards or downwards
			// direction, prevent it so that the browser scrolls normally.
			if ((e.distX > e.distY && e.distX < -e.distY) ||
				(e.distX < e.distY && e.distX > -e.distY)) {
				e.preventDefault();
				return;
			}

			// To allow the slide to keep step with the finger,
			// temporarily disable transitions.
			wrap.addClass('notransition');
		})
		.on('move', function(e) 
		{
			var left = 100 * e.distX / width;

			// Move slides with the finger
			if (e.distX < 0) {
				if (slides[currentpage+1]) {
					slides[currentpage].style.left = left + '%';
					slides[currentpage+1].style.left = (left+100)+'%';
				}
				else {
					slides[currentpage].style.left = left/4 + '%';
				}
			}
			if (e.distX > 0) {
				if (slides[currentpage-1]) {
					slides[currentpage].style.left = left + '%';
					slides[currentpage-1].style.left = (left-100)+'%';
				}
				else {
					slides[currentpage].style.left = left/5 + '%';
				}
			}
		})
		.on('moveend', function(e) 
		{
			wrap.removeClass('notransition');
			
			slides[currentpage].style.left = '';

			if (slides[currentpage+1]) {
				slides[currentpage+1].style.left = '';
			}
			if (slides[currentpage-1]) {
				slides[currentpage-1].style.left = '';
			}
		});

		$('#slide').attr("disabled", "disabled");
		$('#flip').removeAttr("disabled");
		
		$(document).unbind('keydown');
		$(document).bind('keydown', function(e){
		if (e.keyCode==37)
			slides.eq(currentpage).trigger('swiperight');
		else if (e.keyCode==39)
			slides.eq(currentpage).trigger('swipeleft');
		});
	}
}

function loadbook(book)
{
	$('#content').load('fetchbook.php', {"book":book}); 
}