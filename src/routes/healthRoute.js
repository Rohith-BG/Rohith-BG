import axios from 'axios';

// A mapping from each feature (by index) to an array of keyword candidates.
// Adjust these keywords as per your model's training.
const keywordMap = {
  feature0: ['chest pain', 'tightness in chest'],
  feature1: ['high blood pressure', 'bp'],
  feature2: ['irregular heartbeat', 'palpitations'],
  feature3: ['shortness of breath', 'breathless'],
  feature4: ['fatigue', 'weakness', 'tired'],
  feature5: ['dizzy', 'dizziness', 'lightheaded'],
  feature6: ['swelling', 'edema'],
  feature7: ['neck pain', 'jaw pain'],
  feature8: ['excessive sweating', 'sweating'],
  feature9: ['persistent cough', 'cough'],
  feature10: ['nausea', 'vomiting', 'sick to stomach'],
  feature11: ['chest discomfort', 'discomfort in chest'],
  feature12: ['cold hands', 'cold feet'],
  feature13: ['snoring', 'sleep apnea'],
  feature14: ['anxiety', 'sense of doom'],
  // If you don't have a mapping for feature15, you can leave it as default 0.
};

const predictController = async (req, res) => {
  // Expecting the frontend to send a JSON object containing the text in "data"
  const { data } = req.body;
  if (!data) {
    return res.status(400).json({ error: 'Text input is required in field "data"' });
  }
  
  // Convert the input text to lower case for easier matching.
  const userText = data.toLowerCase();

  // Initialize a binary payload with 16 features, defaulting each to 0.
  const binaryPayload = {};
  for (let i = 0; i < 16; i++) {
    binaryPayload[`feature${i}`] = 0;
  }
  
  // Loop through the mapping for features 0 to 14.
  // For each feature, if any keyword is found in the user text, mark that feature as 1.
  for (const [feature, keywords] of Object.entries(keywordMap)) {
    for (const kw of keywords) {
      if (userText.includes(kw)) {
        binaryPayload[feature] = 1;
        break; // Stop at first match for this feature.
      }
    }
  }
  // Feature15 is left at its default value (0) if you don't have any specific keywords.
  
  console.log('Transformed Payload:', binaryPayload);
  
  try {
    // Send the request to the deployed ML model.
    // It expects data as application/x-www-form-urlencoded.
    const response = await axios.post(
      'https://h-stroke-1.onrender.com/predict',
      new URLSearchParams(binaryPayload), // Convert the object into URLSearchParams.
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );
    
    // Assuming the ML model returns JSON with a "prediction" key.
    // Forward that prediction to the frontend.
    res.json({ prediction: response.data.prediction });
    
  } catch (error) {
    console.error('Error calling ML model:', error.message);
    res.status(500).json({ error: 'Prediction failed', details: error.message });
  }
};

export default predictController;


