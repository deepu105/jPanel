/**
 *****************************************************************************************************************************
 * jPanel.js
 * by Deepu KS deepu.ks@tcs.com
 *
 *
 * Version 1.0 26.09.11
 * Initial Version
 *****************************************************************************************************************************
 * Settings:
 * 
 *  @option cookie 		- true or false @default-false.
 *  					Enable to retain panel state using cookie, by default state is preserved over session to extend over days 
 *  					use @option cExpires to provide no. of days or a date. 
 *  					Note: To use cookies every Div used for panels has to have a unique ID.
 *	@option remoteDiv 	- true or false @default-false. 
 *						Enable to use ajax loading of content into the div from the specified href @attribute, 
 *						if a target @attribute is set then data will be loaded there else data in the actual div will be overwritten.
 *						If a formids @attribute (multiple values separated by comma)is specified then the forms in the page with the id in formids will be serialized and sent as data in the ajax request.
 *						Note: The href @attribute is mandatory for ajax loading to work, provide action name in href, request will be sent as GET,
 *						both target @attribute and formids @attribute are optional. 
 *	@option effect 		- slide, fade or none @default-slide.
 *						Use specified values for animation effect while opening and closing the panel, use none to disable animation
 *						Note: fade effect works only with jQuery version 1.4.4 or greater.
 *	@option speed 		- slow or fast @default-fast.
 *						Use to specify animation speed
 *	@option easing 		- none,swing or linear @default-none.
 *						Use to specify animation easing)
 *  @option cExpires 	- Either an integer specifying the expiration date for cookies from now on in days or a Date object @default-null.
 *             			If a negative value is specified (e.g. a date in the past), the cookie will be deleted.
 *             			If set to null or omitted, the cookie will be a session cookie and will not be retained when the the browser exits. 
 ******************************************************************************************************************************
 *  jQuery UI styles are applied by default, to change theme change jQuery UI theme or define custom styles
 ******************************************************************************************************************************/
(function( $ ){

	  $.fn.jPanel = function( options ) {  

	    var settings = {
	      'cookie'		: false,
	      'remoteDiv'	: false,
	      'effect'		: 'slide',
	      'speed'		: 'fast',
	      'easing'		: '',
	      'cExpires'    : null
	    };

	    return this.each(function() {        
	      // If options exist, merging them with the default settings
	      if ( options ) { 
	        $.extend( settings, options );
	        settings.cookie=(settings.cookie=='true' || settings.cookie==true)? true:false;
	        settings.remoteDiv=(settings.remoteDiv=='true' || settings.remoteDiv==true)? true:false;
	        settings.speed=(settings.speed=='slow')? settings.speed:'fast';
	        settings.easing=(settings.easing=='swing' || settings.easing=='linear')? settings.easing:'';
	      }

	      ConstructPanel(this,settings);
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
		$("<h3 id='"+parent.attr("id")+"Title' class='head ui-widget-header ui-helper-reset  ui-corner-all'><span class='ui-icon ui-icon-circle-plus leftIcon'></span><a href='#' class='nlink' tabindex='-1'>" + parent.attr("title") + "</a></h3>").prependTo(parent);
	else
		$("<h3 class='head ui-widget-header ui-helper-reset  ui-corner-all'><span class='ui-icon ui-icon-circle-plus leftIcon'></span><a href='#' class='nlink' tabindex='-1'>" + parent.attr("title") + "</a></h3>").prependTo(parent);

    
    // Assign a call to CollapseOnClick for the click event of the new title header.
    $(".head", parent).click(function() {
    	var plusIcon = 'ui-icon-circle-plus';
    	var minusIcon = 'ui-icon-circle-minus';
    	var head=$(this);
    	var load=false;
        // The item clicked is the title header... get next element and toggle the content within it.
		var $icon = head.children('.ui-icon');
		if(settings.effect=='slide')
			head.next().slideToggle(settings.speed,settings.easing);
		else if(settings.effect=='fade')
			head.next().fadeToggle(settings.speed,settings.easing);
		else head.next().toggle();
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
			loadRemoteContent(head	);
		}

		return this;
    }).next().hide();
}
 
function loadRemoteContent(head){
	
	var parent=head.parent();
	if(parent && parent.attr("href")){
		var url=parent.attr("href");
		var target=(parent.attr("target") && $('#'+parent.attr("target")))?$('#'+parent.attr("target")):head.next();
		target.html("<p> Loading content....</p>");
		var formIds=parent.attr("formids")?parent.attr("formids").split(','):null;
		if(formIds){
			url+='?';
			$(formIds).each(function(){
				url+=url.match(/.?[^?&]$/)?'&'+$('#'+this).serialize():$('#'+this).serialize();
			});
		}
		$.ajax({
			  url: url,
			  cache: false,
			  type: "GET",
			  success: function(data){
				  target.html(data);
			  },
			  error: function(data){
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
