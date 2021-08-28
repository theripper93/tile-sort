class TileSort extends Application {
  constructor() {
    super();
    this.layer = canvas.background;
  }

  static get defaultOptions() {
    return {
      ...super.defaultOptions,
      title: "Tile Sort",
      id: "tile-sort",
      template: `modules/tile-sort/templates/tile-sort.hbs`,
      resizable: true,
      dragDrop: [{ dragSelector: null, dropSelector: null }],
    };
  }

  activateListeners(html) {
    super.activateListeners(html);
    this.switchLayers();
    const el = html.find("#tile-list")[0];
    const _this = this;
    Sortable.create(el, {
      animation: 150,
      onChange: function (evt) {
        let updates = [];
        const length = _this.element.find("li").length;
        _this.element.find("li").each(function (index, element) {
          updates.push({
            _id: $(element).data("tileid"),
            z: 100 + length - index,
          });
        });
        console.log(updates);
        canvas.scene.updateEmbeddedDocuments("Tile", updates);
      },
    });
    html.on("mouseenter", ".tile-sort-item", function (event) {
      const tileId = $(this).data("tileid");
      _this.createHighlight(_this.layer.get(tileId));
      $(this).addClass("selected");
    });
    html.on("mouseleave", ".tile-sort-item", function (event) {
      const oldHighlight = canvas.controls.debug.children.find(
        (c) => c.name == "tilesorthighlight"
      );
      if (oldHighlight) oldHighlight.destroy();
    });
    this.loadTileList();
  }

  createHighlight(tile) {
    const oldHighlight = canvas.controls.debug.children.find(
      (c) => c.name == "tilesorthighlight"
    );
    if (oldHighlight) oldHighlight.destroy();
    let tileImg = tile.tile;
    if (!tileImg || !tileImg.texture.baseTexture) return;
    let sprite = new PIXI.Sprite.from(tileImg.texture);
    sprite.isSprite = true;
    sprite.width = tile.data.width;
    sprite.height = tile.data.height;
    sprite.position = tile.position;
    sprite.position.x += tileImg.x;
    sprite.position.y += tileImg.y;
    sprite.anchor = tileImg.anchor;
    sprite.angle = tileImg.angle;
    sprite.alpha = 0.5;
    sprite.tint = 0x00ff00;
    sprite.name = "tilesorthighlight";
    canvas.controls.debug.addChild(sprite);
  }

  switchLayers() {
    const oldLayer = this.layer.options.name;
    this.layer = canvas.foreground._active
      ? canvas.foreground
      : canvas.background;
    if (oldLayer !== this.layer.options.name) this.loadTileList();
  }

  loadTileList() {
    $("#tile-list").empty();
    let layer = this.layer.placeables
      .sort((a, b) => -a.data.z + b.data.z)
      .filter((p) => p.visible);
    console.log(layer);
    for (let tile of layer) {
      let $li = this.generateLi(tile);
      $("#tile-list").append($li);
    }
    const listHeight = $("#tile-list").height() +40;
    const maxH =
      $(window).height() -
      $("#tile-sort").offset().top -
      $("#tile-sort").height() -
      20;
    const minH = 100;
    if (listHeight < maxH && listHeight > minH) {
      this.element.css("height", listHeight);
      this.position.height = listHeight;
    } else if (listHeight > maxH) {
      this.element.css("height", maxH);
      this.position.height = maxH;
    } else if (listHeight < minH) {
      this.element.css("height", minH);
      this.position.height = minH;
    }
  }

  generateLi(tile) {
    const isVideo = tile.data.img.split(".").pop() == "webm";
    const $li = $(`
      <li class="tile-sort-item" data-tileid="${tile.id}">
      <div class="img-container">${
        isVideo ? "<video" : "<img"
      } class="tile-sort-img" autoplay loop src="${
      tile.data.img
    }" alt="${tile.data.img.split("/").pop()}">${
      isVideo ? "</video>" : ""
    }</div>
      <span class="tile-sort-name" title="${tile.data.img
        .split("/")
        .pop()}">${tile.data.img.split("/").pop()}</span>
      </li>
      `);
    return $li;
  }

  getData() {
    return {};
  }
}
