 function getState() {
   return new Promise(function (resolve, reject) {
     setTimeout(function () {
       resolve('Done');
     }, 2000);
   });
 }

 getState().then(function (value) {
   console.log(value);
 });
