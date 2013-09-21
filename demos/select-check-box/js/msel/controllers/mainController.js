app.controller('MainCtrl', function($rootScope, $scope, $window, $location,$timeout) {
  $scope.selects = [
    {id: '1', name: 'Offer 1',isChecked:true},
    {id: '2', name: 'Offer 2',isChecked:true},
    {id: '3', name: 'Offer 3',isChecked:false},
    {id: '4', name: 'Offer 4',isChecked:false},
    {id: '5', name: 'Offer 5',isChecked:false},
    {id: '6', name: 'Offer 6',isChecked:false},
    {id: '7', name: 'Offer 7',isChecked:false},
    {id: '8', name: 'Offer 8',isChecked:false},
    {id: '9', name: 'Offer 9',isChecked:false}
  ];
});