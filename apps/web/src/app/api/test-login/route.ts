import { NextRequest, NextResponse } from 'next/server';
import { signIn } from 'next-auth/react';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;
    
    console.log('=== LOGIN TEST ===');
    console.log('Email:', email);
    console.log('Password provided:', !!password);
    
    // Test the signIn function
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });
    
    console.log('SignIn result:', result);
    
    return NextResponse.json({
      success: !!result && !result.error,
      error: result?.error || null,
      data: result
    });
    
  } catch (error) {
    console.error('Login test error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : String(error) 
      },
      { status: 500 }
    );
  }
}
