class MainPage {
  constructor(page) {
    this.page = page;
  }

  async clickDimesionsBtn() {
    this.page.click('[href="#dimensions"]');
  }

  async fillDimensionsInputs(length, width, height, weight) {
    await this.page.fill("#input-181", length);
    await this.page.fill("#input-186", width);
    await this.page.fill("#input-191", height);
    await this.page.fill("#input-196", weight);
  }

  async getVolumetricWeght() {
    const volumetricValue = await this.page
      .locator('//*[@id="dimensions"]/div[3]/div')
      .innerText();

    const numValue = volumetricValue.replace(/^\D+/g, " ").slice(0, -3);

    return Number(numValue);
  }

  async getTotalWeight() {
    const totalWeight = await this.page
      .locator('//*[@id="dimensions"]/div[4]/div')
      .innerText();

    const numValue = totalWeight.replace(/^\D+/g, " ").slice(0, -2);

    return Number(numValue);
  }
}

module.exports = {
  MainPage,
};
