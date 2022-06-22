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
    $scope.reverse = false;
    $scope.predicate = ['model.type', 'model.name'];
    $scope.order = function (predicate) {
      $scope.reverse = $scope.predicate[1] === predicate ? !$scope.reverse : false;
      $scope.predicate[1] = predicate;
    };
    $scope.query = '';

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

    $scope.isSelected = function (item) {
      return $scope.temps.indexOf(item) !== -1;
    };

    $scope.selectOrUnselect = function (item, $event) {
      var indexInTemp = $scope.temps.indexOf(item);
      var isRightClick = $event && $event.which == 3;

      if ($event && $event.target.hasAttribute('prevent')) {
        $scope.temps = [];
        return;
      }
      if (!item || (isRightClick && $scope.isSelected(item))) {
        return;
      }
      if ($event && $event.shiftKey && !isRightClick) {
        var list = $scope.fileList;
        var indexInList = list.indexOf(item);
        var lastSelected = $scope.temps[0];
        var i = list.indexOf(lastSelected);
        var current = undefined;
        if (lastSelected && list.indexOf(lastSelected) < indexInList) {
          $scope.temps = [];
          while (i <= indexInList) {
            current = list[i];
            !$scope.isSelected(current) && $scope.temps.push(current);
            i++;
          }
          return;
        }
        if (lastSelected && list.indexOf(lastSelected) > indexInList) {
          $scope.temps = [];
          while (i >= indexInList) {
            current = list[i];
            !$scope.isSelected(current) && $scope.temps.push(current);
            i--;
          }
          return;
        }
      }
      if ($event && !isRightClick && ($event.ctrlKey || $event.metaKey)) {
        $scope.isSelected(item) ? $scope.temps.splice(indexInTemp, 1) : $scope.temps.push(item);
        return;
      }
      $scope.temps = [item];
    };

    $scope.singleSelection = function () {
      return $scope.temps.length === 1 && $scope.temps[0];
    };

    $scope.totalSelecteds = function () {
      return {
        total: $scope.temps.length,
      };
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
