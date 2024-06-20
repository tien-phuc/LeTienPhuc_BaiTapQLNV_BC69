let arrNhanVien = [];

// ooooooooooooooooooooooooooooooooo
// hàm lấy value
function getValueForm() {
  let arrField = document.querySelectorAll(
    ".modal-body input, .modal-body select"
  );

  let isValid = true;

  let nhanVien = new NhanVien();
  for (let field of arrField) {
    let { id, value } = field;
    if (id === "gioLam") {
      nhanVien[id] = parseInt(value);
    } else {
      nhanVien[id] = value;
    }

    // VALIDATION
    let formGroup = field.closest(".form-group");
    console.log("formGroup: ", formGroup);
    let errorEle = formGroup.querySelector("span.sp-thongbao");

    let isValidEmpty = checkEmptyValue(value, errorEle);
    isValid &= isValidEmpty;
    if (!isValidEmpty) {
      continue;
    }

    let dataValidation = field.getAttribute("data-validation");
    if (dataValidation == "account") {
      isValid &= checkAccountValue(value, errorEle);
    }

    if (dataValidation == "name") {
      isValid &= checkNameValue(value, errorEle);
    }

    if (dataValidation == "email") {
      isValid &= checkEmailValue(value, errorEle);
    }

    if (dataValidation == "pass") {
      isValid &= checkPasswordValue(value, errorEle);
    }

    if (dataValidation == "salary") {
      isValid &= checkSalaryValue(value, errorEle);
    }

    if (dataValidation == "time") {
      isValid &= checkTimeWorkValue(value, errorEle);
    }
  }

  if (isValid) {
    return nhanVien;
  }
  return null;
}

// ooooooooooooooooooooooooooooooooo
// sự kiện chính
document.getElementById("formNhanVien").onsubmit = function (event) {
  event.preventDefault();

  let nhanVien = getValueForm();

  // thêm mới vào mảng
  if (!nhanVien) {
    return;
  }
  arrNhanVien.push(nhanVien);
  console.log(arrNhanVien);

  // clear dữ liệu
  event.target.reset();

  // hiển thị các nhân viên có trong mảng vào table
  renderDanhSachNhanVien();

  // mở khóa input tài khoản
  document.getElementById("tknv").readOnly = false;

  // Thêm & Lưu trữ dữ liệu vào local Storage
  saveLocalStorage();
};

// ooooooooooooooooooooooooooooooooo
// chức năng hiển thị value vào table
function renderDanhSachNhanVien(arr = arrNhanVien) {
  let content = "";
  arr.forEach((item) => {
    let nhanVien = new NhanVien();
    Object.assign(nhanVien, item);
    console.log(nhanVien);
    let { tknv, name, email, datepicker, chucvu } = nhanVien;
    content += `
      <tr>
        <td>${tknv}</td>
        <td>${name}</td>
        <td>${email}</td>
        <td>${datepicker}</td>
        <td>${chucvu}</td>
        <td>${nhanVien.tinhTongLuong()}</td>
        <td>${nhanVien.xepLoaiNhanVien()}</td>
        <td>
          <button onclick="deleteNhanVien('${tknv}')" type="button" class="btn btn-danger">Xóa</button>
          <button onclick="getInfoNhanVien('${tknv}')" type="button" class="btn btn-warning">Sửa</button>
        </td>
      </tr>
    `;
  });
  document.getElementById("tableDanhSach").innerHTML = content;
}

// ooooooooooooooooooooooooooooooooo
// chức năng lưu local
function saveLocalStorage(key = "arrNhanVien", value = arrNhanVien) {
  let stringJson = JSON.stringify(value);
  localStorage.setItem(key, stringJson);
}

// ooooooooooooooooooooooooooooooooo
// chức năng lấy local
function getLocalStorage(key = "arrNhanVien") {
  let dataLocal = localStorage.getItem(key);
  if (dataLocal) {
    let reverseData = JSON.parse(dataLocal);
    arrNhanVien = reverseData;
    renderDanhSachNhanVien();
  }
}
getLocalStorage();

// ooooooooooooooooooooooooooooooooo
// chức năng xóa
function deleteNhanVien(tknv) {
  let index = arrNhanVien.findIndex((item, index) => item.tknv == tknv);
  if (index != -1) {
    arrNhanVien.splice(index, 1);
    renderDanhSachNhanVien();
    saveLocalStorage();
  }
}

// ooooooooooooooooooooooooooooooooo
// chức năng cập nhật
function getInfoNhanVien(tknv) {
  let nhanVien = arrNhanVien.find((item) => item.tknv == tknv);
  if (nhanVien) {
    let arrField = document.querySelectorAll(
      ".modal-body input, .modal-body select"
    );

    for (let field of arrField) {
      let id = field.id;

      field.value = nhanVien[id];
      if (field.id == "tknv") {
        field.readOnly = true;
      }
    }
    // Hiển thị modal khi nhấn nút Sửa
    $("#myModal").modal("show");
  }
}

// ooooooooooooooooooooooooooooooooo
// chức năng cập nhật vào table
function updateNhanVien() {
  let nhanVien = getValueForm();

  if (!nhanVien) {
    return;
  }

  let index = arrNhanVien.findIndex((item, index) => {
    return item.tknv == nhanVien.tknv;
  });
  console.log("index: ", index);

  if (index != -1) {
    arrNhanVien[index] = nhanVien;
    renderDanhSachNhanVien();
    saveLocalStorage();
  }

  // clear dữ liệu sau khi ấn cập nhật
  document.getElementById("formNhanVien").reset();

  // mở khóa input tài khoản
  document.getElementById("tknv").readOnly = false;

  // Đóng modal sau khi cập nhật
  $("#myModal").modal("hide");
}
document.getElementById("btnCapNhat").onclick = updateNhanVien;

// ooooooooooooooooooooooooooooooooo
// chức năng tìm kiếm
// Cách 1
function seachNhanVien(event) {
  let seachKeyWord = removeVietnameseTones(
    event.target.value.toLowerCase().trim()
  );

  let arrSeachNhanVien = arrNhanVien.filter((item, index) => {
    let nhanVien = new NhanVien();
    Object.assign(nhanVien, item);

    let seachXepLoai = removeVietnameseTones(
      nhanVien.xepLoaiNhanVien().toLowerCase().trim()
    );
    return seachXepLoai.includes(seachKeyWord);
  });
  renderDanhSachNhanVien(arrSeachNhanVien);
}
document.getElementById("searchName").oninput = seachNhanVien;

// cách 2
// function seachNhanVien() {
//   // Lấy giá trị từ input tìm kiếm
//   let searchInput = document
//     .getElementById("searchName")
//     .value.toLowerCase()
//     .trim();
//   let seachKeyWord = removeVietnameseTones(searchInput);

//   let arrSeachNhanVien = arrNhanVien.filter((item, index) => {
//     let nhanVien = new NhanVien();
//     Object.assign(nhanVien, item);

//     let seachXepLoai = removeVietnameseTones(
//       nhanVien.xepLoaiNhanVien().toLowerCase().trim()
//     );
//     return seachXepLoai.includes(seachKeyWord);
//   });

//   renderDanhSachNhanVien(arrSeachNhanVien);
// }
// document.getElementById("btnTimNV").onclick = function () {
//   seachNhanVien();
// };
