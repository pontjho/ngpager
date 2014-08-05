(function() {
    'use strict';

    angular.module('Pager', ['ngpagerTemplates'])
    .directive('pager', [function () {
        var definition = {
            restrict: 'A',
            scope: { currentPage: '=', totalPages: '=', maxPagesToDisplay: '@', pageChanged: '&' },
            replace: true,
            templateUrl: 'pager.tpl.html',

            link: function (scope, iElement, iAttrs) {
                scope.changed = function (newPage) {
                    if(!newPage)
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
                }
            }
        };
        return definition;
    }]);
})();
