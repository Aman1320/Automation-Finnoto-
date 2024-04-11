import {expect, selectors, test} from '@playwright/test';
import { urlink,directlogin } from '../Helper/Login Helper/login.helper';
import { checkselected, emptyfield, locatefield } from '../Helper/Department Helper/department.helper';
import { error } from 'console';
require('dotenv').config();
const username = process.env.USERNAMES;
const password1 = process.env.PASSWORD;

test('Department',async({page})=>{
    await directlogin(page);
    page.goto(urlink.department)
const addbutton='//button[contains(@data-title,"ef_add_department")]';
await page.locator(addbutton).click();
const departmentDialog=page.getByRole("dialog");
await expect(departmentDialog).toBeVisible();
const title=page.getByRole('heading',{name:"Add Department"});
await expect(title).toBeVisible();
//all empty field
await emptyfield(page);
//Name filled but rest empty
const {Name,parentdept,deptManager}=await locatefield(page);
await Name.fill("aman");
const  save=page.getByRole('button',{name:'save'});
await expect(save).toBeEnabled();
await save.click();
await expect(departmentDialog).toBeHidden();
})
test("Listing", async({page})=>{
     await directlogin(page);
     await page.goto(urlink.department)
   //check open on active 
const active= await page.locator('button[role="tab"][aria-selected="true"][data-state="active"]');
const buttonText1 = await active.innerText();
expect(buttonText1).toMatch('Active');

// const inactive= page.locator('button[role="tab"][aria-selected="true"][data-state="inactive"]');
// const buttonText2 = await inactive.innerText();
//  expect(buttonText2).toMatch('Inactive');

//check the onclick inactive and all
//const tab=page.locator('//button[@role="tab"]').filter({hasText:'Inactive'})

const tab=page.locator('//div[@role="tablist"]')
const inactive=tab.locator('//button[text()="Inactive"]')
//await tab.click()
await inactive.click()

const isSelected= await inactive.getAttribute('aria-selected');
expect(isSelected).toEqual('true');
await checkselected(tab);

})
test("Details",async ({page})=>{
  await directlogin(page);
  await page.goto(urlink.department)
  const Sno= page.locator('div.table-cell > div > p:has-text("5")');

//Successful shows the hover text
  await Sno.hover();
  const tooltipText = await page.getByText('click to view more details');
  expect(tooltipText).toBeTruthy();
//on click
  await Sno.click();
// check the parse value in thedialog box. 
//default active
//check all the field inside the Dialog box

    const dilagbox=page.locator('//div[@role="dialog"] ')
    const deprtName= dilagbox.getByText("Departments",{exact:true})
    expect(deprtName).toBeTruthy();
    const addedat= dilagbox.getByText("Added at",{exact:true})
    expect(addedat).toBeTruthy;
    const aprrovalManager=dilagbox.getByText("Approval Manager",{exact:true})
    expect(aprrovalManager).toBeTruthy();
    const mail=dilagbox.getByText("Manager Email",{exact:true})
    expect(mail).toBeTruthy;
    const name=dilagbox.getByText("Name",{exact:true})
    expect(name).toBeTruthy;
    const parent=dilagbox.getByText("Parent Department",{exact:true})
    expect(parent).toBeTruthy;
    const status=dilagbox.getByText("Status",{exact:true})
    expect(status).toBeTruthy;

//check for active button

    const acitvebutton = dilagbox.locator('//div[contains(@class,"flex justify")]//div[contains(@class, "centralize")]/button');
    const isVisible = await acitvebutton.isVisible();
    expect(isVisible).toBeTruthy()

//check for "sort by name" is visible
    const sort=dilagbox.locator("//span[text()='Sort By Name']");
    await sort.click();
    const asc=dilagbox.getByText("Ascending",{exact:true})
    expect(asc).toBeTruthy;
    const dsc=dilagbox.getByText("Descending",{exact:true})
    expect(dsc).toBeTruthy;

//check for "Close button"
//dialog
    const close=dilagbox.locator('div.close-dialog');
    await close.click();
    expect(dilagbox).toBeHidden();

})
test("Name",async ({page})=>{
  await directlogin(page);
  await page.goto(urlink.department)
  const name =page.locator('div.table-cell > a:has-text("Accounts")')
  // const name =page.getByRole('link', { name: 'Accounts', exact: true })

  await name.click();
  await expect(page).toHaveURL('https://devfn.vercel.app/e/f/department/d/2936');


})

 // Check if the data-state attribute value is 'closed' By default.
test("Closed",async({page})=>{
  await directlogin(page);
  await page.goto(urlink.department)
  
  const divElements = await page.$$eval('div[data-state]', (elements) => {

     elements.map((index) => {
      const dataState = index.getAttribute('data-state');
      expect(dataState).toContainEqual("Closed")
    });
  });
})
test("Status", async({page})=>{
  await directlogin(page);
  await page.goto(urlink.department)
  //page.waitForSelector() is primarily used for waiting for a single element to appear, 
  //while page.locator() is used for finding multiple elements and performing actions on them. 
 // const activeButton = await page.waitForSelector('div[data-state="closed"] button:has-text("Active")');

// const Activenumber = await page.$$('button:has-text("Active")'); count all button with active

const row = page.locator("div.table-row", { has: page.locator('text="4"') });
const name=await row.locator('div:nth-child(2)').textContent();
const activeButton=await row.locator('button',{hasText:'Active'})
    // Click on the active button
    await activeButton.click();
  
const toastElement = await page.waitForSelector('.toast-content'); 
 const Message = await toastElement.textContent();
expect(Message).toEqual('Status Changed')
});
test("ApprovalManager",async({page})=>{
  await directlogin(page);
  await page.goto(urlink.department)

  const row = page.locator("div.table-row", { has: page.locator('text="1"') });
  const Approval=await row.getByRole("link", { name: "User",exact:true })
  await Approval.click();
  await expect(page).toHaveURL('https://devfn.vercel.app/e/f/employee/14132')
})
test("ParentDept",async ({page})=>{
  await directlogin(page);
  await page.goto(urlink.department)

  const row = page.locator("div.table-row", { has: page.locator('text="2"') });
  const Approval=await row.getByRole("link", { name: "Backend",exact:true})
  await Approval.click();
  const details=page.getByText("Department Detail")
  await expect(details).toBeTruthy;

}) 
test("Manager mail",async({page})=>{
  await directlogin(page);
  await page.goto(urlink.department)

  const row = page.locator("div.table-row", { has: page.locator('text="5"') });
  const mail=row.getByRole("link", { name: "testuser500@finnoto.com",exact:true})
  await mail.click();
  const details=page.getByText("testuser500@finnoto.com")
  await expect(details).toBeTruthy;
})
test("Edit",async({page})=>{
  await directlogin(page);
  await page.goto(urlink.department)
  const row = page.locator("div.table-row", { has: page.locator('text="9"') });
  const edit=await row.locator("div:nth-child(8)")
 await edit.hover();
  const tooltipText = await page.getByText('Edit');
  expect(tooltipText).toBeTruthy();

  //cick on edit
  await edit.click();
//Locate the dialog box
const inputname=await row.locator("div:nth-child(2)").textContent();
const inputaprroval=await row.locator("div:nth-child(3)").textContent();
const inputdept=await row.locator("div:nth-child(5)").textContent();

  const dilagbox=page.locator('//div[@role="dialog"] ')
  const deprtName= dilagbox.getByText("Edit Department",{exact:true})
  expect(deprtName).toBeTruthy();
//Check the data in name is already there
  const name=await dilagbox.locator("[id='name']").inputValue()
  expect(name).toEqual(inputname)
//check manager id data is filled
 const inputField1 = await page.locator('input[name="manager_id"]');
 const div1=await dilagbox.locator("div.text-sm",{has:inputField1})

const value = await div1.innerText();
 expect(inputaprroval).toContain(value);

//check parent department is filled
const inputField2 = await page.locator('input[name="parent_id"]');
const div2=await dilagbox.locator("div.text-sm",{has:inputField2})

// Get the value of the input field
const value2 = await div2.innerText();
expect(inputdept).toContain(value2);

//check for "Close button"
//dialog
const close=dilagbox.locator('div.dialog-close');
await close.click();
expect(dilagbox).toBeHidden();
})
test("Hover",async({page})=>{
  await directlogin(page);
  await page.goto(urlink.department)
  //Check the configure button available 

  const configure=await page.locator('//button[@data-title="Configure Table"]')
  await configure.hover();
  const tooltipText = page.getByText('Configure Table');

  expect(tooltipText).toBeTruthy();
//click the configure button
await configure.click();
const dialog1=await page.locator('//div[@role="dialog"]')
const reset =dialog1.getByRole('link',{ name:'Reset'});
await reset.click()

const search=await dialog1.locator('input[placeholder="Search column name"]')
  //Check the download button
  await expect(search).toBeVisible();


  const download=await page.locator('//button[@data-title="Configure Table"]')
  await download.hover();
  const text = page.getByText('Download CSV');

  expect(text).toBeTruthy();
})

test("Table head",async({page})=>{
  await directlogin(page);
  await page.goto(urlink.department)
  //check the table header
  const head=page.locator('.table-header-group ')

//check name has ascending and descending feature
  const name= head.locator('button',{hasText:"Name"});
  await name.click();
  const asc=page.getByText("Ascending");
  const desc=page.getByText("Descending")
await expect(asc).toBeVisible();
await expect(desc).toBeVisible();

//check Approval manager has ascending and descending feature
const Approval= head.locator('button',{hasText:"Approval Manager"});
  await Approval.click();
  await expect(asc).toBeVisible();
await expect(desc).toBeVisible();

//check parent department has ascending and descending feature
const parent= head.locator('button',{hasText:"Parent Department"});
  await parent.click();
  await expect(asc).toBeVisible();
await expect(desc).toBeVisible();

//check mail manager has ascending and descending feature
const mail= head.locator('button',{hasText:"Manager Email"});
  await mail.click();
  await expect(asc).toBeVisible();
await expect(desc).toBeVisible();

//check Added at has ascending and descending feature
const Added= head.locator('button',{hasText:"Added At"});
  await Added.click();
  await expect(asc).toBeVisible();
await expect(desc).toBeVisible();
})

test("Search",async({page})=>{
  await directlogin(page);
  await page.goto(urlink.department)

  const search=page.locator('input[placeholder="Search ( min: 3 characters )"]')
  await expect(search).toBeVisible();

});

test ("Filter", async({page})=>{
  await directlogin(page);
  await page.goto(urlink.department)

  const loc=page.locator('div.flex flex-wrap > button')
  await loc.click();
  
})