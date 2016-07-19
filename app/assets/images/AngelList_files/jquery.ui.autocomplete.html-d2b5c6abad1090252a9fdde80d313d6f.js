/*
 * jQuery UI Autocomplete HTML Extension
 *
 * Copyright 2010, Scott González (http://scottgonzalez.com)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * http://github.com/scottgonzalez/jquery-ui-extensions
 */
!function(t){function e(e,n){var i=new RegExp(t.ui.autocomplete.escapeRegex(n),"i");return t.grep(e,function(e){return i.test(t("<div>").html(e.label||e.value||e).text())})}var n=t.ui.autocomplete.prototype,i=n._initSource;t.extend(n,{_initSource:function(){this.options.html&&t.isArray(this.options.source)?this.source=function(t,n){n(e(this.options.source,t.term))}:i.call(this)},_renderItem:function(e,n){return t("<li></li>").data("item.autocomplete",n).append(t("<a></a>")[this.options.html?"html":"text"](n.label)).appendTo(e)}})}(jQuery);