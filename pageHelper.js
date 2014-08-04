(function(){
'use strict';

app.factory('PageHelper', [function () {
    return {
        init: function () {
            return {
                totalPages: 1,
                pageNumber: 1,
                pages: [],
                hasPreviousPage: false,
                hasNextPage: false
            };
        },
        updatePageInfo: function (pageInfo, data) {
            pageInfo.totalPages = data.totalPages;
            pageInfo.pageNumber = data.pageNumber;
            pageInfo.hasPreviousPage = data.hasPreviousPage;
            pageInfo.hasNextPage = data.hasNextPage;
            pageInfo.pages = [];

            for (var i = 0; i < data.totalPages; i++) {
                pageInfo.pages.push({ number: i, active: data.pageNumber == i + 1 });
            }
        }
    };
}]);

})();
