// Register Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('ServiceWorker registration successful');
        
        // Check for updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // New update available
              console.log('New content is available; please refresh.');
              // You could show a notification to the user here
            }
          });
        });
      })
      .catch(err => {
        console.log('ServiceWorker registration failed: ', err);
      });
  });
  
  // Check for updates on page load
  window.addEventListener('load', () => {
    if (navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({
        type: 'PING',
        data: { timestamp: Date.now() }
      });
    }
  });
  
  // Listen for messages from service worker
  navigator.serviceWorker.addEventListener('message', event => {
    if (event.data && event.data.type === 'REFRESH') {
      // Handle refresh request from service worker
      window.location.reload();
    }
  });
}

// Check if the app is running as a PWA
function isRunningAsPWA() {
  return (window.matchMedia('(display-mode: standalone)').matches) || 
         (window.navigator.standalone) || 
         document.referrer.includes('android-app://');
}

// Add to home screen prompt
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent the mini-infobar from appearing on mobile
  e.preventDefault();
  // Stash the event so it can be triggered later
  deferredPrompt = e;
  
  // Show custom install button or banner
  showInstallPromotion();
});

function showInstallPromotion() {
  // Show your custom install button or banner
  const installButton = document.createElement('button');
  installButton.id = 'install-button';
  installButton.textContent = 'Install Irys Town';
  installButton.style.position = 'fixed';
  installButton.style.bottom = '20px';
  installButton.style.right = '20px';
  installButton.style.padding = '10px 15px';
  installButton.style.background = 'var(--primary-color)';
  installButton.style.color = '#000';
  installButton.style.border = 'none';
  installButton.style.borderRadius = '5px';
  installButton.style.cursor = 'pointer';
  installButton.style.zIndex = '1000';
  
  installButton.addEventListener('click', async () => {
    // Hide the install button
    installButton.style.display = 'none';
    
    // Show the install prompt
    deferredPrompt.prompt();
    
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to the install prompt: ${outcome}`);
    
    // Clear the saved prompt since it can't be used again
    deferredPrompt = null;
  });
  
  // Only show the button if not running as PWA and not on iOS
  if (!isRunningAsPWA() && !/iPad|iPhone|iPod/.test(navigator.userAgent)) {
    document.body.appendChild(installButton);
  }
}

// Track app installation
window.addEventListener('appinstalled', () => {
  console.log('Irys Town was installed.');
  // You could send this event to analytics
});
