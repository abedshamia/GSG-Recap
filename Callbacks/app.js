const getUsernameFromDatabase = (email, callback) => {
  const database = db.get('data');
  const user = database.find(user => user.email === email);
  const username = user ? user.username : null;
  if (!username) {
    callback(new Error('No user found'));
  }
  callback(null, username);
};

// Write code which would call the above function and:
//  if there is an error, it should console.log to the user "Sorry there was a problem"
//  if it finds a user it should console.log to the user "Marhaba {username}!"

const checkUser = (err, username) => {
  if (err) {
    console.log('Sorry there was a problem');
  } else {
    console.log(`Marhaba ${username}!`);
  }
};

const getUser = email => {
  getUsernameFromDatabase(email, checkUser);
};

const checkInserted = (err, result) => {
  if (err) {
    console.log('Sorry there was a problem');
  } else {
    console.log('User added');
    return true;
  }
};
const addUser = (data, cb) => {
  db_connection.query(
    'INSERT INTO users (name, email,password) VALUES ($1, $2, $3)',
    [name, email, password],
    error => {
      if (error) {
        cb(error);
      } else {
        return true;
      }
    }
  );
};

addUser(data, checkInserted);

function parallel(tasks, callback) {
  // write your code here
  let results = [];
  let count = 0;
  let error = null;
  tasks.forEach(task => {
    task(function (err, result) {
      if (err) {
        error = err;
      }
      results.push(result);
      count++;
      if (count === tasks.length) {
        callback(error, results);
      }
    });
  });
}

var timeStarted = Date.now();
parallel(
  [
    function (callback) {
      setTimeout(function () {
        callback(undefined, 1);
      }, 2000);
    },
    function (callback) {
      setTimeout(function () {
        callback(undefined, 2);
      }, 1000);
    },
    function (callback) {
      setTimeout(function () {
        callback(undefined, 3);
      }, 1500);
    },
    // function(callback) {
    //   setTimeout(function() {
    //     callback('boom',undefined);
    //   },1200);
    // }
  ],
  function (err, result) {
    var duration = Date.now() - timeStarted;
    console.log('duration:', duration); // 2000s
    if (err) {
      console.log('err', err); // undefined
    } else {
      console.log('result', result); // [1,2,3]
    }
  }
);
