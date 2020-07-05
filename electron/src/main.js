const electron = require('electron');
const url = require('url');
const path = require('path');  
const fs = require("fs")
const {app, BrowserWindow, Menu} = electron;


let mainWindow;
let addWindow;

// Listen for app to be ready

app.on('ready', function(){
    //Create new window
    mainWindow = new BrowserWindow({
        width: 900,
        height: 680,
        minWidth: 400,
        frame: false,
        backgroundColor: '#FFF',
        webPreferences: {
            nodeIntegration: true
        }
    });
    //Load html file
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'mainwindow.html'),
        protocol:'file:',
        slashes: true
    }));
    //Quit app when closed
    mainWindow.on('closed', function(){
        app.quit();
    })

    // Build menu from template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    //Insert menu 
    Menu.setApplicationMenu(mainMenu);
});

//handle create add window
function createAddWindow(){

    //Create new window
    addWindow = new BrowserWindow({
        width: 400,
        height: 200,
        frame:false,
        title:'Export Video',
        webPreferences: {nodeIntegration: true} 
    });
    //Load html file
    addWindow.loadURL(url.format({
        pathname: path.join(__dirname,'addWindow', 'ex_video.html'),
        protocol:'file:',
        slashes: true
    })); 
    //Garbage collection handle
    addWindow.on('close', function(){
        addWindow = null;
    })

}

//Create menu template
const mainMenuTemplate = [
    {
        label:'File',
        submenu:[
            {
                label: 'Import Video'
            },
            {
                label: 'Export Current Video',
                click(){
                    createAddWindow();
                }
            }
        ]
    }
];

if(process.platform == 'darwin'){
    mainMenuTemplate.unshift({});
}

//Add Super Nerd stats(developer tools) when not in production
if(process.env.NODE_ENV !== 'production'){
    mainMenuTemplate.push({
        label:'Developer Tools',
        submenu: [
            {
            label: 'Toggle DevTools',
            accelerator: process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
            click(item, focusedWindow){
                focusedWindow.toggleDevTools();
            }
            },
            {
                
            accelerator: process.platform == 'darwin' ? 'Command+R' : 'Ctrl+R',
            role:'reload'
                
            }
    ]
    });
}


