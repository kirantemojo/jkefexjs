var app = angular.module('angularjs-starter',[]);
app.filter('selits',function(){
	return function(input){
	  var len = [];
      angular.forEach(input,function(value){
          if(value.isChecked)
          {
              len.push(value.isChecked);
          }
      });
      return len.length;
	}
});
app.directive('msel',function(){
	return {
		restrict: 'E',
		scope:{
			options:'='
		},
		require:  '^ngModel',
		replace: true,
		controller: function($scope,$element,$attrs){
			  $scope.selop = true;
			  $scope.toggle = function(){
			      $scope.selop = !$scope.selop;
			  };
		},
		template: '<div class="select msel">'+
			'<div class="butt"><button class="selectbox btn" ng-click="toggle()">{{ options | selits }} items Selected <span class="caret"></span></button></div>'+
			'<div class="listopt" ng-show="selop">'+
			'<ul class="nav">'+
			'<li ng-repeat="opts in options">'+
		    '<label><input type="checkbox" ng-model="opts.isChecked" name="opts.name"><span>{{opts.name}}</span></label>'+
		    '</li>'+
			'</ul>'+
			'</div></div>'
	};
});