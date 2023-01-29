const { describe, test, expect, afterAll } = require("@jest/globals");
const { chromium } = require("playwright");

const { MainPage } = require("./framework");

jest.setTimeout(30000);

function correct_volume(length, width, height) {
  return Math.round(((length * width * height) / 1000) * 10) / 10;
}

function correct_total_weight(volume, weight) {
  return Math.round(Math.max(volume / 5, weight) * 10) / 10;
}

describe("Weight calculator capacity", () => {
  let browser;
  let mainPage;
  let page;

  beforeAll(async () => {
    browser = await chromium.launch({ headless: false });

    const context = await browser.newContext();
    page = await context.newPage();

    await page.goto("https://calculator.ozon.ru/");
  });

  afterAll(async () => {
    await browser.close();
  });

  test.each([
    ["122", "23", "33", "12"],
    ["1", "23", "3", "12"],
  ])(
    "check volumetric product weight and total weight",
    async (length, width, height, weight) => {
      mainPage = new MainPage(page);

      await mainPage.clickDimesionsBtn();
      await mainPage.fillDimensionsInputs(length, width, height, weight);

      const volumetricWeight = await mainPage.getVolumetricWeght();
      const expectedVolume = correct_volume(length, width, height);
      const totalWeight = await mainPage.getTotalWeight();
      const expectedWeight = correct_total_weight(expectedVolume, weight);

      expect(expectedVolume).toBe(totalWeight);
      expect(expectedWeight).toBe(volumetricWeight);
    }
  );
});
