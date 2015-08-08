'use strict';

function Via() {
    //Init view Element
    var viewElement = ''
    var views = {};

    //Init function that kicks thing offs
    this.init = function(views) {
        if (!views) {
            console.error("Via Init function views parameter is undefined")
        }
        else {
            $compile(document.body);
            $watch(views)
            $hashChange(views)
        }
    }

    //Recursion funcation that finds the element with the via-pages attribute
    var $compile = function(element) {
        Array.prototype.forEach.call(element.children, function(child) {
            $compile(child);
        });

        Array.prototype.forEach.call(element.attributes, function(attribute) {
            if (attribute.name == 'via-pages') {
                viewElement = element;
            }

        });
    }

    var $watch = function(views) {
        //Checking if an a element is clicked
        $("body").delegate("a" + ".via-link", "click", function() {
            //setting url hashtag
            window.location.hash = $(this).attr("href");

            //setting templateUrl
            var url = views[window.location.hash.substring(1)].templateUrl

            //loading content
            $(viewElement).load(url)

            return false;
        });
    }

    var $hashChange = function(views) {
        //Window Refresh
        $(window).bind('hashchange', function() {

            var newHash = window.location.hash.substring(1);

            if (newHash) {
                if (views[window.location.hash.substring(1)] != undefined) {
                    //setting templateUrl
                    var url = views[window.location.hash.substring(1)].templateUrl

                    //loading content
                    $(viewElement).load(url)
                }
                else{
                    location.hash = views.defaultView.view.toString()
                }
            };
        });

        $(window).trigger('hashchange');
    }
};
