const CustomPage = require("./helpers/Page");

let page;

beforeEach(async () => {
  page = await CustomPage.build();
  await page.goto("http://localhost:3000/");
  await page.setViewport({ width: 1080, height: 1024 });
});

afterEach(async () => {
  await page.close();
});

test("Adds two numbers", () => {
  const sum = 1 + 2;

  expect(sum).toEqual(3);
});

test("The header has the correct text", async () => {
  const logoText = await page.getContentsOf("a.brand-logo");
  expect(logoText).toEqual("Blogster");
});

test("Clicking login starts oauth flow", async () => {
  const loginButtonSelector = ".right";
  await page.waitForSelector(loginButtonSelector);
  await page.click(loginButtonSelector);
  const url = await page.url();

  expect(url).toMatch("accounts.google.com");
});

test("When signed in, shows logout button", async () => {
  // calling Custom Page Proxy Login method
  await page.login();

  const text = await page.$eval('a[href="/auth/logout"]', (el) => el.innerHTML);

  expect(text).toEqual("Logout");
});
