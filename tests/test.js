const { Builder, By, Key, until } = require('selenium-webdriver');

const loginAccount = 'timothy.ngai@primedatalytics.com';
const loginPassword = 'password';

const login = async () => {
  let driver = await new Builder().forBrowser('chrome').build();

  await driver.get('http://localhost:3000/dashboard/');

  await driver.findElement(By.id('navLogin')).click();

  await driver.findElement(By.id('form1Example1')).sendKeys(loginAccount);

  await driver.findElement(By.id('form1Example2')).sendKeys(loginPassword);

  await driver.findElement(By.id('signIn')).click();
};

login();
