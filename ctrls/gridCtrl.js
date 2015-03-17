function gridCtrl($scope, $http, pickAlphabet )
{
	$scope.studyMode = 'a2p';  //a2p p2a
	$scope.initCellInfos = function(datas){
	    $scope.cellInfos = new Array();
	    
	    $scope.displayType = 'random';//all upper lower random
	    $scope.orderType = 'random';
	    
	    for(i = 0; i < datas.length; i++){
	      	  $scope.cellInfos[i] = {text:"A", audios:"", data:null};
	      	  $scope.cellInfos[i].text = datas[i].text;
	      	  $scope.cellInfos[i].audios = datas[i].pronouce;
	 		  $scope.cellInfos[i].data = datas[i];
	    }
	};
	
	$scope.randomCellInfos = function(){
		var aReturn = new Array();
		var nLen = 0;
		
		for(i = 0; i < $scope.cellInfos.length; i++){
			aReturn[i] = $scope.cellInfos[i];
		}
		
		while(aReturn.length > 0){
			var nIndex = Math.round(Math.random() * (aReturn.length - 1));
			$scope.cellInfos[nLen] = aReturn[nIndex];
			nLen = nLen + 1;
			aReturn.splice(nIndex, 1);
		}
		$scope.orderType = 'random';
	};
	
	$scope.compareCellInfos = function (a, b){
		return (a.data.lower > b.data.lower)? 1 : -1;
	};

	$scope.sortCellInfos = function(){
		$scope.cellInfos.sort($scope.compareCellInfos);
		$scope.orderType = 'asc';
	};
		
	$http.get('datas/alphabets.json').success(function(data){
		$scope.alphabets = data;
		$scope.initCellInfos($scope.alphabets);
		$scope.randomCellInfos();
		$scope.randomAlphabet();
	});
	
	$scope.randomAlphabet = function(){
		if($scope.alphabets != undefined){
			$scope.curAlphabet = $scope.alphabets[(Math.round(Math.random() * ($scope.alphabets.length - 1)))].ch;
		}
	};
	
	$scope.checkUserClick = function(ch){
		if($scope.studyMode == 'a2p'){
			$scope.playAudioRes([ch]);
		}else{
			if($scope.curAlphabet == ch){
				$scope.randomAlphabet();
				$scope.playAudioRes(['right', $scope.curAlphabet]);
			}else{
				$scope.playAudioRes(['wrong', $scope.curAlphabet]);
			}
		}
	};
	
	$scope.playAudioRes  = function(aAudios){
		var eAudio = document.getElementById('audioRes_' + aAudios[0]);
		eAudio.play(aAudios[0]);
		eAudio.onended = function(){
			aAudios.splice(0,1);
			eAudio.load();
			eAudio.onended = undefined;
			if(aAudios.length > 0){
				$scope.playAudioRes(aAudios);
			}
		};
	};
	
	$scope.$watch('displayType', function(value){
		if($scope.cellInfos != undefined && value != undefined){
			for(i = 0; i < $scope.cellInfos.length; i++){
				switch(value){
					case 'all':$scope.cellInfos[i].text = $scope.cellInfos[i].data.upper + $scope.cellInfos[i].data.lower;break;
					case 'upper':$scope.cellInfos[i].text = $scope.cellInfos[i].data.upper;break;
					case 'random':$scope.cellInfos[i].text = ((Math.random() > 0.5) ? $scope.cellInfos[i].data.upper : $scope.cellInfos[i].data.lower); break;
					case 'lower':$scope.cellInfos[i].text = $scope.cellInfos[i].data.lower;break;
					default:$scope.cellInfos[i].text = $scope.cellInfos[i].data.upper + $scope.cellInfos[i].data.lower;
				};
				
			}
		}
	}); 
	$scope.$watch('studyMode', function(value){
		$scope.studyMode = value;
		$scope.randomAlphabet();
		if(value == 'p2a'){
			$scope.playAudioRes([$scope.curAlphabet]);
		}
	});
};