                                                                                                                              
   jPanel
   jPanel.js
   by Deepu KS deepu.ks@tcs.com
  
   Version 1.0 26.09.11
   Initial Version
                                                                                                                              
  	jPanel is a jQuery plugin/extension allowing you to create collapsible content panels from a simple div markup.
  	
  	jPanel also supports features like remote content loading and state maintanance using cookies
  	
  	Optional Features:
  	    collapse with effects like fade,slide
  	    control over effect easing & speed
  	    cookie based state retention
  	    control cookie expiry
  	    Remote ajax based content loading
  	    cross domain remote content loading
  	    
  
                                                                                                                              
   Settings:
   
    @option cookie 		- true or false @default-false.
    					Enable to retain panel state using cookie, by default state is preserved over session to extend over days 
    					use @option cExpires to provide no. of days or a date. 
    					Note: To use cookies every Div used for panels has to have a unique ID;
  	@option remoteDiv 	- true or false @default-false. 
  						Enable to use ajax loading of content into the div from the specified href @attribute, 
  						if a target @attribute is set then data will be loaded there else data in the actual div will be overwritten.
  						If a formids @attribute (multiple values separated by comma)is specified then the forms in the page with the id in formids will be serialized and sent as data in the ajax request.
  						Note: The href @attribute is mandatory for ajax loading to work, provide action name in href, request will be sent as GET,
  						both target @attribute and formids @attribute are optional. 
  	@option effect 		- slide, fade or none @default-slide.
  						Use specified values for animation effect while opening and closing the panel, use none to disable animation
  						Note: fade effect works only with jQuery version 1.4.4 or greater.
  	@option speed 		- slow or fast @default-fast.
  						Use to specify animation speed
  	@option easing 		- none,swing or linear @default-none.
  						Use to specify animation easing)
    @option cExpires 	- Either an integer specifying the expiration date for cookies from now on in days or a Date object @default-null.
               			If a negative value is specified (e.g. a date in the past), the cookie will be deleted.
               			If set to null or omitted, the cookie will be a session cookie and will not be retained when the the browser exits. 
                                                                                                                               
   Note: jQuery UI styles are applied by default, to change theme change jQuery UI theme or define custom styles in jPanel.css
                                                                                                                               
   Example & usage  
   HTML markup: Panel with local content
   <div class="jPanel" title="Panel" id="Panel">
   		Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut 
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat
   </div>
  
   HTML markup: Panel with remote content
   <div class="jPanel" title="Panel" id="Panel" href="test.action">
   		Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut 
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat
   </div>
  
   HTML markup: Panel with remote content and formids
   <div class="jPanel" title="Panel" id="Panel" href="test.action" formids="form1,form2">
   		Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut 
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat
   </div>
     HTML markup: Panel with remote content, target and formids   <div class="jPanel" title="Panel1" id="Panel1" href="test.action" target="target1" formids="form1,form2">   		Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut 
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat   		<div id="target1"></div>   </div>  
   HTML markup: Panel with inner panel as content
   <div class="jPanel" title="Panel" id="Panel">
   		Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut 
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat
  	   <div class="jPanel" title="InnerPanel" id="InnerPanel">
  	   	   Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut 
   	   	   labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat
  	   </div>
   </div>
  
   JS markup: Panel with local content and default settings
   <script type="text/javascript">
      
      $(document).ready(function(){
      		$('.jPanel').jPanel();
      });
   
    </script>
    
   JS markup: Panel with local content and state retention turned on
   <script type="text/javascript">
      
      $(document).ready(function(){
      	$('.jPanel').jPanel({
    		  'cookie'		: true,
    	      'cExpires'    : 2
    		});
      });
   
    </script>
    
   JS markup: Panel with custom effects 
   <script type="text/javascript">
      
      $(document).ready(function(){
      	$('.jPanel').jPanel({
    		  'effect'		: 'fade',
    	      'speed'		: 'slow',
    	      'easing'		: 'swing'
    		});
      });
   
    </script>
    
   JS markup: Panel with remote content turned on
   <script type="text/javascript">
      
      $(document).ready(function(){
      	$('.jPanel').jPanel({
    		  'remoteDiv'	: true
    		});
      });
   
    </script>
    
   JS markup: Panel with all options set
   <script type="text/javascript">
      
      $(document).ready(function(){
      	$('.jPanel').jPanel({
    		'cookie'	: true,
  	      	'remoteDiv'	: true,
  	      	'effect'	: 'slide',
  	      	'speed'		: 'fast',
  	      	'easing'	: 'linear',
  	      	'cExpires'  : 7
      	});
      });
       </script>