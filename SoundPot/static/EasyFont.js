/*

author:saurabh.s.y
email:saurabh3460@gmail.com

need: a server to hide original google font key
*/

$(document).ready(function () {
		$('head').append('<link rel="stylesheet" id="font_link" type="text/css" href="">')
		$('.efont').html('<select id=fontList></select>').css(
			{'position': 'absolute',
			'top':'50%','left':'50%',
			'transform': 'translate(-50%,-50%)'
		});

		var easy_font = {
		url:'https://fonts.googleapis.com/css?family=',
		fonts:[]
		};


		$.ajax('https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyBm35yW6-CHSz_tqD_K3SEsWt6OfNAu_eA',{
			method:'GET',
			success:function (data){
				let i;
				var len = data.items.length;
				for (i=0; i<len; ++i){
					easy_font.fonts.push({[data.items[i].category]: data.items[i].family});
				}
				makeList();// calling
			},
			error:function(err){
				console.log(err,"warning");
			}
		});// end of ajax method


		async function makeList() {
			if (easy_font.fonts.length){
				let i;
				for(i=0; i<easy_font.fonts.length; ++i){
					//use Object.keys() to get dic's keys
					//using Object.values() to get dic's values
					$('#fontList').append(`<option value="${Object.keys(easy_font.fonts[i])[0]},${Object.values(easy_font.fonts[i])[0]}">${Object.values(easy_font.fonts[i])[0]}</option>`);
				}
			}
		};

		$('#fontList').change(function (event) { //change event handler in option widgets
			event.preventDefault();
			category_family = $(this).val().split(',');
			$('#font_link').attr('href',`https://fonts.googleapis.com/css?family=${category_family[1]}`);
			$('[id=change_font]').css({'font-family':`${category_family[1]},${category_family[0]}`});
		});

	});
