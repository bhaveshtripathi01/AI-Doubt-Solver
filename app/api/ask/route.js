import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req) {
  try {
    const { question, subject } = await req.json();
    if (!question?.trim()) {
      return NextResponse.json({ error: 'Question is required' }, { status: 400 });
    }
    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        {
          role: 'system',
          content: `You are a patient and friendly tutor helping students understand ${subject} concepts. Always explain in simple language with step-by-step reasoning. Use examples where helpful. Keep answers clear and concise.`
        },
        {
          role: 'user',
          content: question
        }
      ],
      max_tokens: 600,
    });
    const answer = completion.choices[0].message.content;
    return NextResponse.json({ answer });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to get answer' }, { status: 500 });
  }
}