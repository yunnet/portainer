// import {ItemViewModel} from '../../../models/item'

import './containerExplorer.css';

angular.module('portainer.docker').controller('ContainerExplorerController', [
  '$scope',
  '$transition$',
  'Notifications',
  'ContainerService',
  'HttpRequestHelper',
  'ExplorerService',
  function ($scope, $transition$, Notifications, ContainerService, HttpRequestHelper, ExplorerService) {
    $scope.explorerService = ExplorerService;
    $scope.fileList = [];
    $scope.temps = [];

    $scope.isInThisPath = function (path) {
      // var currentPath = $scope.explorerService.currentPath
      // var resulut = currentPath.indexOf(path) !== -1
      // console.log(":::::::::::::::::::::::::::::::  path =" + path + "  currentPath = " + currentPath)
      // return resulut

      return $scope.explorerService.currentPath.indexOf(path) !== -1;
    };

    $scope.onTextFilterChange = function () {
      return null;
    };

    $scope.changeOrderBy = function (name) {
      console.log(name);
      return null;
    };

    $scope.smartClick = function (item) {
      if (item.isFolder()) {
        return ExplorerService.folderClick(item);
      } else {
        Notifications.error('Failure', null, 'not supported');
      }
    };

    $scope.modal = function (id, hide, returnElement) {
      var element = angular.element('#' + id);
      element.modal(hide ? 'hide' : 'show');
      $scope.explorerService.error = '';

      return returnElement ? element : true;
    };

    function initView() {
      HttpRequestHelper.setPortainerAgentTargetHeader($transition$.params().nodeName);
      ContainerService.container($transition$.params().id)
        .then(function success(data) {
          $scope.container = data;

          ExplorerService.refresh($transition$.params().id, '/');
        })
        .catch(function error(err) {
          Notifications.error('Failure', err, 'Unable to retrieve container information');
        });
    }

    initView();
  },
]);
