angular.module('portainer.app').controller('ScenesController', ScenesController);
import _ from 'lodash';

function ScenesController($scope, $state, $async, ModalService, SceneService, PaginationService, Notifications) {
  $scope.state = {
    actionInProgress: false,
    pagination_count_scenes: PaginationService.getPaginationLimit('scenes'),
    scenes: [],
  };

  $scope.handleClick = (item) => {
    Notifications.success(item.Name, '');
  };
  
  $scope.removeAction = removeAction;

  function removeAction(item) {
    ModalService.confirmDeletion(
      'Are you sure that you want to remove the selected ?',
      (confirmed) => {
        if (confirmed) {
          return $async(removeActionAsync, item);
        }
      }
    );
  }

  async function removeActionAsync(item) {
    try {
      await SceneService.deleteScene(item.Id).then(() => {
        Notifications.success('Scenes successfully removed', item.Name);
        _.remove($scope.scenes, item);
      });
    } catch (err) {
      Notifications.error('Failure', err, 'Unable to remove scenes');
    }

    $state.reload();
  }

  function initView() {
    SceneService.scenes()
      .then((data) => {
        $scope.state.scenes = data;
      })
      .catch((err) => {
        Notifications.error('Failure', err, 'Unable to retrieve scenes');
        $scope.state.scenes = [];
      });
  }

  initView();
}
