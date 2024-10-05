$(document).ready(function () {
    $("#tags").autocomplete({
        source: $.map(data.material, function (item) {
            return {label: item.name, value: item.name, id: item.id};
        }),
        select: function (event, ui) {
            $(".allDishCon").empty();
            let rmr = $.grep(data.recipe_material_r, function (item) {
                return item.material_id === ui.item.id;
            });

            let recipeIds = $.map(rmr, function (item) {
                return item.recipe_id;
            });

            $.each(recipeIds, function (index, value) {
                $(".allDishCon").append('<div class="dishCon">\n' +
                    '            <div class="dishBar">\n' +
                    '                <span>' + getDishName(value) + '</span>\n' +
                    '                <button class="detailBtn">展开</button>\n' +
                    '            </div>\n' +
                    '            <div class="dishDetail">\n' + getDishDetail(value) +
                    '            </div>\n' +
                    '        </div>')
            });
        }
    });

    function getDishName(id) {
        let dish = $.grep(data.recipe, function (item) {
            return item.id === id;
        });
        return dish[0].name;
    }

    function getDishDetail(recipeId) {
        let recipeMaterialsR = $.grep(data.recipe_material_r, function (n) {
            return n.recipe_id === recipeId;
        });

        let materialMap = new Map();
        $.each(data.material, function (i, item) {
            materialMap.set(item.id, item.name);
        });

        let materialStr = "";
        $.each(recipeMaterialsR, (i, item) => {
            let materialName = materialMap.get(item.material_id) + " " + item.num + "" + item.unit +
                ((item.remark === "" || item.remark === undefined) ? "" : " (" + item.remark + ")");
            materialStr += '<li class="material">' + materialName + '</li>';
        });
        return materialStr;
    }

    $(".allDishCon").on("click", ".detailBtn", function () {
        $(this).parents(".dishCon").find(".dishDetail").toggle(100);
    });


});