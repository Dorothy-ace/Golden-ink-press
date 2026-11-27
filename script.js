document.addEventListener("DOMContentLoaded", () => {
  function makePdfPath(title) {
    const cleanWords = title
      .replace(/['’]/g, "")
      .replace(/[^a-zA-Z0-9]+/g, "_")
      .replace(/^_+|_+$/g, "");
    return `books/${cleanWords}_Golden_Ink_Press.pdf`;
  }

  function buildFullChapterOne(book) {
    const leadParagraph = (book.chapter || "").replace(/^Chapter\s*1\s*/i, "").trim();
    const settingNote = `Category: ${book.category}. Themes and tags: ${book.tags.join(", ")}.`;

    return [
      "Chapter 1",
      leadParagraph || `${book.title} begins where ordinary routines give way to a moment that changes everything.`,
      `At first glance, the situation around ${book.title} looks familiar. ${book.summary} Yet beneath that surface, small details begin to shift—a glance that lingers a second too long, an unfinished conversation, and a choice that cannot simply be walked back.`,
      `${settingNote} Every character enters this opening chapter carrying their own history, expectations, and quiet hesitations. What seems like a simple beginning quickly gathers weight as motives, timing, and unseen pressures come into focus.`,
      `By the close of the opening scenes, the path ahead is clear enough to step onto, even if the destination remains uncertain. The first page has turned—and the story is officially underway.`
    ].join("\n\n");
  }

  function buildMinimalPdfBlob(title, text) {
    const safeLines = `${title}\n\n${text}`
      .replace(/[^\x20-\x7E\n]/g, " ")
      .split("\n")
      .flatMap((line) => {
        const chunks = [];
        for (let i = 0; i < line.length; i += 85) {
          chunks.push(line.slice(i, i + 85));
        }
        return chunks.length ? chunks : [""];
      })
      .slice(0, 42);

    const escapePdf = (s) =>
      s.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
    const streamLines = ["BT", "/F1 11 Tf", "50 740 Td", "14 TL"];
    safeLines.forEach((line, idx) => {
      if (idx === 0) streamLines.push(`(${escapePdf(line)}) Tj`);
      else streamLines.push(`T* (${escapePdf(line)}) Tj`);
    });
    streamLines.push("ET");
    const contentStream = streamLines.join("\n");

    const objects = [
      "1 0 obj << /Type /Catalog /Pages 2 0 R >> endobj",
      "2 0 obj << /Type /Pages /Kids [3 0 R] /Count 1 >> endobj",
      "3 0 obj << /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >> endobj",
      `4 0 obj << /Length ${contentStream.length} >> stream\n${contentStream}\nendstream endobj`,
      "5 0 obj << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> endobj"
    ];

    let pdf = "%PDF-1.4\n";
    const offsets = [0];
    for (const obj of objects) {
      offsets.push(pdf.length);
      pdf += obj + "\n";
    }
    const xrefStart = pdf.length;
    pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
    for (let i = 1; i < offsets.length; i++) {
      pdf += String(offsets[i]).padStart(10, "0") + " 00000 n \n";
    }
    pdf += `trailer << /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF`;
    return new Blob([pdf], { type: "application/pdf" });
  }

  const OWNER_EMAILS = [
    "golden@goldeninkpress.local",
    "golden@goldeniinkpress.local"
  ];

  const defaultBooks = [
    { id: "the-broken-pieces", title: "The Broken Pieces", category: "Romance", tags: ["romance", "healing", "drama"], summary: "Two fractured hearts cross paths after a sudden turning point and learn how to trust again.", chapter: "Chapter 1\n\nSome endings arrive without warning, leaving quiet rooms and unspoken questions. Yet even broken pieces can catch the morning light." },
    { id: "i-hate-you", title: "I Hate You", category: "Romance", tags: ["romance", "banter", "slow-burn"], summary: "Sharp banter, constant arguments, and slow-burn tension between two people who cannot ignore each other.", chapter: "Chapter 1\n\n'I hate you,' she said without looking up. Across the table, he smiled slowly—because nobody argues like that by accident." },
    { id: "we-are", title: "We Are", category: "Romance", tags: ["romance", "campus", "friendship"], summary: "Campus days, late-night hangouts, and reluctant confessions among a close-knit circle.", chapter: "Chapter 1\n\nBetween lectures and noisy cafeteria tables, a simple group hangout turned into something neither of them expected." },
    { id: "halo", title: "Halo", category: "Romance", tags: ["romance", "atmospheric", "fate"], summary: "A quiet, atmospheric pull between two people standing on opposite sides.", chapter: "Chapter 1\n\nA soft ring of light cut through the evening mist, marking the exact spot where paths crossed." },
    { id: "my-sunshine-thats-yet-to-come", title: "My Sunshine That's Yet to Come", category: "Romance", tags: ["romance", "hope", "warmth"], summary: "An uplifting story about waiting patiently for brighter days and the person who brings warmth.", chapter: "Chapter 1\n\nEven when the rain lasts for days, you keep the window cracked open for the morning sun." },
    { id: "iron-and-ink", title: "Iron and Ink", category: "Romance", tags: ["romance", "strength", "words"], summary: "Where forged strength meets written words—two guarded characters build an unbreakable bond.", chapter: "Chapter 1\n\nInk stains the fingers, while iron tests the hand. Together they wrote a story meant to last." },
    { id: "you-touched-my-heart", title: "You Touched My Heart", category: "Romance", tags: ["romance", "emotional", "bond"], summary: "One quiet moment shifts everything for two guarded souls.", chapter: "Chapter 1\n\nIt took only one honest word to reach a place kept locked for years." },
    { id: "my-heart-was-never-in-the-contract", title: "My Heart Was Never in the Contract", category: "Romance", tags: ["romance", "contract", "feelings"], summary: "An arrangement complicated by real emotions that neither side planned for.", chapter: "Chapter 1\n\nEvery clause was signed in black and white—except the feelings nobody wrote down." },
    { id: "illusion", title: "Illusion", category: "Romance", tags: ["romance", "secrets", "twist"], summary: "Appearances, secrets, and discovering what is real beneath the surface.", chapter: "Chapter 1\n\nMirrors bend light just enough to hide the truth until you step closer." },
    { id: "good-boundaries-and-goodbyes", title: "Good Boundaries and Goodbyes", category: "Romance", tags: ["romance", "growth", "peace"], summary: "Clarity, self-respect, and knowing when a chapter needs a clean close.", chapter: "Chapter 1\n\nSaying no is not cruelty; sometimes it is the quietest way to keep your peace." },
    { id: "forgiving-what-you-cant-forget", title: "Forgiving What You Can't Forget", category: "Romance", tags: ["romance", "forgiveness", "memory"], summary: "Releasing bitterness even when the memory itself remains vivid.", chapter: "Chapter 1\n\nThe memory stays, but its weight no longer has to pull you under." },
    { id: "campus-chronicles", title: "Campus Chronicles", category: "Romance", tags: ["romance", "campus", "notebooks"], summary: "University days, shared notebooks, and moments that stay long after graduation.", chapter: "Chapter 1\n\nFirst week on campus: new faces, rushed notes, and a hallway encounter that started everything." },
    { id: "undercover-love", title: "Undercover Love", category: "Romance", tags: ["romance", "undercover", "tension"], summary: "Keeping a cover story intact gets harder with every passing day.", chapter: "Chapter 1\n\nRule number one of going undercover: never let your guard drop when they look right at you." },
    { id: "the-sky-between-us", title: "The Sky Between Us", category: "Romance", tags: ["romance", "distance", "patience"], summary: "Distance, patience, and staying close across miles and time zones.", chapter: "Chapter 1\n\nWe look up at the same sky, miles apart, counting down the days until the distance shrinks." },
    { id: "echoes-of-silent-vows", title: "Echoes of Silent Vows", category: "Romance", tags: ["romance", "vows", "timing"], summary: "Unspoken promises and timing that shapes two lives.", chapter: "Chapter 1\n\nSome vows are never spoken out loud, yet they guide every choice you make." },
    { id: "the-game-of-love", title: "The Game of Love", category: "Romance", tags: ["romance", "wager", "stakes"], summary: "What starts as a playful wager turns into something nobody wants to lose.", chapter: "Chapter 1\n\nNobody enters a game expecting to care about the score more than the prize." },
    { id: "the-maze-runner", title: "The Maze Runner", category: "Adventure", tags: ["adventure", "maze", "survival"], summary: "Survival and mystery inside shifting walls where every turn is a test.", chapter: "Chapter 1\n\nThe massive stone doors groaned open at dawn, revealing a maze that changed every night." },
    { id: "the-hunger-games", title: "The Hunger Games", category: "Adventure", tags: ["adventure", "arena", "strategy"], summary: "High-stakes survival, courage, and strategy in a watched arena.", chapter: "Chapter 1\n\nWhen the horn sounds, survival depends on quick thinking and nerves of steel." },
    { id: "the-beach", title: "The Beach", category: "Adventure", tags: ["adventure", "island", "map"], summary: "A hidden map leads travelers toward a secluded island paradise.", chapter: "Chapter 1\n\nRumors of an untouched bay pull travelers past familiar shores into the unknown." },
    { id: "treasure-island", title: "Treasure Island", category: "Adventure", tags: ["adventure", "voyage", "treasure"], summary: "Sea charts, sails, and mutiny on a classic voyage for buried treasure.", chapter: "Chapter 1\n\nAn old sea chest and a folded map set a voyage in motion before sunrise." },
    { id: "percy-jackson", title: "Percy Jackson", category: "Adventure", tags: ["adventure", "myths", "quest"], summary: "Ancient myths collide with modern life on an unforgettable quest.", chapter: "Chapter 1\n\nFinding out the myths you read in class are breathing right beside you changes everything." },
    { id: "2gether-the-series", title: "2gether: The Series", category: "Adventure", tags: ["adventure", "music", "club"], summary: "Club challenges, campus hurdles, and unexpected turning points.", chapter: "Chapter 1\n\nA simple request to join the music club sets off a chain of surprises." },
    { id: "still-2gether", title: "Still 2gether", category: "Adventure", tags: ["adventure", "roadtrip", "teamwork"], summary: "Road trips, camp tasks, and new milestones beyond campus.", chapter: "Chapter 1\n\nOut on the open road, new challenges test teamwork and patience." },
    { id: "bangkok-8", title: "Bangkok 8", category: "Mystery", tags: ["mystery", "investigation", "city"], summary: "An investigator is pulled into secrets beneath the bustling city.", chapter: "Chapter 1\n\nBeneath neon lights and crowded streets, one case points toward a much deeper mystery." },
    { id: "bangkok-wakes-to-rain", title: "Bangkok Wakes to Rain", category: "Mystery", tags: ["mystery", "rain", "memories"], summary: "Rain over old walls uncovers memories and secrets long buried.", chapter: "Chapter 1\n\nHeavy rain washed over the city at dawn, bringing old memories back to light." },
    { id: "killed-at-the-whim-of-a-hat", title: "Killed at the Whim of a Hat", category: "Mystery", tags: ["mystery", "clues", "suspects"], summary: "A sudden twist puts every clue and suspect under close inspection.", chapter: "Chapter 1\n\nEvery detail in the room seemed ordinary—until one clue refused to fit." },
    { id: "the-king-of-bangkok", title: "The King of Bangkok", category: "Mystery", tags: ["mystery", "intrigue", "truth"], summary: "City intrigue, hidden motives, and a case nobody wants solved.", chapter: "Chapter 1\n\nIn a city of secrets, the hardest truth to find is the one people protect most." },
    { id: "and-then-there-were-none", title: "And Then There Were None", category: "Mystery", tags: ["mystery", "island", "suspense"], summary: "Ten strangers on an isolated island realize every clue points inward.", chapter: "Chapter 1\n\nCut off from the mainland by water and storm, ten guests discover they are not alone." },
    { id: "never-let-me-go", title: "Never Let Me Go", category: "Mystery", tags: ["mystery", "secrets", "loyalty"], summary: "Hidden dangers and family secrets test loyalty when everything is on the line.", chapter: "Chapter 1\n\nWhen shadows close in and family secrets surface, staying close is the only shield." },
    { id: "hidden-agenda", title: "Hidden Agenda", category: "Mystery", tags: ["mystery", "twists", "objectives"], summary: "Secret objectives and clever twists reveal who is playing what role.", chapter: "Chapter 1\n\nNot everyone at the table is playing by the same rules—or telling the whole truth." },
    { id: "the-windup-girl", title: "The Windup Girl", category: "Sci-Fi", tags: ["sci-fi", "future", "energy"], summary: "Speculative future of engineered worlds, scarce energy, and fragile alliances.", chapter: "Chapter 1\n\nIn a world powered by tension and springs, survival belongs to the adaptable." },
    { id: "dune", title: "Dune", category: "Sci-Fi", tags: ["sci-fi", "desert", "destiny"], summary: "Desert sands, rival houses, and destiny across a harsh world.", chapter: "Chapter 1\n\nEndless dunes stretch to the horizon where water is life and every step carries weight." },
    { id: "divergent", title: "Divergent", category: "Sci-Fi", tags: ["sci-fi", "factions", "choice"], summary: "A futuristic society divided by factions—and what happens when you do not fit one.", chapter: "Chapter 1\n\nChoosing day arrives once, yet one quiet truth sets everything apart." },
    { id: "the-girl-who-made-god", title: "The Girl Who Made God", category: "Sci-Fi", tags: ["sci-fi", "code", "creation"], summary: "A line of code and creation awakens something extraordinary.", chapter: "Chapter 1\n\nAt 2:14 AM, the terminal blinked once—and answered back." },
    { id: "my-heart-is-made-of-code", title: "My Heart Is Made of Code", category: "Sci-Fi", tags: ["sci-fi", "systems", "emotion"], summary: "Logic and human emotion cross paths inside a world built on systems.", chapter: "Chapter 1\n\nEvery program follows rules, until an unexpected variable changes the output." },
    { id: "the-world-without-passwords", title: "The World Without Passwords", category: "Sci-Fi", tags: ["sci-fi", "identity", "security"], summary: "Digital identity, trust, and security in a connected future.", chapter: "Chapter 1\n\nWhen locks vanish into code, trust becomes the hardest thing to verify." },
    { id: "the-last-code", title: "The Last Code", category: "Sci-Fi", tags: ["sci-fi", "sequence", "system"], summary: "One final sequence holds the key to unlocking the entire system.", chapter: "Chapter 1\n\nOnly one sequence remained uncracked before the system sealed shut." },
    { id: "four-reigns", title: "Four Reigns", category: "Historical", tags: ["historical", "eras", "tradition"], summary: "Shifting eras and traditions seen through a life shaped by history.", chapter: "Chapter 1\n\nTimes change slowly, then all at once, carrying traditions across generations." },
    { id: "memories-of-the-black-rose", title: "Memories of the Black Rose", category: "Historical", tags: ["historical", "keepsake", "letters"], summary: "A quiet keepsake holds stories from another era and family past.", chapter: "Chapter 1\n\nInside the cedar box lay a dark pressed rose and a letter dated decades ago." },
    { id: "things-fall-apart", title: "Things Fall Apart", category: "Historical", tags: ["historical", "community", "heritage"], summary: "Tradition, pride, and transition in a changing community.", chapter: "Chapter 1\n\nReputation is earned over seasons, yet tested in a single turning point." },
    { id: "pride-and-prejudice", title: "Pride and Prejudice", category: "Historical", tags: ["historical", "classic", "wit"], summary: "First impressions, sharp wit, and changing hearts in a timeless classic.", chapter: "Chapter 1\n\nFirst impressions rarely tell the whole story until pride steps aside." },
    { id: "the-book-thief", title: "The Book Thief", category: "Historical", tags: ["historical", "words", "hope"], summary: "Words and quiet kindness become a lifeline during dark days.", chapter: "Chapter 1\n\nEven in difficult times, stolen pages and shared stories keep hope alive." },
    { id: "moonlight-chicken", title: "Moonlight Chicken", category: "Historical", tags: ["historical", "night", "dreams"], summary: "Late-night food stalls, quiet sacrifices, and real dreams under city lights.", chapter: "Chapter 1\n\nWhen the rest of the street sleeps, the stove stays lit for everyone still working." },
    { id: "the-haunting-of-hill-house", title: "The Haunting of Hill House", category: "Horror", tags: ["horror", "gothic", "house"], summary: "A gothic house of strange angles and psychological suspense.", chapter: "Chapter 1\n\nHill House stood not sane, and whatever walked its halls waited for nightfall." },
    { id: "the-phantom-lover", title: "The Phantom Lover", category: "Horror", tags: ["horror", "shadows", "melody"], summary: "Supernatural suspense and shadows that linger after dark.", chapter: "Chapter 1\n\nA melody drifted through the empty hall long after the last door closed." },
    { id: "dracula", title: "Dracula", category: "Horror", tags: ["horror", "classic", "midnight"], summary: "Midnight travel, journals, and an ancient threat in a classic horror tale.", chapter: "Chapter 1\n\nThe carriage stopped at the crossroads as fog rolled over the mountains." },
    { id: "it", title: "It", category: "Horror", tags: ["horror", "town", "childhood"], summary: "Childhood bonds and recurring fear in a small town.", chapter: "Chapter 1\n\nPaper boats drifted along the rain-swollen gutter toward the dark storm drain." },
    { id: "bird-box", title: "Bird Box", category: "Horror", tags: ["horror", "survival", "tension"], summary: "Survival and tension when looking outside carries unseen danger.", chapter: "Chapter 1\n\nKeep the curtains drawn and the blindfold ready before opening the door." },
    { id: "sightseeing", title: "Sightseeing", category: "Comedy", tags: ["comedy", "satire", "detours"], summary: "Witty short stories and lighthearted satire on everyday moments.", chapter: "Chapter 1\n\nA simple trip around town turns into a string of unexpectedly funny detours." },
    { id: "diary-of-a-wimpy-kid", title: "Diary of a Wimpy Kid", category: "Comedy", tags: ["comedy", "journal", "school"], summary: "School-day plans gone sideways told through candid journal entries.", chapter: "Chapter 1\n\nLet's get one thing straight: this is a journal, not a diary." },
    { id: "bridget-jones-diary", title: "Bridget Jones's Diary", category: "Comedy", tags: ["comedy", "resolutions", "romcom"], summary: "Honest resolutions, messy plans, and lively romantic comedy.", chapter: "Chapter 1\n\nNew Year's resolution number one: keep calm and write down the truth." },
    { id: "crazy-rich-asians", title: "Crazy Rich Asians", category: "Comedy", tags: ["comedy", "high-society", "summer"], summary: "Big personalities, lively twists, and high-society comedy.", chapter: "Chapter 1\n\nA casual summer trip quickly turns into the biggest event of the season." },
    { id: "fish-upon-the-sky", title: "Fish Upon the Sky", category: "Comedy", tags: ["comedy", "campus", "banter"], summary: "Makeovers, chaotic plans, and non-stop university banter.", chapter: "Chapter 1\n\nA bold plan to stand out on campus backfires in the funniest way possible." },
    { id: "my-love-mix-up", title: "My Love Mix-Up!", category: "Comedy", tags: ["comedy", "eraser", "classroom"], summary: "One borrowed eraser sparks a chain of classroom misunderstandings.", chapter: "Chapter 1\n\nIt all started with a name written on a borrowed eraser." },
    { id: "the-heart-killers", title: "The Heart Killers", category: "Action", tags: ["action", "missions", "fast-paced"], summary: "High-stakes missions, sharp edges, and fast-paced action.", chapter: "Chapter 1\n\nEvery mission has a clock—and once the signal drops, there is no turning back." },
    { id: "star-in-my-mind", title: "Star in My Mind", category: "Action", tags: ["action", "pursuit", "resolve"], summary: "Determination and pursuit when a moment matters most.", chapter: "Chapter 1\n\nSome goals take years of quiet effort before the right window opens." },
    { id: "perfect-10-liners", title: "Perfect 10 Liners", category: "Action", tags: ["action", "challenges", "rivalry"], summary: "Faculty challenges, rivalries, and high-energy tests.", chapter: "Chapter 1\n\nFreshmen and seniors line up as the first challenge begins." },
    { id: "attack-on-titan", title: "Attack on Titan", category: "Anime", tags: ["anime", "walls", "truth"], summary: "Life behind towering walls and the truth waiting beyond them.", chapter: "Chapter 1\n\nFor a hundred years the walls stood unbroken—until the ground began to shake." },
    { id: "one-piece", title: "One Piece", category: "Anime", tags: ["anime", "seas", "treasure"], summary: "Setting sail across wild seas in search of a legendary treasure.", chapter: "Chapter 1\n\nA straw hat, a bold promise, and an open ocean calling out to adventure." },
    { id: "jujutsu-kaisen", title: "Jujutsu Kaisen", category: "Anime", tags: ["anime", "curses", "sorcerers"], summary: "Curses, sorcerers, and high-speed supernatural battles.", chapter: "Chapter 1\n\nShadows hold more than fear when cursed energy stirs after dark." },
    { id: "demon-slayer", title: "Demon Slayer: Kimetsu no Yaiba", category: "Anime", tags: ["anime", "swords", "night"], summary: "Swordsmanship, resolve, and night battles against darkness.", chapter: "Chapter 1\n\nSnow fell over the mountain path as a new resolve took root." },
    { id: "death-note", title: "Death Note", category: "Anime", tags: ["anime", "notebook", "deduction"], summary: "Mind games and high-tension deduction sparked by a mysterious notebook.", chapter: "Chapter 1\n\nA single notebook dropped onto the school courtyard—and changed everything." },
    { id: "my-school-president", title: "My School President", category: "Anime", tags: ["anime", "music", "stage"], summary: "School music competitions, teamwork, and big stage ambitions.", chapter: "Chapter 1\n\nSaving the music club takes more than practice—it takes heart on stage." },
    { id: "thamepo-heart-that-skips-a-beat", title: "ThamePo: Heart That Skips a Beat", category: "Anime", tags: ["anime", "backstage", "rhythm"], summary: "Stage lights, music, and connection behind the scenes.", chapter: "Chapter 1\n\nBefore the spotlight hits the stage, every beat starts backstage." }
  ];

  localStorage.removeItem("gip_session");
  localStorage.removeItem("currentUser");

  const state = {
    books: JSON.parse(localStorage.getItem("gip_v10_books") || "null") || defaultBooks,
    accounts: JSON.parse(localStorage.getItem("gip_v10_accounts") || "[]"),
    session: JSON.parse(localStorage.getItem("gip_v10_session") || "null"),
    cart: JSON.parse(localStorage.getItem("gip_v10_cart") || "[]"),
    orders: JSON.parse(localStorage.getItem("gip_v10_orders") || "[]"),
    bookmarks: JSON.parse(localStorage.getItem("gip_v10_bookmarks") || "[]"),
    comments: JSON.parse(localStorage.getItem("gip_v10_comments") || "[]"),
    reactions: JSON.parse(localStorage.getItem("gip_v10_reactions") || "{}"),
    stories: JSON.parse(localStorage.getItem("gip_v10_stories") || "[]"),
    requests: JSON.parse(localStorage.getItem("gip_v10_requests") || "[]"),
    dms: JSON.parse(localStorage.getItem("gip_v10_dms") || "[]"),
    news: JSON.parse(localStorage.getItem("gip_v10_news") || "null") || [
      {
        id: "n-1",
        title: "New Book Coming Soon",
        text: "A new book is preparing to drop—stay tuned and wait for the release!",
        date: new Date().toLocaleString()
      }
    ],
    stats: JSON.parse(localStorage.getItem("gip_v10_stats") || "null") || {
      downloads: [],
      cartAdds: [],
      currentlyReading: {},
      visits: {},
      loggedInUsers: [],
      events: []
    }
  };

  state.books = state.books.map((b) => ({
    ...b,
    pdfPath: b.pdfPath || makePdfPath(b.title),
    tags: Array.isArray(b.tags) && b.tags.length ? b.tags : [b.category.toLowerCase()]
  }));

  function save() {
    localStorage.setItem("gip_v10_books", JSON.stringify(state.books));
    localStorage.setItem("gip_v10_accounts", JSON.stringify(state.accounts));
    localStorage.setItem("gip_v10_session", JSON.stringify(state.session));
    localStorage.setItem("gip_v10_cart", JSON.stringify(state.cart));
    localStorage.setItem("gip_v10_orders", JSON.stringify(state.orders));
    localStorage.setItem("gip_v10_bookmarks", JSON.stringify(state.bookmarks));
    localStorage.setItem("gip_v10_comments", JSON.stringify(state.comments));
    localStorage.setItem("gip_v10_reactions", JSON.stringify(state.reactions));
    localStorage.setItem("gip_v10_stories", JSON.stringify(state.stories));
    localStorage.setItem("gip_v10_requests", JSON.stringify(state.requests));
    localStorage.setItem("gip_v10_dms", JSON.stringify(state.dms));
    localStorage.setItem("gip_v10_news", JSON.stringify(state.news));
    localStorage.setItem("gip_v10_stats", JSON.stringify(state.stats));
  }

  function isOwner() {
    if (!state.session || !state.session.email) return false;
    return OWNER_EMAILS.includes(state.session.email.trim().toLowerCase());
  }

  function recordVisit(user) {
    if (!user || OWNER_EMAILS.includes(user.email.toLowerCase())) return;
    const key = user.email.toLowerCase();
    state.stats.visits[key] = state.stats.visits[key] || {
      name: user.name,
      email: user.email,
      count: 0,
      lastSeen: ""
    };
    state.stats.visits[key].count += 1;
    state.stats.visits[key].lastSeen = new Date().toLocaleString();

    if (!state.stats.loggedInUsers.some((u) => u.email.toLowerCase() === key)) {
      state.stats.loggedInUsers.push({
        name: user.name,
        email: user.email,
        time: new Date().toLocaleString()
      });
    }
  }

  function recordEvent(type, detail) {
    const actor = state.session ? `${state.session.name} (${state.session.email})` : "Guest";
    state.stats.events.unshift({ actor, type, detail, time: new Date().toLocaleString() });
    save();
  }

  function notify(msg) {
    const toast = document.getElementById("toast");
    if (toast) {
      toast.textContent = msg;
      toast.classList.remove("hidden");
      clearTimeout(toast._timer);
      toast._timer = setTimeout(() => toast.classList.add("hidden"), 3200);
    } else {
      alert(msg);
    }
  }

  let authMode = "login";
  let pendingAfterAuth = null;
  let activeView = isOwner() ? "owner" : "home";
  let aboutFocusSection = "about";
  let selectedCategory = null;
  let selectedBookId = null;
  let searchQuery = "";
  let searchScope = "all";
  let browseTab = "works";
  let aboutMenuOpen = false;
  let ownerTab = "overview";

  let sbVaultOpen = true;
  let sbSearchOpen = false;
  let sbBrowseOpen = false;

  function openBook(bookId) {
    if (!bookId) return;
    const book = state.books.find((b) => b.id === bookId) || state.books[0];
    if (!book) return;
    selectedBookId = book.id;
    activeView = "book-detail";
    closeSidebar();
    render();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function openSidebar() {
    const sb = document.getElementById("sidebar");
    const bd = document.getElementById("sidebar-backdrop");
    if (sb) sb.classList.add("open");
    if (bd) bd.style.display = "block";
  }

  function closeSidebar() {
    const sb = document.getElementById("sidebar");
    const bd = document.getElementById("sidebar-backdrop");
    if (sb) sb.classList.remove("open");
    if (bd) bd.style.display = "none";
  }

  function requireAccount(mode = "signup", resumeAction = null) {
    if (state.session) return true;
    authMode = mode;
    pendingAfterAuth = resumeAction;
    activeView = "auth";
    notify("Please register or log in first to continue.");
    render();
    return false;
  }

  function getStage() {
    let stage = document.getElementById("gip-stage");
    if (!stage) {
      const main = document.querySelector("main") || document.body;
      stage = document.createElement("section");
      stage.id = "gip-stage";
      stage.style.cssText = "max-width:1040px;margin:1.25rem auto;padding:1rem;";
      main.innerHTML = "";
      main.appendChild(stage);
    }
    return stage;
  }

  async function downloadBookPdf(book) {
    if (!requireAccount("signup", () => downloadBookPdf(book))) return;

    const primaryPath = book.pdfPath || makePdfPath(book.title);
    const fileName = primaryPath.split("/").pop();
    const candidates = [
      primaryPath,
      `books/${book.id}.pdf`,
      `books/${book.title}.pdf`
    ];

    state.stats.downloads.unshift({
      bookTitle: book.title,
      user: `${state.session.name} (${state.session.email})`,
      time: new Date().toLocaleString()
    });
    recordEvent("download_pdf", `${book.title} (${primaryPath})`);
    save();

    for (const url of candidates) {
      try {
        const res = await fetch(url, { cache: "no-store" });
        if (!res.ok) continue;
        const blob = await res.blob();
        const pdfBlob =
          blob.type === "application/pdf"
            ? blob
            : new Blob([blob], { type: "application/pdf" });
        const blobUrl = URL.createObjectURL(pdfBlob);
        const link = document.createElement("a");
        link.href = blobUrl;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        link.remove();
        setTimeout(() => URL.revokeObjectURL(blobUrl), 2500);
        notify(`Downloading ${fileName}`);
        return;
      } catch (_) {
        // Try next candidate or fallback below
      }
    }

    const chapterText = book.fullChapter || buildFullChapterOne(book);
    const fallbackBlob = buildMinimalPdfBlob(
      book.title,
      `${book.summary}\n\n${chapterText}`
    );
    const fallbackUrl = URL.createObjectURL(fallbackBlob);
    const link = document.createElement("a");
    link.href = fallbackUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(fallbackUrl), 2500);
    notify(`Downloaded ${fileName}`);
  }

  function readBookOnlineVoice(book) {
    if (!navigator.onLine) {
      notify("Online voice reading works when you are online.");
      return;
    }
    if (!("speechSynthesis" in window)) {
      notify("Voice reading is not supported on this browser.");
      return;
    }
    window.speechSynthesis.cancel();
    const fullText = book.fullChapter || buildFullChapterOne(book);
    const utter = new SpeechSynthesisUtterance(`${book.title}. ${fullText}`);
    window.speechSynthesis.speak(utter);
    recordEvent("voice_read", book.title);
    notify(`Reading "${book.title}" aloud...`);
  }

  function ensureAboutDropdown() {
    let dropdown = document.getElementById("gip-about-dropdown");
    if (!dropdown) {
      dropdown = document.createElement("div");
      dropdown.id = "gip-about-dropdown";
      dropdown.style.cssText =
        "position:fixed;top:56px;min-width:165px;background:#161d2e;border:1px solid #2b3854;border-radius:10px;padding:0.4rem;z-index:2000;display:none;flex-direction:column;gap:0.2rem;box-shadow:0 10px 24px rgba(0,0,0,0.45);";
      dropdown.innerHTML = `
        <button type="button" id="about-us-item" style="text-align:left;padding:0.5rem 0.75rem;border:none;background:transparent;color:#f8fafc;border-radius:7px;cursor:pointer;">About Us</button>
        <button type="button" id="about-news-item" style="text-align:left;padding:0.5rem 0.75rem;border:none;background:transparent;color:#f8fafc;border-radius:7px;cursor:pointer;">News</button>
        <button type="button" id="about-faq-item" style="text-align:left;padding:0.5rem 0.75rem;border:none;background:transparent;color:#f8fafc;border-radius:7px;cursor:pointer;">FAQ</button>
      `;
      document.body.appendChild(dropdown);
    }
    return dropdown;
  }

  function openAboutPage(section = "about") {
    aboutFocusSection = section;
    activeView = "about-page";
    render();
    setTimeout(() => {
      const el =
        section === "news"
          ? document.getElementById("about-news-block")
          : section === "faq"
          ? document.getElementById("about-faq-block")
          : document.getElementById("about-us-block");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 40);
  }

  document.addEventListener("click", (e) => {
    const target = e.target;

    const bookTrigger = target.closest("[data-open-book]");
    if (bookTrigger) {
      e.preventDefault();
      e.stopPropagation();
      openBook(bookTrigger.getAttribute("data-open-book"));
      return;
    }

    const dropdown = ensureAboutDropdown();

    if (target.closest("#menu-toggle")) {
      e.preventDefault();
      openSidebar();
      return;
    }

    if (target.closest("#sidebar-close") || target.closest("#sidebar-backdrop")) {
      e.preventDefault();
      closeSidebar();
      return;
    }

    if (target.closest("#brand-home")) {
      e.preventDefault();
      activeView = isOwner() ? "owner" : "home";
      render();
      return;
    }

    if (target.closest("#about-btn")) {
      e.preventDefault();
      e.stopPropagation();
      const btn = target.closest("#about-btn");
      aboutMenuOpen = !aboutMenuOpen;
      if (aboutMenuOpen) {
        const rect = btn.getBoundingClientRect();
        dropdown.style.top = `${Math.round(rect.bottom + 6)}px`;
        dropdown.style.left = `${Math.round(rect.left)}px`;
        dropdown.style.display = "flex";
      } else {
        dropdown.style.display = "none";
      }
      return;
    }

    if (target.closest("#about-us-item")) {
      e.preventDefault();
      aboutMenuOpen = false;
      dropdown.style.display = "none";
      openAboutPage("about");
      return;
    }

    if (target.closest("#about-news-item")) {
      e.preventDefault();
      aboutMenuOpen = false;
      dropdown.style.display = "none";
      openAboutPage("news");
      return;
    }

    if (target.closest("#about-faq-item")) {
      e.preventDefault();
      aboutMenuOpen = false;
      dropdown.style.display = "none";
      openAboutPage("faq");
      return;
    }

    if (aboutMenuOpen && !target.closest("#gip-about-dropdown")) {
      aboutMenuOpen = false;
      dropdown.style.display = "none";
    }

    if (target.closest("#contact-btn")) {
      e.preventDefault();
      activeView = "contact";
      render();
      return;
    }

    if (target.closest("#header-login-btn")) {
      e.preventDefault();
      authMode = "login";
      activeView = "auth";
      render();
      return;
    }

    if (target.closest("#header-signup-btn")) {
      e.preventDefault();
      authMode = "signup";
      activeView = "auth";
      render();
      return;
    }

    if (target.closest("#cart-link")) {
      e.preventDefault();
      activeView = "cart";
      render();
      return;
    }
  });

  function syncHeader() {
    const cartLink = document.getElementById("cart-link");
    if (cartLink) {
      cartLink.textContent = `Cart (${state.cart.length})`;
    }
  }

  function buildSidebar() {
    const navList = document.getElementById("sidebar-menu");
    if (!navList) return;

    const categories = [...new Set(state.books.map((b) => b.category))];

    navList.innerHTML = `
      <li><button type="button" id="sb-home" class="sb-item">Home</button></li>

      <li>
        <button type="button" id="sb-vault-toggle" class="sb-item">Vault ${sbVaultOpen ? "▴" : "▾"}</button>
        ${
          sbVaultOpen
            ? `<ul class="sb-sublist">
                 ${categories
                   .map(
                     (cat) =>
                       `<li><button type="button" data-sb-cat="${cat}" class="sb-subitem">${cat}</button></li>`
                   )
                   .join("")}
               </ul>`
            : ""
        }
      </li>

      <li>
        <button type="button" id="sb-search-toggle" class="sb-item">Search ${sbSearchOpen ? "▴" : "▾"}</button>
        ${
          sbSearchOpen
            ? `<ul class="sb-sublist">
                 <li><button type="button" data-sb-search="works" class="sb-subitem">Works</button></li>
                 <li><button type="button" data-sb-search="people" class="sb-subitem">People</button></li>
                 <li><button type="button" data-sb-search="tags" class="sb-subitem">Tags</button></li>
               </ul>`
            : ""
        }
      </li>

      <li>
        <button type="button" id="sb-browse-toggle" class="sb-item">Browse ${sbBrowseOpen ? "▴" : "▾"}</button>
        ${
          sbBrowseOpen
            ? `<ul class="sb-sublist">
                 <li><button type="button" data-sb-browse="works" class="sb-subitem">Works</button></li>
                 <li><button type="button" data-sb-browse="collections" class="sb-subitem">Collections</button></li>
               </ul>`
            : ""
        }
      </li>

      <li><button type="button" id="sb-bookmarks" class="sb-item">My Bookmarks</button></li>
      <li><button type="button" id="sb-stories" class="sb-item">Stories</button></li>
      <li><button type="button" id="sb-request" class="sb-item">Request a Book</button></li>
      ${
        isOwner()
          ? `<li><button type="button" id="sb-owner" class="sb-item" style="color:#f472b6;font-weight:700;">Owner Dashboard</button></li>`
          : ""
      }
      ${
        state.session
          ? `<li><button type="button" id="sb-logout" class="sb-item" style="color:#fca5a5;">Log Out (${state.session.name})</button></li>`
          : ""
      }
    `;

    navList.querySelectorAll(".sb-item").forEach((b) => {
      b.style.cssText +=
        ";width:100%;text-align:left;padding:0.6rem 0.85rem;border:none;background:transparent;color:#f8fafc;font-size:0.97rem;font-weight:600;cursor:pointer;border-radius:8px;";
      b.onmouseenter = () => (b.style.background = "#1e293b");
      b.onmouseleave = () => (b.style.background = "transparent");
    });

    navList.querySelectorAll(".sb-subitem").forEach((b) => {
      b.style.cssText +=
        ";width:100%;text-align:left;padding:0.45rem 0.75rem;border:none;background:#0f1420;color:#cbd5e1;font-size:0.9rem;cursor:pointer;border-radius:7px;";
      b.onmouseenter = () => {
        b.style.background = "#1e293b";
        b.style.color = "#fff";
      };
      b.onmouseleave = () => {
        b.style.background = "#0f1420";
        b.style.color = "#cbd5e1";
      };
    });

    const go = (view) => {
      activeView = view;
      closeSidebar();
      render();
    };

    document.getElementById("sb-home").onclick = () => go(isOwner() ? "owner" : "home");
    document.getElementById("sb-vault-toggle").onclick = () => {
      sbVaultOpen = !sbVaultOpen;
      buildSidebar();
    };
    navList.querySelectorAll("[data-sb-cat]").forEach((btn) => {
      btn.onclick = () => {
        selectedCategory = btn.dataset.sbCat;
        go("vault-books");
      };
    });
    document.getElementById("sb-search-toggle").onclick = () => {
      sbSearchOpen = !sbSearchOpen;
      buildSidebar();
    };
    navList.querySelectorAll("[data-sb-search]").forEach((btn) => {
      btn.onclick = () => {
        searchScope = btn.dataset.sbSearch;
        go("search");
      };
    });
    document.getElementById("sb-browse-toggle").onclick = () => {
      sbBrowseOpen = !sbBrowseOpen;
      buildSidebar();
    };
    navList.querySelectorAll("[data-sb-browse]").forEach((btn) => {
      btn.onclick = () => {
        browseTab = btn.dataset.sbBrowse;
        go("browse");
      };
    });
    document.getElementById("sb-bookmarks").onclick = () => go("bookmarks");
    document.getElementById("sb-stories").onclick = () => go("stories");
    document.getElementById("sb-request").onclick = () => go("request");

    const ownerBtn = document.getElementById("sb-owner");
    if (ownerBtn) ownerBtn.onclick = () => go("owner");

    const logoutBtn = document.getElementById("sb-logout");
    if (logoutBtn) {
      logoutBtn.onclick = () => {
        if ("speechSynthesis" in window) window.speechSynthesis.cancel();
        recordEvent("logout", state.session.email);
        state.session = null;
        activeView = "home";
        save();
        closeSidebar();
        notify("Logged out.");
        render();
      };
    }
  }

  function renderAuthView() {
    const stage = getStage();
    stage.innerHTML = `
      <div style="max-width:430px;margin:1.5rem auto;padding:1.5rem;border-radius:14px;background:#161d2e;border:1px solid #2b3854;color:#f8fafc;">
        <button type="button" id="auth-back-site" style="margin-bottom:0.85rem;padding:0.35rem 0.7rem;border-radius:7px;border:1px solid #334155;background:#0f1420;color:#fff;cursor:pointer;">← Continue to Site</button>
        <h2 style="margin:0 0 0.35rem;">${authMode === "login" ? "Log In" : "Sign Up"}</h2>
        <div style="display:flex;gap:0.5rem;margin-bottom:1rem;">
          <button type="button" id="mode-login" style="flex:1;padding:0.5rem;border-radius:8px;border:1px solid #3b82f6;background:${authMode === "login" ? "#3b82f6" : "transparent"};color:#fff;cursor:pointer;">Log In</button>
          <button type="button" id="mode-signup" style="flex:1;padding:0.5rem;border-radius:8px;border:1px solid #3b82f6;background:${authMode === "signup" ? "#3b82f6" : "transparent"};color:#fff;cursor:pointer;">Sign Up</button>
        </div>
        ${
          authMode === "login"
            ? `<form id="login-form" style="display:flex;flex-direction:column;gap:0.7rem;">
                 <input id="li-email" type="email" required placeholder="Email address" style="padding:0.6rem;border-radius:8px;border:1px solid #334155;background:#0d121d;color:#fff;" />
                 <input id="li-pass" type="password" required placeholder="Password" style="padding:0.6rem;border-radius:8px;border:1px solid #334155;background:#0d121d;color:#fff;" />
                 <button type="submit" style="padding:0.65rem;border-radius:8px;border:none;background:#3b82f6;color:#fff;font-weight:700;cursor:pointer;">Log In</button>
               </form>`
            : `<form id="signup-form" style="display:flex;flex-direction:column;gap:0.7rem;">
                 <input id="su-name" type="text" required placeholder="Full name" style="padding:0.6rem;border-radius:8px;border:1px solid #334155;background:#0d121d;color:#fff;" />
                 <input id="su-email" type="email" required placeholder="Email address" style="padding:0.6rem;border-radius:8px;border:1px solid #334155;background:#0d121d;color:#fff;" />
                 <input id="su-pass" type="password" required placeholder="Create password" style="padding:0.6rem;border-radius:8px;border:1px solid #334155;background:#0d121d;color:#fff;" />
                 <button type="submit" style="padding:0.65rem;border-radius:8px;border:none;background:#ec4899;color:#fff;font-weight:700;cursor:pointer;">Sign Up</button>
               </form>`
        }
      </div>
    `;

    document.getElementById("auth-back-site").onclick = () => {
      pendingAfterAuth = null;
      activeView = isOwner() ? "owner" : "home";
      render();
    };
    document.getElementById("mode-login").onclick = () => { authMode = "login"; renderAuthView(); };
    document.getElementById("mode-signup").onclick = () => { authMode = "signup"; renderAuthView(); };

    const loginForm = document.getElementById("login-form");
    if (loginForm) {
      loginForm.onsubmit = (e) => {
        e.preventDefault();
        const email = document.getElementById("li-email").value.trim().toLowerCase();
        const pass = document.getElementById("li-pass").value;

        if (OWNER_EMAILS.includes(email)) {
          state.session = { name: "Owner", email };
          activeView = "owner";
          recordEvent("owner_login", email);
          save();
          const fn = pendingAfterAuth;
          pendingAfterAuth = null;
          render();
          if (fn) fn();
          return;
        }

        const found = state.accounts.find((a) => a.email === email);
        if (!found) {
          notify("No account found for this email. Please Sign Up first.");
          authMode = "signup";
          renderAuthView();
          return;
        }
        if (found.pass !== pass) {
          notify("Incorrect password.");
          return;
        }

        state.session = { name: found.name, email: found.email };
        recordVisit(state.session);
        activeView = "home";
        recordEvent("login", email);
        save();
        const fn = pendingAfterAuth;
        pendingAfterAuth = null;
        render();
        if (fn) fn();
      };
    }

    const signupForm = document.getElementById("signup-form");
    if (signupForm) {
      signupForm.onsubmit = (e) => {
        e.preventDefault();
        const name = document.getElementById("su-name").value.trim();
        const email = document.getElementById("su-email").value.trim().toLowerCase();
        const pass = document.getElementById("su-pass").value;

        if (OWNER_EMAILS.includes(email)) {
          notify("Reserved for Owner. Please Log In.");
          authMode = "login";
          renderAuthView();
          return;
        }
        if (state.accounts.some((a) => a.email === email)) {
          notify("Account already exists. Please Log In.");
          authMode = "login";
          renderAuthView();
          return;
        }

        state.accounts.push({ name, email, pass, joined: new Date().toLocaleString() });
        state.session = { name, email };
        recordVisit(state.session);
        activeView = "home";
        recordEvent("signup", email);
        save();
        const fn = pendingAfterAuth;
        pendingAfterAuth = null;
        render();
        if (fn) fn();
      };
    }
  }

  function renderOwnerDashboard() {
    const stage = getStage();
    const visitList = Object.values(state.stats.visits).sort((a, b) => b.count - a.count);
    const activeReaders = Object.values(state.stats.currentlyReading);
    const pendingRequests = state.requests.filter((r) => !r.fulfilled);

    const tabBtn = (id, label) =>
      `<button type="button" data-owner-tab="${id}" style="padding:0.45rem 0.85rem;border-radius:8px;border:1px solid #334155;background:${
        ownerTab === id ? "#ec4899" : "#0f1420"
      };color:#fff;font-weight:600;cursor:pointer;">${label}</button>`;

    stage.innerHTML = `
      <div style="padding:1.35rem;border-radius:14px;background:#161d2e;border:1px solid #2b3854;color:#f8fafc;">
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:0.75rem;margin-bottom:1rem;">
          <div>
            <p style="margin:0;color:#f472b6;font-size:0.8rem;font-weight:700;">GOLDEN INK PRESS · ADMIN CONTROL</p>
            <h2 style="margin:0.2rem 0 0;">Owner Dashboard</h2>
          </div>
          <button type="button" id="owner-go-site" style="padding:0.55rem 0.95rem;border-radius:8px;border:none;background:#3b82f6;color:#fff;font-weight:700;cursor:pointer;">View Reader Site →</button>
        </div>

        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(135px,1fr));gap:0.65rem;margin-bottom:1.1rem;">
          <div style="padding:0.75rem;border-radius:10px;background:#0f1420;border:1px solid #26334d;"><small style="color:#94a3b8;">Books in Vault</small><div style="font-size:1.35rem;font-weight:700;color:#93c5fd;">${state.books.length}</div></div>
          <div style="padding:0.75rem;border-radius:10px;background:#0f1420;border:1px solid #26334d;"><small style="color:#94a3b8;">Signed-Up Readers</small><div style="font-size:1.35rem;font-weight:700;color:#34d399;">${state.accounts.length}</div></div>
          <div style="padding:0.75rem;border-radius:10px;background:#0f1420;border:1px solid #26334d;"><small style="color:#94a3b8;">Active Visitors</small><div style="font-size:1.35rem;font-weight:700;color:#fbbf24;">${visitList.length}</div></div>
          <div style="padding:0.75rem;border-radius:10px;background:#0f1420;border:1px solid #26334d;"><small style="color:#94a3b8;">PDF Downloads</small><div style="font-size:1.35rem;font-weight:700;color:#f472b6;">${state.stats.downloads.length}</div></div>
          <div style="padding:0.75rem;border-radius:10px;background:#0f1420;border:1px solid #26334d;"><small style="color:#94a3b8;">Cart Adds / Orders</small><div style="font-size:1.35rem;font-weight:700;color:#60a5fa;">${state.stats.cartAdds.length} / ${state.orders.length}</div></div>
          <div style="padding:0.75rem;border-radius:10px;background:#0f1420;border:1px solid #26334d;"><small style="color:#94a3b8;">Comments / Requests</small><div style="font-size:1.35rem;font-weight:700;color:#c084fc;">${state.comments.length} / ${pendingRequests.length}</div></div>
        </div>

        <div style="display:flex;gap:0.45rem;flex-wrap:wrap;margin-bottom:1.1rem;padding-bottom:0.85rem;border-bottom:1px solid #2b3854;">
          ${tabBtn("overview", "Overview & Activity")}
          ${tabBtn("books", `Books (${state.books.length})`)}
          ${tabBtn("news", `Post News (${state.news.length})`)}
          ${tabBtn("readers", `Readers & Visits (${state.accounts.length})`)}
          ${tabBtn("orders", `Cart & Orders (${state.stats.cartAdds.length + state.orders.length})`)}
          ${tabBtn("comments", `Comments (${state.comments.length})`)}
          ${tabBtn("requests", `Requests & DMs (${state.requests.length + state.dms.length})`)}
        </div>

        ${
          ownerTab === "overview"
            ? `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:1rem;">
                 <div style="padding:1rem;border-radius:10px;background:#0f1420;border:1px solid #26334d;">
                   <h3 style="margin:0 0 0.65rem;font-size:1rem;">Top Frequent Visitors</h3>
                   ${
                     visitList.length
                       ? visitList
                           .slice(0, 6)
                           .map(
                             (v) =>
                               `<div style="padding:0.5rem 0;border-bottom:1px solid #1e293b;font-size:0.88rem;"><strong>${v.name}</strong> (${v.email})<div style="color:#93c5fd;">Visits: ${v.count} · Last seen: ${v.lastSeen}</div></div>`
                           )
                           .join("")
                       : `<p style="color:#94a3b8;font-size:0.88rem;margin:0;">No reader logins recorded yet.</p>`
                   }
                 </div>

                 <div style="padding:1rem;border-radius:10px;background:#0f1420;border:1px solid #26334d;">
                   <h3 style="margin:0 0 0.65rem;font-size:1rem;">Currently Reading Online (${activeReaders.length})</h3>
                   ${
                     activeReaders.length
                       ? activeReaders
                           .map(
                             (r) =>
                               `<div style="padding:0.5rem 0;border-bottom:1px solid #1e293b;font-size:0.88rem;"><strong>${r.user}</strong><div style="color:#34d399;">Reading: ${r.bookTitle} <small style="color:#94a3b8;">(${r.time})</small></div></div>`
                           )
                           .join("")
                       : `<p style="color:#94a3b8;font-size:0.88rem;margin:0;">Nobody is reading online right now.</p>`
                   }
                 </div>

                 <div style="grid-column:1 / -1;padding:1rem;border-radius:10px;background:#0f1420;border:1px solid #26334d;">
                   <h3 style="margin:0 0 0.65rem;font-size:1rem;">Live Site Progress & Activity Log (${state.stats.events.length})</h3>
                   <div style="max-height:260px;overflow-y:auto;display:flex;flex-direction:column;gap:0.4rem;">
                     ${
                       state.stats.events.length
                         ? state.stats.events
                             .slice(0, 25)
                             .map(
                               (ev) =>
                                 `<div style="padding:0.5rem 0.7rem;border-radius:8px;background:#161d2e;font-size:0.85rem;"><span style="color:#f472b6;font-weight:700;">[${ev.type}]</span> <strong>${ev.actor}</strong> — ${ev.detail} <small style="color:#94a3b8;">(${ev.time})</small></div>`
                             )
                             .join("")
                         : `<p style="color:#94a3b8;font-size:0.88rem;margin:0;">No activity recorded yet.</p>`
                     }
                   </div>
                 </div>
               </div>`
            : ""
        }

        ${
          ownerTab === "books"
            ? `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(310px,1fr));gap:1rem;">
                 <form id="owner-add-book" style="display:flex;flex-direction:column;gap:0.6rem;padding:1rem;border-radius:10px;background:#0f1420;border:1px solid #26334d;">
                   <h3 style="margin:0;font-size:1rem;">Publish New Book to Vault</h3>
                   <input id="ob-title" type="text" required placeholder="Book Title" style="padding:0.55rem;border-radius:8px;border:1px solid #334155;background:#161d2e;color:#fff;" />
                   <input id="ob-cat" type="text" required placeholder="Category (e.g. Romance, Sci-Fi, Mystery)" style="padding:0.55rem;border-radius:8px;border:1px solid #334155;background:#161d2e;color:#fff;" />
                   <input id="ob-tags" type="text" placeholder="Tags separated by commas (e.g. campus, drama)" style="padding:0.55rem;border-radius:8px;border:1px solid #334155;background:#161d2e;color:#fff;" />
                   <input id="ob-sum" type="text" required placeholder="Short Summary" style="padding:0.55rem;border-radius:8px;border:1px solid #334155;background:#161d2e;color:#fff;" />
                   <textarea id="ob-chapter" rows="5" placeholder="Optional Chapter 1 text (leave blank to auto-draft full Chapter 1)" style="padding:0.55rem;border-radius:8px;border:1px solid #334155;background:#161d2e;color:#fff;"></textarea>
                   <button type="submit" style="padding:0.6rem;border-radius:8px;border:none;background:#3b82f6;color:#fff;font-weight:700;cursor:pointer;">Publish Book</button>
                 </form>

                 <div style="padding:1rem;border-radius:10px;background:#0f1420;border:1px solid #26334d;">
                   <h3 style="margin:0 0 0.65rem;font-size:1rem;">Published Books (${state.books.length})</h3>
                   <div style="max-height:380px;overflow-y:auto;display:flex;flex-direction:column;gap:0.45rem;">
                     ${state.books
                       .map(
                         (b, idx) =>
                           `<div style="display:flex;justify-content:space-between;align-items:center;gap:0.5rem;padding:0.55rem 0.7rem;border-radius:8px;background:#161d2e;font-size:0.86rem;">
                              <div><strong>${b.title}</strong> <small style="color:#93c5fd;">(${b.category})</small><div style="color:#94a3b8;font-size:0.78rem;">${b.pdfPath}</div></div>
                              <div style="display:flex;gap:0.35rem;">
                                <button type="button" data-open-book="${b.id}" style="padding:0.3rem 0.6rem;border-radius:6px;border:none;background:#3b82f6;color:#fff;cursor:pointer;">Preview</button>
                                <button type="button" data-del-book="${idx}" style="padding:0.3rem 0.6rem;border-radius:6px;border:1px solid #475569;background:transparent;color:#fca5a5;cursor:pointer;">Delete</button>
                              </div>
                            </div>`
                       )
                       .join("")}
                   </div>
                 </div>
               </div>`
            : ""
        }

        ${
          ownerTab === "news"
            ? `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:1rem;">
                 <form id="owner-post-news" style="display:flex;flex-direction:column;gap:0.6rem;padding:1rem;border-radius:10px;background:#0f1420;border:1px solid #26334d;">
                   <h3 style="margin:0;font-size:1rem;">Post News Announcement</h3>
                   <input id="news-title" type="text" required placeholder="Headline (e.g. New Chapter Out Now!)" style="padding:0.55rem;border-radius:8px;border:1px solid #334155;background:#161d2e;color:#fff;" />
                   <textarea id="news-body" rows="4" required placeholder="Write announcement for readers..." style="padding:0.55rem;border-radius:8px;border:1px solid #334155;background:#161d2e;color:#fff;"></textarea>
                   <button type="submit" style="padding:0.6rem;border-radius:8px;border:none;background:#ec4899;color:#fff;font-weight:700;cursor:pointer;">Publish News</button>
                 </form>

                 <div style="padding:1rem;border-radius:10px;background:#0f1420;border:1px solid #26334d;">
                   <h3 style="margin:0 0 0.65rem;font-size:1rem;">Posted News (${state.news.length})</h3>
                   ${
                     state.news.length
                       ? state.news
                           .map(
                             (n, idx) =>
                               `<div style="padding:0.7rem;border-radius:8px;background:#161d2e;border-left:4px solid #ec4899;margin-bottom:0.5rem;">
                                  <div style="display:flex;justify-content:space-between;align-items:center;"><strong>${n.title}</strong><button type="button" data-del-news="${idx}" style="padding:0.2rem 0.55rem;border-radius:6px;border:1px solid #475569;background:transparent;color:#fca5a5;cursor:pointer;">Delete</button></div>
                                  <small style="color:#94a3b8;">${n.date}</small>
                                  <p style="margin:0.35rem 0 0;font-size:0.88rem;">${n.text}</p>
                                </div>`
                           )
                           .join("")
                       : `<p style="color:#94a3b8;font-size:0.88rem;">No news posted yet.</p>`
                   }
                 </div>
               </div>`
            : ""
        }

        ${
          ownerTab === "readers"
            ? `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:1rem;">
                 <div style="padding:1rem;border-radius:10px;background:#0f1420;border:1px solid #26334d;">
                   <h3 style="margin:0 0 0.65rem;font-size:1rem;">Signed-Up & Logged-In Accounts (${state.accounts.length})</h3>
                   ${
                     state.accounts.length
                       ? state.accounts
                           .map((a) => {
                             const v = state.stats.visits[a.email.toLowerCase()];
                             return `<div style="padding:0.65rem;border-radius:8px;background:#161d2e;margin-bottom:0.45rem;font-size:0.88rem;">
                                       <strong>${a.name}</strong> · <span style="color:#93c5fd;">${a.email}</span>
                                       <div style="color:#94a3b8;font-size:0.8rem;">Joined: ${a.joined || "Recorded"} · Logins/Visits: ${v ? v.count : 1} ${v ? `· Last seen: ${v.lastSeen}` : ""}</div>
                                     </div>`;
                           })
                           .join("")
                       : `<p style="color:#94a3b8;font-size:0.88rem;">No readers have signed up yet.</p>`
                   }
                 </div>

                 <div style="padding:1rem;border-radius:10px;background:#0f1420;border:1px solid #26334d;">
                   <h3 style="margin:0 0 0.65rem;font-size:1rem;">Frequent Visitors Ranking (${visitList.length})</h3>
                   ${
                     visitList.length
                       ? visitList
                           .map(
                             (v, idx) =>
                               `<div style="padding:0.65rem;border-radius:8px;background:#161d2e;margin-bottom:0.45rem;font-size:0.88rem;">
                                  <strong>#${idx + 1} ${v.name}</strong> (${v.email})
                                  <div style="color:#fbbf24;font-size:0.82rem;">Total Visits: ${v.count} · Last Active: ${v.lastSeen}</div>
                                </div>`
                           )
                           .join("")
                       : `<p style="color:#94a3b8;font-size:0.88rem;">No visit frequency data yet.</p>`
                   }
                 </div>
               </div>`
            : ""
        }

        ${
          ownerTab === "orders"
            ? `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:1rem;">
                 <div style="padding:1rem;border-radius:10px;background:#0f1420;border:1px solid #26334d;">
                   <h3 style="margin:0 0 0.65rem;font-size:1rem;">Books Added to Cart (${state.stats.cartAdds.length})</h3>
                   ${
                     state.stats.cartAdds.length
                       ? state.stats.cartAdds
                           .map(
                             (c) =>
                               `<div style="padding:0.65rem;border-radius:8px;background:#161d2e;margin-bottom:0.45rem;font-size:0.88rem;">
                                  <strong>${c.bookTitle}</strong>
                                  <div style="color:#93c5fd;font-size:0.82rem;">Added by: ${c.user} · ${c.time}</div>
                                </div>`
                           )
                           .join("")
                       : `<p style="color:#94a3b8;font-size:0.88rem;">No books added to cart yet.</p>`
                   }
                 </div>

                 <div style="padding:1rem;border-radius:10px;background:#0f1420;border:1px solid #26334d;">
                   <h3 style="margin:0 0 0.65rem;font-size:1rem;">Placed Orders (${state.orders.length}) & PDF Downloads (${state.stats.downloads.length})</h3>
                   ${state.orders
                     .map(
                       (o) =>
                         `<div style="padding:0.65rem;border-radius:8px;background:#161d2e;margin-bottom:0.45rem;font-size:0.88rem;">
                            <strong>Order #${o.id}</strong> (${o.readerName || "Reader"} · ${o.readerEmail || ""})
                            <div style="color:#34d399;font-size:0.82rem;">Books: ${o.items.map((i) => i.title).join(", ")} · ${o.date}</div>
                          </div>`
                     )
                     .join("")}
                   ${state.stats.downloads
                     .slice(0, 10)
                     .map(
                       (d) =>
                         `<div style="padding:0.55rem;border-radius:8px;background:#161d2e;margin-bottom:0.4rem;font-size:0.84rem;">
                            <strong>PDF Download:</strong> ${d.bookTitle} <small style="color:#94a3b8;">by ${d.user} (${d.time})</small>
                          </div>`
                     )
                     .join("")}
                   ${!state.orders.length && !state.stats.downloads.length ? `<p style="color:#94a3b8;font-size:0.88rem;">No orders or downloads yet.</p>` : ""}
                 </div>
               </div>`
            : ""
        }

        ${
          ownerTab === "comments"
            ? `<div style="padding:1rem;border-radius:10px;background:#0f1420;border:1px solid #26334d;">
                 <h3 style="margin:0 0 0.65rem;font-size:1rem;">All Reader Comments (${state.comments.length})</h3>
                 ${
                   state.comments.length
                     ? state.comments
                         .map((c, idx) => {
                           const bk = state.books.find((b) => b.id === c.bookId);
                           return `<div style="display:flex;justify-content:space-between;align-items:flex-start;gap:0.6rem;padding:0.7rem;border-radius:8px;background:#161d2e;margin-bottom:0.45rem;">
                                     <div style="font-size:0.88rem;">
                                       <span style="color:#93c5fd;font-weight:700;">${bk ? bk.title : c.bookId}</span> · <strong>${c.user}</strong> <small style="color:#94a3b8;">(${c.time})</small>
                                       <p style="margin:0.3rem 0 0;">${c.text}</p>
                                     </div>
                                     <button type="button" data-del-comment="${idx}" style="padding:0.25rem 0.6rem;border-radius:6px;border:1px solid #475569;background:transparent;color:#fca5a5;cursor:pointer;">Delete</button>
                                   </div>`;
                         })
                         .join("")
                     : `<p style="color:#94a3b8;font-size:0.88rem;">No reader comments yet.</p>`
                 }
               </div>`
            : ""
        }

        ${
          ownerTab === "requests"
            ? `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:1rem;">
                 <div style="padding:1rem;border-radius:10px;background:#0f1420;border:1px solid #26334d;">
                   <h3 style="margin:0 0 0.65rem;font-size:1rem;">Reader Book Requests (${state.requests.length})</h3>
                   ${
                     state.requests.length
                       ? state.requests
                           .map(
                             (r, idx) =>
                               `<div style="padding:0.7rem;border-radius:8px;background:#161d2e;margin-bottom:0.5rem;font-size:0.88rem;">
                                  <div style="display:flex;justify-content:space-between;align-items:center;">
                                    <strong>${r.title}</strong>
                                    <button type="button" data-toggle-req="${idx}" style="padding:0.25rem 0.6rem;border-radius:6px;border:none;background:${r.fulfilled ? "#10b981" : "#3b82f6"};color:#fff;cursor:pointer;">${r.fulfilled ? "Fulfilled ✓" : "Mark Fulfilled"}</button>
                                  </div>
                                  <div style="color:#94a3b8;font-size:0.82rem;">Category: ${r.category} · Requested by: ${r.user}</div>
                                </div>`
                           )
                           .join("")
                       : `<p style="color:#94a3b8;font-size:0.88rem;">No book requests yet.</p>`
                   }
                 </div>

                 <div style="padding:1rem;border-radius:10px;background:#0f1420;border:1px solid #26334d;">
                   <h3 style="margin:0 0 0.65rem;font-size:1rem;">Reader Direct Messages (${state.dms.length})</h3>
                   ${
                     state.dms.length
                       ? state.dms
                           .map(
                             (dm, idx) =>
                               `<div style="padding:0.7rem;border-radius:8px;background:#161d2e;margin-bottom:0.5rem;font-size:0.88rem;">
                                  <strong>${dm.subject}</strong> <small style="color:#94a3b8;">from ${dm.name} (${dm.email}) · ${dm.time}</small>
                                  <p style="margin:0.35rem 0;">${dm.message}</p>
                                  ${dm.reply ? `<div style="color:#34d399;font-size:0.82rem;margin-bottom:0.35rem;">Owner Reply: ${dm.reply}</div>` : ""}
                                  <div style="display:flex;gap:0.4rem;">
                                    <input type="text" id="dm-reply-input-${idx}" placeholder="Write reply..." style="flex:1;padding:0.35rem;border-radius:6px;border:1px solid #334155;background:#0f1420;color:#fff;" />
                                    <button type="button" data-reply-dm="${idx}" style="padding:0.35rem 0.65rem;border-radius:6px;border:none;background:#3b82f6;color:#fff;cursor:pointer;">Reply</button>
                                  </div>
                                </div>`
                           )
                           .join("")
                       : `<p style="color:#94a3b8;font-size:0.88rem;">No messages yet.</p>`
                   }
                 </div>
               </div>`
            : ""
        }
      </div>
    `;

    document.getElementById("owner-go-site").onclick = () => {
      activeView = "home";
      render();
    };

    stage.querySelectorAll("[data-owner-tab]").forEach((btn) => {
      btn.onclick = () => {
        ownerTab = btn.dataset.ownerTab;
        renderOwnerDashboard();
      };
    });

    const addBookForm = document.getElementById("owner-add-book");
    if (addBookForm) {
      addBookForm.onsubmit = (e) => {
        e.preventDefault();
        const title = document.getElementById("ob-title").value.trim();
        const category = document.getElementById("ob-cat").value.trim();
        const rawTags = document.getElementById("ob-tags").value.trim();
        const summary = document.getElementById("ob-sum").value.trim();
        const customChapter = document.getElementById("ob-chapter").value.trim();
        const tags = rawTags
          ? rawTags.split(",").map((t) => t.trim().toLowerCase()).filter(Boolean)
          : [category.toLowerCase()];

        const newBook = {
          id: title.toLowerCase().replace(/[^a-z0-9]+/g, "-") + "-" + Date.now(),
          title,
          category,
          tags,
          summary,
          chapter: customChapter ? `Chapter 1\n\n${customChapter}` : `Chapter 1\n\n${summary}`,
          fullChapter: customChapter ? `Chapter 1\n\n${customChapter}` : "",
          pdfPath: makePdfPath(title)
        };

        state.books.unshift(newBook);
        recordEvent("publish_book", `${title} (${category})`);
        save();
        notify(`Published "${title}" — now live for all readers!`);
        renderOwnerDashboard();
      };
    }

    stage.querySelectorAll("[data-del-book]").forEach((btn) => {
      btn.onclick = () => {
        const idx = Number(btn.dataset.delBook);
        const removed = state.books.splice(idx, 1)[0];
        if (removed) recordEvent("delete_book", removed.title);
        save();
        renderOwnerDashboard();
      };
    });

    const newsForm = document.getElementById("owner-post-news");
    if (newsForm) {
      newsForm.onsubmit = (e) => {
        e.preventDefault();
        const title = document.getElementById("news-title").value.trim();
        const text = document.getElementById("news-body").value.trim();
        state.news.unshift({
          id: "n-" + Date.now(),
          title,
          text,
          date: new Date().toLocaleString()
        });
        recordEvent("post_news", title);
        save();
        notify("News published to the site!");
        renderOwnerDashboard();
      };
    }

    stage.querySelectorAll("[data-del-news]").forEach((btn) => {
      btn.onclick = () => {
        state.news.splice(Number(btn.dataset.delNews), 1);
        save();
        renderOwnerDashboard();
      };
    });

    stage.querySelectorAll("[data-del-comment]").forEach((btn) => {
      btn.onclick = () => {
        state.comments.splice(Number(btn.dataset.delComment), 1);
        save();
        renderOwnerDashboard();
      };
    });

    stage.querySelectorAll("[data-toggle-req]").forEach((btn) => {
      btn.onclick = () => {
        const req = state.requests[Number(btn.dataset.toggleReq)];
        if (req) req.fulfilled = !req.fulfilled;
        save();
        renderOwnerDashboard();
      };
    });

    stage.querySelectorAll("[data-reply-dm]").forEach((btn) => {
      btn.onclick = () => {
        const idx = Number(btn.dataset.replyDm);
        const input = document.getElementById(`dm-reply-input-${idx}`);
        if (!input || !input.value.trim()) return;
        state.dms[idx].reply = input.value.trim();
        save();
        notify("Reply saved.");
        renderOwnerDashboard();
      };
    });
  }

  function render() {
    syncHeader();
    buildSidebar();

    if (activeView === "owner" && !isOwner()) {
      activeView = "home";
    }
    if (activeView === "auth") {
      renderAuthView();
      return;
    }
    if (activeView === "owner") {
      renderOwnerDashboard();
      return;
    }

    const stage = getStage();
    const latestNews = state.news[0];
    const visitorLabel = state.session ? state.session.name.toUpperCase() : "READER";

    if (activeView === "home") {
      stage.innerHTML = `
        <div style="padding:1.5rem;border-radius:14px;background:#161d2e;border:1px solid #2b3854;color:#f8fafc;">
          ${isOwner() ? `<button type="button" id="back-to-owner-dash" style="margin-bottom:0.85rem;padding:0.45rem 0.85rem;border-radius:8px;border:none;background:#ec4899;color:#fff;font-weight:700;cursor:pointer;">← Back to Owner Dashboard</button>` : ""}
          <p style="margin:0;color:#93c5fd;font-size:0.85rem;">WELCOME, ${visitorLabel}</p>
          <h2 style="margin:0.35rem 0 0.6rem;">Golden Ink Press</h2>
          <p style="margin:0 0 1rem;color:#cbd5e1;">Open the menu (☰) to explore <strong>Vault</strong> categories, <strong>Search</strong>, or <strong>Browse</strong>.</p>
          <div style="display:flex;gap:0.6rem;flex-wrap:wrap;margin-bottom:1.1rem;">
            <button type="button" id="home-open-vault" style="padding:0.55rem 1rem;border-radius:8px;border:none;background:#3b82f6;color:#fff;font-weight:700;cursor:pointer;">Open Vault</button>
            <button type="button" id="home-open-browse" style="padding:0.55rem 1rem;border-radius:8px;border:1px solid #334155;background:#0f1420;color:#fff;cursor:pointer;">Browse Works</button>
          </div>
          ${latestNews ? `<div style="padding:0.85rem;border-radius:10px;background:#0f1420;border-left:4px solid #ec4899;"><strong>News: ${latestNews.title}</strong> <small style="color:#94a3b8;">· ${latestNews.date}</small><p style="margin:0.35rem 0 0;font-size:0.9rem;">${latestNews.text}</p></div>` : ""}
        </div>
      `;
      const backDash = document.getElementById("back-to-owner-dash");
      if (backDash) backDash.onclick = () => { activeView = "owner"; render(); };
      document.getElementById("home-open-vault").onclick = () => { activeView = "vault-cats"; render(); };
      document.getElementById("home-open-browse").onclick = () => { activeView = "browse"; render(); };
      return;
    }

    if (activeView === "vault-cats") {
      const categories = [...new Set(state.books.map((b) => b.category))];
      stage.innerHTML = `
        <div style="padding:1.25rem;border-radius:14px;background:#161d2e;border:1px solid #2b3854;color:#f8fafc;">
          <h2 style="margin:0 0 0.85rem;">Vault — Categories</h2>
          <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(190px,1fr));gap:0.75rem;">
            ${categories.map((cat) => `<button type="button" data-cat="${cat}" style="padding:1rem;border-radius:10px;border:1px solid #334155;background:#0f1420;color:#fff;text-align:left;cursor:pointer;font-weight:600;">${cat} <small style="display:block;color:#94a3b8;font-weight:400;margin-top:0.25rem;">${state.books.filter((b) => b.category === cat).length} books</small></button>`).join("")}
          </div>
        </div>
      `;
      stage.querySelectorAll("[data-cat]").forEach((btn) => {
        btn.onclick = () => { selectedCategory = btn.dataset.cat; activeView = "vault-books"; render(); };
      });
      return;
    }

    if (activeView === "vault-books") {
      const booksInCat = state.books.filter((b) => b.category === selectedCategory);
      stage.innerHTML = `
        <div style="padding:1.25rem;border-radius:14px;background:#161d2e;border:1px solid #2b3854;color:#f8fafc;">
          <button type="button" id="back-to-cats" style="margin-bottom:0.85rem;padding:0.4rem 0.75rem;border-radius:8px;border:1px solid #334155;background:#0f1420;color:#fff;cursor:pointer;">← Categories</button>
          <h2 style="margin:0 0 0.85rem;">${selectedCategory}</h2>
          <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:0.75rem;">
            ${booksInCat.map((b) => `<div style="padding:0.9rem;border-radius:10px;background:#0f1420;border:1px solid #26334d;"><h3 style="margin:0 0 0.4rem;font-size:1.05rem;">${b.title}</h3><p style="margin:0 0 0.75rem;font-size:0.86rem;color:#cbd5e1;">${b.summary}</p><button type="button" data-open-book="${b.id}" style="padding:0.45rem 0.8rem;border-radius:8px;border:none;background:#3b82f6;color:#fff;cursor:pointer;">Open Book</button></div>`).join("")}
          </div>
        </div>
      `;
      document.getElementById("back-to-cats").onclick = () => { activeView = "vault-cats"; render(); };
      return;
    }

    if (activeView === "book-detail") {
      const book = state.books.find((b) => b.id === selectedBookId) || state.books[0];
      const bookReacts = state.reactions[book.id] || { love: 0, fire: 0, sad: 0, clap: 0 };
      const bookComments = state.comments.filter((c) => c.bookId === book.id);
      const isBookmarked = state.session && state.bookmarks.some((bm) => bm.email === state.session.email && bm.bookId === book.id);

      stage.innerHTML = `
        <div style="padding:1.35rem;border-radius:14px;background:#161d2e;border:1px solid #2b3854;color:#f8fafc;">
          <button type="button" id="back-to-shelf" style="margin-bottom:0.85rem;padding:0.4rem 0.75rem;border-radius:8px;border:1px solid #334155;background:#0f1420;color:#fff;cursor:pointer;">← Back</button>
          <p style="margin:0;color:#93c5fd;font-size:0.82rem;">${book.category} · Tags: ${book.tags.join(", ")}</p>
          <h2 style="margin:0.25rem 0 0.6rem;">${book.title}</h2>
          <p style="margin:0 0 0.85rem;color:#e2e8f0;line-height:1.55;">${book.summary}</p>
          <p style="margin:0 0 1rem;font-size:0.82rem;color:#94a3b8;">File: <code>${book.pdfPath}</code></p>

          <div style="display:flex;gap:0.6rem;flex-wrap:wrap;margin-bottom:1.1rem;">
            <button type="button" id="btn-dl-pdf" style="padding:0.55rem 0.95rem;border-radius:8px;border:none;background:#ec4899;color:#fff;font-weight:700;cursor:pointer;">Download PDF</button>
            <button type="button" id="btn-read-online" style="padding:0.55rem 0.95rem;border-radius:8px;border:none;background:#3b82f6;color:#fff;font-weight:700;cursor:pointer;">Read Online</button>
            <button type="button" id="btn-add-cart" style="padding:0.55rem 0.95rem;border-radius:8px;border:1px solid #60a5fa;background:transparent;color:#93c5fd;font-weight:600;cursor:pointer;">Add to Cart</button>
            <button type="button" id="btn-bookmark" style="padding:0.55rem 0.95rem;border-radius:8px;border:1px solid #f59e0b;background:${isBookmarked ? "#f59e0b" : "transparent"};color:${isBookmarked ? "#0f1420" : "#fcd34d"};font-weight:700;cursor:pointer;">${isBookmarked ? "Bookmarked" : "Bookmark"}</button>
          </div>

          <div style="display:flex;gap:0.5rem;flex-wrap:wrap;align-items:center;margin-bottom:1.1rem;">
            <button type="button" data-react="love" style="padding:0.4rem 0.75rem;border-radius:8px;border:1px solid #334155;background:#0f1420;color:#fff;cursor:pointer;">❤️ ${bookReacts.love}</button>
            <button type="button" data-react="fire" style="padding:0.4rem 0.75rem;border-radius:8px;border:1px solid #334155;background:#0f1420;color:#fff;cursor:pointer;">🔥 ${bookReacts.fire}</button>
            <button type="button" data-react="sad" style="padding:0.4rem 0.75rem;border-radius:8px;border:1px solid #334155;background:#0f1420;color:#fff;cursor:pointer;">😢 ${bookReacts.sad}</button>
            <button type="button" data-react="clap" style="padding:0.4rem 0.75rem;border-radius:8px;border:1px solid #334155;background:#0f1420;color:#fff;cursor:pointer;">👏 ${bookReacts.clap}</button>
          </div>

          <div style="border-top:1px solid #2b3854;padding-top:1rem;">
            <h3 style="margin:0 0 0.6rem;font-size:1rem;">Comments (${bookComments.length})</h3>
            <form id="detail-comment-form" style="display:flex;gap:0.5rem;margin-bottom:0.85rem;">
              <input id="detail-comment-text" type="text" required placeholder="Leave a comment..." style="flex:1;padding:0.5rem;border-radius:8px;border:1px solid #334155;background:#0f1420;color:#fff;" />
              <button type="submit" style="padding:0.5rem 0.9rem;border-radius:8px;border:none;background:#3b82f6;color:#fff;font-weight:600;cursor:pointer;">Comment</button>
            </form>
            <div style="display:flex;flex-direction:column;gap:0.45rem;">
              ${bookComments.length ? bookComments.map((c) => `<div style="padding:0.55rem 0.75rem;border-radius:8px;background:#0f1420;font-size:0.88rem;"><strong>${c.user}:</strong> ${c.text} <small style="color:#94a3b8;">(${c.time})</small></div>`).join("") : `<p style="color:#94a3b8;font-size:0.88rem;">No comments yet.</p>`}
            </div>
          </div>
        </div>
      `;

      document.getElementById("back-to-shelf").onclick = () => { activeView = selectedCategory ? "vault-books" : "vault-cats"; render(); };
      document.getElementById("btn-dl-pdf").onclick = () => downloadBookPdf(book);
      document.getElementById("btn-bookmark").onclick = () => {
        if (!requireAccount("signup", () => openBook(book.id))) return;
        const idx = state.bookmarks.findIndex((bm) => bm.email === state.session.email && bm.bookId === book.id);
        if (idx >= 0) state.bookmarks.splice(idx, 1);
        else state.bookmarks.push({ email: state.session.email, bookId: book.id, title: book.title });
        save();
        render();
      };
      document.getElementById("btn-read-online").onclick = () => {
        if (state.session) {
          state.stats.currentlyReading[state.session.email] = { user: `${state.session.name} (${state.session.email})`, bookTitle: book.title, time: new Date().toLocaleString() };
        }
        recordEvent("read_online", book.title);
        save();
        activeView = "read-book";
        render();
      };
      document.getElementById("btn-add-cart").onclick = () => {
        if (!requireAccount("signup")) return;
        if (!state.cart.some((item) => item.id === book.id)) {
          state.cart.push({ id: book.id, title: book.title, pdfPath: book.pdfPath });
          state.stats.cartAdds.unshift({ bookTitle: book.title, user: `${state.session.name} (${state.session.email})`, time: new Date().toLocaleString() });
          recordEvent("add_to_cart", book.title);
          save();
        }
        syncHeader();
        notify(`Added "${book.title}" to cart.`);
      };
      stage.querySelectorAll("[data-react]").forEach((btn) => {
        btn.onclick = () => {
          const key = btn.dataset.react;
          state.reactions[book.id] = state.reactions[book.id] || { love: 0, fire: 0, sad: 0, clap: 0 };
          state.reactions[book.id][key] += 1;
          save();
          render();
        };
      });
      document.getElementById("detail-comment-form").onsubmit = (e) => {
        e.preventDefault();
        if (!requireAccount("signup")) return;
        const text = document.getElementById("detail-comment-text").value.trim();
        if (!text) return;
        state.comments.unshift({ bookId: book.id, user: state.session.name, text, time: new Date().toLocaleString() });
        recordEvent("comment", `${book.title}: "${text}"`);
        save();
        render();
      };
      return;
    }

    if (activeView === "read-book") {
      const book = state.books.find((b) => b.id === selectedBookId) || state.books[0];
      const chapterText = book.fullChapter || buildFullChapterOne(book);

      stage.innerHTML = `
        <div style="padding:1.35rem;border-radius:14px;background:#161d2e;border:1px solid #2b3854;color:#f8fafc;">
          <button type="button" id="back-detail" style="margin-bottom:0.85rem;padding:0.4rem 0.75rem;border-radius:8px;border:1px solid #334155;background:#0f1420;color:#fff;cursor:pointer;">← Book Info</button>
          <h2 style="margin:0 0 0.75rem;">${book.title}</h2>
          <div style="padding:1rem;border-radius:10px;background:#0f1420;line-height:1.7;white-space:pre-line;margin-bottom:1.1rem;">${chapterText}</div>
          <div style="display:flex;gap:0.5rem;flex-wrap:wrap;">
            <button type="button" id="read-dl-btn" style="padding:0.45rem 0.85rem;border-radius:8px;border:none;background:#ec4899;color:#fff;font-weight:600;cursor:pointer;">Download PDF</button>
            <button type="button" id="read-voice-btn" style="padding:0.45rem 0.85rem;border-radius:8px;border:none;background:#3b82f6;color:#fff;font-weight:600;cursor:pointer;">🔊 Read Aloud (Online)</button>
          </div>
        </div>
      `;
      document.getElementById("back-detail").onclick = () => {
        if ("speechSynthesis" in window) window.speechSynthesis.cancel();
        activeView = "book-detail";
        render();
      };
      document.getElementById("read-dl-btn").onclick = () => downloadBookPdf(book);
      document.getElementById("read-voice-btn").onclick = () => readBookOnlineVoice(book);
      return;
    }

    if (activeView === "search") {
      const q = searchQuery.trim().toLowerCase();
      const workMatches = q && (searchScope === "all" || searchScope === "works") ? state.books.filter((b) => b.title.toLowerCase().includes(q) || b.summary.toLowerCase().includes(q) || b.category.toLowerCase().includes(q)) : [];
      const tagMatches = q && (searchScope === "all" || searchScope === "tags") ? state.books.filter((b) => b.category.toLowerCase().includes(q) || b.tags.some((t) => t.toLowerCase().includes(q))) : [];
      const peoplePool = [{ name: "Golden Ink Press (Owner)", role: "Publisher" }, ...state.accounts.map((a) => ({ name: a.name, role: "Reader" }))];
      const peopleMatches = q && (searchScope === "all" || searchScope === "people") ? peoplePool.filter((p) => p.name.toLowerCase().includes(q)) : [];

      stage.innerHTML = `
        <div style="padding:1.25rem;border-radius:14px;background:#161d2e;border:1px solid #2b3854;color:#f8fafc;">
          <h2 style="margin:0 0 0.65rem;">Search</h2>
          <div style="display:flex;gap:0.45rem;flex-wrap:wrap;margin-bottom:0.75rem;">
            <button type="button" data-scope="all" style="padding:0.35rem 0.75rem;border-radius:7px;border:1px solid #334155;background:${searchScope === "all" ? "#3b82f6" : "#0f1420"};color:#fff;cursor:pointer;">All</button>
            <button type="button" data-scope="works" style="padding:0.35rem 0.75rem;border-radius:7px;border:1px solid #334155;background:${searchScope === "works" ? "#3b82f6" : "#0f1420"};color:#fff;cursor:pointer;">Works</button>
            <button type="button" data-scope="people" style="padding:0.35rem 0.75rem;border-radius:7px;border:1px solid #334155;background:${searchScope === "people" ? "#3b82f6" : "#0f1420"};color:#fff;cursor:pointer;">People</button>
            <button type="button" data-scope="tags" style="padding:0.35rem 0.75rem;border-radius:7px;border:1px solid #334155;background:${searchScope === "tags" ? "#3b82f6" : "#0f1420"};color:#fff;cursor:pointer;">Tags</button>
          </div>
          <input id="gip-search-input" type="text" value="${searchQuery}" placeholder="Search works, people, or tags..." style="width:100%;padding:0.6rem;border-radius:8px;border:1px solid #334155;background:#0f1420;color:#fff;margin-bottom:1rem;" />
          ${!q ? `<p style="color:#94a3b8;margin:0;">Type a book title, person name, or tag to search.</p>` : `
            <div style="display:flex;flex-direction:column;gap:1rem;">
              ${(searchScope === "all" || searchScope === "works") ? `<div><h3 style="margin:0 0 0.5rem;font-size:1rem;">Works (${workMatches.length})</h3>${workMatches.map((b) => `<div style="display:flex;justify-content:space-between;align-items:center;padding:0.65rem;border-radius:8px;background:#0f1420;margin-bottom:0.4rem;"><div><strong>${b.title}</strong> <small style="color:#93c5fd;">(${b.category})</small></div><button type="button" data-open-book="${b.id}" style="padding:0.35rem 0.7rem;border-radius:7px;border:none;background:#3b82f6;color:#fff;cursor:pointer;">Open</button></div>`).join("") || `<p style="color:#94a3b8;margin:0;font-size:0.88rem;">No matching works.</p>`}</div>` : ""}
              ${(searchScope === "all" || searchScope === "people") ? `<div><h3 style="margin:0 0 0.5rem;font-size:1rem;">People (${peopleMatches.length})</h3>${peopleMatches.map((p) => `<div style="padding:0.65rem;border-radius:8px;background:#0f1420;margin-bottom:0.4rem;"><strong>${p.name}</strong> <small style="color:#94a3b8;">· ${p.role}</small></div>`).join("") || `<p style="color:#94a3b8;margin:0;font-size:0.88rem;">No matching people.</p>`}</div>` : ""}
              ${(searchScope === "all" || searchScope === "tags") ? `<div><h3 style="margin:0 0 0.5rem;font-size:1rem;">Tags (${tagMatches.length})</h3>${tagMatches.map((b) => `<div style="display:flex;justify-content:space-between;align-items:center;padding:0.65rem;border-radius:8px;background:#0f1420;margin-bottom:0.4rem;"><div><strong>${b.title}</strong> <small style="color:#f472b6;">#${b.tags.join(" #")}</small></div><button type="button" data-open-book="${b.id}" style="padding:0.35rem 0.7rem;border-radius:7px;border:none;background:#3b82f6;color:#fff;cursor:pointer;">Open</button></div>`).join("") || `<p style="color:#94a3b8;margin:0;font-size:0.88rem;">No matching tags.</p>`}</div>` : ""}
            </div>
          `}
        </div>
      `;
      stage.querySelectorAll("[data-scope]").forEach((btn) => { btn.onclick = () => { searchScope = btn.dataset.scope; render(); }; });
      const inp = document.getElementById("gip-search-input");
      inp.oninput = () => {
        searchQuery = inp.value;
        render();
        const reInp = document.getElementById("gip-search-input");
        if (reInp) { reInp.focus(); reInp.setSelectionRange(reInp.value.length, reInp.value.length); }
      };
      return;
    }

    if (activeView === "browse") {
      const collections = [...new Set(state.books.map((b) => b.category))];
      stage.innerHTML = `
        <div style="padding:1.25rem;border-radius:14px;background:#161d2e;border:1px solid #2b3854;color:#f8fafc;">
          <h2 style="margin:0 0 0.65rem;">Browse</h2>
          <div style="display:flex;gap:0.5rem;margin-bottom:1rem;">
            <button type="button" id="browse-tab-works" style="padding:0.45rem 0.9rem;border-radius:8px;border:1px solid #334155;background:${browseTab === "works" ? "#3b82f6" : "#0f1420"};color:#fff;font-weight:600;cursor:pointer;">Works (${state.books.length})</button>
            <button type="button" id="browse-tab-cols" style="padding:0.45rem 0.9rem;border-radius:8px;border:1px solid #334155;background:${browseTab === "collections" ? "#3b82f6" : "#0f1420"};color:#fff;font-weight:600;cursor:pointer;">Collections (${collections.length})</button>
          </div>
          ${
            browseTab === "works"
              ? `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(225px,1fr));gap:0.75rem;">${state.books.map((b) => `<div style="padding:0.9rem;border-radius:10px;background:#0f1420;border:1px solid #26334d;"><small style="color:#93c5fd;">${b.category}</small><h3 style="margin:0.2rem 0 0.35rem;font-size:1rem;">${b.title}</h3><p style="margin:0 0 0.7rem;font-size:0.84rem;color:#cbd5e1;">${b.summary}</p><button type="button" data-open-book="${b.id}" style="padding:0.4rem 0.75rem;border-radius:8px;border:none;background:#3b82f6;color:#fff;cursor:pointer;">Open Book</button></div>`).join("")}</div>`
              : `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:0.75rem;">${collections.map((col) => `<button type="button" data-browse-col="${col}" style="padding:1rem;border-radius:10px;border:1px solid #334155;background:#0f1420;color:#fff;text-align:left;cursor:pointer;"><strong>${col} Collection</strong><small style="display:block;color:#94a3b8;margin-top:0.25rem;">${state.books.filter((b) => b.category === col).length} works</small></button>`).join("")}</div>`
          }
        </div>
      `;
      document.getElementById("browse-tab-works").onclick = () => { browseTab = "works"; render(); };
      document.getElementById("browse-tab-cols").onclick = () => { browseTab = "collections"; render(); };
      stage.querySelectorAll("[data-browse-col]").forEach((btn) => {
        btn.onclick = () => { selectedCategory = btn.dataset.browseCol; activeView = "vault-books"; render(); };
      });
      return;
    }

    if (activeView === "about-page") {
      stage.innerHTML = `
        <div style="padding:1.35rem;border-radius:14px;background:#161d2e;border:1px solid #2b3854;color:#f8fafc;display:flex;flex-direction:column;gap:1.5rem;">
          <section id="about-us-block"><h2 style="margin:0 0 0.5rem;">About Us</h2><p style="margin:0;color:#cbd5e1;">Golden Ink Press digital reading vault.</p></section>
          <section id="about-news-block" style="border-top:1px solid #2b3854;padding-top:1.1rem;"><h2 style="margin:0 0 0.65rem;">News</h2>${state.news.map((n) => `<div style="padding:0.85rem;border-radius:10px;background:#0f1420;border-left:4px solid #ec4899;margin-bottom:0.5rem;"><strong>${n.title}</strong> <small style="color:#94a3b8;">· ${n.date}</small><p style="margin:0.35rem 0 0;font-size:0.9rem;">${n.text}</p></div>`).join("")}</section>
          <section id="about-faq-block" style="border-top:1px solid #2b3854;padding-top:1.1rem;"><h2 style="margin:0 0 0.65rem;">FAQ</h2><div style="padding:0.85rem;border-radius:10px;background:#0f1420;"><strong>How do I read or order?</strong><p style="margin:0.35rem 0 0;color:#cbd5e1;font-size:0.9rem;">Open any book to read online, add to cart, or order from Cart.</p></div></section>
        </div>
      `;
      return;
    }

    if (activeView === "bookmarks") {
      const myBms = state.session ? state.bookmarks.filter((bm) => bm.email === state.session.email) : [];
      stage.innerHTML = `<div style="padding:1.25rem;border-radius:14px;background:#161d2e;border:1px solid #2b3854;color:#f8fafc;"><h2 style="margin:0 0 0.85rem;">My Bookmarks (${myBms.length})</h2>${myBms.map((bm) => `<div style="display:flex;justify-content:space-between;align-items:center;padding:0.75rem;border-radius:10px;background:#0f1420;margin-bottom:0.5rem;"><strong>${bm.title}</strong><button type="button" data-open-book="${bm.bookId}" style="padding:0.4rem 0.8rem;border-radius:8px;border:none;background:#3b82f6;color:#fff;cursor:pointer;">Open</button></div>`).join("") || `<p style="color:#94a3b8;">No bookmarks yet.</p>`}</div>`;
      return;
    }

    if (activeView === "stories") {
      stage.innerHTML = `<div style="padding:1.25rem;border-radius:14px;background:#161d2e;border:1px solid #2b3854;color:#f8fafc;"><h2 style="margin:0 0 0.6rem;">Stories (${state.stories.length})</h2>${state.stories.map((s) => `<div style="padding:0.85rem;border-radius:10px;background:#0f1420;margin-bottom:0.5rem;"><strong>${s.title}</strong> <small style="color:#94a3b8;">by ${s.author}</small><p style="margin:0.4rem 0 0;">${s.body}</p></div>`).join("") || `<p style="color:#94a3b8;">No stories yet.</p>`}</div>`;
      return;
    }

    if (activeView === "request") {
      stage.innerHTML = `
        <div style="padding:1.25rem;border-radius:14px;background:#161d2e;border:1px solid #2b3854;color:#f8fafc;">
          <h2 style="margin:0 0 0.5rem;">Request a Book</h2>
          <form id="book-request-form" style="display:flex;flex-direction:column;gap:0.65rem;max-width:500px;">
            <input id="req-title" type="text" required placeholder="Book title" style="padding:0.55rem;border-radius:8px;border:1px solid #334155;background:#0f1420;color:#fff;" />
            <input id="req-cat" type="text" required placeholder="Category" style="padding:0.55rem;border-radius:8px;border:1px solid #334155;background:#0f1420;color:#fff;" />
            <button type="submit" style="align-self:flex-start;padding:0.55rem 1rem;border-radius:8px;border:none;background:#ec4899;color:#fff;font-weight:700;cursor:pointer;">Send Request</button>
          </form>
        </div>
      `;
      document.getElementById("book-request-form").onsubmit = (e) => {
        e.preventDefault();
        if (!requireAccount("signup")) return;
        const reqTitle = document.getElementById("req-title").value.trim();
        const reqCat = document.getElementById("req-cat").value.trim();
        state.requests.unshift({ title: reqTitle, category: reqCat, user: `${state.session.name} (${state.session.email})`, fulfilled: false });
        recordEvent("book_request", `${reqTitle} (${reqCat})`);
        save();
        notify("Request sent to Owner.");
        render();
      };
      return;
    }

    if (activeView === "contact") {
      stage.innerHTML = `
        <div style="padding:1.25rem;border-radius:14px;background:#161d2e;border:1px solid #2b3854;color:#f8fafc;">
          <h2 style="margin:0 0 0.5rem;">Contact Owner</h2>
          <form id="dm-owner-form" style="display:flex;flex-direction:column;gap:0.65rem;max-width:500px;">
            <input id="dm-subject" type="text" required placeholder="Subject" style="padding:0.55rem;border-radius:8px;border:1px solid #334155;background:#0f1420;color:#fff;" />
            <textarea id="dm-msg" rows="4" required placeholder="Message..." style="padding:0.55rem;border-radius:8px;border:1px solid #334155;background:#0f1420;color:#fff;"></textarea>
            <button type="submit" style="align-self:flex-start;padding:0.55rem 1rem;border-radius:8px;border:none;background:#3b82f6;color:#fff;font-weight:700;cursor:pointer;">Send DM</button>
          </form>
        </div>
      `;
      document.getElementById("dm-owner-form").onsubmit = (e) => {
        e.preventDefault();
        if (!requireAccount("signup")) return;
        const subject = document.getElementById("dm-subject").value.trim();
        state.dms.unshift({ name: state.session.name, email: state.session.email, subject, message: document.getElementById("dm-msg").value.trim(), reply: "", time: new Date().toLocaleString() });
        recordEvent("dm_owner", subject);
        save();
        notify("DM sent.");
        render();
      };
      return;
    }

    if (activeView === "cart") {
      stage.innerHTML = `
        <div style="max-width:680px;margin:0 auto;padding:1.35rem;border-radius:14px;background:#161d2e;border:1px solid #2b3854;color:#f8fafc;">
          <h2 style="margin:0 0 0.85rem;">Cart Box (${state.cart.length})</h2>
          ${
            state.cart.length
              ? `<div style="display:flex;flex-direction:column;gap:0.6rem;margin-bottom:1.25rem;">
                   ${state.cart.map((item, idx) => `<div style="display:flex;justify-content:space-between;align-items:center;gap:0.5rem;padding:0.75rem;border-radius:10px;background:#0f1420;border:1px solid #26334d;"><div><strong>${item.title}</strong><div style="font-size:0.8rem;color:#94a3b8;">${item.pdfPath}</div></div><div style="display:flex;gap:0.4rem;"><button type="button" data-open-book="${item.id}" style="padding:0.35rem 0.7rem;border-radius:7px;border:none;background:#3b82f6;color:#fff;cursor:pointer;">Go to Book</button><button type="button" data-cart-rm="${idx}" style="padding:0.35rem 0.7rem;border-radius:7px;border:1px solid #475569;background:transparent;color:#fca5a5;cursor:pointer;">Remove</button></div></div>`).join("")}
                 </div>
                 <form id="cart-order-form" style="padding:1rem;border-radius:12px;background:#0f1420;border:1px solid #26334d;display:flex;flex-direction:column;gap:0.7rem;">
                   <h3 style="margin:0;font-size:1rem;">Order Details</h3>
                   <input id="ord-name" type="text" required value="${state.session ? state.session.name : ""}" placeholder="Reader full name" style="padding:0.55rem;border-radius:8px;border:1px solid #334155;background:#161d2e;color:#fff;" />
                   <input id="ord-email" type="email" required value="${state.session ? state.session.email : ""}" placeholder="Email address" style="padding:0.55rem;border-radius:8px;border:1px solid #334155;background:#161d2e;color:#fff;" />
                   <button type="submit" style="padding:0.65rem 1.1rem;border-radius:8px;border:none;background:#ec4899;color:#fff;font-weight:700;cursor:pointer;">Place Order (${state.cart.length})</button>
                 </form>`
              : `<p style="color:#94a3b8;">Your cart box is empty. Open a book and click <strong>Add to Cart</strong>.</p>`
          }
          ${state.orders.length ? `<div style="margin-top:1.25rem;"><h3>Placed Orders (${state.orders.length})</h3>${state.orders.map((o) => `<div style="padding:0.7rem;border-radius:8px;background:#0f1420;margin-bottom:0.4rem;font-size:0.88rem;"><strong>Order #${o.id}</strong> · ${o.items.map((i) => i.title).join(", ")}</div>`).join("")}</div>` : ""}
        </div>
      `;
      stage.querySelectorAll("[data-cart-rm]").forEach((btn) => {
        btn.onclick = () => { state.cart.splice(Number(btn.dataset.cartRm), 1); save(); render(); };
      });
      const orderForm = document.getElementById("cart-order-form");
      if (orderForm) {
        orderForm.onsubmit = (e) => {
          e.preventDefault();
          if (!requireAccount("signup")) return;
          const readerName = document.getElementById("ord-name").value.trim();
          const readerEmail = document.getElementById("ord-email").value.trim();
          const newOrder = { id: String(Date.now()).slice(-6), readerName, readerEmail, items: [...state.cart], date: new Date().toLocaleString() };
          state.orders.unshift(newOrder);
          recordEvent("place_order", `Order #${newOrder.id} (${newOrder.items.map((i) => i.title).join(", ")})`);
          state.cart = [];
          save();
          notify(`Order #${newOrder.id} placed!`);
          render();
        };
      }
      return;
    }
  }

  render();
});