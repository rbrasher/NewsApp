/**
 * Created by ron on 2/27/2015.
 */
'use strict';

app.filter('hostnameFromUrl', function() {
  return function(str) {
    var url = document.createElement('a');

    url.href = str;

    return url.hostname;
  };
});
