export const searchSongs = async (term: string, limit = 25, offset = 0) => {
  const res = await fetch(
    `https://itunes.apple.com/search?term=${encodeURIComponent(term)}&entity=song&limit=${limit}&offset=${offset}`
  );
  const data = await res.json();
  return data.results;
};

export const getSongDetail = async (trackId: string) => {
  const res = await fetch(`https://itunes.apple.com/lookup?id=${trackId}`);
  const data = await res.json();
  return data.results[0];
};
