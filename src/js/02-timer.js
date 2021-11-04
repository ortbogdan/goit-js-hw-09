// Описан в документации
import flatpickr from 'flatpickr';
import {Notify} from 'notiflix';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';

const startBtnRef = document.querySelector('button[data-start]');

const timeRefs = {
 days: document.querySelector('span[data-days]'),
 hours: document.querySelector('span[data-hours]'),
 minutes:document.querySelector('span[data-minutes]'),
 seconds:document.querySelector('span[data-seconds]')}

let selectedTime = null;
let isActive = false;

startBtnRef.setAttribute('disabled', true);

flatpickr('#datetime-picker', {
        enableTime: true,
        time_24hr: true,
        defaultDate: new Date(),
        minuteIncrement: 1,
        onClose(selectedDates) {
            selectedTime = selectedDates[0].getTime();
            if (selectedTime <= Date.now()) { 
                Notify.failure("Please choose a date in the future");
                return;
            }
            startBtnRef.removeAttribute('disabled');
            const timer = convertMs(selectedTime-Date.now());
            displaysValues(timer);
        }
        }, 
)
startBtnRef.addEventListener('click', onTargetStartTimer);

function onTargetStartTimer (event) {
    if (isActive === true) { 
        return;
    }
    isActive = true;
    const intervalId = setInterval(() => { 
        if (selectedTime <= Date.now()) { // не може бути строго рівно бо э погрішність в 4 мілісекунди!!!
            clearInterval(intervalId)
            startBtnRef.setAttribute('disabled', true);
            return
        }
        const time = convertMs(selectedTime-Date.now());
        displaysValues(time);    
    }, 1000);
}
function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
    return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}

function displaysValues ({ days, hours, minutes, seconds }) {
    timeRefs.days.textContent = addLeadingZero(days);
    timeRefs.hours.textContent = addLeadingZero(hours);
    timeRefs.minutes.textContent = addLeadingZero(minutes);
    timeRefs.seconds.textContent = addLeadingZero(seconds);
}

