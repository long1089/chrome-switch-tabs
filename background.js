let setting = {switchLoop: false};

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({setting});
    console.log('Default setting is', JSON.stringify(setting));
});

chrome.runtime.onMessage.addListener(
    function (request) {
        console.log(request)
        if (request)
            setting = Object.assign(setting, request);
    }
);

chrome.commands.onCommand.addListener((command) => {
    console.log(`Command: ${command}`);
    if (command === 'switch-left-tab') {
        switchLeftTab();
    } else if (command === 'switch-right-tab') {
        switchRightTab();
    }
});

async function switchLeftTab() {
    let tabs = await chrome.tabs.query({});
    let index = tabs.findIndex(((value, index) => value.active))
    if (index > 0) {
        await chrome.tabs.update(tabs[index - 1].id, {active: true, highlighted: true})
    } else if (setting.switchLoop && index === 0 && tabs.length > 1) {
        await chrome.tabs.update(tabs[tabs.length - 1].id, {active: true, highlighted: true})
    }
}

async function switchRightTab() {
    let tabs = await chrome.tabs.query({});
    let index = tabs.findIndex(((value, index) => value.active))
    if (index < tabs.length - 1) {
        await chrome.tabs.update(tabs[index + 1].id, {active: true, highlighted: true})
    } else if (setting.switchLoop && index === tabs.length - 1 && tabs.length > 1) {
        await chrome.tabs.update(tabs[0].id, {active: true, highlighted: true})
    }
}
