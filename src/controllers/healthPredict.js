import axios from 'axios';
import qs from 'qs'; // helps convert object to form-urlencoded

const predictFunc = async (req, res) => {
  const { data } = req.body;

  if (!data) {
    return res.status(400).json({ message: 'Text for analysis is required' });
  }

  const features = [
    'chest_pain',
    'high_blood_pressure',
    'irregular_heartbeat',
    'shortness_of_breath',
    'fatigue_weakness',
    'dizziness',
    'swelling_edema',
    'neck_jaw_pain',
    'excessive_sweating',
    'persistent_cough',
    'nausea_vomiting',
    'chest_discomfort',
    'cold_hands_feet',
    'snoring_sleep_apnea',
    'anxiety_doom'
  ];

  const keywordMap = {
    chest_pain: ['chest pain', 'tightness in chest'],
    high_blood_pressure: ['high blood pressure', 'bp'],
    irregular_heartbeat: ['irregular heartbeat', 'palpitations'],
    shortness_of_breath: ['shortness of breath', 'breathless'],
    fatigue_weakness: ['fatigue', 'weakness', 'tired'],
    dizziness: ['dizzy', 'dizziness', 'lightheaded'],
    swelling_edema: ['swelling', 'edema'],
    neck_jaw_pain: ['neck pain', 'jaw pain'],
    excessive_sweating: ['sweating', 'excessive sweat'],
    persistent_cough: ['cough', 'persistent cough'],
    nausea_vomiting: ['nausea', 'vomiting', 'sick to stomach'],
    chest_discomfort: ['discomfort in chest'],
    cold_hands_feet: ['cold hands', 'cold feet'],
    snoring_sleep_apnea: ['snoring', 'sleep apnea'],
    anxiety_doom: ['anxiety', 'sense of doom']
  };

  const userText = data.toLowerCase();
  const binaryInput = {};
  for (const feature of features) {
    const keywords = keywordMap[feature];
    binaryInput[feature] = keywords.some(kw => userText.includes(kw)) ? 1 : 0;
  }

  console.log("Mapped ML input:", binaryInput);

  try {
    const response = await axios.post(
      'https://h-stroke-1.onrender.com/predict',
      qs.stringify(binaryInput), // converts to form-encoded string
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );

    return res.status(200).json({ prediction: response.data });
  } catch (error) {
    console.error("Prediction error:", error.stack);
    return res.status(500).json({ message: 'ML model error', error: error.message });
  }
};

export default predictFunc;
