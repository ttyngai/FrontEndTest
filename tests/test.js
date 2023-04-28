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
    const checkEachTitle = async () => {
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
    };

    const checkSearchModes = async () => {
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
      await clickId('audienceConstructorKeywordButton', 500);
      await backSpaceKeyId('audienceConstructorMenuInput', 500);
    };

    //Functions for AudienceConstructor Options
    const clickAudienceOption = async (titleId, topicId, numOfOptions = 1) => {
      await clickId(titleId, 500);
      await clickId(topicId, 500);
      await clickId('audienceConstructorGroupBox', 500); //Put into group box
      //Select in checkbox
      await waitForId('audienceConstructorOptionContainer', 100);
      // Clicks select All
      await clickId('audienceConstructorOptionSelectAll', 100);
      await clickId('audienceConstructorOptionSelectAll', 100);
      //Clicks a few
      for (let i = 0; i < numOfOptions; i++) {
        await clickId(`audienceConstructorOption${i}`, 25);
      }
      await wait(500);
      await clickId('audienceConstructorOptionDone', 100);
      await clickId(titleId, 500);
    };
    //Demo adding and clearing
    const addingAndClearing = async () => {
      await clickAudienceOption('eachAudTitle2', 'eachTopic0', 6); //dem_1
      await clickAudienceOption('eachAudTitle2', 'eachTopic3', 6); //dem_4
      await clickAudienceOption('eachAudTitle2', 'eachTopic4', 2);
      await clickAudienceOption('eachAudTitle1', 'eachTopic3', 8);
      await clickAudienceOption('eachAudTitle1', 'eachTopic4', 2);
      await clickId('audienceConstructorSelecteddem_1');
      await clickId('audienceConstructorSelecteddem_4');
      await clickId('audienceConstructorGroupClearAll', 1000);
    };

    await checkEachTitle();
    await checkSearchModes();
    await addingAndClearing(); //Activate Here
    //Demo refresh estimates
    await clickAudienceOption('eachAudTitle2', 'eachTopic0', 6); //dem_1
    await clickId('audienceConstructorRefreshEstimate', 2000);
    await driver.wait(async function () {
      let element = await driver.findElement(By.id('refreshEstimateValue'));
      let value = await element.getText();

      // console.log('value', parseInt(value));

      if (!isNaN(parseInt(value))) {
        return true;
      }
      // return text === expectedText;
    }, 10000);

    //END OF Audience Constructor Script
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
