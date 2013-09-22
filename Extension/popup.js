chrome.storage.sync.get('commands', function (items) {
    var commands = items.commands;
    for (var i=0; i<commands.length; i++) {
        var command = commands[i];
        var div = document.createElement('div');
        var a = document.createElement('a')
        a.appendChild(document.createTextNode(command.name));
        a.setAttribute('href', '#')
        a.addEventListener('click', function() {
            chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
                var plugin = document.getElementById("simpleGetPluginId");
                var sg = plugin.SimpleGetPlugin();
                var url = tabs[0].url;
                sg.callApplication(command.command, url);
            });
            return false;
        },false);
        div.appendChild(a) 
        document.getElementById('commandLinks').appendChild(div);
    }
});
