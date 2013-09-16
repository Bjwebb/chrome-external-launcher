document.getElementById('dostuff').addEventListener('click',function(){
    chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
        var plugin = document.getElementById("simpleGetPluginId");
        var sg = plugin.SimpleGetPlugin();
        var url = tabs[0].url;
        sg.callApplication('/usr/bin/firefox', url);
    });
    return false;
},false);
