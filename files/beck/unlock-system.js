/**
 * AE DISTRICT — Hidden Menu Unlock System
 * Detects "question" keypress sequence on any page
 * Stores unlock flag to localStorage for cross-page persistence
 */

(() => {
  let secretBuffer = '';
  const secretPassword = 'question';

  document.addEventListener('keydown', (e) => {
    // Only track alphanumeric keys
    if (/^[a-z]$/i.test(e.key)) {
      secretBuffer += e.key.toLowerCase();
      
      // Keep only the last N characters (length of password)
      if (secretBuffer.length > secretPassword.length) {
        secretBuffer = secretBuffer.slice(-secretPassword.length);
      }

      // Check if buffer ends with password
      if (secretBuffer === secretPassword) {
        localStorage.setItem('droog_unlocked', 'true');
        secretBuffer = '';
        
        // Visual feedback (optional - remove if you prefer silent unlock)
        console.log('🔓 Access granted.');
        
        // Show menu if it exists on current page
        const menu = document.getElementById('hidden-menu');
        const toggle = document.getElementById('menu-toggle');
        if (menu && toggle) {
          toggle.classList.add('visible');
        }
      }
    }

    // Reset buffer on Enter (optional - allows continuous typing)
    if (e.key === 'Enter') {
      secretBuffer = '';
    }
  });
})();
