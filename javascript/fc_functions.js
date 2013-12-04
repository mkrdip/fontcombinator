$(document).ready(function () {
	$('html').removeClass('no-js');

	//allows the parsing of the URL parameters
	$.extend({
	  getUrlVars: function(){
	    var vars = [], hash;
	    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
	    for(var i = 0; i < hashes.length; i++)
	    {
	      hash = hashes[i].split('=');
	      vars.push(hash[0]);
	      vars[hash[0]] = hash[1];
	    }
	    return vars;
	  },
	  getUrlVar: function(name){
	    return $.getUrlVars()[name];
	  }
	});


	function config() {
		//globals that are used throughout
		targets = '#h1_select, #h2_select, #p_select';
		defaultVarients = "#h1_variant, #h2_variant, #p_variant";

		//if the URL has parameters
		if(window.location.href.indexOf('?') !== -1){
			var h1Name = $.getUrlVar('h1').replace(/\+/g,' ');
			var h2Name = $.getUrlVar('h2').replace(/\+/g,' ');
			var pName = $.getUrlVar('p').replace(/\+/g,' ');

			defaultFonts = [];

			defaultFonts["h1"] = h1Name;
			defaultFonts["h2"] = h2Name;
			defaultFonts["p"] = pName;

		} else {

			defaultFonts = [];

			defaultFonts["h1"] = 'Merriweather';
			defaultFonts["h2"] = 'Source Sans Pro';
			defaultFonts["p"] = 'Source Sans Pro';
		}

		delay = 2000;  //delay used throughout the interface
	}

	config();


	function parameterFonts(fontList) {
		if(window.location.href.indexOf('?') !== -1){

			var h1fontName = $.getUrlVar('h1').replace('+',' ');
			var h2fontName = $.getUrlVar('h2').replace('+',' ');
			var pfontName = $.getUrlVar('p').replace('+',' ');

			//checks to see if variant parameters exist, then set those as variables
			if ($.getUrlVar('h1v')){
				var h1VarName = $.getUrlVar('h1v').replace('+',' ');
			} else {
				var h1VarName = '400';
			}
			if($.getUrlVar('h2v')){
				var h2VarName = $.getUrlVar('h2v').replace('+',' ');
			} else {
				var h2VarName = '400';
			}
			if($.getUrlVar('pv')){
				var pVarName = $.getUrlVar('pv').replace('+',' ');
			} else {
				var pVarName = '400';
			}

			for (var i=0; i < fontList.length; i++) {
				var variants = fontList[i].variants;

				//yes, this if statement is long, hairy, ugly and repetitious
				if(fontList[i].family === h1fontName && fontList[i].family === h2fontName && fontList[i].family === pfontName && variants.length > 1) {
					//console.log('all three fonts are the same, and it has more than one variant');
					elem = new Array ('h1','h2','p');
					selectedVariants = new Array (h1VarName, h2VarName, pVarName);
					variantSelectAttach(elem, variants, selectedVariants);
				} else if(fontList[i].family === h1fontName && fontList[i].family === h2fontName && variants.length > 1) {
					//console.log('the headers have the same font, and it has more than one variant');
					elem = new Array ('h1','h2');
					selectedVariants = new Array (h1VarName, h2VarName);
					variantSelectAttach(elem, variants, selectedVariants);
				} else if(fontList[i].family === h1fontName && fontList[i].family === pfontName && variants.length > 1) {
					//console.log('the h1 and p have the same font has more than one variant');
					elem = new Array ('h1','p');
					selectedVariants = new Array (h1VarName, pVarName);
					variantSelectAttach(elem, variants, selectedVariants);
				} else if(fontList[i].family === h2fontName && fontList[i].family === pfontName && variants.length > 1) {
					//console.log('the h2 and p have the same font has more than one variant');
					elem = new Array ('h2','p');
					selectedVariants = new Array (h2VarName, pVarName);
					variantSelectAttach(elem, variants, selectedVariants);
				} else if(fontList[i].family === h1fontName && variants.length > 1) {
					//console.log('this h1 font has more than one variant');
					elem = new Array ('h1');
					selectedVariants = new Array (h1VarName);
					variantSelectAttach(elem, variants, selectedVariants);
				} else if(fontList[i].family === h2fontName && variants.length > 1) {
					//console.log('this h2 font has more than one variant');
					elem = new Array ('h2');
					selectedVariants = new Array (h2VarName);
					variantSelectAttach(elem, variants, selectedVariants);
				} else if(fontList[i].family === pfontName && variants.length > 1) {
					//console.log('this p font has more than one variant');
					elem = new Array ('p');
					selectedVariants = new Array (pVarName);
					variantSelectAttach(elem, variants, selectedVariants);
				}
			}
		}
	}

	function variantSelectAttach(elem, variants, selectedVariants){
		for (var i=0; i < elem.length; i++) {
			//console.log(elem[i]);
			$('<select class="variant_select" id="'+ elem[i] +'_variant" name="'+ elem[i] +'v"><select>').insertAfter('#' + elem[i] + '_select_chzn');
			for (var j=0; j < variants.length; j++) {
				//console.log(variants[j]);
				var variantName = variants[j].replace('italic',' italic');
				//special handling of variants results
				if(variantName === 'regular') {
					$('<option value="400">400</option>').appendTo('#' + elem[i] +'_variant');
				} else if (variantName === '400') {
					$('<option value="'+variantName+'">'+variantName+'</option>').appendTo('#' + elem[i] +'_variant');
				} else if (variantName === ' italic') {
					$('<option value="400 italic">400 italic</option>').appendTo('#' + elem[i] +'_variant');
				} else {
					$('<option value="'+variantName+'">'+variantName+'</option>').appendTo('#' + elem[i] +'_variant');
				}
			}
			//based on the passed selected value, load the proper option as selected
			$('#'+elem[i]+'_variant option').each(function(){
				if($(this).val() === selectedVariants[i]){
					$(this).attr('selected','selected');
				}
			});
		};
		$('.variant_select').chosen();
		//formatting of the dropdown options when loaded
		for (var i=0; i < elem.length; i++) {
			$('#' + elem[i] + '_variant_chzn li, #' + elem[i] + '_variant_chzn span').each(function() {
				$(this).css('font-family', defaultFonts[elem[i]]);
				if($(this).html().indexOf('italic') === -1) {
					$(this).css('font-weight', $(this).html());
				} else {
					$(this).css('font-weight', $(this).html().split(' italic')[0]).css('font-style','italic');
				}
			});
			$('#' + elem[i] + '_variant_chzn').css({'font-family':defaultFonts[elem[i]], 'min-width':'110px'});
			$('#' + elem[i] + '_variant_chzn div.chzn-drop').css('width', '105px');
			$('#' + elem[i] + '_variant_chzn').find('input').css('width', '53px');

		}
	}


	// font calls and option set up
	function getFonts(fontList) {
		//removing default variants from DOM when Google responds
		$(defaultVarients).remove();
		var base = "http://fonts.googleapis.com/css?family=";
		var defaultList = $('#h1_select').children();
		$(targets).empty();

		for (var i=0, j = fontList.length; i < j; i+=1) {
			//this tool is for latin fonts only so far - sorry, Cyrillic and Greek
			if(fontList[i].subsets.indexOf('latin') !== -1) {
				var fontName = fontList[i].family;
				var fontCallName = fontList[i].family.replace(/\s+/g, '+');
				var fontNameLetters = fontList[i].family.replace(/\s+/g, '');
				$(targets).append('<option value="'+ fontName +'">'+ fontName +'</option>');
				//this adds the stylesheet link to Google Web Fonts, but with only the font's name as a subset of characters, for performance
				//but first, some special handling of fonts that don't have a 400 weight
				if(fontName === 'Buda' || fontName === 'Open Sans Condensed'){
					$('<link rel="stylesheet" href="' + base + fontCallName +':300&subset=latin&text=' + fontNameLetters +'"  type="text/css" />').prependTo('head');
				} else if(fontName === 'Coda Caption' || fontName === 'Sniglet'){
					$('<link rel="stylesheet" href="' + base + fontCallName +':800&subset=latin&text=' + fontNameLetters +'"  type="text/css" />').prependTo('head');
				} else if(fontName === 'UnifrakturCook'){
					$('<link rel="stylesheet" href="' + base + fontCallName +':700&subset=latin&text=' + fontNameLetters +'"  type="text/css" />').prependTo('head');
				} else if(fontName === 'Molle'){
					$('<link rel="stylesheet" href="' + base + fontCallName +':400italic&subset=latin&text=' + fontNameLetters +'"  type="text/css" />').prependTo('head');
				} else {
					$('<link rel="stylesheet" href="' + base + fontCallName +'&subset=latin&text=' + fontNameLetters +'"  type="text/css" />').prependTo('head');
				}


			}
		}

		//readding the default font list so it appears at the end of the <select> and everything is ordered properly
		$(targets).append('<option>* System Fonts *</option>');
		$(targets).append(defaultList);
		$('#h1_select option[selected], #h2_select option[selected], #p_select option[selected]').removeAttr('selected');
		$('#h1_select option[value="'+defaultFonts["h1"]+'"]').attr("selected", "selected");
		$('#h2_select option[value="'+defaultFonts["h2"]+'"]').attr("selected", "selected");
		$('#p_select option[value="'+defaultFonts["p"]+'"]').attr("selected", "selected");
		chosenAttach();
		$('#h1_select_chzn .chzn-single').css('font-family', defaultFonts["h1"]);
		$('#h2_select_chzn .chzn-single').css('font-family', defaultFonts["h2"]);
		$('#p_select_chzn .chzn-single').css('font-family', defaultFonts["p"]);

	}

	//bit_url function
	function bit_url(url){
		var url=url;

		var username="o_215vaovdst"; // bit.ly username
		var key="R_3a7d26b08ca81030043112b029d05978";
		$.ajax({
			url:"http://api.bit.ly/v3/shorten",
			data:{longUrl:url,apiKey:key,login:username},
			dataType:"jsonp",
			success:function(v)	{
				var bit_url=v.data.url;
				$('<p id="share_text_short_intro">Or use the shortened URL:</p><input type="text" id="share_text_short" />').insertAfter('#share_text');
				$('#share_text_short').val(bit_url);
				focusShareTextShort();
			}
		});
	}

	function focusShareTextShort(){
		$('#share_text_short').on('click',function(){
			$(this).select();
		});
	}
	// modifying the submit button when JS is present
	$('#submit').hide();

	//attaching the share link via JS, 'cause it only works with JS
	$('<li><a href="#share" id="share_link">Share!</a></li>').prependTo('#panel_nav');

	//adding a sharing panel
	$('<section id="share" class="panel"><h1>Share Your Combination</h1><p>Copy out the URL below to send to someone else:</p><textarea id="share_text"></textarea></section>').insertAfter('#change-log');

	$('#share_link').on('click', function(){
		_gaq.push(['_trackEvent','Share Tab','Clicked']);
		$('#share_text_short, #share_text_short_intro').remove();
		var base = "http://font-combinator.com/?"
		var str = $('#controls').serialize();
		var url = base + str;
		$('#share_text').html(url);
		bit_url(url);
		return false;
	});

	// $('#share_text').on('click',function(){
	// 	$(this).selectText();
	// });

	jQuery.fn.selectText = function(){
	    var doc = document;
	    var element = this[0];

	    if (doc.body.createTextRange) {
	        var range = document.body.createTextRange();
	        range.moveToElementText(element);
	        range.select();
	    } else if (window.getSelection) {
	        var selection = window.getSelection();
	        var range = document.createRange();
	        range.selectNodeContents(element);
	        selection.removeAllRanges();
	        selection.addRange(range);
	    }
	};



	$('<div class="element"> <label for="control_option">Element:</label> <select name="control_option" id="control_option"> <option value="h1">Headline (H1)</option> <option value="h2">Subhead (H2)</option> <option value="p">Body text (p)</option> <option value="bg">Background</option> </select> </div>').prependTo('#controls');

	function changeFonts(fontList) {

		$(targets).change(function() {
			var base = "http://fonts.googleapis.com/css?family=";
			var fontName = $(this).val();

			//handy way to target the right element based on which select changed
			var elem = $(this).attr('id').split('_select')[0];

			$(elem).css({'font-style':'normal','font-weight':'400'});
			//gets rid of any variant drop down added previously
			$(this).siblings('.variant_select').remove();
			$('#'+ elem + '_variant_chzn').remove();
			_gaq.push(['_trackEvent','Font Choice', elem, fontName]);

			//this for loop adding variants based on which font is selected
			for (var i=0; i < fontList.length; i++) {
				var variants = fontList[i].variants;
				var fontNameLoad = fontName.replace(/\s+/g, '+');
				//checking to see if the selected font has more than one variant
				if(fontList[i].family === fontName && variants.length > 1) {
					var variantCall = variants.toString();
					//adding stylesheet call with all variants
					$('head link').each(function(){
						var thisHref = $(this).attr('href');
	                	if(thisHref.indexOf(fontNameLoad) !== -1 && thisHref.split('&subset')[0].split('?family=')[1] === fontNameLoad){
	                     	$(this).attr('href', base + fontNameLoad + ':' + variantCall + '&subset=latin');
						}
	                });
					//$('<link rel="stylesheet" href="' + base + fontName.replace(/\s+/g, '+') +':' + variantCall + '&subset=latin" type="text/css" />').prependTo('head');
					//create a drop down menu
					$('<select class="variant_select" id="'+ elem +'_variant" name="'+ elem +'v"><select>').insertAfter('#' +elem + '_select_chzn');
					for (var j=0; j < variants.length; j++) {
						var variantName = variants[j].replace('italic',' italic');
						//special handling of variants results
						if(variantName === 'regular') {
							$('<option value="400" selected>400</option>').appendTo('#' + elem +'_variant');
						} else if (variantName === '400') {
							$('<option value="'+variantName+'" selected>'+variantName+'</option>').appendTo('#' + elem +'_variant');
						} else if (variantName === ' italic') {
							$('<option value="400 italic">400 italic</option>').appendTo('#' + elem +'_variant');
						} else {
							$('<option value="'+variantName+'">'+variantName+'</option>').appendTo('#' + elem +'_variant');
						}

					}

					$(elem).css('font-family', fontName).css('font-weight', '400');
					//get the chosen drop down to take on the css style
					$("#" + elem + "_select_chzn .chzn-single").css('font-family', fontName);

					$('.variant_select').chosen();


					$('#' + elem + '_variant_chzn li').each(function() {
						$(this).css('font-family', fontName);
						if($(this).html().indexOf('italic') === -1) {
							$(this).css('font-weight', $(this).html());
						} else {
							$(this).css('font-weight', $(this).html().split(' italic')[0]).css('font-style','italic');
						}
					});
					$('#' + elem + '_variant_chzn').css({'font-family':fontName, 'min-width':'90px'});
					$('#' + elem + '_variant_chzn div.chzn-drop').css('width', '88px');
					$('#' + elem + '_variant_chzn').find('input').css('width', '53px');

					return false;  //had to throw this in to stop infinite loop
				} else if(fontList[i].family === fontName) {
					//do something else when there is only one variant
					//adding plain stylesheet call w/ no variant addendum
					//$("<link rel='stylesheet' href='" + base + fontName.replace(/\s+/g, '+') +"&subset=latin' type='text/css'/>").prependTo('head');
					$('head link').each(function(){
						var thisHref = $(this).attr('href');
	                   if(thisHref.indexOf(fontNameLoad) !== -1 && thisHref.split('&subset')[0].split('?family=')[1] === fontNameLoad){
	                     //console.log('there is a match and it is ' + fontNameLoad);
	                     $(this).attr('href', $(this).attr('href').split('&text=')[0]);
	                   }
	                });
					//$('head style').after("<link rel='stylesheet' href='" + base + fontName.replace(/\s+/g, '+') +"&subset=latin' type='text/css' />");
					//get the chosen drop down to take on the css style
					$("#" + elem + "_select_chzn .chzn-single").css('font-family', fontName);
				}
			} //end of variant for loop

			//system fonts
			if(fontName === 'Arial'|| fontName === 'Garamond' || fontName === 'Georgia'|| fontName === 'Helvetica' || fontName === 'Lucida Grande'|| fontName === 'Palatino' || fontName === 'Tahoma'|| fontName === 'Times New Roman' || fontName === 'Trebuchet MS'|| fontName === 'Verdana') {
				$("#" + elem + "_select_chzn .chzn-single").css('font-family', fontName);
				$('<select class="variant_select" id="'+ elem +'_variant" name="'+ elem +'v"><option value="400" selected>400</option><option value="400 italic">400 italic</option><option value="bold">Bold</option><option value="bold italic">Bold italic</option><select>').insertAfter('#' +elem + '_select_chzn');
				$('#' + elem + '_variant').chosen();
				$('#' + elem + '_variant_chzn').css({'font-family':fontName, 'min-width':'110px'});
				$('#' + elem + '_variant_chzn div.chzn-drop').css('width', '105px');
				$('#' + elem + '_variant_chzn').find('input').css('width', '53px');

				$('#' + elem + '_variant_chzn li').each(function() {
				$(this).css('font-family', fontName);
				if($(this).html().indexOf('italic') === -1) {
					$(this).css('font-weight', $(this).html());
				} else {
					$(this).css('font-weight', $(this).html().split(' italic')[0]).css('font-style','italic');
				}
				});
			}

			//actually, you know, change fonts
			$(elem).css('font-family', fontName);

		});// end of targets change
		chosenAttach();
	}  //end of function changeFonts


	function chosenAttach() {
		$(targets).chosen();
		$(defaultVarients).chosen();
		$('.chzn-container').css('width','180px');
		$('#h1_select_chzn .active-result, #h2_select_chzn .active-result, #p_select_chzn .active-result').each(function() {
			$(this).css('font-family', $(this).html());
		});
		$('.chzn-search input').css('width','72%');
		$('#control_option').chosen();
		$('#control_option_chzn').css('width','90%');
		$('#control_option_chzn .chzn-drop').css('width', '100%');
		$('#control_option_chzn .chzn-search').remove();
	}

	//this function fires in the event Google Fonts is not available
	function defaultFontChange() {

		$(targets).change(function() {
			var fontName = $(this).val();

			//handy way to target the right element based on which select changed
			var elem = $(this).attr('id').split('_select')[0];
			$(elem).css('font-family', fontName);

		});
		chosenAttach();
	}

	function variantChange() {
		$('body').on('change','.variant_select',function() {
			var elem = $(this).attr('id').split('_variant')[0];
			var variant = $(this).val();
			if(variant.indexOf(' italic') === -1) {
				$(elem).css('font-weight', variant).css('font-style','normal');
				$('#' + elem + '_variant_chzn .chzn-single').css('font-weight', variant).css('font-style','normal');
			} else {

				$(elem).css('font-weight', variant.replace(' italic',''));
				$(elem).css('font-style','italic');
				$('#' + elem + '_variant_chzn .chzn-single').css({'font-weight': variant.replace(' italic',''), 'font-style': 'italic'});
			}

		}); //end of variant_select change

	}
	variantChange();



	//fontsize change

	$('#h1size, #h2size, #psize').on('change', function() {
		var elem = $(this).attr('id').split('size')[0];
		var value = $(this).val();
		$(elem).css('font-size', value + 'px');
		$(this).next('span.value').text(value);
	});

	//line-height change

	$('#h1lh, #h2lh, #plh').on('change', function() {
		var elem = $(this).attr('id').split('lh')[0];
		var value = parseFloat($(this).val()).toFixed(2); // keeps the range to ouptuting two decimal places
		$(elem).css('line-height', $(this).val());
		$(this).next('span.value').text(value);
	});

	function colorChange(){
		//first check to see if the viewport is greater than 768 - because the color picker functions awkwardly at smaller sizes
		if($('body').width() > 768){

		$('#h1color, #h2color, #pcolor').ColorPicker({
			onShow: function() {
				thisEl = $(this).attr('id');
				thisElem = thisEl.split('color')[0];
			},
			onChange: function(hsb, hex, rgb, el) {
				$('#' + thisEl).val(hex);
				$(el).ColorPickerHide();
				$('.panel ' + thisElem).css('color', '#'+hex);
			},
			onBeforeShow: function () {
				$(this).ColorPickerSetColor(this.value);
			}
		})
		.bind('keyup', function() {
			$(this).ColorPickerSetColor(this.value);
		});

		$('#bgcolor').ColorPicker({
			onShow: function() {
				thisEl = $(this).attr('id');
			},
			onChange: function(hsb, hex, rgb, el) {
				$('#' + thisEl).val(hex);
				$(el).ColorPickerHide();
				$('#wrapper').css('background-color', '#'+hex);
			},
			onBeforeShow: function () {
				$(this).ColorPickerSetColor(this.value);
			}
		})
		.bind('keyup', function() {
			$(this).ColorPickerSetColor(this.value);
		});
		} else if($('body').width() <= 768){
			//TODO: get this working for small screens - this is supposed to change on manual input
			$('#h1color, #h2color, #pcolor').on('change',function(){
				thisVal = $(this).val();
				thisEl = $(this).attr('id');
				thisElem = thisEl.split('color')[0];
				$(thisElem).css('color', '#'+ $(this).val());
			});

		}

	}
	colorChange();

	$('#h1_hide, #h2_hide, #p_hide').on('click',function() {
			var elem = $(this).attr('id').split('_hide')[0];
			if($(this).val() === "Hide") {
				$(elem).not('footer p').fadeOut('slow');
				$(this).val('Show');
			} else {
				$(elem).fadeIn('slow');
				$(this).val('Hide');
			}
	});


	$('body').attr('spellcheck',false); //because of firefox's spellcheck, which has a nasty red underline

	$('#control_option').on('change',function() {
		var control = $(this).val();
		var controlId = '#' + control + '_sec';
		if(control === 'all') {
			$('.control').each(function() {
				$(this).fadeIn();
			});
		}else if(!($(controlId).hasClass('active'))) {
			$('.control.active').fadeOut('fast', function() {
				$('.control.active').removeClass('active');
				$(controlId).fadeIn('fast', function() {
					$(this).addClass('active');
					$('#h1_select_chzn, #h2_select_chzn, #p_select_chzn, .chzn-drop').css('width','180px');
				});
			});

		}
	});


	//panel navigation
	function carouselNav(targetId,activeClass,changingContentClass,speed) {
		$(targetId + ' a').click(function() {
			var link = $(this).attr('href');
			var clickLink = $(this);
			if($(this).hasClass(activeClass)) {
				//do nothing
			} else {
				$('.'+changingContentClass+'.'+activeClass).fadeOut(speed, function() {
					var color = $('.here').css('backgroundColor');
					$('.'+activeClass).removeClass(activeClass);
					$(clickLink).addClass(activeClass);
					$(link).fadeIn(speed, function() {
						$(this).addClass(activeClass);
					});
				});
				//call back functions go here
			}
			return false;
		});
	}

	carouselNav('#panel_nav','here','panel','normal');

	function externalLinks() {
		if (!document.getElementsByTagName) return;
		var anchors = document.getElementsByTagName("a");
		for (var i=0; i<anchors.length; i++) {
			var anchor = anchors[i];
			if (anchor.getAttribute("href") &&
				anchor.getAttribute("rel") === "external") {
					anchor.target = "_blank";
				}
		}
	}
	externalLinks();


	var req = $.ajax({
	    url: 'https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyAc3a2WfPaSbA1B25u78zFQRfAide8T34c&sort=alpha&sort=desc',
	    dataType : "jsonp",
	    timeout : 4000,
		success: onJson
	});

	req.error(function() {
		$('<h2 class="warning">I&rsquo;m sorry, but we can&rsquo;t seem to reach Google Fonts.</h2>').prependTo('#font-combinator').delay(delay).fadeOut('slow');
		defaultFontChange();
	});


	// ajax success function
	function onJson(data) {
		if (data.kind === "webfonts#webfontList") {
			getFonts(data.items);
			changeFonts(data.items);
			parameterFonts(data.items);
		} else {
			noLove();
		}
	}
	//allows users to click on an element and have the relevant control appear
	$('#content_main h1, #content_main h2, #p_text p').on('click',function(){
		var elem = this.nodeName.toLowerCase();
		var controlId = '#' + elem + '_sec';
		if(!($(controlId).hasClass('active'))) {
			$('.control.active').fadeOut('fast', function() {
				$('.control.active').removeClass('active');
				$(controlId).fadeIn('fast', function() {
					$(this).addClass('active');
					$('#h1_select_chzn, #h2_select_chzn, #p_select_chzn, .chzn-drop').css('width','180px');
				});
			});
			$('#control_option_chzn').fadeOut('fast', function(){
				if(elem === 'h1'){
					$('#control_option_chzn .chzn-single span').text('Headline (H1)');
				} else if(elem === 'h2'){
					$('#control_option_chzn .chzn-single span').text('Subhead (H2)');
				} else if(elem === 'p'){
					$('#control_option_chzn .chzn-single span').text('Body text (p)');
				}
			});
			$('#control_option_chzn').fadeIn('fast');
		}
	});

});




// TODO:


// - STYLE - nice design this time, k?
// - add background texture additions
// - add bookmarkable string

