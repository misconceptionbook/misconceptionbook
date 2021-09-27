const story = ["You may never write a long book",
"But you might write a short one",
"You may never perform in the Albert Hall",
"But you might perform<br>round a wintery campfire",
"To people you love.",
"Sometimes, happiness takes<br>effort and maturity.",
"Other times it happens on its own. ",
"Not everyone knows what makes them happy.",
"There's nothing wrong with being sad,",
"It can just be more solitary. ",
"There's nothing wrong with solitude,",
"Though we are social animals. ",
"Friendships are built on trust.",
"We can build this by opening up to people.",
"Openness is a positive attribute.",
"It can help get us out of dark times. ",
"Life has no meaning. ",
"And that's ok. ",
"That is not the same as not enjoying life. ",
"Existential questions can often be a function<br>of depressive thoughts. ",
"In moments of joy we are rarely<br>aware of these questions.",
"Though we may find meaning<br>in moments of joy. ",
"Sex and passion are to be enjoyed. ",
"Your sexuality is a part of you. ",
"The most meaningful moments can<br>come from taking a risk. ",
"There's nothing wrong with striking<br>a conversation with someone you fancy.",
"A life lived without risks is not lived. ",
"Equally, it can be hard<br>to manage the tendencies of the heart - ",
"And a life made of up of 'almosts'",
"Is actually pretty good.",
"Forgive your parents as soon as possible. ",
"Grateful people are happier<br>than ungrateful people.",
"We can practise gratitude. ",
"We can practise kindness. ",
"We are able to give if we try. ",
"Giving brings us purpose.",
"We cannot love ourselves<br>without accepting ourselves.",
"Loving oneself is to act<br>compassionately towards oneself.",
"Loving others requires us to<br>see their value as humans.",
"People express love in different ways. ",
"There is more to life than love.",
"We may never be content. ",
"But we may be ok."];




/* Documentation sample */

function loadPage(page) {

	var img = $('<img />');
	img.load(function() {
		var container = $('.sample-docs .p'+page);
		img.css({width: container.width(), height: container.height()});

		img.appendTo($('.sample-docs .p'+page));
		container.find('.loader').remove();
	});

	//img.attr('src', 'pages/' +  (page) + '.png');
	if((page%2)==0){
		img.attr('src', 'pages/outpaperleft.jpg');
	}else{
		img.attr('src', 'pages/outpaperright.jpeg');
	}
	

}

function addPage(page, book) {

	var id, pages = book.turn('pages');

	var element = $('<div />', {});

	if (book.turn('addPage', element, page)) {
		if (page<=89) {

			var page_text = ''
			var font_pt = 8;
			var align_txt = 'left';
			if(page==1){
				page_text = '<p style="font-size: 10pt;">Misconceptions</p><p style="font-size: 6pt; margin-bottom: 180px">L.M.</p>';
				font_pt = 10;
				align_txt = 'center';
			}
			if (((page+3) % 2)==0){
				if(((page-3)/2)>=0){
					page_text = story[(page-3)/2];
				}
				
			}
			

			var str_test = '<div class="gradient" style="position: absolute; display: flex; width:100%; justify-content: center; align-items: center; height:471px"><div style="font-family: nicefont; font-size: %F%pt; text-align: %AL%">'.replace('%F%',font_pt).replace('%AL%',align_txt) + page_text + '</div></div>'
			element.html('<div class="gradient"></div><div class="loader"></div>' + str_test);
			loadPage(page);

		}
	}
}

function updateTabs() {

	var tabs = {7: 'Clases', 12:'Constructor', 14:'Properties', 16:'Methods', 23:'Events'},
		left = [],
		right = [],
		book = $('.sample-docs'),
		actualPage = book.turn('page'),
		view = book.turn('view');

	for (var page in tabs) {
		var isHere = $.inArray(parseInt(page, 10), view)!=-1;

		if (page>actualPage && !isHere)
			right.push('<a href="#page/' + page + '">' + tabs[page] + '</a>');
		else if (isHere) {

			if (page%2===0)
				left.push('<a href="#page/' + page + '" class="on">' + tabs[page] + '</a>');
			else
				right.push('<a href="#page/' + page + '" class="on">' + tabs[page] + '</a>');
		} else
			left.push('<a href="#page/' + page + '">' + tabs[page] + '</a>');

	}

	$('.sample-docs .tabs .left').html(left.join(''));
	$('.sample-docs .tabs .right').html(right.join(''));

}


function numberOfViews(book) {
	return book.turn('pages') / 2 + 1;
}


function getViewNumber(book, page) {
	return parseInt((page || book.turn('page'))/2 + 1, 10);
}


function moveBar(yes) {
	if (Modernizr && Modernizr.csstransforms) {
		$('#slider .ui-slider-handle').css({zIndex: yes ? -1 : 10000});
	}
}

function setPreview(view) {

	var previewWidth = 115,
		previewHeight = 73,
		previewSrc = 'pics/preview.jpg',
		preview = $(_thumbPreview.children(':first')),
		numPages = (view==1 || view==$('#slider').slider('option', 'max')) ? 1 : 2,
		width = (numPages==1) ? previewWidth/2 : previewWidth;

	_thumbPreview.
		addClass('no-transition').
		css({width: width + 15,
			height: previewHeight + 15,
			top: -previewHeight - 30,
			left: ($($('#slider').children(':first')).width() - width - 15)/2
		});

	preview.css({
		width: width,
		height: previewHeight
	});

	if (preview.css('background-image')==='' ||
		preview.css('background-image')=='none') {

		preview.css({backgroundImage: 'url(' + previewSrc + ')'});

		setTimeout(function(){
			_thumbPreview.removeClass('no-transition');
		}, 0);

	}

	preview.css({backgroundPosition:
		'0px -'+((view-1)*previewHeight)+'px'
	});
}

