class DetailsController {
    constructor($scope, cardService) {
        var self = this;

        $scope.$on('CardsReady', function() {
            self.selected = cardService.cards[0];
        });

        $scope.$watch(function () { return cardService.cardSelected; },
            function (value) {
                self.selected = value;
            }
        );
    }
}

export default DetailsController;
