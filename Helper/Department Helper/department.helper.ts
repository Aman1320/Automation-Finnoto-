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