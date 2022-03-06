# TigerDOM
### An Elegant Animation Library

---

#### Version
2.0.0

#### Dependencies
jQuery full (or with Animation).

#### Author
K. Beau Beauchamp, WebTIGERS

#### License
MIT

### TigerDOM on Codepen
See TigerDOM in action on [Codepen](https://codepen.io/webtigers/pen/wvPNyOa)

---

# Basic Usage
TigerDOM is a jQuery plugin that allows you to elegantly make basic changes the DOM in a way that is unobtrusive 
and elegant. Most operations can be performed in one line of code.

## Show and Hide Content

Hiding content within a container:
```javascript
// Close container
$(".open-close-container").tigerDOM("close")
```

Showing content of a container:
```javascript
// Open container
$(".open-close-container").tigerDOM("open")
```
Creating a show / hide button or element:
```javascript
  // Open / Close Button
  $("#open-close-button").on("click", function () {
      
    let $container = $(".open-close-container");
    
    if ($container.is(":visible")) {
        
      $container.tigerDOM("close");
      
    } 
    else {
        
      $container.tigerDOM("open");
      
    }
    
  });
```

##Container Controls
Searches the DOM looking for the attribute:
````html 
data-tiger-control="#container-element-id"
```` 
The target then becomes the control for toggling (opening and closing the target container. Sweet!
 
If the initial state of the control is to be hidden, set the container element to display:none
with a class named "hide".
```css
.hide { display: none; }
``` 
Initialize the toggle controls in your JS like this:
```javascript
$().tigerDOM('initTigerControls');
``` 
### Toggle an Icon Class with the Container Control 
To toggle a class on an open/close icon, setup your trigger with the data attributes of:
```html
data-tiger-class-open="tiger-open" 
data-tiger-class-close="tiger-close"
```
The CSS is whatever you want, but for this example, we'll just rotate a FontAwesome arrow icon:
````css
i.tiger-open {
  transition: transform 0.4s;
  transform: rotate(0deg);
}

i.tiger-close {
  transition: transform 0.4s;
  transform: rotate(180deg);
}
````
TigerDOM will apply these classes to your trigger icon for open and close operations. Again, note that the example uses a 
FontAwesome icon.
```html
<div class="p-3 mb-3" style="cursor :pointer;" data-tiger-control="#demo-container" data-tiger-class-open="tiger-open" data-tiger-class-close="tiger-close">
    <i class="fa fa-angle-down mr-1 tiger-open"></i>
</div>
``` 

## Inserting Content
Use TigerDOM to elegantly insert content in literally one line of code:
````javascript
$('#targetContainer').tigerDOM('insert', { content: '<p>Hello World!</p>' });
````

## Removing Content
You can elgantly remove elements as well:
```javascript
$('.targetElements').tigerDOM('remove');

// Or clear the container

$('#targetContainer').tigerDOM('change', {content:''});
```

# Advanced Operations

## The Message Object
TigerDOM uses a message object to deliver content to the DOM with certain additional attributes specificed 
that enable convenience behaviors.
```javascript
{ 
    content       : string,    // Required - string or jQuery content object
    removeClick   : bool,      // Optional - defatuls to false
    removeTimeout : int,       // Optional - defaults to 0 = no timeout
    callback      : function   // Optional - defaults to null
}
```

## Changing Content
Perhaps one of the most useful features of TigerDOM is the ability to change the content of a container without 
slamming the content ondo the screen.

```javascript
let content = 
    '<div class="alert alert-success" role="alert">' +
      'This is a success alert-check it out!' +
    '</div>';

let callback = function(){ 
    // do stuff
}

let message = { 
    content       : content,
    removeClick   : true,
    removeTimeout : 5000,
    callback      : callback
};
$('#messageContainer').tigerDOM('insert', message);
```

# Other Utilities
Aside from common display animations, TigerDOM also includes a few other niceties, like:
## EqualHeights
Allows you to make two or more column containers equal in height with one line of code. This works for those times
when you have differing content but you need to make all of the columns the same height for display congruity. 
Simply pass the jQuery collection to the tigerDOM equalHeights method.
```javascript
$(".equal-heights").tigerDOM("equalHeights");
```

## AnimateCount
Allows you to animate the increment or decrement of numbers, very similar to what Intuit does within their 
TurboTax product. Your callback function can then update whatever element contains the count.

```javascript
$().tigerDOM('animateCount', {
    begin    : some_number,
    end      : another_number, 
    callback : function( c ){ console.log( c ); }
});
```
---
<sub>Copyright &copy; 2012-2022 &bull; WebTIGERS</sub>
