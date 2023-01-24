1/welcome message underneath profile/logo when user is logged in -- done
2/website name under logo maybe?
3/remove allhikes.js, seems to be redundant?
4/i get an error at requireauth ln 11 when logged out and visiting home, need to change the ternary there, which is strange, decoded is meant to be undefined? -- fixed, forgot the optional chaining before the method
5/ issue with window.google, apparently google only comes into play if i visit the crete hike section, probably initialised google there, gotta see how to move this, probably move all google stuff in the modal component
6/visiting profile-hikes when no hikes crashed the app, need conditionals there as well :DDD

