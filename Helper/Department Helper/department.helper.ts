import {expect, Locator, Page} from '@playwright/test';

export async function emptyfield(page:Page)
{
const  submit=page.getByRole('button',{name:'save'});
await expect(submit).toBeEnabled();
await submit.click();

await expect(submit).toBeDisabled();
const namefielderror=page.getByText("Name is required")
await expect(namefielderror).toBeVisible();

}
export async function locatefield(page:Page)
{
const Name=page.locator('[id="name"]');
const parentdept=page.locator('input[id:"react-select-6-input"]')
const deptManager=page.locator('input[id:"react-select-7-input"]')
return {Name,parentdept,deptManager};
}
export async function checkselected(tab:Locator)
{
    const abc=tab.locator('//button[text()="All"]')
await abc.click();
 const iSelected= await abc.getAttribute('aria-selected');
 expect(iSelected).toEqual('true'); 
}

export async function selectrow(page:Page,no:string)
{
  return page.locator('div.table-cell > div > p:has-text(no)');
}

export async function checkname(dilagbox:Locator,txt:string)
{
    const deprtName= dilagbox.getByText(txt,{exact:true})
    expect(deprtName).toBeTruthy();
}
export async function  checkrow(head:Locator,txt:string,page:Page) {
    const name= head.locator('button',{hasText:"Name"});
    await name.click();
    const asc=page.getByText("Ascending");
    const desc=page.getByText("Descending")
  await expect(asc).toBeVisible();
  await expect(desc).toBeVisible();
    
}
export async function closebtn(dilagbox:Locator)
{
    const close=dilagbox.locator('div.close-dialog');
    await close.click();
    expect(dilagbox).toBeHidden();
}
export async function dataclosed(page:Page) {
    const divElements = await page.$$eval('div[data-state]', (elements) => {

        elements.map((index) => {
         const dataState = index.getAttribute('data-state');
         expect(dataState).toContainEqual("Closed")
       });
     });
    
}