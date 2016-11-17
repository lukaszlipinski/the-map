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

    window.map.zoomIt = zoomIt;
}());