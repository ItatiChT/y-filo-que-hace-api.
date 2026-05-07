import Group from "../models/Group.js";
import User from "../models/User.js";

// 1.  Registra un nuevo equipo de investigación
export const createGroup = async (req, res) => {
  try {
    const { nombre, carrera, director, resumen } = req.body;

    //Validación de datos críticos para la identidad del grupo
    if (!nombre || !carrera) {
      return res.status(400).json({ error: "Faltan datos" });
    }

    const group = new Group({
      nombre,
      carrera,
      director,
      resumen,
      createdBy: req.user.id // Se asigna el ID del usuario logueado como el "dueño" del grupo
    });

    await group.save();

    res.status(201).json(group);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creando grupo" });
  }
};

// 2. Obtener grupos:Permite listar todos o filtrar por carrera
export const getGroups = async (req, res) => {
  const { carrera } = req.query;

  //// Si existe la carrera, filtramos; si no, el filtro es un objeto vacío (trae todo)

  const filtro = carrera ? { carrera } : {};

  const groups = await Group.find(filtro);
  res.json(groups);
};

// 3. Actualizar o modificar (PROTEGIDO)
export const updateGroup = async (req, res) => {
  try {
    const { id } = req.params;

    // Buscamos el grupo primero para verificar autoría
    const grupo = await Group.findById(id);
    if (!grupo) return res.status(404).json({ error: "Grupo no encontrado" });

    // Seguridad: ¿El que quiere editar es el dueño?
    if (grupo.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ error: "No tienes permiso para editar este grupo" });
    }

    // Si es el dueño, actualizamos
    const updatedGroup = await Group.findByIdAndUpdate(
      id,
      req.body, 
      { new: true }
    );

    res.json(updatedGroup);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error actualizando grupo" });
  }
};

// Eliminar grupo (PROTEGIDO)
export const deleteGroup = async (req, res) => {
  try {
    const { id } = req.params;

    // Buscamos el grupo para verificar autoría
    const grupo = await Group.findById(id);
    if (!grupo) return res.status(404).json({ error: "Grupo no encontrado" });

    // Seguridad: ¿El que quiere borrar es el dueño?
    if (grupo.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ error: "No tienes permiso para eliminar este grupo" });
    }

    // Si es el dueño, borramos
    await Group.findByIdAndDelete(id);

    res.json({ message: "Grupo eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error eliminando grupo" });
  }
};