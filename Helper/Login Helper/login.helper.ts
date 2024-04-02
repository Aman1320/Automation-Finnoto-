import {expect, Locator, Page} from '@playwright/test';
//inteface
const username=process.env.USERNAMES;
const password1=process.env.PASSWORD;
export interface url{
    AP:string;
    EP:string;
    login:string;
    Signupurl?:string;
}
export const urlink:url={AP:'https://devfn.vercel.app/e/f',EP:'https://devfn.vercel.app/e/e',login:'https://devfn.vercel.app/login'}

export async function fillusernanme(page:Page,email:Locator)
{
    if (username) {
        await email.fill(username);
      } else {
        throw Error('Username not found');
      }
}
export async function fillpassowrd(page:Page,password:Locator)
{
    if(password1)
    {
      await password.fill(password1)
    }
    else
    {
      console.log("password not found");
    } 
}
export async function locate(page:Page)
{
    const signup= page.getByRole('link',{name :'Sign Up'})
    await expect(signup).toBeVisible();
    const google= page.getByRole('button',{name :'with Google'})
    await expect(google).toBeVisible();
}
export async function gotoAP(page:Page,urlink:url) {
    const AP = await page.locator("#pro-2").click();
    await expect(page).toHaveURL(urlink.AP)   
}
export async function passworderror(page:Page)
{
    const submit = page.getByRole('button',{name:'Submit'})
    await submit.click();
    const password: Locator= page.getByPlaceholder("password")
    
    const message1=page.getByText('Password is required')
     await expect(message1).toBeVisible();
     await expect(submit).toBeDisabled();

    return{password,submit};
}
export async function eyebutton(page:Page,password:Locator,Submit:Locator)
{
    const uilocator = '//div[contains(@class,"cursor-pointer")]';
     
      await page.locator(uilocator).click();
      await expect(password).toHaveAttribute("type", "text");
      Submit.click();
}
export async function flowcheck(page:Page,next:Locator) {
    const forget= page.getByRole('link',{name :"Forgot Password?"})
  await forget.click()
  await expect(page).toHaveURL('https://devfn.vercel.app/forgot-password?email=testuser500@finnoto.com')
  //back from forget
  const back= page.getByRole('button',{name:'Back'})
  
await back.click()
await expect(page).toHaveURL('https://devfn.vercel.app/login?email=testuser500%40finnoto.com&referrer=')
 //again on forget
await forget.click()
await next.click()
await back.click()
await expect(page).toHaveURL('https://devfn.vercel.app/login?email=testuser500%40finnoto.com&referrer=')
  
}