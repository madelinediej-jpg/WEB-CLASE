 (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
diff --git a/script.js b/script.js
new file mode 100644
index 0000000000000000000000000000000000000000..dcc95ae60c7662927c9a6c45d235f09bdadc847a
--- /dev/null
+++ b/script.js
@@ -0,0 +1,162 @@
+const navToggle = document.querySelector('.nav-toggle');
+const navLinks = document.querySelector('.nav-links');
+const themeToggle = document.querySelector('.theme-toggle');
+const themeIcon = document.querySelector('.theme-icon');
+const themeLabel = document.querySelector('.theme-label');
+const html = document.documentElement;
+
+const contactForm = document.querySelector('#contact-form');
+const formStatus = document.querySelector('#form-status');
+
+const fields = {
+  nombre: document.querySelector('#nombre'),
+  email: document.querySelector('#email'),
+  mensaje: document.querySelector('#mensaje')
+};
+
+const errorEls = {
+  nombre: document.querySelector('#error-nombre'),
+  email: document.querySelector('#error-email'),
+  mensaje: document.querySelector('#error-mensaje')
+};
+
+const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
+
+function setTheme(theme) {
+  const isDark = theme === 'dark';
+  html.setAttribute('data-theme', theme);
+  localStorage.setItem('theme', theme);
+
+  if (themeToggle) {
+    themeToggle.setAttribute('aria-pressed', String(isDark));
+  }
+
+  if (themeIcon) {
+    themeIcon.textContent = isDark ? '🌙' : '☀️';
+  }
+
+  if (themeLabel) {
+    themeLabel.textContent = isDark ? 'Oscuro' : 'Claro';
+  }
+}
+
+function getPreferredTheme() {
+  const storedTheme = localStorage.getItem('theme');
+
+  if (storedTheme === 'dark' || storedTheme === 'light') {
+    return storedTheme;
+  }
+
+  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
+}
+
+function validateField(name) {
+  const field = fields[name];
+  const errorEl = errorEls[name];
+
+  if (!field || !errorEl) {
+    return true;
+  }
+
+  const value = field.value.trim();
+  let message = '';
+
+  if (name === 'nombre') {
+    if (value.length < 2) {
+      message = 'Escribe tu nombre (mínimo 2 caracteres).';
+    }
+  }
+
+  if (name === 'email') {
+    if (!emailRegex.test(value)) {
+      message = 'Introduce un email válido.';
+    }
+  }
+
+  if (name === 'mensaje') {
+    if (value.length < 15) {
+      message = 'El mensaje debe tener al menos 15 caracteres.';
+    }
+  }
+
+  errorEl.textContent = message;
+  field.setAttribute('aria-invalid', message ? 'true' : 'false');
+  return !message;
+}
+
+function showFormStatus(message, type) {
+  if (!formStatus) {
+    return;
+  }
+
+  formStatus.textContent = message;
+  formStatus.classList.remove('success', 'error');
+  formStatus.classList.add(type);
+}
+
+if (navToggle && navLinks) {
+  navToggle.addEventListener('click', () => {
+    navLinks.classList.toggle('open');
+    const expanded = navLinks.classList.contains('open');
+    navToggle.setAttribute('aria-expanded', String(expanded));
+  });
+}
+
+if (themeToggle) {
+  setTheme(getPreferredTheme());
+
+  themeToggle.addEventListener('click', () => {
+    const currentTheme = html.getAttribute('data-theme') || 'dark';
+    setTheme(currentTheme === 'dark' ? 'light' : 'dark');
+  });
+}
+
+Object.keys(fields).forEach((name) => {
+  const field = fields[name];
+
+  if (field) {
+    field.addEventListener('blur', () => validateField(name));
+    field.addEventListener('input', () => {
+      if (field.getAttribute('aria-invalid') === 'true') {
+        validateField(name);
+      }
+    });
+  }
+});
+
+if (contactForm) {
+  contactForm.addEventListener('submit', (event) => {
+    event.preventDefault();
+
+    const isValid = ['nombre', 'email', 'mensaje'].every((name) => validateField(name));
+
+    if (!isValid) {
+      showFormStatus('Revisa los campos marcados para poder enviar.', 'error');
+      return;
+    }
+
+    showFormStatus('¡Gracias! Tu mensaje fue enviado correctamente.', 'success');
+    contactForm.reset();
+  });
+}
+
+const revealElements = document.querySelectorAll('.reveal-on-scroll');
+const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
+
+if (prefersReducedMotion) {
+  revealElements.forEach((element) => element.classList.add('visible'));
+} else {
+  const observer = new IntersectionObserver(
+    (entries, currentObserver) => {
+      entries.forEach((entry) => {
+        if (entry.isIntersecting) {
+          entry.target.classList.add('visible');
+          currentObserver.unobserve(entry.target);
+        }
+      });
+    },
+    { threshold: 0.15 }
+  );
+
+  revealElements.forEach((element) => observer.observe(element));
+}
 
EOF
)
