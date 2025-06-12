import { test } from "@playwright/test";

for (let i = 0; i < 100; i++)
  test(`Sometime has timeout errors on API request or opening cart page ${i}`, async ({
    page,
  }) => {
    await page.request.patch(
      "https://api-gateway.spoonflower.com/alpenrose/user/me/preferences"
    );

    const cartLink = "https://cart.spoonflower.com";
    await page.request.get(cartLink + "/api/spoonflower/who-am-i", {});
    await page.request.post(cartLink + "/api/spoonflower/add-to-cart", {
      data: {
        fabric: "WALLPAPER_PEEL_AND_STICK",
        fabric_size: "WALLPAPER_IMPERIAL_ROLL_2_x_3",
        design_id: 15622273,
        quantity: 1,
      },
    });

    await page.goto(`${cartLink}`, {
      timeout: 50000,
      waitUntil: "domcontentloaded",
    });
    await page.getByText("Accept All").click();
  });
