# delete-private-files-android-firefox-addon
Add-on for Firefox for Android that allows you to delete files and folders in Firefox's "data" folder.


This add-on was done in order to allow Firefox user to delete some files and folders in the "data" folder of Firefox for non-rooted Android devices.

How to install :
1. download the 2 files "bootstrap.js" and "install.rdf" and move it in a specific folder ("delete-private-files"), you can also download this through the "Download" button on top of this page
2. make a ZIP of this folder (pay attention : the ZIP file MUST only contain this two files, and not its parent(s) folder(s))
3. change this ZIP file extension to XPI (delete-private-files.zip => delete-private-files.xpi)
4. copy this XPI file to your android device
5. open the XPI file with Firefox (let say you have the file in your sdcard folder, you can access this folder with Firefox at the URL file:///sdcard/, you can then click on the XPI file)
6. install the add-on


How to use :
1. go to file:///data/data/org.mozilla.firefox/files/mozilla/
2. navigate through the folders in order to find a folder or a file to delete
3. open the Firefox menu, click on "Delete file or folder" in Tools sub-menu

/!\ WARNING /!\
There is NO confirmation box !
The element that was displayed is deleted immediatly !
If you were displaying a folder, its entire content will be removed !
To delete a file, you must display it in the tab that will be used to delete it. For exemple, to delete the "profiles.ini" file in /data/data/org.mozilla.firefox/files/mozilla/ (that I would not delete if I were you, this is just an exemple), you MUST HAVE this URL in the address bar : file:///data/data/org.mozilla.firefox/files/mozilla/profiles.ini

Last (but not least), this add-on is EXPERIMENTAL and you use it at your own risk !
/!\ /WARNING /!\

Add-on is available at : https://addons.mozilla.org/en-US/android/addon/delete-data-files/
