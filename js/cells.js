// JavaScript source code

var MARGIN = 20;
var g_ID = 0;
function cell(left, top, width, height) {
    this.cellID = g_ID++;

    this.left = left;
    this.top = top;
    this.width = width;
    this.height = height;
    this.text = "";

    this.div = document.createElement("DIV");
    this.div = document.body.appendChild(this.div);
    this.div.setAttribute("class", "cell");
    this.div.setAttribute("style", "left:" + String(this.left) + "px;top:" + String(this.top) + "px;");
    this.audio = document.createElement("audio");
    this.audio = document.body.appendChild(this.audio);
    this.audio.setAttribute("hidden", "true");
    //this.audio.setAttribute("controls", "controls");
    var cell = this;
    this.div.onclick = function (e) { cell.audio.play();};
}

cell.prototype.type = "cell";
cell.prototype.setText = function (new_text)
{
    this.div.innerHTML = new_text;
}
cell.prototype.setPronouce = function(pronouce)
{
    this.audio.setAttribute("src", pronouce);
}
