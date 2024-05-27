//EJERCICIO 1

/* El método "createCollection" se utiliza para crear 
una nueva colección en la base de datos */

db.createCollection("Empleado");
db.createCollection("Departamento");
db.createCollection("Proyecto");
db.createCollection("Asignado");

//=====================================
//EJERCICIO 2

// DATOS DE DEPARTAMENTO

/* El método "insertMany" se utiliza para ingresar 
múltiples documentos en una colección */
/* El método "insertOne" se utiliza para insertar 
un único documento en una colección */

db.Departamento.insertMany([
    {
        "dep_cod":1,
        "dep_nombre":"Ventas"
    },
    {
        "dep_cod":2,
        "dep_nombre":"Administracion"
    },
    {
        "dep_cod":3,
        "dep_nombre":"Produccion"
    }
]);
// DATOS DE Proyecto

/* Para ingresar fechas, utilizamos "new Date". Presta atención al formato:
new Date("YY-MM-DD") o new Date(YY, MM, DD) */

db.Proyecto.insertMany([
    {
    "pro_cod": 1,
    "pro_nombre": "PROYECTO 1",
    "pro_fecha_ini":new Date("2005-04-01"),
    "pro_fecha_fin":new Date("2008-04-01"),
    "pro_ubicacion":"SANTIAGO",
    "pro_estado":"C"
   },
   {
    "pro_cod": 2,
    "pro_nombre": "PROYECTO 2",
    "pro_fecha_ini":new Date("2005-10-01"),
    "pro_fecha_fin":new Date("2008-10-01"),
    "pro_ubicacion":"SANTIAGO",
    "pro_estado":"C"
   },
   {
    "pro_cod": 3,
    "pro_nombre": "PROYECTO 3",
    "pro_fecha_ini":new Date("2006-01-01"),
    "pro_fecha_fin":new Date("2009-06-01"),
    "pro_ubicacion":"SANTIAGO",
    "pro_estado":"C"
   },
   {
    "pro_cod": 4,
    "pro_nombre": "PROYECTO 4",
    "pro_fecha_ini":new Date("2008-01-01"),
    "pro_fecha_fin":new Date("2011-04-01"),
    "pro_ubicacion":"SANTIAGO",
    "pro_estado":"A"
   },
   {
    "pro_cod": 5,
    "pro_nombre": "PROYECTO 5",
    "pro_fecha_ini":new Date("2008-05-01"),
    "pro_fecha_fin":new Date("2011-05-01"),
    "pro_ubicacion":"SANTIAGO",
    "pro_estado":"A"
   },
   {
    "pro_cod": 6,
    "pro_nombre": "PROYECTO 6",
    "pro_fecha_ini":new Date("2008-11-01"),
    "pro_fecha_fin":new Date("2011-11-01"),
    "pro_ubicacion":"SANTIAGO",
    "pro_estado":"A"
   },
   {
    "pro_cod": 7,
    "pro_nombre": "PROYECTO 7",
    "pro_fecha_ini":new Date("2009-01-01"),
    "pro_fecha_fin":new Date("2012-01-01"),
    "pro_ubicacion":"SANTIAGO",
    "pro_estado":"A"
   },
   {
    "pro_cod": 8,
    "pro_nombre": "PROYECTO 8",
    "pro_fecha_ini":new Date("2009-06-01"),
    "pro_fecha_fin":new Date("2012-06-01"),
    "pro_ubicacion":"SANTIAGO",
    "pro_estado":"A"
   },
   {
    "pro_cod": 9,
    "pro_nombre": "PROYECTO 9",
    "pro_fecha_ini":new Date("2010-04-01"),
    "pro_fecha_fin":new Date("2013-11-01"),
    "pro_ubicacion":"CALAMA",
    "pro_estado":"A"
   },
   {
    "pro_cod": 10,
    "pro_nombre": "PROYECTO 10",
    "pro_fecha_ini":new Date("2010-04-01"),
    "pro_fecha_fin":new Date("2013-11-01"),
    "pro_ubicacion":"RANCAGUA",
    "pro_estado":"A"
   }
]);
// Empleado
db.Empleado.insertMany([
    {
        "emp_cod": 1,
        "emp_nombre": "JUAN",
        "emp_apellido": "SOTO",
        "emp_fecha_cont": new Date("2005-02-10"),
        "emp_sueldo": 800,
        "dep_cod": 3
    },
    {
        "emp_cod": 2,
        "emp_nombre": "JOSE",
        "emp_apellido": "SANCHEZ",
        "emp_fecha_cont": new Date("2005-02-20"),
        "emp_sueldo": 1100,
        "dep_cod": 2
    },
    {
        "emp_cod": 3,
        "emp_nombre": "JUANA",
        "emp_apellido": "TORRES",
        "emp_fecha_cont": new Date("2005-02-10"),
        "emp_sueldo": 1400,
        "dep_cod": 1
    },
    {
        "emp_cod": 4,
        "emp_nombre": "LUIS",
        "emp_apellido": "QUINTERO",
        "emp_fecha_cont": new Date("2006-04-01"),
        "emp_sueldo": 1100,
        "dep_cod": 3
    },
    {
        "emp_cod": 5,
        "emp_nombre": "GINA",
        "emp_apellido": "OLIVERO",
        "emp_fecha_cont": new Date("2007-08-01"),
        "emp_sueldo": 800,
        "dep_cod": 1
    },
    {
        "emp_cod": 6,
        "emp_nombre": "MARBEL",
        "emp_apellido": "VALENCIA",
        "emp_fecha_cont": new Date("2009-02-01"),
        "emp_sueldo": 1000,
        "dep_cod": 2
    },
    {
        "emp_cod": 7,
        "emp_nombre": "FERNANDO",
        "emp_apellido": "VALENCIA",
        "emp_fecha_cont": new Date("2009-02-01"),
        "emp_sueldo": 1300,
        "dep_cod": 3
    },
    {
        "emp_cod": 8,
        "emp_nombre": "LILIANA",
        "emp_apellido": "ARAYA",
        "emp_fecha_cont": new Date("2010-03-01"),
        "emp_sueldo": 1300,
        "dep_cod": 3
    },
    {
        "emp_cod": 9,
        "emp_nombre": "JOANNA",
        "emp_apellido": "GONZALEZ",
        "emp_fecha_cont": new Date("2010-03-01"),
        "emp_sueldo": 1300,
        "dep_cod": 3
    }
]);
// ASIGNACION
db. Asignado.insertMany([
    {
        "emp_cod": 1,
        "pro_cod": 1 ,
        "asi_fecha_ini":new Date( "2005-04-01"),
        "asi_fecha_fin": new Date("2008-04-01"),
        "asi_estado":"N" ,
    },
    {
        "emp_cod":4,
        "pro_cod": 2 ,
        "asi_fecha_ini":new Date("2005-10-01"),
        "asi_fecha_fin": new Date("2008-10-01"),
        "asi_estado":"N" ,
    },
    {
        "emp_cod": 1,
        "pro_cod": 3 ,
        "asi_fecha_ini":new Date( "2006-01-01"),
        "asi_fecha_fin": new Date("2009-06-01"),
        "asi_estado":"N" ,
    },
    {
        "emp_cod": 4,
        "pro_cod": 4 ,
        "asi_fecha_ini":new Date( "2008-01-01"),
        "asi_fecha_fin": new Date("2011-01-01"),
        "asi_estado":"v" ,
    },
    {
        "emp_cod": 1,
        "pro_cod": 5 ,
        "asi_fecha_ini":new Date( "2008-05-01"),
        "asi_fecha_fin": new Date("2011-05-01"),
        "asi_estado":"v" ,
    },
    {
        "emp_cod": 4,
        "pro_cod": 6 ,
        "asi_fecha_ini":new Date( "2008-11-01"),
        "asi_fecha_fin": new Date("2011-01-01"),
        "asi_estado":"v" ,
    },
    {
        "emp_cod": 1,
        "pro_cod": 7 ,
        "asi_fecha_ini":new Date( "2009-01-01"),
        "asi_fecha_fin": new Date("2012-06-01"),
        "asi_estado":"v" ,
    },
    {
        "emp_cod": 4,
        "pro_cod": 8 ,
        "asi_fecha_ini":new Date( "2009-06-01"),
        "asi_fecha_fin": new Date("2012-06-01"),
        "asi_estado":"v" ,
    },
    {
        "emp_cod": 7,
        "pro_cod": 9 ,
        "asi_fecha_ini":new Date( "2010-04-01"),
        "asi_fecha_fin": new Date("2013-11-01"),
        "asi_estado":"v" ,
    },
    {
        "emp_cod": 8,
        "pro_cod": 10 ,
        "asi_fecha_ini":new Date( "2010-04-01"),
        "asi_fecha_fin": new Date("2013-11-01"),
        "asi_estado":"v" ,
    },
    {
        "emp_cod": 9,
        "pro_cod": 4 ,
        "asi_fecha_ini":new Date( "2010-04-01"),
        "asi_fecha_fin": new Date("2011-12-01"),
        "asi_estado":"v" ,
    },
    {
        "emp_cod": 9,
        "pro_cod": 5 ,
        "asi_fecha_ini":new Date( "2010-04-01"),
        "asi_fecha_fin": new Date("2011-12-01"),
        "asi_estado":"v" ,
    },
]);
    
//================================================================

// EJERCICIOS 3 
//3.1) Listar los datos de la colección empleado

/* El método "find()" se utiliza para recuperar los documentos de una colección */
db.Empleado.find()

//3.2) Listar solo el nombre de la colección empleado.

/* Con el método "find()" podemos recuperar datos.
La primera llave vacía {} indica que no estamos proporcionando ningún criterio de búsqueda.
La segunda llave {} especifica qué campos queremos traer en los resultados.
Para seleccionar campos, utilizamos valores booleanos: true (1) o false (0).
Si no especificamos un campo como verdadero, se traerán todos los campos por defecto. */

db.Empleado.find({},{"emp_nombre":true}) 

//3.3) Listar el nombre, apellido y nombre del departamento de los empleados.
// Usamos "aggregate" para unir colecciones y realizar otras operaciones
// El operador "$lookup" se utiliza para establecer conexiones entre colecciones
// El operador "$project" se utiliza para especificar qué campos deseamos mostrar
// Para seleccionar campos, utilizamos valores booleanos: true (1) o false (0)
db.Empleado.aggregate([
    {
      $lookup: {
        from: "Departamento",
        localField: "dep_cod",
        foreignField: "dep_cod",
        as: "departamento"
      }
    },
    {
      $project: {
        _id: 0,
        emp_nombre: 1,
        emp_apellido: 1,
        "departamento.dep_nombre": 1
      }
    }
]);

//3.4) Listar el nombre y apellido de los empleados que tengan un sueldo mayor o igual 900.
// Como mencionamos anteriormente, la primera llave se utiliza para colocar un criterio de búsqueda.
// Existen operadores que nos ayudan en la búsqueda de estos criterios:
// $eq: Compara si los valores son iguales.
// $ne: Compara si los valores no son iguales.
// $gt: Compara si un valor es mayor que otro.
// $gte: Compara si un valor es mayor o igual a otro.
// $lt: Compara si un valor es menor que otro.
// $lte: Compara si un valor es menor o igual a otro.
// $in: Verifica si un valor está dentro de un arreglo.

// Otros operadores importantes:
// $group: Agrupa documentos según un campo específico.
// $project: Proyecta campos específicos en los resultados.
// $lookup: Realiza una unión entre colecciones.
// $match: Filtra documentos según un criterio.

db.Empleado.find(
    { emp_sueldo: { $gte: 900 } }, 
    { 
        _id: 0, 
        emp_nombre: 1,
        emp_apellido: 1 
    }
);
//=================================================================
//EJERCICIO 4
db.Asignado.aggregate([
    {
        $lookup:{
            from:"Empleado",
            localField:"emp_cod",
            foreignField:"emp_cod",
            as:"Empleado"
        },
    },
    {
        $lookup:{
            from:"Proyecto",
            localField:"pro_cod",
            foreignField:"pro_cod",
            as:"Proyecto"
        }
    },
    {
        $project:{
            _id: 0,
            "Empleado.emp_nombre": 1,
            "Proyecto.pro_nombre": 1
        }
    }
]);