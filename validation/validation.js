function checkEmptyValue(value, errorEle) {
  if (value == "") {
    errorEle.innerHTML = "Vui lòng không bỏ trống thông tin này";
    errorEle.style.display = "block";
    return false;
  } else {
    errorEle.innerHTML = "";
    errorEle.style.display = "none";
    return true;
  }
}

function checkAccountValue(value, errorEle) {
  let regexAccount = /^(?=\d{4,6}$)\d+$/;
  let isValid = regexAccount.test(value);
  if (!isValid) {
    errorEle.innerHTML = "Vui lòng nhập tài khoản có 4-6 số";
    errorEle.style.display = "block";
    return false;
  } else {
    errorEle.innerHTML = "";
    errorEle.style.display = "none";
    return true;
  }
}

function checkNameValue(value, errorEle) {
  let regexName = /^[a-zA-ZÀ-ỹ\s]+$/;
  let isValid = regexName.test(value);
  if (!isValid) {
    errorEle.innerHTML = "Vui lòng chỉ nhập chữ";
    errorEle.style.display = "block";
    return false;
  } else {
    errorEle.innerHTML = "";
    errorEle.style.display = "none";
    return true;
  }
}

function checkEmailValue(value, errorEle) {
  let regexEmail =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  let isValid = regexEmail.test(value);
  if (!isValid) {
    errorEle.innerHTML = "Vui lòng nhập đúng định dạng email";
    errorEle.style.display = "block";
    return false;
  } else {
    errorEle.innerHTML = "";
    errorEle.style.display = "none";
    return true;
  }
}

function checkPasswordValue(value, errorEle) {
  let regexPassword =
    /^(?=.*[0-9])(?=.*[!@#$%^&*()_+={}[\]|\\:;"'<>,.?/])(?=.*[A-Z]).{6,10}$/;
  let isValid = regexPassword.test(value);
  if (!isValid) {
    errorEle.innerHTML =
      "Vui lòng nhập Pass có ít nhất 1 ký tự hoa, 1 ký tự đặc biệt, 1 ký tự số";
    errorEle.style.display = "block";
    return false;
  } else {
    errorEle.innerHTML = "";
    errorEle.style.display = "none";
    return true;
  }
}

function checkSalaryValue(value, errorEle) {
  let regexSalary = /^([0-9][0-9]|20)[0-9]*$/;
  let isValid = regexSalary.test(value);
  if (!isValid) {
    errorEle.innerHTML =
      "Vui lòng nhập lương trong khoảng quy định 1.000.000 đến 20.000.000";
    errorEle.style.display = "block";
    return false;
  } else {
    errorEle.innerHTML = "";
    errorEle.style.display = "none";
    return true;
  }
}

function checkTimeWorkValue(value, errorEle) {
  let regexTimeWork = /^([8-9]\d|1\d{2}|200)$/;
  let isValid = regexTimeWork.test(value);
  if (!isValid) {
    errorEle.innerHTML =
      "Vui lòng nhập giờ trong khoảng quy định 80 giờ đến 200 giờ";
    errorEle.style.display = "block";
    return false;
  } else {
    errorEle.innerHTML = "";
    errorEle.style.display = "none";
    return true;
  }
}
