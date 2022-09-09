let less = require("less");

function loader(sourceLess) {
    let css = "";
    less.render(sourceLess, function(err, res){
        css = res.css;
    })
    // 将\n改为\\n
    css = css.replace(/\n/g, '\\n');
    return css;
}

module.exports = loader