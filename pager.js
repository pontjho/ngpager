(function() {
    'use strict';

    angular.module('Pager', [])
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
                    var pagesLeft = totalPages - currentPage;
                    var pagesAfterCurrent = Math.min(totalPages - currentPage, maxPages);
                    var pagesBeforeCurrent = Math.max(0, maxPages - pagesAfterCurrent);

                    var start = currentPage - pagesBeforeCurrent;
                    var end = currentPage + pagesAfterCurrent;

                    scope.hasPreBuffer = start !== 0;
                    scope.hasPostBuffer = end !== totalPages;

                    for(var i = start; i < end; i++)
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
