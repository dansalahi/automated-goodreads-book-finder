import { test, expect } from '@playwright/test';


function sleep(ms:number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

test('open the goodreads choixe awards best books', async ({ page }) => {
  await page.goto('https://www.goodreads.com/choiceawards/best-books-2020');
  // open the one of the categories

  await page.getByRole('link', { name: 'Science & Technology A Life on Our Planet: My Witness Statement and a Vision for the Future' }).click();
  await expect(page).toHaveURL('https://www.goodreads.com/choiceawards/best-science-technology-books-2020');



  // close the modal
  await page.getByRole('button', { name: 'Dismiss' }).click();


  // choose one of the books

  await page.locator('#bookCover_53916142').click();
  await expect(page).toHaveURL('https://www.goodreads.com/book/show/53916142-a-life-on-our-planet?from_choice=true');



  // select amazon
  const [page1] = await Promise.all([
    page.waitForEvent('popup'),
    page.getByRole('link', { name: 'Amazon' }).click()
  ]);




  // add the book to the amazon cart
  await page1.getByRole('button', { name: 'Add to Cart' }).click();
  await expect(page1).toHaveURL('https://www.amazon.com/cart/smart-wagon?newItems=a6cac007-b024-4095-85d2-d7f3e0477c03,1');


  // procced to check out 
  await page1.getByRole('button', { name: 'Proceed to checkout' }).click();
  await expect(page1).toHaveURL('https://www.amazon.com/ap/signin?_encoding=UTF8&openid.assoc_handle=amazon_checkout_us&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.mode=checkid_setup&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0&openid.ns.pape=http%3A%2F%2Fspecs.openid.net%2Fextensions%2Fpape%2F1.0&openid.pape.max_auth_age=0&openid.return_to=https%3A%2F%2Fwww.amazon.com%2Fgp%2Fbuy%2Fsignin%2Fhandlers%2Fcontinue.html%3Fie%3DUTF8%26brandId%3D%26cartItemIds%3D%26eGCApp%3D%26hasWorkingJavascript%3D0%26isEGCOrder%3D0%26isFresh%3D%26oldCustomerId%3D0%26oldPurchaseId%3D%26preInitiateCustomerId%3D%26purchaseInProgress%3D%26ref_%3Dcart_signin_submit%26siteDesign%3D&pageId=amazon_checkout_us&showRmrMe=0&siteState=isRegularCheckout.1%7CIMBMsgs.%7CisRedirect.1&suppressSignInRadioButtons=0');
});