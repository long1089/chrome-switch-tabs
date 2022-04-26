
function loadSetting() {
    console.log("loadSetting")
    chrome.storage.sync.get("setting", (data) => {
        let setting = Object.assign({switchLoop: false}, data.setting);
        $("#chkSwitchLoop").prop("checked", setting.switchLoop);
    });
}

function saveSetting() {
    console.log("saveSetting")
    let setting = {
        switchLoop: $("#chkSwitchLoop").prop("checked")
    }
    chrome.storage.sync.set({setting});
    chrome.runtime.sendMessage(setting);
}

$("#btnSubmit").click(function () {
    saveSetting();
})

loadSetting();
