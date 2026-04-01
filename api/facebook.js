export default async function handler(req, res) {
  const pageId = process.env.FACEBOOK_PAGE_ID;
  const token = process.env.FACEBOOK_ACCESS_TOKEN;

  // Check for credentials
  if (!pageId || !token) {
    return res.status(500).json({ error: 'Missing Facebook credentials on server' });
  }

  try {
    const url = `https://graph.facebook.com/v19.0/${pageId}/posts?fields=permalink_url&limit=6&access_token=${token}`;
    const response = await fetch(url);
    const data = await response.json();

    if (!data || !data.data) {
      return res.status(response.status || 500).json({ error: 'Failed to fetch from Facebook API' });
    }

    const fetchedPosts = data.data
      .filter((item) => item.permalink_url)
      .map((item) => ({
        id: item.id,
        url: item.permalink_url,
      }));

    res.status(200).json(fetchedPosts);
  } catch (error) {
    console.error('Error fetching Facebook posts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
