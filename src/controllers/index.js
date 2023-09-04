exports.getRuta = (req, res) => {
    const { fechaInicio, fechaFin, ruta } = req.query;
  
    req.getConnection((err, conn) => {
      if (err) return res.send(err);
  
      let sqlQuery = '';
  
      if (fechaInicio && fechaFin && ruta) {
        // Si se proporcionan fechaInicio, fechaFin y ruta, realizar la consulta con filtros
        sqlQuery = `
          SELECT A.Id, B.Zona, A.Fecha, C.Nombre as Operador, A.empleado_id, A.chofer_id, D.Nombre as Chofer
          FROM ruta A
          LEFT JOIN tiporuta B ON A.TipoRuta_Id = B.Id
          LEFT JOIN empleado C ON A.empleado_id = C.Id
          LEFT JOIN empleado D ON A.chofer_id = D.Id 
          WHERE A.Fecha BETWEEN ? AND ?
          AND B.Zona LIKE ?;
        `;
  
        conn.query(sqlQuery, [fechaInicio, fechaFin, ruta], (err, result) => {
          if (err) return res.send(err);
          res.send(result);
        });
      } else {
        // Si no se proporcionan filtros, realizar la consulta para la fecha actual
        sqlQuery = `
          SELECT A.Id, B.Zona, A.Fecha, C.Nombre as Operador, A.empleado_id, A.chofer_id, D.Nombre as Chofer
          FROM ruta A
          left JOIN tiporuta B ON A.TipoRuta_Id = B.Id
          left JOIN empleado C ON A.empleado_id = C.Id
          left JOIN empleado D ON A.chofer_id = D.Id
          WHERE A.Fecha = CURDATE();
        `;
  
        conn.query(sqlQuery, (err, result) => {
          if (err) return res.send(err);
          res.send(result);
        });
      }
    });
  };
  

  exports.getRutas = (req, res) => {
    req.getConnection((err, conn) => {
      if (err) return res.send(err);
  
      const query = 'SELECT Zona FROM tiporuta;';
  
      conn.query(query, (err, result) => {
        if (err) return res.send(err);
  
        // Extrae las opciones de ruta de la consulta y devuelve como respuesta
        const rutas = result.map((row) => row.Zona);
        res.send(rutas);
      });
    });
  };
  