import app from './app';

describe('app', () => {

  describe('DetailsController', () => {
    let ctrl;

    beforeEach(() => {
      angular.mock.module(app);

      angular.mock.inject(($controller) => {
        ctrl = $controller('DetailsController', {});
      });
    });

    it('should set the selected card after receiving notification that the cards array is completed', function() {
        expect(ctrl.selected).toBeDefined();
    });
  });
});