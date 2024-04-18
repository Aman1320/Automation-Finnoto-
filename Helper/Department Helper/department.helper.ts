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
export async function getButton(page:Page,txt:String)
{
  return page.getByRole('button', { name: `${txt}` })
}
export async function locatefield(page:Page)
{
const Name=page.locator('[id="name"]');
const parentdept=page.locator('input[id:"react-select-6-input"]')
const deptManager=page.locator('input[id:"react-select-7-input"]')
return {Name,parentdept,deptManager};
}
export async function checkselected(page:Page,tab:string)
{
  const tablistContainer=page.locator('//div[@role="tablist"]')
    const abc=tablistContainer.locator(`//button[text()=${tab}]`)
await abc.click();
 const iSelected= await abc.getAttribute('aria-selected');
 expect(iSelected).toEqual('true'); 
}

export async function selectrow(page:Page,no:string)
{
  return page.locator(`div.table-cell > div > p:has-text(${no})`);
}

export async function checkname(dilagbox:Locator,txt:string)
{
    const deprtName= dilagbox.getByText(txt,{exact:true})
    expect(deprtName).toBeTruthy();
}
/*export async function checkname(page:Page,txt:string[])
{
  const dialog=await dialogContainer(page)
  for(let i in txt )
   { const deprtName=dialog.getByText(i,{exact:true})
    expect(deprtName).toBeTruthy();
}
} */
export async function dialogContainer(page:Page){
  return page.locator('//div[@role="dialog"] ')
}
export async function addDept(page:Page) {
  await page.locator('//button[contains(@data-title,"ef_add_department")]').click();
}
export async function locateActive(page:Page) {
  return page.locator('button[role="tab"][aria-selected="true"][data-state="active"]')
}
export async function sortByName(dilagbox:Locator)
{
  return dilagbox.locator("//span[text()='Sort By Name']")
}
export async function  checkrow(txt:string,page:Page) {
   //check the table header
  const head = page.locator('.table-header-group ') 
  const name= head.locator('button',{hasText:txt});
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
export async function searchBar(page:Page,txt:string) {
  return page.locator(`input[placeholder=${txt}]`)
  
}