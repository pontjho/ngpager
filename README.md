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
<div ng-pager current-page="{{currentPage}}" total-pages="{{totalPages}}" max-pages-to-display="{{maxPagesToDisplay}}" page-changed="paged(pageNum)"></div>
```
Add the ng-pager directive to any div element and specify the current page, total pages and maximum pages to display. Also include a function to handle the page changed event in your controller. Note that the current page will only update when you update it in your model.
