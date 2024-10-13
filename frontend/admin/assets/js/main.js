let user = localStorage.getItem('user');
// console.log('Thông tin user: ',user);
const body = document.querySelector('body');
// chuyển user từ string sang dạng Json


if (user) {
  user = JSON.parse(user);
  console.log(user.user);
  if (user.user.role !== 'admin') {
    body.innerHTML = 'Bạn không có quyền truy cập'
  }
} else {
  body.innerHTML = 'Bạn không có quyền truy cập'
}