#ViaJS

Via is a small plugin that allows you to load content on to a page dynamically

## Installing

```
git clone https://github.com/abdi0987/ViaJS.git
```

Link to the app.js file

```javascript
<script src='src/app.js'></script>
```

##Usage example

Specifiy were to load the content
```html
<div class="container" via-pages></div>
```
add _via-pages_ attribute to your div element to specifiy where to load the content 


Specifiy your views url and a defaultView if the user enters and invalid hashtag url
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

Then use an _<a>_ tag

```html
<ul class="nav navbar-nav">
    <li class=""><a via-link href="home">Home</a></li><!---For href enter the same name you gave the views object and add via-link attribute--->
    <li><a via-link href="about">About</a></li>
    <li><a via-link href="contact">Contact</a></li>
</ul>
```
Remeber to add _via-link_ attribute to every _<a>_ tag you are using to load your content
