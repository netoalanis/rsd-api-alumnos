const express = require('express');
const router = express.Router();
const clases = require('../models/Clase');

// 	GET /clases
router.get('/', function(req, res) {
  res.json(clases);
});

// GET /clases/{codigo}
router.get('/:codigo', function(req, res) {
  const found = clases.some(clase => clase.codigo === req.params.codigo);

  if (found) {
    res.json(clases.filter(clase => clase.codigo === req.params.codigo));
  } else {
    res.status(400).json({ msg: `No se encontro la clase con el codigo ${req.params.codigo}` });
  }
});

// 	POST /clases
router.post('/', function(req, res) {
  const clase = {
    codigo: req.body.codigo,
    nombre: req.body.nombre,
    salon: req.body.salon,
    maestro: req.body.maestro
  };

  if (!clase.codigo || !clase.nombre || !clase.salon || !clase.maestro) {
    return res.status(400).json({ msg: 'Favor de proporcionar codigo, nombre, salon, maestro' });
  }

  clases.push(clase);
  res.json(clases);
});

// PUT /clases/{codigo}
router.put('/:codigo', (req, res) => {
  const found = clases.some(clase => clase.codigo === req.params.codigo);

  if (found) {
    const saveclase = req.body;
    clases.forEach(clase => {
      if (clase.codigo === req.params.codigo) {
        clase.codigo = saveclase.codigo ? saveclase.codigo : clase.codigo;
        clase.nombre = saveclase.nombre ? saveclase.nombre : clase.nombre;
        clase.salon = saveclase.salon ? saveclase.salon : clase.salon;
        clase.maestro = saveclase.maestro ? saveclase.maestro : clase.maestro;

        res.json({ msg: 'Clase actualizada', clase });
      }
    });
  } else {
    res.status(400).json({ msg: `No se encontro la clase con el codigo ${req.params.codigo}` });
  }
});

// 	DELETE /clases/{codigo}
router.delete('/:codigo', (req, res) => {
  const found = clases.some(clase => clase.codigo === req.params.codigo);

  if (found) {
    res.json({
      msg: 'Clase Borrada',
      clases: clases.filter(clase => clase.codigo !== req.params.codigo)
    });
  } else {
    res.status(400).json({ msg: `No se encontro la clase con el codigo ${req.params.codigo}` });
  }
});

module.exports = router;
