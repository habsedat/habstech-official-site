/**
 * HABS TECHNOLOGIES GROUP
 * Application Form API Route
 */

import { NextResponse } from 'next/server';
import { addDocument, COLLECTIONS } from '@/lib/firestore';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, phone, company, projectType, budget, timeline, brief, consent } = body;

    // Validation
    if (!name || !email || !projectType || !budget || !timeline || !brief || !consent) {
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
    const applicationData = {
      name,
      email,
      phone: phone || '',
      company: company || '',
      projectType,
      budget,
      timeline,
      brief,
      status: 'new',
      submittedAt: new Date().toISOString(),
      reviewedAt: null,
      reviewedBy: null,
      notes: [],
    };

    const applicationId = await addDocument(COLLECTIONS.APPLICATIONS, applicationData);

    // TODO: Send email notification to admin
    // TODO: Send confirmation email to applicant with ticket ID

    return NextResponse.json(
      { 
        success: true, 
        message: 'Application submitted successfully',
        id: applicationId,
        ticketId: `APP-${applicationId.substring(0, 8).toUpperCase()}`
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Application form error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}





