//事件监听器
let submit = document.getElementById("submit");
submit.addEventListener("click", function (event) {
    submitAll();
    event.preventDefault();
});

//参数放这里
let username = document.getElementById("username");
let email = document.getElementById("email");
let password = document.getElementById("password");
let repassword = document.getElementById("repassword");
let username_error = document.getElementById("username_error");
let email_error = document.getElementById("email_error");
let password_error = document.getElementById("password_error");
let repassword_error = document.getElementById("repassword_error");
let emailRegex = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
let passwordRegex = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,11}$/

//验证参数
let empty_pass = 0;
let email_pass = 0;
let password_pass = 0;
let repassword_pass = 0;
let save_pass = 0;


//函数放这里
function submitAll() {
    //错误信息复位
    username_error.innerHTML = "";
    email_error.innerHTML = "";
    password_error.innerHTML = "";
    repassword_error.innerHTML = "";
    checkEmpty();//验证非空

    if (empty_pass == 0) {
        return false;
    } else {
        //console.log("非空通过");
    }

    checkEmail();//验证邮箱格式
    if (email_pass == 0) {
        return false;
    } else {
        //console.log("邮箱格式通过");
    }

    checkPassword();//验证密码格式
    if (password_pass == 0) {
        return false;
    } else {
        //console.log("密码格式通过");
    }

    checkRepassword();//验证确认密码
    if (repassword_pass == 0) {
        return false;
    } else {
        //console.log("确认密码通过");
    }
    save_pass = 1;
    if (save_pass == 1) {
        //saveData();
    }

}

//验证非空
function checkEmpty() {
    if (username.value.trim() == "") {
        username_error.innerHTML = "用户名不能为空";
        username.focus();
        empty_pass = 0;
    } else {
        empty_pass = 1;
    }

    if (email.value.trim() == "") {

        email_error.innerHTML = "邮箱不能为空";
        email.focus();
        empty_pass = 0;
    } else {
        empty_pass = 1;
    }

    if (password.value.trim() == "") {
        password_error.innerHTML = "密码不能为空";
        password.focus();
        empty_pass = 0;
    } else {
        empty_pass = 1;
    }

    if (repassword.value.trim() == "") {
        repassword_error.innerHTML = "确认密码不能为空";
        repassword.focus();
        empty_pass = 0;
    } else {
        empty_pass = 1;
    }

}
//验证邮箱格式
function checkEmail() {
    if (!emailRegex.test(email.value.trim())) {
        email_error.innerHTML = "邮箱格式不正确";
        email.focus();
        email_pass = 0;
    } else {
        email_pass = 1;
    }
}

//验证密码格式
function checkPassword() {
    if (!passwordRegex.test(password.value.trim())) {
        password_error.innerHTML = "密码格式不正确";
        password.focus();
        password_pass = 0;
    } else {
        password_pass = 1;
    }

}
//验证确认密码
function checkRepassword() {
    if (password.value.trim() != repassword.value.trim()) {
        repassword_error.innerHTML = "确认密码不一致";
        repassword.focus();
        repassword_pass = 0;
    } else {
        repassword_pass = 1;
    }
}

//保存数据
function saveData() {
    console.log("触发保存数据");
    fetch('./mockup/json-test.json')
        .then(response => response.json())
        .then(fetchedData => {
            data = fetchedData;
            let new_data = {
                username: username.value.trim(),
                email: email.value.trim(),
                password: password.value.trim()
            };
            data.users.push(new_data);
//浏览器没有权限修改本地文件，向写入json文件绕不开服务器
     
            

        })
        .catch(error => console.error('出错啦:', error));
}
