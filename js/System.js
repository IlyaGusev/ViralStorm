"use strict";

if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = (function() {
        return window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function(callback) {
                window.setTimeout(callback, 1000 / 60);
            };
    })();
}

Number.prototype.degree = function () {
    return this * Math.PI / 180;
};

function browser()
{
    var ua = navigator.userAgent;

    if (ua.search(/MSIE/) > 0) return 'Internet Explorer';
    if (ua.search(/Firefox/) > 0) return 'Firefox';
    if (ua.search(/Opera/) > 0) return 'Opera';
    if (ua.search(/Chrome/) > 0) return 'Google Chrome';
    if (ua.search(/Safari/) > 0) return 'Safari';
    if (ua.search(/Konqueror/) > 0) return 'Konqueror';
    if (ua.search(/Iceweasel/) > 0) return 'Debian Iceweasel';
    if (ua.search(/SeaMonkey/) > 0) return 'SeaMonkey';

    if (ua.search(/Gecko/) > 0) return 'Gecko';

    return 'Search Bot';
}


function addClickEvent(button, func){
    if (button.addEventListener)
        button.addEventListener ("click", func, false);
    else if (button.attachEvent)
        button.attachEvent ("onclick", func);
}
function getExtremePointsOfRect(rectpos, rect, rotation){
    var diagonal = Math.sqrt(rect[1]*rect[1]+rect[0]*rect[0]);

    var alpha = Math.acos(rect[1]/diagonal);
    var beta = rotation.degree();
    var pi = (180).degree();
    var ulPos = [rectpos[0] - (diagonal/2) * Math.cos(alpha+beta),
        rectpos[1] - (diagonal/2) * Math.sin(alpha+beta)];
    var dlPos = [rectpos[0] - (diagonal/2) * Math.cos(-alpha+beta),
        rectpos[1] - (diagonal/2) * Math.sin(-alpha+beta)];
    var drPos = [rectpos[0] - (diagonal/2) * Math.cos(alpha+beta-pi),
        rectpos[1] - (diagonal/2) * Math.sin(alpha+beta-pi)];
    var urPos = [rectpos[0] - (diagonal/2) * Math.cos(-alpha+beta-pi),
        rectpos[1] - (diagonal/2) * Math.sin(-alpha+beta-pi)];

    var down = [0, 0];
    var left = [0, 0];
    var up = [0, 0];
    var right = [0, 0];
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
    return [down, left, up, right];
}
//Mouse clicks handling. Geometry on http://zhukovsd.blogspot.ru/2010/04/blog-post.html
function testPointInRect (point, rectpos, rect, rotation) {
    var diagonal = Math.sqrt(rect[1]*rect[1]+rect[0]*rect[0]);
    if (Math.sqrt((point[0]-rectpos[0])*(point[0]-rectpos[0])+(point[1]-rectpos[1])*(point[1]-rectpos[1]))<(diagonal/2)){
        var pts = getExtremePointsOfRect(rectpos, rect, rotation);
        var down = pts[0];
        var left = pts[1];
        var up = pts[2];
        var right = pts[3];

        var k1 = (right[1]-up[1])/(right[0]-up[0]);
        var k2 = (right[1]-down[1])/(right[0]-down[0]);

        if ((right[0]-down[0]<=0.0001 && right[0]-down[0]>=-0.0001) ||
            right[0]-up[0]  <=0.0001 && right[0]-up[0]  >=-0.0001)
        {
            if (down[1] >=point[1] &&
                left[0] <=point[0] &&
                up[1]   <=point[1] &&
                right[0]>=point[0]){
                return true;
            }
        }
        else if ((point[0]-down[0])*k2+down[1]>=point[1] &&
            (point[0]-left[0])*k1+left[1]>=point[1] &&
            (point[0]-left[0])*k2+left[1]<=point[1] &&
            (point[0]-up[0])*k1+up[1]<=point[1]){
            return true;
        }
    }
    return false;
}


function Segment(point1, point2){
    this.points = [point1, point2];
    this.k = (point2[1]-point1[1])/(point2[0]-point1[0]);
    this.m = point1[1]-point1[0]*this.k;
}

function solveQuadEquation(k2, k1, k0){
    var discr = (-k1+Math.sqrt(k1*k1-4*k2*k0))
    if (discr>0){
        if (k2==0){
            return [-k0/k1]
        }
        else {
            return [(-k1+Math.sqrt(k1*k1-4*k2*k0))/(2*k2),(-k1-Math.sqrt(k1*k1-4*k2*k0))/(2*k2)];
        }
    }
    else if (discr == 0){
        return [(-k1)/(2*k2)];
    }
    else{
        return [];
    }
}

function testSegmentAndCircleIntersection(circleCenter, circleRadius, segment){
    var answer = [];
    if (isFinite(segment.k)){
        var k2,k1,k0;
        k2=circleRadius*circleRadius+circleRadius*circleRadius*(segment.k*segment.k);
        k1=2*circleRadius*circleRadius*segment.k*(segment.m-circleCenter[1])-2*circleRadius*circleRadius*circleCenter[0];
        k0=circleRadius*circleRadius*circleCenter[0]*circleCenter[0]+circleRadius*circleRadius*(segment.m-circleCenter[1])*
            (segment.m-circleCenter[1])-circleRadius*circleRadius*circleRadius*circleRadius;
        var x_solve = solveQuadEquation(k2,k1,k0);

        var tempxl = 0;
        var tempxr = 0;
        if (segment.points[0][0]<=segment.points[1][0]){
            tempxl=segment.points[0][0];
            tempxr=segment.points[1][0];
        }
        else{
            tempxl=segment.points[1][0];
            tempxr=segment.points[0][0];
        }
        for (var i=0; i<x_solve.length; i++)
            if (x_solve[i]>=tempxl && x_solve[i]<=tempxr) {
                answer.push([x_solve[i], segment.k*x_solve[i]+segment.m]);
            }
    }
    else{
        var tempyu = 0;
        var tempyd = 0;
        if (segment.points[0][1]<=segment.points[1][1]){
            tempyu=segment.points[0][1];
            tempyd=segment.points[1][1];
        }
        else{
            tempyu=segment.points[1][1];
            tempyd=segment.points[0][1];
        }
        if (circleCenter[0]+circleRadius>segment.points[0][0] && circleCenter[0]-circleRadius<segment.points[0][0]){
            var y_rel = Math.sqrt(Math.pow(circleRadius, 2)-Math.pow(segment.points[0][0]-circleCenter[0], 2));
            if (circleCenter[1]+y_rel>=tempyu && circleCenter[1]+y_rel<=tempyd)
                answer.push([segment.points[0][0],
                    circleCenter[1]+y_rel]);
            if (circleCenter[1]-y_rel>=tempyu && circleCenter[1]-y_rel<=tempyd)
                answer.push([segment.points[0][0],
                    circleCenter[1]-y_rel]);
        }
        else if (circleCenter[0]+circleRadius==segment.points[0][0] || circleCenter[0]-circleRadius==segment.points[0][0]){
            if (circleCenter[1]>=tempyu && circleCenter[1]<=tempyd)
                answer.push([segment.points[0][0], circleCenter[1]]);
        }
    }
    return answer;
}

function testRectAndCircleIntersection (rectCenter, rect, rectRotation, circleCenter, circleRadius) {
    var pts = getExtremePointsOfRect(rectCenter, rect, rectRotation);
    var down = pts[0];
    var left = pts[1];
    var up = pts[2];
    var right = pts[3];

    if (testSegmentAndCircleIntersection(circleCenter, circleRadius, new Segment(down, left)).length>0)
        return true;
    if (testSegmentAndCircleIntersection(circleCenter, circleRadius, new Segment(left, up)).length>0)
        return true;
    if (testSegmentAndCircleIntersection(circleCenter, circleRadius, new Segment(up, right)).length>0)
        return true;
    if (testSegmentAndCircleIntersection(circleCenter, circleRadius, new Segment(right, down)).length>0)
        return true;
    return false;
}
function testCircleContainsRect (rectCenter, rect, rectRotation, circleCenter, circleRadius) {
    var pts = getExtremePointsOfRect(rectCenter, rect, rectRotation);
    var down = pts[0];
    var left = pts[1];
    var up = pts[2];
    var right = pts[3];

    if (Math.pow((down[1]-circleCenter[1]),2)+Math.pow(down[0]-circleCenter[0], 2)<=Math.pow(circleRadius, 2) &&
        Math.pow((left[1]-circleCenter[1]),2)+Math.pow(left[0]-circleCenter[0], 2)<=Math.pow(circleRadius, 2) &&
        Math.pow((up[1]-circleCenter[1]),2)+Math.pow(up[0]-circleCenter[0], 2)<=Math.pow(circleRadius, 2) &&
        Math.pow((right[1]-circleCenter[1]),2)+Math.pow(right[0]-circleCenter[0], 2)<=Math.pow(circleRadius, 2))
        return true;
    else
        return false;
}

