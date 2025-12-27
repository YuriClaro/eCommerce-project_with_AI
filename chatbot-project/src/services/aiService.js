import Groq from 'groq-sdk';

const apiKey = import.meta.env.VITE_GROQ_API_KEY;

export async function getAIResponse(message) {
  try {
    if (!apiKey) {
      console.error('API Key not found! Check the .env file');
      return 'Error: API key not configured.';
    }

    const groq = new Groq({ 
      apiKey: apiKey,
      dangerouslyAllowBrowser: true 
    });
    
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: 'user',
          content: message,
        },
      ],
      model: 'llama-3.3-70b-versatile',
    });

    return chatCompletion.choices[0]?.message?.content || 'No response';
  } catch (error) {
    console.error('Complete error in AI:', error);
    console.error('Message:', error.message);
    return 'Sorry, an error occurred while processing your question.';
  }
}
