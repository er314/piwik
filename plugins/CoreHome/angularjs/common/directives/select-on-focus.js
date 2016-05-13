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

                var isPreElement = (element.prop('tagName') + '').toLowerCase() === 'pre';

                function onFocusHandler(event) {
                    if (focusedElement !== this) {
                        focusedElement = this;
                        angular.element(this).select();
                    }
                }

                function onClickHandler(event) {
                    // .select() + focus and blur seems to not work on pre elements
                    var range = document.createRange();
                    range.selectNode(this);
                    window.getSelection().addRange(range);
                }

                function onBlurHandler(event) {
                    focusedElement = null;
                }

                if (isPreElement) {
                    element.on('click', onClickHandler);
                } else {
                    element.off('focus', onFocusHandler);
                    element.off('blur', onBlurHandler);
                }

                scope.$on('$destroy', function() {
                    if (isPreElement) {
                        element.off('click', onClickHandler);
                    } else {
                        element.off('focus', onFocusHandler);
                        element.off('blur', onBlurHandler);
                    }
                });
            }
        };
    }
})();
