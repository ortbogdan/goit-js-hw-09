function createPromise(position, delay) {
  return new Promise ((resolve, reject)=>{
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    resolve(position, delay);// Fulfill
  } else {
    reject(position, delay);// Reject
  } })
}
const formRef = document.querySelector('.form');
const amountRef = document.querySelector('input[name="amount"]');
const stepRef = document.querySelector('input[name="step"]');
const delayRef = document.querySelector('input[name="delay"]');



console.dir(amountRef)
formRef.addEventListener('submit',  onSubmit)

// createPromise(2, 1500)
//   .then(({ position, delay }) => {
//     console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
//   })
//   .catch(({ position, delay }) => {
//     console.log(`❌ Rejected promise ${position} in ${delay}ms`);
//   });

  function onSubmit (event) {
    event.preventDefault()
    let delay = delayRef.value;
    const step = stepRef.value;
    const amount = amountRef.value;
    console.log(delay)
    console.log(step)
    console.log(amount)
  for (let i = 1; i <= amount; i+=1) {
  delay=+step;
  createPromise(i, delay)
  .then(() => {
    console.log(`✅ Fulfilled promise ${i} in ${delay}ms`);
  })
  .catch(() => {
    console.log(`❌ Rejected promise ${i} in ${delay}ms`);
  });
}
  }