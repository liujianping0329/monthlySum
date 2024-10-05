$.postJSON = function (url, data, callback) {
    return $.ajax({
        url: url,
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
        dataType: 'json',
        success: callback
    });
};
let data = {
    "recipe": [{"id": 1, "name": "麻婆茄子"}, {"id": 2, "name": "麻婆豆腐四川"}, {
        "id": 3,
        "name": "麻婆豆腐广东"
    }, {"id": 4, "name": "青椒肉丝"}, {"id": 5, "name": "棒棒鸡"}, {"id": 6, "name": "黑醋醋猪"}, {
        "id": 7,
        "name": "醋猪"
    }, {"id": 8, "name": "回锅肉"}, {"id": 9, "name": "猪肉豆芽"}, {"id": 10, "name": "八宝菜"}, {
        "id": 11,
        "name": "干烧虾仁"
    }, {"id": 12, "name": "四川式回锅肉"}, {"id": 13, "name": "猪肉黑醋炒"}, {
        "id": 14,
        "name": "白菜奶油煮"
    }, {"id": 15, "name": "甘口麻婆茄子"}, {"id": 16, "name": "广东五目饭"}, {
        "id": 17,
        "name": "上海甘辛猪饭"
    }, {"id": 18, "name": "四川辛鸡饭"}, {"id": 19, "name": "极麻辣麻婆豆腐"}],
    "material": [{"id": 1, "name": "茄子"}, {"id": 2, "name": "ピーマン"}, {"id": 3, "name": "胡萝卜"}, {
        "id": 4,
        "name": "猪绞肉"
    }, {"id": 5, "name": "豆腐"}, {"id": 6, "name": "葱"}, {"id": 7, "name": "牛肉薄切り"}, {
        "id": 8,
        "name": "水煮たけのこ"
    }, {"id": 9, "name": "片栗粉"}, {"id": 10, "name": "鶏もも肉"}, {"id": 11, "name": "きゅうり"}, {
        "id": 12,
        "name": "豚肉"
    }, {"id": 13, "name": "卵"}, {"id": 14, "name": "塩・こしょう"}, {"id": 15, "name": "たまねぎ"}, {
        "id": 16,
        "name": "生しいたけ（または干ししいたけ）"
    }, {"id": 17, "name": "キャベツ"}, {"id": 18, "name": "もやし"}, {"id": 19, "name": "にら"}, {
        "id": 20,
        "name": "白菜"
    }, {"id": 21, "name": "いか"}, {"id": 22, "name": "えび（むきえび）"}, {
        "id": 23,
        "name": "ぶなしめじ"
    }, {"id": 24, "name": "水"}, {"id": 25, "name": "チンゲン菜"}],
    "recipe_material_r": [{
        "id": 1,
        "recipe_id": 1,
        "material_id": 1,
        "num": 5,
        "unit": "个",
        "remark": "約350g"
    }, {"id": 2, "recipe_id": 1, "material_id": 2, "num": 2, "unit": "个", "remark": "約40g"}, {
        "id": 3,
        "recipe_id": 1,
        "material_id": 3,
        "num": 0.25,
        "unit": "个",
        "remark": "約50g"
    }, {"id": 4, "recipe_id": 1, "material_id": 4, "num": 120, "unit": "g", "remark": ""}, {
        "id": 5,
        "recipe_id": 2,
        "material_id": 4,
        "num": 80,
        "unit": "g",
        "remark": ""
    }, {"id": 6, "recipe_id": 2, "material_id": 5, "num": 1, "unit": "丁", "remark": "約350～400g"}, {
        "id": 7,
        "recipe_id": 2,
        "material_id": 6,
        "num": 0.3,
        "unit": "本",
        "remark": "約30g"
    }, {"id": 8, "recipe_id": 3, "material_id": 4, "num": 80, "unit": "g", "remark": ""}, {
        "id": 9,
        "recipe_id": 3,
        "material_id": 5,
        "num": 1,
        "unit": "丁",
        "remark": "約350～400g"
    }, {"id": 10, "recipe_id": 3, "material_id": 6, "num": 0.3, "unit": "本", "remark": "約30g"}, {
        "id": 11,
        "recipe_id": 4,
        "material_id": 7,
        "num": 150,
        "unit": "g",
        "remark": ""
    }, {"id": 12, "recipe_id": 4, "material_id": 2, "num": 6, "unit": "个", "remark": "約130g"}, {
        "id": 13,
        "recipe_id": 4,
        "material_id": 8,
        "num": 150,
        "unit": "g",
        "remark": ""
    }, {"id": 14, "recipe_id": 4, "material_id": 9, "num": 1, "unit": "大さじ1", "remark": ""}, {
        "id": 15,
        "recipe_id": 5,
        "material_id": 10,
        "num": 0.5,
        "unit": "枚",
        "remark": "約130g"
    }, {"id": 16, "recipe_id": 5, "material_id": 11, "num": 1, "unit": "本", "remark": "約100g"}, {
        "id": 17,
        "recipe_id": 6,
        "material_id": 12,
        "num": 250,
        "unit": "g",
        "remark": "豚肩ロースまたは豚バラなど、トンカツ用の豚肉でも可"
    }, {"id": 18, "recipe_id": 6, "material_id": 13, "num": 0.5, "unit": "个", "remark": ""}, {
        "id": 19,
        "recipe_id": 6,
        "material_id": 9,
        "num": 2,
        "unit": "大さじ",
        "remark": ""
    }, {"id": 20, "recipe_id": 6, "material_id": 14, "num": 1, "unit": "g", "remark": "少々"}, {
        "id": 21,
        "recipe_id": 6,
        "material_id": 15,
        "num": 0.5,
        "unit": "个",
        "remark": "約100g"
    }, {"id": 22, "recipe_id": 6, "material_id": 2, "num": 2, "unit": "个", "remark": "約40g"}, {
        "id": 23,
        "recipe_id": 7,
        "material_id": 12,
        "num": 250,
        "unit": "g",
        "remark": "もも肉"
    }, {"id": 24, "recipe_id": 7, "material_id": 15, "num": 0.5, "unit": "个", "remark": "約150g"}, {
        "id": 25,
        "recipe_id": 7,
        "material_id": 2,
        "num": 2,
        "unit": "个",
        "remark": "約40g"
    }, {"id": 26, "recipe_id": 7, "material_id": 3, "num": 0.25, "unit": "个", "remark": "約50g"}, {
        "id": 27,
        "recipe_id": 7,
        "material_id": 13,
        "num": 0.5,
        "unit": "个",
        "remark": ""
    }, {"id": 28, "recipe_id": 7, "material_id": 16, "num": 3, "unit": "枚", "remark": ""}, {
        "id": 29,
        "recipe_id": 7,
        "material_id": 9,
        "num": 2,
        "unit": "大さじ",
        "remark": ""
    }, {"id": 30, "recipe_id": 7, "material_id": 14, "num": 1, "unit": "g", "remark": "少々"}, {
        "id": 31,
        "recipe_id": 8,
        "material_id": 12,
        "num": 200,
        "unit": "g",
        "remark": "バラ薄切り"
    }, {"id": 32, "recipe_id": 8, "material_id": 2, "num": 2, "unit": "个", "remark": "約40g"}, {
        "id": 33,
        "recipe_id": 8,
        "material_id": 17,
        "num": 0.25,
        "unit": "个",
        "remark": "約300g"
    }, {"id": 34, "recipe_id": 8, "material_id": 6, "num": 0.5, "unit": "本", "remark": "約40g"}, {
        "id": 35,
        "recipe_id": 9,
        "material_id": 12,
        "num": 200,
        "unit": "g",
        "remark": "ロース薄切り"
    }, {"id": 36, "recipe_id": 9, "material_id": 18, "num": 1, "unit": "袋", "remark": "約200～250g"}, {
        "id": 37,
        "recipe_id": 9,
        "material_id": 19,
        "num": 1,
        "unit": "束",
        "remark": "約100g"
    }, {"id": 38, "recipe_id": 9, "material_id": 9, "num": 1, "unit": "大さじ", "remark": ""}, {
        "id": 39,
        "recipe_id": 10,
        "material_id": 12,
        "num": 100,
        "unit": "g",
        "remark": "バラ薄切り"
    }, {"id": 40, "recipe_id": 10, "material_id": 20, "num": 250, "unit": "g", "remark": "葉2～3枚程度"}, {
        "id": 41,
        "recipe_id": 10,
        "material_id": 3,
        "num": 0.16,
        "unit": "本",
        "remark": "約30g"
    }, {"id": 42, "recipe_id": 10, "material_id": 16, "num": 3, "unit": "枚", "remark": "約40g"}, {
        "id": 43,
        "recipe_id": 10,
        "material_id": 21,
        "num": 50,
        "unit": "g",
        "remark": "中サイズ半分"
    }, {"id": 44, "recipe_id": 10, "material_id": 22, "num": 6, "unit": "尾", "remark": "約50g"}, {
        "id": 45,
        "recipe_id": 11,
        "material_id": 22,
        "num": 250,
        "unit": "g",
        "remark": "から付きの場合は16～20尾（約300g）"
    }, {"id": 46, "recipe_id": 11, "material_id": 6, "num": 0.3, "unit": "本", "remark": "約30g"}, {
        "id": 47,
        "recipe_id": 11,
        "material_id": 9,
        "num": 1,
        "unit": "大さじ",
        "remark": ""
    }, {"id": 48, "recipe_id": 12, "material_id": 12, "num": 250, "unit": "g", "remark": "バラ薄切り"}, {
        "id": 49,
        "recipe_id": 12,
        "material_id": 17,
        "num": 0.16,
        "unit": "个",
        "remark": "約200g"
    }, {"id": 50, "recipe_id": 12, "material_id": 6, "num": 0.5, "unit": "本", "remark": "約40g"}, {
        "id": 51,
        "recipe_id": 13,
        "material_id": 12,
        "num": 250,
        "unit": "g",
        "remark": "バラ薄切り"
    }, {"id": 52, "recipe_id": 13, "material_id": 2, "num": 3, "unit": "个", "remark": "約60g"}, {
        "id": 53,
        "recipe_id": 13,
        "material_id": 6,
        "num": 1,
        "unit": "本",
        "remark": "約100g"
    }, {
        "id": 54,
        "recipe_id": 14,
        "material_id": 20,
        "num": 0.125,
        "unit": "株",
        "remark": "約350g，キャベツ1/4（300g）でも可"
    }, {"id": 55, "recipe_id": 14, "material_id": 10, "num": 150, "unit": "g", "remark": ""}, {
        "id": 56,
        "recipe_id": 14,
        "material_id": 23,
        "num": 0.5,
        "unit": "パック",
        "remark": "約50g，またはしいたけ…中5枚"
    }, {"id": 57, "recipe_id": 14, "material_id": 24, "num": 1, "unit": "カップ", "remark": "200㎖"}, {
        "id": 58,
        "recipe_id": 15,
        "material_id": 4,
        "num": 120,
        "unit": "g",
        "remark": ""
    }, {"id": 59, "recipe_id": 15, "material_id": 1, "num": 5, "unit": "个", "remark": "約350g"}, {
        "id": 60,
        "recipe_id": 15,
        "material_id": 2,
        "num": 2,
        "unit": "个",
        "remark": "約40g"
    }, {"id": 61, "recipe_id": 15, "material_id": 3, "num": 0.25, "unit": "本", "remark": "約50g"}, {
        "id": 62,
        "recipe_id": 15,
        "material_id": 6,
        "num": 0.3,
        "unit": "本",
        "remark": "約30g"
    }, {"id": 63, "recipe_id": 16, "material_id": 12, "num": 100, "unit": "g", "remark": "バラ薄切り"}, {
        "id": 64,
        "recipe_id": 16,
        "material_id": 22,
        "num": 12,
        "unit": "尾",
        "remark": "約100g"
    }, {"id": 65, "recipe_id": 16, "material_id": 25, "num": 1, "unit": "株", "remark": "約100g"}, {
        "id": 66,
        "recipe_id": 16,
        "material_id": 3,
        "num": 0.16,
        "unit": "本",
        "remark": "約30g"
    }, {"id": 67, "recipe_id": 16, "material_id": 16, "num": 3, "unit": "枚", "remark": "約40g"}, {
        "id": 68,
        "recipe_id": 17,
        "material_id": 12,
        "num": 3,
        "unit": "枚",
        "remark": "約300g，ロースとんかつ用肉"
    }, {"id": 69, "recipe_id": 17, "material_id": 25, "num": 3, "unit": "株", "remark": "約300g"}, {
        "id": 70,
        "recipe_id": 17,
        "material_id": 16,
        "num": 3,
        "unit": "枚",
        "remark": "約40g"
    }, {"id": 71, "recipe_id": 18, "material_id": 10, "num": 1, "unit": "枚", "remark": "約250g"}, {
        "id": 72,
        "recipe_id": 18,
        "material_id": 2,
        "num": 2,
        "unit": "个",
        "remark": "約40g"
    }, {"id": 73, "recipe_id": 18, "material_id": 15, "num": 0.5, "unit": "个", "remark": "約100g"}, {
        "id": 74,
        "recipe_id": 18,
        "material_id": 9,
        "num": 1,
        "unit": "小さじ",
        "remark": ""
    }, {"id": 75, "recipe_id": 19, "material_id": 4, "num": 100, "unit": "g", "remark": ""}, {
        "id": 76,
        "recipe_id": 19,
        "material_id": 5,
        "num": 1,
        "unit": "丁",
        "remark": "約350～400g"
    }, {"id": 77, "recipe_id": 19, "material_id": 6, "num": 0.3, "unit": "本", "remark": "約30g"}]
};