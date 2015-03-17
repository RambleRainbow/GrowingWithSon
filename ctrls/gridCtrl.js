function gridCtrl($scope, $http, pickAlphabet )
{
	$scope.studyMode = 'a2p';  //a2p p2a
	$scope.rangeCell = function(datas){
		var cellSize = 100;
		var cellMargin = 10;
		var fontMargin = 40;
	
	    var nIndex = 0;
	    var bFinished = false;
	    var nRow = 0;
	    
	    var cellStyles = new Array();
	    
	    $scope.cellSize = 100;
	    $scope.displayType = 'random';//all upper lower random
	    $scope.orderType = 'random';
	    
	    while(!bFinished)
	    {
	      for(i = 0; i < 3; i++)
	      {
	 		if(nIndex < datas.length)
	 		{
	      	  cellStyles[nIndex] = {text:"A",left:"0px", top:"100px", width:"180px", height:"180px", fontSize:"", audios:"", data:null};
	      	  cellStyles[nIndex].text = datas[nIndex].text;
	      	  cellStyles[nIndex].audios = datas[nIndex].pronouce;
	 		  cellStyles[nIndex].left = String(i*cellSize + cellMargin * (i+1)) + "px";
	 		  cellStyles[nIndex].top = String(nRow*cellSize + cellMargin * (nRow+1) + 100) + "px";
	 		  cellStyles[nIndex].width= String(cellSize) + "px";
	 		  cellStyles[nIndex].height = String(cellSize) + "px";
	 		  cellStyles[nIndex].fontSize = String(cellSize - fontMargin) + 'px';
	 		  cellStyles[nIndex].data = datas[nIndex];
	 		}
	 		else
	 		{
	 		  bFinished = true;
	 		  break;
	 		}
	 		nIndex++;
	      }
	      nRow++;
	   }
	   return cellStyles;	
	};
	
	$scope.regenrateCellInfos = function(alphabets){
	  	$scope.cellInfos = null;
	    $scope.cellInfos = $scope.rangeCell(alphabets);;
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
		$scope.regenrateCellInfos($scope.alphabets);
		$scope.randomCellInfos();
		$scope.randomAlphabet();
	});
	
	$scope.randomAlphabet = function(){
		$scope.curAlphabet = $scope.alphabets[(Math.round(Math.random() * ($scope.alphabets.length - 1)))].ch;
	};
	
	$scope.setStudyMode = function(mode){
		$scope.studyMode = mode;
		$scope.randomAlphabet();
		if(mode == 'p2a'){
			$scope.playAudioRes([$scope.curAlphabet]);
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
};