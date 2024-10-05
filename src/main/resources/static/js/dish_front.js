$(document).ready(function () {
    function randomNum(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    $("button").eq(0).button().click(function () {
        genDish();
    }).end().eq(1).button().click(function () {
        $("#toolBar").nextAll(".dish").remove();
        genDish();
    });

    function genDish() {
        let startEle;
        if ($("#toolBar").nextAll(".dish").length === 0) {
            startEle = $("#toolBar");
        } else {
            startEle = $(".dish").last();
        }
        startEle.after($("#hiddenData #dishHtml").html())
        let recipeId = randomNum(1, data.recipe.length);
        let lastDish = $(".dish").last();
        lastDish.find(".dishName").text(data.recipe[recipeId - 1].name);

        let recipeMaterialsR = $.grep(data.recipe_material_r, function (n) {
            return n.recipe_id === recipeId;
        });

        let materialMap = new Map();
        $.each(data.material, function (i, item) {
            materialMap.set(item.id, item.name);
        });

        $.each(recipeMaterialsR, function (i, item) {
            let materialName = materialMap.get(item.material_id) + " " + item.num + "" + item.unit +
                ((item.remark === "" || item.remark === undefined) ? "" : " (" + item.remark + ")");
            let materialElem = $('<li class="material">' + materialName + '</li>');
            materialElem.data("originData", item);
            lastDish.find(".materials").find(".materialContainer").append(materialElem);
        });
    }

    genDish();


});