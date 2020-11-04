const router = require('express').Router();
const multerS3 = require('multer-s3');
const multer = require('multer');
const aws = require('aws-sdk');
const S3_BUCKET = process.env.Bucket;
const s3 = new aws.S3();

// AWS config
aws.config.update({
  accessKeyId: process.env.AWSAccessKeyId,
  secretAccessKey: process.env.AWSSecretKey,
});

// upload image setup
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: S3_BUCKET,
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      const fileName = `${Date.now().toString()}-${file.originalname}`;
      const path = `product-images/${fileName}`;
      cb(null, path);
    },
  }),
});

const addNewProduct = function (item, db) {
  const queryString = `INSERT INTO products (title, description, image_url, price, sale_id, category_id, seller_id ) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING*;`;

  const valueArray = [
    item.title,
    item.description,
    item.image_url,
    item.price,
    item.sale_id,
    item.category_id,
    item.seller_id,
  ];

  return db.query(queryString, valueArray);
};

const removeComma = (updateQuery) => {
  return updateQuery.replace(/,(\s+)?$/, '');
};

const editProduct = function (queryValues, id, db) {
  const { title, description, image_url, price } = queryValues;
  const queryParams = [];
  let updateQuery = `UPDATE products SET `;

  if (title) {
    queryParams.push(title);
    updateQuery += `title = $${queryParams.length}, `;
  }
  if (description) {
    queryParams.push(description);
    updateQuery += `description = $${queryParams.length}, `;
  }
  if (image_url) {
    queryParams.push(image_url);
    updateQuery += `image_url = $${queryParams.length}, `;
  }
  if (price) {
    queryParams.push(price);
    updateQuery += `price = $${queryParams.length}, `;
  }

  updateQuery = removeComma(updateQuery);

  if (id) {
    queryParams.push(id);
    updateQuery += `WHERE id = $${queryParams.length} RETURNING *;`;
  }

  console.log('updateQuery:', updateQuery);

  return db.query(updateQuery, queryParams);
};

const getAllCategoriesForSale = (saleId, db) => {
  const searchQuery = `
    SELECT *
    FROM categories
      JOIN products ON products.category_id = categories.id
      JOIN garage_sales ON garage_sales.id = products.sale_id
    WHERE garage_sales.id = $1;`;

  return db.query(searchQuery, [saleId]);
};
module.exports = (db) => {
  router.get('/:id', (req, res) => {
    // change req.params to find correct id
    db.query(`SELECT * FROM products WHERE sale_id = $1;`, req.params.id)
      .then((data) => {
        const listOfProducts = data.rows;
        res.json({ listOfProducts });
      })
      .catch((err) =>
        res.status(500).json({ message: 'Failed to load product' })
      );
  });

  router.get('/:id', (req, res) => {
    const productId = req.params.id;
    const queryString = `
    SELECT garage_sales.title, users.username, users.phone, products.*
    FROM products
    JOIN garage_sales ON garage_sales.id = sale_id
    JOIN users ON garage_sales.id = users.id
    WHERE products.id = $1;`;

    db.query(queryString, [productId])
      .then((data) => {
        const product = data.rows;
        res.json({ product });
      })
      .catch((err) =>
        res.status(500).json({ message: 'Failed to load product' })
      );
  });

  // Get all categories for  specific sale
  router.get('/categories/:saleId', async (req, res) => {
    const saleId = req.params.saleId;
    try {
      const { rows: categories } = await getAllCategoriesForSale(saleId, db);

      res.json({ categories });
    } catch (e) {
      res.status(500).json({ message: 'Failed to fetch categories', error: e });
    }
  });

  //Filter items by category
  router.get('/category/:name/:saleId', (req, res) => {
    db.query(
      `
    SELECT  
        products.id as product_id, 
        products.title as product_title, 
        products.image_url, 
        products.price, 
        products.sold, 
        products.description, 
        products.seller_id
    FROM products
      JOIN categories ON categories.id = category_id
      JOIN garage_sales ON garage_sales.id = sale_id
    WHERE categories.name = $1 AND garage_sales.id = $2;
    `,
      [req.params.name, req.params.saleId]
    )
      .then((data) => {
        const listOfProducts = data.rows;
        console.log('data.rows', data.rows);
        res.json({ listOfProducts });
      })
      .catch((err) =>
        res.status(500).json({ message: 'Failed to fetch categories' })
      );
  });

  router.post('/new', upload.single('productImg'), (req, res) => {
    const parseBodyValues = JSON.parse(JSON.stringify(req.body));
    const getCategoryIdByName = (name) => {
      const ids = {
        Electronics: 2,
        Furniture: 3,
        Apparels: 4,
        Books: 5,
        Toys: 6,
        Media: 7,
        Appliances: 8,
        Clothes: 9,
        Tools: 10,
        Others: 11,
      };
      return ids[name];
    };

    const { categoryName } = parseBodyValues;
    const formFieldValues = {
      ...parseBodyValues,
      image_url: req.file.location,
      category_id: getCategoryIdByName(categoryName),
    };

    console.log('formFieldValues', formFieldValues);

    addNewProduct(formFieldValues, db)
      .then(({ rows }) => {
        const newProduct = {
          ...rows[0],
          product_id: rows[0].id,
        };
        return res.json({
          message: 'New item is added to your Garage!',
          product: newProduct,
        });
      })
      .catch((err) => {
        console.log(err.message);
        return res
          .status(500)
          .json({ error: err.message, message: 'Failed add item' });
      });
  });

  router.put('/edit/:id', upload.single('productImg'), (req, res) => {
    const parseBodyValues = JSON.parse(JSON.stringify(req.body));
    let formFieldValues = {};

    if (req.file) {
      formFieldValues = {
        ...parseBodyValues,
        image_url: req.file.location,
      };
    } else {
      formFieldValues = {
        ...parseBodyValues,
      };
    }
    const productId = req.params.id;

    editProduct(formFieldValues, productId, db)
      .then(({ rows }) => {
        return res.json({
          message: 'Item information is updated!',
          product: rows[0],
        });
      })
      .catch((err) => {
        console.log(err.message);
        return res.status(500).json({ error: err.message });
      });
  });

  router.put('/sold/:id', (req, res) => {
    const query = `UPDATE products SET sold=TRUE WHERE id = $1 RETURNING*;`;
    db.query(query, [req.params.id])
      .then(({ rows }) => {
        return res.json({
          message: 'Product is sold Out!',
          product: rows[0],
        });
      })
      .catch((err) => {
        res.json({ error: err });
      });
  });

  router.delete('/delete/:id', (req, res) => {
    const query = 'DELETE FROM products WHERE id = $1;';
    db.query(query, [req.params.id])
      .then(() => {
        res.json({
          message: 'Product is deleted!',
          product: {},
        });
      })
      .catch((err) => {
        res.json({ error: err });
      });
  });

  return router;
};
