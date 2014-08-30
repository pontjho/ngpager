(function() {
    'use strict';

    angular.module('NgPager', ['ngPagerTemplates', 'PagerConfig'])
    .directive('ngPager', ['PagerConfig', function (PagerConfig) {
        var definition = {
            restrict: 'A',
            scope: { currentPage: '@', totalPages: '@', maxPagesToDisplay: '@', pageChanged: '&' },
            replace: true,
            templateUrl: 'ngpager.tpl.html',

            link: function (scope, iElement, iAttrs) {

                scope.showJumpControls = PagerConfig.areJumpControlsEnabled;
                scope.changed = function (newPage) {
                    if(!newPage && newPage !== 0)
                        return;

                    if(newPage < 0 || newPage >= scope.totalPages)
                        return;

                    scope.pageChanged({ pageNum: newPage - PagerConfig.offset });
                };

                scope.$watch('currentPage', updateCurrentPage);
                scope.$watch('totalPages', updateTotalPages);
                scope.$watch('maxPagesToDisplay', updateMaxPages);

                function updateTotalPages(totalPages)
                {
                    updatePages(scope.currentPage, totalPages, scope.maxPagesToDisplay);
                }

                function updateCurrentPage(currentPage)
                {
                    updatePages(currentPage, scope.totalPages, scope.maxPagesToDisplay);
                }

                function updateMaxPages(maxPages)
                {
                    updatePages(scope.currentPage, scope.totalPages, maxPages);
                }

                function updatePages(currentPage, totalPages, maxPages)
                {
                    var pages = [];
                    currentPage = parseInt(currentPage);
                    var selectedPage = currentPage + PagerConfig.offset;
                    var firstPage = -PagerConfig.offset;
                    var lastPage = totalPages-PagerConfig.offset;

                    scope.selectedPage = selectedPage;
                    var prelimStart = selectedPage - Math.floor(maxPages / 2);
                    var adjustedStart = Math.max(prelimStart, firstPage);
                    var prelimEnd = selectedPage + Math.ceil(maxPages / 2) + (adjustedStart - prelimStart);
                    var adjustedEnd = Math.min(prelimEnd, lastPage);
                    var finalStart = Math.max(firstPage, adjustedStart - (prelimEnd - adjustedEnd));
                    
                    for(var i = finalStart; i < adjustedEnd; i++)
                    {
                        var pageNumber = i + PagerConfig.offset;
                        pages.push({pageNumber: pageNumber, isCurrent: pageNumber == selectedPage });
                    }
                    scope.pages = pages;
                    scope.displayFirstPage = finalStart > firstPage;
                    scope.hasPreBuffer = finalStart > (firstPage + 1);
                    scope.hasPostBuffer = adjustedEnd < (lastPage - 1);
                    scope.displayLastPage = adjustedEnd < lastPage;
                    scope.hasPreviousPage = selectedPage > 0;
                    scope.hasNextPage = selectedPage < totalPages - 1;
                    scope.totalPages = totalPages;
                }
            }
        };
        return definition;
    }]);
})();
