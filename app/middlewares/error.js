
function BoomlogErrorsTwo(error, req, res, next) {
  if (error.isBoom) {
    const { output } = error;
    res.status(output.statusCode).json(output.payload);
  } else {
    next(error);
  }
}

// // MIDDLEWARE DE ERROR GENERAL

// function logErrors(error, req, res, next) {
//   console.log('PRUEBA 1');
//   console.log(error);
//   next(error);
// }

// // MIDDLEWARE DE ERRORES CON FORMATO DE ERROR

// function logErrorsTwo(error, req, res, next) {
//   console.log('PRUEBA 2');
//   res.status(500).json({
//     msg: error.message,
//     stack: error.stack,
//   });
// }
module.exports = { BoomlogErrorsTwo };
