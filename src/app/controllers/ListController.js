class ListController {
    constructor($scope, cardService) {
        var self = this;
        self.cards = cardService.cards;
        self.cardClicked = function(index){
            cardService.itemClicked(index);
        };

        self.activeIndex = 0;
        $scope.$watch(function () { return cardService.indexSelected; },
            function (value) {
                self.activeIndex = value != null ? value : self.activeIndex;
                console.log('activeIndex: ');
                console.log(self.activeIndex);
            }
        );

    }
}

export default ListController;
