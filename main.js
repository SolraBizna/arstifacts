"use strict";
let fatal = function(e) {
    document.body.innerText = e;
    throw e;
};
let assume = function(wat, where) {
    if(!(wat in (where || window))) {
        throw wat+" is required, but unavailable";
    }
}
try {
    let NUM_PHASES = 12;
    let OUT_RATIO = 2;
    let INTERESTING_ELEMENTS = [
        "image_selector","prescale_checkbox","display","still_checkbox",
        "still_div","still_image","still_selector","scanline_checkbox",
        "progress"
    ];
    let el = {};
    assume("forEach", INTERESTING_ELEMENTS);
    INTERESTING_ELEMENTS.forEach(function(id) {
        el[id] = document.getElementById(id);
        if(!el[id]) throw "missing element: #"+id;
    });
    // create our hidden canvas
    let canvas = document.getElementById("debug_canvas") || document.createElement("canvas");
    assume("getContext", canvas);
    assume("toDataURL", canvas);
    assume("performance");
    assume("now", performance);
    // quick stop to make HYBRID_FIR more memory efficient
    assume("Float32Array");
    HYBRID_FIR.kernel.forEach(function(phase) {
        phase.forEach(function(subpixel) {
            let MULT = 1/65536;
            for(let yoff = 0; subpixel[yoff]; ++yoff) {
                let old = subpixel[yoff];
                for(let n = 0; n < old.length; ++n) old[n] *= MULT;
                subpixel[yoff] = Float32Array.from(old);
            }
        });
    });
    // a slapdash pipeline for image processing! HOORAY!
    assume("Image");
    let nextProcImage; // the image that is being loaded for subsequent processing
    let beginNewProc; // forward declaration of function that takes ImageData argument
    let curURI;
    let switchImage = function(newURI) {
        curURI = null;
        let image = new Image();
        nextProcImage = image;
        nextProcImage.onload = function() {
            if(image != nextProcImage) return; // we were left behind
            curURI = newURI;
            let width = image.naturalWidth || image.width;
            let height = image.naturalHeight || image.height;
            let dx, dy, dwidth, dheight;
            if(el.prescale_checkbox.checked) {
                let x_ratio = width / 256;
                let y_ratio = height / 240;
                if(x_ratio > y_ratio) {
                    if(x_ratio > 1) {
                        dwidth = 256;
                        dheight = height / x_ratio;
                    }
                    else {
                        dwidth = width;
                        dheight = height;
                    }
                }
                else {
                    if(y_ratio > 1) {
                        dheight = 240;
                        dwidth = width / y_ratio;
                    }
                    else {
                        dwidth = width;
                        dheight = height;
                    }
                }
                dx = Math.floor(((canvas.width = 323) - dwidth)/2 + 0.5)
                dy = Math.floor(((canvas.height = 240) - dheight)/2 + 0.5)
            }
            else {
                canvas.width = dwidth = width;
                canvas.height = dheight = height;
                dx = 0;
                dy = 0;
            }
            let ctx = canvas.getContext("2d");
            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(image, dx, dy, dwidth, dheight);
            beginNewProc(ctx.getImageData(0, 0, canvas.width, canvas.height));
        }
        nextProcImage.onerror = function() {
            alert("An error occurred loading that image. Try another.");
        }
        nextProcImage.src = newURI;
    }
    switchImage(INITIAL_IMAGE);
    let last_url = null;
    el.image_selector.onchange = function() {
        console.log(el.image_selector.files);
        if(el.image_selector.files.length > 0) {
            if(last_url) {
                URL.revokeObjectURL(last_url);
                last_url = null;
            }
            last_url = URL.createObjectURL(el.image_selector.files[0]);
            switchImage(last_url);
        }
    };
    el.prescale_checkbox.onchange = function() {
        if(curURI) {
            switchImage(curURI);
        }
    }
    // processing logic
    {
        let NUM_IMAGES = 3;
        let procPixels, outPixels;
        let images, imagedatas, imagebitmaps; // even, odd, average
        let curImageNo, curImageRow;
        let active = false;
        let proc;
        let newOutPixels = function() {
            return new ImageData(procPixels.width*OUT_RATIO, procPixels.height*2-(el.scanline_checkbox.checked?1:0));
        };
        beginNewProc = function(newProcPixels) {
            procPixels = newProcPixels;
            outPixels = newOutPixels();
            images = [];
            imagedatas = [];
            imagebitmaps = [];
            curImageNo = 0;
            curImageRow = 0;
            if(!active) {
                active = true;
                window.requestAnimationFrame(proc);
            }
        }
        let updateStill = function() {
            if(el.still_selector.selectedIndex < curImageNo) {
                el.still_image.src = images[el.still_selector.selectedIndex].src;
            }
        }
        proc = function(now) {
            let deadline = now + 60;
            while(curImageNo < NUM_IMAGES && performance.now() < deadline) {
                while(curImageRow < outPixels.height
                      && performance.now() < deadline) {
                    if(curImageRow < procPixels.height) {
                        // the actual filter
                        let outp = outPixels.width * 4 * (curImageRow*2);
                        if(curImageNo == 2) {
                            for(let out_x = 0; out_x < outPixels.width; ++out_x) {
                                outPixels.data[outp] = (imagedatas[0].data[outp] + imagedatas[1].data[outp]) / 2;
                                ++outp;
                                outPixels.data[outp] = (imagedatas[0].data[outp] + imagedatas[1].data[outp]) / 2;
                                ++outp;
                                outPixels.data[outp] = (imagedatas[0].data[outp] + imagedatas[1].data[outp]) / 2;
                                ++outp;
                                outPixels.data[outp++] = 255;
                            }
                        }
                        else {
                            for(let out_x = 0; out_x < outPixels.width; ++out_x) {
                                let center_x = Math.floor(out_x / OUT_RATIO);
                                let start_filtp = 0;
                                let start_x = center_x - HYBRID_FIR.radius;
                                let start_pixp = start_x * 4;
                                if(start_x < 0) {
                                    start_pixp = start_pixp + (start_x * -4);
                                    start_filtp = start_filtp + (start_x * -9);
                                    start_x = 0;
                                }
                                let end_x = center_x + HYBRID_FIR.radius;
                                if(end_x >= procPixels.width)
                                    end_x = procPixels.width - 1;
                                let phase = (67 + center_x) % NUM_PHASES;
                                if(curImageRow & 1)
                                    phase = (phase + NUM_PHASES/2) % NUM_PHASES;
                                let subpixel = out_x % OUT_RATIO;
                                let r = 0, g = 0, b = 0;
                                let go = function() {
                                    for(let yoff = -1; yoff <= 1; ++yoff) {
                                        let in_y = curImageRow + yoff;
                                        if(in_y < 0) continue;
                                        else if(in_y >= procPixels.height) break;
                                        let inpixp = in_y * procPixels.width * 4 + start_pixp;
                                        let infiltp = start_filtp;
                                        let local_phase;
                                        let filt = HYBRID_FIR.kernel[phase][subpixel][yoff+1];
                                        for(let in_x = start_x; in_x <= end_x; ++in_x) {
                                            let in_r = procPixels.data[inpixp++];
                                            let in_g = procPixels.data[inpixp++];
                                            let in_b = procPixels.data[inpixp++];
                                            ++inpixp;
                                            r += in_r * filt[infiltp++];
                                            g += in_r * filt[infiltp++];
                                            b += in_r * filt[infiltp++];
                                            r += in_g * filt[infiltp++];
                                            g += in_g * filt[infiltp++];
                                            b += in_g * filt[infiltp++];
                                            r += in_b * filt[infiltp++];
                                            g += in_b * filt[infiltp++];
                                            b += in_b * filt[infiltp++];
                                        }
                                    }
                                };
                                switch(curImageNo) {
                                case 1:
                                    phase = (phase + NUM_PHASES/2) % NUM_PHASES;
                                case 0:
                                    go();
                                    break;
                                case 2:
                                    go();
                                    phase = (phase + NUM_PHASES/2) % NUM_PHASES;
                                    go();
                                    r *= 0.5; g *= 0.5; b *= 0.5;
                                    break;
                                }
                                outPixels.data[outp++] = r;
                                outPixels.data[outp++] = g;
                                outPixels.data[outp++] = b;
                                outPixels.data[outp++] = 255;
                            }
                        }
                    }
                    else if(el.scanline_checkbox.checked) {
                        // interpolate scanlines
                        let inp1 = outPixels.width * 4 * (curImageRow-procPixels.height)*2;
                        let outp = inp1 + outPixels.width * 4;
                        let inp2 = outp + outPixels.width * 4;
                        for(let x = 0; x < outPixels.width; ++x) {
                            let ra = Math.pow(outPixels.data[inp1++],2.2);
                            let ga = Math.pow(outPixels.data[inp1++],2.2);
                            let ba = Math.pow(outPixels.data[inp1++],2.2);
                            inp1++;
                            let rb = Math.pow(outPixels.data[inp2++],2.2);
                            let gb = Math.pow(outPixels.data[inp2++],2.2);
                            let bb = Math.pow(outPixels.data[inp2++],2.2);
                            inp2++;
                            outPixels.data[outp++] = Math.pow((ra+rb)/4,1/2.2);
                            outPixels.data[outp++] = Math.pow((ga+gb)/4,1/2.2);
                            outPixels.data[outp++] = Math.pow((ba+bb)/4,1/2.2);
                            outPixels.data[outp++] = 255;
                        }
                    }
                    else {
                        // duplicate scanlines
                        let inp = outPixels.width * 4 * (curImageRow-procPixels.height)*2;
                        let outp = inp + outPixels.width * 4;
                        for(let x = 0; x < outPixels.width; ++x) {
                            outPixels.data[outp++] = outPixels.data[inp++];
                            outPixels.data[outp++] = outPixels.data[inp++];
                            outPixels.data[outp++] = outPixels.data[inp++];
                            outPixels.data[outp++] = outPixels.data[inp++];
                        }
                    }
                    ++curImageRow;
                }
                if(curImageRow >= outPixels.height) {
                    canvas.width = outPixels.width;
                    canvas.height = outPixels.height;
                    let ctx = canvas.getContext("2d");
                    ctx.putImageData(outPixels, 0, 0);
                    images[curImageNo] = new Image();
                    images[curImageNo].src = canvas.toDataURL("image/png");
                    imagedatas[curImageNo] = outPixels;
                    if("createImageBitmap" in window) {
                        let cpp = procPixels;
                        let cin = curImageNo;
                        createImageBitmap(outPixels).then(
                            function(response) {
                                console.log(response);
                                if(procPixels == cpp) {
                                    imagebitmaps[cin] = response;
                                }
                            }
                        );
                    }
                    ++curImageNo;
                    outPixels = newOutPixels();
                    curImageRow = 0;
                    updateStill();
                }
            }
            if(curImageNo >= NUM_IMAGES) {
                active = false;
                progress.style.display = "none";
            }
            else {
                progress.max = NUM_IMAGES * outPixels.height;
                progress.value = curImageNo * outPixels.height + curImageRow;
                progress.style.display = "block";
            }
            if(active)
                window.requestAnimationFrame(proc);
        }
        let drawn = 0;
        let draw = function() {
            if(curImageNo >= 2) {
                el.display.style.display = "block";
                el.display.width = imagedatas[drawn].width;
                el.display.height = imagedatas[drawn].height;
                let ctx = el.display.getContext("2d");
                if(imagebitmaps[drawn])
                    ctx.drawImage(imagebitmaps[drawn], 0, 0);
                else
                    ctx.putImageData(imagedatas[drawn], 0, 0);
                if(++drawn >= 2) drawn = 0;
            }
            else {
                el.display.style.display = "none";
            }
            window.requestAnimationFrame(draw);
        }
        window.requestAnimationFrame(draw);
        el.scanline_checkbox.onchange = function() {
            if(procPixels !== undefined)
                beginNewProc(procPixels);
        }
        el.still_selector.onchange = updateStill;
        el.still_checkbox.onchange = function() {
            el.still_div.style.display = el.still_checkbox.checked
                ? "block" : "none";
        }
    }
}
catch(e) {
    fatal(e);
}
