export const regex = {
  isEmpty: val => {
    switch (val) {
      case '':
      case 0:
      case '0':
      case null:
      case false:
      case undefined:
      case typeof this === 'undefined':
      case ' ':
      case '  ':
      case '   ':
      case '    ':
      case '    ':
      case '     ':
        return true;
      default:
        return false;
    }
  },

  getHeight: val =>
  val?.toString().replace(/\./g,"'"),

  validateEmail: val =>
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      val,
    ),

  validatePhoneNumber: val =>
    /^\+[0-9]?()[0-9](\s|\S)(\d[0-9]{8,16})$/.test(val),

  validatePassword: val =>
    /^(?=.*[A-Za-z])(?=.*[0-9])[A-Za-z0-9!@#$%^&*_]\S{5,16}$/.test(val),

  validateUsername: val => /^[A-Za-z0-9_]{3,20}$/.test(val),

  matchPassword: (val1, val2) => {
    if (val1 !== val2) {
      return false;
    }
    return true;
  },

  sortData: property => {
    let sortOrder = 1;
    if (property[0] === '-') {
      sortOrder = -1;
      property = property.substr(1);
    }
    return function (a, b) {
      const result =
        a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
      return result * sortOrder;
    };
  },

  isInt: n => Number(n) === n && n % 1 === 0,

  isFloat: n => Number(n) === n && n % 1 !== 0,

};