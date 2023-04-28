const { Builder, By, Key, until } = require('selenium-webdriver');

const loginAccount = 'timothy.ngai@primedatalytics.com';
const loginPassword = 'password';

const test = async () => {
  let driver = await new Builder().forBrowser('chrome').build();
  const wait = async (time) => {
    await driver.sleep(time);
  };

  await driver.get('http://localhost:3000/dashboard/');
  await wait(500);
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
      });
    }

    await wait(childElements.length * 100);
    await driver.wait(
      until.elementLocated(By.id('audienceConstructorKeywordButton'))
    );
    // await wait(500);
    await driver
      .findElement(By.id('audienceConstructorMenuInput'))
      .sendKeys('car');
    await wait(500);
    await driver.findElement(By.id('audienceConstructorMenuInput')).clear();
    await driver
      .findElement(By.id('audienceConstructorMenuInput'))
      .sendKeys('vehicle');
    await wait(500);
    await driver.findElement(By.id('audienceConstructorMenuInput')).clear();
    await driver
      .findElement(By.id('audienceConstructorMenuInput'))
      .sendKeys('bank');
    await wait(500);
    await driver.findElement(By.id('audienceConstructorMenuInput')).clear();
    await wait(500);
    //Thought Expander
    await driver.wait(
      until.elementLocated(By.id('audienceConstructorThoughtExpanderButton'))
    );
    await wait(500);
    await driver
      .findElement(By.id(`audienceConstructorThoughtExpanderButton`))
      .click();
    for (let i = 0; i < 5; i++) {
      await driver
        .findElement(By.id('audienceConstructorMenuInput'))
        .sendKeys(Key.BACK_SPACE);
    }
    await wait(500);
    await driver
      .findElement(By.id('audienceConstructorMenuInput'))
      .sendKeys('car');
    await driver.findElement(By.id(`audienceConstructorSearchButton`)).click();
    await wait(500);
    //Get Demographics Age
    await driver.findElement(By.id(`audienceConstructorKeywordButton`)).click();
    await wait(500);
    for (let i = 0; i < 5; i++) {
      await driver
        .findElement(By.id('audienceConstructorMenuInput'))
        .sendKeys(Key.BACK_SPACE);
    }
    await wait(500);

    await driver.findElement(By.id(`eachAudTitle2`)).click();
    await wait(500);

    await driver.findElement(By.id(`eachTopic0`)).click();
  };

  //Activation
  await login();
  // await checkSettings();
  await checkAppSuiteAudienceConstructor();

  //Final Exit
  await wait(1000);
  console.log('exit');
  // driver.quit();
};

test();
