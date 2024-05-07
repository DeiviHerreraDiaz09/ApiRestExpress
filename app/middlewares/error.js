
function BoomlogErrorsTwo(error, req, res, next) {
  if (error.isBoom) {
    const { output } = error;
    res.status(output.statusCode).json(output.payload);
  } else {
    next(error);
  }
}

// // GENERAL ERROR MIDDLEWARE

// function logErrors(error, req, res, next) {
//   console.log('Test 1');
//   console.log(error);
//   next(error);
// }

// // ERROR MIDDLEWARE WITH ERROR FORMATTING

// function logErrorsTwo(error, req, res, next) {
//   console.log('Test 2');
//   res.status(500).json({
//     msg: error.message,
//     stack: error.stack,
//   });
// }

module.exports = { BoomlogErrorsTwo };
