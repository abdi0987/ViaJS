![ViaJS Image](https://cloud.githubusercontent.com/assets/13234884/9150556/a139f32c-3da4-11e5-9c6a-48ac1ac5a998.png)

Via is a small library that allows you to load content on to a page dynamically

## Demo

[ViaJS Demo (click me)](http://viajs.surge.sh/)

## Installing

This library requires **jQuery**

```
git clone https://github.com/abdi0987/ViaJS.git
```

Link to the app.js file

```html
<script src='lib/app.js'></script>
```

## Usage
![ViaJS Image](https://cloud.githubusercontent.com/assets/13234884/9150024/d8570b2a-3d8a-11e5-96ca-9bcc5085fe31.png)


### Example

Specifiy were to load the content
```html
<div class="container">
    <div id="title" via-views>should stay hidden</div>

    <div id="content" via-views>should stay hidden</div>
</div>
```
add __via-views__ attribute to your div element to specifiy where to load the content


Specifiy your views url and a defaultView if the user enters an invalid hashtag url.

Then call the init function and pass it your views

```javascript
var views = {
    home: [{
            selector: "#title",
            templateUrl: 'views/index-title.html'
        }, {
            selector: "#content",
            templateUrl: 'views/index-content.html'
        },
    ],
    about: [{
            selector: "#title",
            templateUrl: 'views/about-title.html'
        }, {
            selector: "#content",
            templateUrl: 'views/about-content.html'
        },
    ],
    contact: [{
            selector: "#title",
            templateUrl: 'views/contact-title.html'
        // }, {
        //     selector: "#content",
        //     templateUrl: 'views/contact-content.php'
        },
    ],
    defaultView: {
        view: 'home'
    }
};

var via = new Via();

via.init(views);

```


now you can use the short version:

```javascript
new Via(views);

```
and also


Then use an __a__ tag

```html
<ul class="nav navbar-nav">
    <li class=""><a via-href="home">Home</a></li>
    <li><a via-href="about">About</a></li>
    <li><a via-href="contact">Contact</a></li>
</ul>
```
Add __via-href attribute to every __<a>__ tag you are using to load your content and remeber that via-href value should be the same name you gave the views object.
