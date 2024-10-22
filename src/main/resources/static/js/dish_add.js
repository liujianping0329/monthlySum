$(document).ready(function () {
    const getCurrentTimestamp = () => {
        const now = new Date();
        return [
            String(now.getFullYear()).slice(-2),
            String(now.getMonth() + 1).padStart(2, '0'),
            String(now.getDate()).padStart(2, '0'),
            String(now.getHours()).padStart(2, '0'),
            String(now.getMinutes()).padStart(2, '0'),
            String(now.getSeconds()).padStart(2, '0')
        ].join('');
    };

    let autoCompleteConfig = {
        source: $.map(data.material, function (item) {
            return {label: item.name, value: item.name, id: item.id};
        }),
        select: function (event, ui) {
            $(this).data("materialId", ui.item.id);
        }
    };
    $(".material").filter(':visible').autocomplete(autoCompleteConfig);

    $("#addMaterial").click(function () {
        let newMaterialRow = $("#hiddenData #materialRowHtml").clone();
        $(".materialRow").eq(-1).after(newMaterialRow);

        newMaterialRow.find("span").text($(".materialRow").length - 1 + ".");
        newMaterialRow.find(".material").autocomplete(autoCompleteConfig);
    });

    $("#removeMaterial").click(function () {
        if ($(".materialRow").filter(':visible').length === 1) {
            alert("至少要有一个原料！")
            return;
        }
        $(".materialRow").eq(-1).remove();
    });

    $("#resBtn").click(function () {
        let errMsg = [];
        if (!$("#dishName")[0].checkValidity()) {
            errMsg.push("菜名不能为空！");
        }
        $.each($(".materialRow").filter(':visible'), function (index, row) {
            if (!$(row).find(".material")[0].checkValidity()) {
                errMsg.push("第" + (index + 1) + "行原料不能为空！");
            }
        });
        if (errMsg.length > 0) {
            alert(errMsg.join("\n"));
            return;
        }

        let recipe = [];
        let material = [];
        let recipe_material_r = [];
        let time = getCurrentTimestamp();
        let recipeIdSeq = Number(time + "");
        let materialIdSeq = Number(time + "01");
        let recipe_material_rIdSeq = Number(time + "01");

        recipe.push({
            id: recipeIdSeq,
            name: $("#dishName").val()
        });

        $.each($(".materialRow").filter(':visible'), function (index, row) {
            let materialId = $(row).find(".material").data("materialId");
            if (materialId == null) {
                materialId = materialIdSeq++;
                material.push({
                    id: materialId,
                    name: $(row).find(".material").val()
                });
            }
            recipe_material_r.push({
                id: recipe_material_rIdSeq++,
                recipe_id: recipeIdSeq,
                material_id: materialId,
                num: $(row).find(".amount").val(),
                unit: $(row).find(".unit").val(),
                remark: $(row).find(".remark").val()
            });
        });

        let ans = "recipe:\n";
        ans += recipe[0].id + "\t" + recipe[0].name + "\n";
        ans += "\n";
        ans += "material:\n";
        $.each(material, function (index, item) {
            ans += item.id + "\t" + item.name + "\n";
        });
        ans += "\n";
        ans += "recipe_material_r:\n";
        $.each(recipe_material_r, function (index, item) {
            ans += item.id + "\t" + item.recipe_id + "\t" + item.material_id + "\t" + item.num + "\t" + item.unit + "\t" + item.remark + "\n";
        });
        $("#result").val(ans);
        navigator.clipboard.writeText(ans);
    });

});