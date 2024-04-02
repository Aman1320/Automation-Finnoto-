import {expect, Locator, Page} from '@playwright/test';

export interface loginfo {
  name: string;
  password: string;
  mail:string;
  conf:string;
}
 export async function attemptSignIn(page: Page, password: Locator) {
    for (let i = 0; i <= 5; i++) {
        await password.fill("1234567" + i);
        const submit = page.getByRole('button', { name: 'Submit' });
        await submit.click();
        await page.waitForTimeout(1000); // Wait for error message to appear
    }
}

export async function filldetails(page :Page,data:loginfo)
{
    const name= page.locator('[id="name"]')
    const email= page.locator('[id="username"]')
    const password= page.locator('[id="password"]')
    const confpassword= page.locator('[id= "confirmPassword"]')
   
   await name.fill(data.name)
   await email.fill(data.mail)
   await password.fill(data.password)
   await confpassword.fill(data.conf)
}
export async function emptypassword(page:Page,next:Locator,password:Locator)
{
    const error3=page.getByText('Password is required',{exact:true})
   if(await password.inputValue() === '')
 {await expect(error3).toBeVisible();
    await expect(next).toBeDisabled();
}
}

export async function emailcheck(page:Page,enteredEmail:string) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const error1=page.getByText('Email must be a valid email')
  // Verify that the entered email matches the regular expression pattern
 // expect(emailPattern.test(enteredEmail)).toBeFalsy();
  if(emailPattern.test(enteredEmail)==true)
     await expect(error1).toBeHidden();
  else
      await expect(error1).toBeVisible();
}
export async function loading(page:Page)
{
    await page.goto('https://devfn.vercel.app/login');
  const signup= page.getByRole('link',{name :'Sign Up'})
  await expect(signup).toBeVisible();
  await signup.click();
  await expect(page).toHaveURL('https://devfn.vercel.app/signup')
  const name= page.locator('[id="name"]')
  const email= page.locator('[id="username"]')
  const password= await page.locator('[id="password"]')
  const confpassword=await  page.locator('[id= "confirmPassword"]')

  return {name,email,password,confpassword}
}
