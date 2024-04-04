import {expect, test} from '@playwright/test';
import { urlink,directlogin } from '../Helper/Login Helper/login.helper';
import { emptyfield, locatefield } from '../Helper/Department Helper/department.helper';
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


