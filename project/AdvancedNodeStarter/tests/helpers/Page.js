const puppeteer = require("puppeteer");
const userFactory = require("../factories/userFactory");
const sessionFactory = require("../factories/sessionFactory");

class CustomPage {
  static async build() {
    const browser = await puppeteer.launch({
      // headless: false,
      /**
       * Final config options below
       */
      headless: true,
      args: ["--no-sandbox"],
    });

    const page = await browser.newPage(); // create a new tab
    const customePage = new CustomPage(page, browser); // create own instance

    /**
     * Proxy:
     *
     * Combining access to multiple Classes
     *
     */
    return new Proxy(customePage, {
      get(target, property) {
        return customePage[property] || page[property] || browser[property];
      },
    });
  }

  constructor(page, browser) {
    this.page = page;
    this.browser = browser;
  }

  close() {
    this.browser.close();
  }

  async login() {
    const user = await userFactory();
    const { session, sig } = sessionFactory(user);

    await this.page.setCookie({ name: "session", value: session });
    await this.page.setCookie({ name: "session.sig", value: sig });
    // reload
    await this.page.goto("http://localhost:3000/blogs");

    await this.page.waitForSelector('a[href="/auth/logout"]');
  }

  async getContentsOf(selector) {
    return this.page.$eval(selector, (el) => el.innerHTML);
  }

  get(path) {
    return this.page.evaluate((_path) => {
      return fetch(_path, {
        method: "GET",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());
    }, path);
  }

  post(path, data) {
    return this.page.evaluate(
      (_path, _data) => {
        return fetch(_path, {
          method: "POST",
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(_data),
        }).then((res) => res.json());
      },
      path,
      data
    );
  }

  execRequests(actions) {
    return Promise.all(
      actions.map(({ method, path, data }) => {
        return this[method](path, data);
      })
    );
  }
}

module.exports = CustomPage;