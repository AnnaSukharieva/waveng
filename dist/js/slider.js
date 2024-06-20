$(document).ready(function () {
	$('.lessons__cards').slick({
		infinite: false,
		slidesToShow: 3,
		slidesToScroll: 1,
		arrows: true,
		dots: true,
		responsive: [
			{
				breakpoint: 1000,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
					arrows: false,
					dots: true
				}
			},
			{
				breakpoint: 770,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					arrows: false,
					dots: true
				}
			}
		]
	});

	$('.advantages__cards-mob').slick({
		infinite: false,
		slidesToShow: 2,
		slidesToScroll: 1,
		arrows: false,
		dots: true,
		responsive: [ {
				breakpoint: 690,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					arrows: false,
					dots: true
				},
			}
		]
	});


	$('.feedback__items-mob').slick({
		infinite: true,
		slidesToShow: 2,
		slidesToScroll: 1,
		dots: false,
		arrows: true,
		responsive: [
			{
				breakpoint: 730,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			},
		]
	});

	arrows = document.querySelectorAll('.slick-arrow')
	arrows.forEach(element => {
		element.innerHTML = `<img src="icons/questions_button.svg" alt="button"></img>`;
		element.classList.add('arrow-button')
		if (element.getAttribute("aria-label") == 'Previous') {
			element.firstChild.style.transform = 'rotate(-135deg)';
		}
		if (element.getAttribute("aria-label") == 'Next') {
			element.firstChild.style.transform = 'rotate(45deg)';
		}
	});

});


