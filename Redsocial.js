/* use redSocial */
db.createCollection("usuarios");
db.createCollection("publicaciones");
db.createCollection("comentarios");
db.createCollection("seguidos");


db.usuarios.insertMany([{
    nombre: "Juan Pérez",
    correo_electronico: "juan.perez@example.com",
    fecha_registro: new Date("2023-10-04")
  },{
    nombre: "victor Pérez",
    correo_electronico: "victor.perez@example.com",
    fecha_registro: new Date("2017-10-04")
  }]);

  db.publicaciones.insertMany([{
    autor_id: ObjectId("665e23321207c196b0780469"),
    titulo: "Mi primera publicación",
    cuerpo: "Esta es mi primera publicación en la red social.",
    fecha_publicacion: new Date("2023-06-03")
  },{
    autor_id: ObjectId("665e23321207c196b078046a"),
    titulo: "Mi primera publicación",
    cuerpo: "Esta es mi primera publicación en la red social.",
    fecha_publicacion: new Date("2018-06-03")
  }])
  
/*   2. Interacciones entre usuarios:

  Registra un "me gusta" en una publicación específica por parte de un usuario. Puedes agregar un campo "me_gusta" a la colección "publicaciones" y actualizarlo con el identificador del usuario que le dio "me gusta".
  Agrega comentarios a las publicaciones. Puedes crear una colección "comentarios" con campos como:
  id: Identificador único (MongoDB lo genera automáticamente)
  publicacion_id: Identificador de la publicación a la que pertenece el comentario (referencia a la colección "publicaciones")
  autor_id: Identificador del usuario que escribió el comentario (referencia a la colección "usuarios")
  contenido: Texto del comentario */

  db.publicaciones.updateOne({
    _id: ObjectId("665e23a31207c196b078046b") 
  }, {
    $push: {
      me_gusta: ObjectId("665e23321207c196b078046a")
    }
  });
  db.publicaciones.updateOne({
    _id: ObjectId("665e23a31207c196b078046c") 
  }, {
    $push: {
      me_gusta: ObjectId("665e23321207c196b0780469")
    }
  });

  db.comentarios.insertMany([{
    publicacion_id: ObjectId("665e23a31207c196b078046b"),
    autor_id: ObjectId("665e23321207c196b078046a"),
    contenido: "¡Me gusta mucho esta publicación!"
  },{
    publicacion_id: ObjectId("665e23a31207c196b078046c"),
    autor_id: ObjectId("665e23321207c196b0780469"),
    contenido: "¡Me gusta mucho esta publicación!"
  }]);
  
/*   3. Consultas: */

//a. Encuentra todos los usuarios que han publicado al menos una publicación.
db.publicaciones.aggregate([
    {
      $group: {
        _id: "$autor_id",
        publicaciones: { $sum: 1 }
      }
    },
    {
      $match: { publicaciones: { $gt: 0 } }
    }
  ]);
//b. Obtiene las publicaciones más recientes de un usuario específico.
db.publicaciones.find({ autor_id: ObjectId("665e23321207c196b0780469") }).sort({ fecha_publicacion: -1 }).limit(3);
//c. Muestra las publicaciones con mayor cantidad de "me gusta".
db.publicaciones.aggregate([
    {
      $unwind: "$me_gusta"
    },
    {
      $group: {
        _id: "$_id",
        me_gusta_count: { $sum: 1 }
      }
    },
    {
      $sort: { me_gusta_count: -1 }
    },
    {
      $limit: 3
    }
  ]);
//d. Encuentra usuarios que han seguido a otro usuario específico. Puedes crear una colección "seguidos" para registrar estas relaciones.
db.seguidos.insertMany([
    { seguidor_id: ObjectId("665e23321207c196b078046a"), seguido_id: ObjectId("665e23321207c196b0780469") },
    { seguidor_id: ObjectId("665e23321207c196b0780469"), seguido_id: ObjectId("665e23321207c196b078046a") }
  ]);
db.seguidos.find({ seguidor_id: ObjectId("665e23321207c196b0780469") });
//e. Muestra el perfil de un usuario, incluyendo su información personal, sus publicaciones y la cantidad de seguidores.
db.usuarios.aggregate([
    {
      $match: { _id: ObjectId("665e23321207c196b078046a") }
    },
    {
      $lookup: {
        from: "publicaciones",
        localField: "_id",
        foreignField: "autor_id",
        as: "publicaciones"
      }
    },
    {
      $lookup: {
        from: "seguidos",
        localField: "_id",
        foreignField: "seguidor_id",
        as: "seguidores"
      }
    },
    {
      $project: {
        nombre: 1,
        correo_electronico: 1,
        fecha_registro: 1,
        publicaciones: 1,
        seguidores: { $size: "$seguidores" }
      }
    }
  ]);