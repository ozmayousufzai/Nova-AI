import "dotenv/config";

import express from "express";

import path from "path";

import { fileURLToPath } from "url";

const app = express();

const PORT = process.env.PORT || 5500;

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

app.use(express.json());

app.use(express.static(__dirname));

app.post("/api/ask", async (req, res) => {

  try {

    const question = String(req.body?.question || "").trim();

    if (!question) {

      return res.status(400).json({

        error: "Please enter a question."

      });

    }

    const response = await fetch("https://api.tavily.com/search", {

      method: "POST",

      headers: {

        "Content-Type": "application/json"

      },

      body: JSON.stringify({

        api_key: process.env.TAVILY_API_KEY,

        query: question,

        search_depth: "advanced",

        include_answer: true,

        include_raw_content: false,

        max_results: 5

      })

    });

    const data = await response.json();

    if (!response.ok) {

      console.error("Tavily error:", data);

      const tavilyError =
  data?.detail?.error ||
  data?.detail ||
  data?.message ||
  "Tavily search failed.";

return res.status(response.status).json({
  error: String(tavilyError)
});

    }

    const sources = (data.results || []).map((item) => ({

      title: item.title,

      url: item.url

    }));

    res.json({

      answer:

        data.answer ||

        "I found some relevant information, but I could not generate a direct answer.",

      sources

    });

  } catch (error) {

    console.error(error);

    res.status(500).json({

      error: "Something went wrong while searching the web."

    });

  }

});

app.listen(PORT, () => {

  console.log(`NOVA AI is running at http://127.0.0.1:${PORT}`);

});