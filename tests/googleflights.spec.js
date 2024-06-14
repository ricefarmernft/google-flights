// @ts-check
// npx playwright test
// npx playwright test --ui
// npx playwright codegen
const { test, expect } = require("@playwright/test");

const fromLocation = "Chicago";
const toLocation = "Bangkok";
const date = "Wednesday, July 24, 2024";

test("confirm fromLocation", async ({ page }) => {
  await page.goto("https://www.google.com/travel/flights?gl=US&hl=en-US");

  const fromInput = page.getByLabel("Where from?");
  await fromInput.click();
  await fromInput.fill(fromLocation);

  const locator = page.getByText(fromLocation, { exact: true });

  await expect(locator).toContainText(fromLocation);
  await page.screenshot({ path: "fromLocation.png" });
});

test("confirm toLocation", async ({ page }) => {
  await page.goto("https://www.google.com/travel/flights?gl=US&hl=en-US");

  const toInput = page.getByPlaceholder("Where to?");
  await toInput.click(); // Ensure the input is focused
  await toInput.fill(toLocation);

  const locator = page.getByText(toLocation, { exact: false });

  await expect(locator).toContainText(toLocation);
  await page.screenshot({ path: "toLocation.png" });
});

test("perform task", async ({ page }) => {
  await page.goto("https://www.google.com/travel/flights?gl=US&hl=en-US");
  await page.getByLabel("Where from?").click();
  await page.getByRole("combobox", { name: "Where else?" }).fill(fromLocation);
  await page.getByRole("combobox", { name: "Where else?" }).press("Enter");
  await page.getByPlaceholder("Where to?").click();
  await page.getByRole("combobox", { name: "Where to?" }).fill(toLocation);
  await page.getByRole("combobox", { name: "Where to?" }).press("Enter");
  await page
    .getByRole("combobox", { name: "Change ticket type. ​Round" })
    .locator("div")
    .click();
  await page.getByRole("option", { name: "One way" }).click();
  await page.getByRole("textbox", { name: "Departure" }).click();
  await page.getByRole("button", { name: date }).click();
  await page.getByLabel("Done. Search for one-way").click();
  await page.getByLabel("Search", { exact: true }).click();
  await page.waitForTimeout(5000);

  await page.screenshot({ path: "flightInformation.png" });
});
