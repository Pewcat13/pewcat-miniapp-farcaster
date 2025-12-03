// api/check.js
// Verifies follow, like and comment requirements sent by the Frame
export default async function handler(req, res) {
  try {
    const fid = req.body.untrustedData && req.body.untrustedData.fid;
    if (!fid) {
      return res.status(400).json({ error: 'Missing fid' });
    }

    // CONFIG - edit if needed
    const requiredUsername = "pewcat";
    const requiredCastHash = "0xcba34b69";

    // Placeholder helper functions:
    // In a real deployment you should replace these with Farcaster API calls or an indexer
    async function checkFollow(fid, username) {
      // TODO: implement real follow check
      // For now, accept all for local testing
      return true;
    }
    async function checkLike(fid, castHash) {
      // TODO: implement real like check
      return true;
    }
    async function checkComment(fid, castHash) {
      // TODO: implement real comment check
      return true;
    }

    const followOk = await checkFollow(fid, requiredUsername);
    const likeOk = await checkLike(fid, requiredCastHash);
    const commentOk = await checkComment(fid, requiredCastHash);

    if (!followOk || !likeOk || !commentOk) {
      return res.json({
        image: "https://i.imgur.com/1Z4K2Uw.png",
        buttons: [
          {
            label: "Follow + Like + Comment First",
            action: "post",
            target: "/api/check"
          }
        ],
        message: "Oops! You need to complete all steps first:\n- Follow @pewcat\n- Like this post\n- Leave a comment\nTry again after completing these steps 🔥"
      });
    }

    return res.json({
      image: "https://i.imgur.com/t9cM0dD.png",
      buttons: [
        {
          label: "Claim Token",
          action: "post",
          target: "/api/claim"
        }
      ],
      message: "Awesome! You have completed all requirements ✅\nPress 'Claim Token' to receive your 5,000 Pewcat tokens"
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'server error' });
  }
}
