var map;
var markers = [];

function initMap() {

  var styles = [
    {
        "featureType": "all",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "weight": "2.00"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#9c9c9c"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "color": "#f2f2f2"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "landscape.man_made",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": 45
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#eeeeee"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#7b7b7b"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "color": "#46bcec"
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#c8d7d4"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#070707"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    }
];
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 39.9042, lng: 116.407396},
    zoom: 13,
    styles: styles,
    mapTypeControl: false
  });

  var locations = [
    {title: 'beijing', location: {lat: 39.908715, lng: 116.397389}},
    {title: '故宫', location: {lat: 39.916345, lng: 116.397155}},
    {title: '日坛', location: {lat: 39.91583, lng: 116.444329}},
    {title: '建国门', location: {lat: 39.9097, lng: 116.4344}},
    {title: '中国美术馆', location: {lat: 39.925342, lng: 116.409009}},
    {title: '朝阳门', location: {lat: 39.923846, lng: 116.433593}}
  ];


// marker 弹窗
  var largeInfowindow = new google.maps.InfoWindow();
  var defaultIcon = makeMarkerIcon('0091ff');
  var highlightedIcon = makeMarkerIcon('FFFF24');
  var bounds = new google.maps.LatLngBounds();
  for (var i = 0; i < locations.length; i++) {
    var title = locations[i].title;
    var position = locations[i].location;
    var marker = new google.maps.Marker({
      title: title,
      map: map,
      position: position,
      animation: google.maps.Animation.DROP,
      icon: defaultIcon,
      id: i
    });
    markers.push(marker);
    bounds.extend(marker.position);
    marker.addListener('click', function() {
      showInformation(this, largeInfowindow);
    });
    marker.addListener('mouseover', function() {
      this.setIcon(highlightedIcon);
    });
    marker.addListener('mouseout', function() {
      this.setIcon(defaultIcon);
    });
  };
  map.fitBounds(bounds);


// 手机端点击'showList'按钮呼出地点列表
  document.getElementById('show').addEventListener('click', function() {
  document.getElementById('left').style.display="block";
  document.getElementById('map').style.height="100%";
  document.getElementById('map').style.width="70%";
  document.getElementById('map').style.float="right";
});

// 只显示点击列表中的一个地点
  var first = document.getElementById('tiananmen');
  first.addEventListener('click', function() {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    };
    markers[0].setMap(map);
  });
  var second = document.getElementById('gugong');
  second.addEventListener('click', function() {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    };
    markers[1].setMap(map);
  });
  var third = document.getElementById('ritan');
  third.addEventListener('click', function() {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    };
    markers[2].setMap(map);
  });
  var fourth = document.getElementById('jianguomen');
  fourth.addEventListener('click', function() {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    };
    markers[3].setMap(map);
  });
  var fifth = document.getElementById('meishuguan');
  fifth.addEventListener('click', function() {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    };
    markers[4].setMap(map);
  });
  var sixth = document.getElementById('chaoyangmen');
  sixth.addEventListener('click', function() {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    };
    markers[5].setMap(map);
  });



};



function showInformation(marker, infowindow) {

  if (infowindow.marker !== marker) {
    infowindow.marker = marker;
    infowindow.setContent('<div>' + marker.title + '<div id="sasa"></div></div');
    infowindow.open(map, marker);
    infowindow.addListener('closeclick', function() {
      infowindow.marker = null;
    });
    }

    // 加载第三方维基百科的api
    var cityStr = this.title;
    var $wikiElem = $('#sasa');
    var wikiUrl = 'http://en.wikipedia.org/w/api.php?action=opensearch&search=' + cityStr + '&format=json&callback=wikiCallback';
    var wikiRequestTimeout = setTimeout(function(){
        $wikiElem.text("failed to get wikipedia resources");
    }, 8000);

    $.ajax({
        url: wikiUrl,
        dataType: "jsonp",
        jsonp: "callback",
        success: function( response ) {
            var articleList = response[1];

            for (var i = 0; i < articleList.length; i++) {
                articleStr = articleList[i];
                var url = 'http://en.wikipedia.org/wiki/' + articleStr;
                $wikiElem.append('<li><a href="' + url + '">' + articleStr + '</a></li>');
            };

            clearTimeout(wikiRequestTimeout);
        }
    });

};
function makeMarkerIcon(markerColor) {
  var markerImage = new google.maps.MarkerImage(
    'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +
    '|40|_|%E2%80%A2',
    new google.maps.Size(21, 34),
    new google.maps.Point(0, 0),
    new google.maps.Point(10, 34),
    new google.maps.Size(21,34));
  return markerImage;
};
