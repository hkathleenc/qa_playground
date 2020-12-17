import { By, until, WebDriver } from "selenium-webdriver";

export class SpecPage{
    driver: WebDriver;
    url: string = "https://ecosia.org";
    // Header Logo
    headerLogo: By = By.className("logo__icon");
    // searchBar
    searchBar: By = By.name("q");
    // Search results
    results: By = By.className("js-result-title");
    /**
     * @param {WebDriver} - the driver object that will interact with any page objects
     * @example 
     * const page = new SpecPage(driver);
     */
    constructor(driver: WebDriver) {
        this.driver = driver;
    }
    /**
     * @summary
     * Navigates to ecosia.org
     */
    async navigate() {
        await this.driver.get(this.url);
        await this.driver.wait(until.elementLocated(this.headerLogo));
        await this.driver.wait(until.elementIsVisible(
            await this.driver.findElement(this.headerLogo))
            );
    }
    /**
     * Executes a search from the search bar.
     * @param {string} - the term ecosia.org will search for
     */
    async doSearch(searchTerm: string) {
        await click(this.driver, this.searchBar);
        await this.driver.switchTo().activeElement().sendKeys(`${searchTerm}\n`);
        await this.driver.wait(until.elementLocated(this.results));
    }
    /**
     * Returns an array of strings. The elements in the array are search result titles. 
     */
    async getResults() {
        let titles = [];
        await this.driver.wait(until.elementsLocated(this.results));
        let elements = await this.driver.findElements(this.results);
        for(let i = 0; i < elements.length; i++) {
            titles.push(await(await elements[i].getText()).toLowerCase());
        }
        return titles;
    } 
/*
methods:
navigate()
doSearch(searchTerm: string)
getResults()
*/
}

// Send input from the keyboard to a field
const sendKeys = async function(driver: WebDriver, elementBy: By, keys) {
    await driver.wait(until.elementLocated(elementBy));
    return driver.findElement(elementBy).sendKeys(keys);
};

// Click an element
const click = async function(driver: WebDriver, elementBy:By) {
    await driver.wait(until.elementLocated(elementBy));
    return (await driver.findElement(elementBy)).click();
};