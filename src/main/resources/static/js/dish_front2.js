$(document).ready(function () {
    $(".detailBtn").click(function () {
        $(this).parents(".dayDishCon").find(".dayDishDetail").toggle(100);
    });

    function randomNum(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    function getDish(recipeId, dishCon) {
        $(dishCon).find(".dayDishBar span").text(data.recipe[recipeId - 1].name);

        let recipeMaterialsR = $.grep(data.recipe_material_r, function (n) {
            return n.recipe_id === recipeId;
        });

        let materialMap = new Map();
        $.each(data.material, function (i, item) {
            materialMap.set(item.id, item.name);
        });

        $(dishCon).find(".dayDishDetail").empty();
        $.each(recipeMaterialsR, (i, item) => {
            let materialName = materialMap.get(item.material_id) + " " + item.num + "" + item.unit +
                ((item.remark === "" || item.remark === undefined) ? "" : " (" + item.remark + ")");
            let materialElem = $('<li class="material">' + materialName + '</li>');
            materialElem.data("originData", item);
            $(dishCon).find(".dayDishDetail").append(materialElem);
        });
    }

    $(".resetBtn").click(function () {
        let eleIndex = $(this).index(".resetBtn");
        let recipeId = randomNum(1, data.recipe.length);
        Cookies.set('dish_' + eleIndex, recipeId);
        getDish(recipeId, $(this).parents(".dayDishCon"));
    });

    $(".dayDishCon").each(function (i, item) {
        let recipeId = Cookies.get('dish_' + i);
        if (recipeId !== undefined) {
            getDish(recipeId, $(this));
        }
    });

});