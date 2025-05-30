document.addEventListener('DOMContentLoaded', () => {
  // Toggle contraseña
  const togglePasswordEls = document.querySelectorAll('#togglePassword');
  togglePasswordEls.forEach(toggle => {
    const input = toggle.closest('div').querySelector('input[type="password"], input[type="text"]');
    toggle.addEventListener('click', () => {
      const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
      input.setAttribute('type', type);
      toggle.textContent = type === 'password' ? '👁' : '🙈';
    });
  });

  // Dropdown usuario
  const userBtn = document.getElementById('userBtn');
  const userDropdown = document.getElementById('userDropdown');
  if (userBtn) {
    userBtn.addEventListener('click', e => {
      e.stopPropagation();
      userDropdown.classList.toggle('hidden');
    });
    document.addEventListener('click', () => {
      if (!userDropdown.classList.contains('hidden')) {
        userDropdown.classList.add('hidden');
      }
    });
  }
});