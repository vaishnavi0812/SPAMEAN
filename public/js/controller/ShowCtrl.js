angular.module('ShowCtrl', []).controller('ShowController', function($scope, $http){
    $scope.show_data = function(){
        $http.get('/api/abouts').then(function(res){
            console.log(res);
            $scope.receive_data=res.data;
        });
    };
});