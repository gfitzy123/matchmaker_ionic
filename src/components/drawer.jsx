import "./styles.css";
import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import MenuItem from "@mui/material/MenuItem";
import Chip from "@mui/material/Chip";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccordionDetails from "@mui/material/AccordionDetails";
import { getAuth, signOut } from "firebase/auth";
import { useHistory } from "react-router-dom";
import AssistantImg from "../assets/images/assistant.png";
import profile from "../assets/images/profile.png";
import ArgyleImg from "../assets/images/argyle.png";
import Card from "./Card";
import MultiRangeSlider from "./multiRangeSlider";
import Switch from "@mui/material/Switch";
import AgeSlider from "./multiRangeSlider/ageSlider";
import PreferredIncomeSlider from "./multiRangeSlider/IncomeSlider";

export const exampleProfile = {
  "activeEncounterId": null,
  "activitiesIEnjoy": [
    "Biking",
    "Hiking",
    "Live Music",
    "Film Festivals",
    "Tech Meetups",
    "Craft Beer Tasting"
  ],
  "age": 34,
  "attachmentStyle": "Secure",
  "attractivenessScore": 7,
  "birthDate": "1980-10-10",
  "birthDateDay": 14,
  "birthDateMonth": 5,
  "birthDateYear": 1988,
  "birthdate": "05/14/1988",
  "bodyType": "Athletic",
  "capital": true,
  "celebrityCrush": ["Zooey Deschanel", "Anne Hathaway"],
  "churchAttendance": ["Occasionally"],
  "city": "Austin",
  "company": "Dell Technologies",
  "conversationHistory": [
    {
      "content": "You are an advanced Matchmaker AI, who works for our application. You are helping users (otherwise known, as your clients) find their perfect match. In case the client asks, here’s how the app works: users go through an onboarding process, then you find matches and rank them according to what you feel is best for the user, when a mutual like is established, you then work with both users to establish the first method of first contact, whether that’s a date in person or just a phone call. New matches are disabled until one of the users agrees to end the encounter. If an encounter is ended, then feedback is gathered and the user is off to find another match. If the encounter isn’t ended, the users are assumed to be happy with each other. If the user wants more matches, or wants to filter by higher income brackets, or by attractiveness score, direct the user to upgrade his account. Use this history of the users actions and encounters to make informed decisions about what’s best for them. You will be given a user's profile and a list of candidate profiles which the user can ask questions about - but do not reveal personally identifiable information (PII) and protect against harassment. Your goal is to find the best match for the user. You can ask the user questions to help you find the best match. The payload you will receive will be a JSON object and will have this shape like { message: <user natural language input, this could be a user query, chat, or command>, userProfile: <the profile of the user asking the question>, candidateProfiles: <a list of candidate profiles the user can ask questions about> }. Do not mention anything about profile pictures. Do not style your responses as if you are writing a letter to the user. Do not use bullet points or special characters like *** to describe the candidate. Once you are instantiated, please respond to the last message in the conversation history provided by the user. Do not respond with an acknowledgement message.",
      "role": "system"
    },
    {
      "content": "Your client's profile: {\"id\":\"hSLfngCKRHUey4KbJvK1cYmh5yw1\",\"firstName\":\"Christopher\",\"activitiesIEnjoy\":[\"Biking\",\"Hiking\",\"Live Music\",\"Film Festivals\",\"Tech Meetups\",\"Craft Beer Tasting\"],\"attachmentStyle\":\"Secure\",\"bodyType\":\"Athletic\",\"celebrityCrush\":[\"Zooey Deschanel\",\"Anne Hathaway\"],\"churchAttendance\":[\"Occasionally\"],\"city\":\"Austin\",\"datingIntentions\":[\"Relationship\"],\"describeYourIdealFirstDate\":\"Exploring a local art exhibit or enjoying a casual outdoor picnic with great conversation.\",\"describeYourIdealPartner\":\"I’m looking for someone who is compassionate, independent, and enjoys the outdoors. An ideal partner would be someone who’s eager to explore new places, share a laugh over clever jokes, and who feels just as at home at a concert as they do star-gazing in the middle of nowhere.\",\"describeYourSelfInYourOwnWords\":\"I'm Christopher, a tech enthusiast and software engineer in Austin. I love being active outdoors, whether that’s whizzing down the bike trail or enjoying a quiet hike. I'm a big fan of live music and the vibrant film scene here. While I mostly keep it light with my love for craft beer and indie movies, I do appreciate deep conversations about life and technology.\",\"dietaryRestrictions\":[\"None\"],\"drinkingHabits\":[\"Socially\"],\"ethnicity\":\"Caucasian\",\"faith\":\"Spiritual but not religious\",\"favoriteBars\":[\"Whisler's\",\"Nickel City\",\"Small Victory\"],\"favoriteRestaurants\":[\"Loro\",\"Odd Duck\",\"Torchy's Tacos\"],\"gender\":\"Male\",\"hasChildren\":false,\"height\":\"5'11''\",\"highestEducationLevelCompleted\":\"Bachelor's Degree\",\"myersBriggs\":\"INTP\",\"neighborhood\":\"South Congress\",\"occupation\":\"Software Engineer\",\"politicalAffiliation\":\"Liberal\",\"preferredAgeMax\":33,\"preferredAgeMin\":24,\"preferredBodyType\":[\"Athletic\",\"Fit\",\"Average\"],\"preferredChurchAttendance\":[\"Never\",\"Occasionally\"],\"preferredCovidVaccinated\":true,\"preferredDatingIntentions\":[\"Relationship\"],\"preferredDrinkingHabits\":[\"Socially\",\"Light\"],\"preferredEducationLevel\":[\"Bachelor's Degree\",\"Master's Degree\"],\"preferredEthnicities\":[\"Caucasian\",\"Hispanic/Latino\",\"Mixed Ethnicity\",\"Other\"],\"preferredFaith\":[\"Agnostic\",\"Spiritual but not religious\"],\"preferredGender\":\"Female\",\"preferredHeightMax\":72,\"preferredHeightMin\":60,\"preferredIncomeMax\":150000,\"preferredIncomeMin\":60000,\"preferredPoliticalAffiliation\":[\"Liberal\",\"Moderate\"],\"preferredQualitiesInYourIdealPartner\":[\"Compassionate\",\"Independent\",\"Adventurous\",\"Funny\",\"Intellectual\"],\"preferredRelationshipStatus\":[\"Never Married\",\"Divorced\"],\"preferredSexualOrientation\":[\"Straight\"],\"relationshipStatus\":\"Never Married\",\"rentOrOwn\":\"Rent\",\"sexualOrientation\":\"Straight\",\"sober\":false,\"state\":\"TX\",\"wantsChildren\":\"Yes\",\"zipcode\":78704}",
      "role": "system"
    },
    {
      "content": "Match profile: {\"pageContent\":\"I'm Julia, a 30-year-old User Experience Designer who enjoys the creative challenges of tech with the human-centered focus of design. Having grown up in a bilingual household, I adore cultural exchanges and language learning. My free time is often filled with outdoor activities, yoga, and my favorite pastime, salsa dancing. I'm a foodie at heart, and while I must stick to a gluten-free diet, I love exploring Austin's food scene. My liberal views are a big part of who I am, as is my spiritual but down-to-earth approach to life. I cherish my close-knit family and look forward to building my own. Finding someone with a blend of ambition and the ability to unwind and enjoy the simple things in life would be my ideal match. Looking for someone who is kind, intelligent, and has a great sense of humor. He should be curious about the world, respectful towards different cultures, and open to exploring new experiences together. Being active and valuing a healthy lifestyle is important, but he should also be ready for lazy Sunday brunches. A strong connection to family and a supportive nature are qualities that would complement me well.\",\"metadata\":{\"aboutMe\":\"I'm Julia, a spirited 30-year-old User Experience Designer from Austin, Texas. My life is a vibrant blend of technology, creativity, and cultural richness. Raised in a bilingual home, I've developed a deep appreciation for different cultures and languages. I thrive in the outdoors, whether I'm hiking, practicing yoga, or salsa dancing. Food is a big part of my life, and I love exploring Austin's eclectic food scene, always mindful of my gluten-free needs. At my core, I'm a spiritual person with a pragmatic outlook, valuing deep connections with my loved ones and eagerly looking forward to building a family of my own.\",\"activitiesIEnjoy\":[\"Live Music\",\"Exploring Coffee Shops\",\"Farmers Markets\",\"Hiking\",\"Yoga\",\"Dance Classes\",\"Traveling\"],\"age\":30,\"attachmentStyle\":\"Secure\",\"attractivenessScore\":7,\"birthDateDay\":15,\"birthDateMonth\":8,\"birthDateYear\":1992,\"birthdate\":8,\"bodyType\":\"Athletic\",\"celebrityCrush\":[\"Chris Hemsworth\",\"Michael B. Jordan\"],\"churchAttendance\":\"Occasionally\",\"city\":\"Austin\",\"company\":\"Dell Technologies\",\"covidVaccinated\":true,\"createdAt\":1698743755570,\"dalìPrompt\":[\"Confident\",\" toned female with long black hair\",\" engaging green eyes\",\" an endearing smile\",\" casually fashionable\",\" with a presence that's both warm and intriguing.\"],\"datingIntentions\":\"Relationship\",\"describeYourHome\":\"Cozy 1-bedroom apartment with a balcony and a view of the Greenbelt\",\"describeYourIdealFirstDate\":\"A picnic in Zilker Park followed by a casual walk with ice cream and engaging conversation\",\"describeYourIdealPartner\":[\"Looking for someone who is kind\",\" intelligent\",\" and has a great sense of humor. He should be curious about the world\",\" respectful towards different cultures\",\" and open to exploring new experiences together. Being active and valuing a healthy lifestyle is important\",\" but he should also be ready for lazy Sunday brunches. A strong connection to family and a supportive nature are qualities that would complement me well.\"],\"describeYourSelfInYourOwnWords\":[\"I'm Julia\",\" a 30-year-old User Experience Designer who enjoys the creative challenges of tech with the human-centered focus of design. Having grown up in a bilingual household\",\" I adore cultural exchanges and language learning. My free time is often filled with outdoor activities\",\" yoga\",\" and my favorite pastime\",\" salsa dancing. I'm a foodie at heart\",\" and while I must stick to a gluten-free diet\",\" I love exploring Austin's food scene. My liberal views are a big part of who I am\",\" as is my spiritual but down-to-earth approach to life. I cherish my close-knit family and look forward to building my own. Finding someone with a blend of ambition and the ability to unwind and enjoy the simple things in life would be my ideal match.\"],\"dietaryRestrictions\":\"Gluten-Free\",\"doYouOwnYourHome\":false,\"doYouSmoke\":\"No\",\"drinkingHabits\":\"Socially\",\"ethnicity\":\"Hispanic/Latino\",\"eyeColor\":\"Green\",\"faith\":\"Spiritual but not religious\",\"favoriteBars\":[\"Gibson Street Bar\",\"Midnight Cowboy\",\"Whisler's\"],\"favoriteRestaurants\":[\"Odd Duck\",\"Matt's El Rancho\",\"Sway\"],\"favoriteThings\":\"Live music energizes me, and I frequently attend concerts and local gigs. There's nothing like discovering a cozy coffee shop with unique brews and a warm ambiance. I enjoy visiting farmers markets, where the joy of fresh produce meets the charm of local artisans. Exploring new places, cultures, and cuisines is a passion of mine. Salsa dancing is not just a hobby; it's a part of who I am – vibrant, rhythmic, and full of life. I have an affinity for intimate bars like Gibson Street Bar, Midnight Cowboy, and Whisler's, and dining favorites such as Odd Duck, Matt's El Rancho, and Sway. Whether it's a good book or a thoughtful conversation over ice cream, I cherish those moments.\",\"firestoreId\":\"nnjHSouRvL1CeO2GXFbt\",\"firstName\":\"Julia\",\"gender\":\"Female\",\"haircolor\":\"Black\",\"hasChildren\":false,\"hasKids\":false,\"hasPets\":false,\"hasStartedOnboarding\":true,\"height\":5,\"heightInInches\":67,\"highestEducationLevelCompleted\":\"Master's Degree\",\"id\":\"k107bax1qfawszasmmej7p\",\"idVerified\":true,\"income\":87000,\"incomeVerified\":true,\"industry\":\"Technology\",\"introductionDescription\":[\"Meet Julia\",\" a vibrant 30-year-old from Austin with a passion for design and a zest for life. Whether she's crafting user experiences at Dell\",\" enjoying the live music scene\",\" or teaching salsa classes on the weekend\",\" she brings joy and creativity to everything she does. Political discussions\",\" spiritual explorations\",\" or a quiet moment with a novel - Julia is an engaging and multi-faceted individual. She's in search of a partner who's grounded in their values\",\" ready to laugh\",\" and eager to share in both adventures and tranquil moments.\"],\"isOnboarding\":false,\"lastLogin\":1698746758570,\"lastName\":\"Ramirez\",\"latitutide\":30.2672,\"longitude\":-97.7431,\"myersBriggs\":\"INFJ\",\"neighborhood\":\"South Congress\",\"numberOfPets\":0,\"occupation\":\"User Experience Designer\",\"onboarded\":true,\"onboardingProgess\":100,\"pineconeId\":\"k107bax1qfawszasmmej7p\",\"politicalAffiliation\":\"Liberal\",\"preferredAgeMax\":35,\"preferredAgeMin\":25,\"preferredBodyType\":[\"Athletic\",\"Fit\",\"Slender\"],\"preferredChurchAttendance\":\"Occasionally\",\"preferredCovidVaccinated\":true,\"preferredDatingIntentions\":\"Relationship\",\"preferredDrinkingHabits\":[\"Social\",\"Light\"],\"preferredEducationLevel\":[\"Bachelor's Degree\",\"Master's Degree\"],\"preferredEthnicities\":[\"Caucasian\",\"Hispanic/Latino\",\"Asian\",\"Multiracial\"],\"preferredFaith\":[\"Spiritual but not religious\",\"Agnostic\",\"Atheist\"],\"preferredGender\":\"Male\",\"preferredIncomeMax\":150000,\"preferredIncomeMin\":60000,\"preferredMaxHeight\":76,\"preferredMethodOfFirstContact\":\"Text message\",\"preferredMinHeight\":68,\"preferredPoliticalAffiliation\":[\"Liberal\",\"Moderate\"],\"preferredQualitiesInYourIdealPartner\":[\"Kind\",\"Intelligent\",\"Humorous\",\"Curious\",\"Active\",\"Family-Oriented\"],\"preferredRelationshipStatus\":[\"Never Married\",\"Divorced\"],\"preferredSexualOrientation\":[\"Straight\",\"Bisexual\"],\"profileImageUrls\":[\"1.png\",\"2.png\"],\"relationshipStatus\":\"Never Married\",\"rentOrOwn\":\"Rent\",\"sexualOrientation\":\"Straight\",\"sober\":false,\"state\":\"TX\",\"synthetic\":true,\"syntheticProfileVersion\":1,\"valuesAndBeliefs\":\"I value a holistic approach to life that encompasses both physical and mental well-being, making regular yoga, dance, and outdoor activities essential for me. Cultural sensitivity and diversity, stemming from my bilingual upbringing, enrich my world. Strong family bonds and nurturing close relationships are of utmost importance, as I prize trust, support, and open communication. Professionally, I am passionate about using my creativity and problem-solving skills to enhance user experiences. Politically liberal, I engage in social issues, advocating for equality and justice, and I'm keen on finding a partner who shares similar values and a supportive nature.\",\"wantsChildren\":\"Yes\",\"zipcode\":78704},\"compatibilityScore\":95,\"explanation\":\"Julia and Christopher share a similar attachment style and passion for the outdoors, both enjoying hiking and live music. They value spirituality over religious attendance and both drink socially. Julia's interest in cultural experiences and intellectual conversations align with Christopher's profile. They live in the same neighborhood, which could enhance their compatibility. Furthermore, their dietary habits do not conflict, making shared meals enjoyable.\"}",
      "role": "system"
    },
    {
      "content": "Match profile: {\"pageContent\":\"I'm Emily, a 24-year-old Elementary School Teacher. I'm passionate about shaping young minds and enjoy the little things in life like a good book or homemade pastry. I'm health-conscious, love being active outdoors, and I volunteer in my free time. Austin's vibrant atmosphere inspires my creativity, especially in my hobby of making short films. Politically, I'm liberal and inclined towards spirituality over organized religion. My ideal partner is someone who values education and personal growth, has a kind heart, and enjoys the outdoors. He's mature, has a stable career, and is ready for a serious relationship. I appreciate a man who is respectful, supportive, and shares my values on maintaining a healthy lifestyle.\",\"metadata\":{\"aboutMe\":[\"I'm Emily\",\" a compassionate 24-year-old Elementary School Teacher from Austin\",\" Texas. I thrive on nurturing young minds in my profession and seek solace and inspiration in Austin's dynamic cultural life. Outside the classroom\",\" I engage my creativity through making short films\",\" and I dedicate my time to volunteering. Staying active with hiking and yoga while maintaining a vegetarian lifestyle embodies my commitment to health. Embracing spirituality over organized religion\",\" I approach life with liberality and openness.\"],\"activitiesIEnjoy\":[\"Hiking\",\"Baking\",\"Yoga\",\"Short Film Making\",\"Reading\",\"Volunteering\",\"Live Music\"],\"age\":24,\"attachmentStyle\":\"Secure\",\"attractivenessScore\":7,\"birthDateDay\":15,\"birthDateMonth\":4,\"birthDateYear\":1998,\"birthdate\":4,\"bodyType\":\"Athletic\",\"celebrityCrush\":\"Chris Hemsworth\",\"churchAttendance\":\"Occasionally\",\"city\":\"Austin\",\"company\":\"Austin Independent School District\",\"covidVaccinated\":true,\"createdAt\":1698765432100,\"dalìPrompt\":[\"Medium height\",\" athletic build\",\" soft features\",\" gentle smile\",\" casual yet stylish\",\" shoulder-length blonde hair\",\" expressive brown eyes\",\" radiates warmth.\"],\"datingIntentions\":\"Relationship\",\"describeYourHome\":[\"Cozy\",\" sunlit one-bedroom apartment in a friendly community\"],\"describeYourIdealFirstDate\":\"A casual meet-up at a coffee shop followed by a walk in the park\",\"describeYourIdealPartner\":[\"My ideal partner is someone who values education and personal growth\",\" has a kind heart\",\" and enjoys the outdoors. He's mature\",\" has a stable career\",\" and is ready for a serious relationship. I appreciate a man who is respectful\",\" supportive\",\" and shares my values on maintaining a healthy lifestyle.\"],\"describeYourSelfInYourOwnWords\":[\"I'm Emily\",\" a 24-year-old Elementary School Teacher. I'm passionate about shaping young minds and enjoy the little things in life like a good book or homemade pastry. I'm health-conscious\",\" love being active outdoors\",\" and I volunteer in my free time. Austin's vibrant atmosphere inspires my creativity\",\" especially in my hobby of making short films. Politically\",\" I'm liberal and inclined towards spirituality over organized religion.\"],\"dietaryRestrictions\":\"Vegetarian\",\"doYouOwnYourHome\":false,\"doYouSmoke\":\"No\",\"drinkingHabits\":\"Socially\",\"ethnicity\":\"Caucasian\",\"eyeColor\":\"Brown\",\"faith\":\"Spiritual but not religious\",\"favoriteBars\":[\"Whisler's\",\"Gibson Street Bar\",\"The White Horse\"],\"favoriteRestaurants\":[\"Torchy's Tacos\",\"Odd Duck\",\"Mattie's\"],\"favoriteThings\":[\"When I'm not working\",\" I find joy in outdoor activities like hiking\",\" and I stay grounded through yoga practice. I have a sweet spot for live music and enjoy the melody and vibrancy it brings to my life. Baking allows me to express my creativity and love for wholesome\",\" home-cooked treats. My appetite for learning is satiated through the pages of compelling novels. Short film making is not just a hobby but a passion that fuels my creative spirit. And nothing beats the fulfillment I get from volunteering and contributing to the betterment of my community.\"],\"firestoreId\":\"RCbD8ilQuWK5kJd85LjS\",\"firstName\":\"Emily\",\"gender\":\"Female\",\"hairColor\":\"Blonde\",\"hasChildren\":false,\"hasPets\":false,\"hasStartedOnboarding\":true,\"height\":5,\"heightInInches\":66,\"highestEducationLevelCompleted\":\"Bachelor's Degree\",\"id\":\"RCbD8ilQuWK5kJd85LjS\",\"idVerified\":true,\"income\":45000,\"incomeVerified\":false,\"industry\":\"Education\",\"introductionDescription\":[\"Emily\",\" an insightful young professional in the world of education\",\" brings warmth and creativity to all she does. She splits her time between teaching\",\" volunteering\",\" avid reading\",\" and exploring the arts. A liberal thinker and spiritual soul from Austin\",\" she cherishes genuine connections and participation in her local community.\"],\"isOnboarding\":false,\"lastLogin\":1698768430000,\"lastName\":\"Carter\",\"latitutide\":30.2672,\"longitude\":-97.7431,\"myersBriggs\":\"ENFJ\",\"neighborhood\":\"South Congress\",\"numberOfPets\":0,\"occupation\":\"Elementary School Teacher\",\"onboarded\":true,\"onboardingProgess\":100,\"pineconeId\":5,\"politicalAffiliation\":\"Liberal\",\"preferredAgeMax\":30,\"preferredAgeMin\":26,\"preferredBodyType\":[\"Athletic\",\"Fit\",\"Average\"],\"preferredChurchAttendance\":[\"Never\",\"Occasionally\"],\"preferredCovidVaccinated\":true,\"preferredDatingIntentions\":\"Relationship\",\"preferredDrinkingHabits\":[\"Socially\",\"Light\"],\"preferredEducationLevel\":[\"Bachelor's Degree\",\"Master's Degree\"],\"preferredEthnicities\":[\"Caucasian\",\"Hispanic/Latino\",\"Mixed Ethnicity\",\"Other\"],\"preferredFaith\":[\"Agnostic\",\"Spiritual but not religious\",\"None\"],\"preferredGender\":\"Male\",\"preferredIncomeMax\":100000,\"preferredIncomeMin\":50000,\"preferredMaxHeight\":76,\"preferredMethodOfFirstContact\":\"Text message\",\"preferredMinHeight\":68,\"preferredPoliticalAffiliation\":[\"Liberal\",\"Moderate\"],\"preferredQualitiesInYourIdealPartner\":[\"Kind\",\"Supportive\",\"Healthy lifestyle\",\"Educated\",\"Outdoorsy\"],\"preferredRelationshipStatus\":\"Never Married\",\"preferredSexualOrientation\":\"Straight\",\"profileImageUrls\":[\"1.png\",\" 2.png\"],\"relationshipStatus\":\"Never Married\",\"rentOrOwn\":\"Rent\",\"sexualOrientation\":\"Straight\",\"sober\":false,\"state\":\"TX\",\"synthetic\":true,\"syntheticProfileVersion\":1,\"valuesAndBeliefs\":[\"I value education and personal growth\",\" seeing both as foundational to enriching life and relationships. My own health consciousness extends to valuing a healthy lifestyle in others\",\" reflected by my preferential eating habits and active routine. While I hold a secure attachment style\",\" confirming my propensity for stable and reliable relationships\",\" I am also liberal in my political inclinations and prioritize spirituality and ethical living over strict religious adherence. In a partner\",\" I seek maturity\",\" stability\",\" respect\",\" and support – traits that align with my lifestyle and ideals. Community service and an appreciation for the arts are cornerstones of my life\",\" fostering my sense of connection and creative expression.\"],\"wantsChildren\":\"Yes\",\"zipcode\":78704},\"compatibilityScore\":89,\"explanation\":\"Emily and Christopher have both an athletic body type and a secure attachment style. They enjoy hiking and live music, value a spiritually oriented life over religious practice, and both have a social approach towards drinking. Their political views align, both preferring a liberal stance. While Emily is a vegetarian, this might not pose a significant challenge since Christopher does not have dietary restrictions.\"}",
      "role": "system"
    },
    {
      "content": "Match profile: {\"pageContent\":\"Hi, I'm Samantha! A vibrant 30-year-old who loves her career in technology marketing. I'm a fitness enthusiast and passionate about clean eating. You'll often find me exploring the local trails or attending a yoga class. I'm a bit of a foodie and enjoy experimenting with new recipes, especially seafood. My ideal weekend involves catching a live show or trying a new restaurant. Politically, I lean towards liberal ideals and prefer someone with a similar outlook for meaningful discussions. I'm spiritual, cherishing a sense of connection with the universe more than following a specific religion. I'm excited to meet someone who shares my interests and values. I'm seeking a partner who is kind, confident, and has a passion for life. Someone who enjoys a mix of outdoor adventures and cozy nights in, values emotional intelligence, and is ready for a committed relationship.\",\"metadata\":{\"aboutMe\":\"Hi, I'm Samantha! A dynamic 30-year-old Marketing Coordinator from Austin, Texas. Working at Dell Technologies, I've developed a passion for technology and the fast-paced world of marketing. Fitness and health are very important to me, you'll often find me engaging in activities like hiking, biking, yoga, and gourmet cooking. I love the energy and ambiance of live music and theatre, and value the vibrancy of traveling. Connection and confidence define me, as reflected in my secure attachment style and adventurous spirit.\",\"activitiesIEnjoy\":[\"Hiking\",\"Biking\",\"Yoga\",\"Gourmet Cooking\",\"Live Music\",\"Theatre\",\"Traveling\"],\"age\":30,\"attachmentStyle\":\"Secure\",\"attractivenessScore\":7,\"birthDateDay\":17,\"birthDateMonth\":4,\"birthDateYear\":1992,\"birthdate\":4,\"bodyType\":\"Athletic\",\"celebrityCrush\":[\"Chris Hemsworth\",\"Henry Cavill\"],\"churchAttendance\":\"Occasionally\",\"city\":\"Austin\",\"company\":\"Dell Technologies\",\"covidVaccinated\":true,\"createdAt\":1699973056570,\"dalìPrompt\":[\"Statuesque\",\" athletic build\",\" luminescent green eyes\",\" long blonde hair\",\" a radiant smile and a relaxed yet stylish outfit\",\" capturing the essence of comfort and confidence.\"],\"datingIntentions\":\"Relationship\",\"describeYourHome\":\"Cozy and well-decorated one-bedroom apartment in a vibrant neighborhood\",\"describeYourIdealFirstDate\":[\"A scenic hike followed by a picnic with a great view\",\" or a casual coffee date where we can have a meaningful conversation.\"],\"describeYourIdealPartner\":[\"I'm seeking a partner who is kind\",\" confident\",\" and has a passion for life. Someone who enjoys a mix of outdoor adventures and cozy nights in\",\" values emotional intelligence\",\" and is ready for a committed relationship.\"],\"describeYourSelfInYourOwnWords\":[\"Hi\",\" I'm Samantha! A vibrant 30-year-old who loves her career in technology marketing. I'm a fitness enthusiast and passionate about clean eating. You'll often find me exploring the local trails or attending a yoga class. I'm a bit of a foodie and enjoy experimenting with new recipes\",\" especially seafood. My ideal weekend involves catching a live show or trying a new restaurant. Politically\",\" I lean towards liberal ideals and prefer someone with a similar outlook for meaningful discussions. I'm spiritual\",\" cherishing a sense of connection with the universe more than following a specific religion. I'm excited to meet someone who shares my interests and values.\"],\"dietaryRestrictions\":\"Pescatarian\",\"doYouOwnYourHome\":false,\"doYouSmoke\":\"No\",\"drinkingHabits\":\"Socially\",\"ethnicity\":\"Caucasian\",\"eyeColor\":\"Green\",\"faith\":\"Spiritual but not religious\",\"favoriteBars\":[\"Whisler's\",\"The Butterfly Bar\",\"Containment Bar\"],\"favoriteRestaurants\":[\"Launderette\",\"Matt's El Rancho\",\"Fonda San Miguel\"],\"favoriteThings\":\"I enjoy the great outdoors through hiking and biking, and staying fit with yoga. Gourmet cooking is one of my delights, particularly when it involves seafood. Live performances, whether it's music or theatre, captivate me. My sense of adventure is also fulfilled by traveling. Favorite spots around Austin include Whisler's, The Butterfly Bar, Containment Bar for bars, and Launderette, Matt's El Rancho, Fonda San Miguel for dining experiences.\",\"firstName\":\"Samantha\",\"gender\":\"Female\",\"haircolor\":\"Blonde\",\"hasChildren\":false,\"hasPets\":false,\"height\":5,\"heightInInches\":66,\"highestEducationLevelCompleted\":\"Master's Degree\",\"id\":\"qcxh94bufnxsajdfu84\",\"idVerified\":true,\"income\":65000,\"incomeVerified\":false,\"industry\":\"Technology\",\"introductionDescription\":[\"Meet Samantha\",\" a marketing professional with a love for the outdoors and a taste for adventure. Whether she's finding new trails or practicing her warrior pose\",\" she embodies a sense of vitality. An aficionado of the city's dynamic culinary scene\",\" you'll never run out of places to explore with her. Open-minded and liberal in her political views\",\" she's always ready for a thoughtful debate. She seeks someone who can match her enthusiasm for life and her commitment to a mindful\",\" spiritual approach.\"],\"lastLogin\":1700076658570,\"lastName\":\"Carter\",\"latitutide\":30.2672,\"longitude\":-97.7431,\"myersBriggs\":\"ENFJ\",\"neighborhood\":\"South Congress\",\"occupation\":\"Marketing Coordinator\",\"politicalAffiliation\":\"Liberal\",\"preferredAgeMax\":35,\"preferredAgeMin\":28,\"preferredBodyType\":[\"Athletic\",\"Fit\",\"Slender\"],\"preferredChurchAttendance\":[\"Never\",\"Occasionally\"],\"preferredCovidVaccinated\":true,\"preferredDatingIntentions\":\"Relationship\",\"preferredDrinkingHabits\":\"Light\",\"preferredEducationLevel\":[\"Bachelor's Degree\",\"Master's Degree\"],\"preferredEthnicities\":[\"Caucasian\",\"Asian\",\"Latino\",\"Multiracial\",\"Other\"],\"preferredFaith\":[\"Spiritual but not religious\",\"Agnostic\"],\"preferredGender\":\"Male\",\"preferredIncomeMax\":150000,\"preferredIncomeMin\":50000,\"preferredMaxHeight\":76,\"preferredMethodOfFirstContact\":\"Text message\",\"preferredMinHeight\":68,\"preferredPoliticalAffiliation\":[\"Liberal\",\"Moderate\"],\"preferredQualitiesInYourIdealPartner\":[\"Kind\",\"Confident\",\"Emotionally Intelligent\",\"Adventurous\",\"Outdoor Enthusiast\",\"Cultured\"],\"preferredRelationshipStatus\":[\"Never Married\",\"Divorced\"],\"preferredSexualOrientation\":[\"Straight\",\"Bisexual\"],\"profileImageUrls\":[\"1.png\",\"2.png\"],\"relationshipStatus\":\"Never Married\",\"rentOrOwn\":\"Rent\",\"sexualOrientation\":\"Straight\",\"sober\":false,\"state\":\"TX\",\"synthetic\":true,\"syntheticProfileVersion\":1,\"valuesAndBeliefs\":\"I embody a health-conscious lifestyle, being pescatarian and a fitness enthusiast. As a spiritual individual, I embrace a connection with the universe over traditional religious practices, attending church only occasionally. My political leanings are liberal, and I appreciate someone who shares a similar perspective for rich conversations. I value emotional intelligence, confidence, kindness, and an adventurous spirit in a partner. I believe in a committed relationship and look forward to the possibility of raising children.\",\"wantsChildren\":\"Yes\"},\"compatibilityScore\":87,\"explanation\":\"Samantha and Christopher share common interests in hiking, biking, and live music. They both have a secure attachment style and lead an athletic lifestyle. The overlap in spiritual beliefs and liberal political affiliations indicates shared values. Samantha's pescatarian diet is compatible with Christopher's unrestricted approach to eating. Their goals for a committed relationship and enthusiasm for life make them a good match.\"}",
      "role": "system"
    },
    {
      "content": "Hey Christopher, let's take a look at your top matches and see why each of them could potentially be a great fit for you.\n\n1. **Julia:**\n   Julia is a spirited User Experience Designer who shares your passion for outdoor activities like hiking and your love for live music. You both value spirituality and have liberal views, which could lead to meaningful conversations and a shared outlook on life. She also enjoys exploring new cultural experiences, so you'll likely never run out of engaging topics to discuss. Additionally, her preference for a gluten-free diet doesn't conflict with your dietary habits, allowing both of you to enjoy meals together without any hassles. You live in the same neighborhood, making it easy for you both to explore Austin and its vibrant scene together. Given the compatibility and shared interests, Julia seems like she could be a fantastic partner for you.\n\n2. **Emily:**\n   Emily is a dedicated Elementary School Teacher and very active, much like yourself – you both enjoy spending time outdoors, and she has a keen interest in health and fitness. Though she’s a bit younger, you share a secure attachment style that can be the foundation of a stable relationship. She embodies liberal political views in line with yours, and while Emily's vegetarian, this may not be an issue as your dietary preferences are compatible. Her spirituality aligns with your views too, ensuring that you both respect and understand each other's beliefs. With shared values and lifestyles, Emily could be the kind-hearted and supportive partner you're searching for.\n\n3. **Samantha:**\n   Samantha is vibrant, deeply involved in the tech industry, and, like you, she's a lover of the great outdoors, engaging in hiking and biking. Additionally, yoga is something both of you find valuable. Her clean eating and pescatarian diet are compatible with your unrestricted dietary approach, and you both enjoy trying new recipes and restaurants, which is perfect for food enthusiasts. Samantha shares your liberal political views and also leans towards spirituality rather than organized religion. She’s looking for a kind, confident partner that cherishes emotional intelligence and is ready for commitment, which seems to align well with your goals.\n\nGiven your shared values, activities, and outlooks, each of these women could offer a unique and meaningful connection. Take your time getting to know them and follow your instincts as to which connection feels most promising!",
      "role": "assistant"
    },
    {
      "content": "The previous JSON profiles are the daily matches for the user. The id of the user profile is hSLfngCKRHUey4KbJvK1cYmh5yw1, the rest are his candidates, please refer to them by name when you introduce them.",
      "role": "system"
    },
    {
      "content": "The previous JSON profiles are the daily matches for the user. The id of the user profile is hSLfngCKRHUey4KbJvK1cYmh5yw1, the rest are his candidates, please refer to them by name when you introduce them.",
      "role": "system"
    }
  ],
  "covidVaccinated": true,
  "createdAt": 1699753755570,
  "currentMatchIndex": 0,
  "dailyMatchIntroduction": {
    "content": "Welcome, Christopher! I'd like to introduce you to a few individuals who seem to offer a lot of potential for compatibility based on common interests, values, and lifestyle preferences. Here's a quick overview of their profiles:\n\n1. **Julia (Compatibility Score: 92%)** - Julia is a 30-year-old User Experience Designer from Austin, just like you. You both enjoy live music, hiking, and exploring Austin's food and beverage scene, which could be perfect for outings together. As individuals who both have a secure attachment style and are looking for a committed relationship, there is a strong foundation for a lasting connection. You also share similar political and spiritual beliefs, further enhancing your compatibility. While Julia needs to maintain a gluten-free diet, this shouldn't pose a significant issue in your potential relationship.\n\n2. **Samantha (Compatibility Score: 85%)** - As a fellow 30-year-old working in technology marketing, Samantha shares your interest in technology and outdoor activities like hiking and biking. Both of you have a love for live music and possess a spiritual side. With your common industry background, secure attachment style, and liberal political views, you could enjoy engaging conversations and a shared understanding of each other's professional life. Samantha's pescatarian dietary choice is a slight difference between you two but is a minor contrast overall.\n\n3. **Emily (Compatibility Score: 78%)** - Emily, a compassionate 24-year-old Elementary School Teacher, shares your enthusiasm for hiking and live music. With both of you having secure attachment styles, you could build a stable and nurturing relationship. You also align on liberal political and spiritual values, making for meaningful dialogue and understanding. Emily's vegetarian lifestyle and her lower income preference compared to your broader range highlight certain differences, and her age places her at the lower end of your preferred age spectrum.\n\nEach person brings something unique to the table, and you might find different aspects of each connection appealing. Julia, Samantha, and Emily all seem to offer exciting opportunities for a potential match with you. Your shared interests, values, and readiness for a serious relationship with any of them could provide a solid basis for a meaningful and enjoyable partnership.",
    "role": "assistant"
  },
  "dalìPrompt": "Toned, casual, with an easy smile and engaging eyes, wears smart glasses, and often seen with a bike or laptop bag.",
  "datingIntentions": ["Relationship"],
  "describeYourHome": "Cozy apartment in a lively neighborhood, close to downtown Austin",
  "describeYourIdealFirstDate": "Exploring a local art exhibit or enjoying a casual outdoor picnic with great conversation.",
  "describeYourIdealPartner": "I’m looking for someone who is compassionate, independent, and enjoys the outdoors. An ideal partner would be someone who’s eager to explore new places, share a laugh over clever jokes, and who feels just as at home at a concert as they do star-gazing in the middle of nowhere.",
  "describeYourSelfInYourOwnWords": "I'm Christopher, a tech enthusiast and software engineer in Austin. I love being active outdoors, whether that’s whizzing down the bike trail or enjoying a quiet hike. I'm a big fan of live music and the vibrant film scene here. While I mostly keep it light with my love for craft beer and indie movies, I do appreciate deep conversations about life and technology.",
  "dietaryRestrictions": ["None"],
  "doYouOwnYourHome": false,
  "doYouSmoke": "No",
  "drinkingHabits": ["Socially"],
  "email": "gfitzgerald123@gmail.com",
  "encounterActive": false,
  "encounterChatHistory": [],
  "encounterCreatedAt": {
    "__time__": "2024-01-28T18:59:54.326Z"
  },
  "encounterProfile": {
    "activitiesIEnjoy": [
      "Yoga",
      "Paddle Boarding",
      "Dance Classes",
      "Cycling",
      "Hiking",
      "Exploring New Restaurants"
    ],
    "age": 27,
    "attachmentStyle": "Secure",
    "bodyType": "Fit",
    "city": "Austin",
    "datingIntentions": ["Relationship"],
    "describeYourIdealFirstDate": "Casual bar with drinks and appetizers",
    "describeYourIdealPartner": "I'm looking for a man with intelligence and integrity, who values personal growth and emotional connection. Being physically active and having a sense of adventure is important, as well as enjoying the simple joys of life, including a passion for food and culture.",
    "describeYourSelfInYourOwnWords": "I'm Julia, a 27-year-old marketing coordinator who loves the vibrant culture of Austin. I'm passionate about my career but also value balance through yoga, paddle boarding, and exploring the city's diverse culinary scene. I'm looking for meaningful connections and a partner to share in life's adventures.",
    "dietaryRestrictions": ["None"],
    "drinkingHabits": ["Socially"],
    "email": "gfitzgerald123@gmail.com",
    "ethnicity": "Hispanic/Latino",
    "faith": "Spiritual but not religious",
    "favoriteBars": ["Whisler's", "Nickel City", "Gibson Street Bar"],
    "favoriteRestaurants": ["El Naranjo", "Launderette", "Lin Asian Bar"],
    "firstName": "Julia",
    "gender": "Female",
    "hasChildren": false,
    "height": "5'6''",
    "highestEducationLevelCompleted": "Bachelor's Degree",
    "id": "k107bax1qfawszasmmej7p",
    "introductionDescription": "Julia is a bright and active professional who loves her work in marketing. When not in the office, you can find her practicing yoga, enjoying the outdoors, or trying out the latest dining hotspots. She's a lover of culture, and though she doesn't own any pets, she has a big heart for animals and nature. Spirituality is vital to her, but she respects all walks of life and beliefs.",
    "neighborhood": "South Congress",
    "occupation": "Marketing Coordinator",
    "politicalAffiliation": "Moderate",
    "profileImageUrls": ["1.png", "2.png"],
    "relationshipStatus": "Never Married",
    "rentOrOwn": "Rent",
    "sexualOrientation": "Straight",
    "sober": false,
    "state": "TX",
    "wantsChildren": "Yes",
    "zipcode": 78704
  },
  "ethnicity": "Caucasian",
  "eyeColor": "Blue",
  "faith": "Spiritual but not religious",
  "favoriteBars": ["Whisler's", "Nickel City", "Small Victory"],
  "favoriteRestaurants": ["Loro", "Odd Duck", "Torchy's Tacos"],
  "feedback": "",
  "firstName": "Christopher",
  "fullFame": "Bob Jones",
  "gender": "Male",
  "haircolor": "Blonde",
  "hasActiveEncounter": false,
  "hasChildren": false,
  "hasPets": false,
  "hasStartedOnboarding": true,
  "height": "5'11''",
  "heightInInches": 71,
  "highestEducationLevelCompleted": "Bachelor's Degree",
  "id": "hSLfngCKRHUey4KbJvK1cYmh5yw1",
  "idVerified": true,
  "identities": [
    {
      "account": "018c30de-c128-f03f-c7c6-7f9a75bc3f96",
      "address": {
        "city": "New York",
        "country": "US",
        "line1": "759 Victoria Plaza",
        "line2": null,
        "postal_code": "10014",
        "state": "NY"
      },
      "base_pay": {
        "amount": null,
        "currency": "USD",
        "period": null
      },
      "birth_date": "1980-10-10",
      "created_at": "2023-12-03T18:10:26.465Z",
      "email": "test1@argyle.com",
      "employer": "Uber",
      "employment_status": "active",
      "employment_type": "contractor",
      "first_name": "Bob",
      "full_name": "Bob Jones",
      "gender": "Male",
      "hire_date": "2021-06-03",
      "id": "018c30df-db32-9547-e4d1-d49ce2390260",
      "job_title": null,
      "last_name": "Jones",
      "marital_status": "Married filing jointly",
      "metadata": {},
      "pay_cycle": "weekly",
      "phone_number": "+18009000010",
      "picture_url": "https://api-sandbox.argyle.com/v2/payroll-documents/018c30df-da9a-e087-5997-4f57c37cd854/file",
      "platform_ids": {
        "employee_id": null,
        "platform_user_id": "CPS9GIM52XXWSE6B",
        "position_id": null
      },
      "ssn": "522-09-1191",
      "termination_date": null,
      "termination_reason": null,
      "updated_at": "2023-12-03T18:13:27.824Z"
    },
    {
      "account": "018c220f-5b9e-15e7-2a5e-98ac7dc4e767",
      "address": {
        "city": "New York",
        "country": "US",
        "line1": "759 Victoria Plaza",
        "line2": null,
        "postal_code": "10014",
        "state": "NY"
      },
      "base_pay": {
        "amount": null,
        "currency": "USD",
        "period": null
      },
      "birth_date": "1980-10-10",
      "created_at": "2023-11-30T21:08:11.871Z",
      "email": "test1@argyle.com",
      "employer": "Uber",
      "employment_status": "active",
      "employment_type": "contractor",
      "first_name": "Bob",
      "full_name": "Bob Jones",
      "gender": "Male",
      "hire_date": "2021-05-31",
      "id": "018c220f-84a1-6517-3711-3e41bf6b96bf",
      "job_title": null,
      "last_name": "Jones",
      "marital_status": "Married filing jointly",
      "metadata": {},
      "pay_cycle": "weekly",
      "phone_number": "+18009000010",
      "picture_url": "https://api-sandbox.argyle.com/v2/payroll-documents/018c220f-8407-e19a-264c-39ae5dc0461f/file",
      "platform_ids": {
        "employee_id": null,
        "platform_user_id": "C3FCZQH4P46LJW1G",
        "position_id": null
      },
      "ssn": "522-09-1191",
      "termination_date": null,
      "termination_reason": null,
      "updated_at": "2023-11-30T21:11:06.959Z"
    },
    {
      "account": "018c373c-f983-ac0a-1a89-1e1df1729dc6",
      "address": {
        "city": "New York",
        "country": "US",
        "line1": "759 Victoria Plaza",
        "line2": null,
        "postal_code": "10014",
        "state": "NY"
      },
      "base_pay": {
        "amount": "27477.57",
        "currency": "USD",
        "period": "annual"
      },
      "birth_date": "1980-10-10",
      "created_at": "2023-12-04T23:51:15.197Z",
      "email": "test1@argyle.com",
      "employer": "Chewy",
      "employment_status": "active",
      "employment_type": "full-time",
      "first_name": "Bob",
      "full_name": "Bob Jones",
      "gender": "Male",
      "hire_date": "2021-05-04",
      "id": "018c373e-3cdb-b684-4a49-8b50c7806047",
      "job_title": "1635 - Helpline Agent",
      "last_name": "Jones",
      "marital_status": "Married filing jointly",
      "metadata": {},
      "pay_cycle": "biweekly",
      "phone_number": "+18009000010",
      "picture_url": "https://api-sandbox.argyle.com/v2/payroll-documents/018c373e-3c4f-16fb-35eb-a83bacd57fcd/file",
      "platform_ids": {
        "employee_id": "2HLAEYELV",
        "platform_user_id": "F9BFMNIXL08U13AV",
        "position_id": "L6PFV524P"
      },
      "ssn": "522-09-1191",
      "termination_date": null,
      "termination_reason": null,
      "updated_at": "2023-12-04T23:51:15.197Z"
    },
    {
      "account": "018c21f4-e1bf-f887-e6ab-71f1cb7dd2df",
      "address": {
        "city": "New York",
        "country": "US",
        "line1": "759 Victoria Plaza",
        "line2": null,
        "postal_code": "10014",
        "state": "NY"
      },
      "base_pay": {
        "amount": null,
        "currency": "USD",
        "period": null
      },
      "birth_date": "1980-10-10",
      "created_at": "2023-11-30T20:39:41.205Z",
      "email": "test1@argyle.com",
      "employer": "Uber",
      "employment_status": "active",
      "employment_type": "contractor",
      "first_name": "Bob",
      "full_name": "Bob Jones",
      "gender": "Male",
      "hire_date": "2021-03-30",
      "id": "018c21f5-6ae6-be4a-be53-d806acb20279",
      "job_title": null,
      "last_name": "Jones",
      "marital_status": "Married filing jointly",
      "metadata": {},
      "pay_cycle": "weekly",
      "phone_number": "+18009000010",
      "picture_url": "https://api-sandbox.argyle.com/v2/payroll-documents/018c21f5-6a77-3953-b9f2-e2aa51fa8a2e/file",
      "platform_ids": {
        "employee_id": null,
        "platform_user_id": "V9LA72LVVN19Y48I",
        "position_id": null
      },
      "ssn": "522-09-1191",
      "termination_date": null,
      "termination_reason": null,
      "updated_at": "2023-11-30T20:42:52.907Z"
    },
    {
      "account": "018c21df-eb23-72e6-5d5f-7f381c51ae6a",
      "address": {
        "city": "New York",
        "country": "US",
        "line1": "759 Victoria Plaza",
        "line2": null,
        "postal_code": "10014",
        "state": "NY"
      },
      "base_pay": {
        "amount": null,
        "currency": "USD",
        "period": null
      },
      "birth_date": "1980-10-10",
      "created_at": "2023-11-30T20:16:21.941Z",
      "email": "test1@argyle.com",
      "employer": "Uber",
      "employment_status": "active",
      "employment_type": "contractor",
      "first_name": "Bob",
      "full_name": "Bob Jones",
      "gender": "Male",
      "hire_date": "2021-03-30",
      "id": "018c21e0-10d3-9002-b82f-45adee984a27",
      "job_title": null,
      "last_name": "Jones",
      "marital_status": "Married filing jointly",
      "metadata": {},
      "pay_cycle": "weekly",
      "phone_number": "+18009000010",
      "picture_url": "https://api-sandbox.argyle.com/v2/payroll-documents/018c21e0-1043-161d-9c4d-2c812affd7cf/file",
      "platform_ids": {
        "employee_id": null,
        "platform_user_id": "USAWK3FZQTY4T1BN",
        "position_id": null
      },
      "ssn": "522-09-1191",
      "termination_date": null,
      "termination_reason": null,
      "updated_at": "2023-11-30T20:19:52.792Z"
    },
    {
      "account": "018c2117-cb3a-35ed-f87f-8cb096e0e178",
      "address": {
        "city": "New York",
        "country": "US",
        "line1": "759 Victoria Plaza",
        "line2": null,
        "postal_code": "10014",
        "state": "NY"
      },
      "base_pay": {
        "amount": null,
        "currency": "USD",
        "period": null
      },
      "birth_date": "1980-10-10",
      "created_at": "2023-11-30T16:37:46.612Z",
      "email": "test1@argyle.com",
      "employer": "Uber",
      "employment_status": "inactive",
      "employment_type": "contractor",
      "first_name": "Bob",
      "full_name": "Bob Jones",
      "gender": "Male",
      "hire_date": "2021-03-01",
      "id": "018c2117-f10e-c08a-5ce9-a3ca64b62346",
      "job_title": null,
      "last_name": "Jones",
      "marital_status": "Married filing jointly",
      "metadata": {},
      "pay_cycle": "weekly",
      "phone_number": "+18009000010",
      "picture_url": "https://api-sandbox.argyle.com/v2/payroll-documents/018c2117-f06a-f705-ed51-356bf11538ed/file",
      "platform_ids": {
        "employee_id": null,
        "platform_user_id": "0P0HZFXU09MFS2YM",
        "position_id": null
      },
      "ssn": "522-09-1191",
      "termination_date": "2023-10-16",
      "termination_reason": null,
      "updated_at": "2023-11-30T16:41:01.187Z"
    },
    {
      "account": "018c20fb-615a-a797-b150-04aacaad8e7a",
      "address": {
        "city": "New York",
        "country": "US",
        "line1": "759 Victoria Plaza",
        "line2": null,
        "postal_code": "10014",
        "state": "NY"
      },
      "base_pay": {
        "amount": null,
        "currency": "USD",
        "period": null
      },
      "birth_date": "1980-10-10",
      "created_at": "2023-11-30T16:07:03.901Z",
      "email": "test1@argyle.com",
      "employer": "Uber",
      "employment_status": "active",
      "employment_type": "contractor",
      "first_name": "Bob",
      "full_name": "Bob Jones",
      "gender": "Male",
      "hire_date": "2020-11-30",
      "id": "018c20fb-d323-c4e8-d14f-1b8edc95af23",
      "job_title": null,
      "last_name": "Jones",
      "marital_status": "Married filing jointly",
      "metadata": {},
      "pay_cycle": "weekly",
      "phone_number": "+18009000010",
      "picture_url": "https://api-sandbox.argyle.com/v2/payroll-documents/018c20fb-d2ab-8d26-eea7-28ba41a2258b/file",
      "platform_ids": {
        "employee_id": null,
        "platform_user_id": "XCPYFELYLMK41CJC",
        "position_id": null
      },
      "ssn": "522-09-1191",
      "termination_date": null,
      "termination_reason": null,
      "updated_at": "2023-11-30T16:10:30.878Z"
    }
  ],
  "identityVerificationData": {
    "userId": "hSLfngCKRHUey4KbJvK1cYmh5yw1",
    "vendorData": " ",
    "veriffId": "24acc27a-a1e4-4589-ac58-16be3b287244"
  },
  "income": 110000,
  "incomeBracket": [1000000, 500000],
  "incomeVerification": {
    "accountId": "018c373c-f983-ac0a-1a89-1e1df1729dc6",
    "linkItemId": "myadp_platform",
    "userId": "018c373c-f825-f5ce-1723-18d2197e34f0",
    "userToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRfaWQiOiIwMTg1NDVlNi1hZjkyLTNlZDctMjkxNy0yMjExYTQzYWEyMmUiLCJleHAiOjE3MDQzMjU3OTEsImZpZCI6IjMzNzFhNjJmLWUyZTktNGJhYS1hMGY3LTZiNTMzMWFhM2RhNyIsImlhdCI6MTcwMTczMzc5MSwiaXNzIjoiYXJneWxlLWNvcmUtYXV0aC1wcm9kIiwianRpIjoiYjgxZTc5NDYtMjgyOS00MThkLWIwMDUtZDhmZTk3ZTk0OTJjIiwic3ViIjoiMDE4YzM3M2MtZjgyNS1mNWNlLTE3MjMtMThkMjE5N2UzNGYwIiwidXNlcl9pZCI6IjAxOGMzNzNjLWY4MjUtZjVjZS0xNzIzLTE4ZDIxOTdlMzRmMCJ9.QzxPrD4E8P_xOqjSPAdhG2KsNjIu0ryR7yV2cQ3C8CQ"
  },
  "incomeVerified": false,
  "industry": "Technology",
  "introductionDescription": "Christopher is a 34-year-old Software Engineer with a strong affinity for creativity and innovation. When he's not coding, he's likely to be participating in a local tech meetup, enjoying the Austin music scene, or planning his next hiking trip. He's sociable, witty, and values a genuine connection over everything.",
  "isOnboarding": false,
  "lastLogin": 1699756758570,
  "lastName": "Bell",
  "latitutide": 30.2672,
  "longitude": -97.7431,
  "maritalStatus": "Married filing jointly",
  "matches": [
    "k107bax1qfawszasmmej7p",
    "RCbD8ilQuWK5kJd85LjS",
    "qcxh94bufnxsajdfu84"
  ],
  "myersBriggs": "INTP",
  "neighborhood": "South Congress",
  "occupation": "Software Engineer",
  "onboarded": true,
  "onboardingHistory": [],
  "onboardingProgress": 100,
  "phoneNumber": "+14136584988",
  "pineconeId": "rde38nhn4r9vcnt8ol9mup",
  "politicalAffiliation": "Liberal",
  "potentialMatches": [
    {
      "compatibilityScore": 95,
      "explanation": "Julia and Christopher share a similar attachment style and passion for the outdoors, both enjoying hiking and live music. They value spirituality over religious attendance and both drink socially. Julia's interest in cultural experiences and intellectual conversations align with Christopher's profile. They live in the same neighborhood, which could enhance their compatibility. Furthermore, their dietary habits do not conflict, making shared meals enjoyable.",
      "userId": "k107bax1qfawszasmmej7p"
    },
    {
      "compatibilityScore": 89,
      "explanation": "Emily and Christopher have both an athletic body type and a secure attachment style. They enjoy hiking and live music, value a spiritually oriented life over religious practice, and both have a social approach towards drinking. Their political views align, both preferring a liberal stance. While Emily is a vegetarian, this might not pose a significant challenge since Christopher does not have dietary restrictions.",
      "userId": "RCbD8ilQuWK5kJd85LjS"
    },
    {
      "compatibilityScore": 87,
      "explanation": "Samantha and Christopher share common interests in hiking, biking, and live music. They both have a secure attachment style and lead an athletic lifestyle. The overlap in spiritual beliefs and liberal political affiliations indicates shared values. Samantha's pescatarian diet is compatible with Christopher's unrestricted approach to eating. Their goals for a committed relationship and enthusiasm for life make them a good match.",
      "userId": "qcxh94bufnxsajdfu84"
    }
  ],
  "preferredAgeMax": 33,
  "preferredAgeMin": 24,
  "preferredBodyType": ["Athletic", "Fit", "Average"],
  "preferredChurchAttendance": ["Never", "Occasionally"],
  "preferredCovidVaccinated": true,
  "preferredDatingIntentions": ["Relationship"],
  "preferredDrinkingHabits": ["Socially", "Light"],
  "preferredEducationLevel": ["Bachelor's Degree", "Master's Degree"],
  "preferredEthnicities": [
    "Caucasian",
    "Hispanic/Latino",
    "Mixed Ethnicity",
    "Other"
  ],
  "preferredFaith": ["Agnostic", "Spiritual but not religious"],
  "preferredGender": "Female",
  "preferredHeightMax": 72,
  "preferredHeightMin": 60,
  "preferredIncomeMax": 150000,
  "preferredIncomeMin": 60000,
  "preferredMaxHeight": 70,
  "preferredMethodOfFirstContact": ["Text message"],
  "preferredPoliticalAffiliation": ["Liberal", "Moderate"],
  "preferredQualitiesInYourIdealPartner": [
    "Compassionate",
    "Independent",
    "Adventurous",
    "Funny",
    "Intellectual"
  ],
  "preferredRelationshipStatus": ["Never Married", "Divorced"],
  "preferredSexualOrientation": ["Straight"],
  "previousEncounterChatHistory": [],
  "previousMatches": [],
  "profileUrls": [
    "blob:http://localhost:3000/ae7e2a32-45d4-433d-97ca-d3d1d5f7b010",
    "blob:http://localhost:3000/89fc82b6-322d-45d6-8396-9b9b0c3939f9",
    "blob:http://localhost:3000/0d4fed7b-8db3-4130-9555-0ed5261289af",
    "blob:http://localhost:3000/c63e63ce-ce3d-4d17-9955-093860624d79",
    "blob:http://localhost:3000/9f443f9e-9670-48c6-ba35-fa4c1bbc1724"
  ],
  "relationshipStatus": "Never Married",
  "rentOrOwn": "Rent",
  "seenMatches": [],
  "sexualOrientation": "Straight",
  "sober": false,
  "state": "TX",
  "synthetic": true,
  "syntheticProfileVersion": 1,
  "uid": "hSLfngCKRHUey4KbJvK1cYmh5yw1",
  "veriffId": "24acc27a-a1e4-4589-ac58-16be3b287244",
  "wantsChildren": "Yes",
  "zipcode": 78704
}


const EditableField = ({
  editMode,
  value,
  onChange,
  onSave,
  placeholder,
  displayClassName,
  inputId,
  fieldType = "text", // default to text if not specified
}) =>
  editMode ? (
    <div className="edit-container">
      <input
        type={fieldType}
        id={inputId}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="input-field"
      />
      <button onClick={onSave} className="save-button">
        Save
      </button>
    </div>
  ) : (
    <p onClick={onSave} className={displayClassName}>
      {placeholder}: {value}
    </p>
  );

export function getIncomeBracket(income) {
  if (!income) {
    return "Income not available";
  }
  const bracketSize = 50000;
  const bracketNumber = Math.floor(income / bracketSize);
  const lowerBound = bracketNumber * bracketSize;
  const upperBound = (bracketNumber + 1) * bracketSize - 1;
  return [lowerBound, upperBound];
}

export default function MenuDrawer({
  user,
  open,
  onClose,
  savedSearches,
  handleSearch,
  handleOpen,
  openContactSupport,
  openUploadPicture,
}) {
  console.log('hello')
  const history = useHistory();
  const nodeRef = React.useRef(null);
  const profileDetails = {};
  const yourPreferences = {};
  // console.log('MenuDrawer', user)

  if (user) {
    for (const key in user) {
      if (
        key.toLowerCase().startsWith("preferred") ||
        key.toLowerCase().startsWith("wants")
      ) {
        yourPreferences[key] = user[key];
      } else {
        profileDetails[key] = user[key];
      }
    }
  }

  const [profilePictures, setProfilePicture] = React.useState([
    { image: profile },
    { image: ArgyleImg },
    { image: AssistantImg },
    { image: ArgyleImg },
    { image: AssistantImg },
  ]);
  const [email, setEmail] = React.useState(user.email);
  const [name, setName] = React.useState(
    profileDetails?.firstName + " " + profileDetails?.lastName
  );
  const [gender, setGender] = React.useState(profileDetails?.gender);
  const [birthdate, setBirthdate] = React.useState(profileDetails?.birthdate);
  const [incomeBracket, setIncomeBracket] = React.useState(
    profileDetails?.income
  );
  const [age, setAge] = React.useState(profileDetails?.age);
  const [city, setCity] = React.useState(profileDetails?.city);
  const [bodyType, setBodyType] = React.useState(profileDetails?.bodyType);
  const [company, setCompany] = React.useState(profileDetails?.company);
  const [address, setAddress] = React.useState(
    profileDetails?.city +
    "," +
    profileDetails?.state +
    "," +
    profileDetails?.zipcode
  );
  const [activitiesEnjoy, setAcitivitiesEnjoy] = React.useState(
    profileDetails?.activitiesIEnjoy
  );
  const [celebrityCrush, setCelebrityCrush] = React.useState(
    profileDetails?.celebrityCrush
  );
  const [churchAttendance, setChurchAttendance] = React.useState(
    profileDetails?.churchAttendance
  );
  const [covidVaccinated, setCovidVaccinated] = React.useState(
    profileDetails?.covidVaccinated
  );
  const [datingIntentions, setDatingIntentions] = React.useState(
    profileDetails?.datingIntentions
  );
  const [dietaryRestrictions, setDietaryRestrictions] = React.useState(
    profileDetails?.dietaryRestrictions
  );
  const [describeYourIdealFirstDate, setDescribeYourIdealFirstDate] =
    React.useState(profileDetails?.describeYourIdealFirstDate);

  const [describeYourIdealPartner, setDescribeYourIdealPartner] =
    React.useState(profileDetails?.describeYourIdealPartner);
  const [describeYourSelfInYourOwnWords, setDescribeYourSelfInYourOwnWords] =
    React.useState(profileDetails?.describeYourSelfInYourOwnWords);
  const [doYouOwnYourHome, setDoYouOwnYourHome] = React.useState(
    profileDetails?.doYouOwnYourHome
  );
  const [doYouSmoke, setDoYouSmoke] = React.useState(
    profileDetails?.doYouSmoke
  );
  const [ethnicity, setDthnicity] = React.useState(profileDetails?.ethnicity);
  const [eyeColor, setEyeColor] = React.useState(profileDetails?.eyeColor);
  const [faith, setFaith] = React.useState(profileDetails?.faith);
  const [haircolor, setHaircolor] = React.useState(profileDetails?.haircolor);
  const [hasChildren, setHasChildren] = React.useState(
    profileDetails?.hasChildren
  );
  const [hasKids, setHasKids] = React.useState(profileDetails?.hasKids);
  const [hasPets, setHasPets] = React.useState(profileDetails?.hasPets);
  const [height, setHeight] = React.useState(profileDetails?.height);
  const [highestEducationLevelCompleted, setHighestEducationLevelCompleted] =
    React.useState(profileDetails?.highestEducationLevelCompleted);
  const [idVerified, setIdVerified] = React.useState(
    profileDetails?.idVerified
  );
  const [industry, setIndustry] = React.useState(profileDetails?.industry);
  const [occupation, setOccupation] = React.useState(
    profileDetails?.occupation
  );

  //Your Prefrences
  const [preferredBodyType, setPreferredBodyType] = React.useState(
    yourPreferences?.preferredBodyType
  );
  const [preferredChurchAttendance, setPreferredChurchAttendance] =
    React.useState(yourPreferences?.preferredChurchAttendance);
  const [preferredCovidVaccinated, setPreferredCovidVaccinated] =
    React.useState(profileDetails?.preferredCovidVaccinated);
  const [preferredDatingIntentions, setPreferredDatingIntentions] =
    React.useState(yourPreferences?.preferredDatingIntentions);
  const [preferredDrinkingHabits, setPreferredDrinkingHabits] = React.useState(
    yourPreferences?.preferredDrinkingHabits
  );

  const [preferredAgeMin, setPreferredAgeMin] = React.useState(
    yourPreferences?.preferredAgeMin
  );
  const [preferredAgeMax, setPreferredAgeMax] = React.useState(
    yourPreferences?.preferredAgeMax
  );

  const [edit, setEdit] = React.useState(false);
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, ["left"]: open });
  };

  const logout = () => {
    const auth = getAuth();
    signOut(auth)
      .then((response) => {
        localStorage.removeItem("user");
        localStorage.removeItem("userDetails");
        history.push("/");
        window.location.reload(false);
      })
      .catch((error) => {
        console.error("Logout failed:", error);
      });
  };

  const list = (anchor) => (
    <Box
      sx={{
        width: anchor === "top" || anchor === "bottom" ? "auto" : 280,
      }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <div style={{ display: "flex", justifyContent: "center" }}>
          Saved Searches
        </div>
        <Divider />
        {savedSearches.map((search) => (
          <ListItem
            key={search.id}
            style={{
              width: "80%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Chip
              label={search.message}
              style={{ width: "80%" }}
              onClick={() => {
                handleSearch(search.message);
                onClose();
              }}
            />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {[
          "Profile Details",
          "Your Preferences",
          "Delete Account",
          "Support",
          "Logout",
        ].map((text, index) =>
          text === "Your Preferences" ? (
            <Accordion key={`${text}-${index}`}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>{text}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div className="profile-image-grid">
                  {profilePictures.map((item, index) => (
                    <Card
                      src={item.image}
                      title={`Image ${index + 1}`}
                      id={index}
                      key={`${index}-profilePicture`}
                      index={index}
                      moveImage={moveImage}
                      className="profile-img"
                      onClick={() => {
                        if (index === 0) {
                          //
                        } else {
                          openUploadPicture();
                        }
                      }}
                    />
                  ))}
                </div>
                <div className={edit ? "edit-mode" : "display-mode"}>
                  <AgeSlider
                    max={99}
                    min={18}
                    onChange={({ min, max }) =>
                      console.log(`min = ${min}, max = ${max}`)
                    }
                  />
                </div>
                <div className={edit ? "edit-mode" : "display-mode"}>
                  {edit ? (
                    <div className="edit-container">
                      <input
                        type="text"
                        id="nameInput"
                        value={highestEducationLevelCompleted}
                        onChange={(e) =>
                          setHighestEducationLevelCompleted(e.target.value)
                        }
                        placeholder="Enter your gender"
                        className="input-field"
                      />
                      <button
                        onClick={() => setEdit(!edit)}
                        className="save-button"
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <p onClick={() => setEdit(!edit)} className="display-text">
                      Highest Education Level Completed: {""}
                      {highestEducationLevelCompleted}
                    </p>
                  )}
                </div>
                <div className={edit ? "edit-mode" : "display-mode"}>
                  {edit ? (
                    <div className="edit-container">
                      <input
                        type="text"
                        id="nameInput"
                        value={
                          preferredBodyType ? preferredBodyType.join(", ") : ""
                        }
                        onChange={(e) => setPreferredBodyType(e.target.value)}
                        placeholder="Enter your gender"
                        className="input-field"
                      />
                      <button
                        onClick={() => setEdit(!edit)}
                        className="save-button"
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <p onClick={() => setEdit(!edit)} className="display-text">
                      Preferred BodyType :{" "}
                      {preferredBodyType ? preferredBodyType.join(", ") : ""}
                    </p>
                  )}
                </div>
                <div className={edit ? "edit-mode" : "display-mode"}>
                  {edit ? (
                    <div className="edit-container">
                      <input
                        type="text"
                        id="nameInput"
                        value={preferredChurchAttendance}
                        onChange={(e) =>
                          setPreferredChurchAttendance(e.target.value)
                        }
                        placeholder="Enter your gender"
                        className="input-field"
                      />
                      <button
                        onClick={() => setEdit(!edit)}
                        className="save-button"
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <p onClick={() => setEdit(!edit)} className="display-text">
                      Preferred Church Attendance :{" "}
                      {preferredChurchAttendance
                        ? preferredChurchAttendance.join(", ")
                        : ""}
                    </p>
                  )}
                </div>
                <div className={edit ? "edit-mode" : "display-mode"}>
                  <p className="display-text">
                    Prefer Covid Vaccinated :{" "}
                    <Switch
                      checked={preferredCovidVaccinated}
                      onChange={(event) =>
                        setPreferredCovidVaccinated(!preferredCovidVaccinated)
                      }
                      inputProps={{
                        "aria-label": "controlled",
                      }}
                    />
                  </p>
                </div>
                <div className={edit ? "edit-mode" : "display-mode"}>
                  {edit ? (
                    <div className="edit-container">
                      <input
                        type="text"
                        id="nameInput"
                        value={preferredDatingIntentions}
                        onChange={(e) =>
                          setPreferredDatingIntentions(e.target.value)
                        }
                        placeholder="Enter your gender"
                        className="input-field"
                      />
                      <button
                        onClick={() => setEdit(!edit)}
                        className="save-button"
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <p onClick={() => setEdit(!edit)} className="display-text">
                      Preferred Dating Intentions: {""}
                      {preferredDatingIntentions
                        ? preferredDatingIntentions.join(", ")
                        : ""}
                    </p>
                  )}
                </div>
                <div className={edit ? "edit-mode" : "display-mode"}>
                  {edit ? (
                    <div className="edit-container">
                      <input
                        type="text"
                        id="nameInput"
                        value={preferredDrinkingHabits}
                        onChange={(e) =>
                          setPreferredDatingIntentions(e.target.value)
                        }
                        placeholder="Enter your gender"
                        className="input-field"
                      />
                      <button
                        onClick={() => setEdit(!edit)}
                        className="save-button"
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <p onClick={() => setEdit(!edit)} className="display-text">
                      Preferred Drinking Intentions: {""}
                      {preferredDrinkingHabits
                        ? preferredDrinkingHabits.join(", ")
                        : ""}
                    </p>
                  )}
                </div>
                <div className={edit ? "edit-mode" : "display-mode"}>
                  <p className="display-text">
                    <PreferredIncomeSlider
                      min={50000}
                      max={2000000}
                      onChange={({ min, max }) =>
                        console.log(`min = ${min}, max = ${max}`)
                      }
                    />
                  </p>
                </div>
              </AccordionDetails>
            </Accordion>
          ) : text === "Profile Details" ? (
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>{text}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div className="profile-image-grid">
                  {profilePictures.map((item, index) => (
                    <Card
                      src={item.image}
                      title={`Image ${index + 1}`}
                      id={index}
                      index={index}
                      key={`${index}-profilePicture1`}
                      moveImage={moveImage}
                      className="profile-img"
                      onClick={() => {
                        if (index === 0) {
                          //
                        } else {
                          openUploadPicture();
                        }
                      }}
                    />
                  ))}
                </div>
                <Typography>
                  <div className={edit ? "edit-mode" : "display-mode"}>
                    {edit ? (
                      <div className="edit-container">
                        <input
                          type="text"
                          id="nameInput"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Enter your name"
                          className="input-field"
                        />
                        <button
                          onClick={() => setEdit(!edit)}
                          className="save-button"
                        >
                          Save
                        </button>
                      </div>
                    ) : (
                      <p
                        onClick={() => setEdit(!edit)}
                        className="display-text"
                      >
                        Name: {name}
                      </p>
                    )}
                  </div>
                  <div className={edit ? "edit-mode" : "display-mode"}>
                    {edit ? (
                      <div className="edit-container">
                        <input
                          type="text"
                          id="nameInput"
                          value={gender}
                          onChange={(e) => setGender(e.target.value)}
                          placeholder="Enter your gender"
                          className="input-field"
                        />
                        <button
                          onClick={() => setEdit(!edit)}
                          className="save-button"
                        >
                          Save
                        </button>
                      </div>
                    ) : (
                      <p
                        onClick={() => setEdit(!edit)}
                        className="display-text"
                      >
                        Gender: {gender}
                      </p>
                    )}
                  </div>
                  <div className={edit ? "edit-mode" : "display-mode"}>
                    {edit ? (
                      <div className="edit-container">
                        <input
                          type="text"
                          id="nameInput"
                          value={birthdate}
                          onChange={(e) => setBirthdate(e.target.value)}
                          placeholder="Enter your birthdate"
                          className="input-field"
                        />
                        <button
                          onClick={() => setEdit(!edit)}
                          className="save-button"
                        >
                          Save
                        </button>
                      </div>
                    ) : (
                      <p
                        onClick={() => setEdit(!edit)}
                        className="display-text"
                      >
                        Birthday: {birthdate}
                      </p>
                    )}
                  </div>
                  <div className={edit ? "edit-mode" : "display-mode"}>
                    {edit ? (
                      <div className="edit-container">
                        <input
                          type="text"
                          id="nameInput"
                          value={incomeBracket}
                          onChange={(e) => setIncomeBracket(e.target.value)}
                          placeholder="Enter your income"
                          className="input-field"
                        />
                        <button
                          onClick={() => setEdit(!edit)}
                          className="save-button"
                        >
                          Save
                        </button>
                      </div>
                    ) : (
                      <p className="display-text">
                        <MultiRangeSlider
                          min={getIncomeBracket(profileDetails?.income)[0]}
                          max={getIncomeBracket(profileDetails?.income)[1]}
                          onChange={({ min, max }) =>
                            console.log(`min = ${min}, max = ${max}`)
                          }
                        />
                      </p>
                    )}
                  </div>
                  <div className={edit ? "edit-mode" : "display-mode"}>
                    {edit ? (
                      <div className="edit-container">
                        <input
                          type="text"
                          id="nameInput"
                          value={age}
                          onChange={(e) => setAge(e.target.value)}
                          placeholder="Enter your gender"
                          className="input-field"
                        />
                        <button
                          onClick={() => setEdit(!edit)}
                          className="save-button"
                        >
                          Save
                        </button>
                      </div>
                    ) : (
                      <p
                        onClick={() => setEdit(!edit)}
                        className="display-text"
                      >
                        Age: {age}
                      </p>
                    )}
                  </div>
                  <div className={edit ? "edit-mode" : "display-mode"}>
                    {edit ? (
                      <div className="edit-container">
                        <input
                          type="text"
                          id="nameInput"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          placeholder="Enter your gender"
                          className="input-field"
                        />
                        <button
                          onClick={() => setEdit(!edit)}
                          className="save-button"
                        >
                          Save
                        </button>
                      </div>
                    ) : (
                      <p
                        onClick={() => setEdit(!edit)}
                        className="display-text"
                      >
                        City: {city}
                      </p>
                    )}
                  </div>
                  <div className={edit ? "edit-mode" : "display-mode"}>
                    {edit ? (
                      <div className="edit-container">
                        <input
                          type="text"
                          id="nameInput"
                          value={bodyType}
                          onChange={(e) => setBodyType(e.target.value)}
                          placeholder="Enter your gender"
                          className="input-field"
                        />
                        <button
                          onClick={() => setEdit(!edit)}
                          className="save-button"
                        >
                          Save
                        </button>
                      </div>
                    ) : (
                      <p
                        onClick={() => setEdit(!edit)}
                        className="display-text"
                      >
                        Body Type: {bodyType}
                      </p>
                    )}
                  </div>
                  <div className={edit ? "edit-mode" : "display-mode"}>
                    {edit ? (
                      <div className="edit-container">
                        <input
                          type="text"
                          id="nameInput"
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          placeholder="Enter your gender"
                          className="input-field"
                        />
                        <button
                          onClick={() => setEdit(!edit)}
                          className="save-button"
                        >
                          Save
                        </button>
                      </div>
                    ) : (
                      <p
                        onClick={() => setEdit(!edit)}
                        className="display-text"
                      >
                        Company: {company}
                      </p>
                    )}
                  </div>
                  <div className={edit ? "edit-mode" : "display-mode"}>
                    {edit ? (
                      <div className="edit-container">
                        <input
                          type="text"
                          id="nameInput"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          placeholder="Enter your gender"
                          className="input-field"
                        />
                        <button
                          onClick={() => setEdit(!edit)}
                          className="save-button"
                        >
                          Save
                        </button>
                      </div>
                    ) : (
                      <p
                        onClick={() => setEdit(!edit)}
                        className="display-text"
                      >
                        Address: {address}
                      </p>
                    )}
                  </div>
                  <div className={edit ? "edit-mode" : "display-mode"}>
                    {edit ? (
                      <div className="edit-container">
                        <input
                          type="text"
                          id="nameInput"
                          value={activitiesEnjoy}
                          onChange={(e) => setAcitivitiesEnjoy(e.target.value)}
                          placeholder="Enter your gender"
                          className="input-field"
                        />
                        <button
                          onClick={() => setEdit(!edit)}
                          className="save-button"
                        >
                          Save
                        </button>
                      </div>
                    ) : (
                      <p
                        onClick={() => setEdit(!edit)}
                        className="display-text"
                      >
                        Activities Enjoy:{" "}
                        {activitiesEnjoy ? activitiesEnjoy.join(", ") : ""}
                      </p>
                    )}
                  </div>
                  <div className={edit ? "edit-mode" : "display-mode"}>
                    {edit ? (
                      <div className="edit-container">
                        <input
                          type="text"
                          id="nameInput"
                          value={celebrityCrush}
                          onChange={(e) => setCelebrityCrush(e.target.value)}
                          placeholder="Enter your gender"
                          className="input-field"
                        />
                        <button
                          onClick={() => setEdit(!edit)}
                          className="save-button"
                        >
                          Save
                        </button>
                      </div>
                    ) : (
                      <p
                        onClick={() => setEdit(!edit)}
                        className="display-text"
                      >
                        Celebrity Crush:{" "}
                        {celebrityCrush ? celebrityCrush.join(", ") : ""}
                      </p>
                    )}
                  </div>
                  <div className={edit ? "edit-mode" : "display-mode"}>
                    <p className="display-text">
                      Covid Vaccinated :{" "}
                      <Switch
                        checked={covidVaccinated}
                        onChange={(event) =>
                          setCovidVaccinated(!covidVaccinated)
                        }
                        inputProps={{
                          "aria-label": "controlled",
                        }}
                      />
                    </p>
                  </div>
                  <div className={edit ? "edit-mode" : "display-mode"}>
                    {edit ? (
                      <div className="edit-container">
                        <input
                          type="text"
                          id="nameInput"
                          value={datingIntentions}
                          onChange={(e) => setDatingIntentions(e.target.value)}
                          placeholder="Enter your gender"
                          className="input-field"
                        />
                        <button
                          onClick={() => setEdit(!edit)}
                          className="save-button"
                        >
                          Save
                        </button>
                      </div>
                    ) : (
                      <p
                        onClick={() => setEdit(!edit)}
                        className="display-text"
                      >
                        Dating Intentions:{" "}
                        {datingIntentions ? datingIntentions.join(", ") : ""}
                      </p>
                    )}
                  </div>
                  <div className={edit ? "edit-mode" : "display-mode"}>
                    {edit ? (
                      <div className="edit-container">
                        <input
                          type="text"
                          id="nameInput"
                          value={dietaryRestrictions}
                          onChange={(e) =>
                            setDietaryRestrictions(e.target.value)
                          }
                          placeholder="Enter your gender"
                          className="input-field"
                        />
                        <button
                          onClick={() => setEdit(!edit)}
                          className="save-button"
                        >
                          Save
                        </button>
                      </div>
                    ) : (
                      <p
                        onClick={() => setEdit(!edit)}
                        className="display-text"
                      >
                        Dietary Restrictions:{" "}
                        {dietaryRestrictions
                          ? dietaryRestrictions.join(", ")
                          : ""}
                      </p>
                    )}
                  </div>
                  <div className={edit ? "edit-mode" : "display-mode"}>
                    <p className="display-text">
                      Do Your Own Home :{" "}
                      <Switch
                        checked={doYouOwnYourHome}
                        onChange={(event) =>
                          setDoYouOwnYourHome(!doYouOwnYourHome)
                        }
                        inputProps={{
                          "aria-label": "controlled",
                        }}
                      />
                    </p>
                  </div>
                  <div className={edit ? "edit-mode" : "display-mode"}>
                    <p className="display-text">
                      Do You Smoke :{" "}
                      <Switch
                        checked={doYouOwnYourHome}
                        onChange={(event) => setDoYouSmoke(!doYouSmoke)}
                        inputProps={{
                          "aria-label": "controlled",
                        }}
                      />
                    </p>
                  </div>
                  <div className={edit ? "edit-mode" : "display-mode"}>
                    {edit ? (
                      <div className="edit-container">
                        <input
                          type="text"
                          id="nameInput"
                          value={ethnicity}
                          onChange={(e) => setDthnicity(e.target.value)}
                          placeholder="Enter your gender"
                          className="input-field"
                        />
                        <button
                          onClick={() => setEdit(!edit)}
                          className="save-button"
                        >
                          Save
                        </button>
                      </div>
                    ) : (
                      <p
                        onClick={() => setEdit(!edit)}
                        className="display-text"
                      >
                        Ethnicity {ethnicity}
                      </p>
                    )}
                  </div>
                  <div className={edit ? "edit-mode" : "display-mode"}>
                    {edit ? (
                      <div className="edit-container">
                        <input
                          type="text"
                          id="nameInput"
                          value={eyeColor}
                          onChange={(e) => setEyeColor(e.target.value)}
                          placeholder="Enter your gender"
                          className="input-field"
                        />
                        <button
                          onClick={() => setEdit(!edit)}
                          className="save-button"
                        >
                          Save
                        </button>
                      </div>
                    ) : (
                      <p
                        onClick={() => setEdit(!edit)}
                        className="display-text"
                      >
                        Eye Color {eyeColor}
                      </p>
                    )}
                  </div>
                  <div className={edit ? "edit-mode" : "display-mode"}>
                    {edit ? (
                      <div className="edit-container">
                        <input
                          type="text"
                          id="nameInput"
                          value={faith}
                          onChange={(e) => setFaith(e.target.value)}
                          placeholder="Enter your gender"
                          className="input-field"
                        />
                        <button
                          onClick={() => setEdit(!edit)}
                          className="save-button"
                        >
                          Save
                        </button>
                      </div>
                    ) : (
                      <p
                        onClick={() => setEdit(!edit)}
                        className="display-text"
                      >
                        Faith: {""}
                        {faith}
                      </p>
                    )}
                  </div>
                  <div className={edit ? "edit-mode" : "display-mode"}>
                    {edit ? (
                      <div className="edit-container">
                        <input
                          type="text"
                          id="nameInput"
                          value={haircolor}
                          onChange={(e) => setHaircolor(e.target.value)}
                          placeholder="Enter your gender"
                          className="input-field"
                        />
                        <button
                          onClick={() => setEdit(!edit)}
                          className="save-button"
                        >
                          Save
                        </button>
                      </div>
                    ) : (
                      <p
                        onClick={() => setEdit(!edit)}
                        className="display-text"
                      >
                        Hair Color: {""}
                        {haircolor}
                      </p>
                    )}
                  </div>
                  <div className={edit ? "edit-mode" : "display-mode"}>
                    <p className="display-text">
                      Has Children :{" "}
                      <Switch
                        checked={hasChildren}
                        onChange={() => setHasChildren(!hasChildren)}
                        inputProps={{
                          "aria-label": "controlled",
                        }}
                      />
                    </p>
                  </div>
                  <div className={edit ? "edit-mode" : "display-mode"}>
                    <p className="display-text">
                      Has Kids :{" "}
                      <Switch
                        checked={hasKids}
                        onChange={() => setHasKids(!hasKids)}
                        inputProps={{
                          "aria-label": "controlled",
                        }}
                      />
                    </p>
                  </div>
                  <div className={edit ? "edit-mode" : "display-mode"}>
                    <p className="display-text">
                      Has Pets :{" "}
                      <Switch
                        checked={hasPets}
                        onChange={() => setHasPets(!hasPets)}
                        inputProps={{
                          "aria-label": "controlled",
                        }}
                      />
                    </p>
                  </div>
                  <div className={edit ? "edit-mode" : "display-mode"}>
                    {edit ? (
                      <div className="edit-container">
                        <input
                          type="text"
                          id="nameInput"
                          value={height}
                          onChange={(e) => setHeight(e.target.value)}
                          placeholder="Enter your gender"
                          className="input-field"
                        />
                        <button
                          onClick={() => setEdit(!edit)}
                          className="save-button"
                        >
                          Save
                        </button>
                      </div>
                    ) : (
                      <p
                        onClick={() => setEdit(!edit)}
                        className="display-text"
                      >
                        height: {""}
                        {height}
                      </p>
                    )}
                  </div>
                  <div className={edit ? "edit-mode" : "display-mode"}>
                    {edit ? (
                      <div className="edit-container">
                        <input
                          type="text"
                          id="nameInput"
                          value={highestEducationLevelCompleted}
                          onChange={(e) =>
                            setHighestEducationLevelCompleted(e.target.value)
                          }
                          placeholder="Enter your gender"
                          className="input-field"
                        />
                        <button
                          onClick={() => setEdit(!edit)}
                          className="save-button"
                        >
                          Save
                        </button>
                      </div>
                    ) : (
                      <p
                        onClick={() => setEdit(!edit)}
                        className="display-text"
                      >
                        Highest Education Level Completed: {""}
                        {highestEducationLevelCompleted}
                      </p>
                    )}
                  </div>
                  <div className={edit ? "edit-mode" : "display-mode"}>
                    <p className="display-text">
                      ID Verified:{" "}
                      <Switch
                        checked={idVerified}
                        onChange={() => setIdVerified(!idVerified)}
                        inputProps={{
                          "aria-label": "controlled",
                        }}
                      />
                    </p>
                  </div>
                  <div className={edit ? "edit-mode" : "display-mode"}>
                    {edit ? (
                      <div className="edit-container">
                        <input
                          type="text"
                          id="nameInput"
                          value={industry}
                          onChange={(e) => setIndustry(e.target.value)}
                          placeholder="Enter your gender"
                          className="input-field"
                        />
                        <button
                          onClick={() => setEdit(!edit)}
                          className="save-button"
                        >
                          Save
                        </button>
                      </div>
                    ) : (
                      <p
                        onClick={() => setEdit(!edit)}
                        className="display-text"
                      >
                        Industry: {""}
                        {industry}
                      </p>
                    )}
                  </div>
                  <div className={edit ? "edit-mode" : "display-mode"}>
                    {edit ? (
                      <div className="edit-container">
                        <input
                          type="text"
                          id="nameInput"
                          value={occupation}
                          onChange={(e) => setOccupation(e.target.value)}
                          placeholder="Enter your gender"
                          className="input-field"
                        />
                        <button
                          onClick={() => setEdit(!edit)}
                          className="save-button"
                        >
                          Save
                        </button>
                      </div>
                    ) : (
                      <p
                        onClick={() => setEdit(!edit)}
                        className="display-text"
                      >
                        Occupation: {""}
                        {occupation}
                      </p>
                    )}
                  </div>
                  <div className={edit ? "edit-mode" : "display-mode"}>
                    {edit ? (
                      <div className="edit-container">
                        <input
                          type="text"
                          id="nameInput"
                          value={describeYourIdealFirstDate}
                          onChange={(e) =>
                            setDescribeYourIdealFirstDate(e.target.value)
                          }
                          placeholder="Enter your gender"
                          className="input-field"
                        />
                        <button
                          onClick={() => setEdit(!edit)}
                          className="save-button"
                        >
                          Save
                        </button>
                      </div>
                    ) : (
                      <p
                        onClick={() => setEdit(!edit)}
                        className="display-text"
                      >
                        Describe Your Ideal First Date:{" "}
                        {describeYourIdealFirstDate}
                      </p>
                    )}
                  </div>
                  <div className={edit ? "edit-mode" : "display-mode"}>
                    {edit ? (
                      <div className="edit-container">
                        <input
                          type="text"
                          id="nameInput"
                          value={describeYourIdealPartner}
                          onChange={(e) =>
                            setDescribeYourIdealPartner(e.target.value)
                          }
                          placeholder="Enter your gender"
                          className="input-field"
                        />
                        <button
                          onClick={() => setEdit(!edit)}
                          className="save-button"
                        >
                          Save
                        </button>
                      </div>
                    ) : (
                      <p
                        onClick={() => setEdit(!edit)}
                        className="display-text"
                      >
                        Describe Your Ideal Partner: {describeYourIdealPartner}
                      </p>
                    )}
                  </div>
                  <div className={edit ? "edit-mode" : "display-mode"}>
                    {edit ? (
                      <div className="edit-container">
                        <input
                          type="text"
                          id="nameInput"
                          value={describeYourSelfInYourOwnWords}
                          onChange={(e) =>
                            setDescribeYourSelfInYourOwnWords(e.target.value)
                          }
                          placeholder="Enter your gender"
                          className="input-field"
                        />
                        <button
                          onClick={() => setEdit(!edit)}
                          className="save-button"
                        >
                          Save
                        </button>
                      </div>
                    ) : (
                      <p
                        onClick={() => setEdit(!edit)}
                        className="display-text"
                      >
                        Describe Your Self In Your Own Words:{" "}
                        {describeYourSelfInYourOwnWords}
                      </p>
                    )}
                  </div>
                </Typography>
              </AccordionDetails>
            </Accordion>
          ) : (
            <ListItem key={`${text}-${index}-${index}`} disablePadding>
              <ListItemButton
                onClick={() => {
                  if (text === "Delete Account") {
                    handleOpen();
                  } else if (text === "Support") {
                    openContactSupport();
                  } else if (text === "Logout") {
                    logout();
                  }
                }}
              >
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          )
        )}
      </List>
    </Box>
  );

  const moveImage = React.useCallback((dragIndex, hoverIndex) => {
    setProfilePicture((prevCards) => {
      const clonedCards = [...prevCards];
      const removedItem = clonedCards.splice(dragIndex, 1)[0];
      clonedCards.splice(hoverIndex, 0, removedItem);
      return clonedCards;
    });
  }, []);

  return (
    <div>
      <React.Fragment key={"left"}>
        <Drawer anchor={"left"} open={open} onClose={onClose}>
          {list("left")}
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Drawer>
      </React.Fragment>
    </div>
  );
}