import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export async function POST() {
  try {
    // Create a direct Supabase client with full admin access
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!, // Use service role key for admin access
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    )

    console.log('Setting up database...')

    // Create users table if it doesn't exist
    const { error: createTableError } = await supabaseAdmin.rpc('create_users_table')

    if (createTableError) {
      console.error('Error creating users table:', createTableError)
      return NextResponse.json({ error: createTableError }, { status: 500 })
    }

    // Enable RLS
    const { error: rlsError } = await supabaseAdmin.rpc('enable_rls_users')

    if (rlsError) {
      console.error('Error enabling RLS:', rlsError)
      return NextResponse.json({ error: rlsError }, { status: 500 })
    }

    // Create RLS policies
    const { error: policiesError } = await supabaseAdmin.rpc('create_users_policies')

    if (policiesError) {
      console.error('Error creating policies:', policiesError)
      return NextResponse.json({ error: policiesError }, { status: 500 })
    }

    // Verify setup
    const { data: verifyData, error: verifyError } = await supabaseAdmin
      .from('users')
      .select('*')
      .limit(1)

    if (verifyError) {
      console.error('Error verifying setup:', verifyError)
      return NextResponse.json({ error: verifyError }, { status: 500 })
    }

    console.log('Database setup completed successfully:', verifyData)
    return NextResponse.json({ 
      success: true,
      message: 'Database setup completed successfully',
      verifyData
    })
  } catch (error) {
    console.error('Error in setup-db:', error)
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 })
  }
}
