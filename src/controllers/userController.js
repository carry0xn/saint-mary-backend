// controllers/userController.js
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const JWT_SECRET = process.env.JWT_SECRET || "secreto"

const mostrarUser = async (req, res, UserModel) => {
  try {
    const id = req.params.id
    const user = await UserModel.findByPk(id)
    if (user) {
      res.status(200).json({
        id: user.id,
        nombreCompleto: user.nombreCompleto,
        username: user.username,
      })
    } else {
      res.status(404).json({ message: 'User no encontrado' })
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener user', error: error.message })
  }
}

const login = async (req, res, UserModel) => {
  const { username, password } = req.body

  try {
    const user = await UserModel.findOne({ where: { username } })
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" })

    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) return res.status(401).json({ message: "Contraseña incorrecta" })
    const token = jwt.sign(
      { id: user.id, role: user.role || "user", username: user.username },
      JWT_SECRET,
      { expiresIn: "1d" }
    )

    res.json({ token, user })
  } catch (error) {
    res.status(500).json({ message: "Error del servidor", error })
  }
}

const register = async (req, res, UserModel, rol) => {
  const { nombreCompleto, username, password, cursoId } = req.body;

  try {
    if (!nombreCompleto || !username || !password) {
      return res.status(400).json({ message: "Faltan campos obligatorios" });
    }

    const existingUser = await UserModel.findOne({ where: { username } });
    if (existingUser) {
      return res.status(409).json({ message: "El usuario ya existe" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUserData = {
      nombreCompleto,
      username,
      password: hashedPassword,
      rol, // este se lo pasás como argumento
    };

    if ("cursoId" in UserModel.rawAttributes) {
      newUserData.cursoId = cursoId;
    }

    const user = await UserModel.create(newUserData);

    res.status(201).json({
      id: user.id,
      nombreCompleto: user.nombreCompleto,
      username: user.username,
      rol: user.rol,
    });
  } catch (error) {
    res.status(500).json({ message: "Error al registrar usuario", error: error.message });
  }
}


const modificarUser = async (req, res, UserModel) => {
  try {
    const id = req.params.id
    const user = await UserModel.findByPk(id)
    if (user) {
      const { nombreCompleto, username, password } = req.body
      if (nombreCompleto) user.nombreCompleto = nombreCompleto
      if (username) user.username = username
      if (password) user.password = password
      await user.save()
      res.status(200).json({ id: user.id, nombreCompleto: user.nombreCompleto, username: user.username })
    } else {
      res.status(404).json({ message: 'User no encontrado' })
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al modificar user', error: error.message })
  }
}

// Reemplazar completamente un profesor (PUT)
const actualizarUser = async (req, res, UserModel) => {
  try {
    const id = req.params.id
    const user = await UserModel.findByPk(id)
    if (user) {
      const { nombreCompleto, username, password } = req.body
      if (!nombreCompleto || !username || !password) {
        return res.status(400).json({ message: 'Faltan campos obligatorios' })
      }
      user.nombreCompleto = nombreCompleto
      user.username = username
      user.password = password
      await user.save()
      res.status(200).json({ id: user.id, nombreCompleto: user.nombreCompleto, username: user.username })
    } else {
      res.status(404).json({ message: 'User no encontrado' })
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar user', error: error.message })
  }
}

const eliminarUser = async (req, res, UserModel) => {
  try {
    const id = req.params.id;
    const user = await UserModel.findByPk(id);
    if (user) {
      await user.destroy()
      res.status(200).json({ message: 'User eliminado' })
    } else {
      res.status(404).json({ message: 'User no encontrado' })
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar profesor', error: error.message })
  }
}
module.exports = {
    mostrarUser,
    login,
    register,
    modificarUser,
    actualizarUser,
    eliminarUser,
}
