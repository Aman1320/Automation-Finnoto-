import {expect, test} from '@playwright/test';
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

  const activeButton = page.locator(' div:nth-child(3) > div:nth-child(6)>.centralize >.btn'); 
  

// Get the name "Aman" from the table row
const tableRow = await activeButton.locator('div.table-row ');

// Get the name "Aman" from the table row
const nameElement = await tableRow.locator('div.table-cell:nth-child(2) a');
const name = await nameElement.textContent();
expect(name).toEqual('Aman');
    // Click on the active button
    await activeButton.click();
  
const toastElement = await page.waitForSelector('.toast-content'); 
 const Message = await toastElement.textContent();
expect(Message).toEqual('Status Changed')

});

  

