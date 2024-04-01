import {test ,expect,Locator} from '@playwright/test'
import { emailcheck, filldetails } from '../Helper/signup.helper';
require('dotenv').config();
const username = process.env.USERNAMES;
const password1 = process.env.PASSWORD;
test('TSUN002',async({page})=>{
    
    await page.goto('https://devfn.vercel.app/signup');
    await page.route('**/*', route => route.abort());
   
    await filldetails(page);
    const next= page.getByRole('button',{name:'Next →'})
    await next.click()
    // Wait for the "seems offline" toast error
    const toastElement = await page.locator('[id="1"]'); 
    const errorMessage = await toastElement.textContent();
    // Verify that the "seems offline" toast error is displayed
    expect(errorMessage).toContain("Seems your're offline")
})
test('TSUN009',async ({page})=>{
    page.goto('https://devfn.vercel.app/signup')
  const name= page.locator('[id="name"]')
  const email= page.locator('[id="username"]')
  await email.fill("test@test.com");
  const enteredEmail = await email.inputValue();
  const next= page.getByRole('button',{name:'Next →'})
   await next.click()
  // Define a regular expression pattern to match against an email address
  await emailcheck(page,enteredEmail)
})
