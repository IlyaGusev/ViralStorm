"use strict";

if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = (function() {
        return window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function(callback, element) {
                window.setTimeout(callback, 1000 / 60);
            };
    })();
}

Number.prototype.degree = function () {
    return this * Math.PI / 180;
};

//Test for mouse clicks handling. Geometry on http://zhukovsd.blogspot.ru/2010/04/blog-post.html
function testPointInRect (point, rectpos, rect, rotation) {
    var height = rect[1];
    var width = rect[0];
    var diagonal = Math.sqrt(height*height+width*width);
    var x = point[0];
    var y = point[1];
    var rx = rectpos[0];
    var ry = rectpos[1];
    if (Math.sqrt((x-rx)*(x-rx)+(y-ry)*(y-ry))<(diagonal/2)){
        var alpha = Math.acos(height/diagonal);
        var beta = rotation.degree();
        var pi = (180).degree();
        var ulPos = [rx - (diagonal/2) * Math.cos(alpha+beta),
            ry - (diagonal/2) * Math.sin(alpha+beta)];
        var dlPos = [rx - (diagonal/2) * Math.cos(-alpha+beta),
            ry - (diagonal/2) * Math.sin(-alpha+beta)];
        var drPos = [rx - (diagonal/2) * Math.cos(alpha+beta-pi),
            ry - (diagonal/2) * Math.sin(alpha+beta-pi)];
        var urPos = [rx - (diagonal/2) * Math.cos(-alpha+beta-pi),
            ry - (diagonal/2) * Math.sin(-alpha+beta-pi)];

        var down = [0, 0];
        var left = [0,0];
        var up = [0, 0];
        var right = [0,0];
        var min=Math.max(ulPos[1], urPos[1], dlPos[1], drPos[1]);
        if (min == ulPos[1]) {
            down = ulPos;
            up = drPos;
            left = urPos;
            right = dlPos;
        }
        else if (min == urPos[1]){
            down = urPos;
            up = dlPos;
            left = drPos;
            right = ulPos;
        }
        else if (min == dlPos[1]) {
            down = dlPos;
            up = urPos;
            left = ulPos;
            right = drPos;
        }
        else if (min == drPos[1]) {
            down = drPos;
            up = ulPos;
            left = dlPos;
            right = urPos;
        }

        var k1 = (right[1]-up[1])/(right[0]-up[0]);
        var k2 = (right[1]-down[1])/(right[0]-down[0]);

        if ((right[0]-down[0]<=0.0001 && right[0]-down[0]>=-0.0001) ||
            right[0]-up[0]  <=0.0001 && right[0]-up[0]  >=-0.0001)
        {
            if (down[1] >=y &&
                left[0] <=x &&
                up[1]   <=y &&
                right[0]>=x){
                return true;
            }
        }
        else if ((x-down[0])*k2+down[1]>=y &&
            (x-left[0])*k1+left[1]>=y &&
            (x-left[0])*k2+left[1]<=y &&
            (x-up[0])*k1+up[1]<=y){
            return true;
        }
    }
    return false;
}
