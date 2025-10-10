/**
 * HABS TECHNOLOGIES GROUP
 * Contact Form API Route
 */

import { NextResponse } from 'next/server';
import { addDocument, COLLECTIONS } from '@/lib/firestore';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, company, message, consent } = body;

    // Validation
    if (!name || !email || !message || !consent) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Save to Firestore
    const contactData = {
      name,
      email,
      phone: phone || '',
      company: company || '',
      message,
      status: 'new',
      submittedAt: new Date().toISOString(),
    };

    const contactId = await addDocument(COLLECTIONS.CONTACTS, contactData);

    // TODO: Send email notification to admin
    // TODO: Send confirmation email to user

    return NextResponse.json(
      { 
        success: true, 
        message: 'Contact form submitted successfully',
        id: contactId 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}





