import CONFIG from "./config.js";

document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch(`${CONFIG.API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    if (response.ok) {
      const data = await response.json();
      // salvar token para manter login
      localStorage.setItem("token", data.token);
      alert('Login realizado com sucesso!');
      window.location.href = '/dashboard.html';
    } else {
      const err = await response.json();
      alert(`Falha no login: ${err.message || "Usuário ou senha inválidos"}`);
    }
  } catch (error) {
    console.error("Erro na requisição:", error);
    alert("Erro ao conectar com o servidor.");
  }
});
