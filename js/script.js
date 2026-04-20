// открывем чат после перехода с subscribe123.html
window.addEventListener('DOMContentLoaded', () => {
  try {
    const openChat = localStorage.getItem('openChat');

    if (openChat === 'true') {
      const chatBot = document.querySelector('.chat-bot');
      if (chatBot) {
        chatBot.classList.remove('hidden');

          if (typeof setBodyScrollLock === 'function') {
              setBodyScrollLock(true);
          }
      }

      // сбросить, чтобы сработало только один раз
      localStorage.removeItem('openChat');

      document.querySelectorAll('.x_order_form').forEach(form => {
        form.classList.remove('x_order_form');
        form.classList.add('x_resubmit_form');
        form.removeAttribute('action');
        form.removeAttribute('method');
      });
    }
  } catch (e) {
    console.warn('localStorage недоступен', e);
  }
});

// progress-bar animation
const reviewsSection = document.querySelector(".reviews");
const progressBars = document.querySelectorAll(".elementor-progress-bar[data-max]");

function animateProgressBars() {
  const sectionPosition = reviewsSection.getBoundingClientRect();
  const isVisible = sectionPosition.top >= 0 && sectionPosition.bottom <= window.innerHeight;

  if (isVisible) {
    progressBars.forEach((progressBar) => {
      const maxPercent = progressBar.getAttribute("data-max");
      progressBar.style.width = maxPercent + "%";
      progressBar.style.transition = "width 1s ease-in-out";
    });
    window.removeEventListener("scroll", animateProgressBars);
  }
}

window.addEventListener("scroll", animateProgressBars);

// scroll
var linkNav = document.querySelectorAll('[href^="#"]'),
V = 0.2;
for (var i = 0; i < linkNav.length; i++) {
    linkNav[i].addEventListener('click', function(e) { //по клику на ссылку
        e.preventDefault(); //отменяем стандартное поведение
        var w = window.pageYOffset,  // производим прокрутка прокрутка
        hash = this.href.replace(/[^#]*(.*)/, '$1');  // к id элемента, к которому нужно перейти
        t = document.querySelector(hash).getBoundingClientRect().top - 120,  // отступ от окна браузера до id
        start = null;
        requestAnimationFrame(step);  // подробнее про функцию анимации [developer.mozilla.org]
        function step(time) {
            if (start === null) start = time;
            var progress = time - start,
            r = (t < 0 ? Math.max(w - progress/V, w + t) : Math.min(w + progress/V, w + t));
            window.scrollTo(0,r);
            if (r != w + t) {
                requestAnimationFrame(step)
            } else {
                location.hash = hash  // URL с хэшем
            }
        }
    }, false);
}

// date
const months=['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'],monthMin = ['','','','','','','','','','','',''],days = ['domingo','lunes','martes','miércoles','jueves','viernes','sábado'],daysMin = ['','','','','','',''],seasons = ['invierno','primavera','verano','otoño'];function postDate(daysName, daysMinName, monthsName, monthsMinName, seasonsName) {const _counterLength = 60;for (let counter = 0; counter < _counterLength; counter++) {innerDate(counter, 'date-');innerDate(counter, 'date')} function innerDate(counter, dateType) {let newCounter;dateType === 'date-' ? newCounter = -counter : newCounter = counter; const _msInDay = 86400000, _localDate = new Date(Date.now() + (newCounter * _msInDay)), _day = _localDate.getDate(), _month = _localDate.getMonth() + 1, _year = _localDate.getFullYear(); const dayDefault = addZero(_day), monthDefault = addZero(_month), defaultDate = dayDefault + '.' + monthDefault + '.' + _year; const dateClass = dateType + counter, nodeList = document.querySelectorAll('.' + dateClass); for (let i = 0; i < nodeList.length; i++) {const dateFormat = nodeList[i].dataset.format;dateFormat !== undefined && dateFormat !== ''? nodeList[i].innerHTML = String(changeFormat(dayDefault, _month, _year, dateFormat, newCounter)): nodeList[i].innerHTML = defaultDate} } function changeFormat(_day, _month, _year, format, counter) { let innerFormat = format; const testFormat = ["dd","mm","yyyy","year"], dateFormat = { dd: _day, mm: addZero(_month), yyyy: _year, year: getYearWithCounter(_year, counter), }; for (let i = 0; i < testFormat.length; i++) { let string = testFormat[i]; let regExp = new RegExp(string); innerFormat = innerFormat.replace(regExp, dateFormat[string]); } return innerFormat.split(' ').join(' ') } function getYearWithCounter(year, counter) {return year + counter} function addZero(numb){return numb<10?'0'+numb:numb} function changeFirstLetter(isBig,str){return isBig&&str&&str.length>0?str[0].toUpperCase()+str.slice(1):str} }if (document.body.classList.contains('ev-date')) {document.addEventListener("DOMContentLoaded", function () {postDate(days, daysMin, months, monthMin, seasons)});}