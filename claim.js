// api/claim.js
import { ethers } from "ethers";

// This endpoint sends tokens from your claim wallet to the requesting address.
// IMPORTANT: set PRIVATE_KEY in Vercel environment variables before deploying.

export default async function handler(req, res) {
  try {
    const walletAddress = req.body.untrustedData && req.body.untrustedData.address;
    if (!walletAddress) {
      return res.status(400).json({ error: 'Missing wallet address' });
    }

    const provider = new ethers.JsonRpcProvider("https://rpc.ankr.com/base");
    const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

    const contract = new ethers.Contract(
      "0xe8220668692bf1eFFD4F81a46976b8f11e015e6e",
      ["function transfer(address to, uint amount) public"],
      signer
    );

    // 5,000 tokens, adjust decimals if your token uses different decimals
    const amount = ethers.parseUnits("5000", 18);
    const tx = await contract.transfer(walletAddress, amount);
    await tx.wait();

    return res.json({
      image: "https://i.imgur.com/5z7sV4G.png",
      buttons: [{ label: "Done" }],
      message: "Success! 🎉\nYou have received 5,000 Pewcat tokens\nThank you for supporting @pewcat"
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'claim failed', details: String(err) });
  }
}
