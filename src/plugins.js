async function getPlugins() {
    return await cat.getPlugins().result;
}

console.log(getPlugins())