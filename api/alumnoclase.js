const express = require('express');
const router = express.Router();
const AlumnoClases = require('../models/AlumnoClase');

// Gets All Members
router.get('/', function(req, res) {
  res.json(AlumnoClases);
});

// 	GET /alumnoclases/{matricula}
router.get('/mat/:matricula', function(req, res)  {
  const found = AlumnoClases.some(AlumnoClase => AlumnoClase.matricula === req.params.matricula);

  if (found) {
    res.json(AlumnoClases.filter(AlumnoClase => AlumnoClase.matricula === req.params.matricula));
  } else {
    res.status(400).json({ msg: `No se encontro alumno con la matricula ${req.params.matricula}` });
  }
});

// 		GET /alumnoclases/{codigo}
router.get('/cod/:codigo', function(req, res) {
  const found = AlumnoClases.some(AlumnoClase => AlumnoClase.codigo === req.params.codigo);

  if (found) {
    res.json(AlumnoClases.filter(AlumnoClase => AlumnoClase.codigo === req.params.codigo));
  } else {
    res.status(400).json({ msg: `No se encontro materia con el codigo ${req.params.codigo}` });
  }
});

//	POST /alumnoclases
router.post('/', function(req, res) {
  const nextid = AlumnoClases.length ;
  const alumnoclase = {
    id: nextid,
    matricula: req.body.matricula,
    codigo: req.body.codigo
  };

  if (!alumnoclase.matricula || !alumnoclase.codigo) {
    return res.status(400).json({ msg: 'Favor de incluir la matricula y el codigo' });
  }

  AlumnoClases.push(alumnoclase);
  res.json(AlumnoClases);
});

// // 	PUT /AlumnoClase/{id}
router.put('/:id', function(req, res) {
  const found = AlumnoClases.some(AlumnoClase => AlumnoClase.id === parseInt(req.params.id));

  if (found) {
    const saveAlumnoClase = req.body;
    AlumnoClases.forEach(AlumnoClase => {
      if (AlumnoClase.id === parseInt(req.params.id)) {
        AlumnoClase.matricula = saveAlumnoClase.matricula ? saveAlumnoClase.matricula : AlumnoClase.matricula;
        AlumnoClase.codigo = saveAlumnoClase.codigo ? saveAlumnoClase.codigo : AlumnoClase.codigo;

        res.json({ msg: 'Alumno-Clase actualizada', AlumnoClase });
      }
    });
  } else {
    res.status(400).json({ msg: `No se encontro Alumno-Clase con el id ${req.params.id}` });
  }
});

 // 	DELETE /alumnoclases/{id}

router.delete('/:id', function(req, res) {
  const found = AlumnoClases.some(AlumnoClase => AlumnoClase.id === parseInt(req.params.id));

  if (found) {
    res.json({
      msg: 'Alumno-Clases borrado',
      AlumnoClases: AlumnoClases.filter(AlumnoClase => AlumnoClase.id !== parseInt(req.params.id))
    });
  } else {
    res.status(400).json({ msg: `No se encontro Alumno-Clase con el id ${req.params.id}` });
  }
});

module.exports = router;
