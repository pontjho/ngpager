(function() {
    'use strict';

    angular.module('NgPager', ['ngPagerTemplates'])
    .directive('ngPager', [function () {
        var definition = {
            restrict: 'A',
            scope: { currentPage: '@', totalPages: '@', maxPagesToDisplay: '@', pageChanged: '&' },
            replace: true,
            templateUrl: 'ngPager.tpl.html',

            link: function (scope, iElement, iAttrs) {

                scope.changed = function (newPage) {
                    console.log(newPage, 'ya');
                    if(!newPage && newPage !== 0)
                        return;

                    if(newPage < 0 || newPage >= scope.totalPages)
                        return;

                    scope.pageChanged({ pageNum: newPage });
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
                    scope.currentPage = currentPage;
                    var prelimStart = currentPage - Math.floor(maxPages / 2);
                    var adjustedStart = Math.max(prelimStart, 0);
                    var prelimEnd = currentPage + Math.ceil(maxPages / 2) + (adjustedStart - prelimStart);
                    var adjustedEnd = Math.min(prelimEnd, totalPages);
                    var finalStart = Math.max(0, adjustedStart - (prelimEnd - adjustedEnd));
                    
                    for(var i = finalStart; i < adjustedEnd; i++)
                    {
                        pages.push({pageNumber: i, isCurrent: i == currentPage });
                    }
                    scope.pages = pages;
                    scope.hasPreBuffer = finalStart > 0;
                    scope.hasPostBuffer = adjustedEnd < totalPages;
                    scope.hasPreviousPage = currentPage > 0;
                    scope.hasNextPage = currentPage < totalPages;
                }
            }
        };
        return definition;
    }]);
})();
