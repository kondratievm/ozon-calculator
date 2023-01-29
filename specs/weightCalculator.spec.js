const {
  describe,
  test,
  beforeEach,
  afterEach,
  expect,
} = require("@jest/globals");
const { chromium } = require("playwright");

const { MainPage } = require("./framework");

jest.setTimeout(30000);

const CORRECT_VOLUMETRIC_WEIGHT = Math.round(Math.max(92.6 / 5, 12) * 10) / 10;
const CORRECT_TOTAL_WEIGHT = Math.round(((122 * 23 * 33) / 1000) * 10) / 10;

describe("Weight calculator capacity", () => {
  let browser;
  let mainPage;
  let page;

  beforeEach(async () => {
    browser = await chromium.launch({ headless: true });

    const context = await browser.newContext();
    page = await context.newPage();

    await page.goto("https://calculator.ozon.ru/");

    mainPage = new MainPage(page);
    await mainPage.clickDimesionsBtn();
    await mainPage.fillDimensionsInputs("122", "23", "33", "12");
  });

  afterEach(async () => {
    await browser.close();
  });

  test("check volumetric product weight", async () => {
    const volumetricWeight = await mainPage.getVolumetricWeght();

    expect(CORRECT_VOLUMETRIC_WEIGHT === volumetricWeight).toBe(true);
  });

  test("check total product weight", async () => {
    const totalWeight = await mainPage.getTotalWeight();

    expect(CORRECT_TOTAL_WEIGHT === totalWeight).toBe(true);
  });
});
