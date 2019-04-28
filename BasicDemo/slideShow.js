var warp = document.querySelector(".warp");
var next = document.querySelector(".arrow_right");
var prev = document.querySelector(".arrow_left");

function next_pic() {
    let newLeft;
    if (warp.style.left === "-8640px") {
        newLeft = -1920;
    } else {
        newLeft = parseInt(warp.style.left) - 960;
    }
    warp.style.left = newLeft + "px";

    index++;
    if (index > 7) {
        index = 0;
    }
    showCurrentDot();
}

function prev_pic() {
    let newLeft;
    if (warp.style.left === "0px") {
        newLeft = -6720;
    } else {
        newLeft = parseInt(warp.style.left) + 960;
    }
    warp.style.left = newLeft + "px";

    index--;
    if (index < 0) {
        index = 7;
    }
    showCurrentDot();
}

next.onclick = next_pic;
prev.onclick = prev_pic;


// 自动轮播
var timer = null;
function autoPlay() {
    timer = setInterval(function () {
        next_pic();
    }, 3000);
}
autoPlay();
// 停止、继续播放
var container = document.querySelector(".container");
container.onmouseenter = function () {
    clearInterval(timer);
}
container.onmouseleave = function () {
    autoPlay();
}

// 下方数字跟随动
var index = 0;
var dots = document.getElementsByTagName("span");
function showCurrentDot() {
    for (let i = 0; i < dots.length; i++) {
        dots[i].className = "";
    }
    dots[index].className = "on";
}

// 点击数字切换图片（用到了闭包）
for (let i = 0; i < dots.length; i++) {
    (function (i) {
        dots[i].onclick = function () {
            let dis = index - i;
            if (index == 7 && parseInt(warp.style.left) !== -8640) {
                dis = dis - 8;
            }
            if (index == 0 && parseInt(warp.style.left) !== -960) {
                dis = dis + 8;
            }
            warp.style.left = (parseInt(warp.style.left) + dis*960)+"px";
            index = i;
            showCurrentDot();
        }
    })(i);
}