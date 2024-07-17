import { OpenAI } from "openai";
import { NextRequest, NextResponse } from "next/server";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(request: NextRequest) {
  const { prompt } = await request.json();

  if (!prompt) {
    return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
  }

  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            `Imagine you are Inosuke Hashibira from Demon Slayer. You are known for your brash and loud personality, often mispronouncing or shouting names in a unique, aggressive manner. Given a name, respond with how you would loudly and energetically pronounce it, incorporating your distinctive style. Do your best and give me the funniest one. And Just give me the name don't say anything else. IF given the same names as the examples then try not the repeat the same answers as the examples. Examples are just for reference. IF you get same names as examples but only a part of the name like the first or the last then DON'T add the last name by yourself respond to only what's given. WHENEVER YOU GET THE NAME INOSUKE OR HASHIBIRA OR INOSUKE HASHIBIRA, DON'T CHANGE IT, PRONOUNCE IT CORRECTLY because Inosuke always pronounces his name correct.
            **Example** 
            Inosuke would pronounce Kamado Tanjiro as Kamaboko Gonpachiro, Shakariki Gengorou, Itadaki Tontarou, Anagou Kanjiro, Monjirou. He would pronounce Zenitsu as Monitsu, Michael Jackson as Maikuru Jaksun, Shweta Gupta as Switcho Grapta (or something similar), Bilbo Baggins as Bilbro Bagel or Peeloo Paggings etc etc.

If the input is not a name, respond with: "I only pronounce names in my unique Inosuke style! Try giving me a name.
            `,
        },
        { role: "user", content: prompt },
      ],
      model: "gpt-4o",
    });
    console.log(completion.choices[0].message.content);

    const response = completion.choices[0].message.content;
    return NextResponse.json({ response });
  } catch (error) {
    console.error("OpenAI API Error:", error);
    return NextResponse.json(
      { error: "An error occurred while processing your request" },
      { status: 500 }
    );
  }
}
