describe('Pager', function () {
    beforeEach(module('ClubMiles'));

    describe('Pager ', function () {

        it('should create an unordered list item for each page', function () {

            inject(function ($compile, $rootScope) {
                var scope = $rootScope.$new();
                var newPageNum = null;
                scope.pager = {
                    totalPages: 1,
                    pageNumber: 2,
                    pages: [{ number: 0, active: false }, { number: 1, active: true }],
                    hasPreviousPage: false,
                    hasNextPage: false
                };
                scope.pageChanged = function (npn) { newPageNum = npn; };

                var element = $compile('<div pager="pager" page-changed="pageChanged(pageNum)">{{pager}}1</div>')(scope);

                scope.$digest();

                var initialState = element[0];
                expect(initialState.tagName).toEqual('UL');
                expect(initialState.className).toContain('pagination');

                var initialPages = initialState.getElementsByTagName("LI");
                expect(initialPages.length).toEqual(4);
                expect(initialPages[0].className).toContain('disabled');
                expect(initialPages[1].innerText.trim()).toEqual('1');
                expect(initialPages[2].innerText.trim()).toEqual('2');
                expect(initialPages[2].className).toContain('active');
                expect(initialPages[3].className).toContain('disabled');

                scope.pager.pages.push({ number: 2, active: false });
                scope.pager.hasPreviousPage = true;
                scope.pager.hasNextPage = true;
                scope.pager.pageNumber = 1;
                scope.$digest();

                var updatedState = element[0];
                var updatedPages = updatedState.getElementsByTagName("LI");
                expect(updatedPages.length).toEqual(5);
                expect(updatedPages[0].className).not.toContain('disabled');
                expect(updatedPages[1].innerText.trim()).toEqual('1');
                expect(updatedPages[1].className).toContain('active');
                expect(updatedPages[2].innerText.trim()).toEqual('2');
                expect(updatedPages[2].className).not.toContain('active');
                expect(updatedPages[3].innerText.trim()).toEqual('3');
                expect(updatedPages[4].className).not.toContain('disabled');

                $(updatedPages[3].getElementsByTagName("a")[0]).click();

                expect(newPageNum).toEqual(3);
            });
        });
    });
});
