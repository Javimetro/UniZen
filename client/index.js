document.addEventListener("DOMContentLoaded", function() {
  // Etsitään lomake ja lisätään sille tapahtumankuuntelija
  const loginForm = document.getElementById('login-form');
  loginForm.addEventListener('submit', function(event) {
    // Estetään lomakkeen lähetyksen oletustoiminto
    event.preventDefault();

    // Haetaan käyttäjän antamat tiedot lomakkeelta
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Tulostetaan käyttäjänimi ja salasana konsoliin
    console.log('Username:', username);
    console.log('Password:', password);

    // Tyhjennetään kenttien arvot
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';

    // Tässä voit lisätä lisätoimintoja, esim. lähetys palvelimelle jne.
  });
});

