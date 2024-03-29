import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_GPT_API,
  dangerouslyAllowBrowser: true, // This is the default and can be omitted
});

export async function chatCompletion(query) {
  const chatCompletionResult = await openai.chat.completions.create({
    messages: [
      {
        role: 'user',
        content: `Act as a movie search engine and recommend movies based on the following query ${query}, suggest a maximum of 12 movies, comma seperated like movieName1,movieName2,movieName3, the output should have only move suggestions and no complimentry text. If you are unable to find any movies, please return a message saying null`,
      },
    ],
    model: 'gpt-3.5-turbo',
  });

  return chatCompletionResult.choices[0]?.message?.content;
}
