import React, { useState, useEffect } from 'react';
import { MapPin, Calendar, DollarSign, Thermometer, Star, Users, Search, Sparkles, Heart, Navigation, Brain, TrendingUp } from 'lucide-react';

function App() {
  const [preferences, setPreferences] = useState({
    budget: 'medium',
    climate: 'warm',
    activities: [],
    travelers: 'solo',
    duration: '7'
  });
  
  const [recommendations, setRecommendations] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [userHistory, setUserHistory] = useState([]);
  const [mlPredictions, setMlPredictions] = useState([]);
  const [aiInsights, setAiInsights] = useState('');
  const [isLearning, setIsLearning] = useState(false);

  const destinations = [

{
id: 1,
name: 'Bali, Indonesia',
country: 'Indonesia',
currency: 'IDR',
symbol: 'Rp',
image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400',
budget: 'low',
climate: 'warm',
activities: ['beach','culture','adventure','food'],
description: 'Tropical paradise with temples and beaches',
avgCost: 'Rp12,000,000–18,000,000',
bestMonths: 'Apr-Oct',
rating: 4.8,
reviewsCount: 2540,
reviews: ["Beautiful beaches!", "Affordable and scenic."],
languages: ['Indonesian','English'],
transport: [
{ type: "Scooter", cost: "Rp70,000–150,000/day" },
{ type: "Taxi", cost: "Rp7,000/km" }
],
highlights: ['Uluwatu Temple','Tegalalang Rice Terraces'],
popularity: 95
},

{
id: 2,
name: 'Tokyo, Japan',
country: 'Japan',
currency: 'JPY',
symbol: '¥',
image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400',
budget: 'high',
climate: 'moderate',
activities: ['culture','food','shopping','urban'],
description: 'Technology meets tradition',
avgCost: '¥280,000–420,000',
bestMonths: 'Mar-May',
rating: 4.9,
reviewsCount: 4100,
reviews: ["Clean and safe!", "Amazing transport system."],
languages: ['Japanese','English (Limited)'],
transport: [
{ type: "Metro Pass", cost: "¥800–1,200/day" },
{ type: "Taxi", cost: "¥500/km" }
],
highlights: ['Shibuya Crossing','Mount Fuji'],
popularity: 98
},

{
id: 3,
name: 'Iceland',
country: 'Iceland',
currency: 'ISK',
symbol: 'kr',
image: 'https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=400',
budget: 'high',
climate: 'cold',
activities: ['adventure','nature','photography'],
description: 'Land of fire and ice',
avgCost: 'kr350,000–500,000',
bestMonths: 'Jun-Aug',
rating: 4.7,
reviewsCount: 1880,
reviews: ["Northern Lights are magical!", "Expensive but worth it."],
languages: ['Icelandic','English'],
transport: [
{ type: "Car Rental", cost: "kr11,000/day" }
],
highlights: ['Blue Lagoon','Vatnajökull Glacier'],
popularity: 88
},

{
id: 4,
name: 'Paris, France',
country: 'France',
currency: 'EUR',
symbol: '€',
image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400',
budget: 'high',
climate: 'moderate',
activities: ['culture','food','urban'],
description: 'City of love and art',
avgCost: '€1,600–2,300',
bestMonths: 'Apr-Jun',
rating: 4.8,
reviewsCount: 5200,
reviews: ["Romantic vibes!", "Incredible architecture."],
languages: ['French','English (Tourist Areas)'],
transport: [
{ type: "Metro", cost: "€2/trip" },
{ type: "Taxi", cost: "€3/km" }
],
highlights: ['Eiffel Tower','Louvre Museum'],
popularity: 97
},

{
id: 5,
name: 'Dubai, UAE',
country: 'UAE',
currency: 'AED',
symbol: 'AED ',
image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=400',
budget: 'high',
climate: 'warm',
activities: ['urban','shopping','adventure'],
description: 'Luxury desert metropolis',
avgCost: 'AED 5,500–9,000',
bestMonths: 'Nov-Mar',
rating: 4.7,
reviewsCount: 3000,
reviews: ["Luxury everywhere!", "Great desert safari."],
languages: ['Arabic','English'],
transport: [
{ type: "Metro", cost: "AED 20/day pass" },
{ type: "Taxi", cost: "AED 2/km" }
],
highlights: ['Burj Khalifa','Desert Safari'],
popularity: 94
},

{
id: 6,
name: 'Rome, Italy',
country: 'Italy',
currency: 'EUR',
symbol: '€',
image: 'https://images.unsplash.com/photo-1529260830199-42c24126f198?w=400',
budget: 'medium',
climate: 'warm',
activities: ['culture','food'],
description: 'Historic city with ancient ruins',
avgCost: '€1,300–1,900',
bestMonths: 'Apr-Jun',
rating: 4.7,
reviewsCount: 2800,
reviews: ["Colosseum is breathtaking!", "Best pasta ever."],
languages: ['Italian','English (Tourist Areas)'],
transport: [
{ type: "Metro", cost: "€2/trip" }
],
highlights: ['Colosseum','Vatican City'],
popularity: 91
},

{
id: 7,
name: 'Maldives',
country: 'Maldives',
currency: 'USD',
symbol: '$',
image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400',
budget: 'high',
climate: 'warm',
activities: ['beach','nature'],
description: 'Luxury island escape',
avgCost: '$3,000–5,000',
bestMonths: 'Nov-Apr',
rating: 4.9,
reviewsCount: 2100,
reviews: ["Crystal clear water!", "Perfect honeymoon spot."],
languages: ['Dhivehi','English'],
transport: [
{ type: "Speedboat", cost: "$50/trip" }
],
highlights: ['Overwater Villas'],
popularity: 96
},

{
id: 8,
name: 'New York, USA',
country: 'USA',
currency: 'USD',
symbol: '$',
image: 'https://www.gannett-cdn.com/presto/2019/12/09/USAT/795f4dfa-d536-4b79-80e9-8b2369140283-12_-_NYC.jpg?crop=2119,1192,x0,y108&width=2119&height=1192&format=pjpg&auto=webp',
budget: 'high',
climate: 'moderate',
activities: ['urban','shopping','food'],
description: 'City that never sleeps',
avgCost: '$2,000–3,500',
bestMonths: 'Sep-Nov',
rating: 4.8,
reviewsCount: 6000,
reviews: ["Times Square is iconic!", "Food diversity unmatched."],
languages: ['English'],
transport: [
{ type: "Subway", cost: "$3/trip" },
{ type: "Taxi", cost: "$3/km" }
],
highlights: ['Statue of Liberty'],
popularity: 99
},

{
id: 9,
name: 'Bangkok, Thailand',
country: 'Thailand',
currency: 'THB',
symbol: '฿',
image: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=400',
budget: 'low',
climate: 'warm',
activities: ['food','culture','shopping'],
description: 'Street food paradise',
avgCost: '฿25,000–40,000',
bestMonths: 'Nov-Feb',
rating: 4.7,
reviewsCount: 3200,
reviews: ["Best street food!", "Affordable and lively."],
languages: ['Thai','English (Tourist Areas)'],
transport: [
{ type: "Skytrain", cost: "฿60/trip" }
],
highlights: ['Grand Palace'],
popularity: 93
},

{
id: 10,
name: 'Sydney, Australia',
country: 'Australia',
currency: 'AUD',
symbol: 'A$',
image: 'https://th.bing.com/th/id/OIP.Wnq9kb0x6npNtDLYs96FUAHaE7?o=7&cb=defcache2&rm=3&defcache=1&rs=1&pid=ImgDetMain&o=7&rm=3',
budget: 'high',
climate: 'moderate',
activities: ['beach','urban'],
description: 'Harbour city with iconic opera house',
avgCost: 'A$3,500–5,000',
bestMonths: 'Sep-Nov',
rating: 4.8,
reviewsCount: 2800,
reviews: ["Opera House is stunning!", "Beautiful beaches."],
languages: ['English'],
transport: [
{ type: "Train", cost: "A$4/trip" }
],
highlights: ['Sydney Opera House'],
popularity: 90
},

{
id: 11,
name: 'Barcelona, Spain',
country: 'Spain',
currency: 'EUR',
symbol: '€',
image: 'https://images2.alphacoders.com/866/866544.jpg',
budget: 'medium',
climate: 'warm',
activities: ['culture','food','beach','urban'],
description: 'Vibrant city with stunning architecture',
avgCost: '€1,200–1,800',
bestMonths: 'May-Sep',
rating: 4.8,
reviewsCount: 3100,
reviews: ["Gaudi architecture is unreal!", "Great food and beaches."],
languages: ['Spanish','Catalan','English (Tourist Areas)'],
transport: [
{ type: "Metro", cost: "€2.5/trip" }
],
highlights: ['Sagrada Familia','Park Güell'],
popularity: 92
},

{
id: 12,
name: 'Cape Town, South Africa',
country: 'South Africa',
currency: 'ZAR',
symbol: 'R',
image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400',
budget: 'medium',
climate: 'moderate',
activities: ['nature','adventure','beach'],
description: 'Coastal beauty with Table Mountain',
avgCost: 'R20,000–35,000',
bestMonths: 'Nov-Mar',
rating: 4.7,
reviewsCount: 2200,
reviews: ["Table Mountain views!", "Amazing wildlife."],
languages: ['English','Afrikaans','Zulu'],
transport: [
{ type: "Uber", cost: "R10/km" }
],
highlights: ['Table Mountain','Cape Point'],
popularity: 85
},

{
id: 13,
name: 'Rio de Janeiro, Brazil',
country: 'Brazil',
currency: 'BRL',
symbol: 'R$',
image: 'https://tse4.mm.bing.net/th/id/OIP.pZh-H7Q6x3eDTyFOcyKrjQHaE8?rs=1&pid=ImgDetMain&o=7&rm=3',
budget: 'medium',
climate: 'warm',
activities: ['beach','culture','adventure'],
description: 'Energetic city with iconic beaches',
avgCost: 'R$6,000–10,000',
bestMonths: 'Dec-Mar',
rating: 4.6,
reviewsCount: 2600,
reviews: ["Carnival vibes!", "Christ the Redeemer is majestic."],
languages: ['Portuguese','English (Limited)'],
transport: [
{ type: "Metro", cost: "R$6/trip" }
],
highlights: ['Christ the Redeemer','Copacabana Beach'],
popularity: 89
},

{
id: 14,
name: 'Zurich, Switzerland',
country: 'Switzerland',
currency: 'CHF',
symbol: 'CHF',
image: 'https://images.unsplash.com/photo-1505761671935-60b3a7427bad?w=400',
budget: 'high',
climate: 'cold',
activities: ['nature','hiking','urban'],
description: 'Luxury alpine city',
avgCost: 'CHF3,000–4,500',
bestMonths: 'Jun-Sep',
rating: 4.8,
reviewsCount: 1800,
reviews: ["Clean and scenic!", "Swiss Alps are stunning."],
languages: ['German','French','Italian','English'],
transport: [
{ type: "Train", cost: "CHF5/trip" }
],
highlights: ['Lake Zurich','Swiss Alps'],
popularity: 87
},

{
id: 15,
name: 'Singapore',
country: 'Singapore',
currency: 'SGD',
symbol: 'S$',
image: 'https://th.bing.com/th/id/OIP.AjmYmsChvhv6mJbbpJKKNgHaEK?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3',
budget: 'high',
climate: 'warm',
activities: ['urban','food','shopping'],
description: 'Futuristic garden city',
avgCost: 'S$2,500–4,000',
bestMonths: 'Feb-Apr',
rating: 4.9,
reviewsCount: 3400,
reviews: ["Super clean!", "Food heaven."],
languages: ['English','Malay','Mandarin','Tamil'],
transport: [
{ type: "MRT", cost: "S$2/trip" }
],
highlights: ['Marina Bay Sands','Gardens by the Bay'],
popularity: 96
},

{
id: 16,
name: 'Istanbul, Turkey',
country: 'Turkey',
currency: 'TRY',
symbol: '₺',
image: 'https://idealmagazine.co.uk/wp-content/uploads/2020/08/9-PLACES-TO-EXPLORE-THE-CULTURE-HERITAGE-OF-ISTANBUL-TURKEY.jpg',
budget: 'low',
climate: 'moderate',
activities: ['culture','food','shopping'],
description: 'Where Europe meets Asia',
avgCost: '₺20,000–30,000',
bestMonths: 'Apr-Jun',
rating: 4.7,
reviewsCount: 2900,
reviews: ["Historic mosques!", "Amazing bazaars."],
languages: ['Turkish','English (Tourist Areas)'],
transport: [
{ type: "Tram", cost: "₺15/trip" }
],
highlights: ['Hagia Sophia','Grand Bazaar'],
popularity: 90
},

{
id: 17,
name: 'Banff, Canada',
country: 'Canada',
currency: 'CAD',
symbol: 'C$',
image: 'https://images.squarespace-cdn.com/content/v1/5b3e2f16f407b49ece5cecb7/28c8e018-8b87-4b2f-81ad-a1ecf77912a0/2000x1080_jpg-2022_MoraineLake_TravelAlberta_RothandRamberg+(3).jpg?format=1500w',
budget: 'high',
climate: 'cold',
activities: ['nature','hiking','photography'],
description: 'Rocky Mountain paradise',
avgCost: 'C$2,500–4,000',
bestMonths: 'Jun-Sep',
rating: 4.9,
reviewsCount: 1700,
reviews: ["Lake Louise is unreal!", "Perfect for hiking."],
languages: ['English','French'],
transport: [
{ type: "Car Rental", cost: "C$80/day" }
],
highlights: ['Lake Louise','Banff National Park'],
popularity: 88
},

{
id: 18,
name: 'Seoul, South Korea',
country: 'South Korea',
currency: 'KRW',
symbol: '₩',
image: 'https://images.unsplash.com/photo-1549693578-d683be217e58?w=400',
budget: 'medium',
climate: 'moderate',
activities: ['urban','food','shopping'],
description: 'K-culture and tech capital',
avgCost: '₩1,800,000–2,500,000',
bestMonths: 'Apr-May',
rating: 4.8,
reviewsCount: 3100,
reviews: ["K-food is amazing!", "Great nightlife."],
languages: ['Korean','English (Limited)'],
transport: [
{ type: "Subway", cost: "₩1,500/trip" }
],
highlights: ['Gyeongbokgung Palace','N Seoul Tower'],
popularity: 93
},

{
id: 19,
name: 'Athens, Greece',
country: 'Greece',
currency: 'EUR',
symbol: '€',
image: 'https://png.pngtree.com/background/20230524/original/pngtree-the-ancient-greece-capital-of-athens-picture-image_2706642.jpg',
budget: 'medium',
climate: 'warm',
activities: ['culture','history','food'],
description: 'Ancient city of philosophers',
avgCost: '€1,000–1,600',
bestMonths: 'Apr-Jun',
rating: 4.6,
reviewsCount: 2400,
reviews: ["Acropolis is iconic!", "Great Mediterranean food."],
languages: ['Greek','English'],
transport: [
{ type: "Metro", cost: "€1.5/trip" }
],
highlights: ['Acropolis','Parthenon'],
popularity: 84
},

{
id: 20,
name: 'Machu Picchu, Peru',
country: 'Peru',
currency: 'PEN',
symbol: 'S/',
image: 'https://lp-cms-production.imgix.net/features/2018/01/Machu_Picchu-694dbac6b0e5.jpg?auto=format&fit=crop&sharp=10&vib=20&ixlib=react-8.6.4&w=850&q=20&dpr=5',
budget: 'medium',
climate: 'moderate',
activities: ['adventure','hiking','photography'],
description: 'Lost city of the Incas',
avgCost: 'S/4,000–6,000',
bestMonths: 'May-Sep',
rating: 4.9,
reviewsCount: 2000,
reviews: ["Bucket list destination!", "Breathtaking views."],
languages: ['Spanish','Quechua','English (Tourist Areas)'],
transport: [
{ type: "Train", cost: "S/250/trip" }
],
highlights: ['Inca Trail','Sun Gate'],
popularity: 91
}

// Remaining 11–20 continue in same structured pattern…

];

  const activityOptions = [
    { id: 'beach', label: 'Beach & Water', icon: '🏖️' },
    { id: 'culture', label: 'Culture & History', icon: '🏛️' },
    { id: 'adventure', label: 'Adventure', icon: '🏔️' },
    { id: 'food', label: 'Food & Dining', icon: '🍽️' },
    { id: 'nature', label: 'Nature', icon: '🌲' },
    { id: 'shopping', label: 'Shopping', icon: '🛍️' },
    { id: 'urban', label: 'City Life', icon: '🏙️' },
    { id: 'hiking', label: 'Hiking', icon: '🥾' },
    { id: 'photography', label: 'Photography', icon: '📸' }
  ];

  // Simple Neural Network Simulation for ML predictions
  const mlPredict = (userPrefs, destination) => {
    // Simulate neural network layers
    const inputLayer = [
      userPrefs.budget === destination.budget ? 1 : 0.5,
      userPrefs.climate === destination.climate ? 1 : 0.5,
      userPrefs.activities.filter(act => destination.activities.includes(act)).length / Math.max(userPrefs.activities.length, 1)
    ];

    // Hidden layer simulation (weighted sum)
    const hiddenLayer = inputLayer.map(val => Math.tanh(val * 2));
    
    // Output layer
    const output = hiddenLayer.reduce((sum, val) => sum + val, 0) / hiddenLayer.length;
    
    // Add popularity factor (collaborative filtering simulation)
    const popularityBoost = destination.popularity / 100;
    
    // Final ML prediction
    return Math.min(1, (output * 0.7 + popularityBoost * 0.3));
  };

  // AI Insights Generator using pattern recognition
  const generateAIInsights = (prefs) => {
    const insights = [];
    
    if (prefs.budget === 'low' && prefs.activities.includes('beach')) {
      insights.push('💡 AI Insight: Budget-friendly beach destinations like Bali and Thailand offer excellent value!');
    }
    
    if (prefs.climate === 'warm' && prefs.activities.includes('culture')) {
      insights.push('🔮 AI Prediction: You might enjoy Mediterranean destinations with rich history and warm weather.');
    }
    
    if (prefs.activities.length >= 4) {
      insights.push('🎯 AI Analysis: Your diverse interests suggest multi-activity destinations like New Zealand or Barcelona.');
    }
    
    if (prefs.budget === 'high' && prefs.activities.includes('adventure')) {
      insights.push('⚡ AI Recommendation: Premium adventure destinations await - consider Iceland or Swiss Alps!');
    }

    if (prefs.travelers === 'family' && prefs.activities.includes('beach')) {
      insights.push('👨‍👩‍👧‍👦 Family AI: Beach destinations with cultural activities provide great family experiences!');
    }

    return insights.length > 0 ? insights[Math.floor(Math.random() * insights.length)] : 
      '🤖 AI is learning your preferences to provide better recommendations over time!';
  };

  // Traditional matching algorithm
  const calculateMatch = (destination) => {
    let score = 0;
    let maxScore = 0;

    maxScore += 30;
    if (destination.budget === preferences.budget) score += 30;
    else if (
      (preferences.budget === 'medium' && destination.budget === 'low') ||
      (preferences.budget === 'high' && destination.budget === 'medium')
    ) score += 15;

    maxScore += 20;
    if (destination.climate === preferences.climate) score += 20;

    maxScore += 50;
    if (preferences.activities.length > 0) {
      const matchingActivities = preferences.activities.filter(act => 
        destination.activities.includes(act)
      ).length;
      score += (matchingActivities / preferences.activities.length) * 50;
    }

    return Math.round((score / maxScore) * 100);
  };

  // Hybrid ML + Traditional Algorithm
  const hybridRecommendation = (destination) => {
    const traditionalScore = calculateMatch(destination);
    const mlScore = mlPredict(preferences, destination) * 100;
    
    // Weighted combination: 60% traditional + 40% ML
    const hybridScore = Math.round(traditionalScore * 0.6 + mlScore * 0.4);
    
    return {
      traditionalScore,
      mlScore: Math.round(mlScore),
      finalScore: hybridScore
    };
  };

  const handleSearch = () => {
    setIsLearning(true);
    
    // Generate AI insights
    const insight = generateAIInsights(preferences);
    setAiInsights(insight);

    // Calculate scores with hybrid algorithm
    const scored = destinations.map(dest => {
      const scores = hybridRecommendation(dest);
      return {
        ...dest,
        matchScore: scores.finalScore,
        traditionalScore: scores.traditionalScore,
        mlScore: scores.mlScore,
        isMLBoosted: scores.mlScore > scores.traditionalScore
      };
    });

    const sorted = scored.sort((a, b) => b.matchScore - a.matchScore);
    setRecommendations(sorted);
    setShowResults(true);

    // Store in user history for learning
    const historyEntry = {
      preferences: {...preferences},
      timestamp: Date.now(),
      topResult: sorted[0].name
    };
    setUserHistory(prev => [...prev, historyEntry]);

    // Simulate ML learning delay
    setTimeout(() => setIsLearning(false), 1500);
  };

  const toggleActivity = (activityId) => {
    setPreferences(prev => ({
      ...prev,
      activities: prev.activities.includes(activityId)
        ? prev.activities.filter(a => a !== activityId)
        : [...prev.activities, activityId]
    }));
  };

  const toggleFavorite = (destId) => {
    setFavorites(prev => 
      prev.includes(destId) 
        ? prev.filter(id => id !== destId)
        : [...prev, destId]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Navigation className="w-10 h-10 text-purple-600" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              AI-DRIVEN INTELLIGENT TRAVEL RECOMMENDATION AND PERSONALIZATION SYSTEM
            </h1>
            <Brain className="w-10 h-10 text-pink-600 animate-pulse" />
          </div>
          <p className="text-gray-600 text-lg">Powered by Machine Learning & Intelligent Algorithms</p>
          {userHistory.length > 0 && (
            <div className="mt-3 inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 px-4 py-2 rounded-full">
              <TrendingUp className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium text-purple-700">
                AI Learning Active • {userHistory.length} searches analyzed
              </span>
            </div>
          )}
        </div>

        {/* AI Insights Banner */}
        {aiInsights && showResults && (
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl p-4 mb-6 shadow-xl animate-pulse">
            <div className="flex items-center gap-3">
              <Brain className="w-6 h-6 flex-shrink-0" />
              <p className="text-sm font-medium">{aiInsights}</p>
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-purple-600" />
            Your Travel Preferences
          </h2>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                <DollarSign className="w-4 h-4" />
                Budget Range
              </label>
              <div className="flex gap-2">
                {['low', 'medium', 'high'].map(budget => (
                  <button
                    key={budget}
                    onClick={() => setPreferences({...preferences, budget})}
                    className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                      preferences.budget === budget
                        ? 'bg-purple-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {budget.charAt(0).toUpperCase() + budget.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                <Thermometer className="w-4 h-4" />
                Preferred Climate
              </label>
              <div className="flex gap-2">
                {['cold', 'moderate', 'warm'].map(climate => (
                  <button
                    key={climate}
                    onClick={() => setPreferences({...preferences, climate})}
                    className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                      preferences.climate === climate
                        ? 'bg-purple-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {climate.charAt(0).toUpperCase() + climate.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                <Users className="w-4 h-4" />
                Travel Style
              </label>
              <div className="flex gap-2">
                {['solo', 'couple', 'family', 'group'].map(type => (
                  <button
                    key={type}
                    onClick={() => setPreferences({...preferences, travelers: type})}
                    className={`flex-1 py-2 px-4 rounded-lg font-medium text-sm transition-all ${
                      preferences.travelers === type
                        ? 'bg-purple-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                <Calendar className="w-4 h-4" />
                Trip Duration (days)
              </label>
              <input
                type="number"
                value={preferences.duration}
                onChange={(e) => setPreferences({...preferences, duration: e.target.value})}
                className="w-full py-2 px-4 rounded-lg border-2 border-gray-200 focus:border-purple-600 focus:outline-none"
                min="1"
                max="30"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700 mb-3 block">
              Activities & Interests
            </label>
            <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
              {activityOptions.map(activity => (
                <button
                  key={activity.id}
                  onClick={() => toggleActivity(activity.id)}
                  className={`py-3 px-2 rounded-lg text-sm font-medium transition-all ${
                    preferences.activities.includes(activity.id)
                      ? 'bg-purple-600 text-white shadow-lg scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <div className="text-2xl mb-1">{activity.icon}</div>
                  <div className="text-xs">{activity.label}</div>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleSearch}
            disabled={isLearning}
            className={`w-full mt-8 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-2xl transform hover:scale-105 transition-all flex items-center justify-center gap-2 ${
              isLearning ? 'opacity-70 cursor-wait' : ''
            }`}
          >
            {isLearning ? (
              <>
                <Brain className="w-5 h-5 animate-spin" />
                AI Processing...
              </>
            ) : (
              <>
                <Search className="w-5 h-5" />
                Find My Perfect Destination
              </>
            )}
          </button>
        </div>

        {showResults && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                🎯 AI-Powered Recommendations ({recommendations.length})
              </h2>
              <div className="flex items-center gap-2 bg-purple-100 px-4 py-2 rounded-full">
                <Brain className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-medium text-purple-700">ML Enhanced</span>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {recommendations.map(dest => (
                <div key={dest.id} className="border-2 border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all">
                  <div className="relative">
                    <img src={dest.image} alt={dest.name} className="w-full h-48 object-cover" />
                    <div className="absolute top-3 right-3 flex flex-col gap-2">
                      <div className="bg-white px-3 py-1 rounded-full font-bold text-purple-600 flex items-center gap-1">
                        {dest.isMLBoosted && <Brain className="w-3 h-3" />}
                        {dest.matchScore}% Match
                      </div>
                      {dest.isMLBoosted && (
                        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-2 py-1 rounded-full text-xs font-bold">
                          ⚡ ML Boosted
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => toggleFavorite(dest.id)}
                      className="absolute top-3 left-3 bg-white p-2 rounded-full hover:scale-110 transition-all"
                    >
                      <Heart className={`w-5 h-5 ${favorites.includes(dest.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
                    </button>
                  </div>
                  
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">{dest.name}</h3>
                        <p className="text-sm text-gray-500">{dest.country}</p>
                      </div>
                      <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-bold text-sm">{dest.rating}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-4">{dest.description}</p>
                    
                    {/* ML Score Display */}
                    <div className="bg-purple-50 rounded-lg p-3 mb-4">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-600">Algorithm: {dest.traditionalScore}%</span>
                        <span className="text-purple-600 font-bold">ML Score: {dest.mlScore}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full transition-all"
                          style={{width: `${dest.matchScore}%`}}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 mb-4 flex-wrap">
                      {dest.activities.slice(0, 3).map(act => (
                        <span key={act} className="bg-purple-100 text-purple-700 px-2 py-1 rounded-lg text-xs font-medium">
                          {act}
                        </span>
                      ))}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-green-600" />
                        <span className="font-semibold">{dest.avgCost}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-blue-600" />
                        <span className="text-gray-600">{dest.bestMonths}</span>
                      </div>
                    </div>
                    {/* Languages Section */} 
<div className="mt-4 pt-4 border-t">
  <p className="text-xs font-semibold text-gray-700 mb-2">Languages Spoken:</p>
  <div className="flex gap-2 flex-wrap">
    {dest.languages.map((lang, idx) => (
      <span
        key={idx}
        className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-lg font-medium"
      >
        🌐 {lang}
      </span>
    ))}
  </div>
</div>
                    
                    <div className="mt-4 pt-4 border-t">
                      <p className="text-xs font-semibold text-gray-700 mb-2">Top Highlights:</p>
                      <div className="flex gap-2 flex-wrap">
                        {dest.highlights.slice(0, 3).map((highlight, idx) => (
                          <span key={idx} className="text-xs bg-gray-100 px-2 py-1 rounded">
                            {highlight}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;