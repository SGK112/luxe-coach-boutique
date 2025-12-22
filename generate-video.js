const https = require('https');

// Set your Replicate API token as an environment variable:
// export REPLICATE_API_TOKEN=your_token_here
const REPLICATE_API_TOKEN = process.env.REPLICATE_API_TOKEN || 'YOUR_TOKEN_HERE';

// Luxury handbag video prompt inspired by Coach Tabby video style
const videoPrompt = `Cinematic luxury handbag commercial video. A beautiful tan leather designer shoulder bag with gold hardware rotating slowly on a pristine white marble surface. Soft diffused studio lighting creates elegant highlights on the polished leather texture. Camera slowly orbits around the bag, showing the craftsmanship details - the stitching, the clasp, the leather grain. Clean minimal white background. High-end fashion photography aesthetic. 4K quality, professional product videography, luxury brand commercial style.`;

async function makeRequest(options, data) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(body));
        } catch (e) {
          resolve(body);
        }
      });
    });
    req.on('error', reject);
    if (data) req.write(JSON.stringify(data));
    req.end();
  });
}

async function generateVideo() {
  console.log('🎬 Starting luxury handbag video generation...\n');
  console.log('Prompt:', videoPrompt, '\n');

  // Using minimax/video-01 for high-quality video generation
  const options = {
    hostname: 'api.replicate.com',
    path: '/v1/predictions',
    method: 'POST',
    headers: {
      'Authorization': `Token ${REPLICATE_API_TOKEN}`,
      'Content-Type': 'application/json'
    }
  };

  const payload = {
    version: "c8bcc4751328608bb75043b3af7bed4eabcf1a6c0a478d50a4cf57fa04bd5101",
    input: {
      prompt: videoPrompt,
      prompt_optimizer: true
    }
  };

  console.log('📡 Sending request to Replicate (minimax/video-01)...\n');

  const prediction = await makeRequest(options, payload);

  if (prediction.error) {
    console.error('Error:', prediction.error);

    // Try alternative model - Luma Dream Machine
    console.log('\n🔄 Trying alternative model (luma/dream-machine)...\n');

    const lumaPayload = {
      version: "1c3573a6bc1a4584c530bb9782d3e9c8b8c5f5e8d6f9a8c7b6e5d4c3b2a1f0e9",
      input: {
        prompt: videoPrompt
      }
    };

    const lumaPrediction = await makeRequest(options, lumaPayload);

    if (lumaPrediction.error) {
      // Try Stable Video Diffusion
      console.log('\n🔄 Trying Stable Video Diffusion...\n');

      const svdPayload = {
        version: "3f0457e4619daac51203dedb472816fd4af51f3149fa7a9e0b5ffcf1b8172438",
        input: {
          input_image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=1024&q=90",
          sizing_strategy: "maintain_aspect_ratio",
          frames_per_second: 6,
          motion_bucket_id: 40
        }
      };

      const svdPrediction = await makeRequest(options, svdPayload);
      console.log('Prediction:', JSON.stringify(svdPrediction, null, 2));
      return svdPrediction;
    }

    console.log('Prediction:', JSON.stringify(lumaPrediction, null, 2));
    return lumaPrediction;
  }

  console.log('✅ Prediction created!');
  console.log('ID:', prediction.id);
  console.log('Status:', prediction.status);
  console.log('\n⏳ Waiting for video generation...\n');

  // Poll for completion
  let result = prediction;
  while (result.status !== 'succeeded' && result.status !== 'failed') {
    await new Promise(r => setTimeout(r, 5000));

    const pollOptions = {
      hostname: 'api.replicate.com',
      path: `/v1/predictions/${prediction.id}`,
      method: 'GET',
      headers: {
        'Authorization': `Token ${REPLICATE_API_TOKEN}`
      }
    };

    result = await makeRequest(pollOptions);
    console.log('Status:', result.status);
  }

  if (result.status === 'succeeded') {
    console.log('\n🎉 Video generated successfully!');
    console.log('📹 Video URL:', result.output);
  } else {
    console.log('\n❌ Generation failed:', result.error);
  }

  return result;
}

generateVideo().catch(console.error);
