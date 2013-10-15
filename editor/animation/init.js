//Dont change it
requirejs(['ext_editor_1', 'jquery_190', 'raphael_210'],
    function (ext, $, TableComponent) {

        var cur_slide = {};

        ext.set_start_game(function (this_e) {
        });

        ext.set_process_in(function (this_e, data) {
            cur_slide["in"] = data[0];
        });

        ext.set_process_out(function (this_e, data) {
            cur_slide["out"] = data[0];
        });

        ext.set_process_ext(function (this_e, data) {
            cur_slide.ext = data;
            this_e.addAnimationSlide(cur_slide);
            cur_slide = {};
        });

        ext.set_process_err(function (this_e, data) {
            cur_slide['error'] = data[0];
            this_e.addAnimationSlide(cur_slide);
            cur_slide = {};
        });

        ext.set_animate_success_slide(function (this_e, options) {
            var $h = $(this_e.setHtmlSlide('<div class="animation-success"><div></div></div>'));
            this_e.setAnimationHeight(115);
        });

        ext.set_animate_slide(function (this_e, data, options) {
            var $content = $(this_e.setHtmlSlide(ext.get_template('animation'))).find('.animation-content');
            if (!data) {
                console.log("data is undefined");
                return false;
            }

            var checkioInput = data.in;

            if (data.error) {
                $content.find('.call').html('Fail: checkio(' + JSON.stringify(checkioInput) + ')');
                $content.find('.output').html(data.error.replace(/\n/g, ","));

                $content.find('.output').addClass('error');
                $content.find('.call').addClass('error');
                $content.find('.answer').remove();
                $content.find('.explanation').remove();
                this_e.setAnimationHeight($content.height() + 60);
                return false;
            }

            var rightResult = data.ext["answer"];
            var userResult = data.out;
            var result = data.ext["result"];
            var result_addon = data.ext["result_addon"];


            //if you need additional info from tests (if exists)
            var explanation = data.ext["explanation"];

            $content.find('.output').html('&nbsp;Your result:&nbsp;' + JSON.stringify(userResult));

            if (!result) {
                $content.find('.call').html('Fail: checkio(' + JSON.stringify(checkioInput) + ')');
                $content.find('.answer').html('Right result:&nbsp;' + JSON.stringify(rightResult));
                $content.find('.answer').addClass('error');
                $content.find('.output').addClass('error');
                $content.find('.call').addClass('error');
            }
            else {
                $content.find('.call').html('Pass: checkio(' + JSON.stringify(checkioInput) + ')');
                $content.find('.answer').remove();
            }
            //Dont change the code before it

            var canvas = new CountingTilesCanvas($content.find(".explanation")[0], checkioInput, 8);
            canvas.createCanvas();



            this_e.setAnimationHeight($content.height() + 60);

        });

        var $tryit;
        var tooltip = false;
//
        ext.set_console_process_ret(function (this_e, ret) {
            $tryit.find(".checkio-result-in").html(ret);
        });

        ext.set_generate_animation_panel(function (this_e) {

            $tryit = $(this_e.setHtmlTryIt(ext.get_template('tryit')));
            var tCanvas = new CountingTilesCanvas($tryit.find(".tryit-canvas")[0], 2, 6);
            tCanvas.createCanvas();
            tCanvas.createFeedback(function(r, e) {
                this_e.sendToConsoleCheckiO(r);
                e.stopPropagation();
                return false;
            });
            $tryit.find(".tryit-canvas").mouseenter(function (e) {
                if (tooltip) {
                    return false;
                }
                var $tooltip = $tryit.find(".tryit-canvas .tooltip");
                $tooltip.fadeIn(1000);
                setTimeout(function () {
                    $tooltip.fadeOut(1000);
                }, 2000);
                tooltip = true;
            });

        });

        function CountingTilesCanvas(dom, dataInput, cellN){
            //Vars
            var cellSize = 40;
            var zx = 20;
            var zy = 20;
            var fullX = cellSize * cellN + zx * 2;
            var fullY = cellSize * cellN + zy * 2;

            var delay = 200;

            var colorDark = "#294270";
            var colorOrange = "#F0801A";
            var colorBlue = "#69B3E3";
            var colorWhite = "#FFFFFF";

            var attrCircle = {"stroke": colorDark, "fill": colorOrange, "stroke-width": 2};
            var attrMain = {"stroke": colorDark, "stroke-width": 2, "fill": colorBlue};
            var attrLine = {"stroke": colorDark, "stroke-width": 2};
            var attrCentralLine = {"stroke": colorDark, "stroke-width": 3};
            var attrPanel = {"stroke": colorDark, "fill": colorWhite, "opacity": 0};

            var paper;
            var mainCircle;

            this.createCanvas = function() {
                paper = Raphael(dom, fullX, fullY, 0, 0);
                paper.rect(zx, zy, cellN * cellSize, cellN * cellSize).attr(attrMain);
                mainCircle = paper.circle(fullX / 2, fullY / 2, dataInput * cellSize).attr(attrCircle);
                for (var i = 1; i < cellN; i++) {
                    paper.path(Raphael.format("M{0},{1}L{2},{1}",
                        zx, zy + cellSize * i, zx + cellSize * cellN)).attr(i !== cellN / 2 ? attrLine : attrCentralLine);
                    paper.path(Raphael.format("M{0},{1}L{0},{2}",
                        zx  + cellSize * i, zy, zy + cellSize * cellN)).attr(i !== cellN / 2 ? attrLine : attrCentralLine);
                }
            };

            this.createFeedback = function(callback) {
                if (!mainCircle) {
                    return false;
                }
                var activeElement = paper.rect(zx, zy, cellN * cellSize, cellN * cellSize).attr(attrPanel);
                activeElement.toFront();
                activeElement.click(function(e) {
                    var x = ((e.offsetX || e.layerX) - zx) / cellSize;
                    var y = ((e.offsetY || e.layerY) - zy) / cellSize;
                    var cx = cellN / 2;
                    var radius = Math.round(Math.sqrt(Math.pow(x - cx, 2) + Math.pow(y - cx, 2)) * 100) / 100;
                    if (radius > cellN / 2) {
                        radius = cellN / 2;
                    }
                    mainCircle.animate({"r": radius * cellSize}, delay);
                    if (callback) {
                        callback(radius, e);
                    }
                });

            }
        }


    }
);
