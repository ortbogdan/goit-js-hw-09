// Описан в документации
import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';

const inputRef = document.querySelector('#datetime-picker');
const startBtnRef = document.querySelector('button[data-start]');
const timeRefs = {
 days: document.querySelector('span[data-days]'),
 hours: document.querySelector('span[data-hours]'),
 minutes:document.querySelector('span[data-minutes]'),
 seconds:document.querySelector('span[data-seconds]')}


startBtnRef.setAttribute('disabled', true);

flatpickr('#datetime-picker', {
        enableTime: true,
        time_24hr: true,
        defaultDate: new Date(),
        minuteIncrement: 1,
        onClose(selectedDates) {
            if (selectedDates[0] <= Date.now()) { 
                window.alert("Please choose a date in the future")
            }
            else {
            startBtnRef.removeAttribute('disabled');
            
            const { days, hours, minutes, seconds } = convertMs(selectedDates[0]-Date.now());
            timeRefs.days.textContent = days;
            timeRefs.hours.textContent = hours;
            timeRefs.minutes.textContent = minutes;
            timeRefs.seconds.textContent = seconds;
            console.log(selectedDates[0]);
        }
        }, 
})
startBtnRef.addEventListener('click', onTargetStartTimer);
function onTargetStartTimer (event) {
    timer.start()
}
// Выбор даты
// Метод onClose() из обьекта параметров вызывается каждый раз при закрытии элемента интерфейса который создает flatpickr. Именно в нём стоит обрабатывать дату выбранную пользователем. Параметр selectedDates это массив выбранных дат, поэтому мы берем первый элемент.

// Если пользователь выбрал дату в прошлом, покажи window.alert() с текстом "Please choose a date in the future".
// Если пользователь выбрал валидную дату (в будущем), кнопка «Start» становится активной.
// Кнопка «Start» должа быть не активна до тех пор, пока пользователь не выбрал дату в будущем.
// При нажатии на кнопку «Start» начинается отсчет времени до выбранной даты с момента нажатия.


//   function pad(value) {
//       return String(value).padStart(2, 0);
//   }
  

//   Отсчет времени
// При нажатии на кнопку «Start» скрипт должен вычислять раз в секунду сколько времени осталось до указанной даты и обновлять интерфейс таймера, показывая четыре цифры: дни, часы, минуты и секунды в формате xx:xx:xx:xx.

// Количество дней может состоять из более чем двух цифр.
// Таймер должен останавливаться когда дошел до конечной даты, то есть 00:00:00:00.
// 💡 Не будем усложнять. Если таймер запущен, для того чтобы выбрать новую дату и перезапустить его - необходимо перезагрузить страницу.

// Для подсчета значений используй готовую функцию convertMs, где ms - разница между конечной и текущей датой в миллисекундах.

// class Timer {
//     constructor (date) {
//       this.date = new Date(date).getTime();
//     }
//     start() {
//         setInterval(() => {
//             console.log(this.date)
//     const datesDecrement = this.date - Date.now();
//       console.log(this.convertMs(datesDecrement))
         
//          return this.convertMs(datesDecrement);
//         }, 1000);
    
    
// }

// }

const timer = {
    isActive: false,
    start() {
        if (this.isActive) {
            return;
        }
        const startTime = new Date(inputRef.value);
        this.isActive = true;
        this.intervalId = setInterval(() => {
            const currentTime = Date.now();
            const deltaTime = startTime - currentTime;
            const time = convertMs(deltaTime);
            displaysValues(time);
        }, 1000);
    }
}

function  convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
    // Remaining days
    const days = pad(Math.floor(ms / day));
    // Remaining hours
    const hours = pad(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = pad(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));
    return { days, hours, minutes, seconds };
}

function pad(value) {
    return String(value).padStart(2, '0');
} 

function displaysValues ({ days, hours, minutes, seconds }) {
    timeRefs.days.textContent = days;
    timeRefs.hours.textContent = hours;
    timeRefs.minutes.textContent = minutes;
    timeRefs.seconds.textContent = seconds;
    console.log(`${days}:${hours}:${minutes}:${seconds}`)
}