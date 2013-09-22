var commands = [];

function drawRow(command, i) {
    var tr = document.createElement('tr');
    tr.appendChild(document.createElement('td')).appendChild(document.createTextNode(command.name));
    tr.appendChild(document.createElement('td')).appendChild(document.createTextNode(command.command));
    var a = document.createElement('a')
    tr.appendChild(document.createElement('td')).appendChild(a)
    a.setAttribute('href', '#')
    a.appendChild(document.createTextNode('Delete'))
    a.addEventListener('click', function(){
        commands.splice(i,1);
        chrome.storage.sync.set({'commands':commands}, function() {});
        document.getElementById('tbody').innerHTML = '';
        for (var i=0; i<commands.length; i++) {
            drawRow(commands[i], i);
        }
    });
    document.getElementById('tbody').appendChild(tr);
}

chrome.storage.sync.get('commands', function (items) {
    if (items.commands !== undefined) commands = items.commands;
    for (var i=0; i<commands.length; i++) {
        drawRow(commands[i], i);
    }
});

window.onload = function() {
    document.getElementById('add').onsubmit = function() {
        var command = {
            'name':this.name.value,
            'command':this.command.value
        };
        drawRow(command, commands.length);
        commands.push(command);
        chrome.storage.sync.set({'commands':commands}, function() {});
        return false;
    };
};
