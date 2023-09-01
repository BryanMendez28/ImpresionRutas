const { format } = require('date-fns');

exports.getRuta = (req, res) => {
  const { fechaInicio, fechaFin, ruta } = req.query;

  req.getConnection((err, conn) => {
    if (err) return res.send(err);

    conn.query(
      `
      SELECT A.Id, B.Zona, A.Fecha, C.Nombre, A.empleado_id, A.chofer_id, D.Nombre
      FROM ruta A
      INNER JOIN tiporuta B ON A.TipoRuta_Id = B.Id
      INNER JOIN empleado C ON A.empleado_id = C.Id
      INNER JOIN empleado D ON A.chofer_id = D.Id 
      WHERE A.Fecha BETWEEN ? AND ?
      AND B.Zona LIKE ?
      `,
      [fechaInicio, fechaFin, ruta],
      (err, result) => {
        if (err) return res.send(err);

        // Formatea la fecha antes de enviarla al frontend
        const formattedResult = result.map((item) => ({
          ...item,
          Fecha: format(new Date(item.Fecha), 'yyyy-MM-dd'),
        }));

        res.send(formattedResult);
      }
    );
  });
};
