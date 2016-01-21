'use strict';

function Via(settings) {
    //Init view Element
    this.viewElement = '';
    this.views = settings || {};
    if (settings!==undefined){
        this.init(settings);
    }
};

Via.prototype.init = function(views) {
    if (!views) {
        console.error("Via Init function views parameter is undefined");
    }
    else if (window.jQuery) {
        // replaces the existing and adds the new
        this.views = $.extend(true, this.views, views);
        this.compile(document.body); // adds via-views attr
        this.watch();
        this.hashChange();
    }
    else {
        console.error("ViaJS Requires jQuery");
    }
};

Via.prototype.compile = function(element) {
    this.viewElement = $("[via-views]");
};

Via.prototype.watch = function() {
    var that = this;

    //Checking if an a element is clicked
    $("body").delegate("a[via-link]", "click", function() {
        //setting url hashtag
        window.location.hash = $(this).attr("href");

        that.loadPage();
        
        return false;
    });
};

Via.prototype.hashChange = function() {
    var that = this;

    //Window Refresh
    $(window).bind('hashchange', function() {

        var newHash = window.location.hash.substring(1);

        if (newHash) {
            if (that.views[window.location.hash.substring(1)] != undefined) {
                that.loadPage();
            }
            else {
                location.hash = that.views.defaultView.view.toString();
            }
        }
        else{
            location.hash = that.views.defaultView.view.toString();
        }
    });

    $(window).trigger('hashchange');
};

Via.prototype.loadPage = function() {
    //setting templateUrl
    var url = this.views[window.location.hash.substring(1)].templateUrl;

    //loading content
    if(!this.viewElement){
        console.error("could not find via-views attribute in your html");
    }
    else{
        $(this.viewElement).load(url);
    }
};
