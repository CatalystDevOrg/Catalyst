fetch("../package.json") 
    .then(response => response.json()) 
    .then(data =>
        function() {
            version = data.version;
            url = `https://api.github.com/repos/jaydendev/catalyst/releases/tags/${data.version}`;
            fetch(url)
            .then(res => res.json())
            .then(res => { 
                const desc = document.getElementById('desc');
                desc.innerHTML = marked.parse(res.body);
                });
            });

function getVerDisp() {
    fetch("../package.json") 
    .then(response => response.json()) 
    .then(data =>
        document.querySelector('#ver').innerText = data.version,
    )
}