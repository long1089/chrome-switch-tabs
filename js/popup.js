chrome.storage.sync.get("setting", ({ setting }) => {
  if(setting){
    document.querySelector("#switchLoop").innerText = `Switch loop is ${setting.switchLoop?"on":"off"}`
  }
});
