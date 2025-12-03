# Pewcat Mini-App (Deploy-ready)

This repository contains a ready-to-deploy Farcaster / Warpcast Frame mini-app that:
- Requires users to follow @pewcat, like a specific cast, and leave a comment
- Sends 5,000 tokens per successful claim from a claim wallet

## Files
- `index.html` — Frame entry page
- `api/check.js` — Verifies follow, like and comment (placeholder checks)
- `api/claim.js` — Sends tokens using PRIVATE_KEY environment variable

## How to deploy (GitHub -> Vercel)
1. Create a GitHub repository and push these files to `main`.
2. In Vercel, import the GitHub repository as a new project.
3. Add an Environment Variable in Vercel:
   - `PRIVATE_KEY` = (your claim wallet private key)
4. Deploy the project.
5. Use the project URL as your Frame URL in Warpcast.

## IMPORTANT SECURITY NOTES
- Do NOT share your private key. Add it only in Vercel environment variables.
- Use a dedicated claim wallet with limited funds.
- Replace placeholder check functions with real Farcaster API or indexer calls before going fully live.
