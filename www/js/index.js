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
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');

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

            document.querySelector('#question-address-gps').setAttribute('data-text', 'GPS: ' + parseFloat(latitude).toFixed(6) +',' + parseFloat(longitude).toFixed(6));

            var geocoder = new google.maps.Geocoder();
            var lat = parseFloat(latitude);
            var lng = parseFloat(longitude);
            var latlng = new google.maps.LatLng(lat, lng);
            geocoder.geocode({'latLng': latlng}, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    if (results[1]) {
                        document.querySelector('#question-address-gps').innerHTML = "GPS: " + results[0].formatted_address;
                        document.querySelector('#question-address-gps').setAttribute('data-text', document.querySelector('#question-address-gps').getAttribute('data-text') + ': ' + results[0].formatted_address);
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
                if (this.getAttribute('data-text')) {
                    parts[parts.length] = this.getAttribute('data-text');
                } else {
                    parts.pop();
                }
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
                document.querySelector('#targetphone').value = localStorage.getItem('targetphone');
                document.querySelector('#address1').value = localStorage.getItem('address1');
                document.querySelector('#address2-description').value = localStorage.getItem('address2-description');
                document.querySelector('#address2-value').value = localStorage.getItem('address2-value');

                document.body.scrollTop = document.documentElement.scrollTop = 0;
            }, false);
        }

        document.querySelector('#finish').addEventListener('click', function(event) {
            parts = [];
            parts[parts.length] = localStorage.getItem('name');

            document.querySelector('#to').value = localStorage.getItem('targetphone');
            document.querySelector('#messagetosend').value = document.querySelector('#sms').innerHTML;
            document.querySelector('#myform').submit();

            document.querySelector('#sms').innerHTML = '';
        });

        document.querySelector('#save').addEventListener('click', function(event) {
            localStorage.setItem('name', document.querySelector('#name').value);
            
            localStorage.setItem('targetphone', document.querySelector('#targetphone').value);

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
