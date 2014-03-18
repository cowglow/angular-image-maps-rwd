/*
 * rwdImageMaps AngularJS Directive v1.0
 *
 * Allows image maps to be used in a responsive design by recalculating the area coordinates to match the actual image size on load and window.resize
 *
 * Original Copyright (c) 2013 Matt Stow
 * https://github.com/stowball/jQuery-rwdImageMaps
 * http://mattstow.com
 * Licensed under the MIT license
 *
 * angular-rwdImageMaps.js (by Philip Saa)
 * https://github.com/cowglow/
 * @cowglow
 */

angular.module('rwdImageMaps', [])
    .directive('rwdimgmap', function ($window) {
        return{
            restrict: 'CA',
            link: function (scope, element, attrs) {

                var w = attrs.width;
                var h = attrs.height;

                function resize() {
                    elem = angular.element(element)[0];

                    if (!w || !h) {
                        var temp = new Image();
                        temp.src = elem.src;
                        if (!w)
                            w = temp.width;
                        if (!h)
                            h = temp.height;
                    }

                    var wPercent = elem.width / 100,
                        hPercent = elem.height / 100,
                        mapname = attrs.usemap.replace('#', ''),
                        areas = angular.element(document.querySelector('map[name="' + mapname + '"]')).find('area');

                    for (var i = 0; i < areas.length; i++) {
                        var area = angular.element(areas[i]);

                        if (!area.data('coords')) {
                            area.data('coords', area.attr('coords'));
                        }

                        var coords = area.data('coords').split(','),
                            coordsPercent = new Array(coords.length);
                        coordsPercent = new Array(coords.length);

                        for (var j = 0; j < coordsPercent.length; ++j) {
                            if (j % 2 === 0) {
                                coordsPercent[j] = parseInt(((coords[j] / w) * 100) * wPercent);
                            } else {
                                coordsPercent[j] = parseInt(((coords[j] / h) * 100) * hPercent);
                            }
                        }
                        area.attr('coords', coordsPercent.toString());
                    }
                }

                resize();
                angular.element($window).bind("resize", function () {
                    resize();
                });

            }
        };
    });
