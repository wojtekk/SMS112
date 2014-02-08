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
    initGeo: function () {

        var onSuccess = function(position) {
            alert('Latitude: ' + position.coords.latitude + '\n' +
                'Longitude: ' + position.coords.longitude + '\n' +
                'Altitude: ' + position.coords.altitude + '\n' +
                'Accuracy: ' + position.coords.accuracy + '\n' +
                'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '\n' +
                'Heading: ' + position.coords.heading + '\n' +
                'Speed: ' + position.coords.speed + '\n' +
                'Timestamp: ' + position.timestamp + '\n');
        };

// onError Callback receives a PositionError object
//
        function onError(error) {
            alert('code: ' + error.code + '\n' +
                'message: ' + error.message + '\n');
        }
alert(navigator);
        alert(navigator.geolocation);
        alert(navigator.geolocation.getCurrentPosition)
        navigator.geolocation.getCurrentPosition(onSuccess, onError);

    },
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');

        app.initGeo();

        app.start();

    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {

    },
    start: function() {
        document.querySelector('#start').style.display = 'block';

//          pytania główne
        var parts = [];
        parts[parts.length] = localStorage.getItem('name');


        navigator.geolocation.getCurrentPosition(function(position) {
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;
            var accuracy = position.coords.accuracy;

            document.querySelector('#question-address-gps').setAttribute('data-text', latitude + '|' + longitude + '|' + accuracy);

            var geocoder = new google.maps.Geocoder();
            var lat = parseFloat(latitude);
            var lng = parseFloat(longitude);
            var latlng = new google.maps.LatLng(lat, lng);
            geocoder.geocode({'latLng': latlng}, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    if (results[1]) {
                        document.querySelector('#question-address-gps').innerHTML += results[1].formatted_address;
                        document.querySelector('#question-address-gps').setAttribute('data-text', document.querySelector('#question-address-gps').getAttribute('data-text') + '|' + results[1].formatted_address);
                    } else {
                        console.log('No results found');
                        alert('No results found');
                        document.querySelector('#question-address-gps').innerHTML += 'nie znaleziono'
                    }
                } else {
                    document.querySelector('#question-address-gps').innerHTML += 'błąd'
                    console.log('Geocoder failed due to: ' + status);
                    alert('Geocoder failed due to: ' + status);
                }
            });

        }, function(error) {
            console.log(error);
            alert(error);
        });

        document.querySelector('#question-address1').setAttribute('data-text', localStorage.getItem('address1'));

        document.querySelector('#question-address2').innerHTML = localStorage.getItem('address2-description');
        document.querySelector('#question-address2').setAttribute('data-text', localStorage.getItem('address2-value'));

        var list = document.querySelectorAll('#start .link, #fire .link, #noofpeople .link, #address .link, #send .link');
        for (var i = 0; i < list.length; i++) {
            list[i].addEventListener('click', function(event) {
                document.querySelector('#' + this.getAttribute('data-hide')).style.display = 'none';
                document.querySelector('#' + this.getAttribute('data-next')).style.display = 'block';
                parts[parts.length] = this.getAttribute('data-text');
                document.querySelector('#sms').innerHTML = parts.join(', ');
                document.body.scrollTop = document.documentElement.scrollTop = 0;
            }, false);
        }

//          ustawienia
        var list = document.querySelectorAll('#start .settings');

        for (var i = 0; i < list.length; i++) {
            list[i].addEventListener('click', function(event) {
                document.querySelector('#' + this.getAttribute('data-hide')).style.display = 'none';
                document.querySelector('#' + this.getAttribute('data-next')).style.display = 'block';

                document.querySelector('#name').value = localStorage.getItem('name');
                document.querySelector('#address1').value = localStorage.getItem('address1');
                document.querySelector('#address2-description').value = localStorage.getItem('address2-description');
                document.querySelector('#address2-value').value = localStorage.getItem('address2-value');

                document.body.scrollTop = document.documentElement.scrollTop = 0;
            }, false);
        }

        document.querySelector('#finish').addEventListener('click', function(event) {
            parts = [];
            parts[parts.length] = localStorage.getItem('name');
            document.querySelector('#sms').innerHTML = '';
        });

        document.querySelector('#save').addEventListener('click', function(event) {
            localStorage.setItem('name', document.querySelector('#name').value);

            parts[parts.length] = localStorage.getItem('name');

            localStorage.setItem('address1', document.querySelector('#address1').value);
            document.querySelector('#question-address1').setAttribute('data-text', document.querySelector('#address1').value);

            localStorage.setItem('address2-description', document.querySelector('#address2-description').value);
            document.querySelector('#question-address2').innerHTML = document.querySelector('#address2-description').value;

            localStorage.setItem('address2-value', document.querySelector('#address2-value').value);
            document.querySelector('#question-address2').setAttribute('data-text', document.querySelector('#address2-value').value);

            document.querySelector('#' + this.getAttribute('data-hide')).style.display = 'none';
            document.querySelector('#' + this.getAttribute('data-next')).style.display = 'block';

            document.body.scrollTop = document.documentElement.scrollTop = 0;
        }, false);
    }
};
