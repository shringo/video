const MAIN = document.getElementById("main");

set('./bingchillling2.jpg')

async function onFileChange(E) {
    const file = E.files[0];
    set(await file.arrayBuffer())
}

async function set(I) {
    try {
        var img = await Jimp.read(I);
        const scalar = Math.min((window.innerWidth/3) / img.getWidth(), (window.innerHeight/3) / img.getHeight());
        img = img.resize(
            Math.round(img.getWidth() * (scalar * 0.72)),
            Math.round(img.getHeight() * scalar)
        );
        var pix = '';

        for(var h=0; h<img.getHeight(); h++) {
            pix += '<div>';
            for(var w=0; w<img.getWidth(); w++) {
                var c = Jimp.intToRGBA(img.getPixelColor(w,h));
                pix += '<p style="color: rgba(' + c.r + ',' + c.g + ',' + c.b + ',' + c.a + ')">\u2588\u2588</p>';
            }
            pix += '</div>';
        }
        MAIN.innerHTML = pix;
    } catch(e) {
        console.log(e);
        alert("Bad image");
    }
}