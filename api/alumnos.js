const express = require('express');
const router = express.Router();
const alumnos = require('../models/Alumno');

//GET /alumnos
router.get('/', function (req, res) {
  res.json(alumnos)
});

//GET /alumnos/{matricula}
router.get('/:matricula', function(req, res)  {
  const found = alumnos.some(alumno => alumno.matricula === req.params.matricula);

  if (found) {
    res.json(alumnos.filter(alumno => alumno.matricula === req.params.matricula));
  } else {
    res.status(400).json({ msg: `No se econtro alumno con la matricula ${req.params.matricula}` });
  }
});

// POST /alumnos
router.post('/', function(req, res) {
    const alumno = {
    matricula: req.body.matricula,
    nombre: req.body.nombre,
    programa: req.body.programa
  };

  if (!alumno.matricula || !alumno.nombre || !alumno.programa) {
    return res.status(400).json({ msg: 'Favor de proporcionar matricula, nombre y programa' });
  }

  alumnos.push(alumno);
  res.json(alumnos);
});

// 	PUT /alumnos/{matricula}
router.put('/:matricula', function(req, res) {
  const found = alumnos.some(alumno => alumno.matricula === req.params.matricula);

  if (found) {
    const savealumno = req.body;
    alumnos.forEach(alumno => {
      if (alumno.matricula === req.params.matricula) {
        alumno.matricula = savealumno.matricula ? savealumno.matricula : alumno.matricula;
        alumno.nombre = savealumno.nombre ? savealumno.nombre : alumno.nombre;
        alumno.programa = savealumno.programa ? savealumno.programa : alumno.programa;

        res.json({ msg: 'Alumno actualizado', alumno });
      }
    });
  } else {
    res.status(400).json({ msg: `No se encontro alumno con la matricula ${req.params.matricula}` });
  }
});

// 	DELETE /alumnos/{matricula}

router.delete('/:matricula', function(req, res) {
  const found = alumnos.some(alumno => alumno.matricula === req.params.matricula);

  if (found) {
    res.json({
      msg: 'Alumno Borrado',
      alumnos: alumnos.filter(alumno => alumno.matricula !== req.params.matricula)
    });
  } else {
    res.status(400).json({ msg: `No se encontro alumno con la matricula ${req.params.matricula}` });
  }
});

module.exports = router;
