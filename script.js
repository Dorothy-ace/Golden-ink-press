document.addEventListener("DOMContentLoaded", () => {
  const books = [
    // ROMANCE (Non-BL books omit characters; BL/series carry searchable character names)
    {
      id: "the-broken-pieces",
      title: "The Broken Pieces",
      category: "Romance",
      isBL: false,
      characters: [],
      tags: ["emotional", "second-chance", "healing", "contemporary"],
      note: "Emotional Contemporary Romance",
      format: "PDF & EPUB",
      pages: "88 Pages",
      trailer: "Official Teaser Trailer: Two fractured hearts cross paths after a sudden turning point and learn how to trust again.",
      synopsis: "A moving story of heartbreak, second chances, and piecing together a life after unexpected loss."
    },
    {
      id: "i-hate-you",
      title: "I Hate You",
      category: "Romance",
      isBL: false,
      characters: [],
      tags: ["rivals-to-lovers", "banter", "slow-burn", "tension"],
      note: "Rivals-to-Lovers Romance",
      format: "PDF & EPUB",
      pages: "84 Pages",
      trailer: "Trailer Highlight: Every argument is a confession in disguise when the person you claim to despise is the only one on your mind.",
      synopsis: "A sharp, tension-filled romance where bitter banter slowly unravels into undeniable feelings."
    },
    {
      id: "we-are",
      title: "We Are",
      category: "Romance",
      isBL: true,
      characters: ["Phum", "Peem", "Q", "Toey"],
      tags: ["campus", "friends-to-lovers", "ensemble", "bl"],
      note: "Ensemble Campus BL Series",
      format: "PDF & EPUB",
      pages: "90 Pages",
      trailer: "Trailer Highlight: Chaos, late-night hangouts, and reluctant confessions among a tight-knit group of friends.",
      synopsis: "A warm, chaotic story of friendship, rivalry, and growing closer than anyone expected."
    },
    {
      id: "halo",
      title: "Halo",
      category: "Romance",
      isBL: false,
      characters: [],
      tags: ["trailer", "atmospheric", "slow-burn", "devotion"],
      note: "Atmospheric Romance & Trailer Edition",
      format: "PDF & EPUB",
      pages: "74 Pages",
      trailer: "Trailer Highlight: Soft light in the dark—a quiet pull between two people standing on opposite sides.",
      synopsis: "A luminous romance story centered on grace, mystery, and a lingering connection."
    },
    {
      id: "my-sunshine-thats-yet-to-come",
      title: "My Sunshine That's Yet to Come",
      category: "Romance",
      isBL: false,
      characters: [],
      tags: ["trailer", "hopeful", "comfort", "warmth"],
      note: "Hopeful Romance & Trailer Edition",
      format: "PDF & EPUB",
      pages: "80 Pages",
      trailer: "Trailer Highlight: Even after long winters, dawn is already waiting just over the horizon.",
      synopsis: "An uplifting romance about waiting patiently for brighter days and the person who brings the warmth."
    },
    {
      id: "iron-and-ink",
      title: "Iron and Ink",
      category: "Romance",
      isBL: false,
      characters: [],
      tags: ["letters", "literary", "steampunk", "guarded-hearts"],
      note: "Literary & Steampunk Romance",
      format: "PDF & EPUB",
      pages: "88 Pages",
      trailer: "Trailer Highlight: Forged metal, handwritten notes, and an unbreakable bond.",
      synopsis: "Where strength meets written words—two guarded characters discover a lasting connection."
    },
    {
      id: "you-touched-my-heart",
      title: "You Touched My Heart",
      category: "Romance",
      isBL: false,
      characters: [],
      tags: ["tender", "emotional", "vulnerability"],
      note: "Heartfelt Romance Novel",
      format: "PDF & EPUB",
      pages: "72 Pages",
      trailer: "Trailer Highlight: One moment shifts everything in a quiet, unforgettable way.",
      synopsis: "A gentle story of vulnerability, warmth, and opening up again."
    },
    {
      id: "my-heart-was-never-in-the-contract",
      title: "My Heart Was Never in the Contract",
      category: "Romance",
      isBL: false,
      characters: [],
      tags: ["fake-dating", "contract", "marriage-of-convenience"],
      note: "Contract Romance",
      format: "PDF & EPUB",
      pages: "95 Pages",
      trailer: "Trailer Highlight: Every term was clear on paper—except the feelings that weren't in the agreement.",
      synopsis: "An arrangement complicated by genuine emotions that neither side planned for."
    },
    {
      id: "illusion",
      title: "Illusion",
      category: "Romance",
      isBL: false,
      characters: [],
      tags: ["secrets", "drama", "truth"],
      note: "Romantic Drama",
      format: "PDF & EPUB",
      pages: "81 Pages",
      trailer: "Trailer Highlight: Not everything you see is real—especially when love is on the line.",
      synopsis: "A dramatic story about appearances, secrets, and finding what is real."
    },
    {
      id: "good-boundaries-and-goodbyes",
      title: "Good Boundaries and Goodbyes",
      category: "Romance",
      isBL: false,
      characters: [],
      tags: ["self-respect", "boundaries", "clarity"],
      note: "Relationships & Self-Respect",
      format: "PDF & EPUB",
      pages: "68 Pages",
      trailer: "Trailer Highlight: Learning where you end and another person begins.",
      synopsis: "A clear, thoughtful read on healthy boundaries, clarity, and knowing when to move on."
    },
    {
      id: "forgiving-what-you-cant-forget",
      title: "Forgiving What You Can't Forget",
      category: "Romance",
      isBL: false,
      characters: [],
      tags: ["healing", "closure", "peace"],
      note: "Healing & Emotional Renewal",
      format: "PDF & EPUB",
      pages: "75 Pages",
      trailer: "Trailer Highlight: Letting go of bitterness even when the memory remains.",
      synopsis: "A reflective story on healing and finding peace after painful memories."
    },
    {
      id: "campus-chronicles",
      title: "Campus Chronicles",
      category: "Romance",
      isBL: false,
      characters: [],
      tags: ["campus", "first-love", "university"],
      note: "University Life & Romance",
      format: "PDF & EPUB",
      pages: "84 Pages",
      trailer: "Trailer Highlight: Lecture halls, shared notebooks, and moments that stay after graduation.",
      synopsis: "Stories of university days, friendships, and budding romance."
    },
    {
      id: "undercover-love",
      title: "Undercover Love",
      category: "Romance",
      isBL: false,
      characters: [],
      tags: ["secret-identity", "undercover", "trust"],
      note: "Secret Identity Romance",
      format: "PDF & EPUB",
      pages: "89 Pages",
      trailer: "Trailer Highlight: Keeping a cover story intact gets harder with every glance.",
      synopsis: "A romance complicated by hidden roles and growing trust."
    },
    {
      id: "the-sky-between-us",
      title: "The Sky Between Us",
      category: "Romance",
      isBL: false,
      characters: [],
      tags: ["long-distance", "longing", "promise"],
      note: "Long-Distance Romance",
      format: "PDF & EPUB",
      pages: "79 Pages",
      trailer: "Trailer Highlight: Different skies, different hours, one shared promise.",
      synopsis: "A story of distance, patience, and staying connected across miles."
    },
    {
      id: "echoes-of-silent-vows",
      title: "Echoes of Silent Vows",
      category: "Romance",
      isBL: false,
      characters: [],
      tags: ["slow-burn", "vows", "destiny"],
      note: "Slow-Burn Dramatic Romance",
      format: "PDF & EPUB",
      pages: "93 Pages",
      trailer: "Trailer Highlight: Promises spoken without a sound still echo years later.",
      synopsis: "A slow-burn romance shaped by unspoken commitments and timing."
    },
    {
      id: "the-game-of-love",
      title: "The Game of Love",
      category: "Romance",
      isBL: false,
      characters: [],
      tags: ["rivals-to-lovers", "wager", "competitive"],
      note: "Rivals-to-Lovers Romance",
      format: "PDF & EPUB",
      pages: "83 Pages",
      trailer: "Trailer Highlight: It started as a wager—until nobody wanted to lose.",
      synopsis: "A spirited romance where rivalry turns into something deeper."
    },

    // ADVENTURE
    {
      id: "the-maze-runner",
      title: "The Maze Runner",
      category: "Adventure",
      isBL: false,
      characters: ["Thomas", "Teresa", "Minho", "Newt"],
      tags: ["survival", "labyrinth", "dystopian"],
      note: "Dystopian Survival Adventure",
      format: "PDF & EPUB",
      pages: "96 Pages",
      trailer: "Trailer Highlight: The walls shift every night—and waking up is only the start.",
      synopsis: "A fast-paced survival story inside a changing labyrinth."
    },
    {
      id: "the-hunger-games",
      title: "The Hunger Games",
      category: "Adventure",
      isBL: false,
      characters: ["Katniss Everdeen", "Peeta Mellark", "Gale"],
      tags: ["arena", "survival", "rebellion"],
      note: "Arena Survival Adventure",
      format: "PDF & EPUB",
      pages: "98 Pages",
      trailer: "Trailer Highlight: Every move is watched in an arena where only one survives.",
      synopsis: "A high-stakes adventure of courage, strategy, and endurance."
    },
    {
      id: "the-beach",
      title: "The Beach",
      category: "Adventure",
      isBL: false,
      characters: ["Richard", "Sal", "Etienne"],
      tags: ["island", "travel", "utopia"],
      note: "Island Exploration Adventure",
      format: "PDF & EPUB",
      pages: "91 Pages",
      trailer: "Trailer Highlight: A hidden map leads to turquoise waters—and a hidden cost.",
      synopsis: "An adventure following a traveler searching for a secluded island."
    },
    {
      id: "treasure-island",
      title: "Treasure Island",
      category: "Adventure",
      isBL: false,
      characters: ["Jim Hawkins", "Long John Silver"],
      tags: ["pirates", "sea-voyage", "classic"],
      note: "Classic Sea Adventure",
      format: "PDF & EPUB",
      pages: "94 Pages",
      trailer: "Trailer Highlight: Charts, sails, and mutiny on the open sea.",
      synopsis: "A classic voyage in search of buried treasure."
    },
    {
      id: "percy-jackson",
      title: "Percy Jackson",
      category: "Adventure",
      isBL: false,
      characters: ["Percy Jackson", "Annabeth Chase", "Grover"],
      tags: ["mythology", "quest", "demigods"],
      note: "Mythology Quest Adventure",
      format: "PDF & EPUB",
      pages: "97 Pages",
      trailer: "Trailer Highlight: Ancient myths are real—and the quest starts now.",
      synopsis: "A quest filled with mythology, monsters, and sudden powers."
    },
    {
      id: "2gether-the-series",
      title: "2gether: The Series",
      category: "Adventure",
      isBL: true,
      characters: ["Tine", "Sarawat", "Mil"],
      tags: ["music-club", "campus", "bl"],
      note: "Club & Journey BL Series",
      format: "PDF & EPUB",
      pages: "92 Pages",
      trailer: "Trailer Highlight: New challenges, music club quests, and unexpected turns.",
      synopsis: "A journey of teamwork, campus obstacles, and growing bonds."
    },
    {
      id: "still-2gether",
      title: "Still 2gether",
      category: "Adventure",
      isBL: true,
      characters: ["Tine", "Sarawat", "Boss"],
      tags: ["road-trip", "teamwork", "bl"],
      note: "Continuation Journey BL Series",
      format: "PDF & EPUB",
      pages: "76 Pages",
      trailer: "Trailer Highlight: Out of the city and onto the next big adventure.",
      synopsis: "A follow-up journey full of road trips, tasks, and shared milestones."
    },

    // MYSTERY
    {
      id: "bangkok-8",
      title: "Bangkok 8",
      category: "Mystery",
      isBL: false,
      characters: ["Sonchai Jitpleecheep", "Damrong"],
      tags: ["detective", "bangkok", "crime"],
      note: "Crime & Investigation Mystery",
      format: "PDF & EPUB",
      pages: "90 Pages",
      trailer: "Trailer Highlight: A dark case pulls an investigator into secrets beneath the city.",
      synopsis: "A gripping mystery set in bustling Bangkok."
    },
    {
      id: "bangkok-wakes-to-rain",
      title: "Bangkok Wakes to Rain",
      category: "Mystery",
      isBL: false,
      characters: ["Niran", "Lin", "Prasert"],
      tags: ["atmospheric", "secrets", "bangkok"],
      note: "Atmospheric Mystery",
      format: "PDF & EPUB",
      pages: "86 Pages",
      trailer: "Trailer Highlight: Rain falls over old walls hiding memories long buried.",
      synopsis: "A layered mystery linking past events with present discoveries."
    },
    {
      id: "killed-at-the-whim-of-a-hat",
      title: "Killed at the Whim of a Hat",
      category: "Mystery",
      isBL: false,
      characters: ["Inspector Ward", "Clara Finch"],
      tags: ["whodunit", "clues", "detective"],
      note: "Detective Whodunit",
      format: "PDF & EPUB",
      pages: "77 Pages",
      trailer: "Trailer Highlight: A sudden twist leaves every suspect under scrutiny.",
      synopsis: "A classic mystery puzzle packed with clues and surprises."
    },
    {
      id: "the-king-of-bangkok",
      title: "The King of Bangkok",
      category: "Mystery",
      isBL: false,
      characters: ["Arthit", "Khem"],
      tags: ["noir", "intrigue", "bangkok"],
      note: "City Noir Mystery",
      format: "PDF & EPUB",
      pages: "88 Pages",
      trailer: "Trailer Highlight: Power, shadows, and a mystery no one wants solved.",
      synopsis: "A suspenseful mystery exploring hidden motives and city intrigue."
    },
    {
      id: "and-then-there-were-none",
      title: "And Then There Were None",
      category: "Mystery",
      isBL: false,
      characters: ["Vera Claythorne", "Philip Lombard", "Justice Wargrave"],
      tags: ["locked-island", "classic", "suspense"],
      note: "Classic Suspense Mystery",
      format: "PDF & EPUB",
      pages: "95 Pages",
      trailer: "Trailer Highlight: Ten guests arrive on an isolated island—nobody can leave.",
      synopsis: "A suspenseful mystery where every clue points inward."
    },
    {
      id: "never-let-me-go",
      title: "Never Let Me Go",
      category: "Mystery",
      isBL: true,
      characters: ["Nuengdiao", "Palm"],
      tags: ["bodyguard", "family-secrets", "bl"],
      note: "Suspense & Family Secrets BL Series",
      format: "PDF & EPUB",
      pages: "96 Pages",
      trailer: "Trailer Highlight: Hidden dangers and family secrets test every loyalty.",
      synopsis: "A tense story of hidden threats, secrets, and standing together against danger."
    },
    {
      id: "hidden-agenda",
      title: "Hidden Agenda",
      category: "Mystery",
      isBL: true,
      characters: ["Zo", "Joke", "Pat"],
      tags: ["secret-motive", "twists", "bl"],
      note: "Secret Motive BL Series",
      format: "PDF & EPUB",
      pages: "86 Pages",
      trailer: "Trailer Highlight: Every plan has a hidden motive waiting to be uncovered.",
      synopsis: "A story of secret objectives, clever twists, and unexpected truths."
    },

    // SCI-FI
    {
      id: "the-windup-girl",
      title: "The Windup Girl",
      category: "Sci-Fi",
      isBL: false,
      characters: ["Emiko", "Anderson Lake", "Hock Seng"],
      tags: ["biopunk", "future", "speculative"],
      note: "Futuristic Biopunk Sci-Fi",
      format: "PDF & EPUB",
      pages: "92 Pages",
      trailer: "Trailer Highlight: Engineered worlds, scarce energy, and fragile alliances.",
      synopsis: "A speculative sci-fi story set in a reshaped future."
    },
    {
      id: "dune",
      title: "Dune",
      category: "Sci-Fi",
      isBL: false,
      characters: ["Paul Atreides", "Chani", "Lady Jessica"],
      tags: ["desert-planet", "space-opera", "epic"],
      note: "Desert Planet Sci-Fi",
      format: "PDF & EPUB",
      pages: "100 Pages",
      trailer: "Trailer Highlight: Endless sands, rival houses, and a destiny written in spice.",
      synopsis: "An epic science fiction story of politics, survival, and desert worlds."
    },
    {
      id: "divergent",
      title: "Divergent",
      category: "Sci-Fi",
      isBL: false,
      characters: ["Tris Prior", "Four"],
      tags: ["factions", "dystopian", "identity"],
      note: "Dystopian Sci-Fi",
      format: "PDF & EPUB",
      pages: "94 Pages",
      trailer: "Trailer Highlight: One test defines your faction—unless you don't fit any.",
      synopsis: "A futuristic story about choice, identity, and testing."
    },
    {
      id: "the-girl-who-made-god",
      title: "The Girl Who Made God",
      category: "Sci-Fi",
      isBL: false,
      characters: ["Iris", "Cyrus"],
      tags: ["ai", "creation", "future"],
      note: "AI & Creation Sci-Fi",
      format: "PDF & EPUB",
      pages: "79 Pages",
      trailer: "Trailer Highlight: A single line of creation awakens something extraordinary.",
      synopsis: "A thought-provoking sci-fi story about intelligence and creation."
    },
    {
      id: "my-heart-is-made-of-code",
      title: "My Heart Is Made of Code",
      category: "Sci-Fi",
      isBL: false,
      characters: ["Echo", "Devon"],
      tags: ["code", "ai", "cyber"],
      note: "Tech & AI Sci-Fi",
      format: "PDF & EPUB",
      pages: "73 Pages",
      trailer: "Trailer Highlight: Logic meets emotion inside a world built on code.",
      synopsis: "A modern sci-fi story blending technology with human feeling."
    },
    {
      id: "the-world-without-passwords",
      title: "The World Without Passwords",
      category: "Sci-Fi",
      isBL: false,
      characters: ["Kora", "Vance"],
      tags: ["cybersecurity", "privacy", "hacker"],
      note: "Cyber & Identity Sci-Fi",
      format: "PDF & EPUB",
      pages: "82 Pages",
      trailer: "Trailer Highlight: When every lock is digital, what happens to privacy?",
      synopsis: "A tech-driven sci-fi story about identity and security."
    },
    {
      id: "the-last-code",
      title: "The Last Code",
      category: "Sci-Fi",
      isBL: false,
      characters: ["Cipher", "Nadia"],
      tags: ["decryption", "tech-thriller", "code"],
      note: "Tech Thriller Sci-Fi",
      format: "PDF & EPUB",
      pages: "87 Pages",
      trailer: "Trailer Highlight: One final sequence holds the key to the whole system.",
      synopsis: "A fast-moving sci-fi story centered around a critical code."
    },

    // HISTORICAL
    {
      id: "four-reigns",
      title: "Four Reigns",
      category: "Historical",
      isBL: false,
      characters: ["Mae Ploy", "Khun Prem"],
      tags: ["royal-court", "heritage", "eras"],
      note: "Historical Fiction",
      format: "PDF & EPUB",
      pages: "99 Pages",
      trailer: "Trailer Highlight: Changing eras seen through a life shaped by history.",
      synopsis: "A sweeping historical story spanning shifting eras and traditions."
    },
    {
      id: "memories-of-the-black-rose",
      title: "Memories of the Black Rose",
      category: "Historical",
      isBL: false,
      characters: ["Genevieve", "Lucian"],
      tags: ["heirloom", "family-history", "drama"],
      note: "Historical Drama",
      format: "PDF & EPUB",
      pages: "85 Pages",
      trailer: "Trailer Highlight: A quiet keepsake carries stories from another time.",
      synopsis: "A historical story rooted in memory, heritage, and family ties."
    },
    {
      id: "things-fall-apart",
      title: "Things Fall Apart",
      category: "Historical",
      isBL: false,
      characters: ["Okonkwo", "Nwoye", "Obierika"],
      tags: ["classic", "tradition", "leadership"],
      note: "Classic Historical Fiction",
      format: "PDF & EPUB",
      pages: "90 Pages",
      trailer: "Trailer Highlight: Tradition meets change in a story of pride and transition.",
      synopsis: "A classic historical work examining community, leadership, and change."
    },
    {
      id: "pride-and-prejudice",
      title: "Pride and Prejudice",
      category: "Historical",
      isBL: false,
      characters: ["Elizabeth Bennet", "Fitzwilliam Darcy"],
      tags: ["regency", "wit", "classic"],
      note: "Classic Historical Romance",
      format: "PDF & EPUB",
      pages: "96 Pages",
      trailer: "Trailer Highlight: Sharp wit, first impressions, and a change of heart.",
      synopsis: "A timeless historical classic of manners, misunderstandings, and affection."
    },
    {
      id: "the-book-thief",
      title: "The Book Thief",
      category: "Historical",
      isBL: false,
      characters: ["Liesel Meminger", "Rudy Steiner", "Hans Hubermann"],
      tags: ["wwii", "books", "resilience"],
      note: "WWII Historical Fiction",
      format: "PDF & EPUB",
      pages: "95 Pages",
      trailer: "Trailer Highlight: Words become a lifeline during dark and uncertain days.",
      synopsis: "A moving historical story about books, kindness, and resilience."
    },
    {
      id: "moonlight-chicken",
      title: "Moonlight Chicken",
      category: "Historical",
      isBL: true,
      characters: ["Uncle Jim", "Wen", "Alan"],
      tags: ["slice-of-life", "diner", "bl"],
      note: "Slice-of-Life & Era BL Drama",
      format: "PDF & EPUB",
      pages: "85 Pages",
      trailer: "Trailer Highlight: Late-night diners, quiet sacrifices, and real life under the lights.",
      synopsis: "A grounded drama about dreams, livelihood, and human connection."
    },

    // HORROR
    {
      id: "the-haunting-of-hill-house",
      title: "The Haunting of Hill House",
      category: "Horror",
      isBL: false,
      characters: ["Eleanor Vance", "Theodora", "Luke"],
      tags: ["gothic", "haunted-house", "ghosts"],
      note: "Gothic Ghost Horror",
      format: "PDF & EPUB",
      pages: "84 Pages",
      trailer: "Trailer Highlight: The house was not built right—and it remembers every step.",
      synopsis: "A chilling gothic story of an old mansion and psychological tension."
    },
    {
      id: "the-phantom-lover",
      title: "The Phantom Lover",
      category: "Horror",
      isBL: false,
      characters: ["Song Danping", "Yun Yan"],
      tags: ["supernatural", "phantom", "suspense"],
      note: "Supernatural Horror",
      format: "PDF & EPUB",
      pages: "76 Pages",
      trailer: "Trailer Highlight: Shadows linger long after night falls.",
      synopsis: "A haunting supernatural story filled with eerie suspense."
    },
    {
      id: "dracula",
      title: "Dracula",
      category: "Horror",
      isBL: false,
      characters: ["Jonathan Harker", "Mina Harker", "Van Helsing"],
      tags: ["vampire", "gothic", "classic"],
      note: "Classic Gothic Horror",
      format: "PDF & EPUB",
      pages: "98 Pages",
      trailer: "Trailer Highlight: Letters, midnight travel, and an ancient threat in the dark.",
      synopsis: "A classic horror tale of dread, pursuit, and survival."
    },
    {
      id: "it",
      title: "It",
      category: "Horror",
      isBL: false,
      characters: ["Bill Denbrough", "Beverly Marsh", "Richie Tozier"],
      tags: ["supernatural", "small-town", "fear"],
      note: "Supernatural Horror",
      format: "PDF & EPUB",
      pages: "100 Pages",
      trailer: "Trailer Highlight: What hides in the dark comes back when you least expect it.",
      synopsis: "A suspenseful horror story of childhood bonds and recurring fear."
    },
    {
      id: "bird-box",
      title: "Bird Box",
      category: "Horror",
      isBL: false,
      characters: ["Malorie", "Olympia", "Tom"],
      tags: ["blindfold", "survival", "psychological"],
      note: "Suspense & Sensory Horror",
      format: "PDF & EPUB",
      pages: "82 Pages",
      trailer: "Trailer Highlight: Keep your eyes covered—looking changes everything.",
      synopsis: "A tense horror story about survival when sight becomes dangerous."
    },

    // COMEDY
    {
      id: "sightseeing",
      title: "Sightseeing",
      category: "Comedy",
      isBL: false,
      characters: ["Rattawut", "Nok"],
      tags: ["satire", "short-stories", "humor"],
      note: "Witty Short Fiction & Satire",
      format: "PDF & EPUB",
      pages: "74 Pages",
      trailer: "Trailer Highlight: Sharp humor in everyday scenes you didn't know were funny.",
      synopsis: "Clever, lighthearted stories with a sharp sense of humor."
    },
    {
      id: "diary-of-a-wimpy-kid",
      title: "Diary of a Wimpy Kid",
      category: "Comedy",
      isBL: false,
      characters: ["Greg Heffley", "Rowley Jefferson"],
      tags: ["school-comedy", "diary", "illustrated"],
      note: "Illustrated School Comedy",
      format: "PDF & EPUB",
      pages: "78 Pages",
      trailer: "Trailer Highlight: Bad plans, awkward moments, and school-day disasters.",
      synopsis: "A funny journal-style story full of school misadventures."
    },
    {
      id: "bridget-jones-diary",
      title: "Bridget Jones's Diary",
      category: "Comedy",
      isBL: false,
      characters: ["Bridget Jones", "Mark Darcy", "Daniel Cleaver"],
      tags: ["rom-com", "diary", "british-humor"],
      note: "Romantic Comedy",
      format: "PDF & EPUB",
      pages: "86 Pages",
      trailer: "Trailer Highlight: Honest notes, messy plans, and plenty of laughs.",
      synopsis: "A lively romantic comedy told through candid diary entries."
    },
    {
      id: "crazy-rich-asians",
      title: "Crazy Rich Asians",
      category: "Comedy",
      isBL: false,
      characters: ["Rachel Chu", "Nicholas Young", "Peik Lin"],
      tags: ["high-society", "rom-com", "satire"],
      note: "High-Society Rom-Com",
      format: "PDF & EPUB",
      pages: "93 Pages",
      trailer: "Trailer Highlight: A simple trip turns into an over-the-top spectacle.",
      synopsis: "A witty comedy full of big personalities and lively twists."
    },
    {
      id: "fish-upon-the-sky",
      title: "Fish Upon the Sky",
      category: "Comedy",
      isBL: true,
      characters: ["Pi", "Mork", "Duean"],
      tags: ["makeover", "campus-comedy", "bl"],
      note: "Campus Comedy BL Series",
      format: "PDF & EPUB",
      pages: "92 Pages",
      trailer: "Trailer Highlight: Big makeovers, chaotic plans, and non-stop banter.",
      synopsis: "A lively university comedy full of jokes, rivals, and surprises."
    },
    {
      id: "my-love-mix-up",
      title: "My Love Mix-Up!",
      category: "Comedy",
      isBL: true,
      characters: ["Atom", "Kongthap"],
      tags: ["misunderstanding", "school-comedy", "bl"],
      note: "Classroom Comedy BL Series",
      format: "PDF & EPUB",
      pages: "78 Pages",
      trailer: "Trailer Highlight: One borrowed eraser sparks a hilarious chain of misunderstandings.",
      synopsis: "A light, charming school comedy built on a classic mix-up."
    },

    // ACTION
    {
      id: "the-heart-killers",
      title: "The Heart Killers",
      category: "Action",
      isBL: true,
      characters: ["Fadel", "Style", "Kant", "Bison"],
      tags: ["missions", "high-stakes", "action", "bl"],
      note: "High-Stakes Action BL Series",
      format: "PDF & EPUB",
      pages: "98 Pages",
      trailer: "Trailer Highlight: High-tension missions, sharp edges, and non-stop action.",
      synopsis: "A fast-paced action story filled with danger, missions, and sharp turns."
    },
    {
      id: "star-in-my-mind",
      title: "Star in My Mind",
      category: "Action",
      isBL: true,
      characters: ["Kluen", "Daonuea"],
      tags: ["pursuit", "determination", "bl"],
      note: "Drama & Pursuit BL Series",
      format: "PDF & EPUB",
      pages: "82 Pages",
      trailer: "Trailer Highlight: Chasing down what matters most before time runs out.",
      synopsis: "A story of determination, pursuit, and stepping up when moments count."
    },
    {
      id: "perfect-10-liners",
      title: "Perfect 10 Liners",
      category: "Action",
      isBL: true,
      characters: ["Arc", "Arm", "Yotha", "Faifa"],
      tags: ["challenges", "rivalries", "bl"],
      note: "Faculty Challenge & Rivalries BL",
      format: "PDF & EPUB",
      pages: "94 Pages",
      trailer: "Trailer Highlight: Tough tasks, senior challenges, and spirited showdowns.",
      synopsis: "High-energy faculty challenges, rivalries, and team tests."
    },

    // ANIME
    {
      id: "attack-on-titan",
      title: "Attack on Titan",
      category: "Anime",
      isBL: false,
      characters: ["Eren Yeager", "Mikasa Ackerman", "Levi Ackerman"],
      tags: ["titans", "dark-fantasy", "action"],
      note: "Action & Dark Fantasy Anime",
      format: "Guide & Script Pack",
      pages: "95 Pages",
      trailer: "Trailer Highlight: Beyond the walls lies a truth that shatters everything.",
      synopsis: "An action-packed anime guide covering key arcs, characters, and moments."
    },
    {
      id: "one-piece",
      title: "One Piece",
      category: "Anime",
      isBL: false,
      characters: ["Monkey D. Luffy", "Roronoa Zoro", "Nami"],
      tags: ["pirates", "grand-line", "adventure"],
      note: "Pirate Adventure Anime",
      format: "Guide & Arc Pack",
      pages: "100 Pages",
      trailer: "Trailer Highlight: Set sail across wild seas toward a legendary treasure.",
      synopsis: "An adventure anime collection highlighting crew journeys and major arcs."
    },
    {
      id: "jujutsu-kaisen",
      title: "Jujutsu Kaisen",
      category: "Anime",
      isBL: false,
      characters: ["Yuji Itadori", "Satoru Gojo", "Megumi Fushiguro"],
      tags: ["curses", "sorcerers", "action"],
      note: "Supernatural Action Anime",
      format: "Guide & Script Pack",
      pages: "88 Pages",
      trailer: "Trailer Highlight: High-speed battles against curses in the shadows.",
      synopsis: "A supernatural action anime guide featuring battles, techniques, and arcs."
    },
    {
      id: "demon-slayer",
      title: "Demon Slayer: Kimetsu no Yaiba",
      category: "Anime",
      isBL: false,
      characters: ["Tanjiro Kamado", "Nezuko Kamado", "Zenitsu"],
      tags: ["swordsmanship", "demons", "fantasy"],
      note: "Action & Fantasy Anime",
      format: "Guide & Script Pack",
      pages: "84 Pages",
      trailer: "Trailer Highlight: Blades drawn in the night with unforgettable resolve.",
      synopsis: "An anime collection covering swordsmanship, arcs, and key characters."
    },
    {
      id: "death-note",
      title: "Death Note",
      category: "Anime",
      isBL: false,
      characters: ["Light Yagami", "L", "Ryuk"],
      tags: ["mind-games", "thriller", "detective"],
      note: "Psychological Thriller Anime",
      format: "Guide & Script Pack",
      pages: "80 Pages",
      trailer: "Trailer Highlight: A notebook with fatal power sparks a battle of minds.",
      synopsis: "A suspenseful anime guide focusing on mind games and key episodes."
    },
    {
      id: "my-school-president",
      title: "My School President",
      category: "Anime",
      isBL: true,
      characters: ["Tinn", "Gun"],
      tags: ["music-club", "stage", "bl"],
      note: "Music Club & Stage BL Series",
      format: "Guide & Script Pack",
      pages: "90 Pages",
      trailer: "Trailer Highlight: Stage lights, school contests, and big ambitions.",
      synopsis: "An energetic series centered on school music competitions and teamwork."
    },
    {
      id: "thamepo-heart-that-skips-a-beat",
      title: "ThamePo: Heart That Skips a Beat",
      category: "Anime",
      isBL: true,
      characters: ["Thame", "Po"],
      tags: ["idol", "music", "stage", "bl"],
      note: "Stage Performance & Music BL Series",
      format: "Guide & Script Pack",
      pages: "86 Pages",
      trailer: "Trailer Highlight: Behind the curtain, rhythm and emotion collide.",
      synopsis: "A heartfelt stage and music series following idol life and connection."
    }
  ];

  // Sidebar & view elements
  const sidebar = document.getElementById("main-sidebar");
  const sidebarBackdrop = document.getElementById("sidebar-backdrop");
  const sidebarToggle = document.getElementById("sidebar-toggle");
  const menuVaultBtn = document.getElementById("menu-vault-btn");
  const vaultCategoriesList = document.getElementById("vault-categories-list");
  const menuSearchBtn = document.getElementById("menu-search-btn");
  const menuBrowseBtn = document.getElementById("menu-browse-btn");

  const searchForm = document.getElementById("search-form");
  const searchInput = document.getElementById("search-input");
  const shelfView = document.getElementById("shelf-view");
  const bookDetailView = document.getElementById("book-detail-view");
  const currentHeading = document.getElementById("current-heading");
  const bookCount = document.getElementById("book-count");
  const booksContainer = document.getElementById("books-container");
  const libraryStats = document.getElementById("library-stats");
  const homeBrandBtn = document.getElementById("home-brand-btn");
  const toastEl = document.getElementById("toast");

  const aboutMenuBtn = document.getElementById("about-menu-btn");
  const aboutDropdown = document.getElementById("about-dropdown");

  const BOOKMARK_KEY = "golden_ink_bookmarks";
  let bookmarkedIds = JSON.parse(localStorage.getItem(BOOKMARK_KEY) || "[]");
  let searchMode = "all";
  let lastShelfTitle = "";
  let lastShelfList = [];

  function showToast(message) {
    if (!toastEl) return;
    toastEl.textContent = message;
    toastEl.classList.remove("hidden");
    clearTimeout(window._toastTimer);
    window._toastTimer = setTimeout(() => {
      toastEl.classList.add("hidden");
    }, 2200);
  }

  // Open / close sidebar
  window.toggleMainSidebar = function (event) {
    if (event) event.stopPropagation();
    const isOpen = sidebar && sidebar.getAttribute("aria-hidden") === "false";
    if (isOpen) {
      window.closeMainSidebar();
    } else if (sidebar) {
      sidebar.style.transform = "translateX(0)";
      sidebar.setAttribute("aria-hidden", "false");
      sidebar.classList.add("open");
      if (sidebarToggle) sidebarToggle.setAttribute("aria-expanded", "true");
      if (sidebarBackdrop) sidebarBackdrop.style.display = "block";
    }
  };

  window.closeMainSidebar = function () {
    if (!sidebar) return;
    sidebar.style.transform = "translateX(-100%)";
    sidebar.setAttribute("aria-hidden", "true");
    sidebar.classList.remove("open");
    if (sidebarToggle) sidebarToggle.setAttribute("aria-expanded", "false");
    if (sidebarBackdrop) sidebarBackdrop.style.display = "none";
  };

  function setSubmenuOpen(parentBtn, open) {
    if (!parentBtn) return;
    const submenu = parentBtn.nextElementSibling;
    parentBtn.setAttribute("aria-expanded", String(open));
    if (submenu) {
      submenu.style.display = open ? "flex" : "none";
      submenu.style.flexDirection = "column";
    }
  }

  function hideShelfUntilOpened() {
    lastShelfTitle = "";
    lastShelfList = [];
    if (bookDetailView) {
      bookDetailView.classList.add("hidden");
      bookDetailView.style.display = "none";
    }
    if (shelfView) {
      shelfView.classList.add("hidden");
      shelfView.style.display = "none";
    }
    if (booksContainer) {
      booksContainer.innerHTML = "";
    }
  }

  function triggerDownload(book) {
    const text = `${book.title}\nCategory: ${book.category}\nFormat: ${book.format} (${book.pages})\n\n${book.trailer}\n\n${book.synopsis}`;
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${book.id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    showToast(`Downloading "${book.title}"`);
  }

  function buildDetailMarkup(book) {
    const isSaved = bookmarkedIds.includes(book.id);
    return `
      <div class="book-detail-card">
        <button type="button" class="btn-back" id="back-to-shelf-btn">← Back</button>
        <div class="detail-header">
          <span class="badge">${book.category}</span>
          <span>${book.format} • ${book.pages}</span>
        </div>
        <h2>${book.title}</h2>
        <p class="detail-note"><em>${book.note}</em></p>
        <div class="trailer-box">
          <strong>Trailer Highlight:</strong>
          <p>${book.trailer}</p>
        </div>
        <p class="detail-synopsis">${book.synopsis}</p>
        ${
          book.characters.length
            ? `<p><strong>People:</strong> ${book.characters.join(", ")}</p>`
            : ""
        }
        <div class="book-tags">
          ${book.tags.map((t) => `<span class="tag-pill">#${t}</span>`).join("")}
        </div>
        <div class="detail-actions">
          <button type="button" class="btn-download" data-download-book="${book.id}">Download Book Copy</button>
          <button type="button" class="btn-bookmark ${isSaved ? "saved" : ""}" data-toggle-bookmark="${book.id}">
            ${isSaved ? "★ Bookmarked" : "☆ Bookmark"}
          </button>
        </div>
      </div>
    `;
  }

  function renderBooks(title, list) {
    lastShelfTitle = title;
    lastShelfList = list;

    if (bookDetailView) {
      bookDetailView.classList.add("hidden");
      bookDetailView.style.display = "none";
    }
    if (shelfView) {
      shelfView.classList.remove("hidden");
      shelfView.style.display = "block";
    }
    if (currentHeading) currentHeading.textContent = title;
    if (bookCount) bookCount.textContent = `${list.length} ${list.length === 1 ? "item" : "items"}`;
    if (!booksContainer) return;

    if (!list.length) {
      booksContainer.innerHTML = `<p class="empty-msg">No items found.</p>`;
      return;
    }

    booksContainer.innerHTML = list
      .map((b) => {
        const isSaved = bookmarkedIds.includes(b.id);
        return `
          <article class="book-card" data-open-book="${b.id}">
            <div class="book-card-top">
              <span class="badge">${b.category}</span>
              <span class="pages">${b.pages}</span>
            </div>
            <h4>${b.title}</h4>
            <p class="book-note">${b.note}</p>
            <p class="book-synopsis">${b.synopsis}</p>
            <div class="book-actions">
              <button type="button" class="btn-read" data-open-book="${b.id}">Go to Download</button>
              <button type="button" class="btn-bookmark ${isSaved ? "saved" : ""}" data-toggle-bookmark="${b.id}">
                ${isSaved ? "★ Bookmarked" : "☆ Bookmark"}
              </button>
            </div>
          </article>
        `;
      })
      .join("");
  }

  function openBookDetail(bookId) {
    const book = books.find((b) => b.id === bookId);
    if (!book) return;

    const markup = buildDetailMarkup(book);

    if (bookDetailView) {
      if (shelfView) {
        shelfView.classList.add("hidden");
        shelfView.style.display = "none";
      }
      bookDetailView.classList.remove("hidden");
      bookDetailView.style.display = "block";
      bookDetailView.innerHTML = markup;
    } else if (booksContainer) {
      if (shelfView) {
        shelfView.classList.remove("hidden");
        shelfView.style.display = "block";
      }
      if (currentHeading) currentHeading.textContent = book.title;
      if (bookCount) bookCount.textContent = book.pages;
      booksContainer.innerHTML = markup;
    }

    const backBtn = document.getElementById("back-to-shelf-btn");
    if (backBtn) {
      backBtn.addEventListener("click", (ev) => {
        ev.stopPropagation();
        if (bookDetailView) {
          bookDetailView.classList.add("hidden");
          bookDetailView.style.display = "none";
        }
        if (lastShelfList.length || lastShelfTitle) {
          renderBooks(lastShelfTitle, lastShelfList);
        } else {
          hideShelfUntilOpened();
        }
      });
    }
  }

  // 1. OPEN VAULT -> CATEGORIES
  const categories = [...new Set(books.map((b) => b.category))];
  if (vaultCategoriesList) {
    vaultCategoriesList.innerHTML = categories
      .map((cat) => `<button type="button" class="menu-sublink" data-vault="${cat}">${cat}</button>`)
      .join("");

    vaultCategoriesList.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-vault]");
      if (!btn) return;
      const cat = btn.dataset.vault;
      renderBooks(`The Vault: ${cat}`, books.filter((b) => b.category === cat));
      window.closeMainSidebar();
    });
  }

  if (menuVaultBtn) {
    menuVaultBtn.addEventListener("click", () => {
      const expanded = menuVaultBtn.getAttribute("aria-expanded") === "true";
      setSubmenuOpen(menuVaultBtn, !expanded);
    });
  }

  // 2. SEARCH -> OPENS ALL BOOKS AND SHOWS PEOPLE, TAGS, WORKS
  if (menuSearchBtn) {
    const searchSubmenu = menuSearchBtn.nextElementSibling;
    if (searchSubmenu) {
      searchSubmenu.innerHTML = `
        <button type="button" class="menu-sublink" data-search-item="people">People</button>
        <button type="button" class="menu-sublink" data-search-item="tags">Tags</button>
        <button type="button" class="menu-sublink" data-search-item="works">Works</button>
      `;

      searchSubmenu.addEventListener("click", (e) => {
        const item = e.target.closest("[data-search-item]");
        if (!item) return;
        searchMode = item.dataset.searchItem;
        renderBooks(`Search: ${item.textContent}`, books);
        if (searchInput) {
          searchInput.placeholder = `Search ${item.textContent.toLowerCase()}...`;
          searchInput.focus();
        }
        window.closeMainSidebar();
      });
    }

    menuSearchBtn.addEventListener("click", () => {
      setSubmenuOpen(menuSearchBtn, true);
      searchMode = "all";
      if (searchInput) {
        searchInput.value = "";
        searchInput.placeholder = "Search works, tags, or people...";
      }
      renderBooks("All Books", books);
    });
  }

  // 3. BROWSE -> SHOWS BOOKMARKS, TAGS, WORKS, AND COLLECTION
  if (menuBrowseBtn) {
    const browseSubmenu = menuBrowseBtn.nextElementSibling;
    if (browseSubmenu) {
      browseSubmenu.innerHTML = `
        <button type="button" class="menu-sublink" data-browse-item="bookmarks">Bookmarks</button>
        <button type="button" class="menu-sublink" data-browse-item="tags">Tags</button>
        <button type="button" class="menu-sublink" data-browse-item="works">Works</button>
        <button type="button" class="menu-sublink" data-browse-item="collection">Collection</button>
      `;

      browseSubmenu.addEventListener("click", (e) => {
        const item = e.target.closest("[data-browse-item]");
        if (!item) return;
        const type = item.dataset.browseItem;

        if (type === "bookmarks") {
          renderBooks("Bookmarks", books.filter((b) => bookmarkedIds.includes(b.id)));
        } else if (type === "tags") {
          const allTags = [...new Set(books.flatMap((b) => b.tags))].sort();
          lastShelfTitle = "Tags";
          lastShelfList = [];
          if (bookDetailView) {
            bookDetailView.classList.add("hidden");
            bookDetailView.style.display = "none";
          }
          if (shelfView) {
            shelfView.classList.remove("hidden");
            shelfView.style.display = "block";
          }
          if (currentHeading) currentHeading.textContent = "Tags";
          if (bookCount) bookCount.textContent = `${allTags.length} items`;
          if (booksContainer) {
            booksContainer.innerHTML = allTags
              .map(
                (tag) =>
                  `<article class="book-card" data-filter-tag="${tag}"><h4>#${tag}</h4></article>`
              )
              .join("");
          }
        } else if (type === "works") {
          renderBooks("Works", books);
        } else if (type === "collection") {
          renderBooks("Collection", books.filter((b) => b.isBL));
        }

        window.closeMainSidebar();
      });
    }

    menuBrowseBtn.addEventListener("click", () => {
      const expanded = menuBrowseBtn.getAttribute("aria-expanded") === "true";
      setSubmenuOpen(menuBrowseBtn, !expanded);
    });
  }

  // Card clicks: bookmark, download, filter tag, or open book download view
  document.addEventListener("click", (e) => {
    const bmBtn = e.target.closest("[data-toggle-bookmark]");
    if (bmBtn) {
      e.stopPropagation();
      const id = bmBtn.dataset.toggleBookmark;
      if (bookmarkedIds.includes(id)) {
        bookmarkedIds = bookmarkedIds.filter((item) => item !== id);
        showToast("Removed bookmark");
      } else {
        bookmarkedIds.push(id);
        showToast("Bookmarked");
      }
      localStorage.setItem(BOOKMARK_KEY, JSON.stringify(bookmarkedIds));
      const saved = bookmarkedIds.includes(id);
      bmBtn.classList.toggle("saved", saved);
      bmBtn.textContent = saved ? "★ Bookmarked" : "☆ Bookmark";
      return;
    }

    const dlBtn = e.target.closest("[data-download-book]");
    if (dlBtn) {
      e.stopPropagation();
      const book = books.find((b) => b.id === dlBtn.dataset.downloadBook);
      if (book) triggerDownload(book);
      return;
    }

    const tagCard = e.target.closest("[data-filter-tag]");
    if (tagCard) {
      const tag = tagCard.dataset.filterTag;
      renderBooks(`Tag: #${tag}`, books.filter((b) => b.tags.includes(tag)));
      return;
    }

    const openTarget = e.target.closest("[data-open-book]");
    if (openTarget) {
      openBookDetail(openTarget.dataset.openBook);
    }
  });

  // Search form & live input filter
  function applySearch() {
    if (!searchInput) return;
    const q = searchInput.value.trim().toLowerCase();
    if (!q) {
      hideShelfUntilOpened();
      return;
    }
    const filtered = books.filter((b) => {
      if (searchMode === "people") return b.characters.some((c) => c.toLowerCase().includes(q));
      if (searchMode === "tags") return b.tags.some((t) => t.toLowerCase().includes(q));
      if (searchMode === "works") return b.title.toLowerCase().includes(q) || b.synopsis.toLowerCase().includes(q);
      return (
        b.title.toLowerCase().includes(q) ||
        b.synopsis.toLowerCase().includes(q) ||
        b.tags.some((t) => t.toLowerCase().includes(q)) ||
        b.characters.some((c) => c.toLowerCase().includes(q))
      );
    });
    renderBooks(`Search: "${searchInput.value}"`, filtered);
  }

  if (searchForm) {
    searchForm.addEventListener("submit", (e) => {
      e.preventDefault();
      applySearch();
    });
  }

  if (searchInput) {
    searchInput.addEventListener("input", applySearch);
  }

  // Header dropdown & home brand reset
  if (aboutMenuBtn && aboutDropdown) {
    aboutMenuBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      aboutDropdown.classList.toggle("open");
    });
    document.addEventListener("click", () => {
      aboutDropdown.classList.remove("open");
    });
  }

  if (homeBrandBtn) {
    homeBrandBtn.addEventListener("click", () => {
      searchMode = "all";
      if (searchInput) {
        searchInput.value = "";
        searchInput.placeholder = "Search works, tags, or people...";
      }
      hideShelfUntilOpened();
    });
  }

  if (libraryStats) {
    libraryStats.innerHTML = `<span><strong>${books.length}</strong> Works</span> • <span><strong>${categories.length}</strong> Categories</span>`;
  }
  hideShelfUntilOpened();
});