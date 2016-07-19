/**
 * Cookie plugin
 *
 * Copyright (c) 2006 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */
function replaceAll(t,e,n,i){if(!t)return t;var r=i?t.toLowerCase():t,o=i?e.toLowerCase():e;if(-1==r.indexOf(o))return t;if(r==o)return n;for(var a="",s=0;s<r.length;s++)s<=r.length-o.length&&r.substr(s,o.length)==o?(a=a.concat(n),s+=o.length-1):a=a.concat(t.charAt(s));return a}function textCounter(){var t=$("#"+$(this).attr("id")+"_counter");if(0!=t.length){var e=parseInt(t.attr("class").match(/max_(\d+)/)[1]);$(this).on("visible keyup keydown change paste focus textCounter",function(){t.find("span.character_count").html($(this).val().length),t.toggleClass("error",$(this).val().length>e)}),$(this).trigger("textCounter")}}function initPage(){"undefined"!=typeof jQuery.facybox&&jQuery("a[rel*=facybox]").each(function(){$(this).data("facybox-initialized")||($(this).facybox({modal:!0}),$(this).data("facybox-initialized",!0))}),$(document).on("click",".hidden_more",function(){$(this).siblings(".hidden").show(),$(this).siblings(".elipses").hide(),$(this).remove()})}function toggle_id(t){$("#"+t).toggle(),$("#more_"+t).html("")}function selector_refresh(){$(".selector_single_item").each(function(){if($(this).attr("class").indexOf("disabled")<0){var t=$(this).attr("item_id");Selector[t]?($(this).prop("checked",!0),$(this).text("Unselect"),$(this).addClass("alternate")):($(this).prop("checked",!1),$(this).text("Select"),$(this).removeClass("alternate"))}})}function decrease_count(t){count=$("#"+t).text(),"undefined"!=typeof count&&0==count.indexOf("(")&&(count=count.substr(1,count.length-2),count--,$("#"+t).text(count>0?"("+count+")":""))}function load_request(t){load_request_thread_id++;var e=load_request_thread_id;t.secondary_id&&""!=t.secondary_id&&($("#"+t.secondary_id).attr("disabled",!0),$("#"+t.secondary_id).find("input").attr("disabled",!0)),$("#"+t.object_id).fadeTo(100,.5);var n="post",i=parse_include_ids_from_url(t.url),r=i.include_ids;t.url=i.url;var o=decodeURIComponent(t.url).split("?"),a=$.parseQuery(o[o.length-1]);a.skip_loading=!0,a.include_ids=r,$("div#url_for").attr("url",decodeURIComponent($.param(a))),$.ajax({url:t.loading_method,data:a,type:n,dataType:"json",success:function(n){n.html&&load_request_thread_id==e&&($("#"+t.object_id).html(n.html),load_request_callback(t))}})}function load_request_callback(options){options.secondary_id&&""!=options.secondary_id&&($("#"+options.secondary_id).attr("disabled",!1),$("#"+options.secondary_id).find("input").attr("disabled",!1)),options.alt_method?eval(options.alt_method):"undefined"!=typeof load_request_global_callback&&eval(load_request_global_callback),options.callback&&options.callback();var parsed_url=decodeURIComponent(options.url.replace(window.location.pathname+"?",""));options.loading_method&&(parsed_url=parsed_url.replace(options.loading_method+"?",""));var q=$.parseQuery(parsed_url);options.url.match(/AL_/)&&(q.render_tags=1),delete q.per_page;var link_url=window.location.pathname+($.isEmptyObject(q)?"":"?"+$.param(q));$("#page_link").attr("href",link_url),$("#"+options.object_id).fadeTo(100,1),TipTip.init(),selector_refresh()}function parse_include_ids_from_url(t){var e="",n=$.parseQuery(t.replace(window.location.pathname+"?",""));return n.include_ids&&(e=n.include_ids,delete n.include_ids),{include_ids:e,url:window.location.pathname+"?"+$.param(n)}}function Messages(){return self}function open_notification_popup(t,e,n,i,r){"undefined"!=typeof event?event.stopPropagation():jQuery.Event("click").stopPropagation();var o=document.getElementById(t+"_main"),a=document.getElementById(t+"_close"),s=document.getElementById(t+"_content"),l=document.getElementById(t+"_title");if($.facybox.settings.opacity=0,$.facybox.loading(),"undefined"==typeof r)$.ajax({url:"/"+e,data:n,type:"post",dataType:"json",success:function(t){var e=$(o);$.facybox.reveal(e,e.parent()),facybox_borders(!1),$(s).html(t.html),$(l).html(t.title),$(l).show(),require(["qtip"],function(){$(".tiptip").qtip({show:{delay:0},defaultPosition:"top"})})}});else{var c=$(o);$.facybox.reveal(c,c.parent()),facybox_borders(!1),$(s).html(r),$(l).html(i).show()}$(a).bind("click",{thisObject:this},function(t){$(o).hide(),t.stopPropagation(),$.facybox.settings.opacity=.3,facybox_borders(!0),$.facybox.close()}),$("body").unbind(),$(o).attr("close")||setTimeout(function(){$("body").click(function(){$(a).click()})},500),$(document).bind("afterClose.facybox",function(){facybox_borders(!0),$(o).hide()})}function facybox_borders(t){var e=[".nw",".n",".ne",".w",".e",".sw",".s",".se"];for(v in e)$("#facybox").find(e[v]).attr("style","display: "+(t?"":"none")+";");$("#facybox .body").attr("style","background: "+(t?"white":"transparent")+";")}jQuery.cookie=function(t,e,n){if("undefined"==typeof e){var i=null;if(document.cookie&&""!=document.cookie)for(var r=document.cookie.split(";"),o=0;o<r.length;o++){var a=jQuery.trim(r[o]);if(a.substring(0,t.length+1)==t+"="){i=decodeURIComponent(a.substring(t.length+1));break}}return i}n=n||{},null===e&&(e="",n.expires=-1);var s="";if(n.expires&&("number"==typeof n.expires||n.expires.toUTCString)){var l;"number"==typeof n.expires?(l=new Date,l.setTime(l.getTime()+24*n.expires*60*60*1e3)):l=n.expires,s="; expires="+l.toUTCString()}var c=n.path?"; path="+n.path:"",u=n.domain?"; domain="+n.domain:"",d=n.secure?"; secure":"";document.cookie=[t,"=",encodeURIComponent(e),s,c,u,d].join("")},String.prototype.toTitleCase=function(){return this.replace(/([\w&`'\u2018\u2019"\u201c.@:\/\{\(\[<>_]+-? *)/g,function(t,e,n,i){return n>0&&":"!==i.charAt(n-2)&&t.search(/^(a(nd?|s|t)?|b(ut|y)|en|are|is|for|i[fn]|o[fnr]|t(he|o)|vs?\.?|via)[ \-]/i)>-1?t.toLowerCase():i.substring(n-1,n+1).search(/['"_{(\[]/)>-1?t.charAt(0)+t.charAt(1).toUpperCase()+t.substr(2):t.substr(1).search(/[A-Z]+|&|[\w]+[._][\w]+/)>-1||i.substring(n-1,n+1).search(/[\])}]/)>-1?t:t.charAt(0).toUpperCase()+t.substr(1)})},String.prototype.replaceAutocomplete=function(t,e){t=replaceAll(t.trim().trimDoubleSpaces(),"-"," ");var n=" "+replaceAll(replaceAll(this,"."," "),"-"," "),i=n.toLowerCase().indexOf(" "+t.toLowerCase());if(-1==i)return this;var r="";return r+=this.substr(0,i),r+=e.indexOf("%s")?replaceAll(e,"%s",this.substr(i,t.length)):e,r+=this.substr(i+t.length)},String.prototype.trimDoubleSpaces=function(){return this.replace(/\s{2,}/g," ")},String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,"")},String.prototype.ltrim=function(){return this.replace(/^\s+/,"")},String.prototype.rtrim=function(){return this.replace(/\s+$/,"")},String.prototype.replaceAll=function(t,e,n){return replaceAll(this,t,e,n)};var MentionsAutocomplete=function(t,e,n,i,r,o,a){if(this.user_id=t,this.raw_edit_id=e,this.edit_id="[data-id='"+e+"']",this.form_id="[data-id='"+e+"_form']",this.mentions_edit_id="[data-id='mentions_"+e+"']",this.holder_id="#"+n,this.id=t+"_"+e,this.selectedItem=0,this.results=[],this.delayCounter=0,this.results_buffer=[],this.last_mention="",this.active_mentions=[],this.html_area_holder=this.mentions_edit_id+" .html_area_holder",this.text_area_holder=this.mentions_edit_id+" .text_area_holder",$(this.edit_id).length>0){var s=$(this.edit_id).css("font-size");s&&(this.font_size=parseInt(s));var l=$(this.edit_id).css("line-height");l&&(this.line_height=parseInt(l)),this.tag_name=$(this.edit_id).get()[0].tagName.toLowerCase()}else this.tag_name="textarea";this.font_size=r?r:this.font_size||13,this.line_height=o?o:this.line_height||16,this.msign=a&&a.sign?a.sign:"@","blank"==this.msign&&(this.msign=""),"undefined"==typeof MentionsAutocomplete.all&&(MentionsAutocomplete.all={}),MentionsAutocomplete.all[this.id]=this,this.init=function(){if(0==$(this.mentions_edit_id).length){$(this.edit_id).parent().prepend($("<div class='mentions_input_holder' data-id='mentions_"+this.raw_edit_id+"'></div>")),$(this.mentions_edit_id).append($("<div class='html_area_holder'></div>")),$(this.mentions_edit_id).append($("<div class='text_area_holder'></div>"));var t=$(this.edit_id).val(),e=$(this.edit_id).clone();$(this.edit_id).attr("data-id",this.raw_edit_id+"_form"),$(this.text_area_holder).append($(e)),$(this.form_id).hide(),$(this.form_id).val(t),$(this.edit_id).val(t);var n=["width","height","padding-left","padding-top","padding-bottom","padding-right","font-weight"];for(var i in n)$(this.html_area_holder).css(n[i],$(this.edit_id).css(n[i]));$(this.text_area_holder+" "+this.tag_name).css("font-size",this.font_size+"px"),$(this.text_area_holder+" "+this.tag_name).css("line-height",this.line_height+"px"),$(this.html_area_holder).css("font-size",this.font_size+"px"),$(this.html_area_holder).css("line-height",this.line_height+"px")}this.allowed_chars=[];var r=["<",">","(",")","?","!",".",",",":",";","'",'"'," ","\n","\r","	"];for(var i in r)this.allowed_chars[r[i]]=!0;this.init_mentions()},this.init_mentions=function(){var t=$(this.edit_id).val(),e=this;t&&(t.indexOf(this.msign)>=0||""==this.msign)&&$.getJSON("/mentions/init_mentions",{text:t},function(n){if(n.active_mentions){e.active_mentions=n.active_mentions;var i=" "+t+" ";for(var r in e.active_mentions)i=e.replace_mentions(i,e.active_mentions[r].slug,r);i=i.slice(1,i.length-1),$(e.form_id).val(i),$(e.edit_id).val(i),e.init_html_area()}})},this.init(),$(this.edit_id).bind("keypress",{thisObject:this},function(t){t.data.thisObject.update_html_size(1),t.data.thisObject.update_html_area()}),$(this.edit_id).bind("keyup",{thisObject:this},function(t){return t.data.thisObject.update_html_size(1),27==t.keyCode?(t.data.thisObject.hideAutocomplete(),!1):40==t.keyCode?(t.data.thisObject.incSelection(),!1):38==t.keyCode?(t.data.thisObject.decSelection(),!1):(t.data.thisObject.showHideAutocomplete_with_delay(),!0)}),$(this.edit_id).bind("keydown",{thisObject:this},function(t){if(t.data.thisObject.update_html_size(1),13==t.keyCode){var e=t.data.thisObject.lastWord();return e[0]!=t.data.thisObject.msign&&""!=t.data.thisObject.msign||!t.data.thisObject.useItem()?(t.data.thisObject.update_html_area(),!0):!1}return 40!=t.keyCode&&38!=t.keyCode||!t.data.thisObject.isAutocompleteOpen()?(t.data.thisObject.update_html_area(),!0):!1}),$(this.edit_id).bind("focus",{thisObject:this},function(t){t.data.thisObject.init_html_area(),t.data.thisObject.showHideAutocomplete_with_delay(),$(t.data.thisObject.form_id).closest("form").find("input[type='submit']").removeAttr("disabled")}),$(this.edit_id).bind("focusout",{thisObject:this},function(t){t.data.thisObject.init_html_area(),setTimeout(function(){t.data.thisObject.hideAutocomplete()},100)}),$(this.form_id).closest("form").submit({thisObject:this},function(t){var e=t.data.thisObject;""!=$(e.edit_id).val()&&setTimeout(function(){$(e.edit_id).html(""),$(e.html_area_holder).html(""),$(e.html_area_holder).hide(),$(e.text_area_holder+" "+this.tag_name).css("background-color","white"),e.update_html_size(1),e.last_mention=""},100)}),this.sanitizeQuery=function(t){return t.replace(/[^A-Za-z0-9 @\-]/g,"")},this.lastWord=function(){var t=$(this.edit_id).val(),e=$(this.edit_id)[0].selectionStart;"undefined"==typeof e&&(e=t.length),t=t.slice(0,e);var n="",i=0;if(""==this.msign){i=0;for(var r in this.active_mentions){var o=t.lastIndexOf(this.active_mentions[r].mention);o>=0&&(o+=this.active_mentions[r].mention.length),o>i&&(i=o)}}else i=t.lastIndexOf(this.msign);if(i>=0){var n=t.substr(i+this.msign.length);if(n.length<=45&&n.length>0){if("\n"==t[t.length-1])return"";var a=n;n=this.sanitizeQuery(n),n=n!=a||i>=this.msign.length&&""!=t.charAt(i-1).replace(/[^A-Za-z0-9]/,"")?"":this.msign+n}else n=""}return n},this.isAutocompleteOpen=function(){return $(this.holder_id).is(":visible")},this.showHideAutocomplete_with_delay=function(){var t=++this.delayCounter,e=this;setTimeout(function(){e.showHideAutocomplete(t)},50)},this.showHideAutocomplete=function(t){if(this.delayCounter==t){var e=this.lastWord();if(""==this.msign||e[0]==this.msign&&this.last_mention!=e){(e.length>=2||e.length>=1&&""==this.msign)&&this.showAutocomplete(e)}else this.hideAutocomplete()}},this.showAutocomplete=function(t){if(t=t.slice(this.msign.length).toLowerCase(),this.results_buffer[t])this.results=this.results_buffer[t],this.renderResults();else{var e=((new Date).getTime(),this);$.getJSON("/mentions/search",{mention:t},function(n){e.results=n,e.results_buffer[t]=n,t.toLowerCase()==e.lastWord().slice(e.msign.length).toLowerCase()&&e.renderResults()})}},this.hideAutocomplete=function(){this.results=[],$(this.holder_id).hide()},this.selectItem=function(t){$("#"+this.id+"_item_"+this.selectedItem).attr("class","item"),$("#"+this.id+"_item_"+t).attr("class","item selected"),this.selectedItem=t},this.incSelection=function(){this.selectedItem<this.results.length-1&&this.selectItem(this.selectedItem+1)},this.decSelection=function(){this.selectedItem>0&&this.selectItem(this.selectedItem-1)},this.useItem=function(){var t=this.results[this.selectedItem];return"undefined"!=typeof t?(this.useSlug(t.id,t.type,t.name,t.slug),!0):!1},this.useSlug=function(t,e,n,i){var r=this.lastWord(),o=$(this.edit_id).val(),a=$(this.edit_id)[0].selectionStart;"undefined"==typeof a&&(a=o.length);var s=o.slice(0,a),l=o.slice(a,o.length),c=n;if(c+=" ",r[0]==this.msign||""==this.msign){s=s.slice(0,s.length-r.length),$(this.edit_id).val(s+this.msign+c+l),$(this.edit_id).set_cursor(s.length+c.length+1),this.last_mention=this.msign+c,this.hideAutocomplete();var u=[];u.id=t,u.type=e,u.slug=this.msign+i,u.mention=c,this.active_mentions[this.msign+n.trim()]=u,this.update_html_area()}},this.renderResults=function(){if(0==this.results.length)return void this.hideAutocomplete();var t="<div id='"+this.holder_id+"' class='mentions_holder'>";this.selectedItem=0;for(var e in this.results){var n=this.results[e];this.active_mentions[this.msign+n.name]&&this.active_mentions[this.msign+n.name].slug!=this.msign+n.slug||(t+="<div class='item "+(0==e?"selected":"")+"' id='"+this.id+"_item_"+e+"' onclick='MentionsAutocomplete.all[\""+this.id+'"].useSlug("'+n.id+'", "'+n.type+'", "'+n.name+'", "'+n.slug+"\")' onmouseover='MentionsAutocomplete.all[\""+this.id+'"].selectItem('+e+");'>",t+="<div class='pic'><img src='"+n.pic+"'></div>",t+="<div class='info'>",t+="<div class='name'>"+n.highlighed_name+"</div>",n.desc&&(t+="<div class='desc'>"+n.desc+"</div>"),t+="</div>",t+="</div>",t+="<div class='cb'></div>")}t+="</div>",$(this.holder_id).html(t),$(this.holder_id).show()},this.update_html_area=function(){$(this.html_area_holder).show(),$(this.text_area_holder+" "+this.tag_name).css("background-color","transparent");var t=this;setTimeout(function(){if(!$(t.form_id).closest("form").find("input[type='submit']").attr("disabled")){var e=$(t.edit_id).val(),n=$("<div/>").text(e).html(),i=e,r=[];for(var o in t.active_mentions)if(e.indexOf(o)>=0){var a="<a data-type='"+t.active_mentions[o].type+"' data-id='"+t.active_mentions[o].id+"'>"+o+"</a>";r[o]=a,n=t.replace_mentions(n,o,a),i=t.replace_mentions(i,o,a)}var s=i;for(o in r)s=s.replaceAll(r[o],t.active_mentions[o].slug);null!=n&&(n=n.replace(/\n/g,"<br>")),null!=s&&(s=s.replaceAll("<br>","\n").slice(s)),$(t.html_area_holder).html(n),$(t.form_id).val(s),$(t.html_area_holder).find("a").css("top",-$(t.edit_id).scrollTop()+"px")}},5)},this.replace_mentions=function(t,e,n){for(var i="",r=(" "+t+" ").split(e),o=r.length,a=0;o>a;a++)i+=r[a],o-1>a&&(i+=this.allowed_chars[r[a][r[a].length-1]]&&this.allowed_chars[r[a+1][0]]?n:e);return i.slice(1,i.length-1)},this.update_html_size=function(t){var e=this;setTimeout(function(){$(e.html_area_holder).css("width",$(e.edit_id).css("width")),$(e.html_area_holder).css("height",$(e.edit_id).css("height")),$(e.mentions_edit_id).css("float","left"),$(e.html_area_holder).find("a").css("top",-$(e.edit_id).scrollTop()+"px")},t)},this.init_html_area=function(){this.update_html_size(1),this.update_html_area()},this.hideAutocomplete(),this.update_html_size(50),this.update_html_area()};$.fn.set_cursor=function(t){return this.each(function(){if(this.setSelectionRange)this.focus(),this.setSelectionRange(t,t);else if(this.createTextRange){var e=this.createTextRange();e.collapse(!0),e.moveEnd("character",t),e.moveStart("character",t),e.select()}})};var angellist={},dealFeed={wideLoading:function(){return $('<div class="loader-repl"></div>')},startTagFollowing:function(){var t=$(this),e=dealFeed.wideLoading(),n=t.replaceWith(e);return $.ajax({url:t.attr("href"),data:"",success:function(t){e.replaceWith("success"==t.status?t.html:n)},type:"post"}),!1},stopTagFollowing:function(){var t=$(this),e=dealFeed.wideLoading(),n=t.replaceWith(e);return $.ajax({url:t.attr("href"),data:"",success:function(t){e.replaceWith("success"==t.status?t.html:n)},type:"post"}),!1}};jQuery(function(t){t(document).on("click",".follow-tag-btn",dealFeed.startTagFollowing),t(document).on("click",".unfollow-tag-btn",dealFeed.stopTagFollowing),t('input[type="text"], textarea').each(textCounter)}),jQuery(function(t){initPage(),t(document).ajaxComplete(initPage)});var Selector=[],load_request_thread_id=0,Pagination=function(t){this.url=t.url,this.startup_id=t.startup_id,this.page=t.page,this.per_page=t.per_page,this.object_id=t.object_id,this.options=t.options,this.loading_method=t.loading_method,this.identifier=t.identifier,this.loading=!1,$("#more_pagination_button_"+this.object_id).data("is_pagination_bound")||(this.bind_all=function(){$("#more_pagination_button_"+this.object_id).bind("click",{thisObject:this},function(t){t.data.thisObject.event_click("more")}),$("#more_pagination_button_"+this.object_id).data("is_pagination_bound",!0),$("#previous_pagination_button_"+this.object_id).bind("click",{thisObject:this},function(t){t.data.thisObject.event_click("previous")}),$("#next_pagination_button_"+this.object_id).bind("click",{thisObject:this},function(t){t.data.thisObject.event_click("next")})},this.bind_all(),this.event_click=function(t){this.loading||this.load_results(t),this.loading=!0},this.load_results=function(t){$("#"+t+"_pagination_button_"+this.object_id).attr("class",t+"_pagination_button"),$("#"+t+"_pagination_button_"+this.object_id).html(dealFeed.wideLoading()),"more"!=t&&$("#"+this.object_id).fadeTo(100,.5);var e="get";this.url.length>100&&(e="post"),this.url=this.url.replace(/amp;/g,"");var n=parse_include_ids_from_url(this.url),i=n.include_ids;this.url=n.url;var r=this,o="previous"==t?-1:1,a=r.options&&r.options.full_load;if(this.loading_method){var s=decodeURIComponent(this.url).split("?"),l=$.parseQuery(s[s.length-1]);delete l.page,$.ajax({url:r.loading_method,data:$.extend({page:r.page+o,per_page:r.per_page,startup_id:r.startup_id,skip_loading:!0,include_ids:i},l),type:e,dataType:"json",success:function(e){e.html&&($("#"+t+"_pagination_button_"+r.object_id).replaceWith(""),$("#pagination_content_"+r.object_id).replaceWith(e.html),selector_refresh(),TipTip.init())}})}else $.ajax({dataType:r.url.match(/.*(\.js\?|\?format=js)[^\?]*$/)||a?"json":"text",url:r.url,data:{page:r.page+o,per_page:r.per_page,startup_id:r.startup_id,skip_loading:!0,include_ids:i},type:e,success:function(e){if(""!=e){if(r.page+=o,$("#"+t+"_pagination_button_"+r.object_id).replaceWith(""),e=r.url.match(/.*(\.js\?|\?format=js)[^\?]*$/)||a?e.html:"<div>"+e+"</div>",a){$("#"+r.object_id).append("<div class='hidden' id='tmp_pagination_storage'></div>"),$("#tmp_pagination_storage").html(e);var n=$("#tmp_pagination_storage #"+r.object_id).detach();$("#pagination_content_"+r.object_id).replaceWith(n),$("#tmp_pagination_storage").remove()}else{var n=$(e).find("[id="+r.object_id+"]").html();"more"==t?$("#pagination_content_"+r.object_id).replaceWith(n):($("#"+r.object_id).replaceWith('<div id="'+r.object_id+'">'+n+"</div>"),$("#"+r.object_id).fadeTo(100,1))}r.bind_all(),$("body").click(),r.loading=!1,require(["qtip"],function(){$(".tiptip_bottom").qtip({show:{delay:0},defaultPosition:"bottom",maxWidth:"270px"}),$(".tiptip_top").qtip({show:{delay:0},defaultPosition:"top",maxWidth:"270px"}),$(".tiptip").qtip({show:{delay:0},defaultPosition:"top"}),$("#tiptip_holder").hover(function(){setTimeout(function(){$("#tiptip_holder").stop(),$("#tiptip_holder").show(),$("#tiptip_holder").css("opacity",1)},10)},function(){$("#tiptip_holder").hide()})}),selector_refresh()}}})})},AL={loadingImage:function(t){return"undefined"==typeof t&&(t=""),$('<img src="/images/shared/transparent-ajax-loader.gif" style="'+t+'" alt="Loading" class="loading_image" />')},centeredLoadingImage:function(){return AL.loadingImage("width: auto; margin: 0 auto; display: block; margin-top: 20px; padding-top: 20px; clear: both")}};Messages.initLightBox=function(t,e,n,i){function r(t,e){e.hide(),$(document).trigger("messages.js_message_sent",[t]),setTimeout(function(){$(document).trigger("close.facybox")},2500)}function o(t,e){e.find(".ajax_loader").hide(),e.find("input[type='submit']").removeClass("loading"),e.find(".errors").html(t.errors).show()}var a=i&&i.force_multiple,s=i&&i.force_docs,l=i&&i.assign_class;if("undefined"!=typeof Messages.message_box_initialized&&!a)return!0;Messages.message_box_initialized=!0,$.facybox.settings.modal=!0,$(document).on("click",".close_facybox",function(){$(document).trigger("close.facybox")});var c;c=l?"."+l.replace(/\./,"")+"[data-recipient_id="+t+"][data-recipient_type="+e+"]":a?".message-lightbox[data-recipient_id="+t+"][data-recipient_type="+e+"]":".message-lightbox",$(document).on("click",c,function(){$.facybox.loading();var i={recipient_type:e,recipient_id:t};n&&(i.about_startup=n),s&&(i.force_docs=s),$.ajax({url:"/messages/new.js",data:i,dataType:"html",success:function(n){$.facybox.reveal($(n)),$(".new_message_lightbox textarea").focus();var s=$(".new_message_lightbox form").data("user_id"),l=$(".new_message_lightbox form").data("field_data_id"),c=$(".new_message_lightbox form").data("field_holder_id"),u=$(".new_message_lightbox form").data("is_admin");new MentionsAutocomplete(s,l,c,u),form=$(a?".new_message_lightbox form[data-recipient_id="+t+"][data-recipient_type="+e+"]":".new_message_lightbox form"),form.bind("submit",function(){$(this).find(".close_facybox").hide(),$(this).find(".g-button.blue").addClass("loading");var t=$(this);return $.ajax({url:"/messages.js",type:"post",data:$(this).serialize(),dataType:"json",success:function(e){$.extend(e,i),e.errors?o(e,t):r(e,t)}}),!1})},error:function(t){$.cookie("remember_user_token",null),window.location=t.responseText}})}),$(document).on("change",".new_message_lightbox select",function(){$("input[name='message[startup_id]']").val($(this).val());var t=Messages.startups[$(this).val()];$(".new_message_lightbox .startup_name").html(t.name),$(".new_message_lightbox .startup_possessive").html(t.possessive)})},function(){var t=function(t,e){return function(){return t.apply(e,arguments)}};window.Autocomplete=function(){function e(e,n){var i,r,o;this.selector=e,this.closeAutocomplete=t(this.closeAutocomplete,this),this.openAutocomplete=t(this.openAutocomplete,this),this.selectAutocomplete=t(this.selectAutocomplete,this),this.focusAutocomplete=t(this.focusAutocomplete,this),this.tagsAutocomplete=t(this.tagsAutocomplete,this),this.searchAutocomplete=t(this.searchAutocomplete,this),this.taggingsAutocomplete=t(this.taggingsAutocomplete,this),this.enable=t(this.enable,this),this.disable=t(this.disable,this),$.extend(this,n),this.queryOptions=n.queryOptions||{},this.hide_counts=n.hide_counts,this.onlyMatchedQueries=n.onlyMatchedQueries,this.cache={},i={autoFocus:!0,html:!0,delay:null!=(r=this.delay)?r:"undefined"!=typeof SEARCH_MS_DELAY_AUTOCOMPLETE&&null!==SEARCH_MS_DELAY_AUTOCOMPLETE?SEARCH_MS_DELAY_AUTOCOMPLETE:50,source:n.tags?this.tagsAutocomplete:n.roles?this.taggingsAutocomplete:this.searchAutocomplete,open:this.openAutocomplete,close:this.closeAutocomplete,focus:this.focusAutocomplete,select:this.selectAutocomplete},i=$.extend(i,null!=(o=this.extra_ac_options)?o:{}),$(this.selector).autocomplete(i),$(this.selector).click(function(){var t,e;return e=$(this).val().trim(),t=$(this).autocomplete("option","minLength"),e.length>=t?$(this).autocomplete("search",e):void 0}),this.widget=$(this.selector).autocomplete("widget"),$(this.widget).addClass("search_autocomplete_ui al_shadow al_border_radius")}return e.prototype.disable=function(){return $(this.selector).autocomplete("disable")},e.prototype.enable=function(){return $(this.selector).autocomplete("enable")},e.prototype.taggingsAutocomplete=function(t,e){return t.term in this.cache&&e(this.cache[t.term]),this.lastXhr=$.ajax({url:"/autocomplete/taggings",data:$.extend({query:t.term},this.queryOptions),type:"get",dataType:"json",success:function(n){return function(i,r,o){var a,s;if(n.lastXhr===o&&$(n.selector).is(":focus")&&$(n.selector).val()===t.term)return s=function(){var t,e,n;for(n=[],t=0,e=i.length;e>t;t++)a=i[t],n.push(function(){return function(t){var e;return{value:t,label:'<div class="pic_cell">\n  <div class="pic_holder">\n    <img src="'+(null!=(e=t.pic)?e:"")+'" alt=""/>\n  </div>\n</div>\n<div class="right_cell u-textShadowWhite">\n  <div class="main">\n    '+t.highlight_name+'\n    <div class="item-type">'+t.info+"</div>\n  </div>\n</div>"}}}(this)(a));return n}.call(n),n.onlyMatchedQueries||s.push({value:{name:t.term},label:"<div class='add_new'>Add new <strong>\""+t.term+'"</strong></div>'}),n.cache[t.term]=s,e(s)}}(this)})},e.prototype.searchAutocomplete=function(t,e){return t.term in this.cache&&e(this.cache[t.term]),this.lastXhr=$.ajax({url:this.custom_url||"/autocomplete/search",data:$.extend({query:t.term},this.queryOptions),type:"get",dataType:"json",success:function(n){return function(i,r,o){var a,s;return s=function(){var t,e,n;for(n=[],t=0,e=i.length;e>t;t++)a=i[t],n.push(function(t){var e,n;return e={value:{name:t.name,id:t.id,model:t.model},label:'<div class="pic_cell"><div class="pic_holder">\n<img src="'+(null!=(n=t.pic)?n:"")+'" alt=""/>\n</div></div>\n<div class="right_cell u-textShadowWhite">\n<div class="main">\n'+t.highlight_name+'\n<div class="item-type">'+t.type+"</div>\n</div></div>"}}(a));return n}(),n.cache[t.term]=s,n.lastXhr===o&&$(n.selector).is(":focus")&&$(n.selector).val()===t.term?e(s):void 0}}(this)})},e.prototype.tagsAutocomplete=function(t,e){var n;return n=function(t,e){return"undefined"!=typeof t&&null!==t&&""!==t?t:e},t.term in this.cache&&e(this.cache[t.term]),this.lastXhr=$.ajax({url:this.custom_url||"/autocomplete/new_tags",data:$.extend({query:t.term},this.queryOptions),type:"get",dataType:"json",success:function(i){return function(r,o,a){var s,l;return l=function(){var e,i,o;for(o=[],e=0,i=r.length;i>e;e++)s=r[e],o.push(function(e){return function(i){var r,o,a,s;return i.tag.highlight_name=i.tag.display_name.toTitleCase().replaceAutocomplete(t.term,"<span class=matched_substring>%s</span>"),i.tag.followers=e.hide_counts||null==i.counts.User?"":i.counts.User+" follower"+(1===i.counts.User?"":"s"),o="",(null!=(a=i.tag.pic)?a.length:void 0)||(o="u-hidden"),r={value:{name:i.tag.name,id:i.tag.follower_id,model:i.tag.model,item:i.tag},label:'<div class="pic_cell '+o+'"><div class="pic_holder">\n<img src="'+(null!=(s=i.tag.pic)?s:"")+'" alt=""/>\n</div></div>\n<div class="right_cell u-textShadowWhite">\n<div class="main">\n'+i.tag.highlight_name+'\n<div class="item-type">'+n(i.tag.description,n(i.tag.followers,n(i.tag.type,"")))+"</div>\n</div></div>"}}}(this)(s));return o}.call(i),i.addText&&l.push({value:null,label:'<div class="pic_cell"><div class="pic_holder">\n</div></div>\n<div class="right_cell u-textShadowWhite">\n<div class="main">\n'+i.addText+'\n&ldquo;<span class="matched_substring">'+t.term+'</span>&rdquo;\n<div class="item-type"></div>\n</div></div>'}),i.cache[t.term]=l,i.lastXhr===a&&$(i.selector).is(":focus")&&$(i.selector).val()===t.term?e(l):void 0}}(this)})},e.prototype.focusAutocomplete=function(){return!1},e.prototype.selectAutocomplete=function(t,e){return this.selectCallback?this.additionalCallbackOptions?this.selectCallback(e.item.value,this.additionalCallbackOptions):this.selectCallback(e.item.value):$(this.selector).val(e.item.value.name),!1},e.prototype.openAutocomplete=function(){return this.opened=!0},e.prototype.closeAutocomplete=function(){return this.opened=!1},e}(),define("lib/autocomplete",[],function(){return window.Autocomplete})}.call(this),function(){}.call(this);