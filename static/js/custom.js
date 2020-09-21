(function() {
	'use strict';
	    var TxtRotate = function(el, toRotate, period) {
		this.toRotate = toRotate;
		this.el = el;
		this.loopNum = 0;
		this.period = parseInt(period, 10) || 2000;
		this.txt = '';
		this.tick();
		this.isDeleting = false;
	  };
	  
	  TxtRotate.prototype.tick = function() {
		var i = this.loopNum % this.toRotate.length;
		var fullTxt = this.toRotate[i];
	  
		if (this.isDeleting) {
		  this.txt = fullTxt.substring(0, this.txt.length - 1);
		} else {
		  this.txt = fullTxt.substring(0, this.txt.length + 1);
		}
	  
		this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';
	  
		var that = this;
		var delta = 300 - Math.random() * 100;
	  
		if (this.isDeleting) { delta /= 2; }
	  
		if (!this.isDeleting && this.txt === fullTxt) {
		  delta = this.period;
		  this.isDeleting = true;
		} else if (this.isDeleting && this.txt === '') {
		  this.isDeleting = false;
		  this.loopNum++;
		  delta = 500;
		}
	  
		setTimeout(function() {
		  that.tick();
		}, delta);
	  };
	  
	  window.onload = function() {
		var elements = document.getElementsByClassName('txt-rotate');
		for (var i=0; i<elements.length; i++) {
		  var toRotate = elements[i].getAttribute('data-rotate');
		  var period = elements[i].getAttribute('data-period');
		  if (toRotate) {
			new TxtRotate(elements[i], JSON.parse(toRotate), period);
		  }
		}
		// INJECT CSS
		var css = document.createElement("style");
		css.type = "text/css";
		css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
		document.body.appendChild(css);
	  };
	/*----------------------------------------
		Detect Mobile
	----------------------------------------*/
	var isMobile = {
		Android: function() {
			return navigator.userAgent.match(/Android/i);
		},
			BlackBerry: function() {
			return navigator.userAgent.match(/BlackBerry/i);
		},
			iOS: function() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
			Opera: function() {
			return navigator.userAgent.match(/Opera Mini/i);
		},
			Windows: function() {
			return navigator.userAgent.match(/IEMobile/i);
		},
			any: function() {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	};

	var navToggler = $('.navbar-toggler');
	$("#pb-navbar ul li a[href^='#']").each(function(){
		$(this).on('click', function(e){
			if ( navToggler.is(':visible') ) {
			  navToggler.click();
		  }
		});
	})
	   
	var navigation =function (){
	if ($('.navbar-collapse').is(':hidden')){
		$("#pb-navbar").css({'animation':'slideInLeft 1s'})
		$("#pb-navbar").addClass('navbar-gradient')
		navToggler.css({'position':'fixed','top':'10px'})
	}
	else{
		$("#pb-navbar").css({'animation':'slideOutLeft 1s'})
		setTimeout(function(){
			$("#pb-navbar").removeClass('navbar-gradient')
		},1000)
		
		
	}
	}
	navToggler.on('click', navigation)
	/*----------------------------------------
		Animate Scroll
	----------------------------------------*/

	var contentWayPoint = function() {
		var i = 0;
		$('.site-animate').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('site-animated') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .site-animate.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('animate__animated animate__slideInUp site-animated');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('animate__animated animate__fadeInLeft site-animated');
							} else if ( effect === 'fadeInRight') {
								el.addClass('animate__animated animate__fadeInRight site-animated');
							} else {
								el.addClass('animate__animated animate__fadeInUp site-animated');
							}
							el.removeClass('item-animate');
						},  k * 100, 'easeInOutExpo' );
					});
					
				}, 100);
				
			}

		} , { offset: '95%' } );
	};

	var navbarState = function() {

		var lastScrollTop = 0;
		$(window).scroll(function(){

			var $this = $(this),
				 	st = $this.scrollTop(),
				 	navbar = $('.site-navbar');

			if ( st > 200 ) {
				navbar.addClass('scrolled');
			} else {
				navbar.removeClass('scrolled awake');
			}

			if ( navbar.hasClass('scrolled') && st > 300 ) {
		   	if (st > lastScrollTop){
		      // if (navbar.hasClass('scrolled')) {
		      	// navbar.removeClass('awake');
		      	// navbar.addClass('sleep');
		      // }
		   	} else {
		      // if (navbar.hasClass('scrolled')) {
		      	// navbar.addClass('awake');
		      	// navbar.removeClass('sleep');
		      // }
		   	}
		   	lastScrollTop = st;
		  }

		});



		
	};
 //preloader
	
	
	
	var siteStellar = function() {
		$(window).stellar({
	    responsive: true,
	    parallaxBackgrounds: true,
	    parallaxElements: true,
	    horizontalScrolling: false,
	    hideDistantElements: false,
	    scrollProperty: 'scroll'
	  });
	};
	// form submit
	function getCookie(name) {
		var cookieValue = null;
		if (document.cookie && document.cookie !== '') {
			var cookies = document.cookie.split(';');
			for (var i = 0; i < cookies.length; i++) {
				var cookie = cookies[i].trim()
				if (cookie.substring(0, name.length + 1) === (name + '=')) {
					cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
					break;}}}return cookieValue;}
	  
	  async function formSubmit(event){
		 event.preventDefault()
		 const template = event.target.getAttribute('template')
		 fetch(template).then(function (response){
			 response.text().then(function (text){
				$('#page-load').removeClass('d-none animate__animated animate__fadeOutUp')
				$('.portfolio-show').removeClass('animate__animated animate__slideOutDown')
				$('#portfolio-projects').html(text).addClass('portfolio-show').css({'display':"block"})
				$('#page-load').addClass('animate__animated animate__fadeOutUp animate_fast') 

			 })
		 })
		     
		
	}
		          
   $('#section-portfolio form').each(function(){
	   $(this).submit(formSubmit)})
  
  function sendMessage(event){
		event.preventDefault()
		const myform = event.target
		const endpoint = myform.getAttribute('action')
		const method = 'POST'
		const name = $('#name').val()
	   const message = $('#message').val()
	   const email = $('#email').val()
	   var csrftoken = getCookie('csrftoken')
	   const xhr = new XMLHttpRequest()
	   xhr.responseType = 'json'
	   xhr.open(method, endpoint)
	   xhr.setRequestHeader('X-CSRFToken', csrftoken)
	   xhr.setRequestHeader('Content-Type', 'application/json')
		xhr.onload = function(){
		  const responseMessage = 'Thank you for contacting me! I will get to you soon '
		  $('#response').html('<span>'+responseMessage+'</span>').css('color','#28a745')
		  $('#message').val('')
		  $('#name').val('')
		  $('#email').val('')}
		xhr.onerror = function(){
		  $('#response').html('<p>an error occured please send an email to:jonathanonderi2018@yahoo.com</p>').css('color','#ffc107')} 
		const data = JSON.stringify({'message':message,'email':email, 'name':name})
		xhr.send(data)}   
		     
  const messageForm = document.getElementById('messageForm')
  messageForm.addEventListener('submit',sendMessage)
  $('.testmonial').first().addClass('active')

	var navActive = function(section) {

		var $el = $('.navbar-nav');
		$el.find('li').removeClass('active');
		$el.each(function(){
			$(this).find('a[data-nav-section="'+section+'"]').closest('li').addClass('active');
		});

	};

	var navigationSection = function() {

		var $section = $('section[data-section]');
		
		$section.waypoint(function(direction) {
		  	if (direction === 'down') {
		    	navActive($(this.element).data('section'));
		  	}
		}, {
	  		offset: '150px'
		});

		$section.waypoint(function(direction) {
		  	if (direction === 'up') {
		    	navActive($(this.element).data('section'));
		  	}
		}, {
		  	offset: function() { return -$(this.element).height() - 155; }
		});

	};


	var smoothScroll = function() {
		var $root = $('html, body');

		$('.smoothscroll').click(function () {
			$root.animate({
		    scrollTop: $( $.attr(this, 'href') ).offset().top
			}, 500);
			return false;
		});
	};
	$(function(){

		//OnePageNav();
		contentWayPoint();
		navbarState();
		//clickMenu();
		smoothScroll();

	});

    function SetHeight(ele){
		var max_h = 0
		$(document).ready(function(){
			$(ele).each(function(){
			   if($(this).outerHeight()>max_h){
				   max_h = $(this).outerHeight()
			   }})
		$(ele).each(function(){
		     $(this).css({'height':max_h});})		
			})
			
	}
SetHeight('.about-item .site-service-item')
SetHeight('.service-item .site-service-item')
SetHeight('.skills ul')



$('.carosel').carousel({interval:1000})
 
	var pageProgress = function() {
		$(window).scroll(function() {
	    var wintop = $(window).scrollTop(), docheight = $('body').height(), winheight = $(window).height();
	    var totalScroll = (wintop/(docheight-winheight))*100;
	    // console.log("total scroll" + totalScroll);
	    $(".KW_progressBar").css("width",totalScroll+"%");
	  });

	};
	pageProgress();	
 
		})();

