var ontime = require('ontime')

// index 2 is the first argument after "node" and name of this script
var timeToRun = process.argv[2];
console.log('waiting for time: ', timeToRun);

if (timeToRun){
  ontime({
      //cycle: ['22:57:00' ]
      cycle: [timeToRun]
  }, function (ot) {
      // do your job here
      makeReservation();
      ot.done()
      return
  })
} else {
  makeReservation();
}


function makeReservation(){
  var webdriver = require('selenium-webdriver'),
      By = webdriver.By,
      until = webdriver.until,
      map = webdriver.promise.map;

  var driver = new webdriver.Builder()
      .forBrowser('chrome')
      .build();

  driver.get('https://www.exploretock.com/lazybearsf/experience/493/lazy-bear-dinner?date=2018-02-21&size=2&time=19%3A00');
  var elem = driver.findElement(By.className('Consumer-resultsListItem'));
  elem.click();

  console.log("time selected");

  var confTitle = driver.wait(until.elementLocated(By.className('ConfirmationModal-button')),10000);
  driver.wait(until.elementIsVisible(confTitle),10000).findElement(By.className('Button-content')).click();
  console.log('continue button clicked');
}


//driver.quit();