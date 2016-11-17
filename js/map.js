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
        this.addSingleParkingSpot(canvas, 50, 50);
    };

    window.map._drawFirstSegment = function(canvas, posX, posY) {
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

    window.map._drawLastSegment = function(canvas, posX, posY) {
        var line3 = new fabric.Line([0, 0, 0, this.spotHeight], $.extend({
            left: posX + this.spotWidth,
            top: posY
        }, {
            stroke: this.strokeColor,
            strokeWidth: this.strokeWidth
        }));

        canvas.add(line3);

        var line5 = new fabric.Line([0, 0, this.strokeWidth * 1.5, 0], $.extend({
            left: posX + this.spotWidth - this.strokeWidth / 2,
            top: posY + this.spotHeight
        }, {
            stroke: this.strokeColor,
            strokeWidth: this.strokeWidth
        }));

        canvas.add(line5);
    };

    window.map._drawTopLine = function(canvas, posX, posY) {
        var line = new fabric.Line([0, 0, this.spotWidth, 0], $.extend({
            left: posX,
            top: posY
        }, {
            stroke: this.strokeColor,
            strokeWidth: this.strokeWidth
        }));

        canvas.add(line);
    };

    window.map.addSingleParkingSpot = function(canvas, posX, posY) {
        this._drawTopLine(canvas, posX, posY);
        this._drawFirstSegment(canvas, posX, posY);
        this._drawLastSegment(canvas, posX, posY);
    };

}());