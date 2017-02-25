(function() {
  angular
    .module("BlogApp", [])
    .controller("BlogController", BlogController);
//event handler when post is created
  function BlogController($scope, $http){
    $scope.createPost = createPost;

    function createPost(post) {
      console.log(post)
      $http.post("/api/blogpost", post);
    }
  }
})();
