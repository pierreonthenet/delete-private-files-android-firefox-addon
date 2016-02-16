const Cc = Components.classes;
const Ci = Components.interfaces;
const Cu = Components.utils;

Cu.import("resource://gre/modules/FileUtils.jsm");
Cu.import("resource://gre/modules/Services.jsm");
 
function deleteFile(window) {
  var fileName = window.content.location.href;
  if(fileName.indexOf("file://")===0) {
  	fileName = fileName.substr(7,fileName.length);
  	fileName = decodeURIComponent(fileName);
  } else {
  	window.NativeWindow.toast.show("This isn't a file !", "short");
  }
  
  var sdcardProfileDir = Cc['@mozilla.org/file/local;1'].createInstance(Ci.nsILocalFile);
  sdcardProfileDir.initWithPath(fileName);

  if (sdcardProfileDir.exists()) {
    sdcardProfileDir.remove(true);
    window.NativeWindow.toast.show("Removed "+fileName, "short");
  } else {
  	window.NativeWindow.toast.show(fileName + " not existing", "short");
  }
}

var menuId;
 
function loadIntoWindow(window) {
  if (!window)
    return;
  menuId = window.NativeWindow.menu.add({
    name: "Delete file or folder",
    callback: function() {deleteFile(window);},
    parent: window.NativeWindow.menu.toolsMenuID
  });
}
 
function unloadFromWindow(window) {
  if (!window)
    return;
  window.NativeWindow.menu.remove(menuId);
}
 
var windowListener = {
  onOpenWindow: function(aWindow) {
    // Wait for the window to finish loading
    let domWindow = aWindow.QueryInterface(Ci.nsIInterfaceRequestor).getInterface(Ci.nsIDOMWindowInternal || Ci.nsIDOMWindow);
    domWindow.addEventListener("load", function() {
      domWindow.removeEventListener("load", arguments.callee, false);
      loadIntoWindow(domWindow);
    }, false);
  },
  
  onCloseWindow: function(aWindow) {},
  onWindowTitleChange: function(aWindow, aTitle) {}
};
 
function startup(aData, aReason) {
  let wm = Cc["@mozilla.org/appshell/window-mediator;1"].getService(Ci.nsIWindowMediator);
 
  // Load into any existing windows
  let windows = wm.getEnumerator("navigator:browser");
  while (windows.hasMoreElements()) {
    let domWindow = windows.getNext().QueryInterface(Ci.nsIDOMWindow);
    loadIntoWindow(domWindow);
  }
 
  // Load into any new windows
  wm.addListener(windowListener);
}
 
function shutdown(aData, aReason) {
  // When the application is shutting down we normally don't have to clean
  // up any UI changes made
  if (aReason == APP_SHUTDOWN)
    return;
 
  let wm = Cc["@mozilla.org/appshell/window-mediator;1"].getService(Ci.nsIWindowMediator);
 
  // Stop listening for new windows
  wm.removeListener(windowListener);
 
  // Unload from any existing windows
  let windows = wm.getEnumerator("navigator:browser");
  while (windows.hasMoreElements()) {
    let domWindow = windows.getNext().QueryInterface(Ci.nsIDOMWindow);
    unloadFromWindow(domWindow);
  }
}
 
function install(aData, aReason) {}
function uninstall(aData, aReason) {}
