const bufferClasses = document.querySelector('.buffer').classList;
const divs = [...document.querySelectorAll('.clock div')];

function tick() {
  const now = new Date();
  divs[bufferClasses.contains('show') ? 0 : 1].innerText = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
  bufferClasses.toggle("show");
  window.setTimeout(tick, (60-now.getSeconds())*1000 - now.getMilliseconds());
}

const registerServiceWorker = async () => {
  if ("serviceWorker" in navigator) {
    try {
      const registration = await navigator.serviceWorker.register("sw.js", {
        scope: "/",
      });
      if (registration.installing) {
        console.log("Service worker installing");
      } else if (registration.waiting) {
        console.log("Service worker installed");
      } else if (registration.active) {
        console.log("Service worker active");
      }
    } catch (error) {
      console.error(`Registration failed with ${error}`);
    }
  }
};
  
registerServiceWorker();  

tick();

if (navigator.wakeLock) {
  navigator.wakeLock.request();
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      navigator.wakeLock.request();
    }
  });
}
