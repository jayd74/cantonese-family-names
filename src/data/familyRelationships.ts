export interface FamilyRelationship {
  english: string;
  cantonese: string;
  pinyin?: string;
  yue?: string; // Colloquial Cantonese terms that differ from written form
  yuePinyin?: string;
  notes?: string;
  generation: number; // 0 = same generation, +1 = generation above, -1 = generation below
}

// Comprehensive list of family relationships in Cantonese
export const familyRelationships: FamilyRelationship[] = [
  // Grandparents' generation (paternal)
  { 
    english: "Paternal grandfather", 
    cantonese: "爺爺", 
    pinyin: "yé ye",
    yue: "阿爺",
    yuePinyin: "aa3 je4",
    generation: 2,
    notes: "Father's father" 
  },
  { 
    english: "Paternal grandmother", 
    cantonese: "嫲嫲", 
    pinyin: "maa4 maa4",
    yue: "阿嫲",
    yuePinyin: "aa3 maa4",
    generation: 2,
    notes: "Father's mother" 
  },
  
  // Grandparents' generation (maternal)
  { 
    english: "Maternal grandfather", 
    cantonese: "外公", 
    pinyin: "ngoi6 gung1",
    yue: "阿公",
    yuePinyin: "aa3 gung1",
    generation: 2,
    notes: "Mother's father" 
  },
  { 
    english: "Maternal grandmother", 
    cantonese: "外婆", 
    pinyin: "ngoi6 po4",
    yue: "阿婆",
    yuePinyin: "aa3 po4",
    generation: 2,
    notes: "Mother's mother" 
  },
  
  // Great grandparents
  { 
    english: "Great grandfather (paternal)", 
    cantonese: "太爺", 
    pinyin: "taai3 ye4",
    generation: 3,
    notes: "Father's father's father" 
  },
  { 
    english: "Great grandmother (paternal)", 
    cantonese: "太嫲", 
    pinyin: "taai3 maa4",
    generation: 3,
    notes: "Father's father's mother" 
  },
  { 
    english: "Great grandfather (maternal)", 
    cantonese: "太外公", 
    pinyin: "taai3 ngoi6 gung1",
    generation: 3,
    notes: "Mother's mother's father" 
  },
  { 
    english: "Great grandmother (maternal)", 
    cantonese: "太外婆", 
    pinyin: "taai3 ngoi6 po4",
    generation: 3,
    notes: "Mother's mother's mother" 
  },
  
  // Parents' generation
  { 
    english: "Father", 
    cantonese: "爸爸", 
    pinyin: "bà ba",
    yue: "老豆",
    yuePinyin: "lou5 dau6",
    generation: 1 
  },
  { 
    english: "Mother", 
    cantonese: "媽媽", 
    pinyin: "mā ma",
    yue: "老母",
    yuePinyin: "lou5 mou5",
    generation: 1 
  },
  { 
    english: "Father's elder brother", 
    cantonese: "伯父", 
    pinyin: "bó fù",
    yue: "阿伯",
    yuePinyin: "aa3 baak3",
    generation: 1,
    notes: "Paternal uncle (older than father)" 
  },
  { 
    english: "Father's elder brother's wife", 
    cantonese: "伯母", 
    pinyin: "baak3 mou5",
    generation: 1,
    notes: "Wife of father's elder brother" 
  },
  { 
    english: "Father's younger brother", 
    cantonese: "叔父", 
    pinyin: "suk1 fu6",
    yue: "阿叔",
    yuePinyin: "aa3 suk1",
    generation: 1,
    notes: "Paternal uncle (younger than father)" 
  },
  { 
    english: "Father's younger brother's wife", 
    cantonese: "嬸母", 
    pinyin: "sam2 mou5",
    generation: 1,
    notes: "Wife of father's younger brother" 
  },
  { 
    english: "Father's sister", 
    cantonese: "姑媽", 
    pinyin: "gu1 maa1",
    yue: "阿姑",
    yuePinyin: "aa3 gu1",
    generation: 1,
    notes: "Paternal aunt" 
  },
  { 
    english: "Father's sister's husband", 
    cantonese: "姑丈", 
    pinyin: "gu1 zoeng6",
    generation: 1,
    notes: "Husband of paternal aunt" 
  },
  { 
    english: "Mother's brother", 
    cantonese: "舅父", 
    pinyin: "jiù fù",
    yue: "阿舅",
    yuePinyin: "aa3 kau5",
    generation: 1,
    notes: "Maternal uncle" 
  },
  { 
    english: "Mother's brother's wife", 
    cantonese: "舅母", 
    pinyin: "kau5 mou5",
    generation: 1,
    notes: "Wife of maternal uncle" 
  },
  { 
    english: "Mother's sister", 
    cantonese: "姨媽", 
    pinyin: "ji4 maa1",
    yue: "阿姨",
    yuePinyin: "aa3 ji1",
    generation: 1,
    notes: "Maternal aunt" 
  },
  { 
    english: "Mother's sister's husband", 
    cantonese: "姨丈", 
    pinyin: "ji4 zoeng6",
    generation: 1,
    notes: "Husband of maternal aunt" 
  },
  
  // Same generation
  { 
    english: "Elder brother", 
    cantonese: "哥哥", 
    pinyin: "gē ge",
    yue: "大佬",
    yuePinyin: "daai6 lou2",
    generation: 0 
  },
  { 
    english: "Elder sister", 
    cantonese: "姐姐", 
    pinyin: "ze2 ze2",
    yue: "家姐",
    yuePinyin: "gaa1 ze1",
    generation: 0 
  },
  { 
    english: "Younger brother", 
    cantonese: "弟弟", 
    pinyin: "dai6 dai2",
    yue: "細佬",
    yuePinyin: "sai3 lou2",
    generation: 0 
  },
  { 
    english: "Younger sister", 
    cantonese: "妹妹", 
    pinyin: "mèi mei",
    yue: "阿妹",
    yuePinyin: "aa3 mui1",
    generation: 0 
  },
  
  // Paternal cousins - Father's brother's children (堂)
  { 
    english: "Male cousin (father's side, older)", 
    cantonese: "堂兄", 
    pinyin: "tong4 hing1",
    generation: 0,
    notes: "Father's brother's son who is older than you" 
  },
  { 
    english: "Male cousin (father's side, younger)", 
    cantonese: "堂弟", 
    pinyin: "tong4 dai6",
    generation: 0,
    notes: "Father's brother's son who is younger than you" 
  },
  { 
    english: "Female cousin (father's side, older)", 
    cantonese: "堂姐", 
    pinyin: "tong4 ze2",
    generation: 0,
    notes: "Father's brother's daughter who is older than you" 
  },
  { 
    english: "Female cousin (father's side, younger)", 
    cantonese: "堂妹", 
    pinyin: "tong4 mui6",
    generation: 0,
    notes: "Father's brother's daughter who is younger than you" 
  },
  
  // Other cousins - Father's sister's and mother's siblings' children (表)
  { 
    english: "Male cousin (any side, older)", 
    cantonese: "表兄", 
    pinyin: "biu2 hing1",
    generation: 0,
    notes: "Male cousin who is older than you, from father's or mother's side" 
  },
  { 
    english: "Male cousin (any side, younger)", 
    cantonese: "表弟", 
    pinyin: "biu2 dai6",
    generation: 0,
    notes: "Male cousin who is younger than you, from father's or mother's side" 
  },
  { 
    english: "Female cousin (any side, older)", 
    cantonese: "表姐", 
    pinyin: "biu2 ze2",
    generation: 0,
    notes: "Female cousin who is older than you, from father's or mother's side" 
  },
  { 
    english: "Female cousin (any side, younger)", 
    cantonese: "表妹", 
    pinyin: "biu2 mui6",
    generation: 0,
    notes: "Female cousin who is younger than you, from father's or mother's side" 
  },
  
  // Spouses of cousins
  { 
    english: "Male cousin's wife (any side)", 
    cantonese: "表嫂", 
    pinyin: "biu2 sou2",
    generation: 0,
    notes: "Wife of male cousin from father's or mother's side" 
  },
  { 
    english: "Female cousin's husband (any side)", 
    cantonese: "表姐夫", 
    pinyin: "biu2 ze2 fu1",
    generation: 0,
    notes: "Husband of female cousin from father's or mother's side" 
  },
  
  // Children of cousins
  { 
    english: "Paternal male cousin's son", 
    cantonese: "堂侄", 
    pinyin: "tong4 zat6",
    generation: -1,
    notes: "Son of father's brother's son (your male paternal cousin)" 
  },
  { 
    english: "Paternal male cousin's daughter", 
    cantonese: "堂侄女", 
    pinyin: "tong4 zat6 neoi5",
    generation: -1,
    notes: "Daughter of father's brother's son (your male paternal cousin)" 
  },
  { 
    english: "Paternal female cousin's son", 
    cantonese: "堂外甥", 
    pinyin: "tong4 ngoi6 saang1",
    generation: -1,
    notes: "Son of father's brother's daughter (your female paternal cousin)" 
  },
  { 
    english: "Paternal female cousin's daughter", 
    cantonese: "堂外甥女", 
    pinyin: "tong4 ngoi6 saang1 neoi5",
    generation: -1,
    notes: "Daughter of father's brother's daughter (your female paternal cousin)" 
  },
  { 
    english: "Other male cousin's son", 
    cantonese: "表侄", 
    pinyin: "biu2 zat6",
    generation: -1,
    notes: "Son of your male 'biu' cousin" 
  },
  { 
    english: "Other male cousin's daughter", 
    cantonese: "表侄女", 
    pinyin: "biu2 zat6 neoi5",
    generation: -1,
    notes: "Daughter of your male 'biu' cousin" 
  },
  { 
    english: "Other female cousin's son", 
    cantonese: "表外甥", 
    pinyin: "biu2 ngoi6 saang1",
    generation: -1,
    notes: "Son of your female 'biu' cousin" 
  },
  { 
    english: "Other female cousin's daughter", 
    cantonese: "表外甥女", 
    pinyin: "biu2 ngoi6 saang1 neoi5",
    generation: -1,
    notes: "Daughter of your female 'biu' cousin" 
  },
  
  // Spouses and in-laws (same generation)
  { 
    english: "Husband", 
    cantonese: "老公", 
    pinyin: "lou5 gung1",
    yue: "老公",
    yuePinyin: "lou5 gung1",
    generation: 0,
    notes: "Spouse (male)" 
  },
  { 
    english: "Wife", 
    cantonese: "老婆", 
    pinyin: "lou5 po4",
    yue: "老婆",
    yuePinyin: "lou5 po4",
    generation: 0,
    notes: "Spouse (female)" 
  },
  { 
    english: "Brother's wife", 
    cantonese: "嫂嫂", 
    pinyin: "sou2 sou2",
    generation: 0,
    notes: "Elder brother's wife" 
  },
  { 
    english: "Younger brother's wife", 
    cantonese: "弟婦", 
    pinyin: "dai6 fu5",
    generation: 0,
    notes: "Younger brother's wife" 
  },
  { 
    english: "Sister's husband", 
    cantonese: "姐夫", 
    pinyin: "ze2 fu1",
    generation: 0,
    notes: "Elder sister's husband" 
  },
  { 
    english: "Younger sister's husband", 
    cantonese: "妹夫", 
    pinyin: "mui6 fu1",
    generation: 0,
    notes: "Younger sister's husband" 
  },
  { 
    english: "Husband's elder brother", 
    cantonese: "大伯", 
    pinyin: "daai6 baak3",
    generation: 0,
    notes: "Husband's elder brother" 
  },
  { 
    english: "Husband's elder brother's wife", 
    cantonese: "大嫂", 
    pinyin: "daai6 sou2",
    generation: 0,
    notes: "Wife of husband's elder brother" 
  },
  { 
    english: "Husband's younger brother", 
    cantonese: "小叔", 
    pinyin: "siu2 suk1",
    generation: 0,
    notes: "Husband's younger brother" 
  },
  { 
    english: "Husband's younger brother's wife", 
    cantonese: "小嬸", 
    pinyin: "siu2 sam2",
    generation: 0,
    notes: "Wife of husband's younger brother" 
  },
  { 
    english: "Husband's sister", 
    cantonese: "姑仔", 
    pinyin: "gu1 zai2",
    generation: 0,
    notes: "Sister of husband" 
  },
  { 
    english: "Husband's sister's husband", 
    cantonese: "姑爺", 
    pinyin: "gu1 ye4",
    generation: 0,
    notes: "Husband of husband's sister" 
  },
  { 
    english: "Wife's brother", 
    cantonese: "舅仔", 
    pinyin: "kau5 zai2",
    generation: 0,
    notes: "Brother of wife" 
  },
  { 
    english: "Wife's brother's wife", 
    cantonese: "舅弟媳婦", 
    pinyin: "kau5 dai6 sik1 fu5",
    generation: 0,
    notes: "Wife of wife's brother" 
  },
  { 
    english: "Wife's sister", 
    cantonese: "姨仔", 
    pinyin: "ji4 zai2",
    generation: 0,
    notes: "Sister of wife" 
  },
  { 
    english: "Wife's sister's husband", 
    cantonese: "姨爺", 
    pinyin: "ji4 ye4",
    generation: 0,
    notes: "Husband of wife's sister" 
  },
  
  // Parents-in-law
  { 
    english: "Father-in-law (husband's father)", 
    cantonese: "家公", 
    pinyin: "gaa1 gung1",
    generation: 1,
    notes: "Husband's father" 
  },
  { 
    english: "Mother-in-law (husband's mother)", 
    cantonese: "家婆", 
    pinyin: "gaa1 po4",
    generation: 1,
    notes: "Husband's mother" 
  },
  { 
    english: "Father-in-law (wife's father)", 
    cantonese: "岳父", 
    pinyin: "ngok6 fu6",
    generation: 1,
    notes: "Wife's father" 
  },
  { 
    english: "Mother-in-law (wife's mother)", 
    cantonese: "岳母", 
    pinyin: "ngok6 mou5",
    generation: 1,
    notes: "Wife's mother" 
  },
  
  // Younger generation (children and nephews/nieces)
  { 
    english: "Son", 
    cantonese: "兒子", 
    pinyin: "ér zi",
    yue: "仔",
    yuePinyin: "zai2",
    generation: -1 
  },
  { 
    english: "Daughter", 
    cantonese: "女兒", 
    pinyin: "nǚ ér",
    yue: "女",
    yuePinyin: "neoi5",
    generation: -1 
  },
  { 
    english: "Nephew (brother's or sister's son)", 
    cantonese: "外甥", 
    pinyin: "ngoi6 saang1",
    generation: -1,
    notes: "Son of your brother or sister" 
  },
  { 
    english: "Niece (brother's or sister's daughter)", 
    cantonese: "外甥女", 
    pinyin: "ngoi6 saang1 neoi5",
    generation: -1,
    notes: "Daughter of your brother or sister" 
  },
  { 
    english: "Grandchild (son's or daughter's child)", 
    cantonese: "外孫", 
    pinyin: "ngoi6 syun1",
    generation: -2,
    notes: "Son or daughter of your child" 
  },
  { 
    english: "Grandchild's spouse (son's or daughter's child's spouse)", 
    cantonese: "外孫媳婦", 
    pinyin: "ngoi6 syun1 sik1 fu5",
    generation: -2,
    notes: "Spouse of your grandchild from son's or daughter's side" 
  },
  
  // Children-in-law
  { 
    english: "Son-in-law", 
    cantonese: "女婿", 
    pinyin: "neoi5 sai3",
    generation: -1,
    notes: "Daughter's husband" 
  },
  { 
    english: "Daughter-in-law", 
    cantonese: "媳婦", 
    pinyin: "sik1 fu5",
    generation: -1,
    notes: "Son's wife" 
  },
  
  // Grandchildren
  { 
    english: "Grandson (son's son)", 
    cantonese: "孫子", 
    pinyin: "syun1 zi2",
    generation: -2 
  },
  { 
    english: "Granddaughter (son's daughter)", 
    cantonese: "孫女", 
    pinyin: "syun1 neoi5",
    generation: -2 
  },
  { 
    english: "Grandson (daughter's son)", 
    cantonese: "外孫", 
    pinyin: "ngoi6 syun1",
    generation: -2 
  },
  { 
    english: "Granddaughter (daughter's daughter)", 
    cantonese: "外孫女", 
    pinyin: "ngoi6 syun1 neoi5",
    generation: -2 
  },
  
  // Extended family - Grandson's wife/Granddaughter's husband
  { 
    english: "Grandson's wife", 
    cantonese: "孫媳婦", 
    pinyin: "syun1 sik1 fu5",
    generation: -2,
    notes: "Wife of son's son" 
  },
  { 
    english: "Granddaughter's husband", 
    cantonese: "孫女婿", 
    pinyin: "syun1 neoi5 sai3",
    generation: -2,
    notes: "Husband of son's daughter" 
  },
  { 
    english: "Daughter's son's wife", 
    cantonese: "外孫媳婦", 
    pinyin: "ngoi6 syun1 sik1 fu5",
    generation: -2,
    notes: "Wife of daughter's son" 
  },
  { 
    english: "Daughter's daughter's husband", 
    cantonese: "外孫女婿", 
    pinyin: "ngoi6 syun1 neoi5 sai3",
    generation: -2,
    notes: "Husband of daughter's daughter" 
  },
  
  // Great grandchildren
  { 
    english: "Great grandson", 
    cantonese: "曾孫", 
    pinyin: "zang1 syun1",
    generation: -3 
  },
  { 
    english: "Great granddaughter", 
    cantonese: "曾孫女", 
    pinyin: "zang1 syun1 neoi5",
    generation: -3 
  },
  
  // Extended great-grandchildren family
  { 
    english: "Great grandson's wife", 
    cantonese: "曾孫媳婦", 
    pinyin: "zang1 syun1 sik1 fu5",
    generation: -3,
    notes: "Wife of great grandson" 
  },
  { 
    english: "Great granddaughter's husband", 
    cantonese: "曾孫女婿", 
    pinyin: "zang1 syun1 neoi5 sai3",
    generation: -3,
    notes: "Husband of great granddaughter" 
  },

  // Second cousins (children of first cousins)
  { 
    english: "Second cousin (paternal male cousin's son)", 
    cantonese: "堂侄", 
    pinyin: "tong4 zat6",
    generation: -1,
    notes: "Son of your father's brother's son (your male paternal cousin)" 
  },
  { 
    english: "Second cousin (paternal male cousin's daughter)", 
    cantonese: "堂侄女", 
    pinyin: "tong4 zat6 neoi5",
    generation: -1,
    notes: "Daughter of your father's brother's son (your male paternal cousin)" 
  },
  { 
    english: "Second cousin (paternal female cousin's son)", 
    cantonese: "堂外甥", 
    pinyin: "tong4 ngoi6 saang1",
    generation: -1,
    notes: "Son of your father's brother's daughter (your female paternal cousin)" 
  },
  { 
    english: "Second cousin (paternal female cousin's daughter)", 
    cantonese: "堂外甥女", 
    pinyin: "tong4 ngoi6 saang1 neoi5",
    generation: -1,
    notes: "Daughter of your father's brother's daughter (your female paternal cousin)" 
  },
  { 
    english: "Second cousin (other male cousin's son)", 
    cantonese: "表侄", 
    pinyin: "biu2 zat6",
    generation: -1,
    notes: "Son of your male 'biu' cousin" 
  },
  { 
    english: "Second cousin (other male cousin's daughter)", 
    cantonese: "表侄女", 
    pinyin: "biu2 zat6 neoi5",
    generation: -1,
    notes: "Daughter of your male 'biu' cousin" 
  },
  { 
    english: "Second cousin (other female cousin's son)", 
    cantonese: "表外甥", 
    pinyin: "biu2 ngoi6 saang1",
    generation: -1,
    notes: "Son of your female 'biu' cousin" 
  },
  { 
    english: "Second cousin (other female cousin's daughter)", 
    cantonese: "表外甥女", 
    pinyin: "biu2 ngoi6 saang1 neoi5",
    generation: -1,
    notes: "Daughter of your female 'biu' cousin" 
  },

  // Great-great grandparents
  { 
    english: "Great-great grandfather (paternal)", 
    cantonese: "太公", 
    pinyin: "taai3 gung1",
    generation: 4,
    notes: "Father's father's father's father" 
  },
  { 
    english: "Great-great grandmother (paternal)", 
    cantonese: "太婆", 
    pinyin: "taai3 po4",
    generation: 4,
    notes: "Father's father's father's mother" 
  },
  { 
    english: "Great-great grandfather (maternal)", 
    cantonese: "太外公", 
    pinyin: "taai3 ngoi6 gung1",
    generation: 4,
    notes: "Mother's mother's mother's father" 
  },
  { 
    english: "Great-great grandmother (maternal)", 
    cantonese: "太外婆", 
    pinyin: "taai3 ngoi6 po4",
    generation: 4,
    notes: "Mother's mother's mother's mother" 
  },

  // Great-great grandchildren
  { 
    english: "Great-great grandson", 
    cantonese: "玄孫", 
    pinyin: "jyun4 syun1",
    generation: -4 
  },
  { 
    english: "Great-great granddaughter", 
    cantonese: "玄孫女", 
    pinyin: "jyun4 syun1 neoi5",
    generation: -4 
  },

  // Cousins once removed (cousin's children or parent's cousins)
  { 
    english: "Cousin once removed (father's cousin)", 
    cantonese: "堂伯/堂叔", 
    pinyin: "tong4 baak3/tong4 suk1",
    generation: 1,
    notes: "Father's male cousin (older/younger than father)" 
  },
  { 
    english: "Cousin once removed (father's female cousin)", 
    cantonese: "堂姑", 
    pinyin: "tong4 gu1",
    generation: 1,
    notes: "Father's female cousin" 
  },
  { 
    english: "Cousin once removed (mother's cousin)", 
    cantonese: "表舅/表姨", 
    pinyin: "biu2 kau5/biu2 ji4",
    generation: 1,
    notes: "Mother's male/female cousin" 
  }
];

// Group relationships by generation for easier filtering
export const getRelationshipsByGeneration = (generation: number) => {
  return familyRelationships.filter(relation => relation.generation === generation);
};

// Get a relationship by its English name
export const getRelationshipByEnglish = (english: string) => {
  return familyRelationships.find(relation => 
    relation.english.toLowerCase().includes(english.toLowerCase()));
};

// Function to search for relationships
export const searchRelationships = (query: string) => {
  const lowercaseQuery = query.toLowerCase();
  return familyRelationships.filter(relation => 
    relation.english.toLowerCase().includes(lowercaseQuery) || 
    relation.pinyin?.toLowerCase().includes(lowercaseQuery) ||
    relation.notes?.toLowerCase().includes(lowercaseQuery)
  );
}; 