import { useState, useEffect, useRef } from "react";

// ─── CONFIGURATION ───────────────────────────────────────────────
const BRANCHES = [
  "Bikaner – Vyas Colony",
  "Bikaner – Virat Nagar",
  "Ganganagar",
  "Deoli",
  "Nimbahera",
  "Pilibanga",
  "Vijaynagar",
  "Beawar",
  "Jaisalmer",
  "Udaipur",
];

const BANDS = {
  3: { label: "Band 3", grades: "Grade III – V", gradeRange: [3, 4, 5] },
  4: { label: "Band 4", grades: "Grade VI – VIII", gradeRange: [6, 7, 8] },
  5: { label: "Band 5", grades: "Grade IX – X", gradeRange: [9, 10] },
};

// ─── QUESTION SETS ───────────────────────────────────────────────
const QUESTIONS = {
  3: {
    A: {
      title: "Language & Communication",
      questions: [
        { id: "A1", type: "mcq", text: "Why was Meena excited about the science exhibition?", options: ["She won a prize", "She worked on a project about saving electricity", "She met her friends", "She got a day off school"], answer: 1 },
        { id: "A2", type: "mcq", text: "What was Meena's project about?", options: ["Plants and trees", "Saving electricity", "Water conservation", "Animal life"], answer: 1 },
        { id: "A3", type: "mcq", text: "How did Meena prepare for the exhibition?", options: ["She read books only", "She asked her teacher for help", "She made charts and wrote explanations", "She did nothing special"], answer: 2 },
        { id: "A4", type: "mcq", text: "Match: 'Responsible' means:", options: ["Very tired", "Very old", "Having duty", "Wanting to know more"], answer: 2 },
        { id: "A5", type: "mcq", text: "'Curious' means:", options: ["Having duty", "Very old", "Very tired", "Wanting to know more"], answer: 3 },
        { id: "A6", type: "mcq", text: "Which sentence is grammatically correct?", options: ["She don't like reading.", "She doesn't likes reading.", "She doesn't like reading.", "She not like reading."], answer: 2 },
        { id: "A7", type: "mcq", text: "Synonym of 'happy' is:", options: ["Sad", "Angry", "Joyful", "Weak"], answer: 2 },
        { id: "A8", type: "mcq", text: "Identify the noun: 'The cat slept peacefully.'", options: ["Slept", "Peacefully", "Cat", "The"], answer: 2 },
        { id: "A9", type: "mcq", text: "Choose correct punctuation for a question:", options: ["What is your name.", "What is your name!", "What is your name?", "What is your name,"], answer: 2 },
        { id: "A10", type: "mcq", text: "He ran ______ to catch the bus.", options: ["quick", "quickly", "quicker", "quickest"], answer: 1 },
        { id: "A11", type: "written", text: "Creative Writing: Write a short paragraph (4–6 lines) about 'My Dream School'.", placeholder: "Write your answer here (4–6 lines)..." }
      ]
    },
    B: {
      title: "Thinking & Reasoning",
      questions: [
        { id: "B1", type: "mcq", text: "Complete the pattern: 3, 6, 12, 24, ___", options: ["36", "42", "48", "60"], answer: 2 },
        { id: "B2", type: "mcq", text: "Find the odd one out: Triangle, Square, Cube, Rectangle", options: ["Triangle", "Square", "Cube", "Rectangle"], answer: 2 },
        { id: "B3", type: "mcq", text: "Arrange steps in order for answering a question: (1) Write answers (2) Read the question (3) Check the work", options: ["1,2,3", "2,1,3", "3,1,2", "2,3,1"], answer: 1 },
        { id: "B4", type: "mcq", text: "Which shape pattern comes next: ▲⏺▶⏺▼▲⏺▶⏺___", options: ["▲", "▼", "⏺", "▶"], answer: 1 },
        { id: "B5", type: "mcq", text: "If all birds have wings, and an eagle is a bird, then:", options: ["Eagle has no wings", "Eagle may have wings", "Eagle has wings", "Cannot be determined"], answer: 2 }
      ]
    },
    C: {
      title: "Number Sense & Logical Understanding",
      questions: [
        { id: "C1", type: "mcq", text: "Number name of 3,406 is:", options: ["Three thousand four sixty", "Three thousand four hundred six", "Three four zero six", "Three hundred forty six"], answer: 1 },
        { id: "C2", type: "mcq", text: "Place value of 4 in 3,406 is:", options: ["4", "40", "400", "4000"], answer: 2 },
        { id: "C3", type: "mcq", text: "Greatest number: 458, 485, 405", options: ["458", "485", "405", "All equal"], answer: 1 },
        { id: "C4", type: "mcq", text: "Ascending order of 620, 602, 626:", options: ["626, 620, 602", "602, 620, 626", "620, 602, 626", "626, 602, 620"], answer: 1 },
        { id: "C5", type: "mcq", text: "A shopkeeper had 35 pencils. He sold 18. How many are left?", options: ["15", "17", "18", "53"], answer: 1 }
      ]
    },
    D: {
      title: "Interests & Hobbies",
      questions: [
        { id: "D1", type: "mcq", text: "In your free time you prefer to:", options: ["Watch TV or mobile", "Read or draw", "Play outside", "Learn something new"], answer: -1 },
        { id: "D2", type: "mcq", text: "Which activity makes you happiest?", options: ["Being alone", "Being with close friends", "Being in a team", "Helping others"], answer: -1 },
        { id: "D3", type: "mcq", text: "Your favourite school activity is:", options: ["Art / Music", "Sports", "Maths / Puzzles", "Drama / Group Work"], answer: -1 },
        { id: "D4", type: "mcq", text: "You enjoy learning when:", options: ["You see pictures", "You do activities", "You think deeply", "You discuss"], answer: -1 },
        { id: "D5", type: "mcq", text: "You feel proud when:", options: ["You perform", "You win", "You solve a problem", "You help someone"], answer: -1 },
        { id: "D6", type: "mcq", text: "What do you usually do when bored?", options: ["Use phone", "Draw or read", "Play", "Talk or create"], answer: -1 },
        { id: "D7", type: "mcq", text: "Which club would you join?", options: ["Art", "Sports", "Science", "Debate"], answer: -1 },
        { id: "D8", type: "mcq", text: "Which describes you best?", options: ["Creative", "Active", "Curious", "Friendly"], answer: -1 },
        { id: "D9", type: "mcq", text: "You like working:", options: ["Alone", "With one friend", "In a team", "Leading others"], answer: -1 },
        { id: "D10", type: "mcq", text: "Your favourite kind of book is:", options: ["Mythology", "Sports and entertainment", "Science fiction", "Biographies"], answer: -1 }
      ]
    },
    E: {
      title: "Student School Experience",
      isLikert: true,
      questions: [
        { id: "E1", text: "I feel uneasy or scared in school." },
        { id: "E2", text: "I try to avoid meeting my classmates." },
        { id: "E3", text: "I quickly forget what I have studied." },
        { id: "E4", text: "I get angry quickly when classmates do something wrong by mistake." },
        { id: "E5", text: "I feel shy in school situations." },
        { id: "E6", text: "Examinations make me feel nervous." },
        { id: "E7", text: "I worry about being scolded by teachers." },
        { id: "E8", text: "I hesitate to ask questions when I do not understand a lesson." },
        { id: "E9", text: "I find it difficult to understand lessons taught in class." },
        { id: "E10", text: "I feel jealous of classmates who are praised by teachers." },
        { id: "E11", text: "I feel comfortable going to teachers when they are together." },
        { id: "E12", text: "I am able to write down classwork properly." },
        { id: "E13", text: "I feel jealous of classmates whom I think are better than me." },
        { id: "E14", text: "Sometimes I feel that I have no close friends in school." },
        { id: "E15", text: "I feel bored or sleepy during lessons." }
      ]
    }
  },
  4: {
    A: {
      title: "Language & Communication",
      questions: [
        { id: "A1", type: "mcq", text: "Why did Saloni enjoy visiting her grandmother's village?", options: ["It was crowded and noisy", "It had calm mornings and nature", "She played video games there", "It had a big mall"], answer: 1 },
        { id: "A2", type: "mcq", text: "What activity did Saloni do every day?", options: ["Watched television", "Played with friends", "Helped with plants and cows", "Slept all day"], answer: 2 },
        { id: "A3", type: "mcq", text: "What lesson did Saloni learn from village life?", options: ["Life is boring without cities", "Nature needs no care", "Patience and responsibility are important", "Gadgets bring happiness"], answer: 2 },
        { id: "A4", type: "mcq", text: "The word 'rustling' most nearly means:", options: ["Loud music", "Soft moving sound", "Complete silence", "Heavy rain"], answer: 1 },
        { id: "A5", type: "mcq", text: "According to the passage, happiness comes from:", options: ["Buying new gadgets", "City attractions", "Simple moments with loved ones", "Travelling often"], answer: 2 },
        { id: "A6", type: "mcq", text: "Choose the correct sentence:", options: ["She don't like reading.", "She doesn't likes reading.", "She doesn't like reading.", "She not like reading."], answer: 2 },
        { id: "A7", type: "mcq", text: "Choose the synonym of happy:", options: ["Sad", "Angry", "Joyful", "Weak"], answer: 2 },
        { id: "A8", type: "mcq", text: "Identify the noun in: 'The cat slept peacefully.'", options: ["Slept", "Peacefully", "Cat", "The"], answer: 2 },
        { id: "A9", type: "mcq", text: "Choose the correct punctuation:", options: ["What is your name.", "What is your name!", "What is your name?", "What is your name,"], answer: 2 },
        { id: "A10", type: "mcq", text: "He ran ______ to catch the bus.", options: ["quick", "quickly", "quicker", "quickest"], answer: 1 },
        { id: "A11", type: "written", text: "Creative Writing: Write a letter to your father discussing your current hobbies. (You are Hemant / Himani)", placeholder: "Write your letter here. Include: Address, Date, Salutation, Body (5–6 points about hobbies), Closing and Signature..." }
      ]
    },
    B: {
      title: "Thinking & Reasoning",
      questions: [
        { id: "B1", type: "mcq", text: "Find the odd one out: 2, 3, 5, 9", options: ["2", "3", "5", "9"], answer: 3 },
        { id: "B2", type: "mcq", text: "Complete the pattern: 2, 6, 12, 20, 30, ___", options: ["36", "40", "42", "44"], answer: 2 },
        { id: "B3", type: "mcq", text: "Syllogism – All poets are thinkers. Some thinkers are leaders. Which conclusion is logically valid?", options: ["All poets are leaders", "Some poets may be leaders", "No leader is a poet", "All leaders are poets"], answer: 1 },
        { id: "B4", type: "mcq", text: "Alphabet–number logic: A1, C4, F9, J16, ___", options: ["O25", "P25", "O36", "P36"], answer: 0 },
        { id: "B5", type: "mcq", text: "A person walks 10m east, 10m north, 10m west, 10m south. Where is the person now?", options: ["10m east of start", "10m north of start", "At the starting point", "10m south of start"], answer: 2 },
        { id: "B6", type: "mcq", text: "Which statement is always false?", options: ["All birds have wings", "Some humans are doctors", "No square has four sides", "Some fruits are sweet"], answer: 2 },
        { id: "B7", type: "mcq", text: "Coding–decoding: If CAT = 24 and DOG = 26, then BAT = ?", options: ["21", "23", "24", "25"], answer: 1 }
      ]
    },
    C: {
      title: "Number Sense & Logical Understanding",
      questions: [
        { id: "C1", type: "mcq", text: "Which decimal represents the same value as one-fourth?", options: ["0.20", "0.25", "0.40", "0.75"], answer: 1 },
        { id: "C2", type: "mcq", text: "Which of the following decimals is a terminating decimal?", options: ["0.333…", "0.121212…", "0.875", "0.666…"], answer: 2 },
        { id: "C3", type: "mcq", text: "Which number is irrational?", options: ["0.25", "1.44", "2.5", "√3"], answer: 3 },
        { id: "C4", type: "mcq", text: "The HCF of two numbers is 8 and their LCM is 96. What is the product of the two numbers?", options: ["768", "704", "88", "104"], answer: 0 },
        { id: "C5", type: "mcq", text: "How many two-digit numbers are divisible by 4?", options: ["20", "21", "22", "23"], answer: 1 },
        { id: "C6", type: "mcq", text: "Which of the following is the greatest number?", options: ["0.68", "0.7", "0.75", "0.705"], answer: 2 },
        { id: "C7", type: "mcq", text: "A number leaves remainder 3 when divided by 5. Remainder when divided by 10 can be:", options: ["3 only", "5 only", "3 or 8", "8 only"], answer: 2 }
      ]
    },
    D: {
      title: "Interests & Hobbies",
      questions: [
        { id: "D1", type: "mcq", text: "In your free time you prefer to:", options: ["Watch TV or mobile", "Read or draw", "Play outside", "Learn something new"], answer: -1 },
        { id: "D2", type: "mcq", text: "Which activity makes you happiest?", options: ["Being alone", "Being with close friends", "Being in a team", "Helping others"], answer: -1 },
        { id: "D3", type: "mcq", text: "Your favourite school activity is:", options: ["Art / Music", "Sports", "Maths / Puzzles", "Drama / Group Work"], answer: -1 },
        { id: "D4", type: "mcq", text: "You enjoy learning when:", options: ["You see pictures", "You do activities", "You think deeply", "You discuss"], answer: -1 },
        { id: "D5", type: "mcq", text: "You feel proud when:", options: ["You perform", "You win", "You solve a problem", "You help someone"], answer: -1 },
        { id: "D6", type: "mcq", text: "What do you usually do when bored?", options: ["Use phone", "Draw or read", "Play", "Talk or create"], answer: -1 },
        { id: "D7", type: "mcq", text: "Which club would you join?", options: ["Art", "Sports", "Science", "Debate"], answer: -1 },
        { id: "D8", type: "mcq", text: "Which describes you best?", options: ["Creative", "Active", "Curious", "Friendly"], answer: -1 },
        { id: "D9", type: "mcq", text: "You like working:", options: ["Alone", "With one friend", "In a team", "Leading others"], answer: -1 },
        { id: "D10", type: "mcq", text: "Your favourite kind of book is:", options: ["Mythology", "Sports and entertainment", "Science fiction", "Biographies"], answer: -1 },
        { id: "D11", type: "mcq", text: "You prefer teachers who:", options: ["Use audio visuals", "Do fun activities", "Explain clearly and discuss", "Use real world examples"], answer: -1 },
        { id: "D12", type: "mcq", text: "You enjoy competitions that involve:", options: ["Talent", "Speed", "Thinking", "Teamwork"], answer: -1 },
        { id: "D13", type: "mcq", text: "You would like to improve in:", options: ["Art and creative abilities", "Sports and games", "Academics", "Communication skills"], answer: -1 },
        { id: "D14", type: "mcq", text: "Your dream is to become a/an:", options: ["Artist", "Athlete", "Scientist", "Leader"], answer: -1 },
        { id: "D15", type: "mcq", text: "You would rather want to be:", options: ["Invisible", "Superpowerful", "Get a time machine", "Win a lottery"], answer: -1 }
      ]
    },
    E: {
      title: "Student School Experience",
      isLikert: true,
      questions: [
        { id: "E1", text: "I feel uneasy or scared in school." },
        { id: "E2", text: "I try to avoid meeting my classmates." },
        { id: "E3", text: "I quickly forget what I have studied." },
        { id: "E4", text: "I get angry quickly when classmates do something wrong by mistake." },
        { id: "E5", text: "I feel shy in school situations." },
        { id: "E6", text: "Examinations make me feel nervous." },
        { id: "E7", text: "I worry about being scolded by teachers." },
        { id: "E8", text: "I hesitate to ask questions when I do not understand a lesson." },
        { id: "E9", text: "I find it difficult to understand lessons taught in class." },
        { id: "E10", text: "I feel jealous of classmates who are praised by teachers." },
        { id: "E11", text: "I feel comfortable going to teachers when they are together." },
        { id: "E12", text: "I am able to write down classwork properly." },
        { id: "E13", text: "I feel jealous of classmates whom I think are better than me." },
        { id: "E14", text: "Sometimes I feel that I have no close friends in school." },
        { id: "E15", text: "I feel bored or sleepy during lessons." },
        { id: "E16", text: "When students talk among themselves, I feel they are talking about me." },
        { id: "E17", text: "I find it easy to make friends." },
        { id: "E18", text: "I am satisfied with the way lessons are taught in my school." },
        { id: "E19", text: "I show my anger when I am not chosen for school activities." },
        { id: "E20", text: "I join groups of students freely." }
      ]
    }
  },
  5: {
    A: {
      title: "Language & Communication",
      questions: [
        { id: "A1", type: "mcq", text: "What does the author find overwhelming?", options: ["Talking to the librarian", "Seeing the tall shelves full of books", "Doing research for school projects", "Meeting people at libraries"], answer: 1 },
        { id: "A2", type: "mcq", text: "As per the passage, what does the librarian NOT do?", options: ["Make school projects for children", "Host book clubs at the library", "Organise sessions for children", "Suggest interesting books to read"], answer: 0 },
        { id: "A3", type: "mcq", text: "What would happen if libraries were to disappear?", options: ["The library will be turned into a bookstore", "Children will start reading more books", "Children won't have books for school projects", "The community space for discussions will disappear"], answer: 3 },
        { id: "A4", type: "mcq", text: "What evidence suggests libraries aren't as popular anymore?", options: ["People find libraries too old-fashioned", "Libraries aren't hosting book clubs anymore", "Fewer people are visiting libraries", "Libraries don't have a good variety of books"], answer: 2 },
        { id: "A5", type: "mcq", text: "Why does the author find the decline of libraries 'sad'?", options: ["Libraries are becoming outdated", "Libraries no longer have enough books", "Libraries are losing their role as shared community spaces", "Libraries are expensive to maintain"], answer: 2 },
        { id: "A6", type: "mcq", text: "Identify the correctly reported speech: She said, 'We will complete the project tomorrow.'", options: ["She said that they complete the project tomorrow.", "She said that they would complete the project the next day.", "She said that they will complete the project the next day.", "She said that we would complete the project tomorrow."], answer: 1 },
        { id: "A7", type: "mcq", text: "What does the idiom 'once in a blue moon' mean?", options: ["At night", "Very frequently", "Rarely", "Suddenly"], answer: 2 },
        { id: "A8", type: "written", text: "Narrative Writing: 'Sometimes, the smallest decision changes everything.' Write a short story based on this line. Your story must include one important choice.", placeholder: "Write your story here (8–10 lines)..." },
        { id: "A9", type: "written", text: "Diary Entry (100–120 words): Write a diary entry about a day when you overcame a fear and learned something important about yourself.", placeholder: "Write your diary entry here..." }
      ]
    },
    B: {
      title: "Thinking & Reasoning",
      questions: [
        { id: "B1", type: "mcq", text: "If all metals conduct electricity and copper is a metal, then:", options: ["Copper does not conduct electricity", "Copper may conduct electricity", "Copper conducts electricity", "No conclusion can be drawn"], answer: 2 },
        { id: "B2", type: "mcq", text: "All teachers are educators. Some educators are researchers. Which conclusion is logically valid?", options: ["All teachers are researchers", "Some teachers may be researchers", "No teachers are researchers", "All researchers are teachers"], answer: 1 },
        { id: "B3", type: "mcq", text: "Complete the series: 3, 6, 11, 18, ___", options: ["25", "26", "27", "29"], answer: 2 },
        { id: "B4", type: "mcq", text: "If today is Friday, what day will it be after 100 days?", options: ["Monday", "Tuesday", "Wednesday", "Thursday"], answer: 0 },
        { id: "B5", type: "mcq", text: "Which statement shows logical fallacy?", options: ["Some birds cannot fly", "All mammals breathe air", "All tall people are good athletes", "Exercise improves health"], answer: 2 },
        { id: "B6", type: "mcq", text: "Complete the analogy: Teacher : School :: Doctor : ___", options: ["Patient", "Hospital", "Medicine", "Nurse"], answer: 1 },
        { id: "B7", type: "mcq", text: "A conclusion drawn from insufficient evidence is called:", options: ["Observation", "Assumption", "Hypothesis", "Fact"], answer: 1 }
      ]
    },
    C: {
      title: "Number Sense & Logical Understanding",
      questions: [
        { id: "C1", type: "mcq", text: "Arrange in ascending order: 0.6, 3/5, 0.58, 5/8", options: ["0.58, 0.6, 3/5, 5/8", "3/5, 0.58, 0.6, 5/8", "0.58, 3/5, 0.6, 5/8", "5/8, 0.6, 3/5, 0.58"], answer: 2 },
        { id: "C2", type: "mcq", text: "A jacket marked ₹2000 is sold at a discount of 15%. The selling price is:", options: ["₹1700", "₹1600", "₹1800", "₹1500"], answer: 0 },
        { id: "C3", type: "mcq", text: "The ratio of boys to girls is 4:6. If there are 50 students, number of boys is:", options: ["20", "25", "30", "40"], answer: 0 },
        { id: "C4", type: "mcq", text: "Find the missing number: 2²+3²=13, 3²+4²=25, 4²+5²=___", options: ["39", "41", "45", "49"], answer: 1 },
        { id: "C5", type: "mcq", text: "The perimeter of a rectangle is 60 cm. If length = 20 cm, breadth is:", options: ["5 cm", "8 cm", "10 cm", "20 cm"], answer: 2 },
        { id: "C6", type: "mcq", text: "The sum of an even number and an odd number is always:", options: ["Even", "Odd", "Prime", "Zero"], answer: 1 },
        { id: "C7", type: "mcq", text: "A car travels at 72 km/h. Distance covered in 30 minutes is:", options: ["24 km", "30 km", "36 km", "42 km"], answer: 2 },
        { id: "C8", type: "mcq", text: "A student spends 40% on books and saves 30%. She receives ₹2000. How much is left?", options: ["₹400", "₹600", "₹800", "₹1000"], answer: 1 }
      ]
    },
    D: {
      title: "Interests & Hobbies",
      questions: [
        { id: "D1", type: "mcq", text: "In your free time you prefer to:", options: ["Watch TV or mobile", "Read or draw", "Play outside", "Learn something new"], answer: -1 },
        { id: "D2", type: "mcq", text: "Which activity makes you happiest?", options: ["Being alone", "Being with close friends", "Being in a team", "Helping others"], answer: -1 },
        { id: "D3", type: "mcq", text: "Your favourite school activity is:", options: ["Art / Music", "Sports", "Maths / Puzzles", "Drama / Group Work"], answer: -1 },
        { id: "D4", type: "mcq", text: "You enjoy learning when:", options: ["You see pictures", "You do activities", "You think deeply", "You discuss"], answer: -1 },
        { id: "D5", type: "mcq", text: "You feel proud when:", options: ["You perform", "You win", "You solve a problem", "You help someone"], answer: -1 },
        { id: "D6", type: "mcq", text: "What do you usually do when bored?", options: ["Use phone", "Draw or read", "Play", "Talk or create"], answer: -1 },
        { id: "D7", type: "mcq", text: "Which club would you join?", options: ["Art", "Sports", "Science", "Debate"], answer: -1 },
        { id: "D8", type: "mcq", text: "Which describes you best?", options: ["Creative", "Active", "Curious", "Friendly"], answer: -1 },
        { id: "D9", type: "mcq", text: "You like working:", options: ["Alone", "With one friend", "In a team", "Leading others"], answer: -1 },
        { id: "D10", type: "mcq", text: "Your favourite kind of book is:", options: ["Mythology", "Sports and entertainment", "Science fiction", "Biographies"], answer: -1 }
      ]
    },
    E: {
      title: "Student School Experience",
      isLikert: true,
      questions: [
        { id: "E1", text: "I feel uneasy or scared in school." },
        { id: "E2", text: "I try to avoid meeting my classmates." },
        { id: "E3", text: "I quickly forget what I have studied." },
        { id: "E4", text: "I get angry quickly when classmates do something wrong by mistake." },
        { id: "E5", text: "I feel shy in school situations." },
        { id: "E6", text: "Examinations make me feel nervous." },
        { id: "E7", text: "I worry about being scolded by teachers." },
        { id: "E8", text: "I hesitate to ask questions when I do not understand a lesson." },
        { id: "E9", text: "I find it difficult to understand lessons taught in class." },
        { id: "E10", text: "I feel jealous of classmates who are praised by teachers." },
        { id: "E11", text: "I feel comfortable going to teachers when they are together." },
        { id: "E12", text: "I am able to write down classwork properly." },
        { id: "E13", text: "I feel jealous of classmates whom I think are better than me." },
        { id: "E14", text: "Sometimes I feel that I have no close friends in school." },
        { id: "E15", text: "I feel bored or sleepy during lessons." },
        { id: "E16", text: "When students talk among themselves, I feel they are talking about me." },
        { id: "E17", text: "I find it easy to make friends." },
        { id: "E18", text: "I am satisfied with the way lessons are taught in my school." },
        { id: "E19", text: "I show my anger when I am not chosen for school activities." },
        { id: "E20", text: "I join groups of students freely." }
      ]
    }
  }
};

// ─── SCORING HELPERS ─────────────────────────────────────────────
function scoreSection(band, section, answers) {
  const qs = QUESTIONS[band]?.[section]?.questions || [];
  let correct = 0, total = 0;
  qs.forEach(q => {
    if (q.type === "mcq" && q.answer >= 0) {
      total++;
      if (answers[q.id] === q.answer) correct++;
    }
  });
  return { correct, total };
}

function getRubricLevel(correct, total) {
  if (total === 0) return "Emerging";
  const pct = correct / total;
  if (pct >= 0.75) return "Secure";
  if (pct >= 0.45) return "Developing";
  return "Emerging";
}

function getAdjustmentLevel(score, type) {
  if (type === "emotional") {
    if (score <= 4) return "Extremely High Adjustment";
    if (score <= 9) return "High Adjustment";
    if (score <= 13) return "Above Average Adjustment";
    if (score <= 19) return "Average / Moderate Adjustment";
    if (score <= 23) return "Below Average Adjustment";
    if (score <= 28) return "Unsatisfactory Adjustment";
    return "Extremely Unsatisfactory Adjustment";
  } else {
    if (score <= 3) return "Extremely High Adjustment";
    if (score <= 8) return "High Adjustment";
    if (score <= 13) return "Above Average Adjustment";
    if (score <= 20) return "Average / Moderate Adjustment";
    if (score <= 25) return "Below Average Adjustment";
    if (score <= 30) return "Unsatisfactory Adjustment";
    return "Extremely Unsatisfactory Adjustment";
  }
}

function calcLikert(answers, bandQ) {
  const eqs = bandQ.E?.questions || [];
  const emotionalIds = eqs.slice(0, 10).map(q => q.id);
  const socialIds = eqs.slice(10).map(q => q.id);
  const score = (ids) => ids.reduce((s, id) => s + (answers[id] ?? 2), 0);
  return {
    emotional: score(emotionalIds),
    social: score(socialIds),
    emotionalLevel: getAdjustmentLevel(score(emotionalIds), "emotional"),
    socialLevel: getAdjustmentLevel(score(socialIds), "social")
  };
}

function getHobbyProfile(answers, band) {
  const qs = QUESTIONS[band]?.D?.questions || [];
  const labels = ["A", "B", "C", "D"];
  const counts = { A: 0, B: 0, C: 0, D: 0 };
  qs.forEach(q => {
    const ans = answers[q.id];
    if (ans !== undefined && labels[ans]) counts[labels[ans]]++;
  });
  const top = Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
  const profiles = {
    A: "Creative / Artistic",
    B: "Active / Sports-oriented",
    C: "Curious / Academic",
    D: "Social / Leadership-inclined"
  };
  return profiles[top] || "Balanced";
}

// ─── ADMIN PASSWORD ───────────────────────────────────────────────
const ADMIN_PASS = "rysen2024";

// ─── GLOBAL STATE ─────────────────────────────────────────────────
let submissionsDB = [];

// ─── MAIN APP ────────────────────────────────────────────────────
export default function App() {
  const [view, setView] = useState("home");
  const [adminAuth, setAdminAuth] = useState(false);
  const [settings, setSettings] = useState({ timeLimits: { 3: 60, 4: 60, 5: 60 } });

  return (
    <div style={{ minHeight: "100vh", background: "#0f1923", color: "#e8e0d5", fontFamily: "'Georgia', serif" }}>
      {view === "home" && <HomePage setView={setView} />}
      {view === "admin" && <AdminPage auth={adminAuth} setAuth={setAdminAuth} setView={setView} settings={settings} setSettings={setSettings} />}
      {view === "exam" && <ExamPage setView={setView} settings={settings} />}
    </div>
  );
}

// ─── HOME PAGE ───────────────────────────────────────────────────
function HomePage({ setView }) {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 20px", background: "linear-gradient(135deg, #0f1923 0%, #1a2a3a 100%)" }}>
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <img src="/logo.png" alt="RYSEN Group Logo" style={{ width: 150, height: "auto", margin: "0 auto 20px", display: "block", filter: "drop-shadow(0 4px 16px rgba(139,105,20,0.3))" }} onError={(e) => { e.target.onerror = null; e.target.outerHTML = '<div style="width: 80px; height: 80px; border-radius: 50%; background: linear-gradient(135deg, #c8a96e, #8b6914); margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; font-size: 32px; box-shadow: 0 4px 20px rgba(200,169,110,0.4)">🎓</div>'; }} />
        <h1 style={{ fontSize: "clamp(28px,5vw,48px)", fontWeight: 700, color: "#c8a96e", letterSpacing: 2, margin: 0, lineHeight: 1.2 }}>RYSEN Group of Schools</h1>
        <p style={{ color: "#8a9bb0", fontSize: 16, marginTop: 8, letterSpacing: 1 }}>Entrance Diagnostic Assessment Portal</p>
        <div style={{ width: 60, height: 2, background: "linear-gradient(90deg, transparent, #c8a96e, transparent)", margin: "16px auto 0" }} />
      </div>
      <div style={{ display: "flex", gap: 24, flexWrap: "wrap", justifyContent: "center", maxWidth: 700 }}>
        <PortalCard icon="📝" title="Student Assessment" desc="Take your entrance diagnostic test. Select your band and begin." btnLabel="Start Exam" btnColor="#1a6b3c" onClick={() => setView("exam")} />
        <PortalCard icon="⚙️" title="Admin Panel" desc="Manage branches, view results, and download assessment reports." btnLabel="Admin Login" btnColor="#1a3a6b" onClick={() => setView("admin")} />
      </div>
      <p style={{ marginTop: 48, color: "#4a5a6a", fontSize: 12, letterSpacing: 1 }}>Branches: Bikaner · Ganganagar · Deoli · Nimbahera · Pilibanga · Vijaynagar · Beawar · Jaisalmer · Udaipur</p>
    </div>
  );
}

function PortalCard({ icon, title, desc, btnLabel, btnColor, onClick }) {
  const [hover, setHover] = useState(false);
  return (
    <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={{ background: hover ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.04)", border: "1px solid rgba(200,169,110,0.3)", borderRadius: 16, padding: "32px 28px", width: 280, transition: "all 0.3s", transform: hover ? "translateY(-4px)" : "none", boxShadow: hover ? "0 12px 40px rgba(0,0,0,0.4)" : "0 4px 20px rgba(0,0,0,0.2)" }}>
      <div style={{ fontSize: 40, marginBottom: 12 }}>{icon}</div>
      <h2 style={{ color: "#c8a96e", fontSize: 20, margin: "0 0 10px", fontWeight: 600 }}>{title}</h2>
      <p style={{ color: "#8a9bb0", fontSize: 14, lineHeight: 1.6, margin: "0 0 20px" }}>{desc}</p>
      <button onClick={onClick} style={{ background: btnColor, color: "#fff", border: "none", borderRadius: 8, padding: "10px 24px", fontSize: 14, cursor: "pointer", fontWeight: 600, letterSpacing: 0.5, width: "100%" }}>{btnLabel}</button>
    </div>
  );
}

// ─── ADMIN PAGE ───────────────────────────────────────────────────
function AdminPage({ auth, setAuth, setView, settings, setSettings }) {
  const [pass, setPass] = useState("");
  const [tab, setTab] = useState("results");

  if (!auth) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 20 }}>
        <div style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(200,169,110,0.3)", borderRadius: 16, padding: 40, width: 340, textAlign: "center" }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🔐</div>
          <h2 style={{ color: "#c8a96e", margin: "0 0 20px" }}>Admin Login</h2>
          <input type="password" placeholder="Enter admin password" value={pass} onChange={e => setPass(e.target.value)} onKeyDown={e => e.key === "Enter" && (pass === ADMIN_PASS ? setAuth(true) : alert("Incorrect password"))} style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: "1px solid rgba(200,169,110,0.3)", background: "rgba(255,255,255,0.07)", color: "#e8e0d5", fontSize: 14, boxSizing: "border-box", marginBottom: 12 }} />
          <button onClick={() => pass === ADMIN_PASS ? setAuth(true) : alert("Incorrect password")} style={{ background: "#1a3a6b", color: "#fff", border: "none", borderRadius: 8, padding: "10px 24px", width: "100%", cursor: "pointer", fontSize: 14, fontWeight: 600 }}>Login</button>
          <button onClick={() => setView("home")} style={{ marginTop: 12, background: "transparent", color: "#4a5a6a", border: "none", cursor: "pointer", fontSize: 13 }}>← Back to Home</button>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: "results", label: "📊 Results" },
    { id: "questions", label: "📋 Question Sets" },
    { id: "branches", label: "🏫 Branches" },
    { id: "settings", label: "⚙️ Exam Settings" },
  ];

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 20px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 32, flexWrap: "wrap", gap: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <img src="/logo.png" alt="Logo" style={{ width: 48, height: "auto" }} onError={(e) => e.target.style.display = 'none'} />
          <div>
            <h1 style={{ color: "#c8a96e", margin: 0, fontSize: 26 }}>Admin Panel</h1>
            <p style={{ color: "#4a5a6a", margin: "4px 0 0", fontSize: 13 }}>RYSEN Group of Schools – Assessment Management</p>
          </div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={() => setView("home")} style={{ background: "rgba(255,255,255,0.07)", color: "#8a9bb0", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "8px 16px", cursor: "pointer", fontSize: 13 }}>← Home</button>
          <button onClick={() => setAuth(false)} style={{ background: "rgba(200,50,50,0.2)", color: "#e07070", border: "1px solid rgba(200,50,50,0.3)", borderRadius: 8, padding: "8px 16px", cursor: "pointer", fontSize: 13 }}>Logout</button>
        </div>
      </div>
      <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{ padding: "9px 20px", borderRadius: 8, border: "1px solid", borderColor: tab === t.id ? "#c8a96e" : "rgba(255,255,255,0.1)", background: tab === t.id ? "rgba(200,169,110,0.15)" : "transparent", color: tab === t.id ? "#c8a96e" : "#8a9bb0", cursor: "pointer", fontSize: 13, fontWeight: tab === t.id ? 600 : 400 }}>{t.label}</button>
        ))}
      </div>
      {tab === "results" && <AdminResults />}
      {tab === "questions" && <AdminQuestions />}
      {tab === "branches" && <AdminBranches />}
      {tab === "settings" && <AdminSettings settings={settings} setSettings={setSettings} />}
    </div>
  );
}

function LevelBadge({ label }) {
  if (!label) return <span style={{ color: "#4a5a6a" }}>—</span>;
  const colors = { Secure: "#1a6b3c", Developing: "#6b5a1a", Emerging: "#6b1a1a", "Band 3": "#3a2a6b", "Band 4": "#1a3a6b", "Band 5": "#1a5a6b" };
  const bg = colors[label] || "rgba(255,255,255,0.08)";
  return <span style={{ background: bg, color: "#e8e0d5", borderRadius: 5, padding: "2px 8px", fontSize: 11, fontWeight: 600 }}>{label}</span>;
}

// ─── UTILS: DOWNLOAD RESPONSE KEY ─────────────────────────────────
function downloadResponseKey(s) {
  const band = s.band;
  const bandQ = QUESTIONS[band];
  if (!bandQ) return;
  const optLabels = ["A", "B", "C", "D"];
  const sectionNames = { A: "Language & Communication", B: "Thinking & Reasoning", C: "Number Sense", D: "Interests & Hobbies", E: "School Experience" };
  const rows = [["RYSEN Entrance Diagnostic – Student Response Key"], [`Student: ${s.name}`, `Class: ${s.grade}`, `Phone: ${s.phone}`, `Band: ${s.band}`, `Branch: ${s.branch}`, `Date: ${s.date}`], [], ["Section", "Q#", "Question", "Student Answer", "Correct Answer", "Result"]];
  Object.keys(bandQ).forEach(secKey => {
    const section = bandQ[secKey];
    const isLikert = section.isLikert;
    const isDHobbies = secKey === "D";
    section.questions.forEach((q, i) => {
      const studentAns = s.answers?.[q.id];
      let studentText = "Not answered";
      let correctText = "—";
      let result = "—";
      if (isLikert) { studentText = studentAns !== undefined ? ({ 1: "Always", 2: "Sometimes", 3: "Never" }[studentAns] || "—") : "Not answered"; }
      else if (q.type === "written") { studentText = studentAns ? String(studentAns).replace(/\n/g, " ") : "Not answered"; correctText = "Written (evaluator)"; }
      else if (q.type === "mcq") {
        if (studentAns !== undefined && q.options[studentAns] !== undefined) studentText = `${optLabels[studentAns]}) ${q.options[studentAns]}`;
        if (!isDHobbies && q.answer >= 0) { correctText = `${optLabels[q.answer]}) ${q.options[q.answer]}`; result = (studentAns === q.answer) ? "✓ Correct" : "✗ Wrong"; }
      }
      rows.push([`"${sectionNames[secKey] || secKey}"`, `"${i + 1}"`, `"${q.text.replace(/"/g, "'")}"`, `"${studentText.replace(/"/g, "'")}"`, `"${correctText.replace(/"/g, "'")}"`, `"${result}"`]);
    });
    rows.push([]);
  });
  const csv = "\uFEFF" + rows.map(r => Array.isArray(r) ? r.join(",") : r).join("\n");
  const a = document.createElement("a");
  a.href = "data:text/csv;charset=utf-8," + encodeURIComponent(csv);
  a.download = `ResponseKey_${s.name.replace(/\s+/g, "_")}_${s.date?.replace(/\//g, "-")}.csv`;
  a.click();
}

function AdminResults() {
  const [filter, setFilter] = useState({ branch: "All", band: "All" });
  const [selectedReport, setSelectedReport] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_BASE = import.meta.env.VITE_API_URL || '';

  useEffect(() => {
    fetch(`${API_BASE}/api/submissions`)
      .then(res => res.json())
      .then(json => {
        if (json.success) setData(json.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch submissions", err);
        setLoading(false);
      });
  }, []);

  const filtered = data.filter(s => (filter.branch === "All" || s.branch === filter.branch) && (filter.band === "All" || String(s.band) === filter.band));

  function downloadXLSX() {
    const headers = ["Full Name", "Class / Grade", "Phone Number", "Band", "Branch", "Date of Test", "Time Taken", "Language Level", "Reasoning Level", "Number Sense Level", "Emotional Adjustment", "Social Adjustment", "Hobby Profile"];
    const rows = filtered.map(s => [`"${s.name || ''}"`, `"Grade ${s.grade || ''}"`, `"${s.phone || ''}"`, `"Band ${s.band}"`, `"${s.branch || ''}"`, `"${s.date || ''}"`, `"${s.timeTaken || ''}"`, `"${s.scores?.A?.level || '-'}"`, `"${s.scores?.B?.level || '-'}"`, `"${s.scores?.C?.level || '-'}"`, `"${s.likert?.emotionalLevel || '-'}"`, `"${s.likert?.socialLevel || '-'}"`, `"${s.hobbyProfile || '-'}"`]);
    const csv = "\uFEFF" + [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
    const a = document.createElement("a");
    a.href = "data:text/csv;charset=utf-8," + encodeURIComponent(csv);
    a.download = `RYSEN_Results_${new Date().toLocaleDateString("en-IN").replace(/\//g, "-")}.csv`;
    a.click();
  }


  if (selectedReport) {
    return (<div><button onClick={() => setSelectedReport(null)} style={{ background: "rgba(255,255,255,0.07)", color: "#8a9bb0", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "8px 16px", cursor: "pointer", fontSize: 13, marginBottom: 20 }}>← Back to Results</button><ReportPage submission={selectedReport} setView={null} isAdmin={true} /></div>);
  }

  return (
    <div>
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 20, alignItems: "center" }}>
        <select value={filter.branch} onChange={e => setFilter(f => ({ ...f, branch: e.target.value }))} style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid rgba(200,169,110,0.3)", background: "#1a2a3a", color: "#e8e0d5", fontSize: 13 }}>
          <option value="All">All Branches</option>
          {BRANCHES.map(b => <option key={b}>{b}</option>)}
        </select>
        <select value={filter.band} onChange={e => setFilter(f => ({ ...f, band: e.target.value }))} style={{ padding: "8px 12px", borderRadius: 8, border: "1px solid rgba(200,169,110,0.3)", background: "#1a2a3a", color: "#e8e0d5", fontSize: 13 }}>
          <option value="All">All Bands</option>
          <option value="3">Band 3 (Gr III–V)</option>
          <option value="4">Band 4 (Gr VI–VIII)</option>
          <option value="5">Band 5 (Gr IX–X)</option>
        </select>
        <button onClick={downloadXLSX} style={{ background: "#1a6b3c", color: "#fff", border: "none", borderRadius: 8, padding: "8px 16px", cursor: "pointer", fontSize: 13, fontWeight: 600 }}>📥 Download Excel (.xlsx)</button>
        <span style={{ color: "#4a5a6a", fontSize: 13 }}>{filtered.length} submission(s)</span>
      </div>
      {loading ? (
        <div style={{ textAlign: "center", padding: 60, color: "#4a5a6a" }}><p>Loading remote submissions...</p></div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: 60, color: "#4a5a6a" }}><div style={{ fontSize: 48, marginBottom: 12 }}>📭</div><p>No submissions yet. Students completing exams will appear here.</p></div>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead><tr style={{ borderBottom: "1px solid rgba(200,169,110,0.3)" }}>{["Full Name", "Class", "Phone", "Band", "Branch", "Date", "Language", "Reasoning", "Num. Sense", "Adj.", "Hobby", "Actions"].map(h => (<th key={h} style={{ padding: "8px 12px", textAlign: "left", color: "#c8a96e", fontWeight: 600, whiteSpace: "nowrap" }}>{h}</th>))}</tr></thead>
            <tbody>
              {filtered.map((s, i) => (
                <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", background: i % 2 === 0 ? "rgba(255,255,255,0.02)" : "transparent" }}>
                  <td style={{ padding: "8px 12px", color: "#e8e0d5", fontWeight: 600 }}>{s.name}</td>
                  <td style={{ padding: "8px 12px", color: "#8a9bb0" }}>Gr. {s.grade}</td>
                  <td style={{ padding: "8px 12px", color: "#8a9bb0" }}>{s.phone || "—"}</td>
                  <td style={{ padding: "8px 12px" }}><LevelBadge label={`Band ${s.band}`} /></td>
                  <td style={{ padding: "8px 12px", color: "#8a9bb0" }}>{s.branch}</td>
                  <td style={{ padding: "8px 12px", color: "#8a9bb0" }}>{s.date}</td>
                  <td style={{ padding: "8px 12px" }}><LevelBadge label={s.scores?.A?.level} /></td>
                  <td style={{ padding: "8px 12px" }}><LevelBadge label={s.scores?.B?.level} /></td>
                  <td style={{ padding: "8px 12px" }}><LevelBadge label={s.scores?.C?.level} /></td>
                  <td style={{ padding: "8px 12px", color: "#8a9bb0", fontSize: 11 }}>{s.likert?.emotionalLevel?.split(" ")[0] || "-"}</td>
                  <td style={{ padding: "8px 12px", color: "#8a9bb0", fontSize: 11 }}>{s.hobbyProfile?.split(" ")[0] || "-"}</td>
                  <td style={{ padding: "8px 6px", whiteSpace: "nowrap" }}>
                    <div style={{ display: "flex", gap: 6 }}>
                      <button onClick={() => setSelectedReport(s)} style={{ background: "#1a3a6b", color: "#8ab0e0", border: "none", borderRadius: 6, padding: "5px 9px", cursor: "pointer", fontSize: 11, fontWeight: 600 }} title="View & Print Report">📄 Report</button>
                      <button onClick={() => downloadResponseKey(s)} style={{ background: "rgba(200,169,110,0.15)", color: "#c8a96e", border: "1px solid rgba(200,169,110,0.3)", borderRadius: 6, padding: "5px 9px", cursor: "pointer", fontSize: 11, fontWeight: 600 }} title="Download student's full response key as CSV">🗝 Key</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function AdminSettings({ settings, setSettings }) {
  const [localTimes, setLocalTimes] = useState(settings.timeLimits || { 3: 60, 4: 60, 5: 60 });
  const [activeBand, setActiveBand] = useState(3);
  const [saved, setSaved] = useState(false);

  function updateLocalTime(val) {
    setLocalTimes(prev => ({ ...prev, [activeBand]: val }));
  }

  function save() {
    setSettings({ ...settings, timeLimits: { 3: parseInt(localTimes[3]) || 0, 4: parseInt(localTimes[4]) || 0, 5: parseInt(localTimes[5]) || 0 } });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  const presets = [{ label: "30 min", value: 30 }, { label: "45 min", value: 45 }, { label: "60 min", value: 60 }, { label: "90 min", value: 90 }, { label: "120 min", value: 120 }, { label: "No Limit", value: 0 }];
  const currentVal = localTimes[activeBand];

  return (
    <div style={{ maxWidth: 640 }}>
      <h3 style={{ color: "#c8a96e", margin: "0 0 20px" }}>⚙️ Exam Timer Settings</h3>
      <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(200,169,110,0.25)", borderRadius: 12, padding: 28 }}>
        <p style={{ color: "#8a9bb0", fontSize: 14, margin: "0 0 20px", lineHeight: 1.6 }}>Configure time limits individually for each band. Sets to <strong style={{ color: "#c8a96e" }}>0</strong> for no limit.</p>

        <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
          {[3, 4, 5].map(b => (
            <button key={b} onClick={() => setActiveBand(b)} style={{ padding: "8px 18px", borderRadius: 8, border: "1px solid", borderColor: activeBand === b ? "#c8a96e" : "rgba(255,255,255,0.1)", background: activeBand === b ? "rgba(200,169,110,0.15)" : "transparent", color: activeBand === b ? "#c8a96e" : "#8a9bb0", cursor: "pointer", fontSize: 13, fontWeight: activeBand === b ? 600 : 400 }}>Band {b} Timer</button>
          ))}
        </div>

        <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 8, padding: 20, marginBottom: 24 }}>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: "block", color: "#8a9bb0", fontSize: 13, marginBottom: 10 }}>Quick Presets for Band {activeBand}</label>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {presets.map(p => (<button key={p.value} onClick={() => updateLocalTime(p.value)} style={{ padding: "7px 14px", borderRadius: 7, border: "1px solid", borderColor: currentVal === p.value ? "#c8a96e" : "rgba(255,255,255,0.12)", background: currentVal === p.value ? "rgba(200,169,110,0.18)" : "rgba(255,255,255,0.04)", color: currentVal === p.value ? "#c8a96e" : "#8a9bb0", cursor: "pointer", fontSize: 13, fontWeight: currentVal === p.value ? 700 : 400 }}>{p.label}</button>))}
            </div>
          </div>
          <div>
            <label style={{ display: "block", color: "#8a9bb0", fontSize: 13, marginBottom: 8 }}>Custom Duration (minutes)</label>
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <input type="number" min="0" max="300" value={currentVal} onChange={e => updateLocalTime(parseInt(e.target.value) || 0)} style={{ width: 100, padding: "10px 14px", borderRadius: 8, border: "1px solid rgba(200,169,110,0.3)", background: "rgba(255,255,255,0.07)", color: "#e8e0d5", fontSize: 16, textAlign: "center" }} />
              <span style={{ color: "#4a5a6a", fontSize: 13 }}>minutes {currentVal === 0 ? "(No Limit)" : `= ${Math.floor(currentVal / 60) > 0 ? Math.floor(currentVal / 60) + "h " : ""}${currentVal % 60}m`}</span>
            </div>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <button onClick={save} style={{ background: "linear-gradient(135deg, #1a6b3c, #0f4d2a)", color: "#fff", border: "none", borderRadius: 8, padding: "11px 28px", cursor: "pointer", fontSize: 14, fontWeight: 700 }}>Save All Timers</button>
          {saved && <span style={{ color: "#6be0a0", fontSize: 13 }}>✓ Saved successfully!</span>}
        </div>
      </div>

      <div style={{ marginTop: 20, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 10, padding: "16px 20px" }}>
        <h4 style={{ color: "#c8a96e", margin: "0 0 12px", fontSize: 13 }}>Current Active Settings</h4>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}>
          {[3, 4, 5].map(b => (
            <div key={b}>
              <span style={{ color: "#4a5a6a", fontSize: 12 }}>Band {b}</span>
              <div style={{ color: "#e8e0d5", fontWeight: 700, fontSize: 15 }}>
                {(settings.timeLimits && settings.timeLimits[b]) === 0 ? "No Limit" : `${settings.timeLimits?.[b] || 60} mins`}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AdminQuestions() {
  const [activeBand, setActiveBand] = useState(4);
  const [activeSection, setActiveSection] = useState("A");
  const sections = Object.keys(QUESTIONS[activeBand] || {});
  const section = QUESTIONS[activeBand]?.[activeSection];
  return (
    <div>
      <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
        {[3, 4, 5].map(b => (<button key={b} onClick={() => { setActiveBand(b); setActiveSection("A"); }} style={{ padding: "8px 18px", borderRadius: 8, border: "1px solid", borderColor: activeBand === b ? "#c8a96e" : "rgba(255,255,255,0.1)", background: activeBand === b ? "rgba(200,169,110,0.15)" : "transparent", color: activeBand === b ? "#c8a96e" : "#8a9bb0", cursor: "pointer", fontSize: 13 }}>Band {b} – {BANDS[b].grades}</button>))}
      </div>
      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        {sections.map(s => (<button key={s} onClick={() => setActiveSection(s)} style={{ padding: "6px 14px", borderRadius: 6, border: "1px solid", borderColor: activeSection === s ? "#c8a96e" : "rgba(255,255,255,0.1)", background: activeSection === s ? "rgba(200,169,110,0.12)" : "transparent", color: activeSection === s ? "#c8a96e" : "#8a9bb0", cursor: "pointer", fontSize: 12 }}>Section {s}</button>))}
      </div>
      {section && (
        <div>
          <h3 style={{ color: "#c8a96e", marginBottom: 16 }}>Section {activeSection}: {section.title}</h3>
          {section.questions.map((q, i) => (
            <div key={q.id} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 10, padding: "14px 16px", marginBottom: 10 }}>
              <p style={{ margin: "0 0 8px", color: "#c8d8e8", fontSize: 14 }}><strong style={{ color: "#c8a96e" }}>Q{i + 1}.</strong> {q.text}</p>
              {q.type === "mcq" && q.options && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {q.options.map((opt, j) => (<span key={j} style={{ padding: "3px 10px", borderRadius: 5, fontSize: 12, background: j === q.answer ? "rgba(26,107,60,0.3)" : "rgba(255,255,255,0.05)", border: j === q.answer ? "1px solid #1a6b3c" : "1px solid transparent", color: j === q.answer ? "#6be0a0" : "#8a9bb0" }}>{String.fromCharCode(65 + j)}) {opt}{j === q.answer && " ✓"}</span>))}
                </div>
              )}
              {q.type === "written" && <span style={{ color: "#4a5a6a", fontSize: 12, fontStyle: "italic" }}>Written response</span>}
              {section.isLikert && <span style={{ color: "#4a5a6a", fontSize: 12, fontStyle: "italic" }}>Always / Sometimes / Never</span>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function AdminBranches() {
  return (
    <div>
      <h3 style={{ color: "#c8a96e", marginBottom: 20 }}>RYSEN Group – Campus Branches</h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px,1fr))", gap: 14 }}>
        {BRANCHES.map((b, i) => (
          <div key={b} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(200,169,110,0.2)", borderRadius: 10, padding: "16px 20px" }}>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(200,169,110,0.2)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 8, fontSize: 16 }}>🏫</div>
            <div style={{ color: "#e8e0d5", fontWeight: 600, fontSize: 14 }}>{b}</div>
            <div style={{ color: "#4a5a6a", fontSize: 12, marginTop: 4 }}>Campus {i + 1} · All Bands</div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 24, background: "rgba(255,255,255,0.03)", borderRadius: 10, padding: 20, border: "1px solid rgba(255,255,255,0.07)" }}>
        <h4 style={{ color: "#c8a96e", margin: "0 0 12px" }}>Band Structure</h4>
        {Object.entries(BANDS).map(([b, info]) => (
          <div key={b} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
            <span style={{ background: "rgba(200,169,110,0.15)", color: "#c8a96e", padding: "2px 10px", borderRadius: 5, fontSize: 12, fontWeight: 600, minWidth: 60, textAlign: "center" }}>{info.label}</span>
            <span style={{ color: "#8a9bb0", fontSize: 13 }}>{info.grades}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
// ─── EXAM PAGE ────────────────────────────────────────────────────
function ExamPage({ setView, settings }) {
  const [step, setStep] = useState("info"); // info | exam | report
  const [info, setInfo] = useState({ name: "", phone: "", grade: "", branch: "", band: null });
  const [answers, setAnswers] = useState({});
  const [currentSection, setCurrentSection] = useState("A");
  const [submission, setSubmission] = useState(null);
  const [timer, setTimer] = useState(0);
  const timerRef = useRef(null);
  const submitRef = useRef(null);
  const timeLimitSecs = (settings?.timeLimits?.[info.band] || 0) * 60;

  useEffect(() => {
    if (step === "exam") {
      timerRef.current = setInterval(() => setTimer(t => t + 1), 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [step]);

  // Keep latest submit function for event listeners
  useEffect(() => { submitRef.current = submitExam; });

  // Anti-cheat detection
  useEffect(() => {
    const handleViolation = () => {
      if (step === "exam") {
        alert("🚨 Security Violation Detected 🚨\nYou switched tabs or minimized the window. Your exam is being automatically submitted.");
        if (submitRef.current) submitRef.current();
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) handleViolation();
    };

    if (step === "exam") {
      document.addEventListener("visibilitychange", handleVisibilityChange);
      window.addEventListener("blur", handleViolation);
    }

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleViolation);
    };
  }, [step]);

  // Auto-submit when time runs out
  useEffect(() => {
    if (step === "exam" && timeLimitSecs > 0 && timer >= timeLimitSecs) {
      clearInterval(timerRef.current);
      submitExam();
    }
  }, [timer, step, timeLimitSecs]);

  function startExam() {
    if (!info.name.trim() || !info.phone.trim() || !info.grade || !info.branch || !info.band) {
      alert("Please fill in all fields before starting.");
      return;
    }
    setStep("exam");
  }

  async function submitExam() {
    clearInterval(timerRef.current);
    const band = info.band;
    const bandQ = QUESTIONS[band];
    const scores = {};
    ["A", "B", "C"].forEach(sec => {
      if (bandQ[sec]) {
        const { correct, total } = scoreSection(band, sec, answers);
        scores[sec] = { correct, total, level: getRubricLevel(correct, total) };
      }
    });
    const likert = calcLikert(answers, bandQ);
    const hobbyProfile = getHobbyProfile(answers, band);
    const sub = {
      id: crypto.randomUUID(),
      ...info,
      date: new Date().toLocaleDateString("en-IN"),
      timeTaken: `${Math.floor(timer / 60)}m ${timer % 60}s`,
      answers,
      scores,
      likert,
      hobbyProfile
    };
    const API_BASE = import.meta.env.VITE_API_URL || '';

    try {
      await fetch(`${API_BASE}/api/submissions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sub)
      });
    } catch (e) {
      console.error("Failed to save to server", e);
    }

    setSubmission(sub);
    setStep("report");
  }

  if (step === "info") return <ExamInfoStep info={info} setInfo={setInfo} onStart={startExam} setView={setView} settings={settings} />;
  if (step === "exam") return (
    <ExamSection
      info={info}
      answers={answers}
      setAnswers={setAnswers}
      currentSection={currentSection}
      setCurrentSection={setCurrentSection}
      timer={timer}
      timeLimitSecs={timeLimitSecs}
      onSubmit={submitExam}
    />
  );
  if (step === "report") return <ReportPage submission={submission} setView={setView} />;
}

function ExamInfoStep({ info, setInfo, onStart, setView, settings }) {
  const determineBand = (grade) => {
    const g = parseInt(grade);
    if ([3, 4, 5].includes(g)) return 3;
    if ([6, 7, 8].includes(g)) return 4;
    if ([9, 10].includes(g)) return 5;
    return null;
  };

  const handleGradeChange = (g) => {
    setInfo(i => ({ ...i, grade: g, band: determineBand(g) }));
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 20px" }}>
      <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(200,169,110,0.3)", borderRadius: 16, padding: 40, width: "100%", maxWidth: 500 }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>📋</div>
          <h2 style={{ color: "#c8a96e", margin: 0 }}>Student Details</h2>
          <p style={{ color: "#4a5a6a", fontSize: 13, margin: "6px 0 0" }}>Please fill in your details before starting</p>
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={{ display: "block", color: "#8a9bb0", fontSize: 13, marginBottom: 6 }}>Full Name</label>
          <input type="text" placeholder="Enter your full name" value={info.name}
            onChange={e => setInfo(i => ({ ...i, name: e.target.value }))}
            style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: "1px solid rgba(200,169,110,0.25)", background: "rgba(255,255,255,0.06)", color: "#e8e0d5", fontSize: 14, boxSizing: "border-box" }} />
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={{ display: "block", color: "#8a9bb0", fontSize: 13, marginBottom: 6 }}>Phone Number <span style={{ color: "#4a5a6a", fontSize: 11 }}>(parent/guardian, for reference)</span></label>
          <input type="tel" placeholder="10-digit mobile number" value={info.phone}
            onChange={e => setInfo(i => ({ ...i, phone: e.target.value }))}
            style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: "1px solid rgba(200,169,110,0.25)", background: "rgba(255,255,255,0.06)", color: "#e8e0d5", fontSize: 14, boxSizing: "border-box" }} />
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={{ display: "block", color: "#8a9bb0", fontSize: 13, marginBottom: 6 }}>Class / Grade Applied For</label>
          <select value={info.grade} onChange={e => handleGradeChange(e.target.value)}
            style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: "1px solid rgba(200,169,110,0.25)", background: "#1a2a3a", color: "#e8e0d5", fontSize: 14 }}>
            <option value="">Select Class</option>
            {[3, 4, 5, 6, 7, 8, 9, 10].map(g => <option key={g} value={g}>Class {g}</option>)}
          </select>
        </div>

        {info.band && (
          <div style={{ background: "rgba(200,169,110,0.1)", border: "1px solid rgba(200,169,110,0.3)", borderRadius: 8, padding: "10px 14px", marginBottom: 16 }}>
            <span style={{ color: "#c8a96e", fontSize: 13 }}>✦ Assigned Band: <strong>Band {info.band} – {BANDS[info.band].grades}</strong></span>
          </div>
        )}

        <div style={{ marginBottom: 20 }}>
          <label style={{ display: "block", color: "#8a9bb0", fontSize: 13, marginBottom: 6 }}>Campus / Branch</label>
          <select value={info.branch} onChange={e => setInfo(i => ({ ...i, branch: e.target.value }))}
            style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: "1px solid rgba(200,169,110,0.25)", background: "#1a2a3a", color: "#e8e0d5", fontSize: 14 }}>
            <option value="">Select Branch</option>
            {BRANCHES.map(b => <option key={b}>{b}</option>)}
          </select>
        </div>

        {(settings?.timeLimits?.[info.band] > 0) && (
          <div style={{ background: "rgba(26,58,107,0.2)", border: "1px solid rgba(138,176,224,0.25)", borderRadius: 8, padding: "10px 14px", marginBottom: 20, display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 18 }}>⏱</span>
            <span style={{ color: "#8ab0e0", fontSize: 13 }}>Time Limit: <strong>{settings.timeLimits[info.band]} minutes</strong>. The exam will auto-submit when time is up.</span>
          </div>
        )}

        <button onClick={onStart} style={{ width: "100%", background: "linear-gradient(135deg, #1a6b3c, #0f4d2a)", color: "#fff", border: "none", borderRadius: 10, padding: "13px", fontSize: 15, fontWeight: 700, cursor: "pointer", letterSpacing: 0.5 }}>
          Begin Assessment →
        </button>
        <button onClick={() => setView("home")} style={{ width: "100%", marginTop: 10, background: "transparent", color: "#4a5a6a", border: "none", cursor: "pointer", fontSize: 13, padding: 8 }}>← Back</button>
      </div>
    </div>
  );
}

function ExamSection({ info, answers, setAnswers, currentSection, setCurrentSection, timer, timeLimitSecs, onSubmit }) {
  const band = info.band;
  const sections = Object.keys(QUESTIONS[band] || {});
  const section = QUESTIONS[band]?.[currentSection];
  const [confirmSubmit, setConfirmSubmit] = useState(false);

  function setAnswer(id, val) {
    setAnswers(a => ({ ...a, [id]: val }));
  }

  const mins = String(Math.floor(timer / 60)).padStart(2, "0");
  const secs = String(timer % 60).padStart(2, "0");

  // Countdown mode
  const remaining = timeLimitSecs > 0 ? Math.max(0, timeLimitSecs - timer) : null;
  const remMins = remaining !== null ? String(Math.floor(remaining / 60)).padStart(2, "0") : mins;
  const remSecs = remaining !== null ? String(remaining % 60).padStart(2, "0") : secs;
  const timerWarning = remaining !== null && remaining < 300; // last 5 min

  const progress = sections.reduce((acc, s) => {
    const qs = QUESTIONS[band]?.[s]?.questions || [];
    qs.forEach(q => { if (answers[q.id] !== undefined) acc++; });
    return acc;
  }, 0);
  const total = sections.reduce((acc, s) => acc + (QUESTIONS[band]?.[s]?.questions?.length || 0), 0);

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "24px 20px" }}>
      {/* Top bar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 10 }}>
        <div>
          <div style={{ color: "#c8a96e", fontWeight: 700, fontSize: 15 }}>RYSEN – Band {band} Assessment</div>
          <div style={{ color: "#4a5a6a", fontSize: 12 }}>{info.name} · Grade {info.grade} · {info.branch}</div>
        </div>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <div style={{ background: timerWarning ? "rgba(200,50,50,0.2)" : "rgba(255,255,255,0.05)", borderRadius: 8, padding: "6px 14px", color: timerWarning ? "#e07070" : "#c8a96e", fontFamily: "monospace", fontSize: 16, border: timerWarning ? "1px solid rgba(200,50,50,0.4)" : "none" }}>
            {remaining !== null ? `⏱ ${remMins}:${remSecs}` : `⏱ ${mins}:${secs}`}
            {remaining !== null && <span style={{ fontSize: 10, marginLeft: 4, opacity: 0.7 }}>left</span>}
          </div>
          <div style={{ color: "#4a5a6a", fontSize: 12 }}>{progress}/{total} answered</div>
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ height: 4, background: "rgba(255,255,255,0.08)", borderRadius: 2, marginBottom: 20 }}>
        <div style={{ height: "100%", background: "linear-gradient(90deg, #c8a96e, #1a6b3c)", borderRadius: 2, width: `${total > 0 ? (progress / total) * 100 : 0}%`, transition: "width 0.3s" }} />
      </div>

      {/* Section tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
        {sections.map(s => {
          const sqs = QUESTIONS[band]?.[s]?.questions || [];
          const answered = sqs.filter(q => answers[q.id] !== undefined).length;
          const complete = answered === sqs.length;
          return (
            <button key={s} onClick={() => setCurrentSection(s)} style={{
              padding: "7px 14px", borderRadius: 8, border: "1px solid",
              borderColor: currentSection === s ? "#c8a96e" : complete ? "#1a6b3c" : "rgba(255,255,255,0.1)",
              background: currentSection === s ? "rgba(200,169,110,0.15)" : complete ? "rgba(26,107,60,0.1)" : "transparent",
              color: currentSection === s ? "#c8a96e" : complete ? "#6be0a0" : "#8a9bb0",
              cursor: "pointer", fontSize: 12
            }}>
              {complete ? "✓ " : ""}Sec {s}
            </button>
          );
        })}
      </div>

      {/* Questions */}
      <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: "24px 24px" }}>
        <h3 style={{ color: "#c8a96e", margin: "0 0 20px", fontSize: 16 }}>Section {currentSection}: {section?.title}</h3>

        {section?.isLikert ? (
          <LikertSection questions={section.questions} answers={answers} setAnswer={setAnswer} />
        ) : (
          section?.questions?.map((q, i) => (
            <QuestionBlock key={q.id} q={q} index={i} answer={answers[q.id]} setAnswer={(v) => setAnswer(q.id, v)} />
          ))
        )}
      </div>

      {/* Navigation */}
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 20 }}>
        <button
          onClick={() => {
            const idx = sections.indexOf(currentSection);
            if (idx > 0) setCurrentSection(sections[idx - 1]);
          }}
          disabled={sections.indexOf(currentSection) === 0}
          style={{ background: "rgba(255,255,255,0.06)", color: "#8a9bb0", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "10px 20px", cursor: "pointer", fontSize: 13 }}
        >← Previous</button>

        {sections.indexOf(currentSection) < sections.length - 1 ? (
          <button
            onClick={() => setCurrentSection(sections[sections.indexOf(currentSection) + 1])}
            style={{ background: "#1a3a6b", color: "#8ab0e0", border: "none", borderRadius: 8, padding: "10px 24px", cursor: "pointer", fontSize: 13, fontWeight: 600 }}
          >Next Section →</button>
        ) : (
          <button
            onClick={() => setConfirmSubmit(true)}
            style={{ background: "linear-gradient(135deg, #1a6b3c, #0f4d2a)", color: "#fff", border: "none", borderRadius: 8, padding: "10px 24px", cursor: "pointer", fontSize: 13, fontWeight: 700 }}
          >Submit Assessment ✓</button>
        )}
      </div>

      {confirmSubmit && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 }}>
          <div style={{ background: "#1a2a3a", border: "1px solid rgba(200,169,110,0.4)", borderRadius: 16, padding: 36, maxWidth: 380, textAlign: "center" }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>📤</div>
            <h3 style={{ color: "#c8a96e", margin: "0 0 10px" }}>Submit Assessment?</h3>
            <p style={{ color: "#8a9bb0", fontSize: 14, marginBottom: 20 }}>You have answered {progress} of {total} questions. Once submitted, you cannot go back.</p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
              <button onClick={() => setConfirmSubmit(false)} style={{ background: "rgba(255,255,255,0.07)", color: "#8a9bb0", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "10px 20px", cursor: "pointer" }}>Cancel</button>
              <button onClick={onSubmit} style={{ background: "#1a6b3c", color: "#fff", border: "none", borderRadius: 8, padding: "10px 20px", cursor: "pointer", fontWeight: 700 }}>Submit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function QuestionBlock({ q, index, answer, setAnswer }) {
  return (
    <div style={{ marginBottom: 28, paddingBottom: 24, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
      <p style={{ color: "#c8d8e8", fontSize: 14, lineHeight: 1.7, margin: "0 0 12px" }}>
        <strong style={{ color: "#c8a96e" }}>Q{index + 1}.</strong> {q.text}
      </p>
      {q.type === "mcq" && q.options && (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {q.options.map((opt, j) => (
            <label key={j} style={{
              display: "flex", alignItems: "center", gap: 10, cursor: "pointer",
              background: answer === j ? "rgba(200,169,110,0.12)" : "rgba(255,255,255,0.03)",
              border: `1px solid ${answer === j ? "rgba(200,169,110,0.5)" : "rgba(255,255,255,0.07)"}`,
              borderRadius: 8, padding: "10px 14px", transition: "all 0.2s"
            }}>
              <input type="radio" name={q.id} checked={answer === j} onChange={() => setAnswer(j)}
                style={{ accentColor: "#c8a96e" }} />
              <span style={{ color: answer === j ? "#c8a96e" : "#8a9bb0", fontSize: 14 }}>
                <strong>{String.fromCharCode(65 + j)})</strong> {opt}
              </span>
            </label>
          ))}
        </div>
      )}
      {q.type === "written" && (
        <textarea
          placeholder={q.placeholder}
          value={answer || ""}
          onChange={e => setAnswer(e.target.value)}
          rows={5}
          style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: "1px solid rgba(200,169,110,0.25)", background: "rgba(255,255,255,0.05)", color: "#e8e0d5", fontSize: 13, resize: "vertical", boxSizing: "border-box", lineHeight: 1.6 }}
        />
      )}
    </div>
  );
}

function LikertSection({ questions, answers, setAnswer }) {
  return (
    <div>
      <p style={{ color: "#4a5a6a", fontSize: 12, marginBottom: 16, fontStyle: "italic" }}>
        Read each statement and choose: Always (1) · Sometimes (2) · Never (3). There are no right or wrong answers.
      </p>
      {questions.map((q, i) => (
        <div key={q.id} style={{ marginBottom: 16, background: "rgba(255,255,255,0.03)", borderRadius: 8, padding: "12px 14px", border: "1px solid rgba(255,255,255,0.05)" }}>
          <p style={{ color: "#c8d8e8", fontSize: 13, margin: "0 0 10px" }}><strong style={{ color: "#c8a96e" }}>{i + 1}.</strong> {q.text}</p>
          <div style={{ display: "flex", gap: 10 }}>
            {[["Always", 1], ["Sometimes", 2], ["Never", 3]].map(([label, val]) => (
              <label key={val} style={{
                display: "flex", alignItems: "center", gap: 6, cursor: "pointer",
                background: answers[q.id] === val ? "rgba(200,169,110,0.15)" : "rgba(255,255,255,0.04)",
                border: `1px solid ${answers[q.id] === val ? "rgba(200,169,110,0.5)" : "rgba(255,255,255,0.07)"}`,
                borderRadius: 6, padding: "6px 12px"
              }}>
                <input type="radio" name={q.id} checked={answers[q.id] === val} onChange={() => setAnswer(q.id, val)} style={{ accentColor: "#c8a96e" }} />
                <span style={{ color: answers[q.id] === val ? "#c8a96e" : "#8a9bb0", fontSize: 12 }}>{label}</span>
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── REPORT PAGE ─────────────────────────────────────────────────
function ReportPage({ submission, setView, isAdmin }) {
  const s = submission;
  const reportRef = useRef(null);

  function downloadPDF() {
    const printContent = reportRef.current?.innerHTML;
    if (!printContent) return;
    const win = window.open("", "_blank");
    win.document.write(`<!DOCTYPE html>
<html>
<head>
  <title>RYSEN Diagnostic Report – ${s.name}</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: Georgia, serif; color: #1a1a2e; background: #fff; padding: 0; }
    table { border-collapse: collapse; width: 100%; }
    th, td { border: 1px solid #c8d8e8; padding: 7px 10px; font-size: 12px; }
    @media print {
      body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      .no-print { display: none !important; }
    }
  </style>
</head>
<body>${printContent}</body>
</html>`);
    win.document.close();
    setTimeout(() => { win.focus(); win.print(); win.close(); }, 400);
  }

  // ── Per-indicator rubric levels based on scores ──
  const lvl = (sec) => s.scores?.[sec]?.level || "Emerging";
  const AL = lvl("A"); const BL = lvl("B"); const CL = lvl("C");

  // Band-specific indicator tables
  const indicatorsA = {
    3: [
      ["Reading Comprehension", "Q1–Q5", AL],
      ["Vocabulary Understanding", "Q4, Q5", AL],
      ["Grammar Usage", "Q6", AL],
      ["Parts of Speech Identification", "Q8", AL],
      ["Punctuation Awareness", "Q9", AL],
      ["Adverb / Word Usage", "Q10", AL],
      ["Written Expression (Creative Writing)", "Q11", AL],
    ],
    4: [
      ["Reading Comprehension", "Q1–Q5", AL],
      ["Vocabulary Understanding", "Q4, Q7", AL],
      ["Grammar Usage", "Q6, Q9, Q10", AL],
      ["Sentence Structure Awareness", "Q6", AL],
      ["Parts of Speech Identification", "Q8", AL],
      ["Punctuation Awareness", "Q9", AL],
      ["Written Expression (Creative Writing)", "Q11 – Letter Writing", AL],
      ["Organisation & Coherence", "Q11", AL],
      ["Vocabulary in Writing", "Q11", AL],
    ],
    5: [
      ["Reading Comprehension", "Q1–Q5", AL],
      ["Vocabulary & Idiom Understanding", "Q7", AL],
      ["Grammar – Reported Speech", "Q6", AL],
      ["Narrative Writing", "Q8", AL],
      ["Diary Writing", "Q9", AL],
    ],
  };

  const indicatorsB = {
    3: [
      ["Pattern Completion", "Q1", BL],
      ["Classification / Odd One Out", "Q2", BL],
      ["Sequencing & Logical Order", "Q3", BL],
      ["Shape Reasoning", "Q4", BL],
      ["Deductive Reasoning", "Q5", BL],
    ],
    4: [
      ["Identifying the Odd One Out", "Q12", BL],
      ["Pattern Completion (Double Pattern)", "Q13", BL],
      ["Syllogism & Logical Conclusion", "Q14", BL],
      ["Alphabet–Number Sequence Logic", "Q15", BL],
      ["Direction Sense & Spatial Reasoning", "Q16", BL],
      ["Logical Contradiction", "Q17", BL],
      ["Coding–Decoding / Hard Logical Reasoning", "Q18", BL],
    ],
    5: [
      ["Deductive Reasoning", "Q10", BL],
      ["Syllogism", "Q11", BL],
      ["Number Series Completion", "Q12", BL],
      ["Calendar & Day Logic", "Q13", BL],
      ["Logical Fallacy Identification", "Q14", BL],
      ["Analogy", "Q15", BL],
      ["Assumption & Evidence", "Q16", BL],
    ],
  };

  const indicatorsC = {
    3: [
      ["Number Names & Place Value", "Q7", CL],
      ["Number Comparison & Ordering", "Q8", CL],
      ["Basic Operations – Word Problems", "Q9", CL],
    ],
    4: [
      ["Understanding of Fractions & Decimals", "Q19", CL],
      ["Concept of Terminating & Non-terminating Decimals", "Q20", CL],
      ["Rational & Irrational Numbers", "Q21", CL],
      ["HCF–LCM Relationship", "Q22", CL],
      ["Divisibility Rules", "Q23", CL],
      ["Comparison of Decimals", "Q24", CL],
      ["Remainder Theorem / Logical Reasoning", "Q25", CL],
    ],
    5: [
      ["Ordering Fractions & Decimals", "Q17", CL],
      ["Percentage & Discount", "Q18", CL],
      ["Ratio & Proportion", "Q19", CL],
      ["Number Patterns", "Q20", CL],
      ["Perimeter & Mensuration", "Q21", CL],
      ["Number Properties", "Q22", CL],
      ["Speed, Distance & Time", "Q23", CL],
      ["Percentage Application", "Q24", CL],
    ],
  };

  const indicatorsD = [
    ["Personal Interests Awareness", "Q1, Q6, Q10", "Secure"],
    ["Social Preference & Interaction", "Q2, Q9", "Secure"],
    ["Learning Preference", "Q4, Q11", "Secure"],
    ["Creative & Co-curricular Inclination", "Q3, Q7, Q8", "Secure"],
    ["Motivation & Emotional Drive", "Q5, Q12", "Secure"],
    ["Growth Mindset & Self-improvement", "Q13", "Secure"],
    ["Aspirations & Future Orientation", "Q14, Q15", "Secure"],
  ];

  const band = s.band;

  const levelColor = (l) => l === "Secure" ? { bg: "#e8f5ee", color: "#1a6b3c", border: "#a8d5b8" } :
    l === "Developing" ? { bg: "#fef9e7", color: "#8b6914", border: "#f0d090" } :
      { bg: "#fde8e8", color: "#8b1a1a", border: "#e0a0a0" };

  const thStyle = { background: "#1a3a6b", color: "#c8a96e", padding: "8px 12px", fontSize: 12, fontWeight: 700, textAlign: "left", border: "1px solid #2a4a7b" };
  const tdStyle = { padding: "8px 12px", fontSize: 12, borderBottom: "1px solid #e0e8f0", color: "#2a3a4a" };

  const SectionTable = ({ title, indicators }) => (
    <div style={{ marginBottom: 22 }}>
      <div style={{ background: "#1a3a6b", color: "#fff", padding: "8px 14px", fontWeight: 700, fontSize: 13, borderRadius: "6px 6px 0 0" }}>{title}</div>
      <table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid #c8d8e8" }}>
        <thead>
          <tr>
            <th style={thStyle}>Indicator</th>
            <th style={{ ...thStyle, width: 160 }}>Reference Question</th>
            <th style={{ ...thStyle, width: 130, textAlign: "center" }}>Readiness Level</th>
          </tr>
        </thead>
        <tbody>
          {indicators.map(([ind, ref, lv], i) => {
            const c = levelColor(lv);
            return (
              <tr key={i} style={{ background: i % 2 === 0 ? "#fff" : "#f8fafc" }}>
                <td style={tdStyle}>{ind}</td>
                <td style={{ ...tdStyle, color: "#4a5a6a" }}>{ref}</td>
                <td style={{ ...tdStyle, textAlign: "center" }}>
                  <span style={{ display: "inline-block", padding: "3px 14px", borderRadius: 5, fontWeight: 700, fontSize: 11, background: c.bg, color: c.color, border: `1px solid ${c.border}` }}>{lv}</span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  // Teacher observation notes from sample
  const teacherNotes = {
    A: {
      Emerging: "Emerging learners need additional support with reading comprehension, vocabulary building, and structured writing. Focus on guided reading and sentence formation.",
      Developing: "Developing learners show understanding with cues and can form simple sentences with effort. Continued practice with reading and writing will strengthen skills.",
      Secure: "Secure learners demonstrate strong comprehension, vocabulary usage, and creative expression. They communicate ideas clearly and independently."
    },
    B: {
      Emerging: "Emerging learners struggle with pattern recognition and logical connections. Hands-on reasoning activities and visual aids will help build foundational thinking skills.",
      Developing: "Developing learners show logical progression and can correct errors upon reflection. Guided reasoning tasks will further strengthen analytical ability.",
      Secure: "Secure learners demonstrate clarity, speed, and confidence in reasoning tasks. They independently identify patterns and draw logical conclusions."
    },
    C: {
      Emerging: "Emerging learners require step-by-step support with number operations and concept application. Structured practice with manipulatives and real-life problems is recommended.",
      Developing: "Developing learners show basic understanding in familiar problem types. Regular practice across varied contexts will consolidate mathematical reasoning.",
      Secure: "Secure learners apply number concepts accurately and efficiently across contexts, including real-life problem-solving situations."
    }
  };

  return (
    <div style={{ maxWidth: 820, margin: "0 auto", padding: "32px 20px" }}>
      {/* Action buttons */}
      <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap" }}>
        <button onClick={downloadPDF} style={{ background: "linear-gradient(135deg, #1a3a6b, #0f2a4a)", color: "#8ab0e0", border: "1px solid rgba(138,176,224,0.4)", borderRadius: 8, padding: "11px 22px", cursor: "pointer", fontSize: 14, fontWeight: 600 }}>
          📥 Download / Print PDF
        </button>
        {!isAdmin && (
          <button onClick={() => setView("home")} style={{ background: "rgba(255,255,255,0.06)", color: "#8a9bb0", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "11px 18px", cursor: "pointer", fontSize: 13 }}>
            ← Back to Home
          </button>
        )}
      </div>

      {/* ── PRINTABLE REPORT ── */}
      <div ref={reportRef} style={{ background: "#fff", color: "#1a1a2e", borderRadius: 12, overflow: "hidden", boxShadow: "0 8px 40px rgba(0,0,0,0.4)" }}>

        {/* Header */}
        <div style={{ background: "linear-gradient(135deg, #0f2a4a, #1a3a6b)", padding: "26px 36px", display: "flex", alignItems: "center", gap: 24 }}>
          <img src="/logo.png" alt="RYSEN Group Logo" style={{ width: 64, height: "auto", flexShrink: 0, filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.3))" }} onError={(e) => { e.target.onerror = null; e.target.outerHTML = '<div style="width: 52px; height: 52px; border-radius: 50%; background: rgba(200,169,110,0.3); display: flex; align-items: center; justify-content: center; font-size: 22px; flex-shrink: 0;">🎓</div>'; }} />
          <div>
            <h1 style={{ color: "#c8a96e", margin: 0, fontSize: 21, fontWeight: 700, letterSpacing: 1 }}>RYSEN Group of Schools</h1>
            <p style={{ color: "rgba(200,220,255,0.75)", margin: "3px 0 0", fontSize: 13 }}>Entrance Diagnostic Report</p>
          </div>
        </div>

        <div style={{ padding: "28px 36px" }}>

          {/* ── Applicant Details ── */}
          <div style={{ background: "#f8f6f2", border: "1px solid #e8e0d0", borderRadius: 8, padding: "16px 20px", marginBottom: 24 }}>
            <div style={{ fontWeight: 700, color: "#1a3a6b", fontSize: 13, marginBottom: 12, textTransform: "uppercase", letterSpacing: 1 }}>Applicant Details</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px 24px", fontSize: 13 }}>
              {[
                ["Student Name", s.name],
                ["Class Applied For", "Class " + s.grade],
                ["Assessment Band", `Band ${band} – ${BANDS[band]?.grades}`],
                ["Phone Number", s.phone],
                ["Campus", s.branch],
                ["Date of Assessment", s.date],
              ].map(([k, v]) => (
                <div key={k}>
                  <span style={{ color: "#6a7a8a", fontSize: 11, display: "block", marginBottom: 2 }}>{k}</span>
                  <span style={{ color: "#1a2a3a", fontWeight: 600 }}>{v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Purpose ── */}
          <div style={{ marginBottom: 22 }}>
            <div style={{ fontWeight: 700, color: "#1a3a6b", fontSize: 13, marginBottom: 8, textTransform: "uppercase", letterSpacing: 1 }}>Purpose of the Entrance Assessment</div>
            <p style={{ color: "#3a4a5a", fontSize: 13, lineHeight: 1.75, margin: 0 }}>
              The Readiness & Learning Profile is an entrance-stage diagnostic assessment conducted to understand the child's learning readiness and learning behaviours based on age-appropriate tasks. This assessment uses developmental descriptors, not marks or ranks, and supports informed admission conversations.
            </p>
          </div>

          {/* ── Section A ── */}
          <SectionTable
            title="Domain – Section A: Language & Communication"
            indicators={(indicatorsA[band] || indicatorsA[4])}
          />
          {/* Teacher note A */}
          <div style={{ background: "#f5f9ff", border: "1px solid #c8d8f0", borderRadius: 6, padding: "10px 14px", marginBottom: 22, fontSize: 12, color: "#2a3a5a", lineHeight: 1.6 }}>
            <strong>Teacher Observation Notes:</strong> {teacherNotes.A[AL]}
          </div>

          {/* ── Section B ── */}
          <SectionTable
            title="Domain – Section B: Thinking & Reasoning"
            indicators={(indicatorsB[band] || indicatorsB[4])}
          />
          <div style={{ background: "#f5f9ff", border: "1px solid #c8d8f0", borderRadius: 6, padding: "10px 14px", marginBottom: 22, fontSize: 12, color: "#2a3a5a", lineHeight: 1.6 }}>
            <strong>Teacher Observation Notes:</strong> {teacherNotes.B[BL]}
          </div>

          {/* ── Section C ── */}
          <SectionTable
            title="Domain – Section C: Number Sense & Logical Understanding"
            indicators={(indicatorsC[band] || indicatorsC[4])}
          />
          <div style={{ background: "#f5f9ff", border: "1px solid #c8d8f0", borderRadius: 6, padding: "10px 14px", marginBottom: 22, fontSize: 12, color: "#2a3a5a", lineHeight: 1.6 }}>
            <strong>Teacher Observation Notes:</strong> {teacherNotes.C[CL]}
          </div>

          {/* ── Section D: Interests & Hobbies ── */}
          <SectionTable
            title="Domain – Section D: Interests & Hobbies"
            indicators={indicatorsD}
          />

          {/* ── Emotional & Social ── */}
          <div style={{ marginBottom: 22 }}>
            <div style={{ background: "#1a3a6b", color: "#fff", padding: "8px 14px", fontWeight: 700, fontSize: 13, borderRadius: "6px 6px 0 0" }}>Learning Disposition – Emotional & Social Adjustment</div>
            <div style={{ border: "1px solid #c8d8e8", borderTop: "none", borderRadius: "0 0 6px 6px", overflow: "hidden" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    <th style={thStyle}>Domain</th>
                    <th style={{ ...thStyle, width: 260 }}>Adjustment Level</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={tdStyle}>Emotional Adjustment at School</td>
                    <td style={{ ...tdStyle, fontWeight: 700, color: "#1a3a6b" }}>{s.likert?.emotionalLevel || "—"}</td>
                  </tr>
                  <tr style={{ background: "#f8fafc" }}>
                    <td style={tdStyle}>Social Adjustment with Peers & Teachers</td>
                    <td style={{ ...tdStyle, fontWeight: 700, color: "#1a3a6b" }}>{s.likert?.socialLevel || "—"}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* ── Entrance Test Performance Analysis ── */}
          <div style={{ marginBottom: 22, background: "#f8f6f2", border: "1px solid #e0d8c8", borderRadius: 8, padding: "16px 20px" }}>
            <div style={{ fontWeight: 700, color: "#1a3a6b", fontSize: 13, marginBottom: 10, textTransform: "uppercase", letterSpacing: 1 }}>Entrance Test Performance Analysis</div>
            <p style={{ color: "#3a4a5a", fontSize: 13, lineHeight: 1.75, margin: "0 0 10px" }}>
              Based on rubric-aligned observations across all entrance tasks, the student demonstrates current readiness to engage with <strong>Class {s.grade}</strong> learning expectations.
              {AL === "Secure" && BL === "Secure" && CL === "Secure"
                ? " The student has shown strong performance across all domains and is well-prepared for the class curriculum."
                : AL === "Emerging" && BL === "Emerging" && CL === "Emerging"
                  ? " The student shows difficulty with detailed concept application in some areas. However, basic understanding is present and most questions were attempted sincerely."
                  : " The student shows a mixed profile with strengths in some areas and scope for development in others. With proper guidance and structured support, the student has the potential to progress well."}
            </p>
            <div style={{ fontWeight: 700, color: "#1a3a6b", fontSize: 13, marginBottom: 8 }}>Academic Readiness</div>
            <p style={{ color: "#3a4a5a", fontSize: 13, lineHeight: 1.75, margin: 0 }}>
              {AL === "Secure" && BL === "Secure" && CL === "Secure"
                ? "The student meets the required criteria for Class " + s.grade + " and demonstrates confidence across language, reasoning, and number sense domains."
                : "Although the student may not have met all criteria in every domain, they show a willingness to learn and demonstrate foundational knowledge. With proper guidance, regular practice, and additional academic support, the student has the potential to improve and cope with the Class " + s.grade + " curriculum."}
            </p>
          </div>

          {/* ── Interests Profile Summary ── */}
          <div style={{ marginBottom: 22, background: "#f0f4ff", border: "1px solid #c0cde0", borderRadius: 8, padding: "14px 18px" }}>
            <div style={{ fontWeight: 700, color: "#1a3a6b", fontSize: 13, marginBottom: 6 }}>Student Interest & Learning Profile</div>
            <p style={{ color: "#3a4a5a", fontSize: 13, margin: 0 }}>
              Based on the Interests & Hobbies section, the student's primary inclination is: <strong style={{ color: "#1a3a6b" }}>{s.hobbyProfile}</strong>.
              This profile can be used to shape co-curricular engagement and personalise classroom motivation strategies.
            </p>
          </div>

          {/* ── Important Note for Parents ── */}
          <div style={{ marginBottom: 22, background: "#fffbf0", border: "1px solid #f0d090", borderRadius: 8, padding: "14px 18px" }}>
            <div style={{ fontWeight: 700, color: "#8b6914", fontSize: 13, marginBottom: 6 }}>📋 Important Note for Parents</div>
            <p style={{ color: "#5a4a2a", fontSize: 12, lineHeight: 1.75, margin: 0 }}>
              This profile reflects the child's learning readiness at the time of admission. Children develop at different rates, and this information supports a smooth and supportive transition into formal schooling. This is a diagnostic profile — not a pass/fail result.
            </p>
          </div>

          {/* ── Signature ── */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, marginTop: 24 }}>
            {["Assessor / Teacher Name", "Signature"].map(l => (
              <div key={l}>
                <div style={{ color: "#6a7a8a", fontSize: 12, marginBottom: 6 }}>{l}</div>
                <div style={{ height: 38, borderBottom: "2px solid #c8a96e" }} />
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: 22, paddingTop: 14, borderTop: "1px solid #e8e0d0" }}>
            <p style={{ color: "#9a8a7a", fontSize: 10, margin: 0, letterSpacing: 0.5 }}>RYSEN Group of Schools · Entrance Diagnostic Assessment · Confidential Document</p>
          </div>

        </div>
      </div>

      {/* Bottom CTA for students */}
      {!isAdmin && (
        <div style={{ marginTop: 24, textAlign: "center" }}>
          <div style={{ display: "flex", justifyContent: "center", gap: 14, flexWrap: "wrap" }}>
            <button onClick={downloadPDF} style={{ background: "linear-gradient(135deg, #1a6b3c, #0f4d2a)", color: "#fff", border: "none", borderRadius: 10, padding: "13px 40px", fontSize: 15, fontWeight: 700, cursor: "pointer", letterSpacing: 0.5 }}>
              📥 Download Your Report (PDF)
            </button>
            <button onClick={() => downloadResponseKey(submission)} style={{ background: "transparent", color: "#c8a96e", border: "2px solid #c8a96e", borderRadius: 10, padding: "11px 30px", fontSize: 15, fontWeight: 700, cursor: "pointer", letterSpacing: 0.5 }}>
              🗝 Download Response Key
            </button>
          </div>
          <p style={{ color: "#4a5a6a", fontSize: 12, marginTop: 10 }}>Opens print dialog — choose "Save as PDF" to download</p>
          <button onClick={() => setView("home")} style={{ marginTop: 12, background: "transparent", color: "#4a5a6a", border: "none", cursor: "pointer", fontSize: 13 }}>← Back to Home</button>
        </div>
      )}
    </div>
  );
}
