'use strict';

window.Void = function() { }; (function($) { $.fn.voidLink = function() { return this.attr('href', 'javascript:Void()'); }; } (jQuery));
var Site = window.Site || {};

(function($) {


    $(Site.Init);
} (jQuery));


$(document).ready(function(){

    $('.clickContainer').on('click', function(){
        // alert('hai');
        return location.href = $(this).find('a').attr('href');
    });

    $('.blurbCarousel').slick({
        dots: true,
        arrows: false,
        adaptiveHeight: true
    });

    $('.textEntry').keyup(function() {
        var x = $(this).val();
        $('.yourMotivation').html(x).append();
    });
    $('.motivator').hide();
    $('.motivationUpdate').hide();
    $('.motivationCreation').on('click', function(){
        // $('.motivator').show();
        $('.textEntry').prop('disabled', true).addClass('disabled');
        $(this).hide();
        $('.motivationUpdate').show();
    });
    $('.motivationUpdate').on('click', function(){
        $('.textEntry').prop('disabled', false).removeClass('disabled');
        $(this).hide();
        $('.motivationCreation').show()
    });
    // $('.motivator .close').on('click', function(){
    //     $('.motivator').hide();
    //     $('.textEntry').show();
    //     $('.textEntry').prop('disabled', true);
    // });

    $('[data-popup-open]').on('click', function(e)  {
        var targeted_popup_class = $(this).attr('data-popup-open');
        $('[data-popup="' + targeted_popup_class + '"]').fadeIn(350);
        $('body').css('overflow','hidden');
        e.preventDefault();
    });

    //----- CLOSE
    $('[data-popup-close]').on('click', function(e)  {
        var targeted_popup_class = $(this).attr('data-popup-close');
        $('[data-popup="' + targeted_popup_class + '"]').fadeOut(350);
        $('body').css('overflow','visible');
        e.preventDefault();
    });

    // add items
    var num = 0;
    $('#add-todo').on('click', function() {
        num++;
    	var lastSibling = $('#todo-list > .todo-wrap:last-of-type > input').attr('id' + num);
    	var newId = Number(lastSibling);
    	$(this).before('<div class="editing todo-wrap"><input class="taskBox" name="myTask" type="checkbox" id="' + num + '" name="todo' + num + '"/><label for="' + num + '" class="todo"><i class="fa fa-check"></i><input type="text" name="doneTask" class="input-todo" id="input-todo' + num + '" name="input' + num + '"/><span class="shrinkit"><img src="/build/assets/images/butn-add.png" alt="Add add and close" /></span></label></div>');
    	$('#input-todo' + num + '').parent().parent().animate({
    		height: "500px"
    	}, 200)
    	$('#input-todo' + num + '').focus();
    	$('#input-todo' + num + '').enterKey(function() {
    		$(this).trigger('enterEvent');
    	});
        $('.taskBox').change(function(){
            if ($('.taskBox:checked').length == 4) {
               //alert('oh hai');
               return location.href = $('#add-todo').find('a').attr('href');
            }
        });
    	$('#input-todo' + num + '').on('blur enterEvent', function() {
    		var todoTitle = $('#input-todo' + num + '').val();
    		var todoTitleLength = todoTitle.length;
            var todoWrap = $('.todo-wrap').length;
            var emotionToDo = $('.emotionActivity .todo-wrap').length;
    		if (todoTitleLength > 0) {
    			$(this).before(todoTitle);
    			$(this).parent().parent().removeClass('editing');
    			$(this).parent().after('<span class="delete-item" title="remove"><i class="fa fa-times-circle"></i></span>');
    			$(this).remove();
    			$('.delete-item').on('click', function() {
    				var parentItem = $(this).parent();
    				parentItem.animate({
    					left: "-30%",
    					height: 0,
    					opacity: 0
    				}, 200);
    				setTimeout(function() {
    					$(parentItem).remove();
    				}, 1000);
    			});
    		} else {
    			$('.editing').animate({
    				height: '0px'
    			}, 200);
    			setTimeout(function() {
    				$('.editing').remove()
    			}, 400)
    		}
            if(todoWrap == 4) {
                //alert('hai');
                $('#add-todo').hide();
                $('.step-001').removeClass('active');
                $('p.instruction-001').removeClass('active')
                $('.step-002').addClass('active');
                $('p.instruction-002').addClass('active')
            }
            if(emotionToDo == 4) {
                return location.href = $('#add-todo').find('a').attr('href');
            }
    	})
    });
    // remove items
    $('.delete-item').click(function() {
    	var parentItem = $(this).parent();
    	parentItem.animate({
    		left: "-30%",
    		height: 0,
    		opacity: 0
    	}, 200);
    	setTimeout(function() {
    		$(parentItem).remove();
    	}, 1000);
    });
    // Enter Key detect
    $.fn.enterKey = function(fnc) {
    	return this.each(function() {
    		$(this).keypress(function(ev) {
    			var keycode = (ev.keyCode ? ev.keyCode : ev.which);
    			if (keycode == '13') {
    				fnc.call(this, ev);
    			}
    		})
    	})
    }

    //Load finishTip
    $('.finish').css('display','none');

    setTimeout(function() {
        $('.finish').css('display','block');
    }, 1500);

    $('.finish .close').on('click', function(){
        $('.finish').hide();
    })

    //switch containers
    $('#instructions002, #instructions003').hide();
    $('.instructions001').on('click', function(){
        $('#instructions001').hide();
        $('#instructions002').show();
    });

    $('.instructions002').on('click', function(){
        $('#instructions002').hide();
        $('#instructions003').show();
    });
    $('.instructions002-back').on('click', function(){
        $('#instructions002').hide();
        $('#instructions001').show();
    });

    // $('.instructions003').on('click', function(){
    //     $('#instructions001').hide();
    //     $('#instructions002').show();
    // });
    $('.instructions003-back').on('click', function(){
        $('#instructions003').hide();
        $('#instructions002').show();
    });



    /* A simple and scalable hamburger menu using css transitions. */
    var isActive = false;

    $('.mobileHamburger').on('click', function() {
    	if (isActive) {
    		$(this).removeClass('active');
    		$('body').removeClass('menuOpen');
    	} else {
    		$(this).addClass('active');
    		$('body').addClass('menuOpen');
    	}

    	isActive = !isActive;
    });

//     $('.mobileNav').css('display', 'none');
//     $('.headerWrapper ul').addClass('desktopNav').before('<div class="hamburgerNav">&#9776;</div>');
//     $('.hamburgerNav').on('click', function(){
//         //alert('um hai');
//         $('.headerWrapper ul.mobileNav').toggle();
//     });
// // $(window).resize(function(){
// // 	if ($(window).width() <= 800){
// // 	alert('blaj');
// // 	}
// // });
//
//     if ( $(window).width() < 768) {
//       //alert('blarg');
//       $('.headerWrapper ul').addClass('mobileNav').removeClass('desktopNav')
//         $('.headerWrapper ul.mobileNav > li > a').on('click', function() {
//         alert('hahoo');
//         var checkElement = $(this).next();
//         $('.headerWrapper li').removeClass('active');
//         $(this).closest('li').addClass('active');
//
//         });
//     }
//     else {
//       $('.headerWrapper ul').removeClass('mobileNav')
//     }
});
