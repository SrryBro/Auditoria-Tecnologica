const express = require('express');
const sequelize = require('./config/database');
const auditoria = require('./models/auditoria');
const Reporte = require('./models/Reporte');
const cors = require('cors'); // Importar el middleware CORS
const PORT = 3000;
const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

sequelize.authenticate()
    .then(() => console.log('Conexión a la base de datos exitosa'))
    .catch((err) => console.error('Error al conectar a la base de datos:', err));

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

sequelize.sync({ force: false }) // Cambia "force" a "false" después de la primera ejecución
    .then(() => console.log('Modelos sincronizados con la base de datos'))
    .catch((err) => console.error('Error al sincronizar modelos:', err));


const auditoriasRoutes = require('./routes/auditorias');
app.use('/auditorias', auditoriasRoutes);

const reportesRoutes = require('./routes/reportes');
app.use('/auditorias', reportesRoutes); // Aquí se usa "auditorias" para indicar que los reportes son parte de la auditoría
app.use('/reportes', reportesRoutes);


