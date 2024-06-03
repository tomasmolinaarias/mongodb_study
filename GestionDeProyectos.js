/* Actividad 3: Gestión de proyectos
1. Colecciones de empleados y proyectos:

Crea una colección llamada "empleados" e inserta documentos con los campos:

id: Identificador único (MongoDB lo genera automáticamente)
nombre: Nombre completo del empleado
puesto: Cargo que desempeña el empleado en la empresa
salario: Salario mensual del empleado
Crea otra colección llamada "proyectos" e inserta documentos con los campos:

id: Identificador único (MongoDB lo genera automáticamente)
nombre: Nombre del proyecto
descripcion: Breve descripción del proyecto
fecha_inicio: Fecha de inicio del proyecto
fecha_fin: Fecha estimada de finalización del proyecto
gerente_asignado: Identificador del empleado asignado como gerente del proyecto (referencia a la colección "empleados")
2. Asignación de recursos:

Registra la asignación de empleados a proyectos específicos. Puedes agregar un campo "miembros" a la colección "proyectos" para almacenar un array



share


more_vert
*/

db.createCollection("empleados");
db.createCollection("proyectos");

db.empleados.insertMany([
    {
      _id: ObjectId("665e2afdd85f5ee237f1b658"),
      nombre: "María González",
      puesto: "Diseñadora",
      salario: 2800000
    },
    {
      _id: ObjectId("665e2afdd85f5ee237f1b657"),
      nombre: "Pedro Rodríguez",
      puesto: "Analista de datos",
      salario: 3200000
    },
    {
        _id: ObjectId("665e2afdd85f5ee237f1b656"),
        nombre: "Juan Pérez",
        puesto: "Desarrollador",
        salario: 3500000
    },
    {
        _id: ObjectId("665e2afdd85f5ee237f1b655"),
        nombre: "Luis Pérez",
        puesto: "Gerente",
        salario: 6500000
    }
]);

db.proyectos.insertMany([
    {
        nombre: "Desarrollo de aplicación web",
        descripcion: "Aplicación web para gestionar clientes y proyectos",
        fecha_inicio: new Date("2024-06-03"),
        fecha_fin: new Date("2024-12-31"),
        gerente_asignado: ObjectId("665e2afdd85f5ee237f1b655")
    },
    {
        nombre: "Diseño de sitio web",
        descripcion: "Rediseño del sitio web de la empresa para mejorar la experiencia del usuario",
        fecha_inicio: new Date("2024-06-05"),
        fecha_fin: new Date("2024-08-15"),
        gerente_asignado: ObjectId("665e2afdd85f5ee237f1b655")
    },
    {
        nombre: "Análisis de datos de marketing",
        descripcion: "Análisis de las campañas de marketing para identificar áreas de mejora",
        fecha_inicio: new Date("2024-06-04"),
        fecha_fin: new Date("2024-07-31"),
        gerente_asignado: ObjectId("665e2afdd85f5ee237f1b655")
    }
]);
db.proyectos.updateOne(
    { nombre: "Desarrollo de aplicación web" },
    { $push: { miembros: ObjectId("665e2afdd85f5ee237f1b657") } }
);

db.proyectos.updateOne(
    { nombre: "Diseño de sitio web" },
    { $push: { miembros: ObjectId("665e2afdd85f5ee237f1b656") } }
);

db.proyectos.updateOne(
    { nombre: "Análisis de datos de marketing" },
    { $push: { miembros: ObjectId("665e2afdd85f5ee237f1b655") } }
);
db.proyectos.aggregate([
    {
      $lookup: {
        from: "empleados",
        localField: "gerente_asignado",
        foreignField: "_id",
        as: "gerente"
      }
    },
    {
      $lookup: {
        from: "empleados",
        localField: "miembros",
        foreignField: "_id",
        as: "miembros"
      }
    },
    {
      $unwind: "$gerente"
    },
    {
      $unwind: "$miembros"
    },
    {
      $project: {
        nombreProyecto: "$nombre",
        nombreGerente: "$gerente.nombre",
        nombreMiembro: "$miembros.nombre"
      }
    }
  ]).pretty();
  