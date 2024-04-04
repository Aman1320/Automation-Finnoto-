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
const parentdept=page.locator('.css-1xc3v61-indicatorContainer')
const deptManager=page.locator('. css-1xc3v61-indicatorContainer')

return {Name,parentdept,deptManager};
}