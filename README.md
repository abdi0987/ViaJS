#ViaJS

![ViaJS Image](https://cloud.githubusercontent.com/assets/13234884/9150024/d8570b2a-3d8a-11e5-96ca-9bcc5085fe31.png)

Via is a small plugin that allows you to load content on to a page dynamically

##Demo

[ViaJS Demo (click me)](http://viajs.herokuapp.com/)

## Installing

```
git clone https://github.com/abdi0987/ViaJS.git
```

Link to the app.js file

```html
<script src='lib/app.js'></script>
```

##Usage example

Specifiy were to load the content
```html
<div class="container" via-views></div>
```
add __via-views__ attribute to your div element to specifiy where to load the content 


Specifiy your views url and a defaultView if the user enters an invalid hashtag url.

Then call the init function and pass it your views

```javascript
var views = {
    home:{
        templateUrl:'views/index.html'  
    },
    about: {
        templateUrl: 'views/about.html'
    },
    contact:{
        templateUrl:'views/contact.html'
    },
    defaultView: {
        view: 'home'
    }
}

var via = new Via();

via.init(views);
```

Then use an __a__ tag

```html
<ul class="nav navbar-nav">
    <li class=""><a via-link href="home">Home</a></li>
    <li><a via-link href="about">About</a></li>
    <li><a via-link href="contact">Contact</a></li>
</ul>
```
Remeber for the href attribute enter the same name you gave the views object and add __via-link__ attribute to every __<a>__ tag you are using to load your content
