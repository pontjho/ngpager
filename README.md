# NgPager
**ng-pager** is a pagination directive for your angular application. The directive is only dependent on AngularJs and has no dependencies on JQuery. For styling, you may use the supplied stylesheet, bootstrap or your own stylesheet.


## Demo

[Demo](http://pontjho.github.io/ngpager/demo.html)

## Installation

Grab the latest [release](https://github.com/pontjho/ngpager) or use
bower install --save ngpager

Add the `javascript` file:

```html
<script type="text/javascript" src="ngpager.min.js"></script>
```

Then add `NgPager` to your module's dependencies:

```javascript
angular.module('app', ['NgPager'])
```

## Usage

### Basic usage

```html
<div ng-pager 
     current-page="{{currentPage}}" 
     total-pages="{{totalPages}}" 
     max-pages-to-display="{{maxPagesToDisplay}}" 
     page-changed="paged(pageNum)"
     enable-jump-controls="true"
     ></div>
```
Add the ng-pager directive to any div element and specify the current page, total pages and maximum pages to display. Also include a function to handle the page changed event in your controller. Note that the current page will only update when you update it in your model.

#### current-page (required)
An expression that should evaluate to the current page to be displayed

#### total-pages (required)
An expression that evaluates to the total number of pages in the list

#### max-pages-to-display (optional)
An expression that evaluates to the maximum number of pages that are displayed at a time. If this is not specified then the directive defaults to the value in the global config. If that is not configured then a default of 3 is used.

#### page-changed (required)
Takes a function that is called everytime a page change is requested. The function is passed as a parameter the selected page number.

#### enable-jump-controls (optional)
When set, the directive will always display the first and last page. By default these are hidden. You can override this in the configuration described below.

### Configuration

```javascript
angular.module('TestApp', ['NgPager'])
.run(function(PagerConfig)
{ 
	PagerConfig.setBase1();
	PagerConfig.enableJumpControls();
})
```
By default, the directive uses base 0 for page numbers. That means that the first page has index 0. If you want to change it to index 1, you can call setBase1() on the configuration. To configure the directive to always display the first and last page you can call enableJumpControls(). To set a global default of the number of pages to be displayed, use setDefaultMaxPages(desiredDefault).