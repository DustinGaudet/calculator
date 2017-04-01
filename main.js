// when processing the input string, this will determine the operations to use.
function operate(a, b, op){
  var ops = {
    '+': function(a, b){
      return a + b;
    },
    '-': function(a, b){
      return a - b;
    },
    'x': function(a, b){
      return a * b;
    },
    '/': function(a, b){
      return a / b;
    }
  }
  return Math.round(ops[op](a, b)*10000000000000)/10000000000000;
}

// called on button click, pass in current calc string and e.target.value
function updateCalc(calc, input){

  if (/[\+\-\x\/]/.test(input)) {
    
    return calc + ' ' + input + ' ';

  } else if (calc === '0' && input !== 'ac') {
    
    return input;

  } else if (/[0-9]/.test(input)) {

    return calc + input;

  } else if (input === 'ac') {

    return '0';

  }
}



function runTests(){
  // Each object in testSets defines a set of test cases for the specified function.
  // A case includes one array of arguments for the function, the expected return value,
  // and an error message in case of failure.
  // Probably more test cases than needed?
  var testSets = [
    {
      func: operate,
      cases: [
        [[5, 5, '+'], 10, 'operate() failed for int "+" int'],
        [[5, 0.1, '+'], 5.1, 'operate() failed for int "+" float'],
        [[5, 0.01, '+'], 5.01, 'operate() failed for int "+" float (2 decimal places)'],
        [[5, 5, '-'], 0, 'operate() failed for int "-" int'],
        [[5, 0.1, '-'], 4.9, 'operate() failed for int "-" float'],
        [[5, 0.01, '-'], 4.99, 'operate() failed for int "-" float (2 decimal places)'],
        [[5, 5, 'x'], 25, 'operate() failed for int "x" int'],
        [[5, 0.1, 'x'], 0.5, 'operate() failed for int "x" float'],
        [[5, 0.01, 'x'], 0.05, 'operate() failed for int "x" float (2 decimal places)'],
        [[5.01, 0.03, 'x'], 0.1503, 'operate() failed for float "x" float (2 decimal places)'],
        [[10, (1/3), 'x'], (Math.round(10/3*10000000000000)/10000000000000), 'operate() failed for float "x" float (2 decimal places)'],
        [[5, 5, '/'], 1, 'operate() failed for int "/" int'],
        [[5, 0.1, '/'], 50, 'operate() failed for int "/" float'],
        [[5, 0.01, '/'], 500, 'operate() failed for int "/" float (2 decimal places)'],
      ],
    },
    {
      func: updateCalc,
      cases: [
        [['2 + 2', '+'], '2 + 2 + ', 'updateCalc() failed for "+" input'],
        [['2 + 2', '-'], '2 + 2 - ', 'updateCalc() failed for "-" input'],
        [['2 + 2', 'x'], '2 + 2 x ', 'updateCalc() failed for "x" input'],
        [['2 + 2', '/'], '2 + 2 / ', 'updateCalc() failed for "/" input'],
        [['2 + 2', '0'], '2 + 20', 'updateCalc() failed for "0" input'],
        [['2 + 2', '1'], '2 + 21', 'updateCalc() failed for "1" input'],
        [['2 + 2', '2'], '2 + 22', 'updateCalc() failed for "2" input'],
        [['2 + 2', '3'], '2 + 23', 'updateCalc() failed for "3" input'],
        [['2 + 2', '4'], '2 + 24', 'updateCalc() failed for "4" input'],
        [['2 + 2', '5'], '2 + 25', 'updateCalc() failed for "5" input'],
        [['2 + 2', '6'], '2 + 26', 'updateCalc() failed for "6" input'],
        [['2 + 2', '7'], '2 + 27', 'updateCalc() failed for "7" input'],
        [['2 + 2', '8'], '2 + 28', 'updateCalc() failed for "8" input'],
        [['2 + 2', '9'], '2 + 29', 'updateCalc() failed for "9" input'],
        [['2 + 2', 'ac'], '0', 'updateCalc() failed for "ac" input'],
        [['2 + 2 + ', 'ac'], '0', 'updateCalc() failed for "ac" input'],
        [['0', '0'], '0', 'updateCalc() failed for "0" input'],
        [['0', '1'], '1', 'updateCalc() failed for "1" input'],
        [['0', '2'], '2', 'updateCalc() failed for "2" input'],
        [['0', '3'], '3', 'updateCalc() failed for "3" input'],
        [['0', '4'], '4', 'updateCalc() failed for "4" input'],
        [['0', '5'], '5', 'updateCalc() failed for "5" input'],
        [['0', '6'], '6', 'updateCalc() failed for "6" input'],
        [['0', '7'], '7', 'updateCalc() failed for "7" input'],
        [['0', '8'], '8', 'updateCalc() failed for "8" input'],
        [['0', '9'], '9', 'updateCalc() failed for "9" input'],
        [['0', 'ac'], '0', 'updateCalc() failed for "ac" input'],
      ]
    },
  ];

  // This takes a testSets object and calls the object's function for
  // each case in the cases arr. Returns an arr of all errs the func encountered.
  function test(testSet){
    var testSetErrs = testSet.cases.reduce(function(errs, testCase){
      var testResult = testSet.func(...testCase[0]);
      var expected = testCase[1];
      var msg = testCase[2];

      if ( testResult !== expected) errs.push(msg + ' - Expected ' + expected + ' got ' + testResult);
      return errs;
    }, []);

    if (testSetErrs !== undefined) return testSetErrs;
  }

  // Run through all the testSets and push any errors to console.error()
  testSets.map(function(testSet){
    var errs = test(testSet);
    if (errs.length > 0) {
      console.error('Errors: ', errs);
    }
  });

  return 'Tests complete.';
}

runTests();