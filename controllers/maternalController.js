const db = require('../config/firebaseConfig');
exports.createRecord = (req, res) => {
  const recordRef = db.ref('maternalRecords').push();  // Create a new record with a unique key

  // Handle undefined fields by assigning default values
  const recordData = {
    patientId: req.body.patientId || '',  // Default to an empty string if undefined
    name: req.body.name || '',
    address: req.body.address || '',
    phone: req.body.phone || '',
    careUnit: req.body.careUnit || '',
    careUnitAddress: req.body.careUnitAddress || '',
    caregiver: req.body.caregiver || '',  // Default to an empty string for caregiver
    enrollmentDate: req.body.enrollmentDate || '',
    lastMenstrualPeriod: req.body.lastMenstrualPeriod || '',
    estimatedDeliveryDate: req.body.estimatedDeliveryDate || '',
    pregnancyWeek: req.body.pregnancyWeek || '',
    allergies: req.body.allergies || '',
    lifestyle: {
      weight: req.body.weight || null,  // Default to null for number fields
      height: req.body.height || null,
      BMI: req.body.BMI || '',
      smoking: req.body.smoking || 'false',
      alcohol: req.body.alcohol || '',
      snus: req.body.snus || '',
      physicalActivity: req.body.physicalActivity || ''
    },
    socialConditions: {
      maritalStatus: req.body.maritalStatus || '',
      livingSituation: req.body.livingSituation || '',
      occupation: req.body.occupation || '',
      familyHistory: req.body.familyHistory || ''
    },
    medicalHistory: {
      currentPsychCondition: req.body.currentPsychCondition || '',
      previousPsychCondition: req.body.previousPsychCondition || '',
      familyHistoryAnemia: req.body.familyHistoryAnemia || 'false'
    },
    pregnancyDetails: {
      fetalHeartRate: req.body.fetalHeartRate || '',
      amnioticFluid: req.body.amnioticFluid || '',
      fetalMovements: req.body.fetalMovements || '',
      placentaPosition: req.body.placentaPosition || ''
    },
    contraceptiveHistory: {
      stoppedContraceptive: req.body.stoppedContraceptive || 'false',
      spiralRemoved: req.body.spiralRemoved || 'false'
    },
    previousPregnancies: req.body.previousPregnancies ? req.body.previousPregnancies.map(p => ({
      year: p.year || null,
      vaginalDelivery: p.vaginalDelivery === 'true' ? true : false,
      babyWeight: p.babyWeight || null,
      babyLength: p.babyLength || null,
      gender: p.gender || '',
      deliveryType: p.deliveryType || ''
    })) : [],
    medications: req.body.medications || '',
    followUp: req.body.followUp ? req.body.followUp.map(f => ({
      date: f.date || '',
      midwifeNotes: f.midwifeNotes || '',
      bloodResults: f.bloodResults || '',
      ultrasoundDetails: f.ultrasoundDetails || ''
    })) : [],
    riskFactors: {
      smoking: req.body.smoking || 'false',
      alcohol: req.body.alcohol || '',
      bloodPressure: req.body.bloodPressure || '',
      anemia: req.body.anemia || 'false',
      preEclampsia: req.body.preEclampsia || 'false'
    },
    labResults: {
      ferritin: req.body.ferritin || null,
      TSH: req.body.TSH || null,
      freeThyroxine: req.body.freeThyroxine || null,
      RhFactor: req.body.RhFactor || '',
      rubellaImmunity: req.body.rubellaImmunity || '',
      syphilis: req.body.syphilis || ''
    },
    deliveryDetails: {
      deliveryType: req.body.deliveryType || '',
      birthDate: req.body.birthDate || '',
      birthTime: req.body.birthTime || '',
      gestationalWeek: req.body.gestationalWeek || '',
      gender: req.body.gender || '',
      birthWeight: req.body.birthWeight || null,
      birthLength: req.body.birthLength || null,
      headCircumference: req.body.headCircumference || null,
      apgarScore: {
        oneMinute: req.body.oneMinute || null,
        fiveMinutes: req.body.fiveMinutes || null,
        tenMinutes: req.body.tenMinutes || null
      }
    },
    partogram: req.body.partogram ? req.body.partogram.map(p => ({
      time: p.time || '',
      cervicalDilation: p.cervicalDilation || null,
      fetalHeartRate: p.fetalHeartRate || '',
      contractionsStrength: p.contractionsStrength || '',
      fetalHeadDescent: p.fetalHeadDescent || ''
    })) : []
  };


  // Save the record data in Firebase Realtime Database
  recordRef.set(recordData, (error) => {
    if (error) {
      res.status(500).send('Error saving record');
    } else {
      res.redirect('/records');
    }
  });
};

// List all maternal records
exports.listRecords = (req, res) => {
  db.ref('maternalRecords').once('value', (snapshot) => {
    const records = snapshot.val();
    const recordList = [];
    for (let id in records) {
      recordList.push({ id, ...records[id] });
    }
    res.render('listRecords', { records: recordList });
  });
};

// View an individual maternal record
exports.viewRecord = (req, res) => {
  const recordId = req.params.id;
  db.ref('maternalRecords/' + recordId).once('value', (snapshot) => {
    const record = snapshot.val();
    if (record) {
      res.render('record', { record });  // Pass the entire record object
    } else {
      res.status(404).send('Record not found');
    }
  });
};


// Display the form to edit an existing record
exports.editRecordForm = (req, res) => {
  const recordId = req.params.id;
  db.ref('maternalRecords/' + recordId).once('value', (snapshot) => {
    const record = snapshot.val();
    if (record) {
      res.render('index', { record });  // Use the same form as the creation, but with filled data
    } else {
      res.status(404).send('Record not found');
    }
  });
};

// Update an existing maternal record
exports.updateRecord = (req, res) => {
  const recordId = req.params.id;
  const updatedData = req.body;
  db.ref('maternalRecords/' + recordId).update(updatedData, (error) => {
    if (error) {
      res.status(500).send('Error updating record');
    } else {
      res.redirect('/records');
    }
  });
};

// Delete a maternal record
exports.deleteRecord = (req, res) => {
  const recordId = req.params.id;
  db.ref('maternalRecords/' + recordId).remove((error) => {
    if (error) {
      res.status(500).send('Error deleting record');
    } else {
      res.redirect('/records');
    }
  });
};
