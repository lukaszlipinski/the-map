(function() {
    'use strict';

    window.map.spotWidth = 25;
    window.map.spotHeight = 50;
    window.map.strokeColor = '#e2e2e2';
    window.map.strokeWidth = 5;

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
        var offset = 100;
        var space = 20;
        var spotWidth = this.spotWidth;

        var data = {
            spots : [
                {posX: offset, posY: 50, count: 2, direction: 'top'},
                {posX: offset + spotWidth * 2 + space, posY: 50, count: 3, direction: 'top'},
                {posX: offset + spotWidth * 5 + space * 2, posY: 50, count: 3, direction: 'top'},
                {posX: offset + spotWidth * 8 + space * 3, posY: 50, count: 3, direction: 'top'},
                {posX: offset + spotWidth * 11 + space * 4, posY: 50, count: 1, direction: 'top'},
                {posX: offset + spotWidth * 12 + space * 5, posY: 50, count: 2, direction: 'top'}
            ]
        };

        for(var i = 0; i < data.spots.length; i++) {
            var spot = data.spots[i];

            this.addParkingSpot(canvas, spot);
        }
    };

    window.map._drawFirstSegment = function(canvas, posX, posY, numberOfSpots) {
        var line1 = new fabric.Line([0, 0, 0, this.spotHeight], $.extend({
            left: posX,
            top: posY
        }, {
            stroke: this.strokeColor,
            strokeWidth: this.strokeWidth
        }));

        var line2 = new fabric.Line([0, 0, this.strokeWidth * 1.5, 0], $.extend({
            left: posX,
            top: posY + this.spotHeight
        }, {
            stroke: this.strokeColor,
            strokeWidth: this.strokeWidth
        }));

        canvas.add(line1);
        canvas.add(line2);
    };

    window.map._drawLastSegment = function(canvas, posX, posY, numberOfSpots) {
        var line3 = new fabric.Line([0, 0, 0, this.spotHeight], $.extend({
            left: posX + this.spotWidth * numberOfSpots,
            top: posY
        }, {
            stroke: this.strokeColor,
            strokeWidth: this.strokeWidth
        }));

        canvas.add(line3);

        var line5 = new fabric.Line([0, 0, this.strokeWidth * 1.5, 0], $.extend({
            left: posX + this.spotWidth * numberOfSpots - this.strokeWidth / 2,
            top: posY + this.spotHeight
        }, {
            stroke: this.strokeColor,
            strokeWidth: this.strokeWidth
        }));

        canvas.add(line5);
    };

    window.map._drawTopLine = function(canvas, posX, posY, numberOfSpots) {
        var line = new fabric.Line([0, 0, this.spotWidth * numberOfSpots, 0], $.extend({
            left: posX,
            top: posY
        }, {
            stroke: this.strokeColor,
            strokeWidth: this.strokeWidth
        }));

        canvas.add(line);
    };

    window.map._drawMiddleLine = function(canvas, posX, posY, sportNumber) {
        var line3 = new fabric.Line([0, 0, 0, this.spotHeight], $.extend({
            left: posX + this.spotWidth * sportNumber,
            top: posY
        }, {
            stroke: this.strokeColor,
            strokeWidth: this.strokeWidth
        }));

        canvas.add(line3);

        var line5 = new fabric.Line([0, 0, this.strokeWidth * 2, 0], $.extend({
            left: posX + this.spotWidth * sportNumber - this.strokeWidth / 2,
            top: posY + this.spotHeight
        }, {
            stroke: this.strokeColor,
            strokeWidth: this.strokeWidth
        }));

        canvas.add(line5);
    };

    window.map.addParkingSpot = function(canvas, spot) {
        var posX = spot.posX;
        var posY = spot.posY;
        var numberOfSpots = spot.count;

        this._drawTopLine(canvas, posX, posY, numberOfSpots);
        this._drawFirstSegment(canvas, posX, posY, numberOfSpots);

        for (var i = 1; i <= numberOfSpots - 1; i++) {
            this._drawMiddleLine(canvas, posX, posY, i);
        }

        this._drawLastSegment(canvas, posX, posY, numberOfSpots);
    };

}());