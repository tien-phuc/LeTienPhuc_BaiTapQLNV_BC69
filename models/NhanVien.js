class NhanVien {
  tknv = "";
  name = "";
  email = "";
  password = "";
  datepicker = "";
  luongCB = 0;
  chucvu = "";
  gioLam = 0;

  // Phương thức tính tổng lương
  tinhTongLuong = function () {
    let tongLuong = 0;
    if (this.chucvu === "Giám đốc") {
      tongLuong = this.luongCB * 3;
    } else if (this.chucvu === "Trưởng phòng") {
      tongLuong = this.luongCB * 2;
    } else if (this.chucvu === "Nhân viên") {
      tongLuong = this.luongCB * 1;
    } else {
      tongLuong = this.luongCB;
    }
    return tongLuong;
  };

  // Phương thức xếp loại nhân viên
  xepLoaiNhanVien = function () {
    if (this.gioLam >= 192) {
      return "Nhân viên loại xuất sắc";
    } else if (this.gioLam >= 176) {
      return "Nhân viên loại giỏi";
    } else if (this.gioLam >= 160) {
      return "Nhân viên loại khá";
    } else {
      return "Nhân viên loại Trung bình";
    }
  };
}
