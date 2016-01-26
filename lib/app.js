'use strict';

function Via(settings) {
    //Init view Element
    var hashtag = getHashTag();
    this.viewElements = '';
    this.views = settings || {};
    if (settings!==undefined){
        this.currentState = this.defaultState = settings.defaultView.view;
        if (!!hashtag){
            this.currentState = hashtag;
        }
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
        var newState = getHashTag();
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
    settings.forEach(loadPiece);
};

var getHashTag = function(){
    return window.location.hash.substring(1);
};
var loadPiece = function(data) {
    var element = $(data.selector)
    if (!element.length) {
        console.warn("selector not found:", data.selector);
        return;
    }
    element.load(data.templateUrl, "", function(){
        data.callback && data.callback();
        data.components && data.components.forEach(loadPiece);
    });
};
