(function() {
  angular
    .module("BlogApp", [])
    .controller("BlogController", BlogController);
//event handler when post is created
  function BlogController($scope, $http){
    $scope.createPost = createPost;
    $scope.deletePost = deletePost;

    function init(){
      getAllPosts();
    };

    init();


    function getAllPosts(){
      $http
        .get("api/blogpost")
        .success(function(posts){
          $scope.posts = posts;
        })
    }

    function createPost(post) {
      console.log(post)
      $http
        .post("/api/blogpost", post)
        .success(getAllPosts)
    }

    function deletePost(postId){
      console.log('Hey Imdeleting')
      $http
        .delete("/api/blogpost/"+postId)
        .success(getAllPosts)
    }


  }
})();
