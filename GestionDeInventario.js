/* Actividad 1: Gestión de inventario */
//1. Base de datos y colecciones:

/* use inventario */
db.createCollection("productos");
db.createCollection("almacenes");
/* 2. Datos de productos:*/
db.productos.insertMany([
    {
      "nombre": "Laptop Gamer",
      "descripcion": "Potente laptop para juegos con procesador Intel Core i7 y tarjeta gráfica NVIDIA GeForce RTX 3070.",
      "categoria": "electronica",
      "precio": 1500,
      "stock": 5,
      "idAlmacen": ObjectId('665e1ed91207c196b0780461')
    },
    {
      "nombre": "Camiseta casual",
      "descripcion": "Camiseta de algodón 100% con diseño estampado.",
      "categoria": "ropa",
      "precio": 30,
      "stock": 80,
      "idAlmacen": ObjectId('665e1ed91207c196b0780462')
    },
    {
      "nombre": "Mesa de oficina",
      "descripcion": "Mesa de madera con espacio para ordenador y cajones para almacenamiento.",
      "categoria": "hogar",
      "precio": 250,
      "stock": 15,
      "idAlmacen":ObjectId("665e1ed91207c196b0780463")
    },
    {
      "nombre": "Smartphone",
      "descripcion": "Smartphone con pantalla AMOLED, cámara triple y batería de larga duración.",
      "categoria": "electronica",
      "precio": 500,
      "stock": 20,
      "idAlmacen":ObjectId("665e1ed91207c196b0780461")
    },
    {
      "nombre": "Zapatillas deportivas",
      "descripcion": "Zapatillas deportivas cómodas y transpirables para correr o entrenar.",
      "categoria": "ropa",
      "precio": 80,
      "stock": 40,
      "idAlmacen": ObjectId("665e1ed91207c196b0780462")
    }
]);

db.almacenes.insertMany([
    {
      "nombre": "Almacén central",
      "ubicacion": "Calle Mayor 123, Santiago",
      "capacidad": 10000
    },
    {
      "nombre": "Almacén norte",
      "ubicacion": "Avenida Norte 500, Antofagasta",
      "capacidad": 5000
    },
    {
      "nombre": "Almacén sur",
      "ubicacion": "Calle Sur 200, Punta Arenas",
      "capacidad": 8000
    }
  ]);

/*   4. Consultas: */
/* a. Encuentra todos los productos de una categoría específica (ej. electrónica). */
db.productos.find({"categoria":"electronica"})
/* b. Encuentra los productos con un precio superior a un monto determinado. */
db.productos.find({precio:{$gt: 80}})
/* c. Obtiene el stock total de un producto específico en todos los almacenes.*/
db.productos.aggregate([
  {
    $lookup: {
      from: "almacenes",
      localField: "idAlmacen",
      foreignField: "_id",
      as: "almacenes"
    }
  },
  {
    $unwind: "$almacenes"
  },
  {
    $match: {
      "nombre": "Camiseta casual" 
    }
  },
  {
    $group: {
      _id: "$nombre",
      stockTotal: { $sum: "$almacenes.stock" }
    }
  }
])
/* d. Encuentra el almacén con mayor capacidad de almacenamiento disponible.*/
db.almacenes.find().sort({capacidad: -1}).limit(1);
/* e. Muestra una lista de todos los productos junto con el nombre del almacén donde se encuentran disponibles. */
db.productos.aggregate([
  {
    $lookup: {
      from: "almacenes",
      localField: "idAlmacen",
      foreignField: "_id",
      as: "almacenes"
    }
  },
  {
    $unwind: "$almacenes"
  },
  {
    $project: {
      nombre: "$nombre",
      almacenes: "$almacenes.nombre"
    }
  }
])