export default function toggleTheme() {
    const themeToggleDarkIcon = document.getElementById(
      'theme-toggle-dark-icon'
    ) as HTMLElement;
    const themeToggleLightIcon = document.getElementById(
      'theme-toggle-light-icon'
    ) as HTMLElement;
    const themeToggleBtn = document.getElementById(
      'theme-toggle'
    ) as HTMLElement;
  
    // Change the icons inside the button based on previous settings
    if (
      localStorage.getItem('color-theme') === 'dark' ||
      (!('color-theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      themeToggleLightIcon.classList.remove('hidden');
    } else {
      themeToggleDarkIcon.classList.remove('hidden');
    }
  
    let event = new Event('dark-mode');
  
    themeToggleBtn.addEventListener('click', function () {
      // toggle icons
      themeToggleDarkIcon.classList.toggle('hidden');
      themeToggleLightIcon.classList.toggle('hidden');
  
      // if set via local storage previously
      if (localStorage.getItem('color-theme')) {
        if (localStorage.getItem('color-theme') === 'light') {
          document.documentElement.classList.add('dark');
          localStorage.setItem('color-theme', 'dark');
        } else {
          document.documentElement.classList.remove('dark');
          localStorage.setItem('color-theme', 'light');
        }
      } else {
        // if NOT set via local storage previously
        if (document.documentElement.classList.contains('dark')) {
          document.documentElement.classList.remove('dark');
          localStorage.setItem('color-theme', 'light');
        } else {
          document.documentElement.classList.add('dark');
          localStorage.setItem('color-theme', 'dark');
        }
      }
  
      document.dispatchEvent(event);
    });
  }
  
  