import Aporte from "../models/Aporte.js";

// CREAR APORTE:Maneja la lógica de creacion  de nuevos aportes
export const createAporte = async (req, res) => {
  try {
    // cuerpo de la petición (request body)
    const { titulo, contenido, groupId } = req.body;

    //Validación: checkeamos que no lleguen campos nulos
    if (!titulo || !contenido || !groupId) {
      return res.status(400).json({ error: "Faltan datos" });
    }

    // Import dinámico del modelo de Grupo para realizar una validación cruzada
    const Group = (await import("../models/Group.js")).default;

    const grupo = await Group.findById(groupId);

    if (!grupo) {
      return res.status(404).json({ error: "Grupo no encontrado" });
    }

    // Verifica que el usuario autenticado (req.user.id) coincida con el creador del grupo.
    // Usa.toString() porque req.user.id es un string y grupo.createdBy es un ObjectId.
    if (grupo.createdBy.toString() !== req.user.id) {
      return res.status(403).json({
        error: "Solo el creador del grupo puede publicar aportes"
      });
    }
// Instanciación del nuevo modelo 
    const nuevoAporte = new Aporte({
      titulo,
      descripcion: contenido, // Mapeamos 'contenido' del front a 'descripcion' del modelo
      grupoId: groupId,
      autor: req.user.id// El autor se toma del token de autenticación (seguridad)
    });

// Persistencia en la base de datos (operación asíncrona)
    const saved = await nuevoAporte.save();

    res.status(201).json(saved); // HTTP 201: Created

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creando aporte" });
  }
};

// OBTENER APORTES: Implementa filtrado dinámico
export const getAportes = async (req, res) => {
  try {
    //Tomamos el grupoId de los Query Params 
    const { grupoId } = req.query;

    let filtro = {};
    //Si el cliente envía un ID de grupo, filtramos la búsqueda en la DB

    if (grupoId) {
      filtro.grupoId = grupoId;
    }

    //Ejecutamos la consulta con el objeto de filtro (puede ser vacío o con grupoId)
    const aportes = await Aporte.find(filtro);

    res.json(aportes);

  } catch (error) {
    console.error("ERROR GET APORTES:", error);
    res.status(500).json({ error: "Error al obtener los aportes" });
  }
};

// ACTUALIZAR APORTE:Implementa seguridad a nivel de documento
export const updateAporte = async (req, res) => {
  try {
    const { id } = req.params; // Toma el ID de la URL
    const { titulo, contenido } = req.body;

    // 1. Buscar si existe
    const aporte = await Aporte.findById(id);
    if (!aporte) return res.status(404).json({ error: "Aporte no encontrado" });

    // 2. Seguridad: controla si es el autor
    if (aporte.autor.toString() !== req.user.id) {
      return res.status(403).json({ error: "No tenés permiso para editar este aporte" });
    }

    // 3. Actualizar descripcion 
    const actualizado = await Aporte.findByIdAndUpdate(
      id,
      { titulo, descripcion: contenido },
      { new: true } // Para que devuelva el objeto ya modificado
    );

    res.json(actualizado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar el aporte" });
  }
};


// ELIMINAR APORTE
export const deleteAporte = async (req, res) => {
  try {
    const { id } = req.params;

    const aporte = await Aporte.findById(id);
    if (!aporte) return res.status(404).json({ error: "Aporte no encontrado" });

    // Seguridad: control de autor
    if (aporte.autor.toString() !== req.user.id) {
      return res.status(403).json({ error: "No tenés permiso para eliminar este aporte" });
    }

    await Aporte.findByIdAndDelete(id);
    res.json({ message: "Aporte eliminado correctamente" });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar el aporte" });
  }
};