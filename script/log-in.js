//事件监听器
let Log_in_Btn = document.getElementById("submitbtn");
Log_in_Btn.addEventListener("click", submitAll);

//参数放这里
let account = document.getElementById("account");//操纵用户名输入框
let password = document.getElementById("password");//操纵密码输入框
let username_error = document.getElementById("username_error");//操纵用户名提示框
let password_error = document.getElementById("password_error");//操纵密码提示框
let empty_pass = 1;//验证用户输入是否非空
let illegal_pass = 1;//验证用户输入是否含有非法字符
let remember = document.getElementById("remember");//操纵记住密码复选框
let emailRegex = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;//邮箱正则表达式 
let account_tpye = false;//判断账号类型
const illegal_name = /^[a-zA-Z]\w{4,15}$/; //验证用户名非法字符正则，字母开头，5~16位，允许包含字母、数字、下划线
const illegal_password = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{6}$/; //验证密码非法字符正则，匹配 6 位包含大小写字母和数字

//验证提交
function submitAll() {
  checkEmpty();//验证非空

  if (empty_pass == 0) {
    event.preventDefault();
    return false;
  }

  //判断账号类型
  if (checkAccountType(account.value)) {
    emaillRight();//检验邮箱与密码
  } else {
    checkIllegal(account); //验证用户名非法字符
    if (illegal_pass == 0) {
      event.preventDefault();
      return false;
    }
    usernameRight();//检验用户名与密码
  }

  //console.log(remember.checked);
  if (remember.checked) {
    save();//保存cookie
  }
  event.preventDefault();
}


//验证非空
function checkEmpty() {

  username_error.innerHTML = "";//错误信息复位
  password_error.innerHTML = "";
  if (account.value == "") {
    username_error.innerHTML = "用户名不能为空";
    empty_pass = 0;
  }
  else {
    empty_pass = 1;
  }

  if (password.value == "") {
    password_error.innerHTML = "密码不能为空";
    empty_pass = 0;
  }
  else {
    empty_pass = 1;
  }
}

//验证非法字符
function checkIllegal(account) {
  if (!illegal_name.test(account.value)) {
    username_error.innerHTML = "账号格式不正确";
    illegal_pass = 0;
  }
  else {
    illegal_pass = 1;
  }

}

//检测是用户名还是邮箱
function checkAccountType(account) {
  if (!emailRegex.test(account)) {
    account_tpye = false;
    console.log("用户名");
    return account_tpye;
  }
  else {
    account_tpye = true;
    console.log("邮箱");
    return account_tpye;
  }
}

//验证邮箱密码是否正确
function emaillRight() {
  fetch('./mockup/json-test.json')
    .then(response => response.json())
    .then(fetchedData => {
      data = fetchedData;
      for (let i = 0; i < data.email.length; i++) {
        if (account.value == data.email[i].address) {
          console.log("邮箱存在");
          if (password.value == data.email[i].password) {
            console.log("密码正确");
            alert("登录成功");
            return true;
            break;
          }
          else {
            console.log("密码错误");
            password_error.innerHTML = "密码错误";
            break;
          }
        }
        else {
          console.log("邮箱不存在");
          username_error.innerHTML = "邮箱不存在";
        }
      }
    })
    .catch(error => console.error('出错啦:', error));
}

//验证用户名密码是否正确
function usernameRight() {
  fetch('./mockup/json-test.json')
    .then(response => response.json())
    .then(fetchedData => {
      data = fetchedData;
      for (let i = 0; i < data.users.length; i++) {
        if (account.value == data.users[i].username) {
          console.log("用户名存在");
          if (password.value == data.users[i].password) {
            console.log("密码正确");
            alert("登录成功");
            return true;
            break;
          }
          else {
            console.log("密码错误");
            password_error.innerHTML = "密码错误";

            break;
          }
        }
        else {
          console.log("用户名不存在");
          username_error.innerHTML = "用户名不存在";
        }
      }
    })
    .catch(error => console.error('出错啦:', error));
}

//保存cookie
function save() {
  document.cookie = `username=${encodeURIComponent(account.value)}; expires=Fri, 31 Dec 2024 23:59:59 GMT;`;
  document.cookie = `password=${encodeURIComponent(password.value)}; expires=Fri, 31 Dec 2024 23:59:59 GMT;`;
}

//读取cookie
window.onload = () => {
  const cookieStr = document.cookie;
  const cookiePairs = cookieStr.split('; ');
  const cookies = {};

  for (const pair of cookiePairs) {
    const [key, value] = pair.split('=');
    cookies[key] = decodeURIComponent(value);
  }

  if (cookies.username) {
    document.getElementById('account').value = cookies.username;
  }
  if (cookies.password) {
    document.getElementById('password').value = cookies.password;
  }
};