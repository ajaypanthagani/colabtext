let uuid: string | null = null;
let username: string | null = null;

export const getShareableCode = (): string => {
  if (!uuid) {
    uuid = localStorage.getItem("shareableCode");

    if (!uuid) {
      uuid = crypto.randomUUID(); // Or use your own UUID generator
      localStorage.setItem("shareableCode", uuid);
      console.log("Generated and stored new UUID:", uuid);
    } else {
      console.log("Retrieved UUID from localStorage:", uuid);
    }
  }

  return uuid;
};

export const generateUsername = () => {
    const adjectives = ['Happy', 'Clever', 'Brave', 'Gentle', 'Wise', 'Swift', 'Bright', 'Calm', 'Kind', 'Proud'];
    const nouns = ['Fox', 'Bear', 'Eagle', 'Wolf', 'Lion', 'Tiger', 'Hawk', 'Owl', 'Deer', 'Horse'];
    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
    const randomNumber = Math.floor(Math.random() * 1000);
    return `${randomAdjective}${randomNoun}${randomNumber}`;
}

export const getUsername = () => {
    if (!username) {
        username = localStorage.getItem("username");
    
        if (!username) {
          username = generateUsername();
          localStorage.setItem("username", username);
        } else {
          console.log("Retrieved username from localStorage:", username);
        }
    }
    
    return username;
}
