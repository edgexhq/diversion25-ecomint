import { Groq } from "groq-sdk";

const schema = {
  properties: {
    scientific_name: {
      title: "Exact Scientific Name with Genus and species",
      type: "string",
    },
    co2_offset_per_year: { title: "CO2 Offset Per Year", type: "number" },
  },
  required: ["scientific_name", "co2_offset_per_year"],
  title: "PlantData",
  type: "object",
};

class PlantData {
  scientific_name: string;
  co2_offset_per_year: number;

  constructor(scientific_name: string, co2_offset_per_year: number) {
    this.scientific_name = scientific_name;
    this.co2_offset_per_year = co2_offset_per_year;
  }
}

const client = new Groq({
  apiKey: process.env.GROQ_API_KEY as string || "",
});

export async function POST(request: Request) {
  const { imgUrl } = await request.json();
  try {
    const chatCompletion = await client.chat.completions.create({
      messages: [
        {
          role: "user",
          content: `You are a plant identification system that outputs data in JSON. The JSON must follow the schema: ${JSON.stringify(
            schema,
            null,
            2
          )}
          
          Dont send any other data in the JSON or any other format. Exactly two keys are expected in the JSON. dont send as { properties : {...}}`,
        },
        {
          role: "user",
          content: [
            {
              type: "image_url",
              image_url: {
                url: imgUrl,
              },
            },
            {
              type: "text",
              text: "Identify this plant's biological scientific name and its CO2 offset per year in kg.",
            },
          ],
        },
      ],
      model: "llama-3.2-90b-vision-preview",
      temperature: 1,
      max_tokens: 1024,
      top_p: 1,
      stop: null,
      stream: false,
      response_format: {
        type: "json_object",
      },
    });

    const response = chatCompletion.choices[0].message.content;

    if (!response) {
      throw new Error("No response from the AI model.");
    }

    const parsedResponse = JSON.parse(response) as {
      scientific_name: string;
      co2_offset_per_year: number;
    };

    const plantData = new PlantData(
      parsedResponse.scientific_name,
      parsedResponse.co2_offset_per_year
    );

    return Response.json({ response: plantData });
  } catch (error) {
    console.error("Error in API:", error);
    return Response.json(
      { error: "An error occurred in server." + error },
      { status: 500 }
    );
  }
}
