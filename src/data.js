export const messages = [
  {
    type: "ai",
    text: "Could you please provide some information about your appearance and health? Height, build, hair color, eye color, physical description.",
  },
  {
    type: "user",
    text: "Yeah, sure. So, I'm about 6 feet tall, got a medium build, kinda average, I guess. My hair's dark brown, like really dark, almost black. Eyes? They're hazel, you know, a mix of green and brown. As for my physical description, well, I'm pretty active, hit the gym a couple of times a week, so I'd say I'm in decent shape overall.",
  },
];

export const IMAGE_URLS = Array.from(
  { length: 5 },
  (_, index) => `https://picsum.photos/300/300?random=${index}`
);

export const RANDOMCHIP = [
  "Art",
  "Bicycle tours",
  "Business Networking",
  "Camping",
  "Cooking",
  "Dancing",
  "Fashion",
  "Fitness",
  "Gardening",
  "Hiking",
  "Photography",
  "Reading",
  "Sports",
  "Travel",
  "Writing",
];

export const ACCORDION_DATA = [
  {
    value: "personal",
    header: "Personal Information",
    content: [
      { label: "Name", value: "Devon Lane" },
      { label: "Gender", value: "Male" },
      { label: "Birthday", value: "03/17/1987" },
      { label: "Age", value: "29" },
      { label: "Ethnicity", value: "Italian" },
      { label: "City", value: "New York" },
      { label: "Address", value: "New York, NY 10118" },
    ],
  },
  {
    value: "appearance",
    header: "Appearance and Health",
    content: [
      { label: "Height", value: "6 feet 2 inches" },
      { label: "Build", value: "Athletic" },
      { label: "Hair color", value: "Dark brown" },
      { label: "Eye color", value: "Blue" },
      {
        label: "Physical description",
        value:
          "I have an athletic build with broad shoulders. My hair is dark brown and usually kept short. My eyes are blue and often described as piercing. I enjoy staying active and hitting the gym regularly to maintain my fitness.",
      },
      { label: "COVID Vaccinated", value: "Yes", isIcon: true },
      { label: "Smoking", value: "Yes", isIcon: true },
    ],
  },
  {
    value: "hobbies",
    header: "Interests and Hobbies",
    content: [
      {
        label: "Favorite activities",
        value: ["Art", "Bicycle tours", "Business Networking"],
        isChip: true,
      },
      {
        label: "Celebrities I Like",
        value: "I have an athletic build with broad shoulders.",
      },
    ],
  },
  {
    value: "career",
    header: "Career and Achievements",
    content: [
        { label: "Income Bracket", value: "$130k-$180k" },
        { label: "Company", value: "General Enterprise" },
        { label: "Job title", value: "Software Developer" },
    ],
  },
  {
    value: "fourth",
    header: "Cultural Preference",
    content: [],
  },
];
