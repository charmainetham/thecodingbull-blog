(function() {
  angular
    .module("BlogApp", [])
    .controller("BlogController", BlogController);
//event handler when post is created
  function BlogController($scope, $http){
    $scope.createPost = createPost;
    $scope.deletePost = deletePost;
    $scope.editPost = editPost;
    $scope.updatePost = updatePost;

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
      $http
        .post("/api/blogpost", post)
        .success(getAllPosts)
    }

    function deletePost(postId){
      $http
        .delete("/api/blogpost/"+postId)
        .success(getAllPosts)
    }

    function editPost(postId){
      console.log("I'm in here")
      $http
        .get("/api/blogpost/"+postId)
        .success(function(post){
          $scope.post = post;
        })
    }

     function updatePost(post) {
      console.log(post)
      $http
        .put("/api/blogpost/"+post._id, post)
        .success(getAllPosts);
    }
  }
})();
