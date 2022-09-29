function shadowGenerate(color, lum){
    color = String(color).replace(/[^0-9a-f]/gi, '');
    lum = lum || 0;

    let rgb = '#',
    c;
    for (let i = 0; i < 3; i++) {
        c = parseInt(color.substr(i * 2, 2), 16);
        c = Math.round(Math.min(Math.max(c + c * lum, 0), 255)).toString(16); 
        rgb += c;
    }
    if (rgb.length < 6) {
        rgb = "00" + rgb;
    }
    return rgb;
}

function deleteNodes(father){
    while (father.firstChild) {
        father.removeChild(father.firstChild);
    }
}

export {shadowGenerate ,deleteNodes}