function gridCtrl($scope, $http, pickAlphabet )
{
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
	});
	
	$scope.togglex = function(){
		$scope.regenrateCellInfos($scope.alphabets);		
	};
};