angular.module('ICF')
    .controller('UploadFileController', function($scope, $http) {
        $scope.uploadFile = function() {

            var file = $scope.myFile;
            var uploadUrl = "http://127.0.0.1:8888/api/upload";
            var fd = new FormData();
            fd.append('file', file);

            $http.post(uploadUrl, fd, {
                    transformRequest: angular.identity,
                    headers: { 'Content-Type': undefined }
                })
                .success(function() {
                    console.log("success!!");
                })
                .error(function(error) {
                    console.log("error!!");
                    console.log(error);
                });
        };

    });