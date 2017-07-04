var map;
var markers = [];

function initMap() {

    var styles = [{
            "featureType": "all",
            "elementType": "geometry.fill",
            "stylers": [{
                "weight": "2.00"
            }]
        },
        {
            "featureType": "all",
            "elementType": "geometry.stroke",
            "stylers": [{
                "color": "#9c9c9c"
            }]
        },
        {
            "featureType": "all",
            "elementType": "labels.text",
            "stylers": [{
                "visibility": "on"
            }]
        },
        {
            "featureType": "landscape",
            "elementType": "all",
            "stylers": [{
                "color": "#f2f2f2"
            }]
        },
        {
            "featureType": "landscape",
            "elementType": "geometry.fill",
            "stylers": [{
                "color": "#ffffff"
            }]
        },
        {
            "featureType": "landscape.man_made",
            "elementType": "geometry.fill",
            "stylers": [{
                "color": "#ffffff"
            }]
        },
        {
            "featureType": "poi",
            "elementType": "all",
            "stylers": [{
                "visibility": "off"
            }]
        },
        {
            "featureType": "road",
            "elementType": "all",
            "stylers": [{
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
            "stylers": [{
                "color": "#eeeeee"
            }]
        },
        {
            "featureType": "road",
            "elementType": "labels.text.fill",
            "stylers": [{
                "color": "#7b7b7b"
            }]
        },
        {
            "featureType": "road",
            "elementType": "labels.text.stroke",
            "stylers": [{
                "color": "#ffffff"
            }]
        },
        {
            "featureType": "road.highway",
            "elementType": "all",
            "stylers": [{
                "visibility": "simplified"
            }]
        },
        {
            "featureType": "road.arterial",
            "elementType": "labels.icon",
            "stylers": [{
                "visibility": "off"
            }]
        },
        {
            "featureType": "transit",
            "elementType": "all",
            "stylers": [{
                "visibility": "off"
            }]
        },
        {
            "featureType": "water",
            "elementType": "all",
            "stylers": [{
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
            "stylers": [{
                "color": "#c8d7d4"
            }]
        },
        {
            "featureType": "water",
            "elementType": "labels.text.fill",
            "stylers": [{
                "color": "#070707"
            }]
        },
        {
            "featureType": "water",
            "elementType": "labels.text.stroke",
            "stylers": [{
                "color": "#ffffff"
            }]
        }
    ];
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 39.9042,
            lng: 116.407396
        },
        zoom: 10,
        styles: styles,
        mapTypeControl: false
    });

     locations = [{
            information: '天安门是中国的首都的象征',
            title: '天安门',
            name: 'tiananmen',
            location: {
                lat: 39.908715,
                lng: 116.397389
            }
        },
        {
          information: '故宫里面很多文物',
            title: '故宫',
            name: 'tiananmen',
            location: {
                lat: 39.916345,
                lng: 116.397155
            }
        },
        {
          information: '很美丽的地方',
            title: '日坛',
            name: 'tiananmen',
            location: {
                lat: 39.91583,
                lng: 116.444329
            }
        },
        {
          information: '历史久远',
            title: '建国门',
            name: 'tiananmen',
            location: {
                lat: 39.9097,
                lng: 116.4344
            }
        },
        {
          information: '很棒的美术馆',
            title: '中国美术馆',
            name: 'tiananmen',
            location: {
                lat: 39.925342,
                lng: 116.409009
            }
        },
        {
          information: '休闲娱乐',
            title: '朝阳门',
            name: 'tiananmen',
            location: {
                lat: 39.923846,
                lng: 116.433593
            }
        }
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


    // 点击按钮呼出或隐藏地点列表
    $("#show").click(function() {
        $("#left").toggle();
    });



    var Loc = function(data) {
        this.title = ko.observable(data.title);
        this.information = ko.observable(data.information);
    };

    var ViewModel = function() {
      var self = this;

      this.locList = ko.observableArray([]);

      locations.forEach(function(catIterm) {
        self.locList.push( new Loc(catIterm));
      });

      this.currentLoc = ko.observable();

      this.changeLoc = function(clickedLoc) {
        self.currentLoc(clickedLoc);
        google.maps.event.trigger(markers[self.locList().indexOf(clickedLoc)], 'click');
      };

    searchLoc = function() {
        var address = document.getElementById('text-area').value;
        //1. 清空 locList 数组
        while (self.locList().length > 0) {
          self.locList().pop();
        }
        //2. 迭代 locations
        locations.forEach(function(locIterm) {
              //3. 与输入的内容 address 进行比较，匹配的项，添加上 locList 数组
            if (locIterm.title === address) {
                    self.locList.push(locIterm);
                  }
        });
    };

    };

    ko.applyBindings(new ViewModel());

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
    var cityStr = marker.title;
    var $wikiElem = $('#sasa');
    var wikiUrl = 'http://en.wikipedia.org/w/api.php?action=opensearch&search=' + cityStr + '&format=json&callback=wikiCallback';
    var wikiRequestTimeout = setTimeout(function() {
        $wikiElem.text("failed to get wikipedia resources");
    }, 8000);

    $.ajax({
        url: wikiUrl,
        dataType: "jsonp",
        jsonp: "callback",
        success: function(response) {
            var articleList = response[1];

            for (var i = 0; i < articleList.length; i++) {
                articleStr = articleList[i];
                var url = 'http://en.wikipedia.org/wiki/' + articleStr;
                $wikiElem.append('<li><a  target="_blank" href="' + url + '">' + articleStr + '</a></li>');
            };

            clearTimeout(wikiRequestTimeout);
        }
    }).fail(function() {
    alert( "error" );
  });

};

function makeMarkerIcon(markerColor) {
    var markerImage = new google.maps.MarkerImage(
        'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|' + markerColor +
        '|40|_|%E2%80%A2',
        new google.maps.Size(21, 34),
        new google.maps.Point(0, 0),
        new google.maps.Point(10, 34),
        new google.maps.Size(21, 34));
    return markerImage;
};
