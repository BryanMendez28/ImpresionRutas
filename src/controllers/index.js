
exports.getRuta = (req, res) => {

    const { fechaInicio, fechaFin, ruta } = req.query;

    req.getConnection((err, conn) => {
        if (err) return res.send(err);


        conn.query(`     
        select A.Id, B.Zona , A.Fecha, C.Nombre, A.empleado_id, A.chofer_id, D.Nombre     from ruta A
        inner join tiporuta B ON A.TipoRuta_Id = B.Id
        inner join empleado C ON A.empleado_id = C.Id
        inner join empleado D ON A.chofer_id = D.Id 
        Where A.Fecha between ? and ?
        AND B.Zona like ? `, [fechaInicio, fechaFin, ruta], (err, result) => {
            if (err) return res.send(err);
            res.send(result);

        })
    }

    )
}
