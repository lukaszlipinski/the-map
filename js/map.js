(function() {
    'use strict';
console.log("map ini")
    window.map.initialize = function() {
        var canvasBox = document.getElementById('canvas-box');
        var canvasBoxWidth = canvasBox.offsetWidth;
        var canvasBoxHeight = canvasBox.offsetHeight;

        // create a wrapper around native canvas element (with id="c")
        var canvas = new fabric.Canvas('canvas');
        canvas.setWidth(canvasBoxWidth);
        canvas.setHeight(canvasBoxHeight);
        canvas.backgroundColor = '#f2f4f7';

        canvas.on('object:selected', function(data) {
            var target = data.target;

            target.stroke = '#00afec';

            console.log(target);
        });

        canvas.on('before:selection:cleared', function(data) {
            var target = data.target;

            target.stroke = '#000000';
        });

        this.initializeControls(canvas, canvasBoxWidth, canvasBoxHeight);
        this.draw(canvas);
    };

    window.map.initializeControls = function(canvas, canvasBoxWidth, canvasBoxHeight) {
        var angleControl = document.getElementById('scale-control');
        angleControl.onchange = function(e) {
            var scale = e.target.value / 100;

            document.getElementById('scale-value').innerHTML = scale;

            this.zoomIt(canvas, canvasBoxWidth, canvasBoxHeight, scale);
        }.bind(this);
    };

    window.map.draw = function(canvas) {
        this.addSingleParkingSpot(canvas, 50, 50);
    };

    window.map.addSingleParkingSpot = function(canvas, posX, posY) {
        var spotWidth = 25;
        var spotHeight = 50;
        var strokeColor = '#e2e2e2';
        var strokeWidth = 5;

        var line = new fabric.Line([0, 0, spotWidth, 0], $.extend({
            left: posX,
            top: posY
        }, {
            stroke: strokeColor,
            strokeWidth: strokeWidth
        }));

        canvas.add(line);

        var line2 = new fabric.Line([0, 0, 0, spotHeight], $.extend({
            left: posX,
            top: posY
        }, {
            stroke: strokeColor,
            strokeWidth: strokeWidth
        }));

        canvas.add(line2);

        var line3 = new fabric.Line([0, 0, 0, spotHeight], $.extend({
            left: posX + spotWidth,
            top: posY
        }, {
            stroke: strokeColor,
            strokeWidth: strokeWidth
        }));

        canvas.add(line3);

        var line4 = new fabric.Line([0, 0, strokeWidth * 1.5, 0], $.extend({
            left: posX,
            top: posY + spotHeight
        }, {
            stroke: strokeColor,
            strokeWidth: strokeWidth
        }));

        canvas.add(line4);

        var line4 = new fabric.Line([0, 0, strokeWidth * 1.5, 0], $.extend({
            left: posX + spotWidth - strokeWidth / 2,
            top: posY + spotHeight
        }, {
            stroke: strokeColor,
            strokeWidth: strokeWidth
        }));

        canvas.add(line4);


        //var rect = new fabric.Rect({
        //    left: 50,
        //    top: 50,
        //    fill: '#24282c',
        //    width: 25,
        //    height: 50
        //});


    };

}());