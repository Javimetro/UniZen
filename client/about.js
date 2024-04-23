const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", async (evt) => {
  evt.preventDefault();

  Swal.fire({
      icon: 'success',
      title: 'Logged out successfully',
      showConfirmButton: false,
      timer: 1500
  }).then(() => {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      window.location.href = 'index.html';
  });
});

