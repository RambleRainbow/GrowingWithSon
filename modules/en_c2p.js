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
			if(cellInfos == undefined){
			  return cellInfos;
			}
			else{
				for(i = 0; i < cellInfos.length; i++){
					switch(displayType){
						case 'all':cellInfos[i].text = cellInfos[i].data.upper + cellInfos[i].data.lower;break;
						case 'upper':cellInfos[i].text = cellInfos[i].data.upper;break;
						case 'random':cellInfos[i].text = ((Math.random() > 0.5) ? cellInfos[i].data.upper : cellInfos[i].data.lower); break;
						case 'lower':cellInfos[i].text = cellInfos[i].data.lower;break;
						default:cellInfos[i].text = cellInfos[i].data.upper + cellInfos[i].data.lower;
					};
					
				}
				return cellInfos;
			}
		}
		return cellTextFilter;
	}])
	.controller('gridCtrl', ['$scope', '$http', 'pickAlphabet', gridCtrl]);
