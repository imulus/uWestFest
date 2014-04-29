angular.module('umbraco').controller('UrlPickerController', function($scope, dialogService, entityResource) {
/*  $scope.model.value = {
  	"type" : "content",
  	"meta" : {
  		"title" : "My awesome title",
  		"newWindow" : true
  	},
  	"typeData": {
  		"url" : "http://google.com",
  		"contentId" : 1051,
  		"mediaId" : 1052
  	}
  };*/
  //$scope.model.value = "";

  init();

  $scope.switchType = function(type) {
      $scope.model.value.type = type;
  }

  $scope.resetType = function (type) {
      if (type == "content") {
          $scope.model.value.typeData.contentId = null;
          $scope.contentName = "";
      } else if (type == "media") {
          $scope.model.value.typeData.mediaId = null;
          $scope.mediaName = "";
      } else {
          $scope.model.value.typeData.url = "";
      }
  }

  $scope.openTreePicker = function (type) {
  	var ds = dialogService.treePicker({
  		section: type,
  		treeAlias: type,
  		scope: $scope,
  	    startNodeId: getStartNodeId(type),
  		multiPicker: false,
  		callback: function(data) {
        if(type == "content") {
          $scope.model.value.typeData.contentId = data.id;
    			$scope.contentName = getEntityName(data.id, "Document");
        } 
        else {
          $scope.model.value.typeData.mediaId = data.id;
          $scope.mediaName = getEntityName(data.id, "Media");
        }
  		}
  	});
  }

  function getStartNodeId(type) {
      if (type == "content") {
          return $scope.model.config.contentStartNode
      } else {
          return $scope.model.config.mediaStartNode
      }
  }

  function getEntityName(id, typeAlias) {
    if(!id) {
      return "";
    }

    return entityResource.getById(id, typeAlias).then(function(entity) {
      return entity.name;
    });
  }

  // Setup "render model" & defaults
  function init() {

    if (!$scope.model.config.contentStartNode)
        $scope.model.config.contentStartNode = -1;

    if (!$scope.model.config.mediaStartNode)
        $scope.model.config.mediaStartNode = -1;

    $scope.model.value = $scope.model.value || { "type": "url", "meta" : { "title" : "", "newWindow" : true },"typeData": {"url" : "", "contentId" : null, "mediaId" : null} };

    if($scope.model.value.typeData.contentId) {
      $scope.contentName = getEntityName($scope.model.value.typeData.contentId, "Document");
    }

    if($scope.model.value.typeData.mediaId) {
      $scope.mediaName =  getEntityName($scope.model.value.typeData.mediaId, "Media");
    }
  }
});
