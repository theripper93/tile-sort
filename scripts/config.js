Hooks.once('ready', async function() {
    if(!game.user.isGM) return;
    libWrapper.register("tile-sort", "Tile.prototype.isVisible", function refresh(wrapped, ...args) {
        return wrapped(...args) && !this.tileSortHidden;
    },"WRAPPER")
});

Hooks.on("getSceneControlButtons",(controlButtons) => {
    controlButtons.find(b => b.name === "tiles").tools.push(
        {
            name: "tile-sort",
            title: "Tile Sort",
            icon: "fas fa-sort-numeric-down-alt",
            button: true,
            onClick: () => {
                const tileSort = Object.values(ui.windows).find(w => w.id === "tile-sort")
                if(!tileSort?.rendered) new TileSort().render(true);
            }
        }
    )
}) 

Hooks.on("renderSceneControls",(controlButtons) => {
    const tileSort = Object.values(ui.windows).find(w => w.id === "tile-sort")
    if(tileSort && tileSort.rendered) tileSort.switchLayers();
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
    if (tileSort && tileSort.rendered) {
        tileSort.switchLayers();
        tileSort.loadTileList();
    }
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