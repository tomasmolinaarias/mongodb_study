//COLECCIONES
db.createCollection("cliente");
db.createCollection("ciudad");
//===================================
db.cliente.insertMany([
    {    
        id_cliente: 100, 
        nombre: "SERGIO", 
        cantidad: 20, 
        id_ciudad: 10
    },    
    {
        id_cliente: 200, 
        nombre: "FERNANDO", 
        cantidad:10, 
        id_ciudad: 20
    },
    {
        id_cliente: 300, 
        nombre: "ANA", 
        cantidad:15, 
        id_ciudad: 30
    },
    {
        id_cliente: 400, 
        nombre: "JOSE", 
        cantidad:5, 
        id_ciudad: 30
    },
    {
        id_cliente: 500, 
        nombre: "JOSEFA", 
        cantidad:15, 
        id_ciudad: 10
    },
    {
        id_cliente: 600, 
        nombre: "LUIS", 
        cantidad:15, 
        id_ciudad: 20
    }
]);

db.ciudad.insertMany([
    {
        id_ciudad: 10,
        ciudad: "RANCAGUA"
    },
    {
        id_ciudad: 20, 
        ciudad: "SANTIAGO"
    },
    {
      id_ciudad: 30,
       ciudad: "TALCA"
    }
]);

//==============<< $unwind y $group >>====================
// El operador $unwind se aplica al campo “Ciudad” (que es un arreglo debido a la unión anterior).
// Descompone el arreglo de ciudades en documentos individuales, creando un documento por cada ciudad en lugar de un arreglo de ciudades en cada documento.

// el operador $group Agrupa los documentos según el campo “_id” (que en este caso es el nombre de la ciudad).
// Calcula la suma total de la cantidad (campo “cantidad”) para cada ciudad utilizando el operador $sum.

db.cliente.aggregate(

    {
        $lookup: {
            from: "ciudad",
            localField: "id_ciudad",  
            foreignField: "id_ciudad",
            as: "Ciudad"
        }
    },
    {
        $project:{
            nombre:true,
            Ciudad:{ciudad:true}
        }
    }
);

db.cliente.aggregate(
    {$lookup:{
            from: "ciudad",
            localField: "id_ciudad",  
            foreignField: "id_ciudad",
            as: "Ciudad"
        }
    },
    {$unwind:"$Ciudad"},
    {$project:{
            nombre:true,
            Ciudad:{ciudad:true}
        }
    }
);

//==============<< Operadores contable >>====================
db.cliente.aggregate(
    {
        $lookup: {
            from: "ciudad",
            localField: "id_ciudad",  
            foreignField: "id_ciudad",
            as: "Ciudad"
        }
    },
    {$unwind:"$Ciudad"},

    {$group: {
        _id:"$id_ciudad"    
        }
    }
);

//==============<< $sum >>====================
//El operador $sum se utiliza para calcular la suma de valores numéricos en un grupo de documentos.
//Por ejemplo, si tienes una colección de ventas y deseas encontrar la suma total de los ingresos de todas las ventas

db.cliente.aggregate(
    {$lookup: {
            from: "ciudad",
            localField: "id_ciudad",  
            foreignField: "id_ciudad",
            as: "Ciudad"
        }
    },
    {$unwind:"$Ciudad"},
    {$group: {
        _id:"$Ciudad.ciudad",
        total:{$sum:1}
          }
    }, 
    {$project:{
        _id:false,
        Ciudad:"$_id",
        total:true
        }
    }
);

db.cliente.aggregate(
    {$lookup: {
            from: "ciudad",
            localField: "id_ciudad",  
            foreignField: "id_ciudad",
            as: "Ciudad"
        }
    },
    {$unwind:"$Ciudad"},
    {$group: {
            _id:"$Ciudad.ciudad",
            total_cantidad:{$sum: "$cantidad"}
        }
    }, 
    {$project:{
            _id:false,
            Ciudad:"$_id",
            total_cantidad:true
        }
    }
);
//==============<< $min >>====================
// El operador $min devuelve el valor mínimo dentro de un grupo de documentos.
// Por ejemplo, si tienes una colección de productos y deseas encontrar el precio más bajo de todos los productos.

db.cliente.aggregate(
    {$lookup: {
            from: "ciudad",
            localField: "id_ciudad",  
            foreignField: "id_ciudad",
            as: "Ciudad"
        }
    },
    {$unwind:"$Ciudad"},
    {$group: {
            _id:"$Ciudad.ciudad",
            cantidad_min:{$min: "$cantidad"}
        }
    }, 
    {$project:{
            _id:false,
            Ciudad:"$_id",
            cantidad_min:true
        }
    }
);
//==============<< $max >>====================
// El operador $max devuelve el valor máximo dentro de un grupo de documentos.
// Siguiendo el ejemplo anterior, si deseas encontrar el precio más alto de todos los productos.

db.cliente.aggregate(
    {$lookup: {
            from: "ciudad",
            localField: "id_ciudad",  
            foreignField: "id_ciudad",
            as: "Ciudad"
        }
    },
    {$unwind:"$Ciudad"},
    {$group: {
            _id:"$Ciudad.ciudad",
            cantidad_max:{$max: "$cantidad"}
        }
    }, 
    {$project:{
            _id:false,
            Ciudad:"$_id",
            cantidad_max:true
        }
    }
);
//==============<< $avg >>====================
// El operador $avg calcula el promedio de valores numéricos en un grupo de documentos.
// Por ejemplo, si tienes una colección de calificaciones de estudiantes y deseas encontrar el promedio de todas las calificaciones.

db.cliente.aggregate(
    {$lookup: {
            from: "ciudad",
            localField: "id_ciudad",  
            foreignField: "id_ciudad",
            as: "Ciudad"
        }
    },
    {$unwind:"$Ciudad"},
    {$group: {
            _id:"$Ciudad.ciudad",
            cantidad_prom:{$avg: "$cantidad"}
        }
    }, 
    {$project:{
            _id:false,
            Ciudad:"$_id",
            cantidad_prom:true
        }
    }
);

//===================<< EJERCICIOS CON LA COLECCION DE 6mayo.js >>==============================

//1) Mostrar el nombre del departamento y el total de empleados de cada uno de ellos.

db.Empleado.aggregate([
    {
        $lookup: {
            from: "Departamento",
            localField: "dep_cod",
            foreignField: "dep_cod",
            as: "Departamento"
        }
    },
    {$unwind: "$Departamento"},
    {
        $group: {
            _id: "$Departamento.dep_nombre",
            total_cantidad: { $sum: 1 }
        }
    },
    {
        $project: {
            _id: false,
            dep_nombre: "$_id",
            total_cantidad: true
        }
    }
]);

//2)  Mostrar el nombre del departamento y la sumatoria de sus sueldos.

db.Empleado.aggregate([
    {
        $lookup: {
            from: "Departamento",
            localField: "dep_cod",
            foreignField: "dep_cod",
            as: "Departamento"
        }
    },
    {$unwind: "$Departamento"},
    {
        $group: {
            _id: "$Departamento.dep_nombre",
            total_cantidad: { $sum: "$emp_sueldo" }
        }
    },
    {
        $project: {
            _id: false,
            dep_nombre: "$_id",
            total_cantidad: true
        }
    }
]);

//3) Mostrar el nombre del departamento junto con el sueldo minimo de cada uno de ellos.

db.Empleado.aggregate([
    {
        $lookup: {
            from: "Departamento",
            localField: "dep_cod",
            foreignField: "dep_cod",
            as: "Departamento"
        }
    },
    {$unwind: "$Departamento"},
    {
        $group: {
            _id: "$Departamento.dep_nombre",
            sueldo_minimo: { $min: "$emp_sueldo" }
        }
    },
    {
        $project: {
            _id: false,
            dep_nombre: "$_id",
            sueldo_minimo: true
        }
    }
]);

//4)  Mostrar el nombre del departamento junto con el sueldo maximo de cada uno de ellos.

db.Empleado.aggregate([
    {
        $lookup: {
            from: "Departamento",
            localField: "dep_cod",
            foreignField: "dep_cod",
            as: "Departamento"
        }
    },
    {$unwind: "$Departamento"},
    {
        $group: {
            _id: "$Departamento.dep_nombre",
            sueldo_maximo: { $max: "$emp_sueldo" }
        }
    },
    {
        $project: {
            _id: false,
            dep_nombre: "$_id",
            sueldo_maximo: true
        }
    }
]);

//5) Mostrar el nombre del departamento junto con el promedio de sueldo de cada uno de ellos.

db.Empleado.aggregate([
    {
        $lookup: {
            from: "Departamento",
            localField: "dep_cod",
            foreignField: "dep_cod",
            as: "Departamento"
        }
    },
    {$unwind: "$Departamento"},
    {
        $group: {
            _id: "$Departamento.dep_nombre",
            sueldo_promedio: { $avg: "$emp_sueldo" }
        }
    },
    {
        $project: {
            _id: false,
            dep_nombre: "$_id",
            sueldo_promedio: true
        }
    }
]);

//6) Mostrar el nombre del departamento junto con la fecha del primer empleado contratado en cada departamento.
// $first: Devuelve el primer valor encontrado en un grupo. Por ejemplo, si estás agrupando documentos por un campo específico, $first te dará el valor de ese campo del primer documento dentro del grupo.

db.Empleado.aggregate([
    {
        $lookup: {
            from: "Departamento",
            localField: "dep_cod",
            foreignField: "dep_cod",
            as: "Departamento"
        }
    },
    {$unwind: "$Departamento"},
    {
        $group: {
            _id: "$Departamento.dep_nombre",
            fecha_primer_empleado: { $min: "$emp_fecha_cont" },
            nombre_empleado: {$first: "$emp_nombre"}
        }
    },
    {
        $project: {
            _id: false,
            dep_nombre: "$_id",
            nombre_empleado: true,
            fecha_primer_empleado: true
        }
    }
]);