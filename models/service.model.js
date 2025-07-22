import { connection } from '../config/db.js';

// 1. Create new transport service
export const createService = async (idTrajet, heureDepart,heureArrivee,dateService,idChauffeur,idMoyen,prix) => {
  const [result] = await connection.execute(
    'INSERT INTO ServiceDeTransport (idTrajet, heureDepart,heureArrivee,dateService,idChauffeur,idMoyen,prix) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [idTrajet, heureDepart,heureArrivee,dateService,idChauffeur,idMoyen,prix]
  );
  return result;
};

// 2. Update an existing service
export const updateServiceById = async (id, hdepart, harrivee,prix,dservice) => {
  console.log(id,hdepart,harrivee,prix,dservice);
  
  await connection.execute(
    'UPDATE servicedetransport SET heureDepart = ?, heureArrivee = ?,prix = ?,dateService = ? WHERE idService = ?',
    [hdepart, harrivee,prix,dservice, id]
  );
};
export const updateServiceByIdFromDriver = async (id,status) => {
  
  const data = await connection.execute(
    'UPDATE servicedetransport SET status = ? WHERE idService = ?',
    [status,id]
  );
  return data;
};

// 3. Delete a service
export const deleteServiceById = async (id) => {
  await connection.execute(
    'DELETE FROM ServiceDeTransport WHERE idService = ?',
    [id]
  );
};

// 4. List all services
export const getAllServices = async () => {
  const [rows] = await connection.execute(
    `SELECT s.idService, s.heureDepart, s.heureArrivee,
            s.prix, s.dateService, s.prix,
            t.lieuDepart, t.lieuArrivee,
            m.type,m.matricule, c.nom,c.prenom
     FROM ServiceDeTransport s
     JOIN Trajet t ON s.idTrajet = t.idTrajet
     JOIN MoyenDeTransport m ON s.idMoyen = m.idMoyen
     JOIN Chauffeur c ON s.idChauffeur = c.idChauffeur`,
    
  );
  return rows;
};
// 🔎 Get reservations by date for a specific user
export const getReservationsByDate = async (userId, date) => {
  const [passagerRow] = await connection.execute(
    'SELECT idPassager FROM Passager WHERE idUtilisateur = ?',
    [userId]
  );

  if (passagerRow.length === 0) {
    throw new Error('No passenger found for this user');
  }

  const idPassager = passagerRow[0].idPassager;

  const [rows] = await connection.execute(
    `SELECT r.idReservation, r.dateReservation, r.etat,
            s.heureDepart, s.heureArrivee, s.prix,
            t.lieuDepart, t.lieuArrivee,
            r.nbrPlaces, r.statutPaiement
     FROM Reservation r
     JOIN ServiceDeTransport s ON r.idService = s.idService
     JOIN Trajet t ON s.idTrajet = t.idTrajet
     WHERE r.idPassager = ? AND r.dateReservation = ?`,
    [idPassager, date]
  );

  return rows;
};
export const getSpecificService = async (id) => {
  console.log('from model',id);
  
  const [service] = await connection.execute(
    `SELECT s.idService, s.heureDepart, s.heureArrivee,
            s.prix, s.dateService, s.prix,s.status,
            t.lieuDepart, t.lieuArrivee,
            m.type,m.matricule,m.capacite, c.nom,c.prenom
     FROM ServiceDeTransport s
     JOIN Trajet t ON s.idTrajet = t.idTrajet
     JOIN MoyenDeTransport m ON s.idMoyen = m.idMoyen
     JOIN Chauffeur c ON s.idChauffeur = c.idChauffeur WHERE idUtilisateur = ?`,
     [id]
  );

  return service;
};


