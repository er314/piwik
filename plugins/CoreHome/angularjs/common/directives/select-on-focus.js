/*!
 * Piwik - free/libre analytics platform
 *
 * @link http://piwik.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

/**
 * On focus (click, tab) selects the text within the current element
 *
 * Example:
 * <div piwik-select-on-focus>my dialog</div>
 */
(function () {
    angular.module('piwikApp.directive').directive('piwikSelectOnFocus', piwikSelectOnFocus);

    function piwikSelectOnFocus(){
        return {
            restrict: 'A',
            link: function(scope, element, attr, ctrl) {

                var focusedElement = null;

                function onFocusHandler(event) {
                    if (focusedElement !== this) {
                        // only select when not already selected
                        focusedElement = this;
                        angular.element(this).select();
                    }
                }

                function onBlurHandler(event) {
                    focusedElement = null;
                }

                element.on('focus', onFocusHandler);
                element.on('blur', onBlurHandler);
                scope.$on('$destroy', function() {
                    element.off('focus', onFocusHandler);
                    element.off('blur', onBlurHandler);
                });
            }
        };
    }
})();
