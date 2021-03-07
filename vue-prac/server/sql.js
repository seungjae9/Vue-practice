module.exports = {
    productList : {
        query: `select t1.*, t2.path, t3.category1, t3.category2, t3.category3 
        from t_product t1, t_image t2, t_category t3
        where t1.id = t2.product_id and t2.type = 1 and t1.category_id = t3.id`
    },
    // 제품 디테일 페이지의 데이터는 엥간하면 쿼리 2~3개 파서 따로따로 하는게 좋다. 그게 성능면에서도 좋고, 데이터 불러오면서 쓸때도 괜찮다고 한다.(또한, 화면 로딩을 분산해서 가져오기때문에 좋다(디테일 페이지는 비동기 방식으로 데이터 가져오기))
    productDetail: {
        query: `SELECT t1.*, t2.path, t3.category1, t3.category2, t3.category3 
        FROM t_product t1, t_image t2, t_category t3 
        WHERE t1.id = ? AND t1.id = t2.product_id AND t2.type = 3 AND t1.category_id = t3.id`
    },
    productMainImage: {
        query: `SELECT * FROM t_image WHERE product_id = ? AND TYPE = 2`
    },
    productInsert: {
        query: `INSERT INTO t_product (product_name, product_price, delivery_price, add_delivery_price, tags, outbound_days, seller_id, category_id)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
    },
    productImageInsert: {
        query: `INSERT INTO t_image (product_id, type, path)
        VALUES (?, ?, ?)`
    },
    sellerList : {
        query: `select * from t_seller`
    }
} 