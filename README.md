# Student-Information-System
HCMUS -  Software Design 22TKPM3 Project

# Hướng Dẫn Commit và Push Code

- **Branch Commit Chính:**  
  Tất cả các commit của nhóm mình phải được thực hiện trên branch **develop**.

- **Cập Nhật Phiên Bản Mới Nhất:**  
  Trước khi bắt đầu làm việc và commit, hãy luôn chạy:
  ```bash
  git pull origin develop
  ```
  để đảm bảo rằng bạn có bản mới nhất trên local và tránh xung đột.
- Commit Code:
  Khi push code, hãy ghi rõ commit message mô tả các thay đổi đã thực hiện. Ví dụ:
  ```bash
  git add .
  git commit -m "Cập nhật giao diện + sửa lỗi hiển thị dữ liệu"
  git push origin develop
  ```
- Nếu gặp lỗi liên quan đến package không tồn tại, sử dụng lệnh
  ```bash
  npm install
  ```
  để đảm bảo các package mới nhất được tải về.
