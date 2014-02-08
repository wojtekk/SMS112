/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
        alert(1);
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        alert(2);

        app.receivedEvent('deviceready');

        app.start();
//
//        var onSuccess = function(position) {
//            document.getElementById("geo").innerHTML('Latitude: '          + position.coords.latitude          + '<br />' +
//                'Longitude: '         + position.coords.longitude         + '<br />' +
//                'Altitude: '          + position.coords.altitude          + '<br />' +
//                'Accuracy: '          + position.coords.accuracy          + '<br />' +
//                'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '<br />' +
//                'Heading: '           + position.coords.heading           + '<br />' +
//                'Speed: '             + position.coords.speed             + '<br />' +
//                'Timestamp: '         + position.timestamp                + '<br />');
//        };
//
//// onError Callback receives a PositionError object
////
//        function onError(error) {
//            alert('code: '    + error.code    + '\n' +
//                'message: ' + error.message + '\n');
//        }
//
//        navigator.geolocation.getCurrentPosition(onSuccess, onError);


    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {

    },

    start: function() {
        alert(3);
        document.querySelector('#start').style.display = 'block';

        var parts = [];

        var list = document.querySelectorAll('#start .link, #fire .link, #noofpeople .link, #address .link, #send .link');
        for (var i = 0; i < list.length; i++) {
            list[i].addEventListener('click', function(event) {
                document.querySelector('#' + this.getAttribute('data-hide')).style.display = 'none';
                document.querySelector('#' + this.getAttribute('data-next')).style.display = 'block';
                parts[parts.length] = this.innerHTML;
//                  parts[parts.length] = this.getAttribute('data-text');
                document.querySelector('#sms').innerHTML = parts.join(', ');
                document.body.scrollTop = document.documentElement.scrollTop = 0;
            }, false);
        }


    }
};
