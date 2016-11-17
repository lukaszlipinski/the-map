(function() {
    'use strict';

    function zoomIt(canvas, startWidth, startHeight, factor) {
        canvas.setHeight(startHeight * factor);
        canvas.setWidth(startWidth * factor);

        if (canvas.backgroundImage) {
            // Need to scale background images as well
            var bi = canvas.backgroundImage;
            bi.width = bi.width * factor; bi.height = bi.height * factor;
        }

        var objects = canvas.getObjects();

        for (var i in objects) {
            if (objects.hasOwnProperty(i)) {
                objects[i].scaleX = 1;
                objects[i].scaleY = 1;
                //var scaleX = objects[i].scaleX;
                //var scaleY = objects[i].scaleY;
                var left = objects[i].left;
                var top = objects[i].top;

                var tempScaleX = factor;
                var tempScaleY = factor;
                var tempLeft = left * factor;
                var tempTop = top * factor;

                objects[i].scaleX = tempScaleX;
                objects[i].scaleY = tempScaleY;
                objects[i].left = tempLeft;
                objects[i].top = tempTop;

                objects[i].setCoords();
            }
        }

        canvas.renderAll();
        canvas.calcOffset();
    }

    function addSingleParkingSpot(canvas, posX, posY) {
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


    }

    function drawBuilding(canvas) {
        //var line = new fabric.Line([10, 10, 60, 10], $.extend({
        //    left: 10,
        //    top: 10
        //}, {
        //    stroke: '#e2e2e2',
        //    strokeWidth: 5
        //}));
        //
        //canvas.add(line);

        addSingleParkingSpot(canvas, 50, 50);


    }

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


// create a rectangle object
//    var rect = new fabric.Rect({
//        left: 100,
//        top: 100,
//        fill: 'red',
//        width: 100,
//        height: 100
//    });
//
//    rect.setControlsVisibility({
//        mt: false,
//        mb: false,
//        ml: false,
//        mr: false,
//        bl: false,
//        br: false,
//        tl: false,
//        tr: false,
//        mtr: false
//    });
//
//    rect.lockMovementX = true;
//    rect.lockMovementY = true;
//    rect.stroke = '#000000';
//    rect.strokeWidth = 3;
//
//    canvas.add(rect);

    var angleControl = document.getElementById('scale-control');
    angleControl.onchange = function(e) {
        var scale = e.target.value / 100;

        document.getElementById('scale-value').innerHTML = scale;

        zoomIt(canvas,canvasBoxWidth, canvasBoxHeight, scale);
    };

    drawBuilding(canvas)

}());