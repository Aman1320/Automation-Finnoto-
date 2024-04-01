import {test,expect, Locator, Page} from '@playwright/test';
import { error } from 'console';
require('dotenv').config();
const username = process.env.USERNAMES;
const password1 = process.env.PASSWORD;
import { attemptSignIn } from '/home/aman/pw-finnoto/Helper/signup.helper'

test('Maximum attempt',async({page}) =>{
    await page.goto('https://devfn.vercel.app/login');
    const email=  page.locator('[id="username"]')
    if(username)
    {
        await email.fill(username)

    }
    else
    {
        throw Error("username not found");
    }
    const next= page.getByRole('button',{name:'Next →'})
    await next.click()

    await expect(page).toHaveURL('https://devfn.vercel.app/login?email=testuser500%40finnoto.com&referrer=')
    const password: Locator=  page.getByPlaceholder("password")
    await attemptSignIn(page, password);
   
   const error=page.getByText("Account locked for too many invalid attempts. Please try after 5 minutes")
await expect(error).toBeVisible();
    await expect(page).toHaveURL('https://devfn.vercel.app/login?email=testuser500%40finnoto.com&referrer=')
   
   //await expect(submit).toBeDisabled();
});


test("Offline",async({page})=>{

    // Navigate to the sign-in page
    await page.goto('https://devfn.vercel.app/login');
    
    const email= await page.locator('[id="username"]')
    if(username)
    {
        await email.fill("aman@gmail.com")

    }
    else
    {
        throw Error("username not found");
    }
    await page.route('**/*', route => route.abort());
    const next= page.getByRole('button',{name:'Next →'})
    await next.click()
    const password: Locator=  page.getByPlaceholder("password")

        await password.fill("1234567")
         const submit = page.getByRole('button',{name:'Submit'})
        await submit.click()
    // Wait for the "seems offline" toast error
    const toastElement = await page.waitForSelector('.warning-toast'); 
    const errorMessage = await toastElement.textContent();
    // Verify that the "seems offline" toast error is displayed
    expect(errorMessage).toContain("Seems your're offline")
})