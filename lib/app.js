'use strict';

function Via(settings) {
    //Init view Element
    this.viewElement = '';
    var views = {};
    if (settings!==undefined){
        this.init(settings);
    }

};

Via.prototype.init = function(views) {
    if (!views) {
        console.error("Via Init function views parameter is undefined");
    }
    else if (window.jQuery) {
        this.compile(document.body);
        this.watch(views);
        this.hashChange(views);
    }
    else {
        console.error("ViaJS Requires jQuery");
    }
};

Via.prototype.compile = function(element) {
    var that = this;

    //Recursion funcation that finds the element with the via-pages attribute
    Array.prototype.forEach.call(element.children, function(child) {
        that.compile(child);
    });

    Array.prototype.forEach.call(element.attributes, function(attribute) {
        if (attribute.name == 'via-views') {
            that.viewElement = element;
        }
    });
};

Via.prototype.watch = function(views) {
    var that = this;

    //Checking if an a element is clicked
    $("body").delegate("a[via-link]", "click", function() {
        //setting url hashtag
        window.location.hash = $(this).attr("href");

        that.loadPage(views);
        
        return false;
    });
};

Via.prototype.hashChange = function(views) {
    var that = this;

    //Window Refresh
    $(window).bind('hashchange', function() {

        var newHash = window.location.hash.substring(1);

        if (newHash) {
            if (views[window.location.hash.substring(1)] != undefined) {
                that.loadPage(views);
            }
            else {
                location.hash = views.defaultView.view.toString();
            }
        }
        else{
            location.hash = views.defaultView.view.toString();
        }
    });

    $(window).trigger('hashchange');
};

Via.prototype.loadPage = function(views) {
    var that = this;

    //setting templateUrl
    var url = views[window.location.hash.substring(1)].templateUrl;

    //loading content
    if(!this.viewElement){
        console.error("could not find via-views attribute in your html");
    }
    else{
        $(this.viewElement).load(url);
    }
};
