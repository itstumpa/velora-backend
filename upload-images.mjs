/**
 * Upload images from Unsplash URLs to Sanity and patch documents.
 * Run: node upload-images.mjs
 */
import { createClient } from "@sanity/client";

// ─── Config ───────────────────────────────────────────────────────────
const client = createClient({
  projectId: "is280nl5",
  dataset: "production",
  token: process.env.SANITY_TOKEN,
  useCdn: false,
  apiVersion: "2024-01-01",
});

if (!process.env.SANITY_TOKEN) {
  console.error("❌ SANITY_TOKEN environment variable is required");
  process.exit(1);
}

// ─── Image URL → Document Mapping ─────────────────────────────────────
// Format: [url, documentId, fieldPath]
// fieldPath uses dot notation for Sanity patches
const imageMappings = [
  // ── Hero ──────────────────────────────────────────────────────────
  [
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=85&auto=format",
    "2d90eb8a-0100-431c-b0a0-66cdb726890d",
    "backgroundImage",
  ],

  // ── About ─────────────────────────────────────────────────────────
  [
    "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80&auto=format",
    "1f7dba31-5455-42fc-81be-a3b1290d4484",
    "image",
  ],

  // ── Site Settings (CTA background) ────────────────────────────────
  [
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=85&auto=format",
    "c77c3228-ef20-4c47-a3ca-d46db6525aa0",
    "ctaBackgroundImage",
  ],

  // ── Projects ──────────────────────────────────────────────────────
  [
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80&auto=format",
    "acaa2cc5-0276-4d42-a301-79669e03bbf2",
    "image",
  ],
  [
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80&auto=format",
    "f9f1a2ad-3233-4871-8bfb-baee1fe41f4c",
    "image",
  ],
  [
    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80&auto=format",
    "2fa3c9b4-3c4f-4b97-91c7-25433eb9fad1",
    "image",
  ],
  [
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80&auto=format",
    "a70f6495-864d-4fe8-bd4a-adade10160d9",
    "image",
  ],
  [
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80&auto=format",
    "41ce8a7f-1f96-46cd-9ed1-06d851d8ef2c",
    "image",
  ],
  [
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80&auto=format",
    "b67d783e-489e-46cf-b283-cba7e04df3e6",
    "image",
  ],

  // ── Testimonials (avatars) ────────────────────────────────────────
  [
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80&auto=format",
    "021bb33c-3f9f-493b-8aad-23eee4cad03a",
    "avatar",
  ],
  [
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80&auto=format",
    "52454cdf-a9ec-49f9-83c7-f44d1190fd2e",
    "avatar",
  ],
  [
    "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&q=80&auto=format",
    "19dbeb74-a260-42bb-820f-baae56185ad7",
    "avatar",
  ],
  [
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80&auto=format",
    "89ace3ee-9fe8-42f4-b689-748ce788ea5a",
    "avatar",
  ],
  [
    "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80&auto=format",
    "50fa5e54-31c6-4618-8c25-d6d310c918c2",
    "avatar",
  ],
  [
    "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80&auto=format",
    "923ad307-90fc-42de-adec-eebf988caa7f",
    "avatar",
  ],

  // ── Before/After ──────────────────────────────────────────────────
  [
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80&auto=format",
    "b2138fb4-f7bb-4882-8cff-767d5901549d",
    "beforeImage",
  ],
  [
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80&auto=format",
    "b2138fb4-f7bb-4882-8cff-767d5901549d",
    "afterImage",
  ],
  [
    "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80&auto=format",
    "178908e2-2669-4e99-963d-e28db4b99d3e",
    "beforeImage",
  ],
  [
    "https://images.unsplash.com/photo-1556909172-54557c7e4fb7?w=800&q=80&auto=format",
    "178908e2-2669-4e99-963d-e28db4b99d3e",
    "afterImage",
  ],
  [
    "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80&auto=format",
    "9d417d98-09cc-44ea-a2dc-53fac8c364b8",
    "beforeImage",
  ],
  [
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80&auto=format",
    "9d417d98-09cc-44ea-a2dc-53fac8c364b8",
    "afterImage",
  ],

  // ── Gallery Images ────────────────────────────────────────────────
  [
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80&auto=format",
    "f801e9a1-9485-41a7-b385-265d2888e024",
    "image",
  ],
  [
    "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=600&q=80&auto=format",
    "6bfc04de-5d9d-49e9-af3c-98ec67e2643f",
    "image",
  ],
  [
    "https://images.unsplash.com/photo-1573855619003-97b4799dcd8b?w=600&q=80&auto=format",
    "6fc94f9d-58fa-4308-89cd-ab290ffceebb",
    "image",
  ],
  [
    "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&q=80&auto=format",
    "9504d5ed-7f18-4c0d-94b4-4e2f98edb893",
    "image",
  ],
  [
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80&auto=format",
    "15e41ce9-dd6a-427b-8135-ae9ac6aa1f9d",
    "image",
  ],
  [
    "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=600&q=80&auto=format",
    "8ef0167a-841a-4b27-b75a-62041bd0d005",
    "image",
  ],
  [
    "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=600&q=80&auto=format",
    "4b0822ea-f0fb-4f29-ae37-b035a026bf00",
    "image",
  ],
  [
    "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&q=80&auto=format",
    "ebf460a7-2648-43e1-ba1e-7245aae46fc6",
    "image",
  ],
];

// ─── Helpers ───────────────────────────────────────────────────────────
async function downloadImageAsBuffer(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP ${response.status} for ${url}`);
  const buffer = Buffer.from(await response.arrayBuffer());
  console.log(`  ✓ Downloaded (${(buffer.length / 1024).toFixed(0)}KB)`);
  return buffer;
}

function getImageIdFromUrl(url) {
  // Extract photo ID from Unsplash URL like: photo-XXXXXXXXXXXXX
  const match = url.match(/photo-([a-zA-Z0-9-]+)/);
  return match ? match[1] : `img-${Date.now()}`;
}

function getFileName(url) {
  const id = getImageIdFromUrl(url);
  return `${id}.jpg`;
}

// ─── Main ─────────────────────────────────────────────────────────────
async function main() {
  console.log("🚀 Starting image upload to Sanity...\n");

  const urlCache = new Map(); // url → assetId

  let success = 0;
  let failed = 0;

  for (const [url, docId, fieldPath] of imageMappings) {
    console.log(`\n📦 [${docId.slice(0, 8)}…] → ${fieldPath}`);

    try {
      let assetId;

      // Check cache first
      if (urlCache.has(url)) {
        assetId = urlCache.get(url);
        console.log(`  ↳ Using cached asset: ${assetId}`);
      } else {
        // Download as Buffer
        console.log(`  ⬇️  Downloading...`);
        const buffer = await downloadImageAsBuffer(url);

        // Upload to Sanity
        console.log(`  ⬆️  Uploading to Sanity...`);
        const asset = await client.assets.upload("image", buffer, {
          filename: getFileName(url),
        });

        assetId = asset._id;
        urlCache.set(url, assetId);
        console.log(`  ✓ Asset ID: ${assetId}`);
      }

      // Patch document
      const imageRef = {
        _type: "image",
        asset: { _type: "reference", _ref: assetId },
      };

      await client.patch(docId).set({ [fieldPath]: imageRef }).commit();
      console.log(`  ✓ Patched ${docId}`);
      success++;
    } catch (err) {
      console.error(`  ✗ Failed: ${err.message}`);
      failed++;
    }
  }

  console.log(`\n✅ Done! ${success} succeeded, ${failed} failed`);
}

main().catch(console.error);
