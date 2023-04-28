const { Builder, By, Key, until } = require('selenium-webdriver');

const loginAccount = 'timothy.ngai@primedatalytics.com';
const loginPassword = 'password';

const test = async () => {
  let driver = await new Builder().forBrowser('chrome').build();
  //Reusables
  const wait = async (time) => {
    await driver.sleep(time);
  };

  const defaultWaitTime = 100;

  const clickId = async (id, endWaitTime = defaultWaitTime) => {
    await driver.findElement(By.id(id)).click();
    await wait(endWaitTime);
  };
  const inputKeyId = async (id, input, endWaitTime = defaultWaitTime) => {
    await driver.findElement(By.id(id)).sendKeys(input);
    await wait(endWaitTime);
  };
  const clearKeyId = async (id, endWaitTime = defaultWaitTime) => {
    await driver.findElement(By.id(id)).clear();
    await wait(endWaitTime);
  };
  const backSpaceKeyId = async (
    id,
    endWaitTime = defaultWaitTime,
    keySpeed = 100
  ) => {
    let attribute = await driver.findElement(By.id(id)).getAttribute('value');
    for (let i = 0; i < attribute.length; i++) {
      await driver.findElement(By.id(id)).sendKeys(Key.BACK_SPACE);
      await wait(keySpeed);
    }
    await wait(endWaitTime);
  };
  const waitForId = async (id, endWaitTime = defaultWaitTime) => {
    await driver.wait(until.elementLocated(By.id(id)));
    await wait(endWaitTime);
  };

  //Starter
  await driver.get('http://localhost:3000/dashboard/');
  await wait(500);

  //Sequences
  const login = async () => {
    await clickId('navLogin');
    await inputKeyId('form1Example1', loginAccount);
    await inputKeyId('form1Example2', loginPassword);
    await clickId('signIn');
  };

  const checkSettings = async () => {
    await waitForId('settings', 500);
    await clickId('settings', 1000);
    await clickId('settingSwitchLoadFPD', 500);
    await clickId('settingSwitchLoadFPD', 500);
    await clickId('settingSwitchDarkMode', 500);
    await clickId('settingSwitchDarkMode', 500);
    await clickId('settingsDone', 500);
  };

  const checkAppSuiteAudienceConstructor = async () => {
    await waitForId('appSuiteAudienceConstructor', 500);
    await clickId('appSuiteAudienceConstructor', 500);

    //menu mode
    await waitForId('constructorMenuContainer');
    //Check menu
    let parentElement = await driver.findElement(
      By.id('constructorMenuContainer')
    );
    let childElements = await parentElement.findElements(By.tagName('div'));

    if (childElements.length > 0) {
      childElements.forEach(async (each, idx) => {
        await waitForId(`constructorMenu${idx}`, 50 * idx);
        await clickId(`constructorMenu${idx}`);
      });
    }
    await wait(childElements.length * 50);

    await waitForId('audienceConstructorKeywordButton');
    // await wait(500);
    await inputKeyId('audienceConstructorMenuInput', 'car', 500);
    await backSpaceKeyId('audienceConstructorMenuInput', 500);
    await inputKeyId('audienceConstructorMenuInput', 'bank', 500);
    await backSpaceKeyId('audienceConstructorMenuInput', 500);
    await inputKeyId('audienceConstructorMenuInput', 'coffee', 500);
    await backSpaceKeyId('audienceConstructorMenuInput', 500);

    //Thought Expander
    await waitForId('audienceConstructorThoughtExpanderButton', 500);
    await clickId('audienceConstructorThoughtExpanderButton', 500);
    await inputKeyId('audienceConstructorMenuInput', 'car', 1000);
    await clickId('audienceConstructorSearchButton', 1500);

    //Get Demographics Age
    await clickId('audienceConstructorKeywordButton', 500);
    await backSpaceKeyId('audienceConstructorMenuInput', 500);
    await clickId('eachAudTitle2', 500);
    await clickId('eachTopic0', 500);
    await clickId('audienceConstructorGroupBox', 500); //Put into group box

    //Select in checkbox
    await waitForId('audienceConstructorOptionContainer', 100);
    // Clicks select All
    await clickId('audienceConstructorOptionSelectAll', 500);
    await clickId('audienceConstructorOptionSelectAll', 500);

    //Clicks a few
    for (let i = 0; i < 6; i++) {
      await clickId(`audienceConstructorOption${i}`, 100);
    }
    await wait(500);

    await clickId('audienceConstructorOptionDone', 100);
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
