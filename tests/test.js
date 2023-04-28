const { Builder, By, Key, until } = require('selenium-webdriver');

const loginAccount = 'timothy.ngai@primedatalytics.com';
const loginPassword = 'password';

const test = async () => {
  let driver = await new Builder().forBrowser('chrome').build();
  const wait = async (time) => {
    await driver.sleep(time);
  };

  await driver.get('http://localhost:3000/dashboard/');

  const login = async () => {
    await driver.findElement(By.id('navLogin')).click();
    await wait(100);
    await driver.findElement(By.id('form1Example1')).sendKeys(loginAccount);
    await wait(100);
    await driver.findElement(By.id('form1Example2')).sendKeys(loginPassword);
    await wait(100);
    await driver.findElement(By.id('signIn')).click();
    await wait(100);
  };

  const checkSettings = async () => {
    await driver.wait(until.elementLocated(By.id('settings')));
    await wait(500);
    await driver.findElement(By.id('settings')).click();
    await wait(1000);
    await driver.findElement(By.id('settingSwitchLoadFPD')).click();
    await wait(500);
    await driver.findElement(By.id('settingSwitchLoadFPD')).click();
    await wait(500);
    await driver.findElement(By.id('settingSwitchDarkMode')).click();
    await wait(500);
    await driver.findElement(By.id('settingSwitchDarkMode')).click();
    await wait(500);
    await driver.findElement(By.id('settingsDone')).click();
    await wait(500);
  };

  const checkAppSuiteAudienceConstructor = async () => {
    await driver.wait(until.elementLocated(By.id('settings')));
    await wait(500);
    await driver.findElement(By.id('appSuiteAudienceConstructor')).click();
    await wait(500);
    //menu mode
    await driver.wait(until.elementLocated(By.id('constructorMenuContainer')));
    //Check menu
    let parentElement = await driver.findElement(
      By.id('constructorMenuContainer')
    );
    let childElements = await parentElement.findElements(By.tagName('div'));

    if (childElements.length > 0) {
      childElements.forEach(async (each, idx) => {
        await driver.wait(until.elementLocated(By.id(`constructorMenu${idx}`)));
        await wait(100 * idx);
        await driver.findElement(By.id(`constructorMenu${idx}`)).click();
        // await wait(100 * idx);
      });
    }
    await wait(childElements.length * 100);
    await driver.wait(
      until.elementLocated(By.id('audienceConstructorKeywordButton'))
    );
    await wait(500);
    await driver
      .findElement(By.id('audienceConstructorMenuInput'))
      .sendKeys('c');
    await wait(500);
    await driver
      .findElement(By.id('audienceConstructorMenuInput'))
      .sendKeys('a');
    await wait(500);
    await driver
      .findElement(By.id('audienceConstructorMenuInput'))
      .sendKeys('r');
    await wait(500);
  };

  await login();
  // await checkSettings();
  await checkAppSuiteAudienceConstructor();

  //Final Exit
  await wait(1000);
  console.log('exit');
  // driver.quit();
};

test();
