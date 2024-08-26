    //参数放这里
    let buttonleft = document.getElementById("buttonleft");
    let buttonright = document.getElementById("buttonright");
    let m = document.querySelectorAll(".m");
    let images = document.querySelector(".images");
    let index = 0;
    let time = 0;

//轮播图切换
    function position() {
    images.style.left = (index * -100) + "%";
    console.log(index);
}

//防止index过大，m.length为5，index应在0~4之间
function add() {

    if (index > m.length - 2) {
        index = 0;
    } else {
        index++;
    }
}

//防止index过小
function desc() {
   
    if (index < 1) {
        index = m.length - 1;
    } else {
        index--;
    }
}

// 启动定时器，每三秒切换一次背景
function timer() {
    time = setInterval(() => {
        index++;
        desc();
        add();
        position();
    }, 3000);
}

//左切换轮播图
buttonleft.addEventListener("click", () => {
    desc();
    position();
    clearInterval(time); 
    timer(); 
});

//右切换轮播图
buttonright.addEventListener("click", () => {
    add();
    position();
    clearInterval(time);
    timer(); 
});

//为m类添加事件监听器
for (let i = 0; i < m.length; i++) {
    m[i].addEventListener("click", () => {
        index = i;
        position();
        clearInterval(time);
        timer(); 
    });
}
window.onload = () => {
    timer();
}
