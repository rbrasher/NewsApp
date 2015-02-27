/**
 * Created by ron on 2/27/2015.
 */
'use strict';

app.factory('PostService', function($firebase, FIREBASE_URL) {
  var ref = new Firebase(FIREBASE_URL);
  var posts = $firebase(ref.child('posts')).$asArray();

  var PostService = {
    all: posts,
    create: function(post) {
      return posts.$add(post).then(function(postRef) {
        $firebase(ref.child('user_posts').child(post.creatorUID)).$push(postRef.name());
        return postRef;
      });
    },
    get: function(postId) {
      return $firebase(ref.child('posts').child(postId)).$asObject();
    },
    delete: function(post) {
      return posts.$remove(post);
    },
    comments: function(postId) {
      return $firebase(ref.child('comments').child(postId)).$asArray();
    }

    //TODO: add update function
  };
  return PostService;
});
