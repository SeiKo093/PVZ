let tickCallbacks = {};
let id = 0;

function tickCoroutines() {
  Object.values(tickCallbacks).forEach(fn => {
    fn()
  });

}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function startCoroutine(coroutine) {
  const coroutineId = id++

  return new Promise((resolve, reject) => {

    function progress() {
      let ret = coroutine.next();
      if (ret.done) {
        resolve();
        delete tickCallbacks[coroutineId];
      } else {
        if (ret.value instanceof Promise) {
          delete tickCallbacks[coroutineId];
          ret.value.then(() => {
            progress();
          });
        } else {
          tickCallbacks[coroutineId] = progress;
        }
      }
    }

    progress();

  });
}