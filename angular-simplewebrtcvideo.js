angular.module('simplewebrtc', ['simplewebrtc'])
      .factory('SimpleWebRTC', function() {
         return SimpleWebRTC;
      })
       .directive('screenshare', function(SimpleWebRTC) {
          return {
             restrict: 'AE',
             template: '<div id="simplewebrtc-local"></div><div id="simplewebrtc-remote"></div>',
             link: function(scope, elem, attrs) {
                var webrtc = new SimpleWebRTC({
                   // the id/element dom element that will hold "our" video
                   localVideoEl: 'simplewebrtc-local',
                   // the id/element dom element that will hold remote videos
                   remoteVideosEl: 'simplewebrtc-remote',
                   // immediately ask for camera access
                   autoRequestMedia: true
                });
                webrtc.on('readyToCall', function () {
                   webrtc.joinRoom(attrs.room);
                });
             }
          }
       });
