(function () {
    'use-strict';
    angular.module('tc.modal', ['ngSanitize']);

    angular.module('tc.modal').run(['$templateCache', function ($templateCache) {
        $templateCache.put('tc.modal.tmp.html', '<div id="{{defaultOptions.modalId}}" class="modal fade" role="dialog" data-keyboard="false" data-backdrop="static">'
            + '<div class="modal-dialog">'
            + '<div class="modal-content">'
            + '<div class="modal-header">'
            + '<button type="button" class="close" data-dismiss="modal">&times;</button>'
            + '<h4 class="modal-title">{{defaultOptions.modalTitle}}</h4>'
            + '</div>'
            + '<div class="modal-body">'
            + '<div ng-transclude></div>'
            + '</div>'
            + '<div class="modal-footer" ng-if="defaultOptions.hasFooter">'
            + '<button type="button" class="btn btn-default" data-dismiss="modal" ng-if="defaultOptions.modalType==\'alert\'">{{defaultOptions.btnLabel}}</button>'
            + '<button type="button" class="btn btn-default" data-dismiss="modal" ng-if="defaultOptions.modalType==\'confirm\'">{{defaultOptions.btnLeftLabel}}</button>'
            + '<button type="button" class="btn btn-default" data-dismiss="modal" ng-if="defaultOptions.modalType==\'confirm\'" ng-click="submitFn()">{{defaultOptions.btnRightLabel}}</button>'
            + '</div>'
            + '</div></div></div>');
    }]);

    angular.module('tc.modal').factory('ModalService', function () {
        var $this = {};

        $this.show = function (id) {
            if (typeof id == undefined || id == null) {
                id = 'ngModal';
            };
            $('#' + id).modal('show');
        }

        $this.hide = function (id) {
            if (typeof id == undefined || id == null) {
                id = 'ngModal';
            };
            $('#' + id).modal('hide');
        }

        return $this;
    });

    angular.module('tc.modal').directive('tcModal', ['$sce', function ($sce) {
        return {
            restrict: 'E',
            transclude: true,
            templateUrl: 'tc.modal.tmp.html',
            scope: {
                options: '=configs',
                submitFn: '&?submitCallback'
            },
            link: function (scope, elm, attr) {
                scope.defaultOptions = {
                    modalId: 'ngModal',
                    modalTitle: 'Modal Title',
                    modalType: 'alert',
                    hasFooter: true,
                    btnLabel: 'OK',
                    btnLabel: 'Cancel',
                    btnRightLabel: 'Submit'
                }

                angular.extend(scope.defaultOptions, scope.options);
            }
        }
    }]);
})();