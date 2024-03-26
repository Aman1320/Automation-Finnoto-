
import {test,expect, Locator} from '@playwright/test';
require('dotenv').config();
const username = process.env.USERNAME;
const password1 = process.env.PASSWORD;
console.log(process.env)
import { error } from 'console';
import exp from 'constants';
import { link } from 'fs';
//import { text } from 'stream/consumers';
//import { text } from 'stream/consumers';
test('login to AP',async({page}) =>{
    await page.goto('https://devfn.vercel.app/login');
    // check signup link  and signin with google
    const signup= page.getByRole('link',{name :'Sign Up'})
    await expect(signup).toBeVisible();
    const google= page.getByRole('button',{name :'with Google'})
    await expect(google).toBeVisible();
   //click without email error message
     const next= page.getByRole('button',{name:'Next →'})
     await next.click()
     const message=page.getByText('Email Address is required')
     await expect(message).toBeVisible();
     
  //fill username
   const email= await page.locator('[id="username"]').fill(username)
    
    await next.click()

    //next page
    await expect(page).toHaveURL('https://devfn.vercel.app/login?email=testuser500%40finnoto.com&referrer=')
    
    //submit without password error
    const submit = page.getByRole('button',{name:'Submit'})
    await submit.click();
    const password: Locator= page.getByPlaceholder("password")
    
    const message1=page.getByText('Password is required')
     await expect(message1).toBeVisible();
     await expect(submit).toBeDisabled();
    //forgoconsole.log(forget)t password link 
    const forget= page.getByRole('link',{name :"Forgot Password?"})
    await expect(forget).toBeVisible();
     //fill wrong password
    await password.fill("1234567")
     await submit.click();
     const error1=page.getByText('Invalid username or password..')
     await expect(error1).toBeVisible();
     //fill password then move to AP
    await password.fill(password1)
     
     const uilocator = '//div[contains(@class,"cursor-pointer")]';
     
      await page.locator(uilocator).click();
      await expect(password).toHaveAttribute("type", "text");
    await submit.click();
    const AP =page.locator("#pro-2")

    await AP.click();
    await expect(page).toHaveURL('https://devfn.vercel.app/e/f')
  
}

);
test('Login to EP',async({page}) =>{
    await page.goto('https://devfn.vercel.app/login');
    const email= await page.locator('[id="username"]').fill("testuser500@finnoto.com")
    const next= page.getByRole('button',{name:'Next →'})
    await next.click()

    await expect(page).toHaveURL('https://devfn.vercel.app/login?email=testuser500%40finnoto.com&referrer=')
    const password: Locator=  page.getByPlaceholder("password")
    password.fill("123456")
    
    //see password
    //const seek=await page.locator("class=['input-password-icon']")
    //await seek.click()
   //
   const submit = page.getByRole('button',{name:'Submit'})
   await submit.click();
   await expect(submit).toBeDisabled();

    const EP=page.locator('#pro-1')
    await EP.click();
     await expect(page).toHaveURL('https://devfn.vercel.app/e/e')
}

);
test('forget  password',async({page}) =>{
  await page.goto('https://devfn.vercel.app/login');
  const email= await page.locator('[id="username"]').fill("testuser500@finnoto.com")
  const next= page.getByRole('button',{name:'Next →'})
  await next.click()

  await expect(page).toHaveURL('https://devfn.vercel.app/login?email=testuser500%40finnoto.com&referrer=')
  
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

);
test('reset button',async({page}) =>{
  await page.goto('https://devfn.vercel.app/login');
  const email= await page.locator('[id="username"]').fill("testuser500@finnoto.com")
  const next= page.getByRole('button',{name:'Next →'})
  await next.click()

  await expect(page).toHaveURL('https://devfn.vercel.app/login?email=testuser500%40finnoto.com&referrer=')
  const resetlocator='//button[contains(@class,"link")]';
  await page.locator(resetlocator).click();
  await expect(page).toHaveURL('https://devfn.vercel.app/login')
}
);
test('toast error',async({page}) =>{
  await page.goto('https://devfn.vercel.app/login');
  const email= await page.locator('[id="username"]').fill("testuser500@aman.com")
  const next= page.getByRole('button',{name:'Next →'})
  await next.click()

  await expect(page).toHaveURL('https://devfn.vercel.app/login?email=testuser500%40aman.com&referrer=')
  const password: Locator= page.getByPlaceholder("password")
  await password.fill("123456")
  
 const submit = page.getByRole('button',{name:'Submit'})
 await submit.click();
 
 const toastElement = await page.waitForSelector('.ct-toast-error'); 
 const errorMessage = await toastElement.textContent();
 expect(errorMessage).toEqual('Invalid username or password')
});
test('Validate email', async ({ page }) => {
  // Navigate to the webpage containing the email input field
  await page.goto('https://devfn.vercel.app/login');

  // Find the email input field
  const email=  page.locator('[id="username"]')
  await email.fill("testuser500");
  const next= page.getByRole('button',{name:'Next →'})
  await next.click()
  const enteredEmail = await email.inputValue();

  // Define a regular expression pattern to match against an email address
  const namePattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const error1=page.getByText('name must be a valid name')
  // Verify that the entered email matches the regular expression pattern
  expect(namePattern.test(enteredEmail)).toBeFalsy();
  if(namePattern.test(enteredEmail)==true)
     await expect(error1).toBeHidden();
  else
      await expect(error1).toBeVisible();
});

test('Validate mobile number', async ({ page }) => {
  // Navigate to the webpage containing the email input field
  await page.goto('https://devfn.vercel.app/login');

  // Find the email input field
  const phone=  page.locator('[id="username"]')
  await phone.fill("9158275");
  const next= page.getByRole('button',{name:'Next →'})
  await next.click()
 const enteredphone = await phone.inputValue();


  const pattern = /^\d{10}$/;

   const error1=page.getByText('Mobile Number is not allowed')
 
   expect(pattern.test(enteredphone)).toBeFalsy();
   if(pattern.test(enteredphone)==true)
      await expect(error1).toBeHidden();
  else
      await expect(error1).toBeVisible();
});
test('Login via Phone',async({page})=>{
  await page.goto('https://devfn.vercel.app/login');
  const phone= await page.locator('[id="username"]').fill("9068279048")
  const next= page.getByRole('button',{name:'Next →'})
  await next.click()

  await expect(page).toHaveURL('https://devfn.vercel.app/login?mobile=9068279048&referrer=')
  const password=  page.locator('.otpInput')


  
  const submit = page.getByRole('button',{name:'Verify & Proceed'})
   await expect(submit).toBeDisabled();
   await password.first().fill("1");
   await password.nth(1).fill("1");
   await password.nth(2).fill("1");
   await password.nth(3).fill("1");


  await submit.click();
    const EP=page.locator('#pro-1')
    await EP.click();
     await expect(page).toHaveURL('https://devfn.vercel.app/e/e')

})
test('Signup page',async({page}) =>{
  await page.goto('https://devfn.vercel.app/login');
  const signup= page.getByRole('link',{name :'Sign Up'})
  await expect(signup).toBeVisible();
  await signup.click();
  await expect(page).toHaveURL('https://devfn.vercel.app/signup')
  const name= page.locator('[id="name"]')
  const email= page.locator('[id="username"]')
  const password= await page.locator('[id="password"]')
  const confpassword=await  page.locator('[id= "confirmPassword"]')
  
  const next= page.getByRole('button',{name:'Next →'})
   await next.click()
  const error1=page.getByText('name is required')
  const error2=page.getByText('email is required')
  const error3=page.getByText('Password is required',{exact:true})
  //const err=page.locator('.py-1 label label-text-alt text-error')
  const error4=page.getByText('Confirm Password is required',{exact:true})
   
  if(await name.inputValue() === '')
   {await expect(error1).toBeVisible();
      await expect(next).toBeDisabled();
  }
  if(await email.inputValue() === '')
  {await expect(error2).toBeVisible();
     await expect(next).toBeDisabled();
 }
 if(await confpassword.inputValue() === '')
{await expect(error4).toBeVisible();
   await expect(next).toBeDisabled();
}
 if(await password.inputValue() === '')
 {await expect(error3).toBeVisible();
    await expect(next).toBeDisabled();
}


//  name.fill("aman saini");
//  await expect(error1).toBeHidden();

//  email.fill("saini123");
//  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//  const error5= page.getByText('Email Address must be a valid email')
//  // Verify that the entered email matches the regular expression pattern
//  expect(emailPattern.test(email)).toBeFalsy();
//  if(emailPattern.test(email)==true)
//     await expect(error1).toBeHidden();
//  else
//      await expect(error1).toBeVisible();
}
);
test('Validatemail',async({page})=>{
  page.goto('https://devfn.vercel.app/signup')
  const name= page.locator('[id="name"]')
  const email= page.locator('[id="username"]')
  await email.fill("test@test.com");
  const enteredEmail = await email.inputValue();
  const next= page.getByRole('button',{name:'Next →'})
   await next.click()
  // Define a regular expression pattern to match against an email address
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const error1=page.getByText('Email must be a valid email')
  // Verify that the entered email matches the regular expression pattern
 // expect(emailPattern.test(enteredEmail)).toBeFalsy();
  if(emailPattern.test(enteredEmail)==true)
     await expect(error1).toBeHidden();
  else
      await expect(error1).toBeVisible()
});
//
test('Validatname',async({page})=>{
  page.goto('https://devfn.vercel.app/signup')
  const name= page.locator('[id="name"]')
  await name.fill("@@$$$###");
  const enterName = await name.inputValue();
  const next= page.getByRole('button',{name:'Next →'})
   await next.click()
  // Define a regular expression pattern to match against an name address
  const namePattern = /^[a-zA-Z0-9&$]+$/;

  const error1=page.getByText('name must be a valid name')
  // Verify that the entered email matches the regular expression pattern
  expect(namePattern.test(enterName)).toBeFalsy();
  if(namePattern.test(enterName)==true)
     await expect(error1).toBeHidden();
  else
      await expect(error1).toBeVisible()
});

test('TSU004',async({page})=>{
  page.goto('https://devfn.vercel.app/signup')
  const password=  page.locator('[id="password"]');
//empty password
  const next= page.getByRole('button',{name:'Next →'})
    const error3=page.getByText('Password is required',{exact:true})
   await next.click()
   if(await password.inputValue() === '')
 {await expect(error3).toBeVisible();
    await expect(next).toBeDisabled();
}
//fill password <6 length
  await password.fill("11111");
  const passwordValue = await password.inputValue();
  const uilocator2='//input[contains(@class,"checkbox")]';
  await page.locator(uilocator2).click();
  

// Check if the length of the password is at least 6 characters long
const isPasswordValid = passwordValue.length >= 6;
const error= page.getByText("Password length must be at least 6 characters long");
// Output the result
if (isPasswordValid==false) {
    await expect(error).toBeVisible();
} else {
        await expect(error).toBeHidden();
}
//password to be hidden by default
await expect(password).toHaveAttribute("type", "password");
//password to be visible on click(eyeicon)
 const uilocator = '//label[@for,"password"]/parent::div //div[contains(@class,"cursor-pointer")]';
 const locate=  page.locator(uilocator).isVisible(); //true or false
    expect(locate).toBeTruthy();
      //await page.locator(uilocator).click();
     // await expect(password).toHaveAttribute("type", "text");
});

test('TSU005',async({page})=>{
  page.goto('https://devfn.vercel.app/signup')
  const confPassword=  page.locator('[id= "confirmPassword"]')
  const password=  page.locator('[id="password"]');
  await password.fill("111111")
  //empty confirm password
  const next= page.getByRole('button',{name:'Next →'})
    const error3=page.getByText('Confirm Password is required',{exact:true})
   await next.click()
   await expect(error3).toBeVisible();
  //Mismatching and matched
  await confPassword.fill("111111")
 
  const passwordValue = await password.inputValue();
  const cnfpasswordValue = await confPassword.inputValue();
  const uilocator2='//input[contains(@class,"checkbox")]';
  await page.locator(uilocator2).click();
  if(passwordValue!=cnfpasswordValue)
  {
    const message=page.getByText("Confirm Password does not match");
    await expect(message).toBeVisible();
  }
  else{
    const message=page.getByText("Confirm Password does not match");
    await expect(message).toBeHidden();
  }
// confirm password to be hidden by default
await expect(confPassword).toHaveAttribute("type", "password");
});
test('TSU006',async({page})=>{
  
  page.goto('https://devfn.vercel.app/signup')
  //locate Checkbox
  const uilocator2='//input[contains(@class,"checkbox")]';
  const locate= await page.locator(uilocator2).isChecked();
   expect(locate).toBeTruthy()
  //If next enabled then check box checked
  
  const next= page.getByRole('button',{name:'Next →'})
   await expect(next).toBeEnabled();
  //uncheck the checkbox
  await page.locator(uilocator2).click();
  const uncheck=await page.locator(uilocator2).isChecked();
  expect(uncheck).toBeFalsy();
  await expect(next).toBeDisabled();

})
test('TSU007',async({page})=>{
  page.goto('https://devfn.vercel.app/signup')
//locate the next button
  const next= page.getByRole('button',{name:'Next →'})
//should be deactive if empty field.
   await next.click()
  await expect(next).toBeDisabled();

});
