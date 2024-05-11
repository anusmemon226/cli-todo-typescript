#! /usr/bin/env node
import inquirer from 'inquirer'

let todoList = []

async function goToMainMenu(){
    let ask1 = await inquirer.prompt([
        {
        name: "ask",
        type: "confirm",
        message: "Go to Main Menu : "
        }
    ])
    return ask1.ask
}
async function exitApplication(){
    let ask2 = await inquirer.prompt([
        {
        name: "ask",
        type: "confirm",
        message: "Exit Application : "
        }
    ])
    return ask2.ask
}
while(true){
    let getList = await inquirer.prompt([
        {
            name: "menuList",
            type: "list", 
            message: "Select Below Options : ",
            choices: ["See List","Add","Remove","Update","Exit"]
        }
    ])
    if(getList.menuList == 'See List'){
        while(true){
            if(todoList.length !== 0){
                for(let i = 0; i < todoList.length; i++){
                    console.log(`${i+1}. ${todoList[i]}`)
                }              
            }else{
                console.log("List is empty !")
            }
            if(await goToMainMenu()){
                break;
            }else{
                if(await exitApplication()){
                    process.exit(1)
                }else{
                    break;
                }
            }
        }
    }else if(getList.menuList == 'Add'){
        while(true){
            let listItem = await inquirer.prompt([
                {
                    name: "listItem",
                    type: "string",
                    message: "Enter Todo Item : "
                }
            ])
            todoList.push(listItem.listItem)
            console.log("Successfully Added Item to List !")
            let doAddMore = await inquirer.prompt([
                {
                    name: "addMore",
                    type: "confirm",
                    message: "Want to Add More Items ? : "
                }
            ])
            if(doAddMore.addMore){
                continue
            }else{
                if(await goToMainMenu()){
                    break;
                }else{
                    if(await exitApplication()){
                        process.exit(1)
                    }else{
                        break;
                    }
                }
            }
        }
    }else if(getList.menuList == 'Remove'){
        if(todoList.length !== 0){
            while(true){
                let removeItem = await inquirer.prompt([
                    {
                        name: "removeItemId",
                        type: 'list',
                        message: "Which Item do you want to remove : ",
                        choices: todoList
                    }
                ])
                let itemIndex = todoList.indexOf(removeItem.removeItemId)
                todoList.splice(itemIndex,1)
                console.log("Successfully Remove Item from List")
                let doRemoveMore = await inquirer.prompt([
                    {
                        name: "removeMore",
                        type: "confirm",
                        message: "Want to Remove More Items ? : "
                    }
                ])
                if(doRemoveMore.removeMore){
                    continue
                }else{
                    if(await goToMainMenu()){
                        break;
                    }else{
                        if(await exitApplication()){
                            process.exit(1)
                        }else{
                            break;
                        }
                    }
                }
            }
        }else{
            console.log("List is empty, You can't Remove Item")
        }
    }else if(getList.menuList == 'Update'){
        if(todoList.length !== 0){
            while(true){
                let doUpdate = await inquirer.prompt([
                    {
                        name: "updateItem",
                        type: 'list',
                        message: "Which Item do you want to Update : ",
                        choices: todoList
                    }
                ])
                let itemIndex = todoList.indexOf(doUpdate.updateItem)
                console.log(`Your Previous Item Value was : ${doUpdate.updateItem}`)
                let newItem = await inquirer.prompt([
                    {
                        name: "newItem",
                        type: "String",
                        message: "Enter New Item : "
                    }
                ])
                todoList.splice(itemIndex,1,newItem.newItem)
                console.log("Item Updated successfully !")
                let doUpdateMore = await inquirer.prompt([
                    {
                        name: "updateMore",
                        type: "confirm",
                        message: "Want to Update More Items ? : "
                    }
                ])
                if(doUpdateMore.updateMore){
                    continue
                }else{
                    if(await goToMainMenu()){
                        break;
                    }else{
                        if(await exitApplication()){
                            process.exit(1)
                        }else{
                            break;
                        }
                    }
                }
            }
        }else{
            console.log("List is empty, You can't update Items of List")
        }  
    }else if(getList.menuList == 'Exit'){
        console.log("Thanks for using TODO App !")
        break
    }else{
        console.log("Invalid Option !")
    }
}