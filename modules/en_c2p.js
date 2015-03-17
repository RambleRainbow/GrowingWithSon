var en_c2p = angular.module('en_c2p',[])
	.factory('pickAlphabet', function(){
	  return function(datas){
	  	var arrayIndex = new Array();
	  	var arrayReturn = new Array();
	  	
	  	for(i = 0; i < datas.length; i++){
	  		arrayIndex[i] = i;
	  	}
	  	
	  	for(i = 0; i < 9; i++){
			var nIndex = Math.round(Math.random() * (arrayIndex.length - 1));
			arrayReturn[i] = datas[arrayIndex[nIndex]];
			arrayIndex.splice(nIndex,1); 	
	  	}
	  	return arrayReturn;
	  };
	})
	.filter('cellText', [function(){
		function cellTextFilter(cellInfos,displayType){
		}
		return cellTextFilter;
	}])
	.controller('gridCtrl', ['$scope', '$http', 'pickAlphabet', gridCtrl]);
