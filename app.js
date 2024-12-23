const bufferClasses = document.querySelector('.buffer').classList;
const divs = [...document.querySelectorAll('.clock div')];

function tick() {
  const now = new Date();
  divs[bufferClasses.contains('show') ? 0 : 1].innerText = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
  bufferClasses.toggle("show");
  window.setTimeout(tick, (60-now.getSeconds())*1000 - now.getMilliseconds());
}

tick();

if (navigator.wakeLock) {
  navigator.wakeLock.request();
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      navigator.wakeLock.request();
    }
  });
}
