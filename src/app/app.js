import angular from 'angular';
import $ from "jquery";
import 'malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.concat.min';
import 'malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';
import 'bootstrap/dist/css/bootstrap.css';
import ListController from './controllers/ListController';
import DetailsController from './controllers/DetailsController';

import '../style/app.css';
import '../style/card-desk.scss';

$(window).on('load',function(){
    if ($('.js-sidebar').length > 0) {
        $('.js-sidebar').mCustomScrollbar({
            axis:'y',
            theme: 'minimal-dark',
            scrollbarPosition: 'inside',
            scrollInertia: 300,
        });
    }
});

let app = () => {
  return {
    template: require('../views/app.html'),
  }
};

const MODULE_NAME = 'app';

angular.module(MODULE_NAME, [])
    .directive('app', app)
    .factory("cardService", function($http, $rootScope) {

        var cardService = {};

        cardService.cards = [];
        cardService.cardNameArr = [
            'Burial from a Different Dimension',
            'Charge of the Light Brigade',
            'Infernoid Antra',
            'Infernoid Attondel',
            'Infernoid Decatron',
            'Infernoid Devyaty',
            'Infernoid Harmadik',
            'Infernoid Onuncu',
            'Infernoid Patrulea',
            'Infernoid Pirmais',
            'Infernoid Seitsemas',
            'Lyla, Lightsworn Sorceress',
            'Monster Gate',
            'One for One',
            'Raiden, Hand of the Lightsworn',
            'Reasoning',
            'Time-Space Trap Hole',
            'Torrential Tribute',
            'Upstart Goblin',
            'Void Seer'
        ];
        cardService.cardNameArr.forEach(cardName => {
            $http.get('http://52.57.88.137/api/card_data/'+cardName).then(function(response) {
                cardService.cardData = response.data;
                cardService.cards.push({
                    name: cardService.cardData.data.name,
                    description: cardService.cardData.data.text,
                    card_type: cardService.cardData.data.card_type || 'Not available',
                    type: cardService.cardData.data.type || ' Not available ',
                    family: cardService.cardData.data.family || ' Not available ',
                    atk: cardService.cardData.data.atk || ' Not available ',
                    def: cardService.cardData.data.def || ' Not available ',
                    level: cardService.cardData.data.level || ' Not available ',
                    property: cardService.cardData.data.property || ' Not available ',
                });
                $rootScope.$broadcast('CardsReady');
            });
        });

        cardService.itemClicked = function(index) {
            cardService.cardSelected = cardService.cards[index];
            cardService.indexSelected = index;
        };
        return cardService;
    })
    .component('cardList', {
        controller: ListController,
        templateUrl: '../views/card-list.html'
    })
    .component('cardDetails', {
        controller: DetailsController,
        templateUrl: '../views/card-details.html'
    });
export default MODULE_NAME;