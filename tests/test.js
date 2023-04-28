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

  const exitMapView = async (doSave) => {
    await waitForId('mapViewClose', 500);
    await clickId('mapViewClose', 500);
    if (doSave) {
      await waitForId('closeMapViewWithSave', 100);
      await clickId('closeMapViewWithSave', 500);
    } else {
      await waitForId('closeMapViewWithoutSave', 100);
      await clickId('closeMapViewWithoutSave', 500);
    }
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
    const clickAudienceOption = async (
      titleId,
      topicId,
      numOfOptions = 1,
      exclude = false
    ) => {
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
      if (exclude) {
        await clickId('audienceConstructorExclude', 500);
        await wait(500);
      }
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
      await clickId('audienceConstructorSelectedRemovedem_1');
      await clickId('audienceConstructorSelectedRemovedem_4');
      await clickId('audienceConstructorGroupClearAll', 1000);
    };

    const checkRefreshEstimate = async () => {
      await waitForId('eachAudTitle2', 100);
      await clickAudienceOption('eachAudTitle2', 'eachTopic3', 6); //dem_4
      await clickId('audienceConstructorRefreshEstimate');
      let firstValue = '';
      await driver.wait(async function () {
        let element = await driver.findElement(By.id('refreshEstimateValue'));
        let value = await element.getText();
        firstValue = value;
        // console.log('value', parseInt(value));

        if (!isNaN(parseInt(value)) && parseInt(value) !== 0) {
          return true;
        }
        // return text === expectedText;
      }, 10000);
      await wait(1000);
      //Return to zero
      // await clickId('audienceConstructorSelectedRemovedem_4', 1000);
      // await clickId('audienceConstructorRefreshEstimate', 500);
      // await driver.wait(async function () {
      //   let element = await driver.findElement(By.id('refreshEstimateValue'));
      //   let value = await element.getText();

      //   // console.log('value', parseInt(value));

      //   if (isNaN(parseInt(value)) || !value || parseInt(value) === 0) {
      //     return true;
      //   }
      //   // return text === expectedText;
      // }, 10000);
      //Try another

      await clickAudienceOption('eachAudTitle2', 'eachTopic0', 6, 'exclude'); //dem_4
      await clickId('audienceConstructorGroupOr', 500);
      await clickId('audienceConstructorRefreshEstimate');

      await driver.wait(async function () {
        let element = await driver.findElement(By.id('refreshEstimateValue'));
        let value = await element.getText();

        // console.log('value', parseInt(value));

        if (
          !isNaN(parseInt(value)) &&
          parseInt(value) !== 0 &&
          value !== firstValue
        ) {
          return true;
        }
        // return text === expectedText;
      }, 10000);
    };
    //Activate Here
    await checkEachTitle();
    await checkSearchModes();
    await addingAndClearing();
    await checkRefreshEstimate();

    //Opens app
    await waitForId('audienceConstructorCreateNewAudienceButton');
    await clickId('audienceConstructorCreateNewAudienceButton', 1000);

    await driver.wait(async () => {
      await waitForId('audienceSizeMetric', 100);
      let element = await driver.findElement(By.id('audienceSizeMetric'));
      let value = await element.getText();
      if (!isNaN(parseInt(value)) && parseInt(value) !== 0) {
        return true;
      }
      // return text === expectedText;
    }, 30000);

    await exitMapView(false);
    //END OF Audience Constructor Script
  };

  const checkShoppingExpander = async () => {
    await waitForId('appSuiteShoppingExpander', 500);
    await clickId('appSuiteShoppingExpander', 500);
    await inputKeyId('shoppingExpanderSearchInput', 'cheese', 500);

    await clickId('groceryIdgroc_2', 500);
    // await clickId('groceryIdgroc_21', 500);
    let firstValue = '';
    await driver.wait(async () => {
      await waitForId('populationCaptureValue', 100);
      let element = await driver.findElement(By.id('populationCaptureValue'));
      let value = await element.getText();
      firstValue = value;
      if (parseInt(value) !== 0) {
        return true;
      }
      // return text === expectedText;
    }, 30000);
    await waitForId('groceryIdInfgroc_96', 500);
    await clickId('groceryIdInfgroc_96', 500);
    await driver.wait(async () => {
      await waitForId('populationCaptureValue', 100);
      let element = await driver.findElement(By.id('populationCaptureValue'));
      let value = await element.getText();

      if (parseInt(value) !== 0 && firstValue !== value) {
        return true;
      }
      // return text === expectedText;
    }, 30000);
    await wait(1000);
    await clickId('shoppingExpanderClearSelection', 500);
    await clickId('closeApplicationModalButton', 500);
  };

  //Activation
  await login(); //Logs in
  await checkSettings(); // Checks all settings
  await checkAppSuiteAudienceConstructor(); //Will check until map loads
  await checkShoppingExpander(); //Will check shopping expander

  //Final Exit
  await wait(120000);
  driver.quit();
};

test();
