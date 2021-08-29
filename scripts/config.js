Hooks.once('init', async function() {

});

Hooks.on("getSceneControlButtons",(controlButtons) => {
    const tileSort = Object.values(ui.windows).find(w => w.id === "tile-sort")
    if(tileSort && tileSort.rendered) tileSort.switchLayers();

    controlButtons.find(b => b.name === "tiles").tools.push(
        {
            name: "tile-sort",
            title: "Tile Sort",
            icon: "fas fa-sort-numeric-down-alt",
            button: true,
            onClick: () => {
                new TileSort().render(true);
            }
        }
    )
})

Hooks.on("canvasReady", () => {
    const tileSort = Object.values(ui.windows).find(w => w.id === "tile-sort")
    if(tileSort && tileSort.rendered) tileSort.loadTileList();
})

Hooks.on("createTile",() => {
    const tileSort = Object.values(ui.windows).find(w => w.id === "tile-sort")
    if(tileSort && tileSort.rendered) tileSort.loadTileList();
})

Hooks.on("deleteTile",() => {
    const tileSort = Object.values(ui.windows).find(w => w.id === "tile-sort")
    if(tileSort && tileSort.rendered) tileSort.loadTileList();
})

Hooks.on("levelsUiChangeLevel",() => {
    const tileSort = Object.values(ui.windows).find(w => w.id === "tile-sort")
    if(tileSort && tileSort.rendered) tileSort.loadTileList();
})

Hooks.on("controlTile",() => {
    const tileSort = Object.values(ui.windows).find(w => w.id === "tile-sort")
    if(tileSort && tileSort.rendered) tileSort.updateControlled();
})

Hooks.on("renderTileSort",(app,html) => {
    html.css({
        width: 200,
    })
    html.css({
        top: 2,
        left: $(window).width() - app.element.width() - $("#sidebar").width()-15,
       })
       app.position.top = 2;
       app.position.left = $(window).width() - app.element.width() - $("#sidebar").width()-15;
       app.position.width = 200;
})