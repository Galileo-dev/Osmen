
const remote = require('electron').remote;
const { dialog } = require('electron').remote;
const mainWindow = require('electron').BrowserWindow;
const win = remote.getCurrentWindow(); /* Note this is different to the
html global `window` variable */
const edit = require('./backend/edit_ffmpeg')

// When document has loaded, initialise
document.onreadystatechange = (event) => {
    if (document.readyState == "complete") {
        handleWindowControls();
    }
};

window.onbeforeunload = (event) => {
    /* If window is reloaded, remove win event listeners
    (DOM element listeners get auto garbage collected but not
    Electron win listeners as the win is not dereferenced unless closed) */
    win.removeAllListeners();
}

function handleWindowControls() {
    // Make minimise/maximise/restore/close buttons work when they are clicked
    document.getElementById('min-button').addEventListener("click", event => {
        win.minimize();
    });

    document.getElementById('max-button').addEventListener("click", event => {
        win.maximize();
    });

    document.getElementById('restore-button').addEventListener("click", event => {
        win.unmaximize();
    });

    document.getElementById('close-button').addEventListener("click", event => {
        win.close();
    });

    // Toggle maximise/restore buttons when maximisation/unmaximisation occurs
    toggleMaxRestoreButtons();
    win.on('maximize', toggleMaxRestoreButtons);
    win.on('unmaximize', toggleMaxRestoreButtons);

    function toggleMaxRestoreButtons() {
        if (win.isMaximized()) {
            document.body.classList.add('maximized');
        } else {
            document.body.classList.remove('maximized');
        }
    }
}

document.getElementById('importBtn').addEventListener("click", async () => {
    console.log("Clicked")
        const files = await dialog.showOpenDialog(mainWindow,{
            properties: ['openFile'],
        filters: [ { name: 'Video', extensions: ['mkv', 'avi', 'mp4'] }]
        });

        if(!files) return;
        
        var path = files.filePaths[0]
        edit.convertToAudio(path)
        

        
},false);



