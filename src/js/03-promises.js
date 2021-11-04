import {Notify} from 'notiflix';

function createPromise(position, delay) {
  return new Promise ((resolve, reject)=>{
    setTimeout (() => {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    resolve({position, delay});// Fulfill
  } else {
    reject({position, delay});// Reject
  } }, delay);
})
}
const formRef = document.querySelector('.form');
const amountRef = document.querySelector('input[name="amount"]');
const stepRef = document.querySelector('input[name="step"]');
const delayRef = document.querySelector('input[name="delay"]');


formRef.addEventListener('submit',  onSubmitcreatePromises)

  function onSubmitcreatePromises (event) {
    event.preventDefault()
    let delay = Number(delayRef.value);
    const step = Number(stepRef.value);
    const amount = Number(amountRef.value);
    
    const promises = [];
    
  for (let i = 1; i <= amount; i+=1) {
  promises.push(createPromise(i, delay));
  delay += step;
  }
  console.log(promises)
  promises.forEach(promise => { promise.then(({ position, delay }) => {
    Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
     });
    })
  }
 