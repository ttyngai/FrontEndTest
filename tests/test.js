const { Builder, By, Key, until } = require('selenium-webdriver');

const loginAccount = 'timothy.ngai@primedatalytics.com';
const loginPassword = 'password';

const test = async () => {
  let driver = await new Builder().forBrowser('chrome').build();
  const waitOut = async (time) => {
    await driver.sleep(time);
  };

  await driver.get('http://localhost:3000/dashboard/');

  const login = async () => {
    await driver.findElement(By.id('navLogin')).click();
    await waitOut(100);
    await driver.findElement(By.id('form1Example1')).sendKeys(loginAccount);
    await waitOut(100);
    await driver.findElement(By.id('form1Example2')).sendKeys(loginPassword);
    await waitOut(100);
    await driver.findElement(By.id('signIn')).click();
    await waitOut(100);
  };

  const checkSettings = async () => {
    await driver.wait(until.elementLocated(By.id('settings')));
    await waitOut(1000);
    await driver.findElement(By.id('settings')).click();
    await waitOut(1000);
    await driver.findElement(By.id('settingSwitchLoadFPD')).click();
    await waitOut(500);
    await driver.findElement(By.id('settingSwitchLoadFPD')).click();
    await waitOut(500);
    await driver.findElement(By.id('settingSwitchDarkMode')).click();
    await waitOut(500);
    await driver.findElement(By.id('settingSwitchDarkMode')).click();
    await waitOut(500);
    await driver.findElement(By.id('settingsDone')).click();
    await waitOut(500);
  };

  const checkAppSuiteAudienceConstructor = async () => {
    await driver.findElement(By.id('appSuiteAudienceConstructor')).click();
    await waitOut(500);
  };

  await login();
  await checkSettings();
  await checkAppSuiteAudienceConstructor();

  //Final Exit
  await waitOut(10000);
  console.log('exit');
  driver.quit();
};

test();
