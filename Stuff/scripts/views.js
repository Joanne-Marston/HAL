var handle;
var currentpage=0;
var content="";
var pageheight=500;
var pagewidth=500;

function toggleview(type)
{
	if (type=="flip")
	{			
		$('#bookarea').empty();
		
		$('#bookarea').append("<div id='flipbook'></div>");
		$('#flipbook').append(content);
		$('.page').wrap('<div />');
		
		$('#flipbook').turn({gradients: true, acceleration: true});
		$('#flipbook').turn('page', currentpage);
		
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
	}
}


function loadbook(book)
{	$.post('fetchbook.php', {"book":book}, function(data){
		content=data;
		
		if (book.substr(0,3)==="raw")
		{
			$('#bookwrapper').append("<div id='bookarea'><div id='book'></div></div>");
			pagebreak();
		}
		else
		{
			$('#bookwrapper').append(content);	
		}
		
		content=$('#book').html();
	});		
}

function pagebreak()
{
	var words=content.split(" ");	
	
	var begin=0;
	var numpages;
	
	$('body').append("<div id='content'></div>");
	$('#content').css('height', pageheight);
	$('#content').css('width', pagewidth);
	
	$.each(words, function(index, element){
		$('#content').append(element+' ');

		if ($('#content').prop('scrollHeight')>$('#content').prop('clientHeight'))
		{	
			var pagetext=words.slice(begin, index);
			$('#book').append('<div class="page">'+pagetext.join(' ')+'</div>');
			begin=index;
			$('#content').empty();
			$('#content').append(element+' ');
			
		}
	
	});

	var pagetext=words.slice(begin, words.length);
	$('#book').append('<div class="page">'+pagetext.join(' ')+'</div>');
	$('#content').remove();
}