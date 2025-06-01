document.addEventListener('DOMContentLoaded', () => {
    // icono SVG ojo abierto
  const svgOpen = `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
      <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    </svg>
  `;
  // icono SVG ojo cerrado
  const svgClosed = `
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
    </svg>`;

  // Toggle mostrar/ocultar contraseña
  document.querySelectorAll('#togglePassword').forEach(toggle => {
    const input = toggle.closest('div').querySelector('input[type="password"], input[type="text"]');
    // Inicialmente muestro el icono de "ojo cerrado" para indicar que la contraseña está oculta
    toggle.innerHTML = svgClosed;
    // Evento 'al hacer click'
    toggle.addEventListener('click', () => {
      const isPassword = input.getAttribute('type') === 'password';
      input.setAttribute('type', isPassword ? 'text' : 'password');
      // Si antes era password, pasamos a texto (ojo abierto); si no, al revés
      toggle.innerHTML = isPassword ? svgOpen : svgClosed;
    });
  });

  // Dropdown usuario esquina superior derecha de la página
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
    // ACORDEÓN: desplegar/plegar paneles
  document.querySelectorAll('#accordion button').forEach(btn => {
    btn.addEventListener('click', () => {
      const panelId = btn.getAttribute('data-target');
      const panel   = document.getElementById(panelId);
      const icon    = btn.querySelector('svg[data-icon="chevron"]');

      // Alternar visibilidad del contenido
      panel.classList.toggle('hidden');

      // Rotar el icono chevron
      if (panel.classList.contains('hidden')) {
        icon.classList.remove('rotate-180');
      } else {
        icon.classList.add('rotate-180');
      }
    });
  });
  
  // CARROUSEL
  let current = 0;
  const slides = document.getElementById('slides');
  const total = slides.children.length;

  document.getElementById('prev').addEventListener('click', () => {
    current = (current - 1 + total) % total;
    slides.style.transform = `translateX(-${current * 100}%)`;
  });

  document.getElementById('next').addEventListener('click', () => {
    current = (current + 1) % total;
    slides.style.transform = `translateX(-${current * 100}%)`;
  });
});