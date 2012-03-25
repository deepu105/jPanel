/**
 *****************************************************************************************************************************
 * jPanel v1.2.1
 * by Deepu KS deepu.ks@tcs.com
 * Copyright (c) 2011 Deepu KS
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 * Version 1.2.1 09.10.11
 *****************************************************************************************************************************
 * Settings-Method Options:
 * 
 *	@option effect 		- slide, fade or none @default-slide.
 *						Use specified values for animation effect while opening and closing the panel, use none to disable animation
 *	@option speed 		- slow,medium or fast @default-medium.
 *						Use to specify animation speed.
 *						Note: Has no effect when effect is set to none.
 *	@option easing 		- none,swing or linear @default-none.
 *						Use to specify animation easing.
 *						Note: Has no effect when effect is set to none.
 *  @option cookie 		- true or false @default-false.
 *  					Enable to retain panel state using cookie, by default state is preserved over session to extend over days 
 *  					use @option cExpires to provide no. of days or a date. 
 *  					Note: To use cookies every Div used for panels has to have a unique ID.
 *  @option cExpires 	- Either an integer specifying the expiration date for cookies from now on in days or a Date object @default-null.
 *             			If a negative value is specified (e.g. a date in the past), the cookie will be deleted.
 *             			If set to null or omitted, the cookie will be a session cookie and will not be retained when the the browser exits.
 *             			Note: Has no effect when cookie is set to false.
 *	@option remoteDiv 	- true or false @default-false. 
 *						Enable to use ajax loading of content into the div from the specified href @attribute, 
 *						if a target @attribute is set then data will be loaded there else data in the actual div will be overwritten.
 *						If a formids @attribute (multiple values separated by comma)is specified then the forms in the page with the id in formids will be serialized and sent as data in the ajax request.
 *						Note: The href @attribute is mandatory for ajax loading to work, provide action name in href, request will be sent as GET by default provide @attribute method to specify POST,
 *						method @attribute target @attribute and formids @attribute are optional.
 *  @option ajaxTimeout - Time in milliseconds @default-30000. 
 *  					Set this with a numeric value to override the ajax timeout while loading remote content.
 *  					Note: Has no effect when remoteDiv is set to false.
 ******************************************************************************************************************************
 * Settings- Div Attributes:
 * 
 *	@attribute href/action 	- action or url in same domain @default-none.
 *							Use href or action attibute to provide the url, page or action from where content has to fetched in remoteDiv mode.
 *							Note: This attribute is mandatory for Remote content loading. href will have precedence over action.
 *	@attribute target 		- target element id where the remote content will be loaded @default-inner content of the Panel.
 *							Use to specify a different target than the same Panel.
 *							Note: If target is not specified the inner contents of the panel will be replaced by remote content.
 *	@attribute formids 		- comma separated id's of the forms to serialize @default-none.
 *							Use to specify which form data to be serialized and sent for remote data loading.
 *							Note: All the data will be encoded and sent.
 *  @attribute method 		- GET or POST @default-GET.
 *  						Use to specify a request method type for ajax. 
 *  @attribute id 			- any string @default-none.
 *  						The id for the panel, used as key for cookies.
 *             				Note: It is mandatory for cookies to work.
 *	@attribute title 		- any string @default-none.
 *							The Title to be rendered on the panel.
 ******************************************************************************************************************************
 *  Note:	jQuery UI styles are applied by default, to change theme change jQuery UI theme or define custom styles
 *  		For examples and usage instruction refer readme.txt
 *  		Any container can be used for panel ex: div, form, span etc
 ******************************************************************************************************************************/
(function( $ ){

	  $.fn.jPanel = function( options ) {  

	    var settings = {
	      'effect'		: 'slide',
	      'speed'		: 'medium',
	      'easing'		: '',
	      'cookie'		: false,
	      'cExpires'    : null,
	      'remoteDiv'	: false,
	      'ajaxTimeout' : 30000
	    };

	    return this.each(function() {        
	      // If options exist, merging them with the default settings and validating
	      if ( options ) { 
	        $.extend( settings, options );
	        settings.cookie=(settings.cookie=='true' || settings.cookie==true)? true:false;
	        settings.remoteDiv=(settings.remoteDiv=='true' || settings.remoteDiv==true)? true:false;
	        settings.speed=(settings.speed=='slow' || settings.speed=='fast')? settings.speed:'medium';
	        settings.easing=(settings.easing=='swing' || settings.easing=='linear')? settings.easing:'';
	        settings.ajaxTimeout=(typeof settings.ajaxTimeout === 'number')? settings.ajaxTimeout:30000;
	      }

	      ConstructPanel(this,settings);
	     
	    }).each(function() {  
	    	// If cookie is set true retaining the panel state
	    	if(settings.cookie==true)
	    	  setPanel(this);  
	    	});
	    
	  };
	})( jQuery );



function ConstructPanel(div,settings) {
	var parent=$(div);
	// Wrap the contents of the container within a new div.
	parent.wrapInner("<div class='ui-helper-reset ui-widget-content ui-corner-bottom'></div>");
    
    // Create a new header as the first item within the container. to act as the header
	if(parent.attr("id"))
		$("<h3 id='"+parent.attr("id")+"Title' class='head ui-widget-header ui-state-default ui-helper-reset  ui-corner-all'><span class='ui-icon ui-icon-circle-plus leftIcon'></span><a href='#' class='nlink' tabindex='-1'>" + parent.attr("title") + "</a></h3>").prependTo(parent);
	else
		$("<h3 class='head ui-widget-header ui-helper-reset ui-state-default ui-corner-all'><span class='ui-icon ui-icon-circle-plus leftIcon'></span><a href='#' class='nlink' tabindex='-1'>" + parent.attr("title") + "</a></h3>").prependTo(parent);

    
    // Assign a call for the click event of the new title header.
    $(".head", parent).click(function() {
    	var plusIcon = 'ui-icon-circle-plus';
    	var minusIcon = 'ui-icon-circle-minus';
    	var head=$(this);
    	var load=false;
        // The item clicked is the title header... get next element and toggle the content within it.
		var $icon = head.children('.ui-icon');
		if(settings.effect=='slide')
			head.next().slideToggle(settings.speed,settings.easing);
		else if(settings.effect=='fade'){
			if ($icon.hasClass(plusIcon)) {
				head.next().fadeIn(settings.speed,settings.easing);
			} else if ($icon.hasClass(minusIcon)) {
				head.next().fadeOut(settings.speed,settings.easing);
			}
		}
		else head.next().toggle();
		head.toggleClass('ui-state-active ui-state-default ui-corner-top ui-corner-all');
		if ($icon.hasClass(plusIcon)) {
			load=true;
			$icon.removeClass(plusIcon);
			$icon.addClass(minusIcon);
			if(head.attr("id")!="" && settings.cookie==true)
				setCookie(head.attr("id"), 'open',{expires:settings.cExpires});
		} else if ($icon.hasClass(minusIcon)) {
			load=false;
			$icon.removeClass(minusIcon);
			$icon.addClass(plusIcon);
			if(head.attr("id")!="" && settings.cookie==true)
				setCookie(head.attr("id"), 'close',{expires:settings.cExpires});
		}
		if(load && settings.remoteDiv==true){
			loadRemoteContent(head,settings);
		}

		return this;
    }).hover(
		function () {
		    $(this).addClass("ui-state-hover");
		  },
		  function () {
		    $(this).removeClass("ui-state-hover");
		  }
		).next().hide();
}
 
function loadRemoteContent(head,settings){
	
	var parent=head.parent();
	if(parent && (parent.attr("href") || parent.attr("action"))){
		var url=parent.attr("href")?parent.attr("href"):parent.attr("action");
		var data="";
		var method=parent.attr("method") && parent.attr("method")=='POST' ? 'POST':'GET';
		var target=(parent.attr("target") && $('#'+parent.attr("target")))?$('#'+parent.attr("target")):head.next();
		target.html("<p> Loading content....</p>");
		var formIds=parent.attr("formids")?parent.attr("formids").split(','):null;
		if(formIds){
			$(formIds).each(function(){
				data+=data.match(/.?[^?&]$/)?'&'+$('form#'+this).serialize():$('form#'+this).serialize();
			});
		}
		$.ajax({
			  url: url,
			  data:data,
			  type:method,
			  cache: false,
			  dataType: "html",
			  timeout:settings.ajaxTimeout,
			  success: function(data, textStatus, jqXHR){
				  target.html(data);
			  },
			  error: function(jqXHR, textStatus, errorThrown){
				  target.html("Error loading content, please try again.");
			  }
			});
	}
}
function setPanel(div){
	var cookie=document.cookie;
	var cookieStatus = null;
	if(div.id!=""){
		var headId=div.id+'Title';
		cookieStatus = (getCookie(headId))?getCookie(headId):null;
		if(cookieStatus=='open')
			$('#'+headId).click();
	}
}

function setCookie(key, value, options) {
    
    if (arguments.length > 1 && String(value) !== "[object Object]") {
        options = jQuery.extend({}, options);

        if (value === null || value === undefined) {
            options.expires = -1;
        }

        if (typeof options.expires === 'number') {
            var days = options.expires, t = options.expires = new Date();
            t.setDate(t.getDate() + days);
        }
        
        value = String(value);
        
        return (document.cookie = [
            encodeURIComponent(key), '=',
            options.raw ? value : encodeURIComponent(value),
            options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
            options.path ? '; path=' + options.path : '',
            options.domain ? '; domain=' + options.domain : '',
            options.secure ? '; secure' : ''
        ].join(''));
    }
}

function getCookie(key) {
	options = {};
	var result, decode = options.raw ? function (s) { return s; } : decodeURIComponent;
	return (result = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(document.cookie)) ? decode(result[1]) : null;
}
