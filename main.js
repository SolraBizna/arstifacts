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
        "image_selector","prescale_checkbox","display","scanline_mode_select",
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
        let MULT = 1/65536;
        for(let subpixel = 0; phase[subpixel]; ++subpixel) {
            let old = phase[subpixel];
            for(let n = 0; n < old.length; ++n) old[n] *= MULT;
            phase[subpixel] = Float32Array.from(old);
        }
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
        let GAMMA = 2.2;
        let INVERSE_GAMMA = 1/2.2;
        let BRIGHT_MULT = 1.5;
        let BRIGHT_THRESHOLD = Math.pow(255, GAMMA);
        let procPixels, outPixels;
        let image;
        let curImageRow;
        let active = false;
        let proc;
        let newOutPixels = function() {
            return new ImageData(procPixels.width*OUT_RATIO, procPixels.height*2-(el.scanline_mode_select.value>0?1:0));
        };
        beginNewProc = function(newProcPixels) {
            procPixels = newProcPixels;
            outPixels = newOutPixels();
            image = null;
            curImageRow = 0;
            if(!active) {
                active = true;
                window.requestAnimationFrame(proc);
            }
        }
        proc = function(now) {
            let deadline = now + 60;
            while(curImageRow < outPixels.height
                  && performance.now() < deadline) {
                if(curImageRow < procPixels.height) {
                    // the actual filter
                    let outp = outPixels.width * 4 * (curImageRow*2);
                    for(let out_x = 0; out_x < outPixels.width; ++out_x) {
                        let center_x = Math.floor(out_x / OUT_RATIO);
                        let start_filtp = 0;
                        let start_x = center_x - HYBRID_FIR.radius - 1;
                        let start_pixp = start_x * 4;
                        if(start_x < 0) {
                            start_pixp = start_pixp + (start_x * -4);
                            start_filtp = start_filtp + (start_x * -9);
                            start_x = 0;
                        }
                        let end_x = center_x + HYBRID_FIR.radius - 1;
                        if(end_x >= procPixels.width)
                            end_x = procPixels.width - 1;
                        let phase = (67 + center_x) % NUM_PHASES;
                        if(curImageRow & 1)
                            phase = (phase + NUM_PHASES/2) % NUM_PHASES;
                        let subpixel = out_x % OUT_RATIO;
                        let r = 0, g = 0, b = 0;
                        let inpixp = curImageRow * procPixels.width * 4 + start_pixp;
                        let infiltp = start_filtp;
                        let local_phase;
                        let filt = HYBRID_FIR.kernel[phase][subpixel];
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
                        outPixels.data[outp++] = r;
                        outPixels.data[outp++] = g;
                        outPixels.data[outp++] = b;
                        outPixels.data[outp++] = 255;
                    }
                }
                else {
                    switch(parseInt(el.scanline_mode_select.value)) {
                    case 0:
                        {
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
                        break;
                    case 1:
                        {
                            // interpolate scanlines
                            let inp1 = outPixels.width * 4 * (curImageRow-procPixels.height)*2;
                            let outp = inp1 + outPixels.width * 4;
                            let inp2 = outp + outPixels.width * 4;
                            for(let x = 0; x < outPixels.width; ++x) {
                                let ra = Math.pow(outPixels.data[inp1++],GAMMA);
                                let ga = Math.pow(outPixels.data[inp1++],GAMMA);
                                let ba = Math.pow(outPixels.data[inp1++],GAMMA);
                                inp1++;
                                let rb = Math.pow(outPixels.data[inp2++],GAMMA);
                                let gb = Math.pow(outPixels.data[inp2++],GAMMA);
                                let bb = Math.pow(outPixels.data[inp2++],GAMMA);
                                inp2++;
                                outPixels.data[outp++] = Math.pow((ra+rb)/8,INVERSE_GAMMA);
                                outPixels.data[outp++] = Math.pow((ga+gb)/8,INVERSE_GAMMA);
                                outPixels.data[outp++] = Math.pow((ba+bb)/8,INVERSE_GAMMA);
                                outPixels.data[outp++] = 255;
                            }
                        }
                        break;
                    case 2:
                        {
                            // overbright scanlines
                            // (not *quite* the same as in the emulator, but you'll get the gist)
                            let inp1 = outPixels.width * 4 * (curImageRow-procPixels.height)*2;
                            let outp = inp1 + outPixels.width * 4;
                            let inp2 = outp + outPixels.width * 4;
                            for(let x = 0; x < outPixels.width; ++x) {
                                let r_above = Math.pow(outPixels.data[inp1++],GAMMA);
                                let g_above = Math.pow(outPixels.data[inp1++],GAMMA);
                                let b_above = Math.pow(outPixels.data[inp1++],GAMMA);
                                inp1 -= 3;
                                let r_replace = r_above*BRIGHT_MULT;
                                let r_bloom = Math.max(r_replace - BRIGHT_THRESHOLD, 0);
                                let g_replace = g_above*BRIGHT_MULT;
                                let g_bloom = Math.max(g_replace - BRIGHT_THRESHOLD, 0);
                                let b_replace = b_above*BRIGHT_MULT;
                                let b_bloom = Math.max(b_replace - BRIGHT_THRESHOLD, 0);
                                outPixels.data[inp1++] = Math.pow(r_replace,INVERSE_GAMMA);
                                outPixels.data[inp1++] = Math.pow(g_replace,INVERSE_GAMMA);
                                outPixels.data[inp1++] = Math.pow(b_replace,INVERSE_GAMMA);
                                ++inp1;
                                let r_below = Math.pow(outPixels.data[inp2++],GAMMA);
                                let g_below = Math.pow(outPixels.data[inp2++],GAMMA);
                                let b_below = Math.pow(outPixels.data[inp2++],GAMMA);
                                inp2++;
                                r_bloom = (r_bloom + Math.max(r_below * BRIGHT_MULT - BRIGHT_THRESHOLD, 0)) / 4;
                                g_bloom = (g_bloom + Math.max(g_below * BRIGHT_MULT - BRIGHT_THRESHOLD, 0)) / 4;
                                b_bloom = (b_bloom + Math.max(b_below * BRIGHT_MULT - BRIGHT_THRESHOLD, 0)) / 4;
                                outPixels.data[outp++] = Math.pow((r_above+r_below)/8+r_bloom,INVERSE_GAMMA);
                                outPixels.data[outp++] = Math.pow((g_above+g_below)/8+g_bloom,INVERSE_GAMMA);
                                outPixels.data[outp++] = Math.pow((b_above+b_below)/8+b_bloom,INVERSE_GAMMA);
                                outPixels.data[outp++] = 255;
                            }
                        }
                        break;
                    }
                }
                ++curImageRow;
                if(curImageRow >= outPixels.height) {
                    canvas.width = outPixels.width;
                    canvas.height = outPixels.height;
                    let ctx = canvas.getContext("2d");
                    ctx.putImageData(outPixels, 0, 0);
                    image = new Image();
                    image.src = canvas.toDataURL("image/png");
                    active = false;
                    progress.style.display = "none";
                    el.display.width = outPixels.width;
                    el.display.height = outPixels.height;
                    el.display.src = image.src;
                    el.display.style.display = "block";
                }
                else {
                    progress.max = outPixels.height;
                    progress.value = curImageRow;
                    progress.style.display = "block";
                    //el.display.style.display = "none";
                }
            }
            if(active)
                window.requestAnimationFrame(proc);
        }
        el.scanline_mode_select.onchange = function() {
            if(procPixels !== undefined)
                beginNewProc(procPixels);
        }
    }
}
catch(e) {
    fatal(e);
}
