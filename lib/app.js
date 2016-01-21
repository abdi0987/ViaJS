'use strict';

function Via(settings) {
    //Init view Element
    this.viewElements = '';
    this.views = settings || {};
    if (settings!==undefined){
        this.currentState = this.defaultState = settings.defaultView.view;
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
        this.loadPage();
    }
    else {
        console.error("ViaJS Requires jQuery");
    }
};

Via.prototype.compile = function(element) {
    this.viewElements = $("[via-views]");
};

Via.prototype.clear = function(element) {
    this.viewElements.each(function(){
        $(this).html("");
    });
};

Via.prototype.watch = function() {
    var that = this;

    //Checking if an a element is clicked
    $("body").delegate("a[via-link]", "click", function() {
        //setting url hashtag
        window.location.hash = $(this).attr("href");
        var newState = window.location.hash.substring(1);
        var newSettings = that.views[newState];
        if (!!newSettings){
            that.currentState = newState;
        }
        that.loadPage();

        return false;
    });
};

Via.prototype.loadPage = function() {
    this.clear();
    var settings = this.views[this.currentState];
    if (!settings){
        settings = this.views[this.defaultState];
    }
    settings.forEach(function(data){
        var element = $(data.selector)
        //setting templateUrl
        if (!element.length) {
            console.error("selector not found:", data.selector);
            return;
        }
        element.load(data.templateUrl, "", data.callback || function(){});
    });
};
