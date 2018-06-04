export const diseaseNames = [
  {
    'id': 1,
    "name": "Influenza"
  },
  {
    "id": 2,
    "name": "Salmonella"
  }
]

export const diseaseArrayInfo = [
  {
    'id': 1,
    "name": "Influenza",
    "treatment":
      "Bedrest and plenty of fluids. In some cases, doctors may prescribe an antiviral medication, such as Oseltamivir or Zanamivir.",
    "signs_symptoms":
      "People who have the flu often feel some or all of these symptoms: fever, cough, sore throat, runny, stuffy nose, muscle, body aches, headaches, fatigue, vomiting, diarrhea",
    "preventative_measures":
      "The Centers for Disease Control and Prevention recommends annual flu vaccination for everyone over the age of 6 months. Wash your hands, contain your coughs, avoid crowds.",
    "testing_procedures":
      "rapid influenza diagnostic tests which tests for the parts of the virus (antigen). Molecular testing, DNA PCR testing.",
    "images":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3W0jSwSscVIFRF7qDo0eW28bvPR6AGu0-t94TmBcvfbM4OblM-A",
    "transmission":
      "Flu viruses travel through the air in droplets when someone with the infection coughs, sneezes or talks. You can inhale the droplets directly, or you can pick up the germs from an object — such as a telephone or computer keyboard — and then transfer them to your eyes, nose or mouth.",
    "summary":
      "Influenza (flu) is a contagious respiratory illness caused by influenza viruses. It can cause mild to severe illness. Serious outcomes of flu infection can result in hospitalization or death. Some people, such as older people, young children, and people with certain health conditions, are at high risk of serious flu complications."
  },
  {
    "id": 2,
    "name": "Salmonella",
    "treatment":
      "Antibiotics. If your doctor suspects that salmonella bacteria have entered your bloodstream, or if you have a severe case or a compromised immune system, he or she may prescribe antibiotics to kill the bacteria. Antibiotics are not of benefit in uncomplicated cases. In fact, antibiotics may prolong the period in which you carry the bacteria and can infect others, and they can increase your risk of relapse.",
    "signs_symptoms":
      "nausea, vomiting, abdominal cramps, diarrhea, fever, chills, headaches, blood in stool",
    "preventative_measures":
      "Cook poultry, ground beef and eggs thoroughly. Do not drink or eat raw eggs or milk. Wash hands, kitchen surfaces and utensils with soap and water immediately after contact with raw meat or poultry. Wash hands after handling reptiles, birds, and pet feces.",
    "testing_procedures":
      "Culture: Laboratory scientists identify Salmonella infection by culturing a patient’s sample. If Salmonella bacteria grow, then the diagnosis is confirmed",
    "images":
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdN45BCFJ0Bk5tKJEucvvL25P8hsX25RKDthezUxqCXvC7MdpR",
    "transmission":
      "Eating food contaminated by feces such as meats, poultry, raw eggs, fruits, vegetables or seafood.",
    "summary":
      "Salmonella infection (salmonellosis) is a common bacterial disease that affects the intestinal tract. Salmonella bacteria typically live in animal and human intestines and are shed through feces. Humans become infected most frequently through contaminated water or food."
  }
]

export const diseaseCount = [
  {
    id: 1,
    diseases_id: 1,
    states_id: 1,
    case_count: 40
  }, 
  {
    id: 2,
    diseases_id: 2,
    states_id: 1,
    case_count: 20
  }
]

export const returnedDiseaseCount = [
  {
    id: 1,
    count: 40
  }, 
  {
    id: 2,
    count: 20
  }
]

export const returnedGraphCounts = [
  {
    count: 40,
    id: 1,
    state: 1
  },
  {
    count: 20,
    id: 1,
    state: 2
  }
]

export const diseaseObject =   {
  "name": "Influenza",
  "treatment":
    "Bedrest and plenty of fluids. In some cases, doctors may prescribe an antiviral medication, such as Oseltamivir or Zanamivir.",
  "signs_symptoms":
    "People who have the flu often feel some or all of these symptoms: fever, cough, sore throat, runny, stuffy nose, muscle, body aches, headaches, fatigue, vomiting, diarrhea",
  "preventative_measures":
    "The Centers for Disease Control and Prevention recommends annual flu vaccination for everyone over the age of 6 months. Wash your hands, contain your coughs, avoid crowds.",
  "testing_procedures":
    "rapid influenza diagnostic tests which tests for the parts of the virus (antigen). Molecular testing, DNA PCR testing.",
  "images":
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3W0jSwSscVIFRF7qDo0eW28bvPR6AGu0-t94TmBcvfbM4OblM-A",
  "transmission":
    "Flu viruses travel through the air in droplets when someone with the infection coughs, sneezes or talks. You can inhale the droplets directly, or you can pick up the germs from an object — such as a telephone or computer keyboard — and then transfer them to your eyes, nose or mouth.",
  "summary":
    "Influenza (flu) is a contagious respiratory illness caused by influenza viruses. It can cause mild to severe illness. Serious outcomes of flu infection can result in hospitalization or death. Some people, such as older people, young children, and people with certain health conditions, are at high risk of serious flu complications."
  }

export const stateArray = [
  {
    "id": 1,
    "name": "Alabama"
  },
  {
    "id": 2,
    "name": "Alaska"
  },
  {
    "id": 3,
    "name": "Arizona"
  },
  {
    "id": 4,
    "name": "Arkansas"
  }
]

export const stateNames = ["Alabama", "Alaska", "Arizona", "Arkansas"]

export const returnedButtonData = [{ 
  name: 'Influenza', 
  count: 40, 
  disease_id: 1 
}, 
{ 
  name: 'Salmonella', 
  count: 20, 
  disease_id: 2 
}
];

export const stringId = '1';

export const diseases = ['Influenza', 'Salmonella']

export const returnedGraphData = [
  {
    state: 'AL',
    count: 40
  },
  {
    state: 'AK',
    count: 20
  }
]